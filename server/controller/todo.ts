import { Request,Response } from "express"
const prisma = require('../libs/prisma')

exports.create = async (req:Request,res:Response) => {
    try {
        const {title, status} = req.body
        const newTodo = await prisma.todo.create({
            data:{
                title: title,
                status: status
            }
        })
        res.json({ newTodo })
    } catch (error) {
        console.log(error);
        res.json({ message: "Server Error" })
    }
};

exports.list = async (req:Request,res:Response) => {
    try {
        const todos = await prisma.todo.findMany()
        res.json({ todos })
    } catch (error) {
        console.log(error);
        res.json({ message: "Can't see this." })
    }
};

exports.update = async (req:Request, res:Response) => {
    const { todoId } = req.params
    const {title, status} = req.body
    try {
        const updated = await prisma.todo.update({
            where: {
                id: Number(todoId),
            },
            data: {
                title: title,
                status: status,
            }
        })
        res.json({updated})
    } catch (error) {
        console.log(error);
        res.json({ message: "Can't update this." })
    }
}

exports.remove = async (req:Request, res:Response) => {
    const {todoId} = req.params
    try {
        const deleted = await prisma.todo.delete({
            where: {
                id: Number(todoId),
            }
        })
        res.json({deleted});
    } catch (error) {
        console.log(error);
        res.json({ message: "Can't delete this." })
    }
}