const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoURL = 'mongodb://localhost:27017';
const dbName = 'photographyDB';
const collectionName = 'photos';

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
MongoClient.connect(mongoURL, (err, client) => {
  if (err) {
    console.log('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB successfully!');
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // API endpoints
    // GET all photos
    app.get('/photos', (req, res) => {
      collection.find().toArray((err, photos) => {
        if (err) {
          res.status(500).json({ error: 'Failed to fetch photos.' });
        } else {
          res
