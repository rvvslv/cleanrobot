/**
 * Created by mac on 6/28/25
 */

class Robot {
    constructor() {
        this.memory = 0; // just a number
    }

    nextStep({ x, y, cellIsDirty }) {
        if (cellIsDirty) {
            return { action: 'CLEAN', say: "dirty!" };
        }

        if (this.memory === 0) {
            if (y === 0) {
                this.memory = 1;
                return { action: 'MOVE RIGHT' };
            }
            return { action: 'MOVE UP' };
        } else {
            if (y === 19) {
                this.memory = 0;
                return {action: 'MOVE RIGHT'}
            }
            return {action: 'MOVE DOWN'};
        }

        return { action: 'MOVE UP' };
    }
}

window.robotInstance = new Robot();