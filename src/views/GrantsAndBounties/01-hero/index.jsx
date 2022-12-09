import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'

export const Hero = () => {
  return (
    <Container>
      <InnerContainer>
        <div>
          <Heading>Grants and Bounties</Heading>
          <SubHeading>
            Join the Neptunite community and contribute to our goal of defending, safeguarding, and covering DeFi, CeFi, and Metaverse ecosystem against exploitation, hacking, and other forms of online attacks. We strive to strengthen and expand our community outreach and exposure via our community programs. The Neptune Mutual team will promote and reward users that participate in and contribute to the development of the protocol via the various community activities that are presently taking place. Partners that provide value and increase adoption and usage of Neptune Mutual will be handsomely compensated for their efforts.
          </SubHeading>
        </div>

        <ImageContainer>
          <img src='/assets/images/hero/grants-hero.webp' alt='Grants and Bounties hero image' />
        </ImageContainer>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 96px;
  padding-bottom: 96px;
  
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey][25] : colors.gray[900]};
  `

const InnerContainer = styled.div`
  ${utils.fullWidthContainer}

  display: flex;
  gap: 40px;
`

const Heading = styled.div`
  ${typography.styles.displayLg}
  ${typography.weights.semibold}
  `

const SubHeading = styled.div`
  ${typography.styles.textXl}
  ${typography.weights.regular}

  margin-top: 24px;
  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[25]};
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 46px;

  img {
    min-height: 315px;
    min-width: 315px;
    aspect-ratio: 1;
  }
`