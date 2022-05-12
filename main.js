Status = "";
objects = [];
sound = "";

function preload(){
    sound = loadSound("Creepy-clock-chiming.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function modelLoaded(){
    console.log("Cocossd is Initialized");
    Status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(Status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " +  percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y - 100, objects[i].width, objects[i].height);

            if(objects[i].label == "person"){
                document.getElementById("baby_found").innerHTML = "Baby is found";
                sound.stop();
            }

            if(objects[i].label != "person"){
                document.getElementById("baby_found").innerHTML = "Baby not found";
                sound.play();
            }

            if(objects.length == 0){
                document.getElementById("baby_found").innerHTML = "Baby not found";
                sound.play();
            }
        }
    }
}