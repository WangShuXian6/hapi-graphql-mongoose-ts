//import { Role } from "../interface/role";

export interface User {
  _id: number;
  name?: string;
  //roles: Role[];
  roles: string[];
}
