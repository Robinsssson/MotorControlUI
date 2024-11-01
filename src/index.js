// import { listSerialPorts } from "./serialControl";

const buttonPitch = document.getElementById('pitch-btn');
const buttonRoll = document.getElementById('roll-btn');
const buttonYaw = document.getElementById('yaw-btn');
const buttonConnect = document.getElementById('connect-btn');


let objMainFrame = {
    stateConnect: false,
    axisStateArray: [
        false, false, false
    ],
    recvFileSavePath: "~/Download/",

    motor1: {
        id: 0x141,
        speed_pid_param: [],
    },

    motor2: {
        id: 0x142,
        speed_pid_param: [],
    }
};

function changeButtonState(item, index) {
    return () => {
        console.log('button ' + item.id + ' clicked!');
        objMainFrame.axisStateArray[index] = !objMainFrame.axisStateArray[index];
        if (objMainFrame.axisStateArray[index]) {
            item.style.backgroundColor = '#FFFFCC';
        } else {
            item.style.backgroundColor = '#FFFFFF';
        }
    };
}

// add event to button in chart zone
buttonPitch.addEventListener('click', changeButtonState(buttonPitch, 0));
buttonRoll.addEventListener('click', changeButtonState(buttonRoll, 1));
buttonYaw.addEventListener('click', changeButtonState(buttonYaw, 2));


