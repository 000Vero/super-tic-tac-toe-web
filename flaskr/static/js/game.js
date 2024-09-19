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
    )


    function playOffline() {
        for (let child of app.stage.children) {
            child.visible = false;
        }
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