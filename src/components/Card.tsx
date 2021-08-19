/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

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
  return (
    <div
      css={css`
        width: 230px;
        height: 350px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
      <div
        css={css`
          padding: 10px;
          background-color: #fff;
          max-height: 83px;
          overflow-y: auto;
          transform: translateY(-63px);
        `}
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
            /* display: none; */
          `}
        >
          <p
            css={css`
              font-size: 12px;
              font-weight: bold;
              line-height: 14px;
              color: #959191;
            `}
          >
            {bio}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card