import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

async function connect(sql, values = []) {
  const conn = await mysql.createConnection({
    user: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    host: `${process.env.DB_HOST}`,
    port: `${process.env.DB_PORT}`,
    database: "user", // user 데이터베이스에 연결
    connectionLimit: 5000,
    multipleStatements: false,
    charset: "utf8mb4",
  });

  conn.connect();
  const [data, fields] = await conn.execute(sql, values);
  conn.end();

  return data;
}

// 유저 정보 조회 API
export async function GET(request) {
  const url = new URL(request.url);
  const endpoint = url.pathname.split("/").pop(); // API endpoint 결정

  try {
    const userId = url.searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (endpoint === "user") {
      // 유저 정보 가져오기
      const userSql = `
        SELECT id, name, email, createdAt, updatedAt
        FROM User
        WHERE id = ?
      `;
      const userData = await connect(userSql, [userId]);

      if (userData.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({ user: userData[0] });
    } else if (endpoint === "cart") {
      // 장바구니와 관련된 item 정보 가져오기
      const cartSql = `
        SELECT c.id AS cartId, ci.productId, ci.quantity, ci.price
        FROM Cart c
        JOIN CartItem ci ON c.id = ci.cartId
        WHERE c.userId = ?
      `;
      const cartItems = await connect(cartSql, [userId]);

      return NextResponse.json({ cartItems });
    }
  } catch (error) {
    console.error("Error in GET request:", error);
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
        { error: "User ID and Product ID are required" },
        { status: 400 }
      );
    }

    // CartItem 추가 쿼리
    const sql = `
      INSERT INTO CartItem (cartId, productId, quantity, price)
      VALUES ((SELECT id FROM Cart WHERE userId = ?), ?, ?, ?)
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
