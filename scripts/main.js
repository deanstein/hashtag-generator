var scriptVersion = "2.00.0";

var hash = "#";
var maxHashtags = 30;

var spacerSymbol = ".";
var spacerQuantity = 3;
var spacerID = "spacerDiv";

// define hashtagType1
var hashtagType1 = "nostalgia.obscura";
var hashtagType1RequiredInputArray = [{ID: "makeModelInput", label: "Make, Model, or Other Info"}, {ID: "locationInput", label: "Location"}];
var hashtagType1RequiredInputIDArray = [];
for (a = 0; a <= hashtagType1RequiredInputArray.length - 1; a++)
{
    hashtagType1RequiredInputIDArray.push(hashtagType1RequiredInputArray[a]["ID"]);
}
//console.log(hashtagType1RequiredInputIDArray);

// define hashTagType2
var hashtagType2 = "cinderellacityproject";

// define how to convert input to hashtag strings
function convertStringToHashtags(data)
{
    // split the incoming data at each space character
    dataSplit = data.split(" ");
    console.log("dataSplit = " + dataSplit);

    // set empty array
    dataHashArray = [];

    // generate hashes
    for (i = 0; i < dataSplit.length; i++)
    {
        // add hash to each item
        dataHash = hash + dataSplit[i];
        console.log("dataHash = " + dataHash);

        // add newly hashed items to an empty array
        dataHashArray.push(dataHash);
        console.log("dataHashArray =" + dataHashArray);
    }

    // convert to string
    dataHashString = dataHashArray.toString();
    console.log("dataHashString = " + dataHashString);

    // replace commas with spaces
    finalDataHashtags = dataHashString.replace(/,/g, " ");
    console.log("finalDataHashTags = " + finalDataHashtags);

    return finalDataHashtags;
}

// define how to convert array to hashtag strings
function convertArrayToHashtags(data)
{

    // convert to string
    dataHashString = data.toString();
    console.log(".hashString = " + dataHashString);

    // replace commas with spaces
    finalDataHashtags = dataHashString.replace(/,/g, " ");
    console.log(".finalHashTags = " + finalDataHashtags);

    return finalDataHashtags;
}

// define how to get the data from the text boxes
function getDataFromTextbox(id) 
{
    var textbox = document.getElementById(id);
    console.log("seeing textbox input for " + textbox.id + ": " + textbox.value);
    return textbox.value;
}

// define how to get/update the data in all important text boxes and return the data as an array
var receivedInputArray = [];
function getInputFormContents(inputIDArray)
{
    for (var j = 0; j <= inputIDArray.length - 1; j++)
    {
        var inputData = getDataFromTextbox(inputIDArray[j]);
        receivedInputArray.push(inputData);
    }
    //console.log("seeing the following inputs: " + receivedInputArray);
    receivedInputArray = [];
    return receivedInputArray;
}

/****** HTML instructions ******/

// define how to draw the header div that will always be displayed
function drawHeaderDiv()
{
    var headerDiv = document.createElement("div");
    headerDiv.className = "header";
    var headerText = document.createTextNode("Hashtag Generator  |  v" + scriptVersion);
    headerDiv.appendChild(headerText);
    document.body.appendChild(headerDiv);
}

// define how to draw the typecheck div that will always be displayed
function drawTypeCheckDiv()
{
    // define the welcome message div
    var welcomeMessageDiv = document.createElement("div");
    welcomeMessageDiv.innerHTML = "Select a hashtag type to begin."
    welcomeMessageDiv.className = "welcomeMessage";

    // define the typecheck div
    var typeCheckDiv = document.createElement("form");
    var typeCheckDivText = {};

    // define the type1 radio button
    var type1RadioButton = document.createElement("input");
    type1RadioButton.type = "radio";
    type1RadioButton.name = "typeCheck";
    type1RadioButton.value = hashtagType1;
    type1RadioButton.id = hashtagType1;
    // define the type1 radio button label
    var type1RadioButtonLabel = document.createElement("label");
    type1RadioButtonLabel.htmlFor = hashtagType1;
    type1RadioButtonLabel.innerHTML = hashtagType1;

    // define the type2 radio button
    var type2RadioButton = document.createElement("input");
    type2RadioButton.type = "radio";
    type2RadioButton.name = "typeCheck";
    type2RadioButton.value = hashtagType2;
    type2RadioButton.id = hashtagType2;
    // define the type2 radio button label
    var type2RadioButtonLabel = document.createElement("label");
    type2RadioButtonLabel.htmlFor = hashtagType2;
    type2RadioButtonLabel.innerHTML = hashtagType2;

    // append the radio buttons to the typeCheckDiv
    typeCheckDiv.appendChild(type1RadioButton);
    typeCheckDiv.appendChild(type1RadioButtonLabel);
    typeCheckDiv.appendChild(type2RadioButton);
    typeCheckDiv.appendChild(type2RadioButtonLabel);

    document.body.appendChild(welcomeMessageDiv);
    document.body.appendChild(typeCheckDiv);

    // define what happens when the type selectors are clicked
    type1RadioButton.onclick = function() 
    {
        drawHashtagType1MasterDiv();
    }
}

