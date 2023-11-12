const cors = require('cors');
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
    const dataToSave = req.body;
    let oldRows;

    try {
        const fileContent = fs.readFileSync('qrCodeSave.json', 'utf8');
        oldRows = fileContent ? JSON.parse(fileContent) : [];
    } catch (err) {
        console.error(err);
        oldRows = [];
    }

    oldRows.push(dataToSave);

    fs.writeFile('qrCodeSave.json', JSON.stringify(oldRows, null, 2), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur lors de l\'écriture du fichier');
        }
        res.send('Données sauvegardées avec succès');
    });
});


app.get('/', (req, res) => {
    fs.readFile('qrCodeSave.json', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur lors de la lecture du fichier');
        }
        res.send(JSON.parse(data));
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
