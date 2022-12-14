import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../../../../styles/colors'
import { LocaleSelector } from '../../LocaleSelector'
import { ThemeSelector } from '../../ThemeSelector'
import { data } from '../data'
import { NavMenuItem } from './MenuItem'

export const MobileNavigation = ({ isMenuOpen }) => {
  const [isLocaleSelectorOpen, setIsLocaleSelectorOpen] = useState(false)

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      // Hide overflow
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [isMenuOpen])

  return (
    <Container isLocaleSelectorOpen={isLocaleSelectorOpen}>
      <Nav>
        <ActionsContainer>
          <LocaleSelector setIsLocaleSelectorOpen={setIsLocaleSelectorOpen} />
          <ThemeSelector />
        </ActionsContainer>
        {data.map((item, idx) => {
          return (
            <NavMenuItem key={idx} item={item} />
          )
        })}
      </Nav>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: var(--header-height);
  left: 0px;
  bottom: 0px;
  z-index: 1;
  width: 100%;
  overflow-x: ${props => props.isLocaleSelectorOpen ? 'visible' : 'hidden'};
  background-color: ${props => props.theme.primaryBackgroundColor};
  display: block;
  border-top: 1px solid ${(props) => props.theme.isLightMode ? colors.gray['100'] : colors.gray['700']};

  @media (max-width: 1023px) { 
    z-index: 2;
  }
`

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 16px 24px 16px;
  border-bottom: 1px solid ${(props) => props.theme.isLightMode ? colors.gray['100'] : colors.gray['700']};
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 24px 0px;
  gap: 8px;
`
