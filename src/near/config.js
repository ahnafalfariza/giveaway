const CONTRACT_NAME = 'dev-1607575308438-4798890'

function getConfig(env) {
	return {
		networkId: 'testnet',
		nodeUrl: 'https://rpc.testnet.near.org',
		contractName: CONTRACT_NAME,
		walletUrl: 'https://wallet.testnet.near.org',
		helperUrl: 'https://helper.testnet.near.org',
		explorerUrl: 'https://explorer.testnet.near.org',
	}
}

module.exports = getConfig
