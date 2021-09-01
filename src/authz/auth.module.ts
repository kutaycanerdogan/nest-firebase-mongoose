import {Module} from '@nestjs/common';
import {FirebaseAuthService} from 'src/middleware/firebase.service';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {TokenController} from './token.controller';

@Module({
  controllers: [AuthController, TokenController],
  providers: [AuthService, FirebaseAuthService],
})
export class AuthModule {}
