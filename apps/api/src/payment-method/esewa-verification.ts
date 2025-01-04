import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
const CryptoJS = require('crypto-js');

export const verifyEsewaPayment = async (data: string) => {
  try {
    const decodedString = atob(data);
    const decodedData = await JSON.parse(decodedString);
    if (decodedData.status !== 'COMPLETE') {
      return {
        message: 'Payment not completed',
      };
    }
    const message = decodedData.signed_field_names
      .split(',')
      .map((v) => `${v}=${decodedData[v]}`)
      .join(',');
    // const message1 = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;
    const signature = generateEsewaSignature(message);
    if (signature !== decodedData.signature) {
      return {
        message: 'Invalid Signature',
      };
    }
    let headersList = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let requestOptions = {
      url: `${process.env.ESEWA_VERIFICATION_URL}/?product_code=${process.env.ESEWA_SERVICE_PRODUCTCODE}&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`,
      method: 'GET',
      headers: headersList,
    };
    const response = await axios.request(requestOptions);
    if (
      response.data.status !== 'COMPLETE' ||
      response.data.transaction_uuid !== decodedData.transaction_uuid ||
      Number(response.data.total_amount) !== Number(decodedData.total_amount)
    ) {
      return {
        message: 'Invalid Transaction',
      };
    }
    return {
      decodedData: decodedData,
      verificationResponse: response.data,
    };
  } catch (error) {
    return error ? error.message : 'Payment Verification Failed';
  }
};

export const generateEsewaSignature = (message) => {
  try {
    const hash = CryptoJS.HmacSHA256(message, process.env.ESEWA_SECRET_KEY);
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    return hashInBase64;
  } catch (error) {
    throw new BadRequestException('Error in generating esewa signature');
  }
};
