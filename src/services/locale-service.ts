import messagesEn from '../translations/en.json'
import messagesFr from '../translations/fr.json'

export const DEFAULT_LOCALE = 'en'
type Message = typeof messagesEn

export function getMessagesForLocale (locale: string): Message {
  switch (locale) {
    case 'fr':
      return messagesFr
    default:
      return messagesEn
  }
}
