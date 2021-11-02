
   
import pool from "../../db/connect.js";

const getAll = async (_req, res, _next) => {
  try {
    const data = await pool.query("SELECT * FROM reviews ORDER BY id ASC;");
    res.send(data.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getById = async (req, res, _next) => {
  try {
    const data = await pool.query("SELECT * FROM reviews WHERE id=$1", [
      req.params.id,
    ]);
    

    if (data.rows.length === 0) {
      res.status(400).send("Comment not found");
    } else {
      res.send(data.rows[0]);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createComment = async (req, res, _next) => {
  try {
    const { comment, rate, product_id} = req.body;
    const data = await pool.query(
      `INSERT INTO reviews(comment, rate, product_id) VALUES($1,$2,$3) RETURNING *;`,
      [comment, rate, product_id]
    );

    res.send(data.rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateCommentById = async (req, res, next) => {
  try {
    const { comment, rate, product_id} = req.body;
    const data = await pool.query(
      "UPDATE reviews SET comment=$1, rate=$2, product_id=$3 WHERE id=$4 RETURNING *;",
      [comment, rate, product_id, req.params.id]
    );
    res.send(data.rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteCommentById = async (req, res, next) => {
  try {
    await pool.query("DELETE FROM reviews WHERE id=$1", [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const reviewsHandler = {
  getAll,
  getById,
  createComment,
  updateCommentById,
  deleteCommentById,
};

export default reviewsHandler;
