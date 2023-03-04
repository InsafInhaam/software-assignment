import express from "express";
import { approvePost, createPost, deletePost, getNotApprovedPost, getPost, rejectPost } from "../controllers/post.js";
import {
    authenticateToken, requireUserType,
} from "../middleware/requireLogin.js";

const router = express.Router();

router.post("/createPost", authenticateToken,createPost);
router.delete("/deletePost/:id", authenticateToken, deletePost);
router.get("/allPost", authenticateToken, getPost);
router.get("/getNotApprovedPost",authenticateToken, requireUserType(1), getNotApprovedPost);
router.put("/approvePost/:id",authenticateToken, requireUserType(1), approvePost);
router.put("/rejectPost/:id",authenticateToken, requireUserType(1), rejectPost);

export default router;