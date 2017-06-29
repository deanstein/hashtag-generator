hash = "#";

// generic converter function to convert input to hashtag strings
function convertInput(data, dataType)
{
    // split the incoming data at each space character
    dataSplit = data.split(" ");
    console.log(dataType + ".split = " + dataSplit);

    // set empty array
    dataHashArray = [];

    // generate hashes
    for (i = 0; i < dataSplit.length; i++)
    {
        // add hash to each item
        dataHash = hash + dataSplit[i];
        console.log(dataType + ".hash = " + dataHash);

        // add newly hashed items to an empty array
        dataHashArray.push(dataHash);
        console.log(dataType + ".hashArray =" + dataHashArray);
    }

    // convert to string
    dataHashString = dataHashArray.toString();
    console.log(dataType + ".hashString = " + dataHashString);

    // replace commas with spaces
    finalDataHashtags = dataHashString.replace(/,/g, " ");
    console.log(dataType + ".finalHashTags = " + finalDataHashtags);

    return finalDataHashtags;
}

function generateInputHashtags() 
{
    // check if car
    var carCheck = prompt("Is this a car?");
    if (carCheck === "Yes" || carCheck === "yes" || carCheck === "y" || carCheck === "Y" || carCheck === "yes ")
        {

        carData = prompt("Enter car information keywords (year, make, model...) separated by spaces");
        carDataType = "carData";
        finalCarHashtags = convertInput(carData, carDataType);

        
        } else if (carCheck === "No" || carCheck === "no" || carCheck === "n" || carCheck === "N" || carCheck === "no ")
        {
        // generate other hashes
            var otherData = prompt("Describe the subject with keywords separated by spaces");
        }

    locationData = prompt("Enter location keywords separated by spaces");
    
    function getLocation()
    {
        // get location data
        locationDataType = "locationData";
        finalLocationHashtags = convertInput(locationData, locationDataType);
    }

    // if locationData was entered, run the function
    if (locationData)
    {
        getLocation();
    }
}
// execute hashtag generation
generateInputHashtags();

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

    function locationDiv()
    {
        locationDiv = document.createElement("div");
        locationDiv.className = "locationDiv";
        locationDivText = document.createTextNode(finalLocationHashtags);
        locationDiv.appendChild(locationDivText);
        document.body.appendChild(locationDiv);
    }
    locationDiv();

    // if location data is present, add another spacer
    if (locationData) {
        spacerDiv();
    }

    function bonusDiv()
    {
        bonusDiv = document.createElement("div");
        bonusDiv.className = "bonusDiv";

        carBonusHashtagArray = ['#cars', '#ride', '#drive', '#driver', '#vehicle', '#street', '#random', '#funcar']
        genericBonusHashtagArray = ['#instagood', '#igers']

        if (carData)
        {
            carBonusDataType = "carBonusData";
            //finalCarBonusHashtags = convertInput(carBonusHashtagArray, carBonusDataType);

             // convert to string
            carBonusString = carBonusHashtagArray.toString();
            console.log(carBonusDataType + ".hashString = " + carBonusString);

            // replace commas with spaces
            finalCarBonusHashtags = carBonusString.replace(/,/g, " ");
            console.log(carBonusDataType + ".finalHashTags = " + finalCarBonusHashtags);
            var bonusDivText = document.createTextNode(finalCarBonusHashtags);
        } 
        else
        {
            var bonusDivText = document.createTextNode(genericBonusHashtagArray);
        }

        bonusDiv.appendChild(bonusDivText);
        document.body.appendChild(bonusDiv);
    }
    bonusDiv();

}

// execute the body HTML
bodyHTML();