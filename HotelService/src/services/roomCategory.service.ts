import { CreateRoomCategoryDTO } from "../dtos/roomCategory.dto";
import { HotelRepository } from "../repositories/hotel.repository";
import RoomCategoryRepository from "../repositories/roomCategory.repository";

const hotelRepository = new HotelRepository()
const roomCategoryRepository = new RoomCategoryRepository()

export async function createRoomCategoryService(roomCategoryData: CreateRoomCategoryDTO) {
    
    const roomCategory = await roomCategoryRepository.create(roomCategoryData)
    return roomCategory
}

export async function getRoomCategoryByIdService(id: number) {
    const roomCategory = await roomCategoryRepository.findById(id)
    return roomCategory
}

export async function getAllRoomCategoriesByHotelIdService(hotelId: number) {
   const hotel = await hotelRepository.findById(hotelId)
   if(!hotel){
    throw new Error(`Hotel with id ${hotelId} not found`)
   }
    const roomCategories = await roomCategoryRepository.findAllByHotelId(hotelId)
    return roomCategories
}

export async function deleteRoomCategoryService(id: number) {
    const roomCategory = await roomCategoryRepository.findById(id)
    if(!roomCategory){
        throw new Error(`Room category with id ${id} not found`)
    }
    await roomCategoryRepository.delete({id});
    return true
}
