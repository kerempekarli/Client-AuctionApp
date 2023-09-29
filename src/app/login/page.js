"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice"; // userSlice aksiyonunu ekleyin
function LoginPage() {
  const [username, setUsername] = useState("kerempekarli");
  const [password, setPassword] = useState("123123");
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Gönderilen verinin türünü belirtin
      },
      body: JSON.stringify({
        // Kullanıcı adı ve şifreyi JSON formatına dönüştürün
        Username: username,
        Password: password,
      }),
    });

    if (response.ok) {
      // Başarılı giriş durumu
      console.log("Giriş başarılı");
      const data = await response.json();
      dispatch(setUser(data.user));
      console.log("DATA ", data.user);
      router.push("/");

      // İstediğiniz yönlendirmeyi veya işlemi yapabilirsiniz
    } else {
      // Hata durumu
      console.error("Giriş başarısız");
      // Hata mesajını işleyebilir veya kullanıcıya bildirebilirsiniz
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen h-full bg-blue-50">
      <div className="bg-red-300 p-20 rounded-2xl text-black font-semibold">
        {" "}
        <h1 className="text-3xl mb-10">LOGIN YOUR ACCOUNT</h1>
        <form className="text-2xl block " onSubmit={handleLogin}>
          <div className="flex justify-between space-x-4 items-center mt-5">
            <label>Kullanıcı Adı:</label>
            <input
              className="px-2 py-1 outline-none rounded-md"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex justify-between space-x-4 items-center mt-5">
            <label>Şifre:</label>
            <input
              className="px-2 py-1 outline-none rounded-md"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="mx-auto block px-5 py-3 rounded-md text-white mt-5 hover:bg-red-500  bg-green-500"
            type="submit"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
