const express = require("express");

const app = express();

const studentRoutes =
    require("./routes/studentRoutes");

app.use(express.json());

app.use(express.static("public"));

app.use("/students", studentRoutes);

app.get("/api/test", (req, res) => {

    res.json({
        message: "API Working"
    });

});

const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});