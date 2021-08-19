/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Card, { Profile } from 'src/components/Card'
import { v4 as uuidv4 } from 'uuid'

type CardListProps = {
  profiles: Profile[]
}

const CardList: React.VFC<CardListProps> = ({ profiles }) => {
  return (
    <div css={css`
      position: relative;
      width: 230px;
      height: 350px;
    `}data-testid='cardList'>
      {profiles.map((profile) => (
        <Card key={uuidv4()} profile={profile} />
      ))}
    </div>
  )
}
export default CardList
