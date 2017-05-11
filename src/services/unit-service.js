var handlePercentageUnit = function(value) {
    // for 0.1 -> 10%
    return result = (value * 100).toFixed(1);
}
var handleNormalUnit = function(value) {
    return value + UNIT_MAP[unit];
}
var handleTTTUnit = function(value) {
    return (value / 10000000).toFixed(1);
}
var handleMUnit = function(value) {
    return (value / 1000000).toFixed(1);
}
var handleBUnit = function(value) {
    return (value / 100000000).toFixed(1);
}
var handleTTUnit = function(value) {
    return (value / 10000).toFixed(1);
}
var handleThousandPercetage = function(value) {
    return (value * 1000).toFixed(2);
}

function filter(value, unit) {
    var result = value;
    switch (unit) {
        case 'thoudsand_percentage':
            result = handleThousandPercetage(value);
            break;
        case 'percentage':
            result = handlePercentageUnit(value);
            break;
        case 'tt_rmb':
            result = handleTTUnit(value);
            break;
        case 'tt_dollor':
            result = handleTTUnit(value);
            break;
        case 'tt_people':
            result = handleTTUnit(value);
            break;
        case 'm_rmb':
            result = handleMUnit(value);
            break;
        case 'ttt_rmb':
            result = handleTTTUnit(value);
            break;
        case 'b_rmb':
            result = handleBUnit(value);
            break;
        case 'm_dollor':
            result = handleMUnit(value);
            break;
        case 'ttt_dollor':
            result = handleTTTUnit(value);
            break;
        case 'b_dollor':
            result = handleBUnit(value);
            break;
    }
    return parseFloat(result);
};


export default {
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    getMonthList(lst) {
        var n_list = [];
        for (var i = 0; i < lst.length; i++) {
            n_list.push(lst[i] + '月');
        }
        ;
        return n_list;
    },

    filter2DoubleList(lst) {
        var n_list = [];
        for (var i = 0; i < lst.length; i++) {
            n_list.push(parseFloat(lst[i].toFixed(1)));
        }
        ;
        return n_list;
    },

    getDouble(v) {
        return parseFloat(v.toFixed(1));
    },

    getInt(v) {
        return parseInt(v);
    },

    categoryYxisFilter(yData, unit) {
        var rc_list = [];
        for (var i = 0; i < yData.length; i++) {
            var v = yData[i];
            var temp_map = {};
            var temp_list = [];
            for (var h = 0; h < v.data.length; h++) {
                if (v.data[h] === null) {
                    temp_list.push(v.data[h]);
                    continue;
                }
                temp_list.push(filter(v.data[h], unit));
            }
            ;
            temp_map.name = v.name;
            temp_map.data = temp_list;
            rc_list.push(temp_map);
        }
        ;
        return rc_list;
    },

    sigleFilter(val, unit){
        return filter(val, unit);
    }
}