/** @jsxImportSource @emotion/react */
// ***** CSS ****
import { css } from '@emotion/react'

type ButtonListProps = {
  children?: React.ReactNode
}

const ButtonList: React.VFC<ButtonListProps> = ({ children }) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
      `}
      data-testid="buttonList"
    >
      {children}
    </div>
  )
}

export default ButtonList