/*** typical divs ***/

// define how to draw the typical form text input divs
function drawTypicalTextboxAndLabel(containerDiv, inputName, inputLabel, defaultString)
{
    // define a container to will hold all elements
    var formElementContainer = document.createElement("div");
    formElementContainer.className = "formElementContainer";
    // define the input text box
    var formInput = document.createElement("input");
    formInput.type = "text";
    formInput.name = inputName;
    formInput.id = inputName; 
    formInput.className = "formInput";
    if (defaultString)
    {
        formInput.value = defaultString;
    }
    // define the text box label
    var formInputLabel = document.createElement("label");
    formInputLabel.className = "formInputLabel";
    formInputLabel.innerHTML = inputLabel;

    // append the input textbox and label to the formElementContainer
    formElementContainer.appendChild(formInput);
    formElementContainer.appendChild(formInputLabel);

    // append the finished product to the container div
    containerDiv.appendChild(formElementContainer);
}

// define how to draw the typical hashtag results div
function drawHashtagResultsDiv(containerDiv, divContents, divClass)
{
    var hashtagResultsDiv = document.createElement("div");
    hashtagResultsDiv.id = divClass + "Results";
    hashtagResultsDiv.className = divClass + "Results";
    hashtagResultsDiv.innerHTML = divContents;
    containerDiv.appendChild(hashtagResultsDiv);
}

// define how to draw the typical hashtag results spacer div
function drawHashtagResultsSpacerDiv(containerID)
{
    var hashtagResultsSpacerDiv = document.createElement("div");
    hashtagResultsSpacerDiv.id = spacerID;
    hashtagResultsSpacerDiv.className = spacerID;
    hashtagResultsSpacerDiv.innerHTML = [];
    containerID.appendChild(hashtagResultsSpacerDiv);
}

    /*for (i = 0; i < spacerQuantity; i++)
    {

    }*/

// define how to update the hashtag results div with the updated input
function updateInnerHTML(divID, string)
{
    document.getElementById(divID).innerHTML = string;
}

/*** type1 specific divs ***/

// define how to draw the hashtagType1 forms div
function drawHashtagType1FormsDiv()
{
    // define the container div and append it to the body
    var type1FormDiv = document.createElement("div");
    document.body.appendChild(type1FormDiv);
    type1FormDiv.class = "type1FormDiv";

    // for each required input, create textboxes and labels
    for (var i = 0; i <= hashtagType1RequiredInputArray.length - 1; i++)
    {
        drawTypicalTextboxAndLabel(type1FormDiv, hashtagType1RequiredInputArray[i]["ID"], hashtagType1RequiredInputArray[i]["label"]);
    }

    // for each text box, set the upkey action to trigger the content check update
    for (var b = 0; b < hashtagType1RequiredInputIDArray.length; b++)
    {
        //console.log(hashtagType1RequiredInputIDArray[b]);
        document.getElementById(hashtagType1RequiredInputArray[b]["ID"]).onkeyup = function()
        {
            var currentInputString = this.value;
            var convertedInputString = convertStringToHashtags(currentInputString);
            console.log("updating textbox ID " + this.id + " to include this new input text: " + convertedInputString);
            updateInnerHTML(this.id + "Results", convertedInputString);
            updateInnerHTML(spacerID, spacerSymbol);
        };
    }
    // create and append the hashtag count input
    var hashtagCountInputID = "hashtagCountInput";
    drawTypicalTextboxAndLabel(type1FormDiv, hashtagCountInputID, "Max Hashtag Count", maxHashtags);
    
}

// convert make/model input to hashtags if it's populated
if (hashtagType1RequiredInputIDArray[0].value != undefined)
{
    var finalMakeModelHashtags = convertStringToHashtags(document.getElementById(hashtagType1RequiredInputIDArray[0]));
} else 
{
    finalMakeModelHashtags = [];
}

