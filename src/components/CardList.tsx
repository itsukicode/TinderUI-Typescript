/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Card, { Profile } from 'src/components/Card'
import { v4 as uuidv4 } from 'uuid'
import { SpringValue } from 'react-spring'

export type SpringState = {
  x: SpringValue
  y: SpringValue
}

type CardListProps = {
  profiles: Profile[]
  springProps: SpringState[]
  bind: (index?: number) => any
}

const CardList: React.VFC<CardListProps> = ({ 
  profiles, 
  springProps, 
  bind
}) => {
  return (
    <div css={css`
      position: relative;
      width: 230px;
      height: 343px;
    `}data-testid='cardList'>
      {profiles.map((profile, i) => (
        <Card 
          key={uuidv4()} 
          index={i} 
          profile={profile} 
          springProp={springProps[i]} 
          bind={bind}
        />
      ))}
    </div>
  )
}

export default CardList