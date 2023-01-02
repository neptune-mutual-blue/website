import { Popover } from '@headlessui/react'
import styled, { css } from 'styled-components'
import { useState, useEffect } from 'react'
import { Icon } from '../Icon'
import { truncateAddress } from '../../helpers/wallet/methods'
import { handleCopy } from '../../helpers'
import { chains } from '../../helpers/wallet/chains'
import { typography } from '../../../styles/typography'
import { colors, primaryColorKey } from '../../../styles/colors'
import { shadows } from '../../../styles/shadows'

import { useWeb3React } from '@web3-react/core'
import { Popup } from '../../lib/connect-wallet/Popup'
import useAuth from '../../lib/connect-wallet/hooks/useAuth'

export const ConnectWallet = () => {
  const [copied, setCopied] = useState()
  const [popupOpen, setPopupOpen] = useState(false)
  const { logout } = useAuth()
  const { account, chainId } = useWeb3React()

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }, [copied])

  const handleWalletButtonClick = () => {
    if (!account) {
      return setPopupOpen(true)
    }
    logout()
  }

  return (
    <>
      {
        !account
          ? (
            <ConnectButton onClick={handleWalletButtonClick}>
              <Icon variant='wallet-04' size={20} />
              <span>Connect Wallet</span>
            </ConnectButton>
            )
          : (
            <Container>
              {({ open }) => (
                <>
                  <DropdownButton>
                    <Icon variant='wallet-04' size={20} />
                    {truncateAddress(account)}
                    <Icon variant={open ? 'chevron-up' : 'chevron-down'} size={20} />
                  </DropdownButton>

                  <Panel>
                    <DetailsContainer>
                      <Details>
                        <div>
                          <TitleText1>Wallet</TitleText1>
                          <InfoTextContainer>
                            <span>{truncateAddress(account)}</span>
                            <CopyButton
                              onClick={() => {
                                handleCopy(account, () => setCopied(true))
                              }}
                              aria-label='Copy Address button'
                            >
                              <Icon variant={copied ? 'check' : 'copy-01'} size={16} />
                            </CopyButton>
                          </InfoTextContainer>
                        </div>

                        {
                          chains[chainId] && (
                            <div>
                              <TitleText2>Network</TitleText2>
                              <InfoTextContainer>
                                <span>{chains[chainId].name}</span>
                              </InfoTextContainer>
                            </div>
                          )
                        }
                      </Details>

                      <Disconnect onClick={handleWalletButtonClick}>
                        <Icon variant='log-out-01' size={16} />
                        <span>Disconnect Wallet</span>
                      </Disconnect>
                    </DetailsContainer>
                  </Panel>
                </>
              )}
            </Container>
            )
      }

      <Popup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
      />
    </>
  )
}

const Container = styled(Popover)`
  display: flex;
`

const ButtonStyle = css`
  ${typography.styles.textSm}
  ${typography.weights.semibold}

  cursor: pointer;
  background-color: ${colors[primaryColorKey][600]};
  color: ${colors.white};
  border-radius: 8px;
  padding: 8px 14px;
  display: flex;
  gap: 8px;
  align-items: center;
`

const ConnectButton = styled.button`
  ${ButtonStyle}
`

const DropdownButton = styled(Popover.Button)`
  ${ButtonStyle}
`

const Panel = styled(Popover.Panel)`
  position: relative;
`

const DetailsContainer = styled.div`
  border-radius: 8px;
  box-shadow: ${shadows.lg};
  ${typography.styles.textSm}
  background-color: ${props => props.theme.isLightMode ? colors.white : colors.gray[600]};

  position: absolute;
  right: 0px;
  min-width: 248px;
  top: 44px;
`

const Details = styled.div`
  padding: 12px 16px 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid ${props => props.theme.isLightMode ? colors.gray[200] : colors.gray[500]};
`

const TitleText1 = styled.p`
  ${typography.weights.semibold}
  color: ${props => props.theme.isLightMode ? colors.gray[700] : colors.white};

`

const InfoTextContainer = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    ${typography.weights.regular}
    color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[300]};
  }
  
  svg {
    color: ${props => props.theme.isLightMode ? colors.gray[500] : colors.gray[25]};
  }
`

const CopyButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
`

const TitleText2 = styled(TitleText1)`
  ${typography.weights.medium}
`

const Disconnect = styled.button`
  ${typography.weights.medium}
  cursor: pointer;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  color: ${props => props.theme.isLightMode ? colors.gray[700] : colors.gray[25]};
`
