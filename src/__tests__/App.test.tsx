import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import App from 'src/components/App'

test('renders learn react link', () => {
	render(<App />)
	const linkElement = screen.getByText(/start project/i)
	expect(linkElement).toBeInTheDocument()
})
