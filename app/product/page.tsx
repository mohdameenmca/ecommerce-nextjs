// import { products } from "../product-data";
import Productlist from "../Productlist";

export const dynamic = 'force-dynamic';
export default async function Product(){
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/product`);
    const products = await response.json();

    //Response from Shopping cart API
    const response2 = await fetch(`${baseUrl}/api/user/1/cart`);
    const cartProducts = await response2.json();

    return(
        <div className="">
        
            <h1 className="text-4xl font-bold mb-8">Products</h1>

            <Productlist products={products} initialCartProducts={cartProducts}/>
        </div>
    )
}