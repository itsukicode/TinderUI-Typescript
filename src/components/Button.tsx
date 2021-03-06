/** @jsxImportSource @emotion/react */
// ***** CSS ****
import { css } from '@emotion/react'

export type swipeDirection = 'left' | 'right' 

type ButtonProps = {
  width?: string
  height? : string
  backgroundColor? : string
  borderColor? : string
  borderRadius? : string 
  children: React.ReactNode
  position: swipeDirection
  onClick: (dir: swipeDirection) => void
}

const Button: React.VFC<ButtonProps> = ({ 
  width, 
  height, 
  backgroundColor, 
  borderColor, 
  borderRadius, 
  children,
  position,
  onClick
}) => {
  return (
    <button 
      onClick={() => onClick(position)}
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: ${width};
        height: ${height};
        background-color: ${backgroundColor};
        border: 1px solid ${borderColor};
        border-bottom: 3px solid ${borderColor};
        border-radius: ${borderRadius};
        overflow: hidden;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
        transition: .4s;
        &:active {
          transform: translateY(2px);
          box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
          border-bottom: none;
        }
      `}
      data-testid={`${position}Btn`}
      >
      {children}
    </button>
  )
}

Button.defaultProps = {
  width: '60px',
  height: '60px',
  backgroundColor: '#fff',
  borderColor: '#f5f4f4',
  borderRadius: '50%',
}

export default Button
