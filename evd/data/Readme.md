# data

Here are JSON files used to plot all the figures.

## Naming

Each folder under this path corresponds to one kind of plots. Under each of them, network type _ dataset _ ensemble type _ ensemble size

## Contents

## error_heatmap

```

```

time_heatmap



## time_per_epoch_barchart

We have a JSON file for single and ensemble results. It contains data used to plot two figures.

### Naming

network type _ dataset _ ensemble type _ ensemble size

### Content

```
{
	"x_values":[] // all possible value of x axis
    "sgl_train_time":[] // average time for training
    "sgl_data_time":[] // average time for data loading
    "esb_train_time":[[]] // A matrix. n'th line means the training time of n'th sub network
    "esb_data_time":[] // average time for data loading
}
```

## time_barchart

### Naming

### Content

```

```

## time_to_acc

### Naming

### Content

```
{
	"x_values":[]
	"total_time_sgl":[]
	"total_time_esb":[]
	"esb_win":[]
}
```

