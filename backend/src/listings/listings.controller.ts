import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "../auth/guards/jwt.guard"
import { CreateListingDto } from "./dto/create-listing.dto"
import { UpdateListingDto } from "./dto/update-listing.dto"
import { ListingsQueryDto } from "./dto/listings-query.dto"
import { ListingsService } from "./listings.service"

@ApiTags("Listings")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("listings")
export class ListingsController {
  constructor(private listings: ListingsService) {}

  @Post()
  create(@Req() req: any, @Body() body: CreateListingDto) {
    return this.listings.create(req.user.officeId, body)
  }

  @Get()
  findAll(@Req() req: any, @Query() query: ListingsQueryDto) {
    return this.listings.findAll(req.user.officeId, query)
  }

  @Get(":id")
  findOne(@Req() req: any, @Param("id") id: string) {
    return this.listings.findOne(req.user.officeId, id)
  }

  @Put(":id")
  update(@Req() req: any, @Param("id") id: string, @Body() body: UpdateListingDto) {
    return this.listings.update(req.user.officeId, id, body)
  }

  @Delete(":id")
  remove(@Req() req: any, @Param("id") id: string) {
    return this.listings.remove(req.user.officeId, id)
  }
}
