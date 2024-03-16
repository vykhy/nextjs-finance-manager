const mysql = require("mysql");
const fs = require("fs");

const getDb = () => {
  const connection = mysql.createConnection({
    host: "db-host",
    user: "db-user",
    password: "user-pw",
    database: "db",
  });
  return connection;
};

const queries = [];
const tables = [
  "user",
  "project",
  "transaction_type",
  "account",
  "category",
  "payment_method",
  "transaction",
  "transfer",
];

async function getData() {
  for (const table of tables) {
    extractQueries(table);
  }
  fs.writeFileSync("queries.json", JSON.stringify(queries));
}

function extractQueries(dataKey) {
  const result = JSON.parse(fs.readFileSync("data.json"))[
    dataKey == "category" ? "categories" : dataKey + "s"
  ];

  for (const record of result) {
    let QUERY = `INSERT INTO ${dataKey}(`;
    let DATA = ") VALUES(";
    for (const [key, value] of Object.entries(record)) {
      QUERY += `${key}` + ",";
      DATA +=
        `"${
          value && typeof value === "string" ? value.replace(/"/g, "") : value
        }"` + ",";
    }
    queries.push(
      QUERY.substring(0, QUERY.length - 1) +
        DATA.substring(0, DATA.length - 1) +
        ");"
    );
  }
}

// getData();

async function saveData() {
  const queries = JSON.parse(fs.readFileSync("queries.json"));

  const db = getDb();

  try {
    for (const query of queries) {
      db.query(query);
    }
  } catch (error) {
    console.log(error.message);
  }
}

// saveData();
