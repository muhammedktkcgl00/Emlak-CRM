import { Body, Controller, Post, Get, Req, UseGuards } from "@nestjs/common"
import { ApiBody, ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { JwtAuthGuard } from "./guards/jwt.guard"


@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("login")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string", example: "admin@demo.com" },
        password: { type: "string", example: "admin123" },
      },
      required: ["email", "password"],
    },
  })
  login(@Body() body: { email: string; password: string }) {
    return this.auth.login(body.email, body.password)
  }

  @Post("refresh")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        userId: { type: "string", example: "USER_ID" },
        refreshToken: { type: "string", example: "REFRESH_TOKEN" },
      },
      required: ["userId", "refreshToken"],
    },
  })
  refresh(@Body() body: { userId: string; refreshToken: string }) {
    return this.auth.refresh(body.userId, body.refreshToken)
  }

  @Get("me")
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  me(@Req() req: any) {
    return req.user
  }
}
