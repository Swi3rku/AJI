"use strict";
let todoList = [];


const BASE_URL = "https://api.jsonbin.io/v3/b/653eba5154105e766fc8c388";
const SECRET_KEY = "$2a$10$1f6SX0JGKkcVOXX.QPCEVu6Fz2g8MxdBlYvWEIUoiO1glH1ik3PV2";

window.onload = function () {
    $.ajax({
        url: BASE_URL,
        type: 'GET',
        headers: {
            'X-ACCESS-Key': SECRET_KEY
        },
        success: (data) => {
            console.log(data);
            todoList = data.record;
            updateTodoList();
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
};

let updateJSONbin = function () {
    $.ajax({
        url: BASE_URL,
        type: 'PUT',
        headers: {
            'X-ACCESS-Key': SECRET_KEY
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
};



let updateTodoList = function () {
    let todoListTable = $("#todoListView");

    // remove all elements
    var rowCount = todoListTable.find('tr').length;
    for (var i = rowCount - 1; i > 0; i--) {
        todoListTable[0].deleteRow(i);
    }

    //add all elements
    let filterInput = $('#inputSearch').val();
    let filterInputStartDate = new Date($('#inputSearchDate1').val());
    let filterInputEndDate = new Date($('#inputSearchDate2').val());
    for (let todo in todoList) {
        if (
            (filterInput === "" && isNaN(filterInputStartDate) && isNaN(filterInputEndDate)) ||
            ((todoList[todo].title.length > 0) && (todoList[todo].title.toLowerCase().includes(filterInput.toLowerCase())) ||
                ((todoList[todo].description.length > 0) && todoList[todo].description.toLowerCase().includes(filterInput.toLowerCase()))) &&
            ((isNaN(filterInputStartDate) || filterInputStartDate <= convertStringToDate(todoList[todo].dueDate)) &&
                (isNaN(filterInputEndDate) || filterInputEndDate >= convertStringToDate(todoList[todo].dueDate)))
        ) {
            let row = $("<tr>").appendTo(todoListTable);
            let newContentName = $('<td>').text(todoList[todo].title).appendTo(row);
            let newContentDesc = $('<td>').text(todoList[todo].description).appendTo(row);
            let newContentDate = $('<td>').text(todoList[todo].dueDate).appendTo(row);
            let newContentPlace = $('<td>').text(todoList[todo].place).appendTo(row);

            //delete button
            let newDeleteButton = $("<button>").text("x").attr("class", "btn btn-danger");
            newDeleteButton[0].addEventListener("click",
                function () {
                    deleteTodo(todo);
                });
            let delecteCell = $("<td>").attr("class", "deleteColumn");
            delecteCell.append(newDeleteButton);

            row.append(delecteCell);
        }
    }
};

let addTodo = function () {
    //get the form inputs value 
    let inputTitle = $('#inputTitle').val();
    let inputDescription = $("#inputDescription").val();
    let inputPlace = $("#inputPlace").val();
    let inputDate = new Date($("#inputDate").val()).toLocaleDateString();
    if (inputDate !== "Invalid Date") {
        //create new item
        let newTodo = {
            title: inputTitle,
            description: inputDescription,
            place: inputPlace,
            dueDate: inputDate
        };
        //add item to the list
        todoList.push(newTodo);
        updateJSONbin();
        updateTodoList();
    }
};

let deleteTodo = function (index) {
    todoList.splice(index, 1);
    updateJSONbin();
    updateTodoList();
};

let convertStringToDate = function (inputDateString) {
    if (inputDateString === null) {
        return null;
    }
    var parts = inputDateString.split('.'); // Split the input string into parts using dot as the delimiter
    if (parts.length === 3) {
        var day = parseInt(parts[0], 10); // Parse day as an integer
        var month = parseInt(parts[1], 10) - 1; // Parse month as an integer (months in JavaScript Date object are 0-indexed)
        var year = parseInt(parts[2], 10); // Parse year as an integer
        return new Date(year, month, day); // Create a new Date object (year, month, day)
    } else {
        return null; // Invalid input format
    }
};

let clearFilters = function () {
    $('#inputSearch').val("");
    $('#inputSearchDate1').val(null);
    $('#inputSearchDate2').val(null);
    updateTodoList();
};
