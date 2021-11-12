/*
Delete Many Documents with model.remove()

Model.remove() is useful to delete all the documents matching given criteria.

Modify the removeManyPeople function to delete all the people whose name is
within the variable nameToRemove, using Model.remove().
Pass it to a query document with the name field set, and a callback.

Note: The Model.remove() doesn’t return the deleted document,
but a JSON object containing the outcome of the operation, and the number of items affected.
Don’t forget to pass it to the done() callback, since we use it in tests.
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
  //A.find(condition,callback)
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
  //A.findOne(condition,callback);
  Person.findOne({favoriteFoods:regexp},function(err,result){
    if (err){}
    else{
      done(null,result);
    }
  });
  //done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  //A.findById(id,callback);
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
  const regexp = new RegExp(personName,'i');
  //A.findOneAndUpdate(conditions, update, options, callback)
  Person.findOneAndUpdate({name:regexp},{age:ageToSet},{new:true},function(err,result){
    if (err){}
    else{
      done(null,result);
    }
  });
  //done(null /*, data*/);
};

const removeById = (personId, done) => {
  //Deprecated collection.remove used by findByIdAndRemove
  //Use instead: findOneAndDelete - uses filter and sort before removal
  //findByIdAndRemove - remove the first occurence
  Person.findByIdAndRemove({_id:personId},function(err,result){
    if (err){}
    else{
      done(null,result);
    }
  }) // executes
  //done(null /*, data*/);
};

const removeManyPeople = (done) => {
  //Deprecated: collection.remove
  //Use deleteMany or deleteOne
  const nameToRemove = "Mary";
  const regexp = new RegExp(nameToRemove,'i');
  Person.deleteMany({name:regexp},function(err,result){
    if (err){}
    else{
      done(null,result);
    }
  }); // executes

  //done(null /*, data*/);
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

const populatePerson = (done) => {
    //use these to populate our MongoDB

    //create an instance of Person for sample only
    const p = new Person;

    //p.personid = new mongoose.Types.ObjectId; //manual unique id
    p.name = "Brill";
    p.age = "126";
    p.favoriteFoods = ['burger', 'Sundae', 'Spaghetti Bolognese', 'Quarter Pounder', "Cakes", "coffee"];
    //p.readBooks = ['Odd Thomas','Life Expectancy','Strangers','Brother Odd','Forever Odd','Saint Odd','Forever Odd', 'Odd Apocalypse'];
    p.save(function(err,result){
      if (err){}
      else{
        done(null,result);
      }
    });



    //insert a person
    const person = {
        name:'Marc',
        age:100,
        favoriteFoods:['ampalaya con carne', 'mongo with sugar', 'pancit', 'mango', "tawilis", "coffee"],
        };
    createAndSavePerson(person,done);
    //inert many people
    const arrayOfPeople = [{name:'Mary Help',age:33,favoriteFoods:['tonkatsu','sundae','fries','chicken']}, {name:'Jheff',age:22,favoriteFoods:['hot wings','pork chop','peanuts','beer']},{name:'Bloody Mary',age:54,favoriteFoods:['tonkatsu','sundae','fries','chicken']}, {name:'Jack',age:66,favoriteFoods:['hot wings','pork chop','peanuts','beer']}];

    createManyPeople(arrayOfPeople,done);


}

//deleteAll(done);
//populatePerson(done);

/*
findPeopleByName('rexzel',done);

findOneByFood('tonkatsu',done);
*/
//findPersonById('618de80138bbd8043e3c96bf',done);
//findEditThenSave('618de80138bbd8043e3c96bf',done);
//findAndUpdate('Mond',done);
//removeById('618de80138bbd8043e3c96c1',done);
removeManyPeople(done);

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
