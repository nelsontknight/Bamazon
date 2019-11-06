//The inquirer module will be required to be able to ask questions.
var inquirer = require("inquirer");

//mySQL module will be required to be able to update the db of products.
var mysql = require("mysql");

//This module for the table method will be reqired so that the products from the db are displayed in table format
require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Username
  user: "root",
  // Password
  password: "",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
	if (err) throw err;
	//console.log(connection);
 	// run the listProducts function after the connection is made to prompt the user
	listProducts();
});

//Function to list all Products
function listProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		console.log(" ");
		console.log("                        Welcome to Bamazon");
		console.log("                 Below is our current inventory.");
		console.log("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *");
		console.table(res);
		console.log("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *");
		console.log(" ");
	//run the function for customer product selection, with all the products from the db.
	customerProdSelect(res);
	});
}

// Function for customer product selection
function customerProdSelect(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "Enter the Item ID of the item you would like to purchase.",
        validate: function(val) {
          return !isNaN(val);
        }
      }
    ])
    .then(function(val) {
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);
      if (product) {
        // run the function for quantity slection after the product is selected.
        customerQuantSelect(product);
      }
      else {
        // if the product id does not match the db notify user to make another selection.
        console.log(" ");
        console.log(" ");
        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log("That item is not in the inventory, please make another selection.");
        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log(" ");
        console.log(" ");
        listProducts();
      }
    });
}

// Function for customer quantity selection
function customerQuantSelect(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like?",
        validate: function(val) {
          return val > 0;
        }
      }
    ])
    .then(function(val) {
      var quantity = parseInt(val.quantity);

      // if the quantity does not match the amount available notify the user to make another selection.
      if (quantity > product.stock_quantity) {
      	console.log(" ");
      	console.log(" ");
      	console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log("Insufficient quantity in stock, please make another selection.");
        console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
        console.log(" ");
        console.log(" ");
        listProducts();
      }
      else {
        // run the function to make the purchase.
        makePurchase(product, quantity);
      }
    });
}

// Function to finalize the purchase of the user selection
function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
		console.log(" ");
		console.log(" ");
		console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
		console.log("Thank you for your purchase of " + quantity + " " + product.product_name + "'s!");
		console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
		console.log(" ");
		console.log(" "); 
      	process.exit();
    }
  );
}

// Function to check the inventory
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
}