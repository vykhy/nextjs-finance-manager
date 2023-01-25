interface MysqlInsert {
  affectedRows: Number;
  changedRows: Number;
  fieldCount: Number;
  message: String;
  insertId: Number;
  protocol41: Boolean;
  serverStatus: Number;
  warningCount: Number;
}

export default MysqlInsert;
