import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Card from 'src/components/Card'

type CardData = {
  name: string
  age: string
  imageSrc: string
  bio: string
}

describe("Card Component", () => {
  it('should render card data', () => {
      const props: CardData = {
        name: 'Becky',
        age: '22',
        imageSrc: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        bio: 'Looking for some positive moments, adventures and fun 😁  Feel free to message me.'
      }
      render(
          <Card props={props}/>
      );
      const nameAndAgeElement = screen.getByText('Becky, 22');
      const imageElement = screen.getByRole('img');
      const bioElement = screen.getByText('Looking for some positive moments, adventures and fun 😁 Feel free to message me.');
      expect(nameAndAgeElement).toBeInTheDocument();
      expect(imageElement).toBeInTheDocument();
      expect(bioElement).toBeInTheDocument();
  });
})