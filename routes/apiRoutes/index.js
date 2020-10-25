const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');
const zookeeperRoutes = require('../apiRoutes/zookeeperRoutes');

router.use(animalRoutes);
router.use(zookeeperRoutes);

module.exports = router;

// We're using the Router as before, but we're having it use the module exported animalRoutes.js
// Doing it this way, we're using apiRoutes/index.js as a central hub for all routing functions we may want to add to the application.
// Right now its overkill, but as applications get larger, it will become a very efficient mechanism for managing routing code and modularization. 

// Always double check your relative path statements in the require statements. 