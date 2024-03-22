const { PDFDocument, rgb } = PDFLib


const alumnado = document.getElementById('alumnado')
const alumno = document.getElementById('alumno')
const semana = document.getElementById('semana')

const actividadesLunes1 = document.getElementById('actividadesLunes1')
const actividadesMartes1 = document.getElementById('actividadesMartes1')
const actividadesMiercoles1 = document.getElementById('actividadesMiercoles1')
const actividadesJueves1 = document.getElementById('actividadesJueves1')
const actividadesViernes1 = document.getElementById('actividadesViernes1')

const actividadesLunes2 = document.getElementById('actividadesLunes2')
const actividadesMartes2 = document.getElementById('actividadesMartes2')
const actividadesMiercoles2 = document.getElementById('actividadesMiercoles2')
const actividadesJueves2 = document.getElementById('actividadesJueves2')
const actividadesViernes2 = document.getElementById('actividadesViernes2')

let horasLunes1 = document.getElementById('horasLunes1')
let horasMartes1 = document.getElementById('horasMartes1')
let horasMiercoles1 = document.getElementById('horasMiercoles1')
let horasJueves1 = document.getElementById('horasJueves1')
let horasViernes1 = document.getElementById('horasViernes1')

let horasLunes2 = document.getElementById('horasLunes2')
let horasMartes2 = document.getElementById('horasMartes2')
let horasMiercoles2 = document.getElementById('horasMiercoles2')
let horasJueves2 = document.getElementById('horasJueves2')
let horasViernes2 = document.getElementById('horasViernes2')

let verHorasLunes1 = document.getElementById('verHorasLunes1')
let verHorasMartes1 = document.getElementById('verHorasMartes1')
let verHorasMiercoles1 = document.getElementById('verHorasMiercoles1')
let verHorasJueves1 = document.getElementById('verHorasJueves1')
let verHorasViernes1 = document.getElementById('verHorasViernes1')

let verHorasLunes2 = document.getElementById('verHorasLunes2')
let verHorasMartes2 = document.getElementById('verHorasMartes2')
let verHorasMiercoles2 = document.getElementById('verHorasMiercoles2')
let verHorasJueves2 = document.getElementById('verHorasJueves2')
let verHorasViernes2 = document.getElementById('verHorasViernes2')

let observacionesLunes1 = document.getElementById('observacionesLunes1')
let observacionesMartes1 = document.getElementById('observacionesMartes1')
let observacionesMiercoles1 = document.getElementById('observacionesMiercoles1')
let observacionesJueves1 = document.getElementById('observacionesJueves1')
let observacionesViernes1 = document.getElementById('observacionesViernes1')

let observacionesLunes2 = document.getElementById('observacionesLunes2')
let observacionesMartes2 = document.getElementById('observacionesMartes2')
let observacionesMiercoles2 = document.getElementById('observacionesMiercoles2')
let observacionesJueves2 = document.getElementById('observacionesJueves2')
let observacionesViernes2 = document.getElementById('observacionesViernes2')

verHorasLunes1.innerHTML = ""
verHorasMartes1.innerHTML = ""
verHorasMiercoles1.innerHTML = ""
verHorasJueves1.innerHTML = ""
verHorasViernes1.innerHTML = ""

verHorasLunes2.innerHTML = ""
verHorasMartes2.innerHTML = ""
verHorasMiercoles2.innerHTML = ""
verHorasJueves2.innerHTML = ""
verHorasViernes2.innerHTML = ""

let datosAlumnado = [];  // Aquí se guardan los datos de todo el alumnado
let datosActividades = [];
let datosAlumno = {}

const mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octobre", "Noviembre", "Diciembre"
];

function generarOpcion (actividad) {
    const option = document.createElement('option');
    option.value = actividad; option.text = actividad;
    return option;
}


// RECUPERAMOS INFORMACIÓN DE ARCHIVOS CSV
// Datos del alumnado
Papa.parse("./assets/alumnado.csv", {
    header: true,
    download: true,
    complete: function (results) {
        datosAlumnado = results.data   // Guardamos datos de todo el alumnado
        datosAlumnado.map(x => x.ALUMNO).forEach(alumno => {
            const option = document.createElement('option');
            option.value = alumno;
            option.text = alumno;
            alumnado.appendChild(option);
        })
    }
});


