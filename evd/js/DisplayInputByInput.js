function display_network_architecture() {
    search_net_architecture();
    // display_available_network_architecture(search_net_architecture());
}

function display_dataset() {
    // display_available_dataset(search_dataset(inputObject.network_archeticture));
    search_dataset(inputObject.network_archeticture);
}

function display_width() {
    // display_available_width(search_widths(inputObject.network_archeticture, inputObject.dataset));
    search_widths(inputObject.network_archeticture, inputObject.dataset);
}

function display_depth() {
    // display_available_depth(search_depths(inputObject.network_archeticture, inputObject.dataset, inputObject.width));
    search_depths(inputObject.network_archeticture, inputObject.dataset, inputObject.width);
}

// heat-map is determined by network architecture and dataset( depth and width don't matter )
function display_ensemble_type_and_size() {
    // display_available_ensemble_type_and_size(search_ensemble_type_and_size(inputObject.network_archeticture, inputObject.dataset));
    search_ensemble_type_and_size(inputObject.network_archeticture, inputObject.dataset);
}

function clear_after_network_architecture() {
    clear_dataset();
    clear_after_dataset();
}

function clear_after_dataset() {
    clear_ensemble_type_and_size();
    clear_width();
    clear_depth();
    clear_number_of_parameters();
    hide_headings_after_dataset();
}

function clear_number_of_parameters() {
    var ele = document.getElementById('number_of_parameters');
    ele.style.visibility = 'hidden';
}

function clear_dataset_heading() {
    var dataset_heading = document.getElementById('dataset_heading');
    dataset_heading.style.visibility = 'hidden';
}

function clear_ensemble_headings() {
    var emsemble_heading = document.getElementById('ensemble_heading');
    emsemble_heading.style.visibility = 'hidden';
    var horizontal_heading = document.getElementById('horizontal_heading');
    horizontal_heading.style.visibility = 'hidden';
    var vertical_heading = document.getElementById('vertical_heading');
    vertical_heading.style.visibility = 'hidden';
}

function show_ensemble_headings() {
    var emsemble_heading = document.getElementById('ensemble_heading');
    emsemble_heading.style.visibility = 'visible';
    var horizontal_heading = document.getElementById('horizontal_heading');
    horizontal_heading.style.visibility = 'visible';
    var vertical_heading = document.getElementById('vertical_heading');
    vertical_heading.style.visibility = 'visible';
}

function clear_network_size_headings() {
    var parameters_heading = document.getElementById('network_size_heading');
    parameters_heading.style.visibility = 'hidden';
    var depth_heading = document.getElementById('depth_heading');
    depth_heading.style.visibility = 'hidden';
    var width_heading = document.getElementById('width_heading');
    width_heading.style.visibility = 'hidden';
}

function show_network_size_headings() {
    var network_size_heading = document.getElementById('network_size_heading');
    network_size_heading.style.visibility = 'visible';
    var depth_heading = document.getElementById('depth_heading');
    depth_heading.style.visibility = 'visible';
    var width_heading = document.getElementById('width_heading');
    width_heading.style.visibility = 'visible';
}

function hide_headings_after_network_architecture() {
    clear_dataset_heading();
    hide_headings_after_dataset();
}

function hide_headings_after_dataset() {
    clear_ensemble_headings();
    clear_network_size_headings();
    clear_number_of_parameters();
}

function clear_child_by_parent_id(parent_id) {
    var parent = document.getElementById(parent_id);
    if (parent != null) {
        var childs = parent.childNodes;
        for (i = childs.length - 1; i >= 0; i--) {
            parent.removeChild(childs[i]);
        }
    }
}

function clear_child_by_parent(parent) {
    if (parent != null) {
        var childs = parent.childNodes;
        for (i = childs.length - 1; i >= 0; i--) {
            parent.removeChild(childs[i]);
        }
    }
}

function clear_dataset() {
    clear_child_by_parent_id("dataset_input_column");
}

function clear_width() {
    clear_child_by_parent_id("width_input_column");
}

function clear_depth() {
    clear_child_by_parent_id("depth_input_column");
}

