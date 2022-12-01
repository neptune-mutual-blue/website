import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { BlogSubscribe } from '../../../components/BlogSubscribe'

export const Hero = () => {
  return (
    <Container>
      <InnerContainer>
        <Text>
          <Heading>Neptune Mutual Blog</Heading>
          <Subheading>Learn about the most recent developments in the decentralized insurance space.</Subheading>
          <Subtitle>The blog is the go-to location for learning about web3 and smart contract vulnerabilities, decentralized insurance, security best practices, and industry news. Enter your address to get weekly updates.</Subtitle>
        </Text>

        <FormContainer>
          <BlogSubscribe />
        </FormContainer>

      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding-top: 64px;
  padding-bottom: 96px;
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['900']};

  @media (max-width: 768px) {
    padding-top: 64px;
    padding-bottom: 64px;
    gap: 32px;
  }
`

const InnerContainer = styled.div`
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
`

const Text = styled.div`
  text-align: center;
`

const Heading = styled.h1`
  ${typography.styles.displayLg};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.displayMd};
    ${typography.weights.semibold};
  }
`
const Subheading = styled.p`
margin-top: 12px;
  color: ${(props) => props.theme.isLightMode ? colors[primaryColorKey]['700'] : colors[primaryColorKey]['500']};

  ${typography.styles.textMd};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.textSm};
  }
`

const Subtitle = styled.p`
  margin-top: 24px;
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