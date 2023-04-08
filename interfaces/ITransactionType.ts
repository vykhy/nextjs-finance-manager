interface ITransactionType {
  id: number;
  name: string;
  created_at?: string | Date;
  modified_At?: string | Date;
}

export default ITransactionType;
