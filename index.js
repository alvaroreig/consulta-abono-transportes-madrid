/**
Dependencies:
- dotenv : Necesario para cargar valores de .env
- winston: Necesario para el logging.
*/

require('dotenv').config({silent: true});
const winston = require('winston');
var consulta_abono_helper = require('./consulta_abono_helper');

console.log("Starting process:" + new Date());

/**
Si falta algún parámetro, abortamos
*/
if (
		(process.env.LOG_LEVEL == null)||
		(process.env.CODIGO_ABONO == null)||
		(process.env.NUMERO_ABONO == null)||
		(process.env.DIAS_PARA_AVISAR == null)||
    (process.env.EMAIL_DESTINO == null) ||
		(process.env.SMTP_SERVER == null) ||
		(process.env.SMTP_PORT == null) ||
		(process.env.SMTP_ENCRYPT == null) ||
		(process.env.SMTP_USERNAME == null) ||
		(process.env.SMTP_PASSWORD == null)


	){
	console.log('Falta parámetro obligatorio en el archivo .env: Abortamos');
	process.exit(1);
}

winston.level = process.env.LOG_LEVEL;

var codigo_abono=process.env.CODIGO_ABONO;
var numero_abono=process.env.NUMERO_ABONO;
var dias_para_avisar=process.env.DIAS_PARA_AVISAR;
var email_destino=process.env.EMAIL_DESTINO;

winston.log('info', {  
	"Código de abono": codigo_abono,
	"Número de abono": numero_abono,
	"Días para avisar": dias_para_avisar,
  "Email destino" : email_destino
});

consulta_abono_helper.reemplazarVariablesConsultarWebAbono(
  numero_abono,
  codigo_abono,
  function(){

  }
);