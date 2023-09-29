import React, { useState, useEffect } from "react";
import Link from "next/link";

const ProductComponent = ({ product }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  console.log("PRODUCT COMPONENT ", product);
  useEffect(() => {
    console.log("SAYIM METODU ÇALIŞTI");
    const startTime = new Date(product.StartTime).getTime();

    const interval = setInterval(() => {
      const now = new Date();
      const remaining = startTime - now;
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      if (remaining > 0) {
        setTimeRemaining(
          `${days} gün ${hours} saat ${minutes} dakika ${seconds} saniye`
        );
      } else {
        setTimeRemaining(null);
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [product.StartTime]);

  return (
    <div className="m-3 bg-gray-200  text-blue-600 p-3 inline-block">
      <h1>Ürün Adı: {product.Name}</h1>
      <p>Ürün Açıklaması: {product.Description}</p>
      {timeRemaining ? (
        <div className="flex">
          Açık artırmaya başlamasına kalan süre:
          <p className="ml-1 font-bold">{timeRemaining}</p>
        </div>
      ) : (
        <p>Açık artırma başlamış veya sona ermiş. {timeRemaining}</p>
      )}
      {timeRemaining == null && product.EndTime === null && (
        <Link
          className="p-3 bg-green-500 m-3 inline-block rounded-md text-white"
          href={`/products/${product.ProductID}`}
        >
          Ürüne git
        </Link>
      )}
    </div>
  );
};

export default ProductComponent;
