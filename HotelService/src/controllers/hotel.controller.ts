import { Request, Response, NextFunction } from 'express'
import {
  createHotelService,
  deleteHotelService,
  getAllHotelsService,
  getHotelByIdService,
  updateHotelService,
  searchHotelsService,
} from '../services/hotel.service'
import { StatusCodes } from 'http-status-codes'
import { HotelFilterDTO } from '../dtos/hotel.filter.dto'

export async function createHotelHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. Call the service layer

  const hotelResponse = await createHotelService(req.body)

  // 2. Send the response

  res.status(StatusCodes.CREATED).json({
    message: 'Hotel created successfully',
    data: hotelResponse,
    success: true,
  })
}

export async function getHotelByIdHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. Call the service layer

  const hotelResponse = await getHotelByIdService(Number(req.params.id))

  // 2. Send the response

  res.status(StatusCodes.OK).json({
    message: 'Hotel found successfully',
    data: hotelResponse,
    success: true,
  })
}

export async function getAllHotelsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. Call the service layer

  const hotelsResponse = await getAllHotelsService()

  // 2. Send the response
  res.status(StatusCodes.OK).json({
    message: 'Hotels found successfully',
    data: hotelsResponse,
    success: true,
  })
}

export async function searchHotelsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. Call the service layer
  const filters: HotelFilterDTO = {
    location: req.query.location as string,
    minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
    maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    page: req.query.page ? Number(req.query.page) : 1,
    limit: req.query.limit ? Number(req.query.limit) : 10,
  }

  const hotelsResponse = await searchHotelsService(filters)

  if (hotelsResponse.hotels.length === 0) {
    res.status(StatusCodes.OK).json({
      message: 'No hotels found with the given filters',
      data: hotelsResponse,
      success: true,
    })
    return
  }

  // 2. Send the response
  res.status(StatusCodes.OK).json({
    message: 'Hotels found successfully',
    data: hotelsResponse,
    success: true,
  })
}

export async function deleteHotelHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. Call the service layer

  const hotelsResponse = await deleteHotelService(Number(req.params.id))

  // 2. Send the response
  res.status(StatusCodes.OK).json({
    message: 'Hotels deleted successfully',
    data: hotelsResponse,
    success: true,
  })
}
export async function updateHotelHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. Call the service layer

  const hotelsResponse = await updateHotelService(Number(req.params.id), req.body)

  // 2. Send the response
  res.status(StatusCodes.OK).json({
    message: 'Hotels updated successfully',
    data: hotelsResponse,
    success: true,
  })
}