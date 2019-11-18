import Layout from "../components/Layout";
import HeroContent from "../components/HeroContent";
import Tile from "../components/Tile";

class Index extends React.Component {
  render() {
    const { token } = this.props;
    // console.log(token.avatar);
    return (
      <Layout {...token}>
        <HeroContent {...token} />
        <Tile {...token} />
      </Layout>
    );
  }
}

export default Index;
