
import ShoppingCart from "./ShoppingCart"

export const dynamic = 'force-dynamic';

export default async function cartpage() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/1/cart`,{
        cache:'no-store'
    });
    const cartProducts = await response.json();
    return(
        <ShoppingCart initialCartProducts={cartProducts}/>
    )

}
 

