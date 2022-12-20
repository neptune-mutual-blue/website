import styled from 'styled-components'
import { useRouter } from 'next/router'

import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'

import { Pagination } from '../../../components/Pagination'

import { Card } from './Card'
import { useTranslation } from 'react-i18next'

const Announcement = (props) => {
  const { t } = useTranslation('press-room')
  const router = useRouter()

  const handlePrev = () => {
    let queryString = '/pressroom'

    if (router.query.slug) queryString += `/tag/${router.query.slug}`
    queryString += `/page/${props.page - 1 + 1}` // + 1 for url

    router.push(queryString, undefined, { scroll: false })
  }

  const handleNext = () => {
    let queryString = '/pressroom'

    if (router.query.slug) queryString += `/tag/${router.query.slug}`
    queryString += `/page/${props.page + 2}` // + 1 for url

    router.push(queryString, undefined, { scroll: false })
  }

  const handleSetPage = (_page) => {
    let queryString = '/pressroom'

    if (router.query.slug) queryString += `/tag/${router.query.slug}`
    queryString += `/page/${_page + 1}` // + 1 for url

    router.push(queryString, undefined, { scroll: false })
  }

  return (
    <Container>
      <HeaderText>{props.tag?.name || t('Press Room / Latest Announcements')}</HeaderText>
      <Articles>
        {(props.posts || []).map((post, i) => {
          return <Card key={i} post={post} />
        })}
      </Articles>

      <Pagination
        page={props.page}
        setPage={handleSetPage}
        isLast={props.page === (props.totalPage - 1)} // we can handle this inside of the component
        handleNext={handleNext}
        handlePrev={handlePrev}
        totalPages={props.totalPage}
      />
    </Container>
  )
}

const Container = styled.div`
  ${utils.fullWidthContainer}
  padding-top: 96px;
  padding-bottom: 96px;

  @media (max-width: 768px) {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`

const Articles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 32px;
  margin-top: 32px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
`

const HeaderText = styled.h2`
  ${typography.weights.semibold}
  ${typography.styles.displayXs}
  color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.white};

  @media (max-width: 768px) {
    ${typography.styles.textXl}
  }

`

export { Announcement }
