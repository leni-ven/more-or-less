DROP TABLE IF EXISTS param_width_depth;
CREATE TABLE param_width_depth (id INTEGER PRIMARY KEY NOT NULL UNIQUE, net_arch TEXT, dataset TEXT, width TEXT, depth TEXT);
INSERT INTO param_width_depth (id, net_arch, dataset, width, depth) VALUES (1, 'DenseNet', 'CIFAR-10', '[12,20,28,36,48]', '[40,64,88,112]');
INSERT INTO param_width_depth (id, net_arch, dataset, width, depth) VALUES (2, 'DenseNet', 'CIFAR-100', '[12,20,28,36,48]', '[40,64,88,112]');
INSERT INTO param_width_depth (id, net_arch, dataset, width, depth) VALUES (3, 'resnet', 'cifar10', '[16,24,32,48]', '[26,38,50,62]');
INSERT INTO param_width_depth (id, net_arch, dataset, width, depth) VALUES (4, 'resnet', 'cifar10', '[16,24,32,48]', '[26,38,50,62]');
INSERT INTO param_width_depth (id, net_arch, dataset, width, depth) VALUES (5, 'wrn', 'cifar10', '[4,8,12]', '[28,52,58]');
INSERT INTO param_width_depth (id, net_arch, dataset, width, depth) VALUES (6, 'vgg', 'cifar10', '[32,64,96,128]', '[32,40,48,64]');
