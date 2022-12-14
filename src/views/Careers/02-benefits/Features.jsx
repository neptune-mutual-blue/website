import styled from 'styled-components'
import { typography } from '../../../../styles/typography'
import { FeaturedIcon } from '../../../components/FeaturedIcon'
import { features } from './data'

export const Features = () => {
  return (
    <Container>
      {features.map(feature => {
        return (
          <Feature key={feature.title}>
            <FeaturedIcon variant={feature.icon} size='lg' />
            <Title>{feature.title}</Title>
            <Content>{feature.content}</Content>
          </Feature>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 64px;
  display: flex;
  gap: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 48px;
    gap: 40px;
  }
`

const Feature = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Title = styled.h3`
  margin-top: 20px;
  color: ${props => props.theme.color};

  ${typography.styles.textXl}
  ${typography.weights.semibold}

  @media (max-width: 768px) {
    margin-top: 16px;
    ${typography.styles.textLg}
    ${typography.weights.semibold}
  }
`

const Content = styled.p`
  margin-top: 8px;
  color: ${props => props.theme.secondaryColor};

  ${typography.styles.textMd}
  ${typography.weights.regular}

  @media (max-width: 768px) {
    margin-top: 4px;
  }
`
