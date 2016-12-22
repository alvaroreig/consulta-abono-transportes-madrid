const winston = require('winston');
var exec = require('child_process').exec;

module.exports = {
  reemplazarVariablesConsultarWebAbono: function (numero_abono,callback){
	/**
	We have to replace the line 46 of the pocletplus.recipe file
	with the tags specified by the user in the LIST_OF_TAGS parameter
	*/
	winston.log('info', {  
		"Número de abono a reemplazar": numero_abono
	})

	/**
	Compose the sed command
	*/
	var comando_reemplazar_numero_abono = 'sed -i -e "s/XXXXXXXXXX/' + numero_abono + '/g" consulta-web-abono-transporte.js';

	winston.log('debug', {  
		"Comando para reemplazar el número de abono": comando_reemplazar_numero_abono
	});

	/**
	Execute the seed command
	*/
	exec(comando_reemplazar_numero_abono, function(error, stdout, stderr) {

		if (stderr != ''){
			winston.log('error', {  
				"Replace tags output": stderr
			});	
		}

	});
  }
}