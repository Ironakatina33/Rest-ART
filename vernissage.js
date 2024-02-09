const width = 329;
const height = 219;
const app = new PIXI.Application({ width, height}); 
const totalPixels = width * height
const container = document.querySelector('.container');
container.appendChild(app.view);


// prepare circle texture, that will be our brush
const brush = new PIXI.Graphics()
    .beginFill(0xffffff)
    .drawCircle(0, 0, 50);

// Create a line that will interpolate the drawn points
const line = new PIXI.Graphics();

PIXI.Assets.add('t1', '../images/wbep/vernissage-cadreweb.webp');
PIXI.Assets.add('t2', '../images/wbep/resultat-final.webp');
PIXI.Assets.load(['t1', 't2']).then(setup);

function setup()
{
    const stageSize = { width: 329, height: 219 };
    const background = Object.assign(PIXI.Sprite.from('t1'), stageSize);
    const imageToReveal = Object.assign(PIXI.Sprite.from('t2'), stageSize);
    const renderTexture = PIXI.RenderTexture.create(stageSize);
    const renderTextureSprite = new PIXI.Sprite(renderTexture);

    imageToReveal.mask = renderTextureSprite;

    app.stage.addChild(
        background,
        imageToReveal,
        renderTextureSprite,
    );

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage
        .on('pointerdown', pointerDown)
        .on('pointerup', pointerUp)
        .on('pointerupoutside', pointerUp)
        .on('pointermove', (e) => {
            percentage()
            pointerMove(e)
        });

    let dragging = false;
    let lastDrawnPoint = null;

    function percentage(getPercentageAt) {
        const pixels = app.renderer.extract.pixels(renderTexture);
  
        remainingPixels = pixels.reduce(
          (count , value , index) =>
            index % 4 === 3 && value !== 0 ? count + 1 : count,
          0
        );
  
        const percentageRemaining = (remainingPixels / totalPixels) * 100;
        if (percentageRemaining >= 90) {
            window.location = '/page/fin.html';
        }
  
        console.log(percentageRemaining);
      }
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
