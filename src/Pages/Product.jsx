import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProductCard from "../Components/ProductCard";
import { auth } from "../firestoreConfig";

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
    <div className="flex min-h-screen flex-wrap justify-center bg-gradient-to-tr from-[#222A3A] to-[#080113] text-white">
      <div className="fixed top-2 right-2 px-4 py-2 font-semibold text-sm bg-red-600 text-white rounded-full shadow-sm">
        <button onClick={handleLogOut}>Log Out</button>
      </div>
      <div className="fixed top-2 left-2 px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm">
        <button onClick={() => navigate("/my-orders")}>My Orders</button>
      </div>

      <div className="testCredentials  mt-4 flex flex-col gap-1 font-thin fixed top-1/3 left-2 shadow-xl shadow-slate-600 rounded-md p-4">
        <h4 className="font-bold text-gray-400 capitalize">
          Test Credentials For paypal:
        </h4>
        <p className="text-gray-300">
          Email : sb-0tnhe30531873@personal.example.com
        </p>
        <p className="text-gray-300"> Password : a|IE/D15</p>
      </div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Product;
