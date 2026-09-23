const Course = require('../models/course')

async function getCourses(req, res) {
    try {
        const courses = await Course.find()

        return res.status(200).send(courses)

    } catch (error) {

        return res.status(500).send({
            message: "Unable to access course"
        })
    }
}


async function createCourses(req, res) {
    try {

        const {
            title,
            description,
            category,
            level,
            price,
            duration
        } = req.body

        if (
            !title ||
            !description ||
            !category ||
            !level ||
            price === undefined ||
            !duration
        ) {
            return res.status(400).send({
                message: "Bad request"
            })
        }

        const course = new Course({
            title: title,
            description: description,
            instructor: req.user._id,
            category: category,
            level: level,
            price: price,
            duration: duration
        })

        await course.save()

        return res.status(200).send({
            message: "New course created"
        })

    } catch (error) {

        return res.status(500).send({
            message: "Unable to create course"
        })
    }
}


async function deleteCourses(req, res) {
    try {

        const { id } = req.params

        const course = await Course.findByIdAndDelete(id)

        if (!course) {
            return res.status(404).send({
                message: "Course not found"
            })
        }

        return res.status(200).send({
            message: "Course deleted successfully"
        })

    } catch (error) {

        return res.status(500).send({
            message: "Unable to delete course"
        })
    }
}


async function updateCourses(req, res) {
    try {

        const { id } = req.params

        const course = await Course.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if (!course) {
            return res.status(404).send({
                message: "Course not found"
            })
        }

        return res.status(200).send(course)

    } catch (error) {

        return res.status(500).send({
            message: "Unable to update course"
        })
    }
}


async function getCoursesById(req, res) {
    try {

        const { id } = req.params

        const course = await Course.findById(id)

        if (!course) {
            return res.status(404).send({
                message: "Course not found"
            })
        }

        return res.status(200).send(course)

    } catch (error) {

        return res.status(500).send({
            message: "Unable to access course"
        })
    }
}


module.exports = {
    getCourses,
    createCourses,
    deleteCourses,
    updateCourses,
    getCoursesById
}