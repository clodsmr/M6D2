
   
import pool from "../../db/connect.js";

const getAll = async (_req, res, _next) => {
  try {
    const data = await pool.query("SELECT * FROM products ORDER BY id ASC;");
    res.send(data.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getById = async (req, res, _next) => {
  try {
    const data = await pool.query("SELECT * FROM products WHERE id=$1", [
      req.params.id,
    ]);
    

    if (data.rows.length === 0) {
      res.status(400).send("Product not found");
    } else {
      res.send(data.rows[0]);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createProduct = async (req, res, _next) => {
  try {
    const { name, description, brand, price, category } = req.body;
    const data = await pool.query(
      `INSERT INTO products(name, description, brand, price, category) VALUES($1,$2,$3,$4,$5) RETURNING *;`,
      [name, description, brand, price, category]
    );

    res.send(data.rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateProductById = async (req, res, next) => {
  try {
    const { name, description, brand, price, category} = req.body;
    const data = await pool.query(
      "UPDATE products SET name=$1, description=$2,brand=$3, price=$4, category=$5 WHERE id=$6 RETURNING *;",
      [name, description, brand, price, category, req.params.id]
    );
    res.send(data.rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const productsHandler = {
  getAll,
  getById,
  createProduct,
  updateProductById,
  deleteProductById,
};

export default productsHandler;
