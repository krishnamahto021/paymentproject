import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firestoreConfig";
import { useNavigate } from "react-router-dom";

const PaypalButton = ({ product }) => {
  const [paidFor, setPaidFor] = useState(false);
const navigate = useNavigate();
  const saveDetails = async (orderId) => {
    try {
      // Save purchase details to Firestore
      const docRef = collection(db, "purchase");
      const userId = localStorage.getItem("userId");
      await addDoc(docRef, {
        userId,
        orderId,
        product,
      });
      toast.success("Redirecting you to the order page");
    } catch (error) {
      console.error("Error saving purchase details:", error);
      toast.error("Failed to save purchase details.");
    }
  };

  return (
    <PayPalScriptProvider>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.name,
                amount: {
                  value: product.discountedPrice || product.price,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          const orderId = data.orderID;
          setPaidFor(orderId);
          await saveDetails(orderId);
          toast.success("Payment successful");
        }}
        onCancel={() => {
          toast.error("Payment was cancelled.");
        }}
        onError={(err) => {
          console.error(err);
          toast.error("An error occurred during payment.");
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
