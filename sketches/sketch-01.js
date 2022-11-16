const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [600, 600],
};

const sketch = () => {
  return ({ context: ctx, width, height }) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.rect(200, 200, 400, 400);
    // ctx.stroke();

    ctx.beginPath();
    ctx.arc(200, 200, 100, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    // ctx.stroke();

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "yellow");
    grad.addColorStop(1, "#d700d7");
    ctx.strokeStyle = grad;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const width = 60;
        const height = 60;
        const gap = 20;
        const x = 100 + (width + gap) * i;
        const y = 100 + (height + gap) * j;

        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(x + 8, y + 8, width - 16, height - 16);
        ctx.stroke();
      }
    }
  };
};

canvasSketch(sketch, settings);
