/**
 * Set the "display" property of a div to ""
 * @param id The div's id
 */
function display(id) {
    var target = document.getElementById(id);
    if (target.style.display == "none") {
        target.style.display = "";
    }
}


/**
 * Plot error heatmap in a certain div.
 * @param canvas_id The id of the canvas(div) to be plot on.
 *          prerequisite: The div should be cleared.
 * @param esb_type The type of ensemble
 * @param esb_size The size of ensemble
 */
function plot_error_heatmap_in_div(canvas_id, esb_type, esb_size) {
    if (inputObject.sort_by !== 'param' && inputObject.sort_by !== 'width' && inputObject.sort_by !== 'depth') {
        alert('Sort by incorrect:', inputObject.sort_by);
        return;
    }
    var tt = document.getElementById(canvas_id);
    if (tt.innerHTML !== '') {
        alert('Canvas not cleared!');
        return;
    }

    var net_arch = inputObject.network_archeticture;
    var dataset = inputObject.dataset;
    var h_sizes = inputObject.horizontal;
    var v_sizes = inputObject.vertical;

    // Get the index of columns we are going to display
    var indexes = get_indexes();

    var t = [net_arch, dataset, esb_type, esb_size];
    json_filename = 'data/error_heatmap/' + t.join('_') + '.json';
    var ret = readTextFile(json_filename);
    var json = JSON.parse(ret);
    var x_values = json.x_values;
    var z_values = json.data;

    // Get the data we need according to the indexes
    var x_values_t = [];
    for (let i of indexes) {
        x_values_t.push(x_values[i]);
    }
    var z_values_t = [];
    var new_line;
    for (let line of z_values) {
        new_line = [];
        for (let i of indexes) {
            new_line.push(line[i]);
        }
        z_values_t.push(new_line);
    }
    var y = [];
    for (let i = 1; i <= 250; i++) {
        y.push(i);
    }

    var data = [
        {
            z: z_values_t,
            x: x_values_t,
            y: y,
            type: 'heatmap',
            hoverongaps: false,
            colorscale: [[0.0, '#fbb4ae'],
                [0.33, '#fbb4ae'],
                [0.33, '#b3cde3'],
                [0.66, '#b3cde3'],
                [0.66, '#ccebc5'],
                [1.0, '#ccebc5']],
            colorbar: {
                tickmode: 'array',
                tickvals: [-0.7, 0, 0.7],
                ticktext: ['Single<br>better', 'Equal', 'Ensemble<br>better']
            }
        }
    ];
    var layout = {
        title: 'Comparing Validation Error',
        xaxis: {
            title: 'Width factor|Depth|Parameters (M)',
            type: 'category',
            tickangle: 45,
            automargin: true,
        },
        yaxis: {
            title: 'Number of epochs',
            tickmode: 'array',

            //tickvals:[1, 20, 40, 60, 80, 100, 120, 140, 160, 200, 250],
            //ticktext:[1, 20, 40, 60, 80, 100, 120, 140, 160, 200, 250],
            tickvals:[1, 30, 60, 90, 120, 160, 200, 240, 300, 400, 500, 600],
            ticktext:[1, 30, 60, 90, 120, 160, 200, 240, 300, 400, 500, 600],
        },

    };

    Plotly.newPlot(canvas_id, data, layout);
}


/**
 * Plot error heatmap in a certain div.
 * @param canvas_id The id of the canvas(div) to be plot on.
 *          prerequisite: The div should be cleared.
 * @param esb_type The type of ensemble
 * @param esb_size The size of ensemble
 */
