import { createGenerator } from '@unocss/core'
import { describe, expect, test } from 'vitest'
import { presetWeapp } from '../src'

const whRemToRpx = createGenerator({
  presets: [
    presetWeapp({
      whRpx: false,
    }),
  ],
})

const whRpx = createGenerator({
  presets: [
    presetWeapp(),
  ],
})

const selectors = [
  // postion
  'top-10',
  'bottom-5',
  'left-3',
  'right-8',

  // size
  'w-10',
  'h-10',
  'h-2',

  // typography
  'text-base',
  'text-20',
  'text-size-20',
  'text-1/2',
]

describe('whRpx-test', () => {
  test('whRemToRpx', async () => {
    const code = selectors.join(' ')
    const { css } = await whRemToRpx.generate(code)
    await expect(css).toMatchFileSnapshot('./assets/output/wh-rpx-false.css')
  })

  test('whRpx', async () => {
    const code = selectors.join(' ')
    const { css } = await whRpx.generate(code)
    await expect(css).toMatchFileSnapshot('./assets/output/wh-rpx.css')
  })
})
