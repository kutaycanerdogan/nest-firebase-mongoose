import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MenuController} from './menu.controller';
import {MenuSchema} from './menu.model';
import {MenuService} from './menu.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Menu', schema: MenuSchema}])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
