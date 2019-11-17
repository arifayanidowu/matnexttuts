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
  Button
} from "@material-ui/core";
import Router, { useRouter } from "next/router";

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
  }
}));

const tileData = [
  {
    img: "/images/pile.jpg",
    title: "Fantasy",
    author: "author 1"
  },
  {
    img: "/images/closeup.jpg",
    title: "Suspense",
    author: "author 2"
  },
  {
    img: "/images/pile_books.jpg",
    title: "Educational",
    author: "author 3"
  },
  {
    img: "/images/book-chapter-six.jpg",
    title: "Wellness",
    author: "author 4"
  },
  {
    img: "/images/close-up-of-paper.jpg",
    title: "Romance",
    author: "author 5"
  }
];

export default function Tile() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Container>
      <Typography
        variant="body1"
        component="h6"
        color="textPrimary"
        style={{ marginTop: "20px" }}
      >
        Discover
      </Typography>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {tileData.map((tile, i) => (
            <GridListTile key={i}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title
                }}
                actionIcon={
                  // <IconButton aria-label={`star ${tile.title}`}>
                  //   <StarBorderIcon className={classes.title} />
                  // </IconButton>
                  <Button
                    color="inherit"
                    variant="contained"
                    style={{ marginRight: "10px" }}
                    onClick={() => router.replace("/signup")}
                  >
                    Explore <StarBorderIcon className={classes.title} />
                  </Button>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <Button
          className={classes.centeredBtn}
          color="primary"
          variant="contained"
          size="large"
          onClick={() => router.replace("/signup")}
        >
          sign up and Explore <ArrowForwardIcon fontSize="small" />
        </Button>
      </div>
    </Container>
  );
}
