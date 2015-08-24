var express = require('express');
var router = express.Router();
var puppyArray = [];
var personArray = [];


//route handler for handling a GET request to '/'
router.get('/', function(req, res, next) {
  //sends a response to the user in the form of a template called index.html
  res.render('index');
});

//- - - - - - - -//
//   Add Dog    //
//- - - - - - -//

router.post('/addDog', function(req, res, next) {
  res.render('addDog');
});

//route handler for handing a POST request to '/submit'
router.post('/dog', function(req, res, next) {

  var puppyInputName = req.body.puppyName;
  var puppyInputID = req.body.puppyID;

  var errors = puppyValidationCheck(puppyInputName, puppyInputID);

  if (errors.length > 0) {
    res.render('addDog', {
      errors: errors
    });
  }
  else {
    puppyArray.push({
      name: puppyInputName,
      id: puppyInputID
    });
    //sends a reponse to the user in the form of dog.html
    //while also passing in the puppyArray
    res.render('dog', {
      puppies: puppyArray,
      success: "The puppy was saved successfully!"
    });
  }
});

function puppyValidationCheck(puppyName, puppyID) {

  var errorArray = [];
  var puppyNameTrimmed = puppyName.trim();
  var puppyIDTrimmed = puppyID.trim();

  //puppy name validations
  if(puppyNameTrimmed === '') {
    errorArray.push("Name cannot be blank.");
  }

  //puppy ID validations
  if(puppyIDTrimmed === '') {
    errorArray.push('ID cannot be blank.');
  } else if (puppyIDTrimmed.length < 3) {
    errorArray.push('An ID must be at least 3 characters long.');
  }

  return errorArray;

}


//- - - - - - - -//
//  Add Person  //
//- - - - - - -//

router.post('/addPerson', function(req, res, next) {
  res.render('addPerson');
});

//route handler for handing a POST request to '/submit'
router.post('/person', function(req, res, next) {

  var personInputName = req.body.personName;
  var personInputHobby = req.body.personHobby;

  var errors = personValidationCheck(personInputName, personInputHobby);

  if (errors.length > 0) {
    res.render('addPerson', {
      errors: errors
    });
  }
  else {
    personArray.push({
      name: personInputName,
      hobby: personInputHobby
    });
    //sends a reponse to the user in the form of person.html
    //while also passing in the personArray
    res.render('person', {
      people: personArray,
      success: "The person was saved successfully!"
    });
  }
});

function personValidationCheck(personName, personHobby) {

  var errorArray = [];
  var personNameTrimmed = personName.trim();
  var personHobbyTrimmed = personHobby.trim();

  //person name validations
  if(personNameTrimmed === '') {
    errorArray.push("Name cannot be blank.");
  }

  //person hobby validations
  if(personHobbyTrimmed === '') {
    errorArray.push('Hobby cannot be blank.');
  }

  return errorArray;

}


module.exports = router;
