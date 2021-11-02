import {Router} from "express"

import reviewsHandler from "./handlers.js";

const reviewsRouter = Router();

reviewsRouter.get("/", reviewsHandler.getAll);

reviewsRouter.post("/", reviewsHandler.createComment);

reviewsRouter
  .route("/:id")
  .get(reviewsHandler.getById)
  .put(reviewsHandler.updateCommentById)
  .delete(reviewsHandler.deleteCommentById);

export default reviewsRouter;