import messagesEn from '../translations/en.json'
import messagesFr from '../translations/fr.json'
import { injectable } from 'inversify'
import 'reflect-metadata'

/**
 * Default locale is english.
 */
const DEFAULT_LOCALE = 'en'

/**
 * Type definition for locale messages.
 */
export type Messages = typeof messagesEn

/**
 * Locale service definition.
 */
export interface LocaleService {
  /**
   * Retrieve the default locale.
   *
   * @returns the english locale.
   */
  getDefaultLocale(): string

  /**
   * Retrieve the messages for the specified locale.
   *
   * @param locale - the locale corresponding to the message to retrieve.
   * @returns the messages corresponding to the specified locale.
   */
  getMessagesForLocale(locale: string): Messages
}

/**
 * Cellar implementation of locale service.
 */
@injectable()
export class CellarLocaleService implements LocaleService {
  /**
   * Retrieve the english locale.
   */
  public getDefaultLocale(): string {
    return DEFAULT_LOCALE
  }

  public getMessagesForLocale(locale: string): Messages {
    switch (locale) {
      case 'fr':
        return messagesFr
      default:
        return messagesEn
    }
  }
}
