const clientPromise = stitch.StitchClientFactory.create('hospitalapp-htwsl');

let client;
let db;

//call this when body loads
function loadClient() {
    clientPromise.then(stitchClient => {
        client = stitchClient;
        db = client.service('mongodb', 'mongodb-atlas').db('Supplies');

          client.login().then(display());
    });
}

//displays all of the hospital's supplies in a table in div called "Supplies"
function display(){

  //get the username and password
  var user = this.localStorage.getItem("username");

  db.collection('users').find({ 'user' : username }).limit(2000).execute().then( docs => {

    var html = "<table> <th>Product ID</th>";
    html = html + "<th>Product Name</th><th>Product Brand</th><th>Product Quantity</th>";
    html = html + "<th>Product Category</th><th>Date Updated</th>";
    html = html + docs.map(c => "<tr>" +
                    "<td>" + c._id + "</td>"
                    +"<td>" + c.name+ "</td>"
                    +"<td>" + c.brand + "</td>"
                    +"<td>" + c.desc + "</td>"
                    +"<td>" + c.category + "</td>"
                    +"<td>" + c.updated + "</td> </tr>").join("");

                    document.getElementById("supplies").innerHTML = html + "</table>";

    return;
  });

  return;
}
