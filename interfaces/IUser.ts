interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  created_at?: string | Date;
  modified_at?: string | Date;
}

export default IUser;
