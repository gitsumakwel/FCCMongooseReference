/*
Delete One Document Using model.findByIdAndRemove

findByIdAndRemove and findOneAndRemove are like the previous update methods.
They pass the removed document to the db. As usual, use the function argument personId as the search key.

Modify the removeById function to delete one person by the person's _id.
You should use one of the methods findByIdAndRemove() or findOneAndRemove().

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
  Person.findOneAndDelete({_id:personId},function(err,result){
    if (err){}
    else{
      done(null,result);
    }
  }) // executes
  //done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

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
    const arrayOfPeople = [{name:'Jason',age:36,favoriteFoods:['tonkatsu','sundae','fries','chicken']}, {name:'Jheff',age:36,favoriteFoods:['hot wings','pork chop','peanuts','beer']}];

    createManyPeople(arrayOfPeople,done);


}
//populatePerson(done);
//deleteAll(done);

/*
findPeopleByName('rexzel',done);

findOneByFood('tonkatsu',done);
*/
//findPersonById('618de80138bbd8043e3c96bf',done);
//findEditThenSave('618de80138bbd8043e3c96bf',done);
//findAndUpdate('Mond',done);
//removeById('618de80138bbd8043e3c96bf',done);
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
