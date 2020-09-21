const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const all_scenes = require('./scripts/scenes.js')
const my_functions = require('./scripts/funcs.js')
const keyboard_text = require('./scripts/keyboards_text_acl.js')

const greater_scene = all_scenes.greater_scene()
const single_scene = all_scenes.single_scene()
const scope_scene = all_scenes.scope_scene()
const test_flood = all_scenes.test_flood_scene()

//Вместо your telegram-bot token введите ваш telegram-token в кавычках
const bot = new Telegraf(your telegram-bot token)
const stage = new Stage([single_scene, scope_scene, greater_scene, test_flood])

bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => {
	if (keyboard_text.access_list.includes(ctx.from.id)){
		my_functions.my_inline_keyboard(ctx, keyboard_text.main_text, keyboard_text.first_keyboard);
	} else {
		ctx.replyWithMarkdown("Ooops you don't have permission, your telegram id: `" + ctx.from.id + "`")
	}
})

bot.action('single', async (ctx) => {
	ctx.answerCbQuery()
	if (keyboard_text.access_list.includes(ctx.from.id)){
		my_functions.my_inline_keyboard(ctx, keyboard_text.single_text, keyboard_text.second_keyboard);
		ctx.scene.enter('single_scene')
	} else {
		ctx.replyWithMarkdown("Ooops you don't have permission, your telegram id: `" + ctx.from.id + "`")
	}
})

bot.action('scope', async (ctx) => {
	ctx.answerCbQuery()
	if (keyboard_text.access_list.includes(ctx.from.id)){
		my_functions.my_inline_keyboard(ctx, keyboard_text.scope_text, keyboard_text.second_keyboard);
		ctx.scene.enter('scope_scene')
	} else {
		ctx.replyWithMarkdown("Ooops you don't have permission, your telegram id: `" + ctx.from.id + "`")
	}
})

bot.action('Main_menu', async (ctx) => {
	ctx.answerCbQuery()
	if (keyboard_text.access_list.includes(ctx.from.id)){
		my_functions.my_inline_keyboard(ctx, keyboard_text.main_text, keyboard_text.first_keyboard)
	} else {
		ctx.replyWithMarkdown("Ooops you don't have permission, your telegram id: `" + ctx.from.id + "`")
	}
})

bot.action('cancel', async (ctx) => {
	ctx.answerCbQuery()
	if (keyboard_text.access_list.includes(ctx.from.id)){
		my_functions.my_inline_keyboard(ctx, 'Если вы нажали *Запустить*, flood запущен. Flood прекратиться после 5 минут. Если нет, то вызовите *Главное меню*' , keyboard_text.second_keyboard);
	} else {
		ctx.replyWithMarkdown("Ooops you don't have permission, your telegram id: `" + ctx.from.id + "`")
	}
})

bot.action('run', async (ctx) => {
	ctx.answerCbQuery()
	if (keyboard_text.access_list.includes(ctx.from.id)){
		my_functions.my_inline_keyboard(ctx, 'Для начало, нужно ввести номера в одном из разделов в *Главном меню* 👇', keyboard_text.second_keyboard)
	} else {
		ctx.replyWithMarkdown("Ooops you don't have permission, your telegram id: `" + ctx.from.id + "`")
	}
})
//Вместо 'Admin Telegram-id' введите ваш telegram-id
bot.command("tima_best", (ctx) => {
	if (ctx.from.id === 'Admin Telegram-id') {
		ctx.reply('Hello Creator, which id wants to take access?')
		ctx.scene.enter('greater_scene')
	} else {
		ctx.replyWithMarkdown("Ooops you don't have permission, your telegram id: `" + ctx.from.id + "`")
	}
})
//Вместо 'Admin Telegram-id' введите ваш telegram-id
bot.command("tima_test", (ctx) => {
	if (ctx.from.id === 'Admin Telegram-id') { 
		ctx.reply('Hello Creator')
		ctx.scene.enter('test_flood')
	} else {
		ctx.replyWithMarkdown("Ooops you don't have permission, your telegram id: `" + ctx.from.id + "`")
	}
})

bot.command('help', (ctx) => {
	if (keyboard_text.access_list.includes(ctx.from.id)){
		my_functions.my_inline_keyboard(ctx, keyboard_text.main_text, keyboard_text.first_keyboard);
	} else {
		ctx.replyWithMarkdown("Ooops you don't have permission, your telegram id: `" + ctx.from.id + "`")
	}
})

bot.on('message', (ctx) => {
	if (keyboard_text.access_list.includes(ctx.from.id)) {
		if (ctx.message.text === 'Главное меню') {
			my_functions.my_inline_keyboard(ctx, keyboard_text.main_text, keyboard_text.first_keyboard);
		} else {
			my_functions.my_inline_keyboard(ctx, 'Для начало, нужно выбрать один из разделов в *Главном меню* 👇', keyboard_text.second_keyboard)
		}
	} else {
		return bot
	}	
})

bot.launch().then(console.log("Bot is running ...."))