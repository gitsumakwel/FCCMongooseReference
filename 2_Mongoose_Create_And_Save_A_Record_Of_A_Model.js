/*
Create and Save a Record of a Model

In this challenge you will have to create and save a record of a model.

Within the createAndSavePerson function, create a document instance using
the Person model constructor you built before.
Pass to the constructor an object having the fields name, age, and favoriteFoods.
Their types must conform to the ones in the personSchema.
Then, call the method document.save() on the returned document instance.
Pass to it a callback using the Node convention.
This is a common pattern; all the following CRUD methods take a callback function
like this as the last argument.

 //Example

// ...
person.save(function(err, data) {
  //   ...do your stuff here...
});

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
    () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ },
    err => { /** handle initial connection error */
      errorLog(err)
    }
);
//To handle errors after initial connection was established, you should listen for error events on the connection.
mongoose.connection.on('error', err => {
  errorLog;
});
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

/*
//create an instance of Person for sample only
const p = new Person;

//p.personid = new mongoose.Types.ObjectId; //manual unique id
p.name = "Brill";
p.age = "100";
p.favoriteFoods = ['ampalaya con carne', 'mongo with sugar', 'pancit', 'mango', "tawilis", "coffee"];
p.readBooks = ['Odd Thomas','Life Expectancy','Strangers','Brother Odd','Forever Odd','Saint Odd','Forever Odd', 'Odd Apocalypse'];
p.save(done);
*/

const createAndSavePerson = (done) => {
  const p = new Person({
    name:'Brill',
    age:100,
    favoriteFoods:['ampalaya con carne', 'mongo with sugar', 'pancit', 'mango', "tawilis", "coffee"],
    readBooks:['Odd Thomas','Life Expectancy','Strangers','Brother Odd','Forever Odd','Saint Odd','Forever Odd', 'Odd Apocalypse']
    });
  p.save(done);
  //done(null/*, data*/);
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
