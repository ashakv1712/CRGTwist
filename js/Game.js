class Game {
  constructor() {
    this.resetTitle = createElement("h2")
    this.resetButton = createButton("")
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    this.resetTitle.html("Reset Game");
    this.resetTitle.position(width/2+200, 40);
    this.resetTitle.class("resetText")
    this.resetButton.position(width/2+230, 100);
    this.resetButton.class("resetButton");
    
  }

  
  play() {
    this.handleElements();
    this.handleResetButton();
    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);
      
      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        
        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          cars[index-1].rotation = 0;

        if(keyIsDown(LEFT_ARROW)){
          cars[index-1].rotation = -25;
        }
        if(keyIsDown(RIGHT_ARROW)){
          cars[index-1].rotation = 25;
        }
        

          // Changing camera position in y direction
          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
        }
      }

      this.handlePlayerControls();

      drawSprites();
    }
  }

  handleResetButton(){
    this.resetButton.mousePressed(()=>{
      database.ref("/").set({
        playerCount:0,
        gameState: 0,
        players: {}
      })
      window.location.reload()
    })
  }
  handlePlayerControls() {
    // handling keyboard events
    if (keyIsDown(UP_ARROW)) {
      
      player.positionY += 10;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW)) {
      console.log(player)
    
      player.positionX += 5;
      player.update();
    }

    if (keyIsDown(LEFT_ARROW)) {
      player.positionX -= 5

      player.update();
    }


  }
}
