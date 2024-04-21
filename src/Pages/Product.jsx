import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firestoreConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PaypalButton from "../Components/PaypalButton";

const Product = () => {
  function ProductCard({ product }) {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
        <img
          className="w-full aspect-square"
          src={product.image}
          alt={product.name}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{product.name}</div>
          <p className="text-gray-700 text-base">Price: ${product.price}</p>
        </div>
        <div className="paypalButtons px-6">
          <PaypalButton product={product} />
        </div>
      </div>
    );
  }

  const productsArray = [
    {
      id: 1,
      name: "Air Jordan 1",
      price: 1,
      image:
        "https://images.unsplash.com/photo-1603787081207-362bcef7c144?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
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
      {productsArray.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
export default Product;
