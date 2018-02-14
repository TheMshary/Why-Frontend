import { extendObservable } from "mobx";

class myWhyStore {
	constructor() {
		extendObservable(this, {
				leaderboard: [],
				open: false,
				score: null,
			}
		)
	}
}

export default new myWhyStore()