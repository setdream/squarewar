export default class Interval {
    constructor(min = 0, max = 0) {
        this.min = min;
        this.max = max;
    }

    isOverlap(interval) {
        return !(this.min > interval.max || interval.min > this.max);
    }

    getOverlap(interval) {
		if (this.isOverlap(interval)) {
			return Math.min(this.max, interval.max) - Math.max(this.min, interval.min);
		}
        
		return 0;
    }
}