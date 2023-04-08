const { PDFDocument, rgb } = PDFLib

// Recuperamos información del alumnado desde archivo CSV
const alumnado = document.getElementById('alumnado')
const alumno = document.getElementById('alumno')
const semana = document.getElementById('semana')
const actividadesLunes = document.getElementById('actividadesLunes')
const actividadesMartes = document.getElementById('actividadesMartes')
const actividadesMiercoles = document.getElementById('actividadesMiercoles')
const actividadesJueves = document.getElementById('actividadesJueves')
const actividadesViernes = document.getElementById('actividadesViernes')
let horasLunes = document.getElementById('horasLunes')
let verHorasLunes = document.getElementById('verHorasLunes')
let observacionesLunes = document.getElementById('observacionesLunes')
let horasMartes = document.getElementById('horasMartes')
let verHorasMartes = document.getElementById('verHorasMartes')
let observacionesMartes = document.getElementById('observacionesMartes')
let horasMiercoles = document.getElementById('horasMiercoles')
let verHorasMiercoles = document.getElementById('verHorasMiercoles')
let observacionesMiercoles = document.getElementById('observacionesMiercoles')
let horasJueves = document.getElementById('horasJueves')
let verHorasJueves = document.getElementById('verHorasJueves')
let observacionesJueves = document.getElementById('observacionesJueves')
let horasViernes = document.getElementById('horasViernes')
let verHorasViernes = document.getElementById('verHorasViernes')
let observacionesViernes = document.getElementById('observacionesViernes')

let datosAlumnado = [];  // Aquí se guardan los datos de todo el alumnado
let datosActividades = [];
let datosAlumno = {}

const mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octobre", "Noviembre", "Diciembre"
];

verHorasLunes.innerHTML = ""
verHorasMartes.innerHTML = ""
verHorasMiercoles.innerHTML = ""
verHorasJueves.innerHTML = ""
verHorasViernes.innerHTML = ""

// DATOS DEL ALUMNADO
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


// ACTIVIDADES Y PUESTOS
Papa.parse("./assets/actividades.csv", {
    header: true,
    download: true,
    complete: function (results) {
        datosActividades = results.data
        datosActividades
            .map(x => x.ACTIVIDAD).forEach(actividad => {
                const optionLunes = document.createElement('option');
                optionLunes.value = actividad; optionLunes.text = actividad;
                actividadesLunes.add(optionLunes, null);
                const optionMartes = document.createElement('option');
                optionMartes.value = actividad; optionMartes.text = actividad;
                actividadesMartes.add(optionMartes, null);
                const optionMiercoles = document.createElement('option');
                optionMiercoles.value = actividad; optionMiercoles.text = actividad;
                actividadesMiercoles.add(optionMiercoles, null);
                const optionJueves = document.createElement('option');
                optionJueves.value = actividad; optionJueves.text = actividad;
                actividadesJueves.add(optionJueves, null);
                const optionViernes = document.createElement('option');
                optionViernes.value = actividad; optionViernes.text = actividad;
                actividadesViernes.add(optionViernes, null);
            })
    }
});

// ACTUALIZACIÓN DE LISTA DE ACTIVIDADES SEGÚN CICLO DEL ALUMNO SELECCIONADO
alumnado.addEventListener('change', (event) => {
    [datosAlumno] = datosAlumnado.filter(x => x.ALUMNO == alumnado.value)
    actividadesLunes.replaceChildren();
    actividadesMartes.replaceChildren();
    actividadesMiercoles.replaceChildren();
    actividadesJueves.replaceChildren();
    actividadesViernes.replaceChildren();
    datosActividades
        .filter(x => x.CICLO === datosAlumno.CICLO)
        .map(x => x.ACTIVIDAD).forEach(actividad => {
            const optionLunes = document.createElement('option');
            optionLunes.value = actividad; optionLunes.text = actividad;
            actividadesLunes.add(optionLunes, null);
            const optionMartes = document.createElement('option');
            optionMartes.value = actividad; optionMartes.text = actividad;
            actividadesMartes.add(optionMartes, null);
            const optionMiercoles = document.createElement('option');
            optionMiercoles.value = actividad; optionMiercoles.text = actividad;
            actividadesMiercoles.add(optionMiercoles, null);
            const optionJueves = document.createElement('option');
            optionJueves.value = actividad; optionJueves.text = actividad;
            actividadesJueves.add(optionJueves, null);
            const optionViernes = document.createElement('option');
            optionViernes.value = actividad; optionViernes.text = actividad;
            actividadesViernes.add(optionViernes, null);
        })
})

horasLunes.addEventListener('input', (event) => {
    verHorasLunes.innerHTML = horasLunes.valueAsNumber == 0
        ? ""
        : Math.floor(horasLunes.value / 60) + 'h ' + horasLunes.value % 60 + 'min';
})

