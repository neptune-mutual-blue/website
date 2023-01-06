import BigNumber from 'bignumber.js'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80
})

export const GAS_MARGIN_MULTIPLIER = 1.5

export const getErrorMessage = (_error) => {
  try {
    const error = _error.error || _error
    if (!error || !error.message) {
      return 'Unexpected Error Occurred'
    }

    if (error?.reason) return error.reason

    if (error?.data?.message) {
      return error.data.message.trim().replace('execution reverted: ', '')
    } else if (error?.data?.originalError?.message) {
      return error.data.originalError.message
        .trim()
        .replace('execution reverted: ', '')
    }

    return error.message.trim().replace('MetaMask Tx Signature: ', '')
  } catch (err) {
    return 'Something went wrong'
  }
}

export const calculateGasMargin = (value) => {
  return new BigNumber(value.toString())
    .multipliedBy(GAS_MARGIN_MULTIPLIER)
    .decimalPlaces(0)
    .toString()
}

export const encodeData = (encodeInterface, methodName, methodArgs = [], onError = () => {}) => {
  if (!encodeInterface || !methodName) return

  try {
    const encoded = encodeInterface.encodeFunctionData(methodName, methodArgs)
    return encoded
  } catch (err) {
    // console.log(`Error in encoding ${methodName}\n`, { methodArgs, err })
    onError(getErrorMessage(err))
  }
}

export const getFunctionSignature = (_function) => {
  const _isTuple = _function.inputs[0]?.type === 'tuple'
  const inputs = _function?.inputs?.[0]?.components || _function?.inputs

  const argsSignature = inputs.map(_inp => _inp.type).join(', ')
  const args = _isTuple ? `(${argsSignature})` : argsSignature
  return `${_function.name}(${args})`
}
