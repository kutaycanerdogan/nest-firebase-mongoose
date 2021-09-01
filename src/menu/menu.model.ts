import * as mongoose from 'mongoose';
export const MenuSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
});
export interface Menu extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
}
