import { Role } from './models/role';
import { Orders } from './order';
export class User {
  id!: string;
  adresse: any;
  email!: string;
  fullname!: string;
  confirmed!: boolean;
  role!: Role;
  users_permissions_user!: string;
  created_at!: Date;
  orders!: Orders[];
}
