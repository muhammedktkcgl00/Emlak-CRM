import { IsEnum, IsNumberString, IsOptional, IsString } from "class-validator"
import { ListingStatus, ListingType } from "./create-listing.dto"

export class ListingsQueryDto {
  @IsOptional()
  @IsEnum(ListingType)
  type?: ListingType

  @IsOptional()
  @IsEnum(ListingStatus)
  status?: ListingStatus

  @IsOptional()
  @IsString()
  city?: string

  @IsOptional()
  @IsString()
  district?: string

  // arama metni (title/description/address/city/district içinde arayacağız)
  @IsOptional()
  @IsString()
  search?: string

  // sayısal filtreler query string olarak gelir, biz serviste Number(...) yapıyoruz
  @IsOptional()
  @IsNumberString()
  minPrice?: string

  @IsOptional()
  @IsNumberString()
  maxPrice?: string

  @IsOptional()
  @IsNumberString()
  minArea?: string

  @IsOptional()
  @IsNumberString()
  maxArea?: string
}
