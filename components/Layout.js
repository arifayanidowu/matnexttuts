import Container from "@material-ui/core/Container";
import Navbar from "./Navbar";

const Layout = ({ children, _id, name, avatar }) => {
  return (
    <>
      <Navbar id={_id} name={name} avatar={avatar} />
      {children}
    </>
  );
};

export default Layout;
