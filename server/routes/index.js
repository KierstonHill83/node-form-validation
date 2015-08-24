var express = require('express');
var router = express.Router();
var puppyArray = [];


//route handler for handling a GET request to '/'
router.get('/', function(req, res, next) {
  //sends a response to the user in the form of a template called index.html
  res.render('index');
});

//route handler for handing a POST request to '/submit'
router.post('/submit', function(req, res, next) {

  var puppyInputName = req.body.puppyName;
  var puppyInputID = req.body.puppyID;

  var errors = puppyValidationCheck(puppyInputName, puppyInputID);

  if (errors.length > 0) {
    res.render('index', {
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

module.exports = router;
