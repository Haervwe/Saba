import * as tf from '@tensorflow/tfjs';



//const startingBoard = tf.tensor2d([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[12,12]);
let input = tf.layers.dense({units: 144, inputShape: [2]})
let layer1 = tf.layers.conv2d(activation ("relu"),batchNorm3d,use_bias=false,padding("same"));
let layer2 = tf.layers.conv2d(activation ("relu"),batchNorm3d,use_bias=false,padding("same"));
let layer3 = tf.layers.conv2d(activation ("relu"),batchNorm3d,use_bias=false,padding("valid"));
let layer4 = tf.layers.conv2d(activation ("relu"),batchNorm3d,use_bias=false,padding("valid"));
let layerFlat = tf.layers.flatten()
let dropout1 = tf.layers.dropout(activation ("relu"),batchNorm,dense(1024,use_bias=false));
let dropout2 = tf.layers.dropout(activation ("relu"),batchNorm,dense(512,use_bias=false));
let pi = tf.layers.dense();
let vi = tf.layers.dense();


const model = tf.sequential();
model.add(input);
model.add(layer1);
model.add(layer2);
model.add(layer3);
model.add(layer4);
model.add(layerFlat);
model.add(dropout1);
model.add(dropout2);
model.add(pi);
model.add(vi);
model.compile(loss=['categorical_crossentropy','mean_squared_error'], optimizer=ft.train.adam(0.05))
