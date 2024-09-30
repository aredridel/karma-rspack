const fs = require('fs');
const path = require('path');

const KR_Framework = require('../../../lib/karma-rspack/framework');

jest.mock('fs');

describe('KR_Framework', () => {
  test('Defaults', () => {
    const controller = { outputPath: 'foo/' };
    const config = { files: [], __karmaRspackController: controller };
    fs.closeSync = jest.fn();
    fs.openSync = jest.fn();

    KR_Framework(config);

    expect(fs.openSync).toBeCalledWith(path.join('foo', 'commons.js'), 'w');
    expect(fs.openSync).toBeCalledWith(path.join('foo', 'runtime.js'), 'w');

    expect(config.files.length).toBe(2);
    expect(config.files).toEqual([
      {
        pattern: path.join('foo', 'runtime.js'),
        included: true,
        served: true,
        watched: false,
      },
      {
        pattern: path.join('foo', 'commons.js'),
        included: true,
        served: true,
        watched: false,
      },
    ]);
  });
});
