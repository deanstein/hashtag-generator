// location: deanstein.github.io/HashtagGenerator/index.html

var scriptVersion = "2.01.2";

var hash = "#";
var maxHashtags = 30;

var spacerSymbol = ".";
var spacerQuantity = 3;
var spacerID = "SpacerDiv";

/*** define hashtagType1 ***/
var hashtagType1 = "nostalgiaobscura";
var hashtagType1RequiredInputArray = [{ID: "MakeModelInput", label: "Make, Model, or Other Info"}, {ID: "LocationInput", label: "Location"}];
var hashtagType1RequiredInputIDArray = [];
for (a = 0; a <= hashtagType1RequiredInputArray.length - 1; a++)
{
    hashtagType1RequiredInputIDArray.push(hashtagType1RequiredInputArray[a]["ID"]);
}
// define the hashtagType1 bonus hashtags list
const carBonusHashtagArray = ['#carspotting', '#carfinds', '#carshot', '#spotted', '#classic', '#classiccars', '#carstagram', '#carsofinstagram', '#auto', '#speed', '#carpic', '#nostalgia', '#cartreasure', '#oldschool', '#obscurecars', '#randomcars', '#oldsteel', '#oldiebutgoodie', '#timewarp', '#carclub', '#instauto', '#carstagram', '#motor', '#street', '#drive', '#car', '#cars', '#obscure', '#random']
var finalCarBonusHashtags = convertArrayToHashtags(carBonusHashtagArray);

/*** define hashagType2 ***/
// define the default mall location tags
mallLocationString = "englewood colorado englewoodcolorado cinderellacity cinderellacitymall";
var finalMallLocationHashtags = convertStringToHashtags(mallLocationString);
var finalMallLocationHashtagsLength = finalMallLocationHashtags.split(hash).length;

var hashtagType2 = "cinderellacityproject";
var hashtagType2RequiredInputArray = [{ID: "DescriptionInput", label: "Additional Description", defaultText: ""}, {ID: "LocationInput", label: "Location", defaultText: mallLocationString}];
var hashtagType2RequiredInputIDArray = [];
for (a = 0; a <= hashtagType2RequiredInputArray.length - 1; a++)
{
    hashtagType2RequiredInputIDArray.push(hashtagType2RequiredInputArray[a]["ID"]);
}
// define the hashtagType2 bonus hashtags list
var mallBonusHashtagArray = ['#retro', '#vintage', '#retroretail', '#retail', '#mall', '#retailhistory', '#deadmalls', '#history', '#store', '#ghostmall', '#suburbandecay', '#vaporwave', '#shoppingmall', '#architecture', '#deadmall', '#mallwave', '#mallsoft', '#deadmallseries', '#retaildeath', '#mallaesthetic', '#outofbusiness', '#ghostmall', '#urbandecay', '#decay', '#vaporwave', '#nostalgia', '#memories']

// define how to convert input to hashtag strings
function convertStringToHashtags(data)
{
    // split the incoming data at each space character
    var dataSplit = data.split(" ");
    //console.log("dataSplit = " + dataSplit);

    // set empty array
    var dataHashArray = [];

    // only generate hashes if the received data is not empty
    if (dataSplit != "")
    {
        // generate hashes
        for (i = 0; i < dataSplit.length; i++)
        {
            // add hash to each item
            dataHash = hash + dataSplit[i];
            //console.log("dataHash = " + dataHash);

            // add newly hashed items to an empty array
            dataHashArray.push(dataHash);
            //console.log("dataHashArray = " + dataHashArray);
        }
    }

    // convert to string
    dataHashString = dataHashArray.toString();
    //console.log("dataHashString = " + dataHashString);

    // replace commas with spaces
    finalDataHashtags = dataHashString.replace(/,/g, " ");
    //console.log("finalDataHashTags = " + finalDataHashtags);

    return finalDataHashtags;

}

// define how to convert array to hashtag strings
function convertArrayToHashtags(data)
{

    // convert to string
    dataHashString = data.toString();
    //console.log(".hashString = " + dataHashString);

    // replace commas with spaces
    finalDataHashtags = dataHashString.replace(/,/g, " ");
    //console.log(".finalHashTags = " + finalDataHashtags);

    return finalDataHashtags;
}

