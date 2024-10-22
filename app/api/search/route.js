import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { disassemble } from "es-hangul";

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

export async function POST(request) {
  try {
    const reqBody = await request.json();
    let { name, program, priceMin, priceMax, isAnimated } = reqBody;

    // Disassemble the name if provided
    if (name) {
      name = disassemble(name);
    }

    // Construct the SQL query dynamically
    let sql = `SELECT a.id, a.extension, a.price, a.file FROM asset a WHERE 1=1`;
    let params = [];

    if (name) {
      sql += ` AND a.file LIKE ?`;
      params.push(`%${name}%`);
    }

    if (program && program.length > 0) {
      sql += ` AND (`;
      program.forEach((prog, index) => {
        if (index > 0) sql += ` OR`;
        sql += ` JSON_CONTAINS(a.extension, ?)`;
        params.push(`"${prog}"`);
      });
      sql += ` )`;
    }

    if (priceMin != null) {
      sql += ` AND a.price >= ?`;
      params.push(priceMin);
    }

    if (priceMax != null) {
      sql += ` AND a.price <= ?`;
      params.push(priceMax);
    }

    if (isAnimated != null) {
      sql += ` AND a.isAnimated = ?`;
      params.push(isAnimated ? 1 : 0);
    }

    sql += ` ORDER BY a.id ASC`;

    let data = await connect(sql, params);

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
