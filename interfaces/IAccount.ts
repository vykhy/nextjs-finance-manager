interface IAccount {
  id: number;
  name: string;
  project_id: number;
  balance: number;
  createdat?: string | Date;
  modifiedat?: string | Date;
}

export default IAccount;
