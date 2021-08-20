import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CardList from 'src/components/CardList'
import { SpringState } from 'src/components/CardList'

const profiles = [
  {
    name: 'Becky',
    age: '22',
    imageSrc:
      'https://images.unsplash.com/photo-1496440737103-cd596325d314?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    bio: 'Looking for some positive moments, adventures and fun 😁  Feel free to message me.',
  },
  {
    name: 'Isabella',
    age: '25',
    imageSrc:
      'https://images.unsplash.com/photo-1514315384763-ba401779410f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=660&q=80',
    bio: 'Looking for some positive moments, adventures and fun 🐙  Feel free to message me.',
  },
  {
    name: 'Mia',
    age: '28',
    imageSrc:
      'https://images.unsplash.com/photo-1563306406-e66174fa3787?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    bio: 'Looking for some positive moments, adventures and fun 🐸  Feel free to message me.',
  },
]
const springProps = [{ x: {}, y: {}}, { x: {}, y: {}}, { x: {}, y: {}}] as SpringState[]
const handleBind = jest.fn()

describe('CardList Component', () => {
  it('should render CardList element and three Cards', () => {
    render(<CardList profiles={profiles} springProps={springProps} bind={handleBind}/>)
    const cardListElement = screen.getByTestId('cardList')
    expect(cardListElement).toBeInTheDocument()
    const cardImageElements = screen.getAllByRole('img')
    expect(cardImageElements.length).toBe(3)
  })
})
