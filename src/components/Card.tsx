/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import { useSpring, a, config } from 'react-spring'

type CardData = {
  name: string
  age: string
  imageSrc: string
  bio: string
}

type CardProps = {
  props: CardData
}

const Card: React.VFC<CardProps> = ({
  props: { name, age, imageSrc, bio },
}) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const { transform, opacity } = useSpring({
    transform: isOpen ? 'translateY(-63px)' : 'tranlateY(0)',
    opacity: isOpen ? 1 : 0,
    config: config.slow,
  })

  return (
    <div
      css={css`
        width: 230px;
        height: 350px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        overflow: hidden;
      `}
    >
      <div
        css={css`
          position: relative;
          width: 100%;
          height: 310px;
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
          `}
        />
      </div>
      <a.div
        css={css`
          padding: 10px;
          background-color: #fff;
          height: 83px;
          overflow-y: auto;
        `}
        style={{ transform }}
        onClick={() => setOpen(!isOpen)}
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
    </div>
  )
}

export default Card
