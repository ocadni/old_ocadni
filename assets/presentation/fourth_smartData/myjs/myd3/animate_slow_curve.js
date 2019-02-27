( function( document ) {
  let w = parseInt(d3.select("#line").style("width"));
  let h = 200;
  //console.log(w, h)
  //console.log(d3)
  var svg = d3.select("#line")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id", "visualization")
    .attr("xmlns", "http://www.w3.org/2000/svg");

  var data = d3.range(11).map(function(n){
    n /= 10.;
    let num = 1. -  n*n + n * (Math.random() - 0.5);
    //console.log(num, n)
    return num > 0 ? num : 0;} )
  var x = d3.scaleLinear().domain([0, 10]).range([1, 250]);
  var y = d3.scaleLinear().domain([0, 1.1]).range([1, w-10]);
  var line = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d,i) {return x(i);})
    .y(function(d) {return y(d);})
  let path = null;

  let trans_foward = function(){
    path = svg.append("path")
      .attr("d", line(data))
      .attr("stroke", "steelblue")
      .attr("stroke-width", "4")
      .attr("fill", "none");
      var totalLength = path.node().getTotalLength();
      path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
    .transition()
      .duration(20000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);
    }
  let trans_backward = function(){
  path.remove()};

  document.addEventListener( "impress:stepenter", trans_foward);
  document.addEventListener( "impress:stepleave", trans_backward)

})( document );
