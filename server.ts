import express from "express";
import cors from "cors";

export const app = express();
const port = 3000; // Change this if you want to run the server on a different port

app.use(
    cors({
        origin: "*",
        methods: ["GET"], 
    })
);

require("./requests/restaurantRequest");
require("./requests/menusRequest");

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
