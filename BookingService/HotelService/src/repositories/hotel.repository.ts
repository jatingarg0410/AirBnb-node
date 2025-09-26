import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDTO } from "../dtos/hotel.dto";
import { updateHotelDTO } from "../dtos/updatehotel.dto";
import { NotFoundError } from "../utils/errors/app.error";

export async function createHotel(hotelData: createHotelDTO) {
  const hotel = await Hotel.create({
    name: hotelData.name,
    address: hotelData.address,
    location: hotelData.location,
    rating: hotelData.rating,
    ratingCount: hotelData.ratingCount,
  })

  logger.info(`Hotel created: ${hotel.id}`)

  return hotel
}

export async function getHotelById(id: number) {
  const hotel = await Hotel.findByPk(id)

  //if hotel is deleted it should not be found
  if (hotel && hotel.deletedAt) {
    logger.error(`Hotel not found: ${id}`)
    throw new NotFoundError(`Hotel with id ${id} not found`)
  }
  
  if (!hotel) {
    logger.error(`Hotel not found: ${id}`)
    throw new NotFoundError(`Hotel with id ${id} not found`)
  }

  logger.info(`Hotel found: ${hotel.id}`)

  return hotel
}

export async function getAllHotels() {
  const hotels = await Hotel.findAll({
    where: { deletedAt: null },
  })
if (!hotels) {
  logger.error(`Hotels not found`)
  throw new NotFoundError(`Hotels not found`)
}
  logger.info(`Hotels found: ${hotels.length}`)

  return hotels
}


export async function softDeleteHotel(id: number) {
  const hotel = await Hotel.findByPk(id)

  if (!hotel) {
    logger.error(`Hotel not found: ${id}`)
    throw new NotFoundError(`Hotel with id ${id} not found`)
  }

  hotel.deletedAt = new Date()
  await hotel.save() // Save the changes to the database
  logger.info(`Hotel soft deleted: ${hotel.id}`)
  return true
}

export async function updateHotel(id: number, hotelData:updateHotelDTO) {
  const hotel = await Hotel.findByPk(id)

  if (!hotel) {
    logger.error(`Hotel not found: ${id}`)
    throw new NotFoundError(`Hotel with id ${id} not found`)
  }
  // #it should not be deleted
  if(hotel.deletedAt){
    logger.error(`Hotel not found: ${id}`)
    throw new NotFoundError(`Hotel with id ${id} not found`)
  }
  if(hotelData.name){
    hotel.name = hotelData.name
  }
  if(hotelData.address){
    hotel.address = hotelData.address
  }
  if(hotelData.location){
    hotel.location = hotelData.location
  }
  if(hotelData.rating){
    hotel.rating = hotelData.rating
  }
  if(hotelData.ratingCount){
    hotel.ratingCount = hotelData.ratingCount
  }
  hotel.updatedAt = new Date()
  await hotel.save() // Save the changes to the database
  logger.info(`Hotel updated: ${hotel.id}`)
  return true
}