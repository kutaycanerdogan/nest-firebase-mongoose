import {BadRequestException, Injectable} from '@nestjs/common';
import admin from 'src/main';
import {User} from './auth.model';
@Injectable()
export class AuthService {
  constructor() {}
  public async createUser(user: User): Promise<any> {
    const {displayName, password, email} = user;
    let role = 'user';
    try {
      const {uid} = await admin.auth().createUser({
        displayName,
        password,
        email,
      });
      await admin.auth().setCustomUserClaims(uid, {role});
      return uid;
    } catch (error) {
      return new BadRequestException(error.errorInfo.message);
    }
  }
  public async getUser(tokenString: string): Promise<any> {
    try {
      let claims;
      claims = await admin.auth().getUser(tokenString);
      return claims;
    } catch (error) {
      return new BadRequestException(error.errorInfo.message);
    }
  }

  public async getAllUsers(): Promise<
    admin.auth.ListUsersResult | BadRequestException
  > {
    try {
      const users = await admin.auth().listUsers();
      return users;
    } catch (error) {
      return new BadRequestException(error.errorInfo.message);
    }
  }
}