function plot_time_to_acc_in_div(canvas_id, esb_type, esb_size) {
    var net_arch = inputObject.network_archeticture;
    var dataset = inputObject.dataset;
    var h_sizes = inputObject.horizontal;
    var v_sizes = inputObject.vertical;

    // Get the index of columns we are going to display
    var indexes = get_indexes();

    var types = [];
    if (inputObject.horizontal.length > 0) {
        types.push("horizontal");
    }
    if (inputObject.vertical.length) {
        types.push("vertical");
    }

    t = [net_arch, dataset, esb_type, esb_size];
    json_filename = 'data/time_to_acc/' + t.join('_') + '.json';
    var ret = readTextFile(json_filename);
    var json = JSON.parse(ret);
    var x_values = json.x_values;
    var y_sgl = json.total_time_sgl;
    var y_esb = json.total_time_esb;
    var esb_win = json.esb_win;

    var x_values_t = [];
    for (let i of indexes) {
        x_values_t.push(x_values[i]);
    }
    var y_sgl_t = [];
    for (let i of indexes) {
        y_sgl_t.push(y_sgl[i]);
    }
    var y_esb_t = [];
    for (let i of indexes) {
        y_esb_t.push(y_esb[i]);
    }
    var esb_win_t = [];
    for (let i of indexes) {
        esb_win_t.push(esb_win[i]);
    }
    console.log('esb win', esb_win_t);

    var xs = [];
    var sgl_time = [];
    var esb_time = [];
    for (let i in esb_win) {
        if (esb_win_t[i] === 1) {
            xs.push(x_values_t[i]);
            sgl_time.push(y_sgl_t[i]);
            esb_time.push(y_esb_t[i]);
        }
    }

    // Time of single
    var trace1 = {
        x: xs,
        y: sgl_time,
        name: 'single',
        type: 'bar',
        opacity: 0.5,
        marker: {
            color: 'rgb(251,180,174)',
            line: {
                // color: 'rgb(8,48,107)',
                width: 1.5
            }
        }
    };
    // Time of ensemble
    var trace2 = {
        x: xs,
        y: esb_time,
        name: 'ensemble',
        type: 'bar',
        marker: {
            color: 'rgba(204,235,197,0.5)',
            line: {
                // color: 'rgb(8,48,107)',
                width: 1.5
            }
        }
    };


    var data = [trace1, trace2];

    var layout = {
        title: 'Time To Accuracy',
        xaxis: {
            title: 'Width factor|Depth|Parameters (M)',
            type: 'category',
            tickangle: 45,
            automargin: true,
        },
        yaxis: {
            title: 'Time (s)',
        }
    };

    Plotly.newPlot(canvas_id, data, layout);

}




/**
 * Plot error heatmap in a certain div.
 * @param canvas_id The id of the canvas(div) to be plot on.
 *          prerequisite: The div should be cleared.
 * @param esb_type The type of ensemble
 * @param esb_size The size of ensemble
 */
