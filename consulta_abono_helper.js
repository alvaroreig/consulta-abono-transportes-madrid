const winston = require('winston');
var exec = require('child_process').exec;

module.exports = {
  reemplazarVariablesConsultarWebAbono: function (numero_abono,codigo_abono,callback){
	/**
	Tenemos que reemplazar el string XXXXXXXXXX con el número de abono
	en el script consulta_web_abono_transporte.js
	*/
	winston.log('info', {  
		"Número de abono a reemplazar": numero_abono
	})

	/**
	Tenemos que reemplazar el SELECT seleccionado en función del código de abono
	en el script consulta_web_abono_transporte.js
	*/
	winston.log('info', {  
		"Código de abono a reemplazar": codigo_abono
	})

	var option_del_select_a_habilitar;
	switch(codigo_abono) {
	    case '001':
	        option_del_select_a_habilitar='2';
	        break;
	    case '002':
	        option_del_select_a_habilitar='3';
	        break;
	    case '003':
	        option_del_select_a_habilitar='4';
	        break;
	    case '175':
	        option_del_select_a_habilitar='5';
	        break;
	    case '251':
	        option_del_select_a_habilitar='6';
	        break;
	    default:
	    	winston.log('error', {  
				"Código de abono no válido": codigo_abono
			});
			process.exit(1);
	}

	winston.log('info', {  
		"Option del select a habilitar": option_del_select_a_habilitar
	})

	/**
	Compose the sed command
	*/
	var comando_reemplazar_numero_abono = 'sed -i -e "s/XXXXXXXXXX/' + numero_abono + '/g" consulta_web_abono_transporte.js';
	var comando_reemplazar_codigo_abono = 'sed -i -e "s/nth-child(6)/nth-child(' + option_del_select_a_habilitar + ')/g" consulta_web_abono_transporte.js';

	winston.log('debug', {  
		"Comando para reemplazar el número de abono": comando_reemplazar_numero_abono
	});

	winston.log('debug', {  
		"Comando para reemplazar el código de abono": comando_reemplazar_codigo_abono
	});

	/**
	Execute the seed command
	*/
	exec(comando_reemplazar_numero_abono, function(error, stdout, stderr) {

		if (stderr != ''){
			winston.log('error', {  
				"Replace tags output": stderr
			});	
		} else {
			winston.log('debug', {  
				"Reemplazo del número de abono": "OK"
			});
		}

		exec(comando_reemplazar_codigo_abono, function(error, stdout, stderr) {

			if (stderr != ''){
				winston.log('error', {  
					"Replace tags output": stderr
				});	
			} else {
				winston.log('debug', {  
					"Reemplazo del código de abono": "OK"
				});
		}

		});

	});
  }
}