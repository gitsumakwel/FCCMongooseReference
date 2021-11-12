/*
Create a Model

CRUD Part I - CREATE

First of all we need a Schema. Each schema maps to a MongoDB collection.
It defines the shape of the documents within that collection.
Schemas are building block for Models.
They can be nested to create complex models, but in this case we'll keep things simple.
A model allows you to create instances of your objects, called documents.

Replit is a real server, and in real servers the interactions with the database happen in handler functions.
These functions are executed when some event happens (e.g. someone hits an endpoint on your API).
We’ll follow the same approach in these exercises.
The done() function is a callback that tells us that we can proceed after completing an asynchronous operation such as
inserting, searching, updating, or deleting.
It's following the Node convention, and should be called as done(null, data) on success, or done(err) on error.

Warning - When interacting with remote services, errors may occur!

//Example

const someFunc = function(done) {
  //... do something (risky) ...
  if (error) return done(error);
  done(null, result);
};

Create a person schema called personSchema having this prototype:

- Person Prototype -
--------------------
name : string [required]
age :  number
favoriteFoods : array of strings (*)

Use the Mongoose basic schema types.
If you want you can also add more fields, use simple validators like required or unique,
and set default values. See the Mongoose docs.

Now, create a model called Person from the personSchema.
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

const errorLog = (err) => {
          console.log(err);
}

const done = (error,result) => {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
}

const uri = process.env.MONGO_URI;

/*
//To handle initial connection errors, you should use .catch() or try/catch with async/await.
const connector = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).catch(error=>errorLog);
*/
//callback with error capture
const connector = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
      //To handle errors after initial connection was established, you should listen for error events on the connection.
      mongoose.connection.on('error', err => {
        errorLog;
      });
    },
    err => { /** handle initial connection error */
      errorLog(err)
    }
);

//sample schema
const personSchema = new mongoose.Schema({
  //personid: { type:mongoose.Schema.Types.ObjectId }, //manual unique ID
  decimal: mongoose.Schema.Types.Decimal128,
  name: { type:String, required:true},
  age: { type:Number, min:5, max:110 },   // { type:Number }
  favoriteFoods: [String],   // [String]
  readBooks:  [{ type:String, lowercase:true, trim:true }],
  dateadd: { type:Date, default:Date.now }
});

let Person = mongoose.model("Person", personSchema);

//create an instance of Person for sample only
const p = new Person;

//p.personid = new mongoose.Types.ObjectId; //manual unique id
p.name = "Brill";
p.age = "100";
p.favoriteFoods = ['ampalaya con carne', 'mongo with sugar', 'pancit', 'mango', "tawilis", "coffee"];
p.readBooks = ['Odd Thomas','Life Expectancy','Strangers','Brother Odd','Forever Odd','Saint Odd','Forever Odd', 'Odd Apocalypse'];
p.save(done);

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
