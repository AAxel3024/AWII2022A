const comida = 
[
    {
        nombre: "Lasaña de Carne",
        ingredientes: "1 Cucharada Mantequilla Con Sal, 2 Unidades Ajo Machacado, 1 Paquete Pasta para lasaña, Carne molida",
        tipo: "Plato Fuerte"
    },
    {
        nombre: "Michelada",
        ingredientes: "2 cerveza bien fría, 1/2 taza de jugo de limón, 1 cucharada de chamoy en polvo, 1 taza de hielo",
        tipo: "Bebida"
    },
    {
        nombre: "Cuba Libre",
        ingredientes: "50ml Ron, 100 ml de refresco de Coca-Cola, Limón fresco (solo unas gotas), Suficiente hielo (cubitos)para llenar un vaso largo",
        tipo: "Bebida"
    }
]
let Mayus = (comida) =>{
    for (let m = 0; m < comida.length; m++) {
        comida[m].nombre = comida[m].nombre.toUpperCase();
        comida[m].ingredientes = comida[m].ingredientes.toUpperCase();
        comida[m].tipo = comida[m].tipo.toUpperCase();
    }
    return comida
}

let listaFood = Mayus (comida);
console.log ("###################################################")
console.log ("#                      MENÚ                       #") 
for (let a = 0; a < listaFood.length; a++) {
    console.log ("###################################################")
    console.log ("\n###################################################")
    console.info ("nombre: "+listaFood[a].nombre)
    console.info ("ingredientes: "+listaFood[a].ingredientes)
    console.info ("tipo: "+listaFood[a].tipo)
}         
console.log ("###################################################")              