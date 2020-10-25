const express = require('express');
// 
const {animals} = require('./data/animals.json');
const fs = require('fs');
// module built into Node.js API that provides utilities for working with file and directory paths. 
// ultimately makes working with our file system a little more predictable. 
const path = require('path');

// the require statements will read the index.js files in each of the directories indicated. 
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


const PORT = process.env.PORT || 3001;
// Instanciates the server
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data
app.use(express.json());

// Tells our server that any time a client navigates to <host>/api or <host>/ the app will use the router we set up in apiRoutes or htmlRoutes.
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// we provide a file path to a location in our application (in this case, the public folder). 
// instructs the server to make these files static resources
// all of our front end code can now be accessed without having a specific server endpoint created for it!
app.use(express.static('public'));





app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});