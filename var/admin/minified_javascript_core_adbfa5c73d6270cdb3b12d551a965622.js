(function (root, factory) {
    var routing = factory();
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], routing.Routing);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = routing.Routing;
    } else {
        // Browser globals (root is window)
        root.Routing = routing.Routing;
        root.fos = {
            Router: routing.Router
        };
    }
}(this, function () {
    var exports = {};
    "use strict";
exports.__esModule = true;
exports.Routing = exports.Router = void 0;
var Router = /** @class */ (function () {
    function Router(context, routes) {
        this.context_ = context || { base_url: '', prefix: '', host: '', port: '', scheme: '', locale: '' };
        this.setRoutes(routes || {});
    }
    Router.getInstance = function () {
        return exports.Routing;
    };
    Router.setData = function (data) {
        var router = Router.getInstance();
        router.setRoutingData(data);
    };
    Router.prototype.setRoutingData = function (data) {
        this.setBaseUrl(data['base_url']);
        this.setRoutes(data['routes']);
        if (typeof data.prefix !== 'undefined') {
            this.setPrefix(data['prefix']);
        }
        if (typeof data.port !== 'undefined') {
            this.setPort(data['port']);
        }
        if (typeof data.locale !== 'undefined') {
            this.setLocale(data['locale']);
        }
        this.setHost(data['host']);
        if (typeof data.scheme !== 'undefined') {
            this.setScheme(data['scheme']);
        }
    };
    Router.prototype.setRoutes = function (routes) {
        this.routes_ = Object.freeze(routes);
    };
    Router.prototype.getRoutes = function () {
        return this.routes_;
    };
    Router.prototype.setBaseUrl = function (baseUrl) {
        this.context_.base_url = baseUrl;
    };
    Router.prototype.getBaseUrl = function () {
        return this.context_.base_url;
    };
    Router.prototype.setPrefix = function (prefix) {
        this.context_.prefix = prefix;
    };
    Router.prototype.setScheme = function (scheme) {
        this.context_.scheme = scheme;
    };
    Router.prototype.getScheme = function () {
        return this.context_.scheme;
    };
    Router.prototype.setHost = function (host) {
        this.context_.host = host;
    };
    Router.prototype.getHost = function () {
        return this.context_.host;
    };
    Router.prototype.setPort = function (port) {
        this.context_.port = port;
    };
    Router.prototype.getPort = function () {
        return this.context_.port;
    };
    ;
    Router.prototype.setLocale = function (locale) {
        this.context_.locale = locale;
    };
    Router.prototype.getLocale = function () {
        return this.context_.locale;
    };
    ;
    /**
     * Builds query string params added to a URL.
     * Port of jQuery's $.param() function, so credit is due there.
     */
    Router.prototype.buildQueryParams = function (prefix, params, add) {
        var _this = this;
        var name;
        var rbracket = new RegExp(/\[\]$/);
        if (params instanceof Array) {
            params.forEach(function (val, i) {
                if (rbracket.test(prefix)) {
                    add(prefix, val);
                }
                else {
                    _this.buildQueryParams(prefix + '[' + (typeof val === 'object' ? i : '') + ']', val, add);
                }
            });
        }
        else if (typeof params === 'object') {
            for (name in params) {
                this.buildQueryParams(prefix + '[' + name + ']', params[name], add);
            }
        }
        else {
            add(prefix, params);
        }
    };
    /**
     * Returns a raw route object.
     */
    Router.prototype.getRoute = function (name) {
        var prefixedName = this.context_.prefix + name;
        var sf41i18nName = name + '.' + this.context_.locale;
        var prefixedSf41i18nName = this.context_.prefix + name + '.' + this.context_.locale;
        var variants = [prefixedName, sf41i18nName, prefixedSf41i18nName, name];
        for (var i in variants) {
            if (variants[i] in this.routes_) {
                return this.routes_[variants[i]];
            }
        }
        throw new Error('The route "' + name + '" does not exist.');
    };
    /**
     * Generates the URL for a route.
     */
    Router.prototype.generate = function (name, opt_params, absolute) {
        var route = (this.getRoute(name));
        var params = opt_params || {};
        var unusedParams = Object.assign({}, params);
        var url = '';
        var optional = true;
        var host = '';
        var port = (typeof this.getPort() == 'undefined' || this.getPort() === null) ? '' : this.getPort();
        route.tokens.forEach(function (token) {
            if ('text' === token[0] && typeof token[1] === 'string') {
                url = Router.encodePathComponent(token[1]) + url;
                optional = false;
                return;
            }
            if ('variable' === token[0]) {
                if (token.length === 6 && token[5] === true) { // Sixth part of the token array indicates if it should be included in case of defaults
                    optional = false;
                }
                var hasDefault = route.defaults && !Array.isArray(route.defaults) && typeof token[3] === 'string' && (token[3] in route.defaults);
                if (false === optional || !hasDefault || ((typeof token[3] === 'string' && token[3] in params) && !Array.isArray(route.defaults) && params[token[3]] != route.defaults[token[3]])) {
                    var value = void 0;
                    if (typeof token[3] === 'string' && token[3] in params) {
                        value = params[token[3]];
                        delete unusedParams[token[3]];
                    }
                    else if (typeof token[3] === 'string' && hasDefault && !Array.isArray(route.defaults)) {
                        value = route.defaults[token[3]];
                    }
                    else if (optional) {
                        return;
                    }
                    else {
                        throw new Error('The route "' + name + '" requires the parameter "' + token[3] + '".');
                    }
                    var empty = true === value || false === value || '' === value;
                    if (!empty || !optional) {
                        var encodedValue = Router.encodePathComponent(value);
                        if ('null' === encodedValue && null === value) {
                            encodedValue = '';
                        }
                        url = token[1] + encodedValue + url;
                    }
                    optional = false;
                }
                else if (hasDefault && (typeof token[3] === 'string' && token[3] in unusedParams)) {
                    delete unusedParams[token[3]];
                }
                return;
            }
            throw new Error('The token type "' + token[0] + '" is not supported.');
        });
        if (url === '') {
            url = '/';
        }
        route.hosttokens.forEach(function (token) {
            var value;
            if ('text' === token[0]) {
                host = token[1] + host;
                return;
            }
            if ('variable' === token[0]) {
                if (token[3] in params) {
                    value = params[token[3]];
                    delete unusedParams[token[3]];
                }
                else if (route.defaults && !Array.isArray(route.defaults) && (token[3] in route.defaults)) {
                    value = route.defaults[token[3]];
                }
                host = token[1] + value + host;
            }
        });
        url = this.context_.base_url + url;
        if (route.requirements && ('_scheme' in route.requirements) && this.getScheme() != route.requirements['_scheme']) {
            var currentHost = host || this.getHost();
            url = route.requirements['_scheme'] + '://' + currentHost + (currentHost.indexOf(':' + port) > -1 || '' === port ? '' : ':' + port) + url;
        }
        else if ('undefined' !== typeof route.schemes && 'undefined' !== typeof route.schemes[0] && this.getScheme() !== route.schemes[0]) {
            var currentHost = host || this.getHost();
            url = route.schemes[0] + '://' + currentHost + (currentHost.indexOf(':' + port) > -1 || '' === port ? '' : ':' + port) + url;
        }
        else if (host && this.getHost() !== host + (host.indexOf(':' + port) > -1 || '' === port ? '' : ':' + port)) {
            url = this.getScheme() + '://' + host + (host.indexOf(':' + port) > -1 || '' === port ? '' : ':' + port) + url;
        }
        else if (absolute === true) {
            url = this.getScheme() + '://' + this.getHost() + (this.getHost().indexOf(':' + port) > -1 || '' === port ? '' : ':' + port) + url;
        }
        if (Object.keys(unusedParams).length > 0) {
            var queryParams_1 = [];
            var add = function (key, value) {
                // if value is a function then call it and assign it's return value as value
                value = (typeof value === 'function') ? value() : value;
                // change null to empty string
                value = (value === null) ? '' : value;
                queryParams_1.push(Router.encodeQueryComponent(key) + '=' + Router.encodeQueryComponent(value));
            };
            for (var prefix in unusedParams) {
                if (unusedParams.hasOwnProperty(prefix)) {
                    this.buildQueryParams(prefix, unusedParams[prefix], add);
                }
            }
            url = url + '?' + queryParams_1.join('&');
        }
        return url;
    };
    /**
     * Returns the given string encoded to mimic Symfony URL generator.
     */
    Router.customEncodeURIComponent = function (value) {
        return encodeURIComponent(value)
            .replace(/%2F/g, '/')
            .replace(/%40/g, '@')
            .replace(/%3A/g, ':')
            .replace(/%21/g, '!')
            .replace(/%3B/g, ';')
            .replace(/%2C/g, ',')
            .replace(/%2A/g, '*')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/'/g, '%27');
    };
    /**
     * Returns the given path properly encoded to mimic Symfony URL generator.
     */
    Router.encodePathComponent = function (value) {
        return Router.customEncodeURIComponent(value)
            .replace(/%3D/g, '=')
            .replace(/%2B/g, '+')
            .replace(/%21/g, '!')
            .replace(/%7C/g, '|');
    };
    /**
     * Returns the given query parameter or value properly encoded to mimic Symfony URL generator.
     */
    Router.encodeQueryComponent = function (value) {
        return Router.customEncodeURIComponent(value)
            .replace(/%3F/g, '?');
    };
    return Router;
}());
exports.Router = Router;
exports.Routing = new Router();
exports["default"] = exports.Routing;


    return { Router: exports.Router, Routing: exports.Routing };
}));


/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */
function t(key, defaultValue, placeholders) {
    if (!key) {
        return "";
    }

    var alreadyTranslated = pimcore.globalmanager.get("translations_admin_translated_values");
    if(!alreadyTranslated) {
        alreadyTranslated = [];
        pimcore.globalmanager.add("translations_admin_translated_values", []);
    }

    // make sure 'key' is a string
    key = String(key);

    // remove plus at the start and the end to avoid double translations
    key = key.replace(/^[\+]+(.*)[\+]+$/, function(match, $1, offset, original) {
        return $1;
    });

    var originalKey = key;
    // the maximum length of a translation key are 190 characters
    if (key.length > 190) {
        if (!defaultValue) {
            return key;
        }

        return defaultValue;
    }

    if (pimcore && pimcore.system_i18n && (pimcore.system_i18n[key] || pimcore.system_i18n[originalKey])) {
        var trans = pimcore.system_i18n[originalKey] ? pimcore.system_i18n[originalKey] : pimcore.system_i18n[key];

        // find and replace placeholders, if provided
        if (placeholders) {
            let pKeys = Object.keys(placeholders);

            for (let i = 0; i < pKeys.length; i++) {
                let regExp = new RegExp('\{(' + pKeys[i] + ')\}', 'gi');
                let replace = placeholders[pKeys[i]];

                if (trans.match(regExp)) {
                    trans = trans.replace(regExp, replace);
                }
            }
        }

        pimcore.globalmanager.get("translations_admin_translated_values").push(trans);
        return trans;
    }

    var transKeys = pimcore && pimcore.system_i18n ? Object.keys(pimcore.system_i18n) : {};
    if(pimcore && pimcore.system_i18n && transKeys.indexOf(key) === -1 && transKeys.indexOf(originalKey) === -1){
        if(!defaultValue && !in_array(key, alreadyTranslated)) {
            if(pimcore.globalmanager.exists("translations_admin_missing")) {
                if (!in_array(key, pimcore.globalmanager.get("translations_admin_added")) &&
                    !in_array(key, pimcore.globalmanager.get("translations_admin_missing"))) {
                    pimcore.globalmanager.get("translations_admin_missing").push(key);
                }
            }
        }
    }

    if(parent.pimcore && parent.pimcore.settings.debug_admin_translations){ // use parent here, because it's also used in the editmode iframe
        return "+" + key + "+";
    }  else if (defaultValue) {
        return defaultValue;
    } else {
        return originalKey;
    }
}

Math.sec = function(x) {
    return 1 / Math.cos(x);
};



function RealTypeOf(v) {
  if (typeof(v) == "object") {
    if (v === null) {
        return "null";
    }
    if (v.constructor == (new Array).constructor) {
        return "array";
    }
    if (v.constructor == (new Date).constructor) {
        return "date";
    }
    if (v.constructor == (new RegExp).constructor) {
        return "regex";
    }
    return "object";
  }
  return typeof(v);
}



function FormatJSON(oData, sIndent) {
    if (arguments.length < 2) {
        var sIndent = "";
    }
    var sIndentStyle = "    ";
    var sDataType = RealTypeOf(oData);

    // open object
    if (sDataType == "array") {
        if (oData.length == 0) {
            return "[]";
        }
        var sHTML = "[";
    } else {
        var iCount = 0;
        for (let key in oData) {
            if (oData.hasOwnProperty(key)) {
                iCount++;
            }
        }
        if (iCount == 0) { // object is empty
            return "{}";
        }
        var sHTML = "{";
    }

    // loop through items
    var iCount = 0;
    var vValue = null;
    for (let sKey in oData) {
        vValue = oData[sKey];
        if (iCount > 0) {
            sHTML += ",";
        }
        if (sDataType == "array") {
            sHTML += ("\n" + sIndent + sIndentStyle);
        } else {
            sHTML += ("\n" + sIndent + sIndentStyle + "\"" + sKey + "\"" + ": ");
        }

        // display relevant data type
        switch (RealTypeOf(vValue)) {
            case "array":
            case "object":
                sHTML += FormatJSON(vValue, (sIndent + sIndentStyle));
                break;
            case "boolean":
            case "number":
                sHTML += vValue.toString();
                break;
            case "null":
                sHTML += "null";
                break;
            case "string":
                sHTML += ("\"" + vValue + "\"");
                break;
            default:
                sHTML += ("TYPEOF: " + typeof(vValue));
        }

        // loop
        iCount++;
    }

    // close object
    if (sDataType == "array") {
        sHTML += ("\n" + sIndent + "]");
    } else {
        sHTML += ("\n" + sIndent + "}");
    }

    // return
    return sHTML;
}


function in_arrayi(needle, haystack) {
    return in_array(needle.toLocaleLowerCase(), array_map(strtolower, haystack));
}


function strtolower (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Onno Marsman
    // *     example 1: strtolower('Kevin van Zonneveld');
    // *     returns 1: 'kevin van zonneveld'
    return (str + '').toLowerCase();
}


function array_map (callback) {
    // http://kevin.vanzonneveld.net
    // +   original by: Andrea Giammarchi (http://webreflection.blogspot.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Takes a function as an argument, not a function's name
    // %        note 2: If the callback is a string, it can only work if the function name is in the global context
    // *     example 1: array_map( function (a){return (a * a * a)}, [1, 2, 3, 4, 5] );
    // *     returns 1: [ 1, 8, 27, 64, 125 ]
    var argc = arguments.length,
        argv = arguments;
    var j = argv[1].length,
        i = 0,
        k = 1,
        m = 0;
    var tmp = [],
        tmp_ar = [];

    while (i < j) {
        while (k < argc) {
            tmp[m++] = argv[k++][i];
        }

        m = 0;
        k = 1;

        if (callback) {
            if (typeof callback === 'string') {
                callback = this.window[callback];
            }
            tmp_ar[i++] = callback.apply(null, tmp);
        } else {
            tmp_ar[i++] = tmp;
        }

        tmp = [];
    }

    return tmp_ar;
}



function is_numeric(mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: David
    // +   improved by: taith
    // +   bugfixed by: Tim de Koning
    // +   bugfixed by: WebDevHobo (http://webdevhobo.blogspot.com/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: is_numeric(186.31);
    // *     returns 1: true
    // *     example 2: is_numeric('Kevin van Zonneveld');
    // *     returns 2: false
    // *     example 3: is_numeric('+186.31e2');
    // *     returns 3: true
    // *     example 4: is_numeric('');
    // *     returns 4: false
    // *     example 4: is_numeric([]);
    // *     returns 4: false

    return (typeof(mixed_var) === 'number' || typeof(mixed_var) === 'string') && mixed_var !== '' && !isNaN(mixed_var);
}



function in_array(needle, haystack, argStrict) {
    // Checks if the given value exists in the array
    //
    // version: 905.3120
    // discuss at: http://phpjs.org/functions/in_array
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: vlado houba
    // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
    // *     returns 2: false
    // *     example 3: in_array(1, ['1', '2', '3']);
    // *     returns 3: true
    // *     example 3: in_array(1, ['1', '2', '3'], false);
    // *     returns 3: true
    // *     example 4: in_array(1, ['1', '2', '3'], true);
    // *     returns 4: false
    var key = '', strict = !!argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }

    return false;
}


function uniqid(prefix, more_entropy) {
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kankrelune (http://www.webfaktory.info/)
    // %        note 1: Uses an internal counter (in php_js global) to avoid collision
    // *     example 1: uniqid();
    // *     returns 1: 'a30285b160c14'
    // *     example 2: uniqid('foo');
    // *     returns 2: 'fooa30285b1cd361'
    // *     example 3: uniqid('bar', true);
    // *     returns 3: 'bara20285b23dfd1.31879087'
    if (typeof prefix == 'undefined') {
        prefix = "";
    }

    var retId;
    var formatSeed = function(seed, reqWidth) {
        seed = parseInt(seed, 10).toString(16); // to hex str
        if (reqWidth < seed.length) { // so long we split
            return seed.slice(seed.length - reqWidth);
        }
        if (reqWidth > seed.length) { // so short we pad
            return Array(1 + (reqWidth - seed.length)).join('0') + seed;
        }
        return seed;
    };

    // BEGIN REDUNDANT
    if (!this.php_js) {
        this.php_js = {};
    }
    // END REDUNDANT
    if (!this.php_js.uniqidSeed) { // init seed with big random int
        this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
    }
    this.php_js.uniqidSeed++;

    retId = prefix; // start with prefix, add current milliseconds hex string
    retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
    retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string

    if (more_entropy) {
        // for more entropy we add a float lower to 10
        retId += (Math.random() * 10).toFixed(8).toString();
    }

    return retId;
}


function empty (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philippe Baumann
    // +      input by: Onno Marsman
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: LH
    // +   improved by: Onno Marsman
    // +   improved by: Francesco
    // +   improved by: Marc Jansen
    // +   input by: Stoyan Kyosev (http://www.svest.org/)
    // *     example 1: empty(null);
    // *     returns 1: true
    // *     example 2: empty(undefined);
    // *     returns 2: true
    // *     example 3: empty([]);
    // *     returns 3: true
    // *     example 4: empty({});
    // *     returns 4: true
    // *     example 5: empty({'aFunc' : function () { alert('humpty'); } });
    // *     returns 5: false
    var key;

    if (mixed_var === "" || mixed_var === 0 || mixed_var === "0" || mixed_var === null || mixed_var === false
                                                            || typeof mixed_var === 'undefined') {
        return true;
    }

    if (typeof mixed_var == 'object') {
        for (key in mixed_var) {
            return false;
        }
        return true;
    }

    return false;
}

function str_replace(search, replace, subject, count) {
    // Replaces all occurrences of search in haystack with replace
    //
    // version: 905.3122
    // discuss at: http://phpjs.org/functions/str_replace
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni
    // +   improved by: Philip Peterson
    // +   improved by: Simon Willison (http://simonwillison.net)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   bugfixed by: Anton Ongson
    // +      input by: Onno Marsman
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    tweaked by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   input by: Oleg Eremeev
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Oleg Eremeev
    // %          note 1: The count parameter must be passed as a string in order
    // %          note 1:  to find a global variable in which the result will be given
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'
    // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    // *     returns 2: 'hemmo, mars'
    var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
            f = [].concat(search),
            r = [].concat(replace),
            s = subject,
            ra = r instanceof Array, sa = s instanceof Array;
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }

    for (i = 0,sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j = 0,fl = f.length; j < fl; j++) {
            temp = s[i] + '';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length - s[i].length) / f[j].length;
            }
        }
    }
    return sa ? s : s[0];
}


function trim(str, charlist) {
    // Strips whitespace from the beginning and end of a string
    //
    // version: 905.1001
    // discuss at: http://phpjs.org/functions/trim
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: mdsjack (http://www.mdsjack.bo.it)
    // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
    // +      input by: Erkekjetter
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: DxGx
    // +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // *     example 1: trim('    Kevin van Zonneveld    ');
    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: trim('Hello World', 'Hdle');
    // *     returns 2: 'o Wor'
    // *     example 3: trim(16, 1);
    // *     returns 3: 6
    var whitespace, l = 0, i = 0;
    str += '';

    if (!charlist) {
        // default list
        whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
    } else {
        // preg_quote custom list
        charlist += '';
        whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
    }

    l = str.length;
    for (i = 0; i < l; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
    }

    l = str.length;
    for (i = l - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
    }

    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}


function base64_encode(data) {
    // http://kevin.vanzonneveld.net
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Bayron Guevara
    // +   improved by: Thunder.m
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Pellentesque Malesuada
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: utf8_encode
    // *     example 1: base64_encode('Kevin van Zonneveld');
    // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='

    // mozilla has this native
    // - but breaks in 2.0.0.12!
    //if (typeof this.window['atob'] == 'function') {
    //    return atob(data);
    //}

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = "", tmp_arr = [];

    if (!data) {
        return data;
    }

    data = this.utf8_encode(data + '');

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    switch (data.length % 3) {
        case 1:
            enc = enc.slice(0, -2) + '==';
            break;
        case 2:
            enc = enc.slice(0, -1) + '=';
            break;
    }

    return enc;
}

function base64_decode(data) {
    // Decodes string using MIME base64 algorithm
    //
    // version: 905.3122
    // discuss at: http://phpjs.org/functions/base64_decode
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Thunder.m
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   bugfixed by: Pellentesque Malesuada
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: utf8_decode
    // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
    // *     returns 1: 'Kevin van Zonneveld'
    // mozilla has this native
    // - but breaks in 2.0.0.12!
    //if (typeof this.window['btoa'] == 'function') {
    //    return btoa(data);
    //}

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];

    if (!data) {
        return data;
    }

    data += '';

    do {  // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);

    dec = tmp_arr.join('');
    dec = this.utf8_decode(dec);

    return dec;
}


function utf8_decode(str_data) {
    // Converts a UTF-8 encoded string to ISO-8859-1
    //
    // version: 905.3122
    // discuss at: http://phpjs.org/functions/utf8_decode
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Norman "zEh" Fuchs
    // +   bugfixed by: hitwork
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: utf8_decode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'
    var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;

    str_data += '';

    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if ((c1 > 191) && (c1 < 224)) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }

    return tmp_arr.join('');
}


function ucfirst(str) {
    // Makes a string's first character uppercase
    //
    // version: 905.3122
    // discuss at: http://phpjs.org/functions/ucfirst
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ucfirst('kevin van zonneveld');
    // *     returns 1: 'Kevin van zonneveld'
    str += '';
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1);
}


function array_search(needle, haystack, argStrict) {
    // Searches the array for a given value and returns the corresponding key if successful
    //
    // version: 905.3122
    // discuss at: http://phpjs.org/functions/array_search
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'});
    // *     returns 1: 'surname'

    var strict = !!argStrict;
    var key = '';

    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            return key;
        }
    }

    return false;
}


function mergeObject(p, c) {

    var keys = Object.keys(p);

    for (var i = 0; i < keys.length; i++) {
        if (!c[keys[i]]) {
            c[keys[i]] = p[keys[i]];
        }
    }

    return c;
}


function replace_html_event_attributes(value) {
    return value.replace(/ on[^=]+=/, function (attributeName) {
        return ' data-' + trim(attributeName);
    });
}

function strip_tags(str, allowed_tags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Luke Godfrey
    // +      input by: Pul
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Alex
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Marc Palau
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Eric Nagel
    // +      input by: Bobby Drake
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Tomasz Wesolowski
    // *     example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    // *     example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
    // *     returns 2: '<p>Kevin van Zonneveld</p>'
    // *     example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
    // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
    // *     example 4: strip_tags('1 < 5 5 > 1');
    // *     returns 4: '1 < 5 5 > 1'

    var key = '', allowed = false;
    var matches = [];
    var allowed_array = [];
    var allowed_tag = '';
    var i = 0;
    var k = '';
    var html = '';

    var replacer = function (search, replace, str) {
        return str.split(search).join(replace);
    };

    // Build allowes tags associative array
    if (allowed_tags) {
        allowed_array = allowed_tags.match(/([a-zA-Z0-9]+)/gi);
    }

    str += '';

    // Match tags
    matches = str.match(/(<\/?[\S][^>]*>)/gi);

    // Go through all HTML tags
    for (key in matches) {
        if (isNaN(key)) {
            // IE7 Hack
            continue;
        }

        // Save HTML tag
        html = matches[key].toString();

        // Is tag not in allowed list? Remove from str!
        allowed = false;

        // Go through all allowed tags
        for (k in allowed_array) {
            // Init
            allowed_tag = allowed_array[k];
            i = -1;

            if (i != 0) {
                i = html.toLowerCase().indexOf('<' + allowed_tag + '>');
            }
            if (i != 0) {
                i = html.toLowerCase().indexOf('<' + allowed_tag + ' ');
            }
            if (i != 0) {
                i = html.toLowerCase().indexOf('</' + allowed_tag);
            }

            // Determine
            if (i == 0) {
                allowed = true;
                break;
            }
        }

        if (!allowed) {
            str = replacer(html, "", str); // Custom replace. No regexing
        }
    }

    return str;
}


function md5(str) {
    // Calculate the md5 hash of a string
    //
    // version: 909.322
    // discuss at: http://phpjs.org/functions/md5    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // + namespaced by: Michael White (http://getsprink.com)
    // +    tweaked by: Jack
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: utf8_encode
    // *     example 1: md5('Kevin van Zonneveld');
    // *     returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
    var xl;
    var rotateLeft = function (lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    };
    var addUnsigned = function (lX, lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    };
    var _F = function (x, y, z) {
        return (x & y) | ((~x) & z);
    };
    var _G = function (x, y, z) {
        return (x & z) | (y & (~z));
    };
    var _H = function (x, y, z) {
        return (x ^ y ^ z);
    };
    var _I = function (x, y, z) {
        return (y ^ (x | (~z)));
    };
    var _FF = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var _GG = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var _HH = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var _II = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var convertToWordArray = function (str) {
        var lWordCount;
        var lMessageLength = str.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = new Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    var wordToHex = function (lValue) {
        var wordToHexValue = "",wordToHexValue_temp = "",lByte,lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            wordToHexValue_temp = "0" + lByte.toString(16);
            wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
        }
        return wordToHexValue;
    };

    var x = [],        k,AA,BB,CC,DD,a,b,c,d,
            S11 = 7, S12 = 12, S13 = 17, S14 = 22,
            S21 = 5, S22 = 9 , S23 = 14, S24 = 20,
            S31 = 4, S32 = 11, S33 = 16, S34 = 23,
            S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    str = this.utf8_encode(str);
    x = convertToWordArray(str);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    xl = x.length;
    for (k = 0; k < xl; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
    }

    var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
    return temp.toLowerCase();
}

function utf8_encode(string) {
    // Encodes an ISO-8859-1 string to UTF-8
    //
    // version: 909.322
    // discuss at: http://phpjs.org/functions/utf8_encode    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: sowberry
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman    // +   improved by: Yves Sucaet
    // +   bugfixed by: Onno Marsman
    // +   bugfixed by: Ulrich
    // *     example 1: utf8_encode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'    var string = (argString+''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    var utftext = "";
    var start, end;
    var stringl = 0;
    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.substring(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }

    if (end > start) {
        utftext += string.substring(start, string.length);
    }

    return utftext;
}


function intval(mixed_var, base) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: stensi
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   input by: Matteo
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: intval('Kevin van Zonneveld');
    // *     returns 1: 0
    // *     example 2: intval(4.2);
    // *     returns 2: 4
    // *     example 3: intval(42, 8);
    // *     returns 3: 42
    // *     example 4: intval('09');
    // *     returns 4: 9
    // *     example 5: intval('1e', 16);
    // *     returns 5: 30

    var tmp;

    var type = typeof( mixed_var );

    if (type === 'boolean') {
        return (mixed_var) ? 1 : 0;
    } else if (type === 'string') {
        tmp = parseInt(mixed_var, base || 10);
        return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
    } else if (type === 'number' && isFinite(mixed_var)) {
        return Math.floor(mixed_var);
    } else {
        return 0;
    }
}


function nl2br (str, is_xhtml) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Philip Peterson
    // +   improved by: Onno Marsman
    // +   improved by: Atli Þór
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Maximusya
    // *     example 1: nl2br('Kevin\nvan\nZonneveld');
    // *     returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
    // *     example 2: nl2br("\nOne\nTwo\n\nThree\n", false);
    // *     returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
    // *     example 3: nl2br("\nOne\nTwo\n\nThree\n", true);
    // *     returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'

    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';

    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}


function preg_quote (str, delimiter) {
    // http://kevin.vanzonneveld.net
    // +   original by: booeyOH
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: preg_quote("$40");
    // *     returns 1: '\$40'
    // *     example 2: preg_quote("*RRRING* Hello?");
    // *     returns 2: '\*RRRING\* Hello\?'
    // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
    // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'
    return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
}


function urlencode (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Lars Fischer
    // +      input by: Ratheous
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Joris
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: This reflects PHP 5.3/6.0+ behavior
    // %        note 2: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
    // %        note 2: pages served as UTF-8
    // *     example 1: urlencode('Kevin van Zonneveld!');
    // *     returns 1: 'Kevin+van+Zonneveld%21'
    // *     example 2: urlencode('http://kevin.vanzonneveld.net/');
    // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    // *     example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
    str = (str + '').toString();

    // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}


function htmlentities (string, quote_style, charset, double_encode) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: nobbler
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Ratheous
    // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
    // +   improved by: Dj (http://phpjs.org/functions/htmlentities:425#comment_134018)
    // -    depends on: get_html_translation_table
    // *     example 1: htmlentities('Kevin & van Zonneveld');
    // *     returns 1: 'Kevin &amp; van Zonneveld'
    // *     example 2: htmlentities("foo'bar","ENT_QUOTES");
    // *     returns 2: 'foo&#039;bar'
    var hash_map = get_html_translation_table('HTML_ENTITIES', quote_style),
        symbol = '';
    string = string == null ? '' : string + '';

    if (!hash_map) {
        return false;
    }

    if (quote_style && quote_style === 'ENT_QUOTES') {
        hash_map["'"] = '&#039;';
    }

    if (!!double_encode || double_encode == null) {
        for (symbol in hash_map) {
            string = string.split(symbol).join(hash_map[symbol]);
        }
    } else {
        string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g, function (ignore, text, entity) {
            for (symbol in hash_map) {
                text = text.split(symbol).join(hash_map[symbol]);
            }

            return text + entity;
        });
    }

    return string;
}


function get_html_translation_table (table, quote_style) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: noname
    // +   bugfixed by: Alex
    // +   bugfixed by: Marco
    // +   bugfixed by: madipta
    // +   improved by: KELAN
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Frank Forte
    // +   bugfixed by: T.Wild
    // +      input by: Ratheous
    // %          note: It has been decided that we're not going to add global
    // %          note: dependencies to php.js, meaning the constants are not
    // %          note: real constants, but strings instead. Integers are also supported if someone
    // %          note: chooses to create the constants themselves.
    // *     example 1: get_html_translation_table('HTML_SPECIALCHARS');
    // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
    var entities = {},
        hash_map = {},
        decimal = 0,
        symbol = '';
    var constMappingTable = {},
        constMappingQuoteStyle = {};
    var useTable = {},
        useQuoteStyle = {};

    // Translate arguments
    constMappingTable[0] = 'HTML_SPECIALCHARS';
    constMappingTable[1] = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';

    useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
        throw new Error("Table: " + useTable + ' not supported');
        // return false;
    }

    entities['38'] = '&amp;';
    if (useTable === 'HTML_ENTITIES') {
        entities['160'] = '&nbsp;';
        entities['161'] = '&iexcl;';
        entities['162'] = '&cent;';
        entities['163'] = '&pound;';
        entities['164'] = '&curren;';
        entities['165'] = '&yen;';
        entities['166'] = '&brvbar;';
        entities['167'] = '&sect;';
        entities['168'] = '&uml;';
        entities['169'] = '&copy;';
        entities['170'] = '&ordf;';
        entities['171'] = '&laquo;';
        entities['172'] = '&not;';
        entities['173'] = '&shy;';
        entities['174'] = '&reg;';
        entities['175'] = '&macr;';
        entities['176'] = '&deg;';
        entities['177'] = '&plusmn;';
        entities['178'] = '&sup2;';
        entities['179'] = '&sup3;';
        entities['180'] = '&acute;';
        entities['181'] = '&micro;';
        entities['182'] = '&para;';
        entities['183'] = '&middot;';
        entities['184'] = '&cedil;';
        entities['185'] = '&sup1;';
        entities['186'] = '&ordm;';
        entities['187'] = '&raquo;';
        entities['188'] = '&frac14;';
        entities['189'] = '&frac12;';
        entities['190'] = '&frac34;';
        entities['191'] = '&iquest;';
        entities['192'] = '&Agrave;';
        entities['193'] = '&Aacute;';
        entities['194'] = '&Acirc;';
        entities['195'] = '&Atilde;';
        entities['196'] = '&Auml;';
        entities['197'] = '&Aring;';
        entities['198'] = '&AElig;';
        entities['199'] = '&Ccedil;';
        entities['200'] = '&Egrave;';
        entities['201'] = '&Eacute;';
        entities['202'] = '&Ecirc;';
        entities['203'] = '&Euml;';
        entities['204'] = '&Igrave;';
        entities['205'] = '&Iacute;';
        entities['206'] = '&Icirc;';
        entities['207'] = '&Iuml;';
        entities['208'] = '&ETH;';
        entities['209'] = '&Ntilde;';
        entities['210'] = '&Ograve;';
        entities['211'] = '&Oacute;';
        entities['212'] = '&Ocirc;';
        entities['213'] = '&Otilde;';
        entities['214'] = '&Ouml;';
        entities['215'] = '&times;';
        entities['216'] = '&Oslash;';
        entities['217'] = '&Ugrave;';
        entities['218'] = '&Uacute;';
        entities['219'] = '&Ucirc;';
        entities['220'] = '&Uuml;';
        entities['221'] = '&Yacute;';
        entities['222'] = '&THORN;';
        entities['223'] = '&szlig;';
        entities['224'] = '&agrave;';
        entities['225'] = '&aacute;';
        entities['226'] = '&acirc;';
        entities['227'] = '&atilde;';
        entities['228'] = '&auml;';
        entities['229'] = '&aring;';
        entities['230'] = '&aelig;';
        entities['231'] = '&ccedil;';
        entities['232'] = '&egrave;';
        entities['233'] = '&eacute;';
        entities['234'] = '&ecirc;';
        entities['235'] = '&euml;';
        entities['236'] = '&igrave;';
        entities['237'] = '&iacute;';
        entities['238'] = '&icirc;';
        entities['239'] = '&iuml;';
        entities['240'] = '&eth;';
        entities['241'] = '&ntilde;';
        entities['242'] = '&ograve;';
        entities['243'] = '&oacute;';
        entities['244'] = '&ocirc;';
        entities['245'] = '&otilde;';
        entities['246'] = '&ouml;';
        entities['247'] = '&divide;';
        entities['248'] = '&oslash;';
        entities['249'] = '&ugrave;';
        entities['250'] = '&uacute;';
        entities['251'] = '&ucirc;';
        entities['252'] = '&uuml;';
        entities['253'] = '&yacute;';
        entities['254'] = '&thorn;';
        entities['255'] = '&yuml;';
    }

    if (useQuoteStyle !== 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
    if (useQuoteStyle === 'ENT_QUOTES') {
        entities['39'] = '&#39;';
    }
    entities['60'] = '&lt;';
    entities['62'] = '&gt;';


    // ascii decimals to real symbols
    for (decimal in entities) {
        symbol = String.fromCharCode(decimal);
        hash_map[symbol] = entities[decimal];
    }

    return hash_map;
}


function parse_url (str, component) {
    // http://kevin.vanzonneveld.net
    // +      original by: Steven Levithan (http://blog.stevenlevithan.com)
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // + input by: Lorenzo Pisani
    // + input by: Tony
    // + improved by: Brett Zamir (http://brett-zamir.me)
    // %          note: Based on http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    // %          note: blog post at http://blog.stevenlevithan.com/archives/parseuri
    // %          note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    // %          note: Does not replace invalid characters with '_' as in PHP, nor does it return false with
    // %          note: a seriously malformed URL.
    // %          note: Besides function name, is essentially the same as parseUri as well as our allowing
    // %          note: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
    // *     example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
    // *     returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
    var key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port',
                        'relative', 'path', 'directory', 'file', 'query', 'fragment'],
        ini = (this.php_js && this.php_js.ini) || {},
        mode = (ini['phpjs.parse_url.mode'] &&
            ini['phpjs.parse_url.mode'].local_value) || 'php',
        parser = {
            php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
        };

    var m = parser[mode].exec(str),
        uri = {},
        i = 14;
    while (i--) {
        if (m[i]) {
          uri[key[i]] = m[i];
        }
    }

    if (component) {
        return uri[component.replace('PHP_URL_', '').toLowerCase()];
    }
    if (mode !== 'php') {
        var name = (ini['phpjs.parse_url.queryKey'] &&
                ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
        parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
        uri[name] = {};
        uri[key[12]].replace(parser, function ($0, $1, $2) {
            if ($1) {uri[name][$1] = $2;}
        });
    }
    delete uri.source;
    return uri;
}

function round (value, precision, mode) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +    revised by: Onno Marsman
    // +      input by: Greenseed
    // +    revised by: T.Wild
    // +      input by: meo
    // +      input by: William
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Josep Sanz (http://www.ws3.es/)
    // +    revised by: Rafał Kukawski (http://blog.kukawski.pl/)
    // %        note 1: Great work. Ideas for improvement:
    // %        note 1:  - code more compliant with developer guidelines
    // %        note 1:  - for implementing PHP constant arguments look at
    // %        note 1:  the pathinfo() function, it offers the greatest
    // %        note 1:  flexibility & compatibility possible
    // *     example 1: round(1241757, -3);
    // *     returns 1: 1242000
    // *     example 2: round(3.6);
    // *     returns 2: 4
    // *     example 3: round(2.835, 2);
    // *     returns 3: 2.84
    // *     example 4: round(1.1749999999999, 2);
    // *     returns 4: 1.17
    // *     example 5: round(58551.799999999996, 2);
    // *     returns 5: 58551.8
    var m, f, isHalf, sgn; // helper variables
    precision |= 0; // making sure precision is integer
    m = Math.pow(10, precision);
    value *= m;
    sgn = (value > 0) | -(value < 0); // sign of the number
    isHalf = value % 1 === 0.5 * sgn;
    f = Math.floor(value);

    if (isHalf) {
        switch (mode) {
        case 'PHP_ROUND_HALF_DOWN':
            value = f + (sgn < 0); // rounds .5 toward zero
            break;
        case 'PHP_ROUND_HALF_EVEN':
            value = f + (f % 2 * sgn); // rouds .5 towards the next even integer
            break;
        case 'PHP_ROUND_HALF_ODD':
            value = f + !(f % 2); // rounds .5 towards the next odd integer
            break;
        default:
            value = f + (sgn > 0); // rounds .5 away from zero
        }
    }

    return (isHalf ? value : Math.round(value)) / m;
}


function implode (glue, pieces) {
    // Joins array elements placing glue string between items and return one string
    //
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/implode    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Waldo Malqui Silva
    // +   improved by: Itsacon (http://www.itsacon.net/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
    // *     returns 2: 'Kevin van Zonneveld'
    var i = '',
        retVal = '',        tGlue = '';
    if (arguments.length === 1) {
        pieces = glue;
        glue = '';
    }    if (typeof(pieces) === 'object') {
        if (Object.prototype.toString.call(pieces) === '[object Array]') {
            return pieces.join(glue);
        }
        for (i in pieces) {            retVal += tGlue + pieces[i];
            tGlue = glue;
        }
        return retVal;
    }    return pieces;
}

/**
 * inserts a text into an input/textarea where the cursor is set
 * @param txtarea
 * @param text
 */
function insertTextToFormElementAtCursor(txtarea, text) {
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
        "ff" : (document.selection ? "ie" : false ) );
    if (br == "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        strPos = range.text.length;
    }
    else if (br == "ff") strPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0, strPos);
    var back = (txtarea.value).substring(strPos, txtarea.value.length);
    txtarea.value = front + text + back;
    strPos = strPos + text.length;
    if (br == "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        range.moveStart('character', strPos);
        range.moveEnd('character', 0);
        range.select();
    }
    else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
}

/**
 * inserts a text into an html element with contenteditable where the cursor is set
 * @param text
 * @param win
 * @param doc
 */
function insertTextToContenteditableAtCursor (text, win, doc) {

    if(!win) {
        var win = window;
    }
    if(!doc) {
        var doc = document;
    }

    var sel, range;
    if (win.getSelection) {
        sel = win.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode( doc.createTextNode(text) );
        }
    } else if (doc.selection && doc.selection.createRange) {
        doc.selection.createRange().text = text;
    }
}

stringToFunction = function(str) {
    if (typeof str !== "string") {
        return str;
    }

    var arr = str.split(".");

    var fn = (window || this);
    for (var i = 0, len = arr.length; i < len; i++) {
        fn = fn[arr[i]];
    }

    if (typeof fn !== "function") {
        throw new Error("function not found");
    }

    return  fn;
};

sprintf = function ()
{
    if (!arguments || arguments.length < 1 || !RegExp)
    {
        return;
    }
    var str = arguments[0];
    var re = /([^%]*)%('.|0|\x20)?(-)?(\d+)?(\.\d+)?(%|b|c|d|u|f|o|s|x|X)(.*)/;
    var a = b = [], numSubstitutions = 0, numMatches = 0;
    while (a = re.exec(str))
    {
        var leftpart = a[1], pPad = a[2], pJustify = a[3], pMinLength = a[4];
        var pPrecision = a[5], pType = a[6], rightPart = a[7];

        numMatches++;
        if (pType == '%')
        {
            subst = '%';
        }
        else
        {
            numSubstitutions++;
            if (numSubstitutions >= arguments.length)
            {
                alert('Error! Not enough function arguments (' + (arguments.length - 1) + ', excluding the string)\nfor the number of substitution parameters in string (' + numSubstitutions + ' so far).');
            }
            var param = arguments[numSubstitutions];
            var pad = '';
            if (pPad && pPad.substr(0,1) == "'") pad = leftpart.substr(1,1);
            else if (pPad) pad = pPad;
            var justifyRight = true;
            if (pJustify && pJustify === "-") justifyRight = false;
            var minLength = -1;
            if (pMinLength) minLength = parseInt(pMinLength);
            var precision = -1;
            if (pPrecision && pType == 'f') precision = parseInt(pPrecision.substring(1));
            var subst = param;
            if (pType == 'b') subst = parseInt(param).toString(2);
            else if (pType == 'c') subst = String.fromCharCode(parseInt(param));
            else if (pType == 'd') subst = parseInt(param) ? parseInt(param) : 0;
            else if (pType == 'u') subst = Math.abs(param);
            else if (pType == 'f') subst = (precision > -1) ? Math.round(parseFloat(param) * Math.pow(10, precision)) / Math.pow(10, precision): parseFloat(param);
            else if (pType == 'o') subst = parseInt(param).toString(8);
            else if (pType == 's') subst = param;
            else if (pType == 'x') subst = ('' + parseInt(param).toString(16)).toLowerCase();
            else if (pType == 'X') subst = ('' + parseInt(param).toString(16)).toUpperCase();
        }
        arguments[numSubstitutions] = subst;
        str = leftpart + '${'+numSubstitutions+'}' + rightPart;
    }
    str = str.replace(/\${(\d+)}/g, (match, num) => arguments[num]);

    return str;
}

function array_merge () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Nate
    // +   input by: josh
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: arr1 = {"color": "red", 0: 2, 1: 4}
    // *     example 1: arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
    // *     example 1: array_merge(arr1, arr2)
    // *     returns 1: {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
    // *     example 2: arr1 = []
    // *     example 2: arr2 = {1: "data"}
    // *     example 2: array_merge(arr1, arr2)
    // *     returns 2: {0: "data"}

    var args = Array.prototype.slice.call(arguments),
        retObj = {}, k, j = 0, i = 0, retArr = true;

    for (i=0; i < args.length; i++) {
        if (!(args[i] instanceof Array)) {
            retArr=false;
            break;
        }
    }

    if (retArr) {
        retArr = [];
        for (i=0; i < args.length; i++) {
            retArr = retArr.concat(args[i]);
        }
        return retArr;
    }
    var ct = 0;

    for (i=0, ct=0; i < args.length; i++) {
        if (args[i] instanceof Array) {
            for (j=0; j < args[i].length; j++) {
                retObj[ct++] = args[i][j];
            }
        } else {
            for (k in args[i]) {
                if (args[i].hasOwnProperty(k)) {
                    if (parseInt(k, 10)+'' === k) {
                        retObj[ct++] = args[i][k];
                    } else {
                        retObj[k] = args[i][k];
                    }
                }
            }
        }
    }
    return retObj;
}

function array_merge_recursive (arr1, arr2){
    // http://kevin.vanzonneveld.net
    // +   original by: Subhasis Deb
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: array_merge
    // *     example 1: arr1 = {'color': {'favourite': 'read'}, 0: 5}
    // *     example 1: arr2 = {0: 10, 'color': {'favorite': 'green', 0: 'blue'}}
    // *     example 1: array_merge_recursive(arr1, arr2)
    // *     returns 1: {'color': {'favorite': {0: 'red', 1: 'green'}, 0: 'blue'}, 1: 5, 1: 10}

    var idx = '';

    if ((arr1 && (arr1 instanceof Array)) && (arr2 && (arr2 instanceof Array))) {
        for (idx in arr2) {
            arr1.push(arr2[idx]);
        }
    } else if ((arr1 && (arr1 instanceof Object)) && (arr2 && (arr2 instanceof Object))) {
        for (idx in arr2) {
            if (idx in arr1) {
                if (typeof arr1[idx] == 'object' && typeof arr2 == 'object') {
                    arr1[idx] = this.array_merge(arr1[idx], arr2[idx]);
                } else {
                    arr1[idx] = arr2[idx];
                }
            } else {
                arr1[idx] = arr2[idx];
            }
        }
    }

    return arr1;
}


function htmlspecialchars (string, quoteStyle, charset, doubleEncode) {
    //       discuss at: http://locutus.io/php/htmlspecialchars/
    //      original by: Mirek Slugen
    //      improved by: Kevin van Zonneveld (http://kvz.io)
    //      bugfixed by: Nathan
    //      bugfixed by: Arno
    //      bugfixed by: Brett Zamir (http://brett-zamir.me)
    //      bugfixed by: Brett Zamir (http://brett-zamir.me)
    //       revised by: Kevin van Zonneveld (http://kvz.io)
    //         input by: Ratheous
    //         input by: Mailfaker (http://www.weedem.fr/)
    //         input by: felix
    // reimplemented by: Brett Zamir (http://brett-zamir.me)
    //           note 1: charset argument not supported
    //        example 1: htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES')
    //        returns 1: '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'
    //        example 2: htmlspecialchars("ab\"c'd", ['ENT_NOQUOTES', 'ENT_QUOTES'])
    //        returns 2: 'ab"c&#039;d'
    //        example 3: htmlspecialchars('my "&entity;" is still here', null, null, false)
    //        returns 3: 'my &quot;&entity;&quot; is still here'

    var optTemp = 0
    var i = 0
    var noquotes = false
    if (typeof quoteStyle === 'undefined' || quoteStyle === null) {
        quoteStyle = 2
    }
    string = string || ''
    string = string.toString()

    if (doubleEncode !== false) {
        // Put this first to avoid double-encoding
        string = string.replace(/&/g, '&amp;')
    }

    string = string
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

    var OPTS = {
        'ENT_NOQUOTES': 0,
        'ENT_HTML_QUOTE_SINGLE': 1,
        'ENT_HTML_QUOTE_DOUBLE': 2,
        'ENT_COMPAT': 2,
        'ENT_QUOTES': 3,
        'ENT_IGNORE': 4
    }
    if (quoteStyle === 0) {
        noquotes = true
    }
    if (typeof quoteStyle !== 'number') {
        // Allow for a single string or an array of string flags
        quoteStyle = [].concat(quoteStyle)
        for (i = 0; i < quoteStyle.length; i++) {
            // Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
            if (OPTS[quoteStyle[i]] === 0) {
                noquotes = true
            } else if (OPTS[quoteStyle[i]]) {
                optTemp = optTemp | OPTS[quoteStyle[i]]
            }
        }
        quoteStyle = optTemp
    }
    if (quoteStyle & OPTS.ENT_HTML_QUOTE_SINGLE) {
        string = string.replace(/'/g, '&#039;')
    }
    if (!noquotes) {
        string = string.replace(/"/g, '&quot;')
    }

    return string
}

function getUserTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function dateToServerTimezone(date) {

    let utcDate = new Date(date.toLocaleString('en-US', {
        timeZone: pimcore.settings.timezone ? pimcore.settings.timezone : 'UTC'
    }));

    let diff = date.getTime() - utcDate.getTime();

    return new Date(date.getTime() - diff);

}

function sumWidths(width1, width2) {
    if (/^\d+$/.test(width1) && /^\d+$/.test(width2)) {
        return parseInt(width1) + parseInt(width2);
    }
    if (/^\d+$/.test(width1)) {
        width1 += 'px';
    }
    if (/^\d+$/.test(width2)) {
        width2 += 'px';
    }

    return 'calc(' + width1 + ' + ' + width2 + ')';
}



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

/**
 * @private
 */

Ext.setVersion("ext", "7.0.0.159");
Ext.setVersion("core", "7.0.0.159");

if(typeof window['t'] !== 'function') {
    // for compatibility reasons
    window.t = function(v) { return v; };
}


Ext.form.field.Date.prototype.startDay = 1;

Ext.override(Ext.dd.DragDropMgr, {
        startDrag: function (x, y) {

            // always hide tree-previews on drag start
            pimcore.helpers.treeNodeThumbnailPreviewHide();

            this.callParent(arguments);
        }
    }
);

/**
 * Undesired behaviour: submenu is hidden on clicking owner menu item
 * fix see https://www.sencha.com/forum/showthread.php?305492-Undesired-behaviour-submenu-is-hidden-on-clicking-owner-menu-item
 * @param e
 */
Ext.menu.Manager.checkActiveMenus = function(e) {
    var allMenus = this.visible,
        len = allMenus.length,
        i, menu,
        mousedownCmp = Ext.Component.fromElement(e.target);
    if (len) {
        // Clone here, we may modify this collection while the loop is active
        allMenus = allMenus.slice();
        for (i = 0; i < len; ++i) {
            menu = allMenus[i];
            // Hide the menu if:
            //      The menu does not own the clicked upon element AND
            //      The menu is not the child menu of a clicked upon MenuItem
            if (!(menu.owns(e) || (mousedownCmp && mousedownCmp.isMenuItem && mousedownCmp.menu === menu))) {
                menu.hide();
            }
        }
    }
};


Ext.define('pimcore.FieldSetTools', {
    extend: 'Ext.form.FieldSet',

    createLegendCt: function () {
        var me = this;
        var result = this.callSuper(arguments);

        if (me.config.tools && me.config.tools.length > 0) {
            for (var i = 0; i < me.config.tools.length; i++) {
                var tool = me.config.tools[i];
                this.createToolCmp(tool, result);
            }
        }
        return result;

    },


    createToolCmp: function(tool, result) {
        var me = this;
        var cls = me.baseCls + '-header-tool-default ' + me.baseCls + '-header-tool-right';
        if (tool['cls']) {
            cls = cls + ' ' + tool['cls'];
        }
        var cfg = {
            type: tool['type'],
            html: me.title,
            ui: me.ui,
            tooltip: tool.qtip,
            handler: tool.handler,
            hidden: tool.hidden,
            cls: cls,
            ariaRole: 'checkbox',
            ariaRenderAttributes: {
                'aria-checked': !me.collapsed
            }
        };

        if (tool['id']) {
            cfg['id'] = tool['id'];
        }

        var cmp = new Ext.panel.Tool(cfg);
        result.add(cmp);
        return result;
    },
});



Ext.define('pimcore.filters', {
    extend: 'Ext.grid.filters.Filters',
    alias: 'plugin.pimcore.gridfilters',
    menuFilterText: t('filter'),

    createColumnFilter: function(column) {
        this.callSuper(arguments);
        var type = column.filter.type;
        var theFilter = column.filter.filter;

        if (column.filter instanceof Ext.grid.filters.filter.TriFilter) {
            theFilter.lt.config.type = type;
            theFilter.gt.config.type = type;
            theFilter.eq.config.type = type;

            if (column.decimalPrecision) {
                column.filter.fields.lt.decimalPrecision = column.decimalPrecision;
                column.filter.fields.gt.decimalPrecision = column.decimalPrecision;
                column.filter.fields.eq.decimalPrecision = column.decimalPrecision;
            }
        } else {
            theFilter.config.type = type;
        }
    }
});

// See https://www.sencha.com/forum/showthread.php?288385
// Column renderer will give no metadata parameter after change a value of cell.
// It happens because column renderer method is invoked with null second parameter here
Ext.define('Ext.overrides.grid.View', {
        extend: 'Ext.grid.View',

        alias: 'widget.patchedgridview'
        ,

        handleUpdate: function(store, record, operation, changedFieldNames) {
            var me = this,
                rowTpl = me.rowTpl,
                oldItem, oldItemDom, oldDataRow,
                newItemDom,
                newAttrs, attLen, attName, attrIndex,
                overItemCls,
                focusedItemCls,
                selectedItemCls,
                columns,
                column,
                columnsToUpdate = [],
                len, i,
                hasVariableRowHeight = me.variableRowHeight,
                cellUpdateFlag,
                updateTypeFlags = 0,
                cell,
                fieldName,
                value,
                defaultRenderer,
                scope,
                ownerCt = me.ownerCt;


            if (me.viewReady) {
                oldItemDom = me.getNodeByRecord(record);

                if (oldItemDom) {
                    overItemCls = me.overItemCls;
                    focusedItemCls = me.focusedItemCls;
                    selectedItemCls = me.selectedItemCls;
                    columns = me.ownerCt.getVisibleColumnManager().getColumns();

                    if (!me.getRowFromItem(oldItemDom) || (updateTypeFlags & 1) || (oldItemDom.tBodies[0].childNodes.length > 1)) {
                        oldItem = Ext.fly(oldItemDom, '_internal');
                        newItemDom = me.createRowElement(record, me.dataSource.indexOf(record), columnsToUpdate);
                        if (oldItem.hasCls(overItemCls)) {
                            Ext.fly(newItemDom).addCls(overItemCls);
                        }
                        if (oldItem.hasCls(focusedItemCls)) {
                            Ext.fly(newItemDom).addCls(focusedItemCls);
                        }
                        if (oldItem.hasCls(selectedItemCls)) {
                            Ext.fly(newItemDom).addCls(selectedItemCls);
                        }

                        newAttrs = newItemDom.attributes;
                        attLen = newAttrs.length;
                        for (attrIndex = 0; attrIndex < attLen; attrIndex++) {
                            attName = newAttrs[attrIndex].name;
                            if (attName !== 'id') {
                                oldItemDom.setAttribute(attName, newAttrs[attrIndex].value);
                            }
                        }

                        if (columns.length && (oldDataRow = me.getRow(oldItemDom))) {
                            me.updateColumns(oldDataRow, Ext.fly(newItemDom).down(me.rowSelector, true), columnsToUpdate);
                        }

                        while (rowTpl) {
                            if (rowTpl.syncContent) {
                                if (rowTpl.syncContent(oldItemDom, newItemDom, changedFieldNames ? columnsToUpdate : null) === false) {
                                    break;
                                }
                            }
                            rowTpl = rowTpl.nextTpl;
                        }
                    }
                    else {
                        this.refresh();
                    }

                    if (hasVariableRowHeight) {
                        Ext.suspendLayouts();
                    }


                    me.fireEvent('itemupdate', record, me.store.indexOf(record), oldItemDom);

                    if (hasVariableRowHeight) {
                        me.refreshSize();

                        Ext.resumeLayouts(true);
                    }
                }
            }
        }
    }
);

Ext.define('pimcore.tree.Panel', {
    extend: 'Ext.tree.Panel'
});

Ext.define('pimcore.tree.View', {
    extend: 'Ext.tree.View',
    alias: 'widget.pimcoretreeview',
    listeners: {
        refresh: function() {
            this.updatePaging();
        },
        beforeitemupdate: function(record) {
            if(record.ptb) {
                record.ptb.destroy();
                delete record.ptb;
            }
        },

        itemupdate: function(record) {
            if (record.needsPaging && typeof record.ptb == "undefined" && typeof record.itemUpdated == "undefined") {
                record.itemUpdated = true;
                this.doUpdatePaging(record);
            }
        }
    },

    queue: {},

    renderRow: function(record, rowIdx, out) {
        var me = this;
        if (record.needsPaging) {
            me.queue[record.id] = record;
        }

        me.superclass.renderRow.call(this, record, rowIdx, out);

        // do not update paging again, if already done in "itemupdate" event
        if (record.needsPaging && typeof record.ptb == "undefined" && typeof record.itemUpdated == "undefined") {
            this.doUpdatePaging(record);
        }

        this.fireEvent("itemafterrender", record, rowIdx, out);
    },

    doUpdatePaging: function(node) {

        const tree = node.getOwnerTree();

        if (node.data.expanded && node.needsPaging && tree) {

            node.ptb = ptb = Ext.create('pimcore.toolbar.Paging', {
                    node: node,
                    width: 260
                }
            );

            node.ptb.node = node;
            node.ptb.store = this.store;


            var view = tree.getView();
            var nodeEl = Ext.fly(view.getNodeByRecord(node));
            if (!nodeEl) {
                //console.log("Could not resolve node " + node.id);
                return;
            }
            nodeEl = nodeEl.getFirstChild();
            nodeEl = nodeEl.query(".x-tree-node-text");
            nodeEl = nodeEl[0];
            var el = nodeEl;

            //el.addCls('x-grid-header-inner');
            el = Ext.DomHelper.insertAfter(el, {
                tag: 'span',
                "class": "pimcore_pagingtoolbar_container"
            }, true);

            el.addListener("click", function(e) {
                e.stopPropagation();
            });


            el.addListener("mousedown", function(e) {
                e.stopPropagation();
            });

            ptb.render(el);
            tree.updateLayout();

            if (node.filter) {
                node.ptb.filterField.focus([node.filter.length, node.filter.length]);
            } else if (node.fromPaging) {
                node.ptb.numberItem.focus();
            }
        }

    },

    updatePaging: function() {
        var me = this;
        var queue = me.queue;

        var names = Object.getOwnPropertyNames(queue);

        for (i = 0; i < names.length; i++) {
            var node = queue[names[i]];
            this.doUpdatePaging(node);
        }

        me.queue = {}
    }
});

Ext.define('pimcore.data.PagingTreeStore', {

    extend: 'Ext.data.TreeStore',

    ptb: false,

    onProxyLoad: function(operation) {
        try {
            var me = this;
            var options = operation.initialConfig
            var node = options.node;
            var proxy = me.getProxy();
            var extraParams = proxy.getExtraParams();


            var response = operation.getResponse();
            var data = response.responseJson;

            node.fromPaging = data.fromPaging;
            node.filter = data.filter;
            node.inSearch = data.inSearch;
            node.overflow = data.overflow;

            proxy.setExtraParam("fromPaging", 0);

            var total = data.total;

            var text = node.data.text;
            if (typeof total == "undefined") {
                total = 0;
            }

            node.addListener("expand", function (node) {
                var tree = node.getOwnerTree();
                if (tree) {
                    var view = tree.getView();
                    view.updatePaging();
                }
            }.bind(this));

            //to hide or show the expanding icon depending if children are available or not
            node.addListener('remove', function (node, removedNode, isMove) {
                if (!node.hasChildNodes()) {
                    node.set('expandable', false);
                }
            });
            node.addListener('append', function (node) {
                node.set('expandable', true);
            });

            node.needsPaging = true;
            node.pagingData = {
                total: data.total,
                offset: data.offset,
                limit: data.limit,
                canSortManually: data.total < data.limit
            }

            me.superclass.onProxyLoad.call(this, operation);
            var proxy = this.getProxy();
            proxy.setExtraParam("start", 0);
        } catch (e) {
            console.log(e);
        }
    }
});


Ext.define('pimcore.toolbar.Paging', {
    extend: 'Ext.toolbar.Toolbar',
    requires: [
        'Ext.toolbar.TextItem',
        'Ext.form.field.Number'
    ],

    displayInfo: false,

    prependButtons: false,

    displayMsg: t('Displaying {0} - {1} of {2}'),

    emptyMsg: t('no_data_to_display'),

    beforePageText: t('page'),

    afterPageText: '/ {0}',

    firstText: t('first_page'),

    prevText: t('previous_page'),

    nextText: t('next_page'),

    lastText: t('last_page'),

    refreshText: t('refresh'),

    width: 280,

    height: 20,

    border: false,

    emptyPageData: {
        total: 0,
        currentPage: 0,
        pageCount: 0,
        toRecord: 0,
        fromRecord: 0
    },

    doCancelSearch: function (node) {
        this.inSearch = 0;
        this.cancelFilterButton.hide();
        this.filterButton.show();
        this.filterField.setValue("");
        this.filterField.hide();

        var store = this.store;
        store.load({
                node: node,
                params: {
                    "inSearch": 0
                }
            }
        );


        this.first.show();
        this.prev.show();
        this.numberItem.show();
        this.spacer.show();
        this.afterItem.show();
        this.next.show();
        this.last.show();
    },

    getPagingItems: function () {
        var me = this,
            inputListeners = {
                scope: me,
                blur: me.onPagingBlur
            };

        var node = me.node;
        var pagingData = me.node.pagingData;

        var currPage = pagingData.offset / pagingData.limit + 1;

        this.inSearch = node.inSearch;
        var hidePagination = this.inSearch || pagingData.total <= pagingData.limit;
        pimcore.isTreeFiltering = false;

        inputListeners[Ext.supports.SpecialKeyDownRepeat ? 'keydown' : 'keypress'] = me.onPagingKeyDown;

        this.filterField = new Ext.form.field.Text({
            name: 'filter',
            width: 160,
            border: true,
            cls: "pimcore_pagingtoolbar_container_filter",
            fieldStyle: "padding: 0 10px 0 10px;",
            height: 18,
            value: node.filter ? node.filter : "",
            enableKeyEvents: true,
            hidden: !this.inSearch,
            listeners: {
                "keydown": function (node, inputField, event) {
                    if (event.keyCode == 13) {
                        var store = this.store;
                        var proxy = store.getProxy();
                        this.currentFilter = this.filterField.getValue();


                        try {
                            store.load({
                                    node: node,
                                    params: {
                                        "filter": this.filterField.getValue(),
                                        "inSearch": this.inSearch
                                    }
                                }
                            );
                        } catch (e) {

                        }


                    }
                }.bind(this, node)
            }

        });

        var result = [this.filterField];

        this.overflow = new Ext.button.Button(
            {
                tooltip: t("there_are_more_items"),
                overflowText: t("there_are_more_items"),
                iconCls: "pimcore_icon_warning",
                disabled: false,
                scope: me,
                border: false,
                hidden: !node.overflow
            });


        this.filterButton = new Ext.button.Button(
            {
                itemId: 'filterButton',
                tooltip: t("filter"),
                overflowText: t("filter"),
                iconCls: Ext.baseCSSPrefix + 'tbar-page-filter',
                margin: '-1 2 3 2',
                handler: function () {
                    this.inSearch = 1;
                    this.cancelFilterButton.show();
                    this.filterButton.hide();
                    this.filterField.setValue("");
                    this.filterField.show();

                    this.filterField.focus();

                    this.first.hide();
                    this.prev.hide();
                    this.numberItem.hide();
                    this.spacer.hide();
                    this.afterItem.hide();
                    this.next.hide();
                    this.last.hide();
                }.bind(this),
                scope: me,
                hidden: this.inSearch || pagingData.total < 30
            });

        this.cancelFilterButton = new Ext.button.Button(
            {
                itemId: 'cancelFlterButton',
                tooltip: t("clear"),
                overflowText: t("clear"),
                margin: '-1 2 3 2',
                iconCls: Ext.baseCSSPrefix + 'tbar-page-cancel-filter',
                handler: function () {
                    this.doCancelSearch(node);

                }.bind(this),
                scope: me,
                hidden: !this.inSearch
            });

        this.afterItem = Ext.create('Ext.form.NumberField', {

            cls: Ext.baseCSSPrefix + 'tbar-page-number',
            value: Math.ceil(pagingData.total / pagingData.limit),
            hideTrigger: true,
            heightLabel: true,
            height: 18,
            width: 38,
            disabled: true,
            margin: '-1 2 3 2',
            hidden: hidePagination
        });


        this.numberItem = new Ext.form.field.Number({
            xtype: 'numberfield',
            itemId: 'inputItem',
            name: 'inputItem',
            heightLabel: true,
            cls: Ext.baseCSSPrefix + 'tbar-page-number',
            allowDecimals: false,
            minValue: 1,
            maxValue: this.getMaxPageNum(),
            value: currPage,
            hideTrigger: true,
            enableKeyEvents: true,
            keyNavEnabled: false,
            selectOnFocus: true,
            submitValue: false,
            height: 18,
            width: 40,
            isFormField: false,
            margin: '-1 2 3 2',
            listeners: inputListeners,
            hidden: hidePagination
        });


        this.first = new Ext.button.Button(
            {
                itemId: 'first',
                tooltip: me.firstText,
                overflowText: me.firstText,
                iconCls: Ext.baseCSSPrefix + 'tbar-page-first',
                disabled: me.node.pagingData.offset == 0,
                handler: me.moveFirst,
                scope: me,
                border: false,
                hidden: hidePagination

            });


        this.prev = new Ext.button.Button({
            itemId: 'prev',
            tooltip: me.prevText,
            overflowText: me.prevText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
            disabled: me.node.pagingData.offset == 0,
            handler: me.movePrevious,
            scope: me,
            border: false,
            hidden: hidePagination
        });


        this.spacer = new Ext.toolbar.Spacer({
            xtype: "tbspacer",
            hidden: hidePagination
        });


        this.next = new Ext.button.Button({
            itemId: 'next',
            tooltip: me.nextText,
            overflowText: me.nextText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
            disabled: (Math.ceil(me.node.pagingData.total / me.node.pagingData.limit) - 1) * me.node.pagingData.limit == me.node.pagingData.offset,
            handler: me.moveNext,
            scope: me,
            hidden: hidePagination
        });


        this.last = new Ext.button.Button({
            itemId: 'last',
            tooltip: me.lastText,
            overflowText: me.lastText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-last',
            disabled: (Math.ceil(me.node.pagingData.total / me.node.pagingData.limit) - 1) * me.node.pagingData.limit == me.node.pagingData.offset,
            handler: me.moveLast,
            scope: me,
            hidden: hidePagination
        });


        result.push(this.overflow);
        result.push(this.filterButton);
        result.push(this.cancelFilterButton);

        result.push(this.filterField);
        result.push(this.first);
        result.push(this.prev);
        result.push(this.numberItem);
        result.push(this.spacer);
        result.push(this.afterItem);
        result.push(this.next);
        result.push(this.last);


        return result;
    },

    getMaxPageNum: function() {
        var me = this;
        return Math.ceil(me.node.pagingData.total / me.node.pagingData.limit)
    },

    initComponent: function(config) {
        var me = this,
            userItems = me.items || me.buttons || [],
            pagingItems;

        pagingItems = me.getPagingItems();
        if (me.prependButtons) {
            me.items = userItems.concat(pagingItems);
        } else {
            me.items = pagingItems.concat(userItems);
        }
        delete me.buttons;
        if (me.displayInfo) {
            me.items.push('->');
            me.items.push({
                xtype: 'tbtext',
                itemId: 'displayItem'
            });
        }
        me.callParent();
    },


    getInputItem: function() {
        return this.child('#inputItem');
    },


    onPagingBlur: function(e) {
        var inputItem = this.getInputItem(),
            curPage;
        if (inputItem) {
            //curPage = this.getPageData().currentPage;
            //inputItem.setValue(curPage);
        }
    },

    onPagingKeyDown: function(field, e) {
        this.processKeyEvent(field, e);
    },

    readPageFromInput: function() {
        var inputItem = this.getInputItem(),
            pageNum = false,
            v;
        if (inputItem) {
            v = inputItem.getValue();
            pageNum = parseInt(v, 10);
        }
        return pageNum;
    },


    processKeyEvent: function(field, e) {
        var me = this,
            k = e.getKey(),
        //pageData = me.getPageData(),
            increment = e.shiftKey ? 10 : 1,
            pageNum;
        if (k == e.RETURN) {
            e.stopEvent();
            pageNum = me.readPageFromInput();
            if (pageNum !== false) {
                pageNum = Math.min(Math.max(1, pageNum), this.getMaxPageNum());
                this.moveToPage(pageNum);
            }


        } else if (k == e.HOME) {
            e.stopEvent();
            this.moveFirst();
        } else if (k == e.END) {
            e.stopEvent();
            this.moveLast();
        } else if (k == e.UP || k == e.PAGE_UP || k == e.DOWN || k == e.PAGE_DOWN) {
            e.stopEvent();
            pageNum = me.readPageFromInput();
            if (pageNum) {
                if (k == e.DOWN || k == e.PAGE_DOWN) {
                    increment *= -1;
                }
                pageNum += increment;
                if (pageNum >= 1 && pageNum <= this.getMaxPageNum()) {
                    this.moveToPage(pageNum);
                }
            }
        }
    },

    moveToPage: function(page) {
        var me = this;
        var node = me.node;
        var pagingData = node.pagingData;
        var store = node.getTreeStore();

        var proxy = store.getProxy();
        proxy.setExtraParam("start",  pagingData.limit * (page - 1));
        proxy.setExtraParam("fromPaging", 1);
        store.load({
            node: node
        });
    },

    moveFirst: function() {
        var me = this;
        var node = me.node;
        var pagingData = node.pagingData;
        var store = node.getTreeStore();
        var page = pagingData.offset / pagingData.total;

        var proxy = store.getProxy();
        proxy.setExtraParam("start", 0);
        store.load({
            node: node
        });
    },

    movePrevious: function() {
        var me = this;
        var node = me.node;
        var pagingData = node.pagingData;
        var store = node.getTreeStore();
        var page = pagingData.offset / pagingData.total;

        var proxy = store.getProxy();
        proxy.setExtraParam("start", pagingData.offset - pagingData.limit);
        store.load({
            node: node
        });
    },

    moveNext: function() {
        var me = this;
        var node = me.node;
        var pagingData = node.pagingData;
        var store = node.getTreeStore();
        var page = pagingData.offset / pagingData.total;

        var proxy = store.getProxy();
        proxy.setExtraParam("start", pagingData.offset + pagingData.limit);
        store.load({
            node: node
        });

    },

    moveLast: function() {
        var me = this;
        var node = me.node;
        var pagingData = node.pagingData;
        var store = node.getTreeStore();
        var offset = (Math.ceil(pagingData.total / pagingData.limit) - 1) * pagingData.limit;

        var proxy = store.getProxy();
        proxy.setExtraParam("start", offset);
        store.load({
            node: node
        });
    },

    doRefresh: function() {
        var me = this;
        var node = me.node;
        var pagingData = node.pagingData;
        var store = node.getTreeStore();
        var page = pagingData.offset / pagingData.total;

        var proxy = store.getProxy();
        proxy.setExtraParam("start", pagingData.offset);
        store.load({
            node: node
        });
    },

    onDestroy: function() {
        //this.bindStore(null);
        this.callParent();
    }
});

/**
 * Fixes ID validation to include more characters as we need the colon for nested editable names
 *
 * See:
 *
 * - http://www.sencha.com/forum/showthread.php?296173-validIdRe-throwing-Invalid-Element-quot-id-quot-for-valid-ids-containing-colons
 * - https://github.com/JarvusInnovations/sencha-hotfixes/blob/ext/5/0/1/1255/overrides/dom/Element/ValidId.js
 */
Ext.define('EXTJS-17231.ext.dom.Element.validIdRe', {
    override: 'Ext.dom.Element',

    validIdRe: /^[a-z][a-z0-9\-_:.]*$/i,

    getObservableId: function () {
        return (this.observableId = this.callParent().replace(/([.:])/g, "\\$1"));
    }
});

//Fix - Date picker does not align to component in scrollable container and breaks view layout randomly.
Ext.override(Ext.picker.Date, {
        afterComponentLayout: function (width, height, oldWidth, oldHeight) {
        var field = this.pickerField;
        this.callParent([
            width,
            height,
            oldWidth,
            oldHeight
        ]);
        // Bound list may change size, so realign on layout
        // **if the field is an Ext.form.field.Picker which has alignPicker!**
        if (field && field.alignPicker) {
            field.alignPicker();
        }
    }
});


/** workaround for [DataObject] Advanced Image Dropzone only works once #9115
 * Issue: on node drop the component gets destroyed. On mouse up it then tries to focus an already destroyed element.
 */
Ext.override(Ext.dom.Element, {
    focus: function (defer, dom) {

        var me = this;

        dom = dom || me.dom;

        if (Number(defer)) {
            Ext.defer(me.focus, defer, me, [null, dom]);
        } else {
            Ext.fireEvent('beforefocus', dom);
            if (dom) {
                dom.focus();
            }
        }

        return me;
    }
});

/**
 * A specialized {@link Ext.view.BoundListKeyNav} implementation for navigating in the quicksearch.
 * This is needed because in the default implementation the Crtl+A combination is disabled, but this is needed
 * for the purpose of the quicksearch
 */
Ext.define('Pimcore.view.BoundListKeyNav', {
    extend: 'Ext.view.BoundListKeyNav',

    alias: 'view.navigation.quicksearch.boundlist',

    initKeyNav: function(view) {
        var me = this,
            field = view.pickerField;

        // Add the regular KeyNav to the view.
        // Unless it's already been done (we may have to defer a call until the field is rendered.
        if (!me.keyNav) {
            me.callParent([view]);

            // Add ESC handling to the View's KeyMap to collapse the field
            me.keyNav.map.addBinding({
                key: Ext.event.Event.ESC,
                fn: me.onKeyEsc,
                scope: me
            });
        }

        // BoundLists must be able to function standalone with no bound field
        if (!field) {
            return;
        }

        if (!field.rendered) {
            field.on('render', Ext.Function.bind(me.initKeyNav, me, [view], 0), me, {single: true});
            return;
        }

        // BoundListKeyNav also listens for key events from the field to which it is bound.
        me.fieldKeyNav = new Ext.util.KeyNav({
            disabled: true,
            target: field.inputEl,
            forceKeyDown: true,
            up: me.onKeyUp,
            down: me.onKeyDown,
            right: me.onKeyRight,
            left: me.onKeyLeft,
            pageDown: me.onKeyPageDown,
            pageUp: me.onKeyPageUp,
            home: me.onKeyHome,
            end: me.onKeyEnd,
            tab: me.onKeyTab,
            space: me.onKeySpace,
            enter: me.onKeyEnter,
            // This object has to get its key processing in first.
            // Specifically, before any Editor's key hyandling.
            priority: 1001,
            scope: me
        });
    }
});

/**
 * Workaround to fix the rowEditing not fully showing the buttons (Update/Cancel) when there are 2 rows.
 *
 * See:
 * - https://forum.sencha.com/forum/showthread.php?305665-RowEditing-Buttons-not-visible&p=1317756&viewfull=1#post1317756
 */
Ext.define('Ext.overrides.grid.RowEditor', {
    override: 'Ext.grid.RowEditor',

    showTipBelowRow: true,

    syncButtonPosition: function (context) {
        var me = this,
            scrollDelta = me.getScrollDelta(),
            floatingButtons = me.getFloatingButtons(),
            scrollingView = me.scrollingView,
        // If this is negative, it means we're not scrolling so lets just ignore it
            scrollHeight = Math.max(0, me.scroller.getSize().y - me.scroller.getClientSize().y),
            overflow = scrollDelta - (scrollHeight - me.scroller.getPosition().y);
        floatingButtons.show();
        // If that's the last visible row, buttons should be at the top regardless of scrolling,
        // but not if there is just one row which is both first and last.
        if (overflow > 0 || (context.rowIdx > 1 && context.isLastRenderedRow())) {
            if (!me._buttonsOnTop) {
                floatingButtons.setButtonPosition('top');
                me._buttonsOnTop = true;
                me.layout.setAlign('bottom');
                me.updateLayout();
            }
            scrollDelta = 0;
        } else if (me._buttonsOnTop !== false) {
            floatingButtons.setButtonPosition('bottom');
            me._buttonsOnTop = false;
            me.layout.setAlign('top');
            me.updateLayout();
        } else // Ensure button Y position is synced with Editor height even if button
            // orientation doesn't change
        {
            floatingButtons.setButtonPosition(floatingButtons.position);
        }
        return scrollDelta;
    },
});

Ext.define('Ext.local.grid.filters.filter.TriFilter', {
    extend: 'Ext.grid.filters.filter.TriFilter',
    menuItems: [
        'lt',
        'gt',
        '-',
        'eq',
        'in'
    ],
    constructor: function(config) {
        var me = this,
            stateful = false,
            filter = {},
            filterGt, filterLt, filterEq, filterIn, value, operator;
        me.callParent([
            config
        ]);
        value = me.value;
        filterLt = me.getStoreFilter('lt');
        filterGt = me.getStoreFilter('gt');
        filterEq = me.getStoreFilter('eq');
        filterIn = me.getStoreFilter('in');

        if (filterLt || filterGt || filterEq || filterIn) {
            stateful = me.active = true;
            if (filterLt) {
                me.onStateRestore(filterLt);
            }
            if (filterGt) {
                me.onStateRestore(filterGt);
            }
            if (filterEq) {
                me.onStateRestore(filterEq);
            }
            if (filterIn) {
                me.onStateRestore(filterIn);
            }
        } else {
            if (me.grid.stateful && me.getGridStore().saveStatefulFilters) {
                value = undefined;
            }
            me.active = me.getActiveState(config, value);
        }
        filter.lt = filterLt || me.createFilter({
            operator: 'lt',
            value: (!stateful && value && value.lt) || null
        }, 'lt');
        filter.gt = filterGt || me.createFilter({
            operator: 'gt',
            value: (!stateful && value && value.gt) || null
        }, 'gt');
        filter.eq = filterEq || me.createFilter({
            operator: 'eq',
            value: (!stateful && value && value.eq) || null
        }, 'eq');
        filter.in = filterIn || me.createFilter({
            operator: 'in',
            type: 'numeric',
            value: (!stateful && value && value.in) || null
        }, 'in');
        me.filter = filter;
        if (me.active) {
            me.setColumnActive(true);
            if (!stateful) {
                for (operator in value) {
                    me.addStoreFilter(me.filter[operator]);
                }
            }
        }
    },
    setValue: function(value) {
        var me = this,
            filters = me.filter,
            add = [],
            remove = [],
            active = false,
            filterCollection = me.getGridStore().getFilters(),
            field, filter, v, i, len, rLen, aLen;
        if (me.preventFilterRemoval) {
            return;
        }
        me.preventFilterRemoval = true;
        if ('eq' in value) {
            v = filters.lt.getValue();
            if (v || v === 0) {
                remove.push(filters.lt);
            }
            v = filters.gt.getValue();
            if (v || v === 0) {
                remove.push(filters.gt);
            }
            v = filters.in.getValue();
            if (v || v === 0) {
                remove.push(filters.in);
            }
            v = value.eq;
            if (v || v === 0) {
                add.push(filters.eq);
                filters.eq.setValue(v);
            } else {
                remove.push(filters.eq);
            }
        } else {
            v = filters.eq.getValue();
            if (v || v === 0) {
                remove.push(filters.eq);
            }
            if ('lt' in value) {
                v = value.lt;
                if (v || v === 0) {
                    add.push(filters.lt);
                    filters.lt.setValue(v);
                } else {
                    remove.push(filters.lt);
                }
            }
            if ('gt' in value) {
                v = value.gt;
                if (v || v === 0) {
                    add.push(filters.gt);
                    filters.gt.setValue(v);
                } else {
                    remove.push(filters.gt);
                }
            }
            if ('in' in value) {
                v = value.in;
                if (typeof v === "object" && v[0][0] == '') {
                    remove.push(filters.in);
                } else if (v || v === 0) {
                    add.push(filters.in);
                    filters.in.setValue(v);
                } else {
                    remove.push(filters.in);
                }
            }
        }
        rLen = remove.length;
        aLen = add.length;
        active = !!(me.countActiveFilters() + aLen - rLen);
        if (rLen || aLen || active !== me.active) {
            filterCollection.beginUpdate();
            if (rLen) {
                for (i = 0; i < rLen; i++) {
                    filter = remove[i];
                    me.fields[filter.getOperator()].setValue(null);
                    filter.setValue(null);
                    me.removeStoreFilter(filter);
                }
            }
            if (aLen) {
                for (i = 0; i < aLen; i++) {
                    me.addStoreFilter(add[i]);
                }
            }
            me.setActive(active);
            filterCollection.endUpdate();
        }
        me.preventFilterRemoval = false;
    }
});

Ext.define('Ext.grid.filters.filter.Number', {
    extend: 'Ext.local.grid.filters.filter.TriFilter',
    alias: ['grid.filter.number', 'grid.filter.numeric'],

    uses: ['Ext.form.field.Number'],

    type: 'number',

    config: {
        fields: {
            gt: {
                iconCls: Ext.baseCSSPrefix + 'grid-filters-gt',
                margin: '0 0 3px 0'
            },
            lt: {
                iconCls: Ext.baseCSSPrefix + 'grid-filters-lt',
                margin: '0 0 3px 0'
            },
            eq: {
                iconCls: Ext.baseCSSPrefix + 'grid-filters-eq',
                margin: '0 0 3px 0'
            },
            in: {
                iconCls: Ext.baseCSSPrefix + 'grid-filters-find',
                margin: 0
            }
        }
    },

    itemDefaults: {
        enableKeyEvents: true,
        hideEmptyLabel: false,
        labelSeparator: '',
        labelWidth: 29,
        selectOnFocus: false
    },

    menuDefaults: {
        bodyPadding: 3,
        showSeparator: false
    },

    createMenu: function() {
        var me = this,
            listeners = {
                scope: me,
                keyup: me.onValueChange,
                spin: {
                    fn: me.onInputSpin,
                    buffer: 200
                },
                el: {
                    click: me.stopFn
                }
            },
            itemDefaults = me.getItemDefaults(),
            menuItems = me.menuItems,
            fields = me.getFields(),
            field, i, len, key, item, cfg;

        me.callParent();

        me.fields = {};

        for (i = 0, len = menuItems.length; i < len; i++) {
            key = menuItems[i];

            if (key !== '-' && key !== 'in') {
                itemDefaults.xtype = 'numberfield';
                field = fields[key];

                cfg = {
                    labelClsExtra: Ext.baseCSSPrefix + 'grid-filters-icon ' + field.iconCls,
                    emptyText: 'Enter Number...'
                };

                if (itemDefaults) {
                    Ext.merge(cfg, itemDefaults);
                }

                Ext.merge(cfg, field);
                cfg.emptyText = cfg.emptyText || me.emptyText;
                delete cfg.iconCls;

                me.fields[key] = item = me.menu.add(cfg);

                item.filter = me.filter[key];
                item.filterKey = key;
                item.on(listeners);
            } else if (key === 'in') {
                itemDefaults.xtype = 'textfield';
                field = fields.in;

                cfg = {
                    labelClsExtra: Ext.baseCSSPrefix + 'grid-filters-icon ' + field.iconCls,
                    emptyText: 'Enter Numbers...'
                };

                if (itemDefaults) {
                    Ext.merge(cfg, itemDefaults);
                }

                Ext.merge(cfg, field);
                cfg.emptyText = cfg.emptyText || me.emptyText;
                delete cfg.iconCls;

                me.fields[key] = item = me.menu.add(cfg);

                item.filter = me.filter[key];
                item.filterKey = key;
                item.on(listeners);
            }
            else {
                me.menu.add(key);
            }
        }
    },
    getValue: function(field) {
        var value = {};

        value[field.filterKey] = field.getValue();

        return value;
    },
    onInputSpin: function(field, direction) {
        var value = {};

        value[field.filterKey] = field.getValue();

        this.setValue(value);
    },
    stopFn: function(e) {
        e.stopPropagation();
    }
});



/**
 * @private
 */
Ext.define('Ext.pimcore.slider.Milestone', {
    extend: 'Ext.slider.Multi',

    requires: [
        'Ext.slider.Multi'
    ],

    startDate: null,
    thumbsToRender: [],
    activeThumb: null,

    initComponent: function() {
        this.useTips = true;
        this.tipText = function(thumb){
            var date = new Date(thumb.value * 1000);
            return Ext.Date.format(date, pimcore.globalmanager.get('localeDateTime').getShortTimeFormat());
        };

        this.callParent();

        if(this.startDate) {
            this.initDate(this.startDate);
        }

        this.increment = 20;
        this.thumbs = [];
        this.constrainThumbs = false;
        this.clickToChange = false;

        this.initDefaultListeners();
    },

    initDefaultListeners: function() {

        this.addListener('change', function(slider, newValue, thumb, eOpts) {
            if(typeof thumb.moveCallback === "function") {
                thumb.moveCallback(newValue);
            }

        });

        this.addListener('render', function() {
            for(var i = 0; i < this.thumbsToRender.length; i++) {
                this.attachListenersToThumb(this.thumbsToRender[i]);
            }

            this.thumbsToRender = [];
            if(this.activeThumb) {
                this.activateThumb(this.activeThumb);
            }
        }.bind(this));

    },

    initDate: function(date) {
        this.removeThumbs();

        this.startDate = date;
        var startDate = date.getTime() / 1000;
        this.setMinValue(startDate);
        this.setMaxValue(startDate + 86399);


    },

    addTimestamp: function(timestamp, key, moveCallback, clickCallback, deleteCallback) {
        var thumb = this.addThumb(timestamp);
        thumb.key = key;
        thumb.moveCallback = moveCallback;
        thumb.deleteCallback = deleteCallback;
        thumb.clickCallback = clickCallback;

        if(this.rendered) {
            this.attachListenersToThumb(thumb);
        } else {
            this.thumbsToRender.push(thumb);
        }

        return thumb;
    },

    attachListenersToThumb: function(thumb) {

        var domElement = thumb.el;

        if(typeof thumb.clickCallback === "function") {
            domElement.on('click', function(thumb) {
                this.activateThumb(thumb);
            }.bind(this, thumb));
        }

        domElement.on("contextmenu", function (e) {
            var menu = new Ext.menu.Menu();
            menu.add(new Ext.menu.Item({
                text: t('delete'),
                iconCls: "pimcore_icon_delete",
                handler: function (thumb, item) {
                    thumb.deleteCallback(thumb.key);
                    this.removeThumb(thumb);
                }.bind(this, thumb)
            }));
            menu.showAt(e.getXY());
            menu.setZIndex(20000);

            e.stopEvent();
        }.bind(this));

    },

    activateThumb: function(thumb) {
        this.activeThumb = thumb;
        if(this.rendered) {
            for(var i = 0; i < this.thumbs.length; i++) {
                if(this.thumbs[i].el) {
                    this.thumbs[i].el.removeCls('selected');
                }
            }
            thumb.el.addCls('selected');
            thumb.clickCallback(thumb.key);
        }
    },

    activateThumbByValue: function(value) {
        for(var i = 0; i < this.thumbs.length; i++) {
            if(this.thumbs[i].value == value) {
                this.activateThumb(this.thumbs[i]);
                return;
            }
        }
    },

    removeThumbs: function() {
        this.thumbsToRender = [];
        for(var i = 0; i < this.thumbs.length; i++) {
            this.thumbs[i].destroy();
        }
        this.thumbs = [];
        this.thumbStack = null;
    },

    removeThumb: function(thumb) {
        thumb.destroy();

        var index = this.thumbs.indexOf(thumb);
        if (index !== -1) {
            this.thumbs.splice(index, 1);
        }
    },

    //needs to be overwritten in order to handle no thumbs available
    onClickChange : function(trackPoint) {
        var me = this,
            thumb, index;

        // How far along the track *from the origin* was the click.
        // If vertical, the origin is the bottom of the slider track.

        //find the nearest thumb to the click event
        thumb = me.getNearest(trackPoint);
        if (thumb && !thumb.disabled) {
            index = thumb.index;
            me.setValue(index, Ext.util.Format.round(me.reversePixelValue(trackPoint), me.decimalPrecision), undefined, true);
        }
    }
});


/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.element.tag.imagehotspotmarkereditor");
/**
 * @private
 */
pimcore.element.tag.imagehotspotmarkereditor = Class.create({

    initialize: function (imageId, data, saveCallback, config) {
        this.imageId = imageId;
        this.data = data;
        this.saveCallback = saveCallback;
        this.modal = true;
        this.config = typeof config != "undefined" ? config : {};
        this.context = this.config.context ? this.config.context : {};
        this.predefinedDataTemplates = this.config.predefinedDataTemplates ? this.config.predefinedDataTemplates : {};
        this.context.scope = "hotspotEditor";

        // we need some space for the surrounding area (button, dialog frame, etc...)
        this.width = Math.min(1000, window.innerWidth - 100);
        this.height = Math.min(800, window.innerHeight - 180);

    },

    open: function (modal) {
        var validImage = (typeof this.imageId != "undefined" && this.imageId !== null),
            imageUrl = Routing.generate('pimcore_admin_asset_getimagethumbnail', {id: this.imageId, width: this.width, height: this.height, contain: true});

        if (this.config.crop) {
            imageUrl = imageUrl + '&' + Ext.urlEncode(this.config.crop);
        }

        if (typeof modal != "undefined") {
            this.modal = modal;
        }

        this.hotspotStore = [];
        this.hotspotMetaData = {};

        var markerConfig = this.getButtonConfig("marker", "pimcore_icon_overlay_add");
        var hotspotConfig = this.getButtonConfig("hotspot", "pimcore_icon_image_region pimcore_icon_overlay_add");

        this.hotspotWindow = new Ext.Window({
            width: this.width + 100,
            height: this.height + 100,
            modal: this.modal,
            closeAction: "destroy",
            autoDestroy: true,
            resizable: false,
            bodyStyle: "background: url('/bundles/pimcoreadmin/img/tree-preview-transparent-background.png');",
            tbar: {
                overflowHandler: 'menu',
                items:
                    [
                        markerConfig,
                        hotspotConfig
                    ]
            },
            bbar: {
                overflowHandler: 'menu',
                items: ["->", {
                    xtype: "button",
                    iconCls: "pimcore_icon_apply",
                    text: t("save"),
                    handler: function () {

                        var el;
                        var dataHotspot = [];
                        var dataMarker = [];

                        var windowId = this.hotspotWindow.getId();
                        var windowEl = Ext.getCmp(windowId).body;
                        var originalWidth = windowEl.getWidth(true);
                        var originalHeight = windowEl.getHeight(true);

                        for (var i = 0; i < this.hotspotStore.length; i++) {
                            el = this.hotspotStore[i];

                            if (Ext.get(el["id"])) {
                                var theEl = Ext.get(el["id"]);
                                var dimensions = theEl.getStyle(["top", "left", "width", "height"]);
                                var name = Ext.get(el["id"]).getAttribute("title");
                                var metaData = [];
                                if (this.hotspotMetaData && this.hotspotMetaData[el["id"]]) {
                                    metaData = this.hotspotMetaData[el["id"]];
                                }

                                if (el.type == "marker") {
                                    dataMarker.push({
                                        top: (intval(dimensions.top) + 35) * 100 / originalHeight, //the marker el is 35px high
                                        left: (intval(dimensions.left) + 12) * 100 / originalWidth,//the marker el is 25px wide
                                        data: metaData,
                                        name: name
                                    });
                                } else if (el.type == "hotspot") {
                                    dataHotspot.push({
                                        top: intval(dimensions.top) * 100 / originalHeight,
                                        left: intval(dimensions.left) * 100 / originalWidth,
                                        width: intval(dimensions.width) * 100 / originalWidth,
                                        height: intval(dimensions.height) * 100 / originalHeight,
                                        data: metaData,
                                        name: name
                                    });
                                }
                            }
                        }

                        this.data.hotspots = dataHotspot;
                        this.data.marker = dataMarker;

                        if (typeof this.saveCallback == "function") {
                            this.saveCallback(this.data);
                        }

                        this.hotspotWindow.close();
                    }.bind(this)
                }]
            },
            html: validImage ? '<img id="hotspotImage" src="' + imageUrl + '" />' : '<span style="padding:10px;">' + t("no_data_to_display") + '</span>'
        });

        this.hotspotWindowInitCount = 0;

        this.hotspotWindow.on("afterrender", function () {
            this.hotspotWindowInterval = window.setInterval(function () {
                var el = Ext.get("hotspotImage");
                if (!el) {
                    clearInterval(this.hotspotWindowInterval);
                    return;
                }
                var imageWidth = el.getWidth();
                var imageHeight = el.getHeight();
                var i;
                var elId;

                if (el) {
                    if (el.getWidth() > 30) {
                        clearInterval(this.hotspotWindowInterval);
                        this.hotspotWindowInitCount = 0;

                        var winBodyInnerSize = this.hotspotWindow.body.getSize();
                        var winOuterSize = this.hotspotWindow.getSize();
                        var paddingWidth = winOuterSize["width"] - winBodyInnerSize["width"];
                        var paddingHeight = winOuterSize["height"] - winBodyInnerSize["height"];

                        this.hotspotWindow.setSize(imageWidth + paddingWidth, imageHeight + paddingHeight);
                        //Ext.get("hotspotImage").remove();

                        if (this.data && this.data["hotspots"]) {
                            for (i = 0; i < this.data.hotspots.length; i++) {
                                elId = this.addHotspot(this.data.hotspots[i]);
                                if (this.data.hotspots[i]["data"]) {
                                    this.hotspotMetaData[elId] = this.data.hotspots[i]["data"];
                                }
                            }
                        }

                        if (this.data && this.data["marker"]) {
                            for (i = 0; i < this.data.marker.length; i++) {
                                elId = this.addMarker(this.data.marker[i]);
                                if (this.data.marker[i]["data"]) {
                                    this.hotspotMetaData[elId] = this.data.marker[i]["data"];
                                }
                            }
                        }

                        return;

                    } else if (this.hotspotWindowInitCount > 60) {
                        // if more than 30 secs cancel and close the window
                        this.hotspotWindow.close();
                    }

                    this.hotspotWindowInitCount++;
                }
            }.bind(this), 500);

        }.bind(this));

        this.hotspotWindow.show();
    },

    addMarker: function (config) {

        var markerId = "marker-" + (this.hotspotStore.length + 1);
        this.hotspotWindow.body.getFirstChild().insertHtml("beforeEnd", '<div id="' + markerId
            + '" class="pimcore_image_marker"></div>');

        var markerEl = Ext.get(markerId);

        if (typeof config == "object") {
            if (config["top"]) {
                var windowId = this.hotspotWindow.getId();
                var windowEl = Ext.getCmp(windowId).body;
                var originalWidth = windowEl.getWidth(true);
                var originalHeight = windowEl.getHeight(true);

                markerEl.applyStyles({
                    top: (originalHeight * (config["top"] / 100) - 35) + "px",
                    left: (originalWidth * (config["left"] / 100) - 12) + "px"
                });
            }

            if (config["name"]) {
                markerEl.dom.setAttribute("title", config["name"]);
            }
        }

        this.addMarkerHotspotContextMenu(markerId, "marker", markerEl);

        var markerDD = new Ext.dd.DD(markerEl);
        this.hotspotStore.push({
            id: markerId,
            type: "marker"
        });

        return markerId;
    },

    addHotspot: function (config) {
        var hotspotId = "hotspot-" + (this.hotspotStore.length + 1);

        this.hotspotWindow.add(
            {
                xtype: 'component',
                id: hotspotId,
                resizable: {
                    target: hotspotId,
                    pinned: true,
                    minWidth: 20,
                    minHeight: 20,
                    preserveRatio: false,
                    dynamic: true,
                    handles: 'all'
                },
                style: "cursor:move;",
                draggable: true,
                cls: 'pimcore_image_hotspot'
            });

        var hotspotEl = Ext.get(hotspotId);

        // default dimensions
        hotspotEl.applyStyles({
            width: "50px",
            height: "50px"
        });

        if (typeof config == "object") {
            if (config["top"]) {
                var windowId = this.hotspotWindow.getId();
                var windowEl = Ext.getCmp(windowId).body;
                var originalWidth = windowEl.getWidth(true);
                var originalHeight = windowEl.getHeight(true);

                hotspotEl.applyStyles({
                    top: (originalHeight * (config["top"] / 100)) + "px",
                    left: (originalWidth * (config["left"] / 100)) + "px",
                    width: (originalWidth * (config["width"] / 100)) + "px",
                    height: (originalHeight * (config["height"] / 100)) + "px"
                });
            }

            if (config["name"]) {
                hotspotEl.dom.setAttribute("title", config["name"]);
            }
        }

        this.addMarkerHotspotContextMenu(hotspotId, "hotspot", hotspotEl);

        this.hotspotStore.push({
            id: hotspotId,
            type: "hotspot"
        });

        return hotspotId;
    },

    addMarkerHotspotContextMenu: function (id, type, el) {
        el.on("contextmenu", function (id, e) {
            var menu = new Ext.menu.Menu();

            menu.add(new Ext.menu.Item({
                text: t("add_data"),
                iconCls: "pimcore_icon_metadata pimcore_icon_overlay_add",
                handler: function (id, item) {
                    item.parentMenu.destroy();

                    this.editMarkerHotspotData(id);
                }.bind(this, id)
            }));

            menu.add(new Ext.menu.Item({
                text: t("remove"),
                iconCls: "pimcore_icon_delete",
                handler: function (id, type, item) {
                    item.parentMenu.destroy();
                    if (type == "hotspot") {
                        var cmp = Ext.getCmp(id);
                        this.hotspotWindow.remove(cmp);
                    } else {
                        var el = Ext.get(id);
                        el.remove();
                    }

                }.bind(this, id, type)
            }));


            menu.add(new Ext.menu.Item({
                text: t("clone"),
                iconCls: "pimcore_icon_copy",
                handler: function (id, type, item) {
                    item.parentMenu.destroy();

                    var el = Ext.get(id);
                    var copiedData = this.hotspotMetaData[id] ? this.hotspotMetaData[id].slice() : [];

                    var windowId = this.hotspotWindow.getId();
                    var windowEl = Ext.getCmp(windowId).body;
                    var originalWidth = windowEl.getWidth(true);
                    var originalHeight = windowEl.getHeight(true);

                    var dimensions = el.getStyle(["top", "left", "width", "height"]);

                    var config = {
                        data: copiedData,
                        name: el.getAttribute("title"),
                    };

                    if (type == "hotspot") {
                        config["top"] = (intval(dimensions.top) + 30) * 100 / originalHeight;
                        config["left"] = (intval(dimensions.left) + 30) * 100 / originalWidth;
                        config["width"] = intval(dimensions.width) * 100 / originalWidth;
                        config["height"] = intval(dimensions.height) * 100 / originalHeight;
                        var elId = this.addHotspot(config);
                    } else {
                        config["top"] = (intval(dimensions.top) + 30 + 35) * 100 / originalHeight;
                        config["left"] = (intval(dimensions.left) + 30 + 12) * 100 / originalWidth;
                        var elId = this.addMarker(config);
                    }
                    this.hotspotMetaData[elId] = copiedData;

                }.bind(this, id, type)
            }));

            menu.showAt(e.getXY());
            e.stopEvent();
        }.bind(this, id));
    },

    editMarkerHotspotData: function (id) {
        var nameField = new Ext.form.field.Text(
            {
                id: "name-field-" + id,
                value: Ext.get(id).getAttribute("title")
            }
        );
        var hotspotMetaDataWin = new Ext.Window({
            width: 600,
            height: 440,
            modal: this.modal,
            resizable: false,
            autoScroll: true,
            items: [{
                xtype: "form",
                itemId: "form",
                bodyStyle: "padding: 10px;"
            }],
            tbar: [{
                xtype: "button",
                iconCls: "pimcore_icon_add",
                menu: [{
                    text: t("textfield"),
                    iconCls: "pimcore_icon_input",
                    handler: function () {
                        addItem("textfield");
                    }
                }, {
                    text: t("textarea"),
                    iconCls: "pimcore_icon_textarea",
                    handler: function () {
                        addItem("textarea");
                    }
                }, {
                    text: t("checkbox"),
                    iconCls: "pimcore_icon_checkbox",
                    handler: function () {
                        addItem("checkbox");
                    }
                }, {
                    text: t("object"),
                    iconCls: "pimcore_icon_object",
                    handler: function () {
                        addItem("object");
                    }
                }, {
                    text: t("document"),
                    iconCls: "pimcore_icon_document",
                    handler: function () {
                        addItem("document");
                    }
                }, {
                    text: t("asset"),
                    iconCls: "pimcore_icon_asset",
                    handler: function () {
                        addItem("asset");
                    }
                }]
            }, "->", {
                xtype: "tbtext",
                text: t("name") + ":"
            },
                nameField
            ],
            buttons: [{
                text: t("save"),
                iconCls: "pimcore_icon_apply",
                handler: function (id) {

                    var form = hotspotMetaDataWin.getComponent("form").getForm();
                    var data = form.getFieldValues();
                    var normalizedData = [];

                    // when only one item is in the form
                    if (typeof data["name"] == "string") {
                        data = {
                            name: [data["name"]],
                            type: [data["type"]],
                            value: [data["value"]]
                        };
                    }

                    if (data && data["name"] && data["name"].length > 0) {
                        for (var i = 0; i < data["name"].length; i++) {

                            var listItem = {
                                name: data["name"][i],
                                value: data["value"][i],
                                type: data["type"][i]
                            };

                            normalizedData.push(listItem);
                        }
                    }


                    Ext.get(id).dom.setAttribute("title", Ext.getCmp("name-field-" + id).getValue());
                    this.hotspotMetaData[id] = normalizedData;

                    hotspotMetaDataWin.close();
                }.bind(this, id)
            }],
            listeners: {
                afterrender: function (id) {
                    if (this.hotspotMetaData && this.hotspotMetaData[id]) {
                        var data = this.hotspotMetaData[id];
                        for (var i = 0; i < data.length; i++) {
                            addItem(data[i]["type"], data[i]);
                        }
                    }
                }.bind(this, id)
            }
        });

        var addItem = function (hotspotMetaDataWin, type, data) {

            var id = "item-" + uniqid();
            var valueField;

            if (!data) {
                data = {
                    name: "",
                    value: ""
                };
            }

            if (type == "textfield") {
                valueField = {
                    xtype: "textfield",
                    name: "value",
                    fieldLabel: t("value"),
                    width: 500,
                    value: data["value"]
                };
            } else if (type == "textarea") {
                valueField = {
                    xtype: "textarea",
                    name: "value",
                    fieldLabel: t("value"),
                    width: 500,
                    value: data["value"]
                };
            } else if (type == "checkbox") {
                valueField = {
                    xtype: "checkbox",
                    name: "value",
                    fieldLabel: t("value"),
                    checked: data["value"]
                };
            } else if (type == "object" || type == "asset" || type == "document") {
                var textField = new Ext.form.TextField({
                    fieldCls: "pimcore_droptarget_input",
                    name: "value",
                    fieldLabel: t("value"),
                    value: data["value"],
                    width: 420,
                    listeners: {
                        render: this.addDataDropTarget.bind(this, type)
                    }
                });

                var items = [textField, {
                    xtype: "button",
                    iconCls: "pimcore_icon_edit",
                    handler: this.openElement.bind(this, textField, type)
                }, {
                    xtype: "button",
                    iconCls: "pimcore_icon_delete"
                    ,
                    handler: this.empty.bind(this, textField)
                }];

                if(pimcore.helpers.hasSearchImplementation()){
                    items.push({
                        xtype: "button",
                        iconCls: "pimcore_icon_search",
                        handler: this.openSearchEditor.bind(this, textField, type, hotspotMetaDataWin, nameField)
                    });
                }

                valueField = new Ext.form.FieldContainer({
                    items: items,
                    componentCls: "object_field",
                    layout: 'hbox'
                });

            } else {
                // no valid type
                return;
            }

            hotspotMetaDataWin.getComponent("form").add({
                xtype: 'panel',
                itemId: id,
                bodyStyle: "padding-top:10px",
                items: [{
                    xtype: "hidden",
                    name: "type",
                    value: type
                }, {
                    xtype: "textfield",
                    name: "name",
                    value: data["name"],
                    fieldLabel: t("name")
                }, valueField],
                tbar: ["->", {
                    iconCls: "pimcore_icon_delete",
                    handler: function (hotspotMetaDataWin, subComponen) {
                        var form = hotspotMetaDataWin.getComponent("form");
                        form.remove(form.getComponent(id));
                        hotspotMetaDataWin.updateLayout();
                    }.bind(this, hotspotMetaDataWin)
                }]
            });

            hotspotMetaDataWin.updateLayout();
        }.bind(this, hotspotMetaDataWin);

        hotspotMetaDataWin.show();
    },

    empty: function (textfield) {
        textfield.setValue("");
    },

    openElement: function (textfield, type) {
        var value = textfield.getValue();
        if (value) {
            pimcore.helpers.openElement(value, type);
        }
    },


    addDataDropTarget: function (type, el) {
        var drop = function (el, target, dd, e, data) {

            if(!pimcore.helpers.dragAndDropValidateSingleItem(data)) {
                return false;
            }

            data = data.records[0].data;
            if (data.elementType == type) {
                target.component.setValue(data.path);
                return true;
            } else {
                return false;
            }
        }.bind(this, el);

        var over = function (target, dd, e, data) {
            if (data.records.length === 1 && data.records[0].data.elementType == type) {
                return Ext.dd.DropZone.prototype.dropAllowed;
            }
            return Ext.dd.DropZone.prototype.dropNotAllowed;
        };

        if (typeof dndManager == "object") {
            // register at global DnD manager
            // in iframes, eg. document editmode
            dndManager.addDropTarget(el.getEl(), over, drop);
        } else {
            new Ext.dd.DropZone(el.getEl(), {
                reference: this,
                ddGroup: "element",
                getTargetFromEvent: function (e) {
                    return el.getEl();
                },
                onNodeOver: over,
                onNodeDrop: drop
            });
        }
    },

    openSearchEditor: function (textfield, type, hotspotMetaDataWin, nameField) {
        var allowedTypes = [];
        var allowedSpecific = {};
        var allowedSubtypes = {};

        allowedTypes.push(type);
        if (type == "object") {
            allowedSubtypes.object = ["object", "folder", "variant"];
        }

        var form = hotspotMetaDataWin.getComponent("form").getForm();
        var hotspotData = form.getFieldValues();

        var hotspotName = nameField.getValue();


        pimcore.helpers.itemselector(false, this.addDataFromSelector.bind(this, textfield), {
                type: allowedTypes,
                subtype: allowedSubtypes,
                specific: allowedSpecific
            },
            {
                context: Ext.apply(
                    {
                        hotspotName: hotspotName,
                        hotspotData: hotspotData
                    }, this.context)
            });
    },

    addDataFromSelector: function (textfield, data) {
        if (data) {
            textfield.setValue(data.fullpath);
        }
    }

    ,

    getButtonConfig: function (type, iconCls) {


        var callbackFunctionName = "add" + ucfirst(type);
        var callbackFunction = this[callbackFunctionName].bind(this);
        var textKey = "add_" + type;

        var buttonConfig = {
            xtype: "button",
            text: t(textKey),
            iconCls: iconCls,
            handler: function () {
                callbackFunction();
            }.bind(this)
        };

        if (this.predefinedDataTemplates[type] && Object.keys(this.predefinedDataTemplates[type]).length > 0) {
            buttonConfig.xtype = "splitbutton";
            var menu = [];

            Object.values(this.predefinedDataTemplates[type]).forEach(templateConfig => {
                var templateConfigName = templateConfig.name;
                var templateMenuName = templateConfig.menuName ?? templateConfigName;

                menu.push(
                    {
                        text: t(templateMenuName),
                        iconCls: "pimcore_icon_hotspotmarker_template",
                        handler: function (templateConfig) {
                            var elId = callbackFunction(templateConfig);
                            this.hotspotMetaData[elId] = templateConfig.data ? templateConfig.data.slice() : [];
                        }.bind(this, templateConfig)
                    }
                );
            });

            buttonConfig.menu = menu;
        }

        return buttonConfig;
    }


});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.element.tag.imagecropper");
/**
 * @private
 */
pimcore.element.tag.imagecropper = Class.create({

    initialize: function (imageId, data, saveCallback, config) {
        this.imageId = imageId;
        this.data = data;
        this.saveCallback = saveCallback;
        this.modal = true;

        this.ratioX = null;
        this.ratioY = null;
        this.preserveRatio = false;
        if(typeof config == "object") {
            if(config["ratioX"] && config["ratioY"]) {
                this.ratioX = config["ratioX"];
                this.ratioY = config["ratioY"];
                this.preserveRatio = true;
            }
        }
    },

    open: function (modal) {
        var validImage = (typeof this.imageId != "undefined" && this.imageId !== null),
            imageUrl = Routing.generate('pimcore_admin_asset_getimagethumbnail', {id: this.imageId, width: 500, height: 400, contain: true}),
            button = {};

        if(typeof modal != "undefined") {
            this.modal = modal;
        }

        if( validImage )
        {
            button = {
                xtype: "button",
                iconCls: "pimcore_icon_apply",
                text: t("save"),
                handler: function () {

                    var originalWidth = this.editWindow.body.getWidth();
                    var originalHeight = this.editWindow.body.getHeight();

                    var dimensions = Ext.get("selector").getStyle(["top","left","width","height"]);

                    var newWidth = intval(dimensions.width);
                    var newHeight = intval(dimensions.height);
                    var top = intval(dimensions.top);
                    var left = intval(dimensions.left);

                    this.data = {
                        cropWidth: newWidth * 100 / originalWidth,
                        cropHeight: newHeight * 100 / originalHeight,
                        cropTop: top * 100 / originalHeight,
                        cropLeft: left * 100 / originalWidth,
                        cropPercent: true
                    };

                    if(typeof this.saveCallback == "function") {
                        this.saveCallback(this.data);
                    }

                    this.editWindow.close();
                }.bind(this)
            }
        }
        this.editWindow = new Ext.Window({
            width: 500,
            height: 400,
            modal: this.modal,
            resizable: false,
            bodyStyle: "background: url('/bundles/pimcoreadmin/img/tree-preview-transparent-background.png');",
            bbar: ["->", button],
            html: validImage ? '<img id="selectorImage" src="' + imageUrl + '" />' : '<span style="padding:10px;">' + t("no_data_to_display") + '</span>'
        });

        var checkSize = function () {
            // this function checks if the selected area fits into the image
            var sel = Ext.get("selector");
            var dimensions;

            var windowId = this.editWindow.getId();
            var originalWidth = Ext.getCmp(windowId).getEl().getWidth(true);
            var originalHeight = Ext.getCmp(windowId).getEl().getHeight(true);

            var skip = false;

            while(!skip) {
                skip = true;
                dimensions = sel.getStyle(["top","left","width","height"]);

                if(intval(dimensions.top) < 0) {
                    sel.setStyle("top", "0");
                    skip = false;
                }
                if(intval(dimensions.left) < 0) {
                    sel.setStyle("left", "0");
                    skip = false;
                }
                if((intval(dimensions.left) + intval(dimensions.width)) > originalWidth) {
                    if(intval(dimensions.left) < originalWidth || intval(dimensions.left) > originalWidth) {
                        sel.setStyle("left", (originalWidth-intval(dimensions.width)) + "px");
                    }
                    if(intval(dimensions.width) > originalWidth) {
                        sel.setStyle("width", (originalWidth) + "px");
                    }
                    skip = false;
                }
                if((intval(dimensions.top) + intval(dimensions.height)) > originalHeight) {
                    if(intval(dimensions.top) < originalHeight || intval(dimensions.top) > originalHeight) {
                        sel.setStyle("top", (originalHeight-intval(dimensions.height)) + "px");
                    }
                    if(intval(dimensions.height) > originalHeight) {
                        sel.setStyle("height", (originalHeight) + "px");
                    }
                    skip = false;
                }
            }


            // check the ratio if given
            if(this.ratioX && this.ratioY) {
                dimensions = sel.getStyle(["width","height"]);

                var height = intval(dimensions.width) * (this.ratioY / this.ratioX);
                sel.setStyle("height", (height) + "px");
            }
        };

        if( validImage ) {

            this.editWindow.add({
                xtype: 'component',
                id: "selector",
                resizable: {
                    target: "selector",
                    pinned: true,
                    width: 100,
                    height: 100 / (this.ratioX / this.ratioY) || 100,
                    preserveRatio: this.preserveRatio,
                    dynamic: true,
                    handles: 'all',
                    listeners: {
                        resize: checkSize.bind(this)
                    }
                },
                style: "cursor:move; position: absolute; top: 10px; left: 10px;z-index:9000;",
                draggable: true,
                listeners: {
                    afterrender: function (el) {

                    }
                }
            });

        }

        this.editWindowInitCount = 0;

        this.editWindow.on("afterrender", function ( ){
            this.editWindowInterval = window.setInterval(function () {
                var el = Ext.get("selectorImage");

                if(el) {

                    var imageWidth = el.getWidth();
                    var imageHeight = el.getHeight();

                    if(el.getWidth() > 30) {
                        clearInterval(this.editWindowInterval);
                        this.editWindowInitCount = 0;

                        var winBodyInnerSize = this.editWindow.body.getSize();
                        var winOuterSize = this.editWindow.getSize();
                        var paddingWidth = winOuterSize["width"] - winBodyInnerSize["width"];
                        var paddingHeight = winOuterSize["height"] - winBodyInnerSize["height"];

                        this.editWindow.setSize(imageWidth + paddingWidth, imageHeight + paddingHeight);

                        //Ext.get("selectorImage").remove();

                        if(this.data && this.data["cropPercent"]) {
                            Ext.get("selector").applyStyles({
                                width: (imageWidth * (this.data.cropWidth / 100)) + "px",
                                height: (imageHeight * (this.data.cropHeight / 100)) + "px",
                                top: (imageHeight * (this.data.cropTop / 100)) + "px",
                                left: (imageWidth * (this.data.cropLeft / 100)) + "px"
                            });
                        }

                        return;

                    } else if (this.editWindowInitCount > 60) {
                        // if more than 30 secs cancel and close the window
                        this.editWindow.close();
                    }

                    this.editWindowInitCount++;
                } else {
                    clearInterval(this.editWindowInterval);
                }
            }.bind(this), 500);

        }.bind(this));

        this.editWindow.show();
    }

});



 /**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */


 /**
  * @private
  */
pimcore.edithelpers = {};

// disable reload & links, this function is here because it has to be in the header (body attribute)
function pimcoreOnUnload() {
    editWindow.protectLocation();
}

pimcore.edithelpers.frame = {
    active: false,
    topEl: null,
    bottomEl: null,
    rightEl: null,
    leftEl: null,
    timeout: null
};

 pimcore.edithelpers.pasteHtmlAtCaret = function (html, selectPastedContent) {
     var sel, range;
     if (window.getSelection) {
         // IE9 and non-IE
         sel = window.getSelection();
         if (sel.getRangeAt && sel.rangeCount) {
             range = sel.getRangeAt(0);
             range.deleteContents();

             // Range.createContextualFragment() would be useful here but is
             // only relatively recently standardized and is not supported in
             // some browsers (IE9, for one)
             var el = document.createElement("div");
             el.innerHTML = html;
             var frag = document.createDocumentFragment(), node, lastNode;
             while ((node = el.firstChild)) {
                 lastNode = frag.appendChild(node);
             }
             var firstNode = frag.firstChild;
             range.insertNode(frag);

             // Preserve the selection
             if (lastNode) {
                 range = range.cloneRange();
                 range.setStartAfter(lastNode);
                 if (selectPastedContent) {
                     range.setStartBefore(firstNode);
                 } else {
                     range.collapse(true);
                 }
                 sel.removeAllRanges();
                 sel.addRange(range);
             }
         }
     }
 };



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.elementservice.x");

/**
 * @private
 */
pimcore.elementservice.deleteElement = function (options) {
    var elementType = options.elementType;
    var url = Routing.getBaseUrl() + "/admin/"  + elementType + "/delete-info?";
    // check for dependencies
    Ext.Ajax.request({
        url: url,
        params: {id: options.id, type: elementType},
        success: pimcore.elementservice.deleteElementsComplete.bind(window, options)
    });
};

/**
 * @private
 */
pimcore.elementservice.deleteElementsComplete = function(options, response) {
    try {
        var res = Ext.decode(response.responseText);
        if (res.errors) {
            var message = res.batchDelete ? t('delete_error_batch') : t('delete_error');
            var hasDeleteable = true;

            if (res.itemResults) {
                var reasons = res.itemResults.filter(function (result) {
                    return !result.allowed;
                }).map(function (result) {
                    if (res.batchDelete) {
                        return htmlspecialchars(result.key + ': ' + result.reason);
                    }

                    return htmlspecialchars(result.reason);
                });

                message += "<br /><b style='display: block; text-align: center; padding: 10px 0;'>" + reasons.join('<br/>') + "</b>";

                // remove all items that are not allowed to be deleted
                res.itemResults = res.itemResults.filter(item => item.allowed);

                hasDeleteable = res.itemResults.length > 0;
            }
            Ext.MessageBox.show({
                title:t('delete'),
                msg: message,
                buttons: hasDeleteable ? Ext.Msg.OKCANCEL : Ext.Msg.CANCEL,
                icon: Ext.MessageBox.INFO,
                fn: function(r, options, button) {
                    if (button === "ok" && hasDeleteable && r.deletejobs && r.batchDelete) {
                        pimcore.elementservice.deleteElementCheckDependencyComplete.call(this, window, r, options);
                    }
                }.bind(window, res, options)
            });
        }
        else {
            pimcore.elementservice.deleteElementCheckDependencyComplete.call(this, window, res, options);
        }
    }
    catch (e) {
        console.log(e);
    }
}

/**
 * @private
 */
pimcore.elementservice.deleteElementCheckDependencyComplete = function (window, res, options) {

    try {
        let message = '';
        if (res.batchDelete) {
            message += sprintf(t('delete_message_batch'), res.itemResults.length) + "<br /><div>";
            if (res.itemResults.length > 0) {
                message += "<ul>";
                res.itemResults.forEach(function (item) {
                    message += '<li>' + htmlspecialchars(item.path) + '<b>' + htmlspecialchars(item.key) + '</b></li>';
                })
                message += "</ul>";
            }
            message += "</div>";
        } else {
            message += t('delete_message');
        }

        if (res.elementKey) {
            message += "<br /><b style='display: block; text-align: center; padding: 10px 0;'>\"" + htmlspecialchars(res.itemResults[0].path + res.elementKey) + "\"</b>";
        }
        if (res.hasDependencies) {
            message += "<br />" + t('delete_message_dependencies');
        }

        if (res['children'] > 100) {
            message += "<br /><br /><b>" + t("too_many_children_for_recyclebin") + "</b>";
        }

        if(res.itemResults[0].type === "folder") {
            message += `<br /><br /><b> ${t('delete_entire_folder_question')} </b>`;
        }

        Ext.MessageBox.show({
            title:t('delete'),
            msg: message,
            buttons: Ext.Msg.OKCANCEL ,
            icon: Ext.MessageBox.INFO ,
            fn: pimcore.elementservice.deleteElementFromServer.bind(window, res, options)
        });
    }
    catch (e) {
        console.log(e);
    }
};

/**
 * @private
 */
pimcore.elementservice.getElementTreeNames = function(elementType) {
    var treeNames = ["layout_" + elementType + "_tree"]
    if (pimcore.settings.customviews.length > 0) {
        for (var cvs = 0; cvs < pimcore.settings.customviews.length; cvs++) {
            var cv = pimcore.settings.customviews[cvs];
            if (!cv.treetype && elementType == "object" || cv.treetype == elementType) {
                treeNames.push("layout_" + elementType + "_tree_" + cv.id);
            }
        }
    }
    return treeNames;
};

/**
 * @private
 */
pimcore.elementservice.deleteElementFromServer = function (r, options, button) {

    if (button == "ok" && r.deletejobs) {
        var successHandler = options["success"];
        var elementType = options.elementType;
        var id = options.id;
        const preDeleteEventName = 'preDelete' + elementType.charAt(0).toUpperCase() + elementType.slice(1);

        let ids = Ext.isString(id) ? id.split(',') : [id];
        try {
            ids.forEach(function (elementId) {
                const preDeleteEvent = new CustomEvent(pimcore.events[preDeleteEventName], {
                    detail: {
                        elementId: elementId
                    },
                    cancelable: true
                });

                const isAllowed = document.dispatchEvent(preDeleteEvent);
                if (!isAllowed) {
                    r.deletejobs = r.deletejobs.filter((job) => job[0].params.id != elementId);
                    ids = ids.filter((id) => id != elementId);
                }
            });
        } catch (e) {
            pimcore.helpers.showPrettyError('asset', t("error"), t("delete_failed"), e.message);
            return;
        }

        ids.forEach(function (elementId) {
            pimcore.helpers.addTreeNodeLoadingIndicator(elementType, elementId);
        });

        var affectedNodes = pimcore.elementservice.getAffectedNodes(elementType, id);
        for (var index = 0; index < affectedNodes.length; index++) {
            var node = affectedNodes[index];
            if (node) {
                var nodeEl = Ext.fly(node.getOwnerTree().getView().getNodeByRecord(node));
                if(nodeEl) {
                    nodeEl.addCls("pimcore_delete");
                }
            }
        }

        if (pimcore.globalmanager.exists(elementType + "_" + id)) {
            var tabPanel = Ext.getCmp("pimcore_panel_tabs");
            tabPanel.remove(elementType + "_" + id);
        }

        if(r.deletejobs.length > 2) {
            this.deleteProgressBar = new Ext.ProgressBar({
                text: t('initializing')
            });

            this.deleteWindow = new Ext.Window({
                title: t("delete"),
                layout:'fit',
                width:200,
                bodyStyle: "padding: 10px;",
                closable:false,
                plain: true,
                items: [this.deleteProgressBar],
                listeners: pimcore.helpers.getProgressWindowListeners()
            });

            this.deleteWindow.show();
        }

        var pj = new pimcore.tool.paralleljobs({
            success: function (id, successHandler) {
                var refreshParentNodes = [];
                const postDeleteEventName = 'postDelete' + elementType.charAt(0).toUpperCase() + elementType.slice(1);
                for (var index = 0; index < affectedNodes.length; index++) {
                    var node = affectedNodes[index];
                    try {
                        if (node) {
                            refreshParentNodes[node.parentNode.id] = node.parentNode.id;
                        }
                    } catch (e) {
                        console.log(e);
                        pimcore.helpers.showNotification(t("error"), t("error_deleting_item"), "error");
                        if (node) {
                            tree.getStore().load({
                                node: node.parentNode
                            });
                        }
                    }
                }

                for (var parentNodeId in refreshParentNodes) {
                    pimcore.elementservice.refreshNodeAllTrees(elementType, parentNodeId);
                }

                if(this.deleteWindow) {
                    this.deleteWindow.close();
                }

                this.deleteProgressBar = null;
                this.deleteWindow = null;

                ids.forEach(function (elementId) {
                    const postDeleteEvent = new CustomEvent(pimcore.events[postDeleteEventName], {
                        detail: {
                            elementId: elementId
                        }
                    });

                    document.dispatchEvent(postDeleteEvent);
                });

                if(typeof successHandler == "function") {
                    successHandler();
                }
            }.bind(this, id, successHandler),
            update: function (currentStep, steps, percent, response) {
                if(this.deleteProgressBar) {
                    var status = currentStep / steps;
                    this.deleteProgressBar.updateProgress(status, percent + "%");
                }

                if(response && response['deleted']) {
                    var ids = Object.keys(response['deleted']);
                    ids.forEach(function (id) {
                        pimcore.helpers.closeElement(id, elementType);
                    })
                }
            }.bind(this),
            failure: function (id, message) {
                if (this.deleteWindow) {
                    this.deleteWindow.close();
                }

                pimcore.helpers.showNotification(t("error"), t("error_deleting_item"), "error", t(message));
                for (var index = 0; index < affectedNodes.length; index++) {
                    try {
                        var node = affectedNodes[i];
                        if (node) {
                            tree.getStore().load({
                                node: node.parentNode
                            });
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            }.bind(this, id),
            jobs: r.deletejobs
        });
    }
};

/**
 * @private
 */
pimcore.elementservice.updateAsset = function (id, data, callback) {

    if (!callback) {
        callback = function() {
        };
    }

    data.id = id;

    Ext.Ajax.request({
        url: Routing.generate('pimcore_admin_asset_update'),
        method: "PUT",
        params: data,
        success: callback
    });
};

pimcore.elementservice.updateDocument = function (id, data, callback) {

    if (!callback) {
        callback = function() {
        };
    }

    data.id = id;

    Ext.Ajax.request({
        url: Routing.generate('pimcore_admin_document_document_update'),
        method: "PUT",
        params: data,
        success: callback
    });
};

pimcore.elementservice.updateObject = function (id, values, callback) {

    if (!callback) {
        callback = function () {
        };
    }

    Ext.Ajax.request({
        url: Routing.generate('pimcore_admin_dataobject_dataobject_update'),
        method: "PUT",
        params: {
            id: Ext.encode(id),
            values: Ext.encode(values)
        },
        success: callback
    });
};

pimcore.elementservice.getAffectedNodes = function(elementType, id) {

    var ids = Ext.isString(id) ? id.split(',') : [id];
    var treeNames = pimcore.elementservice.getElementTreeNames(elementType);
    var affectedNodes = [];
    for (var index = 0; index < treeNames.length; index++) {
        var treeName = treeNames[index];
        var tree = pimcore.globalmanager.get(treeName);
        if (!tree) {
            continue;
        }
        tree = tree.tree;
        var store = tree.getStore();

        ids.forEach(function (id) {
            var record = store.getNodeById(id);
            if (record) {
                affectedNodes.push(record);
            }
        });
    }

    const prepareAffectedNodes = new CustomEvent(pimcore.events.prepareAffectedNodes, {
        detail: {
            affectedNodes: affectedNodes,
            id: id,
            elementType: elementType
        }
    });
    document.dispatchEvent(prepareAffectedNodes);

    return affectedNodes;
};


pimcore.elementservice.applyNewKey = function(affectedNodes, elementType, id, value) {
    value = Ext.util.Format.htmlEncode(value);
    for (var index = 0; index < affectedNodes.length; index++) {
        var record = affectedNodes[index];
        record.set("text", value);
        record.set("path", record.data.basePath + value);
    }
    pimcore.helpers.addTreeNodeLoadingIndicator(elementType, id);

    return affectedNodes;
};

pimcore.elementservice.editDocumentKeyComplete =  function (options, button, value, object) {
    if (button == "ok") {

        var record;
        var id = options.id;
        var elementType = options.elementType;
        value = pimcore.helpers.getValidFilename(value, "document");

        if (options.sourceTree) {
            var tree = options.sourceTree;
            var store = tree.getStore();
            record = store.getById(id);
            if(pimcore.elementservice.isKeyExistingInLevel(record.parentNode, value, record)) {
                return;
            }
            if(pimcore.elementservice.isDisallowedDocumentKey(record.parentNode.id, value)) {
                return;
            }
        }

        var originalText;
        var originalPath;
        var affectedNodes = pimcore.elementservice.getAffectedNodes(elementType, id);
        if (affectedNodes) {
            record = affectedNodes[0];
            if(record) {
                originalText = record.get("text");
                originalPath = record.get("path");
            }
        }
        pimcore.elementservice.applyNewKey(affectedNodes, elementType, id, value);

        pimcore.elementservice.updateDocument(id, {
            key: value
        }, function (response) {
            var record, index;
            var rdata = Ext.decode(response.responseText);
            if (!rdata || !rdata.success) {
                for (index = 0; index < affectedNodes.length; index++) {
                    record = affectedNodes[index];
                    record.set("text", originalText);
                    record.set("path", originalPath);
                }
                pimcore.helpers.showNotification(t("error"), t("error_renaming_item"), "error",
                    t(rdata.message));
                return;
            }

            if(rdata && rdata.success) {
                // removes loading indicator added in the applyNewKey method
                pimcore.helpers.removeTreeNodeLoadingIndicator(elementType, id);
            }

            for (index = 0; index < affectedNodes.length; index++) {
                record = affectedNodes[index];
                pimcore.elementservice.refreshNode(record);
            }

            try {
                if (rdata && rdata.success) {
                    if (rdata.treeData) {
                        pimcore.helpers.updateTreeElementStyle('document', id, rdata.treeData);
                    }

                    pimcore.elementservice.reopenElement(options);

                    //trigger edit document key complete event
                    const postEditDocumentKey = new CustomEvent(pimcore.events.postEditDocumentKey, {
                        detail: {
                            document: record,
                            key: value
                        }
                    });

                    document.dispatchEvent(postEditDocumentKey);
                }  else {
                    const message = typeof rdata.message !== 'undefined' ? t(rdata.message) : '';
                    pimcore.helpers.showNotification(t("error"), t("error_renaming_item"), "error", message);
                }
            } catch (e) {
                pimcore.helpers.showNotification(t("error"), t("error_renaming_item"), "error");
            }
        }.bind(this));
    }
};

pimcore.elementservice.editObjectKeyComplete = function (options, button, value, object) {
    if (button == "ok") {

        var record;
        var id = options.id;
        var elementType = options.elementType;
        value = pimcore.helpers.getValidFilename(value, "object");

        if (options.sourceTree) {
            var tree = options.sourceTree;
            var store = tree.getStore();
            record = store.getById(id);
            if(pimcore.elementservice.isKeyExistingInLevel(record.parentNode, value, record)) {
                return;
            }
        }

        var affectedNodes = pimcore.elementservice.getAffectedNodes(elementType, id);
        if (affectedNodes) {
            record = affectedNodes[0];
            if(record) {
                originalText = record.get("text");
                originalPath = record.get("path");
            }
        }
        pimcore.elementservice.applyNewKey(affectedNodes, elementType, id, value);

        pimcore.elementservice.updateObject(id, {key: value},
            function (response) {
                var index, record;
                for (index = 0; index < affectedNodes.length; index++) {
                    record = affectedNodes[index];
                    pimcore.elementservice.refreshNode(record);
                }

                try {
                    var rdata = Ext.decode(response.responseText);
                    if (rdata && rdata.success) {
                        if (rdata.treeData) {
                            pimcore.helpers.updateTreeElementStyle('object', id, rdata.treeData);
                        }

                        pimcore.elementservice.reopenElement(options);
                        // removes loading indicator added in the applyNewKey method
                        pimcore.helpers.removeTreeNodeLoadingIndicator(elementType, id);

                        //trigger edit object key complete event
                        const postEditObjectKey = new CustomEvent(pimcore.events.postEditObjectKey, {
                            detail: {
                                object: record,
                                key: value
                            }
                        });

                        document.dispatchEvent(postEditObjectKey);
                    }  else {
                        const message = typeof rdata.message !== 'undefined' ? t(rdata.message) : '';
                        pimcore.helpers.showNotification(t("error"), t("error_renaming_item"), "error", message);
                        for (index = 0; index < affectedNodes.length; index++) {
                            record = affectedNodes[index];
                            pimcore.elementservice.refreshNode(record.parentNode);
                        }
                    }
                } catch (e) {
                    pimcore.helpers.showNotification(t("error"), t("error_renaming_item"), "error");
                    for (index = 0; index < affectedNodes.length; index++) {
                        record = affectedNodes[index];
                        pimcore.elementservice.refreshNode(record.parentNode);
                    }
                }
            }.bind(this))
        ;
    }
};

pimcore.elementservice.reopenElement = function(options) {
    var elementType = options.elementType;
    if (pimcore.globalmanager.exists(elementType + "_" + options.id)) {
        pimcore.helpers["close"  + ucfirst(elementType)](options.id);
        pimcore.helpers["open" + ucfirst(elementType)](options.id, options.elementSubType);
    }

};

pimcore.elementservice.editAssetKeyComplete = function (options, button, value, object) {
    try {
        if (button == "ok") {
            var record;
            var id = options.id;
            var elementType = options.elementType;

            value = pimcore.helpers.getValidFilename(value, "asset");

            if (options.sourceTree) {
                var tree = options.sourceTree;
                var store = tree.getStore();
                record = store.getById(id);
                // check for ident filename in current level

                var parentChildren = record.parentNode.childNodes;
                for (var i = 0; i < parentChildren.length; i++) {
                    if (parentChildren[i].data.text == value && this != parentChildren[i].data.text) {
                        Ext.MessageBox.alert(t('rename'), t('name_already_in_use'));
                        return;
                    }
                }
            }

            var affectedNodes = pimcore.elementservice.getAffectedNodes(elementType, id);
            if (affectedNodes) {
                record = affectedNodes[0];
                if(record) {
                    originalText = record.get("text");
                    originalPath = record.get("path");
                }
            }
            pimcore.elementservice.applyNewKey(affectedNodes, elementType, id, value);

            pimcore.elementservice.updateAsset(id, {filename: value},
                function (response) {
                    var index, record;
                    var rdata = Ext.decode(response.responseText);
                    if (!rdata || !rdata.success) {
                        for (index = 0; index < affectedNodes.length; index++) {
                            record = affectedNodes[index];
                            record.set("text", originalText);
                            record.set("path", originalPath);
                        }

                        const message = typeof rdata.message !== 'undefined' ? t(rdata.message) : '';
                        pimcore.helpers.showNotification(t("error"), t("error_renaming_item"),
                        "error", message);
                        return;
                    }

                    if (rdata && rdata.success) {
                        // removes loading indicator added in the applyNewKey method
                        pimcore.helpers.removeTreeNodeLoadingIndicator(elementType, id);
                    }

                    for (index = 0; index < affectedNodes.length; index++) {
                        record = affectedNodes[index];
                        pimcore.elementservice.refreshNode(record);
                    }

                    try {
                        if (rdata && rdata.success) {
                            if (rdata.treeData) {
                                pimcore.helpers.updateTreeElementStyle('asset', id, rdata.treeData);
                            }

                            pimcore.elementservice.reopenElement(options);

                            //trigger edit asset key complete event
                            const postEditAssetKey = new CustomEvent(pimcore.events.postEditAssetKey, {
                                detail: {
                                    asset: record,
                                    key: value
                                }
                            });

                            document.dispatchEvent(postEditAssetKey);
                        }  else {
                            const message = typeof rdata.message !== 'undefined' ? t(rdata.message) : '';
                            pimcore.helpers.showNotification(t("error"), t("error_renaming_item"),
                                "error", message);
                        }
                    } catch (e) {
                        pimcore.helpers.showNotification(t("error"), t("error_renaming_item"),
                            "error");
                    }
                }.bind(this))
            ;
        }
    } catch (e) {
        console.log(e);
    }
};

pimcore.elementservice.editElementKey = function(options) {
    var completeCallback;
    if (options.elementType == "asset") {
        completeCallback = pimcore.elementservice.editAssetKeyComplete.bind(this, options);
    } else if (options.elementType == "document") {
        completeCallback = pimcore.elementservice.editDocumentKeyComplete.bind(this, options);
    } else if (options.elementType == "object") {
        completeCallback = pimcore.elementservice.editObjectKeyComplete.bind(this, options);
    } else {
        throw new Error("type " + options.elementType + " not supported!");
    }

    if(
        options['elementType'] === 'document' &&
        (options['elementSubType'] === 'page' || options['elementSubType'] === 'hardlink') &&
        pimcore.globalmanager.get("user").isAllowed('redirects')
    ) {
        // for document pages & hardlinks we need an additional checkbox for auto-redirects
        var messageBox = null;
        completeCallback = pimcore.elementservice.editDocumentKeyComplete.bind(this);
        var submitFunction = function () {
            completeCallback(options, 'ok', messageBox.getComponent('key').getValue());
            messageBox.close();
        };

        messageBox = new Ext.Window({
            modal: true,
            width: 500,
            title: t('rename'),
            items: [{
                xtype: 'container',
                html: t('please_enter_the_new_name')
            }, {
                xtype: "textfield",
                width: "100%",
                name: 'key',
                itemId: 'key',
                value: options.default,
                listeners: {
                    afterrender: function () {
                        window.setTimeout(function () {
                            this.focus(true);
                        }.bind(this), 100);
                    }
                }
            }],
            bodyStyle: 'padding: 10px 10px 0px 10px',
            buttonAlign: 'center',
            buttons: [{
                text: t('OK'),
                handler: submitFunction
            },{
                text: t('cancel'),
                handler: function() {
                    messageBox.close();
                }
            }]
        });

        messageBox.show();

        var map = new Ext.util.KeyMap({
            target: messageBox.getEl(),
            key:  Ext.event.Event.ENTER,
            fn: submitFunction
        });
    } else {
        Ext.MessageBox.prompt(t('rename'), t('please_enter_the_new_name'), completeCallback, window, false, options.default);
    }
};


pimcore.elementservice.refreshNode = function (node) {
    var ownerTree = node.getOwnerTree();

    node.data.expanded = true;
    ownerTree.getStore().load({
        node: node
    });
};


pimcore.elementservice.isDisallowedDocumentKey = function (parentNodeId, key) {

    if(parentNodeId == 1) {
        var disallowedKeys = ["admin","install","plugin"];
        if(in_arrayi(key, disallowedKeys)) {
            Ext.MessageBox.alert(t('name_is_not_allowed'),
                t('name_is_not_allowed'));
            return true;
        }
    }
    return false;
};

pimcore.elementservice.isKeyExistingInLevel = function(parentNode, key, node) {

    key = pimcore.helpers.getValidFilename(key, parentNode.data.elementType);
    var parentChildren = parentNode.childNodes;
    for (var i = 0; i < parentChildren.length; i++) {
        if (parentChildren[i].data.text == key && node != parentChildren[i]) {
            Ext.MessageBox.alert(t('error'),
                t('name_already_in_use'));
            return true;
        }
    }
    return false;
};

pimcore.elementservice.addObject = function(options) {

    var url = options.url;
    delete options.url;
    delete options["sourceTree"];

    Ext.Ajax.request({
        url: url,
        method: 'POST',
        params: options,
        success: pimcore.elementservice.addObjectComplete.bind(this, options)
    });
};

pimcore.elementservice.addDocument = function(options) {

    var url = options.url;
    delete options.url;
    delete options["sourceTree"];

    Ext.Ajax.request({
        url: url,
        method: 'POST',
        params: options,
        success: pimcore.elementservice.addDocumentComplete.bind(this, options)
    });
};

pimcore.elementservice.refreshRootNodeAllTrees = function(elementType) {
    var treeNames = pimcore.elementservice.getElementTreeNames(elementType);
    for (var index = 0; index < treeNames.length; index++) {
        try {
            var treeName = treeNames[index];
            var tree = pimcore.globalmanager.get(treeName);
            if (!tree) {
                continue;
            }
            tree = tree.tree;
            var rootNode = tree.getRootNode();
            if (rootNode) {
                pimcore.elementservice.refreshNode(rootNode);
            }
        } catch (e) {
            console.log(e);
        }
    }
};



pimcore.elementservice.refreshNodeAllTrees = function(elementType, id) {
    var treeNames = pimcore.elementservice.getElementTreeNames(elementType);
    for (var index = 0; index < treeNames.length; index++) {
        try {
            var treeName = treeNames[index];
            var tree = pimcore.globalmanager.get(treeName);
            if (!tree) {
                continue;
            }
            tree = tree.tree;
            var store = tree.getStore();
            var parentRecord = store.getById(id);
            if (parentRecord) {
                parentRecord.data.leaf = false;
                parentRecord.expand();
                pimcore.elementservice.refreshNode(parentRecord);
            }
        } catch (e) {
            console.log(e);
        }
    }
};

pimcore.elementservice.addDocumentComplete = function (options, response) {
    try {
        response = Ext.decode(response.responseText);
        if (response && response.success) {
            pimcore.elementservice.refreshNodeAllTrees(options.elementType, options.parentId);

            let docTypes = pimcore.globalmanager.get('document_valid_types');
            if (in_array(response["type"], docTypes)) {
                pimcore.helpers.openDocument(response.id, response.type);

                const postAddDocumentTree = new CustomEvent(pimcore.events.postAddDocumentTree, {
                    detail: {
                        id: response.id,
                    }
                });

                document.dispatchEvent(postAddDocumentTree);

            }
        }  else {
            pimcore.helpers.showNotification(t("error"), t("failed_to_create_new_item"), "error",
                t(response.message));
        }
    } catch(e) {
        pimcore.helpers.showNotification(t("error"), t("failed_to_create_new_item"), "error");
    }
};

pimcore.elementservice.addObjectComplete = function(options, response) {
    try {
        var rdata = Ext.decode(response.responseText);
        if (rdata && rdata.success) {
            pimcore.elementservice.refreshNodeAllTrees(options.elementType, options.parentId);

            if (rdata.id && rdata.type) {
                if (rdata.type == "object") {
                    pimcore.helpers.openObject(rdata.id, rdata.type);

                    const postAddObjectTree = new CustomEvent(pimcore.events.postAddObjectTree, {
                        detail: {
                            id: rdata.id,
                        }
                    });

                    document.dispatchEvent(postAddObjectTree);
                }
            }
        }  else {
            pimcore.helpers.showNotification(t("error"), t("failed_to_create_new_item"), "error", t(rdata.message));
        }
    } catch (e) {
        pimcore.helpers.showNotification(t("error"), t("failed_to_create_new_item"), "error");
    }

};


pimcore.elementservice.lockElement = function(options) {
    try {
        var updateMethod = pimcore.elementservice["update" + ucfirst(options.elementType)];
        updateMethod(options.id,
            {
                locked: options.mode
            },
            function() {
                pimcore.elementservice.refreshRootNodeAllTrees(options.elementType);
            }
        );
    } catch (e) {
        console.log(e);
    }
};

pimcore.elementservice.unlockElement = function(options) {
    try {
        Ext.Ajax.request({
            url: Routing.generate('pimcore_admin_element_unlockpropagate'),
            method: 'PUT',
            params: {
                id: options.id,
                type: options.elementType
            },
            success: function () {
                pimcore.elementservice.refreshRootNodeAllTrees(options.elementType);
            }.bind(this)
        });
    } catch (e) {
        console.log(e);
    }
};

pimcore.elementservice.setElementPublishedState = function(options) {
    var elementType = options.elementType;
    var id = options.id;
    var published = options.published;

    var affectedNodes = pimcore.elementservice.getAffectedNodes(elementType, id);
    for (var index = 0; index < affectedNodes.length; index++) {
        try {
            var node = affectedNodes[index];
            if (node) {
                var tree = node.getOwnerTree();
                var view = tree.getView();
                var nodeEl = Ext.fly(view.getNodeByRecord(node));
                if (nodeEl) {
                    var nodeElInner = nodeEl.down(".x-grid-td");
                    if (nodeElInner) {
                        if (published) {
                            nodeElInner.removeCls("pimcore_unpublished");
                        } else {
                            nodeElInner.addCls("pimcore_unpublished");
                        }
                    }
                }

                if(!node.data['cls']) {
                    node.data['cls'] = '';
                }

                if (published) {
                    node.data.cls = node.data.cls.replace(/pimcore_unpublished/g, '');
                } else {
                    node.data.cls += " pimcore_unpublished";
                }

                node.data.published = published;
            }
        } catch (e) {
            console.log(e);
        }
    }
};

pimcore.elementservice.setElementToolbarButtons = function(options) {
    var elementType = options.elementType;
    var id = options.id;
    var key = elementType + "_" + id;
    if (pimcore.globalmanager.exists(key)) {
        if (options.published) {
            pimcore.globalmanager.get(key).toolbarButtons.unpublish.show();
        } else {
            pimcore.globalmanager.get(key).toolbarButtons.unpublish.hide();
        }
    }
};

pimcore.elementservice.reloadVersions = function(options) {
    var elementType = options.elementType;
    var id = options.id;
    var key = elementType + "_" + id;

    if (pimcore.globalmanager.exists(key)) {
        // reload versions
        if (pimcore.globalmanager.get(key).versions) {
            if (typeof pimcore.globalmanager.get(key).versions.reload  == "function") {
                pimcore.globalmanager.get(key).versions.reload();
            }
        }
    }
};

pimcore.elementservice.showLocateInTreeButton = function(elementType) {
    var locateConfigs = pimcore.globalmanager.get("tree_locate_configs");

    if (locateConfigs[elementType]) {
        return true;
    }
    return false;
};

pimcore.elementservice.integrateWorkflowManagement = function(elementType, elementId, elementEditor, buttons) {

    if(elementEditor.data.workflowManagement && elementEditor.data.workflowManagement.hasWorkflowManagement === true) {

        var workflows = elementEditor.data.workflowManagement.workflows;

        if(workflows.length > 0) {

            var button = pimcore.elementservice.getWorkflowActionsButton(workflows, elementType, elementId, elementEditor);

            if(button !== false) {
                buttons.push("-");
                buttons.push(button);
            }
        }

        buttons.push("-");
        buttons.push({
            xtype: 'container',
            html: [
                elementEditor.data.workflowManagement.statusInfo
            ]
        });

    }

};

pimcore.elementservice.getWorkflowActionsButton = function(workflows, elementType, elementId, elementEditor) {
    var workflowsWithTransitions = [];

    workflows.forEach(function(el){

        if(el.allowedTransitions.length) {
            workflowsWithTransitions.push(el);
        } else if(el.globalActions.length) {
            workflowsWithTransitions.push(el);
        }
    }.bind(workflowsWithTransitions));

    if(workflowsWithTransitions.length > 0) {

        var items = [];

        var workflowTransitionHandler = function (workflow, transition, elementEditor, elementId, elementType) {
            var applyWorkflow = function (workflow, transition, elementEditor, elementId, elementType) {
                if (transition.notes) {
                    new pimcore.workflow.transitionPanel(elementType, elementId, elementEditor, workflow.name, transition);
                } else {
                    pimcore.workflow.transitions.perform(elementType, elementId, elementEditor, workflow.name, transition);
                }
            };

            if (elementEditor.isDirty()) {
                if (transition.unsavedChangesBehaviour === 'warn') {
                    pimcore.helpers.showNotification(t("error"), t("workflow_transition_unsaved_data"), "error");
                } else if (transition.unsavedChangesBehaviour === 'save') {
                    elementEditor.save(null, null, null, function () {
                        applyWorkflow(workflow, transition, elementEditor, elementId, elementType);
                    });
                } else {
                    applyWorkflow(workflow, transition, elementEditor, elementId, elementType);
                }
            } else {
                applyWorkflow(workflow, transition, elementEditor, elementId, elementType);
            }
        };

        workflowsWithTransitions.forEach(function (workflow) {
            if (workflowsWithTransitions.length > 1) {
                items.push({
                    xtype: 'container',
                    html: '<span class="pimcore-workflow-action-workflow-label">' + t(workflow.label) + '</span>'
                });
            }

            for (i = 0; i < workflow.allowedTransitions.length; i++) {
                var transition = workflow.allowedTransitions[i];
                transition.isGlobalAction = false;
                items.push({
                    text: t(transition.label),
                    iconCls: transition.iconCls,
                    handler: function (workflow, transition) {
                        workflowTransitionHandler(workflow, transition, elementEditor, elementId, elementType);
                    }.bind(this, workflow, transition)
                });
            }


            for (i = 0; i < workflow.globalActions.length; i++) {
                var transition = workflow.globalActions[i];
                transition.isGlobalAction = true;
                items.push({
                    text: t(transition.label),
                    iconCls: transition.iconCls,
                    handler: function (workflow, transition) {
                        workflowTransitionHandler(workflow, transition, elementEditor, elementId, elementType);
                    }.bind(this, workflow, transition)
                });
            }
        });

        return {
            text: t('actions'),
            scale: "medium",
            iconCls: 'pimcore_material_icon_workflow pimcore_material_icon',
            cls: 'pimcore_workflow_button',
            menu: {
                xtype: 'menu',
                items: items
            }
        };
    }

    return false;
};

pimcore.elementservice.replaceAsset = function (id, callback) {
    pimcore.helpers.uploadDialog(Routing.generate('pimcore_admin_asset_replaceasset', {id: id}), "Filedata", function() {
        if(typeof callback == "function") {
            callback();
        }
    }.bind(this), function (res) {
        var message = false;
        try {
            var response = Ext.util.JSON.decode(res.response.responseText);
            if(response.message) {
                message = response.message;
            }

        } catch(e) {}

        Ext.MessageBox.alert(t("error"), message || t("error"));
    });
};


pimcore.elementservice.downloadAssetFolderAsZip = function (id, selectedIds) {

    var that = {};

    var idsParam = '';
    if(selectedIds && selectedIds.length) {
        idsParam = selectedIds.join(',');
    }

    Ext.Ajax.request({
        url: Routing.generate('pimcore_admin_asset_downloadaszipjobs'),
        params: {
            id: id,
            selectedIds: idsParam
        },
        success: function(response) {
            var res = Ext.decode(response.responseText);

            that.downloadProgressBar = new Ext.ProgressBar({
                text: t('initializing')
            });

            that.downloadProgressWin = new Ext.Window({
                title: t("download_as_zip"),
                layout:'fit',
                width:200,
                bodyStyle: "padding: 10px;",
                closable:false,
                plain: true,
                items: [that.downloadProgressBar],
                listeners: pimcore.helpers.getProgressWindowListeners()
            });

            that.downloadProgressWin.show();


            var pj = new pimcore.tool.paralleljobs({
                success: function () {
                    if(that.downloadProgressWin) {
                        that.downloadProgressWin.close();
                    }

                    that.downloadProgressBar = null;
                    that.downloadProgressWin = null;

                    pimcore.helpers.download(Routing.generate('pimcore_admin_asset_downloadaszip', {jobId: res.jobId, id: id}));
                },
                update: function (currentStep, steps, percent) {
                    if(that.downloadProgressBar) {
                        var status = currentStep / steps;
                        that.downloadProgressBar.updateProgress(status, percent + "%");
                    }
                },
                failure: function (message) {
                    that.downloadProgressWin.close();
                    pimcore.helpers.showNotification(t("error"), t("error"),
                        "error", t(message));
                },
                jobs: res.jobs
            });
        }
    });
};



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.edit.dnd");
/**
 * @private
 */
pimcore.document.edit.dnd = Class.create({

    dndManager: null,

    globalDropZone: null,

    initialize: function(parentExt, body, iframeElement) {

        parentExt.dd.DragDropMgr.notifyOccluded = true;
        this.dndManager = parentExt.dd.DragDropMgr;

        body.addListener('mousemove', this.ddMouseMove.bind(this));
        body.addListener('mouseup', this.ddMouseUp.bind(this));

        this.globalDropZone = new parent.Ext.dd.DropZone(iframeElement, {
            ddGroup: "element",
            validElements: [],

            getTargetFromEvent: function(e) {
                var element = null;
                var elLength = this.validElements.length;

                for (var i = 0; i < elLength; i++) {
                    element = this.validElements[i];
                    if (element["el"].dndOver) {
                        if(element["drop"]) {
                            this.onNodeDrop = element["drop"];
                        }
                        if(element["over"]) {
                            this.onNodeOver = element["over"];
                        }
                        return element["el"];
                    }
                }
            }
        });

        window.setInterval(this.setIframeOffset.bind(this),1000);
        this.setIframeOffset();
    },

    addDropTarget: function (el, overCallback, dropCallback) {

        el.on("mouseover", function (e) {
            this.dndOver = true;
        }.bind(el));
        el.on("mouseout", function (e) {
            this.dndOver = false;
        }.bind(el));

        el.dndOver = false;

        this.globalDropZone.validElements.push({
            el: el,
            over: overCallback,
            drop: dropCallback
        });
    },

    ddMouseMove: function (e) {
        if (this.dndManager.dragCurrent) {
            // update the xy of the event if necessary
            this.setDDPos(e);
            // *** Note that the 'this' scope is the drag drop manager
            this.dndManager.handleMouseMove(e);
        }
    },

    ddMouseUp : function (e) {
        if (this.dndManager.dragCurrent) {
            // update the xy of the event if necessary
            this.setDDPos(e);
            // *** Note that the 'this' scope is the drag drop manager
            this.dndManager.handleMouseUp(e);
        }
    },


    setDDPos: function (e) {

        var scrollTop = 0;
        var scrollLeft = 0;

        var doc = (window.contentDocument || window.document);
        scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
        scrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft;

        if (this.dndManager.dragCurrent) {
            e.xy = [e.pageX + this.iframeOffset[0] - scrollLeft, e.pageY + this.iframeOffset[1] - scrollTop];
        }
    },

    setIframeOffset: function () {
        try {
            this.iframeOffset = parent.Ext.get('document_iframe_'
            + window.editWindow.document.id).getOffsetsTo(parent.Ext.getBody());
        } catch (e) {
            console.log(e);
        }
    },

    disable: function () {
        this.globalDropZone.lock();
    },

    enable: function () {
        this.globalDropZone.unlock();
    }

});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editable");
/**
 * @private
 */
pimcore.document.editable = Class.create({

    id: null,
    name: null,
    realName: null,
    inherited: false,
    inDialogBox: null,
    required: false,
    requiredError: false,

    initialize: function(id, name, config, data, inherited) {
        this.id = id;
        this.name = name;
        this.config = this.parseConfig(config);
        this.inherited = inherited;
    },

    setupWrapper: function (styleOptions) {

        if (!styleOptions) {
            styleOptions = {};
        }

        var container = Ext.get(this.id);
        container.setStyle(styleOptions);

        return container;
    },

    setName: function(name) {
        this.name = name;
    },

    getName: function () {
        return this.name;
    },

    setRealName: function(realName) {
        this.realName = realName;
    },

    getRealName: function() {
        return this.realName;
    },

    setInDialogBox: function(inDialogBox) {
        this.inDialogBox = inDialogBox;
    },

    getInDialogBox: function() {
        return this.inDialogBox;
    },

    reloadDocument: function () {
        window.editWindow.reload();
    },

    setInherited: function(inherited, el) {
        this.inherited = inherited;

        // if an element given is as optional second parameter we use this for the mask
        if(!(el instanceof Ext.Element)) {
            el = Ext.get(this.id);
        }

        // check for inherited elements, and mask them if necessary
        if(this.inherited) {
            var mask = el.mask();
            new Ext.ToolTip({
                target: mask,
                html: t("click_right_to_overwrite")
            });
            mask.on("contextmenu", function (e) {
                var menu = new Ext.menu.Menu();
                menu.add(new Ext.menu.Item({
                    text: t('overwrite'),
                    iconCls: "pimcore_icon_overwrite",
                    handler: function (item) {
                        this.setInherited(false);
                    }.bind(this)
                }));
                menu.showAt(e.getXY());

                e.stopEvent();
            }.bind(this));
        } else {
            el.unmask();
        }
    },

    getInherited: function () {
        return this.inherited;
    },

    setId: function (id) {
        this.id = id;
    },

    getId: function () {
        return this.id;
    },

    parseConfig: function (config) {
        if(!config || config instanceof Array || typeof config != "object") {
            config = {};
        }

        return config;
    },

    /**
     * HACK to get custom data from a grid instead of the tree
     * better solutions are welcome ;-)
     */
    getCustomPimcoreDropData : function (data){
        if(typeof(data.grid) != 'undefined' && typeof(data.grid.getCustomPimcoreDropData) == 'function'){ //droped from priceList
             var record = data.grid.getStore().getAt(data.rowIndex);
             var data = data.grid.getCustomPimcoreDropData(record);
         }
        return data;
    },

    getContext: function() {
        var context = {
            scope: "documentEditor",
            containerType: "document",
            documentId: pimcore_document_id,
            fieldname: this.name
        }
        return context;
    },

    validateRequiredValue: function(value, el, parent, mark) {
        let valueLength = 1;
        if (typeof value === "string") {
            valueLength = trim(strip_tags(value)).length;
        } else if (value == null) {
            valueLength = 0;
        }

        if (valueLength < 1) {
            parent.requiredError = true;
            if (mark) {
                el.addCls('editable-error');
            }
        } else {
            parent.requiredError = false;
            if (mark) {
                el.removeCls('editable-error');
            }
        }
    }
});




/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.block");
/**
 * @private
 */
pimcore.document.editables.block = Class.create(pimcore.document.editable, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.elements = [];
    },

    refresh: function() {
        this.elements = Ext.get(this.id).query('.pimcore_block_entry[data-name="' + this.name + '"][key]');

        var limitReached = false;
        if(this.config['limit'] && this.elements.length >= this.config.limit) {
            limitReached = true;
        }

        if (this.elements.length < 1) {
            this.createInitalControls();
        }
        else {
            Ext.get(this.id).removeCls("pimcore_block_buttons");

            for (var i = 0; i < this.elements.length; i++) {
                if(!this.elements[i].key) {
                    this.elements[i].key = this.elements[i].getAttribute("key");
                }

                this.refreshControls(this.elements[i], limitReached);
            }
        }
    },

    refreshControls: function (element, limitReached) {
        var plusButton, minusButton, upButton, downButton, plusDiv, minusDiv, upDiv, downDiv, amountDiv, amountBox;

        // re-initialize amount boxes on every refresh
        amountBox = Ext.get(element).query('.pimcore_block_amount[data-name="' + this.name + '"] .pimcore_block_amount_select', false)[0];
        if (typeof amountBox !== 'undefined') {
            amountBox.remove();
        }

        plusButton = Ext.get(element).query('.pimcore_block_plus[data-name="' + this.name + '"] .pimcore_block_button_plus', false)[0];
        if (typeof plusButton !== 'undefined') {
            plusButton.remove();
        }

        if (!limitReached) {
            amountDiv = Ext.get(element).query('.pimcore_block_amount[data-name="' + this.name + '"]')[0];
            if (amountDiv) {
                amountBox = new Ext.form.ComboBox({
                    cls: "pimcore_block_amount_select",
                    store: this.getAmountValues(),
                    value: 1,
                    mode: "local",
                    editable: false,
                    triggerAction: "all",
                    width: 45
                });
                amountBox.render(amountDiv);
            }

            plusDiv = Ext.get(element).query('.pimcore_block_plus[data-name="' + this.name + '"]')[0];
            if (plusDiv) {
                plusButton = new Ext.Button({
                    cls: "pimcore_block_button_plus",
                    hidden: true,
                    iconCls: "pimcore_icon_plus",
                    listeners: {
                        "click": this.addBlock.bind(this, element, amountBox)
                    }
                });
                plusButton.render(plusDiv);
            }
        }

        // minus button
        minusButton = Ext.get(element).query('.pimcore_block_minus[data-name="' + this.name + '"] .pimcore_block_button_minus')[0];
        if (typeof minusButton === 'undefined') {
            minusDiv = Ext.get(element).query('.pimcore_block_minus[data-name="' + this.name + '"]')[0];
            if (minusDiv) {
                minusButton = new Ext.Button({
                    cls: "pimcore_block_button_minus",
                    iconCls: "pimcore_icon_minus",
                    listeners: {
                        "click": this.removeBlock.bind(this, element)
                    }
                });
                minusButton.render(minusDiv);
            }
        }

        // up button
        upButton = Ext.get(element).query('.pimcore_block_up[data-name="' + this.name + '"] .pimcore_block_button_up')[0];
        if (typeof upButton === 'undefined') {
            upDiv = Ext.get(element).query('.pimcore_block_up[data-name="' + this.name + '"]')[0];
            if (upDiv) {
                upButton = new Ext.Button({
                    cls: "pimcore_block_button_up",
                    iconCls: "pimcore_icon_up",
                    listeners: {
                        "click": this.moveBlockUp.bind(this, element)
                    }
                });
                upButton.render(upDiv);
            }
        }

        // down button
        downButton = Ext.get(element).query('.pimcore_block_down[data-name="' + this.name + '"] .pimcore_block_button_down')[0];
        if (typeof downButton === 'undefined') {
            downDiv = Ext.get(element).query('.pimcore_block_down[data-name="' + this.name + '"]')[0];
            if (downDiv) {
                downButton = new Ext.Button({
                    cls: "pimcore_block_button_down",
                    iconCls: "pimcore_icon_down",
                    listeners: {
                        "click": this.moveBlockDown.bind(this, element)
                    }
                });
                downButton.render(downDiv);
            }
        }
    },

    render: function () {
        this.refresh();

        Ext.get(this.id).on('mouseenter', function (event) {
            Ext.get(this.id).addCls('pimcore_block_entry_over');
        });

        Ext.get(this.id).on('mouseleave', function (event) {
            Ext.get(this.id).removeCls('pimcore_block_entry_over');
        });
    },

    setInherited: function ($super, inherited) {
        var elements = Ext.get(this.id).query('.pimcore_block_buttons[data-name="' + this.name + '"]');
        if(elements.length > 0) {
            for(var i=0; i<elements.length; i++) {
                $super(inherited, Ext.get(elements[i]));
            }
        }
    },

    getAmountValues: function () {
        var amountValues = [];

        if(typeof this.config.limit != "undefined") {
            var maxAddValues = intval(this.config.limit) - this.elements.length;
            if(maxAddValues > 10) {
                maxAddValues = 10;
            }
            for (var a=1; a<=maxAddValues; a++) {
                amountValues.push(a);
            }
        } else {
            amountValues = [1,2,3,4,5,6,7,8,9,10];
        }

        return amountValues;
    },

    createInitalControls: function (amountValues) {
        var amountEl = document.createElement("div");
        amountEl.setAttribute("class", "pimcore_block_amount");
        amountEl.setAttribute("data-name", this.name);

        var plusEl = document.createElement("div");
        plusEl.setAttribute("class", "pimcore_block_plus");
        plusEl.setAttribute("data-name", this.name);

        var clearEl = document.createElement("div");
        clearEl.setAttribute("class", "pimcore_block_clear");
        clearEl.setAttribute("data-name", this.name);

        Ext.get(this.id).appendChild(amountEl);
        Ext.get(this.id).appendChild(plusEl);
        Ext.get(this.id).appendChild(clearEl);

        // amount selection
        var amountBox = new Ext.form.ComboBox({
            cls: "pimcore_block_amount_select",
            store: this.getAmountValues(),
            mode: "local",
            triggerAction: "all",
            editable: false,
            value: 1,
            width: 55
        });
        amountBox.render(amountEl);

        // plus button
        var plusButton = new Ext.Button({
            cls: "pimcore_block_button_plus",
            iconCls: "pimcore_icon_plus",
            listeners: {
                "click": this.addBlock.bind(this, null, amountBox)
            }
        });
        plusButton.render(plusEl);

        Ext.get(this.id).addCls("pimcore_block_limitnotreached pimcore_block_buttons");
    },

    addBlock : function (element, amountbox, reload = true) {

        var index = this.getElementIndex(element) + 1;
        var amount = 1;

        // get amount of new blocks
        try {
            amount = amountbox.getValue();
        }
        catch (e) {
        }

        if (intval(amount) < 1) {
            amount = 1;
        }

        // get next higher key
        var nextKey = 0;
        var currentKey;

        for (var i = 0; i < this.elements.length; i++) {
            currentKey = intval(this.elements[i].key);
            if (currentKey > nextKey) {
                nextKey = currentKey;
            }
        }

        if(this.config['reload'] === true) {
            var args = [index, 0];
            var firstNewKey = nextKey+1;

            for (var p = 0; p < amount; p++) {
                nextKey++;
                args.push({key: nextKey});
            }

            this.elements.splice.apply(this.elements, args);

            editWindow.lastScrollposition = '#' + this.id + ' .pimcore_block_entry[data-name="' + this.name + '"][key="' + firstNewKey + '"]';
            if(reload) {
                this.reloadDocument();
            }
        } else {
            let template = this.config['template']['html'];
            let elements;
            for (let p = 0; p < amount; p++) {
                elements = Ext.get(this.id).query('.pimcore_block_entry[data-name="' + this.name + '"][key]');
                nextKey++;
                let blockHtml = template;
                blockHtml = blockHtml.replaceAll(new RegExp('"([^"]+):1000000.' + this.getRealName() + '("|:)', 'g'), '"' + this.getName() + '$2');
                blockHtml = blockHtml.replaceAll(new RegExp('"pimcore_editable_([^"]+)_1000000_' + this.getRealName() + '_', 'g'), '"pimcore_editable_' + this.getName().replaceAll(/(:|\.)/g, '_') + '_');
                blockHtml = blockHtml.replaceAll(':1000000.', ':' + nextKey + '.');
                blockHtml = blockHtml.replaceAll('_1000000_', '_' + nextKey + '_');
                blockHtml = blockHtml.replaceAll('="1000000"', '="' + nextKey + '"');
                blockHtml = blockHtml.replaceAll(', 1000000"', ', ' + nextKey + '"');

                if(!elements.length) {
                    Ext.get(this.id).setHtml(blockHtml);
                } else if (elements[index-1]) {
                    Ext.get(elements[index-1]).insertHtml('afterEnd', blockHtml, true);
                }

                this.config['template']['editables'].forEach(editableDef => {
                    let editable = Ext.clone(editableDef);
                    editable['id'] = editable['id'].replace(new RegExp('pimcore_editable_([^"]+)_1000000_' + this.getRealName() + '_'), 'pimcore_editable_' + this.getName().replaceAll(/(:|\.)/g, '_') + '_');
                    editable['id'] = editable['id'].replaceAll('_1000000_', '_' + nextKey + '_');
                    editable['name'] = editable['name'].replace(new RegExp('^([^"]+):1000000.' + this.getRealName() + ':'), this.getName() + ':');
                    editable['name'] = editable['name'].replaceAll(':1000000.', ':' + nextKey + '.');
                    if (editable['config']['blockStateStack']) {
                        let blockStateStack = JSON.parse(editable['config']['blockStateStack']);
                        for (let i = 0; i < blockStateStack.length; i++) {
                            if (blockStateStack[i].indexes) {
                                for (let j = 0; j < blockStateStack[i].indexes.length; j++) {
                                    if (blockStateStack[i].indexes[j] === 1000000) {
                                        blockStateStack[i].indexes[j] = nextKey;
                                    }
                                }
                            }
                        }
                        editable['config']['blockStateStack'] = JSON.stringify(blockStateStack);
                    }
                    editableManager.addByDefinition(editable);
                });
            }

            this.refresh();
        }
    },

    removeBlock: function (element) {

        var index = this.getElementIndex(element);

        // Add a new default block before removing last block.
        if(is_numeric(this.config['default']) && this.elements.length === this.config['default']) {
            this.addBlock(element, null, false); // do not reload document, will happen later here.
        }
        this.elements.splice(index, 1);
        Ext.get(element).remove();

        if(this.config['reload'] === true) {
            this.reloadDocument();
        } else {
            this.refresh();
        }
    },

    moveBlockDown: function (element) {
        var index = this.getElementIndex(element);
        if (index < (this.elements.length-1)) {
            if(this.config['reload'] === true) {
                var x = this.elements[index];
                var y = this.elements[index + 1];

                this.elements[index + 1] = x;
                this.elements[index] = y;

                this.reloadDocument();
            } else {
                Ext.get(element).insertAfter(this.elements[index+1]);
                this.refresh();
            }
        }
    },

    moveBlockUp: function (element) {
        var index = this.getElementIndex(element);
        if (index > 0) {
            if(this.config['reload'] === true) {
                var x = this.elements[index];
                var y = this.elements[index - 1];

                this.elements[index - 1] = x;
                this.elements[index] = y;

                this.reloadDocument();
            } else {
                Ext.get(element).insertBefore(this.elements[index-1]);
                this.refresh();
            }
        }
    },

    getElementIndex: function (element) {

        try {
            var key = Ext.get(element).dom.key;
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == key) {
                    var index = i;
                    break;
                }
            }
        }
        catch (e) {
            return 0;
        }

        return index;
    },

    getValue: function () {
        var data = [];
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i]) {
                if (this.elements[i].key) {
                    data.push(this.elements[i].key);
                }
            }
        }

        return data;
    },

    getType: function () {
        return "block";
    }
});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.scheduledblock");
/**
 * @private
 */
pimcore.document.editables.scheduledblock = Class.create(pimcore.document.editables.block, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.elements = Ext.get(id).query('.pimcore_block_entry[data-name="' + name + '"][key]');

        for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].key = this.elements[i].getAttribute("key");
                this.elements[i].date = this.elements[i].getAttribute("date");

                Ext.get(this.elements[i]).setVisibilityMode(Ext.Element.DISPLAY);
                Ext.get(this.elements[i]).setVisible(false);
        }

        Ext.get(id).on('mouseenter', function (event) {
            Ext.get(id).addCls('pimcore_block_entry_over');
        });

        Ext.get(id).on('mouseleave', function (event) {
            Ext.get(id).removeCls('pimcore_block_entry_over');
        });

        this.renderControls();
    },

    /**
     * generates id for current selected date that is stored in globalmanager
     * in order to jup to the correct date when view is reloaded because new
     * timestamp was added
     *
     * @returns {string}
     */
    getTmpStoreId: function() {
        var documentId = window.editWindow.document.id;
        return "pimcore_scheduled_block_tmp_date_" + documentId + "_" + this.name;
    },

    renderControls: function() {

        var controlDiv = Ext.get(this.id).query('.pimcore_scheduled_block_controls')[0];

        var controlItems = [];

        var initialDate = new Date();
        if(top.pimcore.globalmanager.get(this.getTmpStoreId())) {
            initialDate = top.pimcore.globalmanager.get(this.getTmpStoreId());
            top.pimcore.globalmanager.remove(this.getTmpStoreId());
        }

        this.dateField = new Ext.form.DateField({
            cls: "pimcore_block_field_date",
            value: initialDate,
            region: 'west'
        });
          
        this.dateField.on('select', function() {
            this.loadTimestampsForDate();
        }.bind(this));
      
        controlItems.push(this.dateField);

        this.slider = Ext.create('Ext.pimcore.slider.Milestone', {
            width: '100%',
            region: 'center',
            style: 'padding-left: 10px; padding-right: 10px'
        });

        controlItems.push(this.slider);
        var plusButton = new Ext.Button({
            cls: "pimcore_block_button_plus",
            iconCls: "pimcore_icon_plus",
            region: 'east',
            listeners: {
                "click": function() {
                    this.addBlock(this.dateField.getValue());
                }.bind(this)
            }
        });
        controlItems.push(plusButton);

        var jumpMenuEntries = [];
        for (var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i];

            var timestamp = new Date(element.date * 1000);

            jumpMenuEntries.push({
                text: Ext.Date.format(timestamp, pimcore.globalmanager.get('localeDateTime').getShortDateTimeFormat()),
                iconCls: 'pimcore_icon_time',
                handler: function(element, timestamp) {
                    this.dateField.setValue(timestamp);
                    this.slider.activateThumbByValue(element.date);
                }.bind(this, element, timestamp)
            });
        }

        if(jumpMenuEntries.length > 0) {
            jumpMenuEntries.push({
                xtype: 'menuseparator'
            });
        }

        jumpMenuEntries.push({
            text: t('scheduled_block_delete_all_in_past'),
            iconCls: 'pimcore_icon_delete',
            handler: function(element, timestamp) {
                Ext.MessageBox.confirm("", t("scheduled_block_really_delete_past"), function (buttonValue) {
                    if (buttonValue == "yes") {
                        this.cleanupTimestamps(false);
                    }
                }.bind(this));
            }.bind(this)
        });

        jumpMenuEntries.push({
            text: t('scheduled_block_delete_all'),
            iconCls: 'pimcore_icon_delete',
            handler: function(element, timestamp) {
                Ext.MessageBox.confirm("", t("scheduled_block_really_delete_all"), function (buttonValue) {
                    if (buttonValue == "yes") {
                        this.cleanupTimestamps(true);
                    }
                }.bind(this));
            }.bind(this)
        });

        var jumpButton = new Ext.Button({
            iconCls: "pimcore_icon_time",
            region: 'east',
            menu: jumpMenuEntries
        });
        controlItems.push(jumpButton);


        var controlBar = new Ext.Panel({
            items: controlItems,
            layout: 'border',
            height: 35,
            border: false,
            style: "margin-bottom: 10px"
        });
        controlBar.render(controlDiv);

        this.loadTimestampsForDate();
    },

    cleanupTimestamps: function(allTimestamps) {

        var currentTimestamp = (new Date()).getTime() / 1000;

        if(allTimestamps) {
            for (var i = 0; i < this.elements.length; i++) {
                var element = this.elements[i];
                var index = this.getElementIndex(element);
                this.elements.splice(index, 1);
                Ext.get(element).remove();
            }
        } else {
            var previousElement = null;
            for (var i = 0; i < this.elements.length; i++) {
                var element = this.elements[i];
                if(previousElement) {
                    var index = this.getElementIndex(previousElement);
                    this.elements.splice(index, 1);
                    Ext.get(previousElement).remove();
                }
                if(element.date < currentTimestamp) {
                    previousElement = element;
                }
            }
        }

        this.reloadDocument();
    },

    loadTimestampsForDate: function() {
        var date = this.dateField.getValue();

        this.slider.initDate(date);

        var timestampFrom = date.getTime() / 1000;
        var timestampTo = timestampFrom + 86399; //plus one day

        var firstElementVisible = false;
        var latestPreviousElement = null;
        for (var i = 0; i < this.elements.length; i++) {

            var element = this.elements[i];

            if(element.date >= timestampFrom && element.date <= timestampTo) {

                var timestampMarker = this.slider.addTimestamp(
                    element.date,
                    element.key,
                    function(element, newValue) {
                        element.date = newValue;
                    }.bind(this, element),
                    this.showElement.bind(this, element),
                    this.removeBlock.bind(this, element)
                );

                if(!firstElementVisible) {
                    this.slider.activateThumb(timestampMarker);
                    firstElementVisible = true;
                }
            } else {
                //remember last element in front of current day - for showing if no element is in current day
                if(element.date < timestampFrom) {
                    if(!latestPreviousElement || latestPreviousElement.date < element.date) {
                        latestPreviousElement = element;
                    }
                }
            }
        }

        if(!firstElementVisible) {
            if(latestPreviousElement) {
                this.showElement(latestPreviousElement, latestPreviousElement.key);
            } else {
                this.hideAllElements();
            }
        }

    },

    hideAllElements: function() {
        for(var i = 0; i < this.elements.length; i++) {
            Ext.get(this.elements[i]).setVisible(false);
        }
    },

    showElement: function(element, key) {
        this.hideAllElements();
        Ext.get(element).setVisible(true);
    },

    createInitalControls: function (amountValues) {
        //nothing to do, but needs to be overwritten
    },

    addBlock : function (date) {
        // get next higher key
        var nextKey = 0;
        var currentKey;

        for (var i = 0; i < this.elements.length; i++) {
            currentKey = intval(this.elements[i].key);
            if (currentKey > nextKey) {
                nextKey = currentKey;
            }
        }

        if(!date) {
            date = new Date();
        }

        nextKey++;

        this.elements.push({key: nextKey, date: (date.getTime()) / 1000});

        this.reloadDocument();

        pimcore.globalmanager.add(this.getTmpStoreId(),  date);

    },

    getValue: function () {
        var data = [];
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i]) {
                if (this.elements[i].key) {
                    data.push({
                        key: this.elements[i].key,
                        date: this.elements[i].date
                    });
                }
            }
        }

        return data;
    },

    getType: function () {
        return "scheduledblock";
    }
});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.date");
/**
 * @private
 */
pimcore.document.editables.date = Class.create(pimcore.document.editable, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.config.name = id + "_editable";
        this.data = null;
        if(data) {
            this.data = new Date(intval(data) * 1000);
        }
    },

    render: function () {
        this.setupWrapper();
        
        if (this.config.format && this.config.format.includes('%')) {
            console.warn('Deprecated: Date format contains % symbols which is used for strftime, please the use parameters according Ext.Date formatting syntax instead.');

            // replace any % prefixed parts from strftime format
            this.config.format = this.config.format.replace(/%([a-zA-Z])/g, '$1');
        }
        
        if(this.data) {
            this.config.value = this.data;
        }

        this.element = new Ext.form.DateField(this.config);
        if (this.config["reload"]) {
            this.element.on("change", this.reloadDocument);
        }

        this.element.render(this.id);
    },

    getValue: function () {
        if(this.element) {
            return this.element.getValue();
        } else if (this.data) {
            return Ext.Date.format(this.data, "Y-m-d\\TH:i:s");
        }
    },

    getType: function () {
        return "date";
    }
});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.relation");
/**
 * @private
 */
pimcore.document.editables.relation = Class.create(pimcore.document.editable, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.data = {
            id: null,
            path: "",
            type: ""
        };

        if (data) {
            this.data = data;
            this.config.value = this.data.path;
        }

        this.config.enableKeyEvents = true;

        if(typeof this.config.emptyText == "undefined") {
            this.config.emptyText = t("drop_element_here");
        }

        this.config.name = id + "_editable";
    },

    render: function () {
        this.setupWrapper();

        if (!this.config.width) {
            this.config.width = Ext.get(this.id).getWidth() ?? Ext.get(this.id).getWidth() - 2;
        }

        const buttons = [
            {
                xtype: "button",
                iconCls: "pimcore_icon_open",
                style: "margin-left: 5px;",
                handler: this.openElement.bind(this)
            }, {
                xtype: "button",
                iconCls: "pimcore_icon_delete",
                style: "margin-left: 5px",
                handler: this.empty.bind(this)
            }
        ];

        if(pimcore.helpers.hasSearchImplementation()){
            buttons.push({
                xtype: "button",
                iconCls: "pimcore_icon_search",
                style: "margin-left: 5px",
                handler: this.openSearchEditor.bind(this)
            });
        }

        this.buttonsForm = Ext.create('Ext.form.FieldContainer', {
            layout: 'hbox',
            items: buttons
        });

        // Create temporary element with only icons, get its width, subtract total width with 
        // created element width and then destroy temporary element
        this.buttonsForm.render(this.id);
        this.config.width = this.config.width - Ext.get(this.buttonsForm.id).getWidth();
        this.buttonsForm.destroy();

        this.element = new Ext.form.TextField(this.config);

        this.element.on("render", function (el) {
            // register at global DnD manager
            dndManager.addDropTarget(el.getEl(), this.onNodeOver.bind(this), this.onNodeDrop.bind(this));

            el.getEl().on("contextmenu", this.onContextMenu.bind(this));
        }.bind(this));

        // disable typing into the textfield
        this.element.on("keyup", function (element, event) {
            element.setValue(this.data.path);
        }.bind(this));

        var items = [this.element].concat(buttons);

        this.composite = Ext.create('Ext.form.FieldContainer', {
            layout: 'hbox',
            items: items
        });

        this.composite.render(this.id);
    },

    uploadDialog: function () {
        pimcore.helpers.assetSingleUploadDialog(this.config["uploadPath"], "path", function (res) {
            try {
                var data = Ext.decode(res.response.responseText);
                if(data["id"]) {

                    if (this.config["subtypes"]) {
                        var found = false;
                        var typeKeys = Object.keys(this.config.subtypes);
                        for (var st = 0; st < typeKeys.length; st++) {
                            for (var i = 0; i < this.config.subtypes[typeKeys[st]].length; i++) {
                                if (this.config.subtypes[typeKeys[st]][i] == data["type"]) {
                                    found = true;
                                    break;
                                }
                            }
                        }
                        if (!found) {
                            return false;
                        }
                    }

                    this.data.id = data["id"];
                    this.data.subtype = data["type"];
                    this.data.elementType = "asset";
                    this.data.path = data["fullpath"];
                    this.element.setValue(data["fullpath"]);
                }
            } catch (e) {
                console.log(e);
            }
        }.bind(this));
    },

    onNodeOver: function(target, dd, e, data) {
        var record = data.records[0];

        record = this.getCustomPimcoreDropData(record);
        if (data.records.length === 1 && this.dndAllowed(record)) {
            return Ext.dd.DropZone.prototype.dropAllowed;
        }
        else {
            return Ext.dd.DropZone.prototype.dropNotAllowed;
        }
    },

    onNodeDrop: function (target, dd, e, data) {

        if(!pimcore.helpers.dragAndDropValidateSingleItem(data)) {
            return false;
        }

        var record = data.records[0];
        record = this.getCustomPimcoreDropData(record);

        if(!this.dndAllowed(record)){
            return false;
        }


        this.data.id = record.data.id;
        this.data.subtype = record.data.type;
        this.data.elementType = record.data.elementType;
        this.data.path = record.data.path;

        this.element.setValue(record.data.path);

        if (this.config.reload) {
            this.reloadDocument();
        }

        return true;
    },

    dndAllowed: function(data) {

        var i;
        var found;

        var checkSubType = false;
        var checkClass = false;
        var type;

        //only is legacy
        if (this.config.only && !this.config.types) {
            this.config.types = [this.config.only];
        }

        //type check   (asset,document,object)
        if (this.config.types) {
            found = false;
            for (i = 0; i < this.config.types.length; i++) {
                type = this.config.types[i];
                if (type == data.data.elementType) {
                    found = true;

                    if((typeof this.config.subtypes !== "undefined") && this.config.subtypes[type] && this.config.subtypes[type].length) {
                        checkSubType = true;
                    }
                    if(data.data.elementType == "object" && this.config.classes) {
                        checkClass = true;
                    }
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }

        //subtype check  (folder,page,snippet ... )
        if (checkSubType) {

            found = false;
            var subTypes = this.config.subtypes[type];
            for (i = 0; i < subTypes.length; i++) {
                if (subTypes[i] == data.data.type) {
                    found = true;
                    break;
                }

            }
            if (!found) {
                return false;
            }
        }

        //object class check
        if (checkClass) {
            found = false;
            for (i = 0; i < this.config.classes.length; i++) {
                if (this.config.classes[i] == data.data.className) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }

        return true;
    },

    onContextMenu: function (e) {

        var menu = new Ext.menu.Menu();

        if(this.data["id"]) {
            menu.add(new Ext.menu.Item({
                text: t('empty'),
                iconCls: "pimcore_icon_delete",
                handler: this.empty.bind(this)
            }));

            menu.add(new Ext.menu.Item({
                text: t('open'),
                iconCls: "pimcore_icon_open",
                handler: this.openElement.bind(this)
            }));

            if (pimcore.elementservice.showLocateInTreeButton("document")) {
                menu.add(new Ext.menu.Item({
                    text: t('show_in_tree'),
                    iconCls: "pimcore_icon_show_in_tree",
                    handler: function (item) {
                        item.parentMenu.destroy();
                        pimcore.treenodelocator.showInTree(this.data.id, this.data.elementType);
                    }.bind(this)
                }));
            }
        }

        if(pimcore.helpers.hasSearchImplementation()) {
            menu.add(new Ext.menu.Item({
                text: t('search'),
                iconCls: "pimcore_icon_search",
                handler: function (item) {
                    item.parentMenu.destroy();
                    this.openSearchEditor();
                }.bind(this)
            }));
        }

        if((this.config["types"] && in_array("asset",this.config.types)) || !this.config["types"]) {
            menu.add(new Ext.menu.Item({
                text: t('upload'),
                cls: "pimcore_inline_upload",
                iconCls: "pimcore_icon_upload",
                handler: function (item) {
                    item.parentMenu.destroy();
                    this.uploadDialog();
                }.bind(this)
            }));
        }

        menu.showAt(e.getXY());

        e.stopEvent();
    },

    openSearchEditor: function () {

        //only is legacy
        if (this.config.only && !this.config.types) {
            this.config.types = [this.config.only];
        }

        pimcore.helpers.itemselector(false, this.addDataFromSelector.bind(this), {
            type: this.config.types,
            subtype: this.config.subtypes,
            specific: {
                classes: this.config["classes"]
            }
        }, {
            context: this.getContext()
        });
    },

    addDataFromSelector: function (item) {
        if (item) {
            this.data.id = item.id;
            this.data.subtype = item.subtype;
            this.data.elementType = item.type;
            this.data.path = item.fullpath;

            this.element.setValue(this.data.path);
            if (this.config.reload) {
                this.reloadDocument();
            }
        }
    },

    openElement: function () {
        if (this.data.id && this.data.elementType) {
            pimcore.helpers.openElement(this.data.id, this.data.elementType, this.data.subtype);
        }
    },

    empty: function () {
        this.data = {};
        this.element.setValue(this.data.path);
        if (this.config.reload) {
            this.reloadDocument();
        }
    },

    getValue: function () {
        return {
            id: this.data.id,
            type: this.data.elementType,
            subtype: this.data.subtype
        };
    },

    getType: function () {
        return "relation";
    }
});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.relations");
/**
 * @private
 */
pimcore.document.editables.relations = Class.create(pimcore.document.editable, {

    initialize: function ($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        var modelName = 'DocumentsMultihrefEntry';
        if (!Ext.ClassManager.isCreated(modelName)) {
            Ext.define(modelName, {
                extend: 'Ext.data.Model',
                idProperty: 'rowId',
                fields: [
                    'id',
                    'path',
                    'type',
                    'subtype'
                ]
            });
        }

        this.store = new Ext.data.ArrayStore({
            data: data,
            model: modelName
        });
    },

    render: function () {
        this.setupWrapper();

        var tbar = [
            Ext.create('Ext.toolbar.Spacer', {
                width: 24,
                height: 24,
                cls: "pimcore_icon_droptarget"
            }),
            Ext.create('Ext.toolbar.TextItem', {
                text: "<b>" + (this.config.title ? this.config.title : "") + "</b>"
            }),
            "->",
            {
                xtype: "button",
                iconCls: "pimcore_icon_delete",
                handler: this.empty.bind(this)
            }
        ];

        if(pimcore.helpers.hasSearchImplementation()){
            tbar.push({
                xtype: "button",
                iconCls: "pimcore_icon_search",
                handler: this.openSearchEditor.bind(this)
            });
        }

        if (this.canInlineUpload()) {
            tbar.push({
                xtype: "button",
                cls: "pimcore_inline_upload",
                iconCls: "pimcore_icon_upload",
                handler: this.uploadDialog.bind(this)
            });
        }

        var elementConfig = {
            store: this.store,
            bodyStyle: "color:#000",
            selModel: Ext.create('Ext.selection.RowModel', {}),

            columns: {
                defaults: {
                    sortable: false
                },
                items: [
                    {text: 'ID', dataIndex: 'id', width: 50},
                    {text: t("path"), dataIndex: 'path', flex: 200},
                    {text: t("type"), dataIndex: 'type', width: 100},
                    {text: t("subtype"), dataIndex: 'subtype', width: 100},
                    {
                        xtype: 'actioncolumn',
                        menuText: t('up'),
                        width: 30,
                        items: [
                            {
                                tooltip: t('up'),
                                icon: "/bundles/pimcoreadmin/img/flat-color-icons/up.svg",
                                handler: function (grid, rowIndex) {
                                    if (rowIndex > 0) {
                                        var rec = grid.getStore().getAt(rowIndex);
                                        grid.getStore().removeAt(rowIndex);
                                        grid.getStore().insert(rowIndex - 1, [rec]);

                                        if (this.config.reload) {
                                            this.reloadDocument();
                                        }
                                    }
                                }.bind(this)
                            }
                        ]
                    },
                    {
                        xtype: 'actioncolumn',
                        menuText: t('down'),
                        width: 30,
                        items: [
                            {
                                tooltip: t('down'),
                                icon: "/bundles/pimcoreadmin/img/flat-color-icons/down.svg",
                                handler: function (grid, rowIndex) {
                                    if (rowIndex < (grid.getStore().getCount() - 1)) {
                                        var rec = grid.getStore().getAt(rowIndex);
                                        grid.getStore().removeAt(rowIndex);
                                        grid.getStore().insert(rowIndex + 1, [rec]);

                                        if (this.config.reload) {
                                            this.reloadDocument();
                                        }
                                    }
                                }.bind(this)
                            }
                        ]
                    },
                    {
                        xtype: 'actioncolumn',
                        menuText: t('open'),
                        width: 30,
                        items: [{
                            tooltip: t('open'),
                            icon: "/bundles/pimcoreadmin/img/flat-color-icons/open_file.svg",
                            handler: function (grid, rowIndex) {
                                var data = grid.getStore().getAt(rowIndex);
                                var subtype = data.data.subtype;
                                if (data.data.type == "object" && data.data.subtype != "folder") {
                                    subtype = "object";
                                }
                                pimcore.helpers.openElement(data.data.id, data.data.type, subtype);
                            }.bind(this)
                        }]
                    },
                    {
                        xtype: 'actioncolumn',
                        menuText: t('remove'),
                        width: 30,
                        items: [{
                            tooltip: t('remove'),
                            icon: "/bundles/pimcoreadmin/img/flat-color-icons/delete.svg",
                            handler: function (grid, rowIndex) {
                                grid.getStore().removeAt(rowIndex);

                                if (this.config.reload) {
                                    this.reloadDocument();
                                }
                            }.bind(this)
                        }]
                    }
                ]
            },
            tbar: {
                items: tbar
            }
        };

        // height specifics
        if (typeof this.config.height != "undefined") {
            elementConfig.height = this.config.height;
        } else {
            elementConfig.autoHeight = true;
        }

        // width specifics
        if (typeof this.config.width != "undefined") {
            elementConfig.width = this.config.width;
        }

        this.element = new Ext.grid.GridPanel(elementConfig);

        this.element.on("rowcontextmenu", this.onRowContextmenu.bind(this));
        //this.element.reference = this;

        this.element.on("render", function (el) {
            // register at global DnD manager
            dndManager.addDropTarget(this.element.getEl(),
                this.onNodeOver.bind(this),
                this.onNodeDrop.bind(this));

        }.bind(this));

        this.element.render(this.id);
    },

    canInlineUpload: function() {
        if(this.config["disableInlineUpload"] === true) {
            return false;
        }

        // no assets allowed, disable inline upload
        if(this.config["types"] && this.config["types"].length && this.config["types"].indexOf("asset") === -1) {
            return false;
        }

        return true;
    },

    uploadDialog: function () {
        pimcore.helpers.assetSingleUploadDialog(this.config["uploadPath"], "path", function (res) {
            try {
                var data = Ext.decode(res.response.responseText);
                if (data["id"]) {
                    this.store.add({
                        id: data["id"],
                        path: data["fullpath"],
                        type: "asset",
                        subtype: data["type"]
                    });

                    if (this.config.reload) {
                        this.reloadDocument();
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }.bind(this));
    },

    onNodeOver: function (target, dd, e, data) {
        var returnValue = Ext.dd.DropZone.prototype.dropAllowed;
        data.records.forEach(function (record) {
            record = this.getCustomPimcoreDropData(record);
            if (!this.dndAllowed(record)) {
                returnValue = Ext.dd.DropZone.prototype.dropNotAllowed;
            }
        }.bind(this));

        return returnValue;
    },

    onNodeDrop: function (target, dd, e, data) {

        var elementsToAdd = [];

        data.records.forEach(function (record) {
            if (!this.dndAllowed(this.getCustomPimcoreDropData(record))) {
                return false;
            }

            var data = record.data;

            var initData = {
                id: data.id,
                path: data.path,
                type: data.elementType
            };

            if (initData.type === "object") {
                if (data.className) {
                    initData.subtype = data.className;
                }
                else {
                    initData.subtype = "folder";
                }
            }

            if (initData.type === "document" || initData.type === "asset") {
                initData.subtype = data.type;
            }

            // check for existing element
            if (!this.elementAlreadyExists(initData.id, initData.type)) {
                elementsToAdd.push(initData);
            }
        }.bind(this));

        if(elementsToAdd.length) {
            this.store.add(elementsToAdd);

            if (this.config.reload) {
                this.reloadDocument();
            }

            return true;
        }

        return false;

    },

    dndAllowed: function (data) {

        var i;
        var found;

        var checkSubType = false;
        var checkClass = false;
        var type;

        //only is legacy
        if (this.config.only && !this.config.types) {
            this.config.types = [this.config.only];
        }

        //type check   (asset,document,object)
        if (this.config.types) {
            found = false;
            for (i = 0; i < this.config.types.length; i++) {
                type = this.config.types[i];
                if (type == data.data.elementType) {
                    found = true;

                    if (this.config.subtypes && this.config.subtypes[type] && this.config.subtypes[type].length) {
                        checkSubType = true;
                    }
                    if (data.data.elementType == "object" && this.config.classes) {
                        checkClass = true;
                    }
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }

        //subtype check  (folder,page,snippet ... )
        if (checkSubType) {

            found = false;
            var subTypes = this.config.subtypes[type];
            for (i = 0; i < subTypes.length; i++) {
                if (subTypes[i] == data.data.type) {
                    found = true;
                    if (data.data.type == "folder" && checkClass) {
                        checkClass = false;
                    }
                    break;
                }

            }
            if (!found) {
                return false;
            }
        }

        //object class check
        if (checkClass) {
            found = false;
            for (i = 0; i < this.config.classes.length; i++) {
                if (this.config.classes[i] == data.data.className) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }

        return true;
    },

    onRowContextmenu: function (grid, record, tr, rowIndex, e, eOpts) {

        var menu = new Ext.menu.Menu();

        menu.add(new Ext.menu.Item({
            text: t('remove'),
            iconCls: "pimcore_icon_delete",
            handler: this.removeElement.bind(this, rowIndex)
        }));

        menu.add(new Ext.menu.Item({
            text: t('open'),
            iconCls: "pimcore_icon_open",
            handler: function (record, item) {

                item.parentMenu.destroy();

                var subtype = record.data.subtype;
                if (record.data.type == "object" && record.data.subtype != "folder") {
                    subtype = "object";
                }
                pimcore.helpers.openElement(record.data.id, record.data.type, subtype);
            }.bind(this, record)
        }));

        if (pimcore.elementservice.showLocateInTreeButton("document")) {
            menu.add(new Ext.menu.Item({
                text: t('show_in_tree'),
                iconCls: "pimcore_icon_show_in_tree",
                handler: function (item) {
                    item.parentMenu.destroy();
                    pimcore.treenodelocator.showInTree(record.data.id, record.data.type);
                }.bind(this)
            }));
        }

        if(pimcore.helpers.hasSearchImplementation()) {
            menu.add(new Ext.menu.Item({
                text: t('search'),
                iconCls: "pimcore_icon_search",
                handler: function (item) {
                    item.parentMenu.destroy();
                    this.openSearchEditor();
                }.bind(this)
            }));
        }

        e.stopEvent();
        menu.showAt(e.pageX, e.pageY);
    },

    openSearchEditor: function () {

        pimcore.helpers.itemselector(true, this.addDataFromSelector.bind(this), {
                type: this.config.types,
                subtype: this.config.subtypes,
                specific: {
                    classes: this.config["classes"]
                }
            },
            {
                context: this.getContext()
            });

    },

    elementAlreadyExists: function (id, type) {

        // check for existing element
        var result = this.store.queryBy(function (id, type, record, rid) {
            if (record.data.id == id && record.data.type == type) {
                return true;
            }
            return false;
        }.bind(this, id, type));

        if (result.length < 1) {
            return false;
        }
        return true;
    },

    addDataFromSelector: function (items) {
        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                if (!this.elementAlreadyExists(items[i].id, items[i].type)) {

                    var subtype = items[i].subtype;
                    if (items[i].type == "object") {
                        if (items[i].subtype == "object") {
                            if (items[i].classname) {
                                subtype = items[i].classname;
                            }
                        }
                    }

                    this.store.add({
                        id: items[i].id,
                        path: items[i].fullpath,
                        type: items[i].type,
                        subtype: subtype
                    });
                }
            }

            if (this.config.reload) {
                this.reloadDocument();
            }
        }
    },

    empty: function () {
        this.store.removeAll();

        if (this.config.reload) {
            this.reloadDocument();
        }
    },

    removeElement: function (index, item) {
        this.store.removeAt(index);
        item.parentMenu.destroy();

        if (this.config.reload) {
            this.reloadDocument();
        }
    },

    getValue: function () {
        var tmData = [];

        var data = this.store.queryBy(function (record, id) {
            return true;
        });


        for (var i = 0; i < data.items.length; i++) {
            tmData.push(data.items[i].data);
        }

        return tmData;
    },

    getType: function () {
        return "relations";
    }
});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.checkbox");
/**
 * @private
 */
pimcore.document.editables.checkbox = Class.create(pimcore.document.editable, {


    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.data = data ?? false;
    },

    render: function () {
        this.setupWrapper();
        this.htmlId = this.id + "_editable";

        var elContainer = Ext.get(this.id);

        var inputCheckbox = document.createElement("input");
        inputCheckbox.setAttribute('name', this.htmlId);
        inputCheckbox.setAttribute('type', 'checkbox');
        inputCheckbox.setAttribute('value', 'true');
        inputCheckbox.setAttribute('id', this.htmlId);
        if(this.data) {
            inputCheckbox.setAttribute('checked', 'checked');
        }

        elContainer.appendChild(inputCheckbox);

        if(this.config["label"]) {
            var labelCheckbox = document.createElement("label");
            labelCheckbox.setAttribute('for', this.htmlId);
            labelCheckbox.innerText = this.config["label"];
            elContainer.appendChild(labelCheckbox);
        }

        this.elComponent = Ext.get(this.htmlId);

        if (this.config.reload) {
            this.elComponent.on('change', this.reloadDocument);
        }
    },

    renderInDialogBox: function () {

        if(this.config['dialogBoxConfig'] &&
            (this.config['dialogBoxConfig']['label'] || this.config['dialogBoxConfig']['name'])) {
            this.config["label"] = this.config['dialogBoxConfig']['label'] ?? this.config['dialogBoxConfig']['name'];
        }

        this.render();
    },

    getValue: function () {
        if(this.elComponent) {
            return this.elComponent.dom.checked;
        }

        return this.data;
    },

    getType: function () {
        return "checkbox";
    }
});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.image");
/**
 * @private
 */
pimcore.document.editables.image = Class.create(pimcore.document.editable, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.datax = data ?? {};

        if (typeof this.config['uploadPath'] === 'undefined') {
            this.config['uploadPath'] = pimcore.settings.asset_default_upload_path;
        }

        this.originalDimensions = {
            width: this.config.width,
            height: this.config.height
        };
    },

    render: function () {
        this.setupWrapper();

        this.element = Ext.get(this.id);

        if(this.config["required"]) {
            this.required = this.config["required"];
        }

        this.checkValue();

        if (this.config["width"]) {
            this.element.setStyle("width", this.config["width"] + "px");
        }

        if (!this.config["height"]) {
            if (this.config["defaultHeight"]){
                this.element.setStyle("min-height", this.config["defaultHeight"] + "px");
            }
        } else {
            this.element.setStyle("height", this.config["height"] + "px");
        }

        // contextmenu
        this.element.on("contextmenu", this.onContextMenu.bind(this));

        // register at global DnD manager
        if (typeof dndManager != 'undefined') {
            dndManager.addDropTarget(this.element, this.onNodeOver.bind(this), this.onNodeDrop.bind(this));
        }

        // tooltip
        if(this.config["title"]) {
            new Ext.ToolTip({
                target: this.element,
                showDelay: 100,
                hideDelay: 0,
                trackMouse: true,
                html: this.config["title"]
            });
        }

        // alt / title
        this.altBar = document.createElement("div");
        this.element.appendChild(this.altBar);

        this.altBar = Ext.get(this.altBar);
        this.altBar.addCls("pimcore_editable_image_alt");
        this.altBar.setStyle({
            opacity: 0.8,
            display: "none"
        });

        this.altInput = new Ext.form.TextField({
            name: "altText",
            width: this.config.width
        });
        this.altInput.render(this.altBar);

        if (this.datax.alt) {
            this.altInput.setValue(this.datax.alt);
        }

        if (this.config.hidetext === true) {
            this.altBar.setStyle({
                display: "none",
                visibility: "hidden"
            });
        }

        // add additional drop targets
        if (this.config["dropClass"]) {
            var extra_drop_targets = Ext.query('.' + this.config.dropClass);

            for (var i = 0; i < extra_drop_targets.length; ++i) {
                var drop_el = Ext.get(extra_drop_targets[i]);
                dndManager.addDropTarget(drop_el, this.onNodeOver.bind(this), this.onNodeDrop.bind(this));
                drop_el.on("contextmenu", this.onContextMenu.bind(this));
            }
        }

        if(this.config["disableInlineUpload"] !== true) {
            this.element.insertHtml("beforeEnd",'<div class="pimcore_editable_droptarget_upload"></div>');
            this.element.addCls("pimcore_editable_image_empty");
            pimcore.helpers.registerAssetDnDSingleUpload(this.element.dom, this.config["uploadPath"], 'path', function (e) {
                if (e['asset']['type'] === "image" && !this.inherited) {
                    this.resetData();
                    this.datax.id = e['asset']['id'];

                    this.updateImage();
                    this.checkValue();
                    this.reload();

                    return true;
                } else {
                    pimcore.helpers.showNotification(t("error"), t('unsupported_filetype'), "error");
                }
            }.bind(this), null, this.getContext());
        } else {
            this.element.insertHtml("beforeEnd",'<div class="pimcore_editable_droptarget"></div>');
            this.element.addCls("pimcore_editable_image_no_upload_empty");
        }

        // insert image
        if (this.datax) {
            this.updateImage();
            this.checkValue();
        }
    },

    onContextMenu: function (e) {

        var menu = new Ext.menu.Menu();

        if(this.datax.id) {

            if(this.config['focal_point_context_menu_item']) {
                menu.add(new Ext.menu.Item({
                    text: t('set_focal_point'),
                    iconCls: "pimcore_icon_focal_point",
                    handler: function (item) {
                        pimcore.helpers.openAsset(this.datax.id, 'image');
                    }.bind(this)
                }));
            }

            menu.add(new Ext.menu.Item({
                text: t('select_specific_area_of_image'),
                iconCls: "pimcore_icon_image_region",
                handler: function (item) {
                    item.parentMenu.destroy();

                    this.openEditWindow();
                }.bind(this)
            }));

            menu.add(new Ext.menu.Item({
                text: t('add_marker_or_hotspots'),
                iconCls: "pimcore_icon_image pimcore_icon_overlay_edit",
                handler: function (item) {
                    item.parentMenu.destroy();

                    this.openHotspotWindow();
                }.bind(this)
            }));

            menu.add(new Ext.menu.Item({
                text: t('empty'),
                iconCls: "pimcore_icon_delete",
                handler: function (item) {
                    item.parentMenu.destroy();

                    this.empty();

                }.bind(this)
            }));
            menu.add(new Ext.menu.Item({
                text: t('open'),
                iconCls: "pimcore_icon_open",
                handler: function (item) {
                    item.parentMenu.destroy();
                    pimcore.helpers.openAsset(this.datax.id, "image");
                }.bind(this)
            }));

            if (pimcore.elementservice.showLocateInTreeButton("document")) {
                menu.add(new Ext.menu.Item({
                    text: t('show_in_tree'),
                    iconCls: "pimcore_icon_show_in_tree",
                    handler: function (item) {
                        item.parentMenu.destroy();
                        pimcore.treenodelocator.showInTree(this.datax.id, "asset");
                    }.bind(this)
                }));
            }
        }

        if(pimcore.helpers.hasSearchImplementation()) {
            menu.add(new Ext.menu.Item({
                text: t('search'),
                iconCls: "pimcore_icon_search",
                handler: function (item) {
                    item.parentMenu.destroy();
                    this.openSearchEditor();
                }.bind(this)
            }));
        }

        if(this.config["disableInlineUpload"] !== true) {
            menu.add(new Ext.menu.Item({
                text: t('upload'),
                cls: "pimcore_inline_upload",
                iconCls: "pimcore_icon_upload",
                handler: function (item) {
                    item.parentMenu.destroy();
                    this.uploadDialog();
                }.bind(this)
            }));
        }

        menu.showAt(e.pageX, e.pageY);
        e.stopEvent();
    },

    uploadDialog: function () {
        pimcore.helpers.assetSingleUploadDialog(this.config["uploadPath"], "path", function (res) {
            try {
                var data = Ext.decode(res.response.responseText);
                if(data["id"] && data["type"] == "image") {
                    this.resetData();
                    this.datax.id = data["id"];

                    this.updateImage();
                    this.checkValue(true);
                    this.reload();
                }
            } catch (e) {
                console.log(e);
            }
        }.bind(this),
        function (res) {
            const response = Ext.decode(res.response.responseText);
            if (response && response.success === false) {
                pimcore.helpers.showNotification(t("error"), response.message, "error",
                    res.response.responseText);
            } else {
                pimcore.helpers.showNotification(t("error"), res, "error",
                    res.response.responseText);
            }
        }.bind(this), [], "image");
    },

    onNodeOver: function(target, dd, e, data) {
        if (data.records.length === 1 && this.dndAllowed(data.records[0].data) && !this.inherited) {
            return Ext.dd.DropZone.prototype.dropAllowed;
        }
        else {
            return Ext.dd.DropZone.prototype.dropNotAllowed;
        }
    },

    onNodeDrop: function (target, dd, e, data) {

        if(!pimcore.helpers.dragAndDropValidateSingleItem(data)) {
            return false;
        }

        data = data.records[0].data;

        if (data.type === "image" && this.dndAllowed(data) && !this.inherited) {
            this.resetData();
            this.datax.id = data.id;

            this.updateImage();
            this.checkValue(true);
            this.reload();

            return true;
        }

        return false;
    },

    dndAllowed: function(data) {

        if(data.elementType !== "asset" || data.type !== "image"){
            return false;
        } else {
            return true;
        }

    },

    openSearchEditor: function () {
        pimcore.helpers.itemselector(false, this.addDataFromSelector.bind(this), {
            type: ["asset"],
            subtype: {
                asset: ["image"]
            }
        }, {
                context: this.getContext()
            }
        );
    },

    addDataFromSelector: function (item) {
        if(item) {
            this.resetData();
            this.datax.id = item.id;

            this.updateImage();
            this.checkValue();
            this.reload();

            return true;
        }
    },

    resetData: function () {
        this.datax = {
            id: null
        };
    },

    empty: function () {

        this.resetData();

        this.updateImage();
        this.element.addCls("pimcore_editable_image_empty");
        this.altBar.setStyle({
            display: "none"
        });
        this.checkValue(true);
        this.reload();
    },

    getThumbnailConfig: function(additionalConfig) {
        let merged = Ext.merge(this.datax, additionalConfig);
        merged = Ext.clone(merged);
        delete merged["hotspots"];
        delete merged["path"];
        return merged;

    },

    updateImage: function () {

        var path = "";
        var existingImage = this.element.dom.getElementsByTagName("img")[0];
        if (existingImage) {
            Ext.get(existingImage).remove();
        }

        if (!this.datax.id) {
            return;
        }


        if (!this.config["thumbnail"]) {
            if(!this.originalDimensions["width"] && !this.originalDimensions["height"]) {
                path = Routing.generate('pimcore_admin_asset_getimagethumbnail', this.getThumbnailConfig({
                    'width': this.element.getWidth(),
                    'aspectratio': true
                }));
            } else if (this.originalDimensions["width"]) {
                path = Routing.generate('pimcore_admin_asset_getimagethumbnail', this.getThumbnailConfig({
                    'width': this.originalDimensions["width"],
                    'aspectratio': true
                }));
            } else if (this.originalDimensions["height"]) {
                path = Routing.generate('pimcore_admin_asset_getimagethumbnail', this.getThumbnailConfig({
                    'height': this.originalDimensions["height"],
                    'aspectratio': true
                }));
            }
        } else if (typeof this.config.thumbnail == "string" || typeof this.config.thumbnail == "object") {
                path = Routing.generate('pimcore_admin_asset_getimagethumbnail', this.getThumbnailConfig({
                    'height': this.originalDimensions["height"],
                    'thumbnail': this.config.thumbnail,
                    'pimcore_editmode': '1'
                }));
        }

        var image = document.createElement("img");
        image.src = path;

        this.element.appendChild(image);

        // show alt input field
        this.altBar.setStyle({
            display: "block"
        });

        this.element.removeCls("pimcore_editable_image_empty");

        this.updateCounter = 0;
        this.updateDimensionsInterval = window.setInterval(this.updateDimensions.bind(this), 1000);
    },

    reload : function () {
        if (this.config.reload) {
            this.reloadDocument();
        }
    },

    updateDimensions: function () {

        var image = this.element.dom.getElementsByTagName("img")[0];
        if (!image) {
            return;
        }
        image = Ext.get(image);

        var width = image.getWidth();
        var height = image.getHeight();

        if (width > 1 && height > 1) {

            var dimensionError = false;
            if(typeof this.config.minWidth != "undefined") {
                if(width < this.config.minWidth) {
                    dimensionError = true;
                }
            }
            if(typeof this.config.minHeight != "undefined") {
                if(height < this.config.minHeight) {
                    dimensionError = true;
                }
            }

            if(dimensionError) {
                this.empty();
                clearInterval(this.updateDimensionsInterval);

                Ext.MessageBox.alert(t("error"), t("image_is_too_small"));

                return;
            }

            if (typeof this.originalDimensions.width == "undefined") {
                this.element.setWidth(width);
            }
            if (typeof this.originalDimensions.height == "undefined") {
                this.element.setHeight(height);
            }

            this.altInput.setWidth(width);

            // show alt input field
            this.altBar.setStyle({
                display: "block"
            });

            clearInterval(this.updateDimensionsInterval);
        }
        else {
            this.altBar.setStyle({
                display: "none"
            });
        }

        if (this.updateCounter > 20) {
            // only wait 20 seconds until image must be loaded
            clearInterval(this.updateDimensionsInterval);
        }

        this.updateCounter++;
    },

    openEditWindow: function() {

        var config = {};
        if(this.config["ratioX"] && this.config["ratioY"]) {
            config["ratioX"] = this.config["ratioX"];
            config["ratioY"] = this.config["ratioY"];
        }

        var editor = pimcore.helpers.openImageCropper(this.datax.id, this.datax, function (data) {
            this.datax.cropWidth = data.cropWidth;
            this.datax.cropHeight = data.cropHeight;
            this.datax.cropTop = data.cropTop;
            this.datax.cropLeft = data.cropLeft;
            this.datax.cropPercent = (undefined !== data.cropPercent) ? data.cropPercent : true;

            this.updateImage();
            this.checkValue();
        }.bind(this), config);
        editor.open(true);
    },

    openHotspotWindow: function() {
        var editor = pimcore.helpers.openImageHotspotMarkerEditor(
            this.datax.id,
            this.datax,
            function (data) {
                this.datax["hotspots"] = data["hotspots"];
                this.datax["marker"] = data["marker"];
            }.bind(this),
            {
                crop: {
                    cropWidth: this.datax.cropWidth,
                    cropHeight: this.datax.cropHeight,
                    cropTop: this.datax.cropTop,
                    cropLeft: this.datax.cropLeft,
                    cropPercent: this.datax.cropPercent
                },
                predefinedDataTemplates : this.config.predefinedDataTemplates
            }

        );
        editor.open(false);
    },

    checkValue: function (mark) {
        var datax = this.datax;

        if(typeof datax.id == 'undefined' || datax.id === null) {
            value = null;
        } else {
            value = 'ok';
        }

        if (this.required) {
            this.validateRequiredValue(value, this.element, this, mark);
        }
    },

    getValue: function () {

        // alt alt value
        if(this.altInput) {
            this.datax.alt = this.altInput.getValue();
        }

        return this.datax;
    },

    getType: function () {
        return "image";
    }
});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.input");
/**
 * @private
 */
pimcore.document.editables.input = Class.create(pimcore.document.editable, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.data = data ?? "";
    },

    render: function() {
        this.setupWrapper();
        this.element = Ext.get(this.id);
        this.element.dom.setAttribute("contenteditable", true);

        this.element.update(this.data + "<br>");

        if(this.config["required"]) {
            this.required = this.config["required"];
        }

        this.checkValue();

        this.element.on("keyup", this.checkValue.bind(this, true));
        this.element.on("keydown", function (e, t, o) {
            // do not allow certain keys, like enter, ...
            if(in_array(e.getCharCode(), [13])) {
                e.stopEvent();
            }
        });

        this.element.dom.addEventListener("paste", function(e) {
            e.preventDefault();

            var text = "";
            if(e.clipboardData) {
                text = e.clipboardData.getData("text/plain");
            } else if (window.clipboardData) {
                text = window.clipboardData.getData("Text");
            }

            text = this.clearText(text);
            text = htmlentities(text, "ENT_NOQUOTES", null, false);
            text = trim(text);

            try {
                pimcore.edithelpers.pasteHtmlAtCaret(text);
            } catch (e) {
                console.log(e);
            }
        }.bind(this));

        if(this.config["width"]) {
            this.element.applyStyles({
                display: "inline-block",
                width: this.config["width"] + "px",
                overflow: "auto",
                "white-space": "nowrap"
            });
        }
        if(this.config["nowrap"]) {
            this.element.applyStyles({
                "white-space": "nowrap",
                overflow: "auto"
            });
        }
        if (this.config["placeholder"]) {
            this.element.dom.setAttribute('data-placeholder', this.config["placeholder"]);
        }
    },

    checkValue: function (mark) {
        var value = trim(this.element.dom.innerHTML);
        var origValue = value;

        var textLength = trim(strip_tags(value)).length;

        if(textLength < 1) {
            this.element.addCls("empty");
            value = ""; // set to "" since it can contain an <br> at the end
        } else {
            this.element.removeCls("empty");
        }

        if(value != origValue) {
            this.element.update(this.getValue());
        }

        if (this.required) {
            this.validateRequiredValue(value, this.element, this, mark);
        }
    },

    getValue: function () {

        if(!this.element) {
            return this.data;
        }

        var text = "";
        if(typeof this.element.dom.textContent != "undefined") {
            text = this.element.dom.textContent;
        } else {
            text = this.element.dom.innerText;
        }

        text = this.clearText(text);
        return text;
    },

    clearText: function (text) {
        text = str_replace("\r\n", " ", text);
        text = str_replace("\n", " ", text);
        return text;
    },

    getType: function () {
        return "input";
    },

    setInherited: function($super, inherited, el) {

        $super(inherited, el);

        if(this.inherited) {
            this.element.dom.setAttribute("contenteditable", false);
        } else {
            this.element.dom.setAttribute("contenteditable", true);
        }
    }
});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.link");
/**
 * @private
 */
pimcore.document.editables.link = Class.create(pimcore.document.editable, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.defaultData = {
            path: "",
            parameters: "",
            anchor: "",
            accesskey: "",
            rel: "",
            tabindex: "",
            target: "",
            "class": ""
        };

        this.data = mergeObject(this.defaultData, data ?? {});
    },

    render: function() {
        this.setupWrapper();

        this.element = Ext.get(this.id);

        if (this.config["required"]) {
            this.required = this.config["required"];
        }

        this.checkValue();

        Ext.get(this.id).setStyle({
            display:"inline"
        });
        Ext.get(this.id).insertHtml("beforeEnd",'<span class="pimcore_editable_link_text">' + this.getLinkContent() + '</span>');

        var editButton = new Ext.Button({
            iconCls: "pimcore_icon_link pimcore_icon_overlay_edit",
            cls: "pimcore_edit_link_button",
            listeners: {
                "click": this.openEditor.bind(this)
            }
        });

        var openButton = new Ext.Button({
            iconCls: "pimcore_icon_open",
            cls: "pimcore_open_link_button",
            listeners: {
                "click": function () {
                    if (this.data && this.data.path) {
                        if (this.data.linktype == "internal") {
                            pimcore.helpers.openElement(this.data.path, this.data.internalType);
                        } else {
                            window.open(this.data.path, "_blank");
                        }
                    }
                }.bind(this)
            }
        });

        openButton.render(this.id);
        editButton.render(this.id);
    },

    openEditor: function () {

        // disable the global dnd handler in this editmode/frame
        window.dndManager.disable();

        this.window = pimcore.helpers.editmode.openLinkEditPanel(this.data, {
            empty: this.empty.bind(this),
            cancel: this.cancel.bind(this),
            save: this.save.bind(this)
        }, this.config);
    },


    getLinkContent: function () {
        let text = "[" + t("not_set") + "]";
        if (this.data.text) {
            text = this.data.text;
        } else if (this.data.path) {
            text = this.data.path;
        }
        let displayHtml = Ext.util.Format.htmlEncode(text);
        if (this.data.path || this.data.anchor || this.data.parameters) {
            let fullpath = Ext.util.Format.htmlEncode(this.data.path + (this.data.parameters ? '?' + this.data.parameters : '') + (this.data.anchor ? '#' + this.data.anchor : ''));
            let displayHtml = Ext.util.Format.htmlEncode(text);
            
            if (this.config.textPrefix !== undefined) {
                displayHtml = this.config.textPrefix + displayHtml;
            }
            if (this.config.textSuffix !== undefined) {
                displayHtml += this.config.textSuffix;
            }

            return '<a href="' + fullpath + '" class="' + this.config["class"] + ' ' + this.data["class"] + '">' + displayHtml + '</a>';
        }
        return displayHtml;
    },

    save: function () {

        // enable the global dnd dropzone again
        window.dndManager.enable();

        var values = this.window.getComponent("form").getForm().getFieldValues();
        this.data = values;
        this.checkValue(true);

        // close window
        this.window.close();

        // set text
        Ext.get(this.id).query(".pimcore_editable_link_text")[0].innerHTML = this.getLinkContent();

        this.reload();
    },

    reload : function () {
        if (this.config.reload) {
            this.reloadDocument();
            this.checkValue(true);
        }
    },

    empty: function () {

        // enable the global dnd dropzone again
        window.dndManager.enable();

        // close window
        this.window.close();

        this.data = this.defaultData;
        this.checkValue(true);

        // set text
        Ext.get(this.id).query(".pimcore_editable_link_text")[0].innerHTML = this.getLinkContent();
    },

    cancel: function () {

        // enable the global dnd dropzone again
        window.dndManager.enable();

        this.window.close();
    },

    checkValue: function (mark) {
        var data = this.getValue();
        var text = '';

        if (this.required) {
            if (this.required === "linkonly") {
                if (this.data.path) {
                    text = this.data.path;
                }
            } else {
                if (this.data.text && this.data.path) {
                    text = this.data.text + this.data.path;
                }
            }

            this.validateRequiredValue(text, this.element, this, mark);
        }
    },

    getValue: function () {
        return this.data;
    },

    getType: function () {
        return "link";
    }
});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.select");
/**
 * @private
 */
pimcore.document.editables.select = Class.create(pimcore.document.editable, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.config.listeners = {};

        // onchange event
        if (this.config.onchange) {
            this.config.listeners.select = eval(config.onchange);
        }

        if (this.config["reload"]) {
            this.config.listeners.select = this.reloadDocument;
        }

        if(typeof this.config["defaultValue"] !== "undefined" && data === null) {
            data = this.config["defaultValue"];
        }

        this.config.name = id + "_editable";
        this.config.triggerAction = 'all';
        this.config.editable = config.editable ? config.editable : false;
        this.config.value = data;
    },

    render: function() {
        this.setupWrapper();

        if (this.config["required"]) {
            this.required = this.config["required"];
        }

        this.element = new Ext.form.ComboBox(this.config);
        this.element.render(this.id);

        this.element.on("select", this.checkValue.bind(this, true));
        this.checkValue();
    },

    checkValue: function (mark) {
        var value = this.getValue();

        if (this.required) {
            this.validateRequiredValue(value, this.element, this, mark);
        }
    },

    getValue: function () {
        if(this.element) {
            return this.element.getValue();
        }

        return this.config.value;
    },

    getType: function () {
        return "select";
    }
});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS('pimcore.document.editables.snippet');
/**
 * @private
 */
pimcore.document.editables.snippet = Class.create(pimcore.document.editable, {

    defaultHeight: 100,

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.data = data ?? {};

        // height management
        if (this.config.defaultHeight) {
            this.defaultHeight = this.config.defaultHeight;
        }

        if (this.config.height){
            this.initalHeightSet = true;
        } else {
            this.initalHeightSet = false;
            this.config.height = this.data.path ? 'auto' : this.defaultHeight;
        }

        this.config.name = id + '_editable';
        this.config.border = false;
        this.config.bodyStyle = 'min-height: 40px;';
    },

    render: function () {
        this.setupWrapper();

        this.element = new Ext.Panel(this.config);

        this.element.on('render', function (el) {
            try {
                if (typeof dndManager != 'undefined') {
                    dndManager.addDropTarget(el.getEl(), this.onNodeOver.bind(this), this.onNodeDrop.bind(this));
                }

                var body = this.getBody();
                var style = {
                    overflow: 'auto',
                };
                body.setStyle(style);
                body.getFirstChild().setStyle(style);
                body.insertHtml('beforeEnd', '<div class="pimcore_editable_droptarget"></div>');
                body.addCls('pimcore_editable_snippet_empty');

                el.getEl().on('contextmenu', this.onContextMenu.bind(this));
            } catch (e) {
                console.log(e);
            }
        }.bind(this));

        this.element.render(this.id);

        if (this.data.path) {
            this.updateContent(this.data.path);
        }
    },

    onNodeDrop: function (target, dd, e, data) {
        if(!pimcore.helpers.dragAndDropValidateSingleItem(data)) {
            return false;
        }

        data = data.records[0].data;

        if (this.dndAllowed(data)) {
            // get path from nodes data
            var uri = data.path;

            this.data.id = data.id;
            this.data.path = uri;

            if (this.config.reload) {
                this.reloadDocument();
            } else {
                this.updateContent(uri);
            }

            return true;
        }
    },

    onNodeOver: function(target, dd, e, data) {
        if (data.records.length === 1 && this.dndAllowed(data.records[0].data)) {
            return Ext.dd.DropZone.prototype.dropAllowed;
        }
        else {
            return Ext.dd.DropZone.prototype.dropNotAllowed;
        }
    },

    dndAllowed: function(data) {
        return data.type === 'snippet';
    },

    getBody: function () {
        // get the id from the body element of the panel because there is no method to set body's html
        // (only in configure)
        var bodyId = Ext.get(this.element.getEl().dom).query('.' + Ext.baseCSSPrefix + 'panel-body')[0].getAttribute('id');
        return Ext.get(bodyId);
    },

    updateContent: function (path) {
        var params = this.config;
        params.pimcore_admin = true;

        Ext.Ajax.request({
            method: 'get',
            url: path,
            success: function (response) {
                var body = this.getBody();
                body.getFirstChild().dom.innerHTML = response.responseText;
                this.updateDimensions();
            }.bind(this),
            params: params
        });
    },

    updateDimensions: function () {
        var body = this.getBody();
        var parent = body.getParent();

        this.element.getEl().setStyle('height', 'auto');
        body.setStyle('height', 'auto');

        if (this.initalHeightSet) {
            parent.setStyle({
                height: this.config.height + 'px',
                overflowY: 'auto',
            });
        }
        else {
            parent.setStyle({
                height: this.data.path ? 'auto' : this.defaultHeight + 'px',
                overflowY: 'hidden',
            });
        }

        if(this.data.path){
            body.removeCls('pimcore_editable_snippet_empty');
        }
        else{
            body.setStyle('height', '100%');
        }
    },

    onContextMenu: function (e) {
        var menu = new Ext.menu.Menu();

        if(this.data['id']) {
            menu.add(new Ext.menu.Item({
                text: t('empty'),
                iconCls: 'pimcore_icon_delete',
                handler: function (item) {
                    item.parentMenu.destroy();
                    this.data = {};
                    var body = this.getBody();
                    body.getFirstChild().dom.innerHTML = '';
                    body.addCls('pimcore_editable_snippet_empty');

                    if (this.config.reload) {
                        this.reloadDocument();
                    }

                    this.updateDimensions();
                }.bind(this)
            }));

            menu.add(new Ext.menu.Item({
                text: t('open'),
                iconCls: 'pimcore_icon_open',
                handler: function (item) {
                    item.parentMenu.destroy();
                    pimcore.helpers.openDocument(this.data.id, 'snippet');
                }.bind(this)
            }));

            if (pimcore.elementservice.showLocateInTreeButton('document')) {
                menu.add(new Ext.menu.Item({
                    text: t('show_in_tree'),
                    iconCls: 'pimcore_icon_show_in_tree',
                    handler: function (item) {
                        item.parentMenu.destroy();
                        pimcore.treenodelocator.showInTree(this.data.id, 'document');
                    }.bind(this)
                }));
            }
        }

        if(pimcore.helpers.hasSearchImplementation()) {
            menu.add(new Ext.menu.Item({
                text: t('search'),
                iconCls: 'pimcore_icon_search',
                handler: function (item) {
                    item.parentMenu.destroy();
                    this.openSearchEditor();
                }.bind(this)
            }));
        }

        menu.showAt(e.getXY());

        e.stopEvent();
    },

    openSearchEditor: function () {
        pimcore.helpers.itemselector(
            false,
            this.addDataFromSelector.bind(this),
            {
                type: ['document'],
                subtype: {
                    document: ['snippet'],
                },
            },
            {
                context: this.getContext(),
            }
        );
    },

    addDataFromSelector: function (item) {
        if(item) {
            var uri = item.fullpath;

            this.data.id = item.id;
            this.data.path = uri;

            if (this.config.reload) {
                this.reloadDocument();
            } else {
                this.updateContent(uri);
            }
        }
    },

    getValue: function () {
        return this.data.id;
    },

    getType: function () {
        return 'snippet';
    }
});


/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.textarea");
/**
 * @private
 */
pimcore.document.editables.textarea = Class.create(pimcore.document.editable, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.data = str_replace("\n","<br>", data ?? "");

        if(this.config["required"]) {
            this.required = this.config["required"];
        }
    },

    render: function () {
        this.setupWrapper();
        this.element = Ext.get(this.id);
        this.element.dom.setAttribute("contenteditable", true);

        this.element.update(this.data);

        this.checkValue();

        this.element.on("keyup", this.checkValue.bind(this, true));
        this.element.on("keydown", function (e, t, o) {

            if(e.getCharCode() == 13) {

                if (window.getSelection) {
                    var selection = window.getSelection(),
                        range = selection.getRangeAt(0),
                        br = document.createElement("br"),
                        textNode = document.createTextNode("\u00a0"); //Passing " " directly will not end up being shown correctly
                    range.deleteContents();//required or not?
                    range.insertNode(br);
                    range.collapse(false);
                    range.insertNode(textNode);
                    range.selectNodeContents(textNode);

                    selection.removeAllRanges();
                    selection.addRange(range);
                }

                e.stopEvent();
            }
        });

        this.element.dom.addEventListener("paste", function(e) {
            e.preventDefault();

            var text = "";
            if(e.clipboardData) {
                text = e.clipboardData.getData("text/plain");
            } else if (window.clipboardData) {
                text = window.clipboardData.getData("Text");
            }

            text = htmlentities(text, 'ENT_NOQUOTES', null, false);
            text = trim(text);

            try {
                pimcore.edithelpers.pasteHtmlAtCaret(text);
            } catch (e) {
                console.log(e);
            }
        }.bind(this));

        if(this.config["width"] || this.config["height"]) {
            this.element.applyStyles({
                display: "inline-block",
                overflow: "auto"
            });
        }
        if(this.config["width"]) {
            this.element.applyStyles({
                width: this.config["width"] + "px"
            })
        }
        if(this.config["height"]) {
            this.element.applyStyles({
                height: this.config["height"] + "px"
            })
        }
        if (this.config["placeholder"]) {
            this.element.dom.setAttribute('data-placeholder', this.config["placeholder"]);
        }
    },

    checkValue: function (mark) {
        var value = this.element.dom.innerHTML;

        if(trim(strip_tags(value)).length < 1) {
            this.element.addCls("empty");
        } else {
            this.element.removeCls("empty");
        }

        if (this.required) {
            this.validateRequiredValue(value, this.element, this, mark);
        }
    },

    getValue: function () {

        let value = this.data;
        if(this.element) {
            value = this.element.dom.innerHTML;
        }

        value = strip_tags(value, '<br>'); // strip out nasty HTML, eg. inserted by highlighting feature (ExtJS masks)
        value = value.replace(/<br>/g, "\n");
        value = trim(value);
        return value;
    },

    getType: function () {
        return "textarea";
    },

    setInherited: function($super, inherited, el) {

        $super(inherited, el);

        if(this.inherited) {
            this.element.dom.setAttribute("contenteditable", false);
        } else {
            this.element.dom.setAttribute("contenteditable", true);
        }
    }
});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.numeric");
/**
 * @private
 */
pimcore.document.editables.numeric = Class.create(pimcore.document.editable, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        if ('number' !== typeof data && !data) {
            data = "";
        }

        this.config.value = data;
        this.config.name = id + "_editable";
        this.config.decimalPrecision = config.decimalPrecision ?? 20;
        this.config.mouseWheelEnabled = false;

        if(this.config["required"]) {
            this.required = this.config["required"];
        }
    },

    render: function () {
        this.setupWrapper();
        this.element = new Ext.form.field.Number(this.config);
        this.element.render(this.id);

        this.checkValue();
        this.element.on("blur", this.checkValue.bind(this, true));
    },

    getValue: function () {
        if(this.element) {
            return this.element.getValue();
        }

        return this.config.value;
    },

    getType: function () {
        return "numeric";
    },

    checkValue: function (mark) {
        var value = this.getValue();

        if(Number(value) < 1) {
            this.element.addCls("empty");
        } else {
            this.element.removeCls("empty");
        }

        if (this.required) {
            this.validateRequiredValue(value, this.element, this, mark);
        }
    }
});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.wysiwyg");
/**
 * @private
 */
pimcore.document.editables.wysiwyg = Class.create(pimcore.document.editable, {

    type: "wysiwyg",

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        if (!data) {
            data = "";
        }
        this.data = data ?? "";

        if (config["required"]) {
            this.required = config["required"];
        }
    },

    render: function () {
        this.setupWrapper();

        this.textarea = document.createElement("div");
        this.textarea.setAttribute("contenteditable","true");

        Ext.get(this.id).appendChild(this.textarea);
        Ext.get(this.id).insertHtml("beforeEnd",'<div class="pimcore_editable_droptarget"></div>');

        this.textarea.id = this.id + "_textarea";
        this.textarea.innerHTML = this.data;

        let textareaHeight = 100;
        if (this.config.height) {
            textareaHeight = this.config.height;
        }
        if (this.config.placeholder) {
            this.textarea.setAttribute('data-placeholder', this.config["placeholder"]);
        }

        let inactiveContainerWidth = this.config.width + "px";
        if (typeof this.config.width == "string" && this.config.width.indexOf("%") >= 0) {
            inactiveContainerWidth = this.config.width;
        }

        Ext.get(this.textarea).addCls("pimcore_wysiwyg");
        Ext.get(this.textarea).applyStyles("width: " + inactiveContainerWidth  + "; min-height: " + textareaHeight
            + "px;");

        if(this.startWysiwygEditor()) {
            // register at global DnD manager
            if (typeof dndManager !== 'undefined') {
                dndManager.addDropTarget(Ext.get(this.id), this.onNodeOver.bind(this), this.onNodeDrop.bind(this));
            }
        }
    },

    startWysiwygEditor: function () {

        const initializeWysiwyg = new CustomEvent(pimcore.events.initializeWysiwyg, {
            detail: {
                config: Object.assign({}, this.config),
                context: "document"
            },
            cancelable: true
        });
        const initIsAllowed = document.dispatchEvent(initializeWysiwyg);
        if(!initIsAllowed) {
            return false;
        }

        const createWysiwyg = new CustomEvent(pimcore.events.createWysiwyg, {
            detail: {
                textarea: this.textarea,
                context: "document",
            },
            cancelable: true
        });
        const createIsAllowed = document.dispatchEvent(createWysiwyg);
        if(!createIsAllowed) {
            return false;
        }

        document.addEventListener(pimcore.events.changeWysiwyg, function (e) {
            if(this.textarea.id === e.detail.e.target.id) {
                this.setValue(e.detail.data);
            }
        }.bind(this));

        if (!parent.pimcore.wysiwyg.editors.length) {
           this.textarea.oninput = (e) => {
               this.setValue(e.target.innerHTML);
           };
        }

        return true;
    },

    onNodeDrop: function (target, dd, e, data) {
        if (!pimcore.helpers.dragAndDropValidateSingleItem(data) || !this.dndAllowed(data.records[0].data) || this.inherited) {
            return false;
        }

        const onDropWysiwyg = new CustomEvent(pimcore.events.onDropWysiwyg, {
            detail: {
                target: target,
                dd: dd,
                e: e,
                data: data,
                context: "document",
                textareaId: this.textarea.id
            }
        });

        document.dispatchEvent(onDropWysiwyg);
    },

    checkValue: function (mark) {
        const value = this.getValue();
        let textarea = Ext.get(this.textarea);

        // Sync DOM class names with ExtJs (wysiwyg-editor may have added classes in the meantime)
        textarea.setCls(textarea.dom.className);

        if (trim(strip_tags(value)).length < 1) {
            textarea.addCls("empty");
        } else {
            textarea.removeCls("empty");
        }

        if (this.required) {
            this.validateRequiredValue(value, textarea, this, mark);
        }
    },

    onNodeOver: function (target, dd, e, data) {
        if (data.records.length === 1 && this.dndAllowed(data.records[0].data) && !this.inherited) {
            return Ext.dd.DropZone.prototype.dropAllowed;
        } else {
            return Ext.dd.DropZone.prototype.dropNotAllowed;
        }
    },


    dndAllowed: function (data) {

        if (data.elementType == "document" && (data.type == "page"
            || data.type == "hardlink" || data.type == "link")) {
            return true;
        } else if (data.elementType == "asset" && data.type != "folder") {
            return true;
        } else if (data.elementType == "object" && data.type != "folder") {
            return true;
        }

        return false;
    },


    getValue: function () {
        return this.data;
    },

    setValue: function (value) {
      this.data = value;
      this.checkValue(true);
    },

    getType: function () {
        return "wysiwyg";
    }
});




/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS('pimcore.document.editables.renderlet');
/**
 * @private
 */
pimcore.document.editables.renderlet = Class.create(pimcore.document.editable, {

    defaultHeight: 100,

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        //TODO maybe there is a nicer way, the Panel doesn't like this
        this.controller = config.controller;
        delete(config.controller);

        this.data = data ?? {};

        // height management
        if (this.config.defaultHeight) {
            this.defaultHeight = this.config.defaultHeight;
        }

        if (this.config.height) {
            this.initalHeightSet = true;
        }
        else {
            this.initalHeightSet = false;
            this.config.height = this.data.id ? 'auto' : this.defaultHeight;
        }

        this.config.name = id + '_editable';
        this.config.border = false;
        this.config.bodyStyle = 'min-height: 40px;';
    },

    render: function() {
        this.setupWrapper();

        this.element = new Ext.Panel(this.config);
        this.element.on('render', function (el) {
            // register at global DnD manager
            dndManager.addDropTarget(el.getEl(), this.onNodeOver.bind(this), this.onNodeDrop.bind(this));

            this.getBody().insertHtml('beforeEnd','<div class="pimcore_editable_droptarget"></div>');
            this.getBody().addCls('pimcore_editable_snippet_empty');

            el.getEl().on('contextmenu', this.onContextMenu.bind(this));

        }.bind(this));

        this.element.render(this.id);

        if (this.data.id) {
            this.updateContent();
        }
    },

    onNodeDrop: function (target, dd, e, data) {
        if(!pimcore.helpers.dragAndDropValidateSingleItem(data)) {
            return false;
        }

        var record = data.records[0];
        data = record.data;

        this.data.id = data.id;
        this.data.type = data.elementType;
        this.data.subtype = data.type;

        if (this.config.type) {
            if (this.config.type != data.elementType) {
                return false;
            }
        }

        if (this.config.className) {
            if(Array.isArray(this.config.className)) {
                if (this.config.className.indexOf(data.className) < 0) {
                    return false;
                }
            } else {
                if (this.config.className != data.className) {
                    return false;
                }
            }
        }

        if (this.config.reload) {
            this.reloadDocument();
        } else {
            this.updateContent();
        }

        return true;
    },

    onNodeOver: function(target, dd, e, data) {
        if (data.records.length !== 1) {
            return false;
        }

        data = data.records[0].data;
        if (this.config.type) {
            if (this.config.type != data.elementType) {
                return false;
            }
        }

        if (this.config.className) {
            if(Array.isArray(this.config.className)) {
                if (this.config.className.indexOf(data.className) < 0) {
                    return false;
                }
            } else {
                if (this.config.className != data.className) {
                    return false;
                }
            }
        }

        return Ext.dd.DropZone.prototype.dropAllowed;
    },

    getBodyWrap: function () {
        var bodyId = this.element.getEl().query('.' + Ext.baseCSSPrefix + 'panel-bodyWrap')[0].getAttribute('id');
        return Ext.get(bodyId);
    },

    getBody: function () {
        // get the id from the body element of the panel because there is no method to set body's html
        // (only in configure)
        var bodyId = this.element.getEl().query('.' + Ext.baseCSSPrefix + 'panel-body')[0].getAttribute('id');
        return Ext.get(bodyId);
    },

    updateContent: function () {
        var self = this;

        this.getBody().removeCls('pimcore_editable_snippet_empty');
        this.getBody().dom.innerHTML = '<br />&nbsp;&nbsp;Loading ...';

        var params = this.data;
        params.controller = this.controller;
        Ext.apply(params, this.config);

        try {
            // add the id of the current document, so that the renderlet knows in which document it is embedded
            // this information is then grabbed in Pimcore_Controller_Action_Frontend::init() to set the correct locale
            params['pimcore_parentDocument'] = window.editWindow.document.id;
        } catch (e) {
        }

        if ('undefined' !== typeof window.editWindow.targetGroup && window.editWindow.targetGroup.getValue()) {
            params['_ptg'] = window.editWindow.targetGroup.getValue();
        }

        var setContent = function(content) {
            self.getBody().dom.innerHTML = content;
            self.getBody().insertHtml('beforeEnd','<div class="pimcore_editable_droptarget"></div>');
            self.updateDimensions();
        };

        Ext.Ajax.request({
            method: 'get',
            url: Routing.generate('pimcore_admin_document_renderlet_renderlet'),
            success: function (response) {
                setContent(response.responseText);
            }.bind(this),

            failure: function(response) {
                var message = response.responseText;

                try {
                    var json = Ext.decode(response.responseText);
                    if (json && 'undefined' !== typeof json.message) {
                        message = '<strong style="color:red">' + json.message + '</strong>';
                    }
                } catch (e) {
                    // noop - fall back to responseText
                }

                message = '<br />&nbsp;&nbsp;' + message;

                setContent(message);
            }.bind(this),

            params: params
        });
    },

    updateDimensions: function () {
        if(this.initalHeightSet){
            if(this.config.height !== 'auto'){
                this.getBodyWrap().setStyle({
                    overflowY: 'auto',
                });
            }
        }
        else{
            this.element.setStyle({
                height: this.data.id ? 'auto' : this.defaultHeight + 'px',
            });
            this.getBodyWrap().setStyle({
                height: this.data.id ? 'auto' : '100%',
            });
        }
        this.getBody().setStyle({
            height: this.data.id ? 'auto' : this.config.title ? 'calc(100% - 49px)' : '100%',
        })
    },

    onContextMenu: function (e) {
        var menu = new Ext.menu.Menu();

        if(this.data['id']) {
            menu.add(new Ext.menu.Item({
                text: t('empty'),
                iconCls: 'pimcore_icon_delete',
                handler: function () {
                    this.data = {};
                    this.getBody().update('');
                    this.getBody().insertHtml('beforeEnd','<div class="pimcore_editable_droptarget"></div>');
                    this.getBody().addCls('pimcore_editable_snippet_empty');

                    if (this.config.reload) {
                        this.reloadDocument();
                    }

                    this.updateDimensions();
                }.bind(this)
            }));

            menu.add(new Ext.menu.Item({
                text: t('open'),
                iconCls: 'pimcore_icon_open',
                handler: function () {
                    if(this.data.id) {
                        pimcore.helpers.openElement(this.data.id, this.data.type, this.data.subtype);
                    }
                }.bind(this)
            }));

            if (pimcore.elementservice.showLocateInTreeButton('document')) {
                menu.add(new Ext.menu.Item({
                    text: t('show_in_tree'),
                    iconCls: 'pimcore_icon_show_in_tree',
                    handler: function (item) {
                        item.parentMenu.destroy();
                        pimcore.treenodelocator.showInTree(this.data.id, this.data.type);
                    }.bind(this)
                }));
            }
        }

        if(pimcore.helpers.hasSearchImplementation()) {
            menu.add(new Ext.menu.Item({
                text: t('search'),
                iconCls: 'pimcore_icon_search',
                handler: function (item) {
                    item.parentMenu.destroy();
                    this.openSearchEditor();
                }.bind(this)
            }));
        }


        menu.showAt(e.getXY());

        e.stopEvent();
    },

    openSearchEditor: function () {
        var restrictions = {};

        if (this.config.type) {
            restrictions.type = [this.config.type];
        }
        if (this.config.className) {
            restrictions.specific = {
                classes: [this.config.className]
            };
        }

        pimcore.helpers.itemselector(false, this.addDataFromSelector.bind(this), restrictions, {
            context: this.getContext()
        });
    },

    addDataFromSelector: function (item) {
        if(item) {
            this.data.id = item.id;
            this.data.type = item.type;
            this.data.subtype = item.subtype;

            if (this.config.reload) {
                this.reloadDocument();
            } else {
                this.updateContent();
            }
        }
    },

    getValue: function () {
        return this.data;
    },

    getType: function () {
        return 'renderlet';
    }
});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.table");
/**
 * @private
 */
pimcore.document.editables.table = Class.create(pimcore.document.editable, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        if (!data || data.length === 0) {
            data = [
                [" "]
            ];
            if (config.defaults) {
                if (config.defaults.cols) {
                    for (let i = 0; i < (config.defaults.cols - 1); i++) {
                        data[0].push(" ");
                    }
                }
                if (config.defaults.rows) {
                    for (let i = 0; i < (config.defaults.rows - 1); i++) {
                        data.push(data[0]);
                    }
                }
                if (config.defaults.data) {
                    data = config.defaults.data;
                }
            }
        }

        delete config["height"];

        this.config = config;

        this.initStore(data);
    },

    refreshStoreGrid: function (data) {
        this.initStore(data);
        this.render();
    },

    render: function() {
        if (this.grid) {
            this.grid.destroy();
        }
        this.setupWrapper();

        var data = this.store.queryBy(function(record, id) {
            return true;
        });
        var columns = [];

        var fields = this.store.getInitialConfig().fields;

        if (data.items[0]) {
            for (var i = 0; i < fields.length; i++) {
                columns.push({
                    dataIndex: fields[i].name,
                    editor: new Ext.form.TextField({
                        allowBlank: true
                    }),
                    hideable: false,
                    sortable: false,
                    draggable: false
                });
            }
        }

        this.cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });

        let gridConfig = array_merge(this.config, {
            name: this.id + "_editable",
            store: this.store,
            border: true,
            columns:columns,
            stripeRows: true,
            columnLines: true,
            selModel: Ext.create('Ext.selection.CellModel'),
            manageHeight: false,
            plugins: [
                this.cellEditing
            ],
            tbar: [
                {
                    iconCls: "pimcore_icon_table_col pimcore_icon_overlay_add",
                    handler: this.addColumn.bind(this)
                },
                {
                    iconCls: "pimcore_icon_table_col pimcore_icon_overlay_delete",
                    handler: this.deleteColumn.bind(this)
                },
                {
                    iconCls: "pimcore_icon_table_row pimcore_icon_overlay_add",
                    handler: this.addRow.bind(this)
                },
                {
                    iconCls: "pimcore_icon_table_row pimcore_icon_overlay_delete",
                    handler: this.deleteRow.bind(this)
                },
                {
                    iconCls: "pimcore_icon_empty",
                    handler: this.refreshStoreGrid.bind(this, [
                        [" "]
                    ])
                }
            ]
        });

        this.grid = Ext.create('Ext.grid.Panel', gridConfig);
        this.grid.render(this.id);
    },

    initStore: function (data) {
        var storeFields = [];
        if (data[0]) {
            for (var i = 0; i < data[0].length; i++) {
                storeFields.push({
                    name: "col_" + i
                });
            }
        }

        this.store = new Ext.data.ArrayStore({
            fields: storeFields
        });

        this.store.loadData(data);
    },

    addColumn : function  () {

        var currentData = this.getValue();

        for (var i = 0; i < currentData.length; i++) {
            currentData[i].push(" ");
        }

        this.refreshStoreGrid(currentData);
    },

    addRow: function  () {
        var initData = {};

        var columnnManager = this.grid.getColumnManager();
        var columns = columnnManager.getColumns();

        for (var o = 0; o < columns.length; o++) {
            initData["col_" + o] = " ";
        }

        this.store.add(initData);
    },

    deleteRow : function  () {
        var selected = this.grid.getSelectionModel();
        if (selected.selection) {
            this.store.remove(selected.selection.record);
            this.grid.editingPlugin.view.refresh();  // Prevents the editor from being garbage collected
        }
    },

    deleteColumn: function () {
        var selected = this.grid.getSelectionModel();

        if (selected.selection) {
            var column = selected.selection.colIdx;

            var currentData = this.getValue();

            for (var i = 0; i < currentData.length; i++) {
                currentData[i].splice(column, 1);
            }

            this.refreshStoreGrid(currentData);
        }
    },

    getValue: function () {
        var data = this.store.queryBy(function(record, id) {
            return true;
        });

        var fields = this.store.getInitialConfig().fields;

        var storedData = [];
        var tmData = [];
        for (var i = 0; i < data.items.length; i++) {
            tmData = [];

            for (var u = 0; u < fields.length; u++) {
                tmData.push(data.items[i].data[fields[u].name]);
            }
            storedData.push(tmData);
        }

        return storedData;
    },

    getType: function () {
        return "table";
    }
});


/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.video");
/**
 * @private
 */
pimcore.document.editables.video = Class.create(pimcore.document.editable, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.data = data;
    },

    render: function () {
        this.setupWrapper();

        var element = Ext.get("pimcore_video_" + this.name);

        var button = new Ext.Button({
            iconCls: "pimcore_icon_edit",
            cls: "pimcore_edit_link_button",
            handler: this.openEditor.bind(this)
        });
        button.render(element.insertHtml("afterBegin", '<div class="pimcore_video_edit_button"></div>'));
        if (this.inherited) {
            button.hide();
        }
        this.button = button;
        var emptyContainer = element.query(".pimcore_editable_video_empty")[0];
        if (emptyContainer) {
            //we have to update container id for video editable inside non-reloadable blocks
            //https://github.com/pimcore/pimcore/issues/9969
            emptyContainer.id = 'video_' + uniqid();
            emptyContainer = Ext.get(emptyContainer);
            emptyContainer.on("click", this.openEditor.bind(this));
        }

        if(this.config["required"]) {
            this.required = this.config["required"];
        }
        this.checkValue();
    },

    openEditor: function () {

        // disable the global dnd handler in this editmode/frame
        window.dndManager.disable();

        this.window = pimcore.helpers.editmode.openVideoEditPanel(this.data, {
            save: this.save.bind(this),
            cancel: this.cancel.bind(this)
        });
    },

    save: function () {

        // enable the global dnd dropzone again
        window.dndManager.enable();

        // close window
        this.window.hide();

        var values = this.window.getComponent("form").getForm().getFieldValues();
        this.data = values;



        this.reloadDocument();
    },

    cancel: function () {

        // enable the global dnd dropzone again
        window.dndManager.enable();

        this.window.hide();
    },

    checkValue: function (mark) {
        var data = this.data;

        if(typeof data.path == 'undefined' || data.path === null || data.path == '') {
            value = null;
        } else {
            value = 'ok';
        }

        if (this.required) {
            this.validateRequiredValue(value, this.button, this, mark);
        }
    },

    getValue: function () {
        return this.data;
    },

    getType: function () {
        return "video";
    },

    setInherited: function(inherited, el) {
        this.inherited = inherited;

        // if an element given is as optional second parameter we use this for the mask
        if(!(el instanceof Ext.Element)) {
            el = Ext.get(this.id);
        }

        // check for inherited elements, and mask them if necessary
        if(this.inherited) {
            var mask = el.mask();
            new Ext.ToolTip({
                target: mask,
                showDelay: 100,
                trackMouse:true,
                html: t("click_right_to_overwrite")
            });
            mask.on("contextmenu", function (e) {
                var menu = new Ext.menu.Menu();
                menu.add(new Ext.menu.Item({
                    text: t('overwrite'),
                    iconCls: "pimcore_icon_overwrite",
                    handler: function (item) {
                        this.button.show();
                        this.setInherited(false);
                    }.bind(this)
                }));
                menu.showAt(e.getXY());

                e.stopEvent();
            }.bind(this));
        } else {
            el.unmask();
        }
    },
});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.multiselect");
/**
 * @private
 */
pimcore.document.editables.multiselect = Class.create(pimcore.document.editable, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.data = data;

        this.config.name = id + "_editable";
        if(data) {
            this.config.value = data;
        }
        this.config.valueField = "id";

        this.config.listeners = {};

        if (this.config["reload"]) {
            this.config.listeners.change = this.reloadDocument;
        }

        if (typeof this.config.store !== "undefined") {
            this.config.store = Ext.create('Ext.data.ArrayStore', {
                fields: ['id', 'text'],
                data: this.config.store
            });
        }
    },

    render: function () {
        this.setupWrapper();
        this.element = Ext.create('Ext.ux.form.MultiSelect', this.config);
        this.element.render(this.id);
    },

    getValue: function () {
        if(this.element) {
            return this.element.getValue();
        }

        return this.data;
    },

    getType: function () {
        return "multiselect";
    }
});


/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.area_abstract");
/**
 * @private
 */
pimcore.document.area_abstract = Class.create(pimcore.document.editable, {
    dialogBoxes: {},

    openEditableDialogBox: function (element, dialogBoxDiv) {
        let id = dialogBoxDiv.dataset.dialogId;
        let jsonConfig = document.getElementById('dialogBoxConfig-' + id).innerHTML;
        var config = JSON.parse(jsonConfig);

        var editablesInBox = this.getEditablesInDialogBox(id);
        let items = this.buildEditableDialogLayout(config["items"], editablesInBox, 1);

        if(!this.dialogBoxes[id]) {
            this.dialogBoxes[id] = new Ext.Window({
                closeAction: 'hide',
                width: Math.min(config["width"], Ext.getBody().getViewSize().width),
                height: Math.min(config["height"], Ext.getBody().getViewSize().height),
                items: items,
                bodyStyle: 'padding: 10px',
                scrollable: 'y',
                cls: 'pimcore_areablock_dialogBox',
                listeners: {
                    afterrender: function (win, eOpts) {
                        // render editables in window
                        // we need a bit of a timeout, since it seems the layout (especially when using tabs) isn't
                        // completely done in terms of the right dimensions, which has bad effects on the size
                        // of editables where the size matters, e.g. the image editable
                        window.setTimeout(function () {
                            Object.keys(editablesInBox).forEach(function (editableName) {
                                if (typeof editablesInBox[editableName]["renderInDialogBox"] === "function") {
                                    editablesInBox[editableName].renderInDialogBox();
                                } else {
                                    editablesInBox[editableName].render();
                                }
                                editablesInBox[editableName].setInherited(editablesInBox[editableName].inherited);
                            });
                        }, 200);
                    }
                },
                buttons: ['->', {
                    text: t("close"),
                    listeners: {
                        "click": function () {
                            this.dialogBoxes[id].close();
                            if(config["reloadOnClose"]) {
                                this.reloadDocument();
                            }
                        }.bind(this)
                    },
                    iconCls: "pimcore_icon_save"
                }]
            })
        }

        this.dialogBoxes[id].show();
    },

    getEditablesInDialogBox: function (id) {
        let editablesInDialogBox = {};
        Object.values(editableManager.getEditables()).forEach(editable => {
            if(editable.getInDialogBox() === id) {
                editablesInDialogBox[editable.getRealName()] = editable;
            }
        });

        return editablesInDialogBox;
    },

    buildEditableDialogLayout: function (config, editablesInBox, level) {
        var nextLevel = level+1;
        if(Array.isArray(config)) {
            var items = [];
            config.forEach(function (itemConfig) {
                let item = this.buildEditableDialogLayout(itemConfig, editablesInBox, nextLevel);
                if(item) {
                    items.push(item);
                }
            }.bind(this));

            if(level === 1) {
                return {
                    xtype: 'container',
                    items: items
                };
            }

            return items;
        } else if(editablesInBox[config['name']]) {
            let templateId = 'template__' + editablesInBox[config['name']].getId();
            var templateEl = document.getElementById(templateId);
            if(templateEl) {
                var templateHTML = templateEl.innerHTML;

                if (config['description']) {
                    var descriptionHTML = '<div style="font-size: 14px; margin-bottom: 10px;">'
                        + config['description']
                        + '</div>';

                    templateHTML = descriptionHTML + templateHTML;
                }

                if(typeof editablesInBox[config['name']]['renderInDialogBox'] === "function") {
                    if (editablesInBox[config['name']]['config']) {
                        editablesInBox[config['name']]['config']['label'] = config['label'] ?? config['name'];
                    }
                    return {
                        xtype: 'container',
                        html: templateHTML
                    };
                } else {
                    return {
                        xtype: 'fieldset',
                        title: config['label'] ?? config['name'],
                        html: templateHTML
                    };
                }
            }
        } else if(config['items']) {
            let container = {
                xtype: config['type'],
                bodyStyle: 'padding: 10px',
                deferredRender: false,
                manageHeight: false,
                items: this.buildEditableDialogLayout(config['items'], editablesInBox, nextLevel)
            };
            let allowedConfigElements = [
                'layout',
                'flex',
                'defaults',
                'title'
            ];
            for (let i in allowedConfigElements) {
                let cfgElement = allowedConfigElements[i];
                if(config[cfgElement]) {
                    container[cfgElement] = config[cfgElement];
                }
            }

            return container;
        }
    },

    removeEditableDialogbox: function (id) {
        //remove dialog-box editables
        Object.values(editableManager.getEditables()).forEach(editable => {
            if(editable.getInDialogBox() === id) {
                editableManager.remove(editable.getName());
            }
        });

        if (this.dialogBoxes[id]) {
            this.dialogBoxes[id].destroy();
            delete this.dialogBoxes[id];
        }
    }

});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.areablock");
/**
 * @private
 */
pimcore.document.editables.areablock = Class.create(pimcore.document.area_abstract, {

    dialogBoxes: {},

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.initalConfig = config;
        this.elements = [];
        this.toolbarGlobalVar = this.getType() + "toolbar";
        this.applyFallbackIcons();

        if(typeof this.config["toolbar"] == "undefined" || this.config["toolbar"] != false) {
            this.createToolBar();
        }

        this.visibilityButtons = {};

        // reload or not => default not
        if(typeof this.config["reload"] == "undefined") {
            this.config.reload = false;
        }

        if(!this.config['controlsTrigger']) {
            this.config['controlsTrigger'] = 'hover';
        }

        // type mapping
        this.typeNameMappings = {};
        this.allowedTypes = []; // this is for the toolbar to check if an brick can be dropped to this areablock
        for (var i=0; i<this.config.types.length; i++) {
            this.typeNameMappings[this.config.types[i].type] = {
                name: this.config.types[i].name,
                description: this.config.types[i].description,
                icon: this.config.types[i].icon
            };

            this.allowedTypes.push(this.config.types[i].type);
        }

        // click outside, hide all block buttons
        if(this.config['controlsTrigger'] === 'hover') {
            Ext.getBody().on('click', function (event) {
                if (Ext.get(id) && !Ext.get(id).isAncestor(event.target)) {
                    Ext.get(id).query('.pimcore_area_buttons', false).forEach(function (el) {
                        el.hide();
                    });
                }
            });
        }
    },

    refresh: function() {
        this.elements = Ext.get(this.id).query('.pimcore_block_entry[data-name="' + this.name + '"][key]');


        this.brickTypeUsageCounter = [];
        var limitReached = false;
        if(this.config["limit"] && this.elements.length >= this.config.limit) {
            limitReached = true;
        }


        if (this.elements.length < 1) {
            this.createInitalControls();
        }
        else {
            var hideTimeout, activeBlockEl;

            for (var i = 0; i < this.elements.length; i++) {

                this.elements[i].type = this.elements[i].getAttribute("type");
                this.brickTypeUsageCounter[this.elements[i].type] = this.brickTypeUsageCounter[this.elements[i].type]+1 || 1;

                if(!this.elements[i].key) {
                    this.elements[i].key = this.elements[i].getAttribute("key");
                }

                this.refreshControls(this.elements[i], limitReached);

                var buttonContainer = Ext.get(this.elements[i]).selectNode('.pimcore_area_buttons', false);
                if (this.config['controlsAlign']) {
                    buttonContainer.addCls(this.config['controlsAlign']);
                } else {
                    // top is default
                    buttonContainer.addCls('top');
                }

                buttonContainer.addCls(this.config['controlsTrigger']);

                if(this.config['controlsTrigger'] === 'hover') {
                    Ext.get(this.elements[i]).on('mouseenter', function (event) {

                        if (Ext.dd.DragDropMgr.dragCurrent) {
                            return;
                        }

                        if (hideTimeout) {
                            window.clearTimeout(hideTimeout);
                        }

                        Ext.get(this.id).query('.pimcore_area_buttons', false).forEach(function (el) {
                            if (event.target != el.dom) {
                                el.hide();
                            }
                        });

                        var buttonContainer = Ext.get(event.target).selectNode('.pimcore_area_buttons', false);
                        buttonContainer.show();

                        if (activeBlockEl != event.target) {
                            Ext.menu.Manager.hideAll();
                        }
                        activeBlockEl = event.target;
                    }.bind(this));

                    Ext.get(this.elements[i]).on('mouseleave', function (event) {
                        hideTimeout = window.setTimeout(function () {
                            Ext.get(event.target).selectNode('.pimcore_area_buttons', false).hide();
                            hideTimeout = null;
                        }, 10000);
                    });
                }
            }
        }

        this.updateDropZones();
    },

    refreshControls: function (element, limitReached) {
        var plusButton, minusButton, upButton, downButton, optionsButton, plusDiv, minusDiv, upDiv, downDiv, optionsDiv,
            typeDiv, typeButton, labelText, visibilityDiv, labelDiv, plusUpDiv, plusUpButton,
            dialogBoxDiv, dialogBoxButton;

        // re-initialize controls on every refresh
        plusUpButton = Ext.get(element).query('.pimcore_block_plus_up[data-name="' + this.name + '"] .pimcore_block_button_plus', false)[0];
        if (typeof plusUpButton !== 'undefined') {
            plusUpButton.remove();
        }

        plusButton = Ext.get(element).query('.pimcore_block_plus[data-name="' + this.name + '"] .pimcore_block_button_plus', false)[0];
        if (typeof plusButton !== 'undefined') {
            plusButton.remove();
        }

        if(!limitReached) {
            // plus buttons
            plusUpDiv = Ext.get(element).query('.pimcore_block_plus_up[data-name="' + this.name + '"]')[0];
            plusUpButton = new Ext.Button({
                cls: "pimcore_block_button_plus",
                iconCls: "pimcore_icon_plus_up",
                arrowVisible: false,
                menu: this.getTypeMenu(this, element, "before")
            });
            plusUpButton.render(plusUpDiv);

            plusDiv = Ext.get(element).query('.pimcore_block_plus[data-name="' + this.name + '"]')[0];
            plusButton = new Ext.Button({
                cls: "pimcore_block_button_plus",
                iconCls: "pimcore_icon_plus_down",
                arrowVisible: false,
                menu: this.getTypeMenu(this, element, "after")
            });
            plusButton.render(plusDiv);
        }

        // minus button
        minusButton = Ext.get(element).query('.pimcore_block_minus[data-name="' + this.name + '"] .pimcore_block_button_minus')[0];
        if (typeof minusButton === 'undefined') {
            minusDiv = Ext.get(element).query('.pimcore_block_minus[data-name="' + this.name + '"]')[0];
            minusButton = new Ext.Button({
                cls: "pimcore_block_button_minus",
                iconCls: "pimcore_icon_minus",
                listeners: {
                    "click": this.removeBlock.bind(this, element)
                }
            });
            minusButton.render(minusDiv);
        }

        // up button
        upButton = Ext.get(element).query('.pimcore_block_up[data-name="' + this.name + '"] .pimcore_block_button_up')[0];
        if (typeof upButton === 'undefined') {
            upDiv = Ext.get(element).query('.pimcore_block_up[data-name="' + this.name + '"]')[0];
            upButton = new Ext.Button({
                cls: "pimcore_block_button_up",
                iconCls: "pimcore_icon_white_up",
                listeners: {
                    "click": this.moveBlockUp.bind(this, element)
                }
            });
            upButton.render(upDiv);
        }

        // down button
        downButton = Ext.get(element).query('.pimcore_block_down[data-name="' + this.name + '"] .pimcore_block_button_down')[0];
        if (typeof downButton === 'undefined') {
            downDiv = Ext.get(element).query('.pimcore_block_down[data-name="' + this.name + '"]')[0];
            downButton = new Ext.Button({
                cls: "pimcore_block_button_down",
                iconCls: "pimcore_icon_white_down",
                listeners: {
                    "click": this.moveBlockDown.bind(this, element)
                }
            });
            downButton.render(downDiv);
        }

        // type button
        typeButton = Ext.get(element).query('.pimcore_block_type[data-name="' + this.name + '"] .pimcore_block_button_type')[0];
        if (typeof typeButton === 'undefined') {
            typeDiv = Ext.get(element).query('.pimcore_block_type[data-name="' + this.name + '"]')[0];
            typeButton = new Ext.Button({
                cls: "pimcore_block_button_type",
                handleMouseEvents: false,
                tooltip: t("drag_me"),
                iconCls: "pimcore_icon_white_move",
                style: "cursor: move;"
            });
            typeButton.on("afterrender", function (element, v) {
                v.dragZone = new Ext.dd.DragZone(v.getEl(), {
                    hasOuterHandles: true,
                    getDragData: function(e) {
                        var sourceEl = element;

                        // only use the button as proxy element
                        proxyEl = v.getEl().dom;

                        if (sourceEl) {
                            var d = proxyEl.cloneNode(true);
                            d.id = Ext.id();

                            return v.dragData = {
                                sourceEl: sourceEl,
                                repairXY: Ext.fly(sourceEl).getXY(),
                                ddel: d
                            };
                        }
                    },

                    onStartDrag: this.startDragDrop.bind(this),
                    afterDragDrop: this.endDragDrop.bind(this),
                    afterInvalidDrop: this.endDragDrop.bind(this),
                    beforeDragOut: function (target) {
                        return target ? true : false;
                    },
                    getRepairXY: function() {
                        return this.dragData.repairXY;
                    }
                });
            }.bind(this, element));
            typeButton.render(typeDiv);
        }


        // option button
        optionsButton = Ext.get(element).query('.pimcore_block_options[data-name="' + this.name + '"] .pimcore_block_button_options')[0];
        if (typeof optionsButton === 'undefined') {
            optionsDiv = Ext.get(element).query('.pimcore_block_options[data-name="' + this.name + '"]')[0];
            optionsButton = new Ext.Button({
                cls: "pimcore_block_button_options",
                iconCls: "pimcore_icon_white_copy",
                listeners: {
                    "click": this.optionsClickhandler.bind(this, element)
                }
            });
            optionsButton.render(optionsDiv);
        }


        //visibility buttons
        visibilityButtons = this.visibilityButtons[element.key];
        if (typeof visibilityButtons === 'undefined') {
            var elementIcon = "pimcore_material_icon_preview";
            if (element.dataset.hidden == "true") {
                elementIcon = "pimcore_icon_white_hide";
            }
            visibilityDiv = Ext.get(element).query('.pimcore_block_visibility[data-name="' + this.name + '"]')[0];
            this.visibilityButtons[element.key] = new Ext.Button({
                cls: "pimcore_block_button_visibility",
                iconCls: elementIcon,
                enableToggle: true,
                pressed: (element.dataset.hidden == "true"),
                toggleHandler: function (element, el) {
                    Ext.get(element).toggleCls('pimcore_area_hidden');
                    if (el.btnIconEl.dom.classList.contains('pimcore_icon_white_hide')) {
                        Ext.get(el.btnIconEl.dom).removeCls('pimcore_icon_white_hide');
                        Ext.get(el.btnIconEl.dom).addCls('pimcore_material_icon_preview');
                    } else {
                        Ext.get(el.btnIconEl.dom).removeCls('pimcore_material_icon_preview');
                        Ext.get(el.btnIconEl.dom).addCls('pimcore_icon_white_hide');
                    }
                }.bind(this, element)
            });
            this.visibilityButtons[element.key].render(visibilityDiv);
            new Ext.tip.ToolTip({
                target: this.visibilityButtons[element.key],
                html: t("show_hide_areablock")
            });
            if(element.dataset.hidden == "true") {
                Ext.get(element).addCls('pimcore_area_hidden');
            }
        }


        //dialogBox button
        dialogBoxDiv = Ext.get(element).query('.pimcore_block_dialog[data-name="' + this.name + '"]')[0];
        if (dialogBoxDiv) {
            dialogBoxButton = Ext.get(element).query('.pimcore_block_dialog[data-name="' + this.name + '"] .pimcore_block_button_dialog')[0];
            if (typeof dialogBoxButton === 'undefined') {
                dialogBoxDiv = Ext.get(element).query('.pimcore_block_dialog[data-name="' + this.name + '"]')[0];
                dialogBoxButton = new Ext.Button({
                    cls: "pimcore_block_button_dialog",
                    iconCls: "pimcore_icon_white_edit",
                    listeners: {
                        "click": this.openEditableDialogBox.bind(this, element, dialogBoxDiv)
                    }
                });
                dialogBoxButton.render(dialogBoxDiv);
            }
        }


        labelDiv = Ext.get(Ext.get(element).query('.pimcore_block_label[data-name="' + this.name + '"]')[0]);
        labelText = "<b>"  + element.type + "</b>";
        if(this.typeNameMappings[element.type]
            && typeof this.typeNameMappings[element.type].name != "undefined") {
            labelText = "<b>" + this.typeNameMappings[element.type].name + "</b> "
                + this.typeNameMappings[element.type].description;
        }
        labelDiv.setHtml(labelText);
    },

    render: function () {
        this.refresh();
    },

    applyFallbackIcons: function() {
        // this contains fallback-icons
        var iconStore = ["circuit","display","biomass","deployment","electrical_sensor","dam",
            "light_at_the_end_of_tunnel","like","icons8_cup","sports_mode","landscape","selfie","cable_release",
            "bookmark","briefcase","graduation_cap","in_transit","diploma_2","circuit","display","biomass","deployment",
            "electrical_sensor","dam",
            "light_at_the_end_of_tunnel","like","icons8_cup","sports_mode","landscape","selfie","cable_release",
            "bookmark","briefcase","graduation_cap","in_transit","diploma_2"];

        if (this.config.types) {
            for (var i = 0; i < this.config.types.length; i++) {

                var brick = this.config.types[i];

                if (!brick.icon) {
                    brick.icon = "/bundles/pimcoreadmin/img/flat-color-icons/" + iconStore[i + 1] + ".svg";
                }
            }
        }
    },

    copyToClipboard: function (element) {

        var areaIdentifier = {
            name: this.getName(),
            realName: this.getRealName(),
            key: element.getAttribute("key")
        };

        var item = {
            identifier: areaIdentifier,
            type: element.getAttribute("type"),
            values: {}
        };

        // check which editables are inside this area and get the data
        Object.values(editableManager.getEditables()).forEach(editable => {
            try {
                if (!editable.getName()) {
                    return;
                }

                var editableData = this.copyData(areaIdentifier, editable);
                if (editableData) {
                    item.values[editable.getName()] = editableData;
                }
            } catch (e) {
                console.error(e);
            }
        });

        pimcore.globalmanager.add("areablock_clipboard", Ext.encode(item));
    },

    copyData: function (areaIdentifier, editable) {
        var areaBaseName = areaIdentifier.name + ':' + areaIdentifier.key + '.';

        if (editable.getName().indexOf(areaBaseName) !== 0) {
            return false; // editable is not inside area
        }

        // remove common base name (= parent area identifier) from relative name
        var relativeName = editable.getName().replace(new RegExp('^' + areaBaseName), '');
        var itemParts = relativeName.split('.');

        // last part is the real name
        itemParts.pop();

        var parents = [];
        if (itemParts.length > 0) {
            Ext.each(itemParts, function(parent) {
                var parentParts = parent.split(':');
                var parentEntry = {
                    name: parentParts[0],
                    key: null
                };

                if (parentParts.length > 1) {
                    parentEntry.key = parentParts[1];
                }

                parents.push(parentEntry);
            });
        }

        parents = parents || [];

        return {
            name: editable.getName(),
            realName: editable.getRealName(),
            data: editable.getValue(),
            type: editable.getType(),
            parents: parents
        };
    },

    getPasteName: function(areaIdentifier, item, editableData) {
        var editableName;

        // base name is area identifier + key
        var editableParts = [
            areaIdentifier.name + ':' + areaIdentifier.key
        ];

        // add relative parent paths as parsed when copying
        if (editableData.parents.length > 0) {
            Ext.each(editableData.parents, function (parentEntry) {
                var pathPart = parentEntry.name;
                if (null !== parentEntry.key) {
                    pathPart += ':' + parentEntry.key;
                }

                editableParts.push(pathPart);
            });
        }

        // add the real name as last part
        editableParts.push(editableData.realName);

        // join parts together with .
        editableName = editableParts.join('.');

        return editableName;
    },

    optionsClickhandler: function (element, btn, e) {
        var menu = new Ext.menu.Menu();

        if(element != false) {
            menu.add(new Ext.menu.Item({
                text: t('copy'),
                iconCls: "pimcore_icon_copy",
                handler: function (item) {
                    item.parentMenu.destroy();
                    this.copyToClipboard(element);
                }.bind(this)
            }));

            menu.add(new Ext.menu.Item({
                text: t('cut'),
                iconCls: "pimcore_icon_cut",
                handler: function (item) {
                    item.parentMenu.destroy();
                    this.copyToClipboard(element);
                    this.removeBlock(element);
                }.bind(this)
            }));
        }

        if(pimcore.globalmanager.exists("areablock_clipboard")) {
            menu.add(new Ext.menu.Item({
                text: t('paste'),
                iconCls: "pimcore_icon_paste",
                handler: function (item) {
                    item.parentMenu.destroy();
                    item = pimcore.globalmanager.get("areablock_clipboard");
                    /*
                    This occurs for the following reason: properties of object.prototype like toString()
                    and hasOwnProperty directly linked to window in which object was created
                     */
                    item = Ext.decode(item);

                    var areaIdentifier = {
                        name: this.getName(),
                        key: (this.getNextKey() + 1)
                    };

                    var that = this;

                    // push the data as an object compatible to the pimcore.document.editable interface to the rest of
                    // available editables so that they get read by pimcore.document.edit.getValues()
                    Ext.iterate(item.values, function (key, value, object) {
                        var editableName = that.getPasteName(areaIdentifier, item, value);

                        editableManager.add({
                            getName: function () {
                                return editableName;
                            },
                            getRealName: function() {
                                return value.realName;
                            },
                            getValue: function () {
                                return value.data;
                            },
                            getInherited: function () {
                                return false;
                            },
                            getType: function () {
                                return value.type;
                            }
                        });
                    });

                    this.addBlockAfter(element, item.type, true);
                    this.reloadDocument();
                }.bind(this)
            }));
        }

        if(!menu.items || !menu.items.getCount()) {
            menu.add(new Ext.menu.Item({
                text: t('no_action_available')
            }));
        }

        menu.showAt(e.getXY());
        e.stopEvent();
    },

    setInherited: function ($super, inherited) {
        var elements = Ext.get(this.id).query('.pimcore_area_buttons[data-name="' + this.name + '"]');
        if(elements.length > 0) {
            for(var i=0; i<elements.length; i++) {
                $super(inherited, Ext.get(elements[i]));
            }
        }
    },

    startDragDrop: function () {
        Ext.getBody().addCls('pimcore_drag_drop_active');
        Ext.get(this.id).addCls('pimcore_editable_areablock_dropzones_active');
    },

    endDragDrop: function () {
        Ext.getBody().removeCls('pimcore_drag_drop_active');
        Ext.get(this.id).removeCls('pimcore_editable_areablock_dropzones_active');
    },

    updateDropZones: function () {

        if(this.inherited) {
            return;
        }

        var dropZones = Ext.get(this.id).query("div.pimcore_area_dropzone");
        for(var i=0; i<dropZones.length; i++) {
            dropZones[i].dropZone.unreg();
            Ext.get(dropZones[i]).remove();
        }

        if(this.elements.length > 0) {
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i]) {
                    if(i == 0) {
                        var b = Ext.DomHelper.insertBefore(this.elements[i], {
                            tag: "div",
                            index: i,
                            "class": "pimcore_area_dropzone"
                        });
                        this.addDropZoneToElement(b);
                    }
                    var a = Ext.DomHelper.insertAfter(this.elements[i], {
                        tag: "div",
                        index: i+1,
                        "class": "pimcore_area_dropzone"
                    });

                    this.addDropZoneToElement(a);
                }
            }
        } else {
            // this is only for inserting when no element is in the areablock
            var c = Ext.DomHelper.append(Ext.get(this.id), {
                tag: "div",
                index: i+1,
                "class": "pimcore_area_dropzone"
            });

            this.addDropZoneToElement(c);
        }
    },

    addDropZoneToElement: function (el) {
        el.dropZone = new Ext.dd.DropZone(el, {

            getTargetFromEvent: function(e) {
                return el;
            },

            onNodeEnter : function(target, dd, e, data){
                Ext.fly(target).addCls('pimcore_area_dropzone_hover');
            },

            onNodeOut : function(target, dd, e, data){
                Ext.fly(target).removeCls('pimcore_area_dropzone_hover');
            },

            onNodeOver : function(target, dd, e, data){
                return Ext.dd.DropZone.prototype.dropAllowed;
            },

            onNodeDrop : function(target, dd, e, data){
                if(data.fromToolbar) {
                    this.addBlockAt(data.brick.type, target.getAttribute("index"));
                    return true;
                } else {
                    this.moveBlockTo(data.sourceEl, target.getAttribute("index"));
                    return true;
                }
            }.bind(this)
        });
    },

    createInitalControls: function () {

        var plusEl = document.createElement("div");
        plusEl.setAttribute("class", "pimcore_block_plus");
        plusEl.setAttribute("data-name", this.name);

        var optionsEl = document.createElement("div");
        optionsEl.setAttribute("class", "pimcore_block_options");
        optionsEl.setAttribute("data-name", this.name);

        var clearEl = document.createElement("div");
        clearEl.setAttribute("class", "pimcore_block_clear");
        clearEl.setAttribute("data-name", this.name);

        Ext.get(this.id).appendChild(plusEl);
        Ext.get(this.id).appendChild(optionsEl);
        Ext.get(this.id).appendChild(clearEl);

        // plus button
        var plusButton = new Ext.Button({
            cls: "pimcore_block_button_plus",
            arrowVisible: false,
            iconCls: "pimcore_icon_plus",
            menu: this.getTypeMenu(this, null)
        });
        plusButton.render(plusEl);

        // options button
        var optionsButton = new Ext.Button({
            cls: "pimcore_block_button_options",
            iconCls: "pimcore_icon_white_copy",
            listeners: {
                click: this.optionsClickhandler.bind(this, false)
            }
        });
        optionsButton.render(optionsEl);
    },

    getTypeMenu: function (scope, element, insertPosition) {
        const menu = [];
        const limits = this.config["limits"] || {};

        if (typeof this.config.group != "undefined") {
            const groups = Object.keys(this.config.group);
            const maxHeight = Ext.getBody().getViewSize().height;
            for (let g = 0; g < groups.length; g++) {
                if (groups[g].length > 0) {
                    let groupMenu = {
                        text: t(groups[g]),
                        iconCls: "pimcore_icon_area",
                        hideOnClick: false,
                        menu: {
                            xtype: 'menu',
                            items: []
                        }
                    };

                    for (let i = 0; i < this.config.types.length; i++) {
                        if (in_array(this.config.types[i].type,this.config.group[groups[g]])) {
                            let type = this.config.types[i].type;
                            if (typeof limits[type] == "undefined" ||
                                typeof this.brickTypeUsageCounter[type] == "undefined" || this.brickTypeUsageCounter[type] < limits[type]) {
                                    groupMenu.menu.items.push(this.getMenuConfigForBrick(this.config.types[i], scope, element, insertPosition));
                            }
                        }
                    }
                    if (groupMenu.menu.items.length) {
                        // One item has a height of 32px
                        if (groupMenu.menu.items.length * 32 > maxHeight) {
                            groupMenu.menu.height = maxHeight;
                        }
                        menu.push(groupMenu);
                    }
                }
            }
        } else {
            for (let i = 0; i < this.config.types.length; i++) {
                const type = this.config.types[i].type;
                if (typeof limits[type] == "undefined" ||
                    typeof this.brickTypeUsageCounter[type] == "undefined" || this.brickTypeUsageCounter[type] < limits[type]) {
                    menu.push(this.getMenuConfigForBrick(this.config.types[i], scope, element, insertPosition));
                }
            }
        }

        return menu;
    },

    getMenuConfigForBrick: function (brick, scope, element, insertPosition) {

        var menuText = brick.name;
        if(brick.description) {
            menuText += " | " + brick.description;
        }

        if (brick.limit) {
            menuText += ' <span class="pimcore_areablock_menu_limit">('+ brick.limit +')</span>';
        }

        if(!insertPosition) {
            insertPosition = 'after';
        }

        var addBLockFunction = "addBlock" + ucfirst(insertPosition);

        var tmpEntry = {
            text: menuText,
            iconCls: "pimcore_icon_area",
            listeners: {
                click: this[addBLockFunction].bind(scope, element, brick.type),
                render: function (c) {
                    if(brick.previewHtml) {
                        Ext.create('Ext.tip.ToolTip', {
                            target: c.getEl(),
                            showDelay: 500,
                            html: brick.previewHtml
                        });
                    }
                }
            }
        };

        if(brick.icon) {
            delete tmpEntry.iconCls;
            tmpEntry.icon = brick.icon;
        }

        return tmpEntry;
    },

    getNextKey: function () {
        var nextKey = 0;
        var currentKey;

        for (var i = 0; i < this.elements.length; i++) {
            currentKey = intval(this.elements[i].key);
            if (currentKey > nextKey) {
                nextKey = currentKey;
            }
        }

        return nextKey;
    },

    addBlockAfter : function (element, type, forceReload) {
        var index = this.getElementIndex(element) + 1;

        this.addBlockAt(type, index, forceReload);
    },

    addBlockBefore : function (element, type) {
        var index = this.getElementIndex(element);
        this.addBlockAt(type, index);
    },

    addBlockAt: function (type, index, forceReload) {
        var limits = this.config["limits"] || {};
        if (!this.elements.length) {
            index = 0;
        }

        if(typeof this.config["limit"] != "undefined" && this.elements.length >= this.config.limit) {
            Ext.MessageBox.alert(t("error"), t("limit_reached"));
            return;
        }

        let brickName = type;
        let brickIndex = this.allowedTypes.indexOf(brickName);

        if(typeof limits[type] != "undefined" && this.brickTypeUsageCounter[type] >= limits[type]) {
            if (brickIndex >= 0 && typeof this.config.types[brickIndex].name != "undefined") {
                brickName = this.config.types[brickIndex].name;
            }
            Ext.MessageBox.alert(t("error"), t("brick_limit_reached", null ,{bricklimit: limits[type], brickname: brickName}));
            return;
        }

        var nextKey = this.getNextKey();
        nextKey++;

        if(this.config.types[brickIndex]['needsReload'] || forceReload === true || this.config.reload === true) {
            editWindow.lastScrollposition = '#' + this.id + ' .pimcore_block_entry[data-name="' + this.name + '"][key="' + nextKey + '"]';

            this.elements.splice.apply(this.elements, [index, 0, {
                key: nextKey,
                type: type
            }]);

            this.reloadDocument();
        } else {
            let saveData = this.getValue();
            saveData.splice.apply(saveData, [index, 0, {
                key: nextKey,
                type: type
            }]);

            Ext.Ajax.request({
                url: Routing.generate('pimcore_admin_document_page_areabrick-render-index-editmode'),
                method: 'post',
                params: {
                    documentId: window.editWindow.document.id,
                    name: this.getName(),
                    realName: this.getRealName(),
                    index: index,
                    blockStateStack: this.config['blockStateStack'],
                    areablockConfig: Ext.encode(this.initalConfig),
                    areablockData: Ext.encode(saveData)
                },
                success: function (response) {
                    let res = Ext.decode(response.responseText);
                    if(!this.elements.length) {
                        Ext.get(this.id).setHtml(res['htmlCode']);
                    } else if (this.elements[index-1]) {
                        Ext.get(this.elements[index-1]).insertHtml('afterEnd', res['htmlCode'], true);
                    } else if (this.elements[index]) {
                        Ext.get(this.elements[index]).insertHtml('beforeBegin', res['htmlCode'], true);
                    }

                    res['editableDefinitions'].forEach(editableDef => {
                        editableManager.addByDefinition(editableDef);
                    });

                    this.refresh();

                }.bind(this)
            });
        }
    },

    removeBlock: function (element) {
        let container = Ext.get(element);

        let dialogBoxDiv = container.query('.pimcore_block_dialog[data-name="' + this.name + '"]')[0];
        if (dialogBoxDiv) {
            let dialogBoxId = dialogBoxDiv.dataset.dialogId;
            this.removeEditableDialogbox(dialogBoxId);
        }

        let editablesContainer = container.query('[data-block-names]');
        editablesContainer.forEach(editableDiv => {
            editableManager.remove(editableDiv.dataset.name);
        });

        container.remove();

        this.refresh();

        if(this.config.reload) {
            this.reloadDocument();
        }
    },

    moveBlockTo: function (block, toIndex) {
        toIndex = intval(toIndex);
        if(this.elements[toIndex]) {
            Ext.get(block).insertBefore(this.elements[toIndex]);
        } else {
            // to the last position
            Ext.get(block).insertAfter(this.elements[this.elements.length-1]);
        }

        this.refresh();

        if(this.config.reload) {
            this.reloadDocument();
        }
    },

    moveBlockDown: function (element) {

        var index = this.getElementIndex(element);

        if (index < (this.elements.length-1)) {
            this.moveBlockTo(element, index+2);
        }
    },

    moveBlockUp: function (element) {

        var index = this.getElementIndex(element);

        if (index > 0) {
            this.moveBlockTo(element, index-1);
        }
    },

    getElementIndex: function (element) {

        try {
            var key = Ext.get(element).dom.key;
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == key) {
                    var index = i;
                    break;
                }
            }
        }
        catch (e) {
            return 0;
        }

        return index;
    },



    createToolBar: function () {
        var buttons = [];
        var button;
        var bricksInThisArea = [];
        var groupsInThisArea = {};
        var areaBlockToolbarSettings = this.config["areablock_toolbar"];
        var itemCount = 0;

        if(pimcore.document.editables[this.toolbarGlobalVar] != false
                                                && pimcore.document.editables[this.toolbarGlobalVar].itemCount) {
            itemCount = pimcore.document.editables[this.toolbarGlobalVar].itemCount;
        }

        if(typeof this.config.group != "undefined") {
            var groupMenu;
            var groupItemCount = 0;
            var isExistingGroup;
            var brickKey;
            var groups = Object.keys(this.config.group);

            for (var g=0; g<groups.length; g++) {
                groupMenu = null;
                isExistingGroup = false;
                if(groups[g].length > 0) {

                    if(pimcore.document.editables[this.toolbarGlobalVar] != false) {
                        if(pimcore.document.editables[this.toolbarGlobalVar]["groups"][groups[g]]) {
                            groupMenu = pimcore.document.editables[this.toolbarGlobalVar]["groups"][groups[g]];
                            isExistingGroup = true;
                        }
                    }

                    if(!groupMenu) {
                        groupMenu = new Ext.Button({
                            xtype: "button",
                            text: t(groups[g]),
                            textAlign: "left",
                            hideOnClick: false,
                            width: areaBlockToolbarSettings.buttonWidth,
                            menu: [],
                            menuAlign: 'tl-tr',
                            listeners: {
                                mouseover: function (el) {
                                    el.showMenu();
                                }
                            }
                        });
                    }

                    groupsInThisArea[groups[g]] = groupMenu;

                    for (var i=0; i<this.config.types.length; i++) {
                        if(in_array(this.config.types[i].type,this.config.group[groups[g]])) {
                            itemCount++;
                            brickKey = groups[g] + " - " + this.config.types[i].type;
                            button = this.getToolBarButton(this.config.types[i], brickKey, itemCount, "menu");
                            if(button) {
                                bricksInThisArea.push(brickKey);
                                groupMenu.menu.add(button);
                                groupItemCount++;
                            }
                        }
                    }

                    if(!isExistingGroup && groupItemCount > 0) {
                        buttons.push(groupMenu);
                    }
                }
            }
        } else {
            for (var i=0; i<this.config.types.length; i++) {
                var brick = this.config.types[i];
                itemCount++;

                brickKey = brick.type;
                button = this.getToolBarButton(brick, brickKey, itemCount);
                if(button) {
                    bricksInThisArea.push(brickKey);
                    buttons.push(button);
                }
            }
        }

        // only initialize the toolbar once, even when there are more than one area on the page
        if(pimcore.document.editables[this.toolbarGlobalVar] == false) {

            var toolbar = new Ext.Window({
                title: areaBlockToolbarSettings.title,
                width: areaBlockToolbarSettings.width,
                border:false,
                shadow: false,
                resizable: false,
                scrollable: 'y',
                draggable: false,
                header: false,
                style: "position:fixed;",
                collapsible: false,
                cls: "pimcore_areablock_toolbar",
                closable: false,
                x: -1000,
                y: 1,
                items: buttons
            });

            toolbar.show();

            pimcore.document.editables[this.toolbarGlobalVar] = {
                toolbar: toolbar,
                groups: groupsInThisArea,
                bricks: bricksInThisArea,
                areablocks: [this],
                itemCount: buttons.length
            };

            window.editWindow.areaToolbarTrigger.show();
            window.editWindow.areaToolbarTrigger.areaToolbarElement = toolbar;

            // click outside, hide toolbar
            Ext.getBody().on('click', function (event) {
                if(!toolbar.getEl().isAncestor(event.target)) {
                    window.editWindow.areaToolbarTrigger.toggle(false);
                    toolbar.setLocalX(-1000);
                }
            });
        } else {
            pimcore.document.editables[this.toolbarGlobalVar].toolbar.add(buttons);
            pimcore.document.editables[this.toolbarGlobalVar].bricks =
                                    array_merge(pimcore.document.editables[this.toolbarGlobalVar].bricks, bricksInThisArea);
            pimcore.document.editables[this.toolbarGlobalVar].groups =
                                    array_merge(pimcore.document.editables[this.toolbarGlobalVar].groups, groupsInThisArea);
            pimcore.document.editables[this.toolbarGlobalVar].itemCount += buttons.length;
            pimcore.document.editables[this.toolbarGlobalVar].areablocks.push(this);
            pimcore.document.editables[this.toolbarGlobalVar].toolbar.updateLayout();
        }

    },

    getToolBarButton: function (brick, key, itemCount, type) {

        if(pimcore.document.editables[this.toolbarGlobalVar] != false) {
            if(in_array(key, pimcore.document.editables[this.toolbarGlobalVar].bricks)) {
                return;
            }
        }

        var areaBlockToolbarSettings = this.config["areablock_toolbar"];
        var maxButtonCharacters = areaBlockToolbarSettings.buttonMaxCharacters;

        var button = {
            xtype: "button",
            textAlign: "left",
            icon: brick.icon,
            cls: 'pimcore_cursor_move',
            text: (brick.name.length > maxButtonCharacters ? brick.name.substr(0,maxButtonCharacters) + "..."
                : brick.name) + (brick.limit ? ' <span class="pimcore_areablock_menu_limit">('+ brick.limit +')</span>' : ''),
            width: areaBlockToolbarSettings.buttonWidth,
            handler: function () {
                Ext.MessageBox.alert(t("info"), t("area_brick_assign_info_message"));
            },
            listeners: {
                render: function () {
                    if (brick.previewHtml) {
                        Ext.create('Ext.tip.ToolTip', {
                            target: this.getEl(),
                            showDelay: 500,
                            html: brick.previewHtml
                        });
                    }
                },
                "afterrender": function (brick, v) {

                    let menuLink = v.getEl().down('a', true);
                    if(menuLink) {
                        // the menu item has a <a> tag, with href=#, which causes dnd to not work properly
                        // and also shows the link target next to the mouse pointer while dragging
                        // -> removing the href attribute fixes the issue
                        menuLink.removeAttribute('href');
                    }

                    v.dragZone = new Ext.dd.DragZone(v.getEl(), {
                        getDragData: function(e) {
                            var sourceEl = v.getEl().dom;
                            if (sourceEl) {
                                var d = sourceEl.cloneNode(true);
                                d.id = Ext.id();
                                return v.dragData = {
                                    sourceEl: sourceEl,
                                    repairXY: Ext.fly(sourceEl).getXY(),
                                    ddel: d,
                                    fromToolbar: true,
                                    brick: brick
                                }
                            }
                        },

                        onStartDrag: function () {

                            // hide control bars
                            Ext.get(this.id).query('.pimcore_area_buttons', false).forEach(function (el) {
                                el.hide();
                            });

                            // create drop zones
                            var areablocks = pimcore.document.editables[this.toolbarGlobalVar].areablocks;
                            for(var i=0; i<areablocks.length; i++) {
                                if(in_array(brick.type, areablocks[i].allowedTypes)) {
                                    areablocks[i].startDragDrop();
                                }
                            }
                        }.bind(this),
                        afterDragDrop: function () {
                            var areablocks = pimcore.document.editables[this.toolbarGlobalVar].areablocks;
                            for(var i=0; i<areablocks.length; i++) {
                                areablocks[i].endDragDrop();
                            }

                            Ext.menu.Manager.hideAll();
                        }.bind(this),
                        beforeDragOut: function (target) {
                            return target ? true : false;
                        },
                        afterInvalidDrop: function () {
                            var areablocks = pimcore.document.editables[this.toolbarGlobalVar].areablocks;
                            for(var i=0; i<areablocks.length; i++) {
                                areablocks[i].endDragDrop();
                            }
                        }.bind(this),

                        getRepairXY: function() {
                            return this.dragData.repairXY;
                        }
                    });
                }.bind(this, brick)
            }
        };

        if(brick.description) {
            button["tooltip"] = brick.description;
        }

        if(type == "menu") {
            delete button["width"];
            delete button["xtype"];
            button["text"] = brick.name;// not shortened
        }

        return button;
    },

    getValue: function () {
        var data = [];
        var hidden = false;
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i]) {
                if (this.elements[i].key) {
                    hidden = false;
                    if(this.visibilityButtons[this.elements[i].key]) {
                        hidden = this.visibilityButtons[this.elements[i].key].pressed;
                    }

                    data.push({
                        key: this.elements[i].key,
                        type: this.elements[i].type,
                        hidden: hidden
                    });
                }
            }
        }

        return data;
    },

    getType: function () {
        return "areablock";
    }
});

pimcore.document.editables.areablocktoolbar = false;



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.area");
/**
 * @private
 */
pimcore.document.editables.area = Class.create(pimcore.document.area_abstract, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.datax = data ?? {};

        //editable dialog box button
        try {
            var dialogBoxDiv = Ext.get(id).query('.pimcore_area_dialog[data-name="' + this.name + '"]')[0];
            if (dialogBoxDiv) {
                var dialogBoxButton = new Ext.Button({
                    cls: "pimcore_block_button_dialog",
                    iconCls: "pimcore_icon_white_edit",
                    listeners: {
                        "click": this.openEditableDialogBox.bind(this, Ext.get(id), dialogBoxDiv)
                    }
                });
                dialogBoxButton.render(dialogBoxDiv);
            }
        } catch (e) {
            console.log(e);
        }

    },

    setInherited: function ($super, inherited) {
        // disable masking for this datatype (overwrite), because it's actually not needed, otherwise call $super()
        this.inherited = inherited;
    },

    getValue: function () {
        if(this.config['type'] !== undefined){
            this.datax['type'] = this.config['type'];
        }

        return this.datax;
    },

    getType: function () {
        return "area";
    }
});


/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.pdf");
/**
 * @private
 */
pimcore.document.editables.pdf = Class.create(pimcore.document.editable, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.data = data ?? {};

        if (!this.config["height"]) {
            this.config.height = 100;
        }

        this.config.name = id + "_editable";
    },

    render: function () {
        this.setupWrapper();
        this.element = new Ext.Panel(this.config);
        this.element.on("render", function (el) {

            // contextmenu
            el.getEl().on("contextmenu", this.onContextMenu.bind(this));

            // register at global DnD manager
            dndManager.addDropTarget(el.getEl(), this.onNodeOver.bind(this), this.onNodeDrop.bind(this));

            el.getEl().setStyle({
                position: "relative"
            });

            var body = this.getBody();
            body.insertHtml("beforeEnd",'<div class="pimcore_editable_droptarget"></div>');
            body.addCls("pimcore_editable_image_empty");
        }.bind(this));

        this.element.render(this.id);

        pimcore.helpers.registerAssetDnDSingleUpload(this.element.getEl().dom, this.config["uploadPath"], 'path', function (e) {
            if (e['asset']['type'] === "document" && !this.inherited) {
                this.resetData();
                this.data.id = e['asset']['id'];

                this.updateImage();
                this.reload();

                return true;
            } else {
                pimcore.helpers.showNotification(t("error"), t('unsupported_filetype'), "error");
            }
        }.bind(this));

        // insert image
        if (this.data) {
            this.updateImage();
        }
    },

    onContextMenu: function (e) {

        var menu = new Ext.menu.Menu();

        if(this.data.id) {
            menu.add(new Ext.menu.Item({
                text: t('empty'),
                iconCls: "pimcore_icon_delete",
                handler: function (item) {
                    item.parentMenu.destroy();

                    this.empty();

                }.bind(this)
            }));
            menu.add(new Ext.menu.Item({
                text: t('open'),
                iconCls: "pimcore_icon_open",
                handler: function (item) {
                    item.parentMenu.destroy();
                    pimcore.helpers.openAsset(this.data.id, "document");
                }.bind(this)
            }));

            if (pimcore.elementservice.showLocateInTreeButton("document")) {
                menu.add(new Ext.menu.Item({
                    text: t('show_in_tree'),
                    iconCls: "pimcore_icon_show_in_tree",
                    handler: function (item) {
                        item.parentMenu.destroy();
                        pimcore.treenodelocator.showInTree(this.data.id, "asset");
                    }.bind(this)
                }));
            }
        }

        if(pimcore.helpers.hasSearchImplementation()) {
            menu.add(new Ext.menu.Item({
                text: t('search'),
                iconCls: "pimcore_icon_search",
                handler: function (item) {
                    item.parentMenu.destroy();
                    this.openSearchEditor();
                }.bind(this)
            }));
        }

        menu.add(new Ext.menu.Item({
            text: t('upload'),
            iconCls: "pimcore_icon_upload",
            handler: function (item) {
                item.parentMenu.destroy();
                this.uploadDialog();
            }.bind(this)
        }));

        menu.showAt(e.getXY());
        e.stopEvent();
    },

    uploadDialog: function () {
        pimcore.helpers.assetSingleUploadDialog(this.config["uploadPath"], "path", function (res) {
            try {
                var data = Ext.decode(res.response.responseText);
                if(data["id"] && data["type"] == "document") {
                    this.resetData();
                    this.data.id = data["id"];

                    this.updateImage();
                    this.reload();
                }
            } catch (e) {
                console.log(e);
            }
        }.bind(this));
    },

    onNodeOver: function(target, dd, e, data) {
        if (data.records.length === 1 && this.dndAllowed(data.records[0])) {
            return Ext.dd.DropZone.prototype.dropAllowed;
        }
        else {
            return Ext.dd.DropZone.prototype.dropNotAllowed;
        }
    },

    onNodeDrop: function (target, dd, e, data) {

        if(!pimcore.helpers.dragAndDropValidateSingleItem(data)) {
            return false;
        }

        data = data.records[0].data;
        if (data.elementType === "asset" && data.type === "document") {
            this.resetData();
            this.data.id = data.id;

            this.updateImage();
            this.reload();

            return true;
        }
    },

    dndAllowed: function(record) {

        if(record.data.elementType !== "asset" || record.data.type !== "document"){
            return false;
        } else {
            return true;
        }

    },

    openSearchEditor: function () {
        pimcore.helpers.itemselector(false, this.addDataFromSelector.bind(this), {
            type: ["asset"],
            subtype: {
                asset: ["document"]
            }
        },
            {
                context: this.getContext()
            });
    },

    addDataFromSelector: function (item) {
        if(item) {
            this.resetData();
            this.data.id = item.id;

            this.updateImage();
            this.reload();

            return true;
        }
    },

    resetData: function () {
        this.data = {
            id: null
        };
    },

    empty: function () {

        this.resetData();

        this.updateImage();
        this.getBody().addCls("pimcore_editable_image_empty");
        this.reload();
    },

    getBody: function () {
        // get the id from the body element of the panel because there is no method to set body's html
        // (only in configure)
        var body = Ext.get(this.element.getEl().query("." + Ext.baseCSSPrefix + "autocontainer-innerCt")[0]);
        return body;
    },

    updateImage: function () {
        var existingImage = this.getBody().dom.getElementsByTagName("img")[0];
        if (existingImage) {
            Ext.get(existingImage).remove();
        }

        if (!this.data.id) {
            return;
        }

        var params = this.data;
        params['width'] = this.element.getEl().getWidth();
        params['aspectratio'] = true;

        var path = Routing.generate('pimcore_admin_asset_getdocumentthumbnail', params)

        var image = document.createElement("img");
        image.src = path;

        this.getBody().appendChild(image);
        this.getBody().removeCls("pimcore_editable_image_empty");

        this.updateCounter = 0;
        this.updateDimensionsInterval = window.setInterval(this.updateDimensions.bind(this), 1000);
    },

    reload : function () {
        this.reloadDocument();
    },

    updateDimensions: function () {

        var image = this.element.getEl().dom.getElementsByTagName("img")[0];
        if (!image) {
            return;
        }
        image = Ext.get(image);

        var width = image.getWidth();
        var height = image.getHeight();

        if (width > 1 && height > 1) {
            this.element.setWidth(width);
            this.element.setHeight(height);

            clearInterval(this.updateDimensionsInterval);
        }

        if (this.updateCounter > 20) {
            // only wait 20 seconds until image must be loaded
            clearInterval(this.updateDimensionsInterval);
        }

        this.updateCounter++;
    },

    getValue: function () {
        return this.data;
    },

    getType: function () {
        return "pdf";
    }
});



/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.embed");
/**
 * @private
 */
pimcore.document.editables.embed = Class.create(pimcore.document.editable, {

    initialize: function($super, id, name, config, data, inherited) {
        $super(id, name, config, data, inherited);

        this.data = data;
    },

    render: function () {
        this.setupWrapper();

        this.element = Ext.get(this.id);

        let button = new Ext.Button({
            iconCls: "pimcore_icon_embed pimcore_icon_overlay_edit",
            cls: "pimcore_edit_link_button",
            handler: this.openEditor.bind(this)
        });
        button.render(this.element.insertHtml("afterBegin", '<div class="pimcore_video_edit_button"></div>'));

        if(empty(this.data["url"])) {
            this.element.addCls("pimcore_editable_embed_empty");
            this.element.on("click", this.openEditor.bind(this));
        }
    },

    openEditor: function () {

        // disable the global dnd handler in this editmode/frame
        window.dndManager.disable();

        parent.Ext.MessageBox.prompt("", 'URL (eg. https://www.youtube.com/watch?v=nPntDiARQYw)',
        function (button, value, object) {
            if(button == "ok") {
                this.data["url"] = value;
                this.reloadDocument();
            }
        }.bind(this), this, false, this.data["url"]);
    },

    getValue: function () {
        return this.data;
    },

    getType: function () {
        return "embed";
    }
});


/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.document.editables.manager");
/**
 * @private
 */
pimcore.document.editables.manager = Class.create({

    editables: {},
    requiredEditables:{},
    initialized: false,

    addByDefinition: function (definition) {
        let type = definition.type
        let name = definition.name;
        let inherited = false;
        if(typeof definition["inherited"] != "undefined") {
            inherited = definition["inherited"];
        }

        let EditableClass = pimcore.document.editables[type];

        if (typeof EditableClass !== 'function') {
            throw 'Editable of type `' + type + '` with name `' + name + '` could not be found.';
        }

        if (definition.inDialogBox && typeof EditableClass.prototype['render'] !== 'function') {
            throw 'Editable of type `' + type + '` with name `' + name + '` does not support the use in the dialog box.';
        }

        let editable = new EditableClass(definition.id, name, definition.config, definition.data, inherited);
        editable.setRealName(definition.realName);
        editable.setInDialogBox(definition.inDialogBox);

        if (!definition.inDialogBox) {
            if (typeof editable['render'] === 'function') {
                let editableElement = Ext.get(editable.id);
                if (editableElement === null) {
                    return;
                }
                editable.render();
            }
            editable.setInherited(inherited);
        }

        this.editables[definition['name']] = editable;
        if (definition['config']['required']) {
            this.requiredEditables[definition['name']] = editable;
        }
    },

    add: function(editable) {
        this.editables[editable.getName()] = editable;
    },

    remove: function(name) {
        delete this.editables[name];
        delete this.requiredEditables[name];
    },

    getEditables: function() {
        return this.editables;
    },

    getRequiredEditables: function() {
        return this.requiredEditables;
    },

    setInitialized: function(state) {
        this.initialized = state;
    },

    isInitialized: function() {
        return this.initialized;
    }
});



 /**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PCL
 */


 /**
  * @private
  */
pimcore.edithelpers = {};

// disable reload & links, this function is here because it has to be in the header (body attribute)
function pimcoreOnUnload() {
    editWindow.protectLocation();
}

pimcore.edithelpers.frame = {
    active: false,
    topEl: null,
    bottomEl: null,
    rightEl: null,
    leftEl: null,
    timeout: null
};

 pimcore.edithelpers.pasteHtmlAtCaret = function (html, selectPastedContent) {
     var sel, range;
     if (window.getSelection) {
         // IE9 and non-IE
         sel = window.getSelection();
         if (sel.getRangeAt && sel.rangeCount) {
             range = sel.getRangeAt(0);
             range.deleteContents();

             // Range.createContextualFragment() would be useful here but is
             // only relatively recently standardized and is not supported in
             // some browsers (IE9, for one)
             var el = document.createElement("div");
             el.innerHTML = html;
             var frag = document.createDocumentFragment(), node, lastNode;
             while ((node = el.firstChild)) {
                 lastNode = frag.appendChild(node);
             }
             var firstNode = frag.firstChild;
             range.insertNode(frag);

             // Preserve the selection
             if (lastNode) {
                 range = range.cloneRange();
                 range.setStartAfter(lastNode);
                 if (selectPastedContent) {
                     range.setStartBefore(firstNode);
                 } else {
                     range.collapse(true);
                 }
                 sel.removeAllRanges();
                 sel.addRange(range);
             }
         }
     }
 };



/*! For license information please see quill.js.LICENSE.txt */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Quill=e():t.Quill=e()}(self,(function(){return function(){var t={9698:function(t,e,n){"use strict";n.d(e,{Ay:function(){return c},Ji:function(){return d},mG:function(){return h},zo:function(){return u}});var r=n(6003),i=n(5232),s=n.n(i),o=n(3036),l=n(4850),a=n(5508);class c extends r.BlockBlot{cache={};delta(){return null==this.cache.delta&&(this.cache.delta=h(this)),this.cache.delta}deleteAt(t,e){super.deleteAt(t,e),this.cache={}}formatAt(t,e,n,i){e<=0||(this.scroll.query(n,r.Scope.BLOCK)?t+e===this.length()&&this.format(n,i):super.formatAt(t,Math.min(e,this.length()-t-1),n,i),this.cache={})}insertAt(t,e,n){if(null!=n)return super.insertAt(t,e,n),void(this.cache={});if(0===e.length)return;const r=e.split("\n"),i=r.shift();i.length>0&&(t<this.length()-1||null==this.children.tail?super.insertAt(Math.min(t,this.length()-1),i):this.children.tail.insertAt(this.children.tail.length(),i),this.cache={});let s=this;r.reduce(((t,e)=>(s=s.split(t,!0),s.insertAt(0,e),e.length)),t+i.length)}insertBefore(t,e){const{head:n}=this.children;super.insertBefore(t,e),n instanceof o.A&&n.remove(),this.cache={}}length(){return null==this.cache.length&&(this.cache.length=super.length()+1),this.cache.length}moveChildren(t,e){super.moveChildren(t,e),this.cache={}}optimize(t){super.optimize(t),this.cache={}}path(t){return super.path(t,!0)}removeChild(t){super.removeChild(t),this.cache={}}split(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(e&&(0===t||t>=this.length()-1)){const e=this.clone();return 0===t?(this.parent.insertBefore(e,this),this):(this.parent.insertBefore(e,this.next),e)}const n=super.split(t,e);return this.cache={},n}}c.blotName="block",c.tagName="P",c.defaultChild=o.A,c.allowedChildren=[o.A,l.A,r.EmbedBlot,a.A];class u extends r.EmbedBlot{attach(){super.attach(),this.attributes=new r.AttributorStore(this.domNode)}delta(){return(new(s())).insert(this.value(),{...this.formats(),...this.attributes.values()})}format(t,e){const n=this.scroll.query(t,r.Scope.BLOCK_ATTRIBUTE);null!=n&&this.attributes.attribute(n,e)}formatAt(t,e,n,r){this.format(n,r)}insertAt(t,e,n){if(null!=n)return void super.insertAt(t,e,n);const r=e.split("\n"),i=r.pop(),s=r.map((t=>{const e=this.scroll.create(c.blotName);return e.insertAt(0,t),e})),o=this.split(t);s.forEach((t=>{this.parent.insertBefore(t,o)})),i&&this.parent.insertBefore(this.scroll.create("text",i),o)}}function h(t){let e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return t.descendants(r.LeafBlot).reduce(((t,n)=>0===n.length()?t:t.insert(n.value(),d(n,{},e))),new(s())).insert("\n",d(t))}function d(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return null==t?e:("formats"in t&&"function"==typeof t.formats&&(e={...e,...t.formats()},n&&delete e["code-token"]),null==t.parent||"scroll"===t.parent.statics.blotName||t.parent.statics.scope!==t.statics.scope?e:d(t.parent,e,n))}u.scope=r.Scope.BLOCK_BLOT},3036:function(t,e,n){"use strict";var r=n(6003);class i extends r.EmbedBlot{static value(){}optimize(){(this.prev||this.next)&&this.remove()}length(){return 0}value(){return""}}i.blotName="break",i.tagName="BR",e.A=i},580:function(t,e,n){"use strict";var r=n(6003);class i extends r.ContainerBlot{}e.A=i},4541:function(t,e,n){"use strict";var r=n(6003),i=n(5508);class s extends r.EmbedBlot{static blotName="cursor";static className="ql-cursor";static tagName="span";static CONTENTS="\ufeff";static value(){}constructor(t,e,n){super(t,e),this.selection=n,this.textNode=document.createTextNode(s.CONTENTS),this.domNode.appendChild(this.textNode),this.savedLength=0}detach(){null!=this.parent&&this.parent.removeChild(this)}format(t,e){if(0!==this.savedLength)return void super.format(t,e);let n=this,i=0;for(;null!=n&&n.statics.scope!==r.Scope.BLOCK_BLOT;)i+=n.offset(n.parent),n=n.parent;null!=n&&(this.savedLength=s.CONTENTS.length,n.optimize(),n.formatAt(i,s.CONTENTS.length,t,e),this.savedLength=0)}index(t,e){return t===this.textNode?0:super.index(t,e)}length(){return this.savedLength}position(){return[this.textNode,this.textNode.data.length]}remove(){super.remove(),this.parent=null}restore(){if(this.selection.composing||null==this.parent)return null;const t=this.selection.getNativeRange();for(;null!=this.domNode.lastChild&&this.domNode.lastChild!==this.textNode;)this.domNode.parentNode.insertBefore(this.domNode.lastChild,this.domNode);const e=this.prev instanceof i.A?this.prev:null,n=e?e.length():0,r=this.next instanceof i.A?this.next:null,o=r?r.text:"",{textNode:l}=this,a=l.data.split(s.CONTENTS).join("");let c;if(l.data=s.CONTENTS,e)c=e,(a||r)&&(e.insertAt(e.length(),a+o),r&&r.remove());else if(r)c=r,r.insertAt(0,a);else{const t=document.createTextNode(a);c=this.scroll.create(t),this.parent.insertBefore(c,this)}if(this.remove(),t){const i=(t,i)=>e&&t===e.domNode?i:t===l?n+i-1:r&&t===r.domNode?n+a.length+i:null,s=i(t.start.node,t.start.offset),o=i(t.end.node,t.end.offset);if(null!==s&&null!==o)return{startNode:c.domNode,startOffset:s,endNode:c.domNode,endOffset:o}}return null}update(t,e){if(t.some((t=>"characterData"===t.type&&t.target===this.textNode))){const t=this.restore();t&&(e.range=t)}}optimize(t){super.optimize(t);let{parent:e}=this;for(;e;){if("A"===e.domNode.tagName){this.savedLength=s.CONTENTS.length,e.isolate(this.offset(e),this.length()).unwrap(),this.savedLength=0;break}e=e.parent}}value(){return""}}e.A=s},746:function(t,e,n){"use strict";var r=n(6003),i=n(5508);const s="\ufeff";class o extends r.EmbedBlot{constructor(t,e){super(t,e),this.contentNode=document.createElement("span"),this.contentNode.setAttribute("contenteditable","false"),Array.from(this.domNode.childNodes).forEach((t=>{this.contentNode.appendChild(t)})),this.leftGuard=document.createTextNode(s),this.rightGuard=document.createTextNode(s),this.domNode.appendChild(this.leftGuard),this.domNode.appendChild(this.contentNode),this.domNode.appendChild(this.rightGuard)}index(t,e){return t===this.leftGuard?0:t===this.rightGuard?1:super.index(t,e)}restore(t){let e,n=null;const r=t.data.split(s).join("");if(t===this.leftGuard)if(this.prev instanceof i.A){const t=this.prev.length();this.prev.insertAt(t,r),n={startNode:this.prev.domNode,startOffset:t+r.length}}else e=document.createTextNode(r),this.parent.insertBefore(this.scroll.create(e),this),n={startNode:e,startOffset:r.length};else t===this.rightGuard&&(this.next instanceof i.A?(this.next.insertAt(0,r),n={startNode:this.next.domNode,startOffset:r.length}):(e=document.createTextNode(r),this.parent.insertBefore(this.scroll.create(e),this.next),n={startNode:e,startOffset:r.length}));return t.data=s,n}update(t,e){t.forEach((t=>{if("characterData"===t.type&&(t.target===this.leftGuard||t.target===this.rightGuard)){const n=this.restore(t.target);n&&(e.range=n)}}))}}e.A=o},4850:function(t,e,n){"use strict";var r=n(6003),i=n(3036),s=n(5508);class o extends r.InlineBlot{static allowedChildren=[o,i.A,r.EmbedBlot,s.A];static order=["cursor","inline","link","underline","strike","italic","bold","script","code"];static compare(t,e){const n=o.order.indexOf(t),r=o.order.indexOf(e);return n>=0||r>=0?n-r:t===e?0:t<e?-1:1}formatAt(t,e,n,i){if(o.compare(this.statics.blotName,n)<0&&this.scroll.query(n,r.Scope.BLOT)){const r=this.isolate(t,e);i&&r.wrap(n,i)}else super.formatAt(t,e,n,i)}optimize(t){if(super.optimize(t),this.parent instanceof o&&o.compare(this.statics.blotName,this.parent.statics.blotName)>0){const t=this.parent.isolate(this.offset(),this.length());this.moveChildren(t),t.wrap(this)}}}e.A=o},5508:function(t,e,n){"use strict";n.d(e,{A:function(){return i},X:function(){return s}});var r=n(6003);class i extends r.TextBlot{}function s(t){return t.replace(/[&<>"']/g,(t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[t])))}},3729:function(t,e,n){"use strict";n.d(e,{default:function(){return R}});var r=n(6142),i=n(9698),s=n(3036),o=n(580),l=n(4541),a=n(746),c=n(4850),u=n(6003),h=n(5232),d=n.n(h),f=n(5374);function p(t){return t instanceof i.Ay||t instanceof i.zo}function g(t){return"function"==typeof t.updateContent}class m extends u.ScrollBlot{static blotName="scroll";static className="ql-editor";static tagName="DIV";static defaultChild=i.Ay;static allowedChildren=[i.Ay,i.zo,o.A];constructor(t,e,n){let{emitter:r}=n;super(t,e),this.emitter=r,this.batch=!1,this.optimize(),this.enable(),this.domNode.addEventListener("dragstart",(t=>this.handleDragStart(t)))}batchStart(){Array.isArray(this.batch)||(this.batch=[])}batchEnd(){if(!this.batch)return;const t=this.batch;this.batch=!1,this.update(t)}emitMount(t){this.emitter.emit(f.A.events.SCROLL_BLOT_MOUNT,t)}emitUnmount(t){this.emitter.emit(f.A.events.SCROLL_BLOT_UNMOUNT,t)}emitEmbedUpdate(t,e){this.emitter.emit(f.A.events.SCROLL_EMBED_UPDATE,t,e)}deleteAt(t,e){const[n,r]=this.line(t),[o]=this.line(t+e);if(super.deleteAt(t,e),null!=o&&n!==o&&r>0){if(n instanceof i.zo||o instanceof i.zo)return void this.optimize();const t=o.children.head instanceof s.A?null:o.children.head;n.moveChildren(o,t),n.remove()}this.optimize()}enable(){let t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.domNode.setAttribute("contenteditable",t?"true":"false")}formatAt(t,e,n,r){super.formatAt(t,e,n,r),this.optimize()}insertAt(t,e,n){if(t>=this.length())if(null==n||null==this.scroll.query(e,u.Scope.BLOCK)){const t=this.scroll.create(this.statics.defaultChild.blotName);this.appendChild(t),null==n&&e.endsWith("\n")?t.insertAt(0,e.slice(0,-1),n):t.insertAt(0,e,n)}else{const t=this.scroll.create(e,n);this.appendChild(t)}else super.insertAt(t,e,n);this.optimize()}insertBefore(t,e){if(t.statics.scope===u.Scope.INLINE_BLOT){const n=this.scroll.create(this.statics.defaultChild.blotName);n.appendChild(t),super.insertBefore(n,e)}else super.insertBefore(t,e)}insertContents(t,e){const n=this.deltaToRenderBlocks(e.concat((new(d())).insert("\n"))),r=n.pop();if(null==r)return;this.batchStart();const s=n.shift();if(s){const e="block"===s.type&&(0===s.delta.length()||!this.descendant(i.zo,t)[0]&&t<this.length()),n="block"===s.type?s.delta:(new(d())).insert({[s.key]:s.value});b(this,t,n);const r="block"===s.type?1:0,o=t+n.length()+r;e&&this.insertAt(o-1,"\n");const l=(0,i.Ji)(this.line(t)[0]),a=h.AttributeMap.diff(l,s.attributes)||{};Object.keys(a).forEach((t=>{this.formatAt(o-1,1,t,a[t])})),t=o}let[o,l]=this.children.find(t);n.length&&(o&&(o=o.split(l),l=0),n.forEach((t=>{if("block"===t.type)b(this.createBlock(t.attributes,o||void 0),0,t.delta);else{const e=this.create(t.key,t.value);this.insertBefore(e,o||void 0),Object.keys(t.attributes).forEach((n=>{e.format(n,t.attributes[n])}))}}))),"block"===r.type&&r.delta.length()&&b(this,o?o.offset(o.scroll)+l:this.length(),r.delta),this.batchEnd(),this.optimize()}isEnabled(){return"true"===this.domNode.getAttribute("contenteditable")}leaf(t){const e=this.path(t).pop();if(!e)return[null,-1];const[n,r]=e;return n instanceof u.LeafBlot?[n,r]:[null,-1]}line(t){return t===this.length()?this.line(t-1):this.descendant(p,t)}lines(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Number.MAX_VALUE;const n=(t,e,r)=>{let i=[],s=r;return t.children.forEachAt(e,r,((t,e,r)=>{p(t)?i.push(t):t instanceof u.ContainerBlot&&(i=i.concat(n(t,e,s))),s-=r})),i};return n(this,t,e)}optimize(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.batch||(super.optimize(t,e),t.length>0&&this.emitter.emit(f.A.events.SCROLL_OPTIMIZE,t,e))}path(t){return super.path(t).slice(1)}remove(){}update(t){if(this.batch)return void(Array.isArray(t)&&(this.batch=this.batch.concat(t)));let e=f.A.sources.USER;"string"==typeof t&&(e=t),Array.isArray(t)||(t=this.observer.takeRecords()),(t=t.filter((t=>{let{target:e}=t;const n=this.find(e,!0);return n&&!g(n)}))).length>0&&this.emitter.emit(f.A.events.SCROLL_BEFORE_UPDATE,e,t),super.update(t.concat([])),t.length>0&&this.emitter.emit(f.A.events.SCROLL_UPDATE,e,t)}updateEmbedAt(t,e,n){const[r]=this.descendant((t=>t instanceof i.zo),t);r&&r.statics.blotName===e&&g(r)&&r.updateContent(n)}handleDragStart(t){t.preventDefault()}deltaToRenderBlocks(t){const e=[];let n=new(d());return t.forEach((t=>{const r=t?.insert;if(r)if("string"==typeof r){const i=r.split("\n");i.slice(0,-1).forEach((r=>{n.insert(r,t.attributes),e.push({type:"block",delta:n,attributes:t.attributes??{}}),n=new(d())}));const s=i[i.length-1];s&&n.insert(s,t.attributes)}else{const i=Object.keys(r)[0];if(!i)return;this.query(i,u.Scope.INLINE)?n.push(t):(n.length()&&e.push({type:"block",delta:n,attributes:{}}),n=new(d()),e.push({type:"blockEmbed",key:i,value:r[i],attributes:t.attributes??{}}))}})),n.length()&&e.push({type:"block",delta:n,attributes:{}}),e}createBlock(t,e){let n;const r={};Object.entries(t).forEach((t=>{let[e,i]=t;null!=this.query(e,u.Scope.BLOCK&u.Scope.BLOT)?n=e:r[e]=i}));const i=this.create(n||this.statics.defaultChild.blotName,n?t[n]:void 0);this.insertBefore(i,e||void 0);const s=i.length();return Object.entries(r).forEach((t=>{let[e,n]=t;i.formatAt(0,s,e,n)})),i}}function b(t,e,n){n.reduce(((e,n)=>{const r=h.Op.length(n);let s=n.attributes||{};if(null!=n.insert)if("string"==typeof n.insert){const r=n.insert;t.insertAt(e,r);const[o]=t.descendant(u.LeafBlot,e),l=(0,i.Ji)(o);s=h.AttributeMap.diff(l,s)||{}}else if("object"==typeof n.insert){const r=Object.keys(n.insert)[0];if(null==r)return e;if(t.insertAt(e,r,n.insert[r]),null!=t.scroll.query(r,u.Scope.INLINE)){const[n]=t.descendant(u.LeafBlot,e),r=(0,i.Ji)(n);s=h.AttributeMap.diff(r,s)||{}}}return Object.keys(s).forEach((n=>{t.formatAt(e,r,n,s[n])})),e+r}),e)}var y=m,v=n(5508),A=n(584),x=n(4266);class N extends x.A{static DEFAULTS={delay:1e3,maxStack:100,userOnly:!1};lastRecorded=0;ignoreChange=!1;stack={undo:[],redo:[]};currentRange=null;constructor(t,e){super(t,e),this.quill.on(r.Ay.events.EDITOR_CHANGE,((t,e,n,i)=>{t===r.Ay.events.SELECTION_CHANGE?e&&i!==r.Ay.sources.SILENT&&(this.currentRange=e):t===r.Ay.events.TEXT_CHANGE&&(this.ignoreChange||(this.options.userOnly&&i!==r.Ay.sources.USER?this.transform(e):this.record(e,n)),this.currentRange=w(this.currentRange,e))})),this.quill.keyboard.addBinding({key:"z",shortKey:!0},this.undo.bind(this)),this.quill.keyboard.addBinding({key:["z","Z"],shortKey:!0,shiftKey:!0},this.redo.bind(this)),/Win/i.test(navigator.platform)&&this.quill.keyboard.addBinding({key:"y",shortKey:!0},this.redo.bind(this)),this.quill.root.addEventListener("beforeinput",(t=>{"historyUndo"===t.inputType?(this.undo(),t.preventDefault()):"historyRedo"===t.inputType&&(this.redo(),t.preventDefault())}))}change(t,e){if(0===this.stack[t].length)return;const n=this.stack[t].pop();if(!n)return;const i=this.quill.getContents(),s=n.delta.invert(i);this.stack[e].push({delta:s,range:w(n.range,s)}),this.lastRecorded=0,this.ignoreChange=!0,this.quill.updateContents(n.delta,r.Ay.sources.USER),this.ignoreChange=!1,this.restoreSelection(n)}clear(){this.stack={undo:[],redo:[]}}cutoff(){this.lastRecorded=0}record(t,e){if(0===t.ops.length)return;this.stack.redo=[];let n=t.invert(e),r=this.currentRange;const i=Date.now();if(this.lastRecorded+this.options.delay>i&&this.stack.undo.length>0){const t=this.stack.undo.pop();t&&(n=n.compose(t.delta),r=t.range)}else this.lastRecorded=i;0!==n.length()&&(this.stack.undo.push({delta:n,range:r}),this.stack.undo.length>this.options.maxStack&&this.stack.undo.shift())}redo(){this.change("redo","undo")}transform(t){E(this.stack.undo,t),E(this.stack.redo,t)}undo(){this.change("undo","redo")}restoreSelection(t){if(t.range)this.quill.setSelection(t.range,r.Ay.sources.USER);else{const e=function(t,e){const n=e.reduce(((t,e)=>t+(e.delete||0)),0);let r=e.length()-n;return function(t,e){const n=e.ops[e.ops.length-1];return null!=n&&(null!=n.insert?"string"==typeof n.insert&&n.insert.endsWith("\n"):null!=n.attributes&&Object.keys(n.attributes).some((e=>null!=t.query(e,u.Scope.BLOCK))))}(t,e)&&(r-=1),r}(this.quill.scroll,t.delta);this.quill.setSelection(e,r.Ay.sources.USER)}}}function E(t,e){let n=e;for(let e=t.length-1;e>=0;e-=1){const r=t[e];t[e]={delta:n.transform(r.delta,!0),range:r.range&&w(r.range,n)},n=r.delta.transform(n),0===t[e].delta.length()&&t.splice(e,1)}}function w(t,e){if(!t)return t;const n=e.transformPosition(t.index);return{index:n,length:e.transformPosition(t.index+t.length)-n}}var q=n(8123);class k extends x.A{constructor(t,e){super(t,e),t.root.addEventListener("drop",(e=>{e.preventDefault();let n=null;if(document.caretRangeFromPoint)n=document.caretRangeFromPoint(e.clientX,e.clientY);else if(document.caretPositionFromPoint){const t=document.caretPositionFromPoint(e.clientX,e.clientY);n=document.createRange(),n.setStart(t.offsetNode,t.offset),n.setEnd(t.offsetNode,t.offset)}const r=n&&t.selection.normalizeNative(n);if(r){const n=t.selection.normalizedToRange(r);e.dataTransfer?.files&&this.upload(n,e.dataTransfer.files)}}))}upload(t,e){const n=[];Array.from(e).forEach((t=>{t&&this.options.mimetypes?.includes(t.type)&&n.push(t)})),n.length>0&&this.options.handler.call(this,t,n)}}k.DEFAULTS={mimetypes:["image/png","image/jpeg"],handler(t,e){if(!this.quill.scroll.query("image"))return;const n=e.map((t=>new Promise((e=>{const n=new FileReader;n.onload=()=>{e(n.result)},n.readAsDataURL(t)}))));Promise.all(n).then((e=>{const n=e.reduce(((t,e)=>t.insert({image:e})),(new(d())).retain(t.index).delete(t.length));this.quill.updateContents(n,f.A.sources.USER),this.quill.setSelection(t.index+e.length,f.A.sources.SILENT)}))}};var _=k;const L=["insertText","insertReplacementText"];class S extends x.A{constructor(t,e){super(t,e),t.root.addEventListener("beforeinput",(t=>{this.handleBeforeInput(t)})),/Android/i.test(navigator.userAgent)||t.on(r.Ay.events.COMPOSITION_BEFORE_START,(()=>{this.handleCompositionStart()}))}deleteRange(t){(0,q.Xo)({range:t,quill:this.quill})}replaceText(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(0===t.length)return!1;if(e){const n=this.quill.getFormat(t.index,1);this.deleteRange(t),this.quill.updateContents((new(d())).retain(t.index).insert(e,n),r.Ay.sources.USER)}else this.deleteRange(t);return this.quill.setSelection(t.index+e.length,0,r.Ay.sources.SILENT),!0}handleBeforeInput(t){if(this.quill.composition.isComposing||t.defaultPrevented||!L.includes(t.inputType))return;const e=t.getTargetRanges?t.getTargetRanges()[0]:null;if(!e||!0===e.collapsed)return;const n=function(t){return"string"==typeof t.data?t.data:t.dataTransfer?.types.includes("text/plain")?t.dataTransfer.getData("text/plain"):null}(t);if(null==n)return;const r=this.quill.selection.normalizeNative(e),i=r?this.quill.selection.normalizedToRange(r):null;i&&this.replaceText(i,n)&&t.preventDefault()}handleCompositionStart(){const t=this.quill.getSelection();t&&this.replaceText(t)}}var O=S;const T=/Mac/i.test(navigator.platform);class j extends x.A{isListening=!1;selectionChangeDeadline=0;constructor(t,e){super(t,e),this.handleArrowKeys(),this.handleNavigationShortcuts()}handleArrowKeys(){this.quill.keyboard.addBinding({key:["ArrowLeft","ArrowRight"],offset:0,shiftKey:null,handler(t,e){let{line:n,event:i}=e;if(!(n instanceof u.ParentBlot&&n.uiNode))return!0;const s="rtl"===getComputedStyle(n.domNode).direction;return!!(s&&"ArrowRight"!==i.key||!s&&"ArrowLeft"!==i.key)||(this.quill.setSelection(t.index-1,t.length+(i.shiftKey?1:0),r.Ay.sources.USER),!1)}})}handleNavigationShortcuts(){this.quill.root.addEventListener("keydown",(t=>{!t.defaultPrevented&&(t=>"ArrowLeft"===t.key||"ArrowRight"===t.key||"ArrowUp"===t.key||"ArrowDown"===t.key||"Home"===t.key||!(!T||"a"!==t.key||!0!==t.ctrlKey))(t)&&this.ensureListeningToSelectionChange()}))}ensureListeningToSelectionChange(){this.selectionChangeDeadline=Date.now()+100,this.isListening||(this.isListening=!0,document.addEventListener("selectionchange",(()=>{this.isListening=!1,Date.now()<=this.selectionChangeDeadline&&this.handleSelectionChange()}),{once:!0}))}handleSelectionChange(){const t=document.getSelection();if(!t)return;const e=t.getRangeAt(0);if(!0!==e.collapsed||0!==e.startOffset)return;const n=this.quill.scroll.find(e.startContainer);if(!(n instanceof u.ParentBlot&&n.uiNode))return;const r=document.createRange();r.setStartAfter(n.uiNode),r.setEndAfter(n.uiNode),t.removeAllRanges(),t.addRange(r)}}var C=j;r.Ay.register({"blots/block":i.Ay,"blots/block/embed":i.zo,"blots/break":s.A,"blots/container":o.A,"blots/cursor":l.A,"blots/embed":a.A,"blots/inline":c.A,"blots/scroll":y,"blots/text":v.A,"modules/clipboard":A.Ay,"modules/history":N,"modules/keyboard":q.Ay,"modules/uploader":_,"modules/input":O,"modules/uiNode":C});var R=r.Ay},5374:function(t,e,n){"use strict";n.d(e,{A:function(){return o}});var r=n(8920),i=n(7356);const s=(0,n(6078).A)("quill:events");["selectionchange","mousedown","mouseup","click"].forEach((t=>{document.addEventListener(t,(function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];Array.from(document.querySelectorAll(".ql-container")).forEach((t=>{const n=i.A.get(t);n&&n.emitter&&n.emitter.handleDOM(...e)}))}))}));var o=class extends r{static events={EDITOR_CHANGE:"editor-change",SCROLL_BEFORE_UPDATE:"scroll-before-update",SCROLL_BLOT_MOUNT:"scroll-blot-mount",SCROLL_BLOT_UNMOUNT:"scroll-blot-unmount",SCROLL_OPTIMIZE:"scroll-optimize",SCROLL_UPDATE:"scroll-update",SCROLL_EMBED_UPDATE:"scroll-embed-update",SELECTION_CHANGE:"selection-change",TEXT_CHANGE:"text-change",COMPOSITION_BEFORE_START:"composition-before-start",COMPOSITION_START:"composition-start",COMPOSITION_BEFORE_END:"composition-before-end",COMPOSITION_END:"composition-end"};static sources={API:"api",SILENT:"silent",USER:"user"};constructor(){super(),this.domListeners={},this.on("error",s.error)}emit(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return s.log.call(s,...e),super.emit(...e)}handleDOM(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];(this.domListeners[t.type]||[]).forEach((e=>{let{node:r,handler:i}=e;(t.target===r||r.contains(t.target))&&i(t,...n)}))}listenDOM(t,e,n){this.domListeners[t]||(this.domListeners[t]=[]),this.domListeners[t].push({node:e,handler:n})}}},7356:function(t,e){"use strict";e.A=new WeakMap},6078:function(t,e){"use strict";const n=["error","warn","log","info"];let r="warn";function i(t){if(r&&n.indexOf(t)<=n.indexOf(r)){for(var e=arguments.length,i=new Array(e>1?e-1:0),s=1;s<e;s++)i[s-1]=arguments[s];console[t](...i)}}function s(t){return n.reduce(((e,n)=>(e[n]=i.bind(console,n,t),e)),{})}s.level=t=>{r=t},i.level=s.level,e.A=s},4266:function(t,e){"use strict";e.A=class{static DEFAULTS={};constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.quill=t,this.options=e}}},6142:function(t,e,n){"use strict";n.d(e,{Ay:function(){return I}});var r=n(8347),i=n(6003),s=n(5232),o=n.n(s),l=n(3707),a=n(5123),c=n(9698),u=n(3036),h=n(4541),d=n(5508),f=n(8298);const p=/^[ -~]*$/;function g(t,e,n){if(0===t.length){const[t]=y(n.pop());return e<=0?`</li></${t}>`:`</li></${t}>${g([],e-1,n)}`}const[{child:r,offset:i,length:s,indent:o,type:l},...a]=t,[c,u]=y(l);if(o>e)return n.push(l),o===e+1?`<${c}><li${u}>${m(r,i,s)}${g(a,o,n)}`:`<${c}><li>${g(t,e+1,n)}`;const h=n[n.length-1];if(o===e&&l===h)return`</li><li${u}>${m(r,i,s)}${g(a,o,n)}`;const[d]=y(n.pop());return`</li></${d}>${g(t,e-1,n)}`}function m(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if("html"in t&&"function"==typeof t.html)return t.html(e,n);if(t instanceof d.A)return(0,d.X)(t.value().slice(e,e+n));if(t instanceof i.ParentBlot){if("list-container"===t.statics.blotName){const r=[];return t.children.forEachAt(e,n,((t,e,n)=>{const i="formats"in t&&"function"==typeof t.formats?t.formats():{};r.push({child:t,offset:e,length:n,indent:i.indent||0,type:i.list})})),g(r,-1,[])}const i=[];if(t.children.forEachAt(e,n,((t,e,n)=>{i.push(m(t,e,n))})),r||"list"===t.statics.blotName)return i.join("");const{outerHTML:s,innerHTML:o}=t.domNode,[l,a]=s.split(`>${o}<`);return"<table"===l?`<table style="border: 1px solid #000;">${i.join("")}<${a}`:`${l}>${i.join("")}<${a}`}return t.domNode instanceof Element?t.domNode.outerHTML:""}function b(t,e){return Object.keys(e).reduce(((n,r)=>{if(null==t[r])return n;const i=e[r];return i===t[r]?n[r]=i:Array.isArray(i)?i.indexOf(t[r])<0?n[r]=i.concat([t[r]]):n[r]=i:n[r]=[i,t[r]],n}),{})}function y(t){const e="ordered"===t?"ol":"ul";switch(t){case"checked":return[e,' data-list="checked"'];case"unchecked":return[e,' data-list="unchecked"'];default:return[e,""]}}function v(t){return t.reduce(((t,e)=>{if("string"==typeof e.insert){const n=e.insert.replace(/\r\n/g,"\n").replace(/\r/g,"\n");return t.insert(n,e.attributes)}return t.push(e)}),new(o()))}function A(t,e){let{index:n,length:r}=t;return new f.Q(n+e,r)}var x=class{constructor(t){this.scroll=t,this.delta=this.getDelta()}applyDelta(t){this.scroll.update();let e=this.scroll.length();this.scroll.batchStart();const n=v(t),l=new(o());return function(t){const e=[];return t.forEach((t=>{"string"==typeof t.insert?t.insert.split("\n").forEach(((n,r)=>{r&&e.push({insert:"\n",attributes:t.attributes}),n&&e.push({insert:n,attributes:t.attributes})})):e.push(t)})),e}(n.ops.slice()).reduce(((t,n)=>{const o=s.Op.length(n);let a=n.attributes||{},u=!1,h=!1;if(null!=n.insert){if(l.retain(o),"string"==typeof n.insert){const o=n.insert;h=!o.endsWith("\n")&&(e<=t||!!this.scroll.descendant(c.zo,t)[0]),this.scroll.insertAt(t,o);const[l,u]=this.scroll.line(t);let d=(0,r.A)({},(0,c.Ji)(l));if(l instanceof c.Ay){const[t]=l.descendant(i.LeafBlot,u);t&&(d=(0,r.A)(d,(0,c.Ji)(t)))}a=s.AttributeMap.diff(d,a)||{}}else if("object"==typeof n.insert){const o=Object.keys(n.insert)[0];if(null==o)return t;const l=null!=this.scroll.query(o,i.Scope.INLINE);if(l)(e<=t||this.scroll.descendant(c.zo,t)[0])&&(h=!0);else if(t>0){const[e,n]=this.scroll.descendant(i.LeafBlot,t-1);e instanceof d.A?"\n"!==e.value()[n]&&(u=!0):e instanceof i.EmbedBlot&&e.statics.scope===i.Scope.INLINE_BLOT&&(u=!0)}if(this.scroll.insertAt(t,o,n.insert[o]),l){const[e]=this.scroll.descendant(i.LeafBlot,t);if(e){const t=(0,r.A)({},(0,c.Ji)(e));a=s.AttributeMap.diff(t,a)||{}}}}e+=o}else if(l.push(n),null!==n.retain&&"object"==typeof n.retain){const e=Object.keys(n.retain)[0];if(null==e)return t;this.scroll.updateEmbedAt(t,e,n.retain[e])}Object.keys(a).forEach((e=>{this.scroll.formatAt(t,o,e,a[e])}));const f=u?1:0,p=h?1:0;return e+=f+p,l.retain(f),l.delete(p),t+o+f+p}),0),l.reduce(((t,e)=>"number"==typeof e.delete?(this.scroll.deleteAt(t,e.delete),t):t+s.Op.length(e)),0),this.scroll.batchEnd(),this.scroll.optimize(),this.update(n)}deleteText(t,e){return this.scroll.deleteAt(t,e),this.update((new(o())).retain(t).delete(e))}formatLine(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.scroll.update(),Object.keys(n).forEach((r=>{this.scroll.lines(t,Math.max(e,1)).forEach((t=>{t.format(r,n[r])}))})),this.scroll.optimize();const r=(new(o())).retain(t).retain(e,(0,l.A)(n));return this.update(r)}formatText(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};Object.keys(n).forEach((r=>{this.scroll.formatAt(t,e,r,n[r])}));const r=(new(o())).retain(t).retain(e,(0,l.A)(n));return this.update(r)}getContents(t,e){return this.delta.slice(t,t+e)}getDelta(){return this.scroll.lines().reduce(((t,e)=>t.concat(e.delta())),new(o()))}getFormat(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=[],r=[];0===e?this.scroll.path(t).forEach((t=>{const[e]=t;e instanceof c.Ay?n.push(e):e instanceof i.LeafBlot&&r.push(e)})):(n=this.scroll.lines(t,e),r=this.scroll.descendants(i.LeafBlot,t,e));const[s,o]=[n,r].map((t=>{const e=t.shift();if(null==e)return{};let n=(0,c.Ji)(e);for(;Object.keys(n).length>0;){const e=t.shift();if(null==e)return n;n=b((0,c.Ji)(e),n)}return n}));return{...s,...o}}getHTML(t,e){const[n,r]=this.scroll.line(t);if(n){const i=n.length();return n.length()>=r+e&&(0!==r||e!==i)?m(n,r,e,!0):m(this.scroll,t,e,!0)}return""}getText(t,e){return this.getContents(t,e).filter((t=>"string"==typeof t.insert)).map((t=>t.insert)).join("")}insertContents(t,e){const n=v(e),r=(new(o())).retain(t).concat(n);return this.scroll.insertContents(t,n),this.update(r)}insertEmbed(t,e,n){return this.scroll.insertAt(t,e,n),this.update((new(o())).retain(t).insert({[e]:n}))}insertText(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e=e.replace(/\r\n/g,"\n").replace(/\r/g,"\n"),this.scroll.insertAt(t,e),Object.keys(n).forEach((r=>{this.scroll.formatAt(t,e.length,r,n[r])})),this.update((new(o())).retain(t).insert(e,(0,l.A)(n)))}isBlank(){if(0===this.scroll.children.length)return!0;if(this.scroll.children.length>1)return!1;const t=this.scroll.children.head;if(t?.statics.blotName!==c.Ay.blotName)return!1;const e=t;return!(e.children.length>1)&&e.children.head instanceof u.A}removeFormat(t,e){const n=this.getText(t,e),[r,i]=this.scroll.line(t+e);let s=0,l=new(o());null!=r&&(s=r.length()-i,l=r.delta().slice(i,i+s-1).insert("\n"));const a=this.getContents(t,e+s).diff((new(o())).insert(n).concat(l)),c=(new(o())).retain(t).concat(a);return this.applyDelta(c)}update(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;const r=this.delta;if(1===e.length&&"characterData"===e[0].type&&e[0].target.data.match(p)&&this.scroll.find(e[0].target)){const i=this.scroll.find(e[0].target),s=(0,c.Ji)(i),l=i.offset(this.scroll),a=e[0].oldValue.replace(h.A.CONTENTS,""),u=(new(o())).insert(a),d=(new(o())).insert(i.value()),f=n&&{oldRange:A(n.oldRange,-l),newRange:A(n.newRange,-l)};t=(new(o())).retain(l).concat(u.diff(d,f)).reduce(((t,e)=>e.insert?t.insert(e.insert,s):t.push(e)),new(o())),this.delta=r.compose(t)}else this.delta=this.getDelta(),t&&(0,a.A)(r.compose(t),this.delta)||(t=r.diff(this.delta,n));return t}},N=n(5374),E=n(7356),w=n(6078),q=n(4266),k=n(746),_=class{isComposing=!1;constructor(t,e){this.scroll=t,this.emitter=e,this.setupListeners()}setupListeners(){this.scroll.domNode.addEventListener("compositionstart",(t=>{this.isComposing||this.handleCompositionStart(t)})),this.scroll.domNode.addEventListener("compositionend",(t=>{this.isComposing&&queueMicrotask((()=>{this.handleCompositionEnd(t)}))}))}handleCompositionStart(t){const e=t.target instanceof Node?this.scroll.find(t.target,!0):null;!e||e instanceof k.A||(this.emitter.emit(N.A.events.COMPOSITION_BEFORE_START,t),this.scroll.batchStart(),this.emitter.emit(N.A.events.COMPOSITION_START,t),this.isComposing=!0)}handleCompositionEnd(t){this.emitter.emit(N.A.events.COMPOSITION_BEFORE_END,t),this.scroll.batchEnd(),this.emitter.emit(N.A.events.COMPOSITION_END,t),this.isComposing=!1}},L=n(9609);const S=t=>{const e=t.getBoundingClientRect(),n="offsetWidth"in t&&Math.abs(e.width)/t.offsetWidth||1,r="offsetHeight"in t&&Math.abs(e.height)/t.offsetHeight||1;return{top:e.top,right:e.left+t.clientWidth*n,bottom:e.top+t.clientHeight*r,left:e.left}},O=t=>{const e=parseInt(t,10);return Number.isNaN(e)?0:e},T=(t,e,n,r,i,s)=>t<n&&e>r?0:t<n?-(n-t+i):e>r?e-t>r-n?t+i-n:e-r+s:0;const j=["block","break","cursor","inline","scroll","text"];const C=(0,w.A)("quill"),R=new i.Registry;i.ParentBlot.uiClass="ql-ui";class I{static DEFAULTS={bounds:null,modules:{clipboard:!0,keyboard:!0,history:!0,uploader:!0},placeholder:"",readOnly:!1,registry:R,theme:"default"};static events=N.A.events;static sources=N.A.sources;static version="2.0.2";static imports={delta:o(),parchment:i,"core/module":q.A,"core/theme":L.A};static debug(t){!0===t&&(t="log"),w.A.level(t)}static find(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return E.A.get(t)||R.find(t,e)}static import(t){return null==this.imports[t]&&C.error(`Cannot import ${t}. Are you sure it was registered?`),this.imports[t]}static register(){if("string"!=typeof(arguments.length<=0?void 0:arguments[0])){const t=arguments.length<=0?void 0:arguments[0],e=!!(arguments.length<=1?void 0:arguments[1]),n="attrName"in t?t.attrName:t.blotName;"string"==typeof n?this.register(`formats/${n}`,t,e):Object.keys(t).forEach((n=>{this.register(n,t[n],e)}))}else{const t=arguments.length<=0?void 0:arguments[0],e=arguments.length<=1?void 0:arguments[1],n=!!(arguments.length<=2?void 0:arguments[2]);null==this.imports[t]||n||C.warn(`Overwriting ${t} with`,e),this.imports[t]=e,(t.startsWith("blots/")||t.startsWith("formats/"))&&e&&"boolean"!=typeof e&&"abstract"!==e.blotName&&R.register(e),"function"==typeof e.register&&e.register(R)}}constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(this.options=function(t,e){const n=B(t);if(!n)throw new Error("Invalid Quill container");const s=!e.theme||e.theme===I.DEFAULTS.theme?L.A:I.import(`themes/${e.theme}`);if(!s)throw new Error(`Invalid theme ${e.theme}. Did you register it?`);const{modules:o,...l}=I.DEFAULTS,{modules:a,...c}=s.DEFAULTS;let u=M(e.modules);null!=u&&u.toolbar&&u.toolbar.constructor!==Object&&(u={...u,toolbar:{container:u.toolbar}});const h=(0,r.A)({},M(o),M(a),u),d={...l,...U(c),...U(e)};let f=e.registry;return f?e.formats&&C.warn('Ignoring "formats" option because "registry" is specified'):f=e.formats?((t,e,n)=>{const r=new i.Registry;return j.forEach((t=>{const n=e.query(t);n&&r.register(n)})),t.forEach((t=>{let i=e.query(t);i||n.error(`Cannot register "${t}" specified in "formats" config. Are you sure it was registered?`);let s=0;for(;i;)if(r.register(i),i="blotName"in i?i.requiredContainer??null:null,s+=1,s>100){n.error(`Cycle detected in registering blot requiredContainer: "${t}"`);break}})),r})(e.formats,d.registry,C):d.registry,{...d,registry:f,container:n,theme:s,modules:Object.entries(h).reduce(((t,e)=>{let[n,i]=e;if(!i)return t;const s=I.import(`modules/${n}`);return null==s?(C.error(`Cannot load ${n} module. Are you sure you registered it?`),t):{...t,[n]:(0,r.A)({},s.DEFAULTS||{},i)}}),{}),bounds:B(d.bounds)}}(t,e),this.container=this.options.container,null==this.container)return void C.error("Invalid Quill container",t);this.options.debug&&I.debug(this.options.debug);const n=this.container.innerHTML.trim();this.container.classList.add("ql-container"),this.container.innerHTML="",E.A.set(this.container,this),this.root=this.addContainer("ql-editor"),this.root.classList.add("ql-blank"),this.emitter=new N.A;const s=i.ScrollBlot.blotName,l=this.options.registry.query(s);if(!l||!("blotName"in l))throw new Error(`Cannot initialize Quill without "${s}" blot`);if(this.scroll=new l(this.options.registry,this.root,{emitter:this.emitter}),this.editor=new x(this.scroll),this.selection=new f.A(this.scroll,this.emitter),this.composition=new _(this.scroll,this.emitter),this.theme=new this.options.theme(this,this.options),this.keyboard=this.theme.addModule("keyboard"),this.clipboard=this.theme.addModule("clipboard"),this.history=this.theme.addModule("history"),this.uploader=this.theme.addModule("uploader"),this.theme.addModule("input"),this.theme.addModule("uiNode"),this.theme.init(),this.emitter.on(N.A.events.EDITOR_CHANGE,(t=>{t===N.A.events.TEXT_CHANGE&&this.root.classList.toggle("ql-blank",this.editor.isBlank())})),this.emitter.on(N.A.events.SCROLL_UPDATE,((t,e)=>{const n=this.selection.lastRange,[r]=this.selection.getRange(),i=n&&r?{oldRange:n,newRange:r}:void 0;D.call(this,(()=>this.editor.update(null,e,i)),t)})),this.emitter.on(N.A.events.SCROLL_EMBED_UPDATE,((t,e)=>{const n=this.selection.lastRange,[r]=this.selection.getRange(),i=n&&r?{oldRange:n,newRange:r}:void 0;D.call(this,(()=>{const n=(new(o())).retain(t.offset(this)).retain({[t.statics.blotName]:e});return this.editor.update(n,[],i)}),I.sources.USER)})),n){const t=this.clipboard.convert({html:`${n}<p><br></p>`,text:"\n"});this.setContents(t)}this.history.clear(),this.options.placeholder&&this.root.setAttribute("data-placeholder",this.options.placeholder),this.options.readOnly&&this.disable(),this.allowReadOnlyEdits=!1}addContainer(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if("string"==typeof t){const e=t;(t=document.createElement("div")).classList.add(e)}return this.container.insertBefore(t,e),t}blur(){this.selection.setRange(null)}deleteText(t,e,n){return[t,e,,n]=P(t,e,n),D.call(this,(()=>this.editor.deleteText(t,e)),n,t,-1*e)}disable(){this.enable(!1)}editReadOnly(t){this.allowReadOnlyEdits=!0;const e=t();return this.allowReadOnlyEdits=!1,e}enable(){let t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.scroll.enable(t),this.container.classList.toggle("ql-disabled",!t)}focus(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.selection.focus(),t.preventScroll||this.scrollSelectionIntoView()}format(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:N.A.sources.API;return D.call(this,(()=>{const n=this.getSelection(!0);let r=new(o());if(null==n)return r;if(this.scroll.query(t,i.Scope.BLOCK))r=this.editor.formatLine(n.index,n.length,{[t]:e});else{if(0===n.length)return this.selection.format(t,e),r;r=this.editor.formatText(n.index,n.length,{[t]:e})}return this.setSelection(n,N.A.sources.SILENT),r}),n)}formatLine(t,e,n,r,i){let s;return[t,e,s,i]=P(t,e,n,r,i),D.call(this,(()=>this.editor.formatLine(t,e,s)),i,t,0)}formatText(t,e,n,r,i){let s;return[t,e,s,i]=P(t,e,n,r,i),D.call(this,(()=>this.editor.formatText(t,e,s)),i,t,0)}getBounds(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=null;if(n="number"==typeof t?this.selection.getBounds(t,e):this.selection.getBounds(t.index,t.length),!n)return null;const r=this.container.getBoundingClientRect();return{bottom:n.bottom-r.top,height:n.height,left:n.left-r.left,right:n.right-r.left,top:n.top-r.top,width:n.width}}getContents(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.getLength()-t;return[t,e]=P(t,e),this.editor.getContents(t,e)}getFormat(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.getSelection(!0),e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return"number"==typeof t?this.editor.getFormat(t,e):this.editor.getFormat(t.index,t.length)}getIndex(t){return t.offset(this.scroll)}getLength(){return this.scroll.length()}getLeaf(t){return this.scroll.leaf(t)}getLine(t){return this.scroll.line(t)}getLines(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Number.MAX_VALUE;return"number"!=typeof t?this.scroll.lines(t.index,t.length):this.scroll.lines(t,e)}getModule(t){return this.theme.modules[t]}getSelection(){return arguments.length>0&&void 0!==arguments[0]&&arguments[0]&&this.focus(),this.update(),this.selection.getRange()[0]}getSemanticHTML(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1?arguments[1]:void 0;return"number"==typeof t&&(e=e??this.getLength()-t),[t,e]=P(t,e),this.editor.getHTML(t,e)}getText(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1?arguments[1]:void 0;return"number"==typeof t&&(e=e??this.getLength()-t),[t,e]=P(t,e),this.editor.getText(t,e)}hasFocus(){return this.selection.hasFocus()}insertEmbed(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:I.sources.API;return D.call(this,(()=>this.editor.insertEmbed(t,e,n)),r,t)}insertText(t,e,n,r,i){let s;return[t,,s,i]=P(t,0,n,r,i),D.call(this,(()=>this.editor.insertText(t,e,s)),i,t,e.length)}isEnabled(){return this.scroll.isEnabled()}off(){return this.emitter.off(...arguments)}on(){return this.emitter.on(...arguments)}once(){return this.emitter.once(...arguments)}removeFormat(t,e,n){return[t,e,,n]=P(t,e,n),D.call(this,(()=>this.editor.removeFormat(t,e)),n,t)}scrollRectIntoView(t){((t,e)=>{const n=t.ownerDocument;let r=e,i=t;for(;i;){const t=i===n.body,e=t?{top:0,right:window.visualViewport?.width??n.documentElement.clientWidth,bottom:window.visualViewport?.height??n.documentElement.clientHeight,left:0}:S(i),o=getComputedStyle(i),l=T(r.left,r.right,e.left,e.right,O(o.scrollPaddingLeft),O(o.scrollPaddingRight)),a=T(r.top,r.bottom,e.top,e.bottom,O(o.scrollPaddingTop),O(o.scrollPaddingBottom));if(l||a)if(t)n.defaultView?.scrollBy(l,a);else{const{scrollLeft:t,scrollTop:e}=i;a&&(i.scrollTop+=a),l&&(i.scrollLeft+=l);const n=i.scrollLeft-t,s=i.scrollTop-e;r={left:r.left-n,top:r.top-s,right:r.right-n,bottom:r.bottom-s}}i=t||"fixed"===o.position?null:(s=i).parentElement||s.getRootNode().host||null}var s})(this.root,t)}scrollIntoView(){console.warn("Quill#scrollIntoView() has been deprecated and will be removed in the near future. Please use Quill#scrollSelectionIntoView() instead."),this.scrollSelectionIntoView()}scrollSelectionIntoView(){const t=this.selection.lastRange,e=t&&this.selection.getBounds(t.index,t.length);e&&this.scrollRectIntoView(e)}setContents(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:N.A.sources.API;return D.call(this,(()=>{t=new(o())(t);const e=this.getLength(),n=this.editor.deleteText(0,e),r=this.editor.insertContents(0,t),i=this.editor.deleteText(this.getLength()-1,1);return n.compose(r).compose(i)}),e)}setSelection(t,e,n){null==t?this.selection.setRange(null,e||I.sources.API):([t,e,,n]=P(t,e,n),this.selection.setRange(new f.Q(Math.max(0,t),e),n),n!==N.A.sources.SILENT&&this.scrollSelectionIntoView())}setText(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:N.A.sources.API;const n=(new(o())).insert(t);return this.setContents(n,e)}update(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N.A.sources.USER;const e=this.scroll.update(t);return this.selection.update(t),e}updateContents(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:N.A.sources.API;return D.call(this,(()=>(t=new(o())(t),this.editor.applyDelta(t))),e,!0)}}function B(t){return"string"==typeof t?document.querySelector(t):t}function M(t){return Object.entries(t??{}).reduce(((t,e)=>{let[n,r]=e;return{...t,[n]:!0===r?{}:r}}),{})}function U(t){return Object.fromEntries(Object.entries(t).filter((t=>void 0!==t[1])))}function D(t,e,n,r){if(!this.isEnabled()&&e===N.A.sources.USER&&!this.allowReadOnlyEdits)return new(o());let i=null==n?null:this.getSelection();const s=this.editor.delta,l=t();if(null!=i&&(!0===n&&(n=i.index),null==r?i=z(i,l,e):0!==r&&(i=z(i,n,r,e)),this.setSelection(i,N.A.sources.SILENT)),l.length()>0){const t=[N.A.events.TEXT_CHANGE,l,s,e];this.emitter.emit(N.A.events.EDITOR_CHANGE,...t),e!==N.A.sources.SILENT&&this.emitter.emit(...t)}return l}function P(t,e,n,r,i){let s={};return"number"==typeof t.index&&"number"==typeof t.length?"number"!=typeof e?(i=r,r=n,n=e,e=t.length,t=t.index):(e=t.length,t=t.index):"number"!=typeof e&&(i=r,r=n,n=e,e=0),"object"==typeof n?(s=n,i=r):"string"==typeof n&&(null!=r?s[n]=r:i=n),[t,e,s,i=i||N.A.sources.API]}function z(t,e,n,r){const i="number"==typeof n?n:0;if(null==t)return null;let s,o;return e&&"function"==typeof e.transformPosition?[s,o]=[t.index,t.index+t.length].map((t=>e.transformPosition(t,r!==N.A.sources.USER))):[s,o]=[t.index,t.index+t.length].map((t=>t<e||t===e&&r===N.A.sources.USER?t:i>=0?t+i:Math.max(e,t+i))),new f.Q(s,o-s)}},8298:function(t,e,n){"use strict";n.d(e,{Q:function(){return a}});var r=n(6003),i=n(5123),s=n(3707),o=n(5374);const l=(0,n(6078).A)("quill:selection");class a{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this.index=t,this.length=e}}function c(t,e){try{e.parentNode}catch(t){return!1}return t.contains(e)}e.A=class{constructor(t,e){this.emitter=e,this.scroll=t,this.composing=!1,this.mouseDown=!1,this.root=this.scroll.domNode,this.cursor=this.scroll.create("cursor",this),this.savedRange=new a(0,0),this.lastRange=this.savedRange,this.lastNative=null,this.handleComposition(),this.handleDragging(),this.emitter.listenDOM("selectionchange",document,(()=>{this.mouseDown||this.composing||setTimeout(this.update.bind(this,o.A.sources.USER),1)})),this.emitter.on(o.A.events.SCROLL_BEFORE_UPDATE,(()=>{if(!this.hasFocus())return;const t=this.getNativeRange();null!=t&&t.start.node!==this.cursor.textNode&&this.emitter.once(o.A.events.SCROLL_UPDATE,((e,n)=>{try{this.root.contains(t.start.node)&&this.root.contains(t.end.node)&&this.setNativeRange(t.start.node,t.start.offset,t.end.node,t.end.offset);const r=n.some((t=>"characterData"===t.type||"childList"===t.type||"attributes"===t.type&&t.target===this.root));this.update(r?o.A.sources.SILENT:e)}catch(t){}}))})),this.emitter.on(o.A.events.SCROLL_OPTIMIZE,((t,e)=>{if(e.range){const{startNode:t,startOffset:n,endNode:r,endOffset:i}=e.range;this.setNativeRange(t,n,r,i),this.update(o.A.sources.SILENT)}})),this.update(o.A.sources.SILENT)}handleComposition(){this.emitter.on(o.A.events.COMPOSITION_BEFORE_START,(()=>{this.composing=!0})),this.emitter.on(o.A.events.COMPOSITION_END,(()=>{if(this.composing=!1,this.cursor.parent){const t=this.cursor.restore();if(!t)return;setTimeout((()=>{this.setNativeRange(t.startNode,t.startOffset,t.endNode,t.endOffset)}),1)}}))}handleDragging(){this.emitter.listenDOM("mousedown",document.body,(()=>{this.mouseDown=!0})),this.emitter.listenDOM("mouseup",document.body,(()=>{this.mouseDown=!1,this.update(o.A.sources.USER)}))}focus(){this.hasFocus()||(this.root.focus({preventScroll:!0}),this.setRange(this.savedRange))}format(t,e){this.scroll.update();const n=this.getNativeRange();if(null!=n&&n.native.collapsed&&!this.scroll.query(t,r.Scope.BLOCK)){if(n.start.node!==this.cursor.textNode){const t=this.scroll.find(n.start.node,!1);if(null==t)return;if(t instanceof r.LeafBlot){const e=t.split(n.start.offset);t.parent.insertBefore(this.cursor,e)}else t.insertBefore(this.cursor,n.start.node);this.cursor.attach()}this.cursor.format(t,e),this.scroll.optimize(),this.setNativeRange(this.cursor.textNode,this.cursor.textNode.data.length),this.update()}}getBounds(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;const n=this.scroll.length();let r;t=Math.min(t,n-1),e=Math.min(t+e,n-1)-t;let[i,s]=this.scroll.leaf(t);if(null==i)return null;if(e>0&&s===i.length()){const[e]=this.scroll.leaf(t+1);if(e){const[n]=this.scroll.line(t),[r]=this.scroll.line(t+1);n===r&&(i=e,s=0)}}[r,s]=i.position(s,!0);const o=document.createRange();if(e>0)return o.setStart(r,s),[i,s]=this.scroll.leaf(t+e),null==i?null:([r,s]=i.position(s,!0),o.setEnd(r,s),o.getBoundingClientRect());let l,a="left";if(r instanceof Text){if(!r.data.length)return null;s<r.data.length?(o.setStart(r,s),o.setEnd(r,s+1)):(o.setStart(r,s-1),o.setEnd(r,s),a="right"),l=o.getBoundingClientRect()}else{if(!(i.domNode instanceof Element))return null;l=i.domNode.getBoundingClientRect(),s>0&&(a="right")}return{bottom:l.top+l.height,height:l.height,left:l[a],right:l[a],top:l.top,width:0}}getNativeRange(){const t=document.getSelection();if(null==t||t.rangeCount<=0)return null;const e=t.getRangeAt(0);if(null==e)return null;const n=this.normalizeNative(e);return l.info("getNativeRange",n),n}getRange(){const t=this.scroll.domNode;if("isConnected"in t&&!t.isConnected)return[null,null];const e=this.getNativeRange();return null==e?[null,null]:[this.normalizedToRange(e),e]}hasFocus(){return document.activeElement===this.root||null!=document.activeElement&&c(this.root,document.activeElement)}normalizedToRange(t){const e=[[t.start.node,t.start.offset]];t.native.collapsed||e.push([t.end.node,t.end.offset]);const n=e.map((t=>{const[e,n]=t,i=this.scroll.find(e,!0),s=i.offset(this.scroll);return 0===n?s:i instanceof r.LeafBlot?s+i.index(e,n):s+i.length()})),i=Math.min(Math.max(...n),this.scroll.length()-1),s=Math.min(i,...n);return new a(s,i-s)}normalizeNative(t){if(!c(this.root,t.startContainer)||!t.collapsed&&!c(this.root,t.endContainer))return null;const e={start:{node:t.startContainer,offset:t.startOffset},end:{node:t.endContainer,offset:t.endOffset},native:t};return[e.start,e.end].forEach((t=>{let{node:e,offset:n}=t;for(;!(e instanceof Text)&&e.childNodes.length>0;)if(e.childNodes.length>n)e=e.childNodes[n],n=0;else{if(e.childNodes.length!==n)break;e=e.lastChild,n=e instanceof Text?e.data.length:e.childNodes.length>0?e.childNodes.length:e.childNodes.length+1}t.node=e,t.offset=n})),e}rangeToNative(t){const e=this.scroll.length(),n=(t,n)=>{t=Math.min(e-1,t);const[r,i]=this.scroll.leaf(t);return r?r.position(i,n):[null,-1]};return[...n(t.index,!1),...n(t.index+t.length,!0)]}setNativeRange(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(l.info("setNativeRange",t,e,n,r),null!=t&&(null==this.root.parentNode||null==t.parentNode||null==n.parentNode))return;const s=document.getSelection();if(null!=s)if(null!=t){this.hasFocus()||this.root.focus({preventScroll:!0});const{native:o}=this.getNativeRange()||{};if(null==o||i||t!==o.startContainer||e!==o.startOffset||n!==o.endContainer||r!==o.endOffset){t instanceof Element&&"BR"===t.tagName&&(e=Array.from(t.parentNode.childNodes).indexOf(t),t=t.parentNode),n instanceof Element&&"BR"===n.tagName&&(r=Array.from(n.parentNode.childNodes).indexOf(n),n=n.parentNode);const i=document.createRange();i.setStart(t,e),i.setEnd(n,r),s.removeAllRanges(),s.addRange(i)}}else s.removeAllRanges(),this.root.blur()}setRange(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o.A.sources.API;if("string"==typeof e&&(n=e,e=!1),l.info("setRange",t),null!=t){const n=this.rangeToNative(t);this.setNativeRange(...n,e)}else this.setNativeRange(null);this.update(n)}update(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o.A.sources.USER;const e=this.lastRange,[n,r]=this.getRange();if(this.lastRange=n,this.lastNative=r,null!=this.lastRange&&(this.savedRange=this.lastRange),!(0,i.A)(e,this.lastRange)){if(!this.composing&&null!=r&&r.native.collapsed&&r.start.node!==this.cursor.textNode){const t=this.cursor.restore();t&&this.setNativeRange(t.startNode,t.startOffset,t.endNode,t.endOffset)}const n=[o.A.events.SELECTION_CHANGE,(0,s.A)(this.lastRange),(0,s.A)(e),t];this.emitter.emit(o.A.events.EDITOR_CHANGE,...n),t!==o.A.sources.SILENT&&this.emitter.emit(...n)}}}},9609:function(t,e){"use strict";class n{static DEFAULTS={modules:{}};static themes={default:n};modules={};constructor(t,e){this.quill=t,this.options=e}init(){Object.keys(this.options.modules).forEach((t=>{null==this.modules[t]&&this.addModule(t)}))}addModule(t){const e=this.quill.constructor.import(`modules/${t}`);return this.modules[t]=new e(this.quill,this.options.modules[t]||{}),this.modules[t]}}e.A=n},8276:function(t,e,n){"use strict";n.d(e,{Hu:function(){return l},gS:function(){return s},qh:function(){return o}});var r=n(6003);const i={scope:r.Scope.BLOCK,whitelist:["right","center","justify"]},s=new r.Attributor("align","align",i),o=new r.ClassAttributor("align","ql-align",i),l=new r.StyleAttributor("align","text-align",i)},9541:function(t,e,n){"use strict";n.d(e,{l:function(){return s},s:function(){return o}});var r=n(6003),i=n(8638);const s=new r.ClassAttributor("background","ql-bg",{scope:r.Scope.INLINE}),o=new i.a2("background","background-color",{scope:r.Scope.INLINE})},9404:function(t,e,n){"use strict";n.d(e,{Ay:function(){return h},Cy:function(){return d},EJ:function(){return u}});var r=n(9698),i=n(3036),s=n(4541),o=n(4850),l=n(5508),a=n(580),c=n(6142);class u extends a.A{static create(t){const e=super.create(t);return e.setAttribute("spellcheck","false"),e}code(t,e){return this.children.map((t=>t.length()<=1?"":t.domNode.innerText)).join("\n").slice(t,t+e)}html(t,e){return`<pre>\n${(0,l.X)(this.code(t,e))}\n</pre>`}}class h extends r.Ay{static TAB="  ";static register(){c.Ay.register(u)}}class d extends o.A{}d.blotName="code",d.tagName="CODE",h.blotName="code-block",h.className="ql-code-block",h.tagName="DIV",u.blotName="code-block-container",u.className="ql-code-block-container",u.tagName="DIV",u.allowedChildren=[h],h.allowedChildren=[l.A,i.A,s.A],h.requiredContainer=u},8638:function(t,e,n){"use strict";n.d(e,{JM:function(){return o},a2:function(){return i},g3:function(){return s}});var r=n(6003);class i extends r.StyleAttributor{value(t){let e=super.value(t);return e.startsWith("rgb(")?(e=e.replace(/^[^\d]+/,"").replace(/[^\d]+$/,""),`#${e.split(",").map((t=>`00${parseInt(t,10).toString(16)}`.slice(-2))).join("")}`):e}}const s=new r.ClassAttributor("color","ql-color",{scope:r.Scope.INLINE}),o=new i("color","color",{scope:r.Scope.INLINE})},7912:function(t,e,n){"use strict";n.d(e,{Mc:function(){return s},VL:function(){return l},sY:function(){return o}});var r=n(6003);const i={scope:r.Scope.BLOCK,whitelist:["rtl"]},s=new r.Attributor("direction","dir",i),o=new r.ClassAttributor("direction","ql-direction",i),l=new r.StyleAttributor("direction","direction",i)},6772:function(t,e,n){"use strict";n.d(e,{q:function(){return s},z:function(){return l}});var r=n(6003);const i={scope:r.Scope.INLINE,whitelist:["serif","monospace"]},s=new r.ClassAttributor("font","ql-font",i);class o extends r.StyleAttributor{value(t){return super.value(t).replace(/["']/g,"")}}const l=new o("font","font-family",i)},664:function(t,e,n){"use strict";n.d(e,{U:function(){return i},r:function(){return s}});var r=n(6003);const i=new r.ClassAttributor("size","ql-size",{scope:r.Scope.INLINE,whitelist:["small","large","huge"]}),s=new r.StyleAttributor("size","font-size",{scope:r.Scope.INLINE,whitelist:["10px","18px","32px"]})},584:function(t,e,n){"use strict";n.d(e,{Ay:function(){return S},hV:function(){return I}});var r=n(6003),i=n(5232),s=n.n(i),o=n(9698),l=n(6078),a=n(4266),c=n(6142),u=n(8276),h=n(9541),d=n(9404),f=n(8638),p=n(7912),g=n(6772),m=n(664),b=n(8123);const y=/font-weight:\s*normal/,v=["P","OL","UL"],A=t=>t&&v.includes(t.tagName),x=/\bmso-list:[^;]*ignore/i,N=/\bmso-list:[^;]*\bl(\d+)/i,E=/\bmso-list:[^;]*\blevel(\d+)/i,w=[function(t){"urn:schemas-microsoft-com:office:word"===t.documentElement.getAttribute("xmlns:w")&&(t=>{const e=Array.from(t.querySelectorAll("[style*=mso-list]")),n=[],r=[];e.forEach((t=>{(t.getAttribute("style")||"").match(x)?n.push(t):r.push(t)})),n.forEach((t=>t.parentNode?.removeChild(t)));const i=t.documentElement.innerHTML,s=r.map((t=>((t,e)=>{const n=t.getAttribute("style"),r=n?.match(N);if(!r)return null;const i=Number(r[1]),s=n?.match(E),o=s?Number(s[1]):1,l=new RegExp(`@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`,"i"),a=e.match(l);return{id:i,indent:o,type:a&&"bullet"===a[1]?"bullet":"ordered",element:t}})(t,i))).filter((t=>t));for(;s.length;){const t=[];let e=s.shift();for(;e;)t.push(e),e=s.length&&s[0]?.element===e.element.nextElementSibling&&s[0].id===e.id?s.shift():null;const n=document.createElement("ul");t.forEach((t=>{const e=document.createElement("li");e.setAttribute("data-list",t.type),t.indent>1&&e.setAttribute("class","ql-indent-"+(t.indent-1)),e.innerHTML=t.element.innerHTML,n.appendChild(e)}));const r=t[0]?.element,{parentNode:i}=r??{};r&&i?.replaceChild(n,r),t.slice(1).forEach((t=>{let{element:e}=t;i?.removeChild(e)}))}})(t)},function(t){t.querySelector('[id^="docs-internal-guid-"]')&&((t=>{Array.from(t.querySelectorAll('b[style*="font-weight"]')).filter((t=>t.getAttribute("style")?.match(y))).forEach((e=>{const n=t.createDocumentFragment();n.append(...e.childNodes),e.parentNode?.replaceChild(n,e)}))})(t),(t=>{Array.from(t.querySelectorAll("br")).filter((t=>A(t.previousElementSibling)&&A(t.nextElementSibling))).forEach((t=>{t.parentNode?.removeChild(t)}))})(t))}];const q=(0,l.A)("quill:clipboard"),k=[[Node.TEXT_NODE,function(t,e,n){let r=t.data;if("O:P"===t.parentElement?.tagName)return e.insert(r.trim());if(!R(t)){if(0===r.trim().length&&r.includes("\n")&&!function(t,e){return t.previousElementSibling&&t.nextElementSibling&&!j(t.previousElementSibling,e)&&!j(t.nextElementSibling,e)}(t,n))return e;const i=(t,e)=>{const n=e.replace(/[^\u00a0]/g,"");return n.length<1&&t?" ":n};r=r.replace(/\r\n/g," ").replace(/\n/g," "),r=r.replace(/\s\s+/g,i.bind(i,!0)),(null==t.previousSibling&&null!=t.parentElement&&j(t.parentElement,n)||t.previousSibling instanceof Element&&j(t.previousSibling,n))&&(r=r.replace(/^\s+/,i.bind(i,!1))),(null==t.nextSibling&&null!=t.parentElement&&j(t.parentElement,n)||t.nextSibling instanceof Element&&j(t.nextSibling,n))&&(r=r.replace(/\s+$/,i.bind(i,!1)))}return e.insert(r)}],[Node.TEXT_NODE,M],["br",function(t,e){return T(e,"\n")||e.insert("\n"),e}],[Node.ELEMENT_NODE,M],[Node.ELEMENT_NODE,function(t,e,n){const i=n.query(t);if(null==i)return e;if(i.prototype instanceof r.EmbedBlot){const e={},r=i.value(t);if(null!=r)return e[i.blotName]=r,(new(s())).insert(e,i.formats(t,n))}else if(i.prototype instanceof r.BlockBlot&&!T(e,"\n")&&e.insert("\n"),"blotName"in i&&"formats"in i&&"function"==typeof i.formats)return O(e,i.blotName,i.formats(t,n),n);return e}],[Node.ELEMENT_NODE,function(t,e,n){const i=r.Attributor.keys(t),s=r.ClassAttributor.keys(t),o=r.StyleAttributor.keys(t),l={};return i.concat(s).concat(o).forEach((e=>{let i=n.query(e,r.Scope.ATTRIBUTE);null!=i&&(l[i.attrName]=i.value(t),l[i.attrName])||(i=_[e],null==i||i.attrName!==e&&i.keyName!==e||(l[i.attrName]=i.value(t)||void 0),i=L[e],null==i||i.attrName!==e&&i.keyName!==e||(i=L[e],l[i.attrName]=i.value(t)||void 0))})),Object.entries(l).reduce(((t,e)=>{let[r,i]=e;return O(t,r,i,n)}),e)}],[Node.ELEMENT_NODE,function(t,e,n){const r={},i=t.style||{};return"italic"===i.fontStyle&&(r.italic=!0),"underline"===i.textDecoration&&(r.underline=!0),"line-through"===i.textDecoration&&(r.strike=!0),(i.fontWeight?.startsWith("bold")||parseInt(i.fontWeight,10)>=700)&&(r.bold=!0),e=Object.entries(r).reduce(((t,e)=>{let[r,i]=e;return O(t,r,i,n)}),e),parseFloat(i.textIndent||0)>0?(new(s())).insert("\t").concat(e):e}],["li",function(t,e,n){const r=n.query(t);if(null==r||"list"!==r.blotName||!T(e,"\n"))return e;let i=-1,o=t.parentNode;for(;null!=o;)["OL","UL"].includes(o.tagName)&&(i+=1),o=o.parentNode;return i<=0?e:e.reduce(((t,e)=>e.insert?e.attributes&&"number"==typeof e.attributes.indent?t.push(e):t.insert(e.insert,{indent:i,...e.attributes||{}}):t),new(s()))}],["ol, ul",function(t,e,n){const r=t;let i="OL"===r.tagName?"ordered":"bullet";const s=r.getAttribute("data-checked");return s&&(i="true"===s?"checked":"unchecked"),O(e,"list",i,n)}],["pre",function(t,e,n){const r=n.query("code-block");return O(e,"code-block",!r||!("formats"in r)||"function"!=typeof r.formats||r.formats(t,n),n)}],["tr",function(t,e,n){const r="TABLE"===t.parentElement?.tagName?t.parentElement:t.parentElement?.parentElement;return null!=r?O(e,"table",Array.from(r.querySelectorAll("tr")).indexOf(t)+1,n):e}],["b",B("bold")],["i",B("italic")],["strike",B("strike")],["style",function(){return new(s())}]],_=[u.gS,p.Mc].reduce(((t,e)=>(t[e.keyName]=e,t)),{}),L=[u.Hu,h.s,f.JM,p.VL,g.z,m.r].reduce(((t,e)=>(t[e.keyName]=e,t)),{});class S extends a.A{static DEFAULTS={matchers:[]};constructor(t,e){super(t,e),this.quill.root.addEventListener("copy",(t=>this.onCaptureCopy(t,!1))),this.quill.root.addEventListener("cut",(t=>this.onCaptureCopy(t,!0))),this.quill.root.addEventListener("paste",this.onCapturePaste.bind(this)),this.matchers=[],k.concat(this.options.matchers??[]).forEach((t=>{let[e,n]=t;this.addMatcher(e,n)}))}addMatcher(t,e){this.matchers.push([t,e])}convert(t){let{html:e,text:n}=t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(r[d.Ay.blotName])return(new(s())).insert(n||"",{[d.Ay.blotName]:r[d.Ay.blotName]});if(!e)return(new(s())).insert(n||"",r);const i=this.convertHTML(e);return T(i,"\n")&&(null==i.ops[i.ops.length-1].attributes||r.table)?i.compose((new(s())).retain(i.length()-1).delete(1)):i}normalizeHTML(t){(t=>{t.documentElement&&w.forEach((e=>{e(t)}))})(t)}convertHTML(t){const e=(new DOMParser).parseFromString(t,"text/html");this.normalizeHTML(e);const n=e.body,r=new WeakMap,[i,s]=this.prepareMatching(n,r);return I(this.quill.scroll,n,i,s,r)}dangerouslyPasteHTML(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:c.Ay.sources.API;if("string"==typeof t){const n=this.convert({html:t,text:""});this.quill.setContents(n,e),this.quill.setSelection(0,c.Ay.sources.SILENT)}else{const r=this.convert({html:e,text:""});this.quill.updateContents((new(s())).retain(t).concat(r),n),this.quill.setSelection(t+r.length(),c.Ay.sources.SILENT)}}onCaptureCopy(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(t.defaultPrevented)return;t.preventDefault();const[n]=this.quill.selection.getRange();if(null==n)return;const{html:r,text:i}=this.onCopy(n,e);t.clipboardData?.setData("text/plain",i),t.clipboardData?.setData("text/html",r),e&&(0,b.Xo)({range:n,quill:this.quill})}normalizeURIList(t){return t.split(/\r?\n/).filter((t=>"#"!==t[0])).join("\n")}onCapturePaste(t){if(t.defaultPrevented||!this.quill.isEnabled())return;t.preventDefault();const e=this.quill.getSelection(!0);if(null==e)return;const n=t.clipboardData?.getData("text/html");let r=t.clipboardData?.getData("text/plain");if(!n&&!r){const e=t.clipboardData?.getData("text/uri-list");e&&(r=this.normalizeURIList(e))}const i=Array.from(t.clipboardData?.files||[]);if(!n&&i.length>0)this.quill.uploader.upload(e,i);else{if(n&&i.length>0){const t=(new DOMParser).parseFromString(n,"text/html");if(1===t.body.childElementCount&&"IMG"===t.body.firstElementChild?.tagName)return void this.quill.uploader.upload(e,i)}this.onPaste(e,{html:n,text:r})}}onCopy(t){const e=this.quill.getText(t);return{html:this.quill.getSemanticHTML(t),text:e}}onPaste(t,e){let{text:n,html:r}=e;const i=this.quill.getFormat(t.index),o=this.convert({text:n,html:r},i);q.log("onPaste",o,{text:n,html:r});const l=(new(s())).retain(t.index).delete(t.length).concat(o);this.quill.updateContents(l,c.Ay.sources.USER),this.quill.setSelection(l.length()-t.length,c.Ay.sources.SILENT),this.quill.scrollSelectionIntoView()}prepareMatching(t,e){const n=[],r=[];return this.matchers.forEach((i=>{const[s,o]=i;switch(s){case Node.TEXT_NODE:r.push(o);break;case Node.ELEMENT_NODE:n.push(o);break;default:Array.from(t.querySelectorAll(s)).forEach((t=>{if(e.has(t)){const n=e.get(t);n?.push(o)}else e.set(t,[o])}))}})),[n,r]}}function O(t,e,n,r){return r.query(e)?t.reduce(((t,r)=>{if(!r.insert)return t;if(r.attributes&&r.attributes[e])return t.push(r);const i=n?{[e]:n}:{};return t.insert(r.insert,{...i,...r.attributes})}),new(s())):t}function T(t,e){let n="";for(let r=t.ops.length-1;r>=0&&n.length<e.length;--r){const e=t.ops[r];if("string"!=typeof e.insert)break;n=e.insert+n}return n.slice(-1*e.length)===e}function j(t,e){if(!(t instanceof Element))return!1;const n=e.query(t);return!(n&&n.prototype instanceof r.EmbedBlot)&&["address","article","blockquote","canvas","dd","div","dl","dt","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","iframe","li","main","nav","ol","output","p","pre","section","table","td","tr","ul","video"].includes(t.tagName.toLowerCase())}const C=new WeakMap;function R(t){return null!=t&&(C.has(t)||("PRE"===t.tagName?C.set(t,!0):C.set(t,R(t.parentNode))),C.get(t))}function I(t,e,n,r,i){return e.nodeType===e.TEXT_NODE?r.reduce(((n,r)=>r(e,n,t)),new(s())):e.nodeType===e.ELEMENT_NODE?Array.from(e.childNodes||[]).reduce(((s,o)=>{let l=I(t,o,n,r,i);return o.nodeType===e.ELEMENT_NODE&&(l=n.reduce(((e,n)=>n(o,e,t)),l),l=(i.get(o)||[]).reduce(((e,n)=>n(o,e,t)),l)),s.concat(l)}),new(s())):new(s())}function B(t){return(e,n,r)=>O(n,t,!0,r)}function M(t,e,n){if(!T(e,"\n")){if(j(t,n)&&(t.childNodes.length>0||t instanceof HTMLParagraphElement))return e.insert("\n");if(e.length()>0&&t.nextSibling){let r=t.nextSibling;for(;null!=r;){if(j(r,n))return e.insert("\n");const t=n.query(r);if(t&&t.prototype instanceof o.zo)return e.insert("\n");r=r.firstChild}}}return e}},8123:function(t,e,n){"use strict";n.d(e,{Ay:function(){return f},Xo:function(){return v}});var r=n(5123),i=n(3707),s=n(5232),o=n.n(s),l=n(6003),a=n(6142),c=n(6078),u=n(4266);const h=(0,c.A)("quill:keyboard"),d=/Mac/i.test(navigator.platform)?"metaKey":"ctrlKey";class f extends u.A{static match(t,e){return!["altKey","ctrlKey","metaKey","shiftKey"].some((n=>!!e[n]!==t[n]&&null!==e[n]))&&(e.key===t.key||e.key===t.which)}constructor(t,e){super(t,e),this.bindings={},Object.keys(this.options.bindings).forEach((t=>{this.options.bindings[t]&&this.addBinding(this.options.bindings[t])})),this.addBinding({key:"Enter",shiftKey:null},this.handleEnter),this.addBinding({key:"Enter",metaKey:null,ctrlKey:null,altKey:null},(()=>{})),/Firefox/i.test(navigator.userAgent)?(this.addBinding({key:"Backspace"},{collapsed:!0},this.handleBackspace),this.addBinding({key:"Delete"},{collapsed:!0},this.handleDelete)):(this.addBinding({key:"Backspace"},{collapsed:!0,prefix:/^.?$/},this.handleBackspace),this.addBinding({key:"Delete"},{collapsed:!0,suffix:/^.?$/},this.handleDelete)),this.addBinding({key:"Backspace"},{collapsed:!1},this.handleDeleteRange),this.addBinding({key:"Delete"},{collapsed:!1},this.handleDeleteRange),this.addBinding({key:"Backspace",altKey:null,ctrlKey:null,metaKey:null,shiftKey:null},{collapsed:!0,offset:0},this.handleBackspace),this.listen()}addBinding(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=function(t){if("string"==typeof t||"number"==typeof t)t={key:t};else{if("object"!=typeof t)return null;t=(0,i.A)(t)}return t.shortKey&&(t[d]=t.shortKey,delete t.shortKey),t}(t);null!=r?("function"==typeof e&&(e={handler:e}),"function"==typeof n&&(n={handler:n}),(Array.isArray(r.key)?r.key:[r.key]).forEach((t=>{const i={...r,key:t,...e,...n};this.bindings[i.key]=this.bindings[i.key]||[],this.bindings[i.key].push(i)}))):h.warn("Attempted to add invalid keyboard binding",r)}listen(){this.quill.root.addEventListener("keydown",(t=>{if(t.defaultPrevented||t.isComposing)return;if(229===t.keyCode&&("Enter"===t.key||"Backspace"===t.key))return;const e=(this.bindings[t.key]||[]).concat(this.bindings[t.which]||[]).filter((e=>f.match(t,e)));if(0===e.length)return;const n=a.Ay.find(t.target,!0);if(n&&n.scroll!==this.quill.scroll)return;const i=this.quill.getSelection();if(null==i||!this.quill.hasFocus())return;const[s,o]=this.quill.getLine(i.index),[c,u]=this.quill.getLeaf(i.index),[h,d]=0===i.length?[c,u]:this.quill.getLeaf(i.index+i.length),p=c instanceof l.TextBlot?c.value().slice(0,u):"",g=h instanceof l.TextBlot?h.value().slice(d):"",m={collapsed:0===i.length,empty:0===i.length&&s.length()<=1,format:this.quill.getFormat(i),line:s,offset:o,prefix:p,suffix:g,event:t};e.some((t=>{if(null!=t.collapsed&&t.collapsed!==m.collapsed)return!1;if(null!=t.empty&&t.empty!==m.empty)return!1;if(null!=t.offset&&t.offset!==m.offset)return!1;if(Array.isArray(t.format)){if(t.format.every((t=>null==m.format[t])))return!1}else if("object"==typeof t.format&&!Object.keys(t.format).every((e=>!0===t.format[e]?null!=m.format[e]:!1===t.format[e]?null==m.format[e]:(0,r.A)(t.format[e],m.format[e]))))return!1;return!(null!=t.prefix&&!t.prefix.test(m.prefix)||null!=t.suffix&&!t.suffix.test(m.suffix)||!0===t.handler.call(this,i,m,t))}))&&t.preventDefault()}))}handleBackspace(t,e){const n=/[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(e.prefix)?2:1;if(0===t.index||this.quill.getLength()<=1)return;let r={};const[i]=this.quill.getLine(t.index);let l=(new(o())).retain(t.index-n).delete(n);if(0===e.offset){const[e]=this.quill.getLine(t.index-1);if(e&&!("block"===e.statics.blotName&&e.length()<=1)){const e=i.formats(),n=this.quill.getFormat(t.index-1,1);if(r=s.AttributeMap.diff(e,n)||{},Object.keys(r).length>0){const e=(new(o())).retain(t.index+i.length()-2).retain(1,r);l=l.compose(e)}}}this.quill.updateContents(l,a.Ay.sources.USER),this.quill.focus()}handleDelete(t,e){const n=/^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(e.suffix)?2:1;if(t.index>=this.quill.getLength()-n)return;let r={};const[i]=this.quill.getLine(t.index);let l=(new(o())).retain(t.index).delete(n);if(e.offset>=i.length()-1){const[e]=this.quill.getLine(t.index+1);if(e){const n=i.formats(),o=this.quill.getFormat(t.index,1);r=s.AttributeMap.diff(n,o)||{},Object.keys(r).length>0&&(l=l.retain(e.length()-1).retain(1,r))}}this.quill.updateContents(l,a.Ay.sources.USER),this.quill.focus()}handleDeleteRange(t){v({range:t,quill:this.quill}),this.quill.focus()}handleEnter(t,e){const n=Object.keys(e.format).reduce(((t,n)=>(this.quill.scroll.query(n,l.Scope.BLOCK)&&!Array.isArray(e.format[n])&&(t[n]=e.format[n]),t)),{}),r=(new(o())).retain(t.index).delete(t.length).insert("\n",n);this.quill.updateContents(r,a.Ay.sources.USER),this.quill.setSelection(t.index+1,a.Ay.sources.SILENT),this.quill.focus()}}const p={bindings:{bold:b("bold"),italic:b("italic"),underline:b("underline"),indent:{key:"Tab",format:["blockquote","indent","list"],handler(t,e){return!(!e.collapsed||0===e.offset)||(this.quill.format("indent","+1",a.Ay.sources.USER),!1)}},outdent:{key:"Tab",shiftKey:!0,format:["blockquote","indent","list"],handler(t,e){return!(!e.collapsed||0===e.offset)||(this.quill.format("indent","-1",a.Ay.sources.USER),!1)}},"outdent backspace":{key:"Backspace",collapsed:!0,shiftKey:null,metaKey:null,ctrlKey:null,altKey:null,format:["indent","list"],offset:0,handler(t,e){null!=e.format.indent?this.quill.format("indent","-1",a.Ay.sources.USER):null!=e.format.list&&this.quill.format("list",!1,a.Ay.sources.USER)}},"indent code-block":g(!0),"outdent code-block":g(!1),"remove tab":{key:"Tab",shiftKey:!0,collapsed:!0,prefix:/\t$/,handler(t){this.quill.deleteText(t.index-1,1,a.Ay.sources.USER)}},tab:{key:"Tab",handler(t,e){if(e.format.table)return!0;this.quill.history.cutoff();const n=(new(o())).retain(t.index).delete(t.length).insert("\t");return this.quill.updateContents(n,a.Ay.sources.USER),this.quill.history.cutoff(),this.quill.setSelection(t.index+1,a.Ay.sources.SILENT),!1}},"blockquote empty enter":{key:"Enter",collapsed:!0,format:["blockquote"],empty:!0,handler(){this.quill.format("blockquote",!1,a.Ay.sources.USER)}},"list empty enter":{key:"Enter",collapsed:!0,format:["list"],empty:!0,handler(t,e){const n={list:!1};e.format.indent&&(n.indent=!1),this.quill.formatLine(t.index,t.length,n,a.Ay.sources.USER)}},"checklist enter":{key:"Enter",collapsed:!0,format:{list:"checked"},handler(t){const[e,n]=this.quill.getLine(t.index),r={...e.formats(),list:"checked"},i=(new(o())).retain(t.index).insert("\n",r).retain(e.length()-n-1).retain(1,{list:"unchecked"});this.quill.updateContents(i,a.Ay.sources.USER),this.quill.setSelection(t.index+1,a.Ay.sources.SILENT),this.quill.scrollSelectionIntoView()}},"header enter":{key:"Enter",collapsed:!0,format:["header"],suffix:/^$/,handler(t,e){const[n,r]=this.quill.getLine(t.index),i=(new(o())).retain(t.index).insert("\n",e.format).retain(n.length()-r-1).retain(1,{header:null});this.quill.updateContents(i,a.Ay.sources.USER),this.quill.setSelection(t.index+1,a.Ay.sources.SILENT),this.quill.scrollSelectionIntoView()}},"table backspace":{key:"Backspace",format:["table"],collapsed:!0,offset:0,handler(){}},"table delete":{key:"Delete",format:["table"],collapsed:!0,suffix:/^$/,handler(){}},"table enter":{key:"Enter",shiftKey:null,format:["table"],handler(t){const e=this.quill.getModule("table");if(e){const[n,r,i,s]=e.getTable(t),l=function(t,e,n,r){return null==e.prev&&null==e.next?null==n.prev&&null==n.next?0===r?-1:1:null==n.prev?-1:1:null==e.prev?-1:null==e.next?1:null}(0,r,i,s);if(null==l)return;let c=n.offset();if(l<0){const e=(new(o())).retain(c).insert("\n");this.quill.updateContents(e,a.Ay.sources.USER),this.quill.setSelection(t.index+1,t.length,a.Ay.sources.SILENT)}else if(l>0){c+=n.length();const t=(new(o())).retain(c).insert("\n");this.quill.updateContents(t,a.Ay.sources.USER),this.quill.setSelection(c,a.Ay.sources.USER)}}}},"table tab":{key:"Tab",shiftKey:null,format:["table"],handler(t,e){const{event:n,line:r}=e,i=r.offset(this.quill.scroll);n.shiftKey?this.quill.setSelection(i-1,a.Ay.sources.USER):this.quill.setSelection(i+r.length(),a.Ay.sources.USER)}},"list autofill":{key:" ",shiftKey:null,collapsed:!0,format:{"code-block":!1,blockquote:!1,table:!1},prefix:/^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,handler(t,e){if(null==this.quill.scroll.query("list"))return!0;const{length:n}=e.prefix,[r,i]=this.quill.getLine(t.index);if(i>n)return!0;let s;switch(e.prefix.trim()){case"[]":case"[ ]":s="unchecked";break;case"[x]":s="checked";break;case"-":case"*":s="bullet";break;default:s="ordered"}this.quill.insertText(t.index," ",a.Ay.sources.USER),this.quill.history.cutoff();const l=(new(o())).retain(t.index-i).delete(n+1).retain(r.length()-2-i).retain(1,{list:s});return this.quill.updateContents(l,a.Ay.sources.USER),this.quill.history.cutoff(),this.quill.setSelection(t.index-n,a.Ay.sources.SILENT),!1}},"code exit":{key:"Enter",collapsed:!0,format:["code-block"],prefix:/^$/,suffix:/^\s*$/,handler(t){const[e,n]=this.quill.getLine(t.index);let r=2,i=e;for(;null!=i&&i.length()<=1&&i.formats()["code-block"];)if(i=i.prev,r-=1,r<=0){const r=(new(o())).retain(t.index+e.length()-n-2).retain(1,{"code-block":null}).delete(1);return this.quill.updateContents(r,a.Ay.sources.USER),this.quill.setSelection(t.index-1,a.Ay.sources.SILENT),!1}return!0}},"embed left":m("ArrowLeft",!1),"embed left shift":m("ArrowLeft",!0),"embed right":m("ArrowRight",!1),"embed right shift":m("ArrowRight",!0),"table down":y(!1),"table up":y(!0)}};function g(t){return{key:"Tab",shiftKey:!t,format:{"code-block":!0},handler(e,n){let{event:r}=n;const i=this.quill.scroll.query("code-block"),{TAB:s}=i;if(0===e.length&&!r.shiftKey)return this.quill.insertText(e.index,s,a.Ay.sources.USER),void this.quill.setSelection(e.index+s.length,a.Ay.sources.SILENT);const o=0===e.length?this.quill.getLines(e.index,1):this.quill.getLines(e);let{index:l,length:c}=e;o.forEach(((e,n)=>{t?(e.insertAt(0,s),0===n?l+=s.length:c+=s.length):e.domNode.textContent.startsWith(s)&&(e.deleteAt(0,s.length),0===n?l-=s.length:c-=s.length)})),this.quill.update(a.Ay.sources.USER),this.quill.setSelection(l,c,a.Ay.sources.SILENT)}}}function m(t,e){return{key:t,shiftKey:e,altKey:null,["ArrowLeft"===t?"prefix":"suffix"]:/^$/,handler(n){let{index:r}=n;"ArrowRight"===t&&(r+=n.length+1);const[i]=this.quill.getLeaf(r);return!(i instanceof l.EmbedBlot&&("ArrowLeft"===t?e?this.quill.setSelection(n.index-1,n.length+1,a.Ay.sources.USER):this.quill.setSelection(n.index-1,a.Ay.sources.USER):e?this.quill.setSelection(n.index,n.length+1,a.Ay.sources.USER):this.quill.setSelection(n.index+n.length+1,a.Ay.sources.USER),1))}}}function b(t){return{key:t[0],shortKey:!0,handler(e,n){this.quill.format(t,!n.format[t],a.Ay.sources.USER)}}}function y(t){return{key:t?"ArrowUp":"ArrowDown",collapsed:!0,format:["table"],handler(e,n){const r=t?"prev":"next",i=n.line,s=i.parent[r];if(null!=s){if("table-row"===s.statics.blotName){let t=s.children.head,e=i;for(;null!=e.prev;)e=e.prev,t=t.next;const r=t.offset(this.quill.scroll)+Math.min(n.offset,t.length()-1);this.quill.setSelection(r,0,a.Ay.sources.USER)}}else{const e=i.table()[r];null!=e&&(t?this.quill.setSelection(e.offset(this.quill.scroll)+e.length()-1,0,a.Ay.sources.USER):this.quill.setSelection(e.offset(this.quill.scroll),0,a.Ay.sources.USER))}return!1}}}function v(t){let{quill:e,range:n}=t;const r=e.getLines(n);let i={};if(r.length>1){const t=r[0].formats(),e=r[r.length-1].formats();i=s.AttributeMap.diff(e,t)||{}}e.deleteText(n,a.Ay.sources.USER),Object.keys(i).length>0&&e.formatLine(n.index,1,i,a.Ay.sources.USER),e.setSelection(n.index,a.Ay.sources.SILENT)}f.DEFAULTS=p},8920:function(t){"use strict";var e=Object.prototype.hasOwnProperty,n="~";function r(){}function i(t,e,n){this.fn=t,this.context=e,this.once=n||!1}function s(t,e,r,s,o){if("function"!=typeof r)throw new TypeError("The listener must be a function");var l=new i(r,s||t,o),a=n?n+e:e;return t._events[a]?t._events[a].fn?t._events[a]=[t._events[a],l]:t._events[a].push(l):(t._events[a]=l,t._eventsCount++),t}function o(t,e){0==--t._eventsCount?t._events=new r:delete t._events[e]}function l(){this._events=new r,this._eventsCount=0}Object.create&&(r.prototype=Object.create(null),(new r).__proto__||(n=!1)),l.prototype.eventNames=function(){var t,r,i=[];if(0===this._eventsCount)return i;for(r in t=this._events)e.call(t,r)&&i.push(n?r.slice(1):r);return Object.getOwnPropertySymbols?i.concat(Object.getOwnPropertySymbols(t)):i},l.prototype.listeners=function(t){var e=n?n+t:t,r=this._events[e];if(!r)return[];if(r.fn)return[r.fn];for(var i=0,s=r.length,o=new Array(s);i<s;i++)o[i]=r[i].fn;return o},l.prototype.listenerCount=function(t){var e=n?n+t:t,r=this._events[e];return r?r.fn?1:r.length:0},l.prototype.emit=function(t,e,r,i,s,o){var l=n?n+t:t;if(!this._events[l])return!1;var a,c,u=this._events[l],h=arguments.length;if(u.fn){switch(u.once&&this.removeListener(t,u.fn,void 0,!0),h){case 1:return u.fn.call(u.context),!0;case 2:return u.fn.call(u.context,e),!0;case 3:return u.fn.call(u.context,e,r),!0;case 4:return u.fn.call(u.context,e,r,i),!0;case 5:return u.fn.call(u.context,e,r,i,s),!0;case 6:return u.fn.call(u.context,e,r,i,s,o),!0}for(c=1,a=new Array(h-1);c<h;c++)a[c-1]=arguments[c];u.fn.apply(u.context,a)}else{var d,f=u.length;for(c=0;c<f;c++)switch(u[c].once&&this.removeListener(t,u[c].fn,void 0,!0),h){case 1:u[c].fn.call(u[c].context);break;case 2:u[c].fn.call(u[c].context,e);break;case 3:u[c].fn.call(u[c].context,e,r);break;case 4:u[c].fn.call(u[c].context,e,r,i);break;default:if(!a)for(d=1,a=new Array(h-1);d<h;d++)a[d-1]=arguments[d];u[c].fn.apply(u[c].context,a)}}return!0},l.prototype.on=function(t,e,n){return s(this,t,e,n,!1)},l.prototype.once=function(t,e,n){return s(this,t,e,n,!0)},l.prototype.removeListener=function(t,e,r,i){var s=n?n+t:t;if(!this._events[s])return this;if(!e)return o(this,s),this;var l=this._events[s];if(l.fn)l.fn!==e||i&&!l.once||r&&l.context!==r||o(this,s);else{for(var a=0,c=[],u=l.length;a<u;a++)(l[a].fn!==e||i&&!l[a].once||r&&l[a].context!==r)&&c.push(l[a]);c.length?this._events[s]=1===c.length?c[0]:c:o(this,s)}return this},l.prototype.removeAllListeners=function(t){var e;return t?(e=n?n+t:t,this._events[e]&&o(this,e)):(this._events=new r,this._eventsCount=0),this},l.prototype.off=l.prototype.removeListener,l.prototype.addListener=l.prototype.on,l.prefixed=n,l.EventEmitter=l,t.exports=l},5090:function(t){var e=-1,n=1,r=0;function i(t,g,m,b,y){if(t===g)return t?[[r,t]]:[];if(null!=m){var A=function(t,e,n){var r="number"==typeof n?{index:n,length:0}:n.oldRange,i="number"==typeof n?null:n.newRange,s=t.length,o=e.length;if(0===r.length&&(null===i||0===i.length)){var l=r.index,a=t.slice(0,l),c=t.slice(l),u=i?i.index:null,h=l+o-s;if((null===u||u===h)&&!(h<0||h>o)){var d=e.slice(0,h);if((g=e.slice(h))===c){var f=Math.min(l,h);if((b=a.slice(0,f))===(A=d.slice(0,f)))return v(b,a.slice(f),d.slice(f),c)}}if(null===u||u===l){var p=l,g=(d=e.slice(0,p),e.slice(p));if(d===a){var m=Math.min(s-p,o-p);if((y=c.slice(c.length-m))===(x=g.slice(g.length-m)))return v(a,c.slice(0,c.length-m),g.slice(0,g.length-m),y)}}}if(r.length>0&&i&&0===i.length){var b=t.slice(0,r.index),y=t.slice(r.index+r.length);if(!(o<(f=b.length)+(m=y.length))){var A=e.slice(0,f),x=e.slice(o-m);if(b===A&&y===x)return v(b,t.slice(f,s-m),e.slice(f,o-m),y)}}return null}(t,g,m);if(A)return A}var x=o(t,g),N=t.substring(0,x);x=a(t=t.substring(x),g=g.substring(x));var E=t.substring(t.length-x),w=function(t,l){var c;if(!t)return[[n,l]];if(!l)return[[e,t]];var u=t.length>l.length?t:l,h=t.length>l.length?l:t,d=u.indexOf(h);if(-1!==d)return c=[[n,u.substring(0,d)],[r,h],[n,u.substring(d+h.length)]],t.length>l.length&&(c[0][0]=c[2][0]=e),c;if(1===h.length)return[[e,t],[n,l]];var f=function(t,e){var n=t.length>e.length?t:e,r=t.length>e.length?e:t;if(n.length<4||2*r.length<n.length)return null;function i(t,e,n){for(var r,i,s,l,c=t.substring(n,n+Math.floor(t.length/4)),u=-1,h="";-1!==(u=e.indexOf(c,u+1));){var d=o(t.substring(n),e.substring(u)),f=a(t.substring(0,n),e.substring(0,u));h.length<f+d&&(h=e.substring(u-f,u)+e.substring(u,u+d),r=t.substring(0,n-f),i=t.substring(n+d),s=e.substring(0,u-f),l=e.substring(u+d))}return 2*h.length>=t.length?[r,i,s,l,h]:null}var s,l,c,u,h,d=i(n,r,Math.ceil(n.length/4)),f=i(n,r,Math.ceil(n.length/2));return d||f?(s=f?d&&d[4].length>f[4].length?d:f:d,t.length>e.length?(l=s[0],c=s[1],u=s[2],h=s[3]):(u=s[0],h=s[1],l=s[2],c=s[3]),[l,c,u,h,s[4]]):null}(t,l);if(f){var p=f[0],g=f[1],m=f[2],b=f[3],y=f[4],v=i(p,m),A=i(g,b);return v.concat([[r,y]],A)}return function(t,r){for(var i=t.length,o=r.length,l=Math.ceil((i+o)/2),a=l,c=2*l,u=new Array(c),h=new Array(c),d=0;d<c;d++)u[d]=-1,h[d]=-1;u[a+1]=0,h[a+1]=0;for(var f=i-o,p=f%2!=0,g=0,m=0,b=0,y=0,v=0;v<l;v++){for(var A=-v+g;A<=v-m;A+=2){for(var x=a+A,N=(_=A===-v||A!==v&&u[x-1]<u[x+1]?u[x+1]:u[x-1]+1)-A;_<i&&N<o&&t.charAt(_)===r.charAt(N);)_++,N++;if(u[x]=_,_>i)m+=2;else if(N>o)g+=2;else if(p&&(q=a+f-A)>=0&&q<c&&-1!==h[q]&&_>=(w=i-h[q]))return s(t,r,_,N)}for(var E=-v+b;E<=v-y;E+=2){for(var w,q=a+E,k=(w=E===-v||E!==v&&h[q-1]<h[q+1]?h[q+1]:h[q-1]+1)-E;w<i&&k<o&&t.charAt(i-w-1)===r.charAt(o-k-1);)w++,k++;if(h[q]=w,w>i)y+=2;else if(k>o)b+=2;else if(!p){var _;if((x=a+f-E)>=0&&x<c&&-1!==u[x])if(N=a+(_=u[x])-x,_>=(w=i-w))return s(t,r,_,N)}}}return[[e,t],[n,r]]}(t,l)}(t=t.substring(0,t.length-x),g=g.substring(0,g.length-x));return N&&w.unshift([r,N]),E&&w.push([r,E]),p(w,y),b&&function(t){for(var i=!1,s=[],o=0,g=null,m=0,b=0,y=0,v=0,A=0;m<t.length;)t[m][0]==r?(s[o++]=m,b=v,y=A,v=0,A=0,g=t[m][1]):(t[m][0]==n?v+=t[m][1].length:A+=t[m][1].length,g&&g.length<=Math.max(b,y)&&g.length<=Math.max(v,A)&&(t.splice(s[o-1],0,[e,g]),t[s[o-1]+1][0]=n,o--,m=--o>0?s[o-1]:-1,b=0,y=0,v=0,A=0,g=null,i=!0)),m++;for(i&&p(t),function(t){function e(t,e){if(!t||!e)return 6;var n=t.charAt(t.length-1),r=e.charAt(0),i=n.match(c),s=r.match(c),o=i&&n.match(u),l=s&&r.match(u),a=o&&n.match(h),p=l&&r.match(h),g=a&&t.match(d),m=p&&e.match(f);return g||m?5:a||p?4:i&&!o&&l?3:o||l?2:i||s?1:0}for(var n=1;n<t.length-1;){if(t[n-1][0]==r&&t[n+1][0]==r){var i=t[n-1][1],s=t[n][1],o=t[n+1][1],l=a(i,s);if(l){var p=s.substring(s.length-l);i=i.substring(0,i.length-l),s=p+s.substring(0,s.length-l),o=p+o}for(var g=i,m=s,b=o,y=e(i,s)+e(s,o);s.charAt(0)===o.charAt(0);){i+=s.charAt(0),s=s.substring(1)+o.charAt(0),o=o.substring(1);var v=e(i,s)+e(s,o);v>=y&&(y=v,g=i,m=s,b=o)}t[n-1][1]!=g&&(g?t[n-1][1]=g:(t.splice(n-1,1),n--),t[n][1]=m,b?t[n+1][1]=b:(t.splice(n+1,1),n--))}n++}}(t),m=1;m<t.length;){if(t[m-1][0]==e&&t[m][0]==n){var x=t[m-1][1],N=t[m][1],E=l(x,N),w=l(N,x);E>=w?(E>=x.length/2||E>=N.length/2)&&(t.splice(m,0,[r,N.substring(0,E)]),t[m-1][1]=x.substring(0,x.length-E),t[m+1][1]=N.substring(E),m++):(w>=x.length/2||w>=N.length/2)&&(t.splice(m,0,[r,x.substring(0,w)]),t[m-1][0]=n,t[m-1][1]=N.substring(0,N.length-w),t[m+1][0]=e,t[m+1][1]=x.substring(w),m++),m++}m++}}(w),w}function s(t,e,n,r){var s=t.substring(0,n),o=e.substring(0,r),l=t.substring(n),a=e.substring(r),c=i(s,o),u=i(l,a);return c.concat(u)}function o(t,e){if(!t||!e||t.charAt(0)!==e.charAt(0))return 0;for(var n=0,r=Math.min(t.length,e.length),i=r,s=0;n<i;)t.substring(s,i)==e.substring(s,i)?s=n=i:r=i,i=Math.floor((r-n)/2+n);return g(t.charCodeAt(i-1))&&i--,i}function l(t,e){var n=t.length,r=e.length;if(0==n||0==r)return 0;n>r?t=t.substring(n-r):n<r&&(e=e.substring(0,n));var i=Math.min(n,r);if(t==e)return i;for(var s=0,o=1;;){var l=t.substring(i-o),a=e.indexOf(l);if(-1==a)return s;o+=a,0!=a&&t.substring(i-o)!=e.substring(0,o)||(s=o,o++)}}function a(t,e){if(!t||!e||t.slice(-1)!==e.slice(-1))return 0;for(var n=0,r=Math.min(t.length,e.length),i=r,s=0;n<i;)t.substring(t.length-i,t.length-s)==e.substring(e.length-i,e.length-s)?s=n=i:r=i,i=Math.floor((r-n)/2+n);return m(t.charCodeAt(t.length-i))&&i--,i}var c=/[^a-zA-Z0-9]/,u=/\s/,h=/[\r\n]/,d=/\n\r?\n$/,f=/^\r?\n\r?\n/;function p(t,i){t.push([r,""]);for(var s,l=0,c=0,u=0,h="",d="";l<t.length;)if(l<t.length-1&&!t[l][1])t.splice(l,1);else switch(t[l][0]){case n:u++,d+=t[l][1],l++;break;case e:c++,h+=t[l][1],l++;break;case r:var f=l-u-c-1;if(i){if(f>=0&&y(t[f][1])){var g=t[f][1].slice(-1);if(t[f][1]=t[f][1].slice(0,-1),h=g+h,d=g+d,!t[f][1]){t.splice(f,1),l--;var m=f-1;t[m]&&t[m][0]===n&&(u++,d=t[m][1]+d,m--),t[m]&&t[m][0]===e&&(c++,h=t[m][1]+h,m--),f=m}}b(t[l][1])&&(g=t[l][1].charAt(0),t[l][1]=t[l][1].slice(1),h+=g,d+=g)}if(l<t.length-1&&!t[l][1]){t.splice(l,1);break}if(h.length>0||d.length>0){h.length>0&&d.length>0&&(0!==(s=o(d,h))&&(f>=0?t[f][1]+=d.substring(0,s):(t.splice(0,0,[r,d.substring(0,s)]),l++),d=d.substring(s),h=h.substring(s)),0!==(s=a(d,h))&&(t[l][1]=d.substring(d.length-s)+t[l][1],d=d.substring(0,d.length-s),h=h.substring(0,h.length-s)));var v=u+c;0===h.length&&0===d.length?(t.splice(l-v,v),l-=v):0===h.length?(t.splice(l-v,v,[n,d]),l=l-v+1):0===d.length?(t.splice(l-v,v,[e,h]),l=l-v+1):(t.splice(l-v,v,[e,h],[n,d]),l=l-v+2)}0!==l&&t[l-1][0]===r?(t[l-1][1]+=t[l][1],t.splice(l,1)):l++,u=0,c=0,h="",d=""}""===t[t.length-1][1]&&t.pop();var A=!1;for(l=1;l<t.length-1;)t[l-1][0]===r&&t[l+1][0]===r&&(t[l][1].substring(t[l][1].length-t[l-1][1].length)===t[l-1][1]?(t[l][1]=t[l-1][1]+t[l][1].substring(0,t[l][1].length-t[l-1][1].length),t[l+1][1]=t[l-1][1]+t[l+1][1],t.splice(l-1,1),A=!0):t[l][1].substring(0,t[l+1][1].length)==t[l+1][1]&&(t[l-1][1]+=t[l+1][1],t[l][1]=t[l][1].substring(t[l+1][1].length)+t[l+1][1],t.splice(l+1,1),A=!0)),l++;A&&p(t,i)}function g(t){return t>=55296&&t<=56319}function m(t){return t>=56320&&t<=57343}function b(t){return m(t.charCodeAt(0))}function y(t){return g(t.charCodeAt(t.length-1))}function v(t,i,s,o){return y(t)||b(o)?null:function(t){for(var e=[],n=0;n<t.length;n++)t[n][1].length>0&&e.push(t[n]);return e}([[r,t],[e,i],[n,s],[r,o]])}function A(t,e,n,r){return i(t,e,n,r,!0)}A.INSERT=n,A.DELETE=e,A.EQUAL=r,t.exports=A},9629:function(t,e,n){t=n.nmd(t);var r="__lodash_hash_undefined__",i=9007199254740991,s="[object Arguments]",o="[object Boolean]",l="[object Date]",a="[object Function]",c="[object GeneratorFunction]",u="[object Map]",h="[object Number]",d="[object Object]",f="[object Promise]",p="[object RegExp]",g="[object Set]",m="[object String]",b="[object Symbol]",y="[object WeakMap]",v="[object ArrayBuffer]",A="[object DataView]",x="[object Float32Array]",N="[object Float64Array]",E="[object Int8Array]",w="[object Int16Array]",q="[object Int32Array]",k="[object Uint8Array]",_="[object Uint8ClampedArray]",L="[object Uint16Array]",S="[object Uint32Array]",O=/\w*$/,T=/^\[object .+?Constructor\]$/,j=/^(?:0|[1-9]\d*)$/,C={};C[s]=C["[object Array]"]=C[v]=C[A]=C[o]=C[l]=C[x]=C[N]=C[E]=C[w]=C[q]=C[u]=C[h]=C[d]=C[p]=C[g]=C[m]=C[b]=C[k]=C[_]=C[L]=C[S]=!0,C["[object Error]"]=C[a]=C[y]=!1;var R="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g,I="object"==typeof self&&self&&self.Object===Object&&self,B=R||I||Function("return this")(),M=e&&!e.nodeType&&e,U=M&&t&&!t.nodeType&&t,D=U&&U.exports===M;function P(t,e){return t.set(e[0],e[1]),t}function z(t,e){return t.add(e),t}function F(t,e,n,r){var i=-1,s=t?t.length:0;for(r&&s&&(n=t[++i]);++i<s;)n=e(n,t[i],i,t);return n}function H(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function $(t){var e=-1,n=Array(t.size);return t.forEach((function(t,r){n[++e]=[r,t]})),n}function V(t,e){return function(n){return t(e(n))}}function K(t){var e=-1,n=Array(t.size);return t.forEach((function(t){n[++e]=t})),n}var W,Z=Array.prototype,G=Function.prototype,X=Object.prototype,Q=B["__core-js_shared__"],J=(W=/[^.]+$/.exec(Q&&Q.keys&&Q.keys.IE_PROTO||""))?"Symbol(src)_1."+W:"",Y=G.toString,tt=X.hasOwnProperty,et=X.toString,nt=RegExp("^"+Y.call(tt).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),rt=D?B.Buffer:void 0,it=B.Symbol,st=B.Uint8Array,ot=V(Object.getPrototypeOf,Object),lt=Object.create,at=X.propertyIsEnumerable,ct=Z.splice,ut=Object.getOwnPropertySymbols,ht=rt?rt.isBuffer:void 0,dt=V(Object.keys,Object),ft=Bt(B,"DataView"),pt=Bt(B,"Map"),gt=Bt(B,"Promise"),mt=Bt(B,"Set"),bt=Bt(B,"WeakMap"),yt=Bt(Object,"create"),vt=zt(ft),At=zt(pt),xt=zt(gt),Nt=zt(mt),Et=zt(bt),wt=it?it.prototype:void 0,qt=wt?wt.valueOf:void 0;function kt(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function _t(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function Lt(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function St(t){this.__data__=new _t(t)}function Ot(t,e,n){var r=t[e];tt.call(t,e)&&Ft(r,n)&&(void 0!==n||e in t)||(t[e]=n)}function Tt(t,e){for(var n=t.length;n--;)if(Ft(t[n][0],e))return n;return-1}function jt(t,e,n,r,i,f,y){var T;if(r&&(T=f?r(t,i,f,y):r(t)),void 0!==T)return T;if(!Wt(t))return t;var j=Ht(t);if(j){if(T=function(t){var e=t.length,n=t.constructor(e);return e&&"string"==typeof t[0]&&tt.call(t,"index")&&(n.index=t.index,n.input=t.input),n}(t),!e)return function(t,e){var n=-1,r=t.length;for(e||(e=Array(r));++n<r;)e[n]=t[n];return e}(t,T)}else{var R=Ut(t),I=R==a||R==c;if(Vt(t))return function(t,e){if(e)return t.slice();var n=new t.constructor(t.length);return t.copy(n),n}(t,e);if(R==d||R==s||I&&!f){if(H(t))return f?t:{};if(T=function(t){return"function"!=typeof t.constructor||Pt(t)?{}:Wt(e=ot(t))?lt(e):{};var e}(I?{}:t),!e)return function(t,e){return Rt(t,Mt(t),e)}(t,function(t,e){return t&&Rt(e,Zt(e),t)}(T,t))}else{if(!C[R])return f?t:{};T=function(t,e,n,r){var i,s=t.constructor;switch(e){case v:return Ct(t);case o:case l:return new s(+t);case A:return function(t,e){var n=e?Ct(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.byteLength)}(t,r);case x:case N:case E:case w:case q:case k:case _:case L:case S:return function(t,e){var n=e?Ct(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)}(t,r);case u:return function(t,e,n){return F(e?n($(t),!0):$(t),P,new t.constructor)}(t,r,n);case h:case m:return new s(t);case p:return function(t){var e=new t.constructor(t.source,O.exec(t));return e.lastIndex=t.lastIndex,e}(t);case g:return function(t,e,n){return F(e?n(K(t),!0):K(t),z,new t.constructor)}(t,r,n);case b:return i=t,qt?Object(qt.call(i)):{}}}(t,R,jt,e)}}y||(y=new St);var B=y.get(t);if(B)return B;if(y.set(t,T),!j)var M=n?function(t){return function(t,e,n){var r=e(t);return Ht(t)?r:function(t,e){for(var n=-1,r=e.length,i=t.length;++n<r;)t[i+n]=e[n];return t}(r,n(t))}(t,Zt,Mt)}(t):Zt(t);return function(t,e){for(var n=-1,r=t?t.length:0;++n<r&&!1!==e(t[n],n););}(M||t,(function(i,s){M&&(i=t[s=i]),Ot(T,s,jt(i,e,n,r,s,t,y))})),T}function Ct(t){var e=new t.constructor(t.byteLength);return new st(e).set(new st(t)),e}function Rt(t,e,n,r){n||(n={});for(var i=-1,s=e.length;++i<s;){var o=e[i],l=r?r(n[o],t[o],o,n,t):void 0;Ot(n,o,void 0===l?t[o]:l)}return n}function It(t,e){var n,r,i=t.__data__;return("string"==(r=typeof(n=e))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?i["string"==typeof e?"string":"hash"]:i.map}function Bt(t,e){var n=function(t,e){return null==t?void 0:t[e]}(t,e);return function(t){return!(!Wt(t)||(e=t,J&&J in e))&&(Kt(t)||H(t)?nt:T).test(zt(t));var e}(n)?n:void 0}kt.prototype.clear=function(){this.__data__=yt?yt(null):{}},kt.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},kt.prototype.get=function(t){var e=this.__data__;if(yt){var n=e[t];return n===r?void 0:n}return tt.call(e,t)?e[t]:void 0},kt.prototype.has=function(t){var e=this.__data__;return yt?void 0!==e[t]:tt.call(e,t)},kt.prototype.set=function(t,e){return this.__data__[t]=yt&&void 0===e?r:e,this},_t.prototype.clear=function(){this.__data__=[]},_t.prototype.delete=function(t){var e=this.__data__,n=Tt(e,t);return!(n<0||(n==e.length-1?e.pop():ct.call(e,n,1),0))},_t.prototype.get=function(t){var e=this.__data__,n=Tt(e,t);return n<0?void 0:e[n][1]},_t.prototype.has=function(t){return Tt(this.__data__,t)>-1},_t.prototype.set=function(t,e){var n=this.__data__,r=Tt(n,t);return r<0?n.push([t,e]):n[r][1]=e,this},Lt.prototype.clear=function(){this.__data__={hash:new kt,map:new(pt||_t),string:new kt}},Lt.prototype.delete=function(t){return It(this,t).delete(t)},Lt.prototype.get=function(t){return It(this,t).get(t)},Lt.prototype.has=function(t){return It(this,t).has(t)},Lt.prototype.set=function(t,e){return It(this,t).set(t,e),this},St.prototype.clear=function(){this.__data__=new _t},St.prototype.delete=function(t){return this.__data__.delete(t)},St.prototype.get=function(t){return this.__data__.get(t)},St.prototype.has=function(t){return this.__data__.has(t)},St.prototype.set=function(t,e){var n=this.__data__;if(n instanceof _t){var r=n.__data__;if(!pt||r.length<199)return r.push([t,e]),this;n=this.__data__=new Lt(r)}return n.set(t,e),this};var Mt=ut?V(ut,Object):function(){return[]},Ut=function(t){return et.call(t)};function Dt(t,e){return!!(e=null==e?i:e)&&("number"==typeof t||j.test(t))&&t>-1&&t%1==0&&t<e}function Pt(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||X)}function zt(t){if(null!=t){try{return Y.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function Ft(t,e){return t===e||t!=t&&e!=e}(ft&&Ut(new ft(new ArrayBuffer(1)))!=A||pt&&Ut(new pt)!=u||gt&&Ut(gt.resolve())!=f||mt&&Ut(new mt)!=g||bt&&Ut(new bt)!=y)&&(Ut=function(t){var e=et.call(t),n=e==d?t.constructor:void 0,r=n?zt(n):void 0;if(r)switch(r){case vt:return A;case At:return u;case xt:return f;case Nt:return g;case Et:return y}return e});var Ht=Array.isArray;function $t(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=i}(t.length)&&!Kt(t)}var Vt=ht||function(){return!1};function Kt(t){var e=Wt(t)?et.call(t):"";return e==a||e==c}function Wt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function Zt(t){return $t(t)?function(t,e){var n=Ht(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&$t(t)}(t)&&tt.call(t,"callee")&&(!at.call(t,"callee")||et.call(t)==s)}(t)?function(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}(t.length,String):[],r=n.length,i=!!r;for(var o in t)!e&&!tt.call(t,o)||i&&("length"==o||Dt(o,r))||n.push(o);return n}(t):function(t){if(!Pt(t))return dt(t);var e=[];for(var n in Object(t))tt.call(t,n)&&"constructor"!=n&&e.push(n);return e}(t)}t.exports=function(t){return jt(t,!0,!0)}},4162:function(t,e,n){t=n.nmd(t);var r="__lodash_hash_undefined__",i=1,s=2,o=9007199254740991,l="[object Arguments]",a="[object Array]",c="[object AsyncFunction]",u="[object Boolean]",h="[object Date]",d="[object Error]",f="[object Function]",p="[object GeneratorFunction]",g="[object Map]",m="[object Number]",b="[object Null]",y="[object Object]",v="[object Promise]",A="[object Proxy]",x="[object RegExp]",N="[object Set]",E="[object String]",w="[object Undefined]",q="[object WeakMap]",k="[object ArrayBuffer]",_="[object DataView]",L=/^\[object .+?Constructor\]$/,S=/^(?:0|[1-9]\d*)$/,O={};O["[object Float32Array]"]=O["[object Float64Array]"]=O["[object Int8Array]"]=O["[object Int16Array]"]=O["[object Int32Array]"]=O["[object Uint8Array]"]=O["[object Uint8ClampedArray]"]=O["[object Uint16Array]"]=O["[object Uint32Array]"]=!0,O[l]=O[a]=O[k]=O[u]=O[_]=O[h]=O[d]=O[f]=O[g]=O[m]=O[y]=O[x]=O[N]=O[E]=O[q]=!1;var T="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g,j="object"==typeof self&&self&&self.Object===Object&&self,C=T||j||Function("return this")(),R=e&&!e.nodeType&&e,I=R&&t&&!t.nodeType&&t,B=I&&I.exports===R,M=B&&T.process,U=function(){try{return M&&M.binding&&M.binding("util")}catch(t){}}(),D=U&&U.isTypedArray;function P(t,e){for(var n=-1,r=null==t?0:t.length;++n<r;)if(e(t[n],n,t))return!0;return!1}function z(t){var e=-1,n=Array(t.size);return t.forEach((function(t,r){n[++e]=[r,t]})),n}function F(t){var e=-1,n=Array(t.size);return t.forEach((function(t){n[++e]=t})),n}var H,$,V,K=Array.prototype,W=Function.prototype,Z=Object.prototype,G=C["__core-js_shared__"],X=W.toString,Q=Z.hasOwnProperty,J=(H=/[^.]+$/.exec(G&&G.keys&&G.keys.IE_PROTO||""))?"Symbol(src)_1."+H:"",Y=Z.toString,tt=RegExp("^"+X.call(Q).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),et=B?C.Buffer:void 0,nt=C.Symbol,rt=C.Uint8Array,it=Z.propertyIsEnumerable,st=K.splice,ot=nt?nt.toStringTag:void 0,lt=Object.getOwnPropertySymbols,at=et?et.isBuffer:void 0,ct=($=Object.keys,V=Object,function(t){return $(V(t))}),ut=It(C,"DataView"),ht=It(C,"Map"),dt=It(C,"Promise"),ft=It(C,"Set"),pt=It(C,"WeakMap"),gt=It(Object,"create"),mt=Dt(ut),bt=Dt(ht),yt=Dt(dt),vt=Dt(ft),At=Dt(pt),xt=nt?nt.prototype:void 0,Nt=xt?xt.valueOf:void 0;function Et(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function wt(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function qt(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function kt(t){var e=-1,n=null==t?0:t.length;for(this.__data__=new qt;++e<n;)this.add(t[e])}function _t(t){var e=this.__data__=new wt(t);this.size=e.size}function Lt(t,e){for(var n=t.length;n--;)if(Pt(t[n][0],e))return n;return-1}function St(t){return null==t?void 0===t?w:b:ot&&ot in Object(t)?function(t){var e=Q.call(t,ot),n=t[ot];try{t[ot]=void 0;var r=!0}catch(t){}var i=Y.call(t);return r&&(e?t[ot]=n:delete t[ot]),i}(t):function(t){return Y.call(t)}(t)}function Ot(t){return Wt(t)&&St(t)==l}function Tt(t,e,n,r,o){return t===e||(null==t||null==e||!Wt(t)&&!Wt(e)?t!=t&&e!=e:function(t,e,n,r,o,c){var f=Ft(t),p=Ft(e),b=f?a:Mt(t),v=p?a:Mt(e),A=(b=b==l?y:b)==y,w=(v=v==l?y:v)==y,q=b==v;if(q&&Ht(t)){if(!Ht(e))return!1;f=!0,A=!1}if(q&&!A)return c||(c=new _t),f||Zt(t)?jt(t,e,n,r,o,c):function(t,e,n,r,o,l,a){switch(n){case _:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case k:return!(t.byteLength!=e.byteLength||!l(new rt(t),new rt(e)));case u:case h:case m:return Pt(+t,+e);case d:return t.name==e.name&&t.message==e.message;case x:case E:return t==e+"";case g:var c=z;case N:var f=r&i;if(c||(c=F),t.size!=e.size&&!f)return!1;var p=a.get(t);if(p)return p==e;r|=s,a.set(t,e);var b=jt(c(t),c(e),r,o,l,a);return a.delete(t),b;case"[object Symbol]":if(Nt)return Nt.call(t)==Nt.call(e)}return!1}(t,e,b,n,r,o,c);if(!(n&i)){var L=A&&Q.call(t,"__wrapped__"),S=w&&Q.call(e,"__wrapped__");if(L||S){var O=L?t.value():t,T=S?e.value():e;return c||(c=new _t),o(O,T,n,r,c)}}return!!q&&(c||(c=new _t),function(t,e,n,r,s,o){var l=n&i,a=Ct(t),c=a.length;if(c!=Ct(e).length&&!l)return!1;for(var u=c;u--;){var h=a[u];if(!(l?h in e:Q.call(e,h)))return!1}var d=o.get(t);if(d&&o.get(e))return d==e;var f=!0;o.set(t,e),o.set(e,t);for(var p=l;++u<c;){var g=t[h=a[u]],m=e[h];if(r)var b=l?r(m,g,h,e,t,o):r(g,m,h,t,e,o);if(!(void 0===b?g===m||s(g,m,n,r,o):b)){f=!1;break}p||(p="constructor"==h)}if(f&&!p){var y=t.constructor,v=e.constructor;y==v||!("constructor"in t)||!("constructor"in e)||"function"==typeof y&&y instanceof y&&"function"==typeof v&&v instanceof v||(f=!1)}return o.delete(t),o.delete(e),f}(t,e,n,r,o,c))}(t,e,n,r,Tt,o))}function jt(t,e,n,r,o,l){var a=n&i,c=t.length,u=e.length;if(c!=u&&!(a&&u>c))return!1;var h=l.get(t);if(h&&l.get(e))return h==e;var d=-1,f=!0,p=n&s?new kt:void 0;for(l.set(t,e),l.set(e,t);++d<c;){var g=t[d],m=e[d];if(r)var b=a?r(m,g,d,e,t,l):r(g,m,d,t,e,l);if(void 0!==b){if(b)continue;f=!1;break}if(p){if(!P(e,(function(t,e){if(i=e,!p.has(i)&&(g===t||o(g,t,n,r,l)))return p.push(e);var i}))){f=!1;break}}else if(g!==m&&!o(g,m,n,r,l)){f=!1;break}}return l.delete(t),l.delete(e),f}function Ct(t){return function(t,e,n){var r=e(t);return Ft(t)?r:function(t,e){for(var n=-1,r=e.length,i=t.length;++n<r;)t[i+n]=e[n];return t}(r,n(t))}(t,Gt,Bt)}function Rt(t,e){var n,r,i=t.__data__;return("string"==(r=typeof(n=e))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?i["string"==typeof e?"string":"hash"]:i.map}function It(t,e){var n=function(t,e){return null==t?void 0:t[e]}(t,e);return function(t){return!(!Kt(t)||function(t){return!!J&&J in t}(t))&&($t(t)?tt:L).test(Dt(t))}(n)?n:void 0}Et.prototype.clear=function(){this.__data__=gt?gt(null):{},this.size=0},Et.prototype.delete=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},Et.prototype.get=function(t){var e=this.__data__;if(gt){var n=e[t];return n===r?void 0:n}return Q.call(e,t)?e[t]:void 0},Et.prototype.has=function(t){var e=this.__data__;return gt?void 0!==e[t]:Q.call(e,t)},Et.prototype.set=function(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=gt&&void 0===e?r:e,this},wt.prototype.clear=function(){this.__data__=[],this.size=0},wt.prototype.delete=function(t){var e=this.__data__,n=Lt(e,t);return!(n<0||(n==e.length-1?e.pop():st.call(e,n,1),--this.size,0))},wt.prototype.get=function(t){var e=this.__data__,n=Lt(e,t);return n<0?void 0:e[n][1]},wt.prototype.has=function(t){return Lt(this.__data__,t)>-1},wt.prototype.set=function(t,e){var n=this.__data__,r=Lt(n,t);return r<0?(++this.size,n.push([t,e])):n[r][1]=e,this},qt.prototype.clear=function(){this.size=0,this.__data__={hash:new Et,map:new(ht||wt),string:new Et}},qt.prototype.delete=function(t){var e=Rt(this,t).delete(t);return this.size-=e?1:0,e},qt.prototype.get=function(t){return Rt(this,t).get(t)},qt.prototype.has=function(t){return Rt(this,t).has(t)},qt.prototype.set=function(t,e){var n=Rt(this,t),r=n.size;return n.set(t,e),this.size+=n.size==r?0:1,this},kt.prototype.add=kt.prototype.push=function(t){return this.__data__.set(t,r),this},kt.prototype.has=function(t){return this.__data__.has(t)},_t.prototype.clear=function(){this.__data__=new wt,this.size=0},_t.prototype.delete=function(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n},_t.prototype.get=function(t){return this.__data__.get(t)},_t.prototype.has=function(t){return this.__data__.has(t)},_t.prototype.set=function(t,e){var n=this.__data__;if(n instanceof wt){var r=n.__data__;if(!ht||r.length<199)return r.push([t,e]),this.size=++n.size,this;n=this.__data__=new qt(r)}return n.set(t,e),this.size=n.size,this};var Bt=lt?function(t){return null==t?[]:(t=Object(t),function(e,n){for(var r=-1,i=null==e?0:e.length,s=0,o=[];++r<i;){var l=e[r];a=l,it.call(t,a)&&(o[s++]=l)}var a;return o}(lt(t)))}:function(){return[]},Mt=St;function Ut(t,e){return!!(e=null==e?o:e)&&("number"==typeof t||S.test(t))&&t>-1&&t%1==0&&t<e}function Dt(t){if(null!=t){try{return X.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function Pt(t,e){return t===e||t!=t&&e!=e}(ut&&Mt(new ut(new ArrayBuffer(1)))!=_||ht&&Mt(new ht)!=g||dt&&Mt(dt.resolve())!=v||ft&&Mt(new ft)!=N||pt&&Mt(new pt)!=q)&&(Mt=function(t){var e=St(t),n=e==y?t.constructor:void 0,r=n?Dt(n):"";if(r)switch(r){case mt:return _;case bt:return g;case yt:return v;case vt:return N;case At:return q}return e});var zt=Ot(function(){return arguments}())?Ot:function(t){return Wt(t)&&Q.call(t,"callee")&&!it.call(t,"callee")},Ft=Array.isArray,Ht=at||function(){return!1};function $t(t){if(!Kt(t))return!1;var e=St(t);return e==f||e==p||e==c||e==A}function Vt(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=o}function Kt(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}function Wt(t){return null!=t&&"object"==typeof t}var Zt=D?function(t){return function(e){return t(e)}}(D):function(t){return Wt(t)&&Vt(t.length)&&!!O[St(t)]};function Gt(t){return null!=(e=t)&&Vt(e.length)&&!$t(e)?function(t,e){var n=Ft(t),r=!n&&zt(t),i=!n&&!r&&Ht(t),s=!n&&!r&&!i&&Zt(t),o=n||r||i||s,l=o?function(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}(t.length,String):[],a=l.length;for(var c in t)!e&&!Q.call(t,c)||o&&("length"==c||i&&("offset"==c||"parent"==c)||s&&("buffer"==c||"byteLength"==c||"byteOffset"==c)||Ut(c,a))||l.push(c);return l}(t):function(t){if(n=(e=t)&&e.constructor,e!==("function"==typeof n&&n.prototype||Z))return ct(t);var e,n,r=[];for(var i in Object(t))Q.call(t,i)&&"constructor"!=i&&r.push(i);return r}(t);var e}t.exports=function(t,e){return Tt(t,e)}},1270:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=n(9629),i=n(4162);var s;!function(t){t.compose=function(t={},e={},n=!1){"object"!=typeof t&&(t={}),"object"!=typeof e&&(e={});let i=r(e);n||(i=Object.keys(i).reduce(((t,e)=>(null!=i[e]&&(t[e]=i[e]),t)),{}));for(const n in t)void 0!==t[n]&&void 0===e[n]&&(i[n]=t[n]);return Object.keys(i).length>0?i:void 0},t.diff=function(t={},e={}){"object"!=typeof t&&(t={}),"object"!=typeof e&&(e={});const n=Object.keys(t).concat(Object.keys(e)).reduce(((n,r)=>(i(t[r],e[r])||(n[r]=void 0===e[r]?null:e[r]),n)),{});return Object.keys(n).length>0?n:void 0},t.invert=function(t={},e={}){t=t||{};const n=Object.keys(e).reduce(((n,r)=>(e[r]!==t[r]&&void 0!==t[r]&&(n[r]=e[r]),n)),{});return Object.keys(t).reduce(((n,r)=>(t[r]!==e[r]&&void 0===e[r]&&(n[r]=null),n)),n)},t.transform=function(t,e,n=!1){if("object"!=typeof t)return e;if("object"!=typeof e)return;if(!n)return e;const r=Object.keys(e).reduce(((n,r)=>(void 0===t[r]&&(n[r]=e[r]),n)),{});return Object.keys(r).length>0?r:void 0}}(s||(s={})),e.default=s},5232:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.AttributeMap=e.OpIterator=e.Op=void 0;const r=n(5090),i=n(9629),s=n(4162),o=n(1270);e.AttributeMap=o.default;const l=n(4123);e.Op=l.default;const a=n(7033);e.OpIterator=a.default;const c=String.fromCharCode(0),u=(t,e)=>{if("object"!=typeof t||null===t)throw new Error("cannot retain a "+typeof t);if("object"!=typeof e||null===e)throw new Error("cannot retain a "+typeof e);const n=Object.keys(t)[0];if(!n||n!==Object.keys(e)[0])throw new Error(`embed types not matched: ${n} != ${Object.keys(e)[0]}`);return[n,t[n],e[n]]};class h{constructor(t){Array.isArray(t)?this.ops=t:null!=t&&Array.isArray(t.ops)?this.ops=t.ops:this.ops=[]}static registerEmbed(t,e){this.handlers[t]=e}static unregisterEmbed(t){delete this.handlers[t]}static getHandler(t){const e=this.handlers[t];if(!e)throw new Error(`no handlers for embed type "${t}"`);return e}insert(t,e){const n={};return"string"==typeof t&&0===t.length?this:(n.insert=t,null!=e&&"object"==typeof e&&Object.keys(e).length>0&&(n.attributes=e),this.push(n))}delete(t){return t<=0?this:this.push({delete:t})}retain(t,e){if("number"==typeof t&&t<=0)return this;const n={retain:t};return null!=e&&"object"==typeof e&&Object.keys(e).length>0&&(n.attributes=e),this.push(n)}push(t){let e=this.ops.length,n=this.ops[e-1];if(t=i(t),"object"==typeof n){if("number"==typeof t.delete&&"number"==typeof n.delete)return this.ops[e-1]={delete:n.delete+t.delete},this;if("number"==typeof n.delete&&null!=t.insert&&(e-=1,n=this.ops[e-1],"object"!=typeof n))return this.ops.unshift(t),this;if(s(t.attributes,n.attributes)){if("string"==typeof t.insert&&"string"==typeof n.insert)return this.ops[e-1]={insert:n.insert+t.insert},"object"==typeof t.attributes&&(this.ops[e-1].attributes=t.attributes),this;if("number"==typeof t.retain&&"number"==typeof n.retain)return this.ops[e-1]={retain:n.retain+t.retain},"object"==typeof t.attributes&&(this.ops[e-1].attributes=t.attributes),this}}return e===this.ops.length?this.ops.push(t):this.ops.splice(e,0,t),this}chop(){const t=this.ops[this.ops.length-1];return t&&"number"==typeof t.retain&&!t.attributes&&this.ops.pop(),this}filter(t){return this.ops.filter(t)}forEach(t){this.ops.forEach(t)}map(t){return this.ops.map(t)}partition(t){const e=[],n=[];return this.forEach((r=>{(t(r)?e:n).push(r)})),[e,n]}reduce(t,e){return this.ops.reduce(t,e)}changeLength(){return this.reduce(((t,e)=>e.insert?t+l.default.length(e):e.delete?t-e.delete:t),0)}length(){return this.reduce(((t,e)=>t+l.default.length(e)),0)}slice(t=0,e=1/0){const n=[],r=new a.default(this.ops);let i=0;for(;i<e&&r.hasNext();){let s;i<t?s=r.next(t-i):(s=r.next(e-i),n.push(s)),i+=l.default.length(s)}return new h(n)}compose(t){const e=new a.default(this.ops),n=new a.default(t.ops),r=[],i=n.peek();if(null!=i&&"number"==typeof i.retain&&null==i.attributes){let t=i.retain;for(;"insert"===e.peekType()&&e.peekLength()<=t;)t-=e.peekLength(),r.push(e.next());i.retain-t>0&&n.next(i.retain-t)}const l=new h(r);for(;e.hasNext()||n.hasNext();)if("insert"===n.peekType())l.push(n.next());else if("delete"===e.peekType())l.push(e.next());else{const t=Math.min(e.peekLength(),n.peekLength()),r=e.next(t),i=n.next(t);if(i.retain){const a={};if("number"==typeof r.retain)a.retain="number"==typeof i.retain?t:i.retain;else if("number"==typeof i.retain)null==r.retain?a.insert=r.insert:a.retain=r.retain;else{const t=null==r.retain?"insert":"retain",[e,n,s]=u(r[t],i.retain),o=h.getHandler(e);a[t]={[e]:o.compose(n,s,"retain"===t)}}const c=o.default.compose(r.attributes,i.attributes,"number"==typeof r.retain);if(c&&(a.attributes=c),l.push(a),!n.hasNext()&&s(l.ops[l.ops.length-1],a)){const t=new h(e.rest());return l.concat(t).chop()}}else"number"==typeof i.delete&&("number"==typeof r.retain||"object"==typeof r.retain&&null!==r.retain)&&l.push(i)}return l.chop()}concat(t){const e=new h(this.ops.slice());return t.ops.length>0&&(e.push(t.ops[0]),e.ops=e.ops.concat(t.ops.slice(1))),e}diff(t,e){if(this.ops===t.ops)return new h;const n=[this,t].map((e=>e.map((n=>{if(null!=n.insert)return"string"==typeof n.insert?n.insert:c;throw new Error("diff() called "+(e===t?"on":"with")+" non-document")})).join(""))),i=new h,l=r(n[0],n[1],e,!0),u=new a.default(this.ops),d=new a.default(t.ops);return l.forEach((t=>{let e=t[1].length;for(;e>0;){let n=0;switch(t[0]){case r.INSERT:n=Math.min(d.peekLength(),e),i.push(d.next(n));break;case r.DELETE:n=Math.min(e,u.peekLength()),u.next(n),i.delete(n);break;case r.EQUAL:n=Math.min(u.peekLength(),d.peekLength(),e);const t=u.next(n),l=d.next(n);s(t.insert,l.insert)?i.retain(n,o.default.diff(t.attributes,l.attributes)):i.push(l).delete(n)}e-=n}})),i.chop()}eachLine(t,e="\n"){const n=new a.default(this.ops);let r=new h,i=0;for(;n.hasNext();){if("insert"!==n.peekType())return;const s=n.peek(),o=l.default.length(s)-n.peekLength(),a="string"==typeof s.insert?s.insert.indexOf(e,o)-o:-1;if(a<0)r.push(n.next());else if(a>0)r.push(n.next(a));else{if(!1===t(r,n.next(1).attributes||{},i))return;i+=1,r=new h}}r.length()>0&&t(r,{},i)}invert(t){const e=new h;return this.reduce(((n,r)=>{if(r.insert)e.delete(l.default.length(r));else{if("number"==typeof r.retain&&null==r.attributes)return e.retain(r.retain),n+r.retain;if(r.delete||"number"==typeof r.retain){const i=r.delete||r.retain;return t.slice(n,n+i).forEach((t=>{r.delete?e.push(t):r.retain&&r.attributes&&e.retain(l.default.length(t),o.default.invert(r.attributes,t.attributes))})),n+i}if("object"==typeof r.retain&&null!==r.retain){const i=t.slice(n,n+1),s=new a.default(i.ops).next(),[l,c,d]=u(r.retain,s.insert),f=h.getHandler(l);return e.retain({[l]:f.invert(c,d)},o.default.invert(r.attributes,s.attributes)),n+1}}return n}),0),e.chop()}transform(t,e=!1){if(e=!!e,"number"==typeof t)return this.transformPosition(t,e);const n=t,r=new a.default(this.ops),i=new a.default(n.ops),s=new h;for(;r.hasNext()||i.hasNext();)if("insert"!==r.peekType()||!e&&"insert"===i.peekType())if("insert"===i.peekType())s.push(i.next());else{const t=Math.min(r.peekLength(),i.peekLength()),n=r.next(t),l=i.next(t);if(n.delete)continue;if(l.delete)s.push(l);else{const r=n.retain,i=l.retain;let a="object"==typeof i&&null!==i?i:t;if("object"==typeof r&&null!==r&&"object"==typeof i&&null!==i){const t=Object.keys(r)[0];if(t===Object.keys(i)[0]){const n=h.getHandler(t);n&&(a={[t]:n.transform(r[t],i[t],e)})}}s.retain(a,o.default.transform(n.attributes,l.attributes,e))}}else s.retain(l.default.length(r.next()));return s.chop()}transformPosition(t,e=!1){e=!!e;const n=new a.default(this.ops);let r=0;for(;n.hasNext()&&r<=t;){const i=n.peekLength(),s=n.peekType();n.next(),"delete"!==s?("insert"===s&&(r<t||!e)&&(t+=i),r+=i):t-=Math.min(i,t-r)}return t}}h.Op=l.default,h.OpIterator=a.default,h.AttributeMap=o.default,h.handlers={},e.default=h,t.exports=h,t.exports.default=h},4123:function(t,e){"use strict";var n;Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.length=function(t){return"number"==typeof t.delete?t.delete:"number"==typeof t.retain?t.retain:"object"==typeof t.retain&&null!==t.retain?1:"string"==typeof t.insert?t.insert.length:1}}(n||(n={})),e.default=n},7033:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=n(4123);e.default=class{constructor(t){this.ops=t,this.index=0,this.offset=0}hasNext(){return this.peekLength()<1/0}next(t){t||(t=1/0);const e=this.ops[this.index];if(e){const n=this.offset,i=r.default.length(e);if(t>=i-n?(t=i-n,this.index+=1,this.offset=0):this.offset+=t,"number"==typeof e.delete)return{delete:t};{const r={};return e.attributes&&(r.attributes=e.attributes),"number"==typeof e.retain?r.retain=t:"object"==typeof e.retain&&null!==e.retain?r.retain=e.retain:"string"==typeof e.insert?r.insert=e.insert.substr(n,t):r.insert=e.insert,r}}return{retain:1/0}}peek(){return this.ops[this.index]}peekLength(){return this.ops[this.index]?r.default.length(this.ops[this.index])-this.offset:1/0}peekType(){const t=this.ops[this.index];return t?"number"==typeof t.delete?"delete":"number"==typeof t.retain||"object"==typeof t.retain&&null!==t.retain?"retain":"insert":"retain"}rest(){if(this.hasNext()){if(0===this.offset)return this.ops.slice(this.index);{const t=this.offset,e=this.index,n=this.next(),r=this.ops.slice(this.index);return this.offset=t,this.index=e,[n].concat(r)}}return[]}}},8820:function(t,e,n){"use strict";n.d(e,{A:function(){return l}});var r=n(8138),i=function(t,e){for(var n=t.length;n--;)if((0,r.A)(t[n][0],e))return n;return-1},s=Array.prototype.splice;function o(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}o.prototype.clear=function(){this.__data__=[],this.size=0},o.prototype.delete=function(t){var e=this.__data__,n=i(e,t);return!(n<0||(n==e.length-1?e.pop():s.call(e,n,1),--this.size,0))},o.prototype.get=function(t){var e=this.__data__,n=i(e,t);return n<0?void 0:e[n][1]},o.prototype.has=function(t){return i(this.__data__,t)>-1},o.prototype.set=function(t,e){var n=this.__data__,r=i(n,t);return r<0?(++this.size,n.push([t,e])):n[r][1]=e,this};var l=o},2461:function(t,e,n){"use strict";var r=n(2281),i=n(5507),s=(0,r.A)(i.A,"Map");e.A=s},3558:function(t,e,n){"use strict";n.d(e,{A:function(){return d}});var r=(0,n(2281).A)(Object,"create"),i=Object.prototype.hasOwnProperty,s=Object.prototype.hasOwnProperty;function o(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}o.prototype.clear=function(){this.__data__=r?r(null):{},this.size=0},o.prototype.delete=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},o.prototype.get=function(t){var e=this.__data__;if(r){var n=e[t];return"__lodash_hash_undefined__"===n?void 0:n}return i.call(e,t)?e[t]:void 0},o.prototype.has=function(t){var e=this.__data__;return r?void 0!==e[t]:s.call(e,t)},o.prototype.set=function(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=r&&void 0===e?"__lodash_hash_undefined__":e,this};var l=o,a=n(8820),c=n(2461),u=function(t,e){var n,r,i=t.__data__;return("string"==(r=typeof(n=e))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?i["string"==typeof e?"string":"hash"]:i.map};function h(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}h.prototype.clear=function(){this.size=0,this.__data__={hash:new l,map:new(c.A||a.A),string:new l}},h.prototype.delete=function(t){var e=u(this,t).delete(t);return this.size-=e?1:0,e},h.prototype.get=function(t){return u(this,t).get(t)},h.prototype.has=function(t){return u(this,t).has(t)},h.prototype.set=function(t,e){var n=u(this,t),r=n.size;return n.set(t,e),this.size+=n.size==r?0:1,this};var d=h},2673:function(t,e,n){"use strict";n.d(e,{A:function(){return l}});var r=n(8820),i=n(2461),s=n(3558);function o(t){var e=this.__data__=new r.A(t);this.size=e.size}o.prototype.clear=function(){this.__data__=new r.A,this.size=0},o.prototype.delete=function(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n},o.prototype.get=function(t){return this.__data__.get(t)},o.prototype.has=function(t){return this.__data__.has(t)},o.prototype.set=function(t,e){var n=this.__data__;if(n instanceof r.A){var o=n.__data__;if(!i.A||o.length<199)return o.push([t,e]),this.size=++n.size,this;n=this.__data__=new s.A(o)}return n.set(t,e),this.size=n.size,this};var l=o},439:function(t,e,n){"use strict";var r=n(5507).A.Symbol;e.A=r},7218:function(t,e,n){"use strict";var r=n(5507).A.Uint8Array;e.A=r},6753:function(t,e,n){"use strict";n.d(e,{A:function(){return c}});var r=n(8412),i=n(723),s=n(776),o=n(3767),l=n(5755),a=Object.prototype.hasOwnProperty,c=function(t,e){var n=(0,i.A)(t),c=!n&&(0,r.A)(t),u=!n&&!c&&(0,s.A)(t),h=!n&&!c&&!u&&(0,l.A)(t),d=n||c||u||h,f=d?function(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}(t.length,String):[],p=f.length;for(var g in t)!e&&!a.call(t,g)||d&&("length"==g||u&&("offset"==g||"parent"==g)||h&&("buffer"==g||"byteLength"==g||"byteOffset"==g)||(0,o.A)(g,p))||f.push(g);return f}},802:function(t,e){"use strict";e.A=function(t,e){for(var n=-1,r=e.length,i=t.length;++n<r;)t[i+n]=e[n];return t}},6437:function(t,e,n){"use strict";var r=n(6770),i=n(8138),s=Object.prototype.hasOwnProperty;e.A=function(t,e,n){var o=t[e];s.call(t,e)&&(0,i.A)(o,n)&&(void 0!==n||e in t)||(0,r.A)(t,e,n)}},6770:function(t,e,n){"use strict";var r=n(7889);e.A=function(t,e,n){"__proto__"==e&&r.A?(0,r.A)(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}},1381:function(t,e,n){"use strict";var r=n(802),i=n(723);e.A=function(t,e,n){var s=e(t);return(0,i.A)(t)?s:(0,r.A)(s,n(t))}},2159:function(t,e,n){"use strict";n.d(e,{A:function(){return u}});var r=n(439),i=Object.prototype,s=i.hasOwnProperty,o=i.toString,l=r.A?r.A.toStringTag:void 0,a=Object.prototype.toString,c=r.A?r.A.toStringTag:void 0,u=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":c&&c in Object(t)?function(t){var e=s.call(t,l),n=t[l];try{t[l]=void 0;var r=!0}catch(t){}var i=o.call(t);return r&&(e?t[l]=n:delete t[l]),i}(t):function(t){return a.call(t)}(t)}},5771:function(t,e){"use strict";e.A=function(t){return function(e){return t(e)}}},2899:function(t,e,n){"use strict";var r=n(7218);e.A=function(t){var e=new t.constructor(t.byteLength);return new r.A(e).set(new r.A(t)),e}},3812:function(t,e,n){"use strict";var r=n(5507),i="object"==typeof exports&&exports&&!exports.nodeType&&exports,s=i&&"object"==typeof module&&module&&!module.nodeType&&module,o=s&&s.exports===i?r.A.Buffer:void 0,l=o?o.allocUnsafe:void 0;e.A=function(t,e){if(e)return t.slice();var n=t.length,r=l?l(n):new t.constructor(n);return t.copy(r),r}},1827:function(t,e,n){"use strict";var r=n(2899);e.A=function(t,e){var n=e?(0,r.A)(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)}},4405:function(t,e){"use strict";e.A=function(t,e){var n=-1,r=t.length;for(e||(e=Array(r));++n<r;)e[n]=t[n];return e}},9601:function(t,e,n){"use strict";var r=n(6437),i=n(6770);e.A=function(t,e,n,s){var o=!n;n||(n={});for(var l=-1,a=e.length;++l<a;){var c=e[l],u=s?s(n[c],t[c],c,n,t):void 0;void 0===u&&(u=t[c]),o?(0,i.A)(n,c,u):(0,r.A)(n,c,u)}return n}},7889:function(t,e,n){"use strict";var r=n(2281),i=function(){try{var t=(0,r.A)(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();e.A=i},9646:function(t,e){"use strict";var n="object"==typeof global&&global&&global.Object===Object&&global;e.A=n},2816:function(t,e,n){"use strict";var r=n(1381),i=n(9844),s=n(3169);e.A=function(t){return(0,r.A)(t,s.A,i.A)}},2281:function(t,e,n){"use strict";n.d(e,{A:function(){return m}});var r,i=n(7572),s=n(5507).A["__core-js_shared__"],o=(r=/[^.]+$/.exec(s&&s.keys&&s.keys.IE_PROTO||""))?"Symbol(src)_1."+r:"",l=n(659),a=n(1543),c=/^\[object .+?Constructor\]$/,u=Function.prototype,h=Object.prototype,d=u.toString,f=h.hasOwnProperty,p=RegExp("^"+d.call(f).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),g=function(t){return!(!(0,l.A)(t)||(e=t,o&&o in e))&&((0,i.A)(t)?p:c).test((0,a.A)(t));var e},m=function(t,e){var n=function(t,e){return null==t?void 0:t[e]}(t,e);return g(n)?n:void 0}},8769:function(t,e,n){"use strict";var r=(0,n(2217).A)(Object.getPrototypeOf,Object);e.A=r},9844:function(t,e,n){"use strict";n.d(e,{A:function(){return o}});var r=n(6935),i=Object.prototype.propertyIsEnumerable,s=Object.getOwnPropertySymbols,o=s?function(t){return null==t?[]:(t=Object(t),function(t,e){for(var n=-1,r=null==t?0:t.length,i=0,s=[];++n<r;){var o=t[n];e(o,n,t)&&(s[i++]=o)}return s}(s(t),(function(e){return i.call(t,e)})))}:r.A},7995:function(t,e,n){"use strict";n.d(e,{A:function(){return E}});var r=n(2281),i=n(5507),s=(0,r.A)(i.A,"DataView"),o=n(2461),l=(0,r.A)(i.A,"Promise"),a=(0,r.A)(i.A,"Set"),c=(0,r.A)(i.A,"WeakMap"),u=n(2159),h=n(1543),d="[object Map]",f="[object Promise]",p="[object Set]",g="[object WeakMap]",m="[object DataView]",b=(0,h.A)(s),y=(0,h.A)(o.A),v=(0,h.A)(l),A=(0,h.A)(a),x=(0,h.A)(c),N=u.A;(s&&N(new s(new ArrayBuffer(1)))!=m||o.A&&N(new o.A)!=d||l&&N(l.resolve())!=f||a&&N(new a)!=p||c&&N(new c)!=g)&&(N=function(t){var e=(0,u.A)(t),n="[object Object]"==e?t.constructor:void 0,r=n?(0,h.A)(n):"";if(r)switch(r){case b:return m;case y:return d;case v:return f;case A:return p;case x:return g}return e});var E=N},1683:function(t,e,n){"use strict";n.d(e,{A:function(){return a}});var r=n(659),i=Object.create,s=function(){function t(){}return function(e){if(!(0,r.A)(e))return{};if(i)return i(e);t.prototype=e;var n=new t;return t.prototype=void 0,n}}(),o=n(8769),l=n(501),a=function(t){return"function"!=typeof t.constructor||(0,l.A)(t)?{}:s((0,o.A)(t))}},3767:function(t,e){"use strict";var n=/^(?:0|[1-9]\d*)$/;e.A=function(t,e){var r=typeof t;return!!(e=null==e?9007199254740991:e)&&("number"==r||"symbol"!=r&&n.test(t))&&t>-1&&t%1==0&&t<e}},501:function(t,e){"use strict";var n=Object.prototype;e.A=function(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||n)}},8795:function(t,e,n){"use strict";var r=n(9646),i="object"==typeof exports&&exports&&!exports.nodeType&&exports,s=i&&"object"==typeof module&&module&&!module.nodeType&&module,o=s&&s.exports===i&&r.A.process,l=function(){try{return s&&s.require&&s.require("util").types||o&&o.binding&&o.binding("util")}catch(t){}}();e.A=l},2217:function(t,e){"use strict";e.A=function(t,e){return function(n){return t(e(n))}}},5507:function(t,e,n){"use strict";var r=n(9646),i="object"==typeof self&&self&&self.Object===Object&&self,s=r.A||i||Function("return this")();e.A=s},1543:function(t,e){"use strict";var n=Function.prototype.toString;e.A=function(t){if(null!=t){try{return n.call(t)}catch(t){}try{return t+""}catch(t){}}return""}},3707:function(t,e,n){"use strict";n.d(e,{A:function(){return H}});var r=n(2673),i=n(6437),s=n(9601),o=n(3169),l=n(2624),a=n(3812),c=n(4405),u=n(9844),h=n(802),d=n(8769),f=n(6935),p=Object.getOwnPropertySymbols?function(t){for(var e=[];t;)(0,h.A)(e,(0,u.A)(t)),t=(0,d.A)(t);return e}:f.A,g=n(2816),m=n(1381),b=function(t){return(0,m.A)(t,l.A,p)},y=n(7995),v=Object.prototype.hasOwnProperty,A=n(2899),x=/\w*$/,N=n(439),E=N.A?N.A.prototype:void 0,w=E?E.valueOf:void 0,q=n(1827),k=function(t,e,n){var r,i,s,o=t.constructor;switch(e){case"[object ArrayBuffer]":return(0,A.A)(t);case"[object Boolean]":case"[object Date]":return new o(+t);case"[object DataView]":return function(t,e){var n=e?(0,A.A)(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.byteLength)}(t,n);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return(0,q.A)(t,n);case"[object Map]":case"[object Set]":return new o;case"[object Number]":case"[object String]":return new o(t);case"[object RegExp]":return(s=new(i=t).constructor(i.source,x.exec(i))).lastIndex=i.lastIndex,s;case"[object Symbol]":return r=t,w?Object(w.call(r)):{}}},_=n(1683),L=n(723),S=n(776),O=n(7948),T=n(5771),j=n(8795),C=j.A&&j.A.isMap,R=C?(0,T.A)(C):function(t){return(0,O.A)(t)&&"[object Map]"==(0,y.A)(t)},I=n(659),B=j.A&&j.A.isSet,M=B?(0,T.A)(B):function(t){return(0,O.A)(t)&&"[object Set]"==(0,y.A)(t)},U="[object Arguments]",D="[object Function]",P="[object Object]",z={};z[U]=z["[object Array]"]=z["[object ArrayBuffer]"]=z["[object DataView]"]=z["[object Boolean]"]=z["[object Date]"]=z["[object Float32Array]"]=z["[object Float64Array]"]=z["[object Int8Array]"]=z["[object Int16Array]"]=z["[object Int32Array]"]=z["[object Map]"]=z["[object Number]"]=z[P]=z["[object RegExp]"]=z["[object Set]"]=z["[object String]"]=z["[object Symbol]"]=z["[object Uint8Array]"]=z["[object Uint8ClampedArray]"]=z["[object Uint16Array]"]=z["[object Uint32Array]"]=!0,z["[object Error]"]=z[D]=z["[object WeakMap]"]=!1;var F=function t(e,n,h,d,f,m){var A,x=1&n,N=2&n,E=4&n;if(h&&(A=f?h(e,d,f,m):h(e)),void 0!==A)return A;if(!(0,I.A)(e))return e;var w=(0,L.A)(e);if(w){if(A=function(t){var e=t.length,n=new t.constructor(e);return e&&"string"==typeof t[0]&&v.call(t,"index")&&(n.index=t.index,n.input=t.input),n}(e),!x)return(0,c.A)(e,A)}else{var q=(0,y.A)(e),O=q==D||"[object GeneratorFunction]"==q;if((0,S.A)(e))return(0,a.A)(e,x);if(q==P||q==U||O&&!f){if(A=N||O?{}:(0,_.A)(e),!x)return N?function(t,e){return(0,s.A)(t,p(t),e)}(e,function(t,e){return t&&(0,s.A)(e,(0,l.A)(e),t)}(A,e)):function(t,e){return(0,s.A)(t,(0,u.A)(t),e)}(e,function(t,e){return t&&(0,s.A)(e,(0,o.A)(e),t)}(A,e))}else{if(!z[q])return f?e:{};A=k(e,q,x)}}m||(m=new r.A);var T=m.get(e);if(T)return T;m.set(e,A),M(e)?e.forEach((function(r){A.add(t(r,n,h,r,e,m))})):R(e)&&e.forEach((function(r,i){A.set(i,t(r,n,h,i,e,m))}));var j=E?N?b:g.A:N?l.A:o.A,C=w?void 0:j(e);return function(t,e){for(var n=-1,r=null==t?0:t.length;++n<r&&!1!==e(t[n],n,t););}(C||e,(function(r,s){C&&(r=e[s=r]),(0,i.A)(A,s,t(r,n,h,s,e,m))})),A},H=function(t){return F(t,5)}},8138:function(t,e){"use strict";e.A=function(t,e){return t===e||t!=t&&e!=e}},8412:function(t,e,n){"use strict";n.d(e,{A:function(){return u}});var r=n(2159),i=n(7948),s=function(t){return(0,i.A)(t)&&"[object Arguments]"==(0,r.A)(t)},o=Object.prototype,l=o.hasOwnProperty,a=o.propertyIsEnumerable,c=s(function(){return arguments}())?s:function(t){return(0,i.A)(t)&&l.call(t,"callee")&&!a.call(t,"callee")},u=c},723:function(t,e){"use strict";var n=Array.isArray;e.A=n},3628:function(t,e,n){"use strict";var r=n(7572),i=n(1628);e.A=function(t){return null!=t&&(0,i.A)(t.length)&&!(0,r.A)(t)}},776:function(t,e,n){"use strict";n.d(e,{A:function(){return l}});var r=n(5507),i="object"==typeof exports&&exports&&!exports.nodeType&&exports,s=i&&"object"==typeof module&&module&&!module.nodeType&&module,o=s&&s.exports===i?r.A.Buffer:void 0,l=(o?o.isBuffer:void 0)||function(){return!1}},5123:function(t,e,n){"use strict";n.d(e,{A:function(){return S}});var r=n(2673),i=n(3558);function s(t){var e=-1,n=null==t?0:t.length;for(this.__data__=new i.A;++e<n;)this.add(t[e])}s.prototype.add=s.prototype.push=function(t){return this.__data__.set(t,"__lodash_hash_undefined__"),this},s.prototype.has=function(t){return this.__data__.has(t)};var o=s,l=function(t,e){for(var n=-1,r=null==t?0:t.length;++n<r;)if(e(t[n],n,t))return!0;return!1},a=function(t,e,n,r,i,s){var a=1&n,c=t.length,u=e.length;if(c!=u&&!(a&&u>c))return!1;var h=s.get(t),d=s.get(e);if(h&&d)return h==e&&d==t;var f=-1,p=!0,g=2&n?new o:void 0;for(s.set(t,e),s.set(e,t);++f<c;){var m=t[f],b=e[f];if(r)var y=a?r(b,m,f,e,t,s):r(m,b,f,t,e,s);if(void 0!==y){if(y)continue;p=!1;break}if(g){if(!l(e,(function(t,e){if(o=e,!g.has(o)&&(m===t||i(m,t,n,r,s)))return g.push(e);var o}))){p=!1;break}}else if(m!==b&&!i(m,b,n,r,s)){p=!1;break}}return s.delete(t),s.delete(e),p},c=n(439),u=n(7218),h=n(8138),d=function(t){var e=-1,n=Array(t.size);return t.forEach((function(t,r){n[++e]=[r,t]})),n},f=function(t){var e=-1,n=Array(t.size);return t.forEach((function(t){n[++e]=t})),n},p=c.A?c.A.prototype:void 0,g=p?p.valueOf:void 0,m=n(2816),b=Object.prototype.hasOwnProperty,y=n(7995),v=n(723),A=n(776),x=n(5755),N="[object Arguments]",E="[object Array]",w="[object Object]",q=Object.prototype.hasOwnProperty,k=function(t,e,n,i,s,o){var l=(0,v.A)(t),c=(0,v.A)(e),p=l?E:(0,y.A)(t),k=c?E:(0,y.A)(e),_=(p=p==N?w:p)==w,L=(k=k==N?w:k)==w,S=p==k;if(S&&(0,A.A)(t)){if(!(0,A.A)(e))return!1;l=!0,_=!1}if(S&&!_)return o||(o=new r.A),l||(0,x.A)(t)?a(t,e,n,i,s,o):function(t,e,n,r,i,s,o){switch(n){case"[object DataView]":if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case"[object ArrayBuffer]":return!(t.byteLength!=e.byteLength||!s(new u.A(t),new u.A(e)));case"[object Boolean]":case"[object Date]":case"[object Number]":return(0,h.A)(+t,+e);case"[object Error]":return t.name==e.name&&t.message==e.message;case"[object RegExp]":case"[object String]":return t==e+"";case"[object Map]":var l=d;case"[object Set]":var c=1&r;if(l||(l=f),t.size!=e.size&&!c)return!1;var p=o.get(t);if(p)return p==e;r|=2,o.set(t,e);var m=a(l(t),l(e),r,i,s,o);return o.delete(t),m;case"[object Symbol]":if(g)return g.call(t)==g.call(e)}return!1}(t,e,p,n,i,s,o);if(!(1&n)){var O=_&&q.call(t,"__wrapped__"),T=L&&q.call(e,"__wrapped__");if(O||T){var j=O?t.value():t,C=T?e.value():e;return o||(o=new r.A),s(j,C,n,i,o)}}return!!S&&(o||(o=new r.A),function(t,e,n,r,i,s){var o=1&n,l=(0,m.A)(t),a=l.length;if(a!=(0,m.A)(e).length&&!o)return!1;for(var c=a;c--;){var u=l[c];if(!(o?u in e:b.call(e,u)))return!1}var h=s.get(t),d=s.get(e);if(h&&d)return h==e&&d==t;var f=!0;s.set(t,e),s.set(e,t);for(var p=o;++c<a;){var g=t[u=l[c]],y=e[u];if(r)var v=o?r(y,g,u,e,t,s):r(g,y,u,t,e,s);if(!(void 0===v?g===y||i(g,y,n,r,s):v)){f=!1;break}p||(p="constructor"==u)}if(f&&!p){var A=t.constructor,x=e.constructor;A==x||!("constructor"in t)||!("constructor"in e)||"function"==typeof A&&A instanceof A&&"function"==typeof x&&x instanceof x||(f=!1)}return s.delete(t),s.delete(e),f}(t,e,n,i,s,o))},_=n(7948),L=function t(e,n,r,i,s){return e===n||(null==e||null==n||!(0,_.A)(e)&&!(0,_.A)(n)?e!=e&&n!=n:k(e,n,r,i,t,s))},S=function(t,e){return L(t,e)}},7572:function(t,e,n){"use strict";var r=n(2159),i=n(659);e.A=function(t){if(!(0,i.A)(t))return!1;var e=(0,r.A)(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e}},1628:function(t,e){"use strict";e.A=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}},659:function(t,e){"use strict";e.A=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}},7948:function(t,e){"use strict";e.A=function(t){return null!=t&&"object"==typeof t}},5755:function(t,e,n){"use strict";n.d(e,{A:function(){return u}});var r=n(2159),i=n(1628),s=n(7948),o={};o["[object Float32Array]"]=o["[object Float64Array]"]=o["[object Int8Array]"]=o["[object Int16Array]"]=o["[object Int32Array]"]=o["[object Uint8Array]"]=o["[object Uint8ClampedArray]"]=o["[object Uint16Array]"]=o["[object Uint32Array]"]=!0,o["[object Arguments]"]=o["[object Array]"]=o["[object ArrayBuffer]"]=o["[object Boolean]"]=o["[object DataView]"]=o["[object Date]"]=o["[object Error]"]=o["[object Function]"]=o["[object Map]"]=o["[object Number]"]=o["[object Object]"]=o["[object RegExp]"]=o["[object Set]"]=o["[object String]"]=o["[object WeakMap]"]=!1;var l=n(5771),a=n(8795),c=a.A&&a.A.isTypedArray,u=c?(0,l.A)(c):function(t){return(0,s.A)(t)&&(0,i.A)(t.length)&&!!o[(0,r.A)(t)]}},3169:function(t,e,n){"use strict";n.d(e,{A:function(){return a}});var r=n(6753),i=n(501),s=(0,n(2217).A)(Object.keys,Object),o=Object.prototype.hasOwnProperty,l=n(3628),a=function(t){return(0,l.A)(t)?(0,r.A)(t):function(t){if(!(0,i.A)(t))return s(t);var e=[];for(var n in Object(t))o.call(t,n)&&"constructor"!=n&&e.push(n);return e}(t)}},2624:function(t,e,n){"use strict";n.d(e,{A:function(){return c}});var r=n(6753),i=n(659),s=n(501),o=Object.prototype.hasOwnProperty,l=function(t){if(!(0,i.A)(t))return function(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e}(t);var e=(0,s.A)(t),n=[];for(var r in t)("constructor"!=r||!e&&o.call(t,r))&&n.push(r);return n},a=n(3628),c=function(t){return(0,a.A)(t)?(0,r.A)(t,!0):l(t)}},8347:function(t,e,n){"use strict";n.d(e,{A:function(){return $}});var r,i,s,o,l=n(2673),a=n(6770),c=n(8138),u=function(t,e,n){(void 0!==n&&!(0,c.A)(t[e],n)||void 0===n&&!(e in t))&&(0,a.A)(t,e,n)},h=function(t,e,n){for(var r=-1,i=Object(t),s=n(t),o=s.length;o--;){var l=s[++r];if(!1===e(i[l],l,i))break}return t},d=n(3812),f=n(1827),p=n(4405),g=n(1683),m=n(8412),b=n(723),y=n(3628),v=n(7948),A=n(776),x=n(7572),N=n(659),E=n(2159),w=n(8769),q=Function.prototype,k=Object.prototype,_=q.toString,L=k.hasOwnProperty,S=_.call(Object),O=n(5755),T=function(t,e){if(("constructor"!==e||"function"!=typeof t[e])&&"__proto__"!=e)return t[e]},j=n(9601),C=n(2624),R=function(t,e,n,r,i,s,o){var l,a=T(t,n),c=T(e,n),h=o.get(c);if(h)u(t,n,h);else{var q=s?s(a,c,n+"",t,e,o):void 0,k=void 0===q;if(k){var R=(0,b.A)(c),I=!R&&(0,A.A)(c),B=!R&&!I&&(0,O.A)(c);q=c,R||I||B?(0,b.A)(a)?q=a:(l=a,(0,v.A)(l)&&(0,y.A)(l)?q=(0,p.A)(a):I?(k=!1,q=(0,d.A)(c,!0)):B?(k=!1,q=(0,f.A)(c,!0)):q=[]):function(t){if(!(0,v.A)(t)||"[object Object]"!=(0,E.A)(t))return!1;var e=(0,w.A)(t);if(null===e)return!0;var n=L.call(e,"constructor")&&e.constructor;return"function"==typeof n&&n instanceof n&&_.call(n)==S}(c)||(0,m.A)(c)?(q=a,(0,m.A)(a)?q=function(t){return(0,j.A)(t,(0,C.A)(t))}(a):(0,N.A)(a)&&!(0,x.A)(a)||(q=(0,g.A)(c))):k=!1}k&&(o.set(c,q),i(q,c,r,s,o),o.delete(c)),u(t,n,q)}},I=function t(e,n,r,i,s){e!==n&&h(n,(function(o,a){if(s||(s=new l.A),(0,N.A)(o))R(e,n,a,r,t,i,s);else{var c=i?i(T(e,a),o,a+"",e,n,s):void 0;void 0===c&&(c=o),u(e,a,c)}}),C.A)},B=function(t){return t},M=Math.max,U=n(7889),D=U.A?function(t,e){return(0,U.A)(t,"toString",{configurable:!0,enumerable:!1,value:(n=e,function(){return n}),writable:!0});var n}:B,P=Date.now,z=(r=D,i=0,s=0,function(){var t=P(),e=16-(t-s);if(s=t,e>0){if(++i>=800)return arguments[0]}else i=0;return r.apply(void 0,arguments)}),F=function(t,e){return z(function(t,e,n){return e=M(void 0===e?t.length-1:e,0),function(){for(var r=arguments,i=-1,s=M(r.length-e,0),o=Array(s);++i<s;)o[i]=r[e+i];i=-1;for(var l=Array(e+1);++i<e;)l[i]=r[i];return l[e]=n(o),function(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)}(t,this,l)}}(t,e,B),t+"")},H=n(3767),$=(o=function(t,e,n){I(t,e,n)},F((function(t,e){var n=-1,r=e.length,i=r>1?e[r-1]:void 0,s=r>2?e[2]:void 0;for(i=o.length>3&&"function"==typeof i?(r--,i):void 0,s&&function(t,e,n){if(!(0,N.A)(n))return!1;var r=typeof e;return!!("number"==r?(0,y.A)(n)&&(0,H.A)(e,n.length):"string"==r&&e in n)&&(0,c.A)(n[e],t)}(e[0],e[1],s)&&(i=r<3?void 0:i,r=1),t=Object(t);++n<r;){var l=e[n];l&&o(t,l,n)}return t})))},6935:function(t,e){"use strict";e.A=function(){return[]}},6003:function(t,e,n){"use strict";n.r(e),n.d(e,{Attributor:function(){return i},AttributorStore:function(){return d},BlockBlot:function(){return w},ClassAttributor:function(){return c},ContainerBlot:function(){return k},EmbedBlot:function(){return _},InlineBlot:function(){return N},LeafBlot:function(){return m},ParentBlot:function(){return A},Registry:function(){return l},Scope:function(){return r},ScrollBlot:function(){return O},StyleAttributor:function(){return h},TextBlot:function(){return j}});var r=(t=>(t[t.TYPE=3]="TYPE",t[t.LEVEL=12]="LEVEL",t[t.ATTRIBUTE=13]="ATTRIBUTE",t[t.BLOT=14]="BLOT",t[t.INLINE=7]="INLINE",t[t.BLOCK=11]="BLOCK",t[t.BLOCK_BLOT=10]="BLOCK_BLOT",t[t.INLINE_BLOT=6]="INLINE_BLOT",t[t.BLOCK_ATTRIBUTE=9]="BLOCK_ATTRIBUTE",t[t.INLINE_ATTRIBUTE=5]="INLINE_ATTRIBUTE",t[t.ANY=15]="ANY",t))(r||{});class i{constructor(t,e,n={}){this.attrName=t,this.keyName=e;const i=r.TYPE&r.ATTRIBUTE;this.scope=null!=n.scope?n.scope&r.LEVEL|i:r.ATTRIBUTE,null!=n.whitelist&&(this.whitelist=n.whitelist)}static keys(t){return Array.from(t.attributes).map((t=>t.name))}add(t,e){return!!this.canAdd(t,e)&&(t.setAttribute(this.keyName,e),!0)}canAdd(t,e){return null==this.whitelist||("string"==typeof e?this.whitelist.indexOf(e.replace(/["']/g,""))>-1:this.whitelist.indexOf(e)>-1)}remove(t){t.removeAttribute(this.keyName)}value(t){const e=t.getAttribute(this.keyName);return this.canAdd(t,e)&&e?e:""}}class s extends Error{constructor(t){super(t="[Parchment] "+t),this.message=t,this.name=this.constructor.name}}const o=class t{constructor(){this.attributes={},this.classes={},this.tags={},this.types={}}static find(t,e=!1){if(null==t)return null;if(this.blots.has(t))return this.blots.get(t)||null;if(e){let n=null;try{n=t.parentNode}catch{return null}return this.find(n,e)}return null}create(e,n,r){const i=this.query(n);if(null==i)throw new s(`Unable to create ${n} blot`);const o=i,l=n instanceof Node||n.nodeType===Node.TEXT_NODE?n:o.create(r),a=new o(e,l,r);return t.blots.set(a.domNode,a),a}find(e,n=!1){return t.find(e,n)}query(t,e=r.ANY){let n;return"string"==typeof t?n=this.types[t]||this.attributes[t]:t instanceof Text||t.nodeType===Node.TEXT_NODE?n=this.types.text:"number"==typeof t?t&r.LEVEL&r.BLOCK?n=this.types.block:t&r.LEVEL&r.INLINE&&(n=this.types.inline):t instanceof Element&&((t.getAttribute("class")||"").split(/\s+/).some((t=>(n=this.classes[t],!!n))),n=n||this.tags[t.tagName]),null==n?null:"scope"in n&&e&r.LEVEL&n.scope&&e&r.TYPE&n.scope?n:null}register(...t){return t.map((t=>{const e="blotName"in t,n="attrName"in t;if(!e&&!n)throw new s("Invalid definition");if(e&&"abstract"===t.blotName)throw new s("Cannot register abstract class");const r=e?t.blotName:n?t.attrName:void 0;return this.types[r]=t,n?"string"==typeof t.keyName&&(this.attributes[t.keyName]=t):e&&(t.className&&(this.classes[t.className]=t),t.tagName&&(Array.isArray(t.tagName)?t.tagName=t.tagName.map((t=>t.toUpperCase())):t.tagName=t.tagName.toUpperCase(),(Array.isArray(t.tagName)?t.tagName:[t.tagName]).forEach((e=>{(null==this.tags[e]||null==t.className)&&(this.tags[e]=t)})))),t}))}};o.blots=new WeakMap;let l=o;function a(t,e){return(t.getAttribute("class")||"").split(/\s+/).filter((t=>0===t.indexOf(`${e}-`)))}const c=class extends i{static keys(t){return(t.getAttribute("class")||"").split(/\s+/).map((t=>t.split("-").slice(0,-1).join("-")))}add(t,e){return!!this.canAdd(t,e)&&(this.remove(t),t.classList.add(`${this.keyName}-${e}`),!0)}remove(t){a(t,this.keyName).forEach((e=>{t.classList.remove(e)})),0===t.classList.length&&t.removeAttribute("class")}value(t){const e=(a(t,this.keyName)[0]||"").slice(this.keyName.length+1);return this.canAdd(t,e)?e:""}};function u(t){const e=t.split("-"),n=e.slice(1).map((t=>t[0].toUpperCase()+t.slice(1))).join("");return e[0]+n}const h=class extends i{static keys(t){return(t.getAttribute("style")||"").split(";").map((t=>t.split(":")[0].trim()))}add(t,e){return!!this.canAdd(t,e)&&(t.style[u(this.keyName)]=e,!0)}remove(t){t.style[u(this.keyName)]="",t.getAttribute("style")||t.removeAttribute("style")}value(t){const e=t.style[u(this.keyName)];return this.canAdd(t,e)?e:""}},d=class{constructor(t){this.attributes={},this.domNode=t,this.build()}attribute(t,e){e?t.add(this.domNode,e)&&(null!=t.value(this.domNode)?this.attributes[t.attrName]=t:delete this.attributes[t.attrName]):(t.remove(this.domNode),delete this.attributes[t.attrName])}build(){this.attributes={};const t=l.find(this.domNode);if(null==t)return;const e=i.keys(this.domNode),n=c.keys(this.domNode),s=h.keys(this.domNode);e.concat(n).concat(s).forEach((e=>{const n=t.scroll.query(e,r.ATTRIBUTE);n instanceof i&&(this.attributes[n.attrName]=n)}))}copy(t){Object.keys(this.attributes).forEach((e=>{const n=this.attributes[e].value(this.domNode);t.format(e,n)}))}move(t){this.copy(t),Object.keys(this.attributes).forEach((t=>{this.attributes[t].remove(this.domNode)})),this.attributes={}}values(){return Object.keys(this.attributes).reduce(((t,e)=>(t[e]=this.attributes[e].value(this.domNode),t)),{})}},f=class{constructor(t,e){this.scroll=t,this.domNode=e,l.blots.set(e,this),this.prev=null,this.next=null}static create(t){if(null==this.tagName)throw new s("Blot definition missing tagName");let e,n;return Array.isArray(this.tagName)?("string"==typeof t?(n=t.toUpperCase(),parseInt(n,10).toString()===n&&(n=parseInt(n,10))):"number"==typeof t&&(n=t),e="number"==typeof n?document.createElement(this.tagName[n-1]):n&&this.tagName.indexOf(n)>-1?document.createElement(n):document.createElement(this.tagName[0])):e=document.createElement(this.tagName),this.className&&e.classList.add(this.className),e}get statics(){return this.constructor}attach(){}clone(){const t=this.domNode.cloneNode(!1);return this.scroll.create(t)}detach(){null!=this.parent&&this.parent.removeChild(this),l.blots.delete(this.domNode)}deleteAt(t,e){this.isolate(t,e).remove()}formatAt(t,e,n,i){const s=this.isolate(t,e);if(null!=this.scroll.query(n,r.BLOT)&&i)s.wrap(n,i);else if(null!=this.scroll.query(n,r.ATTRIBUTE)){const t=this.scroll.create(this.statics.scope);s.wrap(t),t.format(n,i)}}insertAt(t,e,n){const r=null==n?this.scroll.create("text",e):this.scroll.create(e,n),i=this.split(t);this.parent.insertBefore(r,i||void 0)}isolate(t,e){const n=this.split(t);if(null==n)throw new Error("Attempt to isolate at end");return n.split(e),n}length(){return 1}offset(t=this.parent){return null==this.parent||this===t?0:this.parent.children.offset(this)+this.parent.offset(t)}optimize(t){this.statics.requiredContainer&&!(this.parent instanceof this.statics.requiredContainer)&&this.wrap(this.statics.requiredContainer.blotName)}remove(){null!=this.domNode.parentNode&&this.domNode.parentNode.removeChild(this.domNode),this.detach()}replaceWith(t,e){const n="string"==typeof t?this.scroll.create(t,e):t;return null!=this.parent&&(this.parent.insertBefore(n,this.next||void 0),this.remove()),n}split(t,e){return 0===t?this:this.next}update(t,e){}wrap(t,e){const n="string"==typeof t?this.scroll.create(t,e):t;if(null!=this.parent&&this.parent.insertBefore(n,this.next||void 0),"function"!=typeof n.appendChild)throw new s(`Cannot wrap ${t}`);return n.appendChild(this),n}};f.blotName="abstract";let p=f;const g=class extends p{static value(t){return!0}index(t,e){return this.domNode===t||this.domNode.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY?Math.min(e,1):-1}position(t,e){let n=Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);return t>0&&(n+=1),[this.parent.domNode,n]}value(){return{[this.statics.blotName]:this.statics.value(this.domNode)||!0}}};g.scope=r.INLINE_BLOT;const m=g;class b{constructor(){this.head=null,this.tail=null,this.length=0}append(...t){if(this.insertBefore(t[0],null),t.length>1){const e=t.slice(1);this.append(...e)}}at(t){const e=this.iterator();let n=e();for(;n&&t>0;)t-=1,n=e();return n}contains(t){const e=this.iterator();let n=e();for(;n;){if(n===t)return!0;n=e()}return!1}indexOf(t){const e=this.iterator();let n=e(),r=0;for(;n;){if(n===t)return r;r+=1,n=e()}return-1}insertBefore(t,e){null!=t&&(this.remove(t),t.next=e,null!=e?(t.prev=e.prev,null!=e.prev&&(e.prev.next=t),e.prev=t,e===this.head&&(this.head=t)):null!=this.tail?(this.tail.next=t,t.prev=this.tail,this.tail=t):(t.prev=null,this.head=this.tail=t),this.length+=1)}offset(t){let e=0,n=this.head;for(;null!=n;){if(n===t)return e;e+=n.length(),n=n.next}return-1}remove(t){this.contains(t)&&(null!=t.prev&&(t.prev.next=t.next),null!=t.next&&(t.next.prev=t.prev),t===this.head&&(this.head=t.next),t===this.tail&&(this.tail=t.prev),this.length-=1)}iterator(t=this.head){return()=>{const e=t;return null!=t&&(t=t.next),e}}find(t,e=!1){const n=this.iterator();let r=n();for(;r;){const i=r.length();if(t<i||e&&t===i&&(null==r.next||0!==r.next.length()))return[r,t];t-=i,r=n()}return[null,0]}forEach(t){const e=this.iterator();let n=e();for(;n;)t(n),n=e()}forEachAt(t,e,n){if(e<=0)return;const[r,i]=this.find(t);let s=t-i;const o=this.iterator(r);let l=o();for(;l&&s<t+e;){const r=l.length();t>s?n(l,t-s,Math.min(e,s+r-t)):n(l,0,Math.min(r,t+e-s)),s+=r,l=o()}}map(t){return this.reduce(((e,n)=>(e.push(t(n)),e)),[])}reduce(t,e){const n=this.iterator();let r=n();for(;r;)e=t(e,r),r=n();return e}}function y(t,e){const n=e.find(t);if(n)return n;try{return e.create(t)}catch{const n=e.create(r.INLINE);return Array.from(t.childNodes).forEach((t=>{n.domNode.appendChild(t)})),t.parentNode&&t.parentNode.replaceChild(n.domNode,t),n.attach(),n}}const v=class t extends p{constructor(t,e){super(t,e),this.uiNode=null,this.build()}appendChild(t){this.insertBefore(t)}attach(){super.attach(),this.children.forEach((t=>{t.attach()}))}attachUI(e){null!=this.uiNode&&this.uiNode.remove(),this.uiNode=e,t.uiClass&&this.uiNode.classList.add(t.uiClass),this.uiNode.setAttribute("contenteditable","false"),this.domNode.insertBefore(this.uiNode,this.domNode.firstChild)}build(){this.children=new b,Array.from(this.domNode.childNodes).filter((t=>t!==this.uiNode)).reverse().forEach((t=>{try{const e=y(t,this.scroll);this.insertBefore(e,this.children.head||void 0)}catch(t){if(t instanceof s)return;throw t}}))}deleteAt(t,e){if(0===t&&e===this.length())return this.remove();this.children.forEachAt(t,e,((t,e,n)=>{t.deleteAt(e,n)}))}descendant(e,n=0){const[r,i]=this.children.find(n);return null==e.blotName&&e(r)||null!=e.blotName&&r instanceof e?[r,i]:r instanceof t?r.descendant(e,i):[null,-1]}descendants(e,n=0,r=Number.MAX_VALUE){let i=[],s=r;return this.children.forEachAt(n,r,((n,r,o)=>{(null==e.blotName&&e(n)||null!=e.blotName&&n instanceof e)&&i.push(n),n instanceof t&&(i=i.concat(n.descendants(e,r,s))),s-=o})),i}detach(){this.children.forEach((t=>{t.detach()})),super.detach()}enforceAllowedChildren(){let e=!1;this.children.forEach((n=>{e||this.statics.allowedChildren.some((t=>n instanceof t))||(n.statics.scope===r.BLOCK_BLOT?(null!=n.next&&this.splitAfter(n),null!=n.prev&&this.splitAfter(n.prev),n.parent.unwrap(),e=!0):n instanceof t?n.unwrap():n.remove())}))}formatAt(t,e,n,r){this.children.forEachAt(t,e,((t,e,i)=>{t.formatAt(e,i,n,r)}))}insertAt(t,e,n){const[r,i]=this.children.find(t);if(r)r.insertAt(i,e,n);else{const t=null==n?this.scroll.create("text",e):this.scroll.create(e,n);this.appendChild(t)}}insertBefore(t,e){null!=t.parent&&t.parent.children.remove(t);let n=null;this.children.insertBefore(t,e||null),t.parent=this,null!=e&&(n=e.domNode),(this.domNode.parentNode!==t.domNode||this.domNode.nextSibling!==n)&&this.domNode.insertBefore(t.domNode,n),t.attach()}length(){return this.children.reduce(((t,e)=>t+e.length()),0)}moveChildren(t,e){this.children.forEach((n=>{t.insertBefore(n,e)}))}optimize(t){if(super.optimize(t),this.enforceAllowedChildren(),null!=this.uiNode&&this.uiNode!==this.domNode.firstChild&&this.domNode.insertBefore(this.uiNode,this.domNode.firstChild),0===this.children.length)if(null!=this.statics.defaultChild){const t=this.scroll.create(this.statics.defaultChild.blotName);this.appendChild(t)}else this.remove()}path(e,n=!1){const[r,i]=this.children.find(e,n),s=[[this,e]];return r instanceof t?s.concat(r.path(i,n)):(null!=r&&s.push([r,i]),s)}removeChild(t){this.children.remove(t)}replaceWith(e,n){const r="string"==typeof e?this.scroll.create(e,n):e;return r instanceof t&&this.moveChildren(r),super.replaceWith(r)}split(t,e=!1){if(!e){if(0===t)return this;if(t===this.length())return this.next}const n=this.clone();return this.parent&&this.parent.insertBefore(n,this.next||void 0),this.children.forEachAt(t,this.length(),((t,r,i)=>{const s=t.split(r,e);null!=s&&n.appendChild(s)})),n}splitAfter(t){const e=this.clone();for(;null!=t.next;)e.appendChild(t.next);return this.parent&&this.parent.insertBefore(e,this.next||void 0),e}unwrap(){this.parent&&this.moveChildren(this.parent,this.next||void 0),this.remove()}update(t,e){const n=[],r=[];t.forEach((t=>{t.target===this.domNode&&"childList"===t.type&&(n.push(...t.addedNodes),r.push(...t.removedNodes))})),r.forEach((t=>{if(null!=t.parentNode&&"IFRAME"!==t.tagName&&document.body.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY)return;const e=this.scroll.find(t);null!=e&&(null==e.domNode.parentNode||e.domNode.parentNode===this.domNode)&&e.detach()})),n.filter((t=>t.parentNode===this.domNode&&t!==this.uiNode)).sort(((t,e)=>t===e?0:t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1)).forEach((t=>{let e=null;null!=t.nextSibling&&(e=this.scroll.find(t.nextSibling));const n=y(t,this.scroll);(n.next!==e||null==n.next)&&(null!=n.parent&&n.parent.removeChild(this),this.insertBefore(n,e||void 0))})),this.enforceAllowedChildren()}};v.uiClass="";const A=v,x=class t extends A{static create(t){return super.create(t)}static formats(e,n){const r=n.query(t.blotName);if(null==r||e.tagName!==r.tagName){if("string"==typeof this.tagName)return!0;if(Array.isArray(this.tagName))return e.tagName.toLowerCase()}}constructor(t,e){super(t,e),this.attributes=new d(this.domNode)}format(e,n){if(e!==this.statics.blotName||n){const t=this.scroll.query(e,r.INLINE);if(null==t)return;t instanceof i?this.attributes.attribute(t,n):n&&(e!==this.statics.blotName||this.formats()[e]!==n)&&this.replaceWith(e,n)}else this.children.forEach((e=>{e instanceof t||(e=e.wrap(t.blotName,!0)),this.attributes.copy(e)})),this.unwrap()}formats(){const t=this.attributes.values(),e=this.statics.formats(this.domNode,this.scroll);return null!=e&&(t[this.statics.blotName]=e),t}formatAt(t,e,n,i){null!=this.formats()[n]||this.scroll.query(n,r.ATTRIBUTE)?this.isolate(t,e).format(n,i):super.formatAt(t,e,n,i)}optimize(e){super.optimize(e);const n=this.formats();if(0===Object.keys(n).length)return this.unwrap();const r=this.next;r instanceof t&&r.prev===this&&function(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(t[n]!==e[n])return!1;return!0}(n,r.formats())&&(r.moveChildren(this),r.remove())}replaceWith(t,e){const n=super.replaceWith(t,e);return this.attributes.copy(n),n}update(t,e){super.update(t,e),t.some((t=>t.target===this.domNode&&"attributes"===t.type))&&this.attributes.build()}wrap(e,n){const r=super.wrap(e,n);return r instanceof t&&this.attributes.move(r),r}};x.allowedChildren=[x,m],x.blotName="inline",x.scope=r.INLINE_BLOT,x.tagName="SPAN";const N=x,E=class t extends A{static create(t){return super.create(t)}static formats(e,n){const r=n.query(t.blotName);if(null==r||e.tagName!==r.tagName){if("string"==typeof this.tagName)return!0;if(Array.isArray(this.tagName))return e.tagName.toLowerCase()}}constructor(t,e){super(t,e),this.attributes=new d(this.domNode)}format(e,n){const s=this.scroll.query(e,r.BLOCK);null!=s&&(s instanceof i?this.attributes.attribute(s,n):e!==this.statics.blotName||n?n&&(e!==this.statics.blotName||this.formats()[e]!==n)&&this.replaceWith(e,n):this.replaceWith(t.blotName))}formats(){const t=this.attributes.values(),e=this.statics.formats(this.domNode,this.scroll);return null!=e&&(t[this.statics.blotName]=e),t}formatAt(t,e,n,i){null!=this.scroll.query(n,r.BLOCK)?this.format(n,i):super.formatAt(t,e,n,i)}insertAt(t,e,n){if(null==n||null!=this.scroll.query(e,r.INLINE))super.insertAt(t,e,n);else{const r=this.split(t);if(null==r)throw new Error("Attempt to insertAt after block boundaries");{const t=this.scroll.create(e,n);r.parent.insertBefore(t,r)}}}replaceWith(t,e){const n=super.replaceWith(t,e);return this.attributes.copy(n),n}update(t,e){super.update(t,e),t.some((t=>t.target===this.domNode&&"attributes"===t.type))&&this.attributes.build()}};E.blotName="block",E.scope=r.BLOCK_BLOT,E.tagName="P",E.allowedChildren=[N,E,m];const w=E,q=class extends A{checkMerge(){return null!==this.next&&this.next.statics.blotName===this.statics.blotName}deleteAt(t,e){super.deleteAt(t,e),this.enforceAllowedChildren()}formatAt(t,e,n,r){super.formatAt(t,e,n,r),this.enforceAllowedChildren()}insertAt(t,e,n){super.insertAt(t,e,n),this.enforceAllowedChildren()}optimize(t){super.optimize(t),this.children.length>0&&null!=this.next&&this.checkMerge()&&(this.next.moveChildren(this),this.next.remove())}};q.blotName="container",q.scope=r.BLOCK_BLOT;const k=q,_=class extends m{static formats(t,e){}format(t,e){super.formatAt(0,this.length(),t,e)}formatAt(t,e,n,r){0===t&&e===this.length()?this.format(n,r):super.formatAt(t,e,n,r)}formats(){return this.statics.formats(this.domNode,this.scroll)}},L={attributes:!0,characterData:!0,characterDataOldValue:!0,childList:!0,subtree:!0},S=class extends A{constructor(t,e){super(null,e),this.registry=t,this.scroll=this,this.build(),this.observer=new MutationObserver((t=>{this.update(t)})),this.observer.observe(this.domNode,L),this.attach()}create(t,e){return this.registry.create(this,t,e)}find(t,e=!1){const n=this.registry.find(t,e);return n?n.scroll===this?n:e?this.find(n.scroll.domNode.parentNode,!0):null:null}query(t,e=r.ANY){return this.registry.query(t,e)}register(...t){return this.registry.register(...t)}build(){null!=this.scroll&&super.build()}detach(){super.detach(),this.observer.disconnect()}deleteAt(t,e){this.update(),0===t&&e===this.length()?this.children.forEach((t=>{t.remove()})):super.deleteAt(t,e)}formatAt(t,e,n,r){this.update(),super.formatAt(t,e,n,r)}insertAt(t,e,n){this.update(),super.insertAt(t,e,n)}optimize(t=[],e={}){super.optimize(e);const n=e.mutationsMap||new WeakMap;let r=Array.from(this.observer.takeRecords());for(;r.length>0;)t.push(r.pop());const i=(t,e=!0)=>{null==t||t===this||null!=t.domNode.parentNode&&(n.has(t.domNode)||n.set(t.domNode,[]),e&&i(t.parent))},s=t=>{n.has(t.domNode)&&(t instanceof A&&t.children.forEach(s),n.delete(t.domNode),t.optimize(e))};let o=t;for(let e=0;o.length>0;e+=1){if(e>=100)throw new Error("[Parchment] Maximum optimize iterations reached");for(o.forEach((t=>{const e=this.find(t.target,!0);null!=e&&(e.domNode===t.target&&("childList"===t.type?(i(this.find(t.previousSibling,!1)),Array.from(t.addedNodes).forEach((t=>{const e=this.find(t,!1);i(e,!1),e instanceof A&&e.children.forEach((t=>{i(t,!1)}))}))):"attributes"===t.type&&i(e.prev)),i(e))})),this.children.forEach(s),o=Array.from(this.observer.takeRecords()),r=o.slice();r.length>0;)t.push(r.pop())}}update(t,e={}){t=t||this.observer.takeRecords();const n=new WeakMap;t.map((t=>{const e=this.find(t.target,!0);return null==e?null:n.has(e.domNode)?(n.get(e.domNode).push(t),null):(n.set(e.domNode,[t]),e)})).forEach((t=>{null!=t&&t!==this&&n.has(t.domNode)&&t.update(n.get(t.domNode)||[],e)})),e.mutationsMap=n,n.has(this.domNode)&&super.update(n.get(this.domNode),e),this.optimize(t,e)}};S.blotName="scroll",S.defaultChild=w,S.allowedChildren=[w,k],S.scope=r.BLOCK_BLOT,S.tagName="DIV";const O=S,T=class t extends m{static create(t){return document.createTextNode(t)}static value(t){return t.data}constructor(t,e){super(t,e),this.text=this.statics.value(this.domNode)}deleteAt(t,e){this.domNode.data=this.text=this.text.slice(0,t)+this.text.slice(t+e)}index(t,e){return this.domNode===t?e:-1}insertAt(t,e,n){null==n?(this.text=this.text.slice(0,t)+e+this.text.slice(t),this.domNode.data=this.text):super.insertAt(t,e,n)}length(){return this.text.length}optimize(e){super.optimize(e),this.text=this.statics.value(this.domNode),0===this.text.length?this.remove():this.next instanceof t&&this.next.prev===this&&(this.insertAt(this.length(),this.next.value()),this.next.remove())}position(t,e=!1){return[this.domNode,t]}split(t,e=!1){if(!e){if(0===t)return this;if(t===this.length())return this.next}const n=this.scroll.create(this.domNode.splitText(t));return this.parent.insertBefore(n,this.next||void 0),this.text=this.statics.value(this.domNode),n}update(t,e){t.some((t=>"characterData"===t.type&&t.target===this.domNode))&&(this.text=this.statics.value(this.domNode))}value(){return this.text}};T.blotName="text",T.scope=r.INLINE_BLOT;const j=T}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var s=e[r]={id:r,loaded:!1,exports:{}};return t[r](s,s.exports,n),s.loaded=!0,s.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t};var r={};return function(){"use strict";n.d(r,{default:function(){return It}});var t=n(3729),e=n(8276),i=n(7912),s=n(6003);class o extends s.ClassAttributor{add(t,e){let n=0;if("+1"===e||"-1"===e){const r=this.value(t)||0;n="+1"===e?r+1:r-1}else"number"==typeof e&&(n=e);return 0===n?(this.remove(t),!0):super.add(t,n.toString())}canAdd(t,e){return super.canAdd(t,e)||super.canAdd(t,parseInt(e,10))}value(t){return parseInt(super.value(t),10)||void 0}}var l=new o("indent","ql-indent",{scope:s.Scope.BLOCK,whitelist:[1,2,3,4,5,6,7,8]}),a=n(9698);class c extends a.Ay{static blotName="blockquote";static tagName="blockquote"}var u=c;class h extends a.Ay{static blotName="header";static tagName=["H1","H2","H3","H4","H5","H6"];static formats(t){return this.tagName.indexOf(t.tagName)+1}}var d=h,f=n(580),p=n(6142);class g extends f.A{}g.blotName="list-container",g.tagName="OL";class m extends a.Ay{static create(t){const e=super.create();return e.setAttribute("data-list",t),e}static formats(t){return t.getAttribute("data-list")||void 0}static register(){p.Ay.register(g)}constructor(t,e){super(t,e);const n=e.ownerDocument.createElement("span"),r=n=>{if(!t.isEnabled())return;const r=this.statics.formats(e,t);"checked"===r?(this.format("list","unchecked"),n.preventDefault()):"unchecked"===r&&(this.format("list","checked"),n.preventDefault())};n.addEventListener("mousedown",r),n.addEventListener("touchstart",r),this.attachUI(n)}format(t,e){t===this.statics.blotName&&e?this.domNode.setAttribute("data-list",e):super.format(t,e)}}m.blotName="list",m.tagName="LI",g.allowedChildren=[m],m.requiredContainer=g;var b=n(9541),y=n(8638),v=n(6772),A=n(664),x=n(4850);class N extends x.A{static blotName="bold";static tagName=["STRONG","B"];static create(){return super.create()}static formats(){return!0}optimize(t){super.optimize(t),this.domNode.tagName!==this.statics.tagName[0]&&this.replaceWith(this.statics.blotName)}}var E=N;class w extends x.A{static blotName="link";static tagName="A";static SANITIZED_URL="about:blank";static PROTOCOL_WHITELIST=["http","https","mailto","tel","sms"];static create(t){const e=super.create(t);return e.setAttribute("href",this.sanitize(t)),e.setAttribute("rel","noopener noreferrer"),e.setAttribute("target","_blank"),e}static formats(t){return t.getAttribute("href")}static sanitize(t){return q(t,this.PROTOCOL_WHITELIST)?t:this.SANITIZED_URL}format(t,e){t===this.statics.blotName&&e?this.domNode.setAttribute("href",this.constructor.sanitize(e)):super.format(t,e)}}function q(t,e){const n=document.createElement("a");n.href=t;const r=n.href.slice(0,n.href.indexOf(":"));return e.indexOf(r)>-1}class k extends x.A{static blotName="script";static tagName=["SUB","SUP"];static create(t){return"super"===t?document.createElement("sup"):"sub"===t?document.createElement("sub"):super.create(t)}static formats(t){return"SUB"===t.tagName?"sub":"SUP"===t.tagName?"super":void 0}}var _=k;class L extends x.A{static blotName="underline";static tagName="U"}var S=L,O=n(746);class T extends O.A{static blotName="formula";static className="ql-formula";static tagName="SPAN";static create(t){if(null==window.katex)throw new Error("Formula module requires KaTeX.");const e=super.create(t);return"string"==typeof t&&(window.katex.render(t,e,{throwOnError:!1,errorColor:"#f00"}),e.setAttribute("data-value",t)),e}static value(t){return t.getAttribute("data-value")}html(){const{formula:t}=this.value();return`<span>${t}</span>`}}var j=T;const C=["alt","height","width"];class R extends s.EmbedBlot{static blotName="image";static tagName="IMG";static create(t){const e=super.create(t);return"string"==typeof t&&e.setAttribute("src",this.sanitize(t)),e}static formats(t){return C.reduce(((e,n)=>(t.hasAttribute(n)&&(e[n]=t.getAttribute(n)),e)),{})}static match(t){return/\.(jpe?g|gif|png)$/.test(t)||/^data:image\/.+;base64/.test(t)}static sanitize(t){return q(t,["http","https","data"])?t:"//:0"}static value(t){return t.getAttribute("src")}format(t,e){C.indexOf(t)>-1?e?this.domNode.setAttribute(t,e):this.domNode.removeAttribute(t):super.format(t,e)}}var I=R;const B=["height","width"];class M extends a.zo{static blotName="video";static className="ql-video";static tagName="IFRAME";static create(t){const e=super.create(t);return e.setAttribute("frameborder","0"),e.setAttribute("allowfullscreen","true"),e.setAttribute("src",this.sanitize(t)),e}static formats(t){return B.reduce(((e,n)=>(t.hasAttribute(n)&&(e[n]=t.getAttribute(n)),e)),{})}static sanitize(t){return w.sanitize(t)}static value(t){return t.getAttribute("src")}format(t,e){B.indexOf(t)>-1?e?this.domNode.setAttribute(t,e):this.domNode.removeAttribute(t):super.format(t,e)}html(){const{video:t}=this.value();return`<a href="${t}">${t}</a>`}}var U=M,D=n(9404),P=n(5232),z=n.n(P),F=n(4266),H=n(3036),$=n(4541),V=n(5508),K=n(584);const W=new s.ClassAttributor("code-token","hljs",{scope:s.Scope.INLINE});class Z extends x.A{static formats(t,e){for(;null!=t&&t!==e.domNode;){if(t.classList&&t.classList.contains(D.Ay.className))return super.formats(t,e);t=t.parentNode}}constructor(t,e,n){super(t,e,n),W.add(this.domNode,n)}format(t,e){t!==Z.blotName?super.format(t,e):e?W.add(this.domNode,e):(W.remove(this.domNode),this.domNode.classList.remove(this.statics.className))}optimize(){super.optimize(...arguments),W.value(this.domNode)||this.unwrap()}}Z.blotName="code-token",Z.className="ql-token";class G extends D.Ay{static create(t){const e=super.create(t);return"string"==typeof t&&e.setAttribute("data-language",t),e}static formats(t){return t.getAttribute("data-language")||"plain"}static register(){}format(t,e){t===this.statics.blotName&&e?this.domNode.setAttribute("data-language",e):super.format(t,e)}replaceWith(t,e){return this.formatAt(0,this.length(),Z.blotName,!1),super.replaceWith(t,e)}}class X extends D.EJ{attach(){super.attach(),this.forceNext=!1,this.scroll.emitMount(this)}format(t,e){t===G.blotName&&(this.forceNext=!0,this.children.forEach((n=>{n.format(t,e)})))}formatAt(t,e,n,r){n===G.blotName&&(this.forceNext=!0),super.formatAt(t,e,n,r)}highlight(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(null==this.children.head)return;const n=`${Array.from(this.domNode.childNodes).filter((t=>t!==this.uiNode)).map((t=>t.textContent)).join("\n")}\n`,r=G.formats(this.children.head.domNode);if(e||this.forceNext||this.cachedText!==n){if(n.trim().length>0||null==this.cachedText){const e=this.children.reduce(((t,e)=>t.concat((0,a.mG)(e,!1))),new(z())),i=t(n,r);e.diff(i).reduce(((t,e)=>{let{retain:n,attributes:r}=e;return n?(r&&Object.keys(r).forEach((e=>{[G.blotName,Z.blotName].includes(e)&&this.formatAt(t,n,e,r[e])})),t+n):t}),0)}this.cachedText=n,this.forceNext=!1}}html(t,e){const[n]=this.children.find(t);return`<pre data-language="${n?G.formats(n.domNode):"plain"}">\n${(0,V.X)(this.code(t,e))}\n</pre>`}optimize(t){if(super.optimize(t),null!=this.parent&&null!=this.children.head&&null!=this.uiNode){const t=G.formats(this.children.head.domNode);t!==this.uiNode.value&&(this.uiNode.value=t)}}}X.allowedChildren=[G],G.requiredContainer=X,G.allowedChildren=[Z,$.A,V.A,H.A];class Q extends F.A{static register(){p.Ay.register(Z,!0),p.Ay.register(G,!0),p.Ay.register(X,!0)}constructor(t,e){if(super(t,e),null==this.options.hljs)throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");this.languages=this.options.languages.reduce(((t,e)=>{let{key:n}=e;return t[n]=!0,t}),{}),this.highlightBlot=this.highlightBlot.bind(this),this.initListener(),this.initTimer()}initListener(){this.quill.on(p.Ay.events.SCROLL_BLOT_MOUNT,(t=>{if(!(t instanceof X))return;const e=this.quill.root.ownerDocument.createElement("select");this.options.languages.forEach((t=>{let{key:n,label:r}=t;const i=e.ownerDocument.createElement("option");i.textContent=r,i.setAttribute("value",n),e.appendChild(i)})),e.addEventListener("change",(()=>{t.format(G.blotName,e.value),this.quill.root.focus(),this.highlight(t,!0)})),null==t.uiNode&&(t.attachUI(e),t.children.head&&(e.value=G.formats(t.children.head.domNode)))}))}initTimer(){let t=null;this.quill.on(p.Ay.events.SCROLL_OPTIMIZE,(()=>{t&&clearTimeout(t),t=setTimeout((()=>{this.highlight(),t=null}),this.options.interval)}))}highlight(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(this.quill.selection.composing)return;this.quill.update(p.Ay.sources.USER);const n=this.quill.getSelection();(null==t?this.quill.scroll.descendants(X):[t]).forEach((t=>{t.highlight(this.highlightBlot,e)})),this.quill.update(p.Ay.sources.SILENT),null!=n&&this.quill.setSelection(n,p.Ay.sources.SILENT)}highlightBlot(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"plain";if(e=this.languages[e]?e:"plain","plain"===e)return(0,V.X)(t).split("\n").reduce(((t,n,r)=>(0!==r&&t.insert("\n",{[D.Ay.blotName]:e}),t.insert(n))),new(z()));const n=this.quill.root.ownerDocument.createElement("div");return n.classList.add(D.Ay.className),n.innerHTML=((t,e,n)=>{if("string"==typeof t.versionString){const r=t.versionString.split(".")[0];if(parseInt(r,10)>=11)return t.highlight(n,{language:e}).value}return t.highlight(e,n).value})(this.options.hljs,e,t),(0,K.hV)(this.quill.scroll,n,[(t,e)=>{const n=W.value(t);return n?e.compose((new(z())).retain(e.length(),{[Z.blotName]:n})):e}],[(t,n)=>t.data.split("\n").reduce(((t,n,r)=>(0!==r&&t.insert("\n",{[D.Ay.blotName]:e}),t.insert(n))),n)],new WeakMap)}}Q.DEFAULTS={hljs:window.hljs,interval:1e3,languages:[{key:"plain",label:"Plain"},{key:"bash",label:"Bash"},{key:"cpp",label:"C++"},{key:"cs",label:"C#"},{key:"css",label:"CSS"},{key:"diff",label:"Diff"},{key:"xml",label:"HTML/XML"},{key:"java",label:"Java"},{key:"javascript",label:"JavaScript"},{key:"markdown",label:"Markdown"},{key:"php",label:"PHP"},{key:"python",label:"Python"},{key:"ruby",label:"Ruby"},{key:"sql",label:"SQL"}]};class J extends a.Ay{static blotName="table";static tagName="TD";static create(t){const e=super.create();return t?e.setAttribute("data-row",t):e.setAttribute("data-row",nt()),e}static formats(t){if(t.hasAttribute("data-row"))return t.getAttribute("data-row")}cellOffset(){return this.parent?this.parent.children.indexOf(this):-1}format(t,e){t===J.blotName&&e?this.domNode.setAttribute("data-row",e):super.format(t,e)}row(){return this.parent}rowOffset(){return this.row()?this.row().rowOffset():-1}table(){return this.row()&&this.row().table()}}class Y extends f.A{static blotName="table-row";static tagName="TR";checkMerge(){if(super.checkMerge()&&null!=this.next.children.head){const t=this.children.head.formats(),e=this.children.tail.formats(),n=this.next.children.head.formats(),r=this.next.children.tail.formats();return t.table===e.table&&t.table===n.table&&t.table===r.table}return!1}optimize(t){super.optimize(t),this.children.forEach((t=>{if(null==t.next)return;const e=t.formats(),n=t.next.formats();if(e.table!==n.table){const e=this.splitAfter(t);e&&e.optimize(),this.prev&&this.prev.optimize()}}))}rowOffset(){return this.parent?this.parent.children.indexOf(this):-1}table(){return this.parent&&this.parent.parent}}class tt extends f.A{static blotName="table-body";static tagName="TBODY"}class et extends f.A{static blotName="table-container";static tagName="TABLE";balanceCells(){const t=this.descendants(Y),e=t.reduce(((t,e)=>Math.max(e.children.length,t)),0);t.forEach((t=>{new Array(e-t.children.length).fill(0).forEach((()=>{let e;null!=t.children.head&&(e=J.formats(t.children.head.domNode));const n=this.scroll.create(J.blotName,e);t.appendChild(n),n.optimize()}))}))}cells(t){return this.rows().map((e=>e.children.at(t)))}deleteColumn(t){const[e]=this.descendant(tt);null!=e&&null!=e.children.head&&e.children.forEach((e=>{const n=e.children.at(t);null!=n&&n.remove()}))}insertColumn(t){const[e]=this.descendant(tt);null!=e&&null!=e.children.head&&e.children.forEach((e=>{const n=e.children.at(t),r=J.formats(e.children.head.domNode),i=this.scroll.create(J.blotName,r);e.insertBefore(i,n)}))}insertRow(t){const[e]=this.descendant(tt);if(null==e||null==e.children.head)return;const n=nt(),r=this.scroll.create(Y.blotName);e.children.head.children.forEach((()=>{const t=this.scroll.create(J.blotName,n);r.appendChild(t)}));const i=e.children.at(t);e.insertBefore(r,i)}rows(){const t=this.children.head;return null==t?[]:t.children.map((t=>t))}}function nt(){return`row-${Math.random().toString(36).slice(2,6)}`}et.allowedChildren=[tt],tt.requiredContainer=et,tt.allowedChildren=[Y],Y.requiredContainer=tt,Y.allowedChildren=[J],J.requiredContainer=Y;class rt extends F.A{static register(){p.Ay.register(J),p.Ay.register(Y),p.Ay.register(tt),p.Ay.register(et)}constructor(){super(...arguments),this.listenBalanceCells()}balanceTables(){this.quill.scroll.descendants(et).forEach((t=>{t.balanceCells()}))}deleteColumn(){const[t,,e]=this.getTable();null!=e&&(t.deleteColumn(e.cellOffset()),this.quill.update(p.Ay.sources.USER))}deleteRow(){const[,t]=this.getTable();null!=t&&(t.remove(),this.quill.update(p.Ay.sources.USER))}deleteTable(){const[t]=this.getTable();if(null==t)return;const e=t.offset();t.remove(),this.quill.update(p.Ay.sources.USER),this.quill.setSelection(e,p.Ay.sources.SILENT)}getTable(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.quill.getSelection();if(null==t)return[null,null,null,-1];const[e,n]=this.quill.getLine(t.index);if(null==e||e.statics.blotName!==J.blotName)return[null,null,null,-1];const r=e.parent;return[r.parent.parent,r,e,n]}insertColumn(t){const e=this.quill.getSelection();if(!e)return;const[n,r,i]=this.getTable(e);if(null==i)return;const s=i.cellOffset();n.insertColumn(s+t),this.quill.update(p.Ay.sources.USER);let o=r.rowOffset();0===t&&(o+=1),this.quill.setSelection(e.index+o,e.length,p.Ay.sources.SILENT)}insertColumnLeft(){this.insertColumn(0)}insertColumnRight(){this.insertColumn(1)}insertRow(t){const e=this.quill.getSelection();if(!e)return;const[n,r,i]=this.getTable(e);if(null==i)return;const s=r.rowOffset();n.insertRow(s+t),this.quill.update(p.Ay.sources.USER),t>0?this.quill.setSelection(e,p.Ay.sources.SILENT):this.quill.setSelection(e.index+r.children.length,e.length,p.Ay.sources.SILENT)}insertRowAbove(){this.insertRow(0)}insertRowBelow(){this.insertRow(1)}insertTable(t,e){const n=this.quill.getSelection();if(null==n)return;const r=new Array(t).fill(0).reduce((t=>{const n=new Array(e).fill("\n").join("");return t.insert(n,{table:nt()})}),(new(z())).retain(n.index));this.quill.updateContents(r,p.Ay.sources.USER),this.quill.setSelection(n.index,p.Ay.sources.SILENT),this.balanceTables()}listenBalanceCells(){this.quill.on(p.Ay.events.SCROLL_OPTIMIZE,(t=>{t.some((t=>!!["TD","TR","TBODY","TABLE"].includes(t.target.tagName)&&(this.quill.once(p.Ay.events.TEXT_CHANGE,((t,e,n)=>{n===p.Ay.sources.USER&&this.balanceTables()})),!0)))}))}}var it=rt;const st=(0,n(6078).A)("quill:toolbar");class ot extends F.A{constructor(t,e){if(super(t,e),Array.isArray(this.options.container)){const e=document.createElement("div");e.setAttribute("role","toolbar"),function(t,e){Array.isArray(e[0])||(e=[e]),e.forEach((e=>{const n=document.createElement("span");n.classList.add("ql-formats"),e.forEach((t=>{if("string"==typeof t)lt(n,t);else{const e=Object.keys(t)[0],r=t[e];Array.isArray(r)?function(t,e,n){const r=document.createElement("select");r.classList.add(`ql-${e}`),n.forEach((t=>{const e=document.createElement("option");!1!==t?e.setAttribute("value",String(t)):e.setAttribute("selected","selected"),r.appendChild(e)})),t.appendChild(r)}(n,e,r):lt(n,e,r)}})),t.appendChild(n)}))}(e,this.options.container),t.container?.parentNode?.insertBefore(e,t.container),this.container=e}else"string"==typeof this.options.container?this.container=document.querySelector(this.options.container):this.container=this.options.container;this.container instanceof HTMLElement?(this.container.classList.add("ql-toolbar"),this.controls=[],this.handlers={},this.options.handlers&&Object.keys(this.options.handlers).forEach((t=>{const e=this.options.handlers?.[t];e&&this.addHandler(t,e)})),Array.from(this.container.querySelectorAll("button, select")).forEach((t=>{this.attach(t)})),this.quill.on(p.Ay.events.EDITOR_CHANGE,(()=>{const[t]=this.quill.selection.getRange();this.update(t)}))):st.error("Container required for toolbar",this.options)}addHandler(t,e){this.handlers[t]=e}attach(t){let e=Array.from(t.classList).find((t=>0===t.indexOf("ql-")));if(!e)return;if(e=e.slice(3),"BUTTON"===t.tagName&&t.setAttribute("type","button"),null==this.handlers[e]&&null==this.quill.scroll.query(e))return void st.warn("ignoring attaching to nonexistent format",e,t);const n="SELECT"===t.tagName?"change":"click";t.addEventListener(n,(n=>{let r;if("SELECT"===t.tagName){if(t.selectedIndex<0)return;const e=t.options[t.selectedIndex];r=!e.hasAttribute("selected")&&(e.value||!1)}else r=!t.classList.contains("ql-active")&&(t.value||!t.hasAttribute("value")),n.preventDefault();this.quill.focus();const[i]=this.quill.selection.getRange();if(null!=this.handlers[e])this.handlers[e].call(this,r);else if(this.quill.scroll.query(e).prototype instanceof s.EmbedBlot){if(r=prompt(`Enter ${e}`),!r)return;this.quill.updateContents((new(z())).retain(i.index).delete(i.length).insert({[e]:r}),p.Ay.sources.USER)}else this.quill.format(e,r,p.Ay.sources.USER);this.update(i)})),this.controls.push([e,t])}update(t){const e=null==t?{}:this.quill.getFormat(t);this.controls.forEach((n=>{const[r,i]=n;if("SELECT"===i.tagName){let n=null;if(null==t)n=null;else if(null==e[r])n=i.querySelector("option[selected]");else if(!Array.isArray(e[r])){let t=e[r];"string"==typeof t&&(t=t.replace(/"/g,'\\"')),n=i.querySelector(`option[value="${t}"]`)}null==n?(i.value="",i.selectedIndex=-1):n.selected=!0}else if(null==t)i.classList.remove("ql-active"),i.setAttribute("aria-pressed","false");else if(i.hasAttribute("value")){const t=e[r],n=t===i.getAttribute("value")||null!=t&&t.toString()===i.getAttribute("value")||null==t&&!i.getAttribute("value");i.classList.toggle("ql-active",n),i.setAttribute("aria-pressed",n.toString())}else{const t=null!=e[r];i.classList.toggle("ql-active",t),i.setAttribute("aria-pressed",t.toString())}}))}}function lt(t,e,n){const r=document.createElement("button");r.setAttribute("type","button"),r.classList.add(`ql-${e}`),r.setAttribute("aria-pressed","false"),null!=n?(r.value=n,r.setAttribute("aria-label",`${e}: ${n}`)):r.setAttribute("aria-label",e),t.appendChild(r)}ot.DEFAULTS={},ot.DEFAULTS={container:null,handlers:{clean(){const t=this.quill.getSelection();if(null!=t)if(0===t.length){const t=this.quill.getFormat();Object.keys(t).forEach((t=>{null!=this.quill.scroll.query(t,s.Scope.INLINE)&&this.quill.format(t,!1,p.Ay.sources.USER)}))}else this.quill.removeFormat(t.index,t.length,p.Ay.sources.USER)},direction(t){const{align:e}=this.quill.getFormat();"rtl"===t&&null==e?this.quill.format("align","right",p.Ay.sources.USER):t||"right"!==e||this.quill.format("align",!1,p.Ay.sources.USER),this.quill.format("direction",t,p.Ay.sources.USER)},indent(t){const e=this.quill.getSelection(),n=this.quill.getFormat(e),r=parseInt(n.indent||0,10);if("+1"===t||"-1"===t){let e="+1"===t?1:-1;"rtl"===n.direction&&(e*=-1),this.quill.format("indent",r+e,p.Ay.sources.USER)}},link(t){!0===t&&(t=prompt("Enter link URL:")),this.quill.format("link",t,p.Ay.sources.USER)},list(t){const e=this.quill.getSelection(),n=this.quill.getFormat(e);"check"===t?"checked"===n.list||"unchecked"===n.list?this.quill.format("list",!1,p.Ay.sources.USER):this.quill.format("list","unchecked",p.Ay.sources.USER):this.quill.format("list",t,p.Ay.sources.USER)}}};const at='<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>';var ct={align:{"":'<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>',center:'<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>',right:'<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>',justify:'<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>'},background:'<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>',blockquote:'<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>',bold:'<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>',clean:'<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>',code:at,"code-block":at,color:'<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>',direction:{"":'<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>',rtl:'<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>'},formula:'<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>',header:{1:'<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>',2:'<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>',3:'<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>',4:'<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>',5:'<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>',6:'<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>'},italic:'<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>',image:'<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>',indent:{"+1":'<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>',"-1":'<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>'},link:'<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>',list:{bullet:'<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>',check:'<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>',ordered:'<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>'},script:{sub:'<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>',super:'<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>'},strike:'<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>',table:'<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>',underline:'<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>',video:'<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>'};let ut=0;function ht(t,e){t.setAttribute(e,`${!("true"===t.getAttribute(e))}`)}var dt=class{constructor(t){this.select=t,this.container=document.createElement("span"),this.buildPicker(),this.select.style.display="none",this.select.parentNode.insertBefore(this.container,this.select),this.label.addEventListener("mousedown",(()=>{this.togglePicker()})),this.label.addEventListener("keydown",(t=>{switch(t.key){case"Enter":this.togglePicker();break;case"Escape":this.escape(),t.preventDefault()}})),this.select.addEventListener("change",this.update.bind(this))}togglePicker(){this.container.classList.toggle("ql-expanded"),ht(this.label,"aria-expanded"),ht(this.options,"aria-hidden")}buildItem(t){const e=document.createElement("span");e.tabIndex="0",e.setAttribute("role","button"),e.classList.add("ql-picker-item");const n=t.getAttribute("value");return n&&e.setAttribute("data-value",n),t.textContent&&e.setAttribute("data-label",t.textContent),e.addEventListener("click",(()=>{this.selectItem(e,!0)})),e.addEventListener("keydown",(t=>{switch(t.key){case"Enter":this.selectItem(e,!0),t.preventDefault();break;case"Escape":this.escape(),t.preventDefault()}})),e}buildLabel(){const t=document.createElement("span");return t.classList.add("ql-picker-label"),t.innerHTML='<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>',t.tabIndex="0",t.setAttribute("role","button"),t.setAttribute("aria-expanded","false"),this.container.appendChild(t),t}buildOptions(){const t=document.createElement("span");t.classList.add("ql-picker-options"),t.setAttribute("aria-hidden","true"),t.tabIndex="-1",t.id=`ql-picker-options-${ut}`,ut+=1,this.label.setAttribute("aria-controls",t.id),this.options=t,Array.from(this.select.options).forEach((e=>{const n=this.buildItem(e);t.appendChild(n),!0===e.selected&&this.selectItem(n)})),this.container.appendChild(t)}buildPicker(){Array.from(this.select.attributes).forEach((t=>{this.container.setAttribute(t.name,t.value)})),this.container.classList.add("ql-picker"),this.label=this.buildLabel(),this.buildOptions()}escape(){this.close(),setTimeout((()=>this.label.focus()),1)}close(){this.container.classList.remove("ql-expanded"),this.label.setAttribute("aria-expanded","false"),this.options.setAttribute("aria-hidden","true")}selectItem(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n=this.container.querySelector(".ql-selected");t!==n&&(null!=n&&n.classList.remove("ql-selected"),null!=t&&(t.classList.add("ql-selected"),this.select.selectedIndex=Array.from(t.parentNode.children).indexOf(t),t.hasAttribute("data-value")?this.label.setAttribute("data-value",t.getAttribute("data-value")):this.label.removeAttribute("data-value"),t.hasAttribute("data-label")?this.label.setAttribute("data-label",t.getAttribute("data-label")):this.label.removeAttribute("data-label"),e&&(this.select.dispatchEvent(new Event("change")),this.close())))}update(){let t;if(this.select.selectedIndex>-1){const e=this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex];t=this.select.options[this.select.selectedIndex],this.selectItem(e)}else this.selectItem(null);const e=null!=t&&t!==this.select.querySelector("option[selected]");this.label.classList.toggle("ql-active",e)}},ft=class extends dt{constructor(t,e){super(t),this.label.innerHTML=e,this.container.classList.add("ql-color-picker"),Array.from(this.container.querySelectorAll(".ql-picker-item")).slice(0,7).forEach((t=>{t.classList.add("ql-primary")}))}buildItem(t){const e=super.buildItem(t);return e.style.backgroundColor=t.getAttribute("value")||"",e}selectItem(t,e){super.selectItem(t,e);const n=this.label.querySelector(".ql-color-label"),r=t&&t.getAttribute("data-value")||"";n&&("line"===n.tagName?n.style.stroke=r:n.style.fill=r)}},pt=class extends dt{constructor(t,e){super(t),this.container.classList.add("ql-icon-picker"),Array.from(this.container.querySelectorAll(".ql-picker-item")).forEach((t=>{t.innerHTML=e[t.getAttribute("data-value")||""]})),this.defaultItem=this.container.querySelector(".ql-selected"),this.selectItem(this.defaultItem)}selectItem(t,e){super.selectItem(t,e);const n=t||this.defaultItem;if(null!=n){if(this.label.innerHTML===n.innerHTML)return;this.label.innerHTML=n.innerHTML}}},gt=class{constructor(t,e){this.quill=t,this.boundsContainer=e||document.body,this.root=t.addContainer("ql-tooltip"),this.root.innerHTML=this.constructor.TEMPLATE,(t=>{const{overflowY:e}=getComputedStyle(t,null);return"visible"!==e&&"clip"!==e})(this.quill.root)&&this.quill.root.addEventListener("scroll",(()=>{this.root.style.marginTop=-1*this.quill.root.scrollTop+"px"})),this.hide()}hide(){this.root.classList.add("ql-hidden")}position(t){const e=t.left+t.width/2-this.root.offsetWidth/2,n=t.bottom+this.quill.root.scrollTop;this.root.style.left=`${e}px`,this.root.style.top=`${n}px`,this.root.classList.remove("ql-flip");const r=this.boundsContainer.getBoundingClientRect(),i=this.root.getBoundingClientRect();let s=0;if(i.right>r.right&&(s=r.right-i.right,this.root.style.left=`${e+s}px`),i.left<r.left&&(s=r.left-i.left,this.root.style.left=`${e+s}px`),i.bottom>r.bottom){const e=i.bottom-i.top,r=t.bottom-t.top+e;this.root.style.top=n-r+"px",this.root.classList.add("ql-flip")}return s}show(){this.root.classList.remove("ql-editing"),this.root.classList.remove("ql-hidden")}},mt=n(8347),bt=n(5374),yt=n(9609);const vt=[!1,"center","right","justify"],At=["#000000","#e60000","#ff9900","#ffff00","#008a00","#0066cc","#9933ff","#ffffff","#facccc","#ffebcc","#ffffcc","#cce8cc","#cce0f5","#ebd6ff","#bbbbbb","#f06666","#ffc266","#ffff66","#66b966","#66a3e0","#c285ff","#888888","#a10000","#b26b00","#b2b200","#006100","#0047b2","#6b24b2","#444444","#5c0000","#663d00","#666600","#003700","#002966","#3d1466"],xt=[!1,"serif","monospace"],Nt=["1","2","3",!1],Et=["small",!1,"large","huge"];class wt extends yt.A{constructor(t,e){super(t,e);const n=e=>{document.body.contains(t.root)?(null==this.tooltip||this.tooltip.root.contains(e.target)||document.activeElement===this.tooltip.textbox||this.quill.hasFocus()||this.tooltip.hide(),null!=this.pickers&&this.pickers.forEach((t=>{t.container.contains(e.target)||t.close()}))):document.body.removeEventListener("click",n)};t.emitter.listenDOM("click",document.body,n)}addModule(t){const e=super.addModule(t);return"toolbar"===t&&this.extendToolbar(e),e}buildButtons(t,e){Array.from(t).forEach((t=>{(t.getAttribute("class")||"").split(/\s+/).forEach((n=>{if(n.startsWith("ql-")&&(n=n.slice(3),null!=e[n]))if("direction"===n)t.innerHTML=e[n][""]+e[n].rtl;else if("string"==typeof e[n])t.innerHTML=e[n];else{const r=t.value||"";null!=r&&e[n][r]&&(t.innerHTML=e[n][r])}}))}))}buildPickers(t,e){this.pickers=Array.from(t).map((t=>{if(t.classList.contains("ql-align")&&(null==t.querySelector("option")&&kt(t,vt),"object"==typeof e.align))return new pt(t,e.align);if(t.classList.contains("ql-background")||t.classList.contains("ql-color")){const n=t.classList.contains("ql-background")?"background":"color";return null==t.querySelector("option")&&kt(t,At,"background"===n?"#ffffff":"#000000"),new ft(t,e[n])}return null==t.querySelector("option")&&(t.classList.contains("ql-font")?kt(t,xt):t.classList.contains("ql-header")?kt(t,Nt):t.classList.contains("ql-size")&&kt(t,Et)),new dt(t)})),this.quill.on(bt.A.events.EDITOR_CHANGE,(()=>{this.pickers.forEach((t=>{t.update()}))}))}}wt.DEFAULTS=(0,mt.A)({},yt.A.DEFAULTS,{modules:{toolbar:{handlers:{formula(){this.quill.theme.tooltip.edit("formula")},image(){let t=this.container.querySelector("input.ql-image[type=file]");null==t&&(t=document.createElement("input"),t.setAttribute("type","file"),t.setAttribute("accept",this.quill.uploader.options.mimetypes.join(", ")),t.classList.add("ql-image"),t.addEventListener("change",(()=>{const e=this.quill.getSelection(!0);this.quill.uploader.upload(e,t.files),t.value=""})),this.container.appendChild(t)),t.click()},video(){this.quill.theme.tooltip.edit("video")}}}}});class qt extends gt{constructor(t,e){super(t,e),this.textbox=this.root.querySelector('input[type="text"]'),this.listen()}listen(){this.textbox.addEventListener("keydown",(t=>{"Enter"===t.key?(this.save(),t.preventDefault()):"Escape"===t.key&&(this.cancel(),t.preventDefault())}))}cancel(){this.hide(),this.restoreFocus()}edit(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"link",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(this.root.classList.remove("ql-hidden"),this.root.classList.add("ql-editing"),null==this.textbox)return;null!=e?this.textbox.value=e:t!==this.root.getAttribute("data-mode")&&(this.textbox.value="");const n=this.quill.getBounds(this.quill.selection.savedRange);null!=n&&this.position(n),this.textbox.select(),this.textbox.setAttribute("placeholder",this.textbox.getAttribute(`data-${t}`)||""),this.root.setAttribute("data-mode",t)}restoreFocus(){this.quill.focus({preventScroll:!0})}save(){let{value:t}=this.textbox;switch(this.root.getAttribute("data-mode")){case"link":{const{scrollTop:e}=this.quill.root;this.linkRange?(this.quill.formatText(this.linkRange,"link",t,bt.A.sources.USER),delete this.linkRange):(this.restoreFocus(),this.quill.format("link",t,bt.A.sources.USER)),this.quill.root.scrollTop=e;break}case"video":t=function(t){let e=t.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/)||t.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);return e?`${e[1]||"https"}://www.youtube.com/embed/${e[2]}?showinfo=0`:(e=t.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/))?`${e[1]||"https"}://player.vimeo.com/video/${e[2]}/`:t}(t);case"formula":{if(!t)break;const e=this.quill.getSelection(!0);if(null!=e){const n=e.index+e.length;this.quill.insertEmbed(n,this.root.getAttribute("data-mode"),t,bt.A.sources.USER),"formula"===this.root.getAttribute("data-mode")&&this.quill.insertText(n+1," ",bt.A.sources.USER),this.quill.setSelection(n+2,bt.A.sources.USER)}break}}this.textbox.value="",this.hide()}}function kt(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];e.forEach((e=>{const r=document.createElement("option");e===n?r.setAttribute("selected","selected"):r.setAttribute("value",String(e)),t.appendChild(r)}))}var _t=n(8298);const Lt=[["bold","italic","link"],[{header:1},{header:2},"blockquote"]];class St extends qt{static TEMPLATE=['<span class="ql-tooltip-arrow"></span>','<div class="ql-tooltip-editor">','<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">','<a class="ql-close"></a>',"</div>"].join("");constructor(t,e){super(t,e),this.quill.on(bt.A.events.EDITOR_CHANGE,((t,e,n,r)=>{if(t===bt.A.events.SELECTION_CHANGE)if(null!=e&&e.length>0&&r===bt.A.sources.USER){this.show(),this.root.style.left="0px",this.root.style.width="",this.root.style.width=`${this.root.offsetWidth}px`;const t=this.quill.getLines(e.index,e.length);if(1===t.length){const t=this.quill.getBounds(e);null!=t&&this.position(t)}else{const n=t[t.length-1],r=this.quill.getIndex(n),i=Math.min(n.length()-1,e.index+e.length-r),s=this.quill.getBounds(new _t.Q(r,i));null!=s&&this.position(s)}}else document.activeElement!==this.textbox&&this.quill.hasFocus()&&this.hide()}))}listen(){super.listen(),this.root.querySelector(".ql-close").addEventListener("click",(()=>{this.root.classList.remove("ql-editing")})),this.quill.on(bt.A.events.SCROLL_OPTIMIZE,(()=>{setTimeout((()=>{if(this.root.classList.contains("ql-hidden"))return;const t=this.quill.getSelection();if(null!=t){const e=this.quill.getBounds(t);null!=e&&this.position(e)}}),1)}))}cancel(){this.show()}position(t){const e=super.position(t),n=this.root.querySelector(".ql-tooltip-arrow");return n.style.marginLeft="",0!==e&&(n.style.marginLeft=-1*e-n.offsetWidth/2+"px"),e}}class Ot extends wt{constructor(t,e){null!=e.modules.toolbar&&null==e.modules.toolbar.container&&(e.modules.toolbar.container=Lt),super(t,e),this.quill.container.classList.add("ql-bubble")}extendToolbar(t){this.tooltip=new St(this.quill,this.options.bounds),null!=t.container&&(this.tooltip.root.appendChild(t.container),this.buildButtons(t.container.querySelectorAll("button"),ct),this.buildPickers(t.container.querySelectorAll("select"),ct))}}Ot.DEFAULTS=(0,mt.A)({},wt.DEFAULTS,{modules:{toolbar:{handlers:{link(t){t?this.quill.theme.tooltip.edit():this.quill.format("link",!1,p.Ay.sources.USER)}}}}});const Tt=[[{header:["1","2","3",!1]}],["bold","italic","underline","link"],[{list:"ordered"},{list:"bullet"}],["clean"]];class jt extends qt{static TEMPLATE=['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>','<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">','<a class="ql-action"></a>','<a class="ql-remove"></a>'].join("");preview=this.root.querySelector("a.ql-preview");listen(){super.listen(),this.root.querySelector("a.ql-action").addEventListener("click",(t=>{this.root.classList.contains("ql-editing")?this.save():this.edit("link",this.preview.textContent),t.preventDefault()})),this.root.querySelector("a.ql-remove").addEventListener("click",(t=>{if(null!=this.linkRange){const t=this.linkRange;this.restoreFocus(),this.quill.formatText(t,"link",!1,bt.A.sources.USER),delete this.linkRange}t.preventDefault(),this.hide()})),this.quill.on(bt.A.events.SELECTION_CHANGE,((t,e,n)=>{if(null!=t){if(0===t.length&&n===bt.A.sources.USER){const[e,n]=this.quill.scroll.descendant(w,t.index);if(null!=e){this.linkRange=new _t.Q(t.index-n,e.length());const r=w.formats(e.domNode);this.preview.textContent=r,this.preview.setAttribute("href",r),this.show();const i=this.quill.getBounds(this.linkRange);return void(null!=i&&this.position(i))}}else delete this.linkRange;this.hide()}}))}show(){super.show(),this.root.removeAttribute("data-mode")}}class Ct extends wt{constructor(t,e){null!=e.modules.toolbar&&null==e.modules.toolbar.container&&(e.modules.toolbar.container=Tt),super(t,e),this.quill.container.classList.add("ql-snow")}extendToolbar(t){null!=t.container&&(t.container.classList.add("ql-snow"),this.buildButtons(t.container.querySelectorAll("button"),ct),this.buildPickers(t.container.querySelectorAll("select"),ct),this.tooltip=new jt(this.quill,this.options.bounds),t.container.querySelector(".ql-link")&&this.quill.keyboard.addBinding({key:"k",shortKey:!0},((e,n)=>{t.handlers.link.call(t,!n.format.link)})))}}Ct.DEFAULTS=(0,mt.A)({},wt.DEFAULTS,{modules:{toolbar:{handlers:{link(t){if(t){const t=this.quill.getSelection();if(null==t||0===t.length)return;let e=this.quill.getText(t);/^\S+@\S+\.\S+$/.test(e)&&0!==e.indexOf("mailto:")&&(e=`mailto:${e}`);const{tooltip:n}=this.quill.theme;n.edit("link",e)}else this.quill.format("link",!1,p.Ay.sources.USER)}}}}});var Rt=Ct;t.default.register({"attributors/attribute/direction":i.Mc,"attributors/class/align":e.qh,"attributors/class/background":b.l,"attributors/class/color":y.g3,"attributors/class/direction":i.sY,"attributors/class/font":v.q,"attributors/class/size":A.U,"attributors/style/align":e.Hu,"attributors/style/background":b.s,"attributors/style/color":y.JM,"attributors/style/direction":i.VL,"attributors/style/font":v.z,"attributors/style/size":A.r},!0),t.default.register({"formats/align":e.qh,"formats/direction":i.sY,"formats/indent":l,"formats/background":b.s,"formats/color":y.JM,"formats/font":v.q,"formats/size":A.U,"formats/blockquote":u,"formats/code-block":D.Ay,"formats/header":d,"formats/list":m,"formats/bold":E,"formats/code":D.Cy,"formats/italic":class extends E{static blotName="italic";static tagName=["EM","I"]},"formats/link":w,"formats/script":_,"formats/strike":class extends E{static blotName="strike";static tagName=["S","STRIKE"]},"formats/underline":S,"formats/formula":j,"formats/image":I,"formats/video":U,"modules/syntax":Q,"modules/table":it,"modules/toolbar":ot,"themes/bubble":Ot,"themes/snow":Rt,"ui/icons":ct,"ui/picker":dt,"ui/icon-picker":pt,"ui/color-picker":ft,"ui/tooltip":gt},!0);var It=t.default}(),r.default}()}));
//# sourceMappingURL=quill.js.map


!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("quill")):"function"==typeof define&&define.amd?define(["quill"],e):"object"==typeof exports?exports.QuillTableBetter=e(require("quill")):t.QuillTableBetter=e(t.Quill)}(self,(function(t){return function(){var e={386:function(t){var e=-1,r=1,n=0;function i(t,g,b,m,v){if(t===g)return t?[[n,t]]:[];if(null!=b){var w=function(t,e,r){var n="number"==typeof r?{index:r,length:0}:r.oldRange,i="number"==typeof r?null:r.newRange,s=t.length,o=e.length;if(0===n.length&&(null===i||0===i.length)){var l=n.index,a=t.slice(0,l),c=t.slice(l),u=i?i.index:null,h=l+o-s;if((null===u||u===h)&&!(h<0||h>o)){var d=e.slice(0,h);if((g=e.slice(h))===c){var p=Math.min(l,h);if((m=a.slice(0,p))===(w=d.slice(0,p)))return y(m,a.slice(p),d.slice(p),c)}}if(null===u||u===l){var f=l,g=(d=e.slice(0,f),e.slice(f));if(d===a){var b=Math.min(s-f,o-f);if((v=c.slice(c.length-b))===(k=g.slice(g.length-b)))return y(a,c.slice(0,c.length-b),g.slice(0,g.length-b),v)}}}if(n.length>0&&i&&0===i.length){var m=t.slice(0,n.index),v=t.slice(n.index+n.length);if(!(o<(p=m.length)+(b=v.length))){var w=e.slice(0,p),k=e.slice(o-b);if(m===w&&v===k)return y(m,t.slice(p,s-b),e.slice(p,o-b),v)}}return null}(t,g,b);if(w)return w}var k=o(t,g),x=t.substring(0,k);k=a(t=t.substring(k),g=g.substring(k));var _=t.substring(t.length-k),C=function(t,l){var c;if(!t)return[[r,l]];if(!l)return[[e,t]];var u=t.length>l.length?t:l,h=t.length>l.length?l:t,d=u.indexOf(h);if(-1!==d)return c=[[r,u.substring(0,d)],[n,h],[r,u.substring(d+h.length)]],t.length>l.length&&(c[0][0]=c[2][0]=e),c;if(1===h.length)return[[e,t],[r,l]];var p=function(t,e){var r=t.length>e.length?t:e,n=t.length>e.length?e:t;if(r.length<4||2*n.length<r.length)return null;function i(t,e,r){for(var n,i,s,l,c=t.substring(r,r+Math.floor(t.length/4)),u=-1,h="";-1!==(u=e.indexOf(c,u+1));){var d=o(t.substring(r),e.substring(u)),p=a(t.substring(0,r),e.substring(0,u));h.length<p+d&&(h=e.substring(u-p,u)+e.substring(u,u+d),n=t.substring(0,r-p),i=t.substring(r+d),s=e.substring(0,u-p),l=e.substring(u+d))}return 2*h.length>=t.length?[n,i,s,l,h]:null}var s,l,c,u,h,d=i(r,n,Math.ceil(r.length/4)),p=i(r,n,Math.ceil(r.length/2));return d||p?(s=p?d&&d[4].length>p[4].length?d:p:d,t.length>e.length?(l=s[0],c=s[1],u=s[2],h=s[3]):(u=s[0],h=s[1],l=s[2],c=s[3]),[l,c,u,h,s[4]]):null}(t,l);if(p){var f=p[0],g=p[1],b=p[2],m=p[3],v=p[4],y=i(f,b),w=i(g,m);return y.concat([[n,v]],w)}return function(t,n){for(var i=t.length,o=n.length,l=Math.ceil((i+o)/2),a=l,c=2*l,u=new Array(c),h=new Array(c),d=0;d<c;d++)u[d]=-1,h[d]=-1;u[a+1]=0,h[a+1]=0;for(var p=i-o,f=p%2!=0,g=0,b=0,m=0,v=0,y=0;y<l;y++){for(var w=-y+g;w<=y-b;w+=2){for(var k=a+w,x=(A=w===-y||w!==y&&u[k-1]<u[k+1]?u[k+1]:u[k-1]+1)-w;A<i&&x<o&&t.charAt(A)===n.charAt(x);)A++,x++;if(u[k]=A,A>i)b+=2;else if(x>o)g+=2;else if(f&&(N=a+p-w)>=0&&N<c&&-1!==h[N]&&A>=(C=i-h[N]))return s(t,n,A,x)}for(var _=-y+m;_<=y-v;_+=2){for(var C,N=a+_,T=(C=_===-y||_!==y&&h[N-1]<h[N+1]?h[N+1]:h[N-1]+1)-_;C<i&&T<o&&t.charAt(i-C-1)===n.charAt(o-T-1);)C++,T++;if(h[N]=C,C>i)v+=2;else if(T>o)m+=2;else if(!f){var A;if((k=a+p-_)>=0&&k<c&&-1!==u[k])if(x=a+(A=u[k])-k,A>=(C=i-C))return s(t,n,A,x)}}}return[[e,t],[r,n]]}(t,l)}(t=t.substring(0,t.length-k),g=g.substring(0,g.length-k));return x&&C.unshift([n,x]),_&&C.push([n,_]),f(C,v),m&&function(t){for(var i=!1,s=[],o=0,g=null,b=0,m=0,v=0,y=0,w=0;b<t.length;)t[b][0]==n?(s[o++]=b,m=y,v=w,y=0,w=0,g=t[b][1]):(t[b][0]==r?y+=t[b][1].length:w+=t[b][1].length,g&&g.length<=Math.max(m,v)&&g.length<=Math.max(y,w)&&(t.splice(s[o-1],0,[e,g]),t[s[o-1]+1][0]=r,o--,b=--o>0?s[o-1]:-1,m=0,v=0,y=0,w=0,g=null,i=!0)),b++;for(i&&f(t),function(t){function e(t,e){if(!t||!e)return 6;var r=t.charAt(t.length-1),n=e.charAt(0),i=r.match(c),s=n.match(c),o=i&&r.match(u),l=s&&n.match(u),a=o&&r.match(h),f=l&&n.match(h),g=a&&t.match(d),b=f&&e.match(p);return g||b?5:a||f?4:i&&!o&&l?3:o||l?2:i||s?1:0}for(var r=1;r<t.length-1;){if(t[r-1][0]==n&&t[r+1][0]==n){var i=t[r-1][1],s=t[r][1],o=t[r+1][1],l=a(i,s);if(l){var f=s.substring(s.length-l);i=i.substring(0,i.length-l),s=f+s.substring(0,s.length-l),o=f+o}for(var g=i,b=s,m=o,v=e(i,s)+e(s,o);s.charAt(0)===o.charAt(0);){i+=s.charAt(0),s=s.substring(1)+o.charAt(0),o=o.substring(1);var y=e(i,s)+e(s,o);y>=v&&(v=y,g=i,b=s,m=o)}t[r-1][1]!=g&&(g?t[r-1][1]=g:(t.splice(r-1,1),r--),t[r][1]=b,m?t[r+1][1]=m:(t.splice(r+1,1),r--))}r++}}(t),b=1;b<t.length;){if(t[b-1][0]==e&&t[b][0]==r){var k=t[b-1][1],x=t[b][1],_=l(k,x),C=l(x,k);_>=C?(_>=k.length/2||_>=x.length/2)&&(t.splice(b,0,[n,x.substring(0,_)]),t[b-1][1]=k.substring(0,k.length-_),t[b+1][1]=x.substring(_),b++):(C>=k.length/2||C>=x.length/2)&&(t.splice(b,0,[n,k.substring(0,C)]),t[b-1][0]=r,t[b-1][1]=x.substring(0,x.length-C),t[b+1][0]=e,t[b+1][1]=k.substring(C),b++),b++}b++}}(C),C}function s(t,e,r,n){var s=t.substring(0,r),o=e.substring(0,n),l=t.substring(r),a=e.substring(n),c=i(s,o),u=i(l,a);return c.concat(u)}function o(t,e){if(!t||!e||t.charAt(0)!==e.charAt(0))return 0;for(var r=0,n=Math.min(t.length,e.length),i=n,s=0;r<i;)t.substring(s,i)==e.substring(s,i)?s=r=i:n=i,i=Math.floor((n-r)/2+r);return g(t.charCodeAt(i-1))&&i--,i}function l(t,e){var r=t.length,n=e.length;if(0==r||0==n)return 0;r>n?t=t.substring(r-n):r<n&&(e=e.substring(0,r));var i=Math.min(r,n);if(t==e)return i;for(var s=0,o=1;;){var l=t.substring(i-o),a=e.indexOf(l);if(-1==a)return s;o+=a,0!=a&&t.substring(i-o)!=e.substring(0,o)||(s=o,o++)}}function a(t,e){if(!t||!e||t.slice(-1)!==e.slice(-1))return 0;for(var r=0,n=Math.min(t.length,e.length),i=n,s=0;r<i;)t.substring(t.length-i,t.length-s)==e.substring(e.length-i,e.length-s)?s=r=i:n=i,i=Math.floor((n-r)/2+r);return b(t.charCodeAt(t.length-i))&&i--,i}var c=/[^a-zA-Z0-9]/,u=/\s/,h=/[\r\n]/,d=/\n\r?\n$/,p=/^\r?\n\r?\n/;function f(t,i){t.push([n,""]);for(var s,l=0,c=0,u=0,h="",d="";l<t.length;)if(l<t.length-1&&!t[l][1])t.splice(l,1);else switch(t[l][0]){case r:u++,d+=t[l][1],l++;break;case e:c++,h+=t[l][1],l++;break;case n:var p=l-u-c-1;if(i){if(p>=0&&v(t[p][1])){var g=t[p][1].slice(-1);if(t[p][1]=t[p][1].slice(0,-1),h=g+h,d=g+d,!t[p][1]){t.splice(p,1),l--;var b=p-1;t[b]&&t[b][0]===r&&(u++,d=t[b][1]+d,b--),t[b]&&t[b][0]===e&&(c++,h=t[b][1]+h,b--),p=b}}m(t[l][1])&&(g=t[l][1].charAt(0),t[l][1]=t[l][1].slice(1),h+=g,d+=g)}if(l<t.length-1&&!t[l][1]){t.splice(l,1);break}if(h.length>0||d.length>0){h.length>0&&d.length>0&&(0!==(s=o(d,h))&&(p>=0?t[p][1]+=d.substring(0,s):(t.splice(0,0,[n,d.substring(0,s)]),l++),d=d.substring(s),h=h.substring(s)),0!==(s=a(d,h))&&(t[l][1]=d.substring(d.length-s)+t[l][1],d=d.substring(0,d.length-s),h=h.substring(0,h.length-s)));var y=u+c;0===h.length&&0===d.length?(t.splice(l-y,y),l-=y):0===h.length?(t.splice(l-y,y,[r,d]),l=l-y+1):0===d.length?(t.splice(l-y,y,[e,h]),l=l-y+1):(t.splice(l-y,y,[e,h],[r,d]),l=l-y+2)}0!==l&&t[l-1][0]===n?(t[l-1][1]+=t[l][1],t.splice(l,1)):l++,u=0,c=0,h="",d=""}""===t[t.length-1][1]&&t.pop();var w=!1;for(l=1;l<t.length-1;)t[l-1][0]===n&&t[l+1][0]===n&&(t[l][1].substring(t[l][1].length-t[l-1][1].length)===t[l-1][1]?(t[l][1]=t[l-1][1]+t[l][1].substring(0,t[l][1].length-t[l-1][1].length),t[l+1][1]=t[l-1][1]+t[l+1][1],t.splice(l-1,1),w=!0):t[l][1].substring(0,t[l+1][1].length)==t[l+1][1]&&(t[l-1][1]+=t[l+1][1],t[l][1]=t[l][1].substring(t[l+1][1].length)+t[l+1][1],t.splice(l+1,1),w=!0)),l++;w&&f(t,i)}function g(t){return t>=55296&&t<=56319}function b(t){return t>=56320&&t<=57343}function m(t){return b(t.charCodeAt(0))}function v(t){return g(t.charCodeAt(t.length-1))}function y(t,i,s,o){return v(t)||m(o)?null:function(t){for(var e=[],r=0;r<t.length;r++)t[r][1].length>0&&e.push(t[r]);return e}([[n,t],[e,i],[r,s],[n,o]])}function w(t,e,r,n){return i(t,e,r,n,!0)}w.INSERT=r,w.DELETE=e,w.EQUAL=n,t.exports=w},861:function(t,e,r){t=r.nmd(t);var n="__lodash_hash_undefined__",i=9007199254740991,s="[object Arguments]",o="[object Boolean]",l="[object Date]",a="[object Function]",c="[object GeneratorFunction]",u="[object Map]",h="[object Number]",d="[object Object]",p="[object Promise]",f="[object RegExp]",g="[object Set]",b="[object String]",m="[object Symbol]",v="[object WeakMap]",y="[object ArrayBuffer]",w="[object DataView]",k="[object Float32Array]",x="[object Float64Array]",_="[object Int8Array]",C="[object Int16Array]",N="[object Int32Array]",T="[object Uint8Array]",A="[object Uint8ClampedArray]",L="[object Uint16Array]",S="[object Uint32Array]",j=/\w*$/,E=/^\[object .+?Constructor\]$/,M=/^(?:0|[1-9]\d*)$/,q={};q[s]=q["[object Array]"]=q[y]=q[w]=q[o]=q[l]=q[k]=q[x]=q[_]=q[C]=q[N]=q[u]=q[h]=q[d]=q[f]=q[g]=q[b]=q[m]=q[T]=q[A]=q[L]=q[S]=!0,q["[object Error]"]=q[a]=q[v]=!1;var O="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g,B="object"==typeof self&&self&&self.Object===Object&&self,R=O||B||Function("return this")(),I=e&&!e.nodeType&&e,P=I&&t&&!t.nodeType&&t,D=P&&P.exports===I;function z(t,e){return t.set(e[0],e[1]),t}function H(t,e){return t.add(e),t}function F(t,e,r,n){var i=-1,s=t?t.length:0;for(n&&s&&(r=t[++i]);++i<s;)r=e(r,t[i],i,t);return r}function U(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function V(t){var e=-1,r=Array(t.size);return t.forEach((function(t,n){r[++e]=[n,t]})),r}function W(t,e){return function(r){return t(e(r))}}function $(t){var e=-1,r=Array(t.size);return t.forEach((function(t){r[++e]=t})),r}var G,Y=Array.prototype,Z=Function.prototype,K=Object.prototype,X=R["__core-js_shared__"],J=(G=/[^.]+$/.exec(X&&X.keys&&X.keys.IE_PROTO||""))?"Symbol(src)_1."+G:"",Q=Z.toString,tt=K.hasOwnProperty,et=K.toString,rt=RegExp("^"+Q.call(tt).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),nt=D?R.Buffer:void 0,it=R.Symbol,st=R.Uint8Array,ot=W(Object.getPrototypeOf,Object),lt=Object.create,at=K.propertyIsEnumerable,ct=Y.splice,ut=Object.getOwnPropertySymbols,ht=nt?nt.isBuffer:void 0,dt=W(Object.keys,Object),pt=Rt(R,"DataView"),ft=Rt(R,"Map"),gt=Rt(R,"Promise"),bt=Rt(R,"Set"),mt=Rt(R,"WeakMap"),vt=Rt(Object,"create"),yt=Ht(pt),wt=Ht(ft),kt=Ht(gt),xt=Ht(bt),_t=Ht(mt),Ct=it?it.prototype:void 0,Nt=Ct?Ct.valueOf:void 0;function Tt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function At(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Lt(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function St(t){this.__data__=new At(t)}function jt(t,e,r){var n=t[e];tt.call(t,e)&&Ft(n,r)&&(void 0!==r||e in t)||(t[e]=r)}function Et(t,e){for(var r=t.length;r--;)if(Ft(t[r][0],e))return r;return-1}function Mt(t,e,r,n,i,p,v){var E;if(n&&(E=p?n(t,i,p,v):n(t)),void 0!==E)return E;if(!Gt(t))return t;var M=Ut(t);if(M){if(E=function(t){var e=t.length,r=t.constructor(e);return e&&"string"==typeof t[0]&&tt.call(t,"index")&&(r.index=t.index,r.input=t.input),r}(t),!e)return function(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}(t,E)}else{var O=Pt(t),B=O==a||O==c;if(Wt(t))return function(t,e){if(e)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}(t,e);if(O==d||O==s||B&&!p){if(U(t))return p?t:{};if(E=function(t){return"function"!=typeof t.constructor||zt(t)?{}:Gt(e=ot(t))?lt(e):{};var e}(B?{}:t),!e)return function(t,e){return Ot(t,It(t),e)}(t,function(t,e){return t&&Ot(e,Yt(e),t)}(E,t))}else{if(!q[O])return p?t:{};E=function(t,e,r,n){var i,s=t.constructor;switch(e){case y:return qt(t);case o:case l:return new s(+t);case w:return function(t,e){var r=e?qt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}(t,n);case k:case x:case _:case C:case N:case T:case A:case L:case S:return function(t,e){var r=e?qt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}(t,n);case u:return function(t,e,r){return F(e?r(V(t),!0):V(t),z,new t.constructor)}(t,n,r);case h:case b:return new s(t);case f:return function(t){var e=new t.constructor(t.source,j.exec(t));return e.lastIndex=t.lastIndex,e}(t);case g:return function(t,e,r){return F(e?r($(t),!0):$(t),H,new t.constructor)}(t,n,r);case m:return i=t,Nt?Object(Nt.call(i)):{}}}(t,O,Mt,e)}}v||(v=new St);var R=v.get(t);if(R)return R;if(v.set(t,E),!M)var I=r?function(t){return function(t,e,r){var n=e(t);return Ut(t)?n:function(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}(n,r(t))}(t,Yt,It)}(t):Yt(t);return function(t,e){for(var r=-1,n=t?t.length:0;++r<n&&!1!==e(t[r],r););}(I||t,(function(i,s){I&&(i=t[s=i]),jt(E,s,Mt(i,e,r,n,s,t,v))})),E}function qt(t){var e=new t.constructor(t.byteLength);return new st(e).set(new st(t)),e}function Ot(t,e,r,n){r||(r={});for(var i=-1,s=e.length;++i<s;){var o=e[i],l=n?n(r[o],t[o],o,r,t):void 0;jt(r,o,void 0===l?t[o]:l)}return r}function Bt(t,e){var r,n,i=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?i["string"==typeof e?"string":"hash"]:i.map}function Rt(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return function(t){return!(!Gt(t)||(e=t,J&&J in e))&&($t(t)||U(t)?rt:E).test(Ht(t));var e}(r)?r:void 0}Tt.prototype.clear=function(){this.__data__=vt?vt(null):{}},Tt.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},Tt.prototype.get=function(t){var e=this.__data__;if(vt){var r=e[t];return r===n?void 0:r}return tt.call(e,t)?e[t]:void 0},Tt.prototype.has=function(t){var e=this.__data__;return vt?void 0!==e[t]:tt.call(e,t)},Tt.prototype.set=function(t,e){return this.__data__[t]=vt&&void 0===e?n:e,this},At.prototype.clear=function(){this.__data__=[]},At.prototype.delete=function(t){var e=this.__data__,r=Et(e,t);return!(r<0||(r==e.length-1?e.pop():ct.call(e,r,1),0))},At.prototype.get=function(t){var e=this.__data__,r=Et(e,t);return r<0?void 0:e[r][1]},At.prototype.has=function(t){return Et(this.__data__,t)>-1},At.prototype.set=function(t,e){var r=this.__data__,n=Et(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},Lt.prototype.clear=function(){this.__data__={hash:new Tt,map:new(ft||At),string:new Tt}},Lt.prototype.delete=function(t){return Bt(this,t).delete(t)},Lt.prototype.get=function(t){return Bt(this,t).get(t)},Lt.prototype.has=function(t){return Bt(this,t).has(t)},Lt.prototype.set=function(t,e){return Bt(this,t).set(t,e),this},St.prototype.clear=function(){this.__data__=new At},St.prototype.delete=function(t){return this.__data__.delete(t)},St.prototype.get=function(t){return this.__data__.get(t)},St.prototype.has=function(t){return this.__data__.has(t)},St.prototype.set=function(t,e){var r=this.__data__;if(r instanceof At){var n=r.__data__;if(!ft||n.length<199)return n.push([t,e]),this;r=this.__data__=new Lt(n)}return r.set(t,e),this};var It=ut?W(ut,Object):function(){return[]},Pt=function(t){return et.call(t)};function Dt(t,e){return!!(e=null==e?i:e)&&("number"==typeof t||M.test(t))&&t>-1&&t%1==0&&t<e}function zt(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||K)}function Ht(t){if(null!=t){try{return Q.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function Ft(t,e){return t===e||t!=t&&e!=e}(pt&&Pt(new pt(new ArrayBuffer(1)))!=w||ft&&Pt(new ft)!=u||gt&&Pt(gt.resolve())!=p||bt&&Pt(new bt)!=g||mt&&Pt(new mt)!=v)&&(Pt=function(t){var e=et.call(t),r=e==d?t.constructor:void 0,n=r?Ht(r):void 0;if(n)switch(n){case yt:return w;case wt:return u;case kt:return p;case xt:return g;case _t:return v}return e});var Ut=Array.isArray;function Vt(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=i}(t.length)&&!$t(t)}var Wt=ht||function(){return!1};function $t(t){var e=Gt(t)?et.call(t):"";return e==a||e==c}function Gt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function Yt(t){return Vt(t)?function(t,e){var r=Ut(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&Vt(t)}(t)&&tt.call(t,"callee")&&(!at.call(t,"callee")||et.call(t)==s)}(t)?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],n=r.length,i=!!n;for(var o in t)!e&&!tt.call(t,o)||i&&("length"==o||Dt(o,n))||r.push(o);return r}(t):function(t){if(!zt(t))return dt(t);var e=[];for(var r in Object(t))tt.call(t,r)&&"constructor"!=r&&e.push(r);return e}(t)}t.exports=function(t){return Mt(t,!0,!0)}},842:function(t,e,r){t=r.nmd(t);var n="__lodash_hash_undefined__",i=1,s=2,o=9007199254740991,l="[object Arguments]",a="[object Array]",c="[object AsyncFunction]",u="[object Boolean]",h="[object Date]",d="[object Error]",p="[object Function]",f="[object GeneratorFunction]",g="[object Map]",b="[object Number]",m="[object Null]",v="[object Object]",y="[object Promise]",w="[object Proxy]",k="[object RegExp]",x="[object Set]",_="[object String]",C="[object Undefined]",N="[object WeakMap]",T="[object ArrayBuffer]",A="[object DataView]",L=/^\[object .+?Constructor\]$/,S=/^(?:0|[1-9]\d*)$/,j={};j["[object Float32Array]"]=j["[object Float64Array]"]=j["[object Int8Array]"]=j["[object Int16Array]"]=j["[object Int32Array]"]=j["[object Uint8Array]"]=j["[object Uint8ClampedArray]"]=j["[object Uint16Array]"]=j["[object Uint32Array]"]=!0,j[l]=j[a]=j[T]=j[u]=j[A]=j[h]=j[d]=j[p]=j[g]=j[b]=j[v]=j[k]=j[x]=j[_]=j[N]=!1;var E="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g,M="object"==typeof self&&self&&self.Object===Object&&self,q=E||M||Function("return this")(),O=e&&!e.nodeType&&e,B=O&&t&&!t.nodeType&&t,R=B&&B.exports===O,I=R&&E.process,P=function(){try{return I&&I.binding&&I.binding("util")}catch(t){}}(),D=P&&P.isTypedArray;function z(t,e){for(var r=-1,n=null==t?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}function H(t){var e=-1,r=Array(t.size);return t.forEach((function(t,n){r[++e]=[n,t]})),r}function F(t){var e=-1,r=Array(t.size);return t.forEach((function(t){r[++e]=t})),r}var U,V,W,$=Array.prototype,G=Function.prototype,Y=Object.prototype,Z=q["__core-js_shared__"],K=G.toString,X=Y.hasOwnProperty,J=(U=/[^.]+$/.exec(Z&&Z.keys&&Z.keys.IE_PROTO||""))?"Symbol(src)_1."+U:"",Q=Y.toString,tt=RegExp("^"+K.call(X).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),et=R?q.Buffer:void 0,rt=q.Symbol,nt=q.Uint8Array,it=Y.propertyIsEnumerable,st=$.splice,ot=rt?rt.toStringTag:void 0,lt=Object.getOwnPropertySymbols,at=et?et.isBuffer:void 0,ct=(V=Object.keys,W=Object,function(t){return V(W(t))}),ut=Bt(q,"DataView"),ht=Bt(q,"Map"),dt=Bt(q,"Promise"),pt=Bt(q,"Set"),ft=Bt(q,"WeakMap"),gt=Bt(Object,"create"),bt=Dt(ut),mt=Dt(ht),vt=Dt(dt),yt=Dt(pt),wt=Dt(ft),kt=rt?rt.prototype:void 0,xt=kt?kt.valueOf:void 0;function _t(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Ct(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Nt(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function Tt(t){var e=-1,r=null==t?0:t.length;for(this.__data__=new Nt;++e<r;)this.add(t[e])}function At(t){var e=this.__data__=new Ct(t);this.size=e.size}function Lt(t,e){for(var r=t.length;r--;)if(zt(t[r][0],e))return r;return-1}function St(t){return null==t?void 0===t?C:m:ot&&ot in Object(t)?function(t){var e=X.call(t,ot),r=t[ot];try{t[ot]=void 0;var n=!0}catch(t){}var i=Q.call(t);return n&&(e?t[ot]=r:delete t[ot]),i}(t):function(t){return Q.call(t)}(t)}function jt(t){return Gt(t)&&St(t)==l}function Et(t,e,r,n,o){return t===e||(null==t||null==e||!Gt(t)&&!Gt(e)?t!=t&&e!=e:function(t,e,r,n,o,c){var p=Ft(t),f=Ft(e),m=p?a:It(t),y=f?a:It(e),w=(m=m==l?v:m)==v,C=(y=y==l?v:y)==v,N=m==y;if(N&&Ut(t)){if(!Ut(e))return!1;p=!0,w=!1}if(N&&!w)return c||(c=new At),p||Yt(t)?Mt(t,e,r,n,o,c):function(t,e,r,n,o,l,a){switch(r){case A:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case T:return!(t.byteLength!=e.byteLength||!l(new nt(t),new nt(e)));case u:case h:case b:return zt(+t,+e);case d:return t.name==e.name&&t.message==e.message;case k:case _:return t==e+"";case g:var c=H;case x:var p=n&i;if(c||(c=F),t.size!=e.size&&!p)return!1;var f=a.get(t);if(f)return f==e;n|=s,a.set(t,e);var m=Mt(c(t),c(e),n,o,l,a);return a.delete(t),m;case"[object Symbol]":if(xt)return xt.call(t)==xt.call(e)}return!1}(t,e,m,r,n,o,c);if(!(r&i)){var L=w&&X.call(t,"__wrapped__"),S=C&&X.call(e,"__wrapped__");if(L||S){var j=L?t.value():t,E=S?e.value():e;return c||(c=new At),o(j,E,r,n,c)}}return!!N&&(c||(c=new At),function(t,e,r,n,s,o){var l=r&i,a=qt(t),c=a.length;if(c!=qt(e).length&&!l)return!1;for(var u=c;u--;){var h=a[u];if(!(l?h in e:X.call(e,h)))return!1}var d=o.get(t);if(d&&o.get(e))return d==e;var p=!0;o.set(t,e),o.set(e,t);for(var f=l;++u<c;){var g=t[h=a[u]],b=e[h];if(n)var m=l?n(b,g,h,e,t,o):n(g,b,h,t,e,o);if(!(void 0===m?g===b||s(g,b,r,n,o):m)){p=!1;break}f||(f="constructor"==h)}if(p&&!f){var v=t.constructor,y=e.constructor;v==y||!("constructor"in t)||!("constructor"in e)||"function"==typeof v&&v instanceof v&&"function"==typeof y&&y instanceof y||(p=!1)}return o.delete(t),o.delete(e),p}(t,e,r,n,o,c))}(t,e,r,n,Et,o))}function Mt(t,e,r,n,o,l){var a=r&i,c=t.length,u=e.length;if(c!=u&&!(a&&u>c))return!1;var h=l.get(t);if(h&&l.get(e))return h==e;var d=-1,p=!0,f=r&s?new Tt:void 0;for(l.set(t,e),l.set(e,t);++d<c;){var g=t[d],b=e[d];if(n)var m=a?n(b,g,d,e,t,l):n(g,b,d,t,e,l);if(void 0!==m){if(m)continue;p=!1;break}if(f){if(!z(e,(function(t,e){if(i=e,!f.has(i)&&(g===t||o(g,t,r,n,l)))return f.push(e);var i}))){p=!1;break}}else if(g!==b&&!o(g,b,r,n,l)){p=!1;break}}return l.delete(t),l.delete(e),p}function qt(t){return function(t,e,r){var n=e(t);return Ft(t)?n:function(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}(n,r(t))}(t,Zt,Rt)}function Ot(t,e){var r,n,i=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?i["string"==typeof e?"string":"hash"]:i.map}function Bt(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return function(t){return!(!$t(t)||function(t){return!!J&&J in t}(t))&&(Vt(t)?tt:L).test(Dt(t))}(r)?r:void 0}_t.prototype.clear=function(){this.__data__=gt?gt(null):{},this.size=0},_t.prototype.delete=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},_t.prototype.get=function(t){var e=this.__data__;if(gt){var r=e[t];return r===n?void 0:r}return X.call(e,t)?e[t]:void 0},_t.prototype.has=function(t){var e=this.__data__;return gt?void 0!==e[t]:X.call(e,t)},_t.prototype.set=function(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=gt&&void 0===e?n:e,this},Ct.prototype.clear=function(){this.__data__=[],this.size=0},Ct.prototype.delete=function(t){var e=this.__data__,r=Lt(e,t);return!(r<0||(r==e.length-1?e.pop():st.call(e,r,1),--this.size,0))},Ct.prototype.get=function(t){var e=this.__data__,r=Lt(e,t);return r<0?void 0:e[r][1]},Ct.prototype.has=function(t){return Lt(this.__data__,t)>-1},Ct.prototype.set=function(t,e){var r=this.__data__,n=Lt(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this},Nt.prototype.clear=function(){this.size=0,this.__data__={hash:new _t,map:new(ht||Ct),string:new _t}},Nt.prototype.delete=function(t){var e=Ot(this,t).delete(t);return this.size-=e?1:0,e},Nt.prototype.get=function(t){return Ot(this,t).get(t)},Nt.prototype.has=function(t){return Ot(this,t).has(t)},Nt.prototype.set=function(t,e){var r=Ot(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this},Tt.prototype.add=Tt.prototype.push=function(t){return this.__data__.set(t,n),this},Tt.prototype.has=function(t){return this.__data__.has(t)},At.prototype.clear=function(){this.__data__=new Ct,this.size=0},At.prototype.delete=function(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r},At.prototype.get=function(t){return this.__data__.get(t)},At.prototype.has=function(t){return this.__data__.has(t)},At.prototype.set=function(t,e){var r=this.__data__;if(r instanceof Ct){var n=r.__data__;if(!ht||n.length<199)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new Nt(n)}return r.set(t,e),this.size=r.size,this};var Rt=lt?function(t){return null==t?[]:(t=Object(t),function(e,r){for(var n=-1,i=null==e?0:e.length,s=0,o=[];++n<i;){var l=e[n];a=l,it.call(t,a)&&(o[s++]=l)}var a;return o}(lt(t)))}:function(){return[]},It=St;function Pt(t,e){return!!(e=null==e?o:e)&&("number"==typeof t||S.test(t))&&t>-1&&t%1==0&&t<e}function Dt(t){if(null!=t){try{return K.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function zt(t,e){return t===e||t!=t&&e!=e}(ut&&It(new ut(new ArrayBuffer(1)))!=A||ht&&It(new ht)!=g||dt&&It(dt.resolve())!=y||pt&&It(new pt)!=x||ft&&It(new ft)!=N)&&(It=function(t){var e=St(t),r=e==v?t.constructor:void 0,n=r?Dt(r):"";if(n)switch(n){case bt:return A;case mt:return g;case vt:return y;case yt:return x;case wt:return N}return e});var Ht=jt(function(){return arguments}())?jt:function(t){return Gt(t)&&X.call(t,"callee")&&!it.call(t,"callee")},Ft=Array.isArray,Ut=at||function(){return!1};function Vt(t){if(!$t(t))return!1;var e=St(t);return e==p||e==f||e==c||e==w}function Wt(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=o}function $t(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}function Gt(t){return null!=t&&"object"==typeof t}var Yt=D?function(t){return function(e){return t(e)}}(D):function(t){return Gt(t)&&Wt(t.length)&&!!j[St(t)]};function Zt(t){return null!=(e=t)&&Wt(e.length)&&!Vt(e)?function(t,e){var r=Ft(t),n=!r&&Ht(t),i=!r&&!n&&Ut(t),s=!r&&!n&&!i&&Yt(t),o=r||n||i||s,l=o?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],a=l.length;for(var c in t)!e&&!X.call(t,c)||o&&("length"==c||i&&("offset"==c||"parent"==c)||s&&("buffer"==c||"byteLength"==c||"byteOffset"==c)||Pt(c,a))||l.push(c);return l}(t):function(t){if(r=(e=t)&&e.constructor,e!==("function"==typeof r&&r.prototype||Y))return ct(t);var e,r,n=[];for(var i in Object(t))X.call(t,i)&&"constructor"!=i&&n.push(i);return n}(t);var e}t.exports=function(t,e){return Et(t,e)}},930:function(t,e,r){t=r.nmd(t);var n="__lodash_hash_undefined__",i=9007199254740991,s="[object Arguments]",o="[object AsyncFunction]",l="[object Function]",a="[object GeneratorFunction]",c="[object Null]",u="[object Object]",h="[object Proxy]",d="[object Undefined]",p=/^\[object .+?Constructor\]$/,f=/^(?:0|[1-9]\d*)$/,g={};g["[object Float32Array]"]=g["[object Float64Array]"]=g["[object Int8Array]"]=g["[object Int16Array]"]=g["[object Int32Array]"]=g["[object Uint8Array]"]=g["[object Uint8ClampedArray]"]=g["[object Uint16Array]"]=g["[object Uint32Array]"]=!0,g[s]=g["[object Array]"]=g["[object ArrayBuffer]"]=g["[object Boolean]"]=g["[object DataView]"]=g["[object Date]"]=g["[object Error]"]=g[l]=g["[object Map]"]=g["[object Number]"]=g[u]=g["[object RegExp]"]=g["[object Set]"]=g["[object String]"]=g["[object WeakMap]"]=!1;var b,m,v,y="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g,w="object"==typeof self&&self&&self.Object===Object&&self,k=y||w||Function("return this")(),x=e&&!e.nodeType&&e,_=x&&t&&!t.nodeType&&t,C=_&&_.exports===x,N=C&&y.process,T=function(){try{return _&&_.require&&_.require("util").types||N&&N.binding&&N.binding("util")}catch(t){}}(),A=T&&T.isTypedArray,L=Array.prototype,S=Function.prototype,j=Object.prototype,E=k["__core-js_shared__"],M=S.toString,q=j.hasOwnProperty,O=(b=/[^.]+$/.exec(E&&E.keys&&E.keys.IE_PROTO||""))?"Symbol(src)_1."+b:"",B=j.toString,R=M.call(Object),I=RegExp("^"+M.call(q).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),P=C?k.Buffer:void 0,D=k.Symbol,z=k.Uint8Array,H=(P&&P.allocUnsafe,m=Object.getPrototypeOf,v=Object,function(t){return m(v(t))}),F=Object.create,U=j.propertyIsEnumerable,V=L.splice,W=D?D.toStringTag:void 0,$=function(){try{var t=dt(Object,"defineProperty");return t({},"",{}),t}catch(t){}}(),G=P?P.isBuffer:void 0,Y=Math.max,Z=Date.now,K=dt(k,"Map"),X=dt(Object,"create"),J=function(){function t(){}return function(e){if(!Ct(e))return{};if(F)return F(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();function Q(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function tt(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function et(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function rt(t){var e=this.__data__=new tt(t);this.size=e.size}function nt(t,e,r){(void 0!==r&&!mt(t[e],r)||void 0===r&&!(e in t))&&ot(t,e,r)}function it(t,e,r){var n=t[e];q.call(t,e)&&mt(n,r)&&(void 0!==r||e in t)||ot(t,e,r)}function st(t,e){for(var r=t.length;r--;)if(mt(t[r][0],e))return r;return-1}function ot(t,e,r){"__proto__"==e&&$?$(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}Q.prototype.clear=function(){this.__data__=X?X(null):{},this.size=0},Q.prototype.delete=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},Q.prototype.get=function(t){var e=this.__data__;if(X){var r=e[t];return r===n?void 0:r}return q.call(e,t)?e[t]:void 0},Q.prototype.has=function(t){var e=this.__data__;return X?void 0!==e[t]:q.call(e,t)},Q.prototype.set=function(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=X&&void 0===e?n:e,this},tt.prototype.clear=function(){this.__data__=[],this.size=0},tt.prototype.delete=function(t){var e=this.__data__,r=st(e,t);return!(r<0||(r==e.length-1?e.pop():V.call(e,r,1),--this.size,0))},tt.prototype.get=function(t){var e=this.__data__,r=st(e,t);return r<0?void 0:e[r][1]},tt.prototype.has=function(t){return st(this.__data__,t)>-1},tt.prototype.set=function(t,e){var r=this.__data__,n=st(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this},et.prototype.clear=function(){this.size=0,this.__data__={hash:new Q,map:new(K||tt),string:new Q}},et.prototype.delete=function(t){var e=ht(this,t).delete(t);return this.size-=e?1:0,e},et.prototype.get=function(t){return ht(this,t).get(t)},et.prototype.has=function(t){return ht(this,t).has(t)},et.prototype.set=function(t,e){var r=ht(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this},rt.prototype.clear=function(){this.__data__=new tt,this.size=0},rt.prototype.delete=function(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r},rt.prototype.get=function(t){return this.__data__.get(t)},rt.prototype.has=function(t){return this.__data__.has(t)},rt.prototype.set=function(t,e){var r=this.__data__;if(r instanceof tt){var n=r.__data__;if(!K||n.length<199)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new et(n)}return r.set(t,e),this.size=r.size,this};function lt(t){return null==t?void 0===t?d:c:W&&W in Object(t)?function(t){var e=q.call(t,W),r=t[W];try{t[W]=void 0;var n=!0}catch(t){}var i=B.call(t);return n&&(e?t[W]=r:delete t[W]),i}(t):function(t){return B.call(t)}(t)}function at(t){return Nt(t)&&lt(t)==s}function ct(t,e,r,n,i){t!==e&&function(t,e,r){for(var n=-1,i=Object(t),s=r(t),o=s.length;o--;){var l=s[++n];if(!1===e(i[l],l,i))break}}(e,(function(s,o){if(i||(i=new rt),Ct(s))!function(t,e,r,n,i,s,o){var l=gt(t,r),a=gt(e,r),c=o.get(a);if(c)nt(t,r,c);else{var h,d,p,f,g,b=s?s(l,a,r+"",t,e,o):void 0,m=void 0===b;if(m){var v=yt(a),y=!v&&kt(a),w=!v&&!y&&Tt(a);b=a,v||y||w?yt(l)?b=l:Nt(g=l)&&wt(g)?b=function(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}(l):y?(m=!1,b=function(t,e){return t.slice()}(a)):w?(m=!1,f=new(p=(h=a).buffer).constructor(p.byteLength),new z(f).set(new z(p)),d=f,b=new h.constructor(d,h.byteOffset,h.length)):b=[]:function(t){if(!Nt(t)||lt(t)!=u)return!1;var e=H(t);if(null===e)return!0;var r=q.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&M.call(r)==R}(a)||vt(a)?(b=l,vt(l)?b=function(t){return function(t,e,r,n){var i=!r;r||(r={});for(var s=-1,o=e.length;++s<o;){var l=e[s],a=void 0;void 0===a&&(a=t[l]),i?ot(r,l,a):it(r,l,a)}return r}(t,At(t))}(l):Ct(l)&&!xt(l)||(b=function(t){return"function"!=typeof t.constructor||ft(t)?{}:J(H(t))}(a))):m=!1}m&&(o.set(a,b),i(b,a,n,s,o),o.delete(a)),nt(t,r,b)}}(t,e,o,r,ct,n,i);else{var l=n?n(gt(t,o),s,o+"",t,e,i):void 0;void 0===l&&(l=s),nt(t,o,l)}}),At)}var ut=$?function(t,e){return $(t,"toString",{configurable:!0,enumerable:!1,value:(r=e,function(){return r}),writable:!0});var r}:jt;function ht(t,e){var r,n,i=t.__data__;return("string"==(n=typeof(r=e))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?i["string"==typeof e?"string":"hash"]:i.map}function dt(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return function(t){return!(!Ct(t)||function(t){return!!O&&O in t}(t))&&(xt(t)?I:p).test(function(t){if(null!=t){try{return M.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t))}(r)?r:void 0}function pt(t,e){var r=typeof t;return!!(e=null==e?i:e)&&("number"==r||"symbol"!=r&&f.test(t))&&t>-1&&t%1==0&&t<e}function ft(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||j)}function gt(t,e){if(("constructor"!==e||"function"!=typeof t[e])&&"__proto__"!=e)return t[e]}var bt=function(t){var e=0,r=0;return function(){var n=Z(),i=16-(n-r);if(r=n,i>0){if(++e>=800)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}(ut);function mt(t,e){return t===e||t!=t&&e!=e}var vt=at(function(){return arguments}())?at:function(t){return Nt(t)&&q.call(t,"callee")&&!U.call(t,"callee")},yt=Array.isArray;function wt(t){return null!=t&&_t(t.length)&&!xt(t)}var kt=G||function(){return!1};function xt(t){if(!Ct(t))return!1;var e=lt(t);return e==l||e==a||e==o||e==h}function _t(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=i}function Ct(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}function Nt(t){return null!=t&&"object"==typeof t}var Tt=A?function(t){return function(e){return t(e)}}(A):function(t){return Nt(t)&&_t(t.length)&&!!g[lt(t)]};function At(t){return wt(t)?function(t,e){var r=yt(t),n=!r&&vt(t),i=!r&&!n&&kt(t),s=!r&&!n&&!i&&Tt(t),o=r||n||i||s,l=o?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],a=l.length;for(var c in t)!e&&!q.call(t,c)||o&&("length"==c||i&&("offset"==c||"parent"==c)||s&&("buffer"==c||"byteLength"==c||"byteOffset"==c)||pt(c,a))||l.push(c);return l}(t,!0):function(t){if(!Ct(t))return function(t){var e=[];if(null!=t)for(var r in Object(t))e.push(r);return e}(t);var e=ft(t),r=[];for(var n in t)("constructor"!=n||!e&&q.call(t,n))&&r.push(n);return r}(t)}var Lt,St=(Lt=function(t,e,r){ct(t,e,r)},function(t,e){return bt(function(t,e,r){return e=Y(void 0===e?t.length-1:e,0),function(){for(var n=arguments,i=-1,s=Y(n.length-e,0),o=Array(s);++i<s;)o[i]=n[e+i];i=-1;for(var l=Array(e+1);++i<e;)l[i]=n[i];return l[e]=r(o),function(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}(t,this,l)}}(t,e,jt),t+"")}((function(t,e){var r=-1,n=e.length,i=n>1?e[n-1]:void 0,s=n>2?e[2]:void 0;for(i=Lt.length>3&&"function"==typeof i?(n--,i):void 0,s&&function(t,e,r){if(!Ct(r))return!1;var n=typeof e;return!!("number"==n?wt(r)&&pt(e,r.length):"string"==n&&e in r)&&mt(r[e],t)}(e[0],e[1],s)&&(i=n<3?void 0:i,n=1),t=Object(t);++r<n;){var o=e[r];o&&Lt(t,o,r)}return t})));function jt(t){return t}t.exports=St},696:function(t,e,r){"undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==r.g?r.g:Function("return this")(),t.exports=(()=>{"use strict";var t,e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},r={};e.r(r),e.d(r,{Attributor:()=>g,AttributorStore:()=>w,BlockBlot:()=>C,ClassAttributor:()=>m,ContainerBlot:()=>d,EmbedBlot:()=>N,InlineBlot:()=>x,LeafBlot:()=>f,ParentBlot:()=>u,Registry:()=>s,Scope:()=>n,ScrollBlot:()=>L,StyleAttributor:()=>y,TextBlot:()=>j}),function(t){t[t.TYPE=3]="TYPE",t[t.LEVEL=12]="LEVEL",t[t.ATTRIBUTE=13]="ATTRIBUTE",t[t.BLOT=14]="BLOT",t[t.INLINE=7]="INLINE",t[t.BLOCK=11]="BLOCK",t[t.BLOCK_BLOT=10]="BLOCK_BLOT",t[t.INLINE_BLOT=6]="INLINE_BLOT",t[t.BLOCK_ATTRIBUTE=9]="BLOCK_ATTRIBUTE",t[t.INLINE_ATTRIBUTE=5]="INLINE_ATTRIBUTE",t[t.ANY=15]="ANY"}(t||(t={}));const n=t;class i extends Error{constructor(t){super(t="[Parchment] "+t),this.message=t,this.name=this.constructor.name}}class s{constructor(){this.attributes={},this.classes={},this.tags={},this.types={}}static find(t,e=!1){if(null==t)return null;if(this.blots.has(t))return this.blots.get(t)||null;if(e){let r=null;try{r=t.parentNode}catch(t){return null}return this.find(r,e)}return null}create(t,e,r){const n=this.query(e);if(null==n)throw new i(`Unable to create ${e} blot`);const o=n,l=e instanceof Node||e.nodeType===Node.TEXT_NODE?e:o.create(r),a=new o(t,l,r);return s.blots.set(a.domNode,a),a}find(t,e=!1){return s.find(t,e)}query(t,e=n.ANY){let r;return"string"==typeof t?r=this.types[t]||this.attributes[t]:t instanceof Text||t.nodeType===Node.TEXT_NODE?r=this.types.text:"number"==typeof t?t&n.LEVEL&n.BLOCK?r=this.types.block:t&n.LEVEL&n.INLINE&&(r=this.types.inline):t instanceof Element&&((t.getAttribute("class")||"").split(/\s+/).some((t=>(r=this.classes[t],!!r))),r=r||this.tags[t.tagName]),null==r?null:e&n.LEVEL&r.scope&&e&n.TYPE&r.scope?r:null}register(...t){if(t.length>1)return t.map((t=>this.register(t)));const e=t[0];if("string"!=typeof e.blotName&&"string"!=typeof e.attrName)throw new i("Invalid definition");if("abstract"===e.blotName)throw new i("Cannot register abstract class");return this.types[e.blotName||e.attrName]=e,"string"==typeof e.keyName?this.attributes[e.keyName]=e:(null!=e.className&&(this.classes[e.className]=e),null!=e.tagName&&(Array.isArray(e.tagName)?e.tagName=e.tagName.map((t=>t.toUpperCase())):e.tagName=e.tagName.toUpperCase(),(Array.isArray(e.tagName)?e.tagName:[e.tagName]).forEach((t=>{null!=this.tags[t]&&null!=e.className||(this.tags[t]=e)})))),e}}s.blots=new WeakMap;class o{constructor(t,e){this.scroll=t,this.domNode=e,s.blots.set(e,this),this.prev=null,this.next=null}static create(t){if(null==this.tagName)throw new i("Blot definition missing tagName");let e;return Array.isArray(this.tagName)?("string"==typeof t&&(t=t.toUpperCase(),parseInt(t,10).toString()===t&&(t=parseInt(t,10))),e="number"==typeof t?document.createElement(this.tagName[t-1]):this.tagName.indexOf(t)>-1?document.createElement(t):document.createElement(this.tagName[0])):e=document.createElement(this.tagName),this.className&&e.classList.add(this.className),e}get statics(){return this.constructor}attach(){}clone(){const t=this.domNode.cloneNode(!1);return this.scroll.create(t)}detach(){null!=this.parent&&this.parent.removeChild(this),s.blots.delete(this.domNode)}deleteAt(t,e){this.isolate(t,e).remove()}formatAt(t,e,r,i){const s=this.isolate(t,e);if(null!=this.scroll.query(r,n.BLOT)&&i)s.wrap(r,i);else if(null!=this.scroll.query(r,n.ATTRIBUTE)){const t=this.scroll.create(this.statics.scope);s.wrap(t),t.format(r,i)}}insertAt(t,e,r){const n=null==r?this.scroll.create("text",e):this.scroll.create(e,r),i=this.split(t);this.parent.insertBefore(n,i||void 0)}isolate(t,e){const r=this.split(t);if(null==r)throw new Error("Attempt to isolate at end");return r.split(e),r}length(){return 1}offset(t=this.parent){return null==this.parent||this===t?0:this.parent.children.offset(this)+this.parent.offset(t)}optimize(t){!this.statics.requiredContainer||this.parent instanceof this.statics.requiredContainer||this.wrap(this.statics.requiredContainer.blotName)}remove(){null!=this.domNode.parentNode&&this.domNode.parentNode.removeChild(this.domNode),this.detach()}replaceWith(t,e){const r="string"==typeof t?this.scroll.create(t,e):t;return null!=this.parent&&(this.parent.insertBefore(r,this.next||void 0),this.remove()),r}split(t,e){return 0===t?this:this.next}update(t,e){}wrap(t,e){const r="string"==typeof t?this.scroll.create(t,e):t;if(null!=this.parent&&this.parent.insertBefore(r,this.next||void 0),"function"!=typeof r.appendChild)throw new i(`Cannot wrap ${t}`);return r.appendChild(this),r}}o.blotName="abstract";const l=o;function a(t,e){let r=e.find(t);if(null==r)try{r=e.create(t)}catch(i){r=e.create(n.INLINE),Array.from(t.childNodes).forEach((t=>{r.domNode.appendChild(t)})),t.parentNode&&t.parentNode.replaceChild(r.domNode,t),r.attach()}return r}class c extends l{constructor(t,e){super(t,e),this.uiNode=null,this.build()}appendChild(t){this.insertBefore(t)}attach(){super.attach(),this.children.forEach((t=>{t.attach()}))}attachUI(t){null!=this.uiNode&&this.uiNode.remove(),this.uiNode=t,c.uiClass&&this.uiNode.classList.add(c.uiClass),this.uiNode.setAttribute("contenteditable","false"),this.domNode.insertBefore(this.uiNode,this.domNode.firstChild)}build(){this.children=new class{constructor(){this.head=null,this.tail=null,this.length=0}append(...t){if(this.insertBefore(t[0],null),t.length>1){const e=t.slice(1);this.append(...e)}}at(t){const e=this.iterator();let r=e();for(;r&&t>0;)t-=1,r=e();return r}contains(t){const e=this.iterator();let r=e();for(;r;){if(r===t)return!0;r=e()}return!1}indexOf(t){const e=this.iterator();let r=e(),n=0;for(;r;){if(r===t)return n;n+=1,r=e()}return-1}insertBefore(t,e){null!=t&&(this.remove(t),t.next=e,null!=e?(t.prev=e.prev,null!=e.prev&&(e.prev.next=t),e.prev=t,e===this.head&&(this.head=t)):null!=this.tail?(this.tail.next=t,t.prev=this.tail,this.tail=t):(t.prev=null,this.head=this.tail=t),this.length+=1)}offset(t){let e=0,r=this.head;for(;null!=r;){if(r===t)return e;e+=r.length(),r=r.next}return-1}remove(t){this.contains(t)&&(null!=t.prev&&(t.prev.next=t.next),null!=t.next&&(t.next.prev=t.prev),t===this.head&&(this.head=t.next),t===this.tail&&(this.tail=t.prev),this.length-=1)}iterator(t=this.head){return()=>{const e=t;return null!=t&&(t=t.next),e}}find(t,e=!1){const r=this.iterator();let n=r();for(;n;){const i=n.length();if(t<i||e&&t===i&&(null==n.next||0!==n.next.length()))return[n,t];t-=i,n=r()}return[null,0]}forEach(t){const e=this.iterator();let r=e();for(;r;)t(r),r=e()}forEachAt(t,e,r){if(e<=0)return;const[n,i]=this.find(t);let s=t-i;const o=this.iterator(n);let l=o();for(;l&&s<t+e;){const n=l.length();t>s?r(l,t-s,Math.min(e,s+n-t)):r(l,0,Math.min(n,t+e-s)),s+=n,l=o()}}map(t){return this.reduce(((e,r)=>(e.push(t(r)),e)),[])}reduce(t,e){const r=this.iterator();let n=r();for(;n;)e=t(e,n),n=r();return e}},Array.from(this.domNode.childNodes).filter((t=>t!==this.uiNode)).reverse().forEach((t=>{try{const e=a(t,this.scroll);this.insertBefore(e,this.children.head||void 0)}catch(t){if(t instanceof i)return;throw t}}))}deleteAt(t,e){if(0===t&&e===this.length())return this.remove();this.children.forEachAt(t,e,((t,e,r)=>{t.deleteAt(e,r)}))}descendant(t,e=0){const[r,n]=this.children.find(e);return null==t.blotName&&t(r)||null!=t.blotName&&r instanceof t?[r,n]:r instanceof c?r.descendant(t,n):[null,-1]}descendants(t,e=0,r=Number.MAX_VALUE){let n=[],i=r;return this.children.forEachAt(e,r,((e,r,s)=>{(null==t.blotName&&t(e)||null!=t.blotName&&e instanceof t)&&n.push(e),e instanceof c&&(n=n.concat(e.descendants(t,r,i))),i-=s})),n}detach(){this.children.forEach((t=>{t.detach()})),super.detach()}enforceAllowedChildren(){let t=!1;this.children.forEach((e=>{t||this.statics.allowedChildren.some((t=>e instanceof t))||(e.statics.scope===n.BLOCK_BLOT?(null!=e.next&&this.splitAfter(e),null!=e.prev&&this.splitAfter(e.prev),e.parent.unwrap(),t=!0):e instanceof c?e.unwrap():e.remove())}))}formatAt(t,e,r,n){this.children.forEachAt(t,e,((t,e,i)=>{t.formatAt(e,i,r,n)}))}insertAt(t,e,r){const[n,i]=this.children.find(t);if(n)n.insertAt(i,e,r);else{const t=null==r?this.scroll.create("text",e):this.scroll.create(e,r);this.appendChild(t)}}insertBefore(t,e){null!=t.parent&&t.parent.children.remove(t);let r=null;this.children.insertBefore(t,e||null),t.parent=this,null!=e&&(r=e.domNode),this.domNode.parentNode===t.domNode&&this.domNode.nextSibling===r||this.domNode.insertBefore(t.domNode,r),t.attach()}length(){return this.children.reduce(((t,e)=>t+e.length()),0)}moveChildren(t,e){this.children.forEach((r=>{t.insertBefore(r,e)}))}optimize(t){if(super.optimize(t),this.enforceAllowedChildren(),null!=this.uiNode&&this.uiNode!==this.domNode.firstChild&&this.domNode.insertBefore(this.uiNode,this.domNode.firstChild),0===this.children.length)if(null!=this.statics.defaultChild){const t=this.scroll.create(this.statics.defaultChild.blotName);this.appendChild(t)}else this.remove()}path(t,e=!1){const[r,n]=this.children.find(t,e),i=[[this,t]];return r instanceof c?i.concat(r.path(n,e)):(null!=r&&i.push([r,n]),i)}removeChild(t){this.children.remove(t)}replaceWith(t,e){const r="string"==typeof t?this.scroll.create(t,e):t;return r instanceof c&&this.moveChildren(r),super.replaceWith(r)}split(t,e=!1){if(!e){if(0===t)return this;if(t===this.length())return this.next}const r=this.clone();return this.parent&&this.parent.insertBefore(r,this.next||void 0),this.children.forEachAt(t,this.length(),((t,n,i)=>{const s=t.split(n,e);null!=s&&r.appendChild(s)})),r}splitAfter(t){const e=this.clone();for(;null!=t.next;)e.appendChild(t.next);return this.parent&&this.parent.insertBefore(e,this.next||void 0),e}unwrap(){this.parent&&this.moveChildren(this.parent,this.next||void 0),this.remove()}update(t,e){const r=[],n=[];t.forEach((t=>{t.target===this.domNode&&"childList"===t.type&&(r.push(...t.addedNodes),n.push(...t.removedNodes))})),n.forEach((t=>{if(null!=t.parentNode&&"IFRAME"!==t.tagName&&document.body.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY)return;const e=this.scroll.find(t);null!=e&&(null!=e.domNode.parentNode&&e.domNode.parentNode!==this.domNode||e.detach())})),r.filter((t=>t.parentNode===this.domNode||t===this.uiNode)).sort(((t,e)=>t===e?0:t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING?1:-1)).forEach((t=>{let e=null;null!=t.nextSibling&&(e=this.scroll.find(t.nextSibling));const r=a(t,this.scroll);r.next===e&&null!=r.next||(null!=r.parent&&r.parent.removeChild(this),this.insertBefore(r,e||void 0))})),this.enforceAllowedChildren()}}c.uiClass="";const u=c;class h extends u{checkMerge(){return null!==this.next&&this.next.statics.blotName===this.statics.blotName}deleteAt(t,e){super.deleteAt(t,e),this.enforceAllowedChildren()}formatAt(t,e,r,n){super.formatAt(t,e,r,n),this.enforceAllowedChildren()}insertAt(t,e,r){super.insertAt(t,e,r),this.enforceAllowedChildren()}optimize(t){super.optimize(t),this.children.length>0&&null!=this.next&&this.checkMerge()&&(this.next.moveChildren(this),this.next.remove())}}h.blotName="container",h.scope=n.BLOCK_BLOT;const d=h;class p extends l{static value(t){return!0}index(t,e){return this.domNode===t||this.domNode.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY?Math.min(e,1):-1}position(t,e){let r=Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);return t>0&&(r+=1),[this.parent.domNode,r]}value(){return{[this.statics.blotName]:this.statics.value(this.domNode)||!0}}}p.scope=n.INLINE_BLOT;const f=p;class g{constructor(t,e,r={}){this.attrName=t,this.keyName=e;const i=n.TYPE&n.ATTRIBUTE;this.scope=null!=r.scope?r.scope&n.LEVEL|i:n.ATTRIBUTE,null!=r.whitelist&&(this.whitelist=r.whitelist)}static keys(t){return Array.from(t.attributes).map((t=>t.name))}add(t,e){return!!this.canAdd(t,e)&&(t.setAttribute(this.keyName,e),!0)}canAdd(t,e){return null==this.whitelist||("string"==typeof e?this.whitelist.indexOf(e.replace(/["']/g,""))>-1:this.whitelist.indexOf(e)>-1)}remove(t){t.removeAttribute(this.keyName)}value(t){const e=t.getAttribute(this.keyName);return this.canAdd(t,e)&&e?e:""}}function b(t,e){return(t.getAttribute("class")||"").split(/\s+/).filter((t=>0===t.indexOf(`${e}-`)))}const m=class extends g{static keys(t){return(t.getAttribute("class")||"").split(/\s+/).map((t=>t.split("-").slice(0,-1).join("-")))}add(t,e){return!!this.canAdd(t,e)&&(this.remove(t),t.classList.add(`${this.keyName}-${e}`),!0)}remove(t){b(t,this.keyName).forEach((e=>{t.classList.remove(e)})),0===t.classList.length&&t.removeAttribute("class")}value(t){const e=(b(t,this.keyName)[0]||"").slice(this.keyName.length+1);return this.canAdd(t,e)?e:""}};function v(t){const e=t.split("-"),r=e.slice(1).map((t=>t[0].toUpperCase()+t.slice(1))).join("");return e[0]+r}const y=class extends g{static keys(t){return(t.getAttribute("style")||"").split(";").map((t=>t.split(":")[0].trim()))}add(t,e){return!!this.canAdd(t,e)&&(t.style[v(this.keyName)]=e,!0)}remove(t){t.style[v(this.keyName)]="",t.getAttribute("style")||t.removeAttribute("style")}value(t){const e=t.style[v(this.keyName)];return this.canAdd(t,e)?e:""}},w=class{constructor(t){this.attributes={},this.domNode=t,this.build()}attribute(t,e){e?t.add(this.domNode,e)&&(null!=t.value(this.domNode)?this.attributes[t.attrName]=t:delete this.attributes[t.attrName]):(t.remove(this.domNode),delete this.attributes[t.attrName])}build(){this.attributes={};const t=s.find(this.domNode);if(null==t)return;const e=g.keys(this.domNode),r=m.keys(this.domNode),i=y.keys(this.domNode);e.concat(r).concat(i).forEach((e=>{const r=t.scroll.query(e,n.ATTRIBUTE);r instanceof g&&(this.attributes[r.attrName]=r)}))}copy(t){Object.keys(this.attributes).forEach((e=>{const r=this.attributes[e].value(this.domNode);t.format(e,r)}))}move(t){this.copy(t),Object.keys(this.attributes).forEach((t=>{this.attributes[t].remove(this.domNode)})),this.attributes={}}values(){return Object.keys(this.attributes).reduce(((t,e)=>(t[e]=this.attributes[e].value(this.domNode),t)),{})}};class k extends u{constructor(t,e){super(t,e),this.attributes=new w(this.domNode)}static formats(t,e){const r=e.query(k.blotName);if(null==r||t.tagName!==r.tagName)return"string"==typeof this.tagName||(Array.isArray(this.tagName)?t.tagName.toLowerCase():void 0)}format(t,e){if(t!==this.statics.blotName||e){const r=this.scroll.query(t,n.INLINE);if(null==r)return;r instanceof g?this.attributes.attribute(r,e):!e||t===this.statics.blotName&&this.formats()[t]===e||this.replaceWith(t,e)}else this.children.forEach((t=>{t instanceof k||(t=t.wrap(k.blotName,!0)),this.attributes.copy(t)})),this.unwrap()}formats(){const t=this.attributes.values(),e=this.statics.formats(this.domNode,this.scroll);return null!=e&&(t[this.statics.blotName]=e),t}formatAt(t,e,r,i){null!=this.formats()[r]||this.scroll.query(r,n.ATTRIBUTE)?this.isolate(t,e).format(r,i):super.formatAt(t,e,r,i)}optimize(t){super.optimize(t);const e=this.formats();if(0===Object.keys(e).length)return this.unwrap();const r=this.next;r instanceof k&&r.prev===this&&function(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const r in t)if(t[r]!==e[r])return!1;return!0}(e,r.formats())&&(r.moveChildren(this),r.remove())}replaceWith(t,e){const r=super.replaceWith(t,e);return this.attributes.copy(r),r}update(t,e){super.update(t,e),t.some((t=>t.target===this.domNode&&"attributes"===t.type))&&this.attributes.build()}wrap(t,e){const r=super.wrap(t,e);return r instanceof k&&this.attributes.move(r),r}}k.allowedChildren=[k,f],k.blotName="inline",k.scope=n.INLINE_BLOT,k.tagName="SPAN";const x=k;class _ extends u{constructor(t,e){super(t,e),this.attributes=new w(this.domNode)}static formats(t,e){const r=e.query(_.blotName);if(null==r||t.tagName!==r.tagName)return"string"==typeof this.tagName||(Array.isArray(this.tagName)?t.tagName.toLowerCase():void 0)}format(t,e){const r=this.scroll.query(t,n.BLOCK);null!=r&&(r instanceof g?this.attributes.attribute(r,e):t!==this.statics.blotName||e?!e||t===this.statics.blotName&&this.formats()[t]===e||this.replaceWith(t,e):this.replaceWith(_.blotName))}formats(){const t=this.attributes.values(),e=this.statics.formats(this.domNode,this.scroll);return null!=e&&(t[this.statics.blotName]=e),t}formatAt(t,e,r,i){null!=this.scroll.query(r,n.BLOCK)?this.format(r,i):super.formatAt(t,e,r,i)}insertAt(t,e,r){if(null==r||null!=this.scroll.query(e,n.INLINE))super.insertAt(t,e,r);else{const n=this.split(t);if(null==n)throw new Error("Attempt to insertAt after block boundaries");{const t=this.scroll.create(e,r);n.parent.insertBefore(t,n)}}}replaceWith(t,e){const r=super.replaceWith(t,e);return this.attributes.copy(r),r}update(t,e){super.update(t,e),t.some((t=>t.target===this.domNode&&"attributes"===t.type))&&this.attributes.build()}}_.blotName="block",_.scope=n.BLOCK_BLOT,_.tagName="P",_.allowedChildren=[x,_,f];const C=_,N=class extends f{static formats(t,e){}format(t,e){super.formatAt(0,this.length(),t,e)}formatAt(t,e,r,n){0===t&&e===this.length()?this.format(r,n):super.formatAt(t,e,r,n)}formats(){return this.statics.formats(this.domNode,this.scroll)}},T={attributes:!0,characterData:!0,characterDataOldValue:!0,childList:!0,subtree:!0};class A extends u{constructor(t,e){super(null,e),this.registry=t,this.scroll=this,this.build(),this.observer=new MutationObserver((t=>{this.update(t)})),this.observer.observe(this.domNode,T),this.attach()}create(t,e){return this.registry.create(this,t,e)}find(t,e=!1){const r=this.registry.find(t,e);return r?r.scroll===this?r:e?this.find(r.scroll.domNode.parentNode,!0):null:null}query(t,e=n.ANY){return this.registry.query(t,e)}register(...t){return this.registry.register(...t)}build(){null!=this.scroll&&super.build()}detach(){super.detach(),this.observer.disconnect()}deleteAt(t,e){this.update(),0===t&&e===this.length()?this.children.forEach((t=>{t.remove()})):super.deleteAt(t,e)}formatAt(t,e,r,n){this.update(),super.formatAt(t,e,r,n)}insertAt(t,e,r){this.update(),super.insertAt(t,e,r)}optimize(t=[],e={}){super.optimize(e);const r=e.mutationsMap||new WeakMap;let n=Array.from(this.observer.takeRecords());for(;n.length>0;)t.push(n.pop());const i=(t,e=!0)=>{null!=t&&t!==this&&null!=t.domNode.parentNode&&(r.has(t.domNode)||r.set(t.domNode,[]),e&&i(t.parent))},s=t=>{r.has(t.domNode)&&(t instanceof u&&t.children.forEach(s),r.delete(t.domNode),t.optimize(e))};let o=t;for(let e=0;o.length>0;e+=1){if(e>=100)throw new Error("[Parchment] Maximum optimize iterations reached");for(o.forEach((t=>{const e=this.find(t.target,!0);null!=e&&(e.domNode===t.target&&("childList"===t.type?(i(this.find(t.previousSibling,!1)),Array.from(t.addedNodes).forEach((t=>{const e=this.find(t,!1);i(e,!1),e instanceof u&&e.children.forEach((t=>{i(t,!1)}))}))):"attributes"===t.type&&i(e.prev)),i(e))})),this.children.forEach(s),o=Array.from(this.observer.takeRecords()),n=o.slice();n.length>0;)t.push(n.pop())}}update(t,e={}){t=t||this.observer.takeRecords();const r=new WeakMap;t.map((t=>{const e=this.find(t.target,!0);return null==e?null:r.has(e.domNode)?(r.get(e.domNode).push(t),null):(r.set(e.domNode,[t]),e)})).forEach((t=>{null!=t&&t!==this&&r.has(t.domNode)&&t.update(r.get(t.domNode)||[],e)})),e.mutationsMap=r,r.has(this.domNode)&&super.update(r.get(this.domNode),e),this.optimize(t,e)}}A.blotName="scroll",A.defaultChild=C,A.allowedChildren=[C,d],A.scope=n.BLOCK_BLOT,A.tagName="DIV";const L=A;class S extends f{constructor(t,e){super(t,e),this.text=this.statics.value(this.domNode)}static create(t){return document.createTextNode(t)}static value(t){return t.data}deleteAt(t,e){this.domNode.data=this.text=this.text.slice(0,t)+this.text.slice(t+e)}index(t,e){return this.domNode===t?e:-1}insertAt(t,e,r){null==r?(this.text=this.text.slice(0,t)+e+this.text.slice(t),this.domNode.data=this.text):super.insertAt(t,e,r)}length(){return this.text.length}optimize(t){super.optimize(t),this.text=this.statics.value(this.domNode),0===this.text.length?this.remove():this.next instanceof S&&this.next.prev===this&&(this.insertAt(this.length(),this.next.value()),this.next.remove())}position(t,e=!1){return[this.domNode,t]}split(t,e=!1){if(!e){if(0===t)return this;if(t===this.length())return this.next}const r=this.scroll.create(this.domNode.splitText(t));return this.parent.insertBefore(r,this.next||void 0),this.text=this.statics.value(this.domNode),r}update(t,e){t.some((t=>"characterData"===t.type&&t.target===this.domNode))&&(this.text=this.statics.value(this.domNode))}value(){return this.text}}S.blotName="text",S.scope=n.INLINE_BLOT;const j=S;return r})()},382:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=r(861),i=r(842);var s;!function(t){t.compose=function(t={},e={},r=!1){"object"!=typeof t&&(t={}),"object"!=typeof e&&(e={});let i=n(e);r||(i=Object.keys(i).reduce(((t,e)=>(null!=i[e]&&(t[e]=i[e]),t)),{}));for(const r in t)void 0!==t[r]&&void 0===e[r]&&(i[r]=t[r]);return Object.keys(i).length>0?i:void 0},t.diff=function(t={},e={}){"object"!=typeof t&&(t={}),"object"!=typeof e&&(e={});const r=Object.keys(t).concat(Object.keys(e)).reduce(((r,n)=>(i(t[n],e[n])||(r[n]=void 0===e[n]?null:e[n]),r)),{});return Object.keys(r).length>0?r:void 0},t.invert=function(t={},e={}){t=t||{};const r=Object.keys(e).reduce(((r,n)=>(e[n]!==t[n]&&void 0!==t[n]&&(r[n]=e[n]),r)),{});return Object.keys(t).reduce(((r,n)=>(t[n]!==e[n]&&void 0===e[n]&&(r[n]=null),r)),r)},t.transform=function(t,e,r=!1){if("object"!=typeof t)return e;if("object"!=typeof e)return;if(!r)return e;const n=Object.keys(e).reduce(((r,n)=>(void 0===t[n]&&(r[n]=e[n]),r)),{});return Object.keys(n).length>0?n:void 0}}(s||(s={})),e.default=s},32:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.AttributeMap=e.OpIterator=e.Op=void 0;const n=r(386),i=r(861),s=r(842),o=r(382);e.AttributeMap=o.default;const l=r(427);e.Op=l.default;const a=r(505);e.OpIterator=a.default;const c=String.fromCharCode(0),u=(t,e)=>{if("object"!=typeof t||null===t)throw new Error("cannot retain a "+typeof t);if("object"!=typeof e||null===e)throw new Error("cannot retain a "+typeof e);const r=Object.keys(t)[0];if(!r||r!==Object.keys(e)[0])throw new Error(`embed types not matched: ${r} != ${Object.keys(e)[0]}`);return[r,t[r],e[r]]};class h{constructor(t){Array.isArray(t)?this.ops=t:null!=t&&Array.isArray(t.ops)?this.ops=t.ops:this.ops=[]}static registerEmbed(t,e){this.handlers[t]=e}static unregisterEmbed(t){delete this.handlers[t]}static getHandler(t){const e=this.handlers[t];if(!e)throw new Error(`no handlers for embed type "${t}"`);return e}insert(t,e){const r={};return"string"==typeof t&&0===t.length?this:(r.insert=t,null!=e&&"object"==typeof e&&Object.keys(e).length>0&&(r.attributes=e),this.push(r))}delete(t){return t<=0?this:this.push({delete:t})}retain(t,e){if("number"==typeof t&&t<=0)return this;const r={retain:t};return null!=e&&"object"==typeof e&&Object.keys(e).length>0&&(r.attributes=e),this.push(r)}push(t){let e=this.ops.length,r=this.ops[e-1];if(t=i(t),"object"==typeof r){if("number"==typeof t.delete&&"number"==typeof r.delete)return this.ops[e-1]={delete:r.delete+t.delete},this;if("number"==typeof r.delete&&null!=t.insert&&(e-=1,r=this.ops[e-1],"object"!=typeof r))return this.ops.unshift(t),this;if(s(t.attributes,r.attributes)){if("string"==typeof t.insert&&"string"==typeof r.insert)return this.ops[e-1]={insert:r.insert+t.insert},"object"==typeof t.attributes&&(this.ops[e-1].attributes=t.attributes),this;if("number"==typeof t.retain&&"number"==typeof r.retain)return this.ops[e-1]={retain:r.retain+t.retain},"object"==typeof t.attributes&&(this.ops[e-1].attributes=t.attributes),this}}return e===this.ops.length?this.ops.push(t):this.ops.splice(e,0,t),this}chop(){const t=this.ops[this.ops.length-1];return t&&"number"==typeof t.retain&&!t.attributes&&this.ops.pop(),this}filter(t){return this.ops.filter(t)}forEach(t){this.ops.forEach(t)}map(t){return this.ops.map(t)}partition(t){const e=[],r=[];return this.forEach((n=>{(t(n)?e:r).push(n)})),[e,r]}reduce(t,e){return this.ops.reduce(t,e)}changeLength(){return this.reduce(((t,e)=>e.insert?t+l.default.length(e):e.delete?t-e.delete:t),0)}length(){return this.reduce(((t,e)=>t+l.default.length(e)),0)}slice(t=0,e=1/0){const r=[],n=new a.default(this.ops);let i=0;for(;i<e&&n.hasNext();){let s;i<t?s=n.next(t-i):(s=n.next(e-i),r.push(s)),i+=l.default.length(s)}return new h(r)}compose(t){const e=new a.default(this.ops),r=new a.default(t.ops),n=[],i=r.peek();if(null!=i&&"number"==typeof i.retain&&null==i.attributes){let t=i.retain;for(;"insert"===e.peekType()&&e.peekLength()<=t;)t-=e.peekLength(),n.push(e.next());i.retain-t>0&&r.next(i.retain-t)}const l=new h(n);for(;e.hasNext()||r.hasNext();)if("insert"===r.peekType())l.push(r.next());else if("delete"===e.peekType())l.push(e.next());else{const t=Math.min(e.peekLength(),r.peekLength()),n=e.next(t),i=r.next(t);if(i.retain){const a={};if("number"==typeof n.retain)a.retain="number"==typeof i.retain?t:i.retain;else if("number"==typeof i.retain)null==n.retain?a.insert=n.insert:a.retain=n.retain;else{const t=null==n.retain?"insert":"retain",[e,r,s]=u(n[t],i.retain),o=h.getHandler(e);a[t]={[e]:o.compose(r,s,"retain"===t)}}const c=o.default.compose(n.attributes,i.attributes,"number"==typeof n.retain);if(c&&(a.attributes=c),l.push(a),!r.hasNext()&&s(l.ops[l.ops.length-1],a)){const t=new h(e.rest());return l.concat(t).chop()}}else"number"==typeof i.delete&&("number"==typeof n.retain||"object"==typeof n.retain&&null!==n.retain)&&l.push(i)}return l.chop()}concat(t){const e=new h(this.ops.slice());return t.ops.length>0&&(e.push(t.ops[0]),e.ops=e.ops.concat(t.ops.slice(1))),e}diff(t,e){if(this.ops===t.ops)return new h;const r=[this,t].map((e=>e.map((r=>{if(null!=r.insert)return"string"==typeof r.insert?r.insert:c;throw new Error("diff() called "+(e===t?"on":"with")+" non-document")})).join(""))),i=new h,l=n(r[0],r[1],e,!0),u=new a.default(this.ops),d=new a.default(t.ops);return l.forEach((t=>{let e=t[1].length;for(;e>0;){let r=0;switch(t[0]){case n.INSERT:r=Math.min(d.peekLength(),e),i.push(d.next(r));break;case n.DELETE:r=Math.min(e,u.peekLength()),u.next(r),i.delete(r);break;case n.EQUAL:r=Math.min(u.peekLength(),d.peekLength(),e);const t=u.next(r),l=d.next(r);s(t.insert,l.insert)?i.retain(r,o.default.diff(t.attributes,l.attributes)):i.push(l).delete(r)}e-=r}})),i.chop()}eachLine(t,e="\n"){const r=new a.default(this.ops);let n=new h,i=0;for(;r.hasNext();){if("insert"!==r.peekType())return;const s=r.peek(),o=l.default.length(s)-r.peekLength(),a="string"==typeof s.insert?s.insert.indexOf(e,o)-o:-1;if(a<0)n.push(r.next());else if(a>0)n.push(r.next(a));else{if(!1===t(n,r.next(1).attributes||{},i))return;i+=1,n=new h}}n.length()>0&&t(n,{},i)}invert(t){const e=new h;return this.reduce(((r,n)=>{if(n.insert)e.delete(l.default.length(n));else{if("number"==typeof n.retain&&null==n.attributes)return e.retain(n.retain),r+n.retain;if(n.delete||"number"==typeof n.retain){const i=n.delete||n.retain;return t.slice(r,r+i).forEach((t=>{n.delete?e.push(t):n.retain&&n.attributes&&e.retain(l.default.length(t),o.default.invert(n.attributes,t.attributes))})),r+i}if("object"==typeof n.retain&&null!==n.retain){const i=t.slice(r,r+1),s=new a.default(i.ops).next(),[l,c,d]=u(n.retain,s.insert),p=h.getHandler(l);return e.retain({[l]:p.invert(c,d)},o.default.invert(n.attributes,s.attributes)),r+1}}return r}),0),e.chop()}transform(t,e=!1){if(e=!!e,"number"==typeof t)return this.transformPosition(t,e);const r=t,n=new a.default(this.ops),i=new a.default(r.ops),s=new h;for(;n.hasNext()||i.hasNext();)if("insert"!==n.peekType()||!e&&"insert"===i.peekType())if("insert"===i.peekType())s.push(i.next());else{const t=Math.min(n.peekLength(),i.peekLength()),r=n.next(t),l=i.next(t);if(r.delete)continue;if(l.delete)s.push(l);else{const n=r.retain,i=l.retain;let a="object"==typeof i&&null!==i?i:t;if("object"==typeof n&&null!==n&&"object"==typeof i&&null!==i){const t=Object.keys(n)[0];if(t===Object.keys(i)[0]){const r=h.getHandler(t);r&&(a={[t]:r.transform(n[t],i[t],e)})}}s.retain(a,o.default.transform(r.attributes,l.attributes,e))}}else s.retain(l.default.length(n.next()));return s.chop()}transformPosition(t,e=!1){e=!!e;const r=new a.default(this.ops);let n=0;for(;r.hasNext()&&n<=t;){const i=r.peekLength(),s=r.peekType();r.next(),"delete"!==s?("insert"===s&&(n<t||!e)&&(t+=i),n+=i):t-=Math.min(i,t-n)}return t}}h.Op=l.default,h.OpIterator=a.default,h.AttributeMap=o.default,h.handlers={},e.default=h,t.exports=h,t.exports.default=h},427:function(t,e){"use strict";var r;Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.length=function(t){return"number"==typeof t.delete?t.delete:"number"==typeof t.retain?t.retain:"object"==typeof t.retain&&null!==t.retain?1:"string"==typeof t.insert?t.insert.length:1}}(r||(r={})),e.default=r},505:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=r(427);e.default=class{constructor(t){this.ops=t,this.index=0,this.offset=0}hasNext(){return this.peekLength()<1/0}next(t){t||(t=1/0);const e=this.ops[this.index];if(e){const r=this.offset,i=n.default.length(e);if(t>=i-r?(t=i-r,this.index+=1,this.offset=0):this.offset+=t,"number"==typeof e.delete)return{delete:t};{const n={};return e.attributes&&(n.attributes=e.attributes),"number"==typeof e.retain?n.retain=t:"object"==typeof e.retain&&null!==e.retain?n.retain=e.retain:"string"==typeof e.insert?n.insert=e.insert.substr(r,t):n.insert=e.insert,n}}return{retain:1/0}}peek(){return this.ops[this.index]}peekLength(){return this.ops[this.index]?n.default.length(this.ops[this.index])-this.offset:1/0}peekType(){const t=this.ops[this.index];return t?"number"==typeof t.delete?"delete":"number"==typeof t.retain||"object"==typeof t.retain&&null!==t.retain?"retain":"insert":"retain"}rest(){if(this.hasNext()){if(0===this.offset)return this.ops.slice(this.index);{const t=this.offset,e=this.index,r=this.next(),n=this.ops.slice(this.index);return this.offset=t,this.index=e,[r].concat(n)}}return[]}}},912:function(e){"use strict";e.exports=t}},r={};function n(t){var i=r[t];if(void 0!==i)return i.exports;var s=r[t]={id:t,loaded:!1,exports:{}};return e[t](s,s.exports,n),s.loaded=!0,s.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t};var i={};return function(){"use strict";n.d(i,{default:function(){return Ar}});var t=n(912),e=n.n(t),r=n(32),s=n.n(r),o='<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 19H12" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 9H6" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 29H6" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 39H12" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',l='<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 9H6" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 19H6" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 29H6" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 39H6" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',a='<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 9H6" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 19H14" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 29H6" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 39H14" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';const c=["data-row","width","height","colspan","rowspan","style"],u={"border-style":"none","border-color":"","border-width":"","background-color":"",width:"",height:"",padding:"","text-align":"left","vertical-align":"middle"},h=["border-style","border-color","border-width","background-color","width","height","padding","text-align","vertical-align"],d=["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","currentcolor","currentcolor","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","transparent","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"],p=["border-style","border-color","border-width","background-color","width","height","align"];const f=e().import("formats/list"),g=e().import("blots/container");class b extends g{static create(t){const e=super.create(),r=Object.keys(t);for(const n of r)"data-row"===n?e.setAttribute(n,t[n]):"cellId"===n?e.setAttribute("data-cell",t[n]):e.setAttribute(`data-${n}`,t[n]);return e}format(t,e){return this.wrap(t,e)}static formats(t){const e=c.reduce(((e,r)=>{const n=r.includes("data")?r:`data-${r}`;return t.hasAttribute(n)&&(e[r]=t.getAttribute(n)),e}),{});return e.cellId=t.getAttribute("data-cell"),e}formats(){const t=this.statics.formats(this.domNode,this.scroll);return{[this.statics.blotName]:t}}}b.blotName="table-list-container",b.className="table-list-container",b.tagName="OL";class m extends f{format(t,e,r){const n=this.formats()[this.statics.blotName];if("list"===t){const[t,i]=this.getCellFormats(this.parent);if(!e||e===n)return this.setReplace(r,t),this.replaceWith(U.blotName,i);if(e!==n)return this.replaceWith(this.statics.blotName,e)}else if(t===b.blotName){"string"==typeof e&&(e={cellId:e});const[r,n]=this.getCorrectCellFormats(e);this.wrap(V.blotName,r),this.wrap(t,Object.assign(Object.assign({},r),{cellId:n}))}else{if("header"===t){const[t,n]=this.getCellFormats(this.parent);return this.setReplace(r,t),this.replaceWith("table-header",{cellId:n,value:e})}if(t===V.blotName){const r=this.getListContainer(this.parent);if(!r)return;const n=r.formats()[r.statics.blotName];this.wrap(t,e),this.wrap(b.blotName,Object.assign(Object.assign({},n),e))}else super.format(t,e)}}getCellFormats(t){return N(M(t))}getCorrectCellFormats(t){const e=M(this.parent);if(e){const[r,n]=N(e),i=Object.assign(Object.assign({},r),t),s=i.cellId||n;return delete i.cellId,[i,s]}{const e=t.cellId,r=Object.assign({},t);return delete r.cellId,[r,e]}}getListContainer(t){for(;t;){if(t.statics.blotName===b.blotName)return t;t=t.parent}return null}static register(){e().register(b)}setReplace(t,e){t?this.parent.replaceWith(V.blotName,e):this.wrap(V.blotName,e)}}m.blotName="table-list",m.className="table-list",e().register({"formats/table-list":m},!0),b.allowedChildren=[m],m.requiredContainer=b;const v=e().import("formats/header");class y extends v{static create(t){const{cellId:e,value:r}=t,n=super.create(r);return n.setAttribute("data-cell",e),n}format(t,e,r){if("header"===t){const t=this.statics.formats(this.domNode).value,r=this.domNode.getAttribute("data-cell");t!=e&&e?super.format("table-header",{cellId:r,value:e}):this.replaceWith(U.blotName,r)}else{if("list"===t){const[t,n]=this.getCellFormats(this.parent);return r?this.wrap(b.blotName,Object.assign(Object.assign({},t),{cellId:n})):this.wrap(V.blotName,t),this.replaceWith("table-list",e)}if(t===V.blotName)return this.wrap(t,e);super.format(t,e)}}static formats(t){return{cellId:t.getAttribute("data-cell"),value:this.tagName.indexOf(t.tagName)+1}}formats(){const t=this.attributes.values(),e=this.statics.formats(this.domNode,this.scroll);return null!=e&&(t[this.statics.blotName]=e),t}getCellFormats(t){return N(M(t))}}y.blotName="table-header",y.className="ql-table-header",e().register({"formats/table-header":y},!0);var w=y;function k(t){if("string"!=typeof t||!t)return t;const e=t.slice(-2),r=t.slice(0,-2);return`${Math.round(parseFloat(r))}${e}`}function x(t){const e=document.createElement("div");return e.innerText=t,e.classList.add("ql-table-tooltip","ql-hidden"),e}function _(t){return t.replace(/mso.*?;/g,"")}function C(t){const[e]=t.descendant(U),[r]=t.descendant(b),[n]=t.descendant(w);return e||r||n}function N(t){const e=V.formats(t.domNode),r=C(t);if(r)return[e,T(r.formats()[r.statics.blotName])];{const t=e["data-row"].split("-")[1];return[e,`cell-${t}`]}}function T(t){return t instanceof Object?t.cellId:t}function A(t,e){return t.closest(e)}function L(t,e){return{left:Math.min(t.left,e.left),right:Math.max(t.right,e.right),top:Math.min(t.top,e.top),bottom:Math.max(t.bottom,e.bottom)}}function S(t,r,n){const i=e().find(r).descendants(Y);let s=0;return i.reduce(((e,r)=>{const{left:i,width:o}=E(r.domNode,n);return s=s||i,s+2>=t.left&&s-2+o<=t.right&&e.push(r.domNode),s+=o,e}),[])}function j(t,r,n,i){return e().find(r).descendants(V).reduce(((e,r)=>{const{left:s,top:o,width:l,height:a}=E(r.domNode,n);switch(i){case"column":(s+2>=t.left&&s-2+l<=t.right||s+2<t.right&&t.right<s-2+l||t.left>s+2&&t.left<s-2+l)&&e.push(r.domNode);break;case"row":break;default:s+2>=t.left&&s-2+l<=t.right&&o+2>=t.top&&o-2+a<=t.bottom&&e.push(r.domNode)}return e}),[])}function E(t,e){const r=t.getBoundingClientRect(),n=e.getBoundingClientRect(),i=r.left-n.left-e.scrollLeft,s=r.top-n.top-e.scrollTop,o=r.width,l=r.height;return{left:i,top:s,width:o,height:l,right:i+o,bottom:s+l}}function M(t){for(;t;){if(t.statics.blotName===V.blotName)return t;t=t.parent}return null}function q(t,e){const r=getComputedStyle(t),n=t.style;return e.reduce(((t,e)=>{return t[e]=(i=n.getPropertyValue(e)||r.getPropertyValue(e)).startsWith("rgba(")?function(t){t=t.replace(/^[^\d]+/,"").replace(/[^\d]+$/,"");const e=Math.round(+t[0]),r=Math.round(+t[1]),n=Math.round(+t[2]),i=Math.round(255*+t[3]).toString(16).toUpperCase().padStart(2,"0");return"#"+((1<<24)+(e<<16)+(r<<8)+n).toString(16).slice(1)+i}(i):i.startsWith("rgb(")?`#${(i=i.replace(/^[^\d]+/,"").replace(/[^\d]+$/,"")).split(",").map((t=>`00${parseInt(t,10).toString(16)}`.slice(-2))).join("")}`:i,t;var i}),{})}function O(t){return!t||(!!/^#([A-Fa-f0-9]{3,6})$/.test(t)||!!/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/.test(t)||function(t){for(const e of d)if(e===t)return!0;return!1}(t))}function B(t){if(!t)return!0;const e=t.slice(-2);return"px"===e||"em"===e||!/[a-z]/.test(e)&&!isNaN(parseFloat(e))}function R(t,e){for(const r in e)t.setAttribute(r,e[r])}function I(t,e){const r=t.style;if(r)for(const t in e)r.setProperty(t,e[t]);else t.setAttribute("style",e.toString())}function P(t,r,n){if(!(null==t?void 0:t.style.getPropertyValue("width")))return;const i=e().find(t),s=i.colgroup(),o=i.temporary();if(s){let t=0;const e=s.domNode.querySelectorAll("col");for(const r of e)t+=~~r.getAttribute("width");I(o.domNode,{width:`${t}px`})}else I(o.domNode,{width:~~(r.width+n)+"px"})}const D=e().import("blots/block"),z=(e().import("blots/break"),e().import("blots/container")),H=["border","cellspacing","style","data-class"],F=["width"];class U extends D{static create(t){const e=super.create();return t?e.setAttribute("data-cell",t):e.setAttribute("data-cell",X()),e}format(t,e){const r=this.formats()[this.statics.blotName];if(t===V.blotName&&e)return this.wrap(W.blotName),this.wrap(t,e);if(t===K.blotName)this.wrap(t,e);else{if("header"===t)return this.replaceWith("table-header",{cellId:r,value:e});if("table-header"===t&&e)return this.wrapTableCell(this.parent),this.replaceWith(t,e);if("list"===t||"table-list"===t&&e){const t=this.getCellFormats(this.parent);return this.wrap(b.blotName,Object.assign(Object.assign({},t),{cellId:r})),this.replaceWith("table-list",e)}super.format(t,e)}}formats(){const t=this.attributes.values(),e=this.domNode.getAttribute("data-cell");return null!=e&&(t[this.statics.blotName]=e),t}getCellFormats(t){const e=M(t);if(!e)return{};const[r]=N(e);return r}wrapTableCell(t){const e=M(t);if(!e)return;const[r]=N(e);this.wrap(V.blotName,r)}}U.blotName="table-cell-block",U.className="ql-table-block",U.tagName="P";class V extends z{checkMerge(){if(super.checkMerge()&&null!=this.next.children.head&&this.next.children.head.formats){const t=this.children.head.formats()[this.children.head.statics.blotName],e=this.children.tail.formats()[this.children.tail.statics.blotName],r=this.next.children.head.formats()[this.next.children.head.statics.blotName],n=this.next.children.tail.formats()[this.next.children.tail.statics.blotName],i=T(t),s=T(e),o=T(r),l=T(n);return i===s&&i===o&&i===l}return!1}static create(t){const e=super.create(),r=Object.keys(t);for(const n of r)t[n]&&e.setAttribute(n,t[n]);return e}static formats(t){const e=this.getEmptyRowspan(t),r=c.reduce(((r,n)=>(t.hasAttribute(n)&&(r[n]="rowspan"===n&&e?""+(~~t.getAttribute(n)-e):_(t.getAttribute(n))),r)),{});return this.hasColgroup(t)&&(delete r.width,r.style&&(r.style=r.style.replace(/width.*?;/g,""))),r}formats(){const t=this.statics.formats(this.domNode,this.scroll);return{[this.statics.blotName]:t}}static getEmptyRowspan(t){let e=t.parentElement.nextElementSibling,r=0;for(;e&&"TR"===e.tagName&&!e.innerHTML.replace(/\s/g,"");)r++,e=e.nextElementSibling;return r}static hasColgroup(t){for(;t&&"TBODY"!==t.tagName;)t=t.parentElement;for(;t;){if("COLGROUP"===t.tagName)return!0;t=t.previousElementSibling}return!1}html(){return this.domNode.outerHTML.replace(/<(ol)[^>]*><li[^>]* data-list="bullet">(?:.*?)<\/li><\/(ol)>/gi,((t,e,r)=>t.replace(e,"ul").replace(r,"ul")))}row(){return this.parent}rowOffset(){return this.row()?this.row().rowOffset():-1}table(){let t=this.parent;for(;null!=t&&"table-container"!==t.statics.blotName;)t=t.parent;return t}optimize(...t){super.optimize(...t),this.children.forEach((t=>{if(null!=t.next&&T(t.formats()[t.statics.blotName])!==T(t.next.formats()[t.next.statics.blotName])){const e=this.splitAfter(t);e&&e.optimize(),this.prev&&this.prev.optimize()}}))}}V.blotName="table-cell",V.tagName="TD";class W extends z{checkMerge(){if(super.checkMerge()&&null!=this.next.children.head&&this.next.children.head.formats){const t=this.children.head.formats()[this.children.head.statics.blotName],e=this.children.tail.formats()[this.children.tail.statics.blotName],r=this.next.children.head.formats()[this.next.children.head.statics.blotName],n=this.next.children.tail.formats()[this.next.children.tail.statics.blotName];return t["data-row"]===e["data-row"]&&t["data-row"]===r["data-row"]&&t["data-row"]===n["data-row"]}return!1}rowOffset(){return this.parent?this.parent.children.indexOf(this):-1}}W.blotName="table-row",W.tagName="TR";class $ extends z{}$.blotName="table-body",$.tagName="TBODY";class G extends D{static create(t){const e=super.create(),r=Object.keys(t);for(const n of r)e.setAttribute(n,t[n]);return e}static formats(t){return H.reduce(((e,r)=>(t.hasAttribute(r)&&(e[r]=t.getAttribute(r)),e)),{})}formats(){const t=this.statics.formats(this.domNode,this.scroll);return{[this.statics.blotName]:t}}optimize(...t){if(this.statics.requiredContainer&&this.parent instanceof this.statics.requiredContainer){const t=this.formats()[this.statics.blotName];for(const e of H)t[e]?"data-class"===e?this.parent.domNode.setAttribute("class",t[e]):this.parent.domNode.setAttribute(e,t[e]):this.parent.domNode.removeAttribute(e)}super.optimize(...t)}}G.blotName="table-temporary",G.className="ql-table-temporary",G.tagName="temporary";class Y extends D{static create(t){const e=super.create(),r=Object.keys(t);for(const n of r)e.setAttribute(n,t[n]);return e}static formats(t){return F.reduce(((e,r)=>(t.hasAttribute(r)&&(e[r]=t.getAttribute(r)),e)),{})}formats(){const t=this.statics.formats(this.domNode,this.scroll);return{[this.statics.blotName]:t}}html(){return this.domNode.outerHTML}}Y.blotName="table-col",Y.tagName="COL";class Z extends z{}Z.blotName="table-colgroup",Z.tagName="COLGROUP";class K extends z{colgroup(){const[t]=this.descendant(Z);return t||this.findChild("table-colgroup")}deleteColumn(t,r,n,i=[]){const s=this.tbody(),o=this.descendants(V);if(null!=s&&null!=s.children.head)if(r.length===o.length)this.deleteTable(),n();else{for(const t of[...r,...i])1===t.parentElement.children.length&&this.setCellRowspan(t.parentElement.previousElementSibling),t.remove();for(const[r,n]of t)this.setCellColspan(e().find(r),n)}}deleteRow(t,e){const r=this.tbody();if(null!=r&&null!=r.children.head)if(t.length===r.children.length)this.deleteTable(),e();else{const e=this.getMaxColumns(r.children.head.children);for(const r of t){const t=this.getCorrectRow(r,e);t&&t.children.forEach((t=>{const e=~~t.domNode.getAttribute("rowspan");if(e>1){const[r,n]=N(t);let i=t.children.head;i.statics.blotName===b.blotName&&(i=i.children.head,Object.assign(r,{cellId:n})),i.format&&i.format(t.statics.blotName,Object.assign(Object.assign({},r),{rowspan:e-1}))}})),r.remove()}}}deleteTable(){this.remove()}findChild(t){let e=this.children.head;for(;e;){if(e.statics.blotName===t)return e;e=e.next}return null}getCorrectRow(t,e){let r=!1;for(;t&&!r;){if(e===this.getMaxColumns(t.children))return r=!0,t;t=t.prev}return t}getInsertRow(t,e){const r=this.tbody();if(null==r||null==r.children.head)return;const n=J(),i=this.scroll.create(W.blotName),s=this.getMaxColumns(r.children.head.children);return this.getMaxColumns(t.children)===s?(t.children.forEach((t=>{const e={height:"24","data-row":n},r=~~t.domNode.getAttribute("colspan");this.insertTableCell(r,e,i)})),i):((t=this.getCorrectRow(t.prev,s)).children.forEach((t=>{const e={height:"24","data-row":n},r=~~t.domNode.getAttribute("colspan"),s=~~t.domNode.getAttribute("rowspan");s>1?t.domNode.setAttribute("rowspan",s+1):this.insertTableCell(r,e,i)})),i)}getMaxColumns(t){return t.reduce(((t,e)=>t+(~~e.domNode.getAttribute("colspan")||1)),0)}insertColumn(t,e,r){const n=this.colgroup(),i=this.tbody();if(null==i||null==i.children.head)return;const s=[],o=[];let l=i.children.head;for(;l;){if(e){const t=l.children.tail.domNode.getAttribute("data-row");s.push([l,t,null])}else{let e=l.children.head;for(;e;){const{left:n,right:i}=e.domNode.getBoundingClientRect(),o=e.domNode.getAttribute("data-row");if(Math.abs(n-t)<=2){s.push([l,o,e]);break}if(Math.abs(i-t)<=2&&!e.next){s.push([l,o,null]);break}if(Math.abs(n-t-r)<=2){s.push([l,o,e]);break}if(t>n&&t<i){s.push([null,o,e]);break}e=e.next}}l=l.next}if(n)if(e)o.push([n,null]);else{let e=0,r=0,i=n.children.head;for(;i;){const{left:s,width:l}=i.domNode.getBoundingClientRect();if(e=e||s,r=e+l,Math.abs(e-t)<=2){o.push([n,i]);break}if(Math.abs(r-t)<=2&&!i.next){o.push([n,null]);break}e+=l,i=i.next}}for(const[t,e,r]of s)t?this.insertColumnCell(t,e,r):this.setCellColspan(r,1);for(const[t,e]of o)this.insertCol(t,e)}insertCol(t,e){const r=this.scroll.create(Y.blotName,{width:"72"});t.insertBefore(r,e)}insertColumnCell(t,e,r){const n=this.colgroup()?{"data-row":e}:{"data-row":e,width:"72"},i=this.scroll.create(V.blotName,n),s=this.scroll.create(U.blotName,X());i.appendChild(s),t.insertBefore(i,r),s.optimize()}insertRow(t,e){const r=this.tbody();if(null==r||null==r.children.head)return;const n=r.children.at(t),i=n||r.children.at(t-1),s=this.getInsertRow(i,e);r.insertBefore(s,n)}insertTableCell(t,e,r){t>1?Object.assign(e,{colspan:t}):delete e.colspan;const n=this.scroll.create(V.blotName,e),i=this.scroll.create(U.blotName,X());n.appendChild(i),r.appendChild(n),i.optimize()}optimize(...t){super.optimize(...t);const e=this.descendants(G);if(this.setClassName(e),e.length>1){e.shift();for(const t of e)t.remove()}}setCellColspan(t,e){const r=t.statics.blotName,n=t.formats()[r],i=(~~n.colspan||1)+e,s=C(t);i>1?Object.assign(n,{colspan:i}):delete n.colspan,s.format(r,n)}setCellRowspan(t){for(;t;){const r=t.querySelectorAll("td[rowspan]");if(r.length){for(const t of r){const r=e().find(t),n=r.statics.blotName,i=r.formats()[n],s=(~~i.rowspan||1)-1,o=C(r);s>1?Object.assign(i,{rowspan:s}):delete i.rowspan,o.format(n,i)}break}t=t.previousElementSibling}}setClassName(t){const e=this.statics.defaultClassName,r=t[0],n=this.domNode.getAttribute("class"),i=t=>{const r=(t||"").split(/\s+/);return r.find((t=>t===e))||r.unshift(e),r.join(" ").trim()},s=(t,e)=>{t.domNode.setAttribute("data-class",e)};if(r){const t=r.domNode.getAttribute("data-class");t!==n&&null!=n&&s(r,i(n)),n||t||s(r,e)}else{const t=this.prev;if(!t)return;const[r]=t.descendant(V),[o]=t.descendant(G);if(!r&&o){const t=o.domNode.getAttribute("data-class");t!==n&&null!=n&&s(o,i(n)),n||t||s(o,e)}}}tbody(){const[t]=this.descendant($);return t||this.findChild("table-body")}temporary(){const[t]=this.descendant(G);return t}}function X(){return`cell-${Math.random().toString(36).slice(2,6)}`}function J(){return`row-${Math.random().toString(36).slice(2,6)}`}K.blotName="table-container",K.defaultClassName="ql-table-better",K.tagName="TABLE",K.allowedChildren=[$,G,Z],$.requiredContainer=K,G.requiredContainer=K,Z.requiredContainer=K,$.allowedChildren=[W],W.requiredContainer=$,Z.allowedChildren=[Y],Y.requiredContainer=Z,W.allowedChildren=[V],V.requiredContainer=W,V.allowedChildren=[U,w,b],U.requiredContainer=V,w.requiredContainer=V,b.requiredContainer=V;var Q=n(930),tt=n.n(Q);const et=["border","cellspacing","style","class"];function rt(t,e,r){return"object"==typeof e?Object.keys(e).reduce(((t,r)=>rt(t,r,e[r])),t):t.reduce(((t,n)=>n.attributes&&n.attributes[e]?t.push(n):t.insert(n.insert,tt()({},{[e]:r},n.attributes))),new(s()))}function nt(t,e){const r="TABLE"===t.parentNode.tagName?t.parentNode:t.parentNode.parentNode,n=Array.from(r.querySelectorAll("tr")).indexOf(t)+1;return t.innerHTML.replace(/\s/g,"")?rt(e,"table-cell",n):new(s())}function it(t,e){var r;const n="TABLE"===t.parentNode.parentNode.tagName?t.parentNode.parentNode:t.parentNode.parentNode.parentNode,i=Array.from(n.querySelectorAll("tr")),s=t.tagName,o=Array.from(t.parentNode.querySelectorAll(s)),l=t.getAttribute("data-row")||i.indexOf(t.parentNode)+1,a=(null===(r=null==t?void 0:t.firstElementChild)||void 0===r?void 0:r.getAttribute("data-cell"))||o.indexOf(t)+1;return e.length()||e.insert("\n",{"table-cell":{"data-row":l}}),e.ops.forEach((t=>{t.attributes&&t.attributes["table-cell"]&&(t.attributes["table-cell"]=Object.assign(Object.assign({},t.attributes["table-cell"]),{"data-row":l}))})),rt(function(t,e,r){const n=V.formats(t);return"TH"===t.tagName?(e.ops.forEach((t=>{"string"!=typeof t.insert||t.insert.endsWith("\n")||(t.insert+="\n")})),rt(e,"table-cell",Object.assign(Object.assign({},n),{"data-row":r}))):e}(t,e,l),"table-cell-block",a)}function st(t,e){let r=~~t.getAttribute("span")||1;const n=t.getAttribute("width"),i=new(s());for(;r>1;)i.insert("\n",{"table-col":{width:n}}),r--;return i.concat(e)}function ot(t,e){const r=et.reduce(((e,r)=>(t.hasAttribute(r)&&("class"===r?e["data-class"]=t.getAttribute(r):e[r]=_(t.getAttribute(r))),e)),{});return(new(s())).insert("\n",{"table-temporary":r}).concat(e)}var lt={col:"Column",insColL:"Insert column left",insColR:"Insert column right",delCol:"Delete column",row:"Row",insRowAbv:"Insert row above",insRowBlw:"Insert row below",delRow:"Delete row",mCells:"Merge cells",sCell:"Split cell",tblProps:"Table properties",cellProps:"Cell properties",insParaOTbl:"Insert paragraph outside the table",insB4:"Insert before",insAft:"Insert after",delTable:"Delete table",border:"Border",color:"Color",width:"Width",background:"Background",dims:"Dimensions",height:"Height",padding:"Padding",tblCellTxtAlm:"Table cell text alignment",alCellTxtL:"Align cell text to the left",alCellTxtC:"Align cell text to the center",alCellTxtR:"Align cell text to the right",jusfCellTxt:"Justify cell text",alCellTxtT:"Align cell text to the top",alCellTxtM:"Align cell text to the middle",alCellTxtB:"Align cell text to the bottom",dimsAlm:"Dimensions and alignment",alTblL:"Align table to the left",tblC:"Center table",alTblR:"Align table to the right",save:"Save",cancel:"Cancel",colorMsg:'The color is invalid. Try "#FF0000" or "rgb(255,0,0)" or "red".',dimsMsg:'The value is invalid. Try "10px" or "2em" or simply "2".',colorPicker:"Color picker",removeColor:"Remove color",black:"Black",dimGrey:"Dim grey",grey:"Grey",lightGrey:"Light grey",white:"White",red:"Red",orange:"Orange",yellow:"Yellow",lightGreen:"Light green",green:"Green",aquamarine:"Aquamarine",turquoise:"Turquoise",lightBlue:"Light blue",blue:"Blue",purple:"Purple"},at={col:"列",insColL:"向左插入列",insColR:"向右插入列",delCol:"删除列",row:"行",insRowAbv:"在上面插入行",insRowBlw:"在下面插入行",delRow:"删除行",mCells:"合并单元格",sCell:"拆分单元格",tblProps:"表格属性",cellProps:"单元格属性",insParaOTbl:"在表格外插入段落",insB4:"在表格前面插入",insAft:"在表格后面插入",delTable:"删除表格",border:"边框",color:"颜色",width:"宽度",background:"背景",dims:"尺寸",height:"高度",padding:"内边距",tblCellTxtAlm:"单元格文本对齐方式",alCellTxtL:"左对齐",alCellTxtC:"水平居中对齐",alCellTxtR:"右对齐",jusfCellTxt:"两边对齐",alCellTxtT:"顶端对齐",alCellTxtM:"垂直居中对齐",alCellTxtB:"底部对齐",dimsAlm:"尺寸和对齐方式",alTblL:"表格左对齐",tblC:"表格居中",alTblR:"表格右对齐",save:"保存",cancel:"取消",colorMsg:'无效颜色，请使用 "#FF0000" 或者 "rgb(255,0,0)" 或者 "red"',dimsMsg:'无效值， 请使用 "10px" 或者 "2em" 或者 "2"',colorPicker:"颜色选择器",removeColor:"删除颜色",black:"黑色",dimGrey:"暗灰色",grey:"灰色",lightGrey:"浅灰色",white:"白色",red:"红色",orange:"橙色",yellow:"黄色",lightGreen:"浅绿色",green:"绿色",aquamarine:"海蓝色",turquoise:"青绿色",lightBlue:"浅蓝色",blue:"蓝色",purple:"紫色"},ct={col:"Colonne",insColL:"Insérer colonne à gauche",insColR:"Insérer colonne à droite",delCol:"Supprimer la colonne",row:"Ligne",insRowAbv:"Insérer ligne au-dessus",insRowBlw:"Insérer ligne en dessous",delRow:"Supprimer la ligne",mCells:"Fusionner les cellules",sCell:"Diviser la cellule",tblProps:"Propriétés du tableau",cellProps:"Propriétés de la cellule",insParaOTbl:"Insérer paragraphe en dehors du tableau",insB4:"Insérer avant",insAft:"Insérer après",delTable:"Supprimer le tableau",border:"Bordure",color:"Couleur",width:"Largeur",background:"Arrière-plan",dims:"Dimensions",height:"Hauteur",padding:"Marge intérieure",tblCellTxtAlm:"Alignement du texte de la cellule du tableau",alCellTxtL:"Aligner le texte de la cellule à gauche",alCellTxtC:"Aligner le texte de la cellule au centre",alCellTxtR:"Aligner le texte de la cellule à droite",jusfCellTxt:"Justifier le texte de la cellule",alCellTxtT:"Aligner le texte de la cellule en haut",alCellTxtM:"Aligner le texte de la cellule au milieu",alCellTxtB:"Aligner le texte de la cellule en bas",dimsAlm:"Dimensions et alignement",alTblL:"Aligner le tableau à gauche",tblC:"Centrer le tableau",alTblR:"Aligner le tableau à droite",save:"Enregistrer",cancel:"Annuler",colorMsg:'La couleur est invalide. Essayez "#FF0000" ou "rgb(255,0,0)" ou "rouge".',dimsMsg:'La valeur est invalide. Essayez "10px" ou "2em" ou simplement "2".',colorPicker:"Sélecteur de couleur",removeColor:"Supprimer la couleur",black:"Noir",dimGrey:"Gris foncé",grey:"Gris",lightGrey:"Gris clair",white:"Blanc",red:"Rouge",orange:"Orange",yellow:"Jaune",lightGreen:"Vert clair",green:"Vert",aquamarine:"Aigue-marine",turquoise:"Turquoise",lightBlue:"Bleu clair",blue:"Bleu",purple:"Violet"},ut={col:"Kolumna",insColL:"Wstaw kolumnę z lewej",insColR:"Wstaw kolumnę z prawej",delCol:"Usuń kolumnę",row:"Wiersz",insRowAbv:"Wstaw wiersz powyżej",insRowBlw:"Wstaw wiersz poniżej",delRow:"Usuń wiersz",mCells:"Scal komórki",sCell:"Podziel komórkę",tblProps:"Właściwości tabeli",cellProps:"Właściwości komórki",insParaOTbl:"Wstaw akapit poza tabelą",insB4:"Wstaw przed",insAft:"Wstaw po",delTable:"Usuń tabelę",border:"Obramowanie",color:"Kolor",width:"Szerokość",background:"Tło",dims:"Wymiary",height:"Wysokość",padding:"Margines wewnętrzny",tblCellTxtAlm:"Wyrównanie tekstu w komórce tabeli",alCellTxtL:"Wyrównaj tekst w komórce do lewej",alCellTxtC:"Wyrównaj tekst w komórce do środka",alCellTxtR:"Wyrównaj tekst w komórce do prawej",jusfCellTxt:"Wyjustuj tekst w komórce",alCellTxtT:"Wyrównaj tekst w komórce do góry",alCellTxtM:"Wyrównaj tekst w komórce do środka",alCellTxtB:"Wyrównaj tekst w komórce do dołu",dimsAlm:"Wymiary i wyrównanie",alTblL:"Wyrównaj tabelę do lewej",tblC:"Wyśrodkuj tabelę",alTblR:"Wyrównaj tabelę do prawej",save:"Zapisz",cancel:"Anuluj",colorMsg:'Kolor jest nieprawidłowy. Spróbuj "#FF0000" lub "rgb(255,0,0)" lub "red".',dimsMsg:'Wartość jest nieprawidłowa. Spróbuj "10px" lub "2em" lub po prostu "2".',colorPicker:"Wybór koloru",removeColor:"Usuń kolor",black:"Czarny",dimGrey:"Przyciemniony szary",grey:"Szary",lightGrey:"Jasnoszary",white:"Biały",red:"Czerwony",orange:"Pomarańczowy",yellow:"Żółty",lightGreen:"Jasnozielony",green:"Zielony",aquamarine:"Akwamaryna",turquoise:"Turkusowy",lightBlue:"Jasnoniebieski",blue:"Niebieski",purple:"Fioletowy"},ht={col:"Spalte",insColL:"Spalte links einfügen",insColR:"Spalte rechts einfügen",delCol:"Spalte löschen",row:"Zeile",insRowAbv:"Zeile oberhalb einfügen",insRowBlw:"Zeile unterhalb einfügen",delRow:"Zeile löschen",mCells:"Zellen verbinden",sCell:"Zelle teilen",tblProps:"Tabelleneingenschaften",cellProps:"Zelleneigenschaften",insParaOTbl:"Absatz außerhalb der Tabelle einfügen",insB4:"Davor einfügen",insAft:"Danach einfügen",delTable:"Tabelle löschen",border:"Rahmen",color:"Farbe",width:"Breite",background:"Schattierung",dims:"Maße",height:"Höhe",padding:"Abstand",tblCellTxtAlm:"Ausrichtung",alCellTxtL:"Zellentext links ausrichten",alCellTxtC:"Zellentext mittig ausrichten",alCellTxtR:"Zellentext rechts ausrichten",jusfCellTxt:"Zellentext Blocksatz",alCellTxtT:"Zellentext oben ausrichten",alCellTxtM:"Zellentext mittig ausrichten",alCellTxtB:"Zellentext unten ausrichten",dimsAlm:"Maße und Ausrichtung",alTblL:"Tabelle links ausrichten",tblC:"Tabelle mittig ausrichten",alTblR:"Tabelle rechts ausrichten",save:"Speichern",cancel:"Abbrechen",colorMsg:'Die Farbe ist ungültig. Probiere "#FF0000", "rgb(255,0,0)" oder "red".',dimsMsg:'Der Wert ist ungültig. Probiere "10px", "2em" oder einfach "2".',colorPicker:"Farbwähler",removeColor:"Farbe entfernen",black:"Schwarz",dimGrey:"Dunkelgrau",grey:"Grau",lightGrey:"Hellgrau",white:"Weiß",red:"Rot",orange:"Orange",yellow:"Gelb",lightGreen:"Hellgrün",green:"Grün",aquamarine:"Aquamarin",turquoise:"Türkis",lightBlue:"Hellblau",blue:"Blau",purple:"Lila"},dt=class{constructor(t){this.config={en_US:lt,zh_CN:at,fr_FR:ct,pl_PL:ut,de_DE:ht},this.init(t)}changeLanguage(t){this.name=t}init(t){if(void 0===t||"string"==typeof t)this.changeLanguage(t||"en_US");else{const{name:e,content:r}=t;r&&this.registry(e,r),e&&this.changeLanguage(e)}}registry(t,e){this.config=Object.assign(Object.assign({},this.config),{[t]:e})}useLanguage(t){return this.config[this.name][t]}};const pt=e().import("blots/block"),{BlockEmbed:ft}=e().import("blots/block"),gt=e().import("blots/container"),bt=["bold","italic","underline","strike","size","color","background","font","list","header","align","link","image"],mt=["link","image"];var vt,yt,wt,kt,xt,_t=class{constructor(t,e){this.quill=t,this.selectedTds=[],this.startTd=null,this.endTd=null,this.disabledList=[],this.singleList=[],this.tableBetter=e,this.quill.root.addEventListener("click",this.handleClick.bind(this)),this.initWhiteList()}attach(t){let e=Array.from(t.classList).find((t=>0===t.indexOf("ql-")));if(!e)return;const[r,n]=this.getButtonsWhiteList(),i=this.getCorrectDisabled(t,e);e=e.slice(3),r.includes(e)||this.disabledList.push(...i),n.includes(e)&&this.singleList.push(...i)}clearSelected(){for(const t of this.selectedTds)t.classList&&t.classList.remove("ql-cell-focused","ql-cell-selected");this.selectedTds=[],this.startTd=null,this.endTd=null}getButtonsWhiteList(){const{options:t={}}=this.tableBetter,{toolbarButtons:e={}}=t,{whiteList:r=bt,singleWhiteList:n=mt}=e;return[r,n]}getCorrectDisabled(t,e){if("SELECT"!==t.tagName)return[t];const r=t.closest("span.ql-formats");return r?[...r.querySelectorAll(`span.${e}.ql-picker`),t]:[t]}getCorrectValue(t,r){for(const n of this.selectedTds){const i=e().find(n).html()||n.outerHTML,s=this.quill.clipboard.convert({html:i,text:"\n"});for(const e of s.ops)if(!this.isContinue(e)&&(r=this.getListCorrectValue(t,r,null==e?void 0:e.attributes))!=((null==e?void 0:e.attributes)&&(null==e?void 0:e.attributes[t])||!1))return r}return!r}getListCorrectValue(t,e,r={}){return"list"!==t?e:"check"===e?"checked"!==r[t]&&"unchecked"!==r[t]&&"unchecked":e}handleClick(t){if(t.detail<3||!this.selectedTds.length)return;const{index:r,length:n}=this.quill.getSelection(!0);this.quill.setSelection(r,n-1,e().sources.SILENT),this.quill.scrollSelectionIntoView()}handleKeyup(t){switch(t.key){case"ArrowLeft":case"ArrowRight":this.makeTableArrowLevelHandler(t.key);break;case"ArrowUp":case"ArrowDown":this.makeTableArrowVerticalHandler(t.key);break;case"Backspace":case"Delete":this.removeSelectedTdsContent()}}handleMousedown(t){this.clearSelected();const e=t.target.closest("table");if(!e)return;this.tableBetter.tableMenus.destroyTablePropertiesForm();const r=t.target.closest("td");this.startTd=r,this.endTd=r,this.selectedTds=[r],r.classList.add("ql-cell-focused");const n=t=>{const n=t.target.closest("td");if(!n)return;const i=r.isEqualNode(n);if(i)return;this.clearSelected(),this.startTd=r,this.endTd=n;const s=L(E(r,this.quill.container),E(n,this.quill.container));this.selectedTds=j(s,e,this.quill.container);for(const t of this.selectedTds)t.classList&&t.classList.add("ql-cell-selected");i||this.quill.blur()},i=t=>{this.setSingleDisabled(),this.quill.root.removeEventListener("mousemove",n),this.quill.root.removeEventListener("mouseup",i)};this.quill.root.addEventListener("mousemove",n),this.quill.root.addEventListener("mouseup",i)}initWhiteList(){const t=this.quill.getModule("toolbar");Array.from(t.container.querySelectorAll("button, select")).forEach((t=>{this.attach(t)}))}insertWith(t){return"string"==typeof t&&t.startsWith("\n")&&t.endsWith("\n")}isContinue(t){return!(!this.insertWith(t.insert)||t.attributes&&!t.attributes["table-list"]&&!t.attributes["table-header"])}lines(t){const e=t=>{let r=[];return t.children.forEach((t=>{t instanceof gt?r=r.concat(e(t)):function(t){return t instanceof pt||t instanceof ft}(t)&&r.push(t)})),r};return e(t)}makeTableArrowLevelHandler(t){const e="ArrowLeft"===t?this.startTd:this.endTd,r=this.quill.getSelection();if(!r)return;const[n]=this.quill.getLine(r.index),i=M(n);if(!i)return this.tableBetter.hideTools();!i||e&&e.isEqualNode(i.domNode)||(this.setSelected(i.domNode,!1),this.tableBetter.showTools(!1))}makeTableArrowVerticalHandler(t){const r="ArrowUp"===t,n=this.quill.getSelection();if(!n)return;const[i,s]=this.quill.getLine(n.index),o=r?"prev":"next";if(i[o]&&this.selectedTds.length){const t=i[o].offset(this.quill.scroll)+Math.min(s,i[o].length()-1);this.quill.setSelection(t,0,e().sources.USER)}else{if(!this.selectedTds.length){const t=M(i);if(!t)return;return this.tableArrowSelection(r,t),void this.tableBetter.showTools(!1)}const t=r?this.startTd:this.endTd,n=e().find(t).parent[o],{left:s,right:l}=t.getBoundingClientRect();if(n){let t=null,e=n;for(;e&&!t;){let r=e.children.head;for(;r;){const{left:e,right:n}=r.domNode.getBoundingClientRect();if(Math.abs(e-s)<=2){t=r;break}if(Math.abs(n-l)<=2){t=r;break}r=r.next}e=e[o]}this.tableArrowSelection(r,t)}else{const t=M(i).table(),n=r?-1:t.length(),s=t.offset(this.quill.scroll)+n;this.tableBetter.hideTools(),this.quill.setSelection(s,0,e().sources.USER)}}}removeCursor(){const t=this.quill.getSelection(!0);t&&0===t.length&&(this.quill.selection.cursor.remove(),this.quill.blur())}removeSelectedTdsContent(){if(!(this.selectedTds.length<2)){for(const t of this.selectedTds){const r=e().find(t);let n=r.children.head;const i=n.formats()[U.blotName],s=this.quill.scroll.create(U.blotName,i);for(r.insertBefore(s,n);n;)n.remove(),n=n.next}this.tableBetter.tableMenus.updateMenus()}}setDisabled(t){for(const e of this.disabledList)t?e.classList.add("ql-table-button-disabled"):e.classList.remove("ql-table-button-disabled");this.setSingleDisabled()}setSelected(t,r=!0){const n=e().find(t);this.clearSelected(),this.startTd=t,this.endTd=t,this.selectedTds=[t],t.classList.add("ql-cell-focused"),r&&this.quill.setSelection(n.offset(this.quill.scroll)+n.length()-1,0,e().sources.USER)}setSelectedTds(t){this.clearSelected(),this.startTd=t[0],this.endTd=t[t.length-1],this.selectedTds=t;for(const t of this.selectedTds)t.classList&&t.classList.add("ql-cell-selected")}setSelectedTdsFormat(t,r){const n=[],i=this.quill.getModule("toolbar");for(const s of this.selectedTds)if(null!=i.handlers[t]){const o=e().find(s),l=this.lines(o),a=i.handlers[t].call(i,r,l);a&&n.push(M(a).domNode)}else{const n=window.getSelection();n.selectAllChildren(s),this.quill.format(t,r,e().sources.USER),n.removeAllRanges()}this.quill.blur(),n.length&&this.setSelectedTds(n)}setSingleDisabled(){for(const t of this.singleList)this.selectedTds.length>1?t.classList.add("ql-table-button-disabled"):t.classList.remove("ql-table-button-disabled")}tableArrowSelection(t,r){const n=t?"tail":"head",i=t?r.children[n].length()-1:0;this.setSelected(r.domNode,!1);const s=r.children[n].offset(this.quill.scroll)+i;this.quill.setSelection(s,0,e().sources.USER)}updateSelected(t){switch(t){case"column":{const t=this.endTd.nextElementSibling||this.startTd.previousElementSibling;if(!t)return;this.setSelected(t)}break;case"row":{const t=this.endTd.parentElement.nextElementSibling||this.startTd.parentElement.previousElementSibling;if(!t)return;const e=E(this.startTd,this.quill.container);let r=t.firstElementChild;for(;r;){const t=E(r,this.quill.container);if(t.left+2>=e.left&&(t.right<=e.right+2||t.right+2>=e.right)){this.setSelected(r);break}r=r.nextElementSibling}}}}},Ct=class{constructor(t,e){this.quill=t,this.options=null,this.drag=!1,this.line=null,this.dragBlock=null,this.dragTable=null,this.direction=null,this.tableBetter=e,this.quill.root.addEventListener("mousemove",this.handleMouseMove.bind(this))}createDragBlock(){const t=document.createElement("div");t.classList.add("ql-operate-block");const{dragBlockProps:e}=this.getProperty(this.options);I(t,e),this.dragBlock=t,this.quill.container.appendChild(t),this.updateCell(t)}createDragTable(t){const e=document.createElement("div"),r=this.getDragTableProperty(t);e.classList.add("ql-operate-drag-table"),I(e,r),this.dragTable=e,this.quill.container.appendChild(e)}createOperateLine(){const t=document.createElement("div"),e=document.createElement("div");t.classList.add("ql-operate-line-container");const{containerProps:r,lineProps:n}=this.getProperty(this.options);I(t,r),I(e,n),t.appendChild(e),this.quill.container.appendChild(t),this.line=t,this.updateCell(t)}getCorrectCol(t,e){let r=t.children.head;for(;r&&--e;)r=r.next;return r}getDragTableProperty(t){const{left:e,top:r,width:n,height:i}=t.getBoundingClientRect(),s=this.quill.container.getBoundingClientRect();return{left:e-s.left+"px",top:r-s.top+"px",width:`${n}px`,height:`${i}px`,display:"block"}}getLevelColSum(t){let e=t,r=0;for(;e;)r+=~~e.getAttribute("colspan")||1,e=e.previousSibling;return r}getMaxColNum(t){const e=t.parentElement.children;let r=0;for(const t of e)r+=~~t.getAttribute("colspan")||1;return r}getProperty(t){const e=this.quill.container.getBoundingClientRect(),{tableNode:r,cellNode:n,mousePosition:i}=t,{clientX:s,clientY:o}=i,l=r.getBoundingClientRect(),a=n.getBoundingClientRect(),c=a.left+a.width,u=a.top+a.height,h={width:"8px",height:"8px",top:l.bottom-e.top+"px",left:l.right-e.left+"px",display:l.bottom>e.bottom?"none":"block"};return Math.abs(c-s)<=5?(this.direction="level",{dragBlockProps:h,containerProps:{width:"5px",height:`${e.height}px`,top:"0",left:c-e.left-2.5+"px",display:"flex",cursor:"col-resize"},lineProps:{width:"1px",height:"100%"}}):Math.abs(u-o)<=5?(this.direction="vertical",{dragBlockProps:h,containerProps:{width:`${e.width}px`,height:"5px",top:u-e.top-2.5+"px",left:"0",display:"flex",cursor:"row-resize"},lineProps:{width:"100%",height:"1px"}}):(this.hideLine(),{dragBlockProps:h})}getVerticalCells(t,e){let r=t.parentElement;for(;e>1&&r;)r=r.nextSibling,e--;return r.children}handleMouseMove(t){const e=t.target.closest("table"),r=t.target.closest("td"),n={clientX:t.clientX,clientY:t.clientY};if(!e||!r)return void(this.line&&!this.drag&&(this.hideLine(),this.hideDragBlock()));const i={tableNode:e,cellNode:r,mousePosition:n};if(this.line){if(this.drag||!r)return;this.updateProperty(i)}else this.options=i,this.createOperateLine(),this.createDragBlock()}hideDragBlock(){this.dragBlock&&I(this.dragBlock,{display:"none"})}hideDragTable(){this.dragTable&&I(this.dragTable,{display:"none"})}hideLine(){this.line&&I(this.line,{display:"none"})}isLine(t){return t.classList.contains("ql-operate-line-container")}setCellLevelRect(t,r){const{right:n}=t.getBoundingClientRect(),i=~~(r-n),s=this.getLevelColSum(t),o=e().find(t).table(),l=o.colgroup(),a=o.domNode.getBoundingClientRect();if(l){const t=this.getCorrectCol(l,s),e=t.next,r=t.formats()[t.statics.blotName];if(t.domNode.setAttribute("width",`${parseFloat(r.width)+i}`),e){const t=e.formats()[e.statics.blotName];e.domNode.setAttribute("width",""+(parseFloat(t.width)-i))}}else{const e=null==t.nextElementSibling,r=t.parentElement.parentElement.children,n=[];for(const t of r){const r=t.children;if(e){const t=r[r.length-1],{width:e}=t.getBoundingClientRect();n.push([t,""+~~(e+i)]);continue}let o=0;for(const t of r){if(o+=~~t.getAttribute("colspan")||1,o>s)break;if(o===s){const{width:e}=t.getBoundingClientRect(),r=t.nextElementSibling;if(!r)continue;const{width:s}=r.getBoundingClientRect();n.push([t,""+~~(e+i)],[r,""+~~(s-i)])}}}for(const[t,e]of n)R(t,{width:e}),I(t,{width:`${e}px`})}null==t.nextElementSibling&&P(o.domNode,a,i)}setCellRect(t,e,r){"level"===this.direction?this.setCellLevelRect(t,e):"vertical"===this.direction&&this.setCellVerticalRect(t,r)}setCellsRect(t,r,n){const i=t.parentElement.parentElement.children,s=r/this.getMaxColNum(t),o=n/i.length,l=[],a=e().find(t).table(),c=a.colgroup(),u=a.domNode.getBoundingClientRect();for(const t of i){const e=t.children;for(const t of e){const e=~~t.getAttribute("colspan")||1,{width:r,height:n}=t.getBoundingClientRect();l.push([t,`${Math.ceil(r+s*e)}`,`${Math.ceil(n+o)}`])}}if(c){let t=c.children.head;for(const[t,,e]of l)R(t,{height:e}),I(t,{height:`${e}px`});for(;t;){const{width:e}=t.domNode.getBoundingClientRect();R(t.domNode,{width:`${Math.ceil(e+s)}`}),t=t.next}}else for(const[t,e,r]of l)R(t,{width:e,height:r}),I(t,{width:`${e}px`,height:`${r}px`});P(a.domNode,u,r)}setCellVerticalRect(t,e){const r=~~t.getAttribute("rowspan")||1,n=r>1?this.getVerticalCells(t,r):t.parentElement.children;for(const t of n){const{top:r}=t.getBoundingClientRect(),n=""+~~(e-r);R(t,{height:n}),I(t,{height:`${n}px`})}}toggleLineChildClass(t){const e=this.line.firstElementChild;t?e.classList.add("ql-operate-line"):e.classList.remove("ql-operate-line")}updateCell(t){if(!t)return;const e=this.isLine(t),r=t=>{t.preventDefault(),this.drag&&(e?(this.updateDragLine(t.clientX,t.clientY),this.hideDragBlock()):(this.updateDragBlock(t.clientX,t.clientY),this.hideLine()))},n=t=>{t.preventDefault();const{cellNode:i,tableNode:s}=this.options;if(e)this.setCellRect(i,t.clientX,t.clientY),this.toggleLineChildClass(!1);else{const{right:e,bottom:r}=s.getBoundingClientRect(),n=t.clientX-e,o=t.clientY-r;this.setCellsRect(i,n,o),this.dragBlock.classList.remove("ql-operate-block-move"),this.hideDragBlock(),this.hideDragTable()}this.drag=!1,document.removeEventListener("mousemove",r,!1),document.removeEventListener("mouseup",n,!1),this.tableBetter.tableMenus.updateMenus(s)};t.addEventListener("mousedown",(t=>{t.preventDefault();const{tableNode:i}=this.options;if(e)this.toggleLineChildClass(!0);else if(this.dragTable){const t=this.getDragTableProperty(i);I(this.dragTable,t)}else this.createDragTable(i);this.drag=!0,document.addEventListener("mousemove",r),document.addEventListener("mouseup",n)}))}updateDragBlock(t,e){const r=this.quill.container.getBoundingClientRect();this.dragBlock.classList.add("ql-operate-block-move"),I(this.dragBlock,{top:~~(e-r.top-4)+"px",left:~~(t-r.left-4)+"px"}),this.updateDragTable(t,e)}updateDragLine(t,e){const r=this.quill.container.getBoundingClientRect();"level"===this.direction?I(this.line,{left:~~(t-r.left-2.5)+"px"}):"vertical"===this.direction&&I(this.line,{top:~~e-r.top-2.5+"px"})}updateDragTable(t,e){const{top:r,left:n}=this.dragTable.getBoundingClientRect(),i=t-n,s=e-r;I(this.dragTable,{width:`${i}px`,height:`${s}px`,display:"block"})}updateProperty(t){const{containerProps:e,lineProps:r,dragBlockProps:n}=this.getProperty(t);e&&r&&(this.options=t,I(this.line,e),I(this.line.firstChild,r),I(this.dragBlock,n))}},Nt='<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1692084293475" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2632" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M1012.62222223 944.76190506a78.01904747 78.01904747 0 0 1-78.01904747 78.01904747H76.3936505a78.01904747 78.01904747 0 0 1-78.01904747-78.01904747V86.55238079a78.01904747 78.01904747 0 0 1 78.01904747-78.01904746h858.20952426a78.01904747 78.01904747 0 0 1 78.01904747 78.01904746v858.20952427zM466.4888889 554.66666666H76.3936505v390.0952384h390.0952384V554.66666666z m468.11428586 0H544.50793636v390.0952384h390.0952384V554.66666666zM466.4888889 86.55238079H76.3936505v390.0952384h390.0952384V86.55238079z m468.11428586 0H544.50793636v390.0952384h390.0952384V86.55238079z" fill="#515151" p-id="2633"></path></svg>',Tt='<?xml version="1.0" encoding="UTF-8"?><svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 18L24 30L12 18" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',At={},Lt=[],St=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function jt(t,e){for(var r in e)t[r]=e[r];return t}function Et(t){var e=t.parentNode;e&&e.removeChild(t)}function Mt(t,e,r){var n,i,s,o,l=arguments;if(e=jt({},e),arguments.length>3)for(r=[r],n=3;n<arguments.length;n++)r.push(l[n]);if(null!=r&&(e.children=r),null!=t&&null!=t.defaultProps)for(i in t.defaultProps)void 0===e[i]&&(e[i]=t.defaultProps[i]);return o=e.key,null!=(s=e.ref)&&delete e.ref,null!=o&&delete e.key,qt(t,e,o,s)}function qt(t,e,r,n){var i={type:t,props:e,key:r,ref:n,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return vt.vnode&&vt.vnode(i),i}function Ot(t){return t.children}function Bt(t,e){this.props=t,this.context=e}function Rt(t,e){if(null==e)return t.__p?Rt(t.__p,t.__p.__k.indexOf(t)+1):null;for(var r;e<t.__k.length;e++)if(null!=(r=t.__k[e])&&null!=r.__e)return r.__e;return"function"==typeof t.type?Rt(t):null}function It(t){var e,r;if(null!=(t=t.__p)&&null!=t.__c){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if(null!=(r=t.__k[e])&&null!=r.__e){t.__e=t.__c.base=r.__e;break}return It(t)}}function Pt(t){(!t.__d&&(t.__d=!0)&&1===yt.push(t)||kt!==vt.debounceRendering)&&(kt=vt.debounceRendering,(vt.debounceRendering||wt)(Dt))}function Dt(){var t,e,r,n,i,s,o,l;for(yt.sort((function(t,e){return e.__v.__b-t.__v.__b}));t=yt.pop();)t.__d&&(r=void 0,n=void 0,s=(i=(e=t).__v).__e,o=e.__P,l=e.u,e.u=!1,o&&(r=[],n=Wt(o,i,jt({},i),e.__n,void 0!==o.ownerSVGElement,null,r,l,null==s?Rt(i):s),$t(r,i),n!=s&&It(i)))}function zt(t,e,r,n,i,s,o,l,a){var c,u,h,d,p,f,g,b=r&&r.__k||Lt,m=b.length;if(l==At&&(l=null!=s?s[0]:m?Rt(r,0):null),c=0,e.__k=Ht(e.__k,(function(r){if(null!=r){if(r.__p=e,r.__b=e.__b+1,null===(h=b[c])||h&&r.key==h.key&&r.type===h.type)b[c]=void 0;else for(u=0;u<m;u++){if((h=b[u])&&r.key==h.key&&r.type===h.type){b[u]=void 0;break}h=null}if(d=Wt(t,r,h=h||At,n,i,s,o,null,l,a),(u=r.ref)&&h.ref!=u&&(g||(g=[])).push(u,r.__c||d,r),null!=d){if(null==f&&(f=d),null!=r.l)d=r.l,r.l=null;else if(s==h||d!=l||null==d.parentNode){t:if(null==l||l.parentNode!==t)t.appendChild(d);else{for(p=l,u=0;(p=p.nextSibling)&&u<m;u+=2)if(p==d)break t;t.insertBefore(d,l)}"option"==e.type&&(t.value="")}l=d.nextSibling,"function"==typeof e.type&&(e.l=d)}}return c++,r})),e.__e=f,null!=s&&"function"!=typeof e.type)for(c=s.length;c--;)null!=s[c]&&Et(s[c]);for(c=m;c--;)null!=b[c]&&Zt(b[c],b[c]);if(g)for(c=0;c<g.length;c++)Yt(g[c],g[++c],g[++c])}function Ht(t,e,r){if(null==r&&(r=[]),null==t||"boolean"==typeof t)e&&r.push(e(null));else if(Array.isArray(t))for(var n=0;n<t.length;n++)Ht(t[n],e,r);else r.push(e?e(function(t){if(null==t||"boolean"==typeof t)return null;if("string"==typeof t||"number"==typeof t)return qt(null,t,null,null);if(null!=t.__e||null!=t.__c){var e=qt(t.type,t.props,t.key,null);return e.__e=t.__e,e}return t}(t)):t);return r}function Ft(t,e,r){"-"===e[0]?t.setProperty(e,r):t[e]="number"==typeof r&&!1===St.test(e)?r+"px":null==r?"":r}function Ut(t,e,r,n,i){var s,o,l,a,c;if("key"===(e=i?"className"===e?"class":e:"class"===e?"className":e)||"children"===e);else if("style"===e)if(s=t.style,"string"==typeof r)s.cssText=r;else{if("string"==typeof n&&(s.cssText="",n=null),n)for(o in n)r&&o in r||Ft(s,o,"");if(r)for(l in r)n&&r[l]===n[l]||Ft(s,l,r[l])}else"o"===e[0]&&"n"===e[1]?(a=e!==(e=e.replace(/Capture$/,"")),c=e.toLowerCase(),e=(c in t?c:e).slice(2),r?(n||t.addEventListener(e,Vt,a),(t.t||(t.t={}))[e]=r):t.removeEventListener(e,Vt,a)):"list"!==e&&"tagName"!==e&&"form"!==e&&!i&&e in t?t[e]=null==r?"":r:"function"!=typeof r&&"dangerouslySetInnerHTML"!==e&&(e!==(e=e.replace(/^xlink:?/,""))?null==r||!1===r?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),r):null==r||!1===r?t.removeAttribute(e):t.setAttribute(e,r))}function Vt(t){return this.t[t.type](vt.event?vt.event(t):t)}function Wt(t,e,r,n,i,s,o,l,a,c){var u,h,d,p,f,g,b,m,v,y,w=e.type;if(void 0!==e.constructor)return null;(u=vt.__b)&&u(e);try{t:if("function"==typeof w){if(m=e.props,v=(u=w.contextType)&&n[u.__c],y=u?v?v.props.value:u.__p:n,r.__c?b=(h=e.__c=r.__c).__p=h.__E:("prototype"in w&&w.prototype.render?e.__c=h=new w(m,y):(e.__c=h=new Bt(m,y),h.constructor=w,h.render=Kt),v&&v.sub(h),h.props=m,h.state||(h.state={}),h.context=y,h.__n=n,d=h.__d=!0,h.__h=[]),null==h.__s&&(h.__s=h.state),null!=w.getDerivedStateFromProps&&jt(h.__s==h.state?h.__s=jt({},h.__s):h.__s,w.getDerivedStateFromProps(m,h.__s)),d)null==w.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&o.push(h);else{if(null==w.getDerivedStateFromProps&&null==l&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(m,y),!l&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(m,h.__s,y)){for(h.props=m,h.state=h.__s,h.__d=!1,h.__v=e,e.__e=null!=a?a!==r.__e?a:r.__e:null,e.__k=r.__k,u=0;u<e.__k.length;u++)e.__k[u]&&(e.__k[u].__p=e);break t}null!=h.componentWillUpdate&&h.componentWillUpdate(m,h.__s,y)}for(p=h.props,f=h.state,h.context=y,h.props=m,h.state=h.__s,(u=vt.__r)&&u(e),h.__d=!1,h.__v=e,h.__P=t,u=h.render(h.props,h.state,h.context),e.__k=Ht(null!=u&&u.type==Ot&&null==u.key?u.props.children:u),null!=h.getChildContext&&(n=jt(jt({},n),h.getChildContext())),d||null==h.getSnapshotBeforeUpdate||(g=h.getSnapshotBeforeUpdate(p,f)),zt(t,e,r,n,i,s,o,a,c),h.base=e.__e;u=h.__h.pop();)h.__s&&(h.state=h.__s),u.call(h);d||null==p||null==h.componentDidUpdate||h.componentDidUpdate(p,f,g),b&&(h.__E=h.__p=null)}else e.__e=Gt(r.__e,e,r,n,i,s,o,c);(u=vt.diffed)&&u(e)}catch(t){vt.__e(t,e,r)}return e.__e}function $t(t,e){for(var r;r=t.pop();)try{r.componentDidMount()}catch(t){vt.__e(t,r.__v)}vt.__c&&vt.__c(e)}function Gt(t,e,r,n,i,s,o,l){var a,c,u,h,d=r.props,p=e.props;if(i="svg"===e.type||i,null==t&&null!=s)for(a=0;a<s.length;a++)if(null!=(c=s[a])&&(null===e.type?3===c.nodeType:c.localName===e.type)){t=c,s[a]=null;break}if(null==t){if(null===e.type)return document.createTextNode(p);t=i?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),s=null}return null===e.type?d!==p&&(null!=s&&(s[s.indexOf(t)]=null),t.data=p):e!==r&&(null!=s&&(s=Lt.slice.call(t.childNodes)),u=(d=r.props||At).dangerouslySetInnerHTML,h=p.dangerouslySetInnerHTML,l||(h||u)&&(h&&u&&h.__html==u.__html||(t.innerHTML=h&&h.__html||"")),function(t,e,r,n,i){var s;for(s in r)s in e||Ut(t,s,null,r[s],n);for(s in e)i&&"function"!=typeof e[s]||"value"===s||"checked"===s||r[s]===e[s]||Ut(t,s,e[s],r[s],n)}(t,p,d,i,l),e.__k=e.props.children,h||zt(t,e,r,n,"foreignObject"!==e.type&&i,s,o,At,l),l||("value"in p&&void 0!==p.value&&p.value!==t.value&&(t.value=null==p.value?"":p.value),"checked"in p&&void 0!==p.checked&&p.checked!==t.checked&&(t.checked=p.checked))),t}function Yt(t,e,r){try{"function"==typeof t?t(e):t.current=e}catch(t){vt.__e(t,r)}}function Zt(t,e,r){var n,i,s;if(vt.unmount&&vt.unmount(t),(n=t.ref)&&Yt(n,null,e),r||"function"==typeof t.type||(r=null!=(i=t.__e)),t.__e=t.l=null,null!=(n=t.__c)){if(n.componentWillUnmount)try{n.componentWillUnmount()}catch(t){vt.__e(t,e)}n.base=n.__P=null}if(n=t.__k)for(s=0;s<n.length;s++)n[s]&&Zt(n[s],e,r);null!=i&&Et(i)}function Kt(t,e,r){return this.constructor(t,r)}function Xt(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function Jt(){return Jt=Object.assign||function(t){for(var e=arguments,r=1;r<arguments.length;r++){var n=e[r];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},Jt.apply(this,arguments)}vt={},Bt.prototype.setState=function(t,e){var r=this.__s!==this.state&&this.__s||(this.__s=jt({},this.state));("function"!=typeof t||(t=t(r,this.props)))&&jt(r,t),null!=t&&this.__v&&(this.u=!1,e&&this.__h.push(e),Pt(this))},Bt.prototype.forceUpdate=function(t){this.__v&&(t&&this.__h.push(t),this.u=!0,Pt(this))},Bt.prototype.render=Ot,yt=[],wt="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,kt=vt.debounceRendering,vt.__e=function(t,e,r){for(var n;e=e.__p;)if((n=e.__c)&&!n.__p)try{if(n.constructor&&null!=n.constructor.getDerivedStateFromError)n.setState(n.constructor.getDerivedStateFromError(t));else{if(null==n.componentDidCatch)continue;n.componentDidCatch(t)}return Pt(n.__E=n)}catch(e){t=e}throw t},xt=At;var Qt="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",te="[\\s|\\(]+("+Qt+")[,|\\s]+("+Qt+")[,|\\s]+("+Qt+")\\s*\\)?",ee="[\\s|\\(]+("+Qt+")[,|\\s]+("+Qt+")[,|\\s]+("+Qt+")[,|\\s]+("+Qt+")\\s*\\)?",re=new RegExp("rgb"+te),ne=new RegExp("rgba"+ee),ie=new RegExp("hsl"+te),se=new RegExp("hsla"+ee),oe="^(?:#?|0x?)",le="([0-9a-fA-F]{1})",ae="([0-9a-fA-F]{2})",ce=new RegExp(oe+le+le+le+"$"),ue=new RegExp(oe+le+le+le+le+"$"),he=new RegExp(oe+ae+ae+ae+"$"),de=new RegExp(oe+ae+ae+ae+ae+"$"),pe=Math.log,fe=Math.round,ge=Math.floor;function be(t,e,r){return Math.min(Math.max(t,e),r)}function me(t,e){var r=t.indexOf("%")>-1,n=parseFloat(t);return r?e/100*n:n}function ve(t){return parseInt(t,16)}function ye(t){return t.toString(16).padStart(2,"0")}var we=function(){function t(t,e){this.$={h:0,s:0,v:0,a:1},t&&this.set(t),this.onChange=e,this.initialValue=Jt({},this.$)}var e,r,n=t.prototype;return n.set=function(e){if("string"==typeof e)/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(e)?this.hexString=e:/^rgba?/.test(e)?this.rgbString=e:/^hsla?/.test(e)&&(this.hslString=e);else{if("object"!=typeof e)throw new Error("Invalid color value");e instanceof t?this.hsva=e.hsva:"r"in e&&"g"in e&&"b"in e?this.rgb=e:"h"in e&&"s"in e&&"v"in e?this.hsv=e:"h"in e&&"s"in e&&"l"in e?this.hsl=e:"kelvin"in e&&(this.kelvin=e.kelvin)}},n.setChannel=function(t,e,r){var n;this[t]=Jt({},this[t],((n={})[e]=r,n))},n.reset=function(){this.hsva=this.initialValue},n.clone=function(){return new t(this)},n.unbind=function(){this.onChange=void 0},t.hsvToRgb=function(t){var e=t.h/60,r=t.s/100,n=t.v/100,i=ge(e),s=e-i,o=n*(1-r),l=n*(1-s*r),a=n*(1-(1-s)*r),c=i%6,u=[a,n,n,l,o,o][c],h=[o,o,a,n,n,l][c];return{r:be(255*[n,l,o,o,a,n][c],0,255),g:be(255*u,0,255),b:be(255*h,0,255)}},t.rgbToHsv=function(t){var e=t.r/255,r=t.g/255,n=t.b/255,i=Math.max(e,r,n),s=Math.min(e,r,n),o=i-s,l=0,a=i,c=0===i?0:o/i;switch(i){case s:l=0;break;case e:l=(r-n)/o+(r<n?6:0);break;case r:l=(n-e)/o+2;break;case n:l=(e-r)/o+4}return{h:60*l%360,s:be(100*c,0,100),v:be(100*a,0,100)}},t.hsvToHsl=function(t){var e=t.s/100,r=t.v/100,n=(2-e)*r,i=n<=1?n:2-n,s=i<1e-9?0:e*r/i;return{h:t.h,s:be(100*s,0,100),l:be(50*n,0,100)}},t.hslToHsv=function(t){var e=2*t.l,r=t.s*(e<=100?e:200-e)/100,n=e+r<1e-9?0:2*r/(e+r);return{h:t.h,s:be(100*n,0,100),v:be((e+r)/2,0,100)}},t.kelvinToRgb=function(t){var e,r,n,i=t/100;return i<66?(e=255,r=-155.25485562709179-.44596950469579133*(r=i-2)+104.49216199393888*pe(r),n=i<20?0:.8274096064007395*(n=i-10)-254.76935184120902+115.67994401066147*pe(n)):(e=351.97690566805693+.114206453784165*(e=i-55)-40.25366309332127*pe(e),r=325.4494125711974+.07943456536662342*(r=i-50)-28.0852963507957*pe(r),n=255),{r:be(ge(e),0,255),g:be(ge(r),0,255),b:be(ge(n),0,255)}},t.rgbToKelvin=function(e){for(var r,n=e.r,i=e.b,s=2e3,o=4e4;o-s>.4;){r=.5*(o+s);var l=t.kelvinToRgb(r);l.b/l.r>=i/n?o=r:s=r}return r},e=t,r=[{key:"hsv",get:function(){var t=this.$;return{h:t.h,s:t.s,v:t.v}},set:function(t){var e=this.$;if(t=Jt({},e,t),this.onChange){var r={h:!1,v:!1,s:!1,a:!1};for(var n in e)r[n]=t[n]!=e[n];this.$=t,(r.h||r.s||r.v||r.a)&&this.onChange(this,r)}else this.$=t}},{key:"hsva",get:function(){return Jt({},this.$)},set:function(t){this.hsv=t}},{key:"hue",get:function(){return this.$.h},set:function(t){this.hsv={h:t}}},{key:"saturation",get:function(){return this.$.s},set:function(t){this.hsv={s:t}}},{key:"value",get:function(){return this.$.v},set:function(t){this.hsv={v:t}}},{key:"alpha",get:function(){return this.$.a},set:function(t){this.hsv=Jt({},this.hsv,{a:t})}},{key:"kelvin",get:function(){return t.rgbToKelvin(this.rgb)},set:function(e){this.rgb=t.kelvinToRgb(e)}},{key:"red",get:function(){return this.rgb.r},set:function(t){this.rgb=Jt({},this.rgb,{r:t})}},{key:"green",get:function(){return this.rgb.g},set:function(t){this.rgb=Jt({},this.rgb,{g:t})}},{key:"blue",get:function(){return this.rgb.b},set:function(t){this.rgb=Jt({},this.rgb,{b:t})}},{key:"rgb",get:function(){var e=t.hsvToRgb(this.$),r=e.r,n=e.g,i=e.b;return{r:fe(r),g:fe(n),b:fe(i)}},set:function(e){this.hsv=Jt({},t.rgbToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"rgba",get:function(){return Jt({},this.rgb,{a:this.alpha})},set:function(t){this.rgb=t}},{key:"hsl",get:function(){var e=t.hsvToHsl(this.$),r=e.h,n=e.s,i=e.l;return{h:fe(r),s:fe(n),l:fe(i)}},set:function(e){this.hsv=Jt({},t.hslToHsv(e),{a:void 0===e.a?1:e.a})}},{key:"hsla",get:function(){return Jt({},this.hsl,{a:this.alpha})},set:function(t){this.hsl=t}},{key:"rgbString",get:function(){var t=this.rgb;return"rgb("+t.r+", "+t.g+", "+t.b+")"},set:function(t){var e,r,n,i,s=1;if((e=re.exec(t))?(r=me(e[1],255),n=me(e[2],255),i=me(e[3],255)):(e=ne.exec(t))&&(r=me(e[1],255),n=me(e[2],255),i=me(e[3],255),s=me(e[4],1)),!e)throw new Error("Invalid rgb string");this.rgb={r:r,g:n,b:i,a:s}}},{key:"rgbaString",get:function(){var t=this.rgba;return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},set:function(t){this.rgbString=t}},{key:"hexString",get:function(){var t=this.rgb;return"#"+ye(t.r)+ye(t.g)+ye(t.b)},set:function(t){var e,r,n,i,s=255;if((e=ce.exec(t))?(r=17*ve(e[1]),n=17*ve(e[2]),i=17*ve(e[3])):(e=ue.exec(t))?(r=17*ve(e[1]),n=17*ve(e[2]),i=17*ve(e[3]),s=17*ve(e[4])):(e=he.exec(t))?(r=ve(e[1]),n=ve(e[2]),i=ve(e[3])):(e=de.exec(t))&&(r=ve(e[1]),n=ve(e[2]),i=ve(e[3]),s=ve(e[4])),!e)throw new Error("Invalid hex string");this.rgb={r:r,g:n,b:i,a:s/255}}},{key:"hex8String",get:function(){var t=this.rgba;return"#"+ye(t.r)+ye(t.g)+ye(t.b)+ye(ge(255*t.a))},set:function(t){this.hexString=t}},{key:"hslString",get:function(){var t=this.hsl;return"hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},set:function(t){var e,r,n,i,s=1;if((e=ie.exec(t))?(r=me(e[1],360),n=me(e[2],100),i=me(e[3],100)):(e=se.exec(t))&&(r=me(e[1],360),n=me(e[2],100),i=me(e[3],100),s=me(e[4],1)),!e)throw new Error("Invalid hsl string");this.hsl={h:r,s:n,l:i,a:s}}},{key:"hslaString",get:function(){var t=this.hsla;return"hsla("+t.h+", "+t.s+"%, "+t.l+"%, "+t.a+")"},set:function(t){this.hslString=t}}],r&&Xt(e.prototype,r),t}();function ke(t){var e,r=t.width,n=t.sliderSize,i=t.borderWidth,s=t.handleRadius,o=t.padding,l=t.sliderShape,a="horizontal"===t.layoutDirection;return n=null!=(e=n)?e:2*o+2*s,"circle"===l?{handleStart:t.padding+t.handleRadius,handleRange:r-2*o-2*s,width:r,height:r,cx:r/2,cy:r/2,radius:r/2-i/2}:{handleStart:n/2,handleRange:r-n,radius:n/2,x:0,y:0,width:a?n:r,height:a?r:n}}var xe,_e=2*Math.PI,Ce=function(t,e){return(t%e+e)%e},Ne=function(t,e){return Math.sqrt(t*t+e*e)};function Te(t){return t.width/2-t.padding-t.handleRadius-t.borderWidth}function Ae(t){var e=t.width/2;return{width:t.width,radius:e-t.borderWidth,cx:e,cy:e}}function Le(t,e,r){var n=t.wheelAngle,i=t.wheelDirection;return r&&"clockwise"===i?e=n+e:"clockwise"===i?e=360-n+e:r&&"anticlockwise"===i?e=n+180-e:"anticlockwise"===i&&(e=n-e),Ce(e,360)}function Se(t,e,r){var n=Ae(t),i=n.cx,s=n.cy,o=Te(t);e=i-e,r=s-r;var l=Le(t,Math.atan2(-r,-e)*(360/_e)),a=Math.min(Ne(e,r),o);return{h:Math.round(l),s:Math.round(100/o*a)}}function je(t){var e=t.width,r=t.boxHeight;return{width:e,height:null!=r?r:e,radius:t.padding+t.handleRadius}}function Ee(t,e,r){var n=je(t),i=n.width,s=n.height,o=n.radius,l=(e-o)/(i-2*o)*100,a=(r-o)/(s-2*o)*100;return{s:Math.max(0,Math.min(l,100)),v:Math.max(0,Math.min(100-a,100))}}function Me(t){xe||(xe=document.getElementsByTagName("base"));var e=window.navigator.userAgent,r=/^((?!chrome|android).)*safari/i.test(e),n=/iPhone|iPod|iPad/i.test(e),i=window.location;return(r||n)&&xe.length>0?i.protocol+"//"+i.host+i.pathname+i.search+t:t}function qe(t,e,r,n){for(var i=0;i<n.length;i++){var s=n[i].x-e,o=n[i].y-r;if(Math.sqrt(s*s+o*o)<t.handleRadius)return i}return null}function Oe(t){return{boxSizing:"border-box",border:t.borderWidth+"px solid "+t.borderColor}}function Be(t,e,r){return t+"-gradient("+e+", "+r.map((function(t){var e=t[0];return t[1]+" "+e+"%"})).join(",")+")"}function Re(t){return"string"==typeof t?t:t+"px"}var Ie=["mousemove","touchmove","mouseup","touchend"],Pe=function(t){function e(e){t.call(this,e),this.uid=(Math.random()+1).toString(36).substring(5)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.render=function(t){var e=this.handleEvent.bind(this),r={onMouseDown:e,ontouchstart:e},n="horizontal"===t.layoutDirection,i=null===t.margin?t.sliderMargin:t.margin,s={overflow:"visible",display:n?"inline-block":"block"};return t.index>0&&(s[n?"marginLeft":"marginTop"]=i),Mt(Ot,null,t.children(this.uid,r,s))},e.prototype.handleEvent=function(t){var e=this,r=this.props.onInput,n=this.base.getBoundingClientRect();t.preventDefault();var i=t.touches?t.changedTouches[0]:t,s=i.clientX-n.left,o=i.clientY-n.top;switch(t.type){case"mousedown":case"touchstart":!1!==r(s,o,0)&&Ie.forEach((function(t){document.addEventListener(t,e,{passive:!1})}));break;case"mousemove":case"touchmove":r(s,o,1);break;case"mouseup":case"touchend":r(s,o,2),Ie.forEach((function(t){document.removeEventListener(t,e,{passive:!1})}))}},e}(Bt);function De(t){var e=t.r,r=t.url,n=e,i=e;return Mt("svg",{className:"IroHandle IroHandle--"+t.index+" "+(t.isActive?"IroHandle--isActive":""),style:{"-webkit-tap-highlight-color":"rgba(0, 0, 0, 0);",transform:"translate("+Re(t.x)+", "+Re(t.y)+")",willChange:"transform",top:Re(-e),left:Re(-e),width:Re(2*e),height:Re(2*e),position:"absolute",overflow:"visible"}},r&&Mt("use",Object.assign({xlinkHref:Me(r)},t.props)),!r&&Mt("circle",{cx:n,cy:i,r:e,fill:"none","stroke-width":2,stroke:"#000"}),!r&&Mt("circle",{cx:n,cy:i,r:e-2,fill:t.fill,"stroke-width":2,stroke:"#fff"}))}function ze(t){var e=t.activeIndex,r=void 0!==e&&e<t.colors.length?t.colors[e]:t.color,n=ke(t),i=n.width,s=n.height,o=n.radius,l=function(t,e){var r=ke(t),n=r.width,i=r.height,s=r.handleRange,o=r.handleStart,l="horizontal"===t.layoutDirection,a=function(t,e){var r=e.hsva,n=e.rgb;switch(t.sliderType){case"red":return n.r/2.55;case"green":return n.g/2.55;case"blue":return n.b/2.55;case"alpha":return 100*r.a;case"kelvin":var i=t.minTemperature,s=t.maxTemperature-i,o=(e.kelvin-i)/s*100;return Math.max(0,Math.min(o,100));case"hue":return r.h/=3.6;case"saturation":return r.s;default:return r.v}}(t,e),c=l?n/2:i/2,u=o+a/100*s;return l&&(u=-1*u+s+2*o),{x:l?c:u,y:l?u:c}}(t,r),a=function(t,e){var r=e.hsv,n=e.rgb;switch(t.sliderType){case"red":return[[0,"rgb(0,"+n.g+","+n.b+")"],[100,"rgb(255,"+n.g+","+n.b+")"]];case"green":return[[0,"rgb("+n.r+",0,"+n.b+")"],[100,"rgb("+n.r+",255,"+n.b+")"]];case"blue":return[[0,"rgb("+n.r+","+n.g+",0)"],[100,"rgb("+n.r+","+n.g+",255)"]];case"alpha":return[[0,"rgba("+n.r+","+n.g+","+n.b+",0)"],[100,"rgb("+n.r+","+n.g+","+n.b+")"]];case"kelvin":for(var i=[],s=t.minTemperature,o=t.maxTemperature,l=o-s,a=s,c=0;a<o;a+=l/8,c+=1){var u=we.kelvinToRgb(a),h=u.r,d=u.g,p=u.b;i.push([12.5*c,"rgb("+h+","+d+","+p+")"])}return i;case"hue":return[[0,"#f00"],[16.666,"#ff0"],[33.333,"#0f0"],[50,"#0ff"],[66.666,"#00f"],[83.333,"#f0f"],[100,"#f00"]];case"saturation":var f=we.hsvToHsl({h:r.h,s:0,v:r.v}),g=we.hsvToHsl({h:r.h,s:100,v:r.v});return[[0,"hsl("+f.h+","+f.s+"%,"+f.l+"%)"],[100,"hsl("+g.h+","+g.s+"%,"+g.l+"%)"]];default:var b=we.hsvToHsl({h:r.h,s:r.s,v:100});return[[0,"#000"],[100,"hsl("+b.h+","+b.s+"%,"+b.l+"%)"]]}}(t,r);return Mt(Pe,Object.assign({},t,{onInput:function(e,n,i){var s=function(t,e,r){var n,i=ke(t),s=i.handleRange,o=i.handleStart;n="horizontal"===t.layoutDirection?-1*r+s+o:e-o,n=Math.max(Math.min(n,s),0);var l=Math.round(100/s*n);switch(t.sliderType){case"kelvin":var a=t.minTemperature;return a+(t.maxTemperature-a)*(l/100);case"alpha":return l/100;case"hue":return 3.6*l;case"red":case"blue":case"green":return 2.55*l;default:return l}}(t,e,n);t.parent.inputActive=!0,r[t.sliderType]=s,t.onInput(i,t.id)}}),(function(e,n,c){return Mt("div",Object.assign({},n,{className:"IroSlider",style:Object.assign({},{position:"relative",width:Re(i),height:Re(s),borderRadius:Re(o),background:"conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",backgroundSize:"8px 8px"},c)}),Mt("div",{className:"IroSliderGradient",style:Object.assign({},{position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:Re(o),background:Be("linear","horizontal"===t.layoutDirection?"to top":"to right",a)},Oe(t))}),Mt(De,{isActive:!0,index:r.index,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:l.x,y:l.y}))}))}function He(t){var e=je(t),r=e.width,n=e.height,i=e.radius,s=t.colors,o=t.parent,l=t.activeIndex,a=void 0!==l&&l<t.colors.length?t.colors[l]:t.color,c=[[[0,"#fff"],[100,"hsl("+a.hue+",100%,50%)"]],[[0,"rgba(0,0,0,0)"],[100,"#000"]]],u=s.map((function(e){return function(t,e){var r=je(t),n=r.width,i=r.height,s=r.radius,o=e.hsv,l=s,a=n-2*s,c=i-2*s;return{x:l+o.s/100*a,y:l+(c-o.v/100*c)}}(t,e)}));return Mt(Pe,Object.assign({},t,{onInput:function(e,r,n){if(0===n){var i=qe(t,e,r,u);null!==i?o.setActiveColor(i):(o.inputActive=!0,a.hsv=Ee(t,e,r),t.onInput(n,t.id))}else 1===n&&(o.inputActive=!0,a.hsv=Ee(t,e,r));t.onInput(n,t.id)}}),(function(e,o,l){return Mt("div",Object.assign({},o,{className:"IroBox",style:Object.assign({},{width:Re(r),height:Re(n),position:"relative"},l)}),Mt("div",{className:"IroBox",style:Object.assign({},{width:"100%",height:"100%",borderRadius:Re(i)},Oe(t),{background:Be("linear","to bottom",c[1])+","+Be("linear","to right",c[0])})}),s.filter((function(t){return t!==a})).map((function(e){return Mt(De,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:u[e.index].x,y:u[e.index].y})})),Mt(De,{isActive:!0,index:a.index,fill:a.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:u[a.index].x,y:u[a.index].y}))}))}function Fe(t){var e=Ae(t).width,r=t.colors,n=(t.borderWidth,t.parent),i=t.color,s=i.hsv,o=r.map((function(e){return function(t,e){var r=e.hsv,n=Ae(t),i=n.cx,s=n.cy,o=Te(t),l=(180+Le(t,r.h,!0))*(_e/360),a=r.s/100*o,c="clockwise"===t.wheelDirection?-1:1;return{x:i+a*Math.cos(l)*c,y:s+a*Math.sin(l)*c}}(t,e)})),l={position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"50%",boxSizing:"border-box"};return Mt(Pe,Object.assign({},t,{onInput:function(e,r,s){if(0===s){if(!function(t,e,r){var n=Ae(t),i=n.cx,s=n.cy,o=t.width/2;return Ne(i-e,s-r)<o}(t,e,r))return!1;var l=qe(t,e,r,o);null!==l?n.setActiveColor(l):(n.inputActive=!0,i.hsv=Se(t,e,r),t.onInput(s,t.id))}else 1===s&&(n.inputActive=!0,i.hsv=Se(t,e,r));t.onInput(s,t.id)}}),(function(n,a,c){return Mt("div",Object.assign({},a,{className:"IroWheel",style:Object.assign({},{width:Re(e),height:Re(e),position:"relative"},c)}),Mt("div",{className:"IroWheelHue",style:Object.assign({},l,{transform:"rotateZ("+(t.wheelAngle+90)+"deg)",background:"clockwise"===t.wheelDirection?"conic-gradient(red, yellow, lime, aqua, blue, magenta, red)":"conic-gradient(red, magenta, blue, aqua, lime, yellow, red)"})}),Mt("div",{className:"IroWheelSaturation",style:Object.assign({},l,{background:"radial-gradient(circle closest-side, #fff, transparent)"})}),t.wheelLightness&&Mt("div",{className:"IroWheelLightness",style:Object.assign({},l,{background:"#000",opacity:1-s.v/100})}),Mt("div",{className:"IroWheelBorder",style:Object.assign({},l,Oe(t))}),r.filter((function(t){return t!==i})).map((function(e){return Mt(De,{isActive:!1,index:e.index,fill:e.hslString,r:t.handleRadius,url:t.handleSvg,props:t.handleProps,x:o[e.index].x,y:o[e.index].y})})),Mt(De,{isActive:!0,index:i.index,fill:i.hslString,r:t.activeHandleRadius||t.handleRadius,url:t.handleSvg,props:t.handleProps,x:o[i.index].x,y:o[i.index].y}))}))}De.defaultProps={fill:"none",x:0,y:0,r:8,url:null,props:{x:0,y:0}},ze.defaultProps=Object.assign({},{sliderShape:"bar",sliderType:"value",minTemperature:2200,maxTemperature:11e3});var Ue=function(t){function e(e){var r=this;t.call(this,e),this.colors=[],this.inputActive=!1,this.events={},this.activeEvents={},this.deferredEvents={},this.id=e.id,(e.colors.length>0?e.colors:[e.color]).forEach((function(t){return r.addColor(t)})),this.setActiveColor(0),this.state=Object.assign({},e,{color:this.color,colors:this.colors,layout:e.layout})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.addColor=function(t,e){void 0===e&&(e=this.colors.length);var r=new we(t,this.onColorChange.bind(this));this.colors.splice(e,0,r),this.colors.forEach((function(t,e){return t.index=e})),this.state&&this.setState({colors:this.colors}),this.deferredEmit("color:init",r)},e.prototype.removeColor=function(t){var e=this.colors.splice(t,1)[0];e.unbind(),this.colors.forEach((function(t,e){return t.index=e})),this.state&&this.setState({colors:this.colors}),e.index===this.color.index&&this.setActiveColor(0),this.emit("color:remove",e)},e.prototype.setActiveColor=function(t){this.color=this.colors[t],this.state&&this.setState({color:this.color}),this.emit("color:setActive",this.color)},e.prototype.setColors=function(t,e){var r=this;void 0===e&&(e=0),this.colors.forEach((function(t){return t.unbind()})),this.colors=[],t.forEach((function(t){return r.addColor(t)})),this.setActiveColor(e),this.emit("color:setAll",this.colors)},e.prototype.on=function(t,e){var r=this,n=this.events;(Array.isArray(t)?t:[t]).forEach((function(t){(n[t]||(n[t]=[])).push(e),r.deferredEvents[t]&&(r.deferredEvents[t].forEach((function(t){e.apply(null,t)})),r.deferredEvents[t]=[])}))},e.prototype.off=function(t,e){var r=this;(Array.isArray(t)?t:[t]).forEach((function(t){var n=r.events[t];n&&n.splice(n.indexOf(e),1)}))},e.prototype.emit=function(t){for(var e=this,r=[],n=arguments.length-1;n-- >0;)r[n]=arguments[n+1];var i=this.activeEvents;i.hasOwnProperty(t)&&i[t]||(i[t]=!0,(this.events[t]||[]).forEach((function(t){return t.apply(e,r)})),i[t]=!1)},e.prototype.deferredEmit=function(t){for(var e,r=[],n=arguments.length-1;n-- >0;)r[n]=arguments[n+1];var i=this.deferredEvents;(e=this).emit.apply(e,[t].concat(r)),(i[t]||(i[t]=[])).push(r)},e.prototype.setOptions=function(t){this.setState(t)},e.prototype.resize=function(t){this.setOptions({width:t})},e.prototype.reset=function(){this.colors.forEach((function(t){return t.reset()})),this.setState({colors:this.colors})},e.prototype.onMount=function(t){this.el=t,this.deferredEmit("mount",this)},e.prototype.onColorChange=function(t,e){this.setState({color:this.color}),this.inputActive&&(this.inputActive=!1,this.emit("input:change",t,e)),this.emit("color:change",t,e)},e.prototype.emitInputEvent=function(t,e){0===t?this.emit("input:start",this.color,e):1===t?this.emit("input:move",this.color,e):2===t&&this.emit("input:end",this.color,e)},e.prototype.render=function(t,e){var r=this,n=e.layout;return Array.isArray(n)||(n=[{component:Fe},{component:ze}],e.transparency&&n.push({component:ze,options:{sliderType:"alpha"}})),Mt("div",{class:"IroColorPicker",id:e.id,style:{display:e.display}},n.map((function(t,n){var i=t.component,s=t.options;return Mt(i,Object.assign({},e,s,{ref:void 0,onInput:r.emitInputEvent.bind(r),parent:r,index:n}))})))},e}(Bt);Ue.defaultProps=Object.assign({},{width:300,height:300,color:"#fff",colors:[],padding:6,layoutDirection:"vertical",borderColor:"#fff",borderWidth:0,handleRadius:8,activeHandleRadius:null,handleSvg:null,handleProps:{x:0,y:0},wheelLightness:!0,wheelAngle:0,wheelDirection:"anticlockwise",sliderSize:null,sliderMargin:12,boxHeight:null},{colors:[],display:"block",id:null,layout:"default",margin:null});var Ve,We,$e,Ge=(We=function(t,e){var r,n=document.createElement("div");function i(){var e=t instanceof Element?t:document.querySelector(t);e.appendChild(r.base),r.onMount(e)}return function(t,e,r){var n,i,s;vt.__p&&vt.__p(t,e),i=(n=r===xt)?null:e.__k,t=Mt(Ot,null,[t]),s=[],Wt(e,e.__k=t,i||At,At,void 0!==e.ownerSVGElement,i?null:Lt.slice.call(e.childNodes),s,!1,At,n),$t(s,t)}(Mt(Ve,Object.assign({},{ref:function(t){return r=t}},e)),n),"loading"!==document.readyState?i():document.addEventListener("DOMContentLoaded",i),r},We.prototype=(Ve=Ue).prototype,Object.assign(We,Ve),We.__component=Ve,We);!function(t){var e;t.version="5.5.2",t.Color=we,t.ColorPicker=Ge,(e=t.ui||(t.ui={})).h=Mt,e.ComponentBase=Pe,e.Handle=De,e.Slider=ze,e.Wheel=Fe,e.Box=He}($e||($e={}));var Ye=$e;const Ze=[{icon:'<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43 11L16.875 37L5 25.1818" stroke="#008a00" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',label:"save"},{icon:'<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 8L40 40" stroke="#db3700" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40L40 8" stroke="#db3700" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',label:"cancel"}],Ke=[{value:"#000000",describe:"black"},{value:"#4d4d4d",describe:"dimGrey"},{value:"#808080",describe:"grey"},{value:"#e6e6e6",describe:"lightGrey"},{value:"#ffffff",describe:"white"},{value:"#ff0000",describe:"red"},{value:"#ffa500",describe:"orange"},{value:"#ffff00",describe:"yellow"},{value:"#99e64d",describe:"lightGreen"},{value:"#008000",describe:"green"},{value:"#7fffd4",describe:"aquamarine"},{value:"#40e0d0",describe:"turquoise"},{value:"#4d99e6",describe:"lightBlue"},{value:"#0000ff",describe:"blue"},{value:"#800080",describe:"purple"}];var Xe,Je=class{constructor(t,e){this.tableMenus=t,this.options=e,this.attrs=Object.assign({},e.attribute),this.borderForm=[],this.saveButton=null,this.form=this.createPropertiesForm(e)}checkBtnsAction(t){"save"===t&&this.saveAction(this.options.type),this.removePropertiesForm(),this.tableMenus.showMenus(),this.tableMenus.updateMenus()}createActionBtns(t,e){const r=this.getUseLanguage(),n=document.createElement("div"),i=document.createDocumentFragment();n.classList.add("properties-form-action-row");for(const{icon:t,label:n}of Ze){const s=document.createElement("button"),o=document.createElement("span");if(o.innerHTML=t,s.appendChild(o),R(s,{label:n}),e){const t=document.createElement("span");t.innerText=r(n),s.appendChild(t)}i.appendChild(s)}return n.addEventListener("click",(e=>t(e))),n.appendChild(i),n}createCheckBtns(t){const{menus:e,propertyName:r}=t,n=document.createElement("div"),i=document.createDocumentFragment();for(const{icon:t,describe:n,align:s}of e){const e=document.createElement("span");e.innerHTML=t,e.setAttribute("data-align",s),e.classList.add("ql-table-tooltip-hover"),this.options.attribute[r]===s&&e.classList.add("ql-table-btns-checked");const o=x(n);e.appendChild(o),i.appendChild(e)}return n.classList.add("ql-table-check-container"),n.appendChild(i),n.addEventListener("click",(t=>{const e=t.target.closest("span.ql-table-tooltip-hover"),i=e.getAttribute("data-align");this.switchButton(n,e),this.setAttribute(r,i)})),n}createColorContainer(t){const e=document.createElement("div");e.classList.add("ql-table-color-container");const r=this.createColorInput(t),n=this.createColorPicker(t);return e.appendChild(r),e.appendChild(n),e}createColorInput(t){const e=this.createInput(t);return e.classList.add("label-field-view-color"),e}createColorList(t){const e=this.getUseLanguage(),r=document.createElement("ul"),n=document.createDocumentFragment();r.classList.add("color-list");for(const{value:t,describe:r}of Ke){const i=document.createElement("li"),s=x(e(r));i.setAttribute("data-color",t),i.classList.add("ql-table-tooltip-hover"),I(i,{"background-color":t}),i.appendChild(s),n.appendChild(i)}return r.appendChild(n),r.addEventListener("click",(e=>{const n=e.target,i=("DIV"===n.tagName?n.parentElement:n).getAttribute("data-color");this.setAttribute(t,i,r),this.updateInputStatus(r,!1,!0)})),r}createColorPicker(t){const{propertyName:e,value:r}=t,n=document.createElement("span"),i=document.createElement("span");n.classList.add("color-picker"),i.classList.add("color-button"),r?I(i,{"background-color":r}):i.classList.add("color-unselected");const s=this.createColorPickerSelect(e);return i.addEventListener("click",(()=>{this.toggleHidden(s);const t=this.getColorClosest(n),e=null==t?void 0:t.querySelector(".property-input");this.updateSelectedStatus(s,null==e?void 0:e.value,"color")})),n.appendChild(i),n.appendChild(s),n}createColorPickerIcon(t,e,r){const n=document.createElement("div"),i=document.createElement("span"),s=document.createElement("button");return i.innerHTML=t,s.innerText=e,n.classList.add("erase-container"),n.appendChild(i),n.appendChild(s),n.addEventListener("click",r),n}createColorPickerSelect(t){const e=this.getUseLanguage(),r=document.createElement("div"),n=this.createColorPickerIcon('<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 42H44" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M31 4L7 28L13 34H21L41 14L31 4Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',e("removeColor"),(()=>{this.setAttribute(t,"",r),this.updateInputStatus(r,!1,!0)})),i=this.createColorList(t),s=this.createPalette(t,e,r);return r.classList.add("color-picker-select","ql-hidden"),r.appendChild(n),r.appendChild(i),r.appendChild(s),r}createDropdown(t,e){const r=document.createElement("div"),n=document.createElement("span"),i=document.createElement("span");return"dropdown"===e&&(i.innerHTML=Tt,i.classList.add("ql-table-dropdown-icon")),t&&(n.innerText=t),r.classList.add("ql-table-dropdown-properties"),n.classList.add("ql-table-dropdown-text"),r.appendChild(n),"dropdown"===e&&r.appendChild(i),{dropdown:r,dropText:n}}createInput(t){const{attribute:e,message:r,propertyName:n,value:i,valid:s}=t,{placeholder:o=""}=e,l=document.createElement("div"),a=document.createElement("div"),c=document.createElement("label"),u=document.createElement("input"),h=document.createElement("div");return l.classList.add("label-field-view"),a.classList.add("label-field-view-input-wrapper"),c.innerText=o,R(u,e),u.classList.add("property-input"),u.value=i,u.addEventListener("input",(t=>{const e=t.target.value;s&&this.switchHidden(h,s(e)),this.updateInputStatus(a,s&&!s(e)),this.setAttribute(n,e,l)})),h.classList.add("label-field-view-status","ql-hidden"),r&&(h.innerText=r),a.appendChild(u),a.appendChild(c),l.appendChild(a),s&&l.appendChild(h),l}createList(t,e){const{options:r,propertyName:n}=t;if(!r.length)return null;const i=document.createElement("ul");for(const t of r){const e=document.createElement("li");e.innerText=t,i.appendChild(e)}return i.classList.add("ql-table-dropdown-list","ql-hidden"),i.addEventListener("click",(t=>{const r=t.target.innerText;e.innerText=r,this.toggleBorderDisabled(r),this.setAttribute(n,r)})),i}createPalette(t,e,r){const n=document.createElement("div"),i=document.createElement("div"),s=document.createElement("div"),o=document.createElement("div"),l=new Ye.ColorPicker(o,{width:110,layout:[{component:Ye.ui.Wheel,options:{}}]}),a=this.createColorPickerIcon('<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44C29.9601 44 26.3359 35.136 30 31C33.1264 27.4709 44 29.0856 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M28 17C29.6569 17 31 15.6569 31 14C31 12.3431 29.6569 11 28 11C26.3431 11 25 12.3431 25 14C25 15.6569 26.3431 17 28 17Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M16 21C17.6569 21 19 19.6569 19 18C19 16.3431 17.6569 15 16 15C14.3431 15 13 16.3431 13 18C13 19.6569 14.3431 21 16 21Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M17 34C18.6569 34 20 32.6569 20 31C20 29.3431 18.6569 28 17 28C15.3431 28 14 29.3431 14 31C14 32.6569 15.3431 34 17 34Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/></svg>',e("colorPicker"),(()=>this.toggleHidden(i))),c=this.createActionBtns((e=>{const s=e.target.closest("button");s&&("save"===s.getAttribute("label")&&(this.setAttribute(t,l.color.hexString,r),this.updateInputStatus(n,!1,!0)),i.classList.add("ql-hidden"),r.classList.add("ql-hidden"))}),!1);return i.classList.add("color-picker-palette","ql-hidden"),s.classList.add("color-picker-wrap"),o.classList.add("iro-container"),s.appendChild(o),s.appendChild(c),i.appendChild(s),n.appendChild(a),n.appendChild(i),n}createProperty(t){const{content:e,children:r}=t,n=this.getUseLanguage(),i=document.createElement("div"),s=document.createElement("label");s.innerText=e,s.classList.add("ql-table-dropdown-label"),i.classList.add("properties-form-row"),1===r.length&&i.classList.add("properties-form-row-full"),i.appendChild(s);for(const t of r){const r=this.createPropertyChild(t);r&&i.appendChild(r),r&&e===n("border")&&this.borderForm.push(r)}return i}createPropertyChild(t){const{category:e,value:r}=t;switch(e){case"dropdown":const{dropdown:n,dropText:i}=this.createDropdown(r,e),s=this.createList(t,i);return n.appendChild(s),n.addEventListener("click",(()=>{this.toggleHidden(s),this.updateSelectedStatus(n,i.innerText,"dropdown")})),n;case"color":return this.createColorContainer(t);case"menus":return this.createCheckBtns(t);case"input":return this.createInput(t)}}createPropertiesForm(t){const e=this.getUseLanguage(),{title:r,properties:n}=function({type:t,attribute:e},r){return"table"===t?function(t,e){return{title:e("tblProps"),properties:[{content:e("border"),children:[{category:"dropdown",propertyName:"border-style",value:t["border-style"],options:["dashed","dotted","double","groove","inset","none","outset","ridge","solid"]},{category:"color",propertyName:"border-color",value:t["border-color"],attribute:{type:"text",placeholder:e("color")},valid:O,message:e("colorMsg")},{category:"input",propertyName:"border-width",value:k(t["border-width"]),attribute:{type:"text",placeholder:e("width")},valid:B,message:e("dimsMsg")}]},{content:e("background"),children:[{category:"color",propertyName:"background-color",value:t["background-color"],attribute:{type:"text",placeholder:e("color")},valid:O,message:e("colorMsg")}]},{content:e("dimsAlm"),children:[{category:"input",propertyName:"width",value:k(t.width),attribute:{type:"text",placeholder:e("width")},valid:B,message:e("dimsMsg")},{category:"input",propertyName:"height",value:k(t.height),attribute:{type:"text",placeholder:e("height")},valid:B,message:e("dimsMsg")},{category:"menus",propertyName:"align",value:t.align,menus:[{icon:l,describe:e("alTblL"),align:"left"},{icon:o,describe:e("tblC"),align:"center"},{icon:a,describe:e("alTblR"),align:"right"}]}]}]}}(e,r):function(t,e){return{title:e("cellProps"),properties:[{content:e("border"),children:[{category:"dropdown",propertyName:"border-style",value:t["border-style"],options:["dashed","dotted","double","groove","inset","none","outset","ridge","solid"]},{category:"color",propertyName:"border-color",value:t["border-color"],attribute:{type:"text",placeholder:e("color")},valid:O,message:e("colorMsg")},{category:"input",propertyName:"border-width",value:k(t["border-width"]),attribute:{type:"text",placeholder:e("width")},valid:B,message:e("dimsMsg")}]},{content:e("background"),children:[{category:"color",propertyName:"background-color",value:t["background-color"],attribute:{type:"text",placeholder:e("color")},valid:O,message:e("colorMsg")}]},{content:e("dims"),children:[{category:"input",propertyName:"width",value:k(t.width),attribute:{type:"text",placeholder:e("width")},valid:B,message:e("dimsMsg")},{category:"input",propertyName:"height",value:k(t.height),attribute:{type:"text",placeholder:e("height")},valid:B,message:e("dimsMsg")},{category:"input",propertyName:"padding",value:k(t.padding),attribute:{type:"text",placeholder:e("padding")},valid:B,message:e("dimsMsg")}]},{content:e("tblCellTxtAlm"),children:[{category:"menus",propertyName:"text-align",value:t["text-align"],menus:[{icon:l,describe:e("alCellTxtL"),align:"left"},{icon:o,describe:e("alCellTxtC"),align:"center"},{icon:a,describe:e("alCellTxtR"),align:"right"},{icon:'<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 19H6" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 9H6" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 29H6" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 39H6" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',describe:e("jusfCellTxt"),align:"justify"}]},{category:"menus",propertyName:"vertical-align",value:t["vertical-align"],menus:[{icon:'<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 36.3056H42" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 42H42" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 12L24 6L18 12V12" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 6V29" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',describe:e("alCellTxtT"),align:"top"},{icon:'<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 36L24 30L30 36" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M23.9999 30.9998V43.9998" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 12L24 18L30 12" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M23.9999 17.0002V4.00022" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 24.0004H42" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',describe:e("alCellTxtM"),align:"middle"},{icon:'<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 36.3056H42" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 42H42" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 23L24 29L18 23V23" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 6V29" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',describe:e("alCellTxtB"),align:"bottom"}]}]}]}}(e,r)}(t,e),i=document.createElement("div");i.classList.add("ql-table-properties-form");const s=document.createElement("h2"),c=this.createActionBtns((t=>{const e=t.target.closest("button");e&&this.checkBtnsAction(e.getAttribute("label"))}),!0);s.innerText=r,s.classList.add("properties-form-header"),i.appendChild(s);for(const t of n){const e=this.createProperty(t);i.appendChild(e)}return i.appendChild(c),this.setBorderDisabled(),this.tableMenus.quill.container.appendChild(i),this.updatePropertiesForm(i,t.type),this.setSaveButton(c),i.addEventListener("click",(t=>{const e=t.target;this.hiddenSelectList(e)})),i}getCellStyle(t,e){const r=(t.getAttribute("style")||"").split(";").filter((t=>t.trim())).reduce(((t,e)=>{const r=e.split(":");return Object.assign(Object.assign({},t),{[r[0].trim()]:r[1].trim()})}),{});return Object.assign(r,e),Object.keys(r).reduce(((t,e)=>t+`${e}: ${r[e]}; `),"")}getColorClosest(t){return A(t,".ql-table-color-container")}getComputeBounds(t){if("table"===t){const{table:t}=this.tableMenus,[e,r]=this.tableMenus.getCorrectBounds(t);return e.bottom>r.bottom?Object.assign(Object.assign({},e),{bottom:r.height}):e}{const{computeBounds:t}=this.tableMenus.getSelectedTdsInfo();return t}}getDiffProperties(){const t=this.attrs,e=this.options.attribute;return Object.keys(t).reduce(((r,n)=>(t[n]!==e[n]&&(r[n]=function(t){return!(!t.endsWith("width")&&!t.endsWith("height"))}(n)?function(t){if(!t)return t;const e=t.slice(-2);return"px"!==e&&"em"!==e?t+"px":t}(t[n]):t[n]),r)),{})}getUseLanguage(){const{language:t}=this.tableMenus.tableBetter;return t.useLanguage.bind(t)}getViewportSize(){return{viewWidth:document.documentElement.clientWidth,viewHeight:document.documentElement.clientHeight}}hiddenSelectList(t){var e,r;const n=".ql-table-dropdown-properties",i=".color-picker",s=this.form.querySelectorAll(".ql-table-dropdown-list"),o=this.form.querySelectorAll(".color-picker-select");for(const l of[...s,...o])(null===(e=l.closest(n))||void 0===e?void 0:e.isEqualNode(t.closest(n)))||(null===(r=l.closest(i))||void 0===r?void 0:r.isEqualNode(t.closest(i)))||l.classList.add("ql-hidden")}removePropertiesForm(){this.form.remove(),this.borderForm=[]}saveAction(t){"table"===t?this.saveTableAction():this.saveCellAction()}saveCellAction(){const{selectedTds:t}=this.tableMenus.tableBetter.cellSelection,{quill:r,table:n}=this.tableMenus,i=e().find(n).colgroup(),s=this.getDiffProperties(),o=parseFloat(s.width),l=s["text-align"];l&&delete s["text-align"];const a=[];if(i&&o){delete s.width;const{computeBounds:t}=this.tableMenus.getSelectedTdsInfo(),e=S(t,n,r.container);for(const t of e)t.setAttribute("width",`${o}`)}for(const r of t){const t=e().find(r),n=t.statics.blotName,i=t.formats()[n],o=this.getCellStyle(r,s),c=C(t);if(l){const e="left"===l?"":l;t.children.forEach((t=>{t.statics.blotName===b.blotName?t.children.forEach((t=>{t.format&&t.format("align",e)})):t.format("align",e)}))}const u=c.format(n,Object.assign(Object.assign({},i),{style:o}));a.push(u.domNode)}this.tableMenus.tableBetter.cellSelection.setSelectedTds(a)}saveTableAction(){var t;const{table:r,tableBetter:n}=this.tableMenus,i=null===(t=e().find(r).temporary())||void 0===t?void 0:t.domNode,s=r.querySelector("td"),o=this.getDiffProperties(),l=o.align;switch(delete o.align,l){case"center":Object.assign(o,{margin:"0 auto"});break;case"left":Object.assign(o,{margin:""});break;case"right":Object.assign(o,{"margin-left":"auto","margin-right":""})}I(i||r,o),n.cellSelection.setSelected(s)}setAttribute(t,e,r){this.attrs[t]=e,t.includes("-color")&&this.updateSelectColor(this.getColorClosest(r),e)}setBorderDisabled(){const[t]=this.borderForm,e=t.querySelector(".ql-table-dropdown-text").innerText;this.toggleBorderDisabled(e)}setSaveButton(t){const e=t.querySelector('button[label="save"]');this.saveButton=e}setSaveButtonDisabled(t){this.saveButton&&(t?this.saveButton.setAttribute("disabled","true"):this.saveButton.removeAttribute("disabled"))}switchButton(t,e){const r=t.querySelectorAll("span.ql-table-tooltip-hover");for(const t of r)t.classList.remove("ql-table-btns-checked");e.classList.add("ql-table-btns-checked")}switchHidden(t,e){e?t.classList.add("ql-hidden"):t.classList.remove("ql-hidden")}toggleBorderDisabled(t){const[,e,r]=this.borderForm;"none"!==t&&t?(e.classList.remove("ql-table-disabled"),r.classList.remove("ql-table-disabled")):(this.attrs["border-color"]="",this.attrs["border-width"]="",this.updateSelectColor(e,""),this.updateInputValue(r,""),e.classList.add("ql-table-disabled"),r.classList.add("ql-table-disabled"))}toggleHidden(t){t.classList.toggle("ql-hidden")}updateInputValue(t,e){t.querySelector(".property-input").value=e}updateInputStatus(t,e,r){const n=(r?this.getColorClosest(t):A(t,".label-field-view")).querySelector(".label-field-view-input-wrapper");e?(n.classList.add("label-field-view-error"),this.setSaveButtonDisabled(!0)):(n.classList.remove("label-field-view-error"),this.form.querySelectorAll(".label-field-view-error").length||this.setSaveButtonDisabled(!1))}updatePropertiesForm(t,e){t.classList.remove("ql-table-triangle-none");const{height:r,width:n}=t.getBoundingClientRect(),i=this.tableMenus.quill.container.getBoundingClientRect(),{top:s,left:o,right:l,bottom:a}=this.getComputeBounds(e),{viewHeight:c}=this.getViewportSize();let u=a+10,h=o+l-n>>1;u+i.top+r>c?(u=s-r-10,u<0?(u=i.height-r>>1,t.classList.add("ql-table-triangle-none")):(t.classList.add("ql-table-triangle-up"),t.classList.remove("ql-table-triangle-down"))):(t.classList.add("ql-table-triangle-down"),t.classList.remove("ql-table-triangle-up")),h<i.left?(h=0,t.classList.add("ql-table-triangle-none")):h+n>i.right&&(h=i.right-n,t.classList.add("ql-table-triangle-none")),I(t,{left:`${h}px`,top:`${u}px`})}updateSelectColor(t,e){const r=t.querySelector(".property-input"),n=t.querySelector(".color-button"),i=t.querySelector(".color-picker-select"),s=t.querySelector(".label-field-view-status");e?n.classList.remove("color-unselected"):n.classList.add("color-unselected"),r.value=e,I(n,{"background-color":e}),i.classList.add("ql-hidden"),this.switchHidden(s,O(e))}updateSelectedStatus(t,e,r){const n="color"===r?".color-list":".ql-table-dropdown-list",i=t.querySelector(n);if(!i)return;const s=Array.from(i.querySelectorAll("li"));for(const t of s)t.classList.remove(`ql-table-${r}-selected`);const o=s.find((t=>("color"===r?t.getAttribute("data-color"):t.innerText)===e));o&&o.classList.add(`ql-table-${r}-selected`)}};!function(t){t.left="margin-left",t.right="margin-right"}(Xe||(Xe={}));var Qe=class{constructor(t,e){this.quill=t,this.table=null,this.prevList=null,this.prevTooltip=null,this.scroll=!1,this.tableBetter=e,this.tablePropertiesForm=null,this.quill.root.addEventListener("click",this.handleClick.bind(this)),this.root=this.createMenus()}createList(t){if(!t)return null;const e=document.createElement("ul");for(const[,r]of Object.entries(t)){const{content:t,handler:n}=r,i=document.createElement("li");i.innerText=t,i.addEventListener("click",n.bind(this)),e.appendChild(i)}return e.classList.add("ql-table-dropdown-list","ql-hidden"),e}createMenu(t,e,r){const n=document.createElement("div"),i=document.createElement("span");return i.innerHTML=r?t+e:t,n.classList.add("ql-table-dropdown"),i.classList.add("ql-table-tooltip-hover"),n.appendChild(i),n}createMenus(){const{language:t,options:r={}}=this.tableBetter,{menus:n}=r,i=t.useLanguage.bind(t),s=document.createElement("div");s.classList.add("ql-table-menus-container","ql-hidden");for(const[,t]of Object.entries(function(t,r){const n={column:{content:t("col"),icon:'<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1692084271333" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2200" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M9.14372835 1039.20071111L1020.26808889 1039.20071111l0-1048.576L9.14372835-9.37528889 9.14372835 1039.20071111z m252.77672107-711.53454649l1e-8-262.144 175.00150897 0 0 262.144L261.92044942 327.66616462zM942.48705138 702.1592576l0 262.14400001-178.89289103-1e-8 1e-8-262.144 178.89289102 0z m-256.66810311 0l0 262.144-171.11595236 0 0-262.144 171.11595236 0z m-248.89698987 0l0 262.144L261.92044943 964.3032576l-1e-8-262.144 175.00150898 0z m505.56509298-299.59563948L942.48705139 627.26180409l-178.89289104 0 0-224.69818596 178.89289103-1e-8z m-256.66810311 1e-8L685.81894827 627.26180409l-171.11595236 0 0-224.69818596 171.11595236 0z m-248.89698987 0L436.9219584 627.26180409 261.92044943 627.26180409l0-224.69818596 175.00150897 0z m505.56509298-337.04145352l0 262.14400001-178.89289102 0-1e-8-262.144 178.89289103-1e-8z m-256.66810311 1e-8l0 262.144-171.11595236 0 0-262.144 171.11595236 0z" fill="#515151" p-id="2201"></path></svg>',handler(t,e){this.toggleAttribute(t,e)},children:{left:{content:t("insColL"),handler(){const{leftTd:t}=this.getSelectedTdsInfo(),e=this.table.getBoundingClientRect();this.insertColumn(t,0),P(this.table,e,72),this.updateMenus()}},right:{content:t("insColR"),handler(){const{rightTd:t}=this.getSelectedTdsInfo(),e=this.table.getBoundingClientRect();this.insertColumn(t,1),P(this.table,e,72),this.updateMenus()}},delete:{content:t("delCol"),handler(){const{computeBounds:t,leftTd:r,rightTd:n}=this.getSelectedTdsInfo(),i=this.table.getBoundingClientRect(),s=j(t,this.table,this.quill.container,"column"),o=S(t,this.table,this.quill.container),l=e().find(r).table(),{changeTds:a,delTds:c}=this.getCorrectTds(s,t,r,n);this.tableBetter.cellSelection.updateSelected("column"),l.deleteColumn(a,c,this.hideMenus.bind(this),o),P(this.table,i,t.left-t.right),this.updateMenus()}}}},row:{content:t("row"),icon:'<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1692084279720" class="icon" viewBox="0 0 1181 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2344" xmlns:xlink="http://www.w3.org/1999/xlink" width="18.453125" height="16"><path d="M1142.15367111 0H39.38417778C7.99630222 0 0 8.27050667 0 39.38531555v945.2293689C0 1015.72949333 7.99516445 1024 39.38531555 1024h1102.76835556c31.39128889 0 39.38417778-8.27050667 39.38417778-39.38531555V39.38531555c0-31.11480889-7.99516445-39.38531555-39.38417778-39.38531555zM354.46328889 945.23050667l-276.992 3.26997333V749.568l276.992-1.25952v196.92202667z m0-275.69265778H78.76835555V472.61468445h275.69265778v196.92316444z m0-275.69152H78.76835555V236.30848h275.69265778v157.53671111z m393.84632889 551.38417778H433.23050667V748.30848h315.07683555v196.92202667z m0-275.69265778H433.23050667V472.61468445h315.07683555v196.92316444z m0-275.69152H433.23050667V236.30848h315.07683555v157.53671111z m354.46101333 551.38417778H827.07683555V748.30848h275.69265778v196.92202667z m0-275.69265778H827.07683555V472.61468445h275.69265778v196.92316444z m0-275.69152H827.07683555V236.30848h275.69265778v157.53671111z" fill="#515151" p-id="2345"></path></svg>',handler(t,e){this.toggleAttribute(t,e)},children:{above:{content:t("insRowAbv"),handler(){const{leftTd:t}=this.getSelectedTdsInfo();this.insertRow(t,0),this.updateMenus()}},below:{content:t("insRowBlw"),handler(){const{rightTd:t}=this.getSelectedTdsInfo();this.insertRow(t,1),this.updateMenus()}},delete:{content:t("delRow"),handler(){const t=this.tableBetter.cellSelection.selectedTds,r=[];let n="";for(const i of t)i.getAttribute("data-row")!==n&&(r.push(e().find(i.parentElement)),n=i.getAttribute("data-row"));this.tableBetter.cellSelection.updateSelected("row"),e().find(t[0]).table().deleteRow(r,this.hideMenus.bind(this)),this.updateMenus()}}}},merge:{content:t("mCells"),icon:'<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1692084199654" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1975" width="16" height="16" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M776.08580741 364.42263703c-15.53445925-7.76722963-31.06891852-7.76722963-46.60337778 0L589.6722963 512l139.81013333 147.57736297c15.53445925 7.76722963 31.06891852 7.76722963 46.60337778 0 15.53445925-15.53445925 15.53445925-31.06891852 0-46.60337779L706.18074075 543.06891852h163.11182222c15.53445925 0 31.06891852-15.53445925 31.06891851-31.06891852s-15.53445925-31.06891852-31.06891851-31.06891852H706.18074075l69.90506666-69.90506666c7.76722963-15.53445925 7.76722963-31.06891852 0-46.60337779z m-528.17161482 0c-15.53445925 15.53445925-15.53445925 31.06891852 0 46.60337779l69.90506666 69.90506666H154.70743703c-15.53445925 0-31.06891852 15.53445925-31.06891851 31.06891852s15.53445925 31.06891852 31.06891851 31.06891852H317.81925925l-69.90506666 69.90506666c-15.53445925 15.53445925-15.53445925 31.06891852 0 46.60337779 15.53445925 7.76722963 31.06891852 7.76722963 46.60337778 0L434.3277037 512 294.51757037 364.42263703c-15.53445925-7.76722963-31.06891852-7.76722963-46.60337778 0z" fill="#515151" p-id="1976"></path><path d="M317.81925925 939.19762963H84.80237037V84.80237037h233.01688888v116.50844445h77.6722963V7.13007408H7.13007408v1009.73985184h388.36148147V822.68918518h-77.6722963zM628.50844445 7.13007408v194.18074074h77.6722963v-116.50844445h233.01688888v854.39525926H706.18074075v-116.50844445h-77.6722963v194.18074074h388.36148147V7.13007408z" fill="#515151" p-id="1977"></path></svg>',handler(t,e){this.toggleAttribute(t,e)},children:{merge:{content:t("mCells"),handler(){this.mergeCells(),this.updateMenus()}},split:{content:t("sCell"),handler(){this.splitCell(),this.updateMenus()}}}},table:{content:t("tblProps"),icon:Nt,handler(t,e){const r=Object.assign(Object.assign({},q(this.table,p)),{align:this.getTableAlignment(this.table)});this.toggleAttribute(t,e),this.tablePropertiesForm=new Je(this,{attribute:r,type:"table"}),this.hideMenus()}},cell:{content:t("cellProps"),icon:'<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1692084286647" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2488" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M1058.13333333 0v1024H-34.13333333V0h1092.26666666zM460.8 563.2H68.26666667V921.6h392.53333333V563.2z m494.93333333 0H563.2V921.6h392.53333333V563.2zM460.8 102.4H68.26666667v358.4h392.53333333V102.4z" fill="#515151" p-id="2489"></path></svg>',handler(t,e){const{selectedTds:r}=this.tableBetter.cellSelection,n=r.length>1?this.getSelectedTdsAttrs(r):this.getSelectedTdAttrs(r[0]);this.toggleAttribute(t,e),this.tablePropertiesForm=new Je(this,{attribute:n,type:"cell"}),this.hideMenus()}},wrap:{content:t("insParaOTbl"),icon:'<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1692084879007" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="968" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M512 332.57913685H49.39294151c-20.56031346 0-41.12062691-17.13359531-41.12062805-41.12062692V44.73474502c0-20.56031346 17.13359531-41.12062691 41.12062805-41.12062691H512c20.56031346 0 41.12062691 17.13359531 41.12062691 41.12062691v246.72376491c0 23.98703275-17.13359531 41.12062691-41.12062691 41.12062692zM90.51356843 250.33788188h380.36580466V85.85537308H90.51356843v164.4825088z m884.09349006 757.30488889h-925.21411698c-20.56031346 0-41.12062691-17.13359531-41.12062805-41.12062692v-246.72376491c0-20.56031346 17.13359531-41.12062691 41.12062805-41.12062691h921.78739883c20.56031346 0 41.12062691 17.13359531 41.12062691 41.12062691v246.72376491c0 23.98703275-17.13359531 41.12062691-37.69390876 41.12062692zM90.51356843 928.82823509h842.97286314v-164.48250994H90.51356843v164.48250994z" fill="#515151" p-id="969"></path><path d="M974.60705849 1017.92292864h-925.21411698c-27.41375203 0-47.97406549-20.56031346-47.97406549-47.97406549v-246.72376491c0-27.41375203 20.56031346-47.97406549 47.97406549-47.97406549h921.78739883c27.41375203 0 47.97406549 20.56031346 47.97406435 47.97406549v246.72376491c3.42671929 23.98703275-20.56031346 47.97406549-44.5473462 47.97406549z m-925.21411698-325.53830173c-17.13359531 0-30.84047019 13.70687602-30.84047132 30.84047133v246.72376491c0 17.13359531 13.70687602 30.84047019 30.84047132 30.84047018h921.78739883c17.13359531 0 30.84047019-13.70687602 30.84047019-30.84047018v-246.72376491c0-17.13359531-13.70687602-30.84047019-30.84047019-30.84047133H49.39294151z m890.9469275 243.29704675h-856.67973802v-181.61610523h860.10645731v181.61610523h-3.42671929zM100.79372515 921.97479765h825.83926784V774.62588188H100.79372515v147.34891577z m411.20627485-582.54222223H49.39294151c-27.41375203 0-47.97406549-20.56031346-47.97406549-47.97406549V44.73474502c0-27.41375203 20.56031346-47.97406549 47.97406549-47.97406549H512c27.41375203 0 47.97406549 20.56031346 47.97406549 47.97406549v246.72376491c0 27.41375203-20.56031346 47.97406549-47.97406549 47.97406549zM49.39294151 13.89427484c-17.13359531 0-30.84047019 13.70687602-30.84047132 30.84047018v246.72376491c0 17.13359531 13.70687602 30.84047019 30.84047132 30.84047019H512c17.13359531 0 30.84047019-13.70687602 30.84047019-30.84047019V44.73474502c0-17.13359531-13.70687602-30.84047019-30.84047019-30.84047018H49.39294151zM481.15952981 260.61803974H83.66013099V79.00193451h397.49939882V260.61803974zM100.79372515 243.48444444h363.23220936V96.13552981H100.79372515v147.34891463z" fill="#515151" p-id="970"></path><path d="M974.60705849 130.40271929H628.50844445c-6.85343744 0-10.28015673 3.42671929-10.28015674 10.28015672v58.25422223c0 6.85343744 3.42671929 10.28015673 10.28015674 10.28015673h304.97798712V466.2211766H546.26718947l27.41375204-20.56031345c3.42671929-3.42671929 6.85343744-10.28015673 6.85343744-17.13359531v-58.25422223c0-6.85343744-3.42671929-10.28015673-10.28015673-10.28015672-3.42671929 0-3.42671929 0-6.85343744 3.42671928L409.19843157 486.78149006c-10.28015673 6.85343744-10.28015673 20.56031346-3.42671928 27.41375203l3.42671928 3.42671816 157.62907136 130.21532045c3.42671929 3.42671929 10.28015673 3.42671929 13.70687602 0 0-3.42671929 3.42671929-3.42671929 3.42671929-6.85343744v-61.6809415c0-6.85343744-3.42671929-10.28015673-6.85343858-13.70687602l-20.56031345-17.13359417h421.48643157c20.56031346 0 41.12062691-17.13359531 41.12062691-41.12062805V168.09662691c-6.85343744-20.56031346-23.98703275-37.69390877-44.5473462-37.69390762z" fill="#515151" p-id="971"></path><path d="M573.68094151 661.54415673c-3.42671929 0-6.85343744 0-10.28015673-3.42671929l-157.62907249-130.21531933-3.4267193-3.42671928c-3.42671929-6.85343744-6.85343744-13.70687602-6.85343744-20.56031346 0-6.85343744 3.42671929-13.70687602 10.28015674-20.5603146l157.62907249-126.78860117c3.42671929-3.42671929 6.85343744-3.42671929 10.28015673-3.42671815 10.28015673 0 17.13359531 6.85343744 17.13359417 17.13359416v58.25422223c0 10.28015673-3.42671929 17.13359531-10.28015673 23.98703275l-10.28015673 6.85343744H923.20627485v-239.87032634h-294.6978304c-10.28015673 0-17.13359531-6.85343744-17.13359531-17.13359416V140.68287601c0-10.28015673 6.85343744-17.13359531 17.13359531-17.13359531h346.09861404c27.41375203 0 47.97406549 20.56031346 47.97406549 47.9740655v335.81845732c0 27.41375203-20.56031346 47.97406549-47.97406549 47.97406549H577.10765966l3.42671929 3.42671929c6.85343744 6.85343744 10.28015673 13.70687602 10.28015673 20.56031346v61.6809415c0 3.42671929 0 6.85343744-3.42671815 10.28015674-3.42671929 6.85343744-10.28015673 10.28015673-13.70687602 10.28015673z m0-291.27111112l-157.6290725 126.78860117c-3.42671929 3.42671929-3.42671929 3.42671929-3.42671815 6.85343859s0 6.85343744 3.42671815 10.28015672l157.6290725 130.21532047h3.42671815v-61.68094151c0-3.42671929 0-6.85343744-3.42671815-10.28015673l-41.12062805-34.26718948h442.04674503c17.13359531 0 30.84047019-13.70687602 30.84047132-30.84047132V168.09662691c0-17.13359531-13.70687602-30.84047019-30.84047132-30.84047018H628.50844445v61.68094151h311.83142456v274.1375158H522.28015673l47.97406549-37.69390763c3.42671929-3.42671929 3.42671929-6.85343744 3.42671929-10.28015787v-54.82750293z" fill="#515151" p-id="972"></path></svg>',handler(t,e){this.toggleAttribute(t,e)},children:{before:{content:t("insB4"),handler(){this.insertParagraph(-1)}},after:{content:t("insAft"),handler(){this.insertParagraph(1)}}}},delete:{content:t("delTable"),icon:'<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 10V44H39V10H9Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M20 20V33" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 20V33" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 10H44" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 10L19.289 4H28.7771L32 10H16Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/></svg>',handler(){const t=e().find(this.table);if(!t)return;const r=t.offset(this.quill.scroll);t.remove(),this.tableBetter.hideTools(),this.quill.setSelection(r-1,0,e().sources.USER)}}};return(null==r?void 0:r.length)?Object.values(r).reduce(((t,e)=>(t[e]=n[e],t)),{}):n}(i,n))){const{content:e,icon:r,children:n,handler:i}=t,o=this.createList(n),l=x(e),a=this.createMenu(r,Tt,!!n);a.appendChild(l),o&&a.appendChild(o),s.appendChild(a),a.addEventListener("click",i.bind(this,o,l))}return this.quill.container.appendChild(s),s}destroyTablePropertiesForm(){this.tablePropertiesForm&&(this.tablePropertiesForm.removePropertiesForm(),this.tablePropertiesForm=null)}getCellsOffset(t,r,n,i){const s=e().find(this.table).descendants(V),o=Math.max(r.left,t.left),l=Math.min(r.right,t.right),a=new Map,c=new Map,u=new Map;for(const e of s){const{left:n,right:i}=E(e.domNode,this.quill.container);n+2>=o&&i<=l+2?this.setCellsMap(e,a):n+2>=t.left&&i<=r.left+2?this.setCellsMap(e,c):n+2>=r.right&&i<=t.right+2&&this.setCellsMap(e,u)}return this.getDiffOffset(a)||this.getDiffOffset(c,n)+this.getDiffOffset(u,i)}getColsOffset(t,e,r){let n=t.children.head;const i=Math.max(r.left,e.left),s=Math.min(r.right,e.right);let o=null,l=null,a=0;for(;n;){const{width:t}=n.domNode.getBoundingClientRect();if(o||l?(o=l,l+=t):(o=E(n.domNode,this.quill.container).left,l=o+t),o>s)break;o>=i&&l<=s&&a--,n=n.next}return a}getCorrectBounds(t){const e=this.quill.container.getBoundingClientRect(),r=E(t,this.quill.container);return r.width>=e.width?[Object.assign(Object.assign({},r),{left:0,right:e.width}),e]:[r,e]}getCorrectTds(t,r,n,i){const s=[],o=[],l=e().find(n).table().colgroup(),a=~~n.getAttribute("colspan")||1,c=~~i.getAttribute("colspan")||1;if(l)for(const e of t){const t=E(e,this.quill.container);if(t.left+2>=r.left&&t.right<=r.right+2)o.push(e);else{const n=this.getColsOffset(l,r,t);s.push([e,n])}}else for(const e of t){const t=E(e,this.quill.container);if(t.left+2>=r.left&&t.right<=r.right+2)o.push(e);else{const n=this.getCellsOffset(r,t,a,c);s.push([e,n])}}return{changeTds:s,delTds:o}}getDiffOffset(t,e){let r=0;const n=this.getTdsFromMap(t);if(n.length)if(e){for(const t of n)r+=~~t.getAttribute("colspan")||1;r-=e}else for(const t of n)r-=~~t.getAttribute("colspan")||1;return r}getRefInfo(t,e){let r=null,n=t.children.head;const i=n.domNode.getAttribute("data-row");for(;n;){const{left:t}=n.domNode.getBoundingClientRect();if(Math.abs(t-e)<=2)return{id:i,ref:n};Math.abs(t-e)>=2&&!r&&(r=n),n=n.next}return{id:i,ref:r}}getSelectedTdAttrs(t){const r=function(t){const e="left";let r=null;const n=t.descendants(U),i=t.descendants(m),s=t.descendants(w);function o(t){for(const e of t.domNode.classList)if(/ql-align-/.test(e))return e.split("ql-align-")[1];return e}for(const t of[...n,...i,...s]){const n=o(t);if(null!=(l=r)&&l!==n)return e;r=n}var l;return null!=r?r:e}(e().find(t));return r?Object.assign(Object.assign({},q(t,h)),{"text-align":r}):q(t,h)}getSelectedTdsAttrs(t){const e=new Map;let r=null;for(const n of t){const t=this.getSelectedTdAttrs(n);if(r)for(const n of Object.keys(r))e.has(n)||t[n]!==r[n]&&e.set(n,!1);else r=t}for(const t of Object.keys(r))e.has(t)&&(r[t]=u[t]);return r}getSelectedTdsInfo(){const{startTd:t,endTd:e}=this.tableBetter.cellSelection,r=E(t,this.quill.container),n=E(e,this.quill.container),i=L(r,n);return r.left>n.left&&r.top>n.top?{computeBounds:i,leftTd:e,rightTd:t}:{computeBounds:i,leftTd:t,rightTd:e}}getTableAlignment(t){const e=t.getAttribute("align");if(!e){const{[Xe.left]:e,[Xe.right]:r}=q(t,[Xe.left,Xe.right]);return"auto"===e?"auto"===r?"center":"right":"left"}return e||"center"}getTdsFromMap(t){return Object.values(Object.fromEntries(t)).reduce(((t,e)=>t.length>e.length?t:e),[])}handleClick(t){const e=t.target.closest("table");if(this.prevList&&this.prevList.classList.add("ql-hidden"),this.prevTooltip&&this.prevTooltip.classList.remove("ql-table-tooltip-hidden"),this.prevList=null,this.prevTooltip=null,!e&&!this.tableBetter.cellSelection.selectedTds.length)return this.hideMenus(),void this.destroyTablePropertiesForm();this.tablePropertiesForm||(this.showMenus(),this.updateMenus(e),(e&&!e.isEqualNode(this.table)||this.scroll)&&this.updateScroll(!1),this.table=e)}hideMenus(){this.root.classList.add("ql-hidden")}insertColumn(t,r){const{left:n,right:i,width:s}=t.getBoundingClientRect(),o=e().find(t).table(),l=t.parentElement.lastChild.isEqualNode(t);r>0?o.insertColumn(i,l,s):o.insertColumn(n,l,s),this.quill.scrollSelectionIntoView()}insertParagraph(t){const r=e().find(this.table),n=this.quill.getIndex(r),i=t>0?r.length():0,o=(new(s())).retain(n+i).insert("\n");this.quill.updateContents(o,e().sources.USER),this.quill.setSelection(n+i,e().sources.SILENT),this.tableBetter.hideTools(),this.quill.scrollSelectionIntoView()}insertRow(t,r){const n=e().find(t),i=n.rowOffset(),s=n.table();if(r>0){const e=~~t.getAttribute("rowspan")||1;s.insertRow(i+r+e-1,r)}else s.insertRow(i+r,r);this.quill.scrollSelectionIntoView()}mergeCells(){const{selectedTds:t}=this.tableBetter.cellSelection,{computeBounds:r,leftTd:n}=this.getSelectedTdsInfo(),i=e().find(n),[s,o]=N(i),l=i.children.head,a=i.table().tbody().children,c=i.row().children.reduce(((t,e)=>{const n=E(e.domNode,this.quill.container);return n.left>=r.left&&n.right<=r.right&&(t+=~~e.domNode.getAttribute("colspan")||1),t}),0),u=a.reduce(((t,e)=>{const n=E(e.domNode,this.quill.container);if(n.top>=r.top&&n.bottom<=r.bottom){let r=Number.MAX_VALUE;e.children.forEach((t=>{const e=~~t.domNode.getAttribute("rowspan")||1;r=Math.min(r,e)})),t+=r}return t}),0);for(const r of t){if(n.isEqualNode(r))continue;const t=e().find(r);t.children.forEach((t=>{const e=t.statics.blotName;switch(e){case b.blotName:t.children.forEach((t=>{t.format&&t.format(e,Object.assign(Object.assign({},s),{cellId:o}))}));break;case w.blotName:const r=t.formats()[e];t.format&&t.format(e,Object.assign(Object.assign({},r),{cellId:o}));break;default:t.format&&t.format(e,o)}})),t.moveChildren(i),t.remove()}l.format(i.statics.blotName,Object.assign(Object.assign({},s),{colspan:c,rowspan:u})),this.tableBetter.cellSelection.setSelected(l.parent.domNode),this.quill.scrollSelectionIntoView()}setCellsMap(t,e){const r=t.domNode.getAttribute("data-row");e.has(r)?e.set(r,[...e.get(r),t.domNode]):e.set(r,[t.domNode])}showMenus(){this.root.classList.remove("ql-hidden")}splitCell(){const{selectedTds:t}=this.tableBetter.cellSelection,{leftTd:r}=this.getSelectedTdsInfo(),n=e().find(r).children.head;for(const r of t){const t=~~r.getAttribute("colspan")||1,n=~~r.getAttribute("rowspan")||1;if(1===t&&1===n)continue;const i=[],{width:s,right:o}=r.getBoundingClientRect(),l=e().find(r),a=l.table(),c=l.next,u=l.row();if(n>1)if(t>1){let e=u.next;for(let r=1;r<n;r++){const{ref:r,id:n}=this.getRefInfo(e,o);for(let s=0;s<t;s++)i.push([e,n,r]);e=e.next}}else{let t=u.next;for(let e=1;e<n;e++){const{ref:e,id:r}=this.getRefInfo(t,o);i.push([t,r,e]),t=t.next}}if(t>1){const e=r.getAttribute("data-row");for(let r=1;r<t;r++)i.push([u,e,c])}for(const[t,e,r]of i)a.insertColumnCell(t,e,r);const[h]=N(l);l.replaceWith(l.statics.blotName,Object.assign(Object.assign({},h),{width:~~(s/t),colspan:null,rowspan:null}))}this.tableBetter.cellSelection.setSelected(n.parent.domNode),this.quill.scrollSelectionIntoView()}toggleAttribute(t,e){this.prevList&&!this.prevList.isEqualNode(t)&&(this.prevList.classList.add("ql-hidden"),this.prevTooltip.classList.remove("ql-table-tooltip-hidden")),t&&(t.classList.toggle("ql-hidden"),e.classList.toggle("ql-table-tooltip-hidden"),this.prevList=t,this.prevTooltip=e)}updateMenus(t=this.table){t&&requestAnimationFrame((()=>{this.root.classList.remove("ql-table-triangle-none");const[e,r]=this.getCorrectBounds(t),{left:n,right:i,top:s,bottom:o}=e,{height:l,width:a}=this.root.getBoundingClientRect(),c=this.quill.getModule("toolbar"),u=getComputedStyle(c.container);let h=s-l-10,d=n+i-a>>1;h>-parseInt(u.paddingBottom)?(this.root.classList.add("ql-table-triangle-up"),this.root.classList.remove("ql-table-triangle-down")):(h=o>r.height?r.height+10:o+10,this.root.classList.add("ql-table-triangle-down"),this.root.classList.remove("ql-table-triangle-up")),d<r.left?(d=0,this.root.classList.add("ql-table-triangle-none")):d+a>r.right&&(d=r.right-a,this.root.classList.add("ql-table-triangle-none")),I(this.root,{left:`${d}px`,top:`${h}px`})}))}updateScroll(t){this.scroll=t}updateTable(t){this.table=t}};const tr=e().import("blots/inline");e().import("ui/icons")["table-better"]=Nt;class er extends tr{}class rr{constructor(){this.computeChildren=[],this.root=this.createContainer()}clearSelected(t){for(const e of t)e.classList&&e.classList.remove("ql-cell-selected");this.computeChildren=[],this.root&&this.setLabelContent(this.root.lastElementChild,null)}createContainer(){const t=document.createElement("div"),e=document.createElement("div"),r=document.createElement("div"),n=document.createDocumentFragment();for(let t=1;t<=10;t++)for(let e=1;e<=10;e++){const r=document.createElement("span");r.setAttribute("row",`${t}`),r.setAttribute("column",`${e}`),n.appendChild(r)}return r.innerHTML="0 x 0",t.classList.add("ql-table-select-container","ql-hidden"),e.classList.add("ql-table-select-list"),r.classList.add("ql-table-select-label"),e.appendChild(n),t.appendChild(e),t.appendChild(r),t.addEventListener("mousemove",(e=>this.handleMouseMove(e,t))),t}getComputeChildren(t,e){const r=[],{clientX:n,clientY:i}=e;for(const e of t){const{left:t,top:s}=e.getBoundingClientRect();n>=t&&i>=s&&r.push(e)}return r}getSelectAttrs(t){return[~~t.getAttribute("row"),~~t.getAttribute("column")]}handleClick(t,e){this.toggle(this.root);const r=t.target.closest("span[row]");if(r)this.insertTable(r,e);else{const t=this.computeChildren[this.computeChildren.length-1];t&&this.insertTable(t,e)}}handleMouseMove(t,e){const r=e.firstElementChild.children;this.clearSelected(this.computeChildren);const n=this.getComputeChildren(r,t);for(const t of n)t.classList&&t.classList.add("ql-cell-selected");this.computeChildren=n,this.setLabelContent(e.lastElementChild,n[n.length-1])}hide(t){this.clearSelected(this.computeChildren),t&&t.classList.add("ql-hidden")}insertTable(t,e){const[r,n]=this.getSelectAttrs(t);e(r,n),this.hide(this.root)}setLabelContent(t,e){if(e){const[r,n]=this.getSelectAttrs(e);t.innerHTML=`${r} x ${n}`}else t.innerHTML="0 x 0"}show(t){this.clearSelected(this.computeChildren),t&&t.classList.remove("ql-hidden")}toggle(t){this.clearSelected(this.computeChildren),t&&t.classList.toggle("ql-hidden")}}var nr=n(696);const ir=e().import("blots/container"),sr=e().import("modules/toolbar");class or extends sr{attach(t){let e=Array.from(t.classList).find((t=>0===t.indexOf("ql-")));if(!e)return;if(e=e.slice(3),"BUTTON"===t.tagName&&t.setAttribute("type","button"),null==this.handlers[e]&&null==this.quill.scroll.query(e))return void console.warn("ignoring attaching to nonexistent format",e,t);const r="SELECT"===t.tagName?"change":"click";t.addEventListener(r,(r=>{const n=this.getCellSelection();n.selectedTds.length>1?this.cellSelectionAttach(t,e,r,n):this.toolbarAttach(t,e,r)})),this.controls.push([e,t])}cellSelectionAttach(t,e,r,n){if("SELECT"===t.tagName){if(t.selectedIndex<0)return;const r=t.options[t.selectedIndex],i="string"!=typeof(null==r?void 0:r.value)||(null==r?void 0:r.value),s=n.getCorrectValue(e,i);n.setSelectedTdsFormat(e,s)}else{const i=(null==t?void 0:t.value)||!0,s=n.getCorrectValue(e,i);n.setSelectedTdsFormat(e,s),r.preventDefault()}}getCellSelection(){const{cellSelection:t}=this.quill.getModule("table-better");return t}setTableFormat(t,r,n,i,s){let o=null;const l=function(t,r,n){if(1===r.length){const i=function(t,e=0,r=Number.MAX_VALUE){const n=(t,e,r)=>{let i=[],s=r;return t.children.forEachAt(e,r,((t,e,r)=>{t instanceof ir&&(i.push(t),i=i.concat(n(t,e,s))),s-=r})),i};return n(t,e,r)}(e().find(r[0]),t.index,t.length);return ar(i)===ar(n)}return!!(r.length>1)}(t,r,s);for(const t of s){const e=lr(r,i,t,l);o=t.format(i,n,e)}if(r.length<2){const n=this.getCellSelection();if(l||1===s.length){const t=M(o);Promise.resolve().then((()=>{t&&this.quill.root.contains(t.domNode)?n.setSelected(t.domNode):n.setSelected(r[0])}))}else n.setSelected(r[0]);this.quill.setSelection(t,e().sources.SILENT)}return o}toolbarAttach(t,r,n){let i;if("SELECT"===t.tagName){if(t.selectedIndex<0)return;const e=t.options[t.selectedIndex];i=!e.hasAttribute("selected")&&(e.value||!1)}else i=!t.classList.contains("ql-active")&&(t.value||!t.hasAttribute("value")),n.preventDefault();this.quill.focus();const[o]=this.quill.selection.getRange();if(null!=this.handlers[r])this.handlers[r].call(this,i);else if(this.quill.scroll.query(r).prototype instanceof nr.EmbedBlot){if(i=prompt(`Enter ${r}`),!i)return;this.quill.updateContents((new(s())).retain(o.index).delete(o.length).insert({[r]:i}),e().sources.USER)}else this.quill.format(r,i,e().sources.USER);this.update(o)}}function lr(t,e,r,n){return 1===t.length&&"list"===e&&r.statics.blotName===w.blotName||n}function ar(t){return t.reduce(((t,e)=>t+e.length()),0)}function cr(t,e,r,n){const i=this.quill.getSelection();if(!n)if(i.length||1!==e.length)n=this.quill.getLines(i);else{const[t]=this.quill.getLine(i.index);n=[t]}return this.setTableFormat(i,e,t,r,n)}or.DEFAULTS={container:null,handlers:Object.assign(Object.assign({},sr.DEFAULTS.handlers),{header(t,r){const n=this.getCellSelection().selectedTds;if(n.length)return cr.call(this,t,n,"header",r);this.quill.format("header",t,e().sources.USER)},list(t,r){const n=this.getCellSelection(),i=n.selectedTds;if(i.length){if(1===i.length){const e=this.quill.getSelection(!0),r=this.quill.getFormat(e);t=n.getListCorrectValue("list",t,r)}return cr.call(this,t,i,"list",r)}const s=this.quill.getSelection(!0),o=this.quill.getFormat(s);"check"===t?"checked"===o.list||"unchecked"===o.list?this.quill.format("list",!1,e().sources.USER):this.quill.format("list","unchecked",e().sources.USER):this.quill.format("list",t,e().sources.USER)}})};var ur=or;const hr=["error","warn","log","info"];let dr="warn";function pr(t){if(dr&&hr.indexOf(t)<=hr.indexOf(dr)){for(var e=arguments.length,r=new Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];console[t](...r)}}function fr(t){return hr.reduce(((e,r)=>(e[r]=pr.bind(console,r,t),e)),{})}fr.level=t=>{dr=t},pr.level=fr.level;var gr=fr;const br=e().import("modules/clipboard"),mr=gr("quill:clipboard");var vr=class extends br{onPaste(t,{text:r,html:n}){const i=this.quill.getFormat(t.index),o=this.getTableDelta({text:r,html:n},i);mr.log("onPaste",o,{text:r,html:n});const l=(new(s())).retain(t.index).delete(t.length).concat(o);this.quill.updateContents(l,e().sources.USER),this.quill.setSelection(l.length()-t.length,e().sources.SILENT),this.quill.scrollSelectionIntoView()}getTableDelta({html:t,text:e},r){var n,i;const o=this.convert({text:e,html:t},r);if(r[U.blotName])for(const t of o.ops){if((null==t?void 0:t.attributes)&&(t.attributes[G.blotName]||t.attributes[U.blotName]))return new(s());((null===(n=null==t?void 0:t.attributes)||void 0===n?void 0:n.header)||(null===(i=null==t?void 0:t.attributes)||void 0===i?void 0:i.list))&&(t.attributes=Object.assign(Object.assign({},t.attributes),r))}return o}};const yr=e().import("core/module");class wr extends yr{static register(){e().register(U,!0),e().register(V,!0),e().register(W,!0),e().register($,!0),e().register(G,!0),e().register(K,!0),e().register(Y,!0),e().register(Z,!0),e().register("modules/toolbar",ur,!0),e().register("modules/clipboard",vr,!0)}constructor(t,e){super(t,e),t.clipboard.addMatcher("td, th",it),t.clipboard.addMatcher("tr",nt),t.clipboard.addMatcher("col",st),t.clipboard.addMatcher("table",ot),this.language=new dt(null==e?void 0:e.language),this.cellSelection=new _t(t,this),this.operateLine=new Ct(t,this),this.tableMenus=new Qe(t,this),this.tableSelect=new rr,t.root.addEventListener("keyup",this.handleKeyup.bind(this)),t.root.addEventListener("mousedown",this.handleMousedown.bind(this)),t.root.addEventListener("scroll",this.handleScroll.bind(this)),this.registerToolbarTable(null==e?void 0:e.toolbarTable)}deleteTable(){const[t]=this.getTable();if(null==t)return;const r=t.offset();t.remove(),this.hideTools(),this.quill.update(e().sources.USER),this.quill.setSelection(r,e().sources.SILENT)}deleteTableTemporary(){const t=this.quill.scroll.descendants(G);for(const e of t)e.remove();this.hideTools()}getTable(t=this.quill.getSelection()){if(null==t)return[null,null,null,-1];const[e,r]=this.quill.getLine(t.index);if(null==e||e.statics.blotName!==U.blotName)return[null,null,null,-1];const n=e.parent,i=n.parent;return[i.parent.parent,i,n,r]}handleKeyup(t){this.cellSelection.handleKeyup(t),!t.ctrlKey||"z"!==t.key&&"y"!==t.key||this.hideTools(),this.updateMenus(t)}handleMousedown(t){var e;if(null===(e=this.tableSelect)||void 0===e||e.hide(this.tableSelect.root),!t.target.closest("table"))return this.hideTools();this.cellSelection.handleMousedown(t),this.cellSelection.setDisabled(!0)}handleScroll(){var t;this.hideTools(),null===(t=this.tableMenus)||void 0===t||t.updateScroll(!0)}hideTools(){var t,e,r,n,i,s,o;null===(t=this.cellSelection)||void 0===t||t.clearSelected(),null===(e=this.cellSelection)||void 0===e||e.setDisabled(!1),null===(r=this.operateLine)||void 0===r||r.hideDragBlock(),null===(n=this.operateLine)||void 0===n||n.hideDragTable(),null===(i=this.operateLine)||void 0===i||i.hideLine(),null===(s=this.tableMenus)||void 0===s||s.hideMenus(),null===(o=this.tableMenus)||void 0===o||o.destroyTablePropertiesForm()}insertTable(t,r){const n=this.quill.getSelection(!0);if(null==n)return;if(this.isTable(n))return;const i=this.quill.getFormat(n.index-1),[,o]=this.quill.getLine(n.index),l=!!i[U.blotName]||0!==o,a=l?2:1,c=l?(new(s())).insert("\n"):new(s()),u=(new(s())).retain(n.index).delete(n.length).concat(c).insert("\n",{[G.blotName]:{}}),h=new Array(t).fill(0).reduce((t=>{const e=J();return new Array(r).fill("\n").reduce(((t,r)=>t.insert(r,{[U.blotName]:X(),[V.blotName]:{"data-row":e,width:"72"}})),t)}),u);this.quill.updateContents(h,e().sources.USER),this.quill.setSelection(n.index+a,e().sources.SILENT),this.showTools()}isTable(t){return!!this.quill.getFormat(t.index)[U.blotName]}registerToolbarTable(t){if(!t)return;e().register("formats/table-better",er,!0);const r=this.quill.getModule("toolbar").container.querySelector("button.ql-table-better");r&&this.tableSelect.root&&(r.appendChild(this.tableSelect.root),r.addEventListener("click",(t=>{this.tableSelect.handleClick(t,this.insertTable.bind(this))})),document.addEventListener("click",(t=>{t.composedPath().includes(r)||this.tableSelect.root.classList.contains("ql-hidden")||this.tableSelect.hide(this.tableSelect.root)})))}showTools(t){const[e,,r]=this.getTable();e&&r&&(this.cellSelection.setDisabled(!0),this.cellSelection.setSelected(r.domNode,t),this.tableMenus.showMenus(),this.tableMenus.updateMenus(e.domNode),this.tableMenus.updateTable(e.domNode))}updateMenus(t){this.cellSelection.selectedTds.length&&("Enter"===t.key||t.ctrlKey&&"v"===t.key)&&this.tableMenus.updateMenus()}}const kr={"table-cell down":_r(!1),"table-cell up":_r(!0),"table-cell-block backspace":xr("Backspace"),"table-cell-block delete":xr("Delete"),"table-header backspace":Cr("Backspace"),"table-header delete":Cr("Delete"),"table-header enter":{key:"Enter",collapsed:!0,format:["table-header"],suffix:/^$/,handler(t,r){const[n,i]=this.quill.getLine(t.index),o=(new(s())).retain(t.index).insert("\n",r.format).retain(n.length()-i-1).retain(1,{header:null});this.quill.updateContents(o,e().sources.USER),this.quill.setSelection(t.index+1,e().sources.SILENT),this.quill.scrollSelectionIntoView()}},"table-list backspace":Nr("Backspace"),"table-list delete":Nr("Delete"),"table-list empty enter":{key:"Enter",collapsed:!0,format:["table-list"],empty:!0,handler(t,e){const{line:r}=e,{cellId:n}=r.parent.formats()[r.parent.statics.blotName],i=r.replaceWith(U.blotName,n),s=this.quill.getModule("table-better"),o=M(i);o&&s.cellSelection.setSelected(o.domNode)}}};function xr(t){return{key:t,format:["table-cell-block"],collapsed:!0,handler(e,r){var n;const[i]=this.quill.getLine(e.index),{offset:s,suffix:o}=r;if(0===s&&!i.prev)return!1;const l=null===(n=i.prev)||void 0===n?void 0:n.statics.blotName;return 0!==s||l!==b.blotName&&l!==U.blotName&&l!==w.blotName?!(0!==s&&!o&&"Delete"===t):Tr.call(this,i,e)}}}function _r(t){return{key:t?"ArrowUp":"ArrowDown",collapsed:!0,format:["table-cell"],handler(){return!1}}}function Cr(t){return{key:t,format:["table-header"],collapsed:!0,empty:!0,handler(t,e){const[r]=this.quill.getLine(t.index);if(r.prev)return Tr.call(this,r,t);{const t=T(r.formats()[r.statics.blotName]);r.replaceWith(U.blotName,t)}}}}function Nr(t){return{key:t,format:["table-list"],collapsed:!0,empty:!0,handler(t,e){const[r]=this.quill.getLine(t.index),n=r.parent.formats()[r.parent.statics.blotName];r.replaceWith(U.blotName,n)}}}function Tr(t,r){const n=this.quill.getModule("table-better");return t.remove(),null==n||n.tableMenus.updateMenus(),this.quill.setSelection(r.index-1,e().sources.SILENT),!1}wr.keyboardBindings=kr;var Ar=wr}(),i.default}()}));


/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

pimcore.registerNS("pimcore.bundle.quill.editor");
pimcore.bundle.quill.editor = Class.create({
    maxChars: -1,
    activeEditor: null,
    quills: new Map(),

    initialize: function () {
        if(!parent.pimcore.wysiwyg) {
            parent.pimcore.wysiwyg = {};
            parent.pimcore.wysiwyg.editors = [];
        }
        parent.pimcore.wysiwyg.editors.push('quill');
        document.addEventListener(parent.pimcore.events.initializeWysiwyg, this.initializeWysiwyg.bind(this));
        document.addEventListener(parent.pimcore.events.createWysiwyg, this.createWysiwyg.bind(this));
        document.addEventListener(parent.pimcore.events.onDropWysiwyg, this.onDropWysiwyg.bind(this));
        document.addEventListener(parent.pimcore.events.beforeDestroyWysiwyg, this.beforeDestroyWysiwyg.bind(this));
    },

    initializeWysiwyg: function (e) {
        if (e.detail.context === 'object') {
            if (!isNaN(e.detail.config.maxCharacters) && e.detail.config.maxCharacters > 0) {
                this.maxChars = e.detail.config.maxCharacters;
            } else {
                this.maxChars = -1;
            }
        }

        this.config = e.detail.config;

        if(this.config.toolbarConfig) {
            const elementCustomConfig = JSON.parse(this.config.toolbarConfig);
            this.config = mergeObject(this.config, elementCustomConfig);
        }

        const Parchment = Quill.import('parchment');

        Quill.register({
            'modules/table-better': QuillTableBetter,
        }, true);

        const pimcoreIdAttributor = new Parchment.Attributor('pimcore_id', 'pimcore_id', {
            scope: Parchment.Scope.INLINE
        });
        Quill.register(pimcoreIdAttributor);

        const pimcoreTypeAttributor = new Parchment.Attributor('pimcore_type', 'pimcore_type', {
            scope: Parchment.Scope.INLINE
        });
        Quill.register(pimcoreTypeAttributor);

        const pimcoreThumbnailAttributor = new Parchment.Attributor('pimcore_disable_thumbnail', 'pimcore_disable_thumbnail', {
            scope: Parchment.Scope.INLINE
        });
        Quill.register(pimcoreThumbnailAttributor);

        const cssClassAttributor = new Parchment.Attributor('class', 'class', {
            scope: Parchment.Scope.ANY
        });
        Quill.register(cssClassAttributor, true);

        const cssIdAttributor = new Parchment.Attributor('id', 'id', {
            scope: Parchment.Scope.ANY
        });
        Quill.register(cssIdAttributor, true);

        const inlineCssAttributor = new Parchment.Attributor('style', 'style', {
            scope: Parchment.Scope.ANY
        });
        Quill.register(inlineCssAttributor, true);

        this.createHtmlEditModal();
    },

    createWysiwyg: function (e) {
        const textareaId = e.detail.textarea.id ?? e.detail.textarea;
        document.getElementById(textareaId).removeAttribute('contenteditable');

        let subSpace = '';
        if (e.detail.context === 'document') {
            subSpace = 'editables';
        } else if (e.detail.context === 'object') {
            subSpace = 'tags';
        }

        let defaultConfig = {};
        if('' !== subSpace && pimcore[e.detail.context][subSpace]) {
            defaultConfig = pimcore[e.detail.context][subSpace].wysiwyg ? pimcore[e.detail.context][subSpace].wysiwyg.defaultEditorConfig : {};
        }

        const finalConfig = Object.assign({
            theme: 'snow',
            modules: { }
        }, defaultConfig, this.config);

        document.dispatchEvent(new CustomEvent(pimcore.events.createWysiwygConfig, {
            detail: {
                data: finalConfig,
                context: e.detail.context
            }
        }));

        this.setDefaultConfig(finalConfig);

        //Workaround: https://github.com/attoae/quill-table-better/issues/12#issuecomment-2347920271
        const textareaElement = document.getElementById(textareaId);
        const html = textareaElement.innerHTML;
        textareaElement.innerHTML = '';

        this.activeEditor = new Quill(`#${textareaId}`, finalConfig);
        this.quills.set(textareaId, this.activeEditor);

        this.setEditorContent(html);

        this.initializeToolbar();

        this.activeEditor.on('text-change', () => {
            const tableModule = this.activeEditor.getModule('table-better');
            tableModule?.deleteTableTemporary();
            document.dispatchEvent(new CustomEvent(pimcore.events.changeWysiwyg, {
                detail: {
                    e: {target:{id: textareaId}},
                    data: this.activeEditor.getSemanticHTML(),
                    context: e.detail.context
                }
            }));
            checkCharCount();
        });

        this.activeEditor.container.firstChild.onfocus = () => {
            this.activeEditor = this.quills.get(textareaId);
            this.showOnlyActiveToolbar();
        };

        const maxChars = this.maxChars;
        const checkCharCount = () => {
            this.activeEditor.root.style.border = '';
            this.activeEditor.root.setAttribute('title', '');

            const charCount = this.activeEditor.getLength();

            if (maxChars !== -1 && charCount > maxChars) {
                this.activeEditor.root.style.border = '1px solid red';
                this.activeEditor.root.setAttribute('title', t('maximum_length_is') + ' ' + maxChars);
            }
        };
        checkCharCount();
    },

    onDropWysiwyg: function (e) {
        this.activeEditor = this.quills.get(e.detail.textareaId);
        this.showOnlyActiveToolbar();

        let data = e.detail.data;

        const record = data.records[0];
        data = record.data;

        let textIsSelected = false;

        let retval = this.activeEditor.getSelection();
        if (!retval) {
            this.activeEditor.setSelection(0);
            retval = this.activeEditor.getSelection();
        }

        if (retval.length > 0) {
            textIsSelected = true;
        }

        const id = data.id;
        let uri = data.path;
        const browserPossibleExtensions = ["jpg", "jpeg", "gif", "png"];

        if (data.elementType === "asset") {
            if (data.type === "image" && textIsSelected === false) {
                if(this.activeEditor.options.formats && !this.activeEditor.options.formats.includes('image')) {
                    return;
                }

                // images bigger than 600px or formats which cannot be displayed by the browser directly will be
                // converted by the pimcore thumbnailing service so that they can be displayed in the editor
                let defaultWidth = 600;
                const additionalAttributes = {
                    width: `${defaultWidth}px`,
                    alt: 'asset_image',
                    pimcore_id: id,
                    pimcore_type: 'asset'
                };

                if (typeof data.imageWidth != "undefined") {
                    const route = 'pimcore_admin_asset_getimagethumbnail';
                    const params = {
                        id: id,
                        width: defaultWidth,
                        aspectratio: true
                    };

                    uri = Routing.generate(route, params);

                    if (data.imageWidth < defaultWidth
                      && in_arrayi(pimcore.helpers.getFileExtension(data.text),
                        browserPossibleExtensions)) {
                        uri = data.path;
                        additionalAttributes.pimcore_disable_thumbnail = true;
                    }

                    if (data.imageWidth < defaultWidth) {
                        additionalAttributes.defaultWidth = data.imageWidth;
                    }

                }

                this.activeEditor.insertEmbed(retval.index, 'image', uri, 'user');
                this.activeEditor.formatText(retval.index, 1, additionalAttributes);

                return true;
            } else {
                this.activeEditor.format('link', uri);
                this.activeEditor.format('pimcore_id', id);
                this.activeEditor.format('pimcore_type', 'asset');
                return true;
            }
        }

        this.activeEditor.format('link', uri);
        this.activeEditor.format('pimcore_id', id);
        if (data.elementType === "document" && (data.type === "page"
          || data.type === "hardlink" || data.type === "link")) {
            this.activeEditor.format('pimcore_type', 'document');
            return true;
        }

        if (data.elementType === "object") {
            this.activeEditor.format('pimcore_type', 'object');
            return true;
        }
    },

    beforeDestroyWysiwyg: function (e) {

    },

    setDefaultConfig: function (config) {
        const modules = config.modules
        if (!modules.hasOwnProperty('table')) {
            modules.table = false;
        }

        if (!modules.hasOwnProperty('table-better')) {
            modules['table-better'] = {
                language: 'en_US',
                menus: ['column', 'row', 'merge', 'table', 'cell', 'wrap', 'delete'],
                toolbarTable: true
            };
        }

        if(!modules.hasOwnProperty('keyboard')) {
            modules.keyboard = {
                bindings: QuillTableBetter.keyboardBindings
            };
        }

        if(!modules.hasOwnProperty('toolbar')) {
            modules.toolbar = {
                container: [
                    ['undo', 'redo'],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic'],
                    [{ align: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ indent: '-1' }, { indent: '+1' }],
                    ['blockquote'],
                    ['link', 'table-better'],
                    [ 'clean', 'html-edit'],
                ]
            };
        }

        if(!modules.hasOwnProperty('history')) {
            modules.history = {
                delay: 700,
                maxStack: 200,
                userOnly: true
            };
        }

        return config;
    },

    initializeToolbar: function () {
        this.createToolbarBtn(
            'undo',
            () => {this.activeEditor.history.undo()},
        );
        this.createToolbarBtn(
            'redo',
            () => {this.activeEditor.history.redo()},
        );
        this.createToolbarBtn(
            'html-edit',
            this.openHtmlEdit.bind(this)
        );

        this.setHiddenForToolbar(this.activeEditor, true);
    },

    createToolbarBtn: function (className, onClick, innerHTML = '') {
        const toolbarBtns = document.getElementsByClassName('ql-' + className);
        if (!toolbarBtns) {
            return;
        }
        for (let toolbarBtn of toolbarBtns) {
            toolbarBtn.innerHTML = innerHTML;
            toolbarBtn.onclick = function (e) {
                e.preventDefault();
                onClick(e);
            };
        }
    },

    showOnlyActiveToolbar: function () {
        this.quills.forEach ((editor) => {
            this.setHiddenForToolbar(editor, editor !== this.activeEditor);
        });
    },

    setHiddenForToolbar: function(editor, hidden) {
        const toolbar = editor.getModule("toolbar").container;
        toolbar.hidden = hidden;
    },

    createHtmlEditModal: function() {
        const rootNode = document.body;

        this.modalBackground = document.createElement('div');
        this.modalBackground.setAttribute('class', 'modal__bg');

        const modal = document.createElement('div');
        modal.setAttribute('class', 'modal__inner');

        const contentNode = document.createElement("div");

        const [header, closeBtn] = this.createModalHeader(this.modalBackground, t('HTML Edit'));
        contentNode.appendChild(header);
        contentNode.appendChild(closeBtn);

        const textarea = document.createElement('textarea');
        textarea.setAttribute('class', 'modal__inner-textarea');
        contentNode.appendChild(textarea);

        modal.appendChild(contentNode);
        this.modalBackground.appendChild(modal);
        rootNode.appendChild(this.modalBackground);

        document.addEventListener('click', (event) => {
              if (event.target === this.modalBackground) {
                  this.modalBackground.style.display = "none";
              }
        });

        contentNode.appendChild(
          this.createActionButtons(
            this.modalBackground,
            () => {
                const html = this.modalBackground.getElementsByTagName('textarea')[0].value;
                this.setEditorContent(html);
            }
          )
        );

        return this.modalBackground;
    },

    createModalHeader: function (modal, text)  {
        const header = document.createElement("span");
        header.innerHTML = text;

        const closeBtn = document.createElement("button");
        closeBtn.setAttribute('class', 'modal__close-btn');
        closeBtn.onclick = () => modal.style.display = "none";

        return [header, closeBtn];
    },

    createActionButtons: function (modal, onClickSave) {
        const container = document.createElement("div");
        container.setAttribute('class', 'modal__container-actions');
        const cancelBtn = document.createElement("button");
        cancelBtn.setAttribute('class', 'actions__cancel-btn');
        cancelBtn.innerHTML = t('cancel');
        cancelBtn.onclick = () => modal.style.display = "none";
        const saveBtn = document.createElement("button");
        saveBtn.setAttribute('class', 'actions__save-btn');
        saveBtn.innerHTML = t('save');
        saveBtn.onclick = () => {
            onClickSave();
            modal.style.display = "none"
        }
        container.appendChild(cancelBtn);
        container.appendChild(saveBtn);
        return container;
    },

    openHtmlEdit: function() {
        this.modalBackground.style.display = "block";
        const textarea = this.modalBackground.getElementsByTagName('textarea')[0];
        const tableModule = this.activeEditor.getModule('table-better');
        tableModule?.deleteTableTemporary();
        textarea.value = this.activeEditor.getSemanticHTML();
    },

    setEditorContent: function (html) {
        this.activeEditor.deleteText(0, this.activeEditor.getLength());
        const delta = this.activeEditor.clipboard.convert({
            html,
            text: '\n'
        });
        this.activeEditor.updateContents(delta, Quill.sources.USER);
    }
})

new pimcore.bundle.quill.editor();


