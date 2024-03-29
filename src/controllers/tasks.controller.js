import Task from "../models/tasks.model.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user.id }).populate('owner')
        res.json(tasks)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export const getTask = async (req, res) => {
    const { id } = req.params;
    try {
        const findTask = await Task.findById(id)
        if (!findTask) return res.status(404).json({ message: "Task not found" })
        res.json(findTask)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export const createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTask = new Task({
            owner: req.user.id,
            title,
            description
        })
        const taskSaved = await newTask.save()
        res.json({
            task: taskSaved._id,
            title: taskSaved.title,
            description: taskSaved.description
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {

        const updatedTask = await Task.findOneAndUpdate({
            _id: id
        },
            {
                title: title,
                description: description
            },
            {
                new: true
            })
        if (!updatedTask) return res.status(404).json({ message: "Task not found" })
        res.json({
            task: updatedTask._id,
            title: updatedTask.title,
            description: updatedTask.description
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) return res.status(404).json({ message: "Task not found" })
        res.json({
            message: "Task deleted successfully"
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
