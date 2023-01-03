import styled from 'styled-components'
import { colors } from '../../../styles/colors'
import { typography } from '../../../styles/typography'

export const Disclaimer = () => {
  return (
    <P>
      By connecting a wallet, you agree to Neptune Mutual
      {' '}
      <StyledLink
        href='https://docs.neptunemutual.com/usage/terms-of-use'
        target='_blank'
      >
        Terms &amp; Conditions
      </StyledLink>
      {' '}
      and acknowledge that you have read and understand the Neptune Mutual
      {' '}
      <StyledLink
        href='https://docs.neptunemutual.com/usage/disclaimer'
        target='_blank'
      >
        Protocol Disclaimer
      </StyledLink>
      .
    </P>
  )
}

const P = styled.p`
  ${typography.styles.textSm};
  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.white};
  margin-top: 4px;
`

const StyledLink = styled.a`
  text-decoration: underline;
  color: inherit;
  
  &:hover {
    color: ${colors.blue[700]};
  }
`
