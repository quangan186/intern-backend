// Import the functions you need from the SDKs you need

const admin = require('firebase-admin') ;
const keyCredentials = require("./key.json") 

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(keyCredentials)
});
const database = admin.firestore();

module.exports = {database}