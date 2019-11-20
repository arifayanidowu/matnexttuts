import Layout from "../components/Layout";
import { Typography } from "@material-ui/core";

export default function bookcollections({ user }) {
  return (
    <Layout {...user}>
      <Typography variant="h2" component="h3">
        My Collections
      </Typography>
    </Layout>
  );
}
