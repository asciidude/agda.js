export default class Ratelimit {
    timestamp;
    current;
    constructor(limit, interval) {
        this.timestamp = Date.now(),
        this.current = 0,
        this.limit = limit,
        this.interval = interval
    }

    ready() {
        if (this.current < this.limit) {
            this.current++;
            return Promise.resolve();
        } else {
            this.current = 0;
            return new Promise((resolve) =>
                setTimeout(() => {
                    this.timestamp = Date.now();
                    this.current++;
                    resolve();
                }, this.interval - (Date.now() - this.timestamp))
            );
        }
    }
}