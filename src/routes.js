const express = require("express")
const routes = express.Router()

const UserController = require("./controllers/UserController")
const SessionController = require("./controllers/SessionController")
const ProductController = require("./controllers/ProductController")

routes.get("/", (req, res) => {
    res.json({message: "Deu certo bagaça"})
});

routes.post("/register", UserController.create)

routes.post("/login", SessionController.create)

routes.post("/create-product", ProductController.create)

routes.get("/show-products", ProductController.show)

routes.get("/show-one/:id", ProductController.showOne)

module.exports = routes;