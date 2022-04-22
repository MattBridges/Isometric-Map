
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

GenerateMap(5,5);


function CreateTile(locX, locY, spriteTexture, selectorTexture){
    //Set correct sprite textures
    let sprite = new PIXI.Sprite(spriteTexture);
    let selectorSprite = new PIXI.Sprite(selectorTexture);
    let xPos = ((locX*tileSize-locY*tileSize)/2)+app.renderer.width/2;
    let yPos = ((locX*tileSize+locY*tileSize)/4)+app.renderer.height/2-256;
    sprite.position.set(xPos,yPos);
    selectorSprite.position.set(xPos,yPos);
    sprite.anchor.set(.5);
    selectorSprite.anchor.set(.5)
    selectorSprite.visible = false;
    
    //Draw Helper Gizmo
     const graphics = new PIXI.Graphics();

     const path = [
        new PIXI.Point(xPos-tileSize/2, yPos-tileOffset/4),
        new PIXI.Point(xPos,yPos-(tileSize/4)-tileOffset/4),
        new PIXI.Point(xPos+tileSize/2, yPos-tileOffset/4),
        new PIXI.Point(xPos,yPos+(tileSize/4)-tileOffset/4)];

     graphics.lineStyle(0);
     graphics.beginFill(0xffffff, 0.000000001);
     graphics.drawPolygon(path);
     graphics.endFill();

     graphics.interactive = true;
     graphics.buttonMode = true;
     graphics.on('pointerdown', event=> OnClick(sprite));
     graphics.on('pointerover', event=> OnPointerOver(sprite,selectorSprite));
     graphics.on('pointerout', event=> OnPointerOut(sprite, selectorSprite));

     
     app.stage.addChild(sprite);
     app.stage.addChild(graphics);
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

function OnClick(obj){
    if(selectedTile!=null){
        selectedTile.tint=0xffffff;
    }
    selectedTile = obj;
    selectedTile.tint=0xff0000;
}
function OnPointerOver(obj,selector){
selector.visible = true;
}
function OnPointerOut(obj, selector){
selector.visible = false;
}




