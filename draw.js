const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const restartButton = document.getElementById('restart');
const percentageDisplay = document.getElementById('percentage');
const bestBeautyPercentage = document.getElementById('bestBeautyPercentage');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 200;
const boundaryLeft = centerX - radius;
const boundaryTop = centerY - radius;
const boundaryRight = centerX + radius;
const boundaryBottom = centerY + radius;

let isDrawing = false;
let beautyPercentage = 0;



context.beginPath();
context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
context.stroke();

canvas.addEventListener('mousedown', () => {
  isDrawing = true;
});

canvas.addEventListener('mousemove', (event) => {
  if (!isDrawing) {
    return;
  }

  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;

  const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
  const percentage = Math.round((1 - (Math.abs(distanceFromCenter - radius) / radius)) * 100);
  beautyPercentage = percentage;

  if (x < boundaryLeft || x > boundaryRight || y < boundaryTop || y > boundaryBottom) {
    isDrawing = false;
    alert('Game over! You went out of the circle.');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.stroke();
    beautyPercentage = 0;
    percentageDisplay.innerText = beautyPercentage;
    if (beautyPercentage > bestBeautyPercentage) {
      bestBeautyPercentage = beautyPercentage;
    }
    beautyPercentage = 0;
  } else {
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI);
    const redValue = Math.round((1 - percentage / 100) * 255);
    const greenValue = Math.round(percentage / 100 * 255);
    context.strokeStyle = `rgb(${redValue}, ${greenValue}, 0)`;
    context.stroke();
    percentageDisplay.innerText = beautyPercentage;
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  if (beautyPercentage < 70) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.stroke();
    beautyPercentage = 0;
    percentageDisplay.innerText = beautyPercentage;

    if (beautyPercentage > bestBeautyPercentage) {
      bestBeautyPercentage = beautyPercentage;
    }
    beautyPercentage = 0;
  }
});


canvas.addEventListener('mouseup', (event) => {
  isDrawing = false;
const x = event.clientX - canvas.offsetLeft;
const y = event.clientY - canvas.offsetTop;

if (beautyPercentage < 70 || (x === startX && y === startY)) {
context.clearRect(0, 0, canvas.width, canvas.height);
context.beginPath();
context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
context.stroke();
beautyPercentage = 0;
percentageDisplay.innerText = beautyPercentage;
if (beautyPercentage > bestBeautyPercentage) {
  bestBeautyPercentage = beautyPercentage;
}
beautyPercentage = 0;
}
});


restartButton.addEventListener('click', () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  context.stroke();
  beautyPercentage = 0;
  percentageDisplay.innerText = beautyPercentage;
});



