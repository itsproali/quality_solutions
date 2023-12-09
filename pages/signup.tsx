import Head from "next/head";
import { ReactNode } from "react";
import SignUpForm from "../src/Main/Login/SignUpForm";
import AuthContainer from "../src/components/Login/AuthContainer";

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <AuthContainer
        page="signup"
        title="Create Account"
        subtitle="Already have an account?"
        linkPath="/login"
        linkText="Login"
      >
        <SignUpForm />
      </AuthContainer>
    </>
  );
};

export default SignUpPage;

SignUpPage.getLayout = (page: ReactNode) => <>{page}</>;
