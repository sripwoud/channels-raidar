export const capitalize = s => s[0].toUpperCase() + s.slice(1)

export function getEtherscanLink(data, type) {
  const prefix = 'https://goerli.etherscan.io/'

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'event':
      return `${prefix}/tx/${data}#eventlog`
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address, chars = 4) {
  return `${address.substring(0, chars + 2)}..${address.substring(42 - chars)}`
}

export function friendlyAmountFormat(amount, decimals = 3) {
  return parseFloat(+amount * Math.pow(10, -18)).toFixed(decimals)
}
