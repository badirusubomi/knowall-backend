import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {}

  getHello(): string {
    return 'Knowall Backend Server is running!!';
  }

  async refreshToken({ token }) {
    // not fully implemented. jwt.Verify needs secret passed
    try {
      const payload = await this.jwtService.verify(token);
      const signPayload = { id: payload.id, email: payload.email };
      const accessToken = await this.jwtService.sign(signPayload);
      // const newRefreshToken = await this.jwtService.sign(
      //   { id: payload.id, email: payload.email },
      //   { expiresIn: '15 days' },
      // );
      return {
        success: true,
        accessToken: accessToken,
        // refreshToken: newRefreshToken,
      };
    } catch {
      throw new UnauthorizedException(
        'Invalid access token. Must re-authenticate',
      );
    }
  }
}
