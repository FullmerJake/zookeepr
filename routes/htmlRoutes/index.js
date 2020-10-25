const path = require('path');
const router = require('express').Router();


// '/' brings us to the root route of the server. This route is used to create a homepage for a server
// This GET route has 1 job and that is to respond the HTML page to display in the browser. 
router.get('/', (req, res) => {
    // instead of res.json, we use res.sendFile() and all we have to do is tell them where to find the file we want the server to read and send back to client
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
// the above sends the index file to the browser to display. 

// takes us to /animals. Doesn't have /api/animals, because it's not going to an API. Goes to the animal.html. 
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});


module.exports = router;