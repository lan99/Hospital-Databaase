const clientPromise = stitch.StitchClientFactory.create('hospitalapp-htwsl');

let client;
let db;

//call this when the submit button is pressed
function loadClient() {
    clientPromise.then(stitchClient => {
        client = stitchClient;
        db = client.service('mongodb', 'mongodb-atlas').db('HospitalDatabase');

          client.login().then(addUser());
    });
}

//adds the user (hospital)
function addUser(){

  //get the username and password
  var name =  document.getElementById("name").value;
  var addr =  document.getElementById("addr").value;
  var zip =  document.getElementById("zip").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var user =  document.getElementById("username").value;
  var pass =  document.getElementById("password").value;

  if (name != "" && addr != "" &&  user != "" &&  pass != "" && zip != "" && phone != "" && email != ""){
    var success = 0;
    var rightVars =  0;

    if (!Number.isInteger(parseInt(zip)) || !Number.isInteger(parseInt(zip)) || phone.toString().length != 10 || zip.toString().length != 5) {
      rightVars = 1;
    }

    if (rightVars != 1) {
      db.collection('Hospitals').insertOne({'zip':zip, 'phone':phone, 'address':addr, 'name':name, 'user':user, 'email':email, 'password':pass, 'supplies': []}).then(function(){

        document.getElementById("name").value = "";
        document.getElementById("addr").value = "";
        document.getElementById("zip").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("email").value = "";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("message").innerHTML = user +" added!";
        success = 1;
        return;
      });
    }
  }

  if (success == 0) {
    document.getElementById("message").innerHTML = "Request could not be sent. Check for errors.";
  }
  return;
}
