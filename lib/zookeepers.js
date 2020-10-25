const { query } = require('express');
const fs = require('fs');
const path = require('path');

function filterByQuery(query, zookeepers) {
    let filterResults = zookeepers;
    if(query.age) {
        filterResults = filterResults.filter(
            // Since our form data will be coming in as a string, and our JSON is storing
            // age as a number, we much convert the query sting to a number to perform a comparison
            (zookeeper) => zookeeper.age === Number(query.age)
        );
    }
    if(query.favoriteAnimal) {
        filterResults = filterResults.filter(
            (zookeeper) => zookeeper.favoriteAnimal === query.favoriteAnimal
        );
    }
    if(query.name) {
        filterResults = filterResults.filter(
            (zookeeper) => zookeeper.name === query.name
        );
    }
    return filterResults;
};

function findById(id, zookeeper) {
    const result = zookeeper.filter((zookeeper) => zookeeper.id === query.id)[0];
    return result;
};

function createNewZookeeper(body, zookeepers) {
    const zookeeper = body;
    zookeepers.push(zookeepers);
    fs.writeFileSync(
        path.join(__dirname, '../data/zookeepers.json'),
        JSON.stringify({zookeepers}, null, 2)
    );
    return zookeeper;
};

function validateZookeeper(zookeeper) {
    if (!zookeeper.name || typeof zookeeper.name !== 'string') {
        return false;
    }
    if (!zookeeper.age || typeof zookeeper.age !== 'number') {
        return false;
    }
    if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== 'string') {
        return false;
    }
    return true;
};

module.exports = {
    filterByQuery,
    findById,
    createNewZookeeper, 
    validateZookeeper
}