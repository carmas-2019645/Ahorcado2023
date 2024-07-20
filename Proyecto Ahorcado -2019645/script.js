//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const coverContainer = document.getElementById("cover-container");
const container = document.querySelector(".container");

//Valores de opciones para botones
let options = {
  Facil: [
    "Manzana",
    "Oso",
    "Sal",
    "lluvia",
    "Java",
    "Msql",
  ],
  Medio: ["Teclado", "Mouse", "Pantera", "Hardware", "Monitor", "Cebra"],
  Dificil: [
    "Murcielago",
    "Tecnologia",
    "Infrrmatica",
    "Programacion",
    "correspondientes",
    "Hamburguesa",
  ],
};

//Conatar
let winCount = 0;
let count = 0;
let chosenWord = "";

//Mostrar las opciones de los botones
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Por favor seleccione que nivel desea Jugar</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord(this, '${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Hace un bloqueo a todos los botones
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");

  //Deshabilita todas las opciones
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //Deshabilita todas las letras
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
  newGameContainer.classList.remove("hide");
};

//Hicimos un generador de palabras
const generateWord = (selectedButton, optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");

  // Reproducir música de entrada
  const audio = document.getElementById("myAudio");
  audio.play();
  if (audio.paused) {
    audio.pause();
  }

  // Recorre todos los botones de opciones
  optionsButtons.forEach((button) => {
    if (button === selectedButton) {
      button.classList.add("active"); // Agrega la clase activa al botón seleccionado
    } else {
      button.classList.remove("active"); // Elimina la clase activa de otros botones
    }
    button.disabled = false; // Volver a habilitar todos los botones de opción
  });

  //inicialmente oculta las letras, borra las palabra anteriores
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";
  let optionArray = options[optionValue];

  //Elije de todas las palabras al azar
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //reemplaza cada letra con un intervalo que contenga un guión
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Muestra cada uno de los elementos como los intervalos
  userInputSection.innerHTML = displayItem;
};

//Función inicial (llama cuando se carga la página el usuario presiona un juego nuevo)
const initializer = () => {
  // Detener la música si se está reproduciendo
  const audio = document.getElementById("myAudio");
  if (!audio.paused) {
    audio.pause();
  }
  winCount = 0;
  count = 0;

  //Inicialmente borra todo el contenido y oculta las letras y el botón de nuevo juego.
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //Para crear botones con letras
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");

    //Número en ASCII[A-Z]
    button.innerText = String.fromCharCode(i);

    //clic en el botón de carácter
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");

      //Si la matriz contiene un valor presionado, reemplace el guión coincidente con la letra, de lo contrario dram en el lienzo
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //si el carácter en la matriz es el mismo que el botón en el que se hizo clic
          if (char === button.innerText) {
            //reemplaza guión con letra
            dashes[index].innerText = char;
            //Contador de incrementos
            winCount += 1;
            //Si winCount es igual a la longitud de la palabra
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>Ganaste!!</h2><p>La palabra fue <span>${chosenWord}</span></p>`;
              //bloquea todos los botones
              blocker();
            }
            const winAudio = document.getElementById("winAudio");
            winAudio.play();
          }
        });
      } else {
        //Pierde la cuenta
        count += 1;
        //Pra Dibujar
        drawMan(count);
        //Cuente == 7 porque cabeza, cuerpo, brazo izquierdo, brazo derecho, pierna izquierda, pierna derecha, y de ultimo nada
        if (count == 7) {
          resultText.innerHTML = `<h2 class='lose-msg'>Perdiste!!</h2><p>La palabra es <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //deshabilita el botón presionado
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
//Llamada a canvasCreator (para borrar el lienzo anterior y crear el lienzo inicial)
  let { initialDrawing } = canvasCreator();
  //Dibuja el marco
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //Dibuja las lineas
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //Marco inicial
  const initialDrawing = () => {
    //claro canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //Lineas de botones
    drawLine(10, 130, 130, 130);
    //linea izquierda
    drawLine(10, 10, 10, 131);
    //linea superior
    drawLine(10, 10, 70, 10);
    //Pequeña linea superior 
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//Dibuja al hombre
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    case 7:
      head(); 
      body();
      leftArm();
      rightArm();
      leftLeg();
      rightLeg();
      resultText.innerHTML = `<h2 class='lose-msg'>¡Perdiste!</h2><p>La palabra era <span>${chosenWord}</span></p>`;
      blocker();
      break;
  }
  const loseAudio = document.getElementById("loseAudio");
  loseAudio.play();
  resultText.innerHTML = `<p>Oportunidades perdidas: ${count} de 7</p>`;
};


//Nuevo Juego
newGameButton.addEventListener("click", initializer);
window.onload = initializer;

{

}  