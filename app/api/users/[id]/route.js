import { NextResponse } from "next/server";
import { DBConnection } from "../../../utils/config/db";
import UserModel from "../../../utils/models/User";
import BookingModel from "../../../utils/models/Booking";

export async function GET(request,{params}){
    await DBConnection()

    const {id} = await params

    console.log("dynamic id",id)

    try {
        if(!id){
         return NextResponse.json({success:false,message:"no user found"},{status:404})
    }
    const user = await UserModel .findById(id).populate('bookings')
    return NextResponse.json({success:true,user},{status:200})
   } catch (error) {
    console.log(error)
    return NextResponse.json({success:false,message:"ID is missing"},{status:500})
   }
}


export async function DELETE(request, { params }) {
    await DBConnection();

    const { id } = params;  

    try {
        if (!id) {
            return NextResponse.json({ success: false, message: "ID is missing" });
        }

        const booking = await BookingModel.findByIdAndDelete(id);

        if (!booking) {
            return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Booking deleted successfully" });

    } catch (error) {
        console.error('Error deleting booking:', error);
        return NextResponse.json({ success: false, message: "Server error", error: error.message }, { status: 500 });
    }
}
