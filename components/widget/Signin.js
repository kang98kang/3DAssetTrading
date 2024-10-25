import { signIn } from "next-auth/react";
import Button from "../common/Button";

export default function SignIn() {
  const handleSignIn = () => {
    signIn("discord");
  };

  return <Button onClick={handleSignIn} label="Sign in with Discord" />;
}
