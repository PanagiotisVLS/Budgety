/****************
Budget Controller
****************/

var budgetController = (function()
{

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
        inputBtn: ".add__btn"
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
    var DOM = UICtrl.getDOMstrings();
    
    var ctrlAddItem = function()
    {
        // 1. Get the field input data
        var input = UICtrl.geinput();
        console.log(input);
        // 2. Add the item to the button controller
        // 3. Add the item to the UI
        // 4. Calculate the budget
        // 5. Display the budget on the UI
        console.log("It works");
    }
    
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    
    document.addEventListener("keypress", function(event) 
    {
        if (event.keyCode === 13 || event.which === 13)
        {
            ctrlAddItem();
        }
        
            
    });
                                                         
})(budgetController, UIController);