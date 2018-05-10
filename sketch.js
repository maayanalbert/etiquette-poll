var netflix
var primary = 0;
var secondary = 150;
var tertiary = 255;
var ligterThanSecondary = 200;
var spotColor = [175, 21, 110];
var tools;
var fb;
var microwave;
var cmu;
var whiteboard;
var buzzfeed;
var mac;
var polls = []


function preload() {
  netflix = loadImage("assets/netflix.png");
  tools = loadImage("assets/tools.png");
  fb = loadImage("assets/fb.png");
  microwave = loadImage("assets/microwave.png");
  cmu = loadImage("assets/cmu.png");
  whiteboard = loadImage("assets/whiteboard.png");
  buzzfeed = loadImage("assets/buzzfeed.png");
  mac = loadImage("assets/mac.png");
}

function setup() {
    createCanvas(3500, 880);
    textFont('Avenir');
    textSize(15);



    descriptions = ["Is it ok to borrow someone else's \ntools in studio without asking?",
                    "Should I take my food out from the \nmicrowave before the buzzer goes off?",
                    "Should I keep my whiteboard drawings \nconfined to a single section?",
                    "Should Apple indicate where \nto open my laptop?",
                    "Is it ok for Netflix to autoplay \nthe next episode of a tv show?",
                    "Is it ok for Facebook to set default \nprivacy settings to public?",
                    "Is it ok for Buzzfeed to feature \nadds that look like content?",
                    "Is it ok for CMU to put self serving \npropoganda around campus?"]
    images = [tools, microwave, whiteboard, mac, netflix, fb, buzzfeed, cmu];
    hashtags = ["#studiosharing", "#crusis", "#entrainment", "#affordance", "#darkpatterns", 
    "#nudge", "#tactic", "#propoganda"];

    for(i = 0; i < images.length; i++){
        newPoll = new Poll(50 + 450*i, 300, descriptions[i], images[i], hashtags[i]);
        polls.push(newPoll);
    }
}

function draw() {
    background(255);

    noStroke()
    fill(ligterThanSecondary);
    //fill(spotColor[0], spotColor[1], spotColor[2]);
    textAlign(LEFT);
    textSize(30);
    text("Throughout this semester, many of my instagram posts revolved \naround an unsaid understanding of etiquette. What do you think \nof these inferences?", 50, 100);

    textSize(15);

    for(i = 0; i < polls.length; i++){
        polls[i].draw();
    }
}

function mousePressed(){
    for(i = 0; i < polls.length; i++){
        polls[i].update();
    }
}

function Poll(xpos, ypos, textDescription, headerImage, hashtag){
    this.hashtag = hashtag;
    this.xpos = xpos;
    this.ypos = ypos;
    this.headerImage = headerImage;
    this.yesCount = 0;
    this.noCount = 0;
    this.height = 510;
    this.width = 380;
    this.imageSize = 250;
    this.percentage = .1;
    this.drawResultsBar = function(){
        noFill();
        strokeWeight(1);
        stroke(spotColor[0], spotColor[1], spotColor[2]);
        rectMode(CENTER);
        rect(this.xpos + this.width/2, this.ypos + 460, 255, 15, 10);

        fill(spotColor[0], spotColor[1], spotColor[2], 100);
        rectMode(CORNER);
        noStroke();
        this.percentage = this.yesCount /(this.yesCount + this.noCount);
        rect(this.xpos + 62, this.ypos + 453, 255 * this.percentage, 15, 10);
    };
    this.textDescription = textDescription;
    this.yesButton = new Button(xpos + this.width/2 - 75, ypos + 400, "yes");;
    this.noButton = new Button(xpos + this.width/2 + 75, ypos + 400, "no");
    this.draw = function(){
        strokeWeight(1);
        stroke(secondary);
        rectMode(CORNER);
        fill(tertiary);
        rect(this.xpos, this.ypos, this.width, this.height, 20)
        this.yesButton.draw();
        this.noButton.draw();
        this.drawResultsBar();

        noStroke()
        fill(ligterThanSecondary);
        textAlign(CENTER);
        textSize(25);
        text(hashtag, xpos + this.width/2, ypos - 25);

        noStroke()
        textSize(15);
        fill(secondary);
        textAlign(CENTER);
        text(textDescription, xpos + this.width/2, ypos + 60);
        image(this.headerImage, xpos + this.width/2 - this.imageSize/2, ypos + 100, this.imageSize, this.imageSize);
    }
    this.update = function(){
        this.yesButton.update();
        this.noButton.update();
        if(this.yesButton.callback){
           this.yesButton.callback = false;
           this.yesCount = this.yesCount + 1; 
           //print(this.yesCount)
        }
        if(this.noButton.callback){
           this.noButton.callback = false;
           this.noCount++; 
        }
    }
}

function Button(xpos, ypos, buttonText){
    this.xpos = xpos;
    this.ypos = ypos;
    this.buttonText = buttonText;
    this.buttonHeight = 50;
    this.buttonWidth = 100;
    this.callback = false;
    this.draw = function(){
        rectMode(CENTER);
        //draw
        textAlign(CENTER);
        noFill();
        stroke(spotColor[0], spotColor[1], spotColor[2]);
        strokeWeight(1);

        if(mouseX > this.xpos - this.buttonWidth/2 &&
            mouseX < this.xpos + this.buttonWidth/2 &&
            mouseY > this.ypos - this.buttonHeight/2 &&
            mouseY < this.ypos + this.buttonHeight/2){
            fill(spotColor[0], spotColor[1], spotColor[2], 30);
        }

        rect(this.xpos, this.ypos, this.buttonWidth, this.buttonHeight, 10);

        noStroke()
        fill(spotColor[0], spotColor[1], spotColor[2]);
        text(this.buttonText, this.xpos, this.ypos+5);

    }
    this.update = function(){
        if(mouseX > this.xpos - this.buttonWidth/2 &&
            mouseX < this.xpos + this.buttonWidth/2 &&
            mouseY > this.ypos - this.buttonHeight/2 &&
            mouseY < this.ypos + this.buttonHeight/2){
            this.callback = true;
        }
    }
}
