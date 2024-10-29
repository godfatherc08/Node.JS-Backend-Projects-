const Task = require('../models/task')
const User = require('../models/user')
const secretKey = "wdbbwiudbbdqwbdbjdcvuwgdwd   wmdui"
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



const createTask = async(req, res) => {
    try{
        
    const userToken = req.cookies.userToken
    const body = req.body
    const decoded = jwt.verify(userToken, secretKey)

    const creatorID = decoded.ID

    const newTask = new Task({
        task: body.task,
        creatorID: creatorID,
        category: body.category,
        deadline: body.deadline,
        completed: body.completed
    })
    await newTask.save()
    console.log(newTask)
    return res.status(200).send("You have successfully created a new task")

    }
    catch(err){
        console.log(err)
    }
}

const readAllTasks = async(req,res) => {
    const userToken = req.cookies.userToken
    const body = req.body
    const decoded = jwt.verify(userToken, secretKey)

    const creatorID = decoded.ID
    allTasks = await Task.find({creatorID})
    console.log(allTasks)
    return res.status(200).json(allTasks)
}

const readOneTask = async(req,res) => {
    const userToken = req.cookies.userToken
    const body = req.body
    const task = body.task
    const decoded = jwt.verify(userToken, secretKey)
    try{
    const creatorID = decoded.ID
    allTasks = await Task.findOne({task: task}, {creatorID: creatorID})
    if(allTasks){
        console.log(allTasks)
        return res.status(200).json(allTasks)
    }
    else{
        return res.send("Task cannot be found. login again or check if task name is correct")
    }}
    catch(err){
        console.log(err)
    }
}

const updateTaskName = async (req, res) => {
    const userToken = req.cookies.userToken
    const body = req.body
    const task = body.task
    const newTaskName = body.newTaskName
    const decoded = jwt.verify(userToken, secretKey)
    try{
        const creatorID = decoded.ID
        const tasks = await Task.findOne({task: task}, {creatorID: creatorID})
        if(tasks){
            tasks.task = newTaskName
            await tasks.save()
            console.log(tasks)
            res.status(200).send("TASK NAME HAS BEEN CHANGED")
        }
        else{
            return res.send("Task cannot be found. login again or check if task name is correct")
        }}
        catch(err){
            console.log(err)
        }
}

const updateTaskCompletion = async (req, res) => {
    const userToken = req.cookies.userToken
    const body = req.body
    const task = body.task
    const completion = body.completion
    const decoded = jwt.verify(userToken, secretKey)
    try{
        const creatorID = decoded.ID
        const tasks = await Task.findOne({task: task}, {creatorID: creatorID})
        if(tasks){
            if(typeof completion == 'boolean'){
            tasks.completed = completion
            await tasks.save()
            console.log(tasks)
            res.status(200).send("COMPLETION STATUS HAS BEEN CHANGED")
            }
            else{
                return res.send('Type error, input either true or false')
            }
        }
        else{
            return res.send("Task cannot be found. login again or check if task name is correct")
        }}
        catch(err){
            console.log(err)
        }
}

const updateTaskDeadline = async (req, res) => {
    const userToken = req.cookies.userToken
    const body = req.body
    const task = body.task
    const newDeadline = new Date(body.newDeadline)
    const decoded = jwt.verify(userToken, secretKey)
    try{
        const creatorID = decoded.ID
        const tasks = await Task.findOne({task: task}, {creatorID: creatorID})
        if(tasks){
            if(newDeadline instanceof Date){
            tasks.deadline = newDeadline
            await tasks.save()
            console.log(tasks)
            res.status(200).send("DEADLINE HAS BEEN CHANGED")
            }
            else{
                return res.send('Type error, input date')
            }
        }
        else{
            return res.send("Task cannot be found. login again or check if task name is correct")
        }}
        catch(err){
            console.log(err)
        }
}

const deleteTask = async(req,res) => {
    const {emailAddress, password, task} = req.body
    const userToken = req.cookies.userToken
    const decoded = jwt.verify(userToken, secretKey)
    const creatorID = decoded.ID
    try{
        const tasks = await Task.findOne({task:task}, {creatorID: creatorID})
        const user = await User.findOne({ emailAddress })
        const check = bcrypt.compareSync(password, user.password)
        if(user && check){
            if(tasks){
            const taskID = tasks._id
            await Task.findByIdAndDelete(taskID)
            return res.status(200).send('Account Deleted :)')
            }
        }
        else{
            res.send('Wrong credentials')
        }
    }
    catch(err){
        console.log(err)
    }
}


module.exports = {createTask, readAllTasks, readOneTask, updateTaskCompletion, updateTaskName, updateTaskDeadline, deleteTask}