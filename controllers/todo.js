const User = require("../database/models/User");

function handleGetAllTodos(req, res) {
  console.log("gettodo");
  // console.log(req.user.todos);
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    todos: req.user.todos,
    cookies: req.cookies,
  });
}

async function handleAddTodo(req, res) {
  console.log("addtodo");
  // console.log(req.body.todo);
  try {
    const update = {
      $push: {
        todos: req.body.todo,
      },
    };
    await User.updateOne({ googleId: req.user.googleId }, update);
  } catch (e) {
    console.log("Error in updating todos: ", e);
  }
  res.status(200).send("todo added");
}

async function handleDeleteTodo(req, res) {
  console.log("deletetodo");
  // console.log(req.body.id);
  try {
    const update = {
      $pull: {
        todos: { id: req.body.id },
      },
    };
    await User.updateOne({ googleId: req.user.googleId }, update);
  } catch (e) {
    console.log("Error in deleting todo: ", e);
  }
  // res.redirect(CLIENT_TODO_PAGE_URL);
  res.status(200).send("todo deleted");
}

module.exports = { handleGetAllTodos, handleAddTodo, handleDeleteTodo };
