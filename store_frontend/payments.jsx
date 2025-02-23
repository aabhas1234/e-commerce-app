import React from "react";

const CheckoutButton = ({ amount }) => {
  const handlePayment = async () => {
    const res = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const { orderId } = await res.json();

    const options = {
      key: "your_razorpay_key", // Replace with actual key
      amount: amount * 100, // Convert ₹ to paise
      currency: "INR",
      name: "Your Store",
      order_id: orderId,
      handler: function (response) {
        console.log("Payment Successful:", response);
        alert("Payment successful! Thank you.");
      },
      prefill: { email: "buyer@example.com", contact: "9999999999" },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment}>Pay ₹{amount}</button>;
};

export default CheckoutButton;
