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
        }
    };
    
    return {
        addItem: function(type, description, value)
        {
            var newItem, ID;
            
            // Create new ID
            if (data.allItems[type].length > 0)
            {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;    /***************** Q&a *******************************/
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
                value: document.querySelector(DOMStrings.inputValue).value
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
    }
    
    // Gets called when we want to add a new item
    var ctrlAddItem = function()
    {
        var input, newItem;
        
        // 1. Get the field input data
        input = UICtrl.geinput();
        
        // 2. Add the item to the button controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        // 4. Calculate the budget
        // 5. Display the budget on the UI
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