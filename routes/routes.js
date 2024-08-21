import express from "express";

import{
  createMahasiswa,
  editMahasiswa,
  getMahasiswa,
  getMahasiswaByNim,
}  from "../controllers/mahasiswaController.js";


const router = express.Router();

router.get("/", getMahasiswa);
router.get("/find", getMahasiswaByNim);
router.post("/create", createMahasiswa);
router.put("/update", editMahasiswa)

export default Router;