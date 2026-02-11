const express = require("express")
const crypto = require('crypto')


const app = express()

// middlewares
app.use(express.json())

// 
app.get("/", (req, res) => {
    res.json({
        status: true,
        message: "Task Management System"
    })
})

const tasks = []

let lastId = 0

// create a task
app.post("/tasks", (req, res) => {
    const { title } = req.body
    const task = {
        id: ++lastId,
        title,
        isCompleted: false,
        createdAt: Date.now()
    }
    tasks.push(task)
    res.status(201).json({
        status: true,
        message: "task created successfully",
        task
    })
})

// get list of tasks
app.get("/tasks", (req, res) => {
    const taskList = tasks
    res.json({
        status: true,
        message: "fetched tasks list successfully",
        results: taskList.length,
        tasks: taskList
    })
})

// get task by id
app.get("/tasks/:id", (req, res) => {
    const { id } = req.params
    const task = tasks.find((task) => task.id === Number(id))
    if (!task) {
        return res.status(404).json({
            status: false,
            message: "task details not found",
        })
    }
    res.json({
        status: true,
        message: "fetched task details successfully",
        task
    })
})

// update task by id
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params
    const { title, isCompleted } = req.body
    const task = tasks.find((task) => task.id === Number(id))
    if (!task) {
        return res.status(404).json({
            status: false,
            message: "task details not found",
        })
    }
    task.title = title
    task.isCompleted = Boolean(isCompleted)
    res.json({
        status: true,
        message: "fetched task details successfully",
        task
    })
})

// update task complete status
app.patch("/tasks/:id", (req, res) => {
    const { id } = req.params
    const { isCompleted } = req.body
    const task = tasks.find((task) => task.id === Number(id))
    if (!task) {
        return res.status(404).json({
            status: false,
            message: "task details not found",
        })
    }
    task.isCompleted = Boolean(isCompleted)
    res.json({
        status: true,
        message: "task complete status updated successfully",
        task,
        tasks
    })
})

app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params
    const index = tasks.findIndex((task) => task.id === Number(id))
    if (index === -1) {
        return res.status(404).json({
            status: false,
            message: "task details not found",
        })
    }
    const deletedTask = tasks.splice(index, 1)
    res.json({
        status: true,
        message: "task deleted successfully",
        task: deletedTask[0]
    })
})






const PORT = 3000 || 3001
app.listen(PORT, "0.0.0.0", () => {
    console.log(`task management system is running on port : ${PORT}`)
})
