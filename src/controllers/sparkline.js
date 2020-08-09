import Store from "../store";

//sparkline设置
let createClass = function (/* [baseclass, [mixin, ...]], definition */) {
    let Class, args;
    Class = function () {
        this.init.apply(this, arguments);
    };
    if (arguments.length > 1) {
        if (arguments[0]) {
            Class.prototype = $.extend(new arguments[0](), arguments[arguments.length - 1]);
            Class._super = arguments[0].prototype;
        } else {
            Class.prototype = arguments[arguments.length - 1];
        }
        if (arguments.length > 2) {
            args = Array.prototype.slice.call(arguments, 1, -1);
            args.unshift(Class.prototype);
            $.extend.apply($, args);
        }
    } else {
        Class.prototype = arguments[0];
    }
    Class.prototype.cls = Class;
    return Class;
};

/**
 * Wraps a format string for tooltips
 * {{x}}
 * {{x.2}
 * {{x:months}}
 */
let SPFormat = createClass({
    fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g,
    precre: /(\w+)\.(\d+)/,

    init: function (format, fclass) {
        this.format = format;
        this.fclass = fclass;
    },

    render: function (fieldset, lookups, options) {
        let self = this,
            fields = fieldset,
            match, token, lookupkey, fieldvalue, prec;
        return this.format.replace(this.fre, function () {
            let lookup;
            token = arguments[1];
            lookupkey = arguments[3];
            match = self.precre.exec(token);
            if (match) {
                prec = match[2];
                token = match[1];
            } else {
                prec = false;
            }
            fieldvalue = fields[token];
            if (fieldvalue === undefined) {
                return '';
            }
            if (lookupkey && lookups && lookups[lookupkey]) {
                lookup = lookups[lookupkey];
                if (lookup.get) { // RangeMap
                    return lookups[lookupkey].get(fieldvalue) || fieldvalue;
                } else {
                    return lookups[lookupkey][fieldvalue] || fieldvalue;
                }
            }
            if (isNumber(fieldvalue)) {
                if (options.get('numberFormatter')) {
                    fieldvalue = options.get('numberFormatter')(fieldvalue);
                } else {
                    fieldvalue = formatNumber(fieldvalue, prec,
                        options.get('numberDigitGroupCount'),
                        options.get('numberDigitGroupSep'),
                        options.get('numberDecimalMark'));
                }
            }
            return fieldvalue;
        });
    }
});

// convience method to avoid needing the new operator
$.spformat = function(format, fclass) {
    return new SPFormat(format, fclass);
};

let clipval = function (val, min, max) {
    if (val < min) {
        return min;
    }
    if (val > max) {
        return max;
    }
    return val;
};

let quartile = function (values, q) {
    let vl;
    if (q === 2) {
        vl = Math.floor(values.length / 2);
        return values.length % 2 ? values[vl] : (values[vl-1] + values[vl]) / 2;
    } else {
        if (values.length % 2 ) { // odd
            vl = (values.length * q + q) / 4;
            return vl % 1 ? (values[Math.floor(vl)] + values[Math.floor(vl) - 1]) / 2 : values[vl-1];
        } else { //even
            vl = (values.length * q + 2) / 4;
            return vl % 1 ? (values[Math.floor(vl)] + values[Math.floor(vl) - 1]) / 2 :  values[vl-1];

        }
    }
};

let normalizeValue = function (val) {
    let nf;
    switch (val) {
        case 'undefined':
            val = undefined;
            break;
        case 'null':
            val = null;
            break;
        case 'true':
            val = true;
            break;
        case 'false':
            val = false;
            break;
        default:
            nf = parseFloat(val);
            if (val == nf) {
                val = nf;
            }
    }
    return val;
};

let normalizeValues = function (vals) {
    let i, result = [];
    for (i = vals.length; i--;) {
        result[i] = normalizeValue(vals[i]);
    }
    return result;
};


let all = function (val, arr, ignoreNull) {
    let i;
    for (i = arr.length; i--; ) {
        if (ignoreNull && arr[i] === null) continue;
        if (arr[i] !== val) {
            return false;
        }
    }
    return true;
};

// sums the numeric values in an array, ignoring other values
let sum = function (vals) {
    let total = 0, i;
    for (i = vals.length; i--;) {
        total += typeof vals[i] === 'number' ? vals[i] : 0;
    }
    return total;
};

let remove = function (vals, filter) {
    let i, vl, result = [];
    for (i = 0, vl = vals.length; i < vl; i++) {
        if (vals[i] !== filter) {
            result.push(vals[i]);
        }
    }
    return result;
};

let isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

let formatNumber = function (num, prec, groupsize, groupsep, decsep) {
    let p, i;
    num = (prec === false ? parseFloat(num).toString() : num.toFixed(prec)).split('');
    p = (p = $.inArray('.', num)) < 0 ? num.length : p;
    if (p < num.length) {
        num[p] = decsep;
    }
    for (i = p - groupsize; i > 0; i -= groupsize) {
        num.splice(i, 0, groupsep);
    }
    return num.join('');
};


let RangeMap = createClass({
    init: function (map) {
        let key, range, rangelist = [];
        for (key in map) {
            if (map.hasOwnProperty(key) && typeof key === 'string' && key.indexOf(':') > -1) {
                range = key.split(':');
                range[0] = range[0].length === 0 ? -Infinity : parseFloat(range[0]);
                range[1] = range[1].length === 0 ? Infinity : parseFloat(range[1]);
                range[2] = map[key];
                rangelist.push(range);
            }
        }
        this.map = map;
        this.rangelist = rangelist || false;
    },

    get: function (value) {
        let rangelist = this.rangelist,
            i, range, result;
        if ((result = this.map[value]) !== undefined) {
            return result;
        }
        if (rangelist) {
            for (i = rangelist.length; i--;) {
                range = rangelist[i];
                if (range[0] <= value && range[1] >= value) {
                    return range[2];
                }
            }
        }
        return undefined;
    }
});

// Convenience function
$.range_map = function(map) {
    return new RangeMap(map);
};

