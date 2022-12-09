import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { BlogSubscribe } from '../../../components/BlogSubscribe'

export const SignupNewsletter = () => {
  return (
    <Container>
      <InnerContainer>
        <Box>
          <ContentContainer>
            <Heading>Sign up for our newsletter</Heading>
            <Subtitle>Be the first to know about releases and industry news and insights.</Subtitle>
          </ContentContainer>

          <FormContainer>
            <BlogSubscribe />
          </FormContainer>

        </Box>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  gap: 40px;
  padding-top: 0;
  padding-bottom: 96px;

  @media (max-width: 768px) {
    padding-bottom: 64px;
    gap: 32px;
  }
`

const InnerContainer = styled.div`
  ${utils.fullWidthContainer};
`

const Box = styled.div`
  border-radius: 16px;
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['900']};

  padding-top: 64px;
  padding-bottom: 64px;
  padding-left: 64px;
  padding-right: 64px;

  @media (max-width: 768px) {
    padding-top: 40px;
    padding-bottom: 40px;
    padding-left: 24px;
    padding-right: 24px;
  }
`

const ContentContainer = styled.div`
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const Heading = styled.h1`
  ${typography.styles.displayMd};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.displaySm};
    ${typography.weights.semibold};
  }
`

const Subtitle = styled.p`
  margin-top: 20px;
  color: ${(props) => props.theme.secondaryColor};
  ${typography.styles.textXl};
  ${typography.weights.regular};

  @media (max-width: 768px) {
    margin-top: 16px;
    ${typography.styles.textLg};
    ${typography.weights.regular};
  }
`

const FormContainer = styled.div`
  margin-top: 40px;
`