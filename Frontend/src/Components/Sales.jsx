import React, { useState } from "react";
import Print from "./Print";
import sanityClient from "../Client";
const Sales = ({ products, setProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentOrder, setCurrentOrder] = useState([])
  const [quantitySold, setQuantitySold] = useState(1);
  //handle product select
  const handleProductSelect = (e) => {
    const productName = e.target.value;
    const product = products.find(
      (product) => product.ProductName === productName
    );
    setSelectedProduct(product);
    setTotal(product.Price * quantity);
  };

  //handle quantity change
  const handleQuantityChange = (e) => {
    let inputQuantity = parseInt(e.target.value);

    // If the input quantity exceeds the available stock, cap it
    if (inputQuantity > selectedProduct.Quantity) {
      setError(`You can only buy up to ${selectedProduct.Quantity} units.`);

      setQuantity(selectedProduct.Quantity);
      setTotal(selectedProduct.Price * selectedProduct.Quantity);
    } else {
      setError(""); // Clear the error if the quantity is valid
      setQuantity(inputQuantity);
      setTotal(selectedProduct.Price * inputQuantity);
    }
  };

  // const handleSales= () => {
  //   const productTosell = products.find((prod) => prod.productName === selectedProduct);

  //   if(productTosell && productTosell.Quantity >= quantitySold){
  //     const updatedProduct = products.map((prod) => {
  //       if(prod.ProductName === selectedProduct) {
  //         return{...prod, Quantity: prod.Quantity - quantitySold};
  //       }
  //       return prod
  //     })
  //     setProducts(updateSales)
  //   }
  // }
  // console.log(products)


  //add product into a cart
//add product into a cart
const addProduct = async (e) => {
    e.preventDefault();  // move this to the start to avoid default form submission
    if (selectedProduct) {
        const updatedProduct = { ...selectedProduct, Quantity: quantity };
        setProduct([...product, updatedProduct]);

        // Display a popup message when a product is added
        setShowPopup(true);
        setInfo("Product has been added!");

        const newProduct = {
            _type: "AddedProducts",
            ProductName: selectedProduct.ProductName,
            Price: selectedProduct.Price,
            Quantity: quantity,
            Total: total,
            timestamp: new Date().toISOString(),
        };
        setCurrentOrder([...currentOrder, newProduct]);
        
        try {
            const result = await sanityClient.create(
              newProduct,
            );
            setSuccessMessage("Product added successfully!");
            setProduct([...product, result]);
            console.log("Document created: ", result);
        } catch (error) {
            console.error("Error adding document:", error);
        }

        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    } else {
        setInfo("Please select a product.");
    }
};

console.log(currentOrder)

  const printCart = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    setCurrentOrder([])

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Cart</title>
        </head>
        <body>
          <h1>Cart Details</h1>
          ${document.getElementById("cartDetails").innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div>
      <div className=" w-[100%] flex justify-around">
        <div className=" w-[50vw] h-[70vh] flex p-[20px] flex-col ">
          <p className="text-red-600 text-xs">{error}</p>
          {showPopup && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-500 text-white px-4 py-2 rounded-md shadow-md">
              {info}
            </div>
          )}
          <div className="  ">
            <p htmlFor="productSelect" className="text-sm text-slate-500 font-extralight">
              Select Product:
            </p>

            <select
              name="productSelect"
              id="productSelect"
              onChange={handleProductSelect}
              className="border-[0.5px] text-sm text-slate-500 font-extralight mt-[20px] rounded w-[300px] h-[30px] "
            >
              <option value="" className="text-sm text-slate-500 border-[2px]">
                Select Product
              </option>
              {products.map((product, index) => (
                <option
                  key={index}
                  value={product.ProductName}
                  className="text-sm text-slate-500 "
                >
                  {product.ProductName}
                </option>
              ))}
            </select>
          </div>

          {selectedProduct && (
            <div className="mt-[5%] font-extralight flex justify-between flex-col w-[40vw]">
              <p className="text-sm">
                Price per unit: N{selectedProduct.Price}
              </p>
              <div>
                <label htmlFor="quantity" className="mt-[10px] ">
                  Enter quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  className="border-[0.5px] text-sm text-slate-500 mt-[30px] ml-[20px] "
                  onChange={handleQuantityChange}
                />
              </div>
            </div>
          )}
          <div>
            
            <div className="flex justify-center items-center w-[50%] mt-[20px]">
            <button
             disabled={!selectedProduct}
              onClick={addProduct}
              className="mt-[20px] bg-slate-500 font-extralight text-sm w-[50%] cursor-pointer  hover:bg-slate-900 p-[5px] text-white rounded shadow-md"
            >
              Add Product
            </button>
            </div>
           
            <div className="mt-[20px] font-extralight">
              <p>
                Total price: <span className="text-red-500">N{total}</span>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="w-[40vw] h-[70vh]">
          <div id="cartDetails">
            <Print product={product} setProduct={setProduct} currentOrder={currentOrder} />
          </div>
          <button
            onClick={printCart}
            className="mt-[20px] rounded shadow-md cursor-pointer p-[10px] bg-zinc-500 text-white text-sm font-extralight hover:bg-zinc-900"
            disabled={currentOrder.length === 0}
          >
            Print Reciept
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sales;
