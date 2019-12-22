// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

// This function will build table
function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");

    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        // Append a row to the table body
        let row = tbody.append("tr");
        // Loop through each field in the dataRow and add each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
}

// Filters: Data, City, State, Country, Shape
// Keep track of all filters
var filters = {};

// This function will update the filters based on input
function updateFilters() {

    // Save the element, value, and id of the filter that was changed
    let date = d3.select("#datetime").property("value");
    let city = d3.select("#cityfilter").property("value");
    let state = d3.select("#statefilter").property("value");
    let country = d3.select("#countryfilter").property("value");
    let shape = d3.select("#shapefilter").property("value"); 

    // If a filter value was entered then add that filterId and value to the filters list. Otherwise, clear that filter from the filters object.
    
    if (date) {
        filters.datetime = date;    
    } else {
        filters.datetime = null;
    }
    
    if (city) {
        filters.city = city;
    } else {
        filters.city = null;
    }
    
    if (state) {
        filters.state = state;
    } else {
        filters.state = null;
    }
    
    if (country) {
        filters.country = country;
    } else {
        filters.country = null;
    }
    
    if (shape) {
        filters.shape = shape;
    } else {
       filters.shape = null;
    }

    // Call function to apply all filters and rebuild the table
    filterTable();
}

// This function will filter the table
function filterTable() {

    // Set the filteredData to the tableData 
    let filteredData = tableData; 

    // Loop through all of the filters and keep any data that matches the filter values
    // Using a for...of loop instead of forEach as I found it was better practice.
    // forEach loop would start like this: 
    // Object.entries(filters).forEach(([key, value])
    
    for(const [key, value] of Object.entries(filters)) {  
        if (value) {
            filteredData = filteredData.filter(row => row[key] === value);
        }
    }

  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
d3.selectAll("#filter-btn").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData);
