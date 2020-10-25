const express = require('express');
// 
const {animals} = require('./data/animals.json');
const fs = require('fs');
// module built into Node.js API that provides utilities for working with file and directory paths. 
// ultimately makes working with our file system a little more predictable. 
const path = require('path');


const PORT = process.env.PORT || 3001;
// Instanciates the server
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data
app.use(express.json());
// we provide a file path to a location in our application (in this case, the public folder). 
// instructs the server to make these files static resources
// all of our front end code can now be accessed without having a specific server endpoint created for it!
app.use(express.static('public'));



function filterByQuery(query, animalsArray){
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filtered result here
    let filteredResults = animalsArray;

    if (query.personalityTraits){
        // Save personalityTraits as a dedicated array. 
        // If personalityTraits is a string, place it into a new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        }
        else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array
            // Remeber, it is initially a copy of the animalsArray, 
            //but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by teh filter, the filteredResults
            // array will then contain only the entries that contain the trait, 
            // ao at the end jwe'll have na array of animals that have every one
            // of the traits when the .forEach() loop is finished. 
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }

    if(query.diet){
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if(query.species){
        filteredResults = filteredResults.filter(animal => animal.species == query.species);
    }
    if(query.name){
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
};
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id) [0];
    return result;
};
// accepts the POST route's res.body value and the array we want to add the data to
function createNewAnimal(body, animalsArray){
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        // JSON.stringify converts the javascript array data into JSON. the other 2 arguements keep our data formatted
        // null arguements means we don't want to edit any of our existing data. 
        // 2 indicateds we want to create white space between our values to make it more readable. 
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
    return animal;
};
// input validation
function validateAnimal(animal){
    if(!animal.name || typeof animal.name !== 'string'){
        return false;
    }
    if(!animal.species || typeof animal.species !== 'string'){
        return false;
    }
    if(!animal.diet || typeof animal.diet !== 'string'){
        return false;
    }
    if(!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
};


// API Route
app.get('/api/animals/', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// API Route
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    }
    else {
        res.send(404);
    }
});

// Defines a route that listens for POST requests
app.post('/api/animals', (req, res) => {
    //set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if(!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    }
    else {
    // add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
    }

});


// '/' brings us to the root route of the server. This route is used to create a homepage for a server
// This GET route has 1 job and that is to respond the HTML page to display in the browser. 
app.get('/', (req, res) => {
    // instead of res.json, we use res.sendFile() and all we have to do is tell them where to find the file we want the server to read and send back to client
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// the above sends the index file to the browser to display. 

// takes us to /animals. Doesn't have /api/animals, because it's not going to an API. Goes to the animal.html. 
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});





app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});