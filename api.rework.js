console.log('My files are connected');

const proxyurl = "https://cors-anywhere.herokuapp.com/"; // proxyurl to get past the "cors-origin" policy
const baseURL = "https://cat-fact.herokuapp.com/facts/type/";
let url;

// Search Form
const factSearch = document.getElementById("factSearch");
const factSearchForm = document.getElementById("searchForm")

// Results Section
const resultsSection = document.getElementById("resultsSection");

factSearchForm.addEventListener("submit", fetchResultsFacts); // event listener that catches off "submit"

function fetchResultsFacts(e) {
    e.preventDefault();
    let url = baseURL + factSearch.value;

    console.log("URL:", url);

    fetch(proxyurl + url) // using URL variable along with the proxyurl to bypass the "cors-original" policy
    .then(function(result) {
        return result.json();
    })
    .then(function(json) {
        displayRandomResults(json);
    });

    function displayRandomResults(json) {
        console.log("Display Results", json); // displays the fetched results
        while(resultsSection.firstChild) {
            resultsSection.removeChild(resultsSection.firstChild);
        }

        let generatedFacts = json;

        if(factSearch.length === 0) {
            console.log("No results"); // if left blank, no results
        } else {
            let resultForm = document.createElement("form");
            resultForm.setAttribute("class", "resultForm");
            let headerTag = document.createElement("h2");
            headerTag.setAttribute("id", "headerTag");
            let randoClearFix = document.createElement("div");
            let paraFact = document.createElement("para");
            paraFact.setAttribute("class", "catFacts");
            // the tags that appear in the "resultsSection" in the HTML ^
            headerTag.textContent = generatedFacts;
            console.log("Facts:", generatedFacts);
        }

        paraFact.textContent = "Random Facts: ";

        for (let i = 0; i < 1; i++) {
            let spanResult = document.createElement("span");
            spanResult.setAttribute("class", "randoFacts");
            spanResult.textContent += generatedFacts[0]
            paraFact.appendChild(spanResult);
        }
        randoClearFix.setAttribute("class", "randoClearFix");

        resultForm.appendChild(headerTag);
        resultForm.appendChild(randoClearFix);
        resultForm.appendChild(paraFact);
        resultsSection.appendChild(resultForm);
    }
}