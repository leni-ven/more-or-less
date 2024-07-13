// class which store user input
var inputObject = {
    network_archeticture: '',
    dataset: '',
    horizontal: [],// ensemble size when ensemble type is horizontal
    vertical: [],// ensemble size when ensemble type is vertical
    width: [],
    depth: [],
    sort_by: '',
    init: function () {
        this.network_archeticture = '';// single
        this.dataset = '';
        this.horizontal = [];
        this.vertical = [];// multiple
        this.width = [];
        this.depth = [];
        this.sort_by = '';
    },
    update: function (key, value) {
        switch (key) {
            case "network_archeticture":
                this.network_archeticture = value;
                break;// single
            case "dataset":
                this.dataset = value;
                break;
            case "horizontal":
                this.horizontal.push(value);
                break;// multiple
            case "vertical":
                this.vertical.push(value);
                break;
            case "width":
                this.width.push(value);
                break;
            case "depth":
                this.depth.push(value);
                break;
            case "sort_by":
                this.sort_by = value;
                break;
        }
    },
    toString: function () {
        return "network_archeticture = " + this.network_archeticture// single
            + "\ndataset = " + this.dataset
            + "\nhorizontal = " + this.horizontal.toString()// multiple
            + "\nvertical = " + this.vertical.toString()
            + "\nwidth = " + this.width.toString()
            + "\ndepth = " + this.depth.toString()
            + "\nsort_by = " + this.sort_by;
    }
};


// update inputObject based on the present page input choices of the user
function update_input_value() {
    inputObject.init();
    var eles = document.getElementsByTagName('input');

    // update every non-null input
    for (let ele of eles) {
        if (ele.name != "" && ele.value != ""){
            var key = ele.name;
            var value = ele.value;
            if (ele.type === "radio" || ele.type === "checkbox") {
                if (ele.checked) {
                    // console.log('KEY:'+ key + ' , VALUE:' + value);
                    inputObject.update(key, value);
                }
            } else {
                inputObject.update(key, value);
            }
        }

    }
}
