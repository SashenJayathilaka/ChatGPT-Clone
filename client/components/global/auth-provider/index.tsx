import { formFields } from "@/components/data/columns";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import React from "react";

type Props = {
  children: React.ReactNode;
};

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_CLIENT_ID!,
    },
  },
});

function AuthProvider({ children }: Props) {
  return (
    <div>
      <Authenticator formFields={formFields}>
        {({ user }: any) =>
          user ? (
            <div>{children}</div>
          ) : (
            <div>
              <h1>Please Sign In Below</h1>
            </div>
          )
        }
      </Authenticator>
    </div>
  );
}

export default AuthProvider;
