const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Replace <username>, <password>, and <your-database-name> with your credentials and database name
const mongoURI = 'mongodb+srv://okokokokok:z1toq6U9iiD3OSVL@cluster0.p43lk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Could not connect to MongoDB Atlas...", err));

// Define a Mongoose Schema and Model for the form data
const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    carModel: { type: String, required: true }
});

const FormData = mongoose.model('FormData', formDataSchema);

// Define an API endpoint to handle the POST request
app.post('/api/form', async (req, res) => {
    const { name, email, phone, state, city, carModel } = req.body;

    // Basic validation
    if (!name || !email || !phone || !state || !city || !carModel) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Create a new FormData document
        const newFormData = new FormData({ name, email, phone, state, city, carModel });
        
        // Save the document to the database
        await newFormData.save();
        
        res.status(201).json({ message: 'Form data saved successfully!' });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ message: 'An error occurred while saving the form data.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});