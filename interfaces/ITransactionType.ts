interface ITransactionType {
  id: number;
  type: string;
  created_at?: string | Date;
  modified_At?: string | Date;
}

export default ITransactionType;
