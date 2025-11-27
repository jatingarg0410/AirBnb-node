import { createHotelDTO } from '../dtos/hotel.dto'
import { HotelRepository } from '../repositories/hotel.repository'
import { HotelFilterDTO } from '../dtos/hotel.filter.dto'

const hotelRepository = new HotelRepository()

export async function createHotelService(hotelData: createHotelDTO) {
  const hotel = await hotelRepository.create(hotelData)
  return hotel
}

export async function getHotelByIdService(id: number) {
  const hotel = await hotelRepository.findById(id)
  return hotel
}

export async function getAllHotelsService() {
  const hotels = await hotelRepository.findAll()
  return hotels
}

export async function searchHotelsService(filters: HotelFilterDTO) {
  const hotels = await hotelRepository.search(filters)
  return hotels
}

export async function deleteHotelService(id: number) {
  const response = await hotelRepository.softDelete(id)
  return response
}

export async function updateHotelService(id: number, hotelData:createHotelDTO) {
  const response = await hotelRepository.update(id,hotelData)
  return response
}