import { NextResponse } from "next/server";

import ProductModel from "@/app/utils/models/Product";
import { DBConnection } from "../../../../utils/config/db";



export async function GET(request,{params}){
    await DBConnection()

    const{id} = await params
     console.log("dynamic id",id)

     try {
      if(!id){
        return NextResponse.json({success:false,message:"no product found"},{status:404})
      }
        const product = await ProductModel.findById(id)
       return NextResponse.json({success:true,product},{status:200})
   } catch (error) {
    console.log(error)
    return NextResponse.json({success:false,message:"ID is missing"},{status:500})
   }
}
