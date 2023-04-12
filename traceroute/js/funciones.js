let direccion_IP = ''
let saltos = []
let lat = ''
let lon = ''
let lat_array = []
let lon_array = []
let saltos_ttl = []
let estado = true
let saltos_text = document.querySelector('#saltos-text')

//const headeris = {Authorization: Stadia-Auth 0f173ca6_6c5d_437b_9955_46c6d4cef7de}

//Posición inicial del mapa y el zoom
let map = L.map('map').setView([4.639386, -74.082412], 6)

//Mostrar el mapa y la opción de realizar zoom a este
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

//Llevar a cierta posición del mapa 
document.getElementById('select-location').addEventListener('change', function (option) {
    //Limpiar mapa
    map.off()
    map.remove()
    map = L.map('map').setView([4.639386, -74.082412], 6)
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    evaluar_salto(option.target.value)
    // let coords = e.target.value.split(",");
    direccion_a_coordenadas()
})

let evaluar_salto = (option) => {

    switch (option) {
        case '1':
            direccion_IP = '142.250.78.142'
            saltos = ['192.168.1.1', '192.168.0.1', '10.32.0.57', '10.5.1.210',
                '72.14.203.42', '72.14.234.243', '142.250.210.139', '142.250.78.142']
            break
        case '2':
            direccion_IP = '142.250.187.206'
            saltos = ['212.38.169.105', '87.117.210.25', '130.180.202.80', '0',
                '209.85.248.229', '142.251.54.33', '142.250.187.206']
            saltos_ttl = ['1  1  1', '2  3  3', '3  3  3', '*  *  *', '1  2  3', '2  3  2', '2  3  2',]
            break
        case '3':
            break
        case '4':
            break

    }
}

let direccion_a_coordenadas = async () => {
    await obtener_direccion(direccion_IP)
    if (estado == true) {
        let coordenadas = [lat, lon]
        map.flyTo(coordenadas, 6);
        await dibujar_nodos()
    } else {
        alert('Algo fallo')
    }

}

let dibujar_nodos = async () => {
    saltos_text.innerHTML = 'Hop Time Time Time IpAddress \n'
    for (i = 0; i < saltos.length; i++) {
        mostrar_text(i)
        await obtener_direccion(saltos[i])
        console.log(estado)
        if (estado == true) {
            lat_array.push(lat)
            lon_array.push(lon)
            console.log(lat_array, lon_array)
            //Marcador
            L.marker([lat, lon]).addTo(map)
            L.marker([lat, lon]).addTo(map).bindPopup(`Nodo: ${i + 1} - IP: ${saltos[i]}`).openPopup()
            if (i != 0) {
                if (saltos[i - 1] != 0) {
                    //Linea con coordenadas
                    let coord_camino = [
                        [lat_array[i - 1], lon_array[i - 1]],
                        [lat_array[i], lon_array[i]]
                    ]
                    L.polyline(coord_camino, { color: 'white' }).addTo(map);
                }
            }
        } else {
            saltos[i] = 0
            lat_array.push(0)
            lon_array.push(0)
        }
    }
    direccion_IP = ''
    saltos = []
    lat = ''
    lon = ''
    lat_array = []
    lon_array = []
    saltos_ttl = []
    estado = true

}

let mostrar_text = (i) => {
    saltos_text.innerHTML += (i + 1) + '  -  ' + saltos_ttl[i] + '  -  ' + saltos[i] + '\n'
}


//API para localización de direcciones
const obtener_direccion = async (direccion) => {
    try {
        const res = await fetch(`http://ip-api.com/json/${direccion}`)
        const data = await res.json()
        lat = data.lat
        lon = data.lon
        console.log('Valores del API:' + lat + " " + lon)
        if (lat == undefined || lon == undefined) {
            estado = false
        } else {
            estado = true
        }
    } catch (error) {
        console.log(error)
        alert('No entra')
        estado = false;
    }
}

{/* <form id="formularioEvaluar" action="" method="POST">
<input type="text" class="form-control my-2" name="ip">
<button class="btn btn-warning btn-block">Evaluar</button>
</form> */}
function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        alert('No ha seleccionado ningun archivo plano');
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
        mostrarDatos(lector);
        //mostrarContenido(prueba,'contenido-archivo');
    };
    lector.readAsText(archivo);

    //Limpiar mapa
    map.off()
    map.remove()
    map = L.map('map').setView([4.639386, -74.082412], 6)
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);
    // let coords = e.target.value.split(",");
    direccion_a_coordenadas()
}


function mostrarDatos(data) {
    let archivo = data.result.split(/\r?\n|\r/);
    console.log(archivo)
    // var saltos = [];
    let tiempos =[];
    // var organizaciones = [];
    let ips = [];
    let i = -2;

    for (let fila = 0; fila < archivo.length; fila++) {
        let datos = archivo[fila].split(',');
        for (let dato = 0; dato < datos.length; dato++) {
            if (i != 0) {
                // if (dato === 0)
                //     saltos[i - 1] = datos[dato];
                if (dato === 1) {
                    if (datos[dato] != undefined) {
                        tiempos[i - 1] = datos[dato];
                    }

                } else {
                    if (datos[dato] != undefined) {
                        ips[i - 1] = datos[dato];
                    }
                    ips[i - 1] = datos[dato];
                }


                // if (dato === 2)
                //     organizaciones[i - 1] = datos[dato];



            }

        }
        i++;

    }

    // console.log(saltos)
    // console.log(organizaciones)

    saltos_ttl = tiempos
    saltos = ips
    direccion_IP = ips[ips.length - 1]
}

document.getElementById('file-input').addEventListener('change', leerArchivo, false);

