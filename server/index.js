import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import Router from "./routes/routes.js";


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({origin: "http://localhost:3000", credentials: true}));


Router(app);

const CONNECTION_URL = "mongodb+srv://mongo:mongo@cluster0.llxlu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
const db = mongoose.connection;
db.on('error', function() {
    console.log("Error: Could not connect to MongoDB.");
});

mongoose.connect(CONNECTION_URL)
                .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
                .catch((error) => console.log(error.message));

