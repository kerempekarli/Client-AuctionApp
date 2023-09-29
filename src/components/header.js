"use client";

import React from "react";
import Link from "next/link";
function Index() {
  return (
    <div className="min-w-full flex bg-blue-900 text-white py-5 justify-center">
      <div className="flex space-x-10 text-2xl font-bold ">
        <Link href="/">Ana Sayfa</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/haberler">Haberler</Link>
      </div>
    </div>
  );
}

export default Index;
