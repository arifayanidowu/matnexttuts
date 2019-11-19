import { fade, makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Fab, Button } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useRouter } from "next/router";
import ScrollAnimation from "react-animate-on-scroll";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100vh",
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.9)), url('/images/pile_books.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "cover",
    marginTop: "-20px",
    color: "#fff",
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    textAlign: "center",
    lineHeight: "10px"
  },
  flex: {
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "50px"
  },
  margin: {
    margin: "20px 0"
  }
}));

const HeroContent = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div className={classes.root}>
      <div>
        <ScrollAnimation animateIn="fadeInDown" delay={3}>
          <Typography variant="h3" component="h1">
            Welcome to RS Library
          </Typography>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.margin}
            onClick={() => router.replace("/signup")}
          >
            <ArrowForwardIosIcon
              fontSize="small"
              style={{ marginRight: "10px" }}
            />{" "}
            Get Started
          </Button>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default HeroContent;
