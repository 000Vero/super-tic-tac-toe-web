var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var width = 1920;
var height = 1080;

width = (screenWidth * 0.8);
height = width / 16 * 9;


(async () =>
{
    // Create PixiJS application
    const app = new PIXI.Application();

    // Initialize

    await app.init({
        width: screenWidth,
        height: screenHeight,
        background: "black"
    });

    // Append the application canvas
    document.body.appendChild(app.canvas);

    // Start loading textures
    const backgroundTexture = await PIXI.Assets.load("../static/assets/background.png");
    backgroundTexture.source.scaleMode = PIXI.SCALE_MODES.NEAREST;

    const buttonTexture = await PIXI.Assets.load("../static/assets/button12.png");
    buttonTexture.source.scaleMode = PIXI.SCALE_MODES.NEAREST;

    const settingsTexture = await PIXI.Assets.load("../static/assets/settings.png");
    settingsTexture.source.scaleMode = PIXI.SCALE_MODES.NEAREST;

    const titleTexture = await PIXI.Assets.load("../static/assets/title.png");
    titleTexture.source.scaleMode = PIXI.SCALE_MODES.NEAREST;
    
    const fontSheet = await PIXI.Assets.load("../static/assets/font.png");
    fontSheet.source.scaleMode = PIXI.SCALE_MODES.NEAREST;

    const gridTexture = await PIXI.Assets.load("../static/assets/grid.png");
    gridTexture.source.scaleMode = PIXI.SCALE_MODES.NEAREST;

    const crossTexture = await PIXI.Assets.load("../static/assets/cross.png");
    crossTexture.source.scaleMode = PIXI.SCALE_MODES.NEAREST;

    const circleTexture = await PIXI.Assets.load("../static/assets/circle.png");
    circleTexture.source.scaleMode = PIXI.SCALE_MODES.NEAREST;

    PIXI.Assets.add({
        alias: "fontTable",
        src: "../static/assets/font.json",
        data: {texture: fontSheet} // using preloaded texture
    });
    const fontSpritesheet = await PIXI.Assets.load("fontTable");

    var background = new PIXI.Sprite(backgroundTexture);
    
    background.setSize(width, height);
    background.anchor.set(0.5, 0.5);
    background.position.set(screenWidth / 2, screenHeight / 2)

    var gameX = background.position.x - background.getSize().width / 2;
    var gameY = background.position.y - height / 2;
    

    var title = new PIXI.Sprite(titleTexture);

    title.setSize(width / 1.25, (width / 1.25) / 33 * 4);
    title.anchor.set(0.5, 0);
    title.position.set(screenWidth / 2, gameY + (height / 10));

    var subtitle = new PIXI.Sprite(buttonTexture);

    subtitle.setSize(width / 3, (width / 3) / 81 * 16);
    subtitle.anchor.set(0.5, 0);
    subtitle.position.set(screenWidth / 2, title.position.y + title.getSize().height + 10);

    var playOfflineButton = new PIXI.Sprite(buttonTexture);

    playOfflineButton.setSize(width / 3, (width / 3) / 81 * 16);
    playOfflineButton.anchor.set(0, 0);
    playOfflineButton.position.set(title.position.x - title.getSize().width / 2, gameY + (height / 2));

    playOfflineButton.eventMode = "static";
    playOfflineButton.on("pointerdown", playOffline);
    playOfflineButton.on("pointerover", playOfflineHover);
    playOfflineButton.on("pointerleave", playOfflineLeave);

    var playOnlineButton = new PIXI.Sprite(buttonTexture);

    playOnlineButton.setSize(width / 3, (width / 3) / 81 * 16);
    playOnlineButton.anchor.set(1, 0);
    playOnlineButton.position.set(title.position.x + title.getSize().width / 2, gameY + (height / 2));

    playOnlineButton.eventMode = "static";
    playOnlineButton.on("pointerover", playOnlineHover);
    playOnlineButton.on("pointerleave", playOnlineLeave);

    //fontSpritesheet.textures.Z.source.scaleMode = PIXI.SCALE_MODES.NEAREST;

    app.stage.addChild(background);
    app.stage.addChild(title);
    app.stage.addChild(subtitle);
    app.stage.addChild(playOfflineButton);
    app.stage.addChild(playOnlineButton);

    var subtitleText = typeContained("WEB EDITION",
        subtitle.getSize().width,
        subtitle.getSize().height,
        subtitle.position.x - subtitle.getSize().width / 2,
        subtitle.position.y,
        true
    )
    
    var offlineText = typeContained("PLAY OFFLINE",
        playOfflineButton.getSize().width,
        playOfflineButton.getSize().height,
        playOfflineButton.position.x,
        playOfflineButton.position.y,
        true
    );

    var onlineText = typeContained("PLAY ONLINE",
        playOnlineButton.getSize().width,
        playOnlineButton.getSize().height,
        playOnlineButton.position.x - playOnlineButton.getSize().width,
        playOnlineButton.position.y,
        true
    );

    var uiElements = [background, title, subtitle, playOfflineButton, playOnlineButton];
    var uiText = [offlineText, onlineText, subtitleText];

    var grid = new PIXI.Sprite(gridTexture);
    grid.visible = false;
    grid.setSize(width / 2, width / 2);
    grid.anchor.set(0.5, 0.5);
    grid.position.set(gameX + width / 2, gameY + height / 2);
    app.stage.addChild(grid);

    grid.eventMode = "static";
    grid.on("pointerdown", gridClick);

    var bigGridBox = [];
    for (let i = 0; i < 4; i++) {
        if (i < 2) {
            let sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
            sprite.tint = "green";
            sprite.visible = false;
            sprite.setSize(width / 2, height / 64);
            sprite.anchor.set(0.5, 0.5);
            if (!i) sprite.position.set(gameX + width / 2, grid.position.y - grid.getSize().height / 2);
            else sprite.position.set(gameX + width / 2, grid.position.y + grid.getSize().height / 2);
            bigGridBox = bigGridBox.concat(sprite);
            app.stage.addChild(sprite);
        } else {
            let sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
            sprite.tint = "green";
            sprite.visible = false;
            sprite.setSize(height / 64, width / 2);
            sprite.anchor.set(0.5, 0.5);
            if (!(i - 2)) sprite.position.set(grid.position.x - grid.getSize().width / 2, gameY + height / 2);
            else sprite.position.set(grid.position.x + grid.getSize().width / 2, gameY + height / 2);
            bigGridBox = bigGridBox.concat(sprite);
            app.stage.addChild(sprite);
        }
    }

    var smallGridBox = [];
    for (let i = 0; i < 4; i++) {
        if (i < 2) {
            let sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
            sprite.tint = "green";
            sprite.visible = false;
            sprite.setSize(width / 8, height / 128);
            sprite.anchor.set(0.5, 0);
            if (!i) sprite.position.set(grid.position.x - grid.getSize().width / 2.9, grid.position.y - grid.getSize().height / 2.125);
            else sprite.position.set(grid.position.x - grid.getSize().width / 2.9, grid.position.y - grid.getSize().height / 4.5);
            smallGridBox = smallGridBox.concat(sprite);
            app.stage.addChild(sprite);
        } else {
            let sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
            sprite.tint = "green";
            sprite.visible = false;
            sprite.setSize(height / 128, width / 7.75);
            sprite.anchor.set(0, 0);
            if (!(i - 2)) sprite.position.set(grid.position.x - grid.getSize().width / 2.125, grid.position.y - grid.getSize().height / 2.125);
            else sprite.position.set(grid.position.x - grid.getSize().width / 4.5, grid.position.y - grid.getSize().height / 2.125);
            smallGridBox = smallGridBox.concat(sprite);
            app.stage.addChild(sprite);
        }
    }

    function moveSmallGridBox(cell) {
        let moveX = 0;
        let moveY = 0;
        // Set X
        switch (cell) {
            case 0:
            case 3:
            case 6:
                moveX = 0;
                break;

            case 1:
            case 4:
            case 7:
                moveX = 1;
                break;

            case 2:
            case 5:
            case 8:
                moveX = 2;
        }
        // Set Y
        switch (cell) {
            case 0:
            case 1:
            case 2:
                moveY = 0;
                break;

            case 3:
            case 4:
            case 5:
                moveY = 1;
                break;

            case 6:
            case 7:
            case 8:
                moveY = 1.95;
        }
        // Horizontal lines
        smallGridBox[0].position.set(grid.position.x - grid.getSize().width / 2.9 + moveX * width / 5.84, grid.position.y - grid.getSize().height / 2.125 + moveY * height / 3.175);
        smallGridBox[1].position.set(grid.position.x - grid.getSize().width / 2.9 + moveX * width / 5.84, grid.position.y - grid.getSize().height / 4.5 + moveY * height / 3.175);
        // Vertical lines
        smallGridBox[2].position.set(grid.position.x - grid.getSize().width / 2.125 + moveX * width / 5.84, grid.position.y - grid.getSize().height / 2.125 + moveY * height / 3.175);
        smallGridBox[3].position.set(grid.position.x - grid.getSize().width / 4.5  + moveX * width / 5.84, grid.position.y - grid.getSize().height / 2.125 + moveY * height / 3.175);
        for (let child of bigGridBox) child.visible = false;
        for (let child of smallGridBox) child.visible = true;
    }


    function playOffline() {
        for (let child of uiElements) child.visible = false;
        for (let text of uiText) for (let char of text) char.visible = false;
        grid.visible = true;
        for (let child of bigGridBox) child.visible = true;
    }

    function playOnline() {
        // Do nothing, playing online isn't supported yet
        ;
    }

    function playOfflineHover(text) {
        for (let char of offlineText) char.tint = 0xFFFF00;
    }
    
    function playOfflineLeave() {
        for (let char of offlineText) char.tint = 0xFFFFFF;
    }

    function playOnlineHover() {
        for (let char of onlineText) char.tint = 0xFFFF00;
    }

    function playOnlineLeave() {
        for (let char of onlineText) char.tint = 0xFFFFFF;
    }

    function typeContained(string, frameWidth, frameHeight, x, y, centered) {
        let baseStringWidth = (5 * string.length) + (6 * string.length);
        let finalScale = (frameWidth / baseStringWidth) * 1.5;
        if (centered) {
            let finalStringWidth = (finalScale * string.length) + (6 * finalScale * string.length);
            return type(string, x + ((frameWidth - finalStringWidth) / 2), y + frameHeight / 2, finalScale);
        }
        return type(string, x, y, finalScale);
    }

    let refMatrix = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];

    function gridClick(event) {
        let gridSize = grid.getSize();
        let relX = event.x - (grid.position.x - gridSize.width / 2);
        let relY = event.y - (grid.position.y - gridSize.height/2);
        let boxX;
        let boxY;
        if (relX < gridSize.width / 3) boxX = 0;
        else if (relX >= gridSize.width / 3 && relX < gridSize.width / 3 * 2) boxX = 1;
        else boxX = 2;

        if (relY < gridSize.height / 3) boxY = 0;
        else if (relY >= gridSize.height / 3 && relY < gridSize.height / 3 * 2) boxY = 1;
        else boxY = 2;

        moveSmallGridBox(refMatrix[boxX][boxY]);
    }
    
    function type(string, x, y, fontScale) {
        let spriteList = [];
        let baseX = 0;
        for (let char of string) {
            if (char == ' ') {
                baseX += 6 * fontScale;
                continue;
            }
            let charSprite = new PIXI.Sprite(fontSpritesheet.textures[char]);
            charSprite.anchor.set(-1, 0.5);
            charSprite.setSize(5 * fontScale, 8 * fontScale);
            charSprite.position.set(x + baseX, y);
            app.stage.addChild(charSprite);
            baseX += 6 * fontScale;
            spriteList = spriteList.concat(charSprite);
        }
        return spriteList;
    }

    app.ticker.add((time) => {
        ;
    });
    

})();