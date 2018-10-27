// optional for part 2 of challenge
var mysql = require('mysql');
var inquirer = require('inquirer');

// connection
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Itcear01",
    database: "bamazon_DB"
});
// list a set of menu options:
    // View Products for Sale
        // if selected, will list every available item ID, name, price, and quantity
    // View Low Inventory
        // will list all items with an inventory count lower than 5
    // Add to Inventory
        // display a prompt to allow manager to "add more" of any item currently in store
    // Add New Product  
        // allow to add a completely new product to store

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
        
            // console.log("");
    console.log(`
            Bamazon! It's like Amazon, but its Bammin' and Slammin' and way better because I made it!

            **Manager edition**
        
            ======================================================================================
            Press
        
            Control + C
        
            To quit at any time!
            ======================================================================================
            `);
    start();
});

function start() {
    console.log("lets begin");

    inquirer
        .prompt([{
            name: "choice",
            type: "rawlist",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            message: "What action would you like to do, Manager?"
    
        }])
        .then(
            console.log(answer)
            // this console.log isnt working yet. pick back up here.
        )


}

        