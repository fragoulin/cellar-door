/**
 * Definition for mame.ini file content.
 */
type MameIni = Map<string, string | number>

/**
 * Definition for mame card.
 */
type MameCard = {
  name: string
  icon?: string
  snap?: string
}

export { MameIni, MameCard }
