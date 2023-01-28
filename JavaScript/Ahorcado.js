document.getElementById("agregarPalabra").style.display = "none";
document.getElementById("boton__nuevoJuego").style.display = "none"
document.getElementById("boton__salir").style.display = "none";


let botonIniciar = document.getElementById("boton__iniciar");
let botonAgregar = document.getElementById("boton__agregar");
let botonAgregarCancelar = document.getElementById("botonAgregar__cancelar");
let botonGuardar = document.getElementById("botonAgregar__guardar");
let botonNuevoJuego=document.getElementById("boton__nuevoJuego");
let botonCancelarSalir=document.getElementById("boton__salir");

let palabras = ["ALURA", "ORACLE", "ONE", "JAVASCRIPT","HTML", "CSS"];
var tablero = document.getElementById('horca').getContext('2d');
var palabraSecreta = "";

let letras = [];
let errores = 9;
var palabraCorrecta = "";
let letrasIncorrectas = [];
let numeroDeErrores = 8
let letraElegida = [];



function desapareceInicio() {

  document.getElementById("boton__iniciar").style.display = "none";
  document.getElementById("boton__agregar").style.display = "none";
  document.getElementById("agregarPalabra").style.display = "block";
  document.getElementById("agregarPalabra__textarea").focus();
}

function desapareceAgregar(){
  document.getElementById("agregarPalabra").style.display = "none";
}
function recargar() {
  location.reload();
}

function guardarPalabra() {
  
  let nuevaPalabra = document.getElementById("agregarPalabra__textarea").value;

  if(nuevaPalabra !== ""){
    palabras.push(nuevaPalabra.toUpperCase());
    alert('La palabra fue guardada')
    
  
    desapareceAgregar();
    iniciarJuego();
    console.log("palabra agregada: "+ nuevaPalabra);
    
  }
  else{
    alert("Ninguna palabra ha sido digitada")
  }

}

function escojerPalabraSecreta(){
  let palabra = palabras[Math.floor(Math.random() * palabras.length)]
  palabraSecreta = palabra
  console.log(palabraSecreta)
}



function anadirLetraIncorrecta() {
  errores -= 1
  console.log(errores)
}



function iniciarJuego() {

  document.getElementById("botonInicio").style.display = "none";

  dibujarCanvas();

  escojerPalabraSecreta();

  dibujarLineas();

  document.getElementById("boton__nuevoJuego").style.display = "block"
  document.getElementById("boton__salir").style.display = "block"

  document.onkeydown = (e) => {
    let letra = e.key.toUpperCase()
    if (letrasIncorrectas.length <= numeroDeErrores) {
      if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)) {
        if (palabraSecreta.includes(letra)) {
          adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
          for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
              escribirLetraCorrecta(i)
              verificarVencedor(letra)

            }
          }

        }
        else {
          if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
          dibujarAhorcado(errores)
          verificarFinJuego(letra)
        }
      }
    }
    else {
      alert("has superado el límite de letras incorrectas");
    }

  };
}

  




botonIniciar.addEventListener("click", iniciarJuego);
botonAgregar.addEventListener("click", desapareceInicio);
botonAgregarCancelar.addEventListener("click", recargar);
botonGuardar.addEventListener("click",guardarPalabra);
botonNuevoJuego.addEventListener("click", recargar);
botonCancelarSalir.addEventListener("click", recargar);
