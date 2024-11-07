import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export const runtime = "edge";

async function connect(sql, values = []) {
  const conn = await mysql.createConnection({
    user: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    host: `${process.env.DB_HOST}`,
    port: `${process.env.DB_PORT}`,
    database: "asset",
    connectionLimit: 5000,
    multipleStatements: false,
    charset: "utf8mb4",
  });

  conn.connect();
  const [data, fields] = await conn.execute(sql, values);
  conn.end();

  return data;
}

export async function GET(request, { params }) {
  const id = params.id;
  let data = await connect(`select * from asset where id like ?`, [`%${id}%`]);

  return NextResponse.json(data[0]);
}
