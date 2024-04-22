import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProductCard from "../Components/ProductCard";

const Product = () => {
  const products = [
    {
      id: 1,
      name: "Air Jordan 1",
      price: 1,
      image:
        "https://images.unsplash.com/photo-1603787081207-362bcef7c144?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
      discountedPrice: null, 
      coupons: [
        { title: "FIRST ORDER", discount: 10 },
        { title: "NEW", discount: 5 },
      ],
    },
  ];
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await signOut(auth);
    toast.error("We will miss you 😢 ");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="flex flex-wrap justify-center">
      <div className="fixed top-2 right-2 ">
        <button onClick={handleLogOut}>Log Out</button>
      </div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Product;
