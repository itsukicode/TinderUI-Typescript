import { useState, useEffect } from 'react'
import { createApi } from 'unsplash-js'
import { Profile } from 'src/components/Card'

const unsplashApi = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_API!,
})

type ApiState = 'loading' | 'finished' | 'error'
export const useSetProfilesImage = (defaultProfiles: Profile[]) => {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [apiState, setApiState] = useState<ApiState>('loading')

  useEffect(() => {
    let unmount = false
    unsplashApi.search
      .getPhotos({
        query: 'girl',
        page: Math.floor(Math.random() * 30) + 1,
        perPage: defaultProfiles.length,
      })
      .then((data) => {
        if (unmount) return
        const updatedProfiles = data.response?.results.map((image, i) => {
          return {
            ...defaultProfiles[i],
            imageSrc: image.urls.small,
          }
        })
        if (updatedProfiles) {
          setProfiles(updatedProfiles)
          setApiState('finished')
        }
      })
      .catch((err) => {
        setApiState('error')
      })
    return () => {
      unmount = true
    }
    // eslint-disable-next-line
  }, [])

  return { profiles, apiState }
}
