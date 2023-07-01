import { eliminarCita, cargarEdicion } from "../funciones.js"
import { contenedorCitas } from "../selectores.js"
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

export default UI;