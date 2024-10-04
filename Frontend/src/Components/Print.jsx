import React, { useEffect, useState } from "react";

const Print = ({  currentOrder }) => {
  const grandTotal = currentOrder.reduce(
    (acc, product) => acc + product.Total,
    0
  );

  return (
    <div>
      {currentOrder.length === 0 ? (
        <p className="text-sm font-extralight">There is no current order</p>
      ) : (
        <div  className="overflow-y-auto" style={{ maxHeight: "300px" }}>
          <table className=" border w-[20vw] mt-[20px] border-gray-300">
            <thead>
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
              </tr>
            </thead>
            <tbody>
              {currentOrder.map((product, index) => (
                <tr key={index} className="border-b">
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
                </tr>
              ))}
            </tbody>
          </table>
          <p className="font-extralight text-sm mt-[10px]">
            GrandTotal: <span className="text-red-500 ">N{grandTotal} </span>{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default Print;
