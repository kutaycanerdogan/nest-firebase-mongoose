import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import admin from 'src/main';
import {User} from './auth.model';
import {AuthService} from './auth.service';
import {Request} from 'express';
import {FirebaseAuthService} from 'src/middleware/firebase.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('createUser')
  public async createUser(
    @Req() req: Request,
    @Body() user: User,
  ): Promise<string> {
    return await this.authService.createUser(user);
  }

  @Get('users')
  public async getAllUsers(
    @Req() req: Request,
    @Body() user: User,
  ): Promise<admin.auth.ListUsersResult | BadRequestException> {
    return this.authService.getAllUsers();
  }
  @Get('getCurrentUser')
  public async getCurrentUser(
    @Req() req: Request,
    @Query() tokenParam,
  ): Promise<admin.auth.ListUsersResult | BadRequestException> {
    const {token} = tokenParam;
    return this.authService.getUser(token);
  }
  @Post('createToken')
  public async createToken(
    @Req() req: Request,
    @Body() token: string,
  ): Promise<any> {
    return this.authService.getUser(token);
  }
}
export class UserController {}
