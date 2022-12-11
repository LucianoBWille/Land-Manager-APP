export class User {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
}

export interface SingleUserResponse {
  data: User;
}

export class UserListResponse {
  data!: User[];
}
