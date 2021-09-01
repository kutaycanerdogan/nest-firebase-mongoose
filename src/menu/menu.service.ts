import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Menu} from './menu.model';

@Injectable()
export class MenuService {
  constructor(@InjectModel('Menu') private readonly menuModel: Model<Menu>) {}
  public async getMenus() {
    const menus = await this.menuModel.find().exec();
    return menus.map(menu => ({
      id: menu.id,
      title: menu.title,
      description: menu.description,
      price: menu.price,
    })) as Menu[];
  }
  public async getMenuById(id: string) {
    let menu: Menu | null;
    try {
      menu = await this.menuModel.findById(id);
    } catch (error) {
      throw new NotFoundException("Couldn't find menu.");
    }
    if (!menu) {
      throw new NotFoundException("Couldn't find menu.");
    }
    return menu;
  }
  public async createMenu(menu) {
    const {title, description, price} = menu;
    const newMenu = new this.menuModel({title, description, price});
    const result = await newMenu.save();
    return result as Menu;
  }
  public async updateMenu(menu) {
    const {id, title, description, price} = menu;
    const updatedMenu = await this.getMenuById(id);
    if (title) {
      updatedMenu.title = title;
    }
    if (description) {
      updatedMenu.description = description;
    }
    if (price) {
      updatedMenu.price = price;
    }
    updatedMenu.save();
    return updatedMenu;
  }
  public async deleteMenuById(id: string) {
    const result = await this.menuModel.deleteOne({_id: id}).exec();
    if (result.n === 0) {
      throw new NotFoundException("Couldn't find menu.");
    }
  }
  public async deleteMenu(menu: Menu) {
    const result = await this.menuModel.deleteOne({_id: menu.id}).exec();
    if (result.n === 0) {
      throw new NotFoundException("Couldn't find menu.");
    }
  }
}
