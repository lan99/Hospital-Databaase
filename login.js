const clientPromise = stitch.StitchClientFactory.create('hospitalapp-htwsl');

let client;
let db;
function lookForUser() {
    clientPromise.then(stitchClient => {
        client = stitchClient;
        db = client.service('mongodb', 'mongodb-atlas').db('Supplies');

          client.login().then(check());
    });
}

function check(){

  //get the username and password
  var user =  document.getElementById("username").value;
  var pass =  document.getElementById("password").value;

  db.collection('users').find({ $and: [{ 'user' : username }, {'password': password }]}).limit(1).execute().then( docs => {

    var times = 0;
    docs.map(c => times++);

    if (times == 1){

      this.localStorage.setItem("username", username);

      //will redirect to home.html. CHANGE THIS TO CORRECT WEBPAGE
      window.location = "home.html";
    }

    else {

      document.getElementById("error").innerHTML = "<p> Not a valid user! </p>";

    }
    return;
  });

  return;
}
