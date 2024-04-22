import React, { useState } from "react";
import PaypalButton from "./PaypalButton";

const ProductCard = ({ product }) => {
  const [discountedPrice, setDiscountedPrice] = useState(null);

  const handleCouponClick = (discount) => {
    const newDiscountedPrice = product.price * ((100 - discount) / 100);
    setDiscountedPrice(newDiscountedPrice);
    product.discountedPrice = newDiscountedPrice;
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img
        className="w-full aspect-square"
        src={product.image}
        alt={product.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">
          {discountedPrice ? (
            <span>
              <del className="text-red-600">${product.price}</del>
              <span className="ml-2">${discountedPrice}</span>
            </span>
          ) : (
            <span>${product.price}</span>
          )}
        </p>
      </div>
      <div className="couponsContainer px-6 py-4">
        {product.coupons.map((c, index) => (
          <button
            key={index}
            className="mr-2 mb-2 text-black font-thin border-2 border-dotted border-gray-800 py-2 px-4 rounded"
            onClick={() => handleCouponClick(c.discount)}
          >
            {c.title}
          </button>
        ))}
      </div>
      <div className="paypalButtons px-6">
        <PaypalButton product={product}  />
      </div>
    </div>
  );
};

export default ProductCard;
