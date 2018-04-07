const clientPromise = stitch.StitchClientFactory.create('hospitalapp-htwsl');

let client;
let db;

//call this when the submit button is pressed
function loadClient() {
    clientPromise.then(stitchClient => {
        client = stitchClient;
        db = client.service('mongodb', 'mongodb-atlas').db('Supplies');

          client.login().then(addUser());
    });
}

//adds the user (hospital)
function addUser(){

  //get the username and password
  var user =  document.getElementById("username").value;
  var pass =  document.getElementById("password").value;

  var success = 0;
  db.collection('users').insertOne({ 'user' : user , 'password': pass }).then(function(){

    db.createCollection(user, function(err, res){

      if (err) throw err;
      document.getElementById("message").innerHTML = user +" added!";

    });
    success = 1;
    return;
  });

if (success == 0){

  document.getElementById("message").innerHTML = user +" could not be added!";

}
  return;
}
