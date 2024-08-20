const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./db");

const userRoutes = require("./Routes/userRoutes");
const blogRoutes = require("./Routes/blogRoutes");
//rest objects
const app = express();

//middleware
app.use(cors());
app.use(express.json()); // Corrected this line
app.use(morgan("dev"));
connectDB();
//routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Node Server hey",
  });
});
//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
//listen
const port = process.env.PORT;
app.listen(port, () => {
  console.log(
    `Server has been started @ http://localhost:${port} `.bgCyan.white
  ); // Corrected this line
});
