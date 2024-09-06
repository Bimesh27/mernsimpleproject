import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../../store/product.js";
import ProductCard from "../components/ProductCard.jsx";

const HomePage = () => {

   const {fetchProducts, products} = useProductStore();
   useEffect(() => {
      fetchProducts();
   },[fetchProducts]);

   console.log(products);
   
   return (
      <div className="px-2 w-full flex items-center justify-center flex-col p-10">
         <h1 className="p-10 text-2xl font-bold tracking-wide">
            Current product🚀
         </h1>

         <div className="grid max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center">
            {products?.map((product) => (
               <ProductCard product={product} key={product._id} />
            ))}
         </div>

         {!products && (
            <h1 className="text-lg pt-2">
               No product found👻
               <Link
                  to={"/create"}
                  className="text-blue-600 font-bold hover:underline"
               >
                  Create a product
               </Link>
            </h1>
         )}
      </div>
   );
};

export default HomePage;
