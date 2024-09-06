import React, { useState } from "react";
import { useProductStore } from "../../store/product.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
   const [newProduct, setNewProduct] = useState({
      name: "",
      price: "",
      image: "",
   });
   const navigate = useNavigate();

   const { createProduct } = useProductStore();
   const handleProductSubmit = async () => {
      const {success, message} = await createProduct(newProduct);
      if(!success) {
         toast.error(message,{duration:2000});
      } else {
         toast.success(message,{duration:2000});
         navigate("/");
      }
   };

   return (
      <div className="w-full flex justify-center h-screen">
         <div className="flex gap-8 flex-col w-full items-center">
            <h1 className="text-2xl items-center pt-6 font-semibold w-full text-center">Create new Product</h1>
            <div className="flex flex-col items-center justify-center gap-8 w-full">
               <input
                  type="text"
                  placeholder="Product Name"
                  name="name"
                  value={newProduct.name}
                  onChange={(e) =>
                     setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="border px-2 py-1 w-[50%]"
               />
               <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  value={newProduct.price}
                  onChange={(e) =>
                     setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="border px-2 py-1 w-[50%]"
               />
               <input
                  type="text"
                  placeholder="Image URL"
                  name="image"
                  value={newProduct.image}
                  onChange={(e) =>
                     setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  className="border px-2 py-1 w-[50%]"
               />
            </div>
            <button onClick={handleProductSubmit}
            className="px-6 rounded-lg py-2 bg-blue-500 text-white ">Create</button>
         </div>
      </div>
   );
};

export default CreatePage;
