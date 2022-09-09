const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = require("./models");

const userRouter = require("./routes/Users");
app.use("/auth", userRouter);

const itemsRouter = require("./routes/Items");
app.use("/items", itemsRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
