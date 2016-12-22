/**
Dependencies:
- dotenv : Needed to load parameter values from .env
- winston: Needed for logging
*/

require('dotenv').config({silent: true});
const winston = require('winston');

/**
We don't have log access yet
*/
console.log("Starting process:" + new Date());

/**
If any required parameter is missing, abort
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
	console.log('Missing parameter in .env file: Aborting');
	process.exit(1);
}

winston.level = process.env.LOG_LEVEL;

var codigo_abono=process.env.CODIGO_ABONO;
var numero_abono=process.env.NUMERO_ABONO;
var dias_para_avisar=process.env.DIAS_PARA_AVISAR;
var email_destino=process.env.EMAIL_DESTINO;

winston.log('info', {  
	"Código de abono": codigo_abono,
	"Número de abono": send_ebook_to_kindle,
	"Días para avisar": dias_para_avisar,
  "Email destino" : email_destino
});