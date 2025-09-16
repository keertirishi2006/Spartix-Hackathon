// App State
const appState = {
    currentTab: 'dashboard',
    user: {
        name: 'EcoWarrior',
        score: 1250,
        level: 5,
        badges: ['🌱'],
        streak: 15
    },
    activities: JSON.parse(localStorage.getItem('ecotrack-activities') || '[]'),
    challenges: JSON.parse(localStorage.getItem('ecotrack-challenges') || JSON.stringify([
        {
            id: 1,
            title: 'Car-Free Week',
            description: 'Use alternative transportation for 7 consecutive days',
            longDescription: 'Join thousands of eco-warriors in reducing transportation emissions by avoiding car usage for an entire week. Use bicycles, public transport, walking, or other eco-friendly alternatives.',
            points: 500,
            progress: 5,
            target: 7,
            participants: 2847,
            active: true,
            category: 'transport',
            difficulty: 'medium',
            startDate: '2024-01-15',
            endDate: '2024-01-22',
            requirements: [
                'No personal car usage for 7 consecutive days',
                'Log alternative transportation methods daily',
                'Share progress with community'
            ],
            rewards: [
                { type: 'points', value: 500, description: 'Base completion points' },
                { type: 'badge', value: '🚴', description: 'Transport Champion Badge' },
                { type: 'multiplier', value: 1.2, description: '20% point multiplier for next week' }
            ]
        },
        {
            id: 2,
            title: 'Plastic-Free Kitchen',
            description: 'Eliminate single-use plastics from your kitchen',
            longDescription: 'Transform your kitchen into a plastic-free zone by replacing single-use items with sustainable alternatives. Track your progress as you eliminate plastic waste.',
            points: 300,
            progress: 5,
            target: 20,
            participants: 1532,
            active: false,
            category: 'waste',
            difficulty: 'easy',
            startDate: '2024-01-10',
            endDate: '2024-02-10',
            requirements: [
                'Replace 20 single-use plastic items',
                'Document alternatives used',
                'Share tips with community'
            ],
            rewards: [
                { type: 'points', value: 300, description: 'Base completion points' },
                { type: 'badge', value: '♻️', description: 'Waste Warrior Badge' }
            ]
        },
        {
            id: 3,
            title: 'Energy Saver',
            description: 'Reduce home energy consumption by 20%',
            longDescription: 'Monitor and reduce your home energy usage through smart practices and efficient appliances. Achieve a 20% reduction compared to your baseline consumption.',
            points: 250,
            progress: 0,
            target: 20,
            participants: 3412,
            active: false,
            category: 'energy',
            difficulty: 'hard',
            startDate: '2024-01-20',
            endDate: '2024-02-20',
            requirements: [
                'Establish baseline energy consumption',
                'Implement energy-saving measures',
                'Achieve 20% reduction in monthly usage'
            ],
            rewards: [
                { type: 'points', value: 250, description: 'Base completion points' },
                { type: 'badge', value: '⚡', description: 'Energy Master Badge' }
            ]
        }
    ])),
    leaderboard: [
        { rank: 1, username: 'EcoChampion', score: 4850, co2Saved: 15.2, badges: ['🌱', '🚴', '♻️'], trend: 120 },
        { rank: 2, username: 'GreenGuru', score: 3720, co2Saved: 12.8, badges: ['🌱', '⚡'], trend: 85 },
        { rank: 3, username: 'EarthSaver', score: 2990, co2Saved: 10.5, badges: ['♻️'], trend: -15 },
        { rank: 4, username: 'ClimateHero', score: 2750, co2Saved: 9.8, badges: ['🌱'], trend: 45 },
        { rank: 5, username: 'EcoWarrior2024', score: 2340, co2Saved: 8.9, badges: [], trend: 30 }
    ],
    activityTypes: {
        transport: [
            { name: 'Car (Gasoline)', unit: 'km', factor: 0.21 },
            { name: 'Car (Diesel)', unit: 'km', factor: 0.18 },
            { name: 'Bus', unit: 'km', factor: 0.08 },
            { name: 'Train', unit: 'km', factor: 0.04 },
            { name: 'Flight (Domestic)', unit: 'km', factor: 0.25 },
            { name: 'Flight (International)', unit: 'km', factor: 0.3 },
            { name: 'Bicycle', unit: 'km', factor: 0 },
            { name: 'Walking', unit: 'km', factor: 0 }
        ],
        food: [
            { name: 'Beef', unit: 'kg', factor: 27 },
            { name: 'Lamb', unit: 'kg', factor: 39 },
            { name: 'Pork', unit: 'kg', factor: 12 },
            { name: 'Chicken', unit: 'kg', factor: 6.9 },
            { name: 'Fish', unit: 'kg', factor: 4.4 },
            { name: 'Vegetables', unit: 'kg', factor: 2.0 },
            { name: 'Fruits', unit: 'kg', factor: 1.1 },
            { name: 'Dairy', unit: 'liters', factor: 3.2 },
            { name: 'Plant-based meal', unit: 'meals', factor: 1.5 }
        ],
        energy: [
            { name: 'Electricity', unit: 'kWh', factor: 0.5 },
            { name: 'Natural Gas', unit: 'm³', factor: 2.0 },
            { name: 'Heating Oil', unit: 'liters', factor: 2.5 },
            { name: 'Solar Power', unit: 'kWh', factor: 0.05 },
            { name: 'Wind Power', unit: 'kWh', factor: 0.02 }
        ],
        waste: [
            { name: 'General Waste', unit: 'kg', factor: 0.5 },
            { name: 'Plastic Waste', unit: 'kg', factor: 1.8 },
            { name: 'Paper Waste', unit: 'kg', factor: 0.9 },
            { name: 'Food Waste', unit: 'kg', factor: 3.3 },
            { name: 'Recycled Materials', unit: 'kg', factor: -0.2 }
        ]
    }
};

