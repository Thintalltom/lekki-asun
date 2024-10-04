import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cotent from "./Cotent";
import History from "./History";
import Sales from "./Sales";
import sanityClient from "../Client";
const Products = () => {
  const [activeTab, setActiveTabs] = useState("products");
  const handleTabClick = (tab) => {
    setActiveTabs(tab); // Update the active tab
  };
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "Products"]{ProductName, Quantity, Price}`)
      .then((data) => {
        console.log(data);
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="flex border-[0.5px]  justify-between p-[20px] ">
        <p>Asun spot</p>

        <button className="bg-slate-800 text-white w-[10%] p-[5px] rounded border-[0.5px]">
          <Link to="/login">Login as admin</Link>
        </button>
      </div>

      <div className="flex justify-center  gap-[30%] mt-[10px]">
        <button
          className={
            activeTab === "products"
              ? " bg-slate-800 w-[10%] p-[5px] text-white rounded border-[0.5px]"
              : ""
          }
          onClick={() => handleTabClick("products")}
        >
          Products
        </button>
        <button
          className={
            activeTab === "sales"
              ? " bg-slate-800 w-[10%] p-[5px] text-white rounded border-[0.5px]"
              : ""
          }
          onClick={() => handleTabClick("sales")}
        >
          Sales
        </button>
        <button
          className={
            activeTab === "history"
              ? "w-[10%] p-[5px] rounded border-[0.5px] text-white bg-slate-800"
              : ""
          }
          onClick={() => handleTabClick("history")}
        >
          History
        </button>
      </div>

      <div className="flex justify-around mt-[20px]">
        {activeTab === "products" && <Cotent />}
        {activeTab === "sales" && <Sales products={products}  setProducts={setProducts}/>}
        {activeTab === "history" && <History />}
      </div>
    </div>
  );
};

export default Products;
