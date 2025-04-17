import express from "express";
import { addSchool, listSchools } from "../controllers/schoolController.js";

const router=express.Router();

router 
    .route("/addSchool")
    .post(addSchool)

router 
    .route("/listSchools")
    .get(listSchools)    

export default router;    