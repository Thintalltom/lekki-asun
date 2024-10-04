import React from "react";
import sanityClient from "../Client";
import { useQuery } from "@tanstack/react-query";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
const History = () => {
  const fetchNewProducts = async () => {
    return await sanityClient.fetch(
      `*[_type == "AddedProducts"]{ProductName, Quantity, Price, Total, timestamp}`
    );
  };
  const navigate= useNavigate()

  const handlleLogout = async () => {
    try {
      signOut(auth)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  
  }
  const {
    data: newProducts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["newproducts"],
    queryFn: fetchNewProducts,
    refetchInterval: 1000,
  });

  if (isLoading) {
    return <p className="text-sm font-extralight">fetching Product...</p>;
  }

  if (error) {
    return <p className="text-sm font-extralight">Error: {error.message}</p>;
  }

  if (newProducts.length === 0) {
    return <p className="text-sm font-extralight">No products available.</p>;
  }
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div>
      <div className="p-[10px] flex justify-between">
    <p>Asun Spot</p>
    <button onClick={handlleLogout} className="bg-zinc-500 hover:bg-zinc-950 text-extralight font-sm w-[10%] shadow-md text-white  rounded p-[10px]">Log out</button>
      </div>
    
      <p className="text-sm font-bold mt-[10px] text-center">Sales History</p>
      <div className="p-[20px] flex justify-center items-center" >
        <table className=" border w-[80vw] cursor-pointer mt-[5px] border-gray-300">
          <thead >
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-xs font-extralight">
                Product{" "}
              </th>
              <th className="border px-4 py-2 text-xs font-extralight">
                Quantity
              </th>
              <th className="border px-4 py-2 text-xs font-extralight">
                Price
              </th>
              <th className="border px-4 py-2 text-xs font-extralight">
                Total
              </th>
              <th className="border px-4 py-2 text-xs font-extralight">Time</th>
            </tr>
          </thead>
          <tbody>
            {newProducts.map((product, index) => (
              <tr key={index} className="border-b hover:bg-slate-200">
                <td className="border px-4 py-2 text-center text-xs font-extralight">
                  {product.ProductName}
                </td>
                <td className="border px-4 py-2 text-center text-xs font-extralight">
                  {product.Quantity}
                </td>
                <td className="border px-4 py-2 text-center text-xs font-extralight">
                  {product.Price}
                </td>
                <td className="border px-4 py-2 text-center text-xs font-extralight text-red-500">
                  {product.Total}
                </td>
                <td className="border px-4 py-2 text-center text-xs font-extralight text-red-500">
                  {formatTimestamp(product.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
