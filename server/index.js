import * as argon2 from "argon2";
import express from "express";
import morgan from "morgan";
import {
    getUser,
    createUser,
    deleteUser,
    getRate,
    searchForUser,
    addFriend,
    deleteFriend,
    sendMessage,
} from "./handlers.js";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.post("/getUser", getUser);
app.post("/searchForUser", searchForUser);
app.patch("/sendMessage", sendMessage);
app.patch("/addFriend", addFriend);
app.patch("/deleteFriend", deleteFriend);
app.post("/createUser", createUser);
app.delete("/deleteUser", deleteUser);
app.post("/getShippingRate", getRate)
app.get(`*`, (req, res) => {
res.status(404).json({
    status: 404,
    message: "Nothing here matches your query.",
});
})

app.listen(8000, () => {
    console.log("Listening on port 8000");
})

