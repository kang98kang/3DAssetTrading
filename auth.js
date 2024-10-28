import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
});
