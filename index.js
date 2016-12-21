var casper = require('casper').create();
require('dotenv').config({silent: true});

var fecha_recarga;
var fecha_caducidad;

casper.start('https://www.tarjetatransportepublico.es/CRTM-ABONOS/consultaSaldo.aspx');

// Selecciono el valor correspondiente a '251' del combo
casper.then(function(){
    this.evaluate(function() {
        $("#ctl00_cntPh_dpdCodigoTTP > option:nth-child(6)").attr('selected','true');
    });
});

// Relleno el input con el código del abono
casper.then(function(){
    this.evaluate(function() {
        $("#ctl00_cntPh_txtNumTTP").val("0011220913");
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
});

casper.run(function(){
  console.log(fecha_caducidad);
  console.log(fecha_recarga);
  console.log(casper.cli.args[0])
});

