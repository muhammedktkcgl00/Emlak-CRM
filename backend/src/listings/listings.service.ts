import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateListingDto } from "./dto/create-listing.dto"
import { UpdateListingDto } from "./dto/update-listing.dto"
import { ListingsQueryDto } from "./dto/listings-query.dto"

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async create(officeId: string, dto: CreateListingDto) {
  return this.prisma.listing.create({
    data: {
      officeId,
      title: dto.title,
      type: dto.type,

      // ✅ status ekle (gelmezse default ver)
      status: dto.status ?? "DRAFT",

      price: dto.price,

      // ✅ areaM2 zorunluysa default ver, değilse böyle kalabilir
      areaM2: dto.areaM2 ?? null,

      description: dto.description ?? null,
      city: dto.city ?? null,
      district: dto.district ?? null,
      address: dto.address ?? null,
    },
  })
}


  async findAll(officeId: string, query: ListingsQueryDto) {
    const where: any = { officeId }

    if (query.type) where.type = query.type
    if (query.status) where.status = query.status
    if (query.city) where.city = query.city
    if (query.district) where.district = query.district

    // numeric filters
    const minPrice = query.minPrice ? Number(query.minPrice) : undefined
    const maxPrice = query.maxPrice ? Number(query.maxPrice) : undefined
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {}
      if (minPrice !== undefined && !Number.isNaN(minPrice)) where.price.gte = minPrice
      if (maxPrice !== undefined && !Number.isNaN(maxPrice)) where.price.lte = maxPrice
    }

    const minArea = query.minArea ? Number(query.minArea) : undefined
    const maxArea = query.maxArea ? Number(query.maxArea) : undefined
    if (minArea !== undefined || maxArea !== undefined) {
      where.areaM2 = {}
      if (minArea !== undefined && !Number.isNaN(minArea)) where.areaM2.gte = minArea
      if (maxArea !== undefined && !Number.isNaN(maxArea)) where.areaM2.lte = maxArea
    }

    // search (contains)
    if (query.search && query.search.trim() !== "") {
      const s = query.search.trim()
      where.OR = [
        { title: { contains: s, mode: "insensitive" } },
        { description: { contains: s, mode: "insensitive" } },
        { address: { contains: s, mode: "insensitive" } },
        { city: { contains: s, mode: "insensitive" } },
        { district: { contains: s, mode: "insensitive" } },
      ]
    }

    return this.prisma.listing.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })
  }

  async findOne(officeId: string, id: string) {
    const listing = await this.prisma.listing.findFirst({
      where: { id, officeId },
    })

    if (!listing) throw new NotFoundException("İlan bulunamadı")
    return listing
  }

 async update(officeId: string, id: string, dto: UpdateListingDto) {
  await this.findOne(officeId, id)

  const data: any = {}

  if (dto.title !== undefined) data.title = dto.title
  if (dto.type !== undefined) data.type = dto.type
  if (dto.status !== undefined) data.status = dto.status
  if (dto.price !== undefined) data.price = dto.price
  if (dto.areaM2 !== undefined) data.areaM2 = dto.areaM2
  if (dto.description !== undefined) data.description = dto.description
  if (dto.city !== undefined) data.city = dto.city
  if (dto.district !== undefined) data.district = dto.district
  if (dto.address !== undefined) data.address = dto.address

  return this.prisma.listing.update({
    where: { id },
    data,
  })
}

  async remove(officeId: string, id: string) {
    // önce var mı + aynı ofise mi ait kontrolü
    await this.findOne(officeId, id)

    await this.prisma.listing.delete({
      where: { id },
    })

    return { ok: true, message: "İlan silindi" }
  }
}
