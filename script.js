// 时钟初始化和更新函数
function initClock() {
    // 获取时钟元素
    const clockFace = document.getElementById('clock-face');
    
    // 创建数字时钟显示
    function createDigitalClock() {
        // 清空时钟面板
        clockFace.innerHTML = '';
        
        // 创建小时显示
        const hoursElement = document.createElement('div');
        hoursElement.className = 'hour-text';
        hoursElement.id = 'clock-hours';
        
        // 创建分隔符
        const separatorElement1 = document.createElement('div');
        separatorElement1.className = 'time-separator';
        separatorElement1.textContent = ':';
        
        // 创建分钟显示
        const minutesElement = document.createElement('div');
        minutesElement.className = 'hour-text';
        minutesElement.id = 'clock-minutes';
        
        // 创建分隔符
        const separatorElement2 = document.createElement('div');
        separatorElement2.className = 'time-separator';
        separatorElement2.textContent = ':';
        
        // 创建秒钟显示
        const secondsElement = document.createElement('div');
        secondsElement.className = 'hour-text';
        secondsElement.id = 'clock-seconds';
        
        // 添加到时钟面板
        clockFace.appendChild(hoursElement);
        clockFace.appendChild(separatorElement1);
        clockFace.appendChild(minutesElement);
        clockFace.appendChild(separatorElement2);
        clockFace.appendChild(secondsElement);
    }
    
    // 创建数字时钟
    createDigitalClock();
    
    // 更新数字时钟
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        // 更新时钟显示
        document.getElementById('clock-hours').textContent = hours;
        document.getElementById('clock-minutes').textContent = minutes;
        document.getElementById('clock-seconds').textContent = seconds;
    }
    
    // 立即更新一次时钟
    updateClock();
    
    // 设置每秒更新一次时钟
    setInterval(updateClock, 1000);
}

// 创建数字滚动动画函数
function createDigitAnimation(value, containerId) {
    // 获取数字容器
    const digitContainer = document.getElementById(containerId);
    
    // 清空数字容器
    digitContainer.innerHTML = '';
    
    // 将数字转换为字符串并分割
    const digits = value.toString().split('');
    
    // 为每个数字创建一个数字列
    digits.forEach(function(digit) {
        // 创建数字列容器
        const digitColumn = document.createElement('div');
        digitColumn.className = 'digit-column';
        
        // 如果是小数点，直接显示
        if (digit === '.') {
            const digitElement = document.createElement('div');
            digitElement.className = 'digit';
            digitElement.textContent = '.';
            digitElement.style.transform = 'translateY(0)';
            digitColumn.appendChild(digitElement);
        } else {
            // 为0-9的每个数字创建元素
            for (let i = 0; i <= 9; i++) {
                const digitElement = document.createElement('div');
                digitElement.className = 'digit';
                digitElement.textContent = i;
                digitElement.style.transform = `translateY(${(i - parseInt(digit)) * 40}px)`;
                digitColumn.appendChild(digitElement);
            }
        }
        
        // 将数字列添加到容器
        digitContainer.appendChild(digitColumn);
    });
}

// 全局变量
let counterCount = 0;
let countersContainer;

