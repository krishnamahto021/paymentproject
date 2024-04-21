import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { data } from "autoprefixer";
import React, { useState } from "react";
import { toast } from "react-toastify";

const PaypalButton = ({ product }) => {
  const [paidFor, setPaidFor] = useState(false);
  return (
    <PayPalScriptProvider>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.name,
                amount: {
                  value: product.price,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture;
          console.log(order);
          setPaidFor(data.orderID);
        }}
        onCancel={() => {
          toast.error("Something went wrong !!");
        }}
        onError={(err) => {
          console.log(err);
          toast.error(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
