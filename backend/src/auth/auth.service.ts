import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import * as bcrypt from "bcrypt"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) throw new UnauthorizedException("Email veya şifre hatalı")

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) throw new UnauthorizedException("Email veya şifre hatalı")

    const accessToken = await this.jwt.signAsync(
      { sub: user.id, officeId: user.officeId, role: user.role },
      {
        secret: this.config.get<string>("JWT_ACCESS_SECRET"),
        expiresIn: "15m",
      }
    )

    const refreshToken = await this.jwt.signAsync(
      { sub: user.id },
      {
        secret: this.config.get<string>("JWT_REFRESH_SECRET"),
        expiresIn: "7d",
      }
    )

    const refreshHash = await bcrypt.hash(refreshToken, 10)
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshTokenHash: refreshHash },
    })

    return { accessToken, refreshToken }
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException("Refresh token geçersiz")
    }

    const ok = await bcrypt.compare(refreshToken, user.refreshTokenHash)
    if (!ok) throw new UnauthorizedException("Refresh token geçersiz")

    const accessToken = await this.jwt.signAsync(
      { sub: user.id, officeId: user.officeId, role: user.role },
      {
        secret: this.config.get<string>("JWT_ACCESS_SECRET"),
        expiresIn: "15m",
      }
    )

    return { accessToken }
  }
}
