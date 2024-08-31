import express from "express"
import CourseController from "../controllers/CourseController.js";
import BatchController from "../controllers/BatchController.js";

const batchRoute = express.Router();

batchRoute.post('/batches',BatchController.addBatch);
batchRoute.get('/batches',BatchController.getBatches);
batchRoute.get('/batches/:id',BatchController.getSingleBatch);
batchRoute.post('/batches/:id',BatchController.updateBatch);
batchRoute.delete('/batches/:id',BatchController.deleteBatch);



export default batchRoute;