import express from "express"
import CourseController from "../controllers/CourseController.js";

const courseRoute = express.Router();


courseRoute.post('/courses',CourseController.addCourse);
courseRoute.get('/courses',CourseController.addCourse);
courseRoute.get('/courses/:id',CourseController.getSingleCourseS);
courseRoute.post('/courses/:id',CourseController.updateCourse);
courseRoute.delete('/courses/:id',CourseController.deleteCourse);


export default courseRoute;