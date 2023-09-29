"use client";

import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
export default function Home({ params }) {
  const { id } = params;
  const [countdown, setCountdown] = useState(10);
  const [roomJoined, setRoomJoined] = useState(false);
  const [product, setProduct] = useState(null); // Add a state variable for the product
  const [bid, setBid] = useState({ Amount: "" }); // State variable for bid input

  const user = useSelector((state) => state.user);

  const socket = socketIOClient("http://localhost:3002", {
    rejectUnauthorized: false, // UYARI: Üretimde bunu kullanmayın
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  useEffect(() => {
    const joinAuction = () => {
      // Auction ID boşsa, katılma fonksiyonu çağrılmamalı
      if (id) {
        socket.emit("joinAuction", id);
        setRoomJoined(true);
      }
    };
    console.log("WORKED");

    // Socket olayları sadece bir kez dinlenmeli
    socket.on("updateCountdown", (data) => {
      setCountdown(data.countdown);
    });

    // Otomatik olarak odaya katıl
    joinAuction();

    return () => {
      socket.disconnect(); // Komponent sonlandığında soket bağlantısını kapat
    };
  }, [socket, id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`);
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData); // Update the state with the fetched product object
        } else {
          console.error("Failed to fetch product data");
        }
      } catch (error) {
        console.error("An error occurred while fetching product data", error);
      }
    };
    fetchProduct();
  }, [id]);

  const placeBid = () => {
    // Auction ID boşsa, teklif verme fonksiyonu çağrılmamalı
    if (id && bid.Amount !== "") {
      // Send the bid amount to the server using Socket.io
      socket.emit("placeBid", {
        auctionId: id,
        bidAmount: bid.Amount,
        bidTime: Date.now(),
        bidderId: user.UserID,
      });
    }
  };

  // Otomatik odaya katılma işlemi yapıldığında arayüz gösterilmeyebilir.
  if (!roomJoined) {
    return null;
  }

  return (
    <div className="flex h-full w-full min-h-screen justify-center items-center">
      <div className="w-1/4 text-2xl p-5 bg-gray-200 space-y-4">
        <h1>Açık Artırma</h1>
        {product ? (
          <div>
            <p>
              Kalan Süre:{" "}
              <span className="text-green-500 inline font-bold text-3xl">
                {countdown} saniye
              </span>
            </p>
            <h2>Ürün Bilgileri:</h2>
            <p>Ürün Adı: {product.Name}</p>
            <p>Açıklama: {product.Description}</p>
            <p>Başlangıç Fiyatı: {product.StartingPrice}</p>
            <p>Mevcut Fiyat: {product.CurrentPrice}</p>
            {/* Add more product details as needed */}
          </div>
        ) : (
          <p>Ürün yükleniyor...</p>
        )}
        <div>
          <label>Teklif Miktarı:</label>
          <input
            type="number"
            value={bid.Amount}
            onChange={(e) => setBid({ ...bid, Amount: e.target.value * 1 })}
          />
        </div>
        <button
          className="bg-green-500 text-white px-5 py-3 rounded-md"
          onClick={placeBid}
        >
          Teklif Ver
        </button>
      </div>
    </div>
  );
}