// 创建新计数器函数
function createNewCounter(monthlySalary) {
    // 生成唯一ID
    const counterId = 'counter-' + counterCount++;
    
    // 获取开始时间
    const startTimeInput = document.getElementById('start-time');
    let startTime;
    
    // 如果用户选择了开始时间，使用选择的时间；否则使用当前时间
    if (startTimeInput.value) {
        // 解析用户选择的时间
        const [hours, minutes] = startTimeInput.value.split(':').map(Number);
        startTime = new Date();
        startTime.setHours(hours, minutes, 0, 0);
        
        // 如果选择的时间晚于当前时间，假设是前一天的时间
        if (startTime > new Date()) {
            startTime.setDate(startTime.getDate() - 1);
        }
    } else {
        // 如果没有选择时间，使用当前时间
        startTime = new Date();
    }
    
    // 计算每秒工资
    // 基于每月工作日21.75天，每天工作8小时
    const workDaysPerMonth = 21.75;
    const workHoursPerDay = 8;
    const secondsPerMonth = workDaysPerMonth * workHoursPerDay * 60 * 60;
    const salaryPerSecond = monthlySalary / secondsPerMonth;
    
    // 格式化每秒工资，保留6位小数
    const formattedSalary = salaryPerSecond.toFixed(6);

    // 格式化开始时间显示
    const formattedStartTime = startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // 创建计数器的HTML结构
    const counterHTML = `
        <div class="counter" id="${counterId}">
            <div class="result-container">
                <div class="counter-header">
                    <h2>月工资 ¥${monthlySalary} 的今日累计收入（从 ${formattedStartTime} 开始）：</h2>
                    <button class="delete-btn" data-counter-id="${counterId}">删除</button>
                </div>
                <div class="salary-display">
                    <span class="currency">¥</span>
                    <div class="digit-container" id="digit-container-${counterId}">
                        <!-- 数字将通过JavaScript动态生成 -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 添加计数器到容器
    countersContainer.insertAdjacentHTML('beforeend', counterHTML);
    
    // 为新添加的删除按钮添加事件监听
    const deleteBtn = document.querySelector(`#${counterId} .delete-btn`);
    deleteBtn.addEventListener('click', function() {
        // 停止计时器
        if (window.timers && window.timers[counterId]) {
            clearInterval(window.timers[counterId]);
            delete window.timers[counterId];
        }
        
        // 停止工作时长更新计时器
        if (window.workTimeIntervals && window.workTimeIntervals[counterId]) {
            clearInterval(window.workTimeIntervals[counterId]);
            delete window.workTimeIntervals[counterId];
        }
        document.getElementById(counterId).remove();
    });
    
    // 计算初始累计金额（从开始时间到现在的工资）
    const now = new Date();
    const elapsedSeconds = Math.floor((now - startTime) / 1000);
    let accumulatedAmount = parseFloat(salaryPerSecond) * Math.max(0, elapsedSeconds);
    
    // 确保全局timers对象存在
    if (!window.timers) {
        window.timers = {};
    }
    
    // 创建计时器，每秒更新一次累计金额
    window.timers[counterId] = setInterval(function() {
        accumulatedAmount += parseFloat(salaryPerSecond);
        // 格式化累计金额，保留2位小数
        const formattedAmount = accumulatedAmount.toFixed(2);
        // 更新数字动画
        createDigitAnimation(formattedAmount, `digit-container-${counterId}`);
    }, 1000);
    
    // 初始显示从开始时间到现在的累计金额
    createDigitAnimation(accumulatedAmount.toFixed(2), `digit-container-${counterId}`);
    
    // 如果初始累计金额大于0，立即播放一次音效
    if (accumulatedAmount > 0 && window.playSalarySound) {
        window.playSalarySound();
    }
    
    // 在计数器下方显示开始计算的时间和工作时长
    const timeInfoElement = document.createElement('p');
    timeInfoElement.className = 'info';
    timeInfoElement.id = `time-info-${counterId}`;
    timeInfoElement.textContent = `从 ${formattedStartTime} 开始计算`;
    document.querySelector(`#${counterId} .result-container`).appendChild(timeInfoElement);
    
    // 创建工作时长显示元素
    const workTimeElement = document.createElement('p');
    workTimeElement.className = 'info work-time';
    workTimeElement.id = `work-time-${counterId}`;
    document.querySelector(`#${counterId} .result-container`).appendChild(workTimeElement);
    
    // 更新工作时长的函数
    function updateWorkTime() {
        const now = new Date();
        const elapsedMs = now - startTime;
        const elapsedHours = Math.floor(elapsedMs / (1000 * 60 * 60));
        const elapsedMinutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
        workTimeElement.textContent = `目前已工作 ${elapsedHours} 小时 ${elapsedMinutes} 分钟`;
    }
    
    // 初始更新工作时长
    updateWorkTime();
    
    // 每分钟更新一次工作时长并播放金额提示音
    // 确保全局workTimeIntervals对象存在
    if (!window.workTimeIntervals) {
        window.workTimeIntervals = {};
    }
    // 存储工作时长计时器引用
    window.workTimeIntervals[counterId] = setInterval(function() {
        updateWorkTime();
        // 每分钟播放一次金额提示音
        if (window.playSalarySound) {
            window.playSalarySound();
        }
    }, 60000);
}

// 当DOM内容加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化时钟
    initClock();
    
    // 获取DOM元素
    const monthlySalaryInput = document.getElementById('monthly-salary');
    const calculateBtn = document.getElementById('calculate-btn');
    countersContainer = document.getElementById('counters-container');
    
    // 重置计数器ID计数
    counterCount = 0;
    
    // 添加按钮点击事件
    calculateBtn.addEventListener('click', function() {
        // 获取月工资输入值
        const monthlySalary = parseFloat(monthlySalaryInput.value);
        
        // 验证输入
        if (isNaN(monthlySalary) || monthlySalary <= 0) {
            alert('请输入有效的月工资金额');
            return;
        }
        
        // 创建新的计数器
        createNewCounter(monthlySalary);
        
        // 清空输入框，方便添加新的计数器
        monthlySalaryInput.value = '';
    });
});