const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://okokokokok:z1toq6U9iiD3OSVL@cluster0.p43lk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use(cors({
    origin:'*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,

}));
app.use(bodyParser.json());
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Could not connect to MongoDB Atlas...", err));

const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    carModel: { type: String, required: true }
});

const FormData = mongoose.model('FormData', formDataSchema);

app.post('/api/form', async (req, res) => {
    const { name, email, phone, state, city, carModel } = req.body;

    if (!name || !email || !phone || !state || !city || !carModel) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newFormData = new FormData({ name, email, phone, state, city, carModel });
        
        await newFormData.save();
        
        res.status(201).json({ message: 'Form data saved successfully!' });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ message: 'An error occurred while saving the form data.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});