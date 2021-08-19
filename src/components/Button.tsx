/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

type ButtonProps = {
  width?: string
  height? : string
  backgroundColor? : string
  borderColor? : string
  borderRadius? : string 
  children: React.ReactNode
}

const Button: React.VFC<ButtonProps> = ({ 
  width, 
  height, 
  backgroundColor, 
  borderColor, 
  borderRadius, 
  children 
}) => {
  return (
    <button 
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
      `}>
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
