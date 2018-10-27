// connection

// display all items for sale: ID's, names, prices

// prompt with two messages: "what is the ID of the product you would like to buy?", "how many units of product would you like to buy?"

// if/then to check if the store has enough product to mee the customer's request, if not the app will say "Insufficient quantity!" and then prevent the order from going through

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    // console.log("");
    console.log(`
    Bamazon! It's like Amazon, but its Bammin' and Slammin' and way better because I made it!

    ======================================================================================
    Press

    Control + C

    To quit at any time!
    ======================================================================================
    `);
    start();
});


function start() {
    console.log("start function initiated");

    connection.query("SELECT * FROM bamazon_db.products", function (err, results) {
        if (err) throw err;
        //   console.log(results);
        // console.log();
        inquirer
            .prompt([{
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var productNames = [];
                        for (var i = 0; i < results.length; i++) {
                            productNames.push(results[i].product_name);
                        }
                        return productNames;
                    },
                    message: "What item ID would you like to buy?"
                },
                {
                    name: "bid",
                    type: "input",
                    message: "how many of the item would you like to buy?"
                }


            ])
            .then(
                // line 118 in greatBayBasic.js
                function (answer) {
                    // var to more easily differentiate between the item selected by user and the same item in the database
                    var chosenItem;
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].product_name === answer.choice) {
                            chosenItem = results[i];
                        }
                    }
                    // declaring the ID of the item for ease
                    var itemID = chosenItem.item_id
                    // console.log("item id: " + itemID);


                    console.log(`
{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}

                                                ${chosenItem.product_name} quantity in stock
                                                =========================
                                                ${chosenItem.stock_quantity} at $${chosenItem.price} each
                                                =========================
                                            You have selected to purchase ${answer.bid} ${answer.choice}

{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}

                    `);
                    // console.log(chosenItem)
                    var selectionAmount = answer.bid;
                    var storeQuantity = chosenItem.stock_quantity
                    if (selectionAmount > storeQuantity) {
                        console.log(`
                      {{{{{{{}}}}}}}
               {{{{{{{{{{{{{{}}}}}}}}}}}}}}                        
{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}                       
                "Insufficient quantity!"
{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}        
               {{{{{{{{{{{{{{}}}}}}}}}}}}}}                        
                      {{{{{{{}}}}}}}

                        `);

                        console.log(`

    ${chosenItem.product_name} quantity in stock
     =========================
            ${chosenItem.stock_quantity}
    =========================
    You have selected to purchase ${answer.bid} ${answer.choice}
                                        `);

                                        start();
                                    } else if (selectionAmount <= storeQuantity) {
                                        // if they select an item and it is in stock
                                        console.log("let me get that order placed for you!");
                
                                        var newStoreQuantity = storeQuantity - selectionAmount;
                
                                        var updateQueryStr = 'UPDATE products SET stock_quantity = ' + newStoreQuantity + ' WHERE item_id = ' + itemID;
                                        // console.log('updateQueryStr = ' + updateQueryStr);
                                    connection.query(updateQueryStr, function (err, data){
                                        if (err) throw err;
                                        console.log('Your order has been placed. Your total is $' + chosenItem.price * answer.bid)
                                    })
                                    inquirer.prompt([
                                        {
                                            name:"choice",
                                            type: "rawlist",
                                            message: "would you like to buy anything else?",
                                            choices: ["YES", "NO"]
                                        }
                                        
                                    ]
                                    ).then(function(answer){
                                        // console.log("answer: " + answer.choice);
                                        // console.log("ans.reply: " + ans.reply);
                                        if(answer.choice === "YES") {
                                            start()
                                        }
                                        else {
                                            console.log(`
                        =================================================================================  
                       Thank you for shopping at Bamazon! I hope you have a Bammin' Slammin' Beautiful day!
                        =================================================================================                    
                                            `);
                                            connection.end()
                                        }
                
                                    })
                                    }
                
                                }
                
                
                            )
                    });
                
                
                }