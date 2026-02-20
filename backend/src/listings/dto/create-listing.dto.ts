import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator"
import { ListingStatus, ListingType } from "@prisma/client"

// ✅ listings-query.dto.ts bunları buradan import ettiği için export ediyoruz
export { ListingStatus, ListingType }

export class CreateListingDto {
  @IsString()
  title: string

  @IsEnum(ListingType)
  type: ListingType

  @IsEnum(ListingStatus)
  @IsOptional()
  status?: ListingStatus

  @IsInt()
  @Min(0)
  price: number

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
}
