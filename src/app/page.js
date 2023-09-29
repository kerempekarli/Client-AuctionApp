"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/header";
import ProductComponent from "../components/product";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const user = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    // Ürünleri API'den almak için bir fetch işlemi yapabilirsiniz.
    // Bu sadece örnek bir kullanım, gerçek veri kaynağınıza uygun şekilde güncellemelisiniz.
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3001/products");
        if (!response.ok) {
          throw new Error("Ürünleri alırken bir hata oluştu.");
        }
        const products = await response.json();
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <Header />
      <div className="p-10">
        <h1 className="text-5xl ">Açık Artırma Ürünleri</h1>
        <div className="min-w-full border-b border-blue-800 my-5"></div>
        {products.length === 0 ? (
          <p>Ürünler yükleniyor...</p>
        ) : (
          <div className="">
            {products.map((product) => (
              <ProductComponent key={product.ProductID} product={product} />
            ))}
          </div>
        )}
      </div>
      username: {user.Username}
    </div>
  );
};

export default HomePage;
