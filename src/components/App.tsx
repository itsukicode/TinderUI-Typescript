/** @jsxImportSource @emotion/react */
// import { useEffect } from 'react'
import emotionReset from 'emotion-reset'
import { Global, css } from '@emotion/react'
import { FcFlashOn } from 'react-icons/fc';
// import { createApi } from 'unsplash-js';

const container = css`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`
// const unsplashApi = createApi({
//   accessKey: process.env.REACT_APP_UNSPLASH_API!
// });

const App: React.VFC = () =>  {

  // useEffect(() => {
  //   unsplashApi.search
	// 		.getPhotos({
	// 			query: 'woman',
	// 			page: 1,
	// 			perPage: 4,
	// 		})
	// 		.then((json) => {
  //       console.log(json);
	// 		});
  // }, [])

  return (
    <div css={container}>
      <Global styles={css`${emotionReset}}`}/>
      <h1>Start Project <FcFlashOn /></h1>
    </div>
  )
}

export default App