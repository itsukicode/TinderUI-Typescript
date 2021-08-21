/** @jsxImportSource @emotion/react */
import { useState } from 'react'
// ***** CSS ****
import { css } from '@emotion/react'
// ***** アニメーション ****
import { useSpring, a, to } from 'react-spring'
// ***** コンポーネント ****
import { SpringState } from 'src/components/CardList'

export type Profile = {
  name: string
  age: string
  imageSrc: string
  bio: string
}

type CardProps = {
  index: number
  profile: Profile
  springProp: SpringState
  bind: (index?: number) => any
}

const Card: React.VFC<CardProps> = ({
  index,
  profile: { name, age, imageSrc, bio },
  springProp: { x },
  bind,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false) // カードの下部が押された事を判断するステイト。
  const { transform, opacity } = useSpring({
    transform: isOpen ? 'translateY(-55px)' : 'translateY(0px)',  // カードのbioセクションが上下する動きをつける。
    opacity: isOpen ? 1 : 0  // 上記のアニメーション時にbioセクション内の文字が浮かび上がるために使用。
  })

  return (
    <a.div
      key={index}
      {...bind(index)}
      style={{
        touchAction: 'none',
        transform: to([x], (x) => `translateX(${x}px)`),
      }}
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        width: 230px;
        height: 325px;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        overflow: hidden;
      `}
      data-testid='card'
    >
      <div
        css={css`
          position: relative;
          width: 100%;
          height: 284px;
        `}
      >
        <img
          src={imageSrc}
          alt="女性"
          css={css`
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            pointer-events: none;
          `}
        />
      </div>
      <a.div
        css={css`
          padding: 10px;
          background-color: #fff;
          height: 105px;
          overflow-y: auto;
        `}
        style={{ transform }}
        onClick={() => setOpen(!isOpen)}
        role="button"
        data-testid="bioBtn"
      >
        <p
          css={css`
            font-size: 20px;
            font-weight: bold;
            color: #545454;
          `}
        >
          {name}, {age}
        </p>
        <div
          css={css`
            border-top: 1px solid #d9d6d6;
            margin-top: 10px;
            padding: 5px 0;
            display: ${isOpen ? 'block' : 'none'};
          `}
        >
          <a.p
            css={css`
              font-size: 12px;
              font-weight: bold;
              line-height: 14px;
              color: #959191;
            `}
            style={{ opacity }}
          >
            {bio}
          </a.p>
        </div>
      </a.div>
    </a.div>
  )
}

export default Card
