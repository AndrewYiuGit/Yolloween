var chart;
var dataSet = [];
var color = [
"#602749",
"#F6921D",
"#96323E",
"#B14623",
"#130912",
"#3E1C33"
];
var count = -1;

nv.addGraph(function() {
  chart = nv.models.lineWithFocusChart()
  ;

  chart.xAxis
  .axisLabel('Street Number (m)')
  .tickFormat(d3.format(',r'))
  ;

  chart.yAxis
  .axisLabel('Candy')
  .tickFormat(d3.format('.r'))
  ;

  chart.y2Axis
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

function updateChart(){
  var street_name =$('#streetInput').val();
  var request = $.ajax(
  {
    url: '/yocalls/street_rating',
    type: 'GET',
    data: 'street='+street_name.replace(" ","+"),
    success: function(data) {
      console.log(data);
      dataSet.push({
        street_name: street_name,
        data: data});
      d3.select('#chart svg')
      .datum(getData())
      .transition().duration(500)
      .call(chart)
      ;
    },
    error: function(e) {
      console.log("FAIL");
    }
  });
}

function getData() {
  var returnSet = [];
  for(var i = 0 ; i < dataSet.length; i ++){
    returnSet.push({
      values: dataSet[i].data,
      key: dataSet[i].street_name,
      color: color[i]});
  }
  return returnSet;
}