function clear_ensemble_type_and_size() {
    clear_child_by_parent_id("horizontal_input_column");
    clear_child_by_parent_id("vertical_input_column");
}

function show_dataset_heading() {
    var ele = document.getElementById('dataset_heading');
    ele.style.visibility = 'visible';
}

function display_available_network_architecture(available_network_architectures) {
    // Dynamically generate elements according to the available net arch
    console.log(available_network_architectures);
    var parent = document.getElementById("network_architecture_input_column");
    // parent.appendChild(div);
    for (let net of available_network_architectures) {

        // Create a new button
        var div = document.createElement("div");
        div.setAttribute("id", net + "_option");
        div.setAttribute("class", "custom-control custom-radio");
        var input = document.createElement("input");
        input.setAttribute("id", net);
        input.setAttribute("name", "network_archeticture");
        input.setAttribute("type", "radio");
        input.setAttribute("class", "custom-control-input");
        input.setAttribute("value", net);
        input.required = true;
        var label = document.createElement("label");
        label.setAttribute("class", "custom-control-label");
        label.setAttribute("for", net);
        label.textContent = net;
        div.appendChild(input);
        div.appendChild(label);

        parent.appendChild(div);
    }
}

function display_available_dataset(available_dataset) {
    // Dynamically generate elements according to the available
    var parent = document.getElementById("dataset_input_column");
    // remove all previous child
    clear_child_by_parent(parent);
    // add new child
    for (let dataset of available_dataset) {
        // Create a new button
        var div = document.createElement("div");
        div.setAttribute("id", dataset + "_option");
        div.setAttribute("class", "custom-control custom-radio");
        var input = document.createElement("input");
        input.setAttribute("id", dataset);
        input.setAttribute("name", "dataset");
        input.setAttribute("type", "radio");
        input.setAttribute("class", "custom-control-input");
        input.setAttribute("value", dataset);
        input.required = true;
        var label = document.createElement("label");
        label.setAttribute("class", "custom-control-label");
        label.setAttribute("for", dataset);
        label.textContent = dataset;
        div.appendChild(input);
        div.appendChild(label);

        parent.appendChild(div);
    }
}

/*
   <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="width-10" name="width" value="width-10" checked>
      <label class="custom-control-label" for="width-10">10</label>
    </div>
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="width-20" name="width" value="width-20">
      <label class="custom-control-label" for="width-20">20</label>
    </div>
 */
function display_available_width(available) {
    // Dynamically generate elements according to the available
    var parent = document.getElementById("width_input_column");
    // remove all previous child
    clear_child_by_parent(parent);
    // add new child
    for (let n_width of available) {
        var str_net = 'width-' + n_width.toString();
        // Create a new button
        var div = document.createElement("div");
        div.setAttribute("id", str_net + "_option");// width-10_option
        div.setAttribute("class", "custom-control custom-checkbox");
        var input = document.createElement("input");
        input.setAttribute("id", str_net);//
        input.setAttribute("name", "width");
        input.setAttribute("type", "checkbox");
        input.setAttribute("class", "custom-control-input");
        input.setAttribute("value", n_width);
        input.required = true;
        var label = document.createElement("label");
        label.setAttribute("class", "custom-control-label");
        label.setAttribute("for", str_net);
        label.textContent = n_width;
        div.appendChild(input);
        div.appendChild(label);

        parent.appendChild(div);
    }
}

function display_available_depth(available) {
    // Dynamically generate elements according to the available
    var parent = document.getElementById("depth_input_column");
    // remove all previous child
    clear_child_by_parent(parent);
    // add new child
    for (let n_depth of available) {
        var str_net = 'depth-' + n_depth.toString();
        // Create a new button
        var div = document.createElement("div");
        div.setAttribute("id", str_net + "_option");// width-10_option
        div.setAttribute("class", "custom-control custom-checkbox");
        var input = document.createElement("input");
        input.setAttribute("id", str_net);//
        input.setAttribute("name", "depth");
        input.setAttribute("type", "checkbox");
        input.setAttribute("class", "custom-control-input");
        input.setAttribute("value", n_depth);
        input.required = true;
        var label = document.createElement("label");
        label.setAttribute("class", "custom-control-label");
        label.setAttribute("for", str_net);
        label.textContent = n_depth;
        div.appendChild(input);
        div.appendChild(label);

        parent.appendChild(div);
    }
}

