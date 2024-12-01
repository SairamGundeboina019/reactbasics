// script.js

// Toggle theme
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Create planets dynamically
const solarSystem = document.getElementById('solar-system');

const planets = [
  { name: "Mercury", color: "gray" },
  { name: "Venus", color: "yellow" },
  { name: "Earth", color: "blue" },
  { name: "Mars", color: "red" }
];

planets.forEach((planet, index) => {
  const planetDiv = document.createElement('div');
  planetDiv.className = 'planet';
  planetDiv.style.backgroundColor = planet.color;
  planetDiv.style.animationDuration = `${10 + index}s`;
  solarSystem.appendChild(planetDiv);

  // Hover effect to show name
  planetDiv.addEventListener('mouseover', () => {
    alert(`Welcome to ${planet.name}`);
  });
});

// Fetch planet info dynamically
fetch('https://api.le-systeme-solaire.net/rest/bodies/')
  .then(response => response.json())
  .then(data => {
    const infoCards = document.getElementById('info-cards');
    data.bodies.slice(0, 10).forEach(body => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${body.englishName}</h3>
        <p>Type: ${body.bodyType}</p>
        <p>Gravity: ${body.gravity} m/s²</p>
      `;
      infoCards.appendChild(card);
    });
  });
