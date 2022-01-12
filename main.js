
function preload()
{
    classifier = ml5.imageClassyfier('DoodleNet');
}

function setup()
{
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white"); 
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function draw()
{
    strokeWeight(15);
    stroke(0);

    if (mouseIsPressed)
    {
        line( pmouseX, pmouseY, mouseX, mouseY );
    }
}

function clear_canvas()
{
    background("white");
}

function classifyCanvas()
{
    classifier.classify( canvas, gotResult);
}

function gotResult(error, result)
{
    if (error)
    {
        console.error(error);
    }
    console.log(result);

    document.getElementById("label").innerHTML = "Label: " + result[0].lable;
    document.getElementById("confiedence").innerHTML = "Confidence: " + result[0].confidence;

    utterThis = SpeechSynthesisUtterance(result[0].label);
    synth.speak(utterThis);
}