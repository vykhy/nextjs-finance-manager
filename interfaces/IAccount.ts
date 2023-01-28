interface IAccount {
  id: number;
  name: string;
  userid: number;
  createdat?: string | Date;
  modifiedat?: string | Date;
}

export default IAccount;
