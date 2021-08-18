
const userRouter = require("./user");
const songRouter = require("./song");

function route(app) {
    app.use("/api/users", userRouter);
    app.use("/api/songs", songRouter);
}

module.exports = route;
