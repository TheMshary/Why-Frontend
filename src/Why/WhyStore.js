import { extendObservable } from "mobx";

class myWhyStore {
	constructor() {
		extendObservable(this, {
				leaderboard: []
			}
		)
	}
}

export default new myWhyStore()