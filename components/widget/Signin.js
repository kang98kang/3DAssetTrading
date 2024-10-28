import { signIn, auth } from "@/auth";
import Button from "../common/Button";

export default async function SignIn(provider) {
  const session = await auth();
  if (!session) {
    return (
      <Button
        onClick={async () => await signIn(`${provider}`, { redirectTo: "/" })}
        width="360px"
        height="42px"
        label="Login"
        iconSrc="/icons/discord.png"
      />
    );
  }
}
