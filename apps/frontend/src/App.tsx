import axios from "axios";
import "./App.css";

function App() {
  const handlePayment = async (payment_method: string) => {
    const url = "http://localhost:3000/order-item";
    const data = {
      productId: "KUEYU2367890",
      purchaseDate: "2014-12-01",
      productName: "Smartphone11",
      price: 500,
      quantity: 23,
      discountPercentage: 10,
      productDeliveryCharge: 10,
      productServiceCharge: 10,
      taxAmount: 10,
      totalPrice: 530,
      paymentMethod: payment_method,
      status: "pending",
    };
    try {
      const response = await axios({
        method: "post",
        url: url,
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        const responseData = await response.data;
        if (responseData.paymentMethod === "esewa") {
          esewaCall(responseData.esewaFormData);
        }
      } else {
        console.error("Failed to fetch:");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  const esewaCall = (formData: any) => {
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);
    form.setAttribute("target", "_blank");

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
  };
  return (
    <>
      <div>
        <h1>Integrating Esewa Paymnet Gateway with NestJs and PostgreSQL</h1>
        <img
          src="https://esewa.com.np/common/images/esewa_logo.png"
          alt="Esewa Payment"
          style={{ cursor: "pointer", margin: 10 }}
          onClick={() => handlePayment("esewa")}
        />
      </div>
    </>
  );
}
export default App;
