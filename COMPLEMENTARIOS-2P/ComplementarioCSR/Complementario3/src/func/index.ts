import { httpAxios } from "../axios"; 
import axios from "axios";
import {IResRegistroviajes, Registroviajes} from "../interfaces/iregistroviajes";

export function nuevo (Id: HTMLInputElement, IdBus: HTMLInputElement, IdUsuario: HTMLInputElement, Estado: HTMLInputElement){
    Id.value= ""
    IdBus.value = ""
    IdUsuario.value = ""
    Estado.value = ""
}

export async function consultar (Id: HTMLInputElement, IdBus: HTMLInputElement, IdUsuario: HTMLInputElement, Estado: HTMLInputElement, Cuerpo: HTMLDivElement){
    const ResRegistroviajes: IResRegistroviajes = (await httpAxios.get<IResRegistroviajes>('registroviajes')).data
    const { datos } = ResRegistroviajes
    const tabla = document.createElement('table')
    tabla.id = "tabla"
    tabla.border = "1"
    for (const dato of datos) {
        const row = tabla.insertRow();
        const celda = row.insertCell();
        celda.innerHTML = `<button class="boton" value='${dato._id}'>${dato.IdBus.Placa}</button>`
        const celda2 = row.insertCell();
        celda2.innerHTML = `${dato.IdUsuario.Nombres}`
    }
    Cuerpo.innerHTML = ""
    Cuerpo.appendChild(tabla)
    document.querySelectorAll('.boton').forEach((ele: Element) => {
        ele.addEventListener('click', async () => {
            try {
                const { data } = await httpAxios.get<Registroviajes>(`registroviajes/${(ele as HTMLButtonElement).value}`)
                IdBus.value = String (data.IdBus._id)
                IdUsuario.value = String (data.IdUsuario._id)
                Estado.value = data.Estado!.toString()
                Id.value = data._id!
            } catch (error) {
                console.log(error);
            }
        })
    })
}

function asignarValores(IdBus: HTMLInputElement, IdUsuario: HTMLInputElement){
    const data = {
        IdBus: IdBus.value,
        IdUsuario: IdUsuario.value,
    }
    return data;
}
export async function grabar (Id: HTMLInputElement, IdBus: HTMLInputElement, IdUsuario: HTMLInputElement, Estado: HTMLInputElement, Cuerpo: HTMLDivElement){
    const data = asignarValores(IdBus,IdUsuario);
    console.log (data);
    if (Id.value.trim().length > 0)//se usa para eliminar espacios
    {
        const ResRegistroviajes: Registroviajes = await (await httpAxios.put<Registroviajes>(`registroviajes/${Id.value}`, data)).data
        alert(`El producto ${ResRegistroviajes._id} fue modificado con exito`);
        consultar (Id,IdBus,IdUsuario, Estado, Cuerpo);
        nuevo (Id,IdBus,IdUsuario, Estado);
        return;
    }
    try {
        const ResRegistroviajes: Registroviajes = await (await httpAxios.post<Registroviajes>(`registroviajes`, data)).data
        alert(`El producto ${ResRegistroviajes._id} fue insertado con exito`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error en axios");
        }
        console.log(error);
    }
}