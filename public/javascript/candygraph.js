var chart;
var dataSet = [];

nv.addGraph(function() {
  chart = nv.models.lineChart()
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

  updateChart();
  nv.utils.windowResize(chart.update);

  return chart;
});

function updateChart(){
  $.get( "/yocalls/streetRating", { street: "Massachusetts Avenue"} )
  .done(function( data ) {
    dataSet.push(resp.data);
    alert( "Data Loaded: " + data );
  });
  // $http.get('/yocalls/streetRating?street='+"Massachusetts Avenue").then(function(resp) {
  //   console.log('Success', resp);
  //   dataSet.push(resp.data);
  //   // For JSON responses, resp.data contains the result
  // }, function(err) {
  //   console.error('ERR', err);
  //   // err.status will contain the status code
  // });
  // db.getStreetRatings('Massachusetts Avenue', function(data){
  //   dataSet.push(data);
  // });
d3.select('#chart svg')
.datum(getData())
.transition().duration(500)
.call(chart)
;
}

function getData() {
  var returnSet = [];
  for(var i = 0 ; i < dataSet.length; i ++){
    returnSet.push({
      values: dataSet[i],
      key: ('Main Street' + i),
      color: '#ff7f0e'});
  }
  return returnSet;
}