// define how to add the bonus hashtag array length + all text input hashtag array length
function countAllHashtags(hashtagType, requiredInputArray, bonusArray)
{
    var requiredInputCount = requiredInputArray.length;
    // for each of the textboxes associated with this hashtagType, get their length and add them together
    var totalInputHashtagCount = 0;
    for (var i = 0; i < requiredInputCount; i++)
    {
        var currentHashtagInputID = hashtagType + requiredInputArray[i]["ID"];
        if (document.getElementById(currentHashtagInputID).value !== "")
        {
            currentHashtagInputCount = document.getElementById(currentHashtagInputID).value.split(" ").length;
        } else
        {
            currentHashtagInputCount = 0;
        }
        console.log("seeing " + currentHashtagInputCount + " hashtags entered in textbox ID: " + currentHashtagInputID);
        totalInputHashtagCount = totalInputHashtagCount + currentHashtagInputCount;
    }

    var totalInputHashtags = totalInputHashtagCount + bonusArray.length;
    return totalInputHashtags;
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
    type1RadioButtonLabel.className = "typeCheckLabel";

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
    type2RadioButtonLabel.className = "typeCheckLabel";

    // append the radio buttons to the typeCheckDiv
    typeCheckDiv.appendChild(type1RadioButton);
    typeCheckDiv.appendChild(type1RadioButtonLabel);
    typeCheckDiv.appendChild(type2RadioButton);
    typeCheckDiv.appendChild(type2RadioButtonLabel);

    document.body.appendChild(welcomeMessageDiv);
    document.body.appendChild(typeCheckDiv);

    // define how the radio buttons act when clicked

    type1RadioButton.onclick = function()
    {
        // if this type and the other type hasn't been built yet, build it
        if ((document.getElementById(hashtagType1 + hashtagType1RequiredInputIDArray[0]) == undefined) && (document.getElementById(hashtagType2 + hashtagType2RequiredInputIDArray[0]) == undefined))
        {
            drawHashtagType1MasterDiv();
        }

        // if this type hasn't been built, but the other has, build it and turn off the other
        if ((document.getElementById(hashtagType1 + hashtagType1RequiredInputIDArray[0]) == undefined) && (document.getElementById(hashtagType2 + hashtagType2RequiredInputIDArray[0]) != undefined))
        {
            drawHashtagType1MasterDiv();
            document.getElementById(hashtagType2 + "Container").style.display = "none";
        }

        // if both types have been built, turn the other off and display this one
        if ((document.getElementById(hashtagType1 + hashtagType1RequiredInputIDArray[0]) != undefined) && (document.getElementById(hashtagType2 + hashtagType2RequiredInputIDArray[0]) != undefined))
        {
            document.getElementById(hashtagType1 + "Container").style.display = "initial";
            document.getElementById(hashtagType2 + "Container").style.display = "none";
        }
    }



    type2RadioButton.onclick = function()
    {
        // if this type and the other type hasn't been built yet, build it
        if ((document.getElementById(hashtagType2 + hashtagType2RequiredInputIDArray[0]) == undefined) && (document.getElementById(hashtagType1 + hashtagType1RequiredInputIDArray[0]) == undefined))
        {
            drawHashtagType2MasterDiv();
        }

        // if this type hasn't been built, but the other has, build it and turn off the other
        if ((document.getElementById(hashtagType2 + hashtagType2RequiredInputIDArray[0]) == undefined) && (document.getElementById(hashtagType1 + hashtagType1RequiredInputIDArray[0]) != undefined))
        {
            drawHashtagType2MasterDiv();
            document.getElementById(hashtagType1 + "Container").style.display = "none";
        }

        // if both types have been built, turn the other off and display this one
        if ((document.getElementById(hashtagType1 + hashtagType1RequiredInputIDArray[0]) != undefined) && (document.getElementById(hashtagType2 + hashtagType2RequiredInputIDArray[0]) != undefined))
        {
            document.getElementById(hashtagType2 + "Container").style.display = "initial";
            document.getElementById(hashtagType1 + "Container").style.display = "none";
        }
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
function drawCopyToClipboardButton(containerDiv, hashtagType)
{
    new ClipboardJS('.button');
    var target = "." + hashtagType + "CopyableResultsContainerDiv";
    //console.log ("copy button target: " + target);
    var copyToClipboardButton = document.createElement("button");
    copyToClipboardButton.innerHTML = "Copy to Clipboard";
    copyToClipboardButton.className = "button";
    copyToClipboardButton.setAttribute("data-clipboard-target", target);
    copyToClipboardButton.id = "copyToClipboardButton";
    containerDiv.appendChild(copyToClipboardButton);
}

// define how to draw the typical hashtag results div
function drawHashtagResultsDiv(containerDiv, divContents, hashtagType, resultsType)
{
    var hashtagResultsDiv = document.createElement("div");
    hashtagResultsDiv.id = hashtagType + resultsType + "Results";
    hashtagResultsDiv.className = hashtagType + resultsType + "Results";
    hashtagResultsDiv.innerHTML = divContents;
    containerDiv.appendChild(hashtagResultsDiv);
}

// define how to draw the typical hashtag results spacer div
function drawHashtagResultsSpacerDiv(hashtagType, inputType, containerID, quantity)
{
    for (i = 0; i < quantity; i++)
    {
    var hashtagResultsSpacerDiv = document.createElement("div");
    hashtagResultsSpacerDiv.id = hashtagType + inputType + spacerID + i;
    hashtagResultsSpacerDiv.className = spacerID;
    hashtagResultsSpacerDiv.innerHTML = [];
    // draw the div as many times as specified
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
function drawType1FormsContainerDiv(containerDiv)
{
    // define the container div and append it to the body
    var type1FormsContainerDiv = document.createElement("div");
    containerDiv.appendChild(type1FormsContainerDiv);
    type1FormsContainerDiv.className = "formsContainerDiv";

    // for each required input, create textboxes and labels
    for (var i = 0; i <= hashtagType1RequiredInputArray.length - 1; i++)
    {
        drawTypicalTextboxAndLabel(type1FormsContainerDiv, hashtagType1 + hashtagType1RequiredInputArray[i]["ID"], hashtagType1RequiredInputArray[i]["label"]);
    }

    var totalInputHashtagCount = 0;
    var totalRemovedInputHashtagArray = [];

    // for each text box, set the upkey action to trigger the content check update
    for (var b = 0; b < hashtagType1RequiredInputIDArray.length; b++)
    {
        // get the number of words in the current input, then compare to previous and execute based on the delta
        document.getElementById(hashtagType1 + hashtagType1RequiredInputArray[b]["ID"]).onkeyup = function()
        {
            // get the current input and convert it to hashtags
            var currentInputString = this.value;
            var convertedInputString = convertStringToHashtags(currentInputString);
            //console.log("updating textbox ID " + this.id + " to include this new input text: " + convertedInputString);

            // update this input's associated results div with the latest input
            updateInnerHTML(this.id + "Results", convertedInputString);
            
            // update the spacers
            for (var s = 0; s < spacerQuantity; s++)
            {
                if (currentInputString != "")
                {
                    updateInnerHTML(this.id + spacerID + s, spacerSymbol);
                }
                else if (currentInputString == "")
                {
                    updateInnerHTML(this.id + spacerID + s, "");
                }
            }

            // get the total hashtag count, and adjust if over the max
            var type1TotalHashtagCount = countAllHashtags(hashtagType1, hashtagType1RequiredInputArray, carBonusHashtagArray);
            if (type1TotalHashtagCount > maxHashtags)
            {
                console.log("max hashtags reached")
                totalRemovedInputHashtagArray.push(carBonusHashtagArray.pop());
                console.log("removed a bonus hashtag. number of bonus hashes removed: " + totalRemovedInputHashtagArray.length);
            }

            if (type1TotalHashtagCount < maxHashtags)
            {
                console.log("below the max hashtag threshold")
                carBonusHashtagArray.push(totalRemovedInputHashtagArray.pop());
                console.log("adding a bonus hashtag back. number of bonus hashes remaining to add: " + totalRemovedInputHashtagArray.length);
            }

            finalCarBonusHashtags = convertArrayToHashtags(carBonusHashtagArray);
            // update the bonus hashtag div
            updateInnerHTML(hashtagType1 + "FinalCarBonusHashtags" + "Results", finalCarBonusHashtags);
        }
    }

    // create and append the hashtag count input
    var hashtagCountInputID = "hashtagCountInput";
    drawTypicalTextboxAndLabel(type1FormsContainerDiv, hashtagType1 + hashtagCountInputID, "Max Hashtag Count", maxHashtags);
    
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
function drawType1ResultsContainerDiv(containerDiv) 
{

    // define the container div and append it to the body
    var type1ResultsContainerDiv = document.createElement("div");
    containerDiv.appendChild(type1ResultsContainerDiv);
    type1ResultsContainerDiv.className = "resultsContainerDiv";

    // draw the copy to clipboard button
    drawCopyToClipboardButton(type1ResultsContainerDiv, hashtagType1);

    // define the copyable div and append it to the container
    var type1ResultsCopyableDiv = document.createElement("div");
    type1ResultsCopyableDiv.className = hashtagType1 + "CopyableResultsContainerDiv";
    type1ResultsContainerDiv.appendChild(type1ResultsCopyableDiv);

    // if no make/model hashtags are provided, draw an empty div
    if (finalMakeModelHashtags == undefined)
    {
        drawHashtagResultsDiv(type1ResultsCopyableDiv, [], hashtagType1, hashtagType1RequiredInputArray[0]["ID"]);
    }
    // otherwise, add the hashtags
    else 
    {
        drawHashtagResultsDiv(type1ResultsCopyableDiv, finalMakeModelHashtags, hashtagType1, hashtagType1RequiredInputArray[0]["ID"]);
    }

    // draw the spacer div
    drawHashtagResultsSpacerDiv(hashtagType1, hashtagType1RequiredInputArray[0]["ID"], type1ResultsCopyableDiv, spacerQuantity);

    // if no location hashtags are provided, draw an empty div
    if (finalLocationHashtags == undefined)
    {
        drawHashtagResultsDiv(type1ResultsCopyableDiv, [], hashtagType1, hashtagType1RequiredInputArray[1]["ID"]);
    }
    // otherwise, add the hashtags
    else 
    {
        drawHashtagResultsDiv(type1ResultsCopyableDiv, finalLocationHashtags, hashtagType1, hashtagType1RequiredInputArray[1]["ID"]);
    }

    // draw spacer divs again
    drawHashtagResultsSpacerDiv(hashtagType1, hashtagType1RequiredInputArray[1]["ID"], type1ResultsCopyableDiv, spacerQuantity);

    // draw the bonus tag div
    drawHashtagResultsDiv(type1ResultsCopyableDiv, finalCarBonusHashtags, hashtagType1, "FinalCarBonusHashtags");
}

// define how to draw the master type1 div
function drawHashtagType1MasterDiv() 
{
    // draw the master container div
    var hashtagType1MasterContainerDiv = document.createElement("div");
    hashtagType1MasterContainerDiv.id = hashtagType1 + "Container";
    document.body.appendChild(hashtagType1MasterContainerDiv);

    // draw the form divs
    drawType1FormsContainerDiv(hashtagType1MasterContainerDiv);
    // draw the results divs
    drawType1ResultsContainerDiv(hashtagType1MasterContainerDiv);

}

/****** type2 specific divs ******/

// define how to draw the hashtagType2 forms container div
function drawType2FormsContainerDiv(containerDiv)
{
    // define the container div and append it to the body
    var type2FormsContainerDiv = document.createElement("div");
    containerDiv.appendChild(type2FormsContainerDiv);
    type2FormsContainerDiv.className = "formsContainerDiv";

    // for each required input, create textboxes and labels
    for (var i = 0; i <= hashtagType2RequiredInputArray.length - 1; i++)
    {
        drawTypicalTextboxAndLabel(type2FormsContainerDiv, hashtagType2 + hashtagType2RequiredInputArray[i]["ID"], hashtagType2RequiredInputArray[i]["label"], hashtagType2RequiredInputArray[i]["defaultText"]);
    }

    var totalInputHashtagCount = 0;
    var totalRemovedInputHashtagArray = [];

    // for each text box, set the upkey action to trigger the content check update
    for (var b = 0; b < hashtagType2RequiredInputIDArray.length; b++)
    {
        //console.log(hashtagType1RequiredInputIDArray[b]);
        document.getElementById(hashtagType2 + hashtagType2RequiredInputArray[b]["ID"]).onkeyup = function()
        {
            var currentInputString = this.value;
            var convertedInputString = convertStringToHashtags(currentInputString);
            //console.log("updating textbox ID " + this.id + " to include this new input text: " + convertedInputString);
            updateInnerHTML(this.id + "Results", convertedInputString);

            // update the spacers
            for (var s = 0; s < spacerQuantity; s++)
            {
                if (currentInputString != "")
                {
                    updateInnerHTML(this.id + spacerID + s, spacerSymbol);
                }
                else if (currentInputString == "")
                {
                    updateInnerHTML(this.id + spacerID + s, "");
                }
            }

            // get the total hashtag count, and adjust if over the max
            var type2TotalHashtagCount = countAllHashtags(hashtagType2, hashtagType2RequiredInputArray, mallBonusHashtagArray);
            if (type2TotalHashtagCount > maxHashtags)
            {
                console.log("max hashtags reached")
                totalRemovedInputHashtagArray.push(mallBonusHashtagArray.pop());
                console.log("removed a bonus hashtag. number of bonus hashes removed: " + totalRemovedInputHashtagArray.length);
            }

            if (type2TotalHashtagCount < maxHashtags)
            {
                console.log("below the max hashtag threshold")
                mallBonusHashtagArray.push(totalRemovedInputHashtagArray.pop());
                console.log("adding a bonus hashtag back. number of bonus hashes remaining to add: " + totalRemovedInputHashtagArray.length);
            }

            finalMallBonusHashtags = convertArrayToHashtags(mallBonusHashtagArray);
            // update the bonus hashtag div
            updateInnerHTML(hashtagType2 + "FinalMallBonusHashtags" + "Results", finalMallBonusHashtags);
        };
    }
    // create and append the hashtag count input
    var hashtagCountInputID = "hashtagCountInput";
    drawTypicalTextboxAndLabel(type2FormsContainerDiv, hashtagType2 + hashtagCountInputID, "Max Hashtag Count", maxHashtags);
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
function drawType2ResultsContainerDiv(containerDiv) 
{
    // define the container div and append it to the body
    var type2ResultsContainerDiv = document.createElement("div");
    containerDiv.appendChild(type2ResultsContainerDiv);
    type2ResultsContainerDiv.className = "resultsContainerDiv";

    // draw the copy to clipboard button
    drawCopyToClipboardButton(type2ResultsContainerDiv, hashtagType2);
    
    // define the copyable div and append it
    var type2ResultsCopyableDiv = document.createElement("div");
    type2ResultsCopyableDiv.className = hashtagType2 + "CopyableResultsContainerDiv";
    type2ResultsContainerDiv.appendChild(type2ResultsCopyableDiv);

    // if no description hashtags are provided, draw an empty div
    if (finalDescriptionHashtags == undefined)
    {
        drawHashtagResultsDiv(type2ResultsCopyableDiv, [], hashtagType2, hashtagType2RequiredInputArray[0]["ID"]);
    }
    // otherwise, add the hashtags
    else 
    {
        drawHashtagResultsDiv(type2ResultsCopyableDiv, finalDescriptionHashtags, hashtagType2, hashtagType2RequiredInputArray[0]["ID"]);
    }

    // draw the spacer div
    drawHashtagResultsSpacerDiv(hashtagType2, hashtagType2RequiredInputArray[0]["ID"], type2ResultsCopyableDiv, spacerQuantity);

    // if desciption is provided, convert to hashtags
    if (finalDescriptionHashtags.length == 0)
    {
        var finalDescriptionHashtagsLength = 0;
    } 
    else
    {
        var finalDescriptionHashtagsLength = finalDescriptionHashtags.split(hash).length-1;
    }

    // draw the mall location tag div
    drawHashtagResultsDiv(type2ResultsCopyableDiv, finalMallLocationHashtags, hashtagType2, "LocationInput");

    // draw the spacer div
    drawHashtagResultsSpacerDiv(hashtagType2, "LocationInput", type2ResultsCopyableDiv, spacerQuantity);
    // always display the location div spacers for cinderellacityproject
    for (var s = 0; s < spacerQuantity; s++)
    {
        updateInnerHTML(hashtagType2 + "LocationInput" + spacerID + s, spacerSymbol);
    }

    finalMallBonusHashtags = convertArrayToHashtags(mallBonusHashtagArray);
    var finalMallBonusHashtagsLength = finalMallBonusHashtags.split(hash).length;

    // draw the bonus tag div
    drawHashtagResultsDiv(type2ResultsCopyableDiv, finalMallBonusHashtags, hashtagType2, "FinalMallBonusHashtags");
}

// define how to draw the master type2 div
function drawHashtagType2MasterDiv()
{
    // draw the master container div
    var hashtagType2MasterContainerDiv = document.createElement("div");
    hashtagType2MasterContainerDiv.id = hashtagType2 + "Container";
    document.body.appendChild(hashtagType2MasterContainerDiv);

    // draw the form divs
    drawType2FormsContainerDiv(hashtagType2MasterContainerDiv);
    // draw the results divs
    drawType2ResultsContainerDiv(hashtagType2MasterContainerDiv);

}

drawHeaderDiv();
drawTypeCheckDiv();