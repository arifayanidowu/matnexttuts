import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {
  Paper,
  Typography,
  Divider,
  Container,
  Card,
  Button,
  CardMedia,
  CardContent,
  CardActionArea,
  Icon
} from "@material-ui/core";
import Router, { useRouter } from "next/router";
import ScrollAnimation from "react-animate-on-scroll";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    // margin: "20px auto",
    // width: "70%",
    height: "20%",
    border: "3px solid #fefefe",
    boxShadow: "0 0 0 rgba(0,0,0,0.3)"
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.secondary.light
    // color: "#fff"
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  alignCenter: {
    textAlign: "center",
    margin: "20px 0"
  },
  bordered: {
    border: "3px solid #fefefe",
    boxShadow: "0 0 0 rgba(0,0,0,0.3)"
  },
  centeredBtn: {
    margin: "30px auto"
  },
  paddedInner: {
    padding: "20px",
    backgroundColor: theme.palette.common.black
  },
  cardGrid: {
    display: "flex",
    marginTop: "30px",
    marginLeft: "auto",
    marginRight: "auto",
    // height: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column"
    }
  },
  media: {
    width: "50%",
    position: "relative",
    "&::after": {
      content: "",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 2,
      backgroundImage:
        "linear-gradient(to right, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.6) 100%)"
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "50%"
    }
  },
  container: {
    margin: "80px auto",
    height: "40vh"
  },
  shortDivider: {
    width: "15px",
    height: "3px",
    borderRadius: theme.shape.borderRadius
  }
}));

export default function Tile({ _id }) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Container className={classes.container}>
      <Typography color="textSecondary">Discover</Typography>
      <Divider className={classes.shortDivider} />
      {_id ? (
        <AuthContent classes={classes} router={router} />
      ) : (
        <UnAuthContent classes={classes} router={router} />
      )}
    </Container>
  );
}

const AuthContent = ({ classes, router }) => (
  <Card className={classes.cardGrid}>
    <CardMedia
      image="/images/the-polaroid-book.jpg"
      alt="polaroid"
      className={classes.media}
    />
    <CardContent>
      <ScrollAnimation animateIn="fadeInDown" delay={3}>
        <Typography
          variant="h5"
          component="h1"
          style={{ marginBottom: "20px" }}
          gutterBottom
        >
          Illuminate the mind
        </Typography>
      </ScrollAnimation>

      <ScrollAnimation animateIn="fadeInUp" delay={4}>
        <Typography color="textSecondary" gutterBottom>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt
          ullam saepe perspiciatis nisi repellat debitis magni ea, quo, culpa
          vitae nulla tenetur eum quam omnis distinctio iure quis est.
        </Typography>
      </ScrollAnimation>
      <Button
        color="primary"
        variant="contained"
        size="large"
        style={{ marginTop: "20px" }}
        onClick={() => router.replace("/books")}
        className={classes.btn}
      >
        Explore
        <ArrowForwardIcon />
      </Button>
    </CardContent>
  </Card>
);

const UnAuthContent = ({ classes, router }) => (
  <Card className={classes.cardGrid}>
    <CardMedia
      image="/images/book-chapter-seven.jpg"
      alt="Book Chapter Seven"
      className={classes.media}
    />
    <CardContent>
      <ScrollAnimation animateIn="fadeInDown" delay={3}>
        <Typography
          variant="h5"
          component="h1"
          style={{ marginBottom: "20px" }}
          gutterBottom
        >
          Embrace the power of words
        </Typography>
      </ScrollAnimation>

      <ScrollAnimation animateIn="fadeInUp" delay={4}>
        <Typography color="textSecondary" gutterBottom>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nesciunt
          ullam saepe perspiciatis nisi repellat debitis magni ea, quo, culpa
          vitae nulla tenetur eum quam omnis distinctio iure quis est.
        </Typography>
      </ScrollAnimation>
      <Button
        color="primary"
        variant="contained"
        size="large"
        style={{ marginTop: "20px" }}
        onClick={() => router.replace("/signup")}
        className={classes.btn}
      >
        Explore
        <ArrowForwardIcon />
      </Button>
    </CardContent>
  </Card>
);
