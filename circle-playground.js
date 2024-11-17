const menuToggle = document.getElementById('menu-toggle');
const slideMenu = document.getElementById('slide-menu');
const closeMenu = document.getElementById('close-menu');
const applyButton = document.getElementById('apply-btn');

slideMenu.style.left = '0';

//disable right click
document.addEventListener('contextmenu', event => {
    event.preventDefault();
});

menuToggle.addEventListener('click', () => {
    slideMenu.style.left = '0';
});

closeMenu.addEventListener('click', () => {
    slideMenu.style.left = '-260px';
});

let inactivityTimeout;

function showMenuButton() {
    document.body.classList.remove('cursor-hidden');
    menuToggle.classList.remove('hidden');
}

function hideMenuButton() {
    document.body.classList.add('cursor-hidden');
    menuToggle.classList.add('hidden');
}

document.addEventListener('mousemove', () => {
    clearTimeout(inactivityTimeout);
    showMenuButton();
    inactivityTimeout = setTimeout(hideMenuButton, 3000);
});

hideMenuButton();

//VARS

let circles = [];

let circleCount = parseFloat(document.getElementById("circle_count").value, 10);
let circleSpeed = parseFloat(document.getElementById("circle_speed").value, 10);
let circleRadius = parseFloat(document.getElementById("circle_radius").value, 10);
let circleConnectRadius = parseFloat(document.getElementById("circle_connect_radius").value, 10);
let circleColor = document.getElementById("circle_color").value;
let circleConnectColor = document.getElementById("circle_connect_color").value;

let mouseRepelDistance = parseFloat(document.getElementById("circle_mouse_repel_distance").value, 10);
let friction = parseFloat(document.getElementById("circle_mouse_repel_friction").value, 10);


//APPLY BUTTON

applyButton.addEventListener('click', () => {
    circles = [];

    circleCount = parseFloat(document.getElementById("circle_count").value, 10);
    circleSpeed = parseFloat(document.getElementById("circle_speed").value, 10);
    circleRadius = parseFloat(document.getElementById("circle_radius").value, 10);
    circleConnectRadius = parseFloat(document.getElementById("circle_connect_radius").value, 10);
    circleColor = document.getElementById("circle_color").value
    circleConnectColor = document.getElementById("circle_connect_color").value;
    mouseRepelDistance = parseFloat(document.getElementById("circle_mouse_repel_distance").value, 10);
    friction = parseFloat(document.getElementById("circle_mouse_repel_friction").value, 10);

    loadCircles();
});

//MAIN

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//MOUSE

let mouse = { x: null, y: null };
let isMouseDown = false;

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

canvas.addEventListener('mousedown', (event) => {

    if (event.button === 0) {
        isMouseDown = true;
    }
});

canvas.addEventListener('mouseup', (event) => {
    if (event.button === 0) {
        isMouseDown = false;
    }
});

//MAIN

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createCircle() {
    let radius = Math.random() * circleRadius + circleRadius;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let speedX = (Math.random() * 2 - 1) * circleSpeed;
    let speedY = (Math.random() * 2 - 1) * circleSpeed;

    if (Math.random() > 0.8) {
        speedX *= 1.5;
        speedY *= 1.5;
    }

    let defaultSpeedX = speedX;
    let defaultSpeedY = speedY;

    circles.push({ x, y, radius, speedX, speedY, defaultSpeedX, defaultSpeedY });
}

function loadCircles() {
    for (let i = 0; i < circleCount; i++) {
        createCircle();
    }
}

function updateCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = window.innerWidth;

    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];

        if (mouse.x !== null && mouse.y !== null) {
            let dx = circle.x - mouse.x;
            let dy = circle.y - mouse.y;
            let distance = Math.hypot(dx, dy);

            if (isMouseDown) {
                let angle = Math.atan2(dy, dx);
                let attractForce = (mouseRepelDistance - distance) / mouseRepelDistance;

                circle.speedX += Math.cos(angle) * attractForce * circleSpeed;
                circle.speedY += Math.sin(angle) * attractForce * circleSpeed;
            } else {
                if (distance < mouseRepelDistance) {
                    let angle = Math.atan2(dy, dx);
                    let repelForce = (mouseRepelDistance - distance) / mouseRepelDistance;

                    circle.speedX += Math.cos(angle) * repelForce * circleSpeed;
                    circle.speedY += Math.sin(angle) * repelForce * circleSpeed;
                }
            }
        }

        if (circle.speedX >= circle.defaultSpeedX) {
            circle.speedX *= friction;
        }
        if (circle.speedY >= circle.defaultSpeedY) {
            circle.speedY *= friction;
        }

        circle.x += circle.speedX;
        circle.y += circle.speedY;

        if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
            circle.speedX = -circle.speedX;
        }
        if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
            circle.speedY = -circle.speedY;
        }

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circleColor;
        ctx.fill();
        ctx.closePath();
    }

    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            let circle1 = circles[i];
            let circle2 = circles[j];
            let dist = Math.hypot(circle2.x - circle1.x, circle2.y - circle1.y);

            if (dist < circleConnectRadius) {
                let lineWidth = Math.max(1, 5 - dist / 30);

                ctx.beginPath();
                ctx.moveTo(circle1.x, circle1.y);
                ctx.lineTo(circle2.x, circle2.y);
                ctx.strokeStyle = circleConnectColor;
                ctx.lineWidth = lineWidth;
                ctx.lineCap = 'round';
                ctx.setLineDash([]);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    requestAnimationFrame(updateCircles);
}

loadCircles();

updateCircles();