// DOM Elements
const navTabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');
const addActivityBtn = document.getElementById('addActivityBtn');
const activityModal = document.getElementById('activityModal');
const modalClose = document.querySelector('.modal-close');
const activityForm = document.getElementById('activityForm');
const activityCategory = document.getElementById('activityCategory');
const activityType = document.getElementById('activityType');
const activityAmount = document.getElementById('activityAmount');
const activityUnit = document.getElementById('activityUnit');
const cancelActivity = document.getElementById('cancelActivity');

// Chart elements
const chartPeriod = document.getElementById('chartPeriod');
const chartType = document.getElementById('chartType');
const pieChart = document.getElementById('pieChart');
const pieLegend = document.getElementById('pieLegend');
const comparisonChart = document.getElementById('comparisonChart');

// Challenge modal elements
const challengeModal = document.getElementById('challengeModal');
const challengeTitle = document.getElementById('challengeTitle');
const challengeDescription = document.getElementById('challengeDescription');

// Initialize App
function initApp() {
    setupEventListeners();
    renderDashboard();
    renderActivities();
    renderCharts();
    updateTodaysImpact();
    renderChallenges();
    renderCommunity();
    
    // Add sample activities if none exist
    if (appState.activities.length === 0) {
        addSampleActivities();
    }
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            switchTab(tabId);
        });
    });
    
    // Activity Modal
    addActivityBtn.addEventListener('click', openActivityModal);
    modalClose.addEventListener('click', closeActivityModal);
    cancelActivity.addEventListener('click', closeActivityModal);
    
    // Activity Form
    activityForm.addEventListener('submit', handleActivitySubmit);
    activityCategory.addEventListener('change', updateActivityTypes);
    activityType.addEventListener('change', updateActivityUnit);
    
    // Category Cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            openActivityModalWithCategory(category);
        });
    });
    
    // Chart controls
    chartPeriod.addEventListener('change', renderCharts);
    chartType.addEventListener('change', renderCharts);
    
    // Challenge buttons
    document.querySelectorAll('.btn-small').forEach(btn => {
        if (btn.textContent === 'View Details') {
            btn.addEventListener('click', openChallengeModal);
        }
    });
    
    // Modal backdrop click
    activityModal.addEventListener('click', (e) => {
        if (e.target === activityModal) {
            closeActivityModal();
        }
    });
    
    challengeModal.addEventListener('click', (e) => {
        if (e.target === challengeModal) {
            closeChallengeModal();
        }
    });
}

