// creates an interface to auto-generate hashtags based on the instagram account
// and copies them to the clipboard for use on Instagram

const scriptVersion = "2.2.0";

const hash = "#";
const maxHashtags = 20;

const spacerSymbol = ".";
const spacerQuantity = 3;
const spacerID = "SpacerDiv";

// the different accounts to generate hashtags for
const allAccountData = 
[
    {
        accountName: "nostalgiaobscura",
        aRequiredInputs: [{ID: "MakeModelInput", label: "Make, Model, or Other Info"}, {ID: "LocationInput", label: "Location"}]
    }, 
    {
        accountName: "cinderellacityproject",
        aRequiredInputs: [{ID: "DescriptionInput", label: "Additional Description", defaultText: ""}, {ID: "LocationInput", label: "Location", defaultText: "englewood colorado englewoodcolorado cinderellacity cinderellacitymall"}]
    }, 
    {
        accountName: "villaitaliaproject",
        aRequiredInputs: [{ID: "DescriptionInput", label: "Additional Description", defaultText: ""}, {ID: "LocationInput", label: "Location", defaultText: "lakewood colorado lakewoodcolorado villaitalia villaitaliamall"}]
    }
];

/*** nostalgia.obscura ***/
const hashtagType1 = allAccountData[0].accountName;
const hashtagType1RequiredInputArray = allAccountData[0].aRequiredInputs;
let hashtagType1RequiredInputIDArray = [];
for (var i = 0; i <= hashtagType1RequiredInputArray.length - 1; i++)
{
    hashtagType1RequiredInputIDArray.push(hashtagType1RequiredInputArray[i]["ID"]);
}
// nostalgia.obscura bonus hashtags
const hashtagType1BonusHashtagArray = ['#carspotting', '#carfinds', '#carshot', '#spotted', '#classic', '#classiccars', '#carstagram', '#carsofinstagram', '#auto', '#speed', '#carpic', '#nostalgia', '#cartreasure', '#oldschool', '#obscurecars', '#randomcars', '#oldsteel', '#oldiebutgoodie', '#timewarp', '#carclub', '#instauto', '#carstagram', '#motor', '#street', '#drive', '#car', '#cars', '#obscure', '#random']
let finalHashtagType1BonusHashtags = convertArrayToHashtags(hashtagType1BonusHashtagArray);

// the next two hashtags are mall-related, and they share the bonus hashtags
const mallBonusHashtagArray = ['#history', '#mall', '#deadmall', '#retro', '#vintage', '#vintagemall', '#retroretail', '#retail', '#retaildeath', '#retailhistory', '#retailarchitecture', '#ghostmall', '#suburbandecay', '#suburbia', '#architecture', '#mallaesthetic', '#outofbusiness', '#decay', '#nostalgia'];
// make a copy of the bonus hashtag array so we don't affect it
let splicedBonusHashtagArray = [...mallBonusHashtagArray];

/*** cinderellacityproject ***/
// location tags
let finalHashtagType2LocationHashtags = convertStringToHashtags(allAccountData[1].aRequiredInputs[1].defaultText);
let finalHashtagType2LocationHashtagLength = finalHashtagType2LocationHashtags.split(hash).length;

const hashtagType2 = allAccountData[1].accountName;
const hashtagType2RequiredInputArray = allAccountData[1].aRequiredInputs;
let hashtagType2RequiredInputIDArray = [];
for (var i = 0; i <= hashtagType2RequiredInputArray.length - 1; i++)
{
    hashtagType2RequiredInputIDArray.push(hashtagType2RequiredInputArray[i]["ID"]);
}

/*** villaitaliaproject ***/
// location tags
let finalHashtagType3LocationHashtags = convertStringToHashtags(allAccountData[2].aRequiredInputs[1].defaultText);
let finalHashtagType3LocationHashtagLength = finalHashtagType3LocationHashtags.split(hash).length;

const hashtagType3 = allAccountData[2].accountName;
const hashtagType3RequiredInputArray = allAccountData[2].aRequiredInputs;
let hashtagType3RequiredInputIDArray = [];
for (var i = 0; i <= hashtagType3RequiredInputArray.length - 1; i++)
{
    hashtagType3RequiredInputIDArray.push(hashtagType3RequiredInputArray[i]["ID"]);
}

