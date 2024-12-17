const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors()); // Enables CORS to allow requests from other origins (like your Flutter app)

// Replace with your MongoDB Atlas URI
const uri = 'mongodb+srv://<id>:<Password>@cluster0.fec7h.mongodb.net/';
const client = new MongoClient(uri);

// MongoDB Database Reference
let db;

async function connectToDatabase() {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      console.log('Connecting to MongoDB...');
      await client.connect();
      db = client.db('sample_book'); // Replace with your database name
      console.log('Connected');
    }
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if connection fails
  }
}

// Call the function to connect at server startup
connectToDatabase();

app.get('/books', async (req, res) => {
  try {
    const booksCollection = db.collection('table_book'); // Replace with your collection name
    const books = await booksCollection.find({}).toArray(); // Fetch all documents in the collection
    res.json(books); // Return the books as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching books'); // Handle errors
  }
});

const PORT = process.env.PORT || 3000; // Use an environment variable for the port or default to 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

