import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import admin from 'src/main';
import * as CONSTANT from '../constants.api';
@Injectable()
export class FirebaseAuthService {
  constructor() {}

  private getToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      return null;
    }
    return match[1];
  }
  public async authenticate(authToken: string): Promise<any> {
    const tokenString = this.getToken(authToken);
    if (tokenString === null) {
      return new BadRequestException(CONSTANT.INVALID_BEARER_TOKEN);
    }
    try {
      const decodedToken: admin.auth.DecodedIdToken = await admin
        .auth()
        .verifyIdToken(tokenString);
      const {email, uid, role} = decodedToken;
      return {email, uid, role};
    } catch (error) {
      return new BadRequestException(error.errorInfo.message);
    }
  }
}
