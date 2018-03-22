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
var hashtagType2RequiredInputArray = [{ID: "descriptionInput", label: "Additional Description"}, {ID: "mallLocationInput", label: "Location"}];
var hashtagType2RequiredInputIDArray = [];
for (a = 0; a <= hashtagType2RequiredInputArray.length - 1; a++)
{
    hashtagType2RequiredInputIDArray.push(hashtagType2RequiredInputArray[a]["ID"]);
}

// define how to convert input to hashtag strings
function convertStringToHashtags(data)
{
    // split the incoming data at each space character
    dataSplit = data.split(" ");
    console.log("dataSplit = " + dataSplit);

    // set empty array
    dataHashArray = [];

    // only generate hashes if the received data is not empty
    if (dataSplit != "")
    {
        // generate hashes
        for (i = 0; i < dataSplit.length; i++)
        {
            // add hash to each item
            dataHash = hash + dataSplit[i];
            console.log("dataHash = " + dataHash);

            // add newly hashed items to an empty array
            dataHashArray.push(dataHash);
            console.log("dataHashArray = " + dataHashArray);
        }
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
    typeCheckDiv.className = "typeCheck";
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

    type1RadioButton.onclick = function()
    {
        drawHashtagType1MasterDiv();
    }

    type2RadioButton.onclick = function()
    {
        drawHashtagType2MasterDiv();
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

// define how to draw the copy to clipboard button
function drawCopyToClipboardButton(containerDiv)
{
    new ClipboardJS('button', {
        container: document.getElementById(containerDiv)
    });
    copyToClipboardButton = document.createElement("button");
    copyToClipboardButton.innerHTML = "Copy to Clipboard";
    copyToClipboardButton.className = "button";
    copyToClipboardButton.id = "copyToClipboardButton";
    containerDiv.appendChild(copyToClipboardButton);
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
function drawHashtagResultsSpacerDiv(containerID, quantity)
{
    var hashtagResultsSpacerDiv = document.createElement("div");
    hashtagResultsSpacerDiv.id = spacerID;
    hashtagResultsSpacerDiv.className = spacerID;
    hashtagResultsSpacerDiv.innerHTML = [];
    // draw the div as many times as specifid
    for (i = 0; i <= quantity; i++)
    {
        containerID.appendChild(hashtagResultsSpacerDiv);
    }
}

// define how to update the hashtag results div with the updated input
function updateInnerHTML(divID, string)
{
    document.getElementById(divID).innerHTML = string;
}

/****** type1 specific divs ******/

// define how to draw the hashtagType1 forms container div
function drawType1FormsContainerDiv()
{
    // define the container div and append it to the body
    var type1FormsContainerDiv = document.createElement("div");
    document.body.appendChild(type1FormsContainerDiv);
    type1FormsContainerDiv.className = "formsContainerDiv";

    // for each required input, create textboxes and labels
    for (var i = 0; i <= hashtagType1RequiredInputArray.length - 1; i++)
    {
        drawTypicalTextboxAndLabel(type1FormsContainerDiv, hashtagType1RequiredInputArray[i]["ID"], hashtagType1RequiredInputArray[i]["label"]);
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
            if (currentInputString != "")
            {
                updateInnerHTML(spacerID, spacerSymbol);
            }
            else if (currentInputString == "")
            {
                updateInnerHTML(spacerID, "");
            }

        };
    }
    // create and append the hashtag count input
    var hashtagCountInputID = "hashtagCountInput";
    drawTypicalTextboxAndLabel(type1FormsContainerDiv, hashtagCountInputID, "Max Hashtag Count", maxHashtags);
    
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
function drawType1ResultsContainerDiv() 
{
    // define the container div and append it to the body
    var type1ResultsContainerDiv = document.createElement("div");
    document.body.appendChild(type1ResultsContainerDiv);
    type1ResultsContainerDiv.className = "resultsContainerDiv";

    // draw the copy to clipboard button
    drawCopyToClipboardButton(type1ResultsContainerDiv);

    // if no make/model hashtags are provided, draw an empty div
    if (finalMakeModelHashtags == undefined)
    {
        drawHashtagResultsDiv(type1ResultsContainerDiv, [], hashtagType1RequiredInputArray[0]["ID"]);
    }
    // otherwise, add the hashtags
    else 
    {
        drawHashtagResultsDiv(type1ResultsContainerDiv, finalMakeModelHashtags, hashtagType1RequiredInputArray[0]["ID"]);
    }

    // draw the spacer div
    drawHashtagResultsSpacerDiv(type1ResultsContainerDiv, spacerQuantity);

    // if no location hashtags are provided, draw an empty div
    if (finalLocationHashtags == undefined)
    {
        drawHashtagResultsDiv(type1ResultsContainerDiv, [], hashtagType1RequiredInputArray[1]["ID"]);
    }
    // otherwise, add the hashtags
    else 
    {
        drawHashtagResultsDiv(type1ResultsContainerDiv, finalLocationHashtags, hashtagType1RequiredInputArray[1]["ID"]);
    }

    // draw the spacer div
    drawHashtagResultsSpacerDiv(type1ResultsContainerDiv, spacerQuantity);

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
    drawHashtagResultsDiv(type1ResultsContainerDiv, finalCarBonusHashtags, "finalCarBonusHashtags");
}

// define how to draw the master type1 div
function drawHashtagType1MasterDiv() 
{
    // only draw the form and results divs if they haven't been built already
    if ((document.getElementById(hashtagType1RequiredInputIDArray[0]) == undefined))
    {
        // draw the form divs
        drawType1FormsContainerDiv();
        // draw the results divs
        drawType1ResultsContainerDiv();
    }

}

/****** type2 specific divs ******/

// define how to draw the hashtagType2 forms container div
function drawType2FormsContainerDiv()
{
    // define the container div and append it to the body
    var type2FormsContainerDiv = document.createElement("div");
    document.body.appendChild(type2FormsContainerDiv);
    type2FormsContainerDiv.className = "formsContainerDiv";

    // for each required input, create textboxes and labels
    for (var i = 0; i <= hashtagType2RequiredInputArray.length - 1; i++)
    {
        drawTypicalTextboxAndLabel(type2FormsContainerDiv, hashtagType2RequiredInputArray[i]["ID"], hashtagType2RequiredInputArray[i]["label"]);
    }

    // set the default location and convert to hashtags
    document.getElementById(hashtagType2RequiredInputIDArray[1]).value = "englewood colorado cinderellacity cinderellacitymall";
    finalMallLocationHashtags = convertStringToHashtags((document.getElementById(hashtagType2RequiredInputIDArray[1]).value));

    // for each text box, set the upkey action to trigger the content check update
    for (var b = 0; b < hashtagType2RequiredInputIDArray.length; b++)
    {
        //console.log(hashtagType1RequiredInputIDArray[b]);
        document.getElementById(hashtagType2RequiredInputArray[b]["ID"]).onkeyup = function()
        {
            var currentInputString = this.value;
            var convertedInputString = convertStringToHashtags(currentInputString);
            console.log("updating textbox ID " + this.id + " to include this new input text: " + convertedInputString);
            updateInnerHTML(this.id + "Results", convertedInputString);
            if (currentInputString != "")
            {
                updateInnerHTML(spacerID, spacerSymbol);
            }
            else if (currentInputString == "")
            {
                updateInnerHTML(spacerID, "");
            }

        };
    }
    // create and append the hashtag count input
    var hashtagCountInputID = "hashtagCountInput";
    drawTypicalTextboxAndLabel(type2FormsContainerDiv, hashtagCountInputID, "Max Hashtag Count", maxHashtags);
}

// convert description input to hashtags if it's populated
if (hashtagType2RequiredInputIDArray[0].value != undefined)
{
    var finalDescriptionHashtags = convertStringToHashtags(document.getElementById(hashtagType1RequiredInputIDArray[0]));
} else 
{
    finalDescriptionHashtags = [];
}

// define how to draw the type2 results div
function drawType2ResultsContainerDiv() 
{
    // define the container div and append it to the body
    var type2ResultsContainerDiv = document.createElement("div");
    document.body.appendChild(type2ResultsContainerDiv);
    type2ResultsContainerDiv.className = "resultsContainerDiv";

    // draw the copy to clipboard button
    drawCopyToClipboardButton(type2ResultsContainerDiv);

    // if no description hashtags are provided, draw an empty div
    if (finalDescriptionHashtags == undefined)
    {
        drawHashtagResultsDiv(type2ResultsContainerDiv, [], hashtagType2RequiredInputArray[0]["ID"]);
    }
    // otherwise, add the hashtags
    else 
    {
        drawHashtagResultsDiv(type2ResultsContainerDiv, finalDescriptionHashtags, hashtagType2RequiredInputArray[0]["ID"]);
    }

    // draw the spacer div
    drawHashtagResultsSpacerDiv(type2ResultsContainerDiv, spacerQuantity);

     // if no location hashtags are provided, draw an empty div
     if (finalMallLocationHashtags == undefined)
     {
         drawHashtagResultsDiv(type2ResultsContainerDiv, [], hashtagType2RequiredInputArray[1]["ID"]);
     }
     // otherwise, add the hashtags
     else 
     {
         drawHashtagResultsDiv(type2ResultsContainerDiv, finalMallLocationHashtags, hashtagType2RequiredInputArray[1]["ID"]);
     }

    // define the bonus hashtags list
    var mallBonusHashtagArray = ['#carfinds', '#ride', '#drive', '#car', '#cars', '#funcar', '#classic', '#classiccars', '#carsgram', '#auto', '#speed', '#carpic', '#carsofinstagram', '#nostalgia', '#treasure', '#obscure', '#random', '#obscurecars', '#randomcars', '#anotherera', '#oldiebutgoodie', '#timewarp', '#carclub', '#instauto', '#carstagram', '#motor', '#street']
    
    // convert the hashtags above to a formatted string
    var finalMallBonusHashtags = convertArrayToHashtags(mallBonusHashtagArray);

    // count how many hashtags are found in each hashtag string, and add them together
    //console.log(finalMakeModelHashtags);
    if (finalDescriptionHashtags.length == 0)
    {
        var finalDescriptionHashtagsLength = 0;
    } 
    else
    {
        var finalDescriptionHashtagsLength = finalDescriptionHashtags.split(hash).length-1;
    }

    if (finalMallLocationHashtags.length == 0)
    {
        var finalMallLocationHashtagsLength = 0;
    } 
    else
    {
        var finalMallLocationHashtagsLength = finalMallLocationHashtags.split(hash).length-1;
    }


    var type2FinalHashtagArrayTotalLength = (finalDescriptionHashtagsLength + finalMallLocationHashtagsLength + finalMallBonusHashtags.split(hash).length-1);
    console.log("finalMallHashtags # occurence = " + type2FinalHashtagArrayTotalLength);

    // test array length for compliance with maxHashtags rule, and trim if it's too long
    if (type2FinalHashtagArrayTotalLength > maxHashtags) 
    {
        delta = type2FinalHashtagArrayTotalLength - maxHashtags;
        console.log("Number of hashes removed = " + delta);

        // trim the array
        var mallBonusHashtagArrayTrimmed = mallBonusHashtagArray.splice(0, mallBonusHashtagArray.length - delta);

        // redefine the bonus tags using their trimmed version
        mallBonusHashtagArray = mallBonusHashtagArrayTrimmed;
    }

    finalMallBonusHashtags = convertArrayToHashtags(mallBonusHashtagArray);

    bonusDivText = document.createTextNode(finalMallBonusHashtags);

    // draw the bonus tag div
    drawHashtagResultsDiv(type2ResultsContainerDiv, finalMallBonusHashtags, "finalCarBonusHashtags");
}

// define how to draw the master type2 div
function drawHashtagType2MasterDiv()
{
    // only draw the form and results divs if they haven't been built already
    if ((document.getElementById(hashtagType2RequiredInputIDArray[0]) == undefined))
    {
        // draw the form divs
        drawType2FormsContainerDiv();
        // draw the results divs
        drawType2ResultsContainerDiv();
    }
    // hide the other option divs if they are present
    if ((document.getElementById(hashtagType1RequiredInputIDArray[0]) != undefined))
    {
        ((document.getElementById(hashtagType1RequiredInputIDArray[0]))).style.display = "none";
    }
}

drawHeaderDiv();
drawTypeCheckDiv();