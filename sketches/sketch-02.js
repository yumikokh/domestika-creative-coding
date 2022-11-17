const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const settings = {
  dimensions: [1000, 1000],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const cx = width * 0.5;
    const cy = height * 0.5;

    const w = width * 0.14;
    const h = height * 0.01;

    const num = 20;
    const radius = width * 0.3;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      const x = cx + (radius / 2) * Math.cos(angle);
      const y = cy + (radius / 2) * Math.sin(angle);

      // 時計
      context.save();

      context.translate(x, y);
      context.rotate(angle);
      context.scale(random.range(0.2, 0.6), random.range(0.1, 1.2));

      context.beginPath();
      context.rect(w / 3, random.range(0, -h * 2), w, h);
      context.fill();

      context.restore();

      // 弧
      const arcNum = 3;
      for (let j = 0; j < arcNum; j++) {
        context.save();
        context.translate(cx, cy);
        context.rotate(angle);

        context.lineWidth = (random.range(5, 20) / arcNum) * (arcNum - j);

        context.beginPath();
        context.arc(
          0,
          0,
          ((radius * random.range(0.3, 1.4)) / arcNum) * j,
          slice * random.range(1, -3),
          slice * random.range(1, 5)
        );
        context.stroke();

        context.restore();
      }

      // context.save();
      // context.translate(cx, cy);
      // context.rotate(angle);

      // context.lineWidth = 1;
      // context.strokeStyle = "pink";

      // context.beginPath();
      // context.arc(0, 100, radius / 2, 0, Math.PI * 2);
      // context.stroke();

      // context.restore();
    }
  };
};

canvasSketch(sketch, settings);
