import { MongoClient, ServerApiVersion,Db } from 'mongodb';



let cachedClient: MongoClient | null = null;
let cachedDB : Db | null = null;

export async function connectToDB(){
    

const username:any = process.env.MONGODB_USER;
const password:any = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@cluster0.1iblrle.mongodb.net/?appName=Cluster0`;


if (!username || !password) {
  throw new Error('Missing MONGODB_USER or MONGODB_PASSWORD. Add them to .env.local (or .env) and restart the dev server.');
}

if(cachedClient && cachedDB){
    return{client:cachedClient,db:cachedDB};
}


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
   
});
 await client.connect();

 cachedClient = client;
 cachedDB = client.db('ecommerce-fullstack');

 return {client:cachedClient,db:cachedDB};
 
}
