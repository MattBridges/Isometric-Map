
const canvas = document.getElementById('mycanvas');
const app = new PIXI.Application({
    view:canvas,
    width: window.innerWidth,
    height: window.innerHeight
});

const tileSize = 256;
const tileOffset = 175/2;
const outerTexture = PIXI.Texture.from('images/Tiles/Grass-B.png');
const innerTexture = PIXI.Texture.from('images/Tiles/sand.png');
const selectorTexture = PIXI.Texture.from('images/UI/UI_Selection_Sprite.png');
const innerSelectorTexture = PIXI.Texture.from('images/UI/UI_Inner_Selection_Sprite.png');
let selectedTile=null;

//Generate the map
GenerateMap(5,5);


function CreateTile(locX, locY, spriteTexture, selectorTexture){
    
    //Set appropriate sprites to use
    let tileSprite = new PIXI.Sprite(spriteTexture);
    let selectorSprite = new PIXI.Sprite(selectorTexture);
    //Convert positions to world space based on tile size
    let xPos = ((locX*tileSize-locY*tileSize)/2)+app.renderer.width/2;
    let yPos = ((locX*tileSize+locY*tileSize)/4)+app.renderer.height/2-256;
    //Set tile and selector sprite locations
    tileSprite.position.set(xPos,yPos);
    selectorSprite.position.set(xPos,yPos);
    tileSprite.anchor.set(.5);
    selectorSprite.anchor.set(.5)
    //Initially hide selector sprite
    selectorSprite.visible = false;
    
    //Add custom click trigger to tile
     let clickTrigger = new PIXI.Graphics();

     const path = [
        new PIXI.Point(xPos-tileSize/2, yPos-tileOffset/4),
        new PIXI.Point(xPos,yPos-(tileSize/4)-tileOffset/4),
        new PIXI.Point(xPos+tileSize/2, yPos-tileOffset/4),
        new PIXI.Point(xPos,yPos+(tileSize/4)-tileOffset/4)];

        clickTrigger.lineStyle(0);
        clickTrigger.beginFill(0xffffff, 0.000000001);
        clickTrigger.drawPolygon(path);
        clickTrigger.endFill();
        //Make clickTricger interactable and add evvents
        clickTrigger.interactive = true;
        clickTrigger.buttonMode = true;
        clickTrigger.on('pointerdown', event=> OnClick(sprite));
        clickTrigger.on('pointerover', event=> OnPointerOver(sprite,selectorSprite));
        clickTrigger.on('pointerout', event=> OnPointerOut(sprite, selectorSprite));

     //Add tile components to screen
     app.stage.addChild(tileSprite);
     app.stage.addChild(clickTrigger);
     app.stage.addChild(selectorSprite);     
}

function GenerateMap(width,height){
    for(let x=0;x<=width-1;x++){
        for(let y=0;y<=height-1;y++){
            //Check if outer or inner tile and create the appriopriate tile 
            if(x==0 || y==0 || x==width-1 || y == height-1){
                CreateTile(x,y,outerTexture,selectorTexture);
            }
            else{
                CreateTile(x,y,innerTexture,innerSelectorTexture)
            }
        }
    }
}
//Mouse Event Functions
function OnClick(obj){
    //Check if there is a currently selected tile, if so clear tint from that tile 
    if(selectedTile!=null){
        selectedTile.tint=0xffffff;
    }
    //Set the new selected tile, and tint it red
    selectedTile = obj;
    selectedTile.tint=0xff0000;
}
function OnPointerOver(obj,selector){
    //Make the selector sprite visible when moused over
    selector.visible = true;
}
function OnPointerOut(obj, selector){
    //Make the selector sprite invisible when mouse leaves
    selector.visible = false;
}




