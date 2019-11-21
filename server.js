const next = require("next");
const { parse } = require("url");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const helmet = require("helmet");
const mongoSessionStore = require("connect-mongo");
const compression = require("compression");
const session = require("express-session");

require("dotenv").config();
require("./server/passport");

const routes = require("./server/routes");

const dev = process.env.NODE_ENV !== "producttion";
const PORT = process.env.PORT || 3000;
const ROOT_URL = dev ? `http://localhost:${PORT}` : process.env.PRODUCTION_URL;

const app = next({ dev });

const handle = app.getRequestHandler();

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

mongoose
  .connect(process.env.MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log(`[MongoDB]: Connected to MongoDB successfully`);
  })
  .catch(err => {
    console.log(`[MongoError]: Failed to connect to DB: ${err.message}`);
  });

app
  .prepare()
  .then(() => {
    const server = express();
    if (!dev) {
      server.use(helmet());
      server.use(compression());
    }

    server.use(express.json());

    server.get("/_next/*", (req, res) => {
      handle(req, res);
    });

    server.get("/static/*", (req, res) => {
      handle(req, res);
    });

    const MongoStore = mongoSessionStore(session);
    const sessionConfig = {
      name: "next-connect.sid",
      // secret used for using signed cookies w/ the session
      secret: process.env.SESSION_SECRET,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 14 * 24 * 60 * 60 // save session for 14 days
      }),
      // forces the session to be saved back to the store
      resave: false,
      // don't save unmodified sessions
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 14 // expires in 14 days
      }
    };

    if (!dev) {
      sessionConfig.cookie.secure = true; // serve secure cookies in production environment
      server.set("trust proxy", 1); // trust first proxy
    }

    server.use(session(sessionConfig));

    server.use(passport.initialize());
    server.use(passport.session());

    server.use((req, res, next) => {
      /* custom middleware to put our user data (from passport) on the req.user so we can access it as such anywhere in our app */
      res.locals.user = req.user || null;
      next();
    });

    /* apply routes from the "routes" folder */
    server.use("/", routes);

    /** Set Cookie Header for SameSite */
    server.set("SameSite", "None");
    server.set("Secure", true);

    server.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        "Access-Control-Allow-Headers: Authorization"
      );
      if (req.method === "OPTIONS") {
        // Stop the middleware chain
        return res.status(200).end();
      }

      next();
    });

    /* Error handling from async / await functions */
    server.use((err, req, res, next) => {
      const { status = 500, message } = err;
      res.status(status).json(message);
      next();
    });

    server.get("*", (req, res) => {
      handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch(err => console.error(err));
