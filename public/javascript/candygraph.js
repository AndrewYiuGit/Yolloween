nv.addGraph(function() {
  var chart = nv.models.lineChart()
    .useInteractiveGuideline(true)
    ;

  chart.xAxis
    .axisLabel('Distance (m)')
    .tickFormat(d3.format(',r'))
    ;

  chart.yAxis
    .axisLabel('Candy')
    .tickFormat(d3.format('.r'))
    ;

  d3.select('#chart svg')
    .datum(getData())
    .transition().duration(500)
    .call(chart)
    ;

  nv.utils.windowResize(chart.update);

  return chart;
});

function getData() {
  var sin = [],
      cos = [];

  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.floor((Math.random() * 100) + 1)});
    cos.push({x: i, y: Math.floor((Math.random() * 100) + 1)});
  }

  return [
    {
      values: sin,
      key: 'Main Street',
      color: '#ff7f0e'
    },
    {
      values: cos,
      key: 'Front Street',
      color: '#2ca02c'
    }
  ];
}