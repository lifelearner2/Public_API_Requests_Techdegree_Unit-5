/*Treehouse FSJS Techdegree
 *Project 5 - Public API Requests
 */

//----------------------------------------------
//GLOBAL VARIABLES
//----------------------------------------------

const url = "https://randomuser.me/api/?results=12&nat=us";
const employee = document.querySelectorAll(".card"); 
const gallery = document.getElementById("gallery"); //I added the html to this one below in showEmployees() so it shows gallery info on console
const employeeCard = ("");
const modal = document.getElementsByClassName("modal");
const body = document.querySelector("body"); //not doing anything

//console.log(body); //not giving anything
//console.log(employee); //returning node info once I added "All", prior to that it was returning "null"
console.log(gallery); //returns commented out info from html but also the individual employee card info that I added to it.(div class card)
//console.log(employeeCard); //returns a link to the html
//console.log(modal); //returns html collection

//----------------------------------------------
//FETCH FUNCTIONS
//----------------------------------------------

//WARNING: do not use the 'format document' feature as it adds parentheses where not needed. Actually, this may have been a coding issue

//STEP 4: Get & display 12 random users using Random User Generator API -DONE
// Use the fetch method to request information from a data source  -DONE
// That data returned needs to be cleaned up and converted into a format we use, so we take the response and run the json() method on the data. -DONE
// Then we grab that new, more accessible dataset and start working with it! -DONE

fetch(url)
  .then((response) => response.json())
  .then((data) => showEmployees(data.results)); //running the show employee function

 //const data = data.json(); //error says cannot access data before initialization

//Function to return fetch method
function fetchData(url) {   
  return fetch(url) 
    .then(checkStatus) //if fetch promise fulfilled, it will check status of response
    .then((res) => res.json()) //if resolved.then method parses response to json
    .then((data) => console.log(data.results)) //fetchData func will return promise once data is retrieved and parsed to json. populates an array of empployees and info
    .catch((error) => console.log("Sorry, something went wrong", error)); //This error message is printed to console when I click on an employee card.
}

fetchData(url) //when I type this into console it shows promise is "pending", the promiseState is "fulfilled" and promise Result is 'undefined'

function fetchSelectedEmployee() {
    const selectedEmployee = selectedEmployee.value;  
    const img = document.querySelector('img');
    const p = document.querySelector('p');

    fetchData('https://randomuser.me/api/?results=12&nat=us')
}

//----------------------------------------------
//HELPER FUNCTIONS
//----------------------------------------------
function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
// create a function that takes in an array of employees
function showEmployees(data) {
  let employeeCard = data.map((employee) => {
    //console.log(employee);  //shows all employees & info in console.log, but will only show one employee on console/page when modalContainer() or modal() is called w/in this function. So probably don't call it here.
    //console.log(employeeCard); //stops images on webpage from showiing...says cannot use before initialization. 
    //console.log(showEmployees); //shows everything I wrote in this function 

    const html = `<div class="card">
    <div class="card-img-container">
      <img class="card-img" src="${employee.picture.medium}" alt="profile picture">  
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${employee.name.first}, ${employee.name.last}</h3>
        <p class="card-text">${employee.email}</p>
        <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
    </div>
</div>`;
    gallery.insertAdjacentHTML("beforeend", html);
    //console.log(html); //shows all the template literal div info from the html
  });

}

//----------------------------------------------
//EVENT LISTENERS
//----------------------------------------------

gallery.addEventListener("click", (e) => {
  if (e.target.className === "card"){
      showModal(); //not sure what to pass in ()
      console.log("button clicked");
  }
}); //this button does not work
//select.addEventListener('change', fetchData); //this said select was not defined
gallery.addEventListener('click', gallery); //this triggered the checkStatus message on console and button did not give what i wanted - when I had fetch Data in there.
//None of the variables I pass in the second spot seem to be giving anything or allowing me to move forward 

gallery.addEventListener("click", (e) => {
    if(e.target(".modal-close-btn")) {   //console says e.target is not a function
        for(let i=0; i <modal.length; i++) {
console.log("button clicked");
        }
    }
})
// html.addEventListener("click", (e) => {
//                     if (e.target.className === "card"){
//                         showModal(); //not sure what to pass in ()
//                     }
//                 }); //this button does not work
        
// document.getElementById('gallery').addEventListener("click", (e) => {
//     showModal();
// });    //console says modalContainer is not defined when placed here after clicking a card.

// NOTE: When adding or concatenating to the DOM, avoid doing this: element.innerHTML += 'HTML string'. That technique rewrites the entire DOM. This is problematic because any rewritten elements won't retain any event listeners that were attached to the DOM before the rewrite occurs. Use this method instead: element.insertAdjacentHTML('beforeend', 'HTML string'). That technique will allow you to add strings of HTML to the DOM without disrupting what already exists in the DOM.

//STEP 5: Creates a popup/overlay modal window to view employee
//Modal markup:
// have a look at the index.html file. There you’ll find a snippet to see how the modal should be structured.
// Here’s how the pseudo code would look like to get this working:
// Store the fetched employee data in a global variable
// Create a function to show the modal that accepts an index
// With that index you can grab the data of the clicked employee (for example employees[index]
// Use that employee object to generate the HTML for the Modal
// Append that modal HTML to the body of the document
//use markup below as a template for your modal, but you must use JS to create and append it to `body`.

//create a function to choose one employee from array
// loop over each of the employees
// for each employee generate the .card html

function generateCard (data) {
    for(let i=0; i<employeeCard.length; i++) {
    const chosenEmployee = data.map((employee) => {
      let employeeCard = 
      `<div class="card">
      <div class="card-img-container">
          <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">first last</h3>
          <p class="card-text">email</p>
          <p class="card-text cap">city, state</p>
      </div>
  </div>`;
    }
    }
}
    function showModal (data) {
    let modalContainer = 
                `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${employee.picture.medium}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${employee.name}</h3>
                        <p class="modal-text">${employee.email}</p>
                        <p class="modal-text cap">${employee.location.city}</p>
                        <hr>
                        <p class="modal-text">${employee.phone}</p>
                        <p class="modal-text">${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                        <p class="modal-text">Birthday: ${employee.dob}</p>
                    </div>
                </div>`;

        }
      
// append that html to the #gallery container
gallery.body.insertAdjacentHTML('beforeend', modalContainer)
gallery.innerHTML = ""; //not doing anything?

// Gallery container    < class="search-container">
// use the markup on html as a template for your search feature and append it to this `search-container` div.
// Search markup:
// Use the commented out markup below as a template
// for your search feature and append it to this `search-container` div.
const searchContainer =
`<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`


//const html = data.results; //this doesn't work (data is not defined)
//const arrayList = [];
//const data = employeeInfo;
//function employeeArray (data) {
    //select.innerHTML = ;
    }

//const arrayList = data.map(employeeInfo =>(employeeInfo, gallery) )
// let results = data.results;
// data.forEach(function (lists) {
//     html ;
// })

//})
//modalContainer(); //not defined if calling it here
    //modal(); //employee not defined in div when I call this here
// ---------------------

//console.log(html); //Seems to show a placeholder of an employee card info in console.
//console.log(employeeDirectory);
//console.log(gallery); //shows gallery html info in console.

//gallery.insertAdjacentHTML("beforeend", html);

//}