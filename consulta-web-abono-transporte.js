var casper = require('casper').create();
var moment = require('moment');

var numero_abono="";
var dias_para_avisar;

var fecha_recarga;
var fecha_caducidad;

/************************************
*                                   *
* Procesar argumentos               *
*                                   *
************************************/

numero_abono = casper.cli.get("numero_abono").toString();
dias_para_avisar = casper.cli.get("dias_para_avisar");

//console.log(numero_abono);
//console.log(dias_para_avisar);

/************************************
*                                   *
* Invocar web abono                 *
*                                   *
************************************/

casper.start('https://www.tarjetatransportepublico.es/CRTM-ABONOS/consultaSaldo.aspx');

// Selecciono el valor correspondiente a '251' del combo
casper.then(function(){
    this.evaluate(function() {
        $("#ctl00_cntPh_dpdCodigoTTP > option:nth-child(6)").attr('selected','true');
    });
});

/**
Relleno el input con el código del abono. No se puede procesar
dinámicamente por limitaciones de Casper, así que tiene que ser
sustituído a fuego desde fuera (utilizando SED) antes de llamar
a este script.
*/
casper.then(function(){
    this.evaluate(function() {
        $("#ctl00_cntPh_txtNumTTP").val("XXXXXXXXXX");
    });
});

// Pincho en el botón "continuar"
casper.then(function(){
  this.click('#ctl00_cntPh_btnConsultar');
});

/** En la siguiente página, guardo el resultado de ambas fechas en
variables globales
*/
casper.then(function(){
  fecha_caducidad = this.fetchText('#ctl00_cntPh_tableResultados > table > tbody > tr:nth-child(2) > td > span:nth-child(11)'); 
  fecha_recarga = this.fetchText('#ctl00_cntPh_tableResultados > table > tbody > tr:nth-child(2) > td > span:nth-child(19)'); 
  /**
  Eliminamos la cadena "Fecha de caducidad: " para dejar solo
  las fechas en formato DD-MM-YYYY
  */
  fecha_caducidad = fecha_caducidad.substring(20,100);
  fecha_recarga = fecha_recarga.substring(20,100);
});

casper.run(function(){
  //console.log("Fecha de caducidad: " + fecha_caducidad);
  //console.log("Fecha de recarga: " + fecha_recarga);

  if ((fecha_recarga != null)||(fecha_recarga != undefined)){

    var fecha_recarga_moment = moment(fecha_recarga, 'DD-MM-YYYY');
    var fecha_actual = moment();
    var dias_diferencia = fecha_recarga_moment.diff(fecha_actual, 'days');

    console.log(dias_diferencia);
    process.exit()
  }
});

