import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoConnection from "./db/index.js";
import authRoute from "./routes/auth.js";
import courseRoute from "./routes/course.js";
import batchRoute from "./routes/batch.js";



dotenv.config()
mongoConnection()

const app = express();
app.use(express.json())
app.use(cors())
app.use(authRoute)
app.use(batchRoute)
app.use(courseRoute)

app.listen(process.env.PORT || 4000, () => console.log("Server started on port http://localhost:4000"))