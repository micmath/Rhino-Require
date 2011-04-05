/*
    Rhino-Require is Public Domain
    <http://en.wikipedia.org/wiki/Public_Domain>
    
    The author or authors of this code dedicate any and all copyright interest
    in this code to the public domain. We make this dedication for the benefit
    of the public at large and to the detriment of our heirs and successors. We
    intend this dedication to be an overt act of relinquishment in perpetuity of
    all present and future rights to this code under copyright law.
 */

function require(id) {
    var moduleContent = '',
        moduleUri;
    
    for (var i = 0, len = require.paths.length; i < len; i++) {
        moduleUri = require.paths[i] + '/' + id + '.js';
        moduleContent = '';
        
        var file = new java.io.File(moduleUri);
        if ( file.exists() && file.canRead() && !file.isDirectory() ) {
            try {    
                var scanner = new java.util.Scanner(file).useDelimiter("\\Z");
                moduleContent = String( scanner.next() );
            }
            catch(ignored) { }
            
            if (moduleContent) { break; }
        }
    }
    
    if (moduleContent) {
            try {
                var f = new Function('require', 'exports', 'module', moduleContent),
                exports = require.cache[moduleUri] || {},
                module = { id: id, uri: moduleUri };
    
            
                f.call({}, require, exports, module);
            }
            catch(e) {
                throw 'Unable to require source code from "' + moduleUri + '": ' + e.toSource();
            }
            
            exports = module.exports || exports;
            require.cache[id] = exports;
    }
    else {
        throw 'The requested module cannot be returned: no content for id: "' + id + '" in paths: ' + require.paths.join(', ');
    }
    
    return exports;
}
require.root = './';
require.paths = [ require.root + 'modules', require.root + 'modules/common' ];
require.cache = {}; // cache module exports. Like: {id: exported}
