var currentRequest = null;

window.onload = function () {
    var reCreate = document.getElementById("reCreate");

    reCreate.addEventListener("click", function () {
        if (currentRequest != null) {
            currentRequest.abort();
            document.getElementById("routine").innerHTML = "";
        }
        document.getElementById('generator').style.display='block';
        reCreate.style.display = "none";
    })

    var volume = document.getElementById("volume");

    volume.addEventListener("change", function () {
        var description = document.getElementById("volumeDescription");

        switch (volume.value) {
            case "60":
                description.innerHTML = "<div style='text-align:center;padding-bottom:0.5em'>60 reps.</div><div style='text-align:center'> Ideal for beginners with less than 6 months experience.</div>";
            break;
            case "75":
                description.innerHTML = "<div style='text-align:center;padding-bottom:0.5em'>75 reps.</div><div style='text-align:center'> Ideal for beginners with 6 months to a year experience.</div>";
            break;
            case "90":
                description.innerHTML = "<div style='text-align:center;padding-bottom:0.5em'>90 reps.</div><div style='text-align:center'> Ideal for experienced lifters with 1 year to 2 years of experience.</div>";
            break;
            case "105":
                description.innerHTML = "<div style='text-align:center;padding-bottom:0.5em'>105 reps.</div><div style='text-align:center'> Ideal for experiences lifters with 2 years to 3 years of experience.</div>";
            break;
            case "120":
                description.innerHTML = "<div style='text-align:center;padding-bottom:0.5em'>120 reps.</div><div style='text-align:center'> Ideal for advanced lifters with more than 3 years of experience.</div>";
            break;
        }
    })

    volume.dispatchEvent(new Event("change"));


    var multiSelectImages = document.getElementsByClassName("imgMultiSelect");
    for (var i =0; i < multiSelectImages.length;i++) {
        multiSelectImages[i].addEventListener("click", function (event) {
            var targetElement = event.currentTarget;
            var hidden = document.getElementById("exerciseTypes");
            var value = hidden.value;
            var elementValue = targetElement.firstElementChild.innerText;

            if (targetElement.classList.contains("imgMultiSelected"))
            {
                targetElement.classList.remove("imgMultiSelected");
                value = value.replace(","+elementValue, "");
                value = value.replace(elementValue, "");
                hidden.value = value;

                if (hidden.value.charAt(0) == ",")
                {
                    hidden.value = hidden.value.substr(1);
                }
              
            }
            else
            {
                targetElement.classList.add("imgMultiSelected");

                value = value == "" ? elementValue : value + ","+elementValue;
                hidden.value = value;
            }
        });
    }
}

function generate() {
    var form = document.getElementById('generator');

    form.style.display="none";
    document.getElementById("reCreate").style.display="block";
    var routine = document.getElementById("routine");
    var loader = document.getElementById("loader").cloneNode(true);
    loader.style.display = "block";
    routine.appendChild(loader);

    var data = {};
    var inputs = document.getElementById("generator").querySelectorAll("input,select");

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].nodeName == "SELECT") {
            var options = inputs[i].options;
            var selected = []
            for (var j = 0; j < options.length; j++) {
                if (options[j].selected) {
                    selected.push(options[j].value);
                }
            }
            data[inputs[i].name] = selected;
        }
        else if (inputs[i].type == "radio")
        {
            if (inputs[i].checked) {
                data[inputs[i].name] = inputs[i].value;
            }
        }
        else if (inputs[i].type == "hidden" && inputs[i].id == "exerciseTypes")
        {
            var types = [];
            if (inputs[i].value == "") {
                
                types.push(2);
                types.push(3);
                continue;
            }
            types = inputs[i].value.split(",");

            var typeArray = [];
            for (var j = 0; j < types.length; j++) {
                
                typeArray.push(types[j]);

            }
            data[inputs[i].name] = typeArray;
        }
        else
        {
            data[inputs[i].name] = inputs[i].value;
        }
    }

    post(data, insertRoutine);
}

function insertRoutine(result) {

    var routineDiv = document.getElementById("routine");
    routineDiv.classList = "";
    routineDiv.innerHTML = "";
    
    result = JSON.parse(result);
    if (result == undefined || result == null) {
        routineDiv.innerHTML = "<div id='card'><h4 style='text-align:center'>"+
        "Server unresponsive. Please contact administrator or try again.</h4></div>";
        return;
    }
    //Errors occurred
    if (result.constructor != Array) {
        routineDiv.innerHTML = "<div id='card'><h4 style='text-align:center'>"+result+"</h4></div>";
        return;
    }

    for (var i =0; i < result.length; i++) {
        var workoutDayTemplate = document.getElementById("workoutDayTemplate").cloneNode(true);
        workoutDayTemplate.id = result[i].name + i.toString();
        workoutDayTemplate.style.display = "block";

        workoutDayTemplate.querySelector("#name").innerText = result[i].name;
    
        for (var j = 0; j < result[i].workouts.length; j++) {
            
            var workoutTemplate = document.getElementById("workoutTemplate").cloneNode(true);
            workoutTemplate.style.display = "block";

            workoutTemplate.id = result[i].workouts[j].exercise.name + i.toString() + j.toString();

            var link = workoutTemplate.querySelector("#name");
            link.textContent = result[i].workouts[j].exercise.name;
            link.target = "_blank";
            link.href = "http://www.google.com/search?q="+link.textContent.replace(" ", "+");
            workoutTemplate.querySelector("#repScheme").textContent =  result[i].workouts[j].repScheme.primarySetsReps.item1+ 
            "x"+ result[i].workouts[j].repScheme.primarySetsReps.item2;
        

            workoutDayTemplate.querySelector("#workouts").appendChild(workoutTemplate);
        }

        routineDiv.appendChild(workoutDayTemplate);
    }
    document.getElementById("generateAnother").scrollIntoView();
}

function post( data, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200)
            {
                callback(xmlHttp.responseText);
            }
            else
            {
                callback(null);
            }
        }


    }

    xmlHttp.open("POST","https://gainzwebapi.herokuapp.com/api/generator/", true); // true for asynchronous 
    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xmlHttp.send(JSON.stringify(data));

    currentRequest = xmlHttp;
    
}