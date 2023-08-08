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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


