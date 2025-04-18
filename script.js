
const apiKey = "CWB-3F3D3EE2-48EA-49F6-87DE-C37BE73FE3F0";
const apiUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=${apiKey}&elementName=TEMP,WDSD,RAIN`;

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const stations = data.records.Station;
    const dongji = stations.find(s => s.StationName.includes("東吉島"));
    if (dongji) {
      document.getElementById("temp").textContent = dongji.WeatherElement[0].ElementValue;
      document.getElementById("wind").textContent = dongji.WeatherElement[1].ElementValue;
      document.getElementById("rain").textContent = dongji.WeatherElement[2].ElementValue;
    }
  })
  .catch(err => {
    console.error("氣象資料取得失敗", err);
  });

const ctx = document.getElementById('tempChart').getContext('2d');
const tempChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    datasets: [{
      label: '氣溫（°C）',
      data: [24.1, 23.9, 24.3, 25.7, 27.1, 28.5, 26.3, 25.0],
      borderWidth: 2,
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      fill: true,
      tension: 0.2
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});
