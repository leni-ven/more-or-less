/**
 * Define the relationship between (width, depth) and number of parameters here
 * For DenseNet
 */
var dic_DenseNet_list = [
    // width, depth, params(, index(sort by params) [the final term is added by the 4 for loops from line 52])
    [12, 40, 0.18],
    [12, 64, 0.37],
    [20, 40, 0.46],
    [12, 88, 0.62],
    [28, 40, 0.89],
    [12, 112, 0.93],
    [20, 64, 0.98],
    [36, 40, 1.45],

    [20, 88, 1.66],
    [28, 64, 1.88],
    [20, 112, 2.50],
    [48, 40, 2.54],
    [36, 64, 3.07],
    [28, 88, 3.19],
    [28, 112, 4.83],
    [36, 88, 5.23],

    [48, 64, 5.41],
    [36, 112, 7.91],
    [48, 88, 9.21],
    [48, 112, 13.96]
];

/**
 * Define the relationship between (width, depth) and number of parameters here
 * For DenseNet
 */
var dic_FC_list = [];


/**
 * Define the relationship between (width, depth) and number of parameters here
 * For DenseNet
 */
var dic_ResNet_list = [
    [16, 26],
    [16, 38],
    [16, 50],
    [16, 62],
    [24, 26],
    [24, 38],
    [24, 50],
    [24, 62],

    [32, 26],
    [32, 38],
    [32, 50],
    [32, 62],
    [48, 26],
    [48, 38],
    [48, 50],
    [48, 62]

];

var dic_wrn_list = [
    [4, 28],
    [4, 52],
    [4, 58],
    [8, 28],
    [8, 52],
    [8, 58],
    [12, 28],
    [12, 52],
    [12, 58]
];


/**
 * Define the relationship between (width, depth) and number of parameters here
 * For DenseNet
 */
var dic_VGG_list = [
    [128, 32],
    [128, 40],
    [128, 48],
    [128, 64],
    [64, 32],
    [64, 40],
    [64, 48],
    [64, 64],

    [32, 32],
    [32, 40],
    [32, 48],
    [32, 64],
    [96, 32],
    [96, 40],
    [96, 48],
    [96, 64]

];


for (let i in dic_DenseNet_list) {
    dic_DenseNet_list[i].push(i);
}
for (let i in dic_FC_list) {
    dic_FC_list[i].push(i);
}
for (let i in dic_ResNet_list) {
    dic_ResNet_list[i].push(i);
}
for (let i in dic_VGG_list) {
    dic_VGG_list[i].push(i);
}
for (let i in dic_wrn_list) {
    dic_wrn_list[i].push(i);
}

/**
 * Compare function for width
 */
function cmp_width(a, b) {
    return a[0] - b[0];
}

/**
 * Compare function for width
 */
function cmp_depth(a, b) {
    return a[1] - b[1];
}

/**
 * Compare function for width
 */
function cmp_param(a, b) {
    return a[2] - b[2];
}

/**
 * Color map for plots which have ensemble size = 4
 */
var color_dic_esb_4 = [
    '#006d2c',
    '#31a354',
    '#74c476',
    '#bae4b3',
    '#edf8e9',
];

/**
 * Color map for plots which have ensemble size = 6
 */
var color_dic_esb_6 = [
    '#005a32',

    '#238b45',
    '#41ab5d',
    '#74c476',
    '#a1d99b',

    '#c7e9c0',
    '#edf8e9',
];

/**
 * Color map for plots which have ensemble size = 8
 */
var color_dic_esb_8 = [
    '#00441b',

    '#006d2c',
    '#238b45',
    '#41ab5d',
    '#74c476',

    '#a1d99b',
    '#c7e9c0',
    '#e5f5e0',
    '#f7fcf5',
];
