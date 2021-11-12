/*
Use model.find() to Search Your Database

In its simplest usage, Model.find() accepts a query document (a JSON object) as the first argument, then a callback.
It returns an array of matches. It supports an extremely wide range of search options.
Read more in the docs.

// find all documents
await MyModel.find({});

// find all documents named john and at least 18
await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();

// executes, passing results to callback
MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});

// executes, name LIKE john and only selecting the "name" and "friends" fields
await MyModel.find({ name: /john/i }, 'name friends').exec();

// passing options
await MyModel.find({ name: /john/i }, null, { skip: 10 }).exec();


//find by ID
A.findByIdAndRemove(id, options, callback) // executes
A.findByIdAndRemove(id, options)  // return Query
A.findByIdAndRemove(id, callback) // executes
A.findByIdAndRemove(id) // returns Query
A.findByIdAndRemove()           // returns Query


Modify the findPeopleByName function to find all the people having a given name, using Model.find() -> [Person]

Use the function argument personName as the search key.

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
  console.log('done');
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

const createAndSavePerson = (person, done) => {
  const p = new Person(person);
  p.save(done);
  //done(null , p);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,done);

  //done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  const regexp = new RegExp(personName,'i');

  const people = Person.find({name:regexp},done);

  //done(null /*, data*/);
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


//use these to populate our MongoDB
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

/*
//insert a person
const person = {
    name:'Brill',
    age:100,
    favoriteFoods:['ampalaya con carne', 'mongo with sugar', 'pancit', 'mango', "tawilis", "coffee"],
    readBooks:['Odd Thomas','Life Expectancy','Strangers','Brother Odd','Forever Odd','Saint Odd','Forever Odd', 'Odd Apocalypse']
    };
createAndSavePerson(person,done);
//inert many people
const arrayOfPeople = [{name:'John',age:36,favoriteFoods:['tonkatsu','sundae','fries','chicken'],readBooks:['javascript','php','backend development']}, {name:'Marc',age:36,favoriteFoods:['hot wings','pork chop','peanuts','beer'],readBooks:['angels and demons','famous books']}];

createManyPeople(arrayOfPeople,done);
*/
findPeopleByName('BriL',done);

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
