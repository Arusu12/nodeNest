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

function newNodeMap(){
  const confirmation = confirm('Note that this will delete the current map. If you want to save the current map, please export as JSON before you continue.')
  if (confirmation) {
  sessionStorage.removeItem('mindChart')
  nodes = [
    { id: 1, x: 400, y: 300, name: 'Core', connections: [0], note: 'Note 1...', color:'#FFFFFF' },
    { id: 2, x: 200, y: 100, name: 'Node 2', connections: [1], note: 'note 2', color:'#FFFFFF' },
    { id: 3, x: 600, y: 100, name: 'Node 3', connections: [1], note: 'note 3', color:'#FFFFFF' },
    { id: 4, x: 400, y: 500, name: 'Node 4', connections: [1], note: 'note 4', color:'#FFFFFF' }
  ];
  drawMindChart();
  } else{

  }
}