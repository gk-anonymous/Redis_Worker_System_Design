import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.connect().catch(console.error);

app.post("/submit", (req, res) => {
  const { problemId, user_Id, code, langauge } = req.body;

  client
    .lPush(
      "code_submissions",
      JSON.stringify({ problemId, user_Id, code, langauge })
    )
    .then(() => {
      res.status(200).send({ message: "Code submission received." });
    })
    .catch((err) => {
      console.error("Error storing submission:", err);
    });
});
app.listen(3000);
