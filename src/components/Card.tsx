/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import { useSpring, a } from 'react-spring'

export type Profile = {
  name: string
  age: string
  imageSrc: string
  bio: string
}

type CardProps = {
  profile: Profile
}

const Card: React.VFC<CardProps> = ({
  profile: { name, age, imageSrc, bio },
}) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const { transform, opacity } = useSpring({
    transform: isOpen ? 'translateY(-63px)' : 'translateY(0px)',
    opacity: isOpen ? 1 : 0,
  })

  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        left: 0;
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
          height: 103px;
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
    </div>
  )
}

export default Card
