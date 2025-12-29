    
// import { products } from "@/app/product-data";
import {connectToDB} from "@/app/api/db";
import {NextRequest} from "next/server"


type Params = {
    id: string;
}



export async function GET(request:NextRequest,{params}:{params:Promise<Params>}){

    const {id:productID} = await params;
    const {db} = await connectToDB();
    const product = await db.collection('products').findOne({id:productID});

    if(!product){
        return new Response("Not Found",{   status:404 })
    }

    return new Response(JSON.stringify(product),{
        status:200,
        headers:{
            'Content-Type':"application/json"
        }
    })
}