import {z} from 'zod'
export const bookingSchema=z.object({
    userId:z.number({message:"userId is required"}),
    hotelId:z.number({message:"hotelId is required"}),
    totalGuests:z.number({message:"totalGuests is required"}).min(1,{message:"totalGuests must be greater than 0"}),
    BookingAmount:z.number({message:"BookingAmount is required"}).min(1,{message:"BookingAmount must be greater than 1"})

})