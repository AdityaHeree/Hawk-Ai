import { Router } from "express";
import {adminRegister} from "../controller/adminRegister.js"

const router= Router();

router.route("/register").post( adminRegister );

export default router;   