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

//Function to return fetch method
function fetchData(url) {   
  return fetch(url) 
    .then(checkStatus) //if fetch promise fulfilled, it will check status of response
    .then((res) => res.json()) //if resolved.then method parses response to json
    .then((data) => {
      employeeData = data.results //this gets saved to the empty array variable
      showEmployees(employeeData) //running the show employee function - this shows them on the webpage. The employee data which has the data.results will be passed in here- the div elements must match the employees on screen and now they do
    }) //fetchData func will return promise once data is retrieved and parsed to json. populates an array of employees and info
    .catch((error) => console.log("Sorry, something went wrong", error)); //This error message was printed at point to console when I clicked on an employee card, but not currently.
}

fetchData(url) //when I type this into console it shows promise is "pending", the promiseState is "fulfilled" and promise Result is 'undefined'

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
// create a function that takes in an array of employees DONE
//assign an index so each card is assigned a number to loop through DONE I THINK
//we want js to grab the data-index assigned to a card when we click on it and put it into employeeData array and grab what we clicked and then it loads the modal grabbing that particular index card. 
//use 'data-index' to grab the clicked item to show in modal
function showEmployees(data) {
  let employeeCard = data.map((employee, index) => {
    console.log(employee);//returns employee card info
    console.log(typeof data-index) //returns NaN
    console.log(typeof employeeData);//returns object
    console.log(index)//returns a number of the card
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
  //showModal(data); //This only shows a random employee on the modal window (without clicking on anything)
  getEmployeeCard(data); //calling this makes the modal window pop up with the first positioned employee
  //return;
}

//maybe look at what I'm passing here and try to specify the clicked employee rather than all.
//don't attach event listener to every card, attach it to the overall gallery
//then "if it's a card, load modal"
function getEmployeeCard (employeeData) {
  //listen for a click for the gallery - DONE
  //check to see if event target was an element by class name 'card' DONE
  //if so, grab data-index value property (google data attribute html, click on first one, js access, 'article.dataset.columns' is how to grab index property value)DONE
  //make sure value is an integer so we can use as an index for the employeeData
  //use that index value to grab the correct employee from employeeData
  //pass selected employeeData (should be just one employee) to showModal function
  
  //syntax: e.target.something (maybe try card) to return value you want to capture
  //console.log that value adn then try to log out the employee data for just that user
  //don't do anything with the data until have it isolated
  //when you create your employee cards in the gallery, loop over teh array of user data. 
  //create a card for the employee at index 0 first adn then the employee at index 1, then index 2 etc
  //everytime you create an employee card(when whole gallery is populated) try adding their index value into the card
  //this will give you a fixed reference to the index for every employee attached to the card.
  //in the end - should be that when you click  on card in gallery you should console log the index
  //console log output should be 1 or 2 or 3
  //once you have that index number you need to access the full employee record from the array. 
  //click on 3rd employee card(which would be index 2) it logs 2 to the console. 
  //then you can update your console log statement to say console.log(employees[2]) and log out full dataset for the employee at the that index.
const cardArray = document.getElementsByClassName("card");
console.log(cardArray);
for (let i= 0; i<employeeData[i].length; i++) {
  gallery.addEventListener("click", (e) => {
    if(e.target.cardArray) {
    showModal(cardArray); //this shows the modal window popup
    //console.log(employeeData);
    }
  } )
}
}

//----------------------------------------------
//EVENT LISTENERS
//----------------------------------------------


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

//okay to comment this section out while working on other sections
 function showModal(cardArray) { //problem is passing all data instead of just one

  //data received should be 1 employee object not all in parentheses for function
  //use the object to populate the modalContainer html
  //not going to use forEach
  //append to modalContainer which I already did in insertAdjacentHTML below
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
              const closeButton = document.getElementById("modal-close-btn")
                //creating an event listener to close the modal  - it's not working yet.
                console.log(closeButton);
                closeButton.addEventListener("click", (e) => {   
                //remove or hide the modalContainer

                  //putting the word 'button', 'closeButton' in front made the person in "first position" appear in modal but if I click another it still only shows the first person!
                  //if I try to add [i] or index in attempt to match what I clicked it comes up as undefined.
                  //says cannot ready prop of null (reading '0') in the closeButton[index]
                  
                  
                  //"chosenEmployee" //{   //console says e.target is not a function when I click a card

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













