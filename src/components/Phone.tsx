/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

type PhoneProps = {
  children?: React.ReactNode
}

const Phone: React.VFC<PhoneProps> = ({ children }) => {
  return (
    <div
      css={css`
        width: 320px;
        height: 550px;
        background-color: #fff;
        border-width: 60px 18px 70px 18px;
        border-style: solid;
        border-color: #f0f0f0;;
        border-radius: 45px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 25px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          top: -32px;
          left: 50%;
          transform: translateX(-50%);
          width: 70px;
          height: 12px;
          background: #e4e4e4;
          border-radius: 20px;
        }
        &::after {
          content: '';
          position: absolute;
          bottom: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 45px;
          height: 45px;
          background: rgba(228, 228, 228, 0.5);
          border: 6px solid #e4e4e4;
          border-radius: 50%;
        }
      `}
      data-testid="phoneDiv"
    >
      {children}
    </div>
  )
}

export default Phone