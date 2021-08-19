import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from 'src/components/App'

beforeEach(() => {
  render(<App />)
})

describe('App Component', () => {
  it('should render phone component', () => {
    const phoneDivElement = screen.getByTestId('phoneDiv')
    expect(phoneDivElement).toBeInTheDocument()
  })
  it('should render CardList element and three Cards', () => {
    const cardListElement = screen.getByTestId('cardList')
    expect(cardListElement).toBeInTheDocument()
    const cardImageElements = screen.getAllByRole('img')
    expect(cardImageElements.length).toBe(3)
  })
  it('should render ButtonList element and two buttons', () => {
    const buttonListElement = screen.getByTestId('buttonList')
    expect(buttonListElement).toBeInTheDocument()
    const buttonElements = screen.getAllByRole('button')
    // カードの下部のdivのroleをbuttonにしているため５つ。 <div role='button' />
    expect(buttonElements.length).toBe(5)
  })
})
