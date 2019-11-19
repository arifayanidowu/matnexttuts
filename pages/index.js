import { parseCookies, destroyCookie } from "nookies";
import axios from "axios";
import Layout from "../components/Layout";
import HeroContent from "../components/HeroContent";
import Tile from "../components/Tile";
import { redirectUser } from "../lib/auth";
import baseUrl from "../lib/baseUrl";

class Index extends React.Component {
  render() {
    const { user } = this.props;
    // console.log(token.avatar);
    return (
      <Layout {...user}>
        <HeroContent {...user} />
        <Tile {...user} />
      </Layout>
    );
  }
}

// Index.getInitialProps = async ctx => {
//   let user = {};
//   if (ctx.req) {
//     const { token } = parseCookies(ctx);
//     const payload = { headers: { Authorization: token } };
//     try {
//       const response = await axios.get(`${baseUrl}/api/auth`, payload);
//       user = response.data;
//     } catch (error) {
//       console.log(error.message);
//       destroyCookie(ctx, "token");
//     }
//   }

//   return {
//     user
//   };
// };

export default Index;
