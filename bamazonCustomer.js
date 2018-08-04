var mysql = require("mysql");
var inquirer = require('inquirer');
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function promptDatabaseWithList(QuestionString,ChoicesString,tableToQuery,objectToQuery)
{
    inquirer.prompt([
        {
            type: "rawlist",
            name: "list",
            message: QuestionString,
            choices: ChoicesString
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM " + tableToQuery + " WHERE " + objectToQuery + ' = "' + answer.userInput + '"',
        function (err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.log(res);
                input = answer.userInput;
                connection.end();
                if (answer === res.objectToQuery) {
                    return true;
                }
                else {
                    return false;
                }
            });
    })
}


function promptDatabaseWithInput(QuestionString,tableToQuery,objectToQuery)
{
    inquirer.prompt([
        {
            type: "input",
            message: QuestionString,
            name: "userInput",
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM " + tableToQuery + " WHERE " + objectToQuery + ' = "' + answer.userInput + '"',
         function (err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                connection.end();
                if (answer === res.objectToQuery) {
                    
                }
                else {
                    console.log("Please enter a valid product_id");
                }
            });
    })
}

function SellItem()
{
    inquirer.prompt([
        {
            type: "input",
            message: "Please Enter the item_id of the product you wish to purchase.",
            name: "item_id",
        },
        {
            type: "input",
            message: "Please Enter the amount of items you wish to purchase",
            name: "quantity",
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE item_id =" + answer.item_id,
         function (err, res) {
                if (err)
                {
                    
                }
                // Log all results of the SELECT statement
                if (res.length !== 0) {
                    console.log("validID");
                    console.log(res[0].stock_quantity);
                    console.log(answer.quantity);
                    if(res[0].stock_quantity >= answer.quantity)
                    {
                        console.log("we have enough items");
                        connection.query('UPDATE products SET stock_quantity = ' + (res[0].stock_quantity - answer.quantity) + ' WHERE item_id = ' + answer.item_id);
                        console.log("the cost of your total purchase: " + parseInt(res[0].price) * parseInt(answer.quantity));
                        ShowProducts();
                    }
                    else
                    {
                        console.log("we don't have enough of the items");
                        ShowProducts();
                    }
                }
                else {
                    console.log(res);
                }
            });
    })
}

function ShowProducts()
{
    connection.query("SELECT * FROM products",
         function (err, res) {
                if (err) throw err;
                console.log(res.length);
                var table = new Table({head: ['item_id', 'product_name',"department_name","price","stock_quantity"]});
               
                 for(var i = 0;i < res.length;i++)
                 {
                     table.push([res[i].item_id,res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity]);
                 }
                console.log(table.toString());
                SellItem();
         });
}

function afterConnection()
{
    ShowProducts();
}
