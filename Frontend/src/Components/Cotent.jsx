import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import { useQuery } from "@tanstack/react-query";
const Cotent = () => {
  // const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    return await sanityClient.fetch(
      `*[_type == "Products"]{ProductName, Quantity, Price}`
    );
  };

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <div>
        <table className="min-w-full  border w-[60vw] mt-[20px] border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-sm font-extralight">
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="border px-4 py-2 text-center text-sm font-extralight">
                  {product.ProductName}
                </td>
                <td className="border px-4 py-2 text-center text-sm font-extralight">
                  {product.Quantity}
                </td>
                <td className="border px-4 py-2 text-center text-sm font-extralight">
                  {product.Price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cotent;
