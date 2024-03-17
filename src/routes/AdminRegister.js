import { Router } from "express";
import {registerAdmin} from "../controller/adminRegister.js"

const router= Router();

router.route("/adminReg").post(registerAdmin);

export default router;