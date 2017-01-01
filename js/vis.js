d3.json(TotalEntityFile, function (error, d) {
   
    //basic variabe assigned===========================================================================================
    state = 'Total Entity';
        
    function dimensionMin(dashboard, key, multiple) {
        min = dashboard['dimensions'][key].bottom(1)[0][key];
        minMultiple = multiple * Math.floor(min / multiple)
        return min - minMultiple < multiple / 2 ? minMultiple - multiple : minMultiple;
    }

    function dimensionMax(dashboard, key, multiple) {
        max = dashboard['dimensions'][key].top(1)[0][key];
        maxMultiple = multiple * Math.ceil(max / multiple);
        return maxMultiple - max < multiple / 2 ? maxMultiple + multiple : maxMultiple;
    }

    var isMobile = (function (a) { return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)) })(navigator.userAgent || navigator.vendor || window.opera)

    var point_Mobile = 200;
    var point_Normal = 1000;

    if (isMobile) d.splice(point_Mobile * 3);
    else d.splice(point_Normal * 3);
    $('#total-point').html(String(isMobile ? point_Mobile : point_Normal).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    
    var assetClasses = [
		'DomesticEquity',
		'DomesticFixedIncome',
		'OverseasEquity',
		'OverseasFixedIncome'
    ],
    colorMapping = ['#CC4F5D', '#367fc5', '#25aca2', '#41b1e4'],
    legend = [
        'Domestic Equity',
        'Domestic Fixed Income',
        'Overseas Equity',
        'Overseas Fixed Income'
    ];

    var bottomColor = "#2020a5", topColor = "#ff9901", saaSelected = [];

    var multipleX = 0.20, multipleY = 0.0005, smoother = 1.0;
    var multipleX_dist = 0.025; bottomPerc = 0.25, topPerc = 0.75;

    var currentWindowWidth = window.innerWidth;

    //Seconadary variable assign=================================================================================

    var dashboard = {}
    dashboard.children = {
        'c1': dc.scatterPlot("#chart1"),
        'c2': dc.barChart("#chart2"),
        'c3': dc.pieChart("#chart3"),
        'c4_1': dc.barChart("#chart4_1"),
        'c4_2': dc.barChart("#chart4_2"),
        'c4_3': dc.barChart("#chart4_3"),
        'c4_4': dc.barChart("#chart4_4"),
    };
    dashboard.ndx = crossfilter(d);
    //define the function of getting data
    dashboard.dimensions = {
        fund: dashboard.ndx.dimension(function (d) { return d.Fund; }),
        YieldGap: dashboard.ndx.dimension(function (d) { return +d.YieldGap; }),
        TotalRequiredCapital: dashboard.ndx.dimension(function (d) { return +d.TotalRequiredCapital; }),
        sampleSpace: dashboard.ndx.dimension(function (d) {
            return [
                multipleX * Math.round(+d.TotalRequiredCapital / multipleX),
                multipleY * Math.round(+d.YieldGap / multipleY),
            ];
        }),
    };
    dashboard.dimensions['fund'].filter(state);

    dashboard.groups = {}
    dashboard.groups['_sampleSpace'] = dashboard.dimensions['sampleSpace'].group().reduce(
        function (p, v) {
            p.count = (p.count || 0) + 1;
            p.x = ((p.x || 0) * (p.count - 1) + +v.TotalRequiredCapital) / p.count;
            p.y = ((p.y || 0) * (p.count - 1) + +v.YieldGap) / p.count;
            return p;
        },
        function (p, v) {
            p.count -= 1;
            p.x = p.count == 0 ? undefined : (p.x * (p.count + 1) - +v.TotalRequiredCapital) / p.count;
            p.y = p.count == 0 ? undefined : (p.y * (p.count + 1) - +v.YieldGap) / p.count;
            return p;
        },
        function () {
            return {};
        }
    );

    //================================================================================================================

    //c1 define demension
    var saaList = function () {
        //cannot get a better method, so just declare it again here
        gpdata = dashboard.groups['_sampleSpace'].all()
           .filter(function (d) { return d.value.count && d.value.x && d.value.y; })
        // get sum of SAAs
        return _saaList = gpdata.map(function (data, i) {
            var sumsaa = d3.sum(saaSelected.map(function (key) {
                return d[i][key];
            }));
            gpdata[i].sumsaa = sumsaa;
            return sumsaa;
        }).sort();
    }

    bottomAllc = function () {
        return (saaSelected.length != assetClasses.length &  saaSelected.length != 0) ? d3.quantile(saaList(), bottomPerc) : -0.1;
    };
    topAllc = function () {
        return (saaSelected.length != assetClasses.length & saaSelected.length != 0) ? d3.quantile(saaList(), topPerc) : 1.1;
    };

    //c1 define group
    dashboard.groups['sampleSpace'] = {
        all: function () {
            var _all = dashboard.groups['_sampleSpace'].all()
                .filter(function (d) { return d.value.count && d.value.x && d.value.y; }),
                _bottomAllc = bottomAllc(), _topAllc = topAllc();
            //console.log(_bottomAllc , _topAllc)
            return _all.map(function (d, i) {
                d.colorIdx = d.sumsaa <= _bottomAllc ? 'bottom' : d.sumsaa >= _topAllc ? 'top' : 'none';
                return d;
            });
        },
    }

    assetClasses.forEach(function (key) {
        dashboard.dimensions[key] = dashboard.ndx.dimension(function (d) { return multipleX_dist * Math.round(+d[key] / multipleX_dist); });
        dashboard.groups[key] = {
            all: function () {
                var _all = dashboard.dimensions[key].group().reduceCount().all()
                return _all.filter(function (d) { return d.value != 0; });
            },
        }
    });

    rangeX = function () { return [dimensionMin(dashboard, 'TotalRequiredCapital', multipleX), dimensionMax(dashboard, 'TotalRequiredCapital', multipleX)] }
    rangeY = function () { return [dimensionMin(dashboard, 'YieldGap', multipleY) - 0.0045, dimensionMax(dashboard, 'YieldGap', multipleY)] }

    saaColor = d3.scale.ordinal()
        .domain(['none', 'bottom', 'top'])
        .range(['#aaaaaa', bottomColor, topColor]);

    // Case 1: md or up; Case 2: sm or down 
    function height_c1() { return window.innerWidth >= 768 ? 320 : 220; }
    function margins_c1() { return window.innerWidth >= 768 ? { top: 10, right: 40, bottom: 45, left: 65 } : { top: 10, right: 15, bottom: 45, left: 65 }; }
    function height_c2() { return window.innerWidth >= 768 ? 300 : 200; }
    function margins_c2() { return window.innerWidth >= 768 ? { top: 30, right: 40, bottom: 45, left: 45 } : { top: 10, right: 15, bottom: 45, left: 40 }; }
    function height_c3() { return window.innerWidth >= 768 ? 250 : 420; }   
    function height_c4() { return window.innerWidth >= 768 ? 160 : window.innerWidth >= 544 ? 120 : 140; }
    function margins_c4() { return window.innerWidth >= 768 ? { top: 10, right: 10, bottom: 50, left: 20 } : { top: 10, right: 20, bottom: 40, left: 10 }; }

    //c1 define chart parameter
    dashboard.children['c1']
        .width($('#' + dashboard.children['c1'].anchorName()).width())
        .height(height_c1())
		.margins(margins_c1())
		.clipPadding(10)
		.x(d3.scale.linear().domain([rangeX()[0] * .9, rangeX()[1]]))
		.y(d3.scale.linear().domain(rangeY()))
		.xAxisLabel('Statutory Required Capital')
		.yAxisLabel('Spread')
        .xAxisPadding(.5)
        .yAxisPadding(0.0020)
		.dimension(dashboard.dimensions['sampleSpace'])
		.group(dashboard.groups['sampleSpace'])
		.renderHorizontalGridLines(true)
		.renderVerticalGridLines(true)
		.symbolSize(8)
        .excludedSize(5)
        .keyAccessor(function (d) { return d.value.x; })
        .valueAccessor(function (d) { return d.value.y; })
		.filterPrinter(function (filters) {
		    var s = Array(2);
		    filters = filters[0];
		    filters.forEach(function (f, i) {
		        s[i] = [d3.format(".4f")(f[0]), d3.format(".4f")(f[1])];
		    });
		    return 'Statutory Required Capital: ' + d3.format('.2f')(s[0][0]) + ' to ' + d3.format('.2f')(s[1][0]) + '; Interest Spread: ' + Math.round(s[0][1] * 10000) + ' bps to ' + d3.format('.0f')(s[1][1] * 10000) + ' bps';
		})
		.colors(function (d) { return saaColor(d); })
		.colorAccessor(function (d) { return d.colorIdx; })
        .transitionDuration(0);

    dashboard.children['c1'].xAxis().outerTickSize(0);
    dashboard.children['c1'].yAxis().ticks(6).outerTickSize(0)
		.tickFormat(function (h) {
		    return d3.format('.0f')(h * 10000) + ' bps';
		});

    //====================================================================================================================

    //c2
    numTopSAA = 10;
    $("span#saa-count").html(numTopSAA);

    //c2 define dimension
    topDim = dashboard.ndx.dimension(function (d) {     
        return +d.YieldGap / +d.TotalRequiredCapital;
    });

    //c2 define group
    dashboard.groups['topGroup'] = {
        all: function () {
            gp = topDim.top(Infinity).slice(0, numTopSAA)
                .map(function (e, i) { return { key: i, value: e } });
            return gp;
        }
    };

    //c2 define chart para
    dashboard.children['c2']
        .width($('#' + dashboard.children['c2'].anchorName()).width())
        .height(height_c2())
		.margins(margins_c2())
        .brushOn(false)
        .centerBar(true)
        .xAxisLabel("Rank")
        .yAxisLabel("Allocation")
        .x(d3.scale.linear().domain([1 - 0.5, numTopSAA + 0.5]))
        .y(d3.scale.linear().domain([0, 1]))
        .elasticX(false)
        .colors(d3.scale.ordinal().range(colorMapping))
        .xAxisPadding(0.5)
        .title(function (g) {
            layer = +this.layer;
            return legend[layer] + ": " + d3.format(".0%")(g.value[assetClasses[layer]]);
        })
        .keyAccessor(function (g, i) {
            return i + 1;
        })
        .dimension(topDim)
        .group(dashboard.groups['topGroup'], "0", function (g) {
            return g.value[assetClasses[0]];
        });


    //Looping with objects has to be done this way
    function stackTopChart(key, i) {
        dashboard.children['c2'].stack(dashboard.groups['topGroup'], i.toString(), function (g) {
        return g.value[key];
        })
    }

    //c2 define chart para
    assetClasses.forEach(function (key, i) {
        if (i != 0) stackTopChart(key, i);
    })

    //c2 define chart para
    dashboard.children['c2'].xAxis().ticks(numTopSAA).outerTickSize(0);
    dashboard.children['c2'].yAxis().ticks(4).outerTickSize(0)
        .tickFormat(function (h) { return d3.format(".0%")(h) });;



    //================================================================================================================
    //c3 define dimension
    sampleSpaceDim = dashboard.ndx.dimension(function (d) {
        return [+d.TotalRequiredCapital, +d.YieldGap];
    });

    //c3 define group
    dashboard.groups['avgGroup'] = {
         all: function () {
             grouped = sampleSpaceDim.top(Infinity);
             outputGroup = [];
             assetClasses.forEach(function (key, i) {
                 outputGroup.push({
                     name: legend[i],
                     key: key,
                     value: d3.mean(grouped, function (d) {
                         return +d[key]
                     })
                });
             });
             return outputGroup;
         }
    };

    //c3 define chart para
    dashboard.children['c3']
        .dimension(dashboard.ndx)
        .group(dashboard.groups['avgGroup'])
        .colors(d3.scale.ordinal()
            .domain(legend)
            .range(colorMapping))
        .innerRadius(0)
        .externalRadiusPadding(10)
        .drawPaths(true)
        .label(function (d) { return d3.format(".0%")(d.value); })
        .legend(dc.legend().itemHeight(14)
            .legendText(function (d) {
                return d.name;
        }))                             
        .title(function (d) {
            return d.name + ": " + d3.format(".0%")(d.value);
        })
        .controlsUseVisibility(true)
        .on("filtered", function () {
            saaSelected = dashboard.children['c3'].filters();
        })
        .width($('#' + dashboard.children['c3'].anchorName()).width())
        .height(height_c3());


    //=======================================================================================================
    //c4
    rangeX_dist = {};    
    _height_c4 = height_c4(); _margins_c4 = margins_c4();
    

    //define parameter in each chart in c4
    assetClasses.forEach(function (key, i) {
        childName = 'c4_' + (i + 1);        
        rangeX_dist[key] = function () { return [dimensionMin(dashboard, key, multipleX_dist), dimensionMax(dashboard, key, multipleX_dist)]; };
        dashboard.children[childName]
            .width($('#' + dashboard.children[childName].anchorName()).width())
            .height(_height_c4)
		    .margins(_margins_c4)
		    .gap(0)
	        .xAxisLabel(key.replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3'))
	        //.x(d3.scale.linear().domain(rangeX_dist[key]()))
	        .x(d3.scale.linear().domain([0, 1]))
		    .xUnits(function () { return dashboard.groups[key].all().length; })
		    .dimension(dashboard.dimensions[key])
		    .group(dashboard.groups[key])
		    .filterPrinter(function (filters) {
		        lowerBound = d3.format(".0%")(Math.max(0, filters[0][0]));
		        upperBound = d3.format(".0%")(Math.min(1, filters[0][1]));
		        return lowerBound + ' to ' + upperBound;
		    })
            .keyAccessor(function (d) { return d.key; })
            .valueAccessor(function (d) { return d.value; })
		    .colors(colorMapping[i])
		    .brushOn(true)
		    .elasticX(true)
		    .elasticY(true)
		    .centerBar(true)
		    .controlsUseVisibility(true);
        if (window.innerWidth >= 768) {
            dashboard.children[childName].xAxis().ticks(4).outerTickSize(0).tickFormat(d3.format('.0%'));
            dashboard.children[childName].yAxis().ticks(4).outerTickSize(0);
        } else {
            dashboard.children[childName].xAxis().ticks(3).outerTickSize(0).tickFormat(d3.format('.0%'));
            dashboard.children[childName].yAxis().ticks(0);
        }
    });


    for (key in dashboard.children) {
        dashboard.children[key].render();
    }

    /* Re-render charts again to correct margins; An ill way to do but at least it works*/
    //I see and therefore there will be a bit 'lag' after I click it lol..
    _height_c1 = height_c1(); _height_c4 = height_c4();
    _margins_c1 = margins_c1(); _margins_c4 = margins_c4();

    dashboard.children['c1']
        .height(_height_c1)
        .margins(_margins_c1);

    //c4
    assetClasses.forEach(function (key, i) {
        childName = 'c4_' + (i + 1);
        dashboard.children[childName]
            .height(_height_c4)
            .margins(_margins_c4);
        if (window.innerWidth >= 768) {
            dashboard.children[childName].xAxis().ticks(4).outerTickSize(0).tickFormat(d3.format('.0%'));
            dashboard.children[childName].yAxis().ticks(4).outerTickSize(0);
        } else {
            dashboard.children[childName].xAxis().ticks(3).outerTickSize(0).tickFormat(d3.format('.0%'));
            dashboard.children[childName].yAxis().ticks(0);
        }
    });

    //=================================================================================================================

    dc.dataCount(".dc-data-count")
        .dimension(dashboard.ndx)
        .group(dashboard.ndx.groupAll())
        .render();
    $("#total-count").html(String(d.length / 3).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))

    var buttonMapping = {
        '#par': 'PAR',
        '#npar': 'NPAR',
        '#totalentity': 'Total Entity',
    }

    for (var key in buttonMapping) {
        (function (_key) {
            $(_key).on("click", function () {
                dc.filterAll();
                dashboard.dimensions['fund'].filter(buttonMapping[_key]);
                dashboard.children['c1']
                    .x(d3.scale.linear().domain([rangeX()[0] * .9, rangeX()[1]]))
                    .y(d3.scale.linear().domain(rangeY()));
                $('.btn-filter').removeClass('active');
                $(this).addClass('active');
                dc.redrawAll();
            });
        })(key);
    }

    //for the reset
    $("#reset").on("click", function () {
        dc.filterAll();
        dashboard.children['c1']
		    .x(d3.scale.linear().domain([rangeX()[0] * .9, rangeX()[1]]))
		    .y(d3.scale.linear().domain(rangeY()));
        dc.redrawAll();
    });

    $("#chart1-reset").on("click", function () {
        dashboard.children['c1'].filterAll();
        dashboard.children['c1']
		    .x(d3.scale.linear().domain([rangeX()[0] * .9, rangeX()[1]]))
		    .y(d3.scale.linear().domain(rangeY()));
        dc.redrawAll();
    });

    $("#loading,#complete").toggle();

    function resize() {

        if (window.innerWidth != currentWindowWidth) {
            for (var key in dashboard.children) {
                dashboard.children[key]
                    .width($('#' + dashboard.children[key].anchorName()).width());
            }

            _height_c1 = height_c1();
            _height_c2 = height_c2();
            _height_c3 = height_c3();
            _height_c4 = height_c4();
            _margins_c1 = margins_c1();
            _margins_c2 = margins_c2();
            _margins_c4 = margins_c4();

            dashboard.children['c1']
                .height(_height_c1)
                .margins(_margins_c1);

            dashboard.children['c2']
                .height(_height_c2)
                .margins(_margins_c2);

            dashboard.children['c3']
                .height(_height_c3)

            assetClasses.forEach(function (key, i) {
                childName = 'c4_' + (i + 1);
                dashboard.children[childName]
                    .height(_height_c4)
		            .margins(_margins_c4);
                if (window.innerWidth >= 768) {
                    dashboard.children[childName].xAxis().ticks(4).outerTickSize(0).tickFormat(d3.format('.0%'));
                    dashboard.children[childName].yAxis().ticks(4).outerTickSize(0);
                } else {
                    dashboard.children[childName].xAxis().ticks(3).outerTickSize(0).tickFormat(d3.format('.0%'));
                    dashboard.children[childName].yAxis().ticks(0);
                }
            });
        }

        for (key in dashboard.children) {
            dashboard.children[key].render();
        }
        currentWindowWidth = window.innerWidth;
    }

    window.onresize = resize;
    $(window).on("orientationchange", resize);

    $(document).ready(resize);
});
