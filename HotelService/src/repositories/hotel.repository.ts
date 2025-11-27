import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import Room from "../db/models/room";
import { NotFoundError } from "../utils/errors/app.error";
import BaseRepository from "./base.repository";
import { HotelFilterDTO } from "../dtos/hotel.filter.dto";
import { Op } from "sequelize";

export class HotelRepository extends BaseRepository<Hotel> {
  constructor() {
    super(Hotel)
  }

  async findAll() {
    const hotels = await this.model.findAll({
      where: {
        deletedAt: null,
      },
    })

    if (!hotels) {
      logger.error(`No hotels found`)
      throw new NotFoundError(`No hotels found`)
    }

    logger.info(`Hotels found: ${hotels.length}`)
    return hotels
  }

  async search(filters: HotelFilterDTO) {
    const { location, minPrice, maxPrice, page = 1, limit = 10 } = filters;
    const offset = (page - 1) * limit;

    const whereClause: any = {
      deletedAt: null,
    };

    if (location) {
      whereClause.location = {
        [Op.like]: `%${location}%`,
      };
    }

    const includeOptions: any[] = [];

    if (minPrice || maxPrice) {
      const priceWhere: any = {};
      if (minPrice) priceWhere[Op.gte] = minPrice;
      if (maxPrice) priceWhere[Op.lte] = maxPrice;

      includeOptions.push({
        model: Room,
        as: 'rooms', 
        where: {
          price: priceWhere,
        },
        required: true, 
        attributes: [], 
      });
    }

    const { count, rows } = await this.model.findAndCountAll({
      where: whereClause,
      include: includeOptions,
      limit: limit,
      offset: offset,
      distinct: true, 
    });

    if (!rows || rows.length === 0) {
       logger.info(`No hotels found with filters: ${JSON.stringify(filters)}`)
       return { hotels: [], total: 0, page, totalPages: 0 };
    }

    logger.info(`Hotels found: ${rows.length}`)
    return {
        hotels: rows,
        total: count,
        page,
        totalPages: Math.ceil(count / limit)
    };
  }

  async softDelete(id: number) {
    const hotel = await Hotel.findByPk(id)

    if (!hotel) {
      logger.error(`Hotel not found: ${id}`)
      throw new NotFoundError(`Hotel with id ${id} not found`)
    }

    hotel.deletedAt = new Date()
    await hotel.save() 
    logger.info(`Hotel soft deleted: ${hotel.id}`)
    return true
  }
}