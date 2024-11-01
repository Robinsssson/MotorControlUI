const LANGUAGES = {
    EN: {
        'app-name': 'MotorControlUI',
        'send-zone-label': 'Send Zone',
        'connect-btn': 'Connect',
        'profile-label': 'Profile',
        'send-btn': 'Send',
        'recv-zone-label': 'Recv Zone',
        'clear-btn': 'Clear',
        'save-btn': 'Save',
        'motor-control-p': 'Motor Control',

        'serial-port-text': 'Serial Port Control',
        'motor1-id-p': 'Motor 1 ID',
        'motor1-speed-pid-param-p': 'Speed PID Param',
        'motor1-position-pid-param-p': 'Position PID Param',
        'motor1-motor-state-p': 'Motor State',

        'motor2-id-p': 'Motor 2 ID',
        'motor2-speed-pid-param-p': 'Speed PID Param',
        'motor2-position-pid-param-p': 'Position PID Param',
        'motor2-motor-state-p': 'Motor State',

        'chart-view-p': 'Chart View',
        'chart-zone-p': 'Chart Zone',

        'pitch-btn': 'Pitch',
        'roll-btn': 'Roll',
        'yaw-btn': 'Yaw',
    },
    CN: {
        'app-name': '电机控制软件',

        'serial-port-text': '串口控制',
        'send-zone-label': '发送区',
        'connect-btn': '连接',
        'profile-label': '配置',
        'clear-btn': '清空',
        'send-btn': '发送',
        'recv-zone-label': '接收区',
        'save-btn': '保存',
        'motor-control-p': '电机控制',

        'motor1-id-p': '一号电机 ID',
        'motor1-speed-pid-param-p': '速度PID参数',
        'motor1-position-pid-param-p': '位置PID参数',
        'motor1-motor-state-p': '电机状态',

        'motor2-id-p': '二号电机 ID',
        'motor2-speed-pid-param-p': '速度PID参数',
        'motor2-position-pid-param-p': '位置PID参数',
        'motor2-motor-state-p': '电机状态',

        'chart-view-p': '图表展示',
        'chart-zone-p': '图表区',

        'pitch-btn': '俯仰角',
        'roll-btn': '横滚角',
        'yaw-btn': '偏转角',
    }
};

function setLanguage(lang) {
    const selectedLang = LANGUAGES[lang.toUpperCase()];

    if (selectedLang) {
        for (const key in selectedLang) {
            const element = document.getElementById(key);
            if (element) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.value = selectedLang[key]; // 设置输入框或文本区域的值
                } else {
                    element.textContent = selectedLang[key]; // 设置标签和按钮的文本
                }
            }
        }
        document.title = selectedLang['app-name']; // 使用正确的键
    } else {
        console.warn('Unsupported language type:', lang);
    }
}



// 设置为中文
setLanguage('en');
