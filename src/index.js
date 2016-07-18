
var d3 = require('d3');

// Global setup
var margin = {top: 20, right: 30, bottom: 30, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var dragTreshold = 5;
var stepValue;
var maxValue;

// Mock data
function getData () {
  return {
    io: {
      min: 0,
      max: 100
    },
    triggers: [
      {name: 'Open', lowerLimit: 30, upperLimit: 40},
      {name: 'Closed', lowerLimit: 45, upperLimit: 55},
      {name: 'Shorted', lowerLimit: 60, upperLimit: 70},
      {name: 'Cut', lowerLimit: 15, upperLimit: 25}
    ]
  }
}

function getCallbacks () {
  return {
    onClick: function () {
      console.log('click');
      this.style.fill = 'green';
    },

    onDragStart: function (d, i) {
      // Hold current drag item
      window.rect = d3.select('[data-id=rect-' + i + ']');
      window.upperTxt = d3.select('[data-id=rectTextUpper-' + i + ']')
      window.lowerTxt = d3.select('[data-id=rectTextLower-' + i + ']');
      window.rectHeight = parseInt(window.rect.attr('height'));
      window.textPadding = Math.abs(d.upperLimit - d.lowerLimit);
      // Hold mouseposition to later know if we have clicked or moved
      window.mouseY = d3.event.y;
    },

    onDrag: function (d) {
      window.rect
       .attr('y', d.y = Math.max(0, Math.min(height - window.rectHeight, d3.event.y)));

      var rectY = parseInt(window.rect.attr('y'));

      window.upperTxt.text(mapYToStep(rectY));
      window.lowerTxt.text(mapYToStep(rectY + window.rectHeight));

      window.upperTxt.attr('y', rectY);
      window.lowerTxt.attr('y', rectY + window.rectHeight - window.textPadding);
    },

    onDragEnd: function (d) {
      // Check if we have moved
      if (Math.abs(d3.event.y - window.mouseY) >= dragTreshold) {
        console.log('Drag end');
        console.log('Current state: ' + d.name);
        console.log('Current lower: ' + window.lowerTxt.text());
        console.log('Current upper: ' + window.upperTxt.text());
      }
    }
  };
}

function getDragEvts (callbacks) {
  return d3.drag()
    .on('start', callbacks.onDragStart)
    .on('drag', callbacks.onDrag)
    .on('end', callbacks.onDragEnd);
}

function mapYToStep (y) {
  return parseInt(100 - y / stepValue);
}

function App () {
  // Get app callbacks object
  var callbacks = getCallbacks();
  // Setup dragevents with callbacks
  var dragEvts = getDragEvts(callbacks);
  // Get mock data
  var data = getData();
  // Get what a step on Y axis correlated to in value
  maxValue = data.io.max;
  stepValue = height / maxValue;

  // Axis setup
  var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .domain(data.triggers.map(function (d) { return d.name; }));

  var y = d3.scaleLinear()
    .range([height, 0])
    .domain([data.io.min, data.io.max]);

  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y);

  // Container svg
  var container = d3.select('.chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  container.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (height) + ')')
    .call(xAxis);

  container.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

  // Content svg
  var content = container.selectAll('.bar')
    .data(data.triggers)
    .enter()
    .append('g');

  // Rects
  content.append('rect')
  .attr('data-id', function (d, i) { return 'rect-' + i; })
  .attr('class', 'rect')
  .attr('x', function (d) { return x(d.name); })
  .attr('y', function (d) { return y(Math.max(d.lowerLimit, d.upperLimit)); })
  .attr('height', function (d) { return Math.abs(y(d.upperLimit) - y(d.lowerLimit)); })
  .attr('width', x.bandwidth())
  .on('click', callbacks.onClick)
  .call(dragEvts);

  content.append('text')
  .attr('data-id', function (d, i) { return 'rectTextUpper-' + i; })
  .attr('class', 'rect-text')
  .attr('x', function (d) { return x(d.name) + (x.bandwidth()/2); })
  .attr('y', function (d) { return y(Math.max(d.lowerLimit, d.upperLimit)); })
  .attr('dy', '.75em')
  .text(function (d) { return d.upperLimit; });

  content.append('text')
  .attr('data-id', function (d, i) { return 'rectTextLower-' + i; })
  .attr('class', 'rect-text')
  .attr('x', function (d) { return x(d.name) + (x.bandwidth()/2); })
  .attr('y', function (d) {
    return y(Math.min(d.lowerLimit, d.upperLimit)) - Math.abs(d.upperLimit - d.lowerLimit); })
  .attr('dy', '.75em')
  .text(function (d) { return d.lowerLimit; });
}

new App();