function plot_time_per_epoch_in_div(canvas_id, esb_type, esb_size) {
    var net_arch = inputObject.network_archeticture;
    var dataset = inputObject.dataset;

    // Get the index of columns we are going to display
    var indexes = get_indexes();

    var types = [];
    if (inputObject.horizontal.length > 0) {
        types.push("horizontal");
    }
    if (inputObject.vertical.length) {
        types.push("vertical");
    }

    // Plot
    t = [net_arch, dataset, esb_type, esb_size];
    json_filename = 'data/time_per_epoch_barchart/' + t.join('_') + '.json';
    var ret = readTextFile(json_filename);
    var json = JSON.parse(ret);
    var x_values = json.x_values;
    var sgl_train_time = json.sgl_train_time;
    var sgl_data_time = json.sgl_data_time;
    var esb_train_time = json.esb_train_time;
    var esb_data_time = json.esb_data_time;

    var x_values_t = [];
    for (let i of indexes) {
        x_values_t.push(x_values[i]);
    }
    var sgl_train_time_t = [];
    for (let i of indexes) {
        // sgl_train_time_t.push(-sgl_train_time[i]);
        sgl_train_time_t.push(sgl_train_time[i]);
    }
    var sgl_data_time_t = [];
    for (let i of indexes) {
        // sgl_data_time_t.push(-sgl_data_time[i]);
        sgl_data_time_t.push(sgl_data_time[i]);
    }
    var esb_data_time_t = [];
    for (let i of indexes) {
        esb_data_time_t.push(esb_data_time[i]);
    }
    var esb_train_time_t = [];
    var new_line;
    for (let line of esb_train_time) {
        new_line = [];
        for (let i of indexes) {
            new_line.push(line[i]);
        }
        esb_train_time_t.push(new_line);
    }

    var data = [];
    // training time of single network
    var trace1 = {
        x: x_values_t,
        y: sgl_train_time_t,
        name: 'single<br>network<br>training',
        type: 'bar',
        opacity: 0.5,
        marker: {
            color: 'rgb(254,224,210)',
            line: {
                width: 1.5
            }
        },
    };
    // data loading of single network
    var trace2 = {
        x: x_values_t,
        y: sgl_data_time_t,
        name: 'data<br>loading',
        type: 'bar',
        opacity: 0.5,
        marker: {
            color: 'rgb(252,146,114)',
            line: {
                width: 1.5
            }
        },
    };
    data.push(trace2, trace1);

    // Color dic for ensemble chart
    console.log(esb_size);
    var color_dic;
    if (esb_size == 4){
        color_dic = color_dic_esb_4;
    } else if (esb_size == 6){
        color_dic = color_dic_esb_6;
    } else if (esb_size == 8){
        color_dic = color_dic_esb_8;
    }
    console.log('color dic: ', color_dic);

    var trace;
    // data loading time of ensemble network
    trace = {
        x: x_values_t,
        y: esb_data_time_t,
        name: 'data<br>loading',
        type: 'bar',
        opacity: 0.5,
        marker: {
            color: color_dic[0],
            line: {
                width: 1.5
            }
        },
        xaxis: 'x2',
        yaxis: 'y2',
    };
    data.push(trace);

    // training time of each subnet of ensemble
    for (var i = 0; i < esb_size; i++) {
        trace = {
            x: x_values_t,
            y: esb_train_time_t[i],
            name: 'network ' + i + '<br>training',
            type: 'bar',
            opacity: 0.5,
            marker: {
                color: color_dic[i+1],
                line: {
                    width: 1.5
                }
            },
            xaxis: 'x2',
            yaxis: 'y2',
        };
        data.push(trace);
    }
    var layout = {
        title: 'Comparing Time Per Epoch',
        barmode: 'stack',
        // barmode: 'relative',
        xaxis: {
            title: 'Width factor|Depth|Parameters (M)',
            type: 'category',
            tickangle: 45,
            automargin: true,
        },
        yaxis: {
            title: 'Time (s)',
            domain: [0, 0.48],
        },

        xaxis2: {
            visible: false,
            anchor: 'y2',
        },
        yaxis2: {
            domain: [0.52, 1],
        }
    };
    Plotly.newPlot(canvas_id, data, layout);
}


/**
 * For each ensemble type and ensemble size, plot one line for it
 */
function plot_all_lines() {
    // Clear
    var parent = document.getElementById('result_canvas');
    parent.innerHTML = '';

    var line_id, i;
    for (i = 0; i < inputObject.horizontal.length; i++) {
        plot_one_line('horizontal', inputObject.horizontal[i]);
    }
    for (i = 0; i < inputObject.vertical.length; i++) {
        plot_one_line('vertical', inputObject.vertical[i]);
    }
}

/**
 * Plot one line containing all kinds of figures
 */
