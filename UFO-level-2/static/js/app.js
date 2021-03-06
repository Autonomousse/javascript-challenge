// Create a variable to refer to data.js
var table_data = data;

// Use the map function to create a new array with all of the item values from the dataset.
// Call the createArrays function to retreive options to display on the dropdown for users to select from.
var date = table_data.map(dates => dates.datetime);
createOptions(date, "#date");

var country = table_data.map(countries => countries.country).sort();
createOptions(country, "#country");

var state = table_data.map(states => states.state).sort();
createOptions(state, "#state");

var city = table_data.map(cities => cities.city).sort();
createOptions(city, "#city");

var shape = table_data.map(shapes => shapes.shape).sort();
createOptions(shape, "#shape");

// Select the button ID
// Select the form where the user enters the date
var filter_button = d3.select("#filter-btn");
var reset_button = d3.select(".reset");
var dateSelect = d3.select("#date");
var countrySelect = d3.select("#country");
var stateSelect = d3.select("#state");
var citySelect = d3.select("#city");
var shapeSelect = d3.select("#shape");

// Create event handlers for the user input and button click
filter_button.on("click", searchData);
reset_button.on("click", reset);
dateSelect.on("submit");
countrySelect.on("submit");
stateSelect.on("submit");
citySelect.on("submit");
shapeSelect.on("submit");

/* 
 *  Find only the unique values and create an array of unique values.
 *  Select the selection dropdown where the options will be populated.
 *  Use the forEach function to loop through each unique value and create a dropdown option for it.
 */
function createOptions(value, id) {
    var unique = Array.from(new Set(value));
    var options = d3.select(`${id}`);
    unique.forEach(item => options.append("option").text(`${item}`));
}

