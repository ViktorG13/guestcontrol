import pg from "pg";
const { Pool } = pg;

const controller = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});

const getGuests = (req, res) => {
  controller.query("SELECT * FROM guests ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getGuestById = (req, res) => {
  const id = parseInt(req.params.id);

  controller.query(
    "SELECT * FROM guests WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const hostNewGuest = (req, res) => {
  const { name, email } = req.body;
  let date = new Date().toISOString();
  date.substring(0, 16).replace("T", ":");

  controller.query(
    "INSERT INTO guests (name, email, isHosted, hostedAt) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, true, date],
    (error, results) => {
      if (error) throw error;
      console.log(results.rows[0].id);
      res.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

const updateGuest = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, isHosted } = req.body;

  controller.query(
    "UPDATE guest SET name = $1, email = $2, isHosted = $3 WHERE id = $4",
    [name.email, isHosted, id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteGuest = (req, res) => {
  const id = parseInt(req.params.id);

  controller.query(
    "DELETE FROM guests WHERE id = $1",
    [id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

const db = {
  getGuests,
  getGuestById,
  updateGuest,
  deleteGuest,
  hostNewGuest,
};

export default db;
