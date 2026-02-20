import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwt: JwtService, private config: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()

    const auth = req.headers["authorization"]
    if (!auth) throw new UnauthorizedException("Token gerekli")

    const [type, token] = auth.split(" ")
    if (type !== "Bearer" || !token) throw new UnauthorizedException("Token formatı hatalı")

    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: this.config.get<string>("JWT_ACCESS_SECRET") || "access_secret_dev",
      })
      req.user = payload
      return true
    } catch (e) {
      throw new UnauthorizedException("Token geçersiz")
    }
  }
}
