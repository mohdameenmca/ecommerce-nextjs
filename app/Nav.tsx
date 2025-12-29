import Link from "next/link";

const Nav = () => {
  return (
    <nav className="bg-white shadow-md  p-4 flex space-x-4  justify-center   ">
        <Link href="/product">Product</Link>
       
        <Link href="/cart">Cart</Link>
         <Link href="/checkout">Check Out</Link>
    </nav>
  )
}

export default Nav