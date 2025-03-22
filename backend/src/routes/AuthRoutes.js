import { Router } from "express";
import { userLogin, userRegister, vendorLogin, vendorRegister } from "../controllers/Auth.controller.js";
const router = Router();

import {authMiddleware} from "../middleware.js";

// user

router.route("/user/login")
    .post(userLogin);

router.route("/user/register")
    .post(userRegister);

//vendor

router.route("/vendor/login")
    .post(vendorLogin);

router.route("/vendor/register")
    .post(vendorRegister);


export default router;
