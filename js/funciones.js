import Citas from "./clases/Citas.js"
import UI from "./clases/UI.js"
import { mascotaInput,
         propietarioInput, 
         telefonoInput, 
         fechaInput, 
         horaInput, 
         sintomasInput, 
         formulario } from "./selectores.js"


const administrarCitas = new Citas()
const ui = new UI(administrarCitas); //new UI(administrarCitas)
let editando;

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
export function datosCita(e){
  citaObj[e.target.name] = e.target.value
}

// Valida y agrega una nueva cita a la clase de citas 
export function nuevaCita(e){
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

export function reiniciarObjeto(){
  citaObj.mascota = ''
  citaObj.propietario = ''
  citaObj.telefono = ''
  citaObj.fecha = ''
  citaObj.hora = ''
  citaObj.sintomas = ''
  citaObj.id = ''

}

export function eliminarCita(id){
  // Eliminar la cita
  administrarCitas.eliminarCita(id)
  // Muestra un mensaje 
  ui.imprimirAlerta("La cita se elimino correctamente")
  // Refrescar las citas
  ui.imprimirCitas(administrarCitas)
}
// Carga los datos y el modo edicion
export function cargarEdicion(cita){
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