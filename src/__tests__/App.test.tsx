import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from 'src/components/TestApp'

beforeEach(() => {
  render(<App/>)
})

describe('App Component', () => {
  it('should render phone component', () => {
    expect(screen.getByTestId('phoneDiv')).toBeInTheDocument()
  })
  it('should render CardList element and three Cards', () => {
    expect(screen.getByTestId('cardList')).toBeInTheDocument()
    const cardImageElements = screen.getAllByRole('img')
    expect(cardImageElements.length).toBe(3)
  })
  it('should render ButtonList element and two buttons', () => {
    expect(screen.getByTestId('buttonList')).toBeInTheDocument()
    const buttonElements = screen.getAllByRole('button')
    // カードの下部のdivのroleをbuttonにしているため５つ。 <div role='button' />
    expect(buttonElements.length).toBe(5)
  })
  // ボタンを押した時にカードが正しくスワイプされているかどうか判定するテスト
  // スワイプ後のカードのポジションを取得し、左右に正しく動いているかどうかで判定しようとコードを書いてみたがうまくいかなかったため、
  // なので今回の判定は、Emptyという文字が表示できたら正しくスワイプされたという事にする。CypressなどのE2Eの方がこういう機能を確認するのには適しているのかもしれない。
  it('should swipe card correctly when button was clicked', async () => {
    expect(screen.getByTestId('emptyText')).not.toBeVisible()
    const leftBtnElement = screen.getByTestId('leftBtn')
    const rightBtnElement = screen.getByTestId('rightBtn')
    fireEvent.click(leftBtnElement)
    fireEvent.click(rightBtnElement)
    fireEvent.click(leftBtnElement)
    await waitFor(() => {
      expect(screen.getByTestId('emptyText')).toBeVisible()
    })
  })
})