// Datos de las actividades
Papa.parse("./assets/actividades.csv", {
    header: true,
    download: true,
    complete: function (results) {
        datosActividades = results.data
        datosActividades
            .map(x => x.ACTIVIDAD).forEach(actividad => {
                actividadesLunes1.add(generarOpcion(actividad), null);
                actividadesMartes1.add(generarOpcion(actividad), null);
                actividadesMiercoles1.add(generarOpcion(actividad), null);
                actividadesJueves1.add(generarOpcion(actividad), null);
                actividadesViernes1.add(generarOpcion(actividad), null);
                actividadesLunes2.add(generarOpcion(actividad), null);
                actividadesMartes2.add(generarOpcion(actividad), null);
                actividadesMiercoles2.add(generarOpcion(actividad), null);
                actividadesJueves2.add(generarOpcion(actividad), null);
                actividadesViernes2.add(generarOpcion(actividad), null);
                // const optionLunes = document.createElement('option');
                // optionLunes.value = actividad; optionLunes.text = actividad;
                // actividadesLunes1.add(optionLunes, null);
                // const optionMartes = document.createElement('option');
                // optionMartes.value = actividad; optionMartes.text = actividad;
                // actividadesMartes1.add(optionMartes, null);
                // const optionMiercoles = document.createElement('option');
                // optionMiercoles.value = actividad; optionMiercoles.text = actividad;
                // actividadesMiercoles1.add(optionMiercoles, null);
                // const optionJueves = document.createElement('option');
                // optionJueves.value = actividad; optionJueves.text = actividad;
                // actividadesJueves1.add(optionJueves, null);
                // const optionViernes = document.createElement('option');
                // optionViernes.value = actividad; optionViernes.text = actividad;
                // actividadesViernes1.add(optionViernes, null);
            })
    }
});


// ACTUALIZACIÓN DE LISTA DE ACTIVIDADES SEGÚN CICLO DEL ALUMNO SELECCIONADO
alumnado.addEventListener('change', (event) => {
    [datosAlumno] = datosAlumnado.filter(x => x.ALUMNO == alumnado.value)
    actividadesLunes1.replaceChildren();
    actividadesMartes1.replaceChildren();
    actividadesMiercoles1.replaceChildren();
    actividadesJueves1.replaceChildren();
    actividadesViernes1.replaceChildren();
    actividadesLunes2.replaceChildren();
    actividadesMartes2.replaceChildren();
    actividadesMiercoles2.replaceChildren();
    actividadesJueves2.replaceChildren();
    actividadesViernes2.replaceChildren();
    datosActividades
        .filter(x => x.CICLO === datosAlumno.CICLO)
        .map(x => x.ACTIVIDAD).forEach(actividad => {
            actividadesLunes1.add(generarOpcion(actividad), null);
            actividadesMartes1.add(generarOpcion(actividad), null);
            actividadesMiercoles1.add(generarOpcion(actividad), null);
            actividadesJueves1.add(generarOpcion(actividad), null);
            actividadesViernes1.add(generarOpcion(actividad), null);
            actividadesLunes2.add(generarOpcion(actividad), null);
            actividadesMartes2.add(generarOpcion(actividad), null);
            actividadesMiercoles2.add(generarOpcion(actividad), null);
            actividadesJueves2.add(generarOpcion(actividad), null);
            actividadesViernes2.add(generarOpcion(actividad), null);
            // const optionLunes = document.createElement('option');
            // optionLunes.value = actividad; optionLunes.text = actividad;
            // actividadesLunes1.add(optionLunes, null);
            // const optionMartes = document.createElement('option');
            // optionMartes.value = actividad; optionMartes.text = actividad;
            // actividadesMartes1.add(optionMartes, null);
            // const optionMiercoles = document.createElement('option');
            // optionMiercoles.value = actividad; optionMiercoles.text = actividad;
            // actividadesMiercoles1.add(optionMiercoles, null);
            // const optionJueves = document.createElement('option');
            // optionJueves.value = actividad; optionJueves.text = actividad;
            // actividadesJueves1.add(optionJueves, null);
            // const optionViernes = document.createElement('option');
            // optionViernes.value = actividad; optionViernes.text = actividad;
            // actividadesViernes1.add(optionViernes, null);
        })
})

horasLunes1.addEventListener('input', (event) => {
    verHorasLunes1.innerHTML = horasLunes1.valueAsNumber == 0
        ? ""
        : Math.floor(horasLunes1.value / 60) + 'h ' + horasLunes1.value % 60 + 'min';
})

