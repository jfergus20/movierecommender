const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/save-data', async (req, res) => {
    try {
        const data = req.body;
        await fs.writeFile(
            path.join(__dirname, 'Data.json'),
            JSON.stringify(data, null, 2)
        );
        res.json({ message: 'Data saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));