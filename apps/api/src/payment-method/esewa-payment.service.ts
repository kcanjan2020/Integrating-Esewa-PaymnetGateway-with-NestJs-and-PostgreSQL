import { Injectable } from '@nestjs/common';
import { verifyEsewaPayment } from './esewa-verification';

@Injectable()
export class EsewaService {
  async completeEsewaPayment(data: string) {
    try {
      const decodedData = await verifyEsewaPayment(data);
      console.log('decodedData===>', decodedData);
    } catch (error) {}
  }
}
