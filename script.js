const canvas = document.getElementById("graph");
const context = canvas.getContext("2d");
const slider = document.getElementById("slider");
const container = document.querySelector(".container");

function drawGraph(a) {
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;

  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw x-axis
  context.beginPath();
  context.moveTo(0, canvas.height / 2);
  context.lineTo(canvas.width, canvas.height / 2);
  context.stroke();

  // Draw y-axis
  context.beginPath();
  context.moveTo(canvas.width / 2, 0);
  context.lineTo(canvas.width / 2, canvas.height);
  context.stroke();

  // Draw tick marks and labels on x-axis
  for (let x = -10; x <= 10; x++) {
    if (x !== 0) {
      const tickSize = 5;
      context.beginPath();
      context.moveTo(getX(x), getY(-tickSize));
      context.lineTo(getX(x), getY(tickSize));
      context.stroke();
      context.fillText(x, getX(x) - 3, getY(2 * tickSize));
    }
  }

  // Draw tick marks and labels on y-axis
  for (let y = -5; y <= 5; y++) {
    if (y !== 0) {
      const tickSize = 5;
      context.beginPath();
      context.moveTo(getX(-tickSize), getY(y));
      context.lineTo(getX(tickSize), getY(y));
      context.stroke();
      context.fillText(y, getX(2 * tickSize), getY(y) + 3);
    }
  }

  // Draw graph
  context.beginPath();
  context.strokeStyle = "red";
  for (let x = -10; x <= 10; x += 0.1) {
    const y = Math.pow(Math.abs(x), 2 / 3) + 0.9 * Math.sqrt(3.3 - Math.pow(x, 2)) * Math.sin(a * Math.PI * x);

    if (x === -10) {
      context.moveTo(getX(x), getY(y));
    } else {
      context.lineTo(getX(x), getY(y));
    }
  }
  context.stroke();
}

function getX(x) {
  return canvas.width / 2 + x * canvas.width / 20;
}


function getY(y) {
  return canvas.height / 2 - y * canvas.height / 10;
}

slider.addEventListener("input", () => {
  const a = slider.value;
  drawGraph(a);
});

window.addEventListener("resize", () => {
  drawGraph(slider.value);
});

drawGraph(slider.value);
``
