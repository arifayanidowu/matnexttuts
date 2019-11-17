const next = require("next");
const { parse } = require("url");
const express = require("express");
const passport = require("passport");

const dev = process.env.NODE_ENV !== "producttion";
const port = process.env.PORT || 3000;

const app = next({ dev });

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(express.json());

    server.get("/_next/*", (req, res) => {
      handle(req, res);
    });

    server.get("/static/*", (req, res) => {
      handle(req, res);
    });

    server.use(passport.initialize());
    server.use(passport.session());

    server.use((req, res, next) => {
      /* custom middleware to put our user data (from passport) on the req.user so we can access it as such anywhere in our app */
      res.locals.user = req.user || null;
      next();
    });
    server.get("*", (req, res) => {
      handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`Server listening on ${port}`);
    });
  })
  .catch(err => console.error(err));
