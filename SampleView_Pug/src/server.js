import express from "express";
import axios from "axios";

const app = express();
const IP_ADRESS = process.env.IP_ADRESS;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  const { data: file_list } = await axios.get(
    `http://${IP_ADRESS}:3500/file_list.json`
  );

  res.render("home", { file_list, IP_ADRESS });
});

const PORT = 3200;
const handleListen = () => console.log(`Server on http://localhost:${PORT}`);
app.listen(PORT, handleListen);
