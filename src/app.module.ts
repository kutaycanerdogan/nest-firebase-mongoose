import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from './authz/auth.module';
import {MenuModule} from './menu/menu.module';
import {AuthMiddleware} from './middleware/auth.middleware';
import {FirebaseAuthService} from './middleware/firebase.service';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [MenuModule, AuthModule, MongooseModule.forRoot(process.env.MONGO)],
  providers: [FirebaseAuthService],
  exports: [FirebaseAuthService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    consumer.apply(AuthMiddleware).exclude(
      {
        path: 'token',
        method: RequestMethod.ALL,
      },
      {
        path: 'auth',
        method: RequestMethod.ALL,
      },
    );
  }
}
