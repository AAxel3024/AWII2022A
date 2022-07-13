import './style.css'
import axios from 'axios';
import {IResProducto,Producto} from './interfaces/Iproductos'

const httpAxios=axios.create({
  baseURL:`http://localhost:2500/v1/sextoa/api/`
})

const app = document.querySelector<HTMLDivElement>('#app')!

//#region
////codigo para hacer un formulario
const etiqueta =document.createElement("label");
etiqueta.textContent="ID"
const input =document.createElement("input")
input.id="Id"
etiqueta.htmlFor="Id"
//#endregion
app.appendChild(etiqueta)
app.appendChild(input)
app.innerHTML += `
  <br><label for="Nombre">Nombre</label><input id='Nombre'><br>
  <label for="Estado">Estado</label><input id='Estado'><br>
  <label for="Precio">Precio</label><input id='Precio'><br>
  <label for="Costo">Costo</label><input id='Costo'><br>
  <label for="Stock">Stock</label><input id='Stock'><br>
  <label for="Minimo">Minimo</label><input id='Minimo'><br>

  <button id="Nuevo">Nuevo</button><br>
  <button id="Grabar">Grabar</button><br>
  <button id="Consultar">Consultar</button><br>
  <div border=true id="Cuerpo" />
`
//#region
const Id=document.querySelector<HTMLInputElement>('#Id')!;
const Nombre = document.querySelector<HTMLInputElement>('#Nombre')!;
const Precio = document.querySelector<HTMLInputElement>('#Precio')!;
const Costo = document.querySelector<HTMLInputElement>('#Costo')!;
const Stock = document.querySelector<HTMLInputElement>('#Stock')!;
const Minimo = document.querySelector<HTMLInputElement>('#Minimo')!;
const Estado = document.querySelector<HTMLInputElement>('#Estado')!;
const Nuevo = document.querySelector<HTMLButtonElement>('#Nuevo')!;
const Grabar = document.querySelector<HTMLButtonElement>('#Grabar')!;
const Consultar = document.querySelector<HTMLButtonElement>('#Consultar')!;
const Cuerpo =document.querySelector<HTMLDivElement>('#Cuerpo')!;
//#endregion
Nuevo.addEventListener('click',()=>{
  Id.value=""
  Nombre.value=""
  Precio.value=""
  Costo.value=""
  Stock.value=""
  Minimo.value=""
  Estado.value=""
})

Consultar.addEventListener('click',async()=>{
  const resproductos:IResProducto=(await httpAxios.get<IResProducto>('productos')).data
  console.log(resproductos);
  const {productos} =resproductos
  const tabla=document.createElement('table')
  tabla.id="tabla"
  tabla.border="1"
  for (const dato of productos){
    const row=tabla.insertRow();
    const celda=row.insertCell();
    celda.innerHTML = `<button class="boton" value='${dato._id}'>${dato.Nombre}</button>`
    const celda2 = row.insertCell();
    celda2.innerHTML = `${dato.precio}`
  }
  Cuerpo.innerHTML=""
  Cuerpo.appendChild(tabla)
  document.querySelectorAll('.boton').forEach((ele:Element)=>{
    ele.addEventListener('click',async()=>
    {
      try {
        const { data } = await httpAxios.get<Producto>(`productos/${(ele as HTMLButtonElement).value}`)
        Nombre.value=data.Nombre
        Precio.value = data.precio.toString();
        Costo.value = data.costo.toString();
        Minimo.value = data.minimo.toString();
        Stock.value = data.stock.toString();
        Estado.value=data.estado!.toString();
        Id.value=data._id!
      } catch (error) {
        console.log(error);
      }
    })
    
  })
})
const asignarValores=()=>{
  const data:Producto={
    Nombre: Nombre.value,
    precio: Number(Precio.value),
    costo:Number(Costo.value),  
    stock:Number(Stock.value),
    minimo:Number(Minimo.value)
  }
  return data;
}
Grabar.addEventListener('click',async()=>{
  const data=asignarValores();
  if (Id.value.trim().length>0)//se usa para eliminar espacios
  {
    const respproducto:Producto=await(await httpAxios.put<Producto>(`productos/${Id.value}`,data)).data
    console.log(`El producto ${respproducto.Nombre} fue modificado con exito`);
    return;
  }
  try {
    const respproducto: Producto = await (await httpAxios.post<Producto>(`productos`, data)).data
    console.log(`El producto ${respproducto.Nombre} fue insertado con exito`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error en axios");
    }
    console.log(error);
  }
})
