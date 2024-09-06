import { create } from "zustand";

export const useProductStore = create((set) => ({
   products: [],
   setProducts: (products) => set({ products }),

   createProduct: async (newProduct) => {
      if (!newProduct.name || !newProduct.price || !newProduct.image) {
         return { success: false, message: "All fields are required" };
      }

      const res = await fetch("/api/products", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      set((state) => ({ products: [...state.products, data] }));
      return { success: true, message: "Product created successfully" };
   },
   fetchProducts: async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      set({ products: data.data });
   },

   deleteProduct: async (pid) => {
      const res = await fetch(`/api/products/${pid}`, {
         method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      // Remove product from ui immediately without needing refresh
      set((state) => ({
         products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: "Product deleted successfully" };
   },

   updateProduct: async (pid, updatedProduct) => {
      const res = await fetch(`/api/products/${pid}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      set((state) => ({
         products: state.products.map((product) =>
            product._id === pid ? data.data : product
         ),
      }));
      return { success: true, message: "Product updated successfully" };
   },
}));
