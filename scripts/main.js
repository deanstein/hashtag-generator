var hash = "#";
function generateHashtags() 
{
    // check if car
    var carCheck = prompt("Is this a car?");
    if (carCheck === "Yes" || carCheck === "yes" || carCheck === "y" || carCheck === "Y" || carCheck === "yes ")
        {
        // get car data 
        var carData = prompt("Enter the year, make, and model");
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
    var div = document.createElement("div");
    var carHashHTML = document.createTextNode(finalCarHashtags);
    //var carHashHTML = div.innerHTML(carHash);
    div.setAttribute("style", "background-color: pink;");
    div.appendChild(carHashHTML);
    document.body.appendChild(div);
}

// execute the body
bodyHTML();