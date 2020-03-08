var dabba,database;
var position;

function setup(){
    database=firebase.database();
    createCanvas(500,500);
    dabba = createSprite(250,250,20,20);
    dabba.shapeColor = "turquoise";

   var dabbaPosition = database.ref('ball/position');
   dabbaPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('ball/position').set({
        'x': position.x + x ,
        'y': position.y + y
    })
}

function readPosition(data){
  position = data.val();
  dabba.x = position.x;
  dabba.y=position.y;
}

function showError(){ 
    console.log("Error in writing to the database");
 }