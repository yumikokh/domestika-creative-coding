const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const color = require("canvas-sketch-util/color");
const risoColors = require("riso-colors");

const settings = {
  dimensions: [1000, 1000],
  // animate: true,
};

const sketch = ({ context, width, height }) => {
  const num = 40;
  const degrees = -30;

  const rects = [];

  const rectColors = [
    random.pick(risoColors).hex,
    random.pick(risoColors).hex,
    random.pick(risoColors).hex,
  ];

  const bgColor = random.pick(risoColors).hex;

  for (let i = 0; i < num; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    const w = random.range(400, 600);
    const h = random.range(40, 200);
    // const fill = `rgba(${random.range(0, 255)}, ${random.range(
    //   0,
    //   255
    // )}, ${random.range(0, 255)}, 1)`;

    const fill = random.pick(rectColors);
    const stroke = random.pick(rectColors);

    const blend = random.value() > 0.5 ? "overlay" : "source-over";
    rects.push({ x, y, w, h, fill, stroke, blend });
  }

  return ({ context, width, height }) => {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i];
      let shadowColor;

      context.save();
      context.translate(rect.x, rect.y);
      context.strokeStyle = rect.stroke;
      context.lineWidth = 10;
      context.fillStyle = rect.fill;

      context.globalCompositeOperation = rect.blend;

      drawSkewedRect({ context, w: rect.w, h: rect.h, degrees });

      shadowColor = color.offsetHSL(rect.fill, 0, 0, 20);
      shadowColor.rgba[3] = 0.4;

      context.shadowColor = color.style(shadowColor.rgba);
      context.shadowOffsetX = -10;
      context.shadowOffsetY = 5;

      context.fill();

      context.shadowColor = null;
      context.stroke();

      context.globalCompositeOperation = "source-over";

      context.lineWidth = 1;
      context.strokeStyle = "black";
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
