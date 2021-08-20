/** @jsxImportSource @emotion/react */
import emotionReset from 'emotion-reset'
import { Global, css } from '@emotion/react'
import React, { useState } from 'react'
import { useSprings } from 'react-spring'
import { useDrag } from 'react-use-gesture'
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
  }, {
    name: 'Mia',
    age: '28',
    imageSrc:
      'https://images.unsplash.com/photo-1563306406-e66174fa3787?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    bio: 'Looking for some positive moments, adventures and fun 🐸  Feel free to message me.',
  },
]

const App: React.VFC = () => {
  const [gone] = useState(() => new Set())
  const [springProps, setSpringProps] = useSprings(profiles.length, (i) => ({
    x: 0,
    y: 0,
  }))
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2 // カードのスワイプスピードが一定以上でスワイプ可能という仮フラグを立てる => 遅い場合スワイプされない。
      const dir = xDir < 0 ? -1 : 1 // -1は左にスワイプされているというインジケーター, +1は右。
      if (!down && trigger) gone.add(index) // (マウスが押されている　＋　速度が一定以上の場合)　=　完全にスワイプされていると判断し、以降でスワイプをトリガーさせる。
      setSpringProps((i) => {
        if (index !== i) return // どのオブジェクトにアニメーションを適用させるか特定している。
        const isGone = gone.has(index)
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // 完全にスワイプされていると判断されたカードは左右どちらかに弾き出される。
        return {
          x,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        }
      })
    }
  )

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
        <CardList profiles={profiles} springProps={springProps} bind={bind} />
        <ButtonList>
          <Button>
            <CgClose
              css={css`
                width: 40px;
                height: 40px;
                color: #1e7ec3;
              `}
            />
          </Button>
          <Button>
            <BsFillHeartFill
              css={css`
                width: 30px;
                height: 30px;
                color: #cb1d5b;
              `}
            />
          </Button>
        </ButtonList>
      </Phone>
    </div>
  )
}

export default App
