
import { DBConnection } from './../../utils/config/db';
import { NextResponse } from 'next/server';
import UserModel from './../../utils/models/User';
export async function GET(){
    await DBConnection()
   try {
    const users = await UserModel.find({role:{$ne:'admin'}},{password:0})
    if(!users){
        return NextResponse.json({success:false,message:"no users"},{status:404})
    }
     return NextResponse.json({success:true,users},{status:200})
   } catch (error) {
    console.log(error)
    return NextResponse.json({success:false,message:"failed to get users"},{status:500})
   }
}