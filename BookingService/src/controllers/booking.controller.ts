import { Request, Response} from "express";
import { confirmBookingService, createBookingService} from "../services/booking.service";


export async function createBookingHandler(req: Request, res: Response) {

    const booking=await createBookingService(req.body);
    res.status(201).json({message:'Booking created successfully',data:booking,success:true});
}

export const confirmBookingHandler=async(req:Request,res:Response)=>{
    const booking=await confirmBookingService(req.params.idempotencyKey);
    res.status(200).json({message:'Booking confirmed successfully',data:booking,success:true});
}