import express from 'express';
import pool from './db.js';  // Ensure the path to db.js is correct
import cors from 'cors';

const app = express();
const PORT = 3001;

// Use the cors middleware
app.use(cors());
app.use(express.json());

app.get('/search', async (req, res) => {
    const query = req.query.q;
    const results = [];

    try {
        // Searching in candidates table
        let [rows] = await pool.query("SELECT candidateID, name FROM candidates WHERE name LIKE ?", [`%${query}%`]);
        for (const row of rows) {
            results.push({ type: 'candidate', id: row.candidateID, name: row.name });
        }

        // Searching in clients table
        [rows] = await pool.query("SELECT clientID, clientName FROM clients WHERE clientName LIKE ?", [`%${query}%`]);
        for (const row of rows) {
            results.push({ type: 'client', id: row.clientID, name: row.clientName });
        }

        // Searching in jobs table
        [rows] = await pool.query("SELECT jobID, title FROM jobs WHERE title LIKE ?", [`%${query}%`]);
        for (const row of rows) {
            results.push({ type: 'job', id: row.jobID, name: row.title });
        }

        // Searching in organisations table
        [rows] = await pool.query("SELECT organisationID, companyName FROM organisations WHERE companyName LIKE ?", [`%${query}%`]);
        for (const row of rows) {
            results.push({ type: 'organisation', id: row.organisationID, name: row.companyName });
        }

        res.json(results);

    } catch (error) {
        console.error("Error during search: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



app.get('/clients', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM clients");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/clients', async (req, res) => {
    try {
        const { clientName, contactEmail, phoneNumber, industryCategory, location, organisationID } = req.body;
        const [result] = await pool.query(
            "INSERT INTO clients (clientName, contactEmail, phoneNumber, industryCategory, location, organisationID) VALUES (?, ?, ?, ?, ?, ?)",
            [clientName, contactEmail, phoneNumber, industryCategory, location, organisationID]
        );
        res.status(201).json({ message: 'Client added successfully!', clientID: result.insertId });
    } catch (error) {
        console.error("Error adding client: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/clients/:id', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM clients WHERE clientID = ?", [req.params.id]);
        res.json(rows[0]);
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

app.get('/jobs/:id', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM jobs WHERE jobID = ?", [req.params.id]);
        res.json(rows[0]);
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

app.post('/users', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const [result] = await pool.query(
            "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
            [firstName, lastName, email, password]
        );
        res.status(201).json({ message: 'User added successfully!', userID: result.insertId });
    } catch (error) {
        console.error("Error adding user: ", error);
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

app.post('/locations', async (req, res) => {
 
    try {
        const { officeType, address, city, country, postalCode, organisationID } = req.body;

        const [result] = await pool.query(
            'INSERT INTO locations (officeType, address, city, country, postalCode, organisationID) VALUES (?, ?, ?, ?, ?, ?)',
            [officeType, address, city, country, postalCode, organisationID]
        );

        res.status(201).json({ message: 'Location added successfully!', locationID: result.insertId });
    } catch (error) {
        console.error('Error adding location:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/organisations', async (req, res) => {
    try {
        const { companyName, industry, lastClientContact, location, website } = req.body;
        const [result] = await pool.query(
            "INSERT INTO organisations (companyName, industry, lastClientContact, location, website) VALUES (?, ?, ?, ?, ?)",
            [companyName, industry, lastClientContact, location, website]
        );
        res.status(201).json({ message: 'Organisation added successfully!', organisationID: result.insertId });
    } catch (error) {
        console.error("Error adding organisation: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/notes', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM notes");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/notes', async (req, res) => {
    try {
        const { text, organisationID } = req.body;
        const [result] = await pool.query(
            "INSERT INTO notes (text, organisationID) VALUES (?, ?)",
            [text, organisationID]
        );
        res.status(201).json({ message: 'Note added successfully!', noteID: result.insertId });
    } catch (error) {
        console.error("Error adding note: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.delete('/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Extract the ID from the URL parameter
        await pool.query("DELETE FROM notes WHERE id = ?", [id]);
        res.status(200).json({ message: 'Note deleted successfully!' });
    } catch (error) {
        console.error("Error deleting note: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


