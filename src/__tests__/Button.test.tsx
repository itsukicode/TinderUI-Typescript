import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from 'src/components/Button'
import { BsFillHeartFill } from 'react-icons/bs'

const clickHandler = jest.fn()
describe('Button Component', () => {
  it('should render button element', () => {
    render(
      <Button position={'left'} onClick={clickHandler}>
        <BsFillHeartFill />
      </Button>
    )
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeInTheDocument()
  })
})
