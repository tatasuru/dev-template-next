import { UserGender } from './user-gender.enum';

export interface User {
  id: number;
  name: string;
  phone_number: string;
  gender: UserGender;
  birth_date: string;
  createdAt: string;
  updatedAt: string;
}
