import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ButtonList from 'src/components/ButtonList'
import Button from 'src/components/Button'
import { BsFillHeartFill } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'

const clickHandler = jest.fn()
describe('ButtonList Component', () => {
  it('should render ButtonList element and two buttons', () => {
    render(
      <ButtonList>
        <Button position={'left'} onClick={clickHandler}>
          <BsFillHeartFill />
        </Button>
        <Button position={'right'} onClick={clickHandler}>
          <CgClose />
        </Button>
      </ButtonList>
    )
    const buttonListElement = screen.getByTestId('buttonList')
    expect(buttonListElement).toBeInTheDocument()
    const buttonElements = screen.getAllByRole('button')
    expect(buttonElements.length).toBe(2)
  })
})
