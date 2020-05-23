import messagesEn from '../translations/en.json'
import messagesFr from '../translations/fr.json'
import { localeService } from '../rendererDependencies'

it("should retrieve 'en' for default locale value", () => {
  const locale = localeService.getDefaultLocale()
  expect(localeService.getDefaultLocale()).toEqual(locale)
})

it('should retrieve english messages', () => {
  const locale = localeService.getDefaultLocale()
  const messages = localeService.getMessagesForLocale(locale)
  expect(messages).toEqual(messagesEn)
})

it('should retrieve french messages', () => {
  const messages = localeService.getMessagesForLocale('fr')
  expect(messages).toEqual(messagesFr)
})

it('should retrieve english messages for unknown language', () => {
  const messages = localeService.getMessagesForLocale('XX')
  expect(messages).toEqual(messagesEn)
})
