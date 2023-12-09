import Head from "next/head";
import { ReactNode } from "react";
import LoginForm from "../src/Main/Login/LoginForm";
import AuthContainer from "../src/components/Login/AuthContainer";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <AuthContainer
        page="login"
        title="Welcome back."
        subtitle="New Here?"
        linkPath="/signup"
        linkText="Sign Up"
      >
        <LoginForm />
      </AuthContainer>
    </>
  );
};

export default LoginPage;

LoginPage.getLayout = (page: ReactNode) => <>{page}</>;
