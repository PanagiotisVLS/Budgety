/****************
Budget Controller
****************/

var budgetController = (function()
{
    // Function Constructor for the records
    var Expense = function(id, description, value)
    {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var Income = function(id, description, value)
    {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type) 
    {
        var sum = 0;
        data.allItems[type].forEach(function(cur) 
                                   {
           sum += cur.value; 
        });
        data.totals[type] = sum;
    };
    
    var data = {
        allItems: 
        {
            exp: [],
            inc: []
        },
        
        totals: 
        {
            exp: 0,
            inc: 0
        },
        
        budget: 0,
        
        percentage: -1
    };
    
    return {
        addItem: function(type, description, value)
        {
            var newItem, ID;
            
            // Create new ID
            if (data.allItems[type].length > 0)
            {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            else
            {
               ID = 0; 
            }
            
            
            // Create new item based on type
            if(type === "exp")
            {
                newItem = new Expense(ID, description, value);
            }
            else if (type === "inc")
            {
                newItem = new Income(ID, description, value);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;
        },
        
        
        calculateBudget: function()
        {
            // calculate total income and expenses
            calculateTotal("exp");
            calculateTotal("inc");

            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            // calculate the percentage of income that we spent
            data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
        },
        
        getBudget: function()
        {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.totals.percentage
            };
        },
        
        testing: function()
        {
            console.log(data);
        }
        
        
    };
    
})();


/************
UI Controller
************/

var UIController = (function()
{
    // Creates an object to store all the strings of the appliction
    // So it's easier to change if needed.
    var DOMStrings = 
    {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list"

    };
    
    return {
        geinput: function()
        {   
            return {
                type: document.querySelector(DOMStrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },
        
        addListItem: function(obj, type)
        {
            var html, newHTML, element;
            // Create HTML string with placeholder text
            
            if (type === "inc")
            {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else if (type === "exp")
            {
                element = DOMStrings.expensesContainer;
               html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'; 
            }
            
            // Replace the Placeholder text with some actual data
            newHTML = html.replace("%id%", obj.id);
            newHTML = newHTML.replace("%description%", obj.description);
            newHTML = newHTML.replace("%value%", obj.value);
            
            //Inster the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML("beforeend", newHTML);
        },
        
        clearFields: function()
        {
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMStrings.inputDescription + ", " + DOMStrings.inputValue);
            
            var fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array) 
                             {
                current.value = "";
            })
            
            fieldsArr[0].focus();
        },
        
        getDOMstrings: function()
        {
            return DOMStrings;
        }
    }
})();


/********************
Global App Controller
********************/

var controller = (function(budgetCtrl, UICtrl) 
{
    // Initializes the events listeners
    var setupEventListeners = function()
    {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    
        document.addEventListener("keypress", function(event) 
        {
            if (event.keyCode === 13 || event.which === 13)
            {
                ctrlAddItem();
            }    
        });
    };
    
    var updateBudget = function ()
    {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        
        // 3. Display the budget on the UI
        console.log(budget);
    };
    
    // Gets called when we want to add a new item
    var ctrlAddItem = function()
    {
        var input, newItem;
        
        // 1. Get the field input data
        input = UICtrl.geinput();
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0)
        {
            // 2. Add the item to the button controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();
        }
        
        
        
        console.log("It works");
    }        
    
    return {
        init: function()
        {
            console.log("Application has started.");
            setupEventListeners();
        }
    }
})(budgetController, UIController);

// Initializes the controller which includes the code
controller.init();