// Tab Management
function switchTab(tabId) {
    // Update nav tabs
    navTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabId) {
            tab.classList.add('active');
        }
    });
    
    // Update tab contents
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
            content.classList.add('active');
        }
    });
    
    appState.currentTab = tabId;
}

// Activity Modal Management
function openActivityModal() {
    activityModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openActivityModalWithCategory(category) {
    openActivityModal();
    activityCategory.value = category;
    updateActivityTypes();
}

function closeActivityModal() {
    activityModal.classList.remove('active');
    document.body.style.overflow = '';
    activityForm.reset();
    activityType.innerHTML = '<option value="">Select activity</option>';
    activityUnit.textContent = 'unit';
}

// Activity Type Management
function updateActivityTypes() {
    const category = activityCategory.value;
    const types = appState.activityTypes[category] || [];
    
    activityType.innerHTML = '<option value="">Select activity</option>';
    
    types.forEach((type, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = type.name;
        activityType.appendChild(option);
    });
    
    if (types.length > 0) {
        activityUnit.textContent = types[0].unit;
    }
}

function updateActivityUnit() {
    const category = activityCategory.value;
    const typeIndex = parseInt(activityType.value);
    
    if (category && !isNaN(typeIndex)) {
        const activityTypeData = appState.activityTypes[category][typeIndex];
        activityUnit.textContent = activityTypeData.unit;
    }
}

// Challenge Modal Management
function openChallengeModal() {
    challengeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Populate with sample challenge data
    challengeTitle.textContent = 'Car-Free Week Challenge';
    challengeDescription.textContent = 'Join thousands of eco-warriors in reducing transportation emissions by avoiding car usage for an entire week. Use bicycles, public transport, walking, or other eco-friendly alternatives.';
    
    // Render challenge progress chart
    renderChallengeProgressChart();
}

function closeChallengeModal() {
    challengeModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Activity Form Handling
function handleActivitySubmit(e) {
    e.preventDefault();
    
    const category = activityCategory.value;
    const typeIndex = parseInt(activityType.value);
    const amount = parseFloat(activityAmount.value);
    
    if (!category || isNaN(typeIndex) || isNaN(amount)) {
        alert('Please fill in all fields');
        return;
    }
    
    const activityTypeData = appState.activityTypes[category][typeIndex];
    const co2Impact = amount * activityTypeData.factor;
    
    const newActivity = {
        id: Date.now(),
        category,
        type: activityTypeData.name,
        amount,
        unit: activityTypeData.unit,
        co2Impact: Math.max(0, co2Impact), // Prevent negative values
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date()
    };
    
    appState.activities.unshift(newActivity);
    saveActivities();
    renderActivities();
    updateTodaysImpact();
    renderCharts();
    closeActivityModal();
    
    // Show success message
    showNotification(`Activity added! CO₂ impact: ${co2Impact.toFixed(2)} kg`);
}

// Data Management
function saveActivities() {
    localStorage.setItem('ecotrack-activities', JSON.stringify(appState.activities));
}

function addSampleActivities() {
    const sampleActivities = [
        {
            id: Date.now() - 86400000,
            category: 'transport',
            type: 'Car (Gasoline)',
            amount: 25,
            unit: 'km',
            co2Impact: 5.25,
            date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            timestamp: new Date(Date.now() - 86400000)
        },
        {
            id: Date.now() - 43200000,
            category: 'food',
            type: 'Chicken',
            amount: 0.3,
            unit: 'kg',
            co2Impact: 2.07,
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date(Date.now() - 43200000)
        },
        {
            id: Date.now() - 21600000,
            category: 'energy',
            type: 'Electricity',
            amount: 15,
            unit: 'kWh',
            co2Impact: 7.5,
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date(Date.now() - 21600000)
        }
    ];
    
    appState.activities = sampleActivities;
    saveActivities();
}

// Dashboard Rendering
function renderDashboard() {
    updateTodaysImpact();
    renderBreakdown();
}

function updateTodaysImpact() {
    const today = new Date().toISOString().split('T')[0];
    const todaysActivities = appState.activities.filter(activity => activity.date === today);
    const totalCO2 = todaysActivities.reduce((sum, activity) => sum + activity.co2Impact, 0);
    
    document.getElementById('todaysCO2').textContent = totalCO2.toFixed(1);
    
    // Update comparison (simplified)
    const comparisonText = totalCO2 < 15 ? '15% less than yesterday' : '8% more than yesterday';
    const trendClass = totalCO2 < 15 ? 'up' : 'down';
    
    document.getElementById('comparisonText').textContent = comparisonText;
    const trendIndicator = document.querySelector('.trend-indicator');
    trendIndicator.className = `trend-indicator ${trendClass}`;
}

function renderBreakdown() {
    const today = new Date().toISOString().split('T')[0];
    const todaysActivities = appState.activities.filter(activity => activity.date === today);
    
    const breakdown = {
        transport: 0,
        food: 0,
        energy: 0,
        waste: 0
    };
    
    todaysActivities.forEach(activity => {
        breakdown[activity.category] += activity.co2Impact;
    });
    
    const total = Object.values(breakdown).reduce((sum, value) => sum + value, 0);
    
    // Update breakdown display (this would update the actual breakdown items)
    // For now, we'll keep the static values as they provide a good demo
}

// Activities Rendering
function renderActivities() {
    const activitiesList = document.getElementById('activitiesList');
    
    if (appState.activities.length === 0) {
        activitiesList.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 2rem;">No activities recorded yet. Start by adding your first activity!</p>';
        return;
    }
    
    const recentActivities = appState.activities.slice(0, 10);
    
    activitiesList.innerHTML = recentActivities.map(activity => `
        <div class="activity-item">
            <div class="activity-info">
                <span class="category-icon">${getCategoryIcon(activity.category)}</span>
                <div class="activity-details">
                    <span class="activity-name">${activity.type}</span>
                    <span class="activity-meta">${activity.amount} ${activity.unit} • ${formatDate(activity.date)}</span>
                </div>
            </div>
            <div class="activity-impact">${activity.co2Impact.toFixed(2)} kg CO₂</div>
        </div>
    `).join('');
}

function getCategoryIcon(category) {
    const icons = {
        transport: '🚗',
        food: '🍽️',
        energy: '⚡',
        waste: '🗑️'
    };
    return icons[category] || '📊';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateString === today.toISOString().split('T')[0]) {
        return 'Today';
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString();
    }
}

// Enhanced Chart Rendering
function renderCharts() {
    renderMainChart();
    renderPieChart();
    renderComparisonChart();
}

function renderMainChart() {
    const canvas = document.getElementById('weeklyChart');
    const ctx = canvas.getContext('2d');
    const period = chartPeriod.value;
    const type = chartType.value;
    
    // Get data based on period
    let data = [];
    const labels = [];
    let days = 7;
    
    if (period === 'month') days = 30;
    if (period === 'year') days = 365;
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        const dayActivities = appState.activities.filter(activity => activity.date === dateString);
        const totalCO2 = dayActivities.reduce((sum, activity) => sum + activity.co2Impact, 0);
        
        data.push(totalCO2);
        
        if (period === 'week') {
            labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        } else if (period === 'month') {
            labels.push(date.getDate().toString());
        } else {
            labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
        }
    }
    
    // Clear canvas
    canvas.width = canvas.offsetWidth * 2; // For high DPI
    canvas.height = 300 * 2;
    canvas.style.width = canvas.offsetWidth + 'px';
    canvas.style.height = '300px';
    ctx.scale(2, 2);
    
    const width = canvas.offsetWidth;
    const height = 300;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Find max value for scaling
    const maxValue = Math.max(...data, 20);
    
    // Set up styling
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
        const y = padding + (i * chartHeight) / 5;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw chart area background
    ctx.fillStyle = 'white';
    ctx.fillRect(padding, padding, chartWidth, chartHeight);
    
    // Render based on chart type
    if (type === 'line' || type === 'area') {
        // Draw area fill for area chart
        if (type === 'area') {
            ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
            ctx.beginPath();
            ctx.moveTo(padding, padding + chartHeight);
            
            data.forEach((value, index) => {
                const x = padding + (index * chartWidth) / Math.max(data.length - 1, 1);
                const y = padding + chartHeight - (value / maxValue) * chartHeight;
                ctx.lineTo(x, y);
            });
            
            ctx.lineTo(padding + chartWidth, padding + chartHeight);
            ctx.closePath();
            ctx.fill();
        }
        
        // Draw line
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.forEach((value, index) => {
            const x = padding + (index * chartWidth) / Math.max(data.length - 1, 1);
            const y = padding + chartHeight - (value / maxValue) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = '#16a34a';
        data.forEach((value, index) => {
            const x = padding + (index * chartWidth) / Math.max(data.length - 1, 1);
            const y = padding + chartHeight - (value / maxValue) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
    } else if (type === 'bar') {
        // Draw bars
        const barWidth = chartWidth / data.length * 0.8;
        const barSpacing = chartWidth / data.length * 0.2;
        
        ctx.fillStyle = '#22c55e';
        data.forEach((value, index) => {
            const x = padding + (index * chartWidth) / data.length + barSpacing / 2;
            const barHeight = (value / maxValue) * chartHeight;
            const y = padding + chartHeight - barHeight;
            
            ctx.fillRect(x, y, barWidth, barHeight);
        });
    }
    
    // Draw labels (sample every few labels for readability)
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    
    const labelStep = Math.max(1, Math.floor(labels.length / 10));
    labels.forEach((label, index) => {
        if (index % labelStep === 0) {
            const x = padding + (index * chartWidth) / Math.max(data.length - 1, 1);
            ctx.fillText(label, x, height - 10);
        }
    });
    
    // Draw y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const value = (maxValue * (5 - i)) / 5;
        const y = padding + (i * chartHeight) / 5;
        ctx.fillText(value.toFixed(1), padding - 10, y + 4);
    }
}

function renderPieChart() {
    const canvas = pieChart;
    const ctx = canvas.getContext('2d');
    
    // Get category data for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const categoryData = {
        transport: 0,
        food: 0,
        energy: 0,
        waste: 0
    };
    
    appState.activities.forEach(activity => {
        const activityDate = new Date(activity.date);
        if (activityDate >= thirtyDaysAgo) {
            categoryData[activity.category] += activity.co2Impact;
        }
    });
    
    const total = Object.values(categoryData).reduce((sum, value) => sum + value, 0);
    
    if (total === 0) {
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#6b7280';
        ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('No data available', canvas.width / 2, canvas.height / 2);
        return;
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    const colors = {
        transport: '#ef4444',
        food: '#f59e0b',
        energy: '#3b82f6',
        waste: '#8b5cf6'
    };
    
    const icons = {
        transport: '🚗',
        food: '🍽️',
        energy: '⚡',
        waste: '🗑️'
    };
    
    let currentAngle = -Math.PI / 2; // Start at top
    
    // Draw pie slices
    Object.entries(categoryData).forEach(([category, value]) => {
        if (value > 0) {
            const sliceAngle = (value / total) * 2 * Math.PI;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = colors[category];
            ctx.fill();
            
            // Add stroke
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            currentAngle += sliceAngle;
        }
    });
    
    // Update legend
    pieLegend.innerHTML = Object.entries(categoryData)
        .filter(([_, value]) => value > 0)
        .map(([category, value]) => `
            <div class="legend-item">
                <div class="legend-color" style="background-color: ${colors[category]}"></div>
                <span class="legend-label">${icons[category]} ${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                <span class="legend-value">${value.toFixed(1)} kg</span>
            </div>
        `).join('');
}

function renderComparisonChart() {
    const canvas = comparisonChart;
    const ctx = canvas.getContext('2d');
    
    // Get monthly data for last 6 months
    const monthlyData = [];
    const monthLabels = [];
    
    for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        const monthActivities = appState.activities.filter(activity => {
            const activityDate = new Date(activity.date);
            return activityDate >= monthStart && activityDate <= monthEnd;
        });
        
        const totalCO2 = monthActivities.reduce((sum, activity) => sum + activity.co2Impact, 0);
        monthlyData.push(totalCO2);
        monthLabels.push(date.toLocaleDateString('en-US', { month: 'short' }));
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const maxValue = Math.max(...monthlyData, 50);
    
    // Draw background
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, width, height);
    
    // Draw chart area
    ctx.fillStyle = 'white';
    ctx.fillRect(padding, padding, chartWidth, chartHeight);
    
    // Draw bars
    const barWidth = chartWidth / monthlyData.length * 0.6;
    const barSpacing = chartWidth / monthlyData.length * 0.4;
    
    monthlyData.forEach((value, index) => {
        const x = padding + (index * chartWidth) / monthlyData.length + barSpacing / 2;
        const barHeight = (value / maxValue) * chartHeight;
        const y = padding + chartHeight - barHeight;
        
        // Gradient fill
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, '#22c55e');
        gradient.addColorStop(1, '#16a34a');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Value labels
        ctx.fillStyle = '#374151';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(value.toFixed(0), x + barWidth / 2, y - 5);
    });
    
    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    
    monthLabels.forEach((label, index) => {
        const x = padding + (index * chartWidth) / monthlyData.length + (chartWidth / monthlyData.length) / 2;
        ctx.fillText(label, x, height - 10);
    });
}

function renderChallengeProgressChart() {
    const canvas = document.getElementById('challengeProgressChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Sample progress data
    const progressData = [0, 1, 2, 3, 4, 5, 5, 5]; // Days completed
    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 30;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Draw background
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, width, height);
    
    // Draw progress line
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    progressData.forEach((value, index) => {
        const x = padding + (index * chartWidth) / (progressData.length - 1);
        const y = padding + chartHeight - (value / 7) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = '#16a34a';
    progressData.forEach((value, index) => {
        const x = padding + (index * chartWidth) / (progressData.length - 1);
        const y = padding + chartHeight - (value / 7) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
}

// Render Challenges
function renderChallenges() {
    // Update challenge stats
    const completedCount = appState.challenges.filter(c => c.progress >= c.target).length;
    const activeCount = appState.challenges.filter(c => c.active).length;
    const totalPoints = appState.challenges.reduce((sum, c) => sum + (c.progress >= c.target ? c.points : 0), 0);
    
    document.getElementById('completedChallenges').textContent = completedCount;
    document.getElementById('activeChallenges').textContent = activeCount;
    document.getElementById('totalPoints').textContent = totalPoints.toLocaleString();
    document.getElementById('streakDays').textContent = appState.user.streak;
}

// Render Community
function renderCommunity() {
    // This function would update community stats and leaderboard
    // For now, the HTML contains static data that looks good
}

// Save challenges to localStorage
function saveChallenges() {
    localStorage.setItem('ecotrack-challenges', JSON.stringify(appState.challenges));
}

// Enhanced notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add more interactive features
function addInteractiveFeatures() {
    // Leaderboard tabs
    document.querySelectorAll('.leaderboard-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.leaderboard-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Here you would filter leaderboard data based on tab
        });
    });
    
    // Search functionality
    const userSearch = document.getElementById('userSearch');
    if (userSearch) {
        userSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            // Here you would filter leaderboard based on search term
            console.log('Searching for:', searchTerm);
        });
    }
    
    // Challenge filter
    const challengeFilter = document.getElementById('challengeFilter');
    if (challengeFilter) {
        challengeFilter.addEventListener('change', (e) => {
            const filterType = e.target.value;
            // Here you would filter challenges based on selection
            console.log('Filtering challenges by:', filterType);
        });
    }
}

