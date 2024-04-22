import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firestoreConfig";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Query the 'purchases' collection for orders associated with the user ID
        const ordersQuery = query(
          collection(db, "purchase"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(ordersQuery);
        console.log(querySnapshot.docs[0].data());
        // Extract order details from the query snapshot
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Set the fetched orders in state
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // Fetch orders when the component mounts
    fetchOrders();
  }, [userId]);
  const homePage = () => {
    navigate("/product");
  };
  return (
    <div className=" min-h-screen p-2 bg-gradient-to-tr from-[#222A3A] to-[#080113] text-white">
      <button
        onClick={homePage}
        className="fixed top-2 right-2 px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
      >
        Back to Home page
      </button>
      <h2 className="text-3xl font-bold mb-4">Your Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-gray-600 shadow-md rounded-md overflow-hidden p-2  h-fit"
          >
            <img
              src={order.product.image}
              alt={order.product.name}
              className="aspect-square"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold ">{order.productName}</h3>
              <p className="text-gray-600 font-thin ">
                Order ID: {order.orderId}
              </p>
              <p className="text-white mb-2">{order.product.name}</p>
              <p className="text-white mb-2">
                You bought at : $
                {order.product.discountedPrice || order.product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
