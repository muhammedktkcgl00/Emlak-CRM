import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator"
import { ListingStatus, ListingType } from "@prisma/client"

export class UpdateListingDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsEnum(ListingType)
  type?: ListingType

  @IsOptional()
  @IsEnum(ListingStatus)
  status?: ListingStatus

  @IsOptional()
  @IsInt()
  @Min(0)
  price?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  areaM2?: number

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  city?: string

  @IsOptional()
  @IsString()
  district?: string

  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsString()
  // bazen null temizlemek isteyebiliriz; şimdilik string
  // null göndermek istersen DTO’yu farklı ele alırız
  addressClear?: string
}
