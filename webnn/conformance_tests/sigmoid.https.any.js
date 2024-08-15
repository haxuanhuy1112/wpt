// META: title=test WebNN API sigmoid operation
// META: global=window,dedicatedworker
// META: variant=?cpu
// META: variant=?gpu
// META: variant=?npu
// META: script=../resources/utils.js
// META: timeout=long

'use strict';

// https://www.w3.org/TR/webnn/#api-mlgraphbuilder-sigmoid-method
// Compute the sigmoid function of the input tensor. The calculation follows the
// expression 1 / (exp(-x) + 1).
//
// MLOperand sigmoid(MLOperand input);


const getSigmoidPrecisionTolerance = (graphResources) => {
  // float32 (leaving a few ULP for roundoff)
  const toleranceValueDict = {float32: 32 + 2, float16: 3};
  const expectedDataType =
      getExpectedDataTypeOfSingleOutput(graphResources.expectedOutputs);
  return {metricType: 'ULP', value: toleranceValueDict[expectedDataType]};
};

const sigmoidTests = [
  {
    'name': 'sigmoid float32 1D constant tensor',
    'graph': {
      'inputs': {
        'sigmoidInput': {
          'data': [
            -0.37699514627456665, -0.6848450899124146, -5.988872051239014,
            4.431885719299316,    -0.93868488073349,   4.591195583343506,
            -2.5067026615142822,  1.5669522285461426,  -2.596473217010498,
            -3.64729380607605,    2.6785237789154053,  -3.1051602363586426,
            2.2585017681121826,   -0.2865157723426819, 4.64043664932251,
            1.0606156587600708,   -3.536252498626709,  0.4410440921783447,
            4.791460037231445,    2.0745489597320557,  0.8354471325874329,
            -5.433595657348633,   -4.184835910797119,  -2.484982490539551
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'sigmoid',
        'arguments': [{'input': 'sigmoidInput'}],
        'outputs': 'sigmoidOutput'
      }],
      'expectedOutputs': {
        'sigmoidOutput': {
          'data': [
            0.4068518280982971,   0.33518078923225403,  0.0025002227630466223,
            0.9882476925849915,   0.28116607666015625,  0.9899610877037048,
            0.07538963109254837,  0.8273487091064453,   0.0693657398223877,
            0.02539960853755474,  0.9357474446296692,   0.04289489984512329,
            0.9053813815116882,   0.42885708808898926,  0.9904388189315796,
            0.7428081631660461,   0.0282981526106596,   0.6085078120231628,
            0.9917680025100708,   0.8884047269821167,   0.6975054740905762,
            0.004348373040556908, 0.014996387995779514, 0.07691769301891327
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'sigmoid float32 0D tensor',
    'graph': {
      'inputs': {
        'sigmoidInput': {
          'data': [-0.37699514627456665],
          'descriptor': {'dimensions': [], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'sigmoid',
        'arguments': [{'input': 'sigmoidInput'}],
        'outputs': 'sigmoidOutput'
      }],
      'expectedOutputs': {
        'sigmoidOutput': {
          'data': [0.4068518280982971],
          'descriptor': {'dimensions': [], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'sigmoid float32 1D tensor',
    'graph': {
      'inputs': {
        'sigmoidInput': {
          'data': [
            -0.37699514627456665, -0.6848450899124146, -5.988872051239014,
            4.431885719299316,    -0.93868488073349,   4.591195583343506,
            -2.5067026615142822,  1.5669522285461426,  -2.596473217010498,
            -3.64729380607605,    2.6785237789154053,  -3.1051602363586426,
            2.2585017681121826,   -0.2865157723426819, 4.64043664932251,
            1.0606156587600708,   -3.536252498626709,  0.4410440921783447,
            4.791460037231445,    2.0745489597320557,  0.8354471325874329,
            -5.433595657348633,   -4.184835910797119,  -2.484982490539551
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'sigmoid',
        'arguments': [{'input': 'sigmoidInput'}],
        'outputs': 'sigmoidOutput'
      }],
      'expectedOutputs': {
        'sigmoidOutput': {
          'data': [
            0.4068518280982971,   0.33518078923225403,  0.0025002227630466223,
            0.9882476925849915,   0.28116607666015625,  0.9899610877037048,
            0.07538963109254837,  0.8273487091064453,   0.0693657398223877,
            0.02539960853755474,  0.9357474446296692,   0.04289489984512329,
            0.9053813815116882,   0.42885708808898926,  0.9904388189315796,
            0.7428081631660461,   0.0282981526106596,   0.6085078120231628,
            0.9917680025100708,   0.8884047269821167,   0.6975054740905762,
            0.004348373040556908, 0.014996387995779514, 0.07691769301891327
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'sigmoid float32 2D tensor',
    'graph': {
      'inputs': {
        'sigmoidInput': {
          'data': [
            -0.37699514627456665, -0.6848450899124146, -5.988872051239014,
            4.431885719299316,    -0.93868488073349,   4.591195583343506,
            -2.5067026615142822,  1.5669522285461426,  -2.596473217010498,
            -3.64729380607605,    2.6785237789154053,  -3.1051602363586426,
            2.2585017681121826,   -0.2865157723426819, 4.64043664932251,
            1.0606156587600708,   -3.536252498626709,  0.4410440921783447,
            4.791460037231445,    2.0745489597320557,  0.8354471325874329,
            -5.433595657348633,   -4.184835910797119,  -2.484982490539551
          ],
          'descriptor': {'dimensions': [4, 6], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'sigmoid',
        'arguments': [{'input': 'sigmoidInput'}],
        'outputs': 'sigmoidOutput'
      }],
      'expectedOutputs': {
        'sigmoidOutput': {
          'data': [
            0.4068518280982971,   0.33518078923225403,  0.0025002227630466223,
            0.9882476925849915,   0.28116607666015625,  0.9899610877037048,
            0.07538963109254837,  0.8273487091064453,   0.0693657398223877,
            0.02539960853755474,  0.9357474446296692,   0.04289489984512329,
            0.9053813815116882,   0.42885708808898926,  0.9904388189315796,
            0.7428081631660461,   0.0282981526106596,   0.6085078120231628,
            0.9917680025100708,   0.8884047269821167,   0.6975054740905762,
            0.004348373040556908, 0.014996387995779514, 0.07691769301891327
          ],
          'descriptor': {'dimensions': [4, 6], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'sigmoid float32 3D tensor',
    'graph': {
      'inputs': {
        'sigmoidInput': {
          'data': [
            -0.37699514627456665, -0.6848450899124146, -5.988872051239014,
            4.431885719299316,    -0.93868488073349,   4.591195583343506,
            -2.5067026615142822,  1.5669522285461426,  -2.596473217010498,
            -3.64729380607605,    2.6785237789154053,  -3.1051602363586426,
            2.2585017681121826,   -0.2865157723426819, 4.64043664932251,
            1.0606156587600708,   -3.536252498626709,  0.4410440921783447,
            4.791460037231445,    2.0745489597320557,  0.8354471325874329,
            -5.433595657348633,   -4.184835910797119,  -2.484982490539551
          ],
          'descriptor': {'dimensions': [2, 3, 4], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'sigmoid',
        'arguments': [{'input': 'sigmoidInput'}],
        'outputs': 'sigmoidOutput'
      }],
      'expectedOutputs': {
        'sigmoidOutput': {
          'data': [
            0.4068518280982971,   0.33518078923225403,  0.0025002227630466223,
            0.9882476925849915,   0.28116607666015625,  0.9899610877037048,
            0.07538963109254837,  0.8273487091064453,   0.0693657398223877,
            0.02539960853755474,  0.9357474446296692,   0.04289489984512329,
            0.9053813815116882,   0.42885708808898926,  0.9904388189315796,
            0.7428081631660461,   0.0282981526106596,   0.6085078120231628,
            0.9917680025100708,   0.8884047269821167,   0.6975054740905762,
            0.004348373040556908, 0.014996387995779514, 0.07691769301891327
          ],
          'descriptor': {'dimensions': [2, 3, 4], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'sigmoid float32 4D tensor',
    'graph': {
      'inputs': {
        'sigmoidInput': {
          'data': [
            -0.37699514627456665, -0.6848450899124146, -5.988872051239014,
            4.431885719299316,    -0.93868488073349,   4.591195583343506,
            -2.5067026615142822,  1.5669522285461426,  -2.596473217010498,
            -3.64729380607605,    2.6785237789154053,  -3.1051602363586426,
            2.2585017681121826,   -0.2865157723426819, 4.64043664932251,
            1.0606156587600708,   -3.536252498626709,  0.4410440921783447,
            4.791460037231445,    2.0745489597320557,  0.8354471325874329,
            -5.433595657348633,   -4.184835910797119,  -2.484982490539551
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'sigmoid',
        'arguments': [{'input': 'sigmoidInput'}],
        'outputs': 'sigmoidOutput'
      }],
      'expectedOutputs': {
        'sigmoidOutput': {
          'data': [
            0.4068518280982971,   0.33518078923225403,  0.0025002227630466223,
            0.9882476925849915,   0.28116607666015625,  0.9899610877037048,
            0.07538963109254837,  0.8273487091064453,   0.0693657398223877,
            0.02539960853755474,  0.9357474446296692,   0.04289489984512329,
            0.9053813815116882,   0.42885708808898926,  0.9904388189315796,
            0.7428081631660461,   0.0282981526106596,   0.6085078120231628,
            0.9917680025100708,   0.8884047269821167,   0.6975054740905762,
            0.004348373040556908, 0.014996387995779514, 0.07691769301891327
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'sigmoid float32 5D tensor',
    'graph': {
      'inputs': {
        'sigmoidInput': {
          'data': [
            -0.37699514627456665, -0.6848450899124146, -5.988872051239014,
            4.431885719299316,    -0.93868488073349,   4.591195583343506,
            -2.5067026615142822,  1.5669522285461426,  -2.596473217010498,
            -3.64729380607605,    2.6785237789154053,  -3.1051602363586426,
            2.2585017681121826,   -0.2865157723426819, 4.64043664932251,
            1.0606156587600708,   -3.536252498626709,  0.4410440921783447,
            4.791460037231445,    2.0745489597320557,  0.8354471325874329,
            -5.433595657348633,   -4.184835910797119,  -2.484982490539551
          ],
          'descriptor': {'dimensions': [2, 1, 4, 1, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'sigmoid',
        'arguments': [{'input': 'sigmoidInput'}],
        'outputs': 'sigmoidOutput'
      }],
      'expectedOutputs': {
        'sigmoidOutput': {
          'data': [
            0.4068518280982971,   0.33518078923225403,  0.0025002227630466223,
            0.9882476925849915,   0.28116607666015625,  0.9899610877037048,
            0.07538963109254837,  0.8273487091064453,   0.0693657398223877,
            0.02539960853755474,  0.9357474446296692,   0.04289489984512329,
            0.9053813815116882,   0.42885708808898926,  0.9904388189315796,
            0.7428081631660461,   0.0282981526106596,   0.6085078120231628,
            0.9917680025100708,   0.8884047269821167,   0.6975054740905762,
            0.004348373040556908, 0.014996387995779514, 0.07691769301891327
          ],
          'descriptor': {'dimensions': [2, 1, 4, 1, 3], 'dataType': 'float32'}
        }
      }
    }
  }
];

if (navigator.ml) {
  sigmoidTests.forEach((test) => {
    webnn_conformance_test(
        buildGraphAndCompute, getSigmoidPrecisionTolerance, test);
  });
} else {
  test(() => assert_implements(navigator.ml, 'missing navigator.ml'));
}
