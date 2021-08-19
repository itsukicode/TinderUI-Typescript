import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Card from 'src/components/Card'

type CardData = {
  name: string
  age: string
  imageSrc: string
  bio: string
}

const props: CardData = {
  name: 'Becky',
  age: '22',
  imageSrc: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  bio: 'Looking for some positive moments, adventures and fun 😁  Feel free to message me.'
}

beforeEach(() => {
	render(<Card props={props}/>)
})

describe("Card Component", () => {
  it('should render card data', () => {
      const nameAndAgeElement = screen.getByText('Becky, 22');
      const imageElement = screen.getByRole('img');
      expect(nameAndAgeElement).toBeInTheDocument();
      expect(imageElement).toBeInTheDocument();
  });

  // カードの下部をタップすると詳細画面が表示される
  it("should open the person's bio if the bottom of the card is tapped", async () => {
    expect(screen.getByText('Looking for some positive moments, adventures and fun 😁 Feel free to message me.')).not.toBeVisible();
    const bioBtn = screen.getByTestId('bioBtn') 
    fireEvent.click(bioBtn)
    await waitFor(() => {
      expect(screen.getByText('Looking for some positive moments, adventures and fun 😁 Feel free to message me.')).toBeVisible();
    })
  });
})