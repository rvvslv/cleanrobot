/**
 * Created by mac on 6/28/25
 */

let robotMemory = {
    counter: 0
};

function nextStep({ x, y, cellIsDirty }) {
    if (cellIsDirty) return 'CLEAN';

    if (robotMemory.counter < 5) {
        robotMemory.counter++;
        return 'MOVE RIGHT';
    }

    return null;
}