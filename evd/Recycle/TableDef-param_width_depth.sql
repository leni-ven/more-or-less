DROP TABLE IF EXISTS param_width_depth;
CREATE TABLE param_width_depth (id INTEGER PRIMARY KEY NOT NULL UNIQUE, net_arch TEXT, dataset TEXT, width TEXT, depth TEXT);
INSERT INTO param_width_depth (id, net_arch, dataset, width, depth) VALUES (1, 'DenseNet', 'CIFAR-10', '[12,20,28,36,48]', '[40,64,88,112]');
INSERT INTO param_width_depth (id, net_arch, dataset, width, depth) VALUES (2, 'DenseNet', 'CIFAR-100', '[12,20,28,36,48]', '[40,64,88,112]');

