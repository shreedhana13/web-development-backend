const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000; // You can use any port you prefer

app.use(bodyParser.json());

// Your API endpoints will go here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Endpoint to create a text file with the current timestamp
app.post('/createTextFile', (req, res) => {
    const timestamp = Date.now();
    const fileName = `${new Date(timestamp).toISOString().replace(/:/g, '-')}.txt`;
    const filePath = `./files/${fileName}`;
  
    fs.writeFile(filePath, timestamp.toString(), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(201).json({ message: 'Text file created successfully', fileName });
      }
    });
  });
  
  // Endpoint to retrieve all text files in the folder
  app.get('/getAllTextFiles', (req, res) => {
    const folderPath = './files/';
  
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json({ files });
      }
    });
  });
  