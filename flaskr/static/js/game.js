var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var width, baseWidth = 1920;
var height, baseHeight = 1080;

if (window.innerWidth < window.innerHeight || window.innerWidth / window.innerHeight == 16 / 9) {
    width = (screenWidth * 0.9);
    height = width / 16 * 9;
} else {
    height = (screenHeight * 0.9);
    width = height / 9 * 16;
}


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
    const buttonTexture = await PIXI.Assets.load("../static/assets/button12.png");
    const settingsTexture = await PIXI.Assets.load("../static/assets/settings.png");
    const titleTexture = await PIXI.Assets.load("../static/assets/title.png");

    var background = new PIXI.Sprite(backgroundTexture);
    
    background.setSize(width, height);
    background.anchor.set(0.5, 0.5);
    background.position.set(screenWidth / 2, screenHeight / 2)

    var title = new PIXI.Sprite(titleTexture);

    title.setSize(width / 1.25, (width / 1.25) / 33 * 4);
    title.anchor.set(0.5, 0.5);
    title.position.set(screenWidth / 2, height / 3);

    var playOfflineButton = new PIXI.Sprite(buttonTexture);

    playOfflineButton.setSize(width / 3, (width / 3) / 81 * 16);
    playOfflineButton.anchor.set(0, 0);
    playOfflineButton.position.set(title.position.x - title.getSize().width / 2, height / 1.9);

    var playOnlineButton = new PIXI.Sprite(buttonTexture);

    playOnlineButton.setSize(width / 3, (width / 3) / 81 * 16);
    playOnlineButton.anchor.set(1, 0);
    playOnlineButton.position.set(title.position.x + title.getSize().width / 2, height / 1.9);

    app.stage.addChild(background);
    app.stage.addChild(title);
    app.stage.addChild(playOfflineButton);
    app.stage.addChild(playOnlineButton);


    

})();