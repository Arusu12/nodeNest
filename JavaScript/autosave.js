function saveChartToCache() {
    const chartData = JSON.stringify(nodes);
    localStorage.setItem('mindChart', chartData);
  }
  
  setInterval(saveChartToCache, 1000);
  
  // Function to load the chart from browser cache
  function loadChartFromCache() {
    const chartData = localStorage.getItem('mindChart');
    if (chartData) {
      nodes = JSON.parse(chartData);
      drawMindChart();
    }
  }
  
  loadChartFromCache();