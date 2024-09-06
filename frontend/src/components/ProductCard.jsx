import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../../store/product";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
   const [updatedProduct, setUpdatedProduct] = useState(product);

   const { deleteProduct, updateProduct } = useProductStore();
   const handleDeleteProduct = async (pid) => {
      const { success, message } = await deleteProduct(pid);
      if (!success) {
         toast.error(message);
      } else {
         toast.success(message);
      }
   };

   const [isOpen, setIsOpen] = useState(false);

   const handleUpdateProduct = async (pid, updatedProduct) => {
      const { success, message } = await updateProduct(pid, updatedProduct);
      setIsOpen(false);
      if (!success) {
         toast.error(message);
      } else {
         toast.success(message);
      }
   };
   return (
      <div>
         <div className="w-52 h-52 max-sm:size-40">
            <img
               src={product?.image}
               alt={product?.name}
               className="w-full h-full object-cover object-center"
            />
         </div>

         <div>
            <h1>{product?.name}</h1>
            <p>{product?.price}</p>
         </div>
         <div className="flex gap-2 text-lg">
            <div>
               <FaEdit
                  onClick={() => setIsOpen(true)}
                  className="cursor-pointer"
               />
            </div>
            <div>
               <MdDelete
                  onClick={() => {
                     handleDeleteProduct(product?._id);
                  }}
                  className="cursor-pointer"
               />
            </div>
         </div>
         {/* ///////model for edit */}
         {isOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
               <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-lg font-bold mb-4">Edit Item</h2>
                  <form>
                     <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                           Name
                        </label>
                        <input
                           type="text"
                           className="w-full p-2 border border-gray-300 rounded"
                           placeholder="Enter name"
                           value={updatedProduct?.name}
                           onChange={(e) =>
                              setUpdatedProduct({
                                 ...updatedProduct,
                                 name: e.target.value,
                              })
                           }
                        />
                     </div>
                     <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                           Price
                        </label>
                        <input
                           type="text"
                           className="w-full p-2 border border-gray-300 rounded"
                           placeholder="Enter price"
                           value={updatedProduct?.price}
                           onChange={(e) =>
                              setUpdatedProduct({
                                 ...updatedProduct,
                                 price: e.target.value,
                              })
                           }
                        />
                     </div>
                     <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                           Image URL
                        </label>
                        <input
                           type="text"
                           className="w-full p-2 border border-gray-300 rounded"
                           placeholder="Enter image URL"
                           value={updatedProduct?.image}
                           onChange={(e) =>
                              setUpdatedProduct({
                                 ...updatedProduct,
                                 image: e.target.value,
                              })
                           }
                        />
                     </div>
                  </form>
                  <div className="flex justify-end">
                     <button
                        className="mr-2 px-4 py-2 bg-gray-300 rounded"
                        onClick={() => setIsOpen(false)}
                     >
                        Cancel
                     </button>
                     <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() =>
                           handleUpdateProduct(product?._id, updatedProduct)
                        }
                     >
                        Save
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default ProductCard;
