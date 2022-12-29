import { useState, useEffect, createContext, useContext } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { providerOptions } from '../helpers/wallet/providerOptions'
import { getAddressNumber, toHex } from '../helpers/wallet/methods'
import { networkParams } from '../helpers/wallet/networkParams'

const initialValue = {
  provider: null,
  account: null,
  network: null,
  chainId: null,
  error: null,
  connect: () => {},
  disconnect: () => {},
  switchNetwork: () => {}
}

const WalletContext = createContext(initialValue)

export function useWallet () {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error(
      'useWallet must be used within a WalletContextProvider'
    )
  }
  return context
}

// const web3Modal = new Web3Modal({
//   cacheProvider: true, // optional
//   providerOptions // required
// })

export const WalletContextProvider = ({ children }) => {
  const [provider, setProvider] = useState()
  const [library, setLibrary] = useState()
  const [account, setAccount] = useState()
  const [error, setError] = useState('')
  const [chainId, setChainId] = useState()
  const [network, setNetwork] = useState()

  const [web3Modal, setWeb3Modal] = useState({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const _web3modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions // required
      })
      setWeb3Modal(_web3modal)
    }
  }, [])

  const connectWallet = async () => {
    try {
      await web3Modal.setCachedProvider()
      const provider = await web3Modal.connect()
      const library = new ethers.providers.Web3Provider(provider)
      const accounts = await library.listAccounts()
      const network = await library.getNetwork()
      setProvider(provider)
      setLibrary(library)
      if (accounts) setAccount(accounts[0])

      const chId = getAddressNumber(network.chainId)
      setChainId(chId)
      setError('')
    } catch (error) {
      setError(error)
    }
  }

  const refreshState = () => {
    setAccount()
    setChainId()
    setNetwork('')
  }

  const disconnect = async () => {
    await web3Modal.clearCachedProvider()
    refreshState()
  }

  const switchNetwork = async (id) => {
    setNetwork(Number(id))
    try {
      await library.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: toHex(id) }]
      })
      setError('')
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: 'wallet_addEthereumChain',
            params: [networkParams[toHex(id)]]
          })
          setError('')
        } catch (error) {
          setError(error)
        }
      }
      setError(switchError)
    }
  }

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet()
    }
  }, [])

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log('accountsChanged', accounts)
        if (accounts) setAccount(accounts[0])
      }

      const handleChainChanged = (_hexChainId) => {
        const chId = getAddressNumber(_hexChainId)
        setChainId(chId)
        // connectWallet();
      }

      const handleDisconnect = () => {
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider])

  return (
    <WalletContext.Provider
      value={{
        provider: library,
        account,
        network,
        chainId,
        error,
        connect: connectWallet,
        disconnect,
        switchNetwork
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
