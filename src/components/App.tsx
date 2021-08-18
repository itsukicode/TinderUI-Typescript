/** @jsxImportSource @emotion/react */
import emotionReset from 'emotion-reset'
import { Global, css } from '@emotion/react'
import { FcFlashOn } from 'react-icons/fc';

const container = css`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`
const App: React.VFC = () =>  {
  return (
    <div css={container}>
      <Global styles={css`${emotionReset}}`}/>
      <h1>Start Project <FcFlashOn /></h1>
    </div>
  )
}

export default App