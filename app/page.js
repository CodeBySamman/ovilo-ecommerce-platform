"use client";

import { getHome } from "./action/useraction";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [home, setHome] = useState(null);

    
   
  useEffect(() => {
    const loadHome = async () => {
      try {
        const data = await getHome();
        
        setHome(data);
      } catch (error) {
        console.log("HOME ERROR", error);
      }
    };

    loadHome();
  }, []);

  if (!home) return <div>Loading...</div>;

  return (
    <main className="bg-gray-50">
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div className="flex flex-col py-4">
          <h1 className="text-5xl font-bold">{home.title}</h1>
          <span className="text-indigo-600">{home.description}</span>

       <Link href={"/categories2"} 
className="mt-8 bg-indigo-600 text-white text-center px-8 py-3 rounded-full">
{home.buttonText}
</Link> 
   
        </div>

        <div>
          <img src={home.BannerImage} className="rounded-2xl w-full h-80" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-8">Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
            <Link href="/men" className="bg-white shadow rounded-xl p-8 text-center hover:scale-105 transition">
              <h1 className="text-xl font-semibold">Men</h1>
            </Link>

       <Link href="/women" className="bg-white shadow rounded-xl p-8 text-center hover:scale-105 transition">
              <h3 className="text-xl font-semibold">Women</h3>
            </Link>

            <Link href="/shoes" className="bg-white shadow rounded-xl p-8 text-center hover:scale-105 transition">
              <h3 className="text-xl font-semibold">Shoes</h3>
            </Link>

             <Link href="/accessories" className="bg-white shadow rounded-xl p-8 text-center hover:scale-105 transition">
              <h3 className="text-xl font-semibold">Accessories</h3>
            </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Featured Products</h2>

        <div className="grid md:grid-cols-4 gap-6 mt-5">
          {home.featuredProducts?.map((item) => (
            <div key={item._id} className="bg-white shadow rounded-xl p-4">
              <img src={item.images} className="h-40 w-full object-cover" />

              <h3 className=" text-lg">{item.name}</h3>

              <p className="font-bold"><span className="font-bold">$</span> 
                {item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
