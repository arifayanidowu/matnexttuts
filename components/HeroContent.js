import { fade, makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Fab, Button, Icon } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import { useRouter } from "next/router";
import ScrollAnimation from "react-animate-on-scroll";
import clsx from "clsx";
import { useState, useEffect } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100vh",
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.9)), url('/images/pile_books.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundSize: "cover",
    marginTop: "-20px",
    color: "#fff",
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    textAlign: "center",
    lineHeight: "10px"
  },
  root2: {
    width: "100%",
    height: "100vh",
    backgroundImage: "url('/images/stack-of-magazines.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
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
  },
  iconMargin: {
    color: theme.palette.grey
  },
  quote: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem"
    }
  }
}));

const HeroContent = ({ _id }) => {
  const classes = useStyles();
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  return (
    <div className={clsx({ [classes.root]: !_id, [classes.root2]: _id })}>
      {_id ? (
        <AuthContent router={router} classes={classes} />
      ) : (
        <UnAuthContent router={router} classes={classes} />
      )}
    </div>
  );
};

const AuthContent = ({ classes, router }) => (
  <div>
    <ScrollAnimation animateIn="fadeInDown" delay={3}>
      <blockquote>
        <Typography variant="h3" component="h1" className={classes.quote}>
          <Icon
            className={clsx("fas fa-quote-left", {
              [classes.iconMargin]: true
            })}
            fontSize="small"
          />
          Wisdom is not a product of schooling but of the lifelong attempt to
          acquire it.
          <Icon
            className={clsx("fas fa-quote-right", {
              [classes.iconMargin]: true
            })}
            fontSize="small"
          />
        </Typography>
      </blockquote>
      <Typography
        variant="subtitle1"
        component="h3"
        style={{ fontWeight: "bold", color: "#efebe9" }}
      >
        &mdash; <em>Albert Eistein</em>
      </Typography>
    </ScrollAnimation>
    <ScrollAnimation animateIn="fadeInUp" delay={4}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.margin}
        onClick={() => router.replace("/books")}
      >
        <ArrowForwardIosIcon fontSize="small" style={{ marginRight: "10px" }} />{" "}
        Get Started
      </Button>
    </ScrollAnimation>
  </div>
);

const UnAuthContent = ({ classes, router }) => (
  <div>
    <ScrollAnimation animateIn="fadeInDown" delay={3}>
      <Typography variant="h3" component="h1" gutterBottom>
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
        <ArrowForwardIosIcon fontSize="small" style={{ marginRight: "10px" }} />{" "}
        Get Started
      </Button>
    </ScrollAnimation>
  </div>
);

export default HeroContent;
