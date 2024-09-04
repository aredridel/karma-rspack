const os = require('os');
const path = require('path');

const KW_Controller = require('../../../lib/karma-rspack/controller');
const DefaultRspackOptionsFactory = require('../../../lib/rspack/defaults');

const defaultRspackOptions = DefaultRspackOptionsFactory.create();

describe('KW_Controller', () => {
  const EXPECTED_DEFAULT_PATH_PREFIX = '_karma_webpack_';

  let controller;

  beforeEach(() => (controller = new KW_Controller()));

  it('initializes with a webpackOptions object', () => {
    expect(controller.webpackOptions).toBeDefined();
  });

  it('correctly sets the default output path prefix', () => {
    expect(
      controller.webpackOptions.output.path.startsWith(
        path.join(os.tmpdir(), EXPECTED_DEFAULT_PATH_PREFIX)
      )
    ).toBeTruthy();
  });

  it('correctly postfixes a random number to the end of the webpack options output path for parallel runs', () => {
    const postfix = controller.webpackOptions.output.path.split(
      EXPECTED_DEFAULT_PATH_PREFIX
    )[1];
    expect(isNaN(postfix)).toBe(false);
  });

  it('should otherwise be equal to a newly instantiated default webpack options object', () => {
    controller.webpackOptions.output.path = EXPECTED_DEFAULT_PATH_PREFIX;
    defaultRspackOptions.output.path = EXPECTED_DEFAULT_PATH_PREFIX;
    expect(controller.webpackOptions).toEqual(defaultRspackOptions);
  });

  it('can provide custom nested webpackOptions', () => {
    controller.updateRspackOptions({
      output: {
        path: 'foo',
        publicPath: 'bar',
      },
    });
    expect(controller.webpackOptions.output.path).toBe('foo');
    expect(controller.webpackOptions.output.publicPath).toBe('bar');
    expect(controller.webpackOptions.output.filename).toBe(
      defaultRspackOptions.output.filename
    );
  });
});
