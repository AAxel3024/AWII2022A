class persona{
    constructor(nombre, apellido)
    {
        this.nombre = nombre;
        this.paellido = apellido;
    }
    getNombreCompleto()
    {
        return '${this.nombre} ${this.apellido}'
    }
}
const persona= new persona("Bart", "Simpson");

console.log(persona.getNombreComleto());