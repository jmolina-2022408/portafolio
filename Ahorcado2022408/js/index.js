// Palabras disponibles
const palabras = [
  "javascript",
  "programacion",
  "informatica",
  "estudiante",
  "profesor",
  "css",
  "html",
  "tecnologia",
  "computadora",
  "teclado",
  "laptop",
  "raton",
  "monitor",
  "sintaxis",
  "colegio",
];

// Palabra aleatoria seleccionada
let palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
palabraSecreta = palabraSecreta.toLowerCase();

// Arreglo para llevar un registro de las letras adivinadas
let letrasAdivinadas = Array(palabraSecreta.length).fill(false);

// Número de vidas restantes
let vidasRestantes = 7;

// Variable para mantener un registro de las letras utilizadas
let letrasUtilizadas = [];

// Elementos del DOM
const lienzo = document.getElementById("lienzo");
const ctx = lienzo.getContext("2d");
const contenedorPalabra = document.getElementById("contenedor-palabra");
const mensaje = document.getElementById("mensaje");
const vidasRestantesElement = document.getElementById("vidas-restantes");
const letrasUtilizadasElement = document.getElementById("letras-utilizadas");

// Función para dibujar el ahorcado
function dibujarAhorcado() {
  ctx.clearRect(0, 0, lienzo.width, lienzo.height);
  if (vidasRestantes < 7) {
    ctx.beginPath();
    ctx.moveTo(50, 350);
    ctx.lineTo(350, 350);
    ctx.stroke();
  }
  if (vidasRestantes < 7) {
    ctx.beginPath();
    ctx.moveTo(150, 350);
    ctx.lineTo(150, 100);
    ctx.stroke();
  }
  if (vidasRestantes < 7) {
    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(250, 100);
    ctx.stroke();
  }
  if (vidasRestantes < 6) {
    ctx.beginPath();
    ctx.arc(250, 130, 30, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (vidasRestantes < 5) {
    ctx.moveTo(250, 160);
    ctx.lineTo(250, 260);
    ctx.stroke();
  }
  if (vidasRestantes < 4) {
    ctx.moveTo(250, 180);
    ctx.lineTo(220, 220);
    ctx.stroke();
  }
  if (vidasRestantes < 3) {
    ctx.moveTo(250, 180);
    ctx.lineTo(280, 220);
    ctx.stroke();
  }
  if (vidasRestantes < 2) {
    ctx.moveTo(250, 260);
    ctx.lineTo(220, 300);
    ctx.stroke();
  }
  if (vidasRestantes < 1) {
    ctx.moveTo(250, 260);
    ctx.lineTo(280, 300);
    ctx.stroke();
  }
}

// Función para actualizar la palabra adivinada en el DOM
function actualizarPalabra() {
  contenedorPalabra.innerHTML = palabraSecreta
    .split("")
    .map((letra, indice) => (letrasAdivinadas[indice] ? letra : "_"))
    .join(" ");
}

// Función para actualizar el contenido del div de letras utilizadas
function actualizarLetrasUtilizadas() {
  letrasUtilizadasElement.textContent =
    "Letras utilizadas: " + letrasUtilizadas.join(", ");
}

// Función para manejar las adivinanzas de letras
function adivinarLetra(letra) {
  // Verificar si la letra ya se adivinó o no
  if (letrasAdivinadas.includes(letra) || vidasRestantes <= 0) {
    return;
  }

  // Agregar la letra a la lista de letras utilizadas
  letrasUtilizadas.push(letra);

  // Actualizar el contenido del div de letras utilizadas
  actualizarLetrasUtilizadas();

  // Marcar la letra como adivinada si es correcta
  let letraAdivinada = false;
  for (let i = 0; i < palabraSecreta.length; i++) {
    if (palabraSecreta[i] === letra) {
      letrasAdivinadas[i] = true;
      letraAdivinada = true;
    }
  }

  // Deshabilitar el botón después de adivinar la letra
  document.getElementById(letra).disabled = true;

  // Si la letra no es correcta, disminuir las vidas
  if (!letraAdivinada) {
    vidasRestantes--;
    vidasRestantesElement.textContent = "Vidas restantes: " + vidasRestantes;
    dibujarAhorcado();
  }

  // Actualizar la pantalla con la nueva información
  actualizarPalabra();

  // Verificar si el jugador ganó o perdió
  if (!letrasAdivinadas.includes(false)) {
    // Cambia el color del mensaje cuando se gana
    mensaje.textContent = "¡GANASTE!";
    mensaje.classList.add("ganar");
  } else if (vidasRestantes <= 0) {
    mensaje.textContent = "Perdiste. La palabra era " + palabraSecreta;
    mensaje.classList.add("perder");
  }
}

// Inicialización
actualizarPalabra();
dibujarAhorcado();
