import React from "react";

import { useAuth } from "../hooks/useAuth";
import { redirect } from "react-router";

const  withAuth= <P extends object>(Component: React.ComponentType<P>)=> {
  return function AuthComponent(props: P) {
    const { user} = useAuth();

  
    if (!user) {
      return redirect('/login')
    }

    return <Component {...props} />;
  };
}

export default withAuth;
