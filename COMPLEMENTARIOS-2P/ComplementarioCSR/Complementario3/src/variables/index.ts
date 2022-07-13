export function variables(){
    const Id = document.querySelector<HTMLInputElement>('#Id')!;
    const IdBus = document.querySelector<HTMLInputElement>('#IdBus')!;
    const IdUsuario = document.querySelector<HTMLInputElement>('#IdUsuario')!;
    const Estado = document.querySelector<HTMLInputElement>('#Estado')!;
    const Nuevo = document.querySelector<HTMLButtonElement>('#Nuevo')!;
const Grabar = document.querySelector<HTMLButtonElement>('#Grabar')!;
const Consultar = document.querySelector<HTMLButtonElement>('#Consultar')!;
const Cuerpo = document.querySelector<HTMLDivElement>('#Cuerpo')!;
    return ({Id,IdBus, IdUsuario, Estado, Nuevo,Grabar,Consultar,Cuerpo})
    }