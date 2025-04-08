// 音效播放功能

// 创建音频对象
const salaryAudio = new Audio('9101.wav');

// 设置音量
salaryAudio.volume = 0.5;

// 播放金额提示音效函数
function playSalarySound() {
    // 尝试播放音效
    salaryAudio.play().catch(error => {
        console.error('音频播放失败:', error);
    });
}

// 导出函数供其他文件使用
window.playSalarySound = playSalarySound;