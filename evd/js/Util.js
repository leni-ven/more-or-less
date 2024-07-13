/**
 * Read a local file
 * @param file Path of the local file
 * @returns {String, local file's content}
 */
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    var allText;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
            }
        }
    };
    rawFile.send(null);
    return allText;
}

/**
 * check if the page has graph( visual results), represent by error_heatmap_canvas
 * @returns {boolean}
 */
function have_graph() {
    var canvas = document.getElementById('result_canvas');
    return canvas.innerHTML.length > 0;
}

/**
 * print sort_by change when the page has graph
 */
function print_change_when_have_graph() {
    if (have_graph()) {
        console.log('sort_by = ' + inputObject.sort_by);
        plot_all_lines();
        console.log("ploted");
    }
}
