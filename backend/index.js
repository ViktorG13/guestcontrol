import bodyParser from "body-parser";
import { config } from "dotenv";
config();
import express from "express";
import db from "./db/controller.js";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/guests", db.getGuests);
app.get("/guests/:id", db.getGuestById);
app.post("/guests", db.hostNewGuest);
app.put("/guests/:id", db.updateGuest);
app.delete("/guests/:id", db.deleteGuest);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