const luckysheetSparkline = {
    defaultOption:{
        // Settings common to most/all chart types
        common: {
            type: 'line',
            lineColor: '#2ec7c9',
            fillColor: '#CCF3F4',
            defaultPixelsPerValue: 3,
            width: 'auto',
            height: 'auto',
            composite: false,
            tagValuesAttribute: 'values',
            tagOptionsPrefix: 'spark',
            enableTagOptions: false,
            enableHighlight: true,
            highlightLighten: 1.4,
            tooltipSkipNull: true,
            tooltipPrefix: '',
            tooltipSuffix: '',
            disableHiddenCheck: false,
            numberFormatter: false,
            numberDigitGroupCount: 3,
            numberDigitGroupSep: ',',
            numberDecimalMark: '.',
            disableTooltips: true,
            disableInteraction: true,
            offsetX:0,
            offsetY:0
        },
        // Defaults for line charts
        //=LINESPL
        line: {
            spotColor: 0,
            highlightSpotColor: '#5f5',
            highlightLineColor: '#f22',
            spotRadius: 1.5,
            minSpotColor: 0,
            maxSpotColor: 0,
            lineWidth: 1,
            normalRangeMin: undefined,
            normalRangeMax: undefined,
            normalRangeColor: '#ccc',
            drawNormalOnTop: true,
            chartRangeMin: undefined,
            chartRangeMax: undefined,
            chartRangeMinX: undefined,
            chartRangeMaxX: undefined,
            // tooltipFormat: new SPFormat('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')
        },
        // Defaults for bar charts
        bar: {
            barColor: '#fc5c5c',
            negBarColor: '#97b552',
            stackedBarColor: ["#2ec7c9", "#fc5c5c", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3", "#e5cf0d", "#97b552", "#95706d","#dc69aa","#07a2a4","#9a7fd1","#588dd5","#f5994e","#c05050","#59678c","#c9ab00","#7eb00a","#6f5553","#c14089"],
            zeroColor: undefined,
            nullColor: undefined,
            zeroAxis: true,
            barWidth: 4,
            barSpacing: 1,
            chartRangeMax: undefined,
            chartRangeMin: undefined,
            chartRangeClip: false,
            colorMap: undefined,
            // tooltipFormat: new SPFormat('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')
        },
        column: {
            barColor: '#fc5c5c',
            negBarColor: '#97b552',
            stackedBarColor: ["#2ec7c9", "#fc5c5c", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3", "#e5cf0d", "#97b552", "#95706d","#dc69aa","#07a2a4","#9a7fd1","#588dd5","#f5994e","#c05050","#59678c","#c9ab00","#7eb00a","#6f5553","#c14089"],
            zeroColor: undefined,
            nullColor: undefined,
            zeroAxis: true,
            barWidth: 4,
            barSpacing: 1,
            chartRangeMax: undefined,
            chartRangeMin: undefined,
            chartRangeClip: false,
            colorMap: undefined,
            // tooltipFormat: new SPFormat('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')
        },
        // Defaults for tristate charts
        tristate: {
            barWidth: 4,
            barSpacing: 1,
            posBarColor: '#fc5c5c',
            negBarColor: '#97b552',
            zeroBarColor: '#999',
            colorMap: {},
            // tooltipFormat: new SPFormat('<span style="color: {{color}}">&#9679;</span> {{value:map}}'),
            // tooltipValueLookups: { map: { '-1': 'Loss', '0': 'Draw', '1': 'Win' } }
        },
        // Defaults for discrete charts
        discrete: {
            lineHeight: 'auto',
            thresholdColor: "#fc5c5c",
            thresholdValue: 0,
            chartRangeMax: undefined,
            chartRangeMin: undefined,
            chartRangeClip: false,
            // tooltipFormat: new SPFormat('{{prefix}}{{value}}{{suffix}}')
        },
        // Defaults for bullet charts
        bullet: {
            targetColor: '#f33',
            targetWidth: 3, // width of the target bar in pixels
            performanceColor: '#33f',
            rangeColors: ['#d3dafe', '#a8b6ff', '#7f94ff','#6D87FF','#5876FF','#4465FF','#2F54FF','#1A43FF','#0532FF'],
            base: undefined, // set this to a number to change the base start number
            // tooltipFormat: new SPFormat('{{fieldkey:fields}} - {{value}}'),
            // tooltipValueLookups: { fields: {r: 'Range', p: 'Performance', t: 'Target'} }
        },
        // Defaults for pie charts
        pie: {
            offset: 0,
            sliceColors: ["#2ec7c9", "#fc5c5c", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3", "#e5cf0d", "#97b552", "#95706d","#dc69aa","#07a2a4","#9a7fd1","#588dd5","#f5994e","#c05050","#59678c","#c9ab00","#7eb00a","#6f5553","#c14089"],
            borderWidth: 0,
            borderColor: '#000',
            // tooltipFormat: new SPFormat('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')
        },
        // Defaults for box plots
        box: {
            raw: false,
            boxLineColor: '#000',
            boxFillColor: '#cdf',
            whiskerColor: '#000',
            outlierLineColor: '#5E5E5E',
            outlierFillColor: '#fff',
            medianColor: '#f00',
            showOutliers: true,
            outlierIQR: 1.5,
            spotRadius: 1.5,
            target: undefined,
            targetColor: '#4a2',
            chartRangeMax: undefined,
            chartRangeMin: undefined,
            // tooltipFormat: new SPFormat('{{field:fields}}: {{value}}'),
            // tooltipFormatFieldlistKey: 'field',
            // tooltipValueLookups: { fields: { lq: 'Lower Quartile', med: 'Median',
            //     uq: 'Upper Quartile', lo: 'Left Outlier', ro: 'Right Outlier',
            //     lw: 'Left Whisker', rw: 'Right Whisker'} }
        }
    },
    line:{
        type: 'line',
        init: function (el, values, options, width, height) {
            //line._super.init.call(this, el, values, options, width, height);
            this.vertices = [];
            this.regionMap = [];
            this.xvalues = [];
            this.yvalues = [];
            this.yminmax = [];
            this.hightlightSpotId = null;
            this.lastShapeId = null;
            //this.initTarget();
        },
        getRegion: function (el, x, y) {
            let i,
                regionMap = this.regionMap; // maps regions to value positions
            for (i = regionMap.length; i--;) {
                if (regionMap[i] !== null && x >= regionMap[i][0] && x <= regionMap[i][1]) {
                    return regionMap[i][2];
                }
            }
            return undefined;
        },
        getCurrentRegionFields: function () {
            let currentRegion = this.currentRegion;
            return {
                isNull: this.yvalues[currentRegion] === null,
                x: this.xvalues[currentRegion],
                y: this.yvalues[currentRegion],
                color: this.options.get('lineColor'),
                fillColor: this.options.get('fillColor'),
                offset: currentRegion
            };
        },
        renderHighlight: function () {
            let currentRegion = this.currentRegion,
                target = this.target,
                vertex = this.vertices[currentRegion],
                options = this.options,
                spotRadius = options.get('spotRadius'),
                highlightSpotColor = options.get('highlightSpotColor'),
                highlightLineColor = options.get('highlightLineColor'),
                highlightSpot, highlightLine;

            if (!vertex) {
                return;
            }
            if (spotRadius && highlightSpotColor) {
                highlightSpot = target.drawCircle(vertex[0], vertex[1],
                    spotRadius, undefined, highlightSpotColor);
                this.highlightSpotId = highlightSpot.id;
                target.insertAfterShape(this.lastShapeId, highlightSpot);
            }
            if (highlightLineColor) {
                highlightLine = target.drawLine(vertex[0], this.canvasTop, vertex[0],
                    this.canvasTop + this.canvasHeight, highlightLineColor);
                this.highlightLineId = highlightLine.id;
                target.insertAfterShape(this.lastShapeId, highlightLine);
            }
        },
        removeHighlight: function () {
            let target = this.target;
            if (this.highlightSpotId) {
                target.removeShapeId(this.highlightSpotId);
                this.highlightSpotId = null;
            }
            if (this.highlightLineId) {
                target.removeShapeId(this.highlightLineId);
                this.highlightLineId = null;
            }
        },
        scanValues: function () {
            let values = this.values,
                valcount = values.length,
                xvalues = this.xvalues,
                yvalues = this.yvalues,
                yminmax = this.yminmax,
                i, val, isStr, isArray, sp;
            for (i = 0; i < valcount; i++) {
                val = values[i];
                isStr = typeof(values[i]) === 'string';
                isArray = typeof(values[i]) === 'object' && values[i] instanceof Array;
                sp = isStr && values[i].split(':');
                if (isStr && sp.length === 2) { // x:y
                    xvalues.push(Number(sp[0]));
                    yvalues.push(Number(sp[1]));
                    yminmax.push(Number(sp[1]));
                } else if (isArray) {
                    xvalues.push(val[0]);
                    yvalues.push(val[1]);
                    yminmax.push(val[1]);
                } else {
                    xvalues.push(i);
                    if (values[i] === null || values[i] === 'null') {
                        yvalues.push(null);
                    } else {
                        yvalues.push(Number(val));
                        yminmax.push(Number(val));
                    }
                }
            }
            if (this.options.get('xvalues')) {
                xvalues = this.options.get('xvalues');
            }

            this.maxy = this.maxyorg = Math.max.apply(Math, yminmax);
            this.miny = this.minyorg = Math.min.apply(Math, yminmax);

            this.maxx = Math.max.apply(Math, xvalues);
            this.minx = Math.min.apply(Math, xvalues);

            this.xvalues = xvalues;
            this.yvalues = yvalues;
            this.yminmax = yminmax;

        },
        processRangeOptions: function () {
            let options = this.options,
                normalRangeMin = options.get('normalRangeMin'),
                normalRangeMax = options.get('normalRangeMax');

            if (normalRangeMin !== undefined) {
                if (normalRangeMin < this.miny) {
                    this.miny = normalRangeMin;
                }
                if (normalRangeMax > this.maxy) {
                    this.maxy = normalRangeMax;
                }
            }
            if (options.get('chartRangeMin') !== undefined && (options.get('chartRangeClip') || options.get('chartRangeMin') < this.miny)) {
                this.miny = options.get('chartRangeMin');
            }
            if (options.get('chartRangeMax') !== undefined && (options.get('chartRangeClip') || options.get('chartRangeMax') > this.maxy)) {
                this.maxy = options.get('chartRangeMax');
            }
            if (options.get('chartRangeMinX') !== undefined && (options.get('chartRangeClipX') || options.get('chartRangeMinX') < this.minx)) {
                this.minx = options.get('chartRangeMinX');
            }
            if (options.get('chartRangeMaxX') !== undefined && (options.get('chartRangeClipX') || options.get('chartRangeMaxX') > this.maxx)) {
                this.maxx = options.get('chartRangeMaxX');
            }

        },
        drawNormalRange: function (canvasLeft, canvasTop, canvasHeight, canvasWidth, rangey) {
            let normalRangeMin = this.options.get('normalRangeMin'),
                normalRangeMax = this.options.get('normalRangeMax'),
                ytop = canvasTop + Math.round(canvasHeight - (canvasHeight * ((normalRangeMax - this.miny) / rangey))),
                height = Math.round((canvasHeight * (normalRangeMax - normalRangeMin)) / rangey);
            //(x1, y1, x2, y2, lineColor, lineWidth)
            if(height==0 && normalRangeMin==normalRangeMax){
                height=1;
            }
            this.target.drawRect(canvasLeft, ytop, canvasWidth, height, undefined, this.options.get('normalRangeColor')).append();
        },
        render: function (el,userValues) {
            this.vertices = [];
            this.regionMap = [];
            this.xvalues = [];
            this.yvalues = [];
            this.yminmax = [];
            this.hightlightSpotId = null;
            this.lastShapeId = null;

            this.values = userValues;

            let options = this.options,
                target = this.target,

                canvasWidth = el.mergedOptions.width,
                canvasHeight = el.mergedOptions.height,

                vertices = this.vertices,
                spotRadius = options.get('spotRadius'),
                regionMap = this.regionMap,
                rangex, rangey, yvallast,
                canvasTop, canvasLeft,
                vertex, path, paths, x, y, xnext, xpos, xposnext,
                last, next, yvalcount, lineShapes, fillShapes, plen,
                valueSpots, hlSpotsEnabled, color, xvalues, yvalues, i;

            // if (!line._super.render.call(this)) {
            //     return;
            // }

            this.scanValues();
            this.processRangeOptions();

            xvalues = this.xvalues;
            yvalues = this.yvalues;

            if (!this.yminmax.length || this.yvalues.length < 2) {
                // empty or all null valuess
                return;
            }

            canvasTop = canvasLeft = 0;

            rangex = this.maxx - this.minx === 0 ? 1 : this.maxx - this.minx;
            rangey = this.maxy - this.miny === 0 ? 1 : this.maxy - this.miny;
            yvallast = this.yvalues.length - 1;

            if (spotRadius && (canvasWidth < (spotRadius * 4) || canvasHeight < (spotRadius * 4))) {
                spotRadius = 0;
            }
            if (spotRadius) {
                // adjust the canvas size as required so that spots will fit
                hlSpotsEnabled = options.get('highlightSpotColor') &&  !options.get('disableInteraction');
                if (hlSpotsEnabled || options.get('minSpotColor') || (options.get('spotColor') && yvalues[yvallast] === this.miny)) {
                    canvasHeight -= Math.ceil(spotRadius);
                }
                if (hlSpotsEnabled || options.get('maxSpotColor') || (options.get('spotColor') && yvalues[yvallast] === this.maxy)) {
                    canvasHeight -= Math.ceil(spotRadius);
                    canvasTop += Math.ceil(spotRadius);
                }
                if (hlSpotsEnabled ||
                        ((options.get('minSpotColor') || options.get('maxSpotColor')) && (yvalues[0] === this.miny || yvalues[0] === this.maxy))) {
                    canvasLeft += Math.ceil(spotRadius);
                    canvasWidth -= Math.ceil(spotRadius);
                }
                if (hlSpotsEnabled || options.get('spotColor') ||
                    (options.get('minSpotColor') || options.get('maxSpotColor') &&
                        (yvalues[yvallast] === this.miny || yvalues[yvallast] === this.maxy))) {
                    canvasWidth -= Math.ceil(spotRadius);
                }
            }


            canvasHeight--;

            if (options.get('normalRangeMin') !== undefined && !options.get('drawNormalOnTop')) {
                this.drawNormalRange(canvasLeft, canvasTop, canvasHeight, canvasWidth, rangey);
            }

            path = [];
            paths = [path];
            last = next = null;
            yvalcount = yvalues.length;
            for (i = 0; i < yvalcount; i++) {
                x = xvalues[i];
                xnext = xvalues[i + 1];
                y = yvalues[i];
                xpos = canvasLeft + Math.round((x - this.minx) * (canvasWidth / rangex));
                xposnext = i < yvalcount - 1 ? canvasLeft + Math.round((xnext - this.minx) * (canvasWidth / rangex)) : canvasWidth;
                next = xpos + ((xposnext - xpos) / 2);
                regionMap[i] = [last || 0, next, i];
                last = next;
                if (y === null) {
                    if (i) {
                        if (yvalues[i - 1] !== null) {
                            path = [];
                            paths.push(path);
                        }
                        vertices.push(null);
                    }
                } else {
                    if (y < this.miny) {
                        y = this.miny;
                    }
                    if (y > this.maxy) {
                        y = this.maxy;
                    }
                    if (!path.length) {
                        // previous value was null
                        path.push([xpos, canvasTop + canvasHeight]);
                    }
                    vertex = [xpos, canvasTop + Math.round(canvasHeight - (canvasHeight * ((y - this.miny) / rangey)))];
                    path.push(vertex);
                    vertices.push(vertex);
                }
            }

            lineShapes = [];
            fillShapes = [];
            plen = paths.length;
            for (i = 0; i < plen; i++) {
                path = paths[i];
                if (path.length) {
                    if (options.get('fillColor')) {
                        path.push([path[path.length - 1][0], (canvasTop + canvasHeight)]);
                        fillShapes.push(path.slice(0));
                        path.pop();
                    }
                    // if there's only a single point in this path, then we want to display it
                    // as a vertical line which means we keep path[0]  as is
                    if (path.length > 2) {
                        // else we want the first value
                        path[0] = [path[0][0], path[1][1]];
                    }
                    lineShapes.push(path);
                }
            }

            // draw the fill first, then optionally the normal range, then the line on top of that
            plen = fillShapes.length;
            for (i = 0; i < plen; i++) {
                target.drawShape(fillShapes[i],
                    options.get('fillColor'), options.get('fillColor')).append();
            }



            plen = lineShapes.length;
            for (i = 0; i < plen; i++) {
                target.drawShape(lineShapes[i], options.get('lineColor'), undefined,
                    options.get('lineWidth')).append();
            }

            if (options.get('normalRangeMin') !== undefined && options.get('drawNormalOnTop')) {
                this.drawNormalRange(canvasLeft, canvasTop, canvasHeight, canvasWidth, rangey);
            }
            
            if (spotRadius && options.get('valueSpots')) {
                valueSpots = options.get('valueSpots');
                if (valueSpots.get === undefined) {
                    valueSpots = new RangeMap(valueSpots);
                }
                for (i = 0; i < yvalcount; i++) {
                    color = valueSpots.get(yvalues[i]);
                    if (color) {
                        target.drawCircle(canvasLeft + Math.round((xvalues[i] - this.minx) * (canvasWidth / rangex)),
                            canvasTop + Math.round(canvasHeight - (canvasHeight * ((yvalues[i] - this.miny) / rangey))),
                            spotRadius, undefined,
                            color).append();
                    }
                }

            }
            if (spotRadius && options.get('spotColor') && yvalues[yvallast] !== null) {
                target.drawCircle(canvasLeft + Math.round((xvalues[xvalues.length - 1] - this.minx) * (canvasWidth / rangex)),
                    canvasTop + Math.round(canvasHeight - (canvasHeight * ((yvalues[yvallast] - this.miny) / rangey))),
                    spotRadius, undefined,
                    options.get('spotColor')).append();
            }
            if (this.maxy !== this.minyorg) {
                if (spotRadius && options.get('minSpotColor')) {
                    x = xvalues[$.inArray(this.minyorg, yvalues)];
                    target.drawCircle(canvasLeft + Math.round((x - this.minx) * (canvasWidth / rangex)),
                        canvasTop + Math.round(canvasHeight - (canvasHeight * ((this.minyorg - this.miny) / rangey))),
                        spotRadius, undefined,
                        options.get('minSpotColor')).append();
                }
                if (spotRadius && options.get('maxSpotColor')) {
                    x = xvalues[$.inArray(this.maxyorg, yvalues)];
                    target.drawCircle(canvasLeft + Math.round((x - this.minx) * (canvasWidth / rangex)),
                        canvasTop + Math.round(canvasHeight - (canvasHeight * ((this.maxyorg - this.miny) / rangey))),
                        spotRadius, undefined,
                        options.get('maxSpotColor')).append();
                }
            }

            // this.lastShapeId = target.getLastShapeId();
            // this.canvasTop = canvasTop;
            // target.render();

        }
    },
    bar:{
        type: 'bar',

        init: function (el, values) {
            let options = this.options;
            let width = el.mergedOptions.height;
            let height = el.mergedOptions.width;

            this.canvasWidth = el.mergedOptions.height;
            this.canvasHeight = el.mergedOptions.width;

            let barWidth = parseInt(options.get('barWidth'), 10),
                barSpacing = parseInt(options.get('barSpacing'), 10),
                chartRangeMin = options.get('chartRangeMin'),
                chartRangeMax = options.get('chartRangeMax'),
                chartRangeClip = options.get('chartRangeClip'),
                stackMin = Infinity,
                stackMax = -Infinity,
                isStackString, groupMin, groupMax, stackRanges,
                numValues, i, vlen, range, zeroAxis, xaxisOffset, min, max, clipMin, clipMax,
                stacked, vlist, j, slen, svals, val, yoffset, yMaxCalc, canvasHeightEf;
            //bar._super.init.call(this, el, values, options, width, height);

            this.values = values;

            // scan values to determine whether to stack bars
            for (i = 0, vlen = values.length; i < vlen; i++) {
                val = values[i];
                isStackString = typeof(val) === 'string' && val.indexOf(':') > -1;
                if (isStackString || $.isArray(val)) {
                    stacked = true;
                    if (isStackString) {
                        val = values[i] = normalizeValues(val.split(':'));
                    }
                    val = remove(val, null); // min/max will treat null as zero
                    groupMin = Math.min.apply(Math, val);
                    groupMax = Math.max.apply(Math, val);
                    if (groupMin < stackMin) {
                        stackMin = groupMin;
                    }
                    if (groupMax > stackMax) {
                        stackMax = groupMax;
                    }
                }
            }

            this.stacked = stacked;
            this.regionShapes = {};
            this.barWidth = Math.floor(width/values.length)-barSpacing;
            this.barSpacing = barSpacing;
            this.totalBarWidth = this.barWidth + barSpacing;
            //this.width = width = (values.length * barWidth) + ((values.length - 1) * barSpacing);
            this.width = width;
            //this.initTarget();

            if (chartRangeClip) {
                clipMin = chartRangeMin === undefined ? -Infinity : chartRangeMin;
                clipMax = chartRangeMax === undefined ? Infinity : chartRangeMax;
            }

            numValues = [];
            stackRanges = stacked ? [] : numValues;
            let stackTotals = [];
            let stackRangesNeg = [];
            for (i = 0, vlen = values.length; i < vlen; i++) {
                if (stacked) {
                    vlist = values[i];
                    values[i] = svals = [];
                    stackTotals[i] = 0;
                    stackRanges[i] = stackRangesNeg[i] = 0;
                    for (j = 0, slen = vlist.length; j < slen; j++) {
                        val = svals[j] = chartRangeClip ? clipval(vlist[j], clipMin, clipMax) : vlist[j];
                        if (val !== null) {
                            if (val > 0) {
                                stackTotals[i] += val;
                            }
                            if (stackMin < 0 && stackMax > 0) {
                                if (val < 0) {
                                    stackRangesNeg[i] += Math.abs(val);
                                } else {
                                    stackRanges[i] += val;
                                }
                            } else {
                                stackRanges[i] += Math.abs(val);
                                // stackRanges[i] += Math.abs(val - (val < 0 ? stackMax : stackMin));
                            }
                            numValues.push(val);
                        }
                    }
                } else {
                    val = chartRangeClip ? clipval(values[i], clipMin, clipMax) : values[i];
                    val = values[i] = normalizeValue(val);
                    if (val !== null) {
                        numValues.push(val);
                    }
                }
            }
            this.max = max = Math.max.apply(Math, numValues);
            this.min = min = Math.min.apply(Math, numValues);
            this.stackMax = stackMax = stacked ? Math.max.apply(Math, stackTotals) : max;
            this.stackMin = stackMin = stacked ? Math.min.apply(Math, numValues) : min;

            if (options.get('chartRangeMin') !== undefined && (options.get('chartRangeClip') || options.get('chartRangeMin') < min)) {
                min = options.get('chartRangeMin');
            }
            if (options.get('chartRangeMax') !== undefined && (options.get('chartRangeClip') || options.get('chartRangeMax') > max)) {
                max = options.get('chartRangeMax');
            }

            this.zeroAxis = zeroAxis = options.get('zeroAxis', true);
            if (min <= 0 && max >= 0 && zeroAxis) {
                xaxisOffset = 0;
            } else if (zeroAxis == false) {
                xaxisOffset = min;
            } else if (min > 0) {
                xaxisOffset = 0;
            } else {
                xaxisOffset = max;
            }
            this.xaxisOffset = xaxisOffset;

            range = stacked ? (Math.max.apply(Math, stackRanges) + Math.max.apply(Math, stackRangesNeg)) : max - xaxisOffset;

            // as we plot zero/min values a single pixel line, we add a pixel to all other
            // values - Reduce the effective canvas size to suit
            this.canvasHeightEf = (zeroAxis && min < 0) ? this.canvasHeight - 2 : this.canvasHeight - 1;
            this.isNeg = false;
            if (min < xaxisOffset) {
                // yMaxCalc = (stacked && max >= 0) ? stackMax : max;
                // yoffset = (yMaxCalc - xaxisOffset) / range * this.canvasHeight;
                yoffset = Math.floor(this.canvasHeight/2);
                this.isNeg = true;
                if (yoffset !== Math.ceil(yoffset)) {
                    this.canvasHeightEf -= 2;
                    yoffset = Math.ceil(yoffset);
                }
            } else {
                yoffset = 0;
            }
            this.yoffset = yoffset;

            if ($.isArray(options.get('colorMap'))) {
                this.colorMapByIndex = options.get('colorMap');
                this.colorMapByValue = null;
            } else {
                this.colorMapByIndex = null;
                this.colorMapByValue = options.get('colorMap');
                if (this.colorMapByValue && this.colorMapByValue.get === undefined) {
                    this.colorMapByValue = new RangeMap(this.colorMapByValue);
                }
            }

            this.range = range;
        },

        getRegion: function (el, x, y) {
            let result = Math.floor(x / this.totalBarWidth);
            return (result < 0 || result >= this.values.length) ? undefined : result;
        },

        getCurrentRegionFields: function () {
            let currentRegion = this.currentRegion,
                values = ensureArray(this.values[currentRegion]),
                result = [],
                value, i;
            for (i = values.length; i--;) {
                value = values[i];
                result.push({
                    isNull: value === null,
                    value: value,
                    color: this.calcColor(i, value, currentRegion),
                    offset: currentRegion
                });
            }
            return result;
        },

        calcColor: function (stacknum, value, valuenum) {
            let colorMapByIndex = this.colorMapByIndex,
                colorMapByValue = this.colorMapByValue,
                options = this.options,
                color, newColor;
            if (this.stacked) {
                color = options.get('stackedBarColor');
            } else {
                color = (value < 0) ? options.get('negBarColor') : options.get('barColor');
            }
            if (value === 0 && options.get('zeroColor') !== undefined) {
                color = options.get('zeroColor');
            }
            if (colorMapByValue && (newColor = colorMapByValue.get(value))) {
                color = newColor;
            } else if (colorMapByIndex && colorMapByIndex.length > valuenum) {
                color = colorMapByIndex[valuenum];
            }
            return $.isArray(color) ? color[stacknum % color.length] : color;
        },

        /**
         * Render bar(s) for a region
         */
        renderRegion: function (valuenum, highlight) {
            let vals = this.values[valuenum],
                options = this.options,
                xaxisOffset = this.xaxisOffset,
                result = [],
                range = this.range,
                stacked = this.stacked,
                target = this.target,
                x = valuenum * this.totalBarWidth,
                canvasHeightEf = this.canvasHeightEf,
                yoffset = this.yoffset,
                y, height, color, isNull, yoffsetNeg, i, valcount, val, minPlotted, allMin;

            vals = $.isArray(vals) ? vals : [vals];
            valcount = vals.length;
            val = vals[0];
            isNull = all(null, vals);
            allMin = all(xaxisOffset, vals, true);

            if (isNull) {
                if (options.get('nullColor')) {
                    color = highlight ? options.get('nullColor') : this.calcHighlightColor(options.get('nullColor'), options);
                    y = (yoffset > 0) ? yoffset - 1 : yoffset;
                    return target.drawRect(y, x, 0, this.barWidth - 1, color, color);
                } else {
                    return undefined;
                }
            }
            yoffsetNeg = yoffset;
            if(this.isNeg){
                canvasHeightEf = Math.floor(canvasHeightEf/2);
            }
            for (i = 0; i < valcount; i++) {
                val = vals[i];

                if (stacked && val === xaxisOffset) {
                    if (!allMin || minPlotted) {
                        continue;
                    }
                    minPlotted = true;
                }

                if (range > 0) {
                    height = Math.floor(canvasHeightEf * ((Math.abs(val - xaxisOffset) / range)));
                } else {
                    height = canvasHeightEf;
                }

                if (val < xaxisOffset || (val === xaxisOffset && yoffset === 0)) {
                    y = yoffsetNeg - height;
                    yoffsetNeg += height;
                } else {
                    if(stacked){
                        y = yoffset;
                        yoffset += height;
                    }
                    else{
                        y = yoffset;
                        yoffset -= height;
                    }
                    
                }
                color = this.calcColor(i, val, valuenum);
                if (highlight) {
                    color = this.calcHighlightColor(color, options);
                }
                result.push(target.drawRect(y, x,  height - 1, this.barWidth - 1,color, color));
            }
            if (result.length === 1) {
                return result[0];
            }
            return result;
        }
    },
    column:{
        type: 'column',

        init: function (el, values) {
            let options = this.options;
            let width = el.mergedOptions.width;
            let height = el.mergedOptions.height;

            this.canvasWidth = el.mergedOptions.width;
            this.canvasHeight = el.mergedOptions.height;

            let barWidth = parseInt(options.get('barWidth'), 10),
                barSpacing = parseInt(options.get('barSpacing'), 10),
                chartRangeMin = options.get('chartRangeMin'),
                chartRangeMax = options.get('chartRangeMax'),
                chartRangeClip = options.get('chartRangeClip'),
                stackMin = Infinity,
                stackMax = -Infinity,
                isStackString, groupMin, groupMax, stackRanges,
                numValues, i, vlen, range, zeroAxis, xaxisOffset, min, max, clipMin, clipMax,
                stacked, vlist, j, slen, svals, val, yoffset, yMaxCalc, canvasHeightEf;
            //bar._super.init.call(this, el, values, options, width, height);

            this.values = values;

            // scan values to determine whether to stack bars
            for (i = 0, vlen = values.length; i < vlen; i++) {
                val = values[i];
                isStackString = typeof(val) === 'string' && val.indexOf(':') > -1;
                if (isStackString || $.isArray(val)) {
                    stacked = true;
                    if (isStackString) {
                        val = values[i] = normalizeValues(val.split(':'));
                    }
                    val = remove(val, null); // min/max will treat null as zero
                    groupMin = Math.min.apply(Math, val);
                    groupMax = Math.max.apply(Math, val);
                    if (groupMin < stackMin) {
                        stackMin = groupMin;
                    }
                    if (groupMax > stackMax) {
                        stackMax = groupMax;
                    }
                }
            }

            this.stacked = stacked;
            this.regionShapes = {};
            this.barWidth = Math.floor(width/values.length)-barSpacing;
            this.barSpacing = barSpacing;
            this.totalBarWidth = this.barWidth + barSpacing;
            //this.width = width = (values.length * barWidth) + ((values.length - 1) * barSpacing);
            this.width = width;
            //this.initTarget();

            if (chartRangeClip) {
                clipMin = chartRangeMin === undefined ? -Infinity : chartRangeMin;
                clipMax = chartRangeMax === undefined ? Infinity : chartRangeMax;
            }

            numValues = [];
            stackRanges = stacked ? [] : numValues;
            let stackTotals = [];
            let stackRangesNeg = [];
            for (i = 0, vlen = values.length; i < vlen; i++) {
                if (stacked) {
                    vlist = values[i];
                    values[i] = svals = [];
                    stackTotals[i] = 0;
                    stackRanges[i] = stackRangesNeg[i] = 0;
                    for (j = 0, slen = vlist.length; j < slen; j++) {
                        val = svals[j] = chartRangeClip ? clipval(vlist[j], clipMin, clipMax) : vlist[j];
                        if (val !== null) {
                            if (val > 0) {
                                stackTotals[i] += val;
                            }
                            if (stackMin < 0 && stackMax > 0) {
                                if (val < 0) {
                                    stackRangesNeg[i] += Math.abs(val);
                                } else {
                                    stackRanges[i] += val;
                                }
                            } else {
                                stackRanges[i] += Math.abs(val);
                                // stackRanges[i] += Math.abs(val - (val < 0 ? stackMax : stackMin));
                            }
                            numValues.push(val);
                        }
                    }
                } else {
                    val = chartRangeClip ? clipval(values[i], clipMin, clipMax) : values[i];
                    val = values[i] = normalizeValue(val);
                    if (val !== null) {
                        numValues.push(val);
                    }
                }
            }
            this.max = max = Math.max.apply(Math, numValues);
            this.min = min = Math.min.apply(Math, numValues);
            this.stackMax = stackMax = stacked ? Math.max.apply(Math, stackTotals) : max;
            this.stackMin = stackMin = stacked ? Math.min.apply(Math, numValues) : min;

            if (options.get('chartRangeMin') !== undefined && (options.get('chartRangeClip') || options.get('chartRangeMin') < min)) {
                min = options.get('chartRangeMin');
            }
            if (options.get('chartRangeMax') !== undefined && (options.get('chartRangeClip') || options.get('chartRangeMax') > max)) {
                max = options.get('chartRangeMax');
            }

            this.zeroAxis = zeroAxis = options.get('zeroAxis', true);
            if (min <= 0 && max >= 0 && zeroAxis) {
                xaxisOffset = 0;
            } else if (zeroAxis == false) {
                xaxisOffset = min;
            } else if (min > 0) {
                xaxisOffset = 0;
            } else {
                xaxisOffset = max;
            }
            this.xaxisOffset = xaxisOffset;

            range = stacked ? (Math.max.apply(Math, stackRanges) + Math.max.apply(Math, stackRangesNeg)) : max - xaxisOffset;

            // as we plot zero/min values a single pixel line, we add a pixel to all other
            // values - Reduce the effective canvas size to suit
            this.canvasHeightEf = (zeroAxis && min < 0) ? this.canvasHeight - 2 : this.canvasHeight - 1;
            this.isNeg = false;
            if (min < xaxisOffset) {
                // yMaxCalc = (stacked && max >= 0) ? stackMax : max;
                // yoffset = (yMaxCalc - xaxisOffset) / range * this.canvasHeight;
                yoffset = Math.floor(this.canvasHeight/2);
                this.isNeg = true;
                if (yoffset !== Math.ceil(yoffset)) {
                    this.canvasHeightEf -= 2;
                    yoffset = Math.ceil(yoffset);
                }
            } else {
                yoffset = this.canvasHeight;
            }
            this.yoffset = yoffset;

            if ($.isArray(options.get('colorMap'))) {
                this.colorMapByIndex = options.get('colorMap');
                this.colorMapByValue = null;
            } else {
                this.colorMapByIndex = null;
                this.colorMapByValue = options.get('colorMap');
                if (this.colorMapByValue && this.colorMapByValue.get === undefined) {
                    this.colorMapByValue = new RangeMap(this.colorMapByValue);
                }
            }

            this.range = range;
        },

        getRegion: function (el, x, y) {
            let result = Math.floor(x / this.totalBarWidth);
            return (result < 0 || result >= this.values.length) ? undefined : result;
        },

        getCurrentRegionFields: function () {
            let currentRegion = this.currentRegion,
                values = ensureArray(this.values[currentRegion]),
                result = [],
                value, i;
            for (i = values.length; i--;) {
                value = values[i];
                result.push({
                    isNull: value === null,
                    value: value,
                    color: this.calcColor(i, value, currentRegion),
                    offset: currentRegion
                });
            }
            return result;
        },

        calcColor: function (stacknum, value, valuenum) {
            let colorMapByIndex = this.colorMapByIndex,
                colorMapByValue = this.colorMapByValue,
                options = this.options,
                color, newColor;
            if (this.stacked) {
                color = options.get('stackedBarColor');
            } else {
                color = (value < 0) ? options.get('negBarColor') : options.get('barColor');
            }
            if (value === 0 && options.get('zeroColor') !== undefined) {
                color = options.get('zeroColor');
            }
            if (colorMapByValue && (newColor = colorMapByValue.get(value))) {
                color = newColor;
            } else if (colorMapByIndex && colorMapByIndex.length > valuenum) {
                color = colorMapByIndex[valuenum];
            }
            return $.isArray(color) ? color[stacknum % color.length] : color;
        },

        /**
         * Render bar(s) for a region
         */
        renderRegion: function (valuenum, highlight) {
            let vals = this.values[valuenum],
                options = this.options,
                xaxisOffset = this.xaxisOffset,
                result = [],
                range = this.range,
                stacked = this.stacked,
                target = this.target,
                x = valuenum * this.totalBarWidth,
                canvasHeightEf = this.canvasHeightEf,
                yoffset = this.yoffset,
                y, height, color, isNull, yoffsetNeg, i, valcount, val, minPlotted, allMin;

            vals = $.isArray(vals) ? vals : [vals];
            valcount = vals.length;
            val = vals[0];
            isNull = all(null, vals);
            allMin = all(xaxisOffset, vals, true);

            if (isNull) {
                if (options.get('nullColor')) {
                    color = highlight ? options.get('nullColor') : this.calcHighlightColor(options.get('nullColor'), options);
                    y = (yoffset > 0) ? yoffset - 1 : yoffset;
                    return target.drawRect(x, y, this.barWidth - 1, 0, color, color);
                } else {
                    return undefined;
                }
            }
            yoffsetNeg = yoffset;
            if(this.isNeg){
                canvasHeightEf = Math.floor(canvasHeightEf/2);
            }
            for (i = 0; i < valcount; i++) {
                val = vals[i];

                if (stacked && val === xaxisOffset) {
                    if (!allMin || minPlotted) {
                        continue;
                    }
                    minPlotted = true;
                }

                if (range > 0) {
                    height = Math.floor(canvasHeightEf * ((Math.abs(val - xaxisOffset) / range)));
                } else {
                    height = canvasHeightEf;
                }

                if (val < xaxisOffset || (val === xaxisOffset && yoffset === 0)) {
                    y = yoffsetNeg;
                    yoffsetNeg += height;
                } else {
                    y = yoffset - height;
                    yoffset -= height;
                }
                color = this.calcColor(i, val, valuenum);
                if (highlight) {
                    color = this.calcHighlightColor(color, options);
                }
                result.push(target.drawRect(x, y, this.barWidth - 1, height - 1, color, color));
            }
            if (result.length === 1) {
                return result[0];
            }
            return result;
        }
    },
    tristate:{
        type: 'tristate',
        init: function(el, values) {
            let options = this.options;
            let width = el.mergedOptions.width;
            let height = el.mergedOptions.height;

            this.canvasWidth = el.mergedOptions.width;
            this.canvasHeight = el.mergedOptions.height;

            let barWidth = parseInt(options.get('barWidth'), 10),
                barSpacing = parseInt(options.get('barSpacing'), 10);
            //tristate._super.init.call(this, el, values, options, width, height);

            this.regionShapes = {};
            this.barWidth = barWidth;
            this.barSpacing = barSpacing;
            this.totalBarWidth = barWidth + barSpacing;
            this.values = $.map(values, Number);
            this.width = width = (values.length * barWidth) + ((values.length - 1) * barSpacing);

            if ($.isArray(options.get('colorMap'))) {
                this.colorMapByIndex = options.get('colorMap');
                this.colorMapByValue = null;
            } else {
                this.colorMapByIndex = null;
                this.colorMapByValue = options.get('colorMap');
                if (this.colorMapByValue && this.colorMapByValue.get === undefined) {
                    this.colorMapByValue = new RangeMap(this.colorMapByValue);
                }
            }
            //this.initTarget();
        },

        getRegion: function (el, x, y) {
            return Math.floor(x / this.totalBarWidth);
        },

        getCurrentRegionFields: function () {
            let currentRegion = this.currentRegion;
            return {
                isNull: this.values[currentRegion] === undefined,
                value: this.values[currentRegion],
                color: this.calcColor(this.values[currentRegion], currentRegion),
                offset: currentRegion
            };
        },

        calcColor: function (value, valuenum) {
            let values = this.values,
                options = this.options,
                colorMapByIndex = this.colorMapByIndex,
                colorMapByValue = this.colorMapByValue,
                color, newColor;

            if (colorMapByValue && (newColor = colorMapByValue.get(value))) {
                color = newColor;
            } else if (colorMapByIndex && colorMapByIndex.length > valuenum) {
                color = colorMapByIndex[valuenum];
            } else if (values[valuenum] < 0) {
                color = options.get('negBarColor');
            } else if (values[valuenum] > 0) {
                color = options.get('posBarColor');
            } else {
                color = options.get('zeroBarColor');
            }
            return color;
        },

        renderRegion: function (valuenum, highlight) {
            let values = this.values,
                options = this.options,
                target = this.target,
                canvasHeight, height, halfHeight,
                x, y, color;

            canvasHeight = this.canvasHeight;
            halfHeight = Math.round(canvasHeight / 2);

            x = valuenum * this.totalBarWidth;
            if (values[valuenum] < 0) {
                y = halfHeight;
                height = halfHeight - 1;
            } else if (values[valuenum] > 0) {
                y = 0;
                height = halfHeight - 1;
            } else {
                y = halfHeight - 1;
                height = 2;
            }
            color = this.calcColor(values[valuenum], valuenum);
            if (color === null) {
                return;
            }
            if (highlight) {
                color = this.calcHighlightColor(color, options);
            }
            return target.drawRect(x, y, this.barWidth - 1, height - 1, color, color);
        }
    },
    discrete:{
        type: 'discrete',

        init: function(el, values) {
            let options = this.options;
            let width = el.mergedOptions.width;
            let height = el.mergedOptions.height;

            this.canvasWidth = el.mergedOptions.width;
            this.canvasHeight = el.mergedOptions.height;

            this.regionShapes = {};
            this.values = values = $.map(values, Number);
            this.min = Math.min.apply(Math, values);
            this.max = Math.max.apply(Math, values);
            this.range = this.max - this.min;
            this.width = width;
            this.interval = Math.floor(width / values.length);
            this.itemWidth = width / values.length;
            if (options.get('chartRangeMin') !== undefined && (options.get('chartRangeClip') || options.get('chartRangeMin') < this.min)) {
                this.min = options.get('chartRangeMin');
            }
            if (options.get('chartRangeMax') !== undefined && (options.get('chartRangeClip') || options.get('chartRangeMax') > this.max)) {
                this.max = options.get('chartRangeMax');
            }
            //this.initTarget();
            if (this.target) {
                this.lineHeight = options.get('lineHeight') === 'auto' ? Math.round(this.canvasHeight * 0.3) : options.get('lineHeight');
            }
        },

        getRegion: function (el, x, y) {
            return Math.floor(x / this.itemWidth);
        },

        getCurrentRegionFields: function () {
            let currentRegion = this.currentRegion;
            return {
                isNull: this.values[currentRegion] === undefined,
                value: this.values[currentRegion],
                offset: currentRegion
            };
        },

        renderRegion: function (valuenum, highlight) {
            let values = this.values,
                options = this.options,
                min = this.min,
                max = this.max,
                range = this.range,
                interval = this.interval,
                target = this.target,
                canvasHeight = this.canvasHeight,
                lineHeight = this.lineHeight,
                pheight = canvasHeight - lineHeight,
                ytop, val, color, x;

            val = clipval(values[valuenum], min, max);
            x = valuenum * interval;
            ytop = Math.round(pheight - pheight * ((val - min) / range));
            color = (options.get('thresholdColor') && val < options.get('thresholdValue')) ? options.get('thresholdColor') : options.get('lineColor');
            if (highlight) {
                color = this.calcHighlightColor(color, options);
            }
            //return target.drawLine(x, ytop, x, ytop + lineHeight, color);

            return this.target.drawRect(x, ytop, interval<=2?1:interval-2, lineHeight, color, color);
        }
    },
    bullet:{
        type: 'bullet',
        init: function(el, values) {

            let options = this.options;
            let width = el.mergedOptions.width;
            let height = el.mergedOptions.height;

            this.canvasWidth = el.mergedOptions.width;
            this.canvasHeight = el.mergedOptions.height;

            let min, max, vals;
            //bullet._super.init.call(this, el, values, options, width, height);

            // values: target, performance, range1, range2, range3
            this.values = values = normalizeValues(values);
            // target or performance could be null
            vals = values.slice();
            vals[0] = vals[0] === null ? vals[2] : vals[0];
            vals[1] = values[1] === null ? vals[2] : vals[1];
            min = Math.min.apply(Math, values);
            max = Math.max.apply(Math, values);
            if (options.get('base') === undefined) {
                min = min < 0 ? min : 0;
            } else {
                min = options.get('base');
            }
            this.min = min;
            this.max = max;
            this.range = max - min;
            this.shapes = {};
            this.valueShapes = {};
            this.regiondata = {};
            this.width = width;
            //this.target = this.$el.simpledraw(width, height, options.get('composite'));
            if (!values.length) {
                this.disabled = true;
            }
            //this.initTarget();
        },

        getRegion: function (el, x, y) {
            let shapeid = this.target.getShapeAt(el, x, y);
            return (shapeid !== undefined && this.shapes[shapeid] !== undefined) ? this.shapes[shapeid] : undefined;
        },

        getCurrentRegionFields: function () {
            let currentRegion = this.currentRegion;
            return {
                fieldkey: currentRegion.substr(0, 1),
                value: this.values[currentRegion.substr(1)],
                region: currentRegion
            };
        },

        changeHighlight: function (highlight) {
            let currentRegion = this.currentRegion,
                shapeid = this.valueShapes[currentRegion],
                shape;
            delete this.shapes[shapeid];
            switch (currentRegion.substr(0, 1)) {
                case 'r':
                    shape = this.renderRange(currentRegion.substr(1), highlight);
                    break;
                case 'p':
                    shape = this.renderPerformance(highlight);
                    break;
                case 't':
                    shape = this.renderTarget(highlight);
                    break;
            }
            this.valueShapes[currentRegion] = shape.id;
            this.shapes[shape.id] = currentRegion;
            this.target.replaceWithShape(shapeid, shape);
        },

        renderRange: function (rn, highlight) {
            let rangeval = this.values[rn],
                rangewidth = Math.round(this.canvasWidth * ((rangeval - this.min) / this.range)),
                color = this.options.get('rangeColors')[rn - 2];
            if (highlight) {
                color = this.calcHighlightColor(color, this.options);
            }
            return this.target.drawRect(0, 0, rangewidth - 1, this.canvasHeight - 1, color, color);
        },

        renderPerformance: function (highlight) {
            let perfval = this.values[1],
                perfwidth = Math.round(this.canvasWidth * ((perfval - this.min) / this.range)),
                color = this.options.get('performanceColor');
            if (highlight) {
                color = this.calcHighlightColor(color, this.options);
            }
            return this.target.drawRect(0, Math.round(this.canvasHeight * 0.3), perfwidth - 1,
                Math.round(this.canvasHeight * 0.4) - 1, color, color);
        },

        renderTarget: function (highlight) {
            let targetval = this.values[0],
                x = Math.round(this.canvasWidth * ((targetval - this.min) / this.range) - (this.options.get('targetWidth') / 2)),
                targettop = Math.round(this.canvasHeight * 0.10),
                targetheight = this.canvasHeight - (targettop * 2),
                color = this.options.get('targetColor');
            if (highlight) {
                color = this.calcHighlightColor(color, this.options);
            }
            return this.target.drawRect(x, targettop, this.options.get('targetWidth') - 1, targetheight - 1, color, color);
        },

        render: function (el,userValues) {
            this.init(el,userValues);
            let vlen = this.values.length,
                target = this.target,
                i, shape;
            // if (!bullet._super.render.call(this)) {
            //     return;
            // }
            for (i = 2; i < vlen; i++) {
                shape = this.renderRange(i).append();
                this.shapes[shape.id] = 'r' + i;
                this.valueShapes['r' + i] = shape.id;
            }
            if (this.values[1] !== null) {
                shape = this.renderPerformance().append();
                this.shapes[shape.id] = 'p1';
                this.valueShapes.p1 = shape.id;
            }
            if (this.values[0] !== null) {
                shape = this.renderTarget().append();
                this.shapes[shape.id] = 't0';
                this.valueShapes.t0 = shape.id;
            }
            //target.render();
        }
    },
    pie:{
        type: 'pie',

        init: function(el, values) {

            let options = this.options;
            let width = el.mergedOptions.width;
            let height = el.mergedOptions.height;

            this.canvasWidth = el.mergedOptions.width;
            this.canvasHeight = el.mergedOptions.height;

            let total = 0, i;

            //pie._super.init.call(this, el, values, options, width, height);

            this.shapes = {}; // map shape ids to value offsets
            this.valueShapes = {}; // maps value offsets to shape ids
            this.values = values = $.map(values, Number);

            if (options.get('width') === 'auto') {
                this.width = this.height;
            }

            if (values.length > 0) {
                for (i = values.length; i--;) {
                    total += values[i];
                }
            }
            this.total = total;
            //this.initTarget();
            this.radius = Math.floor(Math.min(this.canvasWidth, this.canvasHeight) / 2);
        },

        getRegion: function (el, x, y) {
            let shapeid = this.target.getShapeAt(el, x, y);
            return (shapeid !== undefined && this.shapes[shapeid] !== undefined) ? this.shapes[shapeid] : undefined;
        },

        getCurrentRegionFields: function () {
            let currentRegion = this.currentRegion;
            return {
                isNull: this.values[currentRegion] === undefined,
                value: this.values[currentRegion],
                percent: this.values[currentRegion] / this.total * 100,
                color: this.options.get('sliceColors')[currentRegion % this.options.get('sliceColors').length],
                offset: currentRegion
            };
        },

        changeHighlight: function (highlight) {
            let currentRegion = this.currentRegion,
                    newslice = this.renderSlice(currentRegion, highlight),
                    shapeid = this.valueShapes[currentRegion];
            delete this.shapes[shapeid];
            this.target.replaceWithShape(shapeid, newslice);
            this.valueShapes[currentRegion] = newslice.id;
            this.shapes[newslice.id] = currentRegion;
        },

        renderSlice: function (valuenum, highlight) {
            let target = this.target,
                options = this.options,
                radius = this.radius,
                borderWidth = options.get('borderWidth'),
                offset = options.get('offset'),
                circle = 2 * Math.PI,
                values = this.values,
                total = this.total,
                next = offset ? (2*Math.PI)*(offset/360) : 0,
                start, end, i, vlen, color;

            vlen = values.length;
            for (i = 0; i < vlen; i++) {
                start = next;
                end = next;
                if (total > 0) {  // avoid divide by zero
                    end = next + (circle * (values[i] / total));
                }
                if (valuenum === i) {
                    color = options.get('sliceColors')[i % options.get('sliceColors').length];
                    if (highlight) {
                        color = this.calcHighlightColor(color, options);
                    }

                    return target.drawPieSlice(radius, radius, radius - borderWidth, start, end, undefined, color);
                }
                next = end;
            }
        },

        render: function (el,userValues) {
            this.init(el,userValues);
            let target = this.target,
                values = this.values,
                options = this.options,
                radius = this.radius,
                borderWidth = options.get('borderWidth'),
                shape, i;

            // if (!pie._super.render.call(this)) {
            //     return;
            // }
            if (borderWidth) {
                target.drawCircle(radius, radius, Math.floor(radius - (borderWidth / 2)),
                    options.get('borderColor'), undefined, borderWidth).append();
            }
            for (i = values.length; i--;) {
                if (values[i]) { // don't render zero values
                    shape = this.renderSlice(i).append();
                    this.valueShapes[i] = shape.id; // store just the shapeid
                    this.shapes[shape.id] = i;
                }
            }
            //target.render();
        }
    },
    box:{
        type: 'box',

        init: function(el, values) {

            let options = this.options;
            let width = el.mergedOptions.width;
            let height = el.mergedOptions.height;

            this.canvasWidth = el.mergedOptions.width;
            this.canvasHeight = el.mergedOptions.height;

            //box._super.init.call(this, el, values, options, width, height);
            this.values = $.map(values, Number);
            this.width = options.get('width') === 'auto' ? '4.0em' : width;
            //this.initTarget();
            if (!this.values.length) {
                this.disabled = 1;
            }
        },

        /**
         * Simulate a single region
         */
        getRegion: function () {
            return 1;
        },

        getCurrentRegionFields: function () {
            let result = [
                { field: 'lq', value: this.quartiles[0] },
                { field: 'med', value: this.quartiles[1] },
                { field: 'uq', value: this.quartiles[2] }
            ];
            if (this.loutlier !== undefined) {
                result.push({ field: 'lo', value: this.loutlier});
            }
            if (this.routlier !== undefined) {
                result.push({ field: 'ro', value: this.routlier});
            }
            if (this.lwhisker !== undefined) {
                result.push({ field: 'lw', value: this.lwhisker});
            }
            if (this.rwhisker !== undefined) {
                result.push({ field: 'rw', value: this.rwhisker});
            }
            return result;
        },

        render:  function (el,userValues) {
            this.init(el,userValues);

            let target = this.target,
                values = this.values,
                vlen = values.length,
                options = this.options,
                canvasWidth = this.canvasWidth,
                canvasHeight = this.canvasHeight,
                minValue = options.get('chartRangeMin') === undefined ? Math.min.apply(Math, values) : options.get('chartRangeMin'),
                maxValue = options.get('chartRangeMax') === undefined ? Math.max.apply(Math, values) : options.get('chartRangeMax'),
                canvasLeft = 0,
                lwhisker, loutlier, iqr, q1, q2, q3, rwhisker, routlier, i,
                size, unitSize;

            // if (!box._super.render.call(this)) {
            //     return;
            // }

            if (options.get('raw')) {
                if (options.get('showOutliers') && values.length > 5) {
                    loutlier = values[0];
                    lwhisker = values[1];
                    q1 = values[2];
                    q2 = values[3];
                    q3 = values[4];
                    rwhisker = values[5];
                    routlier = values[6];
                } else {
                    lwhisker = values[0];
                    q1 = values[1];
                    q2 = values[2];
                    q3 = values[3];
                    rwhisker = values[4];
                }
            } else {
                values.sort(function (a, b) { return a - b; });
                q1 = quartile(values, 1);
                q2 = quartile(values, 2);
                q3 = quartile(values, 3);
                iqr = q3 - q1;
                if (options.get('showOutliers')) {
                    lwhisker = rwhisker = undefined;
                    for (i = 0; i < vlen; i++) {
                        if (lwhisker === undefined && values[i] > q1 - (iqr * options.get('outlierIQR'))) {
                            lwhisker = values[i];
                        }
                        if (values[i] < q3 + (iqr * options.get('outlierIQR'))) {
                            rwhisker = values[i];
                        }
                    }
                    loutlier = values[0];
                    routlier = values[vlen - 1];
                } else {
                    lwhisker = values[0];
                    rwhisker = values[vlen - 1];
                }
            }
            this.quartiles = [q1, q2, q3];
            this.lwhisker = lwhisker;
            this.rwhisker = rwhisker;
            this.loutlier = loutlier;
            this.routlier = routlier;

            unitSize = canvasWidth / (maxValue - minValue + 1);
            if (options.get('showOutliers')) {
                canvasLeft = Math.ceil(options.get('spotRadius'));
                canvasWidth -= 2 * Math.ceil(options.get('spotRadius'));
                unitSize = canvasWidth / (maxValue - minValue + 1);
                if (loutlier < lwhisker) {
                    target.drawCircle((loutlier - minValue) * unitSize + canvasLeft,
                        canvasHeight / 2,
                        options.get('spotRadius'),
                        options.get('outlierLineColor'),
                        options.get('outlierFillColor')).append();
                }
                if (routlier > rwhisker) {
                    target.drawCircle((routlier - minValue) * unitSize + canvasLeft,
                        canvasHeight / 2,
                        options.get('spotRadius'),
                        options.get('outlierLineColor'),
                        options.get('outlierFillColor')).append();
                }
            }

            // box
            target.drawRect(
                Math.round((q1 - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight * 0.1),
                Math.round((q3 - q1) * unitSize),
                Math.round(canvasHeight * 0.8),
                options.get('boxLineColor'),
                options.get('boxFillColor')).append();
            // left whisker
            target.drawLine(
                Math.round((lwhisker - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight / 2),
                Math.round((q1 - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight / 2),
                options.get('lineColor')).append();
            target.drawLine(
                Math.round((lwhisker - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight / 4),
                Math.round((lwhisker - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight - canvasHeight / 4),
                options.get('whiskerColor')).append();
            // right whisker
            target.drawLine(Math.round((rwhisker - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight / 2),
                Math.round((q3 - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight / 2),
                options.get('lineColor')).append();
            target.drawLine(
                Math.round((rwhisker - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight / 4),
                Math.round((rwhisker - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight - canvasHeight / 4),
                options.get('whiskerColor')).append();
            // median line
            target.drawLine(
                Math.round((q2 - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight * 0.1),
                Math.round((q2 - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight * 0.9),
                options.get('medianColor')).append();
            if (options.get('target')) {
                size = Math.ceil(options.get('spotRadius'));
                target.drawLine(
                    Math.round((options.get('target') - minValue) * unitSize + canvasLeft),
                    Math.round((canvasHeight / 2) - size),
                    Math.round((options.get('target') - minValue) * unitSize + canvasLeft),
                    Math.round((canvasHeight / 2) + size),
                    options.get('targetColor')).append();
                target.drawLine(
                    Math.round((options.get('target') - minValue) * unitSize + canvasLeft - size),
                    Math.round(canvasHeight / 2),
                    Math.round((options.get('target') - minValue) * unitSize + canvasLeft + size),
                    Math.round(canvasHeight / 2),
                    options.get('targetColor')).append();
            }
            //target.render();
        }
    },
    shapeCount:0,
    shapes:{},
    shapeseq:[],
    lastShapeId:null,
    mergedOptions:null,
    init:function(userValues, userOptions){
        let extendedOptions, defaults, base;
        userOptions = userOptions || {};
        let _this = this;
        defaults = this.defaultOption;
        base = defaults.common;
        extendedOptions = defaults[userOptions.type || base.type];

        _this.shapeCount = 0;
        _this.shapes = {};
        _this.shapeseq = [];
        _this.lastShapeId = null;

        _this.mergedOptions = $.extend({}, base, extendedOptions, userOptions);
        _this.mergedOptions.width = _this.mergedOptions.width;
        _this.mergedOptions.height = _this.mergedOptions.height;
        _this[_this.mergedOptions.type].render(_this, userValues);

        return { shapes:_this.shapes, shapeseq:_this.shapeseq, offsetX:_this.mergedOptions.offsetX, offsetY:_this.mergedOptions.offsetY, pixelWidth:_this.mergedOptions.width, pixelHeight:_this.mergedOptions.height};

    },
    _getContext: function (lineColor, fillColor, lineWidth) {
        let context;
        if(this.ctx != null){
            context = this.ctx;
        }
        else{
            context = $("#" + this._canvasID ).get(0).getContext('2d');
        }

        if (lineColor !== undefined) {
            context.strokeStyle = lineColor;
        }
        context.lineWidth = lineWidth === undefined ? 1 : lineWidth;
        if (fillColor !== undefined) {
            context.fillStyle = fillColor;
        }
        return context;
    },

    reset: function () {
        let context = this._getContext();
        context.clearRect(0, 0, this.pixelWidth, this.pixelHeight);
        this.shapes = {};
        this.shapeseq = [];
        this.currentTargetShapeId = undefined;
    },

    _drawShape: function (shapeid, path, lineColor, fillColor, lineWidth) {
        let context = this._getContext(lineColor, fillColor, lineWidth),
            i, plen;
        context.beginPath();
        context.moveTo(path[0][0] + 0.5 + this.offsetX, path[0][1] + 0.5 + this.offsetY);
        
        for (i = 1, plen = path.length; i < plen; i++) {
            context.lineTo(path[i][0] + 0.5 + this.offsetX, path[i][1] + 0.5 + this.offsetY); // the 0.5 offset gives us crisp pixel-width lines
        }
        if (lineColor !== undefined) {
            context.stroke();
        }
        if (fillColor !== undefined) {
            context.fill();
        }
        if (this.targetX !== undefined && this.targetY !== undefined &&
            context.isPointInPath(this.targetX + this.offsetX, this.targetY + this.offsetY)) {
            this.currentTargetShapeId = shapeid;
        }
    },

    _drawCircle: function (shapeid, x, y, radius, lineColor, fillColor, lineWidth) {
        let context = this._getContext(lineColor, fillColor, lineWidth);
        context.beginPath();
        x+=this.offsetX;
        y+=this.offsetY;
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        if (this.targetX !== undefined && this.targetY !== undefined &&
            context.isPointInPath(this.targetX+this.offsetX, this.targetY+this.offsetY)) {
            this.currentTargetShapeId = shapeid;
        }
        if (lineColor !== undefined) {
            context.stroke();
        }
        if (fillColor !== undefined) {
            context.fill();
        }
    },

    _drawPieSlice: function (shapeid, x, y, radius, startAngle, endAngle, lineColor, fillColor) {
        let context = this._getContext(lineColor, fillColor);
        x+=this.offsetX;
        y+=this.offsetY;
        context.beginPath();
        context.moveTo(x, y);
        context.arc(x, y, radius, startAngle, endAngle, false);
        context.lineTo(x, y);
        context.closePath();
        if (lineColor !== undefined) {
            context.stroke();
        }
        if (fillColor) {
            context.fill();
        }
        if (this.targetX !== undefined && this.targetY !== undefined &&
            context.isPointInPath(this.targetX+this.offsetX, this.targetY+this.offsetY)) {
            this.currentTargetShapeId = shapeid;
        }
    },

    _drawRect: function (shapeid, x, y, width, height, lineColor, fillColor) {
        // x+=this.offsetX;
        // y+=this.offsetY;
        return this._drawShape(shapeid, [[x, y], [x + width, y], [x + width, y + height], [x, y + height], [x, y]], lineColor, fillColor);
    },

    appendShape: function (shape) {
        this.shapes[shape.id] = shape;
        this.shapeseq.push(shape.id);
        this.lastShapeId = shape.id;
        return shape.id;
    },

    replaceWithShape: function (shapeid, shape) {
        let shapeseq = this.shapeseq,
            i;
        this.shapes[shape.id] = shape;
        for (i = shapeseq.length; i--;) {
            if (shapeseq[i] == shapeid) {
                shapeseq[i] = shape.id;
            }
        }
        delete this.shapes[shapeid];
    },

    replaceWithShapes: function (shapeids, shapes) {
        let shapeseq = this.shapeseq,
            shapemap = {},
            sid, i, first;

        for (i = shapeids.length; i--;) {
            shapemap[shapeids[i]] = true;
        }
        for (i = shapeseq.length; i--;) {
            sid = shapeseq[i];
            if (shapemap[sid]) {
                shapeseq.splice(i, 1);
                delete this.shapes[sid];
                first = i;
            }
        }
        for (i = shapes.length; i--;) {
            shapeseq.splice(first, 0, shapes[i].id);
            this.shapes[shapes[i].id] = shapes[i];
        }

    },

    insertAfterShape: function (shapeid, shape) {
        let shapeseq = this.shapeseq,
            i;
        for (i = shapeseq.length; i--;) {
            if (shapeseq[i] === shapeid) {
                shapeseq.splice(i + 1, 0, shape.id);
                this.shapes[shape.id] = shape;
                return;
            }
        }
    },

    removeShapeId: function (shapeid) {
        let shapeseq = this.shapeseq,
            i;
        for (i = shapeseq.length; i--;) {
            if (shapeseq[i] === shapeid) {
                shapeseq.splice(i, 1);
                break;
            }
        }
        delete this.shapes[shapeid];
    },

    getShapeAt: function (el, x, y) {
        this.targetX = x;
        this.targetY = y;
        this.render();
        return this.currentTargetShapeId;
    },
    _canvasID:"luckysheetTableContent",
    render: function (shapeseq, shapes, offsetX, offsetY, pixelWidth, pixelHeight,canvasid,ctx) {
        if(canvasid==null){
            canvasid = "luckysheetTableContent";
        }
        this._canvasID = canvasid;

        if(ctx != null){
            this.ctx = ctx;
        }

        let shapeCount = shapeseq.length,
            context = this._getContext(),
            shapeid, shape, i;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.pixelWidth = pixelWidth;
        this.pixelHeight = pixelHeight;
        //context.clearRect(this.offsetX, this.offsetY, this.pixelWidth, this.pixelHeight);

        // qkSparkSetting.currentSparkVlaue = {
        //     shapeseq : shapeseq,
        //     shapes:shapes,
        //     shapeCount:shapeCount,
        //     el:this
        // }

        for (i = 0; i < shapeCount; i++) {
            shapeid = shapeseq[i];
            shape = shapes[shapeid];
            this['_draw' + shape.type].apply(this, shape.args);
        }
        // if (!this.interact) {
        //     // not interactive so no need to keep the shapes array
        //     this.shapes = {};
        //     this.shapeseq = [];
        // }
    },
    drawLine: function (x1, y1, x2, y2, lineColor, lineWidth) {
        return this.drawShape([[x1, y1], [x2, y2]], lineColor, lineWidth);
    },

    drawShape: function (path, lineColor, fillColor, lineWidth) {
        return this._genShape('Shape', [path, lineColor, fillColor, lineWidth]);
    },

    drawCircle: function (x, y, radius, lineColor, fillColor, lineWidth) {
        return this._genShape('Circle', [x, y, radius, lineColor, fillColor, lineWidth]);
    },

    drawPieSlice: function (x, y, radius, startAngle, endAngle, lineColor, fillColor) {
        return this._genShape('PieSlice', [x, y, radius, startAngle, endAngle, lineColor, fillColor]);
    },

    drawRect: function (x, y, width, height, lineColor, fillColor) {
        return this._genShape('Rect', [x, y, width, height, lineColor, fillColor]);
    },
    _genShape: function (shapetype, shapeargs) {
        let id = this.shapeCount++;
        shapeargs.unshift(id);
        // return new VShape(this, id, shapetype, shapeargs);
        // this.target = target;
        // this.id = id;
        // this.type = type;
        // this.args = args;
        let shape = { id:id, type:shapetype, args:shapeargs };
        this.shapes[id] = shape;
        this.shapeseq.push(id);
        this.lastShapeId = id;
        return {
            append:function(){
                return shape;
            },
            get:function(){
                return id;
            }
        };
    }

}

let barHighlightMixin = {
    changeHighlight: function (highlight) {
        let currentRegion = this.currentRegion,
            target = this.target,
            shapeids = this.regionShapes[currentRegion],
            newShapes;
        // will be null if the region value was null
        if (shapeids) {
            newShapes = this.renderRegion(currentRegion, highlight);
            if ($.isArray(newShapes) || $.isArray(shapeids)) {
                target.replaceWithShapes(shapeids, newShapes);
                this.regionShapes[currentRegion] = $.map(newShapes, function (newShape) {
                    return newShape.id;
                });
            } else {
                target.replaceWithShape(shapeids, newShapes);
                this.regionShapes[currentRegion] = newShapes.id;
            }
        }
    },
    render: function (el,userValues) {
        this.init(el, userValues);
        let values = this.values,
            target = this.target,
            regionShapes = this.regionShapes,
            shapes, ids, i, j;

        // if (!this.cls._super.render.call(this)) {
        //     return;
        // }
        for (i = values.length; i--;) {
            shapes = this.renderRegion(i);
            if (shapes) {
                if ($.isArray(shapes)) {
                    ids = [];
                    for (j = shapes.length; j--;) {
                        shapes[j].append();
                        ids.push(shapes[j].id);
                    }
                    regionShapes[i] = ids;
                } else {
                    shapes.append();
                    regionShapes[i] = shapes.id; // store just the shapeid
                }
            } else {
                // null value
                regionShapes[i] = null;
            }
        }
        //target.render();
    }
};

let _luckysheetSparkLineOptions = {
    get:function(type){
        return luckysheetSparkline.mergedOptions[type];
    }
}

let _luckysheetSparkLineTarget = {
    drawLine:function(x1, y1, x2, y2, lineColor, lineWidth){
        return luckysheetSparkline.drawLine(x1, y1, x2, y2, lineColor, lineWidth);
    },

    drawShape:function(path, lineColor, fillColor, lineWidth){
        return luckysheetSparkline.drawShape(path, lineColor, fillColor, lineWidth);
    },

    drawCircle:function(x, y, radius, lineColor, fillColor, lineWidth){
        return luckysheetSparkline.drawCircle(x, y, radius, lineColor, fillColor, lineWidth);
    },

    drawPieSlice:function(x, y, radius, startAngle, endAngle, lineColor, fillColor){
        return luckysheetSparkline.drawPieSlice(x, y, radius, startAngle, endAngle, lineColor, fillColor);
    },

    drawRect:function(x, y, width, height, lineColor, fillColor){
        return luckysheetSparkline.drawRect(x, y, width, height, lineColor, fillColor);
    }
}

for(let item in luckysheetSparkline){
    if(item in {"line":null, "bar":null, "column":null, "tristate":null, "discrete":null, "bullet":null, "pie":null, "box":null}){
        luckysheetSparkline[item].options = _luckysheetSparkLineOptions;
        luckysheetSparkline[item].target = _luckysheetSparkLineTarget;
    }

    if(item in {"bar":null, "column":null, "tristate":null, "discrete":null}){
        luckysheetSparkline[item].changeHighlight = barHighlightMixin.changeHighlight;
        luckysheetSparkline[item].render = barHighlightMixin.render;
    }
}

export default luckysheetSparkline;
