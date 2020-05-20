import messagesEn from '../translations/en.json'
import messagesFr from '../translations/fr.json'
import { injectable } from 'inversify'
import 'reflect-metadata'

const DEFAULT_LOCALE = 'en'
type Message = typeof messagesEn

export interface LocaleService {
  getDefaultLocale(): string;
  getMessagesForLocale (locale: string): Message;
}

@injectable()
export class CellarLocaleService implements LocaleService {
  public getDefaultLocale (): string {
    return DEFAULT_LOCALE
  }

  public getMessagesForLocale (locale: string): Message {
    switch (locale) {
      case 'fr':
        return messagesFr
      default:
        return messagesEn
    }
  }
}
