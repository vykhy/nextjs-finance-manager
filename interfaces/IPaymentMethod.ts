interface IPaymentMethod {
  id: number;
  name: string;
  userid: number;
  created_at?: string | Date;
  modified_at?: string | Date;
}

export default IPaymentMethod;
