const fs = require('fs')
const for_text = require('./keyboards_text_acl.js')

module.exports = {
	my_inline_keyboard (ctx, text, keyboard_text) {
		ctx.telegram.sendMessage(ctx.chat.id, text,{
			reply_markup: {
				inline_keyboard: keyboard_text
			},
			parse_mode: 'Markdown'
		})
	},

	my_simple_keyboard (ctx, text, button_text) {
		ctx.telegram.sendMessage(ctx.chat.id, text,{
			reply_markup: {
				keyboard: [
				[button_text]
				],
				resize_keyboard : true,
				one_time_keyboard: true
			},
			parse_mode: 'Markdown'
		})
	},

	my_simple_keyboard_time (ctx, text) {
		ctx.telegram.sendMessage(ctx.chat.id, text,{
			reply_markup: {
				keyboard: [
				['5 мин', '10 мин'],
				['Отменить']
				],
				resize_keyboard : true,
				one_time_keyboard: true
			},
			parse_mode: 'Markdown'
		})
	},

	append_in_file (file, text_in_file) {
		fs.appendFile('./scripts/logs/' + file, '\n' + text_in_file, (err) => {
			if (err) {
				return console.log(err);
			} else {
				return 1;
			}
		})
	},

	filter_input_data_single (ctx, data) {
		let data_1 = data.split('');
		data_1 = data_1.filter((value) => {
		  return value !== ' '; 
		})
		data_1 = data_1.filter((value) => {
		  return value !== `)`; 
		})
		data_1 = data_1.filter((value) => {
		  return value !== `(`; 
		})
		data_1 = data_1.filter((value) => {
		  return value !== `+`; 
		})
		data_1 = data_1.filter((value) => {
		  return value !== `-`; 
		})
		data_1 = data_1.join('')
		let operators = /700|701|702|703|704|705|706|707|708|709|747|750|751|760|761|762|763|764|771|775|776|777|778/g;

		if (data_1.length === 11) {
			let check = operators.test(data_1.substring(1, 4));
			if (check) {
				let data_output = data_1.substring(1)
				return data_output;
			} else {
				ctx.reply("Вы ввели некорректный номер. Пожалуйста, убедитесь в корректности номера и введите его заново❗️")
				return 'Bad number';
			}
		} else if (data_1.length === 10) {
			let check = operators.test(data_1.substring(0, 3));
			if (check) {
				return data_1;
			} else {
				ctx.reply("Вы ввели некорректный номер. Пожалуйста, убедитесь в корректности номера и введите его заново❗️")
				return 'Bad number';
			}
		} else {
			ctx.reply ('Вы ввели некорректный номер. Пожалуйста, убедитесь в корректности номера и введите его заново❗️')
			return 'Bad number';
		}

	},

	filter_input_data_scope (ctx, data) {
		let data_1 = data.split(''), correct_data = [], bad_data = [], data_2;
		data_1 = data_1.filter((value) => {
		  return value !== ' '; 
		})
		data_1 = data_1.filter((value) => {
		  return value !== `)`; 
		})
		data_1 = data_1.filter((value) => {
		  return value !== `(`; 
		})
		data_1 = data_1.filter((value) => {
		  return value !== `+`; 
		})
		data_1 = data_1.filter((value) => {
		  return value !== `-`; 
		})

		data_1 = data_1.join('')
		data_2 = data_1.split(',')

		data_2.forEach(element => {
				if (element.length === 11 && element.charAt(1) === '7') {
					correct_data.push(element.substring(1));
				} else if (element.length === 10 && element.charAt(0) === '7') {
					correct_data.push(element);
				} else {
					bad_data.push(element);
				}
		})

		if (bad_data.length === 0) {
			return correct_data;
		} else {
			out_data = ''
			bad_data.forEach(element => {
				out_data = out_data + '+' + element + '\n';
			})
			ctx.reply("Введенные вами, нижеуказаные номера, некорректны:\n" + out_data + "Пожалуйста, введите корректные номера❗️")
			return 'Bad number';
		}

	},

	output_number_data_single (data) {
		let data_1 = '+7 (' + data.substring(0, 3) + ') ' + data.substring(3, 6) + '-' + data.substring(6, 8) + '-' + data.substring(8, 10);
		return data_1;
	},

	output_number_data_scope (data) {
		let all_data = '';
		for (let i = 0; i < data.length; i++) { 
			let data_1 = '+7 (' + data[i].substring(0, 3) + ') ' + data[i].substring(3, 6) + '-' + data[i].substring(6, 8) + '-' + data[i].substring(8, 10) + '\n';
			all_data = all_data + data_1
		}
		return all_data;
	}

}