interface MysqlInsert {
  affectedRows: number;
  changedRows: number;
  fieldCount: number;
  message: string;
  insertId: number;
  protocol41: boolean;
  serverStatus: number;
  warningCount: number;
}

export default MysqlInsert;
