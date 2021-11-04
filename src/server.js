import express from "express";
import productsRoute from "./services/products/routes.js";
import createDefaultTables from "./db/create-tables.js";
import listEndpoints from "express-list-endpoints" 
import reviewsRoute from "./services/reviews/routes.js";
import { connectDB } from "./db/index.js";

const server = express();

const PORT = process.env.PORT;
/* const PORT = 5001 */

server.use(express.json());

server.use("/products", productsRoute);
server.use("/products/:product_id/reviews", reviewsRoute)

console.table(listEndpoints(server))
server.listen(PORT, async () => {
  console.log(`✅ Server is running on port ${PORT}`);
  await connectDB();
});

server.on("error", console.log);