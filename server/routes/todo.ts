const express = require("express")
const router = express.Router();

const { create,list,update,remove } = require('../controller/todo')

router.get("/todo",list);
router.post("/todo",create);
router.put("/todo/:todoId",update);
router.delete("/todo/:todoId",remove);

module.exports = router