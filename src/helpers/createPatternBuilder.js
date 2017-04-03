import extend from './extend.js';

export default function createPatternBuilder(getPattern) {
  return function(options = {}) {
    options = extend({
      constructor: () => {},
      publics: {},
      statics: {}
    }, options);

    var __class = getPattern(options);
    __class.prototype = extend(
      Object.create(options.constructor.prototype),
      { constructor: options.constructor },
      __class.prototype,
      options.publics
    );

    return {
      constructor: __class,
      publics: __class.prototype,
      statics: options.statics,
      build() {
        return extend(__class, options.statics);
      }
    };

  };
}