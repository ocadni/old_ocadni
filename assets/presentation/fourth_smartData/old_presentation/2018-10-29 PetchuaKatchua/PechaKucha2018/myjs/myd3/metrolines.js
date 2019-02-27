
( function( document ) {
  let w = parseInt(d3.select("#metrolines").style("width"));
  let h = parseInt(d3.select("#metrolines").style("height"));
  //console.log(w, h)
  //console.log(d3)

  var svg = d3.select("#metrolines")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("id", "visualization");
    let stops = 10;

    var x = d3.scaleLinear().domain([0, stops]).range([0, w]);
    var x_inv = d3.scaleLinear().domain([0, stops]).range([w, 0]);
    var y = d3.scaleLinear().domain([0, stops]).range([10, h - 10]);
    var y_inv = d3.scaleLinear().domain([0, stops]).range([h - 10, 10]);

    var line = d3.line()
      .x(function(d,i) {return x(i);})
      .y(function(d) {return y(d);})
      .curve(d3.curveStep)
    var line_inv = d3.line()
        .x(function(d,i) {return  x_inv(i);})
        .y(function(d) {return y(d);})
        .curve(d3.curveStep)
      var line_inv_inv = d3.line()
          .x(function(d,i) {return  x_inv(i);})
          .y(function(d) {return y(d);})
          .curve(d3.curveStep)

    let paths = [];
    let animate = (path) => {
      var totalLength = path.node().getTotalLength();
      path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
          .duration(20000)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0)
      };
    // data is created inside the function so it is always unique
    let repeat = () => {
      if ($("#questions").hasClass("active")){
        var M1 = [0];
        for(let i = 1; i < stops; i++){
          M1[i] = 2 + M1[i-1] + 2 * Math.floor(0.3-Math.random());
        }
        var M2 = [9];
        for(let i = 1; i < stops; i++){
          M2[i] = -1 + M2[i-1] + 2 * Math.floor(0.3-Math.random());
        }
        var M3 = [0];
        for(let i = 1; i < stops; i++){
          M3[i] = 2 + M3[i-1] + 2 * Math.floor(0.3-Math.random());
        }
        var M4 = [9];
        for(let i = 1; i < stops; i++){
          M4[i] = -1 + M4[i-1] + 2 * Math.floor(0.3-Math.random());
        }

       /*d3.range(20).map(function(n){
          return Math.ceil( 0.5 - Math.random()) + n
        })*/
        //console.log(M1, M2)
        // Uncomment following line to clear the previously drawn line
        //svg.selectAll("path").remove();

        // Set a light grey class on old paths
        //svg.selectAll("path").attr("class", "old");

        var path_M1 = svg.append("path")
          .attr("d", line(M1))
          .attr("class", "M1 metro_lines")
        animate(path_M1);
        paths.push(path_M1)
        var path_M2 = svg.append("path")
          .attr("d", line(M2))
          .attr("class", "M2 metro_lines")
        animate(path_M2);
        paths.push(path_M2)
        var path_M3 = svg.append("path")
          .attr("d", line_inv(M3))
          .attr("class", "M3 metro_lines")
        animate(path_M3);
        paths.push(path_M3)
        var path_M4 = svg.append("path")
          .attr("d", line_inv_inv(M4))
          .attr("class", "M4 metro_lines")
        animate(path_M4);
        paths.push(path_M4)


      }
    };

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
    for (p in paths){
      paths[p].remove()
    }
    paths = [];
    };

  document.addEventListener( "impress:stepenter", repeat);
  document.addEventListener( "impress:stepleave", trans_backward)

})( document );
