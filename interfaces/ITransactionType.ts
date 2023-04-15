interface ITransactionType {
  id: number;
  name: string;
  is_negative: boolean;
  created_at?: string | Date;
  modified_At?: string | Date;
}

export default ITransactionType;
