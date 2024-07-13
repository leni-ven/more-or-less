## Add new datasets
First put data under Utils-master/raw_data
Copy the MoveRes.py and change all res to the newwork you want, rename and run this .py program
The file generated is "combine"
Delete all files but the "combine", make a copy of "combine", rename them to "horizontal" and "vertical"
Copy the GenRes.py and change all res to the newwork you want, rename and run this .py file to generate Json files
Copy and Paste all Json files under the WebProject-master
Change the test.dp to get the correct sql files

In the PlotResult.js, add new networks in function get_indexes() 
In the IndexDic.js, add new dict and for loop of this var 