horasMartes.addEventListener('input', (event) => {
    verHorasMartes.innerHTML = horasMartes.valueAsNumber == 0
        ? ""
        : Math.floor(horasMartes.value / 60) + 'h ' + horasMartes.value % 60 + 'min';
})

horasMiercoles.addEventListener('input', (event) => {
    verHorasMiercoles.innerHTML = horasMiercoles.valueAsNumber == 0
        ? ""
        : Math.floor(horasMiercoles.value / 60) + 'h ' + horasMiercoles.value % 60 + 'min';
})

horasJueves.addEventListener('input', (event) => {
    verHorasJueves.innerHTML = horasJueves.valueAsNumber == 0
        ? ""
        : Math.floor(horasJueves.value / 60) + 'h ' + horasJueves.value % 60 + 'min';
})

horasViernes.addEventListener('input', (event) => {
    verHorasViernes.innerHTML = horasViernes.valueAsNumber == 0
        ? ""
        : Math.floor(horasViernes.value / 60) + 'h ' + horasViernes.value % 60 + 'min';
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
        fetch('assets/OpenSans_Condensed-Medium.ttf').then((res) => res.arrayBuffer()),
    ]);

    const pdfDoc = await PDFDocument.load(Ficha);
    pdfDoc.registerFontkit(fontkit)
    const openSansFont = await pdfDoc.embedFont(Letra)

    const page = pdfDoc.getPage(0)
    // const { width, height } = page.getSize()
    page.setFont(openSansFont)


    const form = pdfDoc.getForm();
    // const fields = form.getFields()
    // fields.forEach(field => {
    //     const type = field.constructor.name
    //     const name = field.getName()
    //     console.log(`${type}: ${name}`)
    // })

    let numAnno = semana.value.slice(0, 4)
    let numSemana = semana.value.slice(6)
    let numFicha = numSemana - 10 // La ficha 1 corresponde a la semana 11 en el año 2023

    let inicio = getDateOfISOWeek(numSemana, numAnno)
    let final = new Date(inicio)
    final.setDate(inicio.getDate() + 6)

    let Mes = inicio.getMonth() != final.getMonth()
        ? [mes[inicio.getMonth()], '/', mes[final.getMonth()]].join(' ')
        : mes[inicio.getMonth()]

    form.getTextField('ficha').setText(numFicha.toString());
    form.getTextField('inicioSemana').setText(inicio.getDate().toString());
    form.getTextField('finalSemana').setText(final.getDate().toString());
    form.getTextField('mes').setText(Mes);
    form.getTextField('year').setText(numAnno.toString());


    form.getTextField('centroDocente').setText('IES Luis Vélez de Guevara');
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
        default:
    }

    form.getTextField('ciclo').setText(ciclo);
    form.getTextField('grado').setText(grado);

    form.getTextField('lunes').setText(actividadesLunes.value);
    form.getTextField('tiempoLunes').setText(verHorasLunes.innerHTML);
    form.getTextField('observacionesLunes').setText(observacionesLunes.value);

    form.getTextField('martes').setText(actividadesMartes.value);
    form.getTextField('tiempoMartes').setText(verHorasMartes.innerHTML);
    form.getTextField('observacionesMartes').setText(observacionesMartes.value);

    form.getTextField('miercoles').setText(actividadesMiercoles.value);
    form.getTextField('tiempoMiercoles').setText(verHorasMiercoles.innerHTML);
    form.getTextField('observacionesMiercoles').setText(observacionesMiercoles.value);

    form.getTextField('jueves').setText(actividadesJueves.value);
    form.getTextField('tiempoJueves').setText(verHorasJueves.innerHTML);
    form.getTextField('observacionesJueves').setText(observacionesJueves.value);

    form.getTextField('viernes').setText(actividadesViernes.value);
    form.getTextField('tiempoViernes').setText(verHorasViernes.innerHTML);
    form.getTextField('observacionesViernes').setText(observacionesViernes.value);

    // form.getTextField('lunes')
    //     .setText(
    //         [
    //             `Instalar, configurar y administrar el software de base y de aplicación del sistema / Técnico en teleasistencia.`,
    //             `Realizar operaciones auxiliares en el mantenimiento de equipos eléctricos y electrónicos / Auxiliar de mantenimiento de equipos eléctricos`,
    //             `Realizar operaciones auxiliares en el mantenimiento de equipos eléctricos y electrónicos / Probador/ajustador de placas y equipos eléctricos`,
    //         ].join('\n'),
    //     );

    form.updateFieldAppearances(openSansFont)
    const pdfBytes = await pdfDoc.save()

    const nombreArchivoPDF = alumnado.value.replace(/\s/g, '') + "-Semana-" + numFicha;
    download(pdfBytes, nombreArchivoPDF, "application/pdf");
}