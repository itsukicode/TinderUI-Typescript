/** @jsxImportSource @emotion/react */
import emotionReset from 'emotion-reset'
import { Global, css } from '@emotion/react'
import CardList from 'src/components/CardList'
import Phone from './Phone'
import ButtonList from './ButtonList'
import Button from 'src/components/Button'
import { BsFillHeartFill } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'

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

const App: React.VFC = () => {
  return (
    <div
      css={css`
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #cee4f4;

      `}
    >
      <Global
        styles={css`
          ${emotionReset}
          *, *::after, *::before {
            box-sizing: border-box;
          }
        `}
      />

      <Phone>
        <CardList profiles={profiles} />
        <ButtonList>
          <Button>
            <CgClose css={css`width: 40px; height: 40px; color: #1e7ec3;`}/>
          </Button>
          <Button>
            <BsFillHeartFill css={css`width: 30px; height: 30px; color: #cb1d5b;`}/>
          </Button>
        </ButtonList>
      </Phone>
    </div>
  )
}

export default App
