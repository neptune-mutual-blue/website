import { useEffect, useState } from 'react'
import { getContract } from '../helpers/solidity/contract'
import { calculateGasMargin, getErrorMessage } from '../helpers/solidity/methods'
import { useWeb3React } from '@web3-react/core'

export const useContractCall = ({ abi, address }) => {
  const { library, account } = useWeb3React()
  const [contract, setContract] = useState(null)

  useEffect(() => {
    if (!abi || !address || !library?.getSigner || !account) {
      setContract(null)
      return
    }

    try {
      const _c = getContract(address, abi, library?.getSigner())
      setContract(_c)
    } catch (err) {
      console.log('Error in creating contract: ', err)
      setContract(null)
    }
  }, [abi, address, library, account])

  async function callMethod (methodName, args = []) {
    if (!contract || !methodName) return

    let methodArgs = [...args]
    let estimatedGas = null
    try {
      estimatedGas = await contract.estimateGas[methodName](...args)

      try {
        methodArgs = [...args, { gasLimit: calculateGasMargin(estimatedGas) }]

        const res = await contract[methodName](...methodArgs)
        return Array.isArray(res) ? Array.from(res) : [res]
      } catch (err) {
        console.log(`Error in calling ${methodName} function: ${err}`)
        return { error: getErrorMessage(err) }
      }
    } catch (e) {
      console.log(`Could not estimate gas for ${methodName}(${methodArgs})`)
      return { error: getErrorMessage(e) }
    }
  }

  return { callMethod, isReady: Boolean(contract) }
}
