import { Router } from "express";
import cors from "cors";
import healthController from "../controllers/health.js";
import authController from "../controllers/auth.js";
import privacyController from "../controllers/privacy.js";
import isAuth from "../middlewares/isAuth.js";
import createLessonPlan from "../controllers/lessonPlan/createLessonPlan.js";
import getLessonPlan from "../controllers/lessonPlan/getLessonPlan.js";
import viewLessonPlan from "../controllers/lessonPlan/viewLessonPlan.js";
import deleteLessonPlan from "../controllers/lessonPlan/deleteLessonPlan.js";
import updateLessonPlan from "../controllers/lessonPlan/updateLessonPlan.js";

const router = Router();

router.use(cors());

router.get("/health", healthController.getHealth);
router.post("/health", healthController.postHealth);
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/public", privacyController.publicPath);
router.get("/private", isAuth, privacyController.privatePath);
router.post("/newlessonplan", isAuth, createLessonPlan);
router.get("/lessonplans", isAuth, getLessonPlan);
router.get("/view/lessonplan/:id", isAuth, viewLessonPlan);
router.put("/update/lessonplan/:id", isAuth, updateLessonPlan);
router.delete("/delete/lessonplan/:id", isAuth, deleteLessonPlan);

export default router;
