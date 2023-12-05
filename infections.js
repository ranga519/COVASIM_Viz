function plotInfections() {
  // Load data from JSON file
  d3.json("data.json").then(function (data) {
      // Extract data from JSON
      var dates = data.results.date.map(function(d) { return new Date(d); });
      var cumInfectious = data.results.cum_infectious.map(Number);

      // Set up the dimensions and margins of the graph
      var margin = { top: 30, right: 20, bottom: 30, left: 50 },
          width = 600 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

      // Remove existing SVG if any
      d3.select("svg").remove();

      // Append the SVG object to the body of the page
      var svg = d3.select("body").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // X and Y scales
      var x = d3.scaleTime().range([0, width]).domain(d3.extent(dates));
      var y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(cumInfectious)]);

      // Create the line
      var line = d3.line()
          .x(function (d, i) { return x(dates[i]); })
          .y(function (d) { return y(d); });

      // Add the line
      svg.append("path")
          .datum(cumInfectious)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 2)
          .attr("d", line);

      // Add X axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // Add Y axis
      svg.append("g")
          .call(d3.axisLeft(y));

      // Add title
      svg.append("text")
          .attr("x", width / 2)
          .attr("y", 0 - (margin.top / 2))
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .style("text-decoration", "underline")
          .text("Cumulative Infections");
  });
}