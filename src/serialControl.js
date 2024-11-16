const { ipcRenderer } = require('electron');
const fs = require('fs');
const { SerialPort, ReadlineParser } = require('serialport');
const path = require('path');

const connectButton = document.getElementById('connect-btn');
const comSelect = document.getElementById('serial-port');
const baudRateSelect = document.getElementById('baud-rate');

const sendZone = document.getElementById('send-text');
const sendButton = document.getElementById('send-btn');
const recvZone = document.getElementById('recv-text');
const saveButton = document.getElementById('save-btn');
const clearButton = document.getElementById('clear-btn');
const parser = new ReadlineParser();

let connectLabel = false;
let linkPort;

async function setComSelect() {
    await SerialPort.list().then((ports, err) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log('ports', ports);
        for (const item of ports) {
            const exist = Array.from(comSelect.options)
                .some(option => option.value === item.path);
            if (exist)
                continue;
            const option = document.createElement('option');
            option.value = item.path;
            option.text = item.path;
            comSelect.appendChild(option);
        }
    });
}

function listPorts() {
    setComSelect();
    setTimeout(listPorts, 2000);
}

// Set a timeout that will check for new serialPorts every 2 seconds.
setTimeout(listPorts, 2000);

setComSelect();

connectButton.addEventListener('click', () => {
    if (connectLabel) {
        // 如果已经连接，执行断开操作
        linkPort.close();
        connectLabel = false;
        connectButton.style.backgroundColor = '#FFFFFF';
        parser.removeAllListeners('data'); // 清除数据监听器
    } else {
        // 如果未连接，执行连接操作
        linkPort = new SerialPort({ path: comSelect.value, baudRate: parseInt(baudRateSelect.value) }, (err) => {
            if (err) {
                console.log('Error opening port:', err.message);
                return;
            }
            connectLabel = true;
            connectButton.style.backgroundColor = '#FFFFCC';
            linkPort.pipe(parser);

            parser.on('data', (data) => {
                const now = new Date();
                const timeString = now.toLocaleTimeString() + '.' + now.getMilliseconds().toString().padStart(3, '0');
                recvZone.value += `[${timeString}]RX:${data}`;
                recvZone.scrollTop = recvZone.scrollHeight;
            });
        });
    }
});

sendButton.addEventListener('click', async () => {
    if (!connectLabel || !sendZone || !recvZone) return;

    const textWaitSend = sendZone.value;

    try {
        await linkPort.write(textWaitSend);
        console.log('Send text: %s', textWaitSend);

        // 获取当前时间并格式化到毫秒
        const now = new Date();
        const timeString = now.toLocaleTimeString() + '.' + now.getMilliseconds().toString().padStart(3, '0');

        // 将消息追加到 recvZone
        recvZone.value += `[${timeString}]TX:${textWaitSend}\r\n`;

        // 自动滚动到最新的文字
        recvZone.scrollTop = recvZone.scrollHeight;
    } catch (error) {
        console.error('Error sending text:', error);
    }
});

clearButton.addEventListener('click', async () => {
    recvZone.value = '';
});

saveButton.addEventListener('click', async () => {
    const recvZoneValue = recvZone.value;
    ipcRenderer.invoke('save-file', recvZoneValue);
});


const serialDir = './log-file/serial-port-log';
if (!fs.existsSync(serialDir)) {
    fs.mkdirSync(serialDir, { recursive: true });
}

const maxRecvZoneLine = 100;
let savedRecvZibeData = false;
recvZone.addEventListener('input', () => {
    const lines = recvZone.value.split('\n');
    const lineCount = lines.length;
    if (lineCount > maxRecvZoneLine && !savedRecvZibeData) {
        savedRecvZibeData = true;
        ((content) => {
            const now = new Date();
            const fileName = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_` +
                `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}.txt`;
            const filePath = path.join(serialDir, fileName);
            fs.writeFile(filePath, content, 'utf-8', (err) => {
                if (err) {
                    console.error('error in save file:', err);
                }
            });
            savedRecvZibeData = ture;
        })(recvZone.value);
        recvZone.value = '';
    }
});