horasMartes1.addEventListener('input', (event) => {
    verHorasMartes1.innerHTML = horasMartes1.valueAsNumber == 0
        ? ""
        : Math.floor(horasMartes1.value / 60) + 'h ' + horasMartes1.value % 60 + 'min';
})

horasMiercoles1.addEventListener('input', (event) => {
    verHorasMiercoles1.innerHTML = horasMiercoles1.valueAsNumber == 0
        ? ""
        : Math.floor(horasMiercoles1.value / 60) + 'h ' + horasMiercoles1.value % 60 + 'min';
})

horasJueves1.addEventListener('input', (event) => {
    verHorasJueves1.innerHTML = horasJueves1.valueAsNumber == 0
        ? ""
        : Math.floor(horasJueves1.value / 60) + 'h ' + horasJueves1.value % 60 + 'min';
})

horasViernes1.addEventListener('input', (event) => {
    verHorasViernes1.innerHTML = horasViernes1.valueAsNumber == 0
        ? ""
        : Math.floor(horasViernes1.value / 60) + 'h ' + horasViernes1.value % 60 + 'min';
})


horasLunes2.addEventListener('input', (event) => {
    verHorasLunes2.innerHTML = horasLunes2.valueAsNumber == 0
        ? ""
        : Math.floor(horasLunes2.value / 60) + 'h ' + horasLunes2.value % 60 + 'min';
})

horasMartes2.addEventListener('input', (event) => {
    verHorasMartes2.innerHTML = horasMartes2.valueAsNumber == 0
        ? ""
        : Math.floor(horasMartes2.value / 60) + 'h ' + horasMartes2.value % 60 + 'min';
})

horasMiercoles2.addEventListener('input', (event) => {
    verHorasMiercoles2.innerHTML = horasMiercoles2.valueAsNumber == 0
        ? ""
        : Math.floor(horasMiercoles2.value / 60) + 'h ' + horasMiercoles2.value % 60 + 'min';
})

horasJueves2.addEventListener('input', (event) => {
    verHorasJueves2.innerHTML = horasJueves2.valueAsNumber == 0
        ? ""
        : Math.floor(horasJueves2.value / 60) + 'h ' + horasJueves2.value % 60 + 'min';
})

horasViernes2.addEventListener('input', (event) => {
    verHorasViernes2.innerHTML = horasViernes2.valueAsNumber == 0
        ? ""
        : Math.floor(horasViernes2.value / 60) + 'h ' + horasViernes2.value % 60 + 'min';
})


// https://stackoverflow.com/questions/16590500/calculate-date-from-week-number-in-javascript
function getDateOfISOWeek(w, y) {
    let simple = new Date(Date.UTC(y, 0, 1 + (w - 1) * 7));
    let dow = simple.getDay();
    let ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}


