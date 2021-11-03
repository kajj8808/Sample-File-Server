import express from "express";
import upload, { upDateList } from "./upload";
import cors from "cors";
import fs from "fs";
const IP_ADRESS = process.env.IP_ADRESS;

const app = express();
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("Hello Worlds");
});

app.post("/upload", upload.single("user_file"), async (req, res) => {
  const { file } = req;
  await upDateList(file);
  res.redirect(`http://${IP_ADRESS}:3200`);
});

app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = `${__dirname}/public/uploads/${filename}`;
  res.download(filePath);
});

app.get("/file_list.json", async (req, res) => {
  let file_list;
  try {
    file_list = JSON.parse(
      fs.readFileSync(`${__dirname}/public/json/filelist.json`, "utf-8")
    );
  } catch (error) {
    file_list = {};
  }
  res.json(file_list);
});

app.listen(3500, () => {
  console.log("Server on -[http://localhost:3500] ");
});
