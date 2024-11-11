export function parseLog(log) {
    // 匹配时间部分和 JSON 部分的正则表达式
    const timeRegex = /^\[(\d{2}:\d{2}:\d{2}\.\d{3})\]RX:(\{.*\})$/;

    // 提取时间和 JSON 部分
    const match = log.match(timeRegex);
    let time = null;
    let jsonData = null;

    if (match) {
        time = match[1]; // 提取时间部分
        try {
            // 替换十六进制数值为十进制数值
            const jsonText = match[2].replace(/0x([0-9A-Fa-f]+)/g, (match, hex) => parseInt(hex, 16));
            jsonData = JSON.parse(jsonText); // 解析 JSON 部分
        } catch (error) {
            console.error('JSON解析错误:', error);
        }
    }
    return { time, jsonData };
}