async function createPDF() {
    const [Ficha, Letra] = await Promise.all([
        fetch('assets/Ficha.pdf').then((res) => res.arrayBuffer()),
        fetch('assets/Neucha-Regular.ttf').then((res) => res.arrayBuffer()),
        // fetch('assets/OpenSans_Condensed-Medium.ttf').then((res) => res.arrayBuffer()),
    ]);

    const pdfDoc = await PDFDocument.load(Ficha);
    pdfDoc.registerFontkit(fontkit)
    const tipoLetra = await pdfDoc.embedFont(Letra)

    const page = pdfDoc.getPage(0)
    page.setFont(tipoLetra)

    let numAnno = semana.value.slice(0, 4)
    let numSemana = semana.value.slice(6)

    // TODO: A mejorar el siguiente código !!
    // La ficha 1 corresponde a la semana 14 en el año 2024 para todos los ciclos
    // salvo FPB que corresponde con la semana 16
    let numFicha = datosAlumno.CICLO != 'FPB' ? numSemana - 13 : numSemana - 16;

    let inicio = getDateOfISOWeek(numSemana, numAnno)
    let final = new Date(inicio)
    final.setDate(inicio.getDate() + 6)

    let Mes = inicio.getMonth() != final.getMonth()
        ? [mes[inicio.getMonth()], '/', mes[final.getMonth()]].join(' ')
        : mes[inicio.getMonth()]

    const form = pdfDoc.getForm();

    form.getTextField('ficha').setText(numFicha.toString());
    form.getTextField('inicioSemana').setText(inicio.getDate().toString());
    form.getTextField('finalSemana').setText(final.getDate().toString());
    form.getTextField('mes').setText(Mes);
    form.getTextField('year').setText(numAnno.toString());


    form.getTextField('centroDocente').setText('IES Inca Garcilaso');
    form.getTextField('centroLaboral').setText(datosAlumno.CENTROLABORAL);

    form.getTextField('alumno').setText(datosAlumno.ALUMNO);
    form.getTextField('alumnoFdo').setText(datosAlumno.ALUMNO);

    form.getTextField('tutorDocente').setText(datosAlumno.TUTORDOCENTE);
    form.getTextField('tutorDocenteFdo').setText(datosAlumno.TUTORDOCENTE);

    form.getTextField('tutorLaboral').setText(datosAlumno.TUTORLABORAL);
    form.getTextField('tutorLaboralFdo').setText(datosAlumno.TUTORLABORAL);


    let ciclo = '';
    let grado = '';

    switch (datosAlumno.CICLO) {
        case 'FPB':
            ciclo = 'Informática y comunicaciones';
            grado = 'Básico'; break;
        case 'APSD':
            ciclo = 'Atención a personas en situación de dependencia';
            grado = 'Medio'; break;
        case 'SMR':
            ciclo = 'Sistemas microinformáticos y redes'
            grado = 'Medio'; break;
        case 'GA':
            ciclo = 'Gestión administrativa';
            grado = 'Medio'; break;
        case 'AF':
            ciclo = 'Administración y finanzas';
            grado = 'Superior'; break;
        case 'ASIR':
            ciclo = 'Administración de sistemas informáticos en red';
            grado = 'Superior'; break;
        case 'DAW':
            ciclo = 'Desarrollo de aplicaciones web';
            grado = 'Superior'; break;
        case 'DAM':
            ciclo = 'Desarrollo de aplicaciones multiplataforma';
            grado = 'Superior'; break;         
        default:
    }

    form.getTextField('ciclo').setText(ciclo);
    form.getTextField('grado').setText(grado);

    form.getTextField('lunes').setText(actividadesLunes1.value + '\n' + actividadesLunes2.value);
    form.getTextField('tiempoLunes').setText(verHorasLunes1.innerHTML + '\n' + verHorasLunes2.innerHTML);
    form.getTextField('observacionesLunes').setText(observacionesLunes1.value + '\n' + observacionesLunes2.value) ;

    form.getTextField('martes').setText(actividadesMartes1.value + '\n' + actividadesMartes2.value);
    form.getTextField('tiempoMartes').setText(verHorasMartes1.innerHTML + '\n' + verHorasMartes2.innerHTML);
    form.getTextField('observacionesMartes').setText(observacionesMartes1.value + '\n' + observacionesMartes2.value );

    form.getTextField('miercoles').setText(actividadesMiercoles1.value + '\n' + actividadesMiercoles2.value);
    form.getTextField('tiempoMiercoles').setText(verHorasMiercoles1.innerHTML + '\n' + verHorasMiercoles2.innerHTML);
    form.getTextField('observacionesMiercoles').setText(observacionesMiercoles1.value + '\n' + observacionesMiercoles2.value);

    form.getTextField('jueves').setText(actividadesJueves1.value + '\n' + actividadesJueves2.value);
    form.getTextField('tiempoJueves').setText(verHorasJueves1.innerHTML + '\n' + verHorasJueves2.innerHTML);
    form.getTextField('observacionesJueves').setText(observacionesJueves1.value + '\n' + observacionesJueves2.value);

    form.getTextField('viernes').setText(actividadesViernes1.value + '\n' + actividadesViernes2.value);
    form.getTextField('tiempoViernes').setText(verHorasViernes1.innerHTML + '\n' + verHorasViernes2.innerHTML);
    form.getTextField('observacionesViernes').setText(observacionesViernes1.value + '\n' + observacionesViernes2.value);

    // GUARDAMOS CAMBIOS Y DESCARGAMOS
    form.updateFieldAppearances(tipoLetra)
    const pdfBytes = await pdfDoc.save()

    const nombreArchivoPDF = alumnado.value.replace(/\s/g, '') + "-Semana-" + numFicha;
    download(pdfBytes, nombreArchivoPDF, "application/pdf");
    
}
