"use client";

import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

export default function Home({ params }) {
  const { id } = params;
  const [countdown, setCountdown] = useState(10);
  const [roomJoined, setRoomJoined] = useState(false);

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

  const placeBid = () => {
    // Auction ID boşsa, teklif verme fonksiyonu çağrılmamalı
    if (id) {
      socket.emit("placeBid", { auctionId: id });
    }
  };

  // Otomatik odaya katılma işlemi yapıldığında arayüz gösterilmeyebilir.
  if (!roomJoined) {
    return null;
  }

  return (
    <div className="flex h-full w-full min-h-screen justify-center items-center">
      <div className="w-1/4 text-2xl p-5 bg-gray-200 space-y-4">
        {" "}
        <h1>Açık Artırma</h1>
        <p>
          Kalan Süre:{" "}
          <p className="text-green-500 inline font-bold text-3xl">
            {countdown}{" "}
          </p>{" "}
          saniye
        </p>
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
