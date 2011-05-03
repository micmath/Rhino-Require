// USAGE: java -classpath ~/Scripts/js.jar org.mozilla.javascript.tools.shell.Main test.js

load('test/lib/nodeunit.js');
load('test/lib/jsmock.js');

load('src/require.js');

var test = {
    'Basic tests.': {
        'The require function should be defined.': function(t) {
            t.expect(1);
            t.equal( typeof require, 'function' );
            t.done();
        }
    },
    'The require.resolve function.': {
        'The require.resolve function should be defined.': function(t) {
            t.expect(1);
            t.equal( typeof require.resolve, 'function' );
            t.done();
        },
        'When an id starts with "./" it should resolve relative to the current working directory.': function(t) {
            t.expect(1);
            t.equal(require.resolve('./test/mock/foo'), './test/mock/foo.js');
            t.done();
        },
        'When an id starts with "./" it should resolve relative to the current running module.': function(t) {
            t.expect(1);
            require.root.unshift('./test/mock/bar.js');
            t.equal(require.resolve('./foo'), './test/mock/foo.js');
            require.root.shift();
            t.done();
        }
    },
    'Loading from package.json.': {
        'The require.resolve function should use the "main" property from package.json.': function(t) {
            t.expect(1);
            t.equal(require.resolve('./test/mock/bar'), './test/mock/bar/myModuleLib/bar.js');
            t.done();
        }
    },
    'Loading from index file.': {
        'The require.resolve function should use the "index.js" file.': function(t) {
            t.expect(1);
            t.equal(require.resolve('./test/mock/zop'), './test/mock/zop/index.js');
            t.done();
        }
    },
    'Loading from require.paths.': {
        'The require.resolve function should use the require.paths values.': function(t) {
            t.expect(1);
            require.paths.push('./test/mock');
            t.equal(require.resolve('foo'), './test/mock/foo.js');
            require.paths.pop();
            
            t.done();
        }
    },
    'Loading from node_modules.': {
        'The require.resolve function should use the node_modules dir.': function(t) {
            t.expect(1);
            t.equal(require.resolve('foobar'), './node_modules/foobar.js');
            t.done();
        },
        'The require.resolve function should look for index in node_modules dir.': function(t) {
            t.expect(1);
            t.equal(require.resolve('baz'), './node_modules/baz/index.js');
            t.done();
        }
    }
};
    
nodeunit.run(test);