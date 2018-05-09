function setup() {
    createCanvas(200, 20);
    background(220);
    text("p5.js vers 0.5.12 test.", 10, 15);
}

function draw() {
}

function Poll(xpos, ypos, textDescription, yesButtonText, noButtonText){
    this.xpos;
    this.ypos;
    this.image;
    this.yesCount = 0;
    this.noCount = 0;
    this.yesButton = new Button(xpos + something, ypos + something, this, yesButtonText);;
    this.noButton = new Button(xpos + something, ypos + something, this, noButtonText);
    this.resultsBar;
    this.textDescription;
}

function Button(xpos, ypos, parentPoll, text){
    this.parentPoll = parentPoll;
    this.xpos = xpos;
    this.ypos = ypos;
    this.text = text;
    this.draw = function(){

    }
    this.press = function(){

    }
}
