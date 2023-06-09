import express from "express";

import librairy from "./ressources/librairy/librairy.router.js";

const app = express();

app.use(express.json());
app.use("/books/", librairy);

app.listen(4200, () => console.log("Port 4200"));
