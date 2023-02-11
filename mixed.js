const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

async function runWorld(contents) {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

  var canvas = document.getElementById("canvas");
  // create engine
  var engine = Engine.create({
      render: {
        element: document.body,
        canvas: canvas,
        options: {
          width: WIDTH,
          height: HEIGHT,
        },
      },
    }),
    world = engine.world;

  // create renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: WIDTH,
      height: HEIGHT,
      showAngleIndicator: false,
      background: "transparent", // transparent to hide
      wireframeBackground: "transparent", // transparent to hide
      wireframes: false,
    },
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // floor
  Composite.add(world, [
    Bodies.rectangle(WIDTH / 2, HEIGHT - 100, WIDTH * 0.7, 20, {
      isStatic: true,
      render: {
        fillStyle: "gray",
        wireframeBackground: "transparent", // transparent to hide
        wireframes: false,
      },
    }),
  ]);

  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

  Composite.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // start loop to add images
  loop();
  function loop() {
    // fade out image
    setTimeout(function () {
      const xCoord = WIDTH * 0.7 * Math.random() + WIDTH * 0.15;
      Composite.add(
        world,
        Bodies.rectangle(xCoord, -100, 100, 100, {
          isStatic: false,
          restitution: 0.4,
          render: {
            sprite: {
              texture: contents[counter].image.square.url,
              xScale: 0.23,
              yScale: 0.23,
            },
          },
        })
      );
      counter++;
      loop();
    }, 1500);
  }
}