function plot_one_line(esb_type, esb_size) {
    var parent = document.getElementById('result_canvas');

    parent.appendChild(document.createElement('hr'));

    // Header
    var h_row = document.createElement('div');
    h_row.setAttribute('class', 'row');
    h_row.setAttribute('style', 'margin:0 auto; text-align: center');
    var header = document.createElement('h3');
    header.setAttribute('style', 'margin:0 auto');
    header.innerHTML = esb_type[0].toUpperCase() + esb_type.substr(1, esb_type.length-1) +
                        ' ensembles <i>(k=' + esb_size + ')</i>';
    h_row.appendChild(header);
    parent.appendChild(h_row);

    // Row to contain all plots in one line
    var canvas = document.createElement('div');
    canvas.setAttribute('id', 'canvas1');
    canvas.setAttribute('class', 'row');
    parent.appendChild(canvas);

    // Error heatmap canvas
    var canvas_error_heatmap = document.createElement('div');
    canvas_error_heatmap.setAttribute('id', 'canvas_error_heatmap' + esb_type + esb_size);
    canvas_error_heatmap.setAttribute('class', 'col');
    canvas_error_heatmap.setAttribute('style', 'width:300px;height:400px;');
    canvas.appendChild(canvas_error_heatmap);

    // Time per epoch canvas
    var canvas_time_per_epoch = document.createElement('div');
    canvas_time_per_epoch.setAttribute('id', 'canvas_time_per_epoch' + esb_type + esb_size);
    canvas_time_per_epoch.setAttribute('class', 'col');
    canvas.appendChild(canvas_time_per_epoch);

    // Time to accuracy canvas
    //var canvas_time_to_acc = document.createElement('div');
    //canvas_time_to_acc.setAttribute('id', 'canvas_time_to_acc' + esb_type + esb_size);
    //canvas_time_to_acc.setAttribute('class', 'col');
    //canvas_time_to_acc.setAttribute('style', 'width:300px;height:400px;');
    //canvas.appendChild(canvas_time_to_acc);

    // Plot figures
    plot_error_heatmap_in_div(canvas_error_heatmap.id, esb_type, esb_size);
    plot_time_per_epoch_in_div(canvas_time_per_epoch.id, esb_type, esb_size);
    //plot_time_to_acc_in_div(canvas_time_to_acc.id, esb_type, esb_size);
}

/**
 * This function read the "sort by" in inputObject,
 * apply the corresponding sort function to the original index in IndexDic.js,
 * return the sorted index.
 */
function get_indexes() {
    var indexes = [];
    var width = inputObject.width;
    var depth = inputObject.depth;
    var dic_entries = [];
    var arch = inputObject.network_archeticture; // this should be able to get the network arch (i.e. the one you select)
    console.log('width is ', width)
    console.log('depth is ', depth)
    console.log('arch is ', arch)
    for (let i of width) {
        for (let j of depth) {
            if(arch == 'resnet'){
                for (let k of dic_ResNet_list) {
                    console.log('k is ', k)
                    if (k[0] == i && k[1] == j) {
                        dic_entries.push(k);
                        break;
                    }
                }
            }
            else if (arch == 'DenseNet'){
                for (let k of dic_DenseNet_list) {
                    if (k[0] == i && k[1] == j) {
                        dic_entries.push(k);
                        break;
                    }
                }
            }
            if(arch == 'wrn'){
                for (let k of dic_wrn_list) {
                    console.log('k is ', k)
                    if (k[0] == i && k[1] == j) {
                        dic_entries.push(k);
                        break;
                    }
                }
            }
            if(arch == 'vgg'){
                for (let k of dic_VGG_list) {
                    console.log('k is ', k)
                    if (k[0] == i && k[1] == j) {
                        dic_entries.push(k);
                        break;
                    }
                }
            }

        }
    }
    if (inputObject.sort_by === 'width') {
        dic_entries.sort(cmp_width);
    } else if (inputObject.sort_by === 'depth') {
        dic_entries.sort(cmp_depth);
    } else if (inputObject.sort_by === 'param') {
        dic_entries.sort(cmp_param);
    }
    if (arch == 'resnet'){
        for (let i of dic_entries) {
            indexes.push(i[2]);
        }
    }
    else if (arch == 'DenseNet'){
        for (let i of dic_entries) {
            indexes.push(i[3]);
        }
    }
    else if (arch == 'wrn'){
        for (let i of dic_entries) {
            indexes.push(i[2]);
        }
    }
    else if (arch == 'vgg'){
        for (let i of dic_entries) {
            indexes.push(i[2]);
        }
    }

    console.log("dic entries:", JSON.stringify(dic_entries));
    console.log("indexes:", indexes);
    console.log('finish get_indexes')
    return indexes;
}

