const topIcons = [
  "/icons/night_top.png"
  // "icons/storm_top.png",
  // "icons/monst_top.png"
];

const turnIcons = [
  "/icons/night_flap.png"
  // "icons/storm_flap.png",
  // "icons/monst_flap.png"
]

icon = Math.floor(Math.random() * topIcons.length)
// Setup dragon
const dragon = document.createElement("img");
dragon.src = topIcons[icon];
Object.assign(dragon.style, {
  position: "fixed",
  width: "60px",
  height: "60px",
  zIndex: "9999",
  pointerEvents: "auto",
  transition: "transform 0.1s linear",
  transformOrigin: "center center",
  cursor: "pointer"
});
document.body.appendChild(dragon);

// Initial position
let pos = {
  x: Math.random() * (window.innerWidth - 60),
  y: Math.random() * (window.innerHeight - 60)
};
dragon.style.left = `${pos.x}px`;
dragon.style.top = `${pos.y}px`;

let angle = 0;
let t = 0;
let arcPath = null;
let duration = 300; // frames to complete arc
let currentAngle = 0;

// Get next arc path
function getNextArcPath(start, end) {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;

  const dx = end.x - start.x;
  const dy = end.y - start.y;

  // Calculate a perpendicular offset for the arc height
  const arcOffset = 100 * (Math.random() > 0.5 ? 1 : -1); // flip direction randomly

  const control = {
    x: midX + (dy / Math.hypot(dx, dy)) * arcOffset,
    y: midY - (dx / Math.hypot(dx, dy)) * arcOffset
  };

  return { start, control, end };
}

// Quadratic Bézier interpolation
function bezier(t, p0, p1, p2) {
  const x = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x;
  const y = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y;
  return { x, y };
}

// Choose first target
let target = getRandomTarget();
arcPath = getNextArcPath(pos, target);

// Every few seconds: pick a new target & path
setInterval(() => {
  dragon.src = turnIcons[icon];
  pos = pos = getCurrentDragonPosition();
  target = getRandomTarget();
  arcPath = getNextArcPath(pos, target);
  t = 0;
  setTimeout(function(){
    dragon.src = topIcons[icon];
  }, 500);
}, 3000);

// Animate along curve
function fly() {
  if (arcPath) {
    if (t < 1) {
      const prev = bezier(t, arcPath.start, arcPath.control, arcPath.end);
      t += 1 / duration;
      const curr = bezier(t, arcPath.start, arcPath.control, arcPath.end);

      dragon.style.left = `${curr.x}px`;
      dragon.style.top = `${curr.y}px`;

      // Rotate toward direction
      const dx = curr.x - prev.x;
      const dy = curr.y - prev.y;
      const deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }

      // Limit how fast it can rotate per frame
      const maxTurnPerFrame = 5; // degrees

      let delta = deg - currentAngle;

      // Handle angle wrapping (e.g., going from 359° to 1°)
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      // Clamp delta
      delta = clamp(delta, -maxTurnPerFrame, maxTurnPerFrame);

      currentAngle += delta;
      dragon.style.transform = `rotate(${currentAngle}deg)`;

      dragon.style.transform = `rotate(${currentAngle}deg)`;
    }
  }

  requestAnimationFrame(fly);
}
fly();

// Random target generator
function getRandomTarget() {
  const padding = 80;
  return {
    x: Math.random() * (window.innerWidth - padding),
    y: Math.random() * (window.innerHeight - padding)
  };
}
function getCurrentDragonPosition() {
  return {
    x: parseFloat(dragon.style.left || "0"),
    y: parseFloat(dragon.style.top || "0")
  };
}


// Click to collect
dragon.addEventListener("click", () => {
  const collection = JSON.parse(localStorage.getItem("dragonCollection") || "[]");
  if (!collection.includes(dragon.src)) {
    collection.push(dragon.src);
    localStorage.setItem("dragonCollection", JSON.stringify(collection));
  }
  alert("🔥 You captured a drifting dragon!");
  // dragon.remove();
});
