// import
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Grid from "gridfs-stream";
import bodyParser from "body-parser";
import Pusher from "pusher";
import mongoPosts from "./mongoPosts.js";

Grid.mongo = mongoose.mongo;

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1179092",
  key: "4ced851d93703be5a4d8",
  secret: "48cb640d4bd615e5e316",
  cluster: "ap2",
  useTLS: true,
});

// middlewares
app.use(bodyParser.json());
app.use(cors());

// db config
const mongoURI =
  "mongodb+srv://masrursakib:KHkTyw9MhN4242TO@cluster0.wzqxa.mongodb.net/reactBloggingSite?retryWrites=true&w=majority";

const conn = mongoose.createConnection(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB Connected");

  const changeStream = mongoose.connection.collection("posts").watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      console.log("Triggering Pusher");
      pusher.trigger("posts", "inserted", {
        change: change,
      });
    } else {
      console.log("Error Triggering Pusher");
    }
  });
});

conn.once("open", () => {
  console.log("DB Connected");
});

// api routes
app.get("./", (req, res) => res.status(200).send("Application is Working"));

app.post("/upload/post", (req, res) => {
  const dbPost = req.body;

  mongoPosts.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/retrieve/posts", (req, res) => {
  mongoPosts.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.sort((b, a) => {
        return a.time - b.time;
      });

      res.status(200).send(data);
    }
  });
});

// listener
app.listen(port, () => console.log(`Listening to localhost port ${port}`));
