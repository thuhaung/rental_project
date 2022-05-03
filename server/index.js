import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/homepage.js";



const app = express();
app.use("/", router);


app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(cors());

const CONNECTION_URL = "mongodb+srv://mongo:mongo@cluster0.llxlu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;
const db = mongoose.connection;
db.on('error', function() {
    console.log("Error: Could not connect to MongoDB.");
});


mongoose.connect(CONNECTION_URL)
                .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
                .catch((error) => console.log(error.message));

// app.listen(3000, () => {
//     console.log(`Example app listening on port 3000`);
// });