// Create a function to handle the events and return the correct data
function searchData() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element where the user enters the search parameters and get the raw HTML nodes
    var date_element = d3.select("#date");
    var country_element = d3.select("#country");
    var state_element = d3.select("#state");
    var city_element = d3.select("#city");
    var shape_element = d3.select("#shape");

    // Get the value property of the input element (the search parameters the user entered)
    var datetime = date_element.property("value");
    var country = country_element.property("value");
    var state = state_element.property("value");
    var city = city_element.property("value");
    var shape = shape_element.property("value");

    // Clear the error message.
    var error_msg = d3.select("h4");
    error_msg.text("");

    /*  
     *  Use a try, catch, and throw statement to let the user know if their selections have no results.
     *  Use nested if/else if statements to search for every possible combination a user could enter and return a table or error.
     */
    try {
        if (datetime !== "") {
            var filter_date = table_data.filter(data => data.datetime === datetime);
            returnData(filter_date);
            if (datetime !== "" && country !== "") {
                var filter_country = filter_date.filter(data => data.country === country);
                returnData(filter_country);
                if (filter_country.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                if (datetime !== "" && country !== "" && state !== "") {
                    var filter_state = filter_country.filter(data => data.state === state);
                    returnData(filter_state);
                    if (filter_state.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                    if (datetime !== "" && country !== "" && state !== "" && city !== "") {
                        var filter_city = filter_state.filter(data => data.city === city);
                        returnData(filter_city);
                        if (filter_city.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                        if (datetime !== "" && country !== "" && state !== "" && city !== "" && shape !== "") {
                            var filter_shape = filter_city.filter(data => data.shape === shape);
                            returnData(filter_shape);
                            if (filter_shape.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                        }
                    }
                    else if (datetime !== "" && country !== "" && state !== "" && shape !== "") {
                        var filter_shape = filter_state.filter(data => data.shape === shape);
                        returnData(filter_shape);
                        if (filter_shape.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                    }
                }
                else if (datetime !== "" && country !== "" && city !== "") {
                    var filter_city = filter_country.filter(data => data.city === city);
                    returnData(filter_city);
                    if (filter_city.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                    if (datetime !== "" && country !== "" && city !== "" && shape !== "") {
                        var filter_shape = filter_city.filter(data => data.shape === shape);
                        returnData(filter_shape);
                        if (filter_shape.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                    }
                }
                else if (datetime !== "" && country !== "" && shape !== "") {
                    var filter_shape = filter_country.filter(data => data.shape === shape);
                    returnData(filter_shape);
                    if (filter_shape.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                }
            }
            else if (datetime !== "" && state !== "") {
                var filter_state = filter_date.filter(data => data.state === state);
                returnData(filter_state);
                if (filter_state.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                if (datetime !== "" && state !== "" && city !== "") {
                    var filter_city = filter_state.filter(data => data.city === city);
                    returnData(filter_city);
                    if (filter_city.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                    if (datetime !== "" && state !== "" && city !== "" && shape !== "") {
                        var filter_shape = filter_city.filter(data => data.shape === shape);
                        returnData(filter_shape);
                        if (filter_shape.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                    }
                }
                else if (datetime !== "" && state !== "" && shape !== "") {
                    var filter_shape = filter_state.filter(data => data.shape === shape);
                    returnData(filter_shape);
                    if (filter_shape.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                }
            }
            else if (datetime !== "" && city !== "") {
                var filter_city = filter_date.filter(data => data.city === city);
                returnData(filter_city);
                if (filter_city.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                if (datetime !== "" && city !== "" && shape !== "") {
                    var filter_shape = filter_city.filter(data => data.shape === shape);
                    returnData(filter_shape);
                    if (filter_shape.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                }
            }
            else if (datetime !== "" && shape !== "") {
                var filter_shape = filter_date.filter(data => data.shape === shape);
                returnData(filter_shape);
                if (filter_shape.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
            }
        }
        else if (country !== "") {
            var filter_country = table_data.filter(data => data.country === country);
            returnData(filter_country);
            if (country !== "" && state !== "") {
                var filter_state = filter_country.filter(data => data.state === state);
                returnData(filter_state);
                if (filter_state.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                if (country !== "" && state !== "" && city !== "") {
                    var filter_city = filter_state.filter(data => data.city === city);
                    returnData(filter_city);
                    if (filter_city.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                    if (country !== "" && state !== "" && city !== "" && shape !== "") {
                        var filter_shape = filter_city.filter(data => data.shape === shape);
                        returnData(filter_shape);
                        if (filter_shape.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                    }
                }
                else if (country !== "" && state !== "" && shape !== "") {
                    var filter_shape = filter_state.filter(data => data.shape === shape);
                    returnData(filter_shape);
                    if (filter_shape.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                }
            }
            else if (country !== "" && city !== "") {
                var filter_city = filter_country.filter(data => data.city === city);
                returnData(filter_city);
                if (filter_city.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                if (country !== "" && city !== "" && shape !== "") {
                    var filter_shape = filter_city.filter(data => data.shape === shape);
                    returnData(filter_shape);
                    if (filter_shape.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                }
            }
            else if (country !== "" && shape !== "") {
                var filter_shape = filter_country.filter(data => data.shape === shape);
                returnData(filter_shape);
                if (filter_shape.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
            }
        }
        else if (state !== "") {
            var filter_state = table_data.filter(data => data.state === state);
            returnData(filter_state);
            if (state !== "" && city !== "") {
                var filter_city = filter_state.filter(data => data.city === city);
                returnData(filter_city);
                if (filter_city.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                if (state !== "" && city !== "" && shape !== "") {
                    var filter_shape = filter_city.filter(data => data.shape === shape);
                    returnData(filter_shape);
                    if (filter_shape.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
                }
            }
            else if (state !== "" && shape !== "") {
                var filter_shape = filter_state.filter(data => data.shape === shape);
                returnData(filter_shape);
                if (filter_shape.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
            }
        }
        else if (city !== "") {
            var filter_city = table_data.filter(data => data.city === city);
            returnData(filter_city);
            if (city !== "" && shape !== "") {
                var filter_shape = filter_city.filter(data => data.shape === shape);
                returnData(filter_shape);
                if (filter_shape.length == 0) throw "Sorry, your search parameters are out of this world! Please try again!";
            }
        }
        else if (shape !== "") {
            var filter_shape = table_data.filter(data => data.shape === shape);
            returnData(filter_shape);
        }
    }

    // Catch statement to display message to the user. 
    catch (err) {
        error_msg.text(err);
    }
}

// Function that returns the data in a table format for given filters.
function returnData(data) {
    // Select the table body by ID, where table rows will be created for each element
    var tbody = d3.select("tbody");

    // Remove any children elements from the table
    tbody.html("");

    // Append each element in a new table data row
    data.forEach(sighting => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var info = row.append("td");
            info.text(value);
        });
    });
}

function reset() {
    // Reloads the page and clears the selections and form
    location.reload();
}