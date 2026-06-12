// 台灣城市天氣預報查詢系統 - JavaScript 邏輯

// ==========================================
// 1. 系統常數與 API 金鑰設定
// ==========================================
const API_KEY = '39596c73782eacaa1293839dfd69a243';

// 台灣 22 縣市經緯度及精選 Unsplash 背景圖
const CITIES = [
    { name: '台北市', lat: 25.0330, lon: 121.5654, enName: 'Taipei', bgUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80' },
    { name: '新北市', lat: 25.0120, lon: 121.4657, enName: 'New Taipei', bgUrl: 'https://images.unsplash.com/photo-1552912441-df1395c300ea?auto=format&fit=crop&w=1600&q=80' },
    { name: '基隆市', lat: 25.1283, lon: 121.7419, enName: 'Keelung', bgUrl: 'https://images.unsplash.com/photo-1571401888144-1273f5509cca?auto=format&fit=crop&w=1600&q=80' },
    { name: '桃園市', lat: 24.9937, lon: 121.3010, enName: 'Taoyuan', bgUrl: 'https://images.unsplash.com/photo-1628876404764-a6c31bf06416?auto=format&fit=crop&w=1600&q=80' },
    { name: '新竹市', lat: 24.8138, lon: 120.9675, enName: 'Hsinchu City', bgUrl: 'https://images.unsplash.com/photo-1612255745491-f81d11ca726f?auto=format&fit=crop&w=1600&q=80' },
    { name: '新竹縣', lat: 24.8273, lon: 121.0136, enName: 'Hsinchu County', bgUrl: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?auto=format&fit=crop&w=1600&q=80' },
    { name: '苗栗縣', lat: 24.5649, lon: 120.8208, enName: 'Miaoli', bgUrl: 'https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=1600&q=80' },
    { name: '台中市', lat: 24.1477, lon: 120.6736, enName: 'Taichung', bgUrl: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=1600&q=80' },
    { name: '彰化縣', lat: 24.0817, lon: 120.5385, enName: 'Changhua', bgUrl: 'https://images.unsplash.com/photo-1584467541268-b029fb34de4e?auto=format&fit=crop&w=1600&q=80' },
    { name: '南投縣', lat: 23.9181, lon: 120.6961, enName: 'Nantou', bgUrl: 'https://images.unsplash.com/photo-1571872589332-901d81dc59c4?auto=format&fit=crop&w=1600&q=80' },
    { name: '雲林縣', lat: 23.7092, lon: 120.4313, enName: 'Yunlin', bgUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1600&q=80' },
    { name: '嘉義市', lat: 23.4801, lon: 120.4491, enName: 'Chiayi City', bgUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=80' },
    { name: '嘉義縣', lat: 23.4518, lon: 120.2555, enName: 'Chiayi County', bgUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80' },
    { name: '台南市', lat: 22.9997, lon: 120.2270, enName: 'Tainan', bgUrl: 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&w=1600&q=80' },
    { name: '高雄市', lat: 22.6273, lon: 120.3014, enName: 'Kaohsiung', bgUrl: 'https://images.unsplash.com/photo-1616428787019-3bfb73a5a73e?auto=format&fit=crop&w=1600&q=80' },
    { name: '屏東縣', lat: 22.6654, lon: 120.4856, enName: 'Pingtung', bgUrl: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1600&q=80' },
    { name: '宜蘭縣', lat: 24.7570, lon: 121.7530, enName: 'Yilan', bgUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80' },
    { name: '花蓮縣', lat: 23.9872, lon: 121.6016, enName: 'Hualien', bgUrl: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1600&q=80' },
    { name: '台東縣', lat: 22.7972, lon: 121.0772, enName: 'Taitung', bgUrl: 'https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&w=1600&q=80' },
    { name: '澎湖縣', lat: 23.5711, lon: 119.5793, enName: 'Penghu', bgUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80' },
    { name: '金門縣', lat: 24.4483, lon: 118.3789, enName: 'Kinmen', bgUrl: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=1600&q=80' },
    { name: '連江縣', lat: 26.1519, lon: 119.9392, enName: 'Matsu', bgUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80' }
];

// 全域快取與變數
let clockIntervalId = null;
let currentForecastData = null;

// ==========================================
// 2. DOM 元素選取
// ==========================================
const bgWrapper = document.getElementById('bg-wrapper');
const citySelect = document.getElementById('city-select');
const themeButtons = document.querySelectorAll('.theme-btn');
const updateTimestamp = document.getElementById('update-timestamp');

// 即時天氣元件
const currentCity = document.getElementById('current-city');
const currentTime = document.getElementById('current-time');
const weatherBadgeText = document.getElementById('weather-badge-text');
const currentTemp = document.getElementById('current-temp');
const weatherIconPlaceholder = document.getElementById('weather-icon-placeholder');
const tempMax = document.getElementById('temp-max');
const tempMin = document.getElementById('temp-min');

// 詳細指標元件
const metricHumidity = document.getElementById('metric-humidity');
const metricWind = document.getElementById('metric-wind');
const metricFeelsLike = document.getElementById('metric-feels-like');
const metricPressure = document.getElementById('metric-pressure');
const metricSunrise = document.getElementById('metric-sunrise');
const metricSunset = document.getElementById('metric-sunset');

// 預報與圖表元件
const forecastContainer = document.getElementById('forecast-container');
const trendSvg = document.getElementById('trend-svg');

// ==========================================
// 3. 初始化程序
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initCities();
    initTheme();
    setupEventListeners();
    
    // 預設載入「台北市」天氣
    fetchWeatherData(CITIES[0]);
});

// 初始化城市選單
function initCities() {
    CITIES.forEach((city, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
}

// 初始化主題
function initTheme() {
    const savedTheme = localStorage.getItem('weather-theme') || 'system';
    setTheme(savedTheme);
}

// 事件監聽設定
function setupEventListeners() {
    // 城市切換
    citySelect.addEventListener('change', (e) => {
        const cityIndex = e.target.value;
        const selectedCity = CITIES[cityIndex];
        fetchWeatherData(selectedCity);
    });

    // 主題按鈕點擊
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            setTheme(theme);
        });
    });

    // 系統主題變更時，若設定為 system，則需重新繪製 SVG (因顏色可能會變)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (document.body.classList.contains('theme-system')) {
            if (currentForecastData) {
                drawTrendChart(currentForecastData);
            }
        }
    });

    // 支援視窗大小調整時重新繪製折線圖
    window.addEventListener('resize', () => {
        if (currentForecastData) {
            // 利用 debounce 以免過度消耗效能
            clearTimeout(window.resizeTimer);
            window.resizeTimer = setTimeout(() => {
                drawTrendChart(currentForecastData);
            }, 250);
        }
    });
}

// ==========================================
// 4. 主題設定邏輯
// ==========================================
function setTheme(theme) {
    // 移除所有主題 class
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-system');
    
    // 設定當前主題 class
    document.body.classList.add(`theme-${theme}`);
    
    // 啟用對應按鈕 active 樣式
    themeButtons.forEach(btn => {
        if (btn.getAttribute('data-theme') === theme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 儲存至本地
    localStorage.setItem('weather-theme', theme);
    
    // 重新渲染 SVG 圖表
    if (currentForecastData) {
        drawTrendChart(currentForecastData);
    }
}

// ==========================================
// 5. 資料獲取與 API 串接
// ==========================================
async function fetchWeatherData(city) {
    // 1. 更換背景圖，附帶流暢轉場
    changeBackground(city.bgUrl);
    
    // 2. 顯示 Skeleton 及載入狀態
    showLoadingSkeletons();

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=zh_tw`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=zh_tw`;

    try {
        // 並行請求即時天氣與五天預報
        const [currentRes, forecastRes] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentRes.ok || !forecastRes.ok) {
            throw new Error('氣象資料獲取失敗，請確認 API Key 是否有效。');
        }

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        // 更新即時天氣 UI
        updateCurrentWeatherUI(city.name, currentData);
        
        // 解析並更新五天預報 UI
        const processedForecast = processForecastData(forecastData.list);
        currentForecastData = processedForecast; // 快取下來供 resize 時重新整理
        updateForecastUI(processedForecast);
        
        // 繪製氣溫趨勢圖
        drawTrendChart(processedForecast);

    } catch (error) {
        console.error(error);
        alert(`無法載入天氣資訊: ${error.message}`);
    }
}

// 切換背景圖片
function changeBackground(url) {
    // 預先載入圖片，完成後再更換以避免閃爍與白畫面
    const img = new Image();
    img.src = url;
    img.onload = () => {
        bgWrapper.style.backgroundImage = `url('${url}')`;
    };
}

// 載入中骨架屏
function showLoadingSkeletons() {
    forecastContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'forecast-skeleton glass';
        forecastContainer.appendChild(skeleton);
    }
    
    // 圖示載入動畫
    weatherIconPlaceholder.innerHTML = '<i data-lucide="loader-2" class="loading-spin"></i>';
    lucide.createIcons();
    
    // 清空 SVG 圖形
    trendSvg.innerHTML = '';
}

// ==========================================
// 6. UI 更新邏輯 (即時天氣)
// ==========================================
function updateCurrentWeatherUI(cityName, data) {
    currentCity.textContent = cityName;
    
    // 設置即時時間更新器
    initClock(data.timezone);

    // 天氣描述 badge
    const desc = data.weather[0].description;
    weatherBadgeText.textContent = desc;
    
    // 溫度與最高最低
    currentTemp.textContent = Math.round(data.main.temp);
    tempMax.textContent = `${Math.round(data.main.temp_max)}°`;
    tempMin.textContent = `${Math.round(data.main.temp_min)}°`;

    // 詳細氣象指標
    metricHumidity.textContent = `${data.main.humidity} %`;
    metricWind.textContent = `${data.wind.speed} m/s`;
    metricFeelsLike.textContent = `${Math.round(data.main.feels_like)} °C`;
    metricPressure.textContent = `${data.main.pressure} hPa`;
    
    // 日出日落時間 (考慮時區偏移，OpenWeather timezone 是以秒為單位)
    const timezoneOffset = data.timezone;
    metricSunrise.textContent = formatSunTime(data.sys.sunrise, timezoneOffset);
    metricSunset.textContent = formatSunTime(data.sys.sunset, timezoneOffset);

    // 載入對應天氣圖示
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIconPlaceholder.innerHTML = `<img src="${iconUrl}" alt="${desc}" class="fade-in">`;

    // 更新資料發布時間戳記
    const now = new Date();
    updateTimestamp.textContent = now.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    // Lucide 圖示重新繪製
    lucide.createIcons();
}

// 格式化日出與日落時間
function formatSunTime(timestamp, timezoneOffset) {
    // 轉換成 UTC Date，再加偏移秒數
    const utcDate = new Date(timestamp * 1000);
    const localTime = new Date(utcDate.getTime() + (timezoneOffset * 1000) + (utcDate.getTimezoneOffset() * 60 * 1000));
    return localTime.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false });
}

// 時鐘更新器
function initClock(timezoneOffsetSec) {
    if (clockIntervalId) clearInterval(clockIntervalId);
    
    const updateTime = () => {
        const now = new Date();
        // 算出該城市的當地時間
        const targetTime = new Date(now.getTime() + (timezoneOffsetSec * 1000) + (now.getTimezoneOffset() * 60 * 1000));
        
        const timeString = targetTime.toLocaleTimeString('zh-TW', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        const dateString = targetTime.toLocaleDateString('zh-TW', {
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
        
        currentTime.textContent = `${dateString}  ${timeString}`;
    };
    
    updateTime();
    clockIntervalId = setInterval(updateTime, 1000);
}

// ==========================================
// 7. UI 更新與資料處理邏輯 (五天預報)
// ==========================================
function processForecastData(list) {
    const dailyData = {};
    
    list.forEach(item => {
        // 將時間戳轉換成當地時間的 YYYY-MM-DD
        const dateObj = new Date(item.dt * 1000);
        const y = dateObj.getFullYear();
        const m = String(dateObj.getMonth() + 1).padStart(2, '0');
        const d = String(dateObj.getDate()).padStart(2, '0');
        const dateKey = `${y}-${m}-${d}`;
        
        if (!dailyData[dateKey]) {
            dailyData[dateKey] = {
                rawDate: dateObj,
                temps: [],
                weatherList: [],
                icons: [],
                hours: []
            };
        }
        
        dailyData[dateKey].temps.push(item.main.temp);
        dailyData[dateKey].weatherList.push(item.weather[0].description);
        dailyData[dateKey].icons.push(item.weather[0].icon);
        dailyData[dateKey].hours.push({
            hour: dateObj.getHours(),
            temp: item.main.temp,
            desc: item.weather[0].description,
            icon: item.weather[0].icon
        });
    });
    
    const sortedKeys = Object.keys(dailyData).sort();
    
    // 如果首日（今天）的資料點過少（比如已經是晚上 10 點，快過完今天了），我們還是正常保留，但總計提取 5 天。
    const result = [];
    const daysToTake = Math.min(5, sortedKeys.length);
    
    for (let i = 0; i < daysToTake; i++) {
        const key = sortedKeys[i];
        const dayInfo = dailyData[key];
        const maxTemp = Math.max(...dayInfo.temps);
        const minTemp = Math.min(...dayInfo.temps);
        
        // 挑選接近中午 (11:00 ~ 13:00) 的天氣作為當天的代表
        let noonWeather = dayInfo.hours.find(h => h.hour >= 11 && h.hour <= 13);
        if (!noonWeather) {
            noonWeather = dayInfo.hours[Math.floor(dayInfo.hours.length / 2)];
        }
        
        result.push({
            dateKey: key,
            weekday: getChineseWeekday(dayInfo.rawDate),
            dateText: `${dayInfo.rawDate.getMonth() + 1}/${dayInfo.rawDate.getDate()}`,
            maxTemp: Math.round(maxTemp),
            minTemp: Math.round(minTemp),
            description: noonWeather.desc,
            icon: noonWeather.icon
        });
    }
    
    return result;
}

function getChineseWeekday(date) {
    const days = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
        return '今天';
    }
    return days[date.getDay()];
}

// 建立 5 天天氣卡片 DOM
function updateForecastUI(forecastData) {
    forecastContainer.innerHTML = '';
    
    forecastData.forEach((day, index) => {
        const item = document.createElement('div');
        item.className = 'forecast-item glass fade-in';
        item.style.animationDelay = `${index * 0.08}s`;
        
        const iconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;
        
        item.innerHTML = `
            <span class="forecast-day">${day.weekday}</span>
            <span class="forecast-date">${day.dateText}</span>
            <div class="forecast-icon">
                <img src="${iconUrl}" alt="${day.description}">
            </div>
            <span class="forecast-desc">${day.description}</span>
            <div class="forecast-temps">
                <span class="forecast-temp-high">${day.maxTemp}°</span>
                <span class="forecast-temp-low">${day.minTemp}°</span>
            </div>
        `;
        
        forecastContainer.appendChild(item);
    });
}

// ==========================================
// 8. SVG 溫度趨勢折線圖動態繪製
// ==========================================
function drawTrendChart(forecastData) {
    trendSvg.innerHTML = '';
    
    if (!forecastData || forecastData.length === 0) return;
    
    // 取得 SVG 的尺寸
    const svgWidth = trendSvg.clientWidth || 600;
    const svgHeight = trendSvg.clientHeight || 200;
    
    // 設定繪製邊界 (Padding)
    const paddingLeft = 50;
    const paddingRight = 50;
    const paddingTop = 35;
    const paddingBottom = 40;
    
    const chartWidth = svgWidth - paddingLeft - paddingRight;
    const chartHeight = svgHeight - paddingTop - paddingBottom;
    
    // 計算所有資料中的最高溫與最低溫
    const allHighs = forecastData.map(d => d.maxTemp);
    const allLows = forecastData.map(d => d.minTemp);
    const absoluteMax = Math.max(...allHighs);
    const absoluteMin = Math.min(...allLows);
    
    // 增加溫度上下緩衝區
    const tempBuffer = 1.5;
    const tempRange = (absoluteMax - absoluteMin) || 4; // 防止差值為 0
    const scaleMax = absoluteMax + tempBuffer;
    const scaleMin = absoluteMin - tempBuffer;
    const finalRange = scaleMax - scaleMin;
    
    // 5 個資料點的 X 軸座標
    const xCoords = forecastData.map((_, i) => {
        return paddingLeft + (i / (forecastData.length - 1)) * chartWidth;
    });
    
    // 映射溫度至 Y 軸座標的函數
    const getY = (temp) => {
        const ratio = (temp - scaleMin) / finalRange;
        return paddingTop + (1 - ratio) * chartHeight;
    };
    
    // 計算 High & Low 點的座標
    const highPoints = forecastData.map((d, i) => ({ x: xCoords[i], y: getY(d.maxTemp) }));
    const lowPoints = forecastData.map((d, i) => ({ x: xCoords[i], y: getY(d.minTemp) }));
    
    // 建立定義區 (濾鏡及漸層)
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // 陰影濾鏡 (給折線加上發光陰影)
    const shadowFilter = `
        <filter id="chart-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="rgba(0,0,0,0.15)"/>
        </filter>
    `;
    defs.innerHTML = shadowFilter;
    trendSvg.appendChild(defs);

    // 1. 繪製背景網格虛線
    for (let i = 0; i < forecastData.length; i++) {
        const x = xCoords[i];
        const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        gridLine.setAttribute('x1', x);
        gridLine.setAttribute('y1', paddingTop - 10);
        gridLine.setAttribute('x2', x);
        gridLine.setAttribute('y2', svgHeight - paddingBottom + 10);
        gridLine.setAttribute('class', 'chart-grid-line');
        trendSvg.appendChild(gridLine);
    }
    
    // 2. 繪製折線路徑 (使用 SVG Path)
    const createPathD = (points) => {
        // 生成平滑的貝氏曲線路徑
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i];
            const p1 = points[i + 1];
            // 控制點：讓曲線在水平方向平滑
            const cpX1 = p0.x + (p1.x - p0.x) / 3;
            const cpY1 = p0.y;
            const cpX2 = p0.x + 2 * (p1.x - p0.x) / 3;
            const cpY2 = p1.y;
            d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
        }
        return d;
    };

    const pathHighD = createPathD(highPoints);
    const pathLowD = createPathD(lowPoints);

    // 繪製最高溫線
    const highLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    highLine.setAttribute('d', pathHighD);
    highLine.setAttribute('class', 'chart-line chart-line-high');
    highLine.setAttribute('filter', 'url(#chart-glow)');
    trendSvg.appendChild(highLine);

    // 繪製最低溫線
    const lowLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    lowLine.setAttribute('d', pathLowD);
    lowLine.setAttribute('class', 'chart-line chart-line-low');
    lowLine.setAttribute('filter', 'url(#chart-glow)');
    trendSvg.appendChild(lowLine);

    // 3. 繪製資料點與文字標籤
    const drawPointsAndLabels = (points, temps, isHigh) => {
        points.forEach((p, i) => {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            
            // 資料點圓圈
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', p.x);
            circle.setAttribute('cy', p.y);
            circle.setAttribute('r', '5');
            circle.setAttribute('class', `chart-point ${isHigh ? 'chart-point-high' : 'chart-point-low'}`);
            g.appendChild(circle);
            
            // 溫度數值文字標籤
            const textVal = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textVal.setAttribute('x', p.x);
            // 最高溫標籤在點的上方，最低溫在點的下方
            textVal.setAttribute('y', isHigh ? p.y - 12 : p.y + 18);
            textVal.setAttribute('class', 'chart-text-val');
            textVal.textContent = `${temps[i]}°`;
            g.appendChild(textVal);

            trendSvg.appendChild(g);
        });
    };

    drawPointsAndLabels(highPoints, allHighs, true);
    drawPointsAndLabels(lowPoints, allLows, false);

    // 4. 繪製 X 軸日期標示
    forecastData.forEach((day, i) => {
        const x = xCoords[i];
        const y = svgHeight - 15;
        
        const axisText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        axisText.setAttribute('x', x);
        axisText.setAttribute('y', y);
        axisText.setAttribute('class', 'chart-axis-text');
        axisText.textContent = `${day.weekday} (${day.dateText})`;
        trendSvg.appendChild(axisText);
    });
}
