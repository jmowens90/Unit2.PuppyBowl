const url = `https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT/`;

const state = {
    puppyRoster: [],
}

const getPuppyApi = async () => {
    try {
        const response = await fetch(`${url}players`);
        const puppyInfo = await response.json();
        console.log(puppyInfo);
        state.puppyRoster = puppyInfo.data;
    } catch {
        console.log(`Error: Could not fetch API`)
    }
}

getPuppyApi();
console.log(state.puppyRoster);
