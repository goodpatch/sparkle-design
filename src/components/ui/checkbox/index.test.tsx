import React from 'react'
import {afterEach, beforeEach, describe, expect, it} from 'vitest'
import {act} from 'react'
import ReactDOM from 'react-dom/client'
import {Checkbox} from './index'

let container: HTMLDivElement | null = null
let root: ReactDOM.Root | null = null

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = ReactDOM.createRoot(container)
})

afterEach(() => {
  if (root) {
    act(() => {
      root!.unmount()
    })
    root = null
  }
  if (container) {
    document.body.removeChild(container)
    container = null
  }
})

describe('Checkbox', () => {
  it('toggles checked state on click', () => {
    act(() => {
      root!.render(<Checkbox id="chk" />)
    })
    const checkbox = container!.querySelector('#chk')!
    expect(checkbox.getAttribute('data-state')).toBe('unchecked')
    act(() => {
      checkbox.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })
    expect(checkbox.getAttribute('data-state')).toBe('checked')
  })

  it('does not toggle when disabled', () => {
    act(() => {
      root!.render(<Checkbox id="chk" isDisabled />)
    })
    const checkbox = container!.querySelector('#chk')!
    const stateBefore = checkbox.getAttribute('data-state')
    act(() => {
      checkbox.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })
    expect(checkbox.getAttribute('data-state')).toBe(stateBefore)
  })
})
