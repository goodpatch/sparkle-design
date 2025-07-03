import React from 'react'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import {act} from 'react'
import ReactDOM from 'react-dom/client'
import {Input} from './index'

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

describe('Input', () => {
  it('calls onIconButtonClick when icon button is clicked', () => {
    const handleClick = vi.fn()
    act(() => {
      root!.render(
        <Input
          isIconButtonEnable
          iconButtonIcon="edit"
          onIconButtonClick={handleClick}
        />,
      )
    })
    const button = container!.querySelector('button')!
    act(() => {
      button.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not fire onChange when disabled', () => {
    const handleChange = vi.fn()
    act(() => {
      root!.render(<Input isDisabled onChange={handleChange} />)
    })
    const input = container!.querySelector('input')!
    act(() => {
      input.dispatchEvent(new Event('change', {bubbles: true}))
    })
    expect(handleChange).not.toHaveBeenCalled()
    expect(input.disabled).toBe(true)
  })

  it('focuses input when container is clicked', () => {
    act(() => {
      root!.render(<Input />)
    })
    const wrapper = container!.firstElementChild as HTMLElement
    const input = wrapper.querySelector('input')!
    expect(document.activeElement).not.toBe(input)
    act(() => {
      wrapper.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })
    expect(document.activeElement).toBe(input)
  })
})
