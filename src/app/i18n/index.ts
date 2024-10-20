import { createI18n } from 'vue-i18n'
import en from './languages/en.json'
import be from './languages/be.json'
import ru from './languages/ru.json'
import ua from './languages/ua.json'

const messages = {
	be,
	en,
	ru,
	ua
}

export const i18n = createI18n({
	locale: 'en',
	messages,
	legacy: false
})
