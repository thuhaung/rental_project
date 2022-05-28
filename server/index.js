import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import Router from "./routes/routes.js";
import { Server } from "socket.io";
import http from "http";


const app = express();
//app.use(express.json());
//app.use(express.urlencoded({limit: "100mb", extended: true}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(cookieParser());
app.use(cors({origin: "http://localhost:3000", credentials: true}));

Router(app);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST", "DELETE"]
    }
});

io.on("Connection", socket => {
    console.log("User " + socket.id + " connected.");
    socket.on("Disconnect", () => {
        console.log("User " + socket.id + " disconnected.");
    })
})

const CONNECTION_URL = "mongodb+srv://mongo:mongo@cluster0.llxlu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
const db = mongoose.connection;
db.on('error', function() {
    console.log("Error: Could not connect to MongoDB.");
});

mongoose.connect(CONNECTION_URL)
                .then(() => server.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
                .catch((error) => console.log(error.message));

