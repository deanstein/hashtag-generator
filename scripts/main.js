var hash = "#";
function generateHashtags() 
{
    // check if car
    var carCheck = prompt("Is this a car?");
    if (carCheck === "Yes" || carCheck === "yes" || carCheck === "y" || carCheck === "Y" || carCheck === "yes ")
        {
        // get car data 
        carData = prompt("Enter the year, make, and model");
        console.log("Variable carData = " + carData);
        carDataSplit = carData.split(" ");
        console.log("Variable carDataSplit = " + carDataSplit);

        // set empty array
        carHashArray = [];

        // generate car hashes
        for (i=0; i < carDataSplit.length; i++) 
            {   
                // add hash to each item
                carHash = hash + carDataSplit[i];
                console.log("Variable carHash = " + carHash);

                // add newly hashed items to an empty array
                carHashArray.push(carHash);      
                console.log("Variable carHashArray = " + carHashArray);
            }

        carHashString = carHashArray.toString(); 
        console.log("Variable carHashString = " + carHashString);
        finalCarHashtags = carHashString.replace(/,/g, " ");
        console.log("Variable finalCarHashtags = " + finalCarHashtags)

        
        } else if (carCheck === "No" || carCheck === "no" || carCheck === "n" || carCheck === "N" || carCheck === "no ")
        {
        // generate other hashes
            var otherData = prompt("Add other keywords");
        } else 
        {
            alert("I don't understand. Try again.");
        }

}

// execute hashtag generation
generateHashtags();

function bodyHTML() 
{
    function headerDiv()
    {
        var headerDiv = document.createElement("div");
        headerDiv.className = "header";
        var headerText = document.createTextNode("Hashtag Generator");
        headerDiv.appendChild(headerText);
        document.body.appendChild(headerDiv);
    }
    headerDiv();

    function firstDiv() 
    {
        firstDiv = document.createElement("div");
        firstDiv.className = "firstDiv";

        if (carData)
        {
            var firstDivText = document.createTextNode(finalCarHashtags);
        } 
        else
        {
            var firstDivText = document.createTextNode(finalGenericHashtags);
        }

        firstDiv.appendChild(firstDivText);
        document.body.appendChild(firstDiv);
    }
    firstDiv();

    function spacerDiv()
    {
        var spacerDiv = document.createElement("div");
        spacerDiv.className = "spacerDiv";

        var spacerSymbol = ".";
        var spacerQuantity = 3;

        function spacerLines(spacerSymbol, spacerQuantity) 
        {
            for (i = 0; i < spacerQuantity; i++)
            {
                spacerDiv = document.createElement("div");
                spacerDiv.className = "spacerDiv";
                var spacerDivText = document.createTextNode(spacerSymbol);
                spacerDiv.appendChild(spacerDivText);
                document.body.appendChild(spacerDiv);
            }
        }
        spacerLines(spacerSymbol, spacerQuantity);
    }
    spacerDiv();

    function bonusDiv()
    {
        bonusDiv = document.createElement("div");
        bonusDiv.className = "bonusDiv";

        finalCarBonusHashtags = "#fun"
        finalGenericBonusHashtags = ['#instagood', '#igers']

        if (carData)
        {
            var bonusDivText = document.createTextNode(finalCarBonusHashtags);
        } 
        else
        {
            var bonusDivText = document.createTextNode(finalGenericBonusHashtags);
        }

        bonusDiv.appendChild(bonusDivText);
        document.body.appendChild(bonusDiv);
    }
    bonusDiv();

}

// execute the body HTML
bodyHTML();