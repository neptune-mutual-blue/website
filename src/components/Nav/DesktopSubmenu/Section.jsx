import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { NavMenuItemLink } from '../NavMenuItem/Link'

export const Section = ({ section }) => {
  if (!section.links) {
    return (
      <div>
        <Title>{section.title}</Title>
        <Content>
          hello
        </Content>
      </div>
    )
  }

  return (
    <div>
      <Title>{section.title}</Title>
      <Content>
        {section.links.map((link, idx) => {
          return (
            <NavMenuItemLink key={idx} item={link} />
          )
        })}
      </Content>
    </div>
  )
}

const Title = styled.h4`
  color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['600'] : colors[primaryColorKey]['500']};

  ${typography.styles.textSm};
  ${typography.weights.semibold};
`

const Content = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`