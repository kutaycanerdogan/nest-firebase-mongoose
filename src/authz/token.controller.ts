import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Req,
} from '@nestjs/common';
import {Request} from 'express';
import {FirebaseAuthService} from 'src/middleware/firebase.service';
import * as CONSTANT from '../constants.api';
@Controller('token')
export class TokenController {
  constructor(private readonly firebaseAuthService: FirebaseAuthService) {}
  @Get('authenticate')
  public async authenticate(@Req() req: Request): Promise<any> {
    const authToken = req.headers.authorization;
    if (!authToken) {
      return new BadRequestException(CONSTANT.MISSING_AUTH_HEADER);
    }
    try {
      const {uid, email, role} = await this.firebaseAuthService.authenticate(
        authToken,
      );
      return {uid, email, role, status: HttpStatus.OK};
    } catch (error) {
      return new BadRequestException(error.errorInfo.message);
    }
  }
}
