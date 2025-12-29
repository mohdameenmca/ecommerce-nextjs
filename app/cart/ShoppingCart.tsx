'use client'


import { useState,useEffect } from "react"
import { Product } from "../product-data"
import Link from "next/link"



export const dynamic = 'force-dynamic';

export default  function ShoppingCart({initialCartProducts}:{initialCartProducts:Product[]}) {
     const [cartProduct,setCartProducts] = useState(initialCartProducts)

    async function removeCart(productId:string) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/1/cart`, {
        method: 'DELETE',
        body: JSON.stringify({ productId }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      const updatedCart = await response.json();
      setCartProducts(updatedCart);
    } catch (err) {
      console.error('removeCart error', err);
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
        <div className="space-y-4">
          {cartProduct.map(product => (
            <Link
              key={product.id}
              href={"/product/" + product.id}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition group"
            >
              <div className="flex-1">
                <h2 className="text-lg font-medium text-gray-900">{product.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{product.price}</p>
              </div>
              <button
                className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={(e) => {
                  e.preventDefault()
                  removeCart(product.id)
                }}
              >
                Remove
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}