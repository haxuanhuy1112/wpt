// META: title=test WebNN API tanh operation
// META: global=window,dedicatedworker
// META: variant=?cpu
// META: variant=?gpu
// META: variant=?npu
// META: script=../resources/utils.js
// META: timeout=long

'use strict';

// https://www.w3.org/TR/webnn/#api-mlgraphbuilder-hard-swish
// Computes the nonlinear function y = x * max(0, min(6, (x + 3))) / 6 that is
// introduced by MobileNetV3 on the input tensor element-wise.
//
// MLOperand hardSwish(MLOperand input);


const getHardSwishPrecisionTolerance = (graphResources) => {
  const toleranceValueDict = {float32: 4, float16: 4};
  const expectedDataType =
      getExpectedDataTypeOfSingleOutput(graphResources.expectedOutputs);
  return {metricType: 'ULP', value: toleranceValueDict[expectedDataType]};
};

const hardSwishTests = [
  {
    'name': 'hardSwish float32 0D tensor',
    'graph': {
      'inputs': {
        'hardSwishInput': {
          'data': [0.7341583371162415],
          'descriptor': {'dimensions': [], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'hardSwish',
        'arguments': [{'input': 'hardSwishInput'}],
        'outputs': 'hardSwishOutput'
      }],
      'expectedOutputs': {
        'hardSwishOutput': {
          'data': [0.4569105803966522],
          'descriptor': {'dimensions': [], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'hardSwish float32 1D constant tensor',
    'graph': {
      'inputs': {
        'hardSwishInput': {
          'data': [
            0.7341583371162415,  9.11885929107666,    3.545238494873047,
            2.621943950653076,   -6.445507526397705,  -1.6835596561431885,
            5.52318000793457,    -5.958856105804443,  -9.169190406799316,
            6.420943737030029,   -3.2930312156677246, 1.041016697883606,
            -7.2463226318359375, -0.9472730755805969, -5.7783522605896,
            3.1852290630340576,  -7.261817932128906,  4.174602508544922,
            3.7802627086639404,  -6.071240425109863,  -9.909919738769531,
            -7.744259357452393,  -8.286120414733887,  8.083491325378418
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'hardSwish',
        'arguments': [{'input': 'hardSwishInput'}],
        'outputs': 'hardSwishOutput'
      }],
      'expectedOutputs': {
        'hardSwishOutput': {
          'data': [
            0.4569105803966522,
            9.11885929107666,
            3.545238494873047,
            2.4567370414733887,
            0,
            -0.3693843185901642,
            5.52318000793457,
            0,
            0,
            6.420943737030029,
            0,
            0.7011276483535767,
            0,
            -0.3240821659564972,
            0,
            3.1852290630340576,
            0,
            4.174602508544922,
            3.7802627086639404,
            0,
            0,
            0,
            0,
            8.083491325378418
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'hardSwish float32 1D tensor',
    'graph': {
      'inputs': {
        'hardSwishInput': {
          'data': [
            0.7341583371162415,  9.11885929107666,    3.545238494873047,
            2.621943950653076,   -6.445507526397705,  -1.6835596561431885,
            5.52318000793457,    -5.958856105804443,  -9.169190406799316,
            6.420943737030029,   -3.2930312156677246, 1.041016697883606,
            -7.2463226318359375, -0.9472730755805969, -5.7783522605896,
            3.1852290630340576,  -7.261817932128906,  4.174602508544922,
            3.7802627086639404,  -6.071240425109863,  -9.909919738769531,
            -7.744259357452393,  -8.286120414733887,  8.083491325378418
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'hardSwish',
        'arguments': [{'input': 'hardSwishInput'}],
        'outputs': 'hardSwishOutput'
      }],
      'expectedOutputs': {
        'hardSwishOutput': {
          'data': [
            0.4569105803966522,
            9.11885929107666,
            3.545238494873047,
            2.4567370414733887,
            0,
            -0.3693843185901642,
            5.52318000793457,
            0,
            0,
            6.420943737030029,
            0,
            0.7011276483535767,
            0,
            -0.3240821659564972,
            0,
            3.1852290630340576,
            0,
            4.174602508544922,
            3.7802627086639404,
            0,
            0,
            0,
            0,
            8.083491325378418
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'hardSwish float32 2D tensor',
    'graph': {
      'inputs': {
        'hardSwishInput': {
          'data': [
            0.7341583371162415,  9.11885929107666,    3.545238494873047,
            2.621943950653076,   -6.445507526397705,  -1.6835596561431885,
            5.52318000793457,    -5.958856105804443,  -9.169190406799316,
            6.420943737030029,   -3.2930312156677246, 1.041016697883606,
            -7.2463226318359375, -0.9472730755805969, -5.7783522605896,
            3.1852290630340576,  -7.261817932128906,  4.174602508544922,
            3.7802627086639404,  -6.071240425109863,  -9.909919738769531,
            -7.744259357452393,  -8.286120414733887,  8.083491325378418
          ],
          'descriptor': {'dimensions': [4, 6], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'hardSwish',
        'arguments': [{'input': 'hardSwishInput'}],
        'outputs': 'hardSwishOutput'
      }],
      'expectedOutputs': {
        'hardSwishOutput': {
          'data': [
            0.4569105803966522,
            9.11885929107666,
            3.545238494873047,
            2.4567370414733887,
            0,
            -0.3693843185901642,
            5.52318000793457,
            0,
            0,
            6.420943737030029,
            0,
            0.7011276483535767,
            0,
            -0.3240821659564972,
            0,
            3.1852290630340576,
            0,
            4.174602508544922,
            3.7802627086639404,
            0,
            0,
            0,
            0,
            8.083491325378418
          ],
          'descriptor': {'dimensions': [4, 6], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'hardSwish float32 3D tensor',
    'graph': {
      'inputs': {
        'hardSwishInput': {
          'data': [
            0.7341583371162415,  9.11885929107666,    3.545238494873047,
            2.621943950653076,   -6.445507526397705,  -1.6835596561431885,
            5.52318000793457,    -5.958856105804443,  -9.169190406799316,
            6.420943737030029,   -3.2930312156677246, 1.041016697883606,
            -7.2463226318359375, -0.9472730755805969, -5.7783522605896,
            3.1852290630340576,  -7.261817932128906,  4.174602508544922,
            3.7802627086639404,  -6.071240425109863,  -9.909919738769531,
            -7.744259357452393,  -8.286120414733887,  8.083491325378418
          ],
          'descriptor': {'dimensions': [2, 3, 4], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'hardSwish',
        'arguments': [{'input': 'hardSwishInput'}],
        'outputs': 'hardSwishOutput'
      }],
      'expectedOutputs': {
        'hardSwishOutput': {
          'data': [
            0.4569105803966522,
            9.11885929107666,
            3.545238494873047,
            2.4567370414733887,
            0,
            -0.3693843185901642,
            5.52318000793457,
            0,
            0,
            6.420943737030029,
            0,
            0.7011276483535767,
            0,
            -0.3240821659564972,
            0,
            3.1852290630340576,
            0,
            4.174602508544922,
            3.7802627086639404,
            0,
            0,
            0,
            0,
            8.083491325378418
          ],
          'descriptor': {'dimensions': [2, 3, 4], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'hardSwish float32 4D tensor',
    'graph': {
      'inputs': {
        'hardSwishInput': {
          'data': [
            0.7341583371162415,  9.11885929107666,    3.545238494873047,
            2.621943950653076,   -6.445507526397705,  -1.6835596561431885,
            5.52318000793457,    -5.958856105804443,  -9.169190406799316,
            6.420943737030029,   -3.2930312156677246, 1.041016697883606,
            -7.2463226318359375, -0.9472730755805969, -5.7783522605896,
            3.1852290630340576,  -7.261817932128906,  4.174602508544922,
            3.7802627086639404,  -6.071240425109863,  -9.909919738769531,
            -7.744259357452393,  -8.286120414733887,  8.083491325378418
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'hardSwish',
        'arguments': [{'input': 'hardSwishInput'}],
        'outputs': 'hardSwishOutput'
      }],
      'expectedOutputs': {
        'hardSwishOutput': {
          'data': [
            0.4569105803966522,
            9.11885929107666,
            3.545238494873047,
            2.4567370414733887,
            0,
            -0.3693843185901642,
            5.52318000793457,
            0,
            0,
            6.420943737030029,
            0,
            0.7011276483535767,
            0,
            -0.3240821659564972,
            0,
            3.1852290630340576,
            0,
            4.174602508544922,
            3.7802627086639404,
            0,
            0,
            0,
            0,
            8.083491325378418
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'hardSwish float32 5D tensor',
    'graph': {
      'inputs': {
        'hardSwishInput': {
          'data': [
            0.7341583371162415,  9.11885929107666,    3.545238494873047,
            2.621943950653076,   -6.445507526397705,  -1.6835596561431885,
            5.52318000793457,    -5.958856105804443,  -9.169190406799316,
            6.420943737030029,   -3.2930312156677246, 1.041016697883606,
            -7.2463226318359375, -0.9472730755805969, -5.7783522605896,
            3.1852290630340576,  -7.261817932128906,  4.174602508544922,
            3.7802627086639404,  -6.071240425109863,  -9.909919738769531,
            -7.744259357452393,  -8.286120414733887,  8.083491325378418
          ],
          'descriptor': {'dimensions': [2, 1, 4, 1, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'hardSwish',
        'arguments': [{'input': 'hardSwishInput'}],
        'outputs': 'hardSwishOutput'
      }],
      'expectedOutputs': {
        'hardSwishOutput': {
          'data': [
            0.4569105803966522,
            9.11885929107666,
            3.545238494873047,
            2.4567370414733887,
            0,
            -0.3693843185901642,
            5.52318000793457,
            0,
            0,
            6.420943737030029,
            0,
            0.7011276483535767,
            0,
            -0.3240821659564972,
            0,
            3.1852290630340576,
            0,
            4.174602508544922,
            3.7802627086639404,
            0,
            0,
            0,
            0,
            8.083491325378418
          ],
          'descriptor': {'dimensions': [2, 1, 4, 1, 3], 'dataType': 'float32'}
        }
      }
    }
  }
];

if (navigator.ml) {
  hardSwishTests.forEach((test) => {
    webnn_conformance_test(
        buildGraphAndCompute, getHardSwishPrecisionTolerance, test);
  });
} else {
  test(() => assert_implements(navigator.ml, 'missing navigator.ml'));
}
