import './style.css'
import { cuerpo } from './html'
import { variables } from './variables'
import { nuevo, consultar, grabar } from './func'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = cuerpo

const ejemplo=variables();
const [Id,IdBus,IdUsuario, Estado, Nuevo,Grabar,Consultar,Cuerpo] = 
[ejemplo.Id, ejemplo.IdBus, ejemplo.IdUsuario,ejemplo.Estado,ejemplo.Nuevo,ejemplo.Grabar,ejemplo.Consultar,ejemplo.Cuerpo]
  
Nuevo.addEventListener('click', () => {
  nuevo (Id,IdBus,IdUsuario, Estado)
})
Grabar.addEventListener('click', () => {
  grabar (Id,IdBus,IdUsuario, Estado, Cuerpo)
})
Consultar.addEventListener('click', () => {
  consultar (Id,IdBus,IdUsuario, Estado, Cuerpo)
})