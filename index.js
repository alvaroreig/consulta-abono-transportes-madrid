var casper = require('casper').create();
require('dotenv').config({silent: true});

var fecha_recarga;
var fecha_caducidad;

casper.start('https://www.tarjetatransportepublico.es/CRTM-ABONOS/consultaSaldo.aspx');

// En teoria, selecciono el valor del combo
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

// Compruebo el valor del input con el código del abono
casper.then(function(){
  this.echo(this.fetchText('#ctl00_cntPh_txtNumTTP'));
});

casper.then(function(){
  this.click('#ctl00_cntPh_btnConsultar');
});

// Compruebo el valor del input con el código del abono
casper.then(function(){
  fecha_caducidad = this.fetchText('#ctl00_cntPh_tableResultados > table > tbody > tr:nth-child(2) > td > span:nth-child(11)'); 
  fecha_recarga = this.fetchText('#ctl00_cntPh_tableResultados > table > tbody > tr:nth-child(2) > td > span:nth-child(19)'); 
});

casper.run(function(){
  console.log(fecha_caducidad);
  console.log(fecha_recarga);
  console.log(casper.cli.args[0])
});

