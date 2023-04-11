interface IMysqlUpdate {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol141: boolean;
  changedRows: number;
}

export default IMysqlUpdate;
