let total = document.getElementById('total');
let muestra = document.getElementById('muestra');
let hombresM = document.getElementById('hombresM');
let hombresT = document.getElementById('hombresT');
let mujeresM = muestra - hombresM;
var totalGr = 1;
var hombresGr =1;
var mujeresGr = 1;
var combinacion = 0;
var probabilidad = 0;

function calculate(){
    for(var i = total; i > 0; i = i-1){
        totalGr = totalGr * i;
    }

    for(i = hombresT; i > 0; i = i-1){
        hombresGr = hombresGr * i;
    }

    for(i = total - hombresT; i > 0; i = i-1){
        mujeresGr = mujeresGr * i;
    }

    combinacion = hombresGr * mujeresGr;
    probabilidad = (combinacion/totalGr)*100;
}

function getTemplate(){
    const template = document.createElement("template");
        template.innerHTML = `
            <div id="info">
                <h1 id="Line1">A) La cantidad de grupos de ${muestra} es de ${totalGr}</h1>
                <h1 id="Line1">B) La cantidad de grupos de ${hombresM} hombres y de ${mujeresM} mujeres por muestra es de ${combinacion}</h1>
                <h1 id="Line1">B) La probabilidad de una muestra con ${hombresM} hombres y ${mujeresM} es de ${probabilidad}</h1>
            </div>
        `;
        return template;
}


function show(){
    calculate();
    getTemplate();
    document.appendChild(getTemplate());
}