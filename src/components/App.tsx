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
import ClipLoader from 'react-spinners/ClipLoader'
// ***** アイコン ****
import { BsFillHeartFill } from 'react-icons/bs' 
import { CgClose } from 'react-icons/cg'
// ***** タイプ　****
import { swipeDirection } from 'src/components/Button'
// ***** プロファイルデータ ****
import { defaultProfiles } from 'src/data/defaultProfiles'
// ***** カスタムフック ****
import { useSetProfilesImage } from 'src/hooks/useSetProfilesImage'

const App: React.VFC = () => {
  const { profiles, apiState } = useSetProfilesImage(defaultProfiles) // 画像を外部サーバーから取得し、defaultProfilesのデータに埋め込む。
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
        {apiState === 'finished' && (
          <>
            <CardList profiles={profiles} springProps={springProps} bind={bind} />
            <ButtonList>
              <Button position={'left'} onClick={handleSwipeButtonClick}>
                <CgClose css={css`width: 40px; height: 40px; color: #1e7ec3;`}/>
              </Button>
              <Button position={'right'} onClick={handleSwipeButtonClick}>
                <BsFillHeartFill css={css`width: 30px; height: 30px; color: #cb1d5b;`}/>
              </Button>
            </ButtonList>
          </>
        )}
        {apiState === 'loading' && <ClipLoader color={'#1e7ec3'} size={150} />}
        {apiState === 'error' && <p css={css`color: #cb1d5b; font-size: 30px;`}> Error </p>}
      </Phone>
    </div>
  )
}

export default App
