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

function ShowList()
{
    inquirer.prompt([
        {
            type: "rawlist",
            name: "list",
            message: "Options:",
            choices: ["1:View Products for Sale","2:View Low Inventory","3:Add to Inventory","4:Add New Product"]
        }
    ]).then(function (answer) {
        switch(answer.list[0])
        {
            case "1":
            {
                connection.query("SELECT * FROM products",
                function (err, res) {
                       if (err) throw err;
                       var table = new Table({head: ['item_id', 'product_name',"department_name","price","stock_quantity"]});
                      
                        for(var i = 0;i < res.length;i++)
                        {
                            table.push([res[i].item_id,res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity]);
                        }
                       console.log(table.toString());
                       ShowList();
                    });
                
                break
            }
            case "2":
            {
                connection.query("SELECT * FROM products WHERE stock_quantity < 5",
                function (err, res) {
                    if (err) throw err;
                    var table = new Table({head: ['item_id', 'product_name',"department_name","price","stock_quantity"]});
                   
                     for(var i = 0;i < res.length;i++)
                     {
                         table.push([res[i].item_id,res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity]);
                     }
                    console.log(table.toString());
                    ShowList();
                });
                
                break
            }
            case "3":
            {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Please Enter the item_id of the product you wish to update.",
                        name: "item_id",
                    },
                    {
                        type: "input",
                        message: "Please Enter the amount of items you wish to add",
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

                                    connection.query('UPDATE products SET stock_quantity = ' + (res[0].stock_quantity + answer.quantity) + ' WHERE item_id = ' + answer.item_id);                                
                            }
                            ShowList();
                        });
                    });
                break
            }
            case "4":
            {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Please enter the new product name",
                        name: "name",
                    },
                    {
                        type: "input",
                        message: "Please Enter the department of the new item",
                        name: "department",
                    },
                    {
                        type: "input",
                        message: "Please Enter the price of the new item",
                        name: "price",
                    },
                    {
                        type: "input",
                        message: "Please Enter the quantity of the new item",
                        name: "quantity",
                    }
                ]).then(function (answer) {
                        connection.query("SELECT * FROM products ORDER BY item_id DESC LIMIT 0, 1",
                        function (err, res) {
                            if (err)
                            {
                                
                            }
                            // Log all results of the SELECT statement
                            if (res.length !== 0) {
                                connection.query("INSERT INTO products (item_id,product_name,department_name,price,stock_quantity)  VALUES (?,?,?,?,?)",[res[0].item_id + 1,answer.name,answer.department,answer.price,answer.quantity]);
                            }
                            ShowList();
                        });
                    });                            
                break
            }
        }
        
    })
    
}

function afterConnection()
{
    ShowList();
}