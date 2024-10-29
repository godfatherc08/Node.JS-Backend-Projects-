const express = require('express')
const router = express.Router()

const {createTask, readAllTasks, readOneTask, updateTaskCompletion, updateTaskName, updateTaskDeadline ,deleteTask} = require('../controllers/task')

router.post('/create-task', createTask)
router.get('/read-all-tasks', readAllTasks)
router.get('/read-one-task', readOneTask)
router.put('/update-task-completion', updateTaskCompletion)
router.put('/update-task-name', updateTaskName)
router.put('/update-task-deadline', updateTaskDeadline)
router.delete('/delete-task', deleteTask)

module.exports = router