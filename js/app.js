// Campos formulario
const mascotaInput = document.querySelector('#mascota')
const propietarioInput = document.querySelector('#propietario')
const telefonoInput = document.querySelector('#telefono')
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora')
const sintomasInput = document.querySelector('#sintomas')

// UI
const formulario = document.querySelector("#nueva-cita")
const contenedorCitas = document.querySelector("#citas")

class Citas {
  constructor(){
    this.citas = [];
  }

}
class UI {
  imprimirAlerta(mensaje,tipo) {
    // crear el div
    const divMensaje = document.createElement("div")
    divMensaje.classList.add('text-center','alert','col-12','d-block')
    // Agregar clase segun el tipo
    if(tipo=== 'error') {
      divMensaje.classList.add('alert-danger')
    } else {
      divMensaje.classList.add('alert-succes')
    }
    // Mensaje de error
    divMensaje.textContent = mensaje
    // Agregar al Dom
    document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'))
    //  Quitar la alerta despues de 3 seg
    setTimeout( ( ) =>  { 
      divMensaje.remove()
    }, 3000 )
  }
}
const ui = new UI();
const administrarCitas = new Citas()
// Registrar eventos
eventListeners()
function eventListeners(){
  mascotaInput.addEventListener('change',datosCita)
  propietarioInput.addEventListener('change',datosCita)
  telefonoInput.addEventListener('change',datosCita)
  fechaInput.addEventListener('change',datosCita)
  horaInput.addEventListener('change',datosCita)
  sintomasInput.addEventListener('change',datosCita)

  formulario.addEventListener('submit', nuevaCita)
 
}

function nuevaCita(){}

// Objeto con la informacion de la cita 
const citaObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora:'',
  sintomas:''
}

// Agrega datos al objeto citaObj
function datosCita(e){
  citaObj[e.target.name] = e.target.value
  console.log(citaObj);
}

// Valida y agrega una nueva cita a la clase de citas 
function nuevaCita(e){
  e.preventDefault()
  // Extraer la informacion del objeto de cita
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj
  if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
    ui.imprimirAlerta("Todos los campos son obligatorios", "error")
    return
  }
}