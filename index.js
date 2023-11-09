const url = `https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/`;

const main = document.querySelector(`main`);

// create object that holds the API information
const state = {
    puppyRoster: [],
};

// create function that fetches the API data
const getPuppyApi = async () => {
    try {
        const response = await fetch(`${url}players`);
        const puppyInfo = await response.json();
        console.log(puppyInfo);
        //Was getting errors becaue I only had puppyInfo. data so state.puppyRoster was returning as a blank array. Had to revisit the API data to realize the actual info was nested further inside players.
        state.puppyRoster = puppyInfo.data.players;
        console.log(state.puppyRoster);
    } catch {
        console.log(`Error: Could not fetch API`)
    }
    // Invoke the loop that applies the create section function to all of the puppy cards
    createAllPuppies();
};


// create function to create a section that shows the puppy card and append it to the main
const createPuppyCard = (obj) => {
    const section = document.createElement(`section`);
    puppyCardDetails(section, obj);
    main.appendChild(section);
    const h2 = document.createElement(`h2`);
    h2.innerText = obj.name;
    section.appendChild(h2);
    const puppyImg = document.createElement(`img`);
    puppyImg.src = obj.imageUrl;
    section.appendChild(puppyImg);
};

// create function to apply the createPuppyCard function to all of the objects in the state object array that was created earlier
const createAllPuppies = () => {
    state.puppyRoster.map((value) => createPuppyCard(value));
};

// add an event listener so that when the puppy card is clicked it creates a new html(without leaving the page) and populates all the info for that specific puppy
const puppyCardDetails = (link, data) => {
    link.addEventListener(`click`, () => {
        html=`
        <section>
        <h2>${data.name}</h2>
        <h3>${data.breed}</h3>
        <img src="${data.imageUrl}"></img>
        <h3>${data.status}</h3>
        <button onClick="render()" id="goBack"> Go Back </button>
        </section>`
        main.innerHTML = html;
    });
};
// render function that resets the html and then reapplies the createAllPuppies function for when the addevent listener click occurs

const render = () => {
    main.innerHTML = ``;
    createAllPuppies();
}

// invoke the function to get the API info
getPuppyApi();
console.log(state.puppyRoster)
