import {TODO} from "./todo";
import {User} from "./User";

export interface DialogDataCreate {
  user: User;
  title: string;
  admin: string;
}
export interface DialogData{
  todo: TODO;
}
