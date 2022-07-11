/*Treehouse FSJS Techdegree
 *Project 5 - Public API Requests
 */

//----------------------------------------------
//GLOBAL VARIABLES
//----------------------------------------------

//created variable for the API link and requested results for 12 U.S. citizens
const url = "https://randomuser.me/api/?results=12&nat=us";
//created variable to hold the html info from the class "card"
const employee = document.querySelectorAll(".card"); 
//created variable to hold the employee info 
const gallery = document.getElementById("gallery"); //I added the html to this one below in showEmployees() so it shows gallery info on console
//created variable with an empty string
const employeeCard = "";
const modal = document.getElementsByClassName("modal");
const body = document.querySelector("body"); //not doing anything
//created variable and set it to an empty array
let employeeData = [];
const divCard = document.getElementsByClassName("card")

//Typing the following directly to console: 
//console.log(employee); //returning node info once I added "All", prior to that it was returning "null"
console.log(gallery); //returns the individual employee card info and their index that I added to it.(div class card)
//console.log(modal); //returns html collection


//----------------------------------------------
//FETCH FUNCTIONS
//----------------------------------------------

//STEP 4: Get & display 12 random users using Random User Generator API -DONE
// Use the fetch method to request information from a data source  -DONE
// That data returned needs to be cleaned up and converted into a format we use, so we take the response and run the json() method on the data. -DONE
// Then we grab that new, more accessible dataset and start working with it! -DONE

fetch(url)
  .then((response) => response.json())
  .then((data) => showEmployees(data.results)); //running the show employee function - this shows them on the webpage

//Function to return fetch method
function fetchData(url) {   
  return fetch(url) 
    .then(checkStatus) //if fetch promise fulfilled, it will check status of response
    .then((res) => res.json()) //if resolved.then method parses response to json
    .then((data) => {
      employeeData = data.results
    }) //fetchData func will return promise once data is retrieved and parsed to json. populates an array of employees and info
    .catch((error) => console.log("Sorry, something went wrong", error)); //This error message was printed at point to console when I clicked on an employee card, but not currently.
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
//assign an index so each card is assigned a number to loop through
function showEmployees(data) {
  let employeeCard = data.map((employee, index) => {
    const html = `<div class="card" index = "${index}">
    <div class="card-img-container">
      <img class="card-img" src="${employee.picture.medium}" alt="profile picture">  
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p class="card-text">${employee.email}</p>
        <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
    </div>
</div>`;
    gallery.insertAdjacentHTML("beforeend", html); 
  });
  //showModal(data); //This only shows a random employee on the modal window (without clicking on anything)
  getEmployeeCard(data); //calling this makes the modal window pop up with the first positioned employee
  //return;
}

//maybe look at what I'm passing here and try to specify the clicked employee rather than all.
function getEmployeeCard (data, index) {
const cardArray = document.getElementsByClassName("card");
for (let i= 0; i<cardArray.length; i++) {
  cardArray[i].addEventListener("click", (e) => {
    showModal(data) = cardArray[i]; //this shows the modal window popup
    //showModal(data)
  } )
}
}

//----------------------------------------------
//EVENT LISTENERS
//----------------------------------------------

// gallery.addEventListener("click", (e) => {
//   if (e.target.className !== "gallery"){
//       gallery(e.target.index); 
//       console.log("button clicked");
//   }
// }); //this button does not work...can't seem to get the right names added

//gallery.addEventListener('change', index); 
//gallery.addEventListener('click', gallery); //this triggered the checkStatus message at one point on console and button did not give what i wanted - when I had fetch Data in there.
// //None of the variables I pass in the second spot seem to be giving anything or allowing me to move forward 


// html.addEventListener("click", (e) => {
//                     if (e.target.className === "card"){
//                         showModal(employeeData); //not sure what to pass in ()
//                     }
//                 }); //this button does not work
        
// document.getElementById('gallery').addEventListener("click", (e) => {
//     showModal();
// });    //doesn't work

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

 function showModal(data) {
     let divCard = data.forEach((employee, index) => {
      //console gives an error on array.forEach   
        
      let modalContainer = "";
         modalContainer = 
                `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${employee.picture.medium}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                        <p class="modal-text">${employee.email}</p>
                        <p class="modal-text cap">${employee.location.city}</p>
                        <hr>
                        <p class="modal-text">${employee.phone}</p>
                        <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                        <p class="modal-text">Birthday: ${employee.dob.date} </p>
                    </div> 
                </div>`;

                //event listener

                  //read article to fix format for DOB
                // append that html above to the #gallery container
                document.body.insertAdjacentHTML('beforeend', modalContainer) //If I comment this line out - the modal window will not open
              //if I change "body" to gallery it stops popping up the window.
              const closeButton = document.getElementById("modal-close-btn.modal-close-btn")
                //creating an event listener to close the modal  - it's not working yet.
                
                closeButton[index].addEventListener("click", (e) => {   

                  //putting the word 'button', 'closeButton' in front made the person in "first position" appear in modal but if I click another it still only shows the first person!
                  //if I try to add [i] or index in attempt to match what I clicked it comes up as undefined.
                  //says cannot ready prop of null (reading '0') in the closeButton[index]
                  
                  
                  "chosenEmployee" //{   //console says e.target is not a function when I click a card

                      //for(let i=0; i <modal.length; i++) {
              console.log("button clicked"); //this was (not now) working when I click on an employee card in directory - it says "button clicked on console"
                     // }
                  })
              })
        };
     // }
  
//gallery.innerHTML = ""; //not doing anything

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
//is this for the "search box/window"?













