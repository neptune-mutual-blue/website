import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'

export const Hero = ({
  title = 'String to Bytes32 Converter Online',
  subtitle = 'Bytes32 format is used in smart contracts with specific length of 64 characters, most commonly using the solidity programming language.'
}) => {
  const { t } = useTranslation('web3')

  return (
    <Container>
      <InnerContainer>
        <Text>
          <Heading>{t(`${title}`)}</Heading>
          <Subtitle>{t(`${subtitle}`)}</Subtitle>
        </Text>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding-top: 96px;
  padding-bottom: 96px;
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['900']};

  @media (max-width: 768px) {
    padding-top: 64px;
    padding-bottom: 64px;
    gap: 32px;
  }
`

const InnerContainer = styled.div`
  ${utils.fullWidthContainer};
`

const Text = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  @media (max-width: 768px) {
    text-align: left;
  }
`

const Heading = styled.h1`
  margin-top: 12px;
  ${typography.styles.displayLg};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.displayMd};
    ${typography.weights.semibold};
  }
`

const Subtitle = styled.p`
  margin-top: 24px;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  color: ${(props) => props.theme.secondaryColor};
  ${typography.styles.textXl};
  ${typography.weights.regular};

  @media (max-width: 768px) {
    margin-top: 16px;
    ${typography.styles.textLg};
    ${typography.weights.regular};
  }
`
