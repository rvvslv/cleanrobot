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

        if (this.memory < 5) {
            this.memory++;
            return { action: 'MOVE RIGHT' };
        }

        return null;
    }
}

window.robotInstance = new Robot();