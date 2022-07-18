/*Treehouse FSJS Techdegree
 *Project 5 - Public API Requests
 */

//----------------------------------------------
//GLOBAL VARIABLES
//----------------------------------------------

//created variable for the API link and requested results for 12 U.S. citizens
const url = "https://randomuser.me/api/?results=12&nat=us";
//created variable to hold the employee info
const gallery = document.getElementById("gallery"); //I added the html to this one below in showEmployees() so it shows gallery info on console
//created variable with an empty string
let employeeCard = "";
const modal = document.getElementsByClassName("modal");
const body = document.querySelector("body"); //not doing anything
//created variable and set it to an empty array
let employeeData = [];
console.log(gallery); //returns the individual employee card info and their index that I added to it.(div class card)

//----------------------------------------------
//FETCH FUNCTIONS
//----------------------------------------------

//STEP 4: Function to return fetch method
function fetchData(url) {
  return fetch(url)
    .then(checkStatus) //if fetch promise fulfilled, it will check status of response
    .then((res) => res.json()) //if resolved.then method parses response to json
    .then((data) => {
      employeeData = data.results; //this gets saved to the empty array variable
      showEmployees(employeeData); //running the show employee function - this shows them on the webpage. The employee data which has the data.results will be passed in here- the div elements must match the employees on screen and now they do
    }) //fetchData func will return promise once data is retrieved and parsed to json. populates an array of employees and info
    .catch((error) => console.log("Sorry, something went wrong", error)); //This error message was printed at point to console when I clicked on an employee card, but not currently.
}
fetchData(url);

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

//Created a function that takes in an array of employees, assigned an index so each card is assigned a number to loop through using .map
//Used 'data-index' to grab the clicked item to show in modal
function showEmployees(data) {
  employeeCard = data.map((employee, index) => {
    const html = `<div class="card" data-index="${index}">
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
  const cardArray = document.getElementsByClassName("card");
  getEmployeeCard(cardArray, data); //calling this makes the modal window pop up with the first positioned employee
}
//const cardArray = document.getElementsByClassName("card");
function getEmployeeCard(cardArray, data) {
  console.log(data); //this shows an array of the 12 employees with their info
  console.log(data[2]); //testing to view just this one employee
  for (let i = 0; i < cardArray.length; i++) {
    cardArray[i].addEventListener("click", (e) => {
      //event listener for the array of employee cards
      showModal(data[i]); //passing selected employee to show in modal
      console.log("testing button click");
    });
  }
}

//----------------------------------------------
//EVENT LISTENERS
//----------------------------------------------

//STEP 5: Created a popup/overlay modal window to view employee
//created a function to choose one employee from array
function showModal(employee) {
  const test = new Date(employee.dob.date);
  const birthday = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(test);

  let modalContainer = "";
  //I added a button to toggle between the gallery and the modal (extra credit)
  modalContainer = `<div class="modal-container">
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
                        <p class="modal-text">Birthday: ${birthday} </p>
                    </div> 
                  <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
                </div>`;
  
//Extra credit: created event listener for prev/next buttons - purpose: to view prev/next employee while still in modal window
//prev/next buttons are not active yet
 //const prevButton = document.getElementById("modal-prev");
//console.log(prevButton);
//  document.getElementById("modal-prev").addEventListener("click", (e) => {
//    showModal(data[i]);
//   });
 

  // append the html above
  document.body.insertAdjacentHTML("beforeend", modalContainer);

  //creating an event listener to close the modal
  const closeButton = document.getElementById("modal-close-btn");
  console.log(closeButton);
  closeButton.addEventListener("click", (e) => {
    const modal = document.querySelector(".modal-container");
    modal.remove();
    console.log("button clicked");
  });
}
//Extra Credit: changed color of background from white to tan.
document.body.style.backgroundColor = "tan";
//gallery.innerHTML = ""; 

//Extra Credit: placing html in variable and adding it to the html to display a search bar at top of screen
const searchContainer = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
document.body.insertAdjacentHTML("afterbegin", searchContainer);
// searchContainer.addEventListener("change", (e) => {
// //display items that match 
// }) //search bar is displayed but not active