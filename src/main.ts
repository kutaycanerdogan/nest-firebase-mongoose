import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import {NestApplicationOptions, RequestMethod} from '@nestjs/common';
async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    } as Partial<admin.ServiceAccount>),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
    exclude: [
      {path: 'token/authenticate', method: RequestMethod.ALL},
      {path: 'auth', method: RequestMethod.ALL},
    ],
  });
  await app.listen(process.env.PORT);
}
export default admin;
bootstrap();