// Enhanced initialization
function initApp() {
    setupEventListeners();
    renderDashboard();
    renderActivities();
    renderCharts();
    updateTodaysImpact();
    renderChallenges();
    renderCommunity();
    addInteractiveFeatures();
    
    // Add sample activities if none exist
    if (appState.activities.length === 0) {
        addSampleActivities();
    }
    
    // Auto-refresh charts every 5 minutes
    setInterval(() => {
        renderCharts();
        updateTodaysImpact();
    }, 300000);
}

// Add CSS animations for enhanced interactions
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    .card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    
    .challenge-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .challenge-card:hover {
        transform: translateY(-3px) scale(1.02);
    }
    
    .btn {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn:hover {
        transform: translateY(-1px);
    }
    
    .leaderboard-item {
        transition: all 0.2s ease;
    }
    
    .leaderboard-item:hover {
        background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(22, 163, 74, 0.05));
        transform: translateX(4px);
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    .stat-card:hover .stat-icon {
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(enhancedStyle);

// Utility Functions
function getCategoryIcon(category) {
    const icons = {
        transport: '🚗',
        food: '🍽️',
        energy: '⚡',
        waste: '🗑️'
    };
    return icons[category] || '📊';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateString === today.toISOString().split('T')[0]) {
        return 'Today';
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString();
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
