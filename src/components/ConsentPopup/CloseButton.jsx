import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../styles/colors'
import { shadows } from '../../../styles/shadows'
import { Icon } from '../Icon'

export const CloseButton = (props) => {
  return (
    <Container {...props}>
      <Icon variant='x-close' size={24} />
    </Container>
  )
}

const Container = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['500'] : colors.gray['300']};
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['700']};
  cursor: pointer;

  :hover {
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['600'] : colors.gray['200']};
    background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['50'] : colors.gray['600']};
  }

  :focus,
    :active,
    :focus-visible {
    background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['50'] : colors.gray['700']};

    outline: none;
    box-shadow: ${shadows.xs},
      0px 0px 0px 4px ${(props) => props.theme.isLightMode ? colors[primaryColorKey]['100'] : colors[primaryColorKey]['700']};
    }
`
