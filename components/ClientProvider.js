"use client";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "../app/store";

const ClientProvider = ({ children }) => {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
};

export default ClientProvider;
