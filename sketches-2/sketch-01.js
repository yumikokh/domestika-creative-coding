const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1000, 1000],
  // animate: true,
};

const sketch = ({ context, width, height }) => {
  let x, y;

  const num = 20;
  const degrees = 30;

  const rects = [];

  for (let i = 0; i < num; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    const w = random.range(200, 600);
    const h = random.range(40, 200);
    rects.push({ x, y, w, h });
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i];

      context.save();
      context.translate(rect.x, rect.y);
      context.strokeStyle = "blue";

      drawSkewedRect({ context, w: rect.w, h: rect.h, degrees });

      context.stroke();

      context.restore();
    }
  };
};

const drawSkewedRect = ({ context, w = 600, h = 200, degrees = 45 }) => {
  const angle = math.degToRad(degrees);
  const rx = Math.cos(angle) * w;
  const ry = Math.sin(angle) * w;

  context.save();
  context.translate(rx * -0.5, (ry + h) * -0.5);

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(rx, ry);
  context.lineTo(rx, ry + h);
  context.lineTo(0, h);
  context.closePath();
  context.stroke();
  context.restore();
};
canvasSketch(sketch, settings);