// convert input to hashtag strings
function convertStringToHashtags(data)
{
    // split the incoming data at each space character
    let dataSplit = data.split(" ");
    //console.log("dataSplit = " + dataSplit);

    // set empty array
    let dataHashArray = [];

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

// convert array to hashtag strings
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

// add the bonus hashtag array length + all text input hashtag array length
function countAllHashtags(hashtagType, requiredInputArray, bonusArray)
{
    let requiredInputCount = requiredInputArray.length;
    // for each of the textboxes associated with this hashtagType, get their length and add them together
    let totalInputHashtagCount = 0;
    for (let i = 0; i < requiredInputCount; i++)
    {
        let currentHashtagInputID = hashtagType + requiredInputArray[i]["ID"];
        if (document.getElementById(currentHashtagInputID).value != "")
        {
            currentHashtagInputCount = document.getElementById(currentHashtagInputID).value.split(" ").length;
        } else
        {
            currentHashtagInputCount = 0;
        }
        console.log("seeing " + currentHashtagInputCount + " hashtags entered in textbox ID: " + currentHashtagInputID);
        totalInputHashtagCount = totalInputHashtagCount + currentHashtagInputCount;
    }

    let totalInputHashtags = totalInputHashtagCount + bonusArray.length;
    return totalInputHashtags;
}

/****** UI ******/

// draw the header div that will always be displayed
function drawHeaderDiv()
{
    let headerDiv = document.createElement("div");
    headerDiv.className = "header";
    let headerText = document.createTextNode("Hashtag Generator  |  v" + scriptVersion);
    headerDiv.appendChild(headerText);
    document.body.appendChild(headerDiv);
}

// draw the typecheck div that will always be displayed
function drawTypeCheckDiv()
{
    // define the welcome message div
    let welcomeMessageDiv = document.createElement("div");
    welcomeMessageDiv.innerHTML = "Select a hashtag type to begin."
    welcomeMessageDiv.className = "welcomeMessage";

    // define the typecheck div
    let typeCheckDiv = document.createElement("form");
    typeCheckDiv.className = "typeCheck";

    // define the type1 radio button
    let type1RadioButton = document.createElement("input");
    type1RadioButton.type = "radio";
    type1RadioButton.name = "typeCheck";
    type1RadioButton.value = hashtagType1;
    type1RadioButton.id = hashtagType1;
    // define the type1 radio button label
    let type1RadioButtonLabel = document.createElement("label");
    type1RadioButtonLabel.htmlFor = hashtagType1;
    type1RadioButtonLabel.innerHTML = hashtagType1;
    type1RadioButtonLabel.className = "typeCheckLabel";
    type1RadioButton.onclick = function()
    {
        showAccountHashtags(allAccountData[0].accountName);
    }

    // define the type2 radio button
    let type2RadioButton = document.createElement("input");
    type2RadioButton.type = "radio";
    type2RadioButton.name = "typeCheck";
    type2RadioButton.value = hashtagType2;
    type2RadioButton.id = hashtagType2;
    // define the type2 radio button label
    let type2RadioButtonLabel = document.createElement("label");
    type2RadioButtonLabel.htmlFor = hashtagType2;
    type2RadioButtonLabel.innerHTML = hashtagType2;
    type2RadioButtonLabel.className = "typeCheckLabel";
    type2RadioButton.onclick = function()
    {
        showAccountHashtags(allAccountData[1].accountName);
    }

    // the type3 radio button
    let type3RadioButton = document.createElement("input");
    type3RadioButton.type = "radio";
    type3RadioButton.name = "typeCheck";
    type3RadioButton.value = hashtagType3;
    type3RadioButton.id = hashtagType3;
    // define the type3 radio button label
    let type3RadioButtonLabel = document.createElement("label");
    type3RadioButtonLabel.htmlFor = hashtagType3;
    type3RadioButtonLabel.innerHTML = hashtagType3;
    type3RadioButtonLabel.className = "typeCheckLabel";
    type3RadioButton.onclick = function()
    {
        showAccountHashtags(allAccountData[2].accountName);
    }

    // append the radio buttons to the typeCheckDiv
    typeCheckDiv.appendChild(type1RadioButton);
    typeCheckDiv.appendChild(type1RadioButtonLabel);
    typeCheckDiv.appendChild(type2RadioButton);
    typeCheckDiv.appendChild(type2RadioButtonLabel);
    typeCheckDiv.appendChild(type3RadioButton);
    typeCheckDiv.appendChild(type3RadioButtonLabel);

    document.body.appendChild(welcomeMessageDiv);
    document.body.appendChild(typeCheckDiv);

    // set a default radio button to start checked
    type2RadioButton.checked = true;
    showAccountHashtags(allAccountData[1].accountName);
}

    // radio button behavior
    showAccountHashtags = function(accountName)
    {
        // get the account data for the given account name
        let accountIndex = -1;
        for (var i = 0; i < allAccountData.length; i++)
        {
            if (allAccountData[i].accountName == accountName)
            {
                accountIndex = i;
                break;
            }
        }
        let aRequiredInputs = allAccountData[accountIndex].aRequiredInputs;
        let aRequiredInputIDs = [];
        for (var i = 0; i <= aRequiredInputs.length - 1; i++)
        {
            aRequiredInputIDs.push(aRequiredInputs[i]["ID"]);
        }

        function filterForRemainingAccounts(accountName)
        {
            let newArray = [];

            for (var i = 0; i < allAccountData.length; i++)
            {
                if (allAccountData[i].accountName != accountName)
                {
                    newArray.push(allAccountData[i]);
                }
            }


            return newArray;
        }

        let aRemainingAccounts = filterForRemainingAccounts(accountName);

        // build the UI for the given account name, if it doesn't exist already
        if ((document.getElementById(accountName + "Container") == undefined))
        {
            if (accountName.includes(allAccountData[0].accountName))
            {
                drawHashtagType1MasterDiv();
            }
            else if (accountName.includes(allAccountData[1].accountName))
            {
                drawHashtagType2MasterDiv();
            }
            else if (accountName.includes(allAccountData[2].accountName))
            {
                drawHashtagType3MasterDiv();
            }
        }
        // otherwise, just make the account UI visible
        else
        {
            document.getElementById(accountName + "Container").style.display = "initial";
        }
        
        // for the remaining accounts, hide them if they exist
        for (var i = 0; i < aRemainingAccounts.length; i++)
        {
            if (document.getElementById(aRemainingAccounts[i].accountName + "Container") != undefined)
            {
                document.getElementById(aRemainingAccounts[i].accountName + "Container").style.display = "none";
            }
        }  
    }

/*** typical divs ***/

// draw the typical form text input divs
function drawTypicalTextboxAndLabel(containerDiv, inputName, inputLabel, defaultString)
{
    // define a container to will hold all elements
    let formElementContainer = document.createElement("div");
    formElementContainer.className = "formElementContainer";
    // define the input text box
    let formInput = document.createElement("input");
    formInput.type = "text";
    formInput.name = inputName;
    formInput.id = inputName; 
    formInput.className = "formInput";
    if (defaultString)
    {
        formInput.value = defaultString;
    }
    // define the text box label
    let formInputLabel = document.createElement("label");
    formInputLabel.className = "formInputLabel";
    formInputLabel.innerHTML = inputLabel;

    // append the input textbox and label to the formElementContainer
    formElementContainer.appendChild(formInput);
    formElementContainer.appendChild(formInputLabel);

    // append the finished product to the container div
    containerDiv.appendChild(formElementContainer);
}

// draw the copy to clipboard button
function drawCopyToClipboardButton(containerDiv, hashtagType)
{
    new ClipboardJS('.button');
    let target = "." + hashtagType + "CopyableResultsContainerDiv";
    //console.log ("copy button target: " + target);
    let copyToClipboardButton = document.createElement("button");
    copyToClipboardButton.innerHTML = "Copy to Clipboard";
    copyToClipboardButton.className = "button";
    copyToClipboardButton.setAttribute("data-clipboard-target", target);
    copyToClipboardButton.id = "copyToClipboardButton";
    containerDiv.appendChild(copyToClipboardButton);
}

// draw the typical hashtag results div
function drawHashtagResultsDiv(containerDiv, divContents, hashtagType, resultsType)
{
    let hashtagResultsDiv = document.createElement("div");
    hashtagResultsDiv.id = hashtagType + resultsType + "Results";
    hashtagResultsDiv.className = resultsType + "Results";
    hashtagResultsDiv.innerHTML = divContents;
    containerDiv.appendChild(hashtagResultsDiv);
}

// draw the typical hashtag results spacer div
function drawHashtagResultsSpacerDiv(hashtagType, inputType, containerID, quantity)
{
    for (i = 0; i < quantity; i++)
    {
    let hashtagResultsSpacerDiv = document.createElement("div");
    hashtagResultsSpacerDiv.id = hashtagType + inputType + spacerID + i;
    hashtagResultsSpacerDiv.className = spacerID;
    hashtagResultsSpacerDiv.innerHTML = [];
    // draw the div as many times as specified
    containerID.appendChild(hashtagResultsSpacerDiv);
    }
}

// update the hashtag results div with the updated input
function updateInnerHTML(divID, string)
{
    document.getElementById(divID).innerHTML = string;
}

/****** type1 specific divs ******/

// draw the hashtagType1 forms container div
function drawType1FormsContainerDiv(containerDiv)
{
    // define the container div and append it to the body
    let type1FormsContainerDiv = document.createElement("div");
    containerDiv.appendChild(type1FormsContainerDiv);
    type1FormsContainerDiv.className = "formsContainerDiv";

    // for each required input, create textboxes and labels
    for (let i = 0; i <= hashtagType1RequiredInputArray.length - 1; i++)
    {
        drawTypicalTextboxAndLabel(type1FormsContainerDiv, hashtagType1 + hashtagType1RequiredInputArray[i]["ID"], hashtagType1RequiredInputArray[i]["label"]);
    }

    let totalInputHashtagCount = 0;
    let totalRemovedInputHashtagArray = [];

    // for each text box, set the upkey action to trigger the content check update
    for (let b = 0; b < hashtagType1RequiredInputIDArray.length; b++)
    {
        // get the number of words in the current input, then compare to previous and execute based on the delta
        document.getElementById(hashtagType1 + hashtagType1RequiredInputArray[b]["ID"]).onkeyup = function()
        {
            // get the current input and convert it to hashtags
            let currentInputString = this.value;
            let convertedInputString = convertStringToHashtags(currentInputString);
            //console.log("updating textbox ID " + this.id + " to include this new input text: " + convertedInputString);

            // update this input's associated results div with the latest input
            updateInnerHTML(this.id + "Results", convertedInputString);
            
            // update the spacers
            for (let s = 0; s < spacerQuantity; s++)
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
            let type1TotalHashtagCount = countAllHashtags(hashtagType1, hashtagType1RequiredInputArray, hashtagType1BonusHashtagArray);
            if (type1TotalHashtagCount > Number(document.getElementById(hashtagType1 + hashtagCountInputID).value))
            {
                console.log("max hashtags reached")
                totalRemovedInputHashtagArray.push(hashtagType1BonusHashtagArray.pop());
                console.log("removed a bonus hashtag. number of bonus hashes removed: " + totalRemovedInputHashtagArray.length);
            }

            if (type1TotalHashtagCount <  Number(document.getElementById(hashtagType1 + hashtagCountInputID).value))
            {
                console.log("below the max hashtag threshold")
                hashtagType1BonusHashtagArray.push(totalRemovedInputHashtagArray.pop());
                console.log("adding a bonus hashtag back. number of bonus hashes remaining to add: " + totalRemovedInputHashtagArray.length);
            }

            finalHashtagType1BonusHashtags = convertArrayToHashtags(hashtagType1BonusHashtagArray);
            // update the bonus hashtag div
            updateInnerHTML(hashtagType1 + "FinalCarBonusHashtags" + "Results", finalHashtagType1BonusHashtags);
        }
    }

    // create and append the hashtag count input
    let hashtagCountInputID = "hashtagCountInput";
    drawTypicalTextboxAndLabel(type1FormsContainerDiv, hashtagType1 + hashtagCountInputID, "Max Hashtag Count", maxHashtags);
    
}

// convert make/model input to hashtags if it's populated
if (hashtagType1RequiredInputIDArray[0].value != undefined)
{
    let finalMakeModelHashtags = convertStringToHashtags(document.getElementById(hashtagType1RequiredInputIDArray[0]));
} else 
{
    finalMakeModelHashtags = [];
}

// convert location input to hashtags if it's populated, otherwise set an empty array
if (hashtagType1RequiredInputIDArray[1].value != undefined)
{
    let finalLocationHashtags = convertStringToHashtags(document.getElementById(hashtagType1RequiredInputIDArray[1]));
} else 
{
    finalLocationHashtags = [];
}

// draw the type1 results div
function drawType1ResultsContainerDiv(containerDiv) 
{

    // define the container div and append it to the body
    let type1ResultsContainerDiv = document.createElement("div");
    containerDiv.appendChild(type1ResultsContainerDiv);
    type1ResultsContainerDiv.className = "resultsContainerDiv";

    // draw the copy to clipboard button
    drawCopyToClipboardButton(type1ResultsContainerDiv, hashtagType1);

    // define the copyable div and append it to the container
    let type1ResultsCopyableDiv = document.createElement("div");
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
    drawHashtagResultsDiv(type1ResultsCopyableDiv, finalHashtagType1BonusHashtags, hashtagType1, "FinalCarBonusHashtags");
}

// draw the master type1 div
function drawHashtagType1MasterDiv() 
{
    // draw the master container div
    let hashtagType1MasterContainerDiv = document.createElement("div");
    hashtagType1MasterContainerDiv.id = hashtagType1 + "Container";
    document.body.appendChild(hashtagType1MasterContainerDiv);

    // draw the form divs
    drawType1FormsContainerDiv(hashtagType1MasterContainerDiv);
    // draw the results divs
    drawType1ResultsContainerDiv(hashtagType1MasterContainerDiv);
}

// draw the master type2 div
function drawHashtagType2MasterDiv()
{
    // draw the master container div
    let hashtagType2MasterContainerDiv = document.createElement("div");
    hashtagType2MasterContainerDiv.id = hashtagType2 + "Container";
    document.body.appendChild(hashtagType2MasterContainerDiv);

    // draw the form divs
    drawType2FormsContainerDiv(hashtagType2MasterContainerDiv, hashtagType2, hashtagType2RequiredInputArray);
    // draw the results divs
    drawType2ResultsContainerDiv(hashtagType2MasterContainerDiv, hashtagType2, hashtagType2RequiredInputArray, finalHashtagType2LocationHashtags);
}

// draw the master type2 div
function drawHashtagType3MasterDiv()
{
    // draw the master container div
    let hashtagType3MasterContainerDiv = document.createElement("div");
    hashtagType3MasterContainerDiv.id = hashtagType3 + "Container";
    document.body.appendChild(hashtagType3MasterContainerDiv);

    // draw the form divs
    drawType2FormsContainerDiv(hashtagType3MasterContainerDiv, hashtagType3, hashtagType3RequiredInputArray);
    // draw the results divs
    drawType2ResultsContainerDiv(hashtagType3MasterContainerDiv, hashtagType3, hashtagType3RequiredInputArray, finalHashtagType3LocationHashtags);
}

/****** type2 specific divs ******/

// draw the hashtagType2 forms container div
function drawType2FormsContainerDiv(containerDiv, accountName, requiredInputArray)
{
    // define the container div and append it to the body
    let type2FormsContainerDiv = document.createElement("div");
    containerDiv.appendChild(type2FormsContainerDiv);
    type2FormsContainerDiv.className = "formsContainerDiv";

    // for each required input, create textboxes and labels
    for (let i = 0; i <= requiredInputArray.length - 1; i++)
    {
        drawTypicalTextboxAndLabel(type2FormsContainerDiv, accountName + requiredInputArray[i]["ID"], requiredInputArray[i]["label"], requiredInputArray[i]["defaultText"]);
    }

    let aRemovedHashtags = [];

    // for each text box, set the upkey action to trigger the content check update
    for (let b = 0; b < requiredInputArray.length; b++)
    {
        //console.log(hashtagType1RequiredInputIDArray[b]);
        document.getElementById(accountName + requiredInputArray[b]["ID"]).onkeyup = function()
        {
            let currentInputString = this.value;
            let convertedInputString = convertStringToHashtags(currentInputString);
            //console.log("updating textbox ID " + this.id + " to include this new input text: " + convertedInputString);
            updateInnerHTML(this.id + "Results", convertedInputString);

            // update the spacers
            for (let s = 0; s < spacerQuantity; s++)
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
            let type2TotalHashtagCount = countAllHashtags(accountName, requiredInputArray, splicedBonusHashtagArray);
            let currentMaxHashtags = Number(document.getElementById(accountName + hashtagCountInputID).value);
            let hashtagDelta = currentMaxHashtags - type2TotalHashtagCount;
            let absDelta = Math.abs(hashtagDelta);

            // if negative, too many hashtags
            if (hashtagDelta < 0)
            {
                splicedBonusHashtagArray.splice(splicedBonusHashtagArray.length - absDelta /*index*/, absDelta /*amount*/);

                aRemovedHashtags = getDifference(mallBonusHashtagArray, splicedBonusHashtagArray);
            }
            // otherwise, add enough back from the removed list to get to the max hashtag count
            else
            {
                // TODO: this isn't working properly - fix
                for (var i = 0; i < hashtagDelta; i++)
                {
                    // as long as we're still below the max
                    if (splicedBonusHashtagArray.length < type2TotalHashtagCount)
                    {
                        splicedBonusHashtagArray.push(aRemovedHashtags[i]);
                    }
                }
            }

            finalMallBonusHashtags = convertArrayToHashtags(splicedBonusHashtagArray);
            // update the bonus hashtag div
            updateInnerHTML(accountName + "FinalMallBonusHashtags" + "Results", finalMallBonusHashtags);
        };
    }
    // create and append the hashtag count input
    let hashtagCountInputID = "hashtagCountInput";
    drawTypicalTextboxAndLabel(type2FormsContainerDiv, accountName + hashtagCountInputID, "Max Hashtag Count", maxHashtags);
    // TODO: get the onKeyUp to update the hashtag counts
    /*
    document.getElementById(accountName + hashtagCountInputID).onkeyup = function()
    {
        updateInnerHTML();
    }
    */
}

// difference between two arrays
function getDifference(a, b) {
    return a.filter(element => {
      return !b.includes(element);
    });
  }

// convert description input to hashtags if it's populated
if (hashtagType2RequiredInputIDArray[0].value != undefined)
{
    let finalDescriptionHashtags = convertStringToHashtags(document.getElementById(hashtagType1RequiredInputIDArray[0]));
} else 
{
    finalDescriptionHashtags = [];
}

// draw the type2 results div
function drawType2ResultsContainerDiv(containerDiv, accountName, reuiredInputArray, locationTags) 
{
    // define the container div and append it to the body
    let type2ResultsContainerDiv = document.createElement("div");
    containerDiv.appendChild(type2ResultsContainerDiv);
    type2ResultsContainerDiv.className = "resultsContainerDiv";

    // draw the copy to clipboard button
    drawCopyToClipboardButton(type2ResultsContainerDiv, accountName);
    
    // define the copyable div and append it
    let type2ResultsCopyableDiv = document.createElement("div");
    type2ResultsCopyableDiv.className = accountName + "CopyableResultsContainerDiv";
    type2ResultsContainerDiv.appendChild(type2ResultsCopyableDiv);

    // if no description hashtags are provided, draw an empty div
    if (finalDescriptionHashtags == undefined)
    {
        drawHashtagResultsDiv(type2ResultsCopyableDiv, [], accountName, reuiredInputArray[0]["ID"]);
    }
    // otherwise, add the hashtags
    else 
    {
        drawHashtagResultsDiv(type2ResultsCopyableDiv, finalDescriptionHashtags, accountName, reuiredInputArray[0]["ID"]);
    }

    // draw the spacer div
    drawHashtagResultsSpacerDiv(accountName, reuiredInputArray[0]["ID"], type2ResultsCopyableDiv, spacerQuantity);

    // if desciption is provided, convert to hashtags
    if (finalDescriptionHashtags.length == 0)
    {
        let finalDescriptionHashtagsLength = 0;
    } 
    else
    {
        let finalDescriptionHashtagsLength = finalDescriptionHashtags.split(hash).length-1;
    }

    // draw the mall location tag div
    drawHashtagResultsDiv(type2ResultsCopyableDiv, locationTags, accountName, "LocationInput");

    // draw the spacer div
    drawHashtagResultsSpacerDiv(accountName, "LocationInput", type2ResultsCopyableDiv, spacerQuantity);
    // always display the location div spacers for cinderellacityproject
    for (let s = 0; s < spacerQuantity; s++)
    {
        updateInnerHTML(accountName + "LocationInput" + spacerID + s, spacerSymbol);
    }

    finalMallBonusHashtags = convertArrayToHashtags(splicedBonusHashtagArray);

    // draw the bonus tag div
    drawHashtagResultsDiv(type2ResultsCopyableDiv, finalMallBonusHashtags, accountName, "FinalMallBonusHashtags");
}

drawHeaderDiv();
drawTypeCheckDiv();