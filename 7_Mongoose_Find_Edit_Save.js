/*
Perform Classic Updates by Running Find, Edit, then SavePassed

In the good old days, this was what you needed to do if you wanted to edit a document,
and be able to use it somehow (e.g. sending it back in a server response).
Mongoose has a dedicated updating method: Model.update().
It is bound to the low-level mongo driver.
It can bulk-edit many documents matching certain criteria,
but it doesn’t send back the updated document, only a 'status' message.
Furthermore, it makes model validations difficult, because it just directly calls the mongo driver.

Modify the findEditThenSave function to find a person by _id (use any of the above methods)
with the parameter personId as search key. Add "hamburger" to the list of the person's favoriteFoods
(you can use Array.push()). Then - inside the find callback - save() the updated Person.

Note: This may be tricky, if in your Schema, you declared favoriteFoods as an Array,
without specifying the type (i.e. [String]).
In that case, favoriteFoods defaults to Mixed type, and
you have to manually mark it as edited using document.markModified('edited-field').
See Mongoose documentation
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
    console.log(result);
}


const uri = process.env.MONGO_URI;

/*
//To handle initial connection errors, you should use .catch() or try/catch with async/await.
const connector = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).catch(error=>errorLog);
*/
//callback with error capture
const connector = mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }).then(
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

  decimal: mongoose.Schema.Types.Decimal128,
  name: { type:String, required:true},
  age: { type:Number, min:5, max:110 },   // { type:Number }
  favoriteFoods: [String],   // [String]
  //readBooks:  [{ type:String, lowercase:true, trim:true }],
  //dateadd: { type:Date, default:Date.now },
  //personid: { type:mongoose.Schema.Types.ObjectId }, //manual unique ID
},{_id:true});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (person, done) => {
  const p = new Person(person);
  p.save(function(err,result){
    if (err){}
    else{
      done(null,result);
    }
  });
  //done(null , p);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function(err,result){
    if (err){}
    else{
      done(null,result);
    }
  });
  //done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  const regexp = new RegExp(personName,'i');
  Person.find({name:regexp},function(err,result){
    if (err){}
    else{
      done(null,result);
    }
  });
  //done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  const regexp = new RegExp(food,'i');
  Person.findOne({favoriteFoods:regexp},function(err,result){
    if (err){}
    else{
      done(null,result);
    }
  });
  //done(null /*, data*/);
};

const findPersonById = (personId, done) => {

  Person.findById(`${personId}`,function(err,result){
    if (err){}
    else{
      done(null,result);
    }
  });
  /*
  Person.findOne({ _id: personId },function(err,result){
    if (err){}
    else{
      done(null,result);
    }
  });
  */
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  //find by id
  Person.findById(`${personId}`,function(err,result){
    if (err){}
    else{
      result.markModified('edited-field');
      result.favoriteFoods.push(foodToAdd);
      result.save(function(err,result){
        if (err){}
        else{
          done(null,result);
        }
      });
    }
  });
  //done(null /*, data*/);
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

const deleteAll = (done) => {
  console.log('delete');
  Person.deleteMany({ age: { $gte: 0 } },function(err,result){
    if (err){}
    else{
      done(null,result);
    }
  });
}


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

/*deleteAll(done);*/
/*
//insert a person
const person = {
    name:'Mond',
    age:100,
    favoriteFoods:['ampalaya con carne', 'mongo with sugar', 'pancit', 'mango', "tawilis", "coffee"],
    };
createAndSavePerson(person,done);
//inert many people
const arrayOfPeople = [{name:'Jed',age:36,favoriteFoods:['tonkatsu','sundae','fries','chicken']}, {name:'Rexzel',age:36,favoriteFoods:['hot wings','pork chop','peanuts','beer']}];

createManyPeople(arrayOfPeople,done);
*/

/*
findPeopleByName('rexzel',done);

findOneByFood('tonkatsu',done);
*/
//findPersonById('618de80138bbd8043e3c96bf',done);
findEditThenSave('618de80138bbd8043e3c96bf',done);

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
