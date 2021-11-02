import {Router} from "express"

import productsHandler from "./handlers.js";

const productsRoute = Router();

productsRoute.get("/", productsHandler.getAll);

productsRoute.post("/", productsHandler.createProduct);

productsRoute
  .route("/:id")
  .get(productsHandler.getById)
  .put(productsHandler.updateProductById)
  .delete(productsHandler.deleteProductById);

export default productsRoute;