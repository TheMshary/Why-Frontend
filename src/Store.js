import { extendObservable } from "mobx";

class myStore {
	constructor() {
		extendObservable(this, {
				sequence: 0,			// Core currency

				click: 1,				// Increase per click
				clickUpgrade: 1,		// Increase per click multiplier
				clickUpgradeCost: 700,	// SPC multiplier upgrade cost
				cost: 40,				// Per click upgrade cost

				SPS: 0,					// Current Sequence per second
				SPSupgrade: 1,			// Current Sequence per second multiplier
				SPSupgradeCost: 500,	// SPS multiplier upgrade cost
				SPScost: 100,			// Per second upgrade cost

				error: "Click away!",	// Error message
			}
		)
	}
}

export default new myStore()