// depth and width can determine number of parameters
function display_number_of_parameters() {
    var ele = document.getElementById('number_of_parameters');
    if (inputObject.depth.length > 0 && inputObject.width.length > 0) {
        calculate_number_of_parameters_value();
        ele.style.visibility = 'visible';
    } else {
        ele.style.visibility = 'hidden';
    }
}

// check whether the user has picked just enough things to build a visualization
function can_visualize() {
    return inputObject.network_archeticture.length > 0 && inputObject.dataset.length > 0
        && (inputObject.horizontal.length > 0 || inputObject.vertical.length > 0)
        && inputObject.depth.length > 0 && inputObject.width.length > 0;
}

// Visualize button should only appear (or become active) when the user has picked just enough things to build a visualization
function display_visualize_button() {
    var ele = document.getElementById('show_error_heatmap');
    if (can_visualize()) {
        ele.style.visibility = 'visible';
    } else {
        ele.style.visibility = 'hidden';
    }
}

function hide_visualize_button() {
    var ele = document.getElementById('show_error_heatmap');
    ele.style.visibility = 'hidden';
}

/*
    <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="vertical" name="ensemble_type" value="vertical" checked>
        <label class="custom-control-label" for="vertical">Vertical</label>
    </div>
    <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="horizontal" name="ensemble_type" value="horizontal" checked>
        <label class="custom-control-label" for="horizontal">Horizontal</label>
    </div>
 */

function display_available_horizontal(available) {
    // Dynamically generate elements according to the available
    var parent = document.getElementById("horizontal_input_column");
    // remove all previous child
    clear_child_by_parent(parent);
    // add new child
    for (let n_depth of available) {
        var str_net = 'horizontal-' + n_depth.toString();
        // Create a new button
        var div = document.createElement("div");
        div.setAttribute("id", str_net + "_option");// width-10_option
        div.setAttribute("class", "custom-control custom-checkbox");
        var input = document.createElement("input");
        input.setAttribute("id", str_net);//
        input.setAttribute("name", "horizontal");
        input.setAttribute("type", "checkbox");
        input.setAttribute("class", "custom-control-input");
        input.setAttribute("value", n_depth);
        input.required = true;
        var label = document.createElement("label");
        label.setAttribute("class", "custom-control-label");
        label.setAttribute("for", str_net);
        label.textContent = n_depth;
        div.appendChild(input);
        div.appendChild(label);

        parent.appendChild(div);
    }
}

function display_available_vertical(available) {
    // Dynamically generate elements according to the available
    var parent = document.getElementById("vertical_input_column");
    // remove all previous child
    clear_child_by_parent(parent);
    // add new child
    for (let n_depth of available) {
        var str_net = 'vertical-' + n_depth.toString();
        // Create a new button
        var div = document.createElement("div");
        div.setAttribute("id", str_net + "_option");// width-10_option
        div.setAttribute("class", "custom-control custom-checkbox");
        var input = document.createElement("input");
        input.setAttribute("id", str_net);//
        input.setAttribute("name", "vertical");
        input.setAttribute("type", "checkbox");
        input.setAttribute("class", "custom-control-input");
        input.setAttribute("value", n_depth);
        input.required = true;
        var label = document.createElement("label");
        label.setAttribute("class", "custom-control-label");
        label.setAttribute("for", str_net);
        label.textContent = n_depth;
        div.appendChild(input);
        div.appendChild(label);

        parent.appendChild(div);
    }
}


function calculate_number_of_parameters_value() {
    var parent = document.getElementById('number_of_parameters_value');
    var param = '';
    for (let width of inputObject.width) {
        for (let depth of inputObject.depth) {
            for (let k of dic_DenseNet_list) {
                if (k[0] == width && k[1] == depth) {
                    param += k[2] + '; ';
                }
            }
        }
    }
    parent.textContent = param;
}