import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {RolesGuard} from 'src/middleware/auth.guard';
import {RoleEnum, Roles} from 'src/middleware/role.decorator';
import {MenuService} from './menu.service';
import {Request} from 'express';
import {Menu} from './menu.model';
@Controller('menu')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
@UseGuards(RolesGuard)
export class MenuController {
  constructor(private menuService: MenuService) {}
  @Roles(RoleEnum.USER)
  @Get('getAll')
  async getMenus(@Req() req: Request) {
    return await this.menuService.getMenus();
  }
  @Roles(RoleEnum.ADMIN)
  @Get('getAllForAdmin')
  async getAllForAdmin(@Req() req: Request) {
    return await this.menuService.getMenus();
  }
  @Roles(RoleEnum.USER)
  @Get(':id')
  async getMenuById(@Param('id') id: string) {
    return await this.menuService.getMenuById(id);
  }

  @Roles(RoleEnum.USER)
  @Post('createMenu')
  async createMenu(@Body() menu: Menu) {
    const result = await this.menuService.createMenu(menu);
    return result;
  }
  @Roles(RoleEnum.USER)
  @Put('updateMenu')
  async updateMenu(@Body() menu: Menu) {
    const result = await this.menuService.updateMenu(menu);
    return result;
  }
  @Roles(RoleEnum.USER)
  @Put('deleteMenu')
  async deleteMenu(@Body() menu: Menu) {
    const result = await this.menuService.deleteMenu(menu);
    return result;
  }
  @Roles(RoleEnum.USER)
  @Delete(':id')
  async deleteMenuById(@Param('id') id: string) {
    return await this.menuService.deleteMenuById(id);
  }
}
