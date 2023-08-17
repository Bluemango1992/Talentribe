import express from 'express';
import pool from './db.js';  // Ensure the path to db.js is correct
import cors from 'cors';

const app = express();
const PORT = 3001;

// Use the cors middleware
app.use(cors());

app.get('/clients', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM clients");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/jobs', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM jobs");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/candidates', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM candidates");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/candidates/:id', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM candidates WHERE candidateID = ?", [req.params.id]);
        res.json(rows[0]);
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/organisations', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM organisations");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM users");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/activities', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM activities");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.get('/locations', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM locations');
        res.json(results);
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


