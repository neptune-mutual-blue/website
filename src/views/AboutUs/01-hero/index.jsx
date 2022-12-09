import styled from 'styled-components'

import { useTranslation } from 'react-i18next'

import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import PlayIcon from '../../../components/Icon/custom/PlayIcon'

import { useVideosContext } from '../../../context/VideosContext'
import { shadows } from '../../../../styles/shadows'
import { blurs } from '../../../../styles/blurs'
const YoutubeId = 'GeqjuV1u4UI'

const Hero = () => {
  const { t } = useTranslation('about')
  const { setId } = useVideosContext()

  return (
    <Container>
      <InnerContainer>
        <Content>
          <H1>
            <Subheader>{t('HEADER_TAG')}</Subheader>
            <HeaderTitle>{t('HEADER_TITLE')}</HeaderTitle>
          </H1>
          <HeaderContent>
            {t('HEADER_TEXT')}
          </HeaderContent>
          <VideoContainer onClick={() => { setId(YoutubeId) }}>
            <img alt='' src='/assets/images/hero/reduce-exposure.webp' />
            <Overlay>
              <PlayIcon />
            </Overlay>
          </VideoContainer>
        </Content>
      </InnerContainer>
    </Container>
  )
}

const H1 = styled.h1``

const Container = styled.div`
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['900']};
`

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 56px;
  padding-bottom: 255px;

  ${utils.fullWidthContainer};

  @media (max-width: 768px) {
    padding-top: 64px;
    padding-bottom: 64px;
    align-items: stretch;
  }
`

const Content = styled.div`
  text-align: center;
`

const Subheader = styled.span`
  color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['700'] : colors[primaryColorKey]['500']};
  ${typography.weights.semibold}
  ${typography.styles.textMd}
  margin-bottom: 12px;
  display: block;
`
const HeaderTitle = styled.div`
  color: ${props => props.theme.color};
  margin-bottom: 24px;
  ${typography.styles.displayLg}
  ${typography.weights.semibold}


  @media (max-width: 768px) {
    ${typography.styles.displayMd};
  }
`

const HeaderContent = styled.p`
  max-width: 768px;
  color: ${props => props.theme.secondaryColor};
  ${typography.styles.textXl}
  ${typography.weights.regular}
`

const Overlay = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: ${colors.white};
  fill-opacity: 0.3;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 72px;
    height: 72px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.3);
    fill-opacity: 0.5;
  }
`

const VideoContainer = styled.button`
  width: 887px;
  height: 499px;
  
  position: absolute;
  margin: 0 auto;
  
  top: 292px;
  left: 0;
  right: 0;

  border-radius: 10px;
  overflow: hidden;
  box-shadow: ${shadows.xl};
  backdrop-filter: ${blurs.md};

  img {
    width: 887px;
    height: 499px;
  }

  @media (max-width: 887px) {
    top: 320px;
    width: auto;
    height: auto;
    
    img {
      width: auto;
      height: auto;
    }
  }
`

export { Hero }