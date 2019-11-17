import Layout from "../components/Layout";
import HeroContent from "../components/HeroContent";
import Tile from "../components/Tile";

class Index extends React.Component {
  render() {
    return (
      <Layout>
        <HeroContent />
        <Tile />
      </Layout>
    );
  }
}

export default Index;
