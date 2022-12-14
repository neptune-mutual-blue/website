import styled from 'styled-components'
import { colors } from '../../../../../styles/colors'
import { shadows } from '../../../../../styles/shadows'
import { Section as DesktopSection } from './Section'

export const Submenu = ({ item }) => {
  return (
    <Container>
      <LeftSpace />
      <Content>
        <NonVideoSections>
          {item.children.filter(x => x.type === 'section').map((child, idx) => {
            return (
              <DesktopSection key={idx} section={child} />
            )
          })}
        </NonVideoSections>
        <VideoSections>
          {item.children.filter(x => x.type !== 'section').map((child, idx) => {
            return (
              <DesktopSection key={idx} section={child} />
            )
          })}
        </VideoSections>
      </Content>
      <RightSpace />
    </Container>
  )
}

const Container = styled.div`
  --left-bg: ${props => props.theme.primaryBackgroundColor};
  --right-bg: ${props => props.theme.isLightMode ? colors.gray['50'] : colors.gray['900']};
  position: fixed;
  top: var(--header-height);
  left: 0px;
  max-height: 80vh;
  z-index: 1;
  width: 100%;
  overflow-x: hidden;
  background-color: ${props => props.theme.primaryBackgroundColor};
  display: flex;
  border-top: 1px solid ${(props) => props.theme.isLightMode ? colors.gray['100'] : colors.gray['700']};
  box-shadow: ${props => props.theme.isLightMode ? shadows.lg : shadows['2xl']};
`

const Content = styled.div`
  flex: 1 1 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: wrap;
`

const LeftSpace = styled.div`
  flex: 1;
  background-color: var(--left-bg);
`

const RightSpace = styled.div`
  flex: 1;
  background-color: var(--right-bg);
`

const NonVideoSections = styled.div`
  padding: 32px;
  display: flex;
  gap: 24px;
  flex: 2;
`

const VideoSections = styled.div`
  padding: 32px;
  padding-left: 20px;
  background-color: var(--right-bg);
  flex: 1;
  min-width: 560px;
`
