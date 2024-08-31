import Course from "../models/course.js";


class CourseController {
    static async addCourse(req, res) {
        try {
            const course = new Course(req.body);
            await course.save();
            res.status(201).send(course);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    static async getCourses(req, res) {
        try {
            const courses = await Course.find();
            res.status(200).send(courses);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    static async getSingleCourseS(req, res) {
        try {
            const course = await Course.findById(req.params.id);
            if (!course) {
                return res.status(404).send();
            }
            res.status(200).send(course);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    static async updateCourse(req, res) {
        try {
            const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!course) {
                return res.status(404).send();
            }
            res.status(200).send(course);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    static async deleteCourse(req, res) {
        try {
            const course = await Course.findByIdAndDelete(req.params.id);
            if (!course) {
                return res.status(404).send();
            }
            res.status(200).send(course);
        } catch (error) {
            res.status(500).send(error);
        }
    }



}

export default CourseController