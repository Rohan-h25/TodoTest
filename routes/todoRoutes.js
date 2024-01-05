require("dotenv").config();
const express = require("express");
const router = express.Router();
const authCheck = require("../middlewares/authCheck");
const {handleGetAllTodos, handleAddTodo, handleDeleteTodo} = require("../controllers/todo");

router.use(authCheck());

router.get("/", handleGetAllTodos);

router.post("/add", handleAddTodo);

router.post("/delete", handleDeleteTodo);

module.exports = router;
