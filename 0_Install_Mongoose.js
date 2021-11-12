/*
Install and Set Up Mongoose

Working on these challenges will involve you writing your code using one of the following methods:

    Clone this GitHub repo and complete these challenges locally.
    Use our Replit starter project to complete these challenges.
    Use a site builder of your choice to complete the project.
    Be sure to incorporate all the files from our GitHub repo.

When you are done, make sure a working demo of your project is hosted somewhere public.
Then submit the URL to it in the Solution Link field.

In this challenge, you will set up a MongoDB Atlas database and import the required packages to connect to it.

Follow this tutorial (0_MongoDb_Atlas_Account.js) to set up a hosted database on MongoDB Atlas.

Add mongodb@~3.6.0 and mongoose@~5.4.0 to the project’s package.json.
Then, require mongoose as mongoose in myApp.js. Create a .env file and add a MONGO_URI variable to it.
Its value should be your MongoDB Atlas database URI.
Be sure to surround the URI with single or double quotes,
and remember that you can't use spaces around the = in environment variables.
For example, MONGO_URI='VALUE'.
When you are done, connect to the database using the following syntax:

mongoose.connect(<Your URI>, { useNewUrlParser: true, useUnifiedTopology: true });

*/

require('dotenv').config();
const mongoose = require('mongoose');
/*
const { MongoClient } = require('mongodb');
const mySecret = process.env.MONGO_URI;

const client = new MongoClient(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/

const uri = process.env.MONGO_URI;
const connector = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


let Person;

const createAndSavePerson = (done) => {
  done(null /*, data*/);
};

const createManyPeople = (arrayOfPeople, done) => {
  done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

