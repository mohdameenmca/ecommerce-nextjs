import {NextRequest} from "next/server";
// import {products} from "@/app/product-data"
import {connectToDB} from "@/app/api/db";


type Params={
    id:string;
}

// type ShoppingCart=Record<string,string[]>;

// const carts:ShoppingCart={
//     '1':['123','234'],
//     '2':['345','456'],
//     '3':['456']
// }

//Db connection and fetching cart products
export async function GET(request:NextRequest,{params}:{params:Promise<Params>}){
   
    const {id:userId} = await params;
     const {db} = await connectToDB();
    
    const userCart=await db.collection('carts').findOne({userId});
    if(!userCart){
        return new Response("Not Found",{   status:404 })
    }
    const cartIds=userCart.cartIds;
    const cartproducts = await db.collection('products').find({id:{$in:cartIds}}).toArray();

    return new Response(JSON.stringify(cartproducts),{
        status:200,
        headers:{
            'Content-Type':"application/json" 
        }
    }
    )
}

type cartBody={
    productId:string ;
}

export async function POST(request:NextRequest,{params}:{params:Promise<Params>}){
    const {id:userId} = await params;
    const body:cartBody = await request.json();
    const productId = body.productId;

    const {db} = await connectToDB();

    const UpdatedCart = await db.collection('carts').findOneAndUpdate(
        {userId},
        { $addToSet:{cartIds:productId}},
        {returnDocument:'after',upsert:true}
    )

    const cartproducts = await db.collection('products').find({id:{$in:UpdatedCart?.cartIds}}).toArray();
    return new Response(JSON.stringify(cartproducts),{
        status:201,
        headers:{
            'Content-Type':"application/json"  
        }
    })
}

export async function DELETE(request:NextRequest,{params}:{params:Promise<Params>}){
    const {db} = await connectToDB();
    const {id:userId} = await params;
    const body=await request.json();
    const productId=body.productId;
   const deletedCart = await db.collection('carts').findOneAndUpdate(
        {userId},
        {$pull:{cartIds:productId}},
        {returnDocument:'after'}
    )
    //Remain data store in carts
    const cartproducts = await db.collection('products').find({id:{$in:deletedCart?.cartIds}}).toArray();

    //Remove product from cart
    return new Response(JSON.stringify(cartproducts),{
        status:202,
        headers:{
            'Content-Type':"application/json"   }
    })
}