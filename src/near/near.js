import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

// Initialize contract & set global variables
export async function initContract() {
	// Initialize connection to the NEAR testnet
	const near = await connect(
		Object.assign(
			{ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
			nearConfig
		)
	)

	// Initializing Wallet based Account. It can work with NEAR testnet wallet that
	// is hosted at https://wallet.testnet.near.org
	window.walletConnection = new WalletConnection(near)

	// Getting the Account ID. If still unauthorized, it's just empty string
	window.accountId = window.walletConnection.getAccountId()

	window.account = window.walletConnection.account()

	// Initializing our contract APIs by contract name and configuration
	window.contract = await new Contract(
		window.account,
		nearConfig.contractName,
		{
			// View methods are read only. They don't modify the state, but usually return some value.
			viewMethods: [
				'getGiveaway',
				'getWinners',
				'getParticipants',
			],
		}
	)
}

export function contractGetGiveaway(params) {
	return window.contract.getGiveaway(params)
}

export function contractGetWinners(params) {
	return window.contract.getWinners(params)
}

export function contractGetParticipants(params) {
	return window.contract.getParticipants(params)
}
