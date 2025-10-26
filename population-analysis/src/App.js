import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Activity, MapPin, Brain, Globe, RotateCcw } from 'lucide-react';

const PopulationDynamicsAI = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCountry, setSelectedCountry] = useState('vietnam');
  const [forecastYears, setForecastYears] = useState(50);
  const [customBirthRate, setCustomBirthRate] = useState(null);
  const [customDeathRate, setCustomDeathRate] = useState(null);

  // Dữ liệu dân số thực tế các quốc gia (2024-2025)
  const countriesData = {
    vietnam: {
      name: 'Việt Nam',
      population: 98800000,
      birthRate: 14.8,
      deathRate: 7.2,
      netMigration: -0.3,
      stage: 3,
      medianAge: 32.5,
      growthRate: 0.76,
      urbanization: 38.2,
      lifeExpectancy: 75.4,
      pyramid: [
        { age: '0-14', male: -11.2, female: 10.8, maleCount: 11200000, femaleCount: 10800000 },
        { age: '15-29', male: -12.8, female: 12.4, maleCount: 12800000, femaleCount: 12400000 },
        { age: '30-44', male: -13.5, female: 13.2, maleCount: 13500000, femaleCount: 13200000 },
        { age: '45-59', male: -11.8, female: 11.6, maleCount: 11800000, femaleCount: 11600000 },
        { age: '60-74', male: -5.4, female: 5.8, maleCount: 5400000, femaleCount: 5800000 },
        { age: '75+', male: -1.8, female: 2.4, maleCount: 1800000, femaleCount: 2400000 }
      ]
    },
    japan: {
      name: 'Nhật Bản',
      population: 123300000,
      birthRate: 6.9,
      deathRate: 12.1,
      netMigration: 0.6,
      stage: 5,
      medianAge: 49.1,
      growthRate: -0.53,
      urbanization: 91.8,
      lifeExpectancy: 84.8,
      pyramid: [
        { age: '0-14', male: -6.2, female: 5.9, maleCount: 7600000, femaleCount: 7300000 },
        { age: '15-29', male: -7.8, female: 7.5, maleCount: 9600000, femaleCount: 9200000 },
        { age: '30-44', male: -9.2, female: 8.9, maleCount: 11300000, femaleCount: 11000000 },
        { age: '45-59', male: -11.5, female: 11.2, maleCount: 14200000, femaleCount: 13800000 },
        { age: '60-74', male: -10.8, female: 11.4, maleCount: 13300000, femaleCount: 14000000 },
        { age: '75+', male: -6.8, female: 9.2, maleCount: 8400000, femaleCount: 11300000 }
      ]
    },
    nigeria: {
      name: 'Nigeria',
      population: 223800000,
      birthRate: 35.2,
      deathRate: 8.5,
      netMigration: -0.2,
      stage: 2,
      medianAge: 18.6,
      growthRate: 2.53,
      urbanization: 52.7,
      lifeExpectancy: 55.2,
      pyramid: [
        { age: '0-14', male: -20.5, female: 20.2, maleCount: 45900000, femaleCount: 45200000 },
        { age: '15-29', male: -16.8, female: 16.5, maleCount: 37600000, femaleCount: 36900000 },
        { age: '30-44', male: -11.2, female: 11.0, maleCount: 25100000, femaleCount: 24600000 },
        { age: '45-59', male: -6.8, female: 6.6, maleCount: 15200000, femaleCount: 14800000 },
        { age: '60-74', male: -3.2, female: 3.1, maleCount: 7200000, femaleCount: 6900000 },
        { age: '75+', male: -0.8, female: 0.9, maleCount: 1800000, femaleCount: 2000000 }
      ]
    },
    usa: {
      name: 'Hoa Kỳ',
      population: 341800000,
      birthRate: 11.0,
      deathRate: 9.5,
      netMigration: 2.8,
      stage: 4,
      medianAge: 38.9,
      growthRate: 0.43,
      urbanization: 83.0,
      lifeExpectancy: 79.3,
      pyramid: [
        { age: '0-14', male: -9.2, female: 8.8, maleCount: 31500000, femaleCount: 30100000 },
        { age: '15-29', male: -10.8, female: 10.5, maleCount: 36900000, femaleCount: 35900000 },
        { age: '30-44', male: -10.5, female: 10.3, maleCount: 35900000, femaleCount: 35200000 },
        { age: '45-59', male: -10.2, female: 10.4, maleCount: 34900000, femaleCount: 35600000 },
        { age: '60-74', male: -8.5, female: 9.2, maleCount: 29100000, femaleCount: 31500000 },
        { age: '75+', male: -4.8, female: 6.8, maleCount: 16400000, femaleCount: 23200000 }
      ]
    },
    germany: {
      name: 'Đức',
      population: 84500000,
      birthRate: 8.9,
      deathRate: 12.0,
      netMigration: 4.8,
      stage: 5,
      medianAge: 47.8,
      growthRate: 0.17,
      urbanization: 77.5,
      lifeExpectancy: 81.7,
      pyramid: [
        { age: '0-14', male: -6.5, female: 6.2, maleCount: 5500000, femaleCount: 5200000 },
        { age: '15-29', male: -8.2, female: 7.9, maleCount: 6900000, femaleCount: 6700000 },
        { age: '30-44', male: -9.8, female: 9.5, maleCount: 8300000, femaleCount: 8000000 },
        { age: '45-59', male: -12.5, female: 12.2, maleCount: 10600000, femaleCount: 10300000 },
        { age: '60-74', male: -10.8, female: 11.2, maleCount: 9100000, femaleCount: 9500000 },
        { age: '75+', male: -5.2, female: 8.5, maleCount: 4400000, femaleCount: 7200000 }
      ]
    }
  };

  const currentData = countriesData[selectedCountry];
  const effectiveBirthRate = customBirthRate !== null ? customBirthRate : currentData.birthRate;
  const effectiveDeathRate = customDeathRate !== null ? customDeathRate : currentData.deathRate;

  // Tính toán dự báo dân số
  const forecastData = useMemo(() => {
    const data = [];
    let pop = currentData.population;
    const baseGrowth = (effectiveBirthRate - effectiveDeathRate + currentData.netMigration) / 1000;
    
    for (let year = 0; year <= forecastYears; year++) {
      const adjustedGrowth = baseGrowth * Math.exp(-0.008 * year);
      pop = pop * (1 + adjustedGrowth);
      
      data.push({
        year: 2025 + year,
        population: Math.round(pop / 1000000 * 10) / 10,
        births: Math.round(pop * effectiveBirthRate / 1000 / 1000),
        deaths: Math.round(pop * effectiveDeathRate / 1000 / 1000)
      });
    }
    
    return data;
  }, [selectedCountry, forecastYears, effectiveBirthRate, effectiveDeathRate, currentData]);

  // So sánh các quốc gia
  const comparisonData = Object.entries(countriesData).map(([key, data]) => ({
    country: data.name,
    population: Math.round(data.population / 1000000),
    growthRate: data.growthRate,
    medianAge: data.medianAge,
    birthRate: data.birthRate,
    deathRate: data.deathRate
  }));

  const getAIInsights = () => {
    const insights = [];
    const netGrowth = effectiveBirthRate - effectiveDeathRate + currentData.netMigration;
    const finalPop = forecastData[forecastData.length - 1].population;
    const currentPop = currentData.population / 1000000;
    const change = ((finalPop - currentPop) / currentPop * 100).toFixed(1);
    
    if (currentData.stage === 2) {
      insights.push('🚀 Đang ở giai đoạn bùng nổ dân số - cần đầu tư mạnh vào giáo dục, việc làm và cơ sở hạ tầng');
    } else if (currentData.stage === 3) {
      insights.push('⚡ Đang ở "cơ cấu dân số vàng" - cơ hội lớn để thúc đẩy phát triển kinh tế');
    } else if (currentData.stage >= 4) {
      insights.push('⚠️ Đang già hóa dân số - cần chính sách hỗ trợ người cao tuổi và khuyến khích sinh đẻ');
    }
    
    if (currentData.medianAge > 40) {
      insights.push(`👴 Tuổi trung vị ${currentData.medianAge} tuổi - đây là dấu hiệu của xã hội già hóa`);
    } else if (currentData.medianAge < 25) {
      insights.push(`👶 Tuổi trung vị ${currentData.medianAge} tuổi - dân số rất trẻ, tiềm năng lao động lớn`);
    }
    
    if (netGrowth < 0) {
      insights.push('📉 Dân số đang suy giảm - có thể ảnh hưởng đến nền kinh tế và an sinh xã hội');
    }
    
    insights.push(`📊 Dự báo ${change > 0 ? 'tăng' : 'giảm'} ${Math.abs(change)}% dân số trong ${forecastYears} năm tới`);
    
    if (currentData.urbanization < 50) {
      insights.push(`🏙️ Tỷ lệ đô thị hóa ${currentData.urbanization}% - xu hướng di cư nông thôn-thành thị sẽ tiếp tục`);
    }
    
    return insights;
  };

  const resetCustomValues = () => {
    setCustomBirthRate(null);
    setCustomDeathRate(null);
    setForecastYears(50);
  };

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">AI Phân Tích Dân Số Thực Tế</h1>
          </div>
          <p className="text-gray-600 text-lg">Dữ liệu và dự báo dân số dựa trên thống kê thực tế 2024-2025</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-800">Chọn Quốc Gia:</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(countriesData).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCountry(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCountry === key
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-indigo-50'
                  }`}
                >
                  {data.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap justify-center">
          {[
            { id: 'overview', icon: Users, label: 'Tổng Quan' },
            { id: 'forecast', icon: TrendingUp, label: 'Dự Báo' },
            { id: 'pyramid', icon: Activity, label: 'Tháp Dân Số' },
            { id: 'comparison', icon: Globe, label: 'So Sánh' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-indigo-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Thống Kê Hiện Tại</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Dân số</span>
                  <span className="text-blue-600 font-bold">{(currentData.population / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Tỷ lệ sinh</span>
                  <span className="text-green-600 font-bold">{currentData.birthRate}‰</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Tỷ lệ tử</span>
                  <span className="text-red-600 font-bold">{currentData.deathRate}‰</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Tăng trưởng</span>
                  <span className="text-purple-600 font-bold">{currentData.growthRate}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Tuổi trung vị</span>
                  <span className="text-yellow-600 font-bold">{currentData.medianAge} tuổi</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Tuổi thọ TB</span>
                  <span className="text-indigo-600 font-bold">{currentData.lifeExpectancy} tuổi</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Đô thị hóa</span>
                  <span className="text-pink-600 font-bold">{currentData.urbanization}%</span>
                </div>
              </div>
            </div>

            {activeTab === 'forecast' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Tùy Chỉnh</h2>
                  <button
                    onClick={resetCustomValues}
                    className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số năm: {forecastYears}
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="10"
                      value={forecastYears}
                      onChange={(e) => setForecastYears(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tỷ lệ sinh: {customBirthRate !== null ? customBirthRate : currentData.birthRate}‰
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="45"
                      step="0.5"
                      value={customBirthRate !== null ? customBirthRate : currentData.birthRate}
                      onChange={(e) => setCustomBirthRate(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tỷ lệ tử: {customDeathRate !== null ? customDeathRate : currentData.deathRate}‰
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="20"
                      step="0.5"
                      value={customDeathRate !== null ? customDeathRate : currentData.deathRate}
                      onChange={(e) => setCustomDeathRate(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-800">Phân Tích AI</h3>
              </div>
              <div className="space-y-3">
                {getAIInsights().map((insight, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-white bg-opacity-50 p-3 rounded-lg">
                    <span className="mt-0.5">•</span>
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Tổng Quan - {currentData.name}</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                    <div className="text-sm text-gray-600 mb-2">Tổng Dân Số</div>
                    <div className="text-3xl font-bold text-blue-600">
                      {(currentData.population / 1000000).toFixed(1)} triệu
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                    <div className="text-sm text-gray-600 mb-2">Tăng Trưởng</div>
                    <div className="text-3xl font-bold text-green-600">
                      {currentData.growthRate > 0 ? '+' : ''}{currentData.growthRate}%
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3">Phân Bố Độ Tuổi</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: '0-14', value: currentData.pyramid[0].maleCount + currentData.pyramid[0].femaleCount },
                          { name: '15-29', value: currentData.pyramid[1].maleCount + currentData.pyramid[1].femaleCount },
                          { name: '30-44', value: currentData.pyramid[2].maleCount + currentData.pyramid[2].femaleCount },
                          { name: '45-59', value: currentData.pyramid[3].maleCount + currentData.pyramid[3].femaleCount },
                          { name: '60+', value: currentData.pyramid[4].maleCount + currentData.pyramid[4].femaleCount + currentData.pyramid[5].maleCount + currentData.pyramid[5].femaleCount }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold mb-2">Giai đoạn: {currentData.stage}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${currentData.stage * 20}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {currentData.stage === 2 && 'Bùng nổ dân số'}
                    {currentData.stage === 3 && 'Tăng trưởng chậm lại'}
                    {currentData.stage === 4 && 'Ổn định'}
                    {currentData.stage === 5 && 'Suy giảm'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'forecast' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Dự Báo - {currentData.name}</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={forecastData}>
                    <defs>
                      <linearGradient id="colorPop" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="population" stroke="#6366f1" fillOpacity={1} fill="url(#colorPop)" name="Dân số (triệu)" />
                  </AreaChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Hiện tại</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {(currentData.population / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Năm {2025 + forecastYears}</div>
                    <div className="text-2xl font-bold text-green-600">
                      {forecastData[forecastData.length - 1].population.toFixed(1)}M
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Thay đổi</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {(((forecastData[forecastData.length - 1].population - currentData.population / 1000000) / (currentData.population / 1000000)) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pyramid' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Tháp Dân Số - {currentData.name}</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={currentData.pyramid} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[-25, 25]} />
                    <YAxis dataKey="age" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="male" fill="#3b82f6" name="Nam (%)" />
                    <Bar dataKey="female" fill="#ec4899" name="Nữ (%)" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-2">Nam giới</h3>
                    <div className="text-2xl font-bold text-blue-600">
                      {(currentData.pyramid.reduce((sum, p) => sum + p.maleCount, 0) / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h3 className="font-bold text-pink-800 mb-2">Nữ giới</h3>
                    <div className="text-2xl font-bold text-pink-600">
                      {(currentData.pyramid.reduce((sum, p) => sum + p.femaleCount, 0) / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold mb-2">Đặc điểm cấu trúc:</h3>
                  <p className="text-sm text-gray-700">
                    {currentData.stage === 2 && 'Tháp hình kim tự tháp - đáy rộng cho thấy tỷ lệ sinh cao và dân số trẻ'}
                    {currentData.stage === 3 && 'Tháp đang chuyển đổi - đáy bắt đầu thu hẹp, dân số ở độ tuổi lao động chiếm tỷ trọng lớn'}
                    {currentData.stage === 4 && 'Tháp hình chuông - cấu trúc cân đối, dân số ổn định'}
                    {currentData.stage === 5 && 'Tháp hình bình hoa - đáy hẹp, đỉnh rộng, dân số già hóa nghiêm trọng'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'comparison' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">So Sánh Các Quốc Gia</h2>
                
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3">Dân Số (triệu người)</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="country" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="population" fill="#6366f1" name="Dân số" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3">Tỷ Lệ Tăng Trưởng (%)</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="country" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="growthRate" fill="#10b981" name="Tăng trưởng" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3">Tuổi Trung Vị</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="country" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="medianAge" fill="#f59e0b" name="Tuổi trung vị" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Tỷ Lệ Sinh vs Tử</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="country" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="birthRate" stroke="#10b981" strokeWidth={2} name="Tỷ lệ sinh" />
                      <Line type="monotone" dataKey="deathRate" stroke="#ef4444" strokeWidth={2} name="Tỷ lệ tử" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <h3 className="font-bold mb-2">💡 Nhận xét:</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Nigeria đang bùng nổ dân số với tỷ lệ tăng trưởng cao nhất (2.53%)</li>
                    <li>• Nhật Bản và Đức đang đối mặt với suy giảm dân số</li>
                    <li>• Việt Nam ở giai đoạn "cơ cấu dân số vàng" với dân số trẻ và tăng trưởng ổn định</li>
                    <li>• Tuổi trung vị thấp ở Nigeria (18.6) cho thấy dân số rất trẻ, trong khi Nhật Bản (49.1) là một trong những quốc gia già nhất thế giới</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI và Nghiên Cứu Dân Số</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-bold mb-2">Dự báo Chính Xác</h4>
              <p>AI phân tích hàng ngàn biến số (kinh tế, y tế, giáo dục, khí hậu) để tạo dự báo dân số chi tiết và chính xác hơn.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-bold mb-2">Mô Phỏng Chính Sách</h4>
              <p>Chạy kịch bản "nếu-thì" để đánh giá tác động của các chính sách dân số trước khi thực thi.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-bold mb-2">Phát Hiện Xu Hướng</h4>
              <p>Phân tích dữ liệu phi cấu trúc từ mạng xã hội, tin tức để phát hiện xu hướng mới nhanh hơn.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopulationDynamicsAI;