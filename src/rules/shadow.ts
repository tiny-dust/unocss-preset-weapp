import type { Rule } from '@unocss/core'
import { cacheRestoreSelector } from 'unplugin-transform-class/utils'
import type { Theme } from '../theme'
import { colorResolver, colorableShadows, handler as h, hasParseableColor } from '../utils'
import { varEmpty } from './static'

export const boxShadowsBase = {
  '--un-ring-offset-shadow': '0 0 rgba(0,0,0,0)',
  '--un-ring-shadow': '0 0 rgba(0,0,0,0)',
  '--un-shadow-inset': varEmpty,
  '--un-shadow': '0 0 rgba(0,0,0,0)',
}

export const boxShadows: Rule<Theme>[] = [
  [/^shadow(?:-(.+))?$/, (match, context) => {
    let [, d] = match
    const { theme } = context
    d = cacheRestoreSelector(d, theme.transformRules)

    const v = theme.boxShadow?.[d || 'DEFAULT']
    const c = d ? h.bracket.cssvar(d) : undefined

    if ((v != null || c != null) && !hasParseableColor(c, theme)) {
      return {
        '--un-shadow': colorableShadows((v || c)!, '--un-shadow-color').join(','),
        'box-shadow': 'var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)',
      }
    }
    return colorResolver('--un-shadow-color', 'shadow')(match, context)
  }, { autocomplete: ['shadow-$colors', 'shadow-$boxShadow'] }],
  [/^shadow-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ '--un-shadow-opacity': h.bracket.percent.cssvar(opacity) }), { autocomplete: 'shadow-(op|opacity)-<percent>' }],

  // inset
  ['shadow-inset', { '--un-shadow-inset': 'inset' }],
]
