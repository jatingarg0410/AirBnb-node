import { Prisma } from "@prisma/client";
import prismaClient from "../prisma/client";

export async function createBookings(bookingInput: Prisma.BookingCreateInput) {
const booking = await prismaClient.booking.create({
    data: bookingInput,
 });
return booking;
}

 // TODO: implement thiss
