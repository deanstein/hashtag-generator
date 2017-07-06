scriptVersion = "1.00.2";
doDisplayVersion = false;

hash = "#";
maxHashtags = 30;

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

// generic converter function to convert array to hashtag strings
function convertArray(data, dataType)
    {

    // convert to string
    dataHashString = data.toString();
    console.log(dataType + ".hashString = " + dataHashString);

    // replace commas with spaces
    finalDataHashtags = dataHashString.replace(/,/g, " ");
    console.log(dataType + ".finalHashTags = " + finalDataHashtags);

    return finalDataHashtags;

    }

function generateInputHashtags() 
{
    // check if car
    carCheck = prompt("Is this a car?");
    if (carCheck === "Yes" || carCheck === "yes" || carCheck === "y" || carCheck === "Y" || carCheck === "yes ")
        {

        // get car data
        carData = prompt("Enter car information keywords (year, make, model...) separated by spaces");
        carDataType = "carData";
        finalCarHashtags = convertInput(carData, carDataType);

        
        } else if (carCheck === "No" || carCheck === "no" || carCheck === "n" || carCheck === "N" || carCheck === "no ")
        {
        // get generic data
            var otherData = prompt("Describe the subject with keywords separated by spaces");
        }

    // get location data
    locationData = prompt("Enter location keywords separated by spaces");
    
    // define how to convert location input
    function getLocation()
    {
        // get location data
        locationDataType = "locationData";
        finalLocationHashtags = convertInput(locationData, locationDataType);
    }

    // if locationData was entered, run the conversion function
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
        var headerText = document.createTextNode("Hashtag Generator  |  v" + scriptVersion + "  |  " + "Active hashes: " + maxHashtags);
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
    // draw the first div
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
    //draw the spacer div
    spacerDiv();

    function locationDiv()
    {
        locationDiv = document.createElement("div");
        locationDiv.className = "locationDiv";
        locationDivText = document.createTextNode(finalLocationHashtags);
        locationDiv.appendChild(locationDivText);
        document.body.appendChild(locationDiv);
    }
    //draw the location div
    locationDiv();

    // if location data is present, add another spacer
    if (locationData) {
        spacerDiv();
    }

    function bonusDiv()
    {
        bonusDiv = document.createElement("div");
        bonusDiv.className = "bonusDiv";

        carBonusHashtagArray = ['#cars', '#ride', '#drive', '#vehicle', '#street', '#random', '#funcar', '#classic', '#classiccars', '#carsgram', '#auto', '#speed', '#carpic', '#carsofinstagram', '#obscure', '#obscurecars', '#randomcars', '#anotherera', '#oldiebutgoodie', '#timewarp', '#nostalgia', '#treasure', '#carfinds', '#carclub', '#instauto', '#carstagram', '#motor']
        genericBonusHashtagArray = ['#instagood', '#igers']


        if (carData)
        {
            carBonusDataType = "carBonusData";

            finalCarBonusHashtags = convertArray(carBonusHashtagArray, carBonusDataType);

            bonusDivText = document.createTextNode(finalCarBonusHashtags);

            // count how many hashtags are found in each hashtag string, and add them together
            carHashtagArrayTotalLength = ((finalCarHashtags.split(hash).length-1) + (finalLocationHashtags.split(hash).length-1) + finalCarBonusHashtags.split(hash).length-1);
            console.log("finalCarHashtags # occurence = " + carHashtagArrayTotalLength);

            // test array length for compliance with maxHashtags rule, and trim if it's too long
            if (carHashtagArrayTotalLength > maxHashtags) 
            {
                delta = carHashtagArrayTotalLength - maxHashtags;
                console.log("Number of hashes removed = " + delta);

                // trim the array
                carBonusHashtagArrayTrimmed = carBonusHashtagArray.splice(0, carBonusHashtagArray.length - delta);

                // redefine the bonus tags using their trimmed version
                carBonusHashtagArray = carBonusHashtagArrayTrimmed;
            }

            finalCarBonusHashtags = convertArray(carBonusHashtagArray, carBonusDataType);

            bonusDivText = document.createTextNode(finalCarBonusHashtags);

        } 
        else
        {
            genericBonusDataType = "genericBonusData";

            finalGenericBonusHashtags = convertArray(genericBonusHashtagArray, genericBonusDataType);

            bonusDivText = document.createTextNode(finalGenericBonusHashtags);
        }

        bonusDiv.appendChild(bonusDivText);
        document.body.appendChild(bonusDiv);
    }
    // draw the bonus div
    bonusDiv();

    function versionDiv() 
    {
        versionDiv = document.createElement("div");
        versionDiv.className = "versionDiv";
        versionDivText = document.createTextNode(scriptVersion);
        versionDiv.appendChild(versionDivText);
        document.body.appendChild(versionDiv);
    }

    // if display version is true, draw a spacer and the version div
    if (doDisplayVersion) 
    {
        spacerDiv();
        versionDiv();
    }
}

// execute the body HTML
bodyHTML();