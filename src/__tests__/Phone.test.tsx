import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Phone from 'src/components/Phone'

describe('Phone Component', () => {
  it('should render phone component', () => {
    render(<Phone />)
    const phoneDivElement = screen.getByTestId('phoneDiv')
    expect(phoneDivElement).toBeInTheDocument()
  })
})
