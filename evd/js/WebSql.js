/*
This js file is for operating of WebSQL database.
 */

var db_1 = openDatabase('test.db', '1.0', 'hello web sql!', 4 * 1024 * 1024);

/**
 * Update the web sql database using database definition file
 */
function update_database() {
    execute_sql("TableDef-param_ensemble.sql");
    execute_sql("TableDef-param_width_depth.sql");
}

/**
 * Execute a sql statement.
 * @param statement String, the statement to be executed
 * @param my_callback Additional callback function when execution succeed
 */
function execute_statement(statement, my_callback) {
    db_1.transaction(
        function (tx) {
            tx.executeSql(
                statement,
                [],
                function (tx, results) {
                    console.log("success");

                    // Collect the result row objects
                    var result_rows = [];
                    var len = results.rows.length;
                    for (var i = 0; i < len; i++) {
                        result_rows.push(results.rows.item(i));
                    }

                    my_callback(result_rows);
                },
                function (tx, err) {
                    console.log(err);
                    console.log("error SQL statement: ", statement);
                });
        }
    );
}

/**
 * Execute an SQL file.
 * @param filename The filename of the SQL file. Should be one file under sql folder.
 */
function execute_sql(filename) {
    var text = readTextFile('sql/' + filename);
    var statements = split_sql_to_statements(text);
    db_1.transaction(
        function (tx) {
            for (let statement of statements) {
                tx.executeSql(
                    statement,
                    [],
                    function (tx, results) {
                        console.log("success");
                    },
                    function (tx, err) {
                        console.log(err);
                        console.log("error SQL statement: ", statement);
                    });
            }
        }
    );
}

/**
 * Split the text of SQL file into a list of statements.
 * @param text The content of a SQL file
 */
function split_sql_to_statements(text) {
    var statements = text.split(';');
    var ret = [];
    for (let statement of statements) {
        statement = statement.trim();
        if (statement !== "") {
            ret.push(statement);
        }
    }
    for (let i in ret) {
        console.log(JSON.stringify(ret[i]));
    }
    return ret;
}

function sql_test() {
    db_1.transaction(function (tx) {
        tx.executeSql(
            "select * from optional_params where width = 20 limit 3 ;",
            [],
            function (tx, results) {
                console.log("chenggong");
                var len = results.rows.length, i;
                msg = "查询记录条数: " + len;
                console.log(msg);

                for (i = 0; i < len; i++) {
                    msg = "<p><b>" + results.rows.item(i) + "</b></p>";
                    t = results.rows.item(i);
                    // console.dir(t)
                    console.log(JSON.stringify(t));
                }
            }, function (tx) {
                console.log("shibai");
            });
    });
}

/**
 * Print the result of a sql query.
 * @param result_rows The result object of the query.
 */
function print_result(result_rows) {
    console.log("Print results:", result_rows.length, "rows,");
    for (let i in result_rows) {
        console.log(JSON.stringify(result_rows[i]));
    }
    console.log("End of print");
}
