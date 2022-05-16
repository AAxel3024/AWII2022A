const comida=[
    "tigrillo",
    "bolon mixto",
    "pizza",
    "chaulafan",
    "hamburguesa",
    function(){
        return"Bandera";
    }
]

//-------------------------agregar un elemento de forma asosiativa o array asosiativo
comida["x"]="Parrillada";
console.log(comida)


//console.log(comida[5])

//const desayunos = {...comida};
//console.log(desayunos)

//clon
//const desayunos = [...comida];
//desayunos[3]="yougurt"
//console.log(comida)

//--------------------------------------union
//const desayunos = [...comida];
//desayunos[3]="yougurt"
//const unionComidas=[...comida, ...desayunos];
//console.log(unionComidas)

//comida[0]= "yougurt";
//console.log(comida)

//const desayunos=comida;
//desayunos[3]="yougurt"

//console.log(comida)