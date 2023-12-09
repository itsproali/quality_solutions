import Head from "next/head";
import { ReactNode } from "react";
import ResetPasswordForm from "../../src/Main/Password/ResetPasswordForm";
import AuthContainer from "../../src/components/Login/AuthContainer";

export default function resetPasswordPage() {
  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>

      <AuthContainer
        page="reset-password"
        title="Reset your Password"
        subtitle="Set your new password and secure your account"
      >
        <ResetPasswordForm />
      </AuthContainer>
    </>
  );
}

resetPasswordPage.getLayout = (page: ReactNode) => <>{page}</>;
