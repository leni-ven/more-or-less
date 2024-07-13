/**
 * Search available network architecture in the database
 */
function search_net_architecture() {
    execute_statement(
        "select distinct net_arch from param_ensemble " +
        " order by net_arch asc;",
        function (result_rows) {
            print_result(result_rows);
            var result_list = [];
            for (let i in result_rows) {
                result_list.push(result_rows[i]["net_arch"]);
            }
            // Use the result to show dynamically
            display_available_network_architecture(result_list);
        }
    );
}


function search_dataset(network) {
    execute_statement(
        "select distinct dataset from param_ensemble " +
        " where net_arch = '" + network + "'" +
        " order by dataset asc;",
        function (result_rows) {
            print_result(result_rows);
            var result_list = [];
            for (let i in result_rows) {
                result_list.push(result_rows[i]["dataset"]);
            }
            console.log(result_list);
            // Use the result to show dynamically
            display_available_dataset(result_list);
        }
    );
}

function search_widths(network, dataset) {
    execute_statement(
        "select distinct width from param_width_depth "+
        " where net_arch = '" + network + "'" +
        " and dataset = '" + dataset + "'" +
        " order by width asc;",
        function (result_rows) {
            console.log('Question');
            console.log(network);
            console.log(dataset);

            print_result(result_rows);
            var result_list = [];
            for (let i in result_rows) {
                result_list.push(result_rows[i]["width"]);
            }
            console.log(result_list);
            var res = JSON.parse(result_list)
            console.log(res);

            // Use the result to show dynamically
            display_available_width(res);
            //display_available_width(result_list);

        }
    );
}

/**
 * Search available "depth" from database
 * @param network String, a certain network type
 * @param dataset String, a certain dataset
 * @param width Array, contains all the input width
 */
function search_depths(network, dataset, width) {
    execute_statement(
        "select distinct depth from param_width_depth " +
        " where net_arch = '" + network + "'" +
        " and dataset = '" + dataset + "'" +
        " order by depth asc;",
        function (result_rows) {
            print_result(result_rows);
            var result_list = [];
            for (let i in result_rows) {
                result_list.push(result_rows[i]["depth"]);
            }
            console.log(result_list);
            console.log(result_rows);
            var res = JSON.parse(result_list)
            console.log(res);
            display_available_depth(res);
            // Use the result to show dynamically
            //display_available_depth(result_list);
        }
    );
}

/**
 * Search all available ensemble size for two kind of ensembles
 * @param network String, a certain network type
 * @param dataset String, a certain dataset
 */
function search_ensemble_type_and_size(network, dataset) {
    // Horizontal ensemble size
    execute_statement(
        "select distinct esb_size from param_ensemble \n" +
        " where net_arch = '" + network + "'" +
        " and dataset = '" + dataset + "'" +
        " and esb_type = 'horizontal'" +
        " order by esb_size asc;",
        function (result_rows) {
            print_result(result_rows);
            var result_list = [];
            for (let i in result_rows) {
                result_list.push(result_rows[i]["esb_size"]);
            }
            console.log("horizontal size result list:", result_list);
            // Use the result to show dynamically
            display_available_horizontal(result_list);
        }
    );

    // Vertical ensemble size
    execute_statement(
        "select distinct esb_size from param_ensemble \n" +
        " where net_arch = '" + network + "'" +
        " and dataset = '" + dataset + "'" +
        " and esb_type = 'vertical'" +
        " order by esb_size asc;",
        function (result_rows) {
            print_result(result_rows);
            var result_list = [];
            for (let i in result_rows) {
                result_list.push(result_rows[i]["esb_size"]);
            }
            console.log("vertical size result list:", result_list);
            // Use the result to show dynamically
            display_available_vertical(result_list);
        }
    );
}