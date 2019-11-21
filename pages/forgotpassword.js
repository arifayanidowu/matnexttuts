import ForgotPasswordComponent from "../components/ForgotPasswordComponent";
import Layout from "../components/Layout";

export default function forgotpassword({ user }) {
  return (
    <Layout {...user}>
      <ForgotPasswordComponent />
    </Layout>
  );
}
