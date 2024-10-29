import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../app/store/userSlice";

export const useAuth = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session?.user) {
      dispatch(setUser(session.user));
    } else {
      dispatch(clearUser());
    }
  }, [session, dispatch]);

  return { session, signIn, signOut };
};
