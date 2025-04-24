import express from "express";
import schoolRoutes from "./src/routes/schoolRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app=express();
const PORT= process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/school",schoolRoutes);

app.listen(PORT,()=>{
    console.log(`Sever is listening on ${PORT}`);
})
