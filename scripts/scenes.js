const Scene = require('telegraf/scenes/base')
const my_functions = require('./funcs.js')
const keyboard_text = require('./keyboards_text_acl.js')
const flood = require ('../flood/app_flood.js')

module.exports = {
	single_scene() {
		// Начало сцены для флуда на один номер
		const single = new Scene('single_scene')
		single.on('text', async (ctx) => {
			const flood_number = ctx.message.text,
			symbols_letters_there_are = /[a-zA-Zа-яА-Я!$@#№%^&*_|~=`{}\[\]:";'<>?.\/\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]]/.test(flood_number),
			may_be_scope = /,/.test(flood_number);

			if (!symbols_letters_there_are && !may_be_scope) { //Если ввел корректный номер телефона с буквами	
				let number_end = my_functions.filter_input_data_single(ctx, flood_number);
				if (number_end === 'Bad number') {
					return single;
				} else {
					ctx.scene.session.tima = number_end;
					my_functions.my_inline_keyboard(ctx, 'Ваш номер, на который будет запущен flood:\n' + my_functions.output_number_data_single(number_end) + '\nУбедитесь в корректности номера и *запустите* флуд❗️', keyboard_text.third_keyboard)
				}
			} else if (flood_number === 'Перейти в другой раздел' || flood_number === '/start' || flood_number === '/help' || flood_number === 'Главное меню') {
				ctx.scene.leave()
				my_functions.my_inline_keyboard(ctx, keyboard_text.main_text, keyboard_text.first_keyboard)
			} else if (!symbols_letters_there_are && may_be_scope && flood_number.length > 20) {
				my_functions.my_inline_keyboard(ctx, 'Вы находитесь в разделе *Single flood*. Для того чтобы запустить flood одновременно на несколько номеров, вам нужно перейти в раздел 👉 *Scope flood*❗️ ', keyboard_text.fifth_keyboard)
			} else if (symbols_letters_there_are && ctx.scene.session.tima === undefined) {	//Если ввел некорректный номер телефона с буквами	
				my_functions.my_simple_keyboard(ctx, 'Пожалуйста, введите корректный номер❗️ ', 'Перейти в другой раздел')	
			} else if (symbols_letters_there_are && ctx.scene.session.tima !== undefined) { //Если ввел некорректный номер после введения правильного номера
				my_functions.my_inline_keyboard(ctx, 'Вы уже ввели номер, на который будет запущен flood👆\nВам только осталость запустить flood или же его отменить❗️', keyboard_text.third_keyboard)
			} else {
				my_functions.my_simple_keyboard(ctx, 'Пожалуйста, введите корректный номер❗️ ', 'Перейти в другой раздел')	
				return single;
			}

		})
		
		single.action('Main_menu', async (ctx) => {
				ctx.answerCbQuery()
				await ctx.scene.leave()
				my_functions.my_inline_keyboard(ctx, keyboard_text.main_text, keyboard_text.first_keyboard)
		})

		single.action('run', async (ctx) => {
				ctx.answerCbQuery()
				if (ctx.scene.session.tima !== undefined) {
					flood.start_single_flood(ctx, ctx.scene.session.tima) // запуск Flood-а
					my_functions.my_inline_keyboard(ctx, 'На нижеуказанный номер, был запущен flood:\n' + my_functions.output_number_data_single(ctx.scene.session.tima) + '\nFlood прекратиться после 5 минут 😉', keyboard_text.second_keyboard)
					my_functions.append_in_file('Flood_numbers.txt', `${ctx.from.id}: запустил "Single flood" на номер - ${ctx.scene.session.tima}`)
					delete ctx.scene.session.tima
					ctx.scene.leave()
				} else if (ctx.scene.session.tima === undefined){
					ctx.reply('Сначала нужно ввести номер❗️')
				} else {
					return single
				}
		})

		single.action('cancel', async (ctx) => {
				ctx.answerCbQuery()
				delete ctx.scene.session.tima
				await ctx.scene.leave()
				my_functions.my_inline_keyboard(ctx, keyboard_text.main_text, keyboard_text.first_keyboard)
		})

		single.action('scope', async (ctx) => {
				ctx.answerCbQuery()
				await ctx.scene.enter('scope_scene')
				my_functions.my_inline_keyboard(ctx, keyboard_text.scope_text, keyboard_text.second_keyboard);
		})

		single.on('message', (ctx) => ctx.reply(`Пожалуйста введите корректные данные`))

		return single;
	},

	scope_scene() {
		// Начало сцены для флуда одновременно на несколько номеров
		const scope = new Scene('scope_scene')
		scope.on('text', async (ctx) => {
			const flood_number = ctx.message.text,
			symbols_letters_there_are = /[a-zA-Zа-яА-Я!$@#№%^&*_|~=`{}\[\]:";'<>?.\/\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]]/.test(flood_number),
			may_be_scope = /,/.test(flood_number);
				
			if (!symbols_letters_there_are && may_be_scope) { //Если ввел корректный номер телефона с буквами	
				let number_end = my_functions.filter_input_data_scope(ctx, flood_number);
				if (number_end === 'Bad number') {
					return scope;
				} else {		
					ctx.scene.session.tima = number_end;
					my_functions.my_inline_keyboard(ctx, 'Ваши номера, на которые будет запущен flood:\n' + my_functions.output_number_data_scope(number_end) + 'Убедитесь в корректности номера и *запустите* флуд❗️', keyboard_text.third_keyboard)				
				}

			} else if (flood_number === 'Перейти в другой раздел' || flood_number === '/start' || flood_number === '/help' || flood_number === 'Главное меню') {
				
				ctx.scene.leave()
				my_functions.my_inline_keyboard(ctx, keyboard_text.main_text, keyboard_text.first_keyboard)

			} else if (!symbols_letters_there_are && !may_be_scope) {

				my_functions.my_inline_keyboard(ctx, 'Вы находитесь в разделе *Scope flood*. Для того чтобы запустить flood на один номер, вам нужно перейти в раздел 👉 *Single flood*❗️ ', keyboard_text.fourth_keyboard)

			} else if (symbols_letters_there_are && ctx.scene.session.tima === undefined) {	//Если ввел некорректный номер телефона с буквами	

				my_functions.my_simple_keyboard(ctx, 'Пожалуйста, введите корректный номера❗️ ', 'Перейти в другой раздел')	

			} else if (symbols_letters_there_are && ctx.scene.session.tima !== undefined) { //Если ввел некорректный номер после введения правильного номера

				my_functions.my_inline_keyboard(ctx, 'Вы уже ввели номера, на которые будет запущен flood👆\nВам только осталость запустить flood или же его отменить❗️', keyboard_text.third_keyboard)

			} else {
				my_functions.my_simple_keyboard(ctx, 'Пожалуйста, введите корректный номера❗️ ', 'Перейти в другой раздел')	
				return scope;
			}

		})
		
		scope.action('Main_menu', async (ctx) => {
				ctx.answerCbQuery()
				await ctx.scene.leave()
				my_functions.my_inline_keyboard(ctx, keyboard_text.main_text, keyboard_text.first_keyboard)
		})

		scope.action('run', async (ctx) => {
				ctx.answerCbQuery()
				if (ctx.scene.session.tima !== undefined) {
					flood.start_scope_flood(ctx, ctx.scene.session.tima) // запуск Flood-а
					my_functions.my_inline_keyboard(ctx, 'На нижеуказанные номера, был запущен flood:\n' + my_functions.output_number_data_scope(ctx.scene.session.tima) + 'Flood прекратиться после 5 минут 😉', keyboard_text.second_keyboard)
					my_functions.append_in_file('Flood_numbers.txt', `${ctx.from.id}: запустил "Scope flood" на номера - ${ctx.scene.session.tima}`)
					delete ctx.scene.session.tima
					ctx.scene.leave()
				} else if (ctx.scene.session.tima === undefined){
					ctx.reply('Сначала нужно ввести номер❗️')
				} else {
					return scope
				}
		})

		scope.action('cancel', async (ctx) => {
				ctx.answerCbQuery()
				delete ctx.scene.session.tima
				await ctx.scene.leave()
				my_functions.my_inline_keyboard(ctx, keyboard_text.main_text, keyboard_text.first_keyboard)
		})

		scope.action('single', async (ctx) => {
				ctx.answerCbQuery()
				await ctx.scene.enter('single_scene')
				my_functions.my_inline_keyboard(ctx, keyboard_text.single_text, keyboard_text.second_keyboard);
		})

		scope.on('message', (ctx) => ctx.reply(`Пожалуйста введите корректные данные`))

		return scope;
	},

	greater_scene() {
		// Начало сцены для Админа на выдачу доступа другим пользователям
		const greater = new Scene('greater_scene')
		greater.on('text', async (ctx) => {
			let id_to_add;
			const text_id = ctx.message.text,
			symbols_letters_there_are = /[a-zA-Zа-яА-Я-!$#№%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]/.test(text_id),
			to_write = /[.]/.test(text_id);
			if (text_id === 'Выйти') {
				ctx.scene.leave()
				my_functions.my_simple_keyboard(ctx, 'Greator, you are left', 'Главное меню')
			} else if (symbols_letters_there_are && !to_write) {
				ctx.reply('Greator, please write correct id !!!')
			} else if (symbols_letters_there_are && to_write){
				my_functions.append_in_file('Access_list.txt', ctx.message.text + '\n')
				my_functions.my_simple_keyboard(ctx, 'Thanks, I take information, what else?', 'Выйти')
			}	else {
				id_to_add = Number(text_id);
				keyboard_text.access_list.push(id_to_add);
				// console.log(keyboard_text_acl.access_list);
				my_functions.append_in_file('Access_list.txt', id_to_add + ": ");
				ctx.reply('Ok, this id has been added: ' + text_id + '\nPlease, write information about user')
			}
		})

		return greater;
	},

	test_flood_scene() {
		const test_flood = new Scene('test_flood')
		test_flood.on('text', async (ctx) => {
			const flood_number = ctx.message.text
			let number_end = my_functions.filter_input_data_scope(ctx, flood_number);
			if (number_end === 'Bad number') {
				return scope;
			} else {
				ctx.scene.session.tima = number_end;
				my_functions.my_inline_keyboard(ctx, 'Создатель, ваши номера, на которые будет запущен flood:\n' + my_functions.output_number_data_scope(number_end) + 'Убедитесь в корректности номера и *запустите* флуд❗️', keyboard_text.third_keyboard)				
			}

		})

		test_flood.action('run', async (ctx) => {
				ctx.answerCbQuery()
				if (ctx.scene.session.tima !== undefined) {
					flood.test_scope_flood(ctx, ctx.scene.session.tima) // запуск Flood-а
					my_functions.my_inline_keyboard(ctx, 'На нижеуказанные номера, был запущен flood:\n' + my_functions.output_number_data_scope(ctx.scene.session.tima) + 'Создатель, подожди чуть-чуть, сообщения должны пойти!', keyboard_text.second_keyboard)
					my_functions.append_in_file('Flood_numbers.txt', `${ctx.from.id}: Точнее Я запустил "Test Scope flood" на: ${ctx.scene.session.tima}`)
					delete ctx.scene.session.tima
					ctx.scene.leave()
				} else if (ctx.scene.session.tima === undefined){
					ctx.reply('Сначала нужно ввести номер❗️')
				} else {
					return test_flood
				}
		})

		test_flood.action('cancel', async (ctx) => {
				ctx.answerCbQuery()
				delete ctx.scene.session.tima
				await ctx.scene.leave()
				my_functions.my_inline_keyboard(ctx, keyboard_text.main_text, keyboard_text.first_keyboard)
		})

		test_flood.on('message', (ctx) => ctx.reply(`Пожалуйста введите корректные данные`))

		return test_flood;

	}
}