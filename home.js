const clientPromise = stitch.StitchClientFactory.create('hospitalapp-htwsl');

let client;
let db;

//call this when body loads
function loadClient() {

  if (this.localStorage.getItem("username") == ""){

    window.location = "loginTester.html";

  }

    clientPromise.then(stitchClient => {
        client = stitchClient;
        db = client.service('mongodb', 'mongodb-atlas').db('HospitalDatabase');

          client.login().then(display());
    });
}

//displays all of the hospital's supplies in a table in div called "Supplies"
function display(){

  //get the username and password
  var user = this.localStorage.getItem("username");

  db.collection('Hospitals').find({ 'user' : user }).limit(2000).execute().then( docs => {


    html = "<table border = '1'> <th>Product ID</th>";
    html = html + "<th>Product Name</th><th>Product Brand</th><th>Product Quantity</th>";
    html = html + "<th>Product Category</th><th>Date Updated</th>";
    docs.map(c => {

      document.getElementById("Welcome").innerHTML = "Information for " + c.name;
      document.getElementById("address").innerHTML = "Address: " + c.address;

      if (c.supplies instanceof Array){

      c.supplies.forEach(function(supply){

        html += "<tr>" + "<td>" + supply.id + "</td>"
                            +"<td>" + supply.name+ "</td>"
                            +"<td>" + supply.brand + "</td>"
                            +"<td>" + supply.quantity + "</td>"
                            +"<td>" + supply.cat + "</td>"
                            +"<td>" + supply.updated + "</td> </tr>";
    });
      }
  });
  document.getElementById("supplies").innerHTML = html + "</table>";

    return;
  });

  return;
}
