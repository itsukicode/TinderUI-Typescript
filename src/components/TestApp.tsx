/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
// ***** CSS ****
import emotionReset from 'emotion-reset'
import { Global, css } from '@emotion/react'
// ***** アニメーション ****
import { useSpring, useSprings } from 'react-spring'
import { useDrag } from 'react-use-gesture'
// ***** コンポーネント ****
import CardList from 'src/components/CardList'
import Phone from './Phone'
import ButtonList from './ButtonList'
import Button from 'src/components/Button'
// ***** アイコン ****
import { BsFillHeartFill } from 'react-icons/bs' 
import { CgClose } from 'react-icons/cg'
// ***** タイプ　****
import { swipeDirection } from 'src/components/Button'

// 固定データ
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

// 固定データでテストするためのコンポーネント
const App: React.VFC = () => {
  const [isEmpty, setEmpty] = useState<boolean>(false) // すべてのカードを仕分けできたという事を判断するステイト。opacityのアニメーションのトリガーとして使用。
  const { opacity } = useSpring({ opacity: isEmpty ? 1 : 0, delay: 500 }) // empty文字の表示時に使用。
  const [springProps, setSpringProps] = useSprings(profiles.length, (i) => ({ x: 0 }))  // すべてのカードにX値が変更されるアニメーションを加える。
  const [swipedBox] = useState(() => new Set()) // スワイプされたカードはswipedBoxに入る。

  const bind = useDrag( // ドラッグ時のスピードや位置などの情報を取得し、setSpringPropsでxの値をアップデートする事で左右に動きをつける事ができる
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2 // カードのスワイプスピードが一定以上でスワイプ可能という仮フラグを立てる => 遅い場合スワイプされない。
      const dir = xDir < 0 ? -1 : 1 // -1は左にスワイプされているというインジケーター, +1は右。
      if (!down && trigger) swipedBox.add(index) // (マウスが離されている＋　速度が一定以上の場合)　=　完全にスワイプされていると判断し、以降でスワイプをトリガーさせる。
      setSpringProps.start((i) => {
        if (index !== i) return // どのオブジェクトにアニメーションを適用させるか特定している。
        const isGone = swipedBox.has(index)
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // 完全にスワイプされていると判断されたカードは左右どちらかに弾き出される。
        return { x, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }}
      })
      if (!down && swipedBox.size === profiles.length) setEmpty(true) // スワイプできるカードがなくなった事を判断する
    }
  )

  const handleSwipeButtonClick = (dir: swipeDirection) => { // ボタンが押された時の関数。useDragと同くsetSpringPropsでX値をアップデートする事で左右に動きをつけている。
    const curIndex = profiles.length - swipedBox.size - 1
    swipedBox.add(curIndex)
    setSpringProps.start((i) => {
      if (curIndex !== i) return
      const x = dir === 'left' ? (200 + window.innerWidth) * -1 : 200 + window.innerWidth
      return { x, config: { friction: 200, tension: 200 } }
    })
    if (swipedBox.size === profiles.length) setEmpty(true)
  }

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

      <Phone isEmpty={isEmpty} opacity={opacity}> 
         <CardList profiles={profiles} springProps={springProps} bind={bind} />
         <ButtonList>
          <Button position={'left'} onClick={handleSwipeButtonClick}>
              <CgClose css={css`width: 40px; height: 40px; color: #1e7ec3;`}/>
            </Button>
            <Button position={'right'} onClick={handleSwipeButtonClick}>
              <BsFillHeartFill css={css`width: 30px; height: 30px; color: #cb1d5b;`}/>
            </Button>
          </ButtonList>
      </Phone>
    </div>
  )
}

export default App