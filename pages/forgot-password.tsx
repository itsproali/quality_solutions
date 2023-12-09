import Head from "next/head";
import ForgotPasswordForm from "../src/Main/Password/ForgotPasswordForm";
import SimpleLayout from "../src/components/Layout/SimpleLayout";
import AuthContainer from "../src/components/Login/AuthContainer";
import { ReactNode } from "react";

export default function forgotPasswordPage() {
  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>

      <AuthContainer
        page="forgot-password"
        title="Forgot your Password?"
        subtitle="Enter the email address and we will send you a link to
        reset your password."
      >
        <ForgotPasswordForm />
      </AuthContainer>
    </>
  );
}

forgotPasswordPage.getLayout = (page: ReactNode) => <>{page}</>;
