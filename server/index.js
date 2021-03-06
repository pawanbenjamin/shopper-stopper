const express = require("express");
const volleyball = require("volleyball");
const client = require("./db/client");

const PORT = 5000;

const app = express();

client.connect();

app.use(express.json());
app.use(volleyball);

app.use("/api", require("./routes"));

app.listen(PORT, () => {
  console.log(`Served up and listening on PORT ${PORT}`);
});
