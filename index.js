/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let g of games){
    const gameCard = document.createElement("div");

    gameCard.classList.add("game-card");
    
    gameCard.innerHTML = `
        
                <img class="game-img" src=${g.img} />
                <div style="font-weight: bold">${g.name}</div>
                <div style="font-style: italic" >${g.description}</div>
                <div><b>Backers:</b> ${g.backers}  </div>
                
              
                `;

       gamesContainer.appendChild(gameCard);         
        }
    }

    addGamesToPage(GAMES_JSON);



        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

    function addContributionsToPage(contrs){

    const contributions = document.createElement("div");

    // contributions.classList.add("stats-card"); // redundant and unnecessary 

    const totalContributions = contrs.reduce( (sum, contr) => {
        return sum + contr.backers;
    }, 0)
    
    contributions.innerHTML = `
        
            
                <div>${totalContributions}</div>
                
                `;

       contributionsCard.appendChild(contributions);         
        
    }

    addContributionsToPage(GAMES_JSON);




// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

    function addRaisedToPage(raisedmoney){
    
    const raised = document.createElement("div");
    //  

    const totalRaised = raisedmoney.reduce( (sum, r) => {
        return sum + r.pledged; 
    }, 0)

    raised.innerHTML = `
                <div>$${totalRaised}</div>
                `;

        
    raisedCard.appendChild(raised);



    }

    addRaisedToPage(GAMES_JSON)





// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");



    function addNumGamesToPage(numGames){
    
    const games = document.createElement("div");
    // games.classList.add("stats-card")

    const totalNumGames = numGames.reduce( (sum, game) => {
        return sum + 1; 
    }, 0)

    games.innerHTML = `
                <div>${totalNumGames}</div>
                `;

        
    gamesCard.appendChild(games);



    }

    addNumGamesToPage(GAMES_JSON)



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly(games) {
    deleteChildElements(gamesContainer);

    

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = games.filter( (game) => {
        return game.goal > game.pledged;
    })

    addGamesToPage(unfundedGames);

    console.log((unfundedGames))



    // use the function we previously created to add the unfunded games to the DOM

}

// filterUnfundedOnly(GAMES_JSON) // for testing


   

// show only games that are fully funded
function filterFundedOnly(games) {
    deleteChildElements(gamesContainer);

    

    // use filter() to get a list of games that have met their goal
    const fundedGames = games.filter( (game) => {
        return game.goal <= game.pledged;
    })

    addGamesToPage(fundedGames);

    console.log((fundedGames))

    // use the function we previously created to add unfunded games to the DOM

}


// filterFundedOnly(GAMES_JSON) // for testing

// show all games
function showAllGames(games) {
    deleteChildElements(gamesContainer);

    addGamesToPage(games);

}




// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
const searchBtn = document.getElementById("search-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", function(){filterUnfundedOnly(GAMES_JSON)});
fundedBtn.addEventListener('click', () => {filterFundedOnly(GAMES_JSON)});
allBtn.addEventListener("click", function(){showAllGames(GAMES_JSON)});
searchBtn.addEventListener("click", () => {search(GAMES_JSON)})


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
    const games = GAMES_JSON;

    const numUnfunded = GAMES_JSON.reduce((sum, game) => {
        return game.goal > game.pledged ? sum + 1 : sum;
    }, 0)

    //Same from before
    const totalNumGames = GAMES_JSON.reduce( (sum) => {
        return sum + 1; 
    }, 0)

    const totalContributions = GAMES_JSON.reduce( (sum, game) => {
        return sum + game.pledged; 
    }, 0)




// create a string that explains the number of unfunded games using the ternary operator
    const unfundedString = `A total of <b><em>$${totalContributions}</em></b> has been raised for ${totalNumGames} games. Currently, 
    <b><em>${numUnfunded}</b></em> ${numUnfunded == 1 ? "game remains" : "games remain"} unfunded. <em>We need <b><u>your</u></b> help to fund these amazing games!</em>`

// create a new DOM element containing the template string and append it to the description container
    const desc = document.createElement("p");

    desc.innerHTML = unfundedString;

    descriptionContainer.appendChild(desc);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

   

// use destructuring and the spread operator to grab the first and second games

 const [first, second, ...others] = sortedGames;

    const f = document.createElement("div");
    f.innerHTML = first.name;

    firstGameContainer.appendChild(f);

    const s = document.createElement("div")
    s.innerHTML = second.name;

    secondGameContainer.appendChild(s);

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item

// Search element logic:

    function search(games){
    const searchInput = document.getElementById("game-search"); // Get the search component
    const searchTerm = searchInput.value.toLowerCase(); // Now I am extracting the value from the search bar

        const result = games.filter((game) => {
            return game.name.toLowerCase().includes(searchTerm);
        })

        
    showAllGames(result);

}