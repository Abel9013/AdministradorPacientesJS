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

let editando;

class Citas {
  constructor(){
    this.citas = [];
  }
  agregarCita(cita) {
    this.citas = [...this.citas, cita]
  }
  eliminarCita(id){
      this.citas = this.citas.filter( cita => cita.id !== id )
  }
  editarCita(citaActualizada){
    this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita )
    
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
  
  imprimirCitas({citas}) {
    this.limpiarHTML()
    citas.forEach(cita => {
        const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita
        const divCita = document.createElement('div')
        divCita.classList.add('cita', 'p-3')
        divCita.dataset.id = id
        // Scripting de los elementos de la cita
        const mascotaParrafo = document.createElement("h2")
        mascotaParrafo.classList.add('card-title', 'font-weight-bolder')
        mascotaParrafo.textContent = mascota
        
        const propietarioParrafo = document.createElement("p")
        propietarioParrafo.innerHTML = `
          <span class="font-weight-bolder">Propietario: ${propietario}</span>
        `
        const telefonoParrafo = document.createElement("p")
        telefonoParrafo.innerHTML = `
          <span class="font-weight-bolder">Telefono: ${telefono}</span>
        `
        const fechaParrafo = document.createElement("p")
        fechaParrafo.innerHTML = `
          <span class="font-weight-bolder">Fecha: ${fecha}</span>
        `
        const horaParrafo = document.createElement("p")
        horaParrafo.innerHTML = `
          <span class="font-weight-bolder">Hora: ${hora}hs</span>
        `
        const sintomasParrafo = document.createElement("p")
        sintomasParrafo.innerHTML = `
          <span class="font-weight-bolder">Sintomas: ${sintomas}</span>
        `
        // Boton para eliminar cita
        const btnEliminar = document.createElement('button')
        btnEliminar.classList.add('btn', 'btn-danger', 'mr-2')
        btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>'
        btnEliminar.onclick = () => eliminarCita(id) 
        
        // BotonEditar
        const btnEditar = document.createElement('button')
        btnEditar.classList.add('btn', 'btn-info', 'mr-2')
        btnEditar.innerHTML = 'Editar<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path></svg>'
        btnEditar.onclick = () => cargarEdicion(cita) 
        // Agregar los parrafos al divCita
        divCita.appendChild(mascotaParrafo)
        divCita.appendChild(propietarioParrafo)
        divCita.appendChild(telefonoParrafo)
        divCita.appendChild(fechaParrafo)
        divCita.appendChild(horaParrafo)
        divCita.appendChild(sintomasParrafo)
        divCita.appendChild(btnEliminar)
        divCita.appendChild(btnEditar)
        // Agregar citas html
        contenedorCitas.appendChild(divCita)
      });
  }
  limpiarHTML() {
    while(contenedorCitas.firstChild){
      contenedorCitas.removeChild(contenedorCitas.firstChild)
    }
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
  sintomas:'',
  id: ''
}

// Agrega datos al objeto citaObj
function datosCita(e){
  citaObj[e.target.name] = e.target.value
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
  if(editando){
    ui.imprimirAlerta('Editado correctamente')
    // Pasar objeto cita a edicion, como es un obj global y se pasa completo, pasamos una copia 
    administrarCitas.editarCita({...citaObj})
    // Regresar el nombre del boton a su estado inicial
    formulario.querySelector('button[type="submit"').textContent = "Crear Cita";
    // Quitar modo edicion
    editando = false

  }else{
    // Generar un ID
    citaObj.id = Date.now()
    // Agregando nuevea cita
    administrarCitas.agregarCita({...citaObj})
    ui.imprimirAlerta('Se agregó correctamente')
  }
  // Reiniciar objeto
  reiniciarObjeto()
  // Reinicio formulario
  formulario.reset()
  // Mostrar el HTML
  ui.imprimirCitas(administrarCitas)
}

function reiniciarObjeto(){
  citaObj.mascota = ''
  citaObj.propietario = ''
  citaObj.telefono = ''
  citaObj.fecha = ''
  citaObj.hora = ''
  citaObj.sintomas = ''
  citaObj.id = ''

}

function eliminarCita(id){
  // Eliminar la cita
  administrarCitas.eliminarCita(id)
  // Muestra un mensaje 
  ui.imprimirAlerta("La cita se elimino correctamente")
  // Refrescar las citas
  ui.imprimirCitas(administrarCitas)
}
// Carga los datos y el modo edicion
function cargarEdicion(cita){
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita
    // llenar lo inputs
    mascotaInput.value = mascota
    propietarioInput.value = propietario
    telefonoInput.value = telefono
    fechaInput.value = fecha
    horaInput.value = hora
    sintomasInput.value = sintomas

    // Llenar el objeto
    citaObj.mascota = mascota
    citaObj.propietario = propietario
    citaObj.telefono = telefono
    citaObj.fecha = fecha
    citaObj.hora = hora
    citaObj.sintomas = sintomas
    citaObj.id = id
    // Cambiar texto boton 
    formulario.querySelector('button[type="submit"').textContent = "Guardar cambios";
    editando = true

}