// convert location input to hashtags if it's populated, otherwise set an empty array
if (hashtagType1RequiredInputIDArray[1].value != undefined)
{
    var finalLocationHashtags = convertStringToHashtags(document.getElementById(hashtagType1RequiredInputIDArray[1]));
} else 
{
    finalLocationHashtags = [];
}

// define how to draw the type1 results div
function drawHashtagType1ResultsDiv() 
{
    // define the container div and append it to the body
    var type1ResultsDiv = document.createElement("div");
    document.body.appendChild(type1ResultsDiv);
    type1ResultsDiv.class = "type1ResultsDiv";

    // if no make/model hashtags are provided, draw an empty div
    if (finalMakeModelHashtags == undefined)
    {
        drawHashtagResultsDiv(type1ResultsDiv, [], hashtagType1RequiredInputArray[0]["ID"]);
    }
    // otherwise, add the hashtags
    else 
    {
        drawHashtagResultsDiv(type1ResultsDiv, finalMakeModelHashtags, hashtagType1RequiredInputArray[0]["ID"]);
    }

    // draw spacer div
    drawHashtagResultsSpacerDiv(type1ResultsDiv);

    // if no location hashtags are provided, draw an empty div
    if (finalLocationHashtags == undefined)
    {
        drawHashtagResultsDiv(type1ResultsDiv, [], hashtagType1RequiredInputArray[1]["ID"]);
    }
    // otherwise, add the hashtags
    else 
    {
        drawHashtagResultsDiv(type1ResultsDiv, finalLocationHashtags, hashtagType1RequiredInputArray[1]["ID"]);
    }

    // draw spacer div
    drawHashtagResultsSpacerDiv(type1ResultsDiv);

    // define the bonus hashtags list
    var carBonusHashtagArray = ['#carfinds', '#ride', '#drive', '#car', '#cars', '#funcar', '#classic', '#classiccars', '#carsgram', '#auto', '#speed', '#carpic', '#carsofinstagram', '#nostalgia', '#treasure', '#obscure', '#random', '#obscurecars', '#randomcars', '#anotherera', '#oldiebutgoodie', '#timewarp', '#carclub', '#instauto', '#carstagram', '#motor', '#street']
    
    // convert the hashtags above to a formatted string
    var finalCarBonusHashtags = convertArrayToHashtags(carBonusHashtagArray);

    // count how many hashtags are found in each hashtag string, and add them together
    //console.log(finalMakeModelHashtags);
    if (finalMakeModelHashtags.length == 0)
    {
        var finalMakeModelHashtagsLength = 0;
    } 
    else
    {
        var finalMakeModelHashtagsLength = finalMakeModelHashtags.split(hash).length-1;
    }

    if (finalLocationHashtags.length == [])
    {
        finalLocationHashtagsLength = 0;
    }
    else 
    {
        finalLocationHashtagsLength = finalLocationHashtags.split(hash).length-1;
    }
    var type1FinalHashtagArrayTotalLength = (finalMakeModelHashtagsLength + finalLocationHashtagsLength + finalCarBonusHashtags.split(hash).length-1);
    console.log("finalCarHashtags # occurence = " + type1FinalHashtagArrayTotalLength);

    // test array length for compliance with maxHashtags rule, and trim if it's too long
    if (type1FinalHashtagArrayTotalLength > maxHashtags) 
    {
        delta = type1FinalHashtagArrayTotalLength - maxHashtags;
        console.log("Number of hashes removed = " + delta);

        // trim the array
        carBonusHashtagArrayTrimmed = carBonusHashtagArray.splice(0, carBonusHashtagArray.length - delta);

        // redefine the bonus tags using their trimmed version
        carBonusHashtagArray = carBonusHashtagArrayTrimmed;
    }

    finalCarBonusHashtags = convertArrayToHashtags(carBonusHashtagArray);

    bonusDivText = document.createTextNode(finalCarBonusHashtags);

    // draw the bonus tag div
    drawHashtagResultsDiv(type1ResultsDiv, finalCarBonusHashtags, "finalCarBonusHashtags");
}

// define how to draw the master type1 div
function drawHashtagType1MasterDiv() 
{
    // draw the form divs
    drawHashtagType1FormsDiv();
    // draw the results divs
    drawHashtagType1ResultsDiv();
}

drawHeaderDiv();
drawTypeCheckDiv();