var yearRingChart   = dc.pieChart("#chart-ring-year"),
    spendHistChart  = dc.barChart("#chart-hist-spend"),
    spenderRowChart = dc.rowChart("#chart-row-spenders");
// use static or load via d3.csv("spendData.csv", function(error, spendData) {/* do stuff */});
var spendData = [
    {Name: 'CUP', Spent: '$4000', Year: 20},
    {Name: 'Platinum', Spent: '$1000', Year: 30},
    {Name: 'i-card', Spent: '$4000', Year: 40},
    {Name: 'Travel', Spent: '$7000', Year: 20},
    {Name: 'Co-branded', Spent: '$2000', Year: 30},
    {Name: 'Platinum', Spent: '$5000', Year: 50},
    {Name: 'i-card', Spent: '$3000', Year: 60},
	{Name: 'CUP', Spent: '$4000', Year: 20},
    {Name: 'Platinum', Spent: '$1000', Year: 30},
    {Name: 'i-card', Spent: '$4000', Year: 20},
    {Name: 'Travel', Spent: '$9000', Year: 20},
    {Name: 'Co-branded', Spent: '$2000', Year: 30},
    {Name: 'Platinum', Spent: '$5000', Year: 50},
    {Name: 'i-card', Spent: '$3000', Year: 20},
	{Name: 'Travel', Spent: '$2000', Year: 20},
    {Name: 'Co-branded', Spent: '$1000', Year: 20},
    {Name: 'Platinum', Spent: '$1000', Year: 20},
    {Name: 'i-card', Spent: '$1000', Year: 30},
	{Name: 'CUP', Spent: '$4000', Year: 20},
    {Name: 'Platinum', Spent: '$9000', Year: 70},
	{Name: 'Co-branded', Spent: '$1000', Year: 20},	
	{Name: 'Co-branded', Spent: '$5000', Year: 30},
	{Name: 'Co-branded', Spent: '$1000', Year: 40},
	{Name: 'Co-branded', Spent: '$3000', Year: 50},
	{Name: 'Co-branded', Spent: '$2000', Year: 60},
	{Name: 'Co-branded', Spent: '$1000', Year: 20},	
	{Name: 'Co-branded', Spent: '$5000', Year: 30},
	{Name: 'Co-branded', Spent: '$1000', Year: 40},
	{Name: 'Co-branded', Spent: '$3000', Year: 50},
	{Name: 'Co-branded', Spent: '$1000', Year: 20},	
	{Name: 'Co-branded', Spent: '$5000', Year: 30},
	{Name: 'Co-branded', Spent: '$1000', Year: 40},
	{Name: 'Co-branded', Spent: '$3000', Year: 50},
	{Name: 'Co-branded', Spent: '$2000', Year: 60},
	{Name: 'Co-branded', Spent: '$1000', Year: 20},	
	{Name: 'Co-branded', Spent: '$5000', Year: 30},
	{Name: 'Co-branded', Spent: '$1000', Year: 40},
	{Name: 'Co-branded', Spent: '$3000', Year: 50},
	{Name: 'Co-branded', Spent: '$2000', Year: 60},
	{Name: 'Co-branded', Spent: '$2000', Year: 20},	
	{Name: 'Co-branded', Spent: '$2000', Year: 60},
	{Name: 'Co-branded', Spent: '$2000', Year: 20},	
	{Name: 'Co-branded', Spent: '$5000', Year: 30},
	{Name: 'Co-branded', Spent: '$3000', Year: 40},
	{Name: 'Co-branded', Spent: '$3000', Year: 50},
	{Name: 'Co-branded', Spent: '$2000', Year: 60},
	{Name: 'Travel', Spent: '$1000', Year: 20},
	{Name: 'Travel', Spent: '$2000', Year: 30},
	{Name: 'Travel', Spent: '$2000', Year: 20},
	{Name: 'Travel', Spent: '$1000', Year: 60},
	{Name: 'Travel', Spent: '$9000', Year: 70},
	{Name: 'Travel', Spent: '$8000', Year: 60},
	{Name: 'Travel', Spent: '$7000', Year: 70},
	{Name: 'Travel', Spent: '$8000', Year: 60},
	{Name: 'Travel', Spent: '$9000', Year: 70},
	{Name: 'CUP', Spent: '$1000', Year: 20},
	{Name: 'CUP', Spent: '$2000', Year: 30},
	{Name: 'CUP', Spent: '$3000', Year: 20},
	{Name: 'CUP', Spent: '$3000', Year: 40},
	{Name: 'CUP', Spent: '$1000', Year: 20},
	{Name: 'CUP', Spent: '$2000', Year: 30},
	{Name: 'CUP', Spent: '$3000', Year: 40},
	{Name: 'CUP', Spent: '$1000', Year: 50},
	{Name: 'CUP', Spent: '$2000', Year: 70},
	{Name: 'CUP', Spent: '$1000', Year: 60},
	{Name: 'CUP', Spent: '$2000', Year: 50},
	{Name: 'CUP', Spent: '$1000', Year: 20},
	{Name: 'CUP', Spent: '$2000', Year: 30},
	{Name: 'CUP', Spent: '$3000', Year: 20},
	{Name: 'CUP', Spent: '$3000', Year: 40},
	{Name: 'CUP', Spent: '$1000', Year: 20},
	{Name: 'CUP', Spent: '$2000', Year: 30},
	{Name: 'CUP', Spent: '$3000', Year: 40},
	{Name: 'CUP', Spent: '$1000', Year: 50},
	{Name: 'CUP', Spent: '$2000', Year: 70},
	{Name: 'CUP', Spent: '$1000', Year: 60},
	{Name: 'CUP', Spent: '$2000', Year: 50},
	{Name: 'CUP', Spent: '$1000', Year: 20},
	{Name: 'CUP', Spent: '$2000', Year: 30},
	{Name: 'CUP', Spent: '$3000', Year: 20},
	{Name: 'CUP', Spent: '$3000', Year: 40},
	{Name: 'CUP', Spent: '$1000', Year: 20},
	{Name: 'CUP', Spent: '$2000', Year: 30},
	{Name: 'CUP', Spent: '$3000', Year: 40},
	{Name: 'CUP', Spent: '$6000', Year: 50},
	{Name: 'CUP', Spent: '$2000', Year: 70},
	{Name: 'CUP', Spent: '$6000', Year: 60},
	{Name: 'CUP', Spent: '$2000', Year: 50},
	{Name: 'CUP', Spent: '$6000', Year: 20},
	{Name: 'CUP', Spent: '$2000', Year: 30},
	{Name: 'CUP', Spent: '$3000', Year: 20},
	{Name: 'CUP', Spent: '$3000', Year: 40},
	{Name: 'CUP', Spent: '$6000', Year: 20},
	{Name: 'CUP', Spent: '$2000', Year: 30},
	{Name: 'CUP', Spent: '$3000', Year: 40},
	{Name: 'CUP', Spent: '$1000', Year: 50},
	{Name: 'CUP', Spent: '$5000', Year: 70},
	{Name: 'CUP', Spent: '$6000', Year: 60},
	{Name: 'CUP', Spent: '$2000', Year: 50},
	{Name: 'i-card', Spent: '$2000', Year: 20},
	{Name: 'i-card', Spent: '$1000', Year: 30},
	{Name: 'i-card', Spent: '$1000', Year: 20},
	{Name: 'i-card', Spent: '$2000', Year: 40},
	{Name: 'i-card', Spent: '$1000', Year: 30},
	{Name: 'i-card', Spent: '$2000', Year: 20},
	{Name: 'i-card', Spent: '$1000', Year: 30},
	{Name: 'i-card', Spent: '$1000', Year: 20},
	{Name: 'i-card', Spent: '$2000', Year: 40},
	{Name: 'i-card', Spent: '$1000', Year: 30},
	{Name: 'i-card', Spent: '$2000', Year: 20},
	{Name: 'i-card', Spent: '$1000', Year: 30},
	{Name: 'i-card', Spent: '$1000', Year: 20},
	{Name: 'i-card', Spent: '$2000', Year: 40},
	{Name: 'i-card', Spent: '$1000', Year: 30},
	{Name: 'Platinum', Spent: '$3000', Year: 40},
	{Name: 'Platinum', Spent: '$5000', Year: 50},
	{Name: 'Platinum', Spent: '$4000', Year: 30},
	{Name: 'Platinum', Spent: '$7000', Year: 40},
	{Name: 'Platinum', Spent: '$7000', Year: 50},
	{Name: 'Platinum', Spent: '$6000', Year: 30},
	{Name: 'Platinum', Spent: '$5000', Year: 40},
	{Name: 'Platinum', Spent: '$3000', Year: 40},
	{Name: 'Platinum', Spent: '$5000', Year: 50},
	{Name: 'Platinum', Spent: '$4000', Year: 30},
	{Name: 'Platinum', Spent: '$7000', Year: 40},
	{Name: 'Platinum', Spent: '$7000', Year: 50},
	{Name: 'Platinum', Spent: '$6000', Year: 30},
	{Name: 'Platinum', Spent: '$5000', Year: 40},
];
// normalize/parse data
spendData.forEach(function(d) {
    d.Spent = d.Spent.match(/\d+/);
});
// set crossfilter
var ndx = crossfilter(spendData),
    yearDim  = ndx.dimension(function(d) {return +d.Year;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.Spent/1000);}),
    nameDim  = ndx.dimension(function(d) {return d.Name;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Spent;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return Math.floor(d.Spent/1000);}),
    spendHist    = spendDim.group().reduceCount();

colorMapping = ['#173652','#285e8e', '#428bca','#41b1e4', '#84ccee', '#c7e8f7'];
	
yearRingChart
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(50)
    .controlsUseVisibility(true)
	.width(400)
	.height(400)
	.colors(d3.scale.ordinal().range(colorMapping));
spendHistChart
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true)
    .controlsUseVisibility(true)
	.width(350)
	.height(200);
spendHistChart.xAxis().tickFormat(function(d) {return d.toString()+'k'}); // convert back to base unit
spendHistChart.yAxis().ticks(5);
spenderRowChart
    .dimension(nameDim)
    .group(spendPerName)
    .elasticX(true)
    .controlsUseVisibility(true)
	.width(320)
	.height(180)
	.colors(d3.scale.ordinal().range(colorMapping));
spenderRowChart.xAxis().tickFormat(function(d) {return d.toString()+'k'}).ticks(5); // convert back to base unit
dc.renderAll();

$('#chart-hist-spend-1').click(function() {
	spendHistChart.filterAll();
	dc.redrawAll();
})
