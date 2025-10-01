import { CreateBookingDto } from "../dto/booking.dto";
import {confirmBooking, createBookings, createIdempotencyKey, finalizeIdempotencyKey, getIdempotencyKey} from "../repositories/booking.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";


export async function createBookingService(createBookingDto:CreateBookingDto) {
const booking = await createBookings({
   userId: createBookingDto.userId,
   hotelId: createBookingDto.hotelId,
   totalGuests: createBookingDto.totalGuests,
   BookingAmount: createBookingDto.BookingAmount
}
);
    const idempotencyKey=generateIdempotencyKey();
    await createIdempotencyKey(idempotencyKey,booking.id);

    return {
        bookingId:booking.id,
        idempotencyKey:idempotencyKey
    }

}
export async function confirmBookingService(idempotencyKey:string) {
    const idempotencyKeyData = await getIdempotencyKey(idempotencyKey);
if(!idempotencyKeyData){
    throw new NotFoundError("Idempotency key not found");
}

if(idempotencyKeyData.finalized){
    throw new BadRequestError("Idempotency key already finalized");
}


const booking=await confirmBooking(idempotencyKeyData.bookingId!);
await finalizeIdempotencyKey(idempotencyKey);

return booking;

}