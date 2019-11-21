import {
  makeStyles,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Icon,
  Divider
} from "@material-ui/core";
import ScrollAnimation from "react-animate-on-scroll";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "80vh",
    backgroundImage: "url('/images/books-collections.jpg')",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "grid",
    justifyItems: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: "40%"
    }
  },
  card: {
    display: "flex",
    width: "80%",
    height: "auto",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  cardMedia: {
    position: "relative",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "50%"
    }
  },
  cardContent: {
    width: "50%"
    // [theme.breakpoints.down("sm")]: {
    //   width: "100%"
    // }
  }
}));

export default function SectionContent() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          image="/images/books-collections.jpg"
          alt="Book Collections"
          className={classes.cardMedia}
        />
        <CardContent>
          <ScrollAnimation animateIn="fadeInDown" delay={300}>
            <blockquote>
              <Typography>
                <Icon
                  className="fas fa-quote-left"
                  fontSize="small"
                  color="disabled"
                />
                The more that you read, the more things you will know. The more
                that you learn, the more places you’ll go.
                <Icon
                  className="fas fa-quote-right"
                  fontSize="small"
                  color="disabled"
                />
              </Typography>
            </blockquote>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="fadeInUp"
            delay={400}
            // initiallyVisible={true}
          >
            <Typography variant="subtitle2" align="right" color="textSecondary">
              <em>&mdash; Dr Seuss</em>
            </Typography>
          </ScrollAnimation>
        </CardContent>
      </Card>
    </div>
  );
}
