import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

async function connect(sql, values = []) {
  const conn = await mysql.createConnection({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: "user",
    connectionLimit: 5000,
    multipleStatements: false,
    charset: "utf8mb4",
  });

  conn.connect();
  const [data, fields] = await conn.execute(sql, values);
  conn.end();

  return data;
}

// 장바구니 조회 API
export async function GET(request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const sql = `
      SELECT id, productId, quantity, price, createdAt, updatedAt
      FROM CartItem
      WHERE userId = ?
    `;
    const cartItems = await connect(sql, [userId]);

    return NextResponse.json({ cartItems });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// 장바구니에 항목 추가하는 POST API
export async function POST(request) {
  try {
    const { userId, productId, quantity, price } = await request.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "User ID and Item ID are required" },
        { status: 400 }
      );
    }

    const sql = `
      INSERT INTO CartItem (userId, productId, quantity, price, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;
    await connect(sql, [userId, productId, quantity, price]);

    return NextResponse.json({ message: "Item added to cart" });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
