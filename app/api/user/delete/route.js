import { prisma } from "@/prisma/prisma";
import { auth } from "@/auth";
import fetch from "node-fetch";

export const runtime = "edge";

export async function DELETE(req) {
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const userId = session.user.id;

    const googleAccount = await prisma.account.findFirst({
      where: { userId, provider: "google" },
    });

    if (googleAccount) {
      const googleAccessToken = googleAccount.access_token;

      await fetch(
        `https://accounts.google.com/o/oauth2/revoke?token=${googleAccessToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    }

    await prisma.session.deleteMany({ where: { userId } });
    await prisma.account.deleteMany({ where: { userId } });
    await prisma.user.delete({ where: { id: userId } });

    return new Response(
      JSON.stringify({ message: "User deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
