import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from 'src/components/Button'
import { BsFillHeartFill } from 'react-icons/bs'

describe("Button Component", () => {
  it('should render button element', () => {
      render(
          <Button>
            <BsFillHeartFill/>
          </Button>
      );
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeInTheDocument();
  });
})