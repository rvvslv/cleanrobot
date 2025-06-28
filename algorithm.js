/**
 * Created by mac on 6/28/25
 */

class Robot {
    constructor() {
        this.memory = { counter: 0 };
    }

    nextStep({ x, y, cellIsDirty }) {
        if (cellIsDirty) {
            return { action: 'CLEAN', say: "dirty!" };
        }

        if (this.memory.counter < 5) {
            this.memory.counter++;
            return { action: 'MOVE RIGHT' };
        }

        return { say: "done!" };

        return null;
    }
}

window.robotInstance = new Robot();