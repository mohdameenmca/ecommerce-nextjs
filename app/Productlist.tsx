'use client'

import { useState } from "react";

import Link from "next/link";
import { Product } from "./product-data"
import Image from "next/image"

const Productlist = ({products,initialCartProducts}:{products: Product[],initialCartProducts:Product[]}) => {

  const [cartProducts,setCartProducts] = useState(initialCartProducts)
  async function addCart(productId:string) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/1/cart`, {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      const updatedCart = await response.json();
      setCartProducts(updatedCart);
    } catch (err) {
      console.error('addCart error', err);
    }
  }

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

  function isInCart(productId:string){
    return cartProducts.some(cp=>cp.id === productId)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <Link
                key={product.id}
                href={"/product/" + product.id}
                className="block bg-white rounded-lg shadow-sm hover:shadow-md transition p-4"
              >
                <Image
                  className="w-full h-44 object-cover rounded"
                  src={"/" + product.imageUrl}
                  alt={product.name}
                  width={300}
                  height={176}
                />
                <h2 className="mt-3 text-lg font-semibold text-gray-900">{product.name}</h2>
                <p className="text-sm text-gray-600 mt-1">Price: {product.price}</p>

                {isInCart(product.id) ? (
                  <button
                    className="mt-3 inline-block px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={(e) => {
                      e.preventDefault()
                      removeCart(product.id)
                    }}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    className="mt-3 inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={(e) => {
                      e.preventDefault()
                      addCart(product.id)
                    }}
                  >
                    Add to cart
                  </button>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <h2 className="text-center text-gray-500">No data found</h2>
        )}
      </div>
    </div>
  )
}

export default Productlist;