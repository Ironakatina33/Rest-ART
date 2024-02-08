const app = new PIXI.Application();

const container = document.querySelector('.container');


// Obtenez les dimensions du conteneur
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

// Configurez la taille de l'application PixiJS pour correspondre à la taille du conteneur
app.renderer.resize(containerWidth, containerHeight);

// Ajoutez le canvas PixiJS au conteneur
container.appendChild(app.view);

// prepare circle texture, that will be our brush
const brush = new PIXI.Graphics()
    .beginFill(0xffffff)
    .drawCircle(0, 0, 50);

// Create a line that will interpolate the drawn points
const line = new PIXI.Graphics();

PIXI.Assets.add('nettoyage', '../images/Tableau_fin/nettoyage.png');
PIXI.Assets.add('grattage', '../images/Tableau_fin/grattage.png');
PIXI.Assets.add('vernissage', '../images/Tableau_fin/vernissage.png');
PIXI.Assets.add('resultatFinal', '../images/Tableau_fin/resultat-final.png');

PIXI.Assets.load(['nettoyage', 'grattage', 'vernissage', 'resultatFinal']).then(setup);

function setup()
{
    const { width, height } = app.screen;
    const stageSize = { width, height };

    const nettoyage = Object.assign(PIXI.Sprite.from('nettoyage'), stageSize);
    const grattage = Object.assign(PIXI.Sprite.from('grattage'), stageSize);
    const vernissage = Object.assign(PIXI.Sprite.from('vernissage'), stageSize);
    const imageToReveal = Object.assign(PIXI.Sprite.from('resultatFinal'), stageSize);
    const renderTexture = PIXI.RenderTexture.create(stageSize);
    const renderTextureSprite = new PIXI.Sprite(renderTexture);

    imageToReveal.mask = renderTextureSprite;

    app.stage.addChild(
        nettoyage,
        grattage,
        vernissage,
        imageToReveal,
        renderTextureSprite,
    );

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage
        .on('pointerdown', pointerDown)
        .on('pointerup', pointerUp)
        .on('pointerupoutside', pointerUp)
        .on('pointermove', pointerMove);

    let dragging = false;
    let lastDrawnPoint = null;

    function pointerMove({ global: { x, y } })
    {
        if (dragging)
        {
            brush.position.set(x, y);
            app.renderer.render(brush, {
                renderTexture,
                clear: false,
                skipUpdateTransform: false,
            });
            // Smooth out the drawing a little bit to make it look nicer
            // this connects the previous drawn point to the current one
            // using a line
            if (lastDrawnPoint)
            {
                line
                    .clear()
                    .lineStyle({ width: 100, color: 0xffffff })
                    .moveTo(lastDrawnPoint.x, lastDrawnPoint.y)
                    .lineTo(x, y);
                app.renderer.render(line, {
                    renderTexture,
                    clear: false,
                    skipUpdateTransform: false,
                });
            }
            lastDrawnPoint = lastDrawnPoint || new PIXI.Point();
            lastDrawnPoint.set(x, y);
        }
    }

    function pointerDown(event)
    {
        dragging = true;
        pointerMove(event);
    }

    function pointerUp(event)
    {
        dragging = false;
        lastDrawnPoint = null;
    }
}