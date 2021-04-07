/***********************************************************************
 *                                                                   _
 *       _____  _                           ____  _                 |_|
 *      |  _  |/ \   ____  ____ __ ___     / ___\/ \   __   _  ____  _
 *      | |_| || |  / __ \/ __ \\ '_  \ _ / /    | |___\ \ | |/ __ \| |
 *      |  _  || |__. ___/. ___/| | | ||_|\ \___ |  _  | |_| |. ___/| |
 *      |_/ \_|\___/\____|\____||_| |_|    \____/|_| |_|_____|\____||_|
 *
 *      ================================================================
 *                 More than a coder, More than a designer
 *      ================================================================
 *
 *
 *      - Document: index.js
 *      - Author: aleen42
 *      - Description: main entry
 *      - Create Time: Apr 7th, 2021
 *      - Update Time: Apr 7th, 2021
 *
 *
 **********************************************************************/

const $ = require('jquery');

module.exports = function () {
    let $copy;

    function detach($body) {
        $copy = [
            // need to ignore iframes, because:
            //   1. avoid reloading
            //   2. they needs to load by appending separately after detaching from DOM
            ...$body.find('*').addBack().contents().get()
                // include all text nodes
                // ignore iframe and nodes from it to the root
                .filter(t => t.nodeType === 3 || $(t).is(':not(:has(iframe)):not(iframe)'))
                // find the root node to detach
                .filter((t, i, collections) => collections.indexOf($(t).parent()[0]) === -1)
                .map($element => { // bookmark
                    $element = $($element);
                    const $contents = $element.parent().contents(), i = $contents.index($element);
                    return {
                        $parent: $element.parent(),
                        // indexes including text nodes
                        $next: i === $contents.length - 1 ? $() : $contents.eq(i + 1),
                        // use $.fn.detach to extract all data from DOM to memory to keep it safe
                        $element: $element.detach(),
                    };
                }),
            ...($copy || []),
        ];

        // detach iframe body recursively
        $body.find('iframe')[0] && detach($body.find('iframe').contents().find('body'));
        return $body;
    }

    // lock
    detach($(document.body));

    // unlock method
    return () => {
        if ($copy) {
            $copy.reverse() // reverse to ensure that next element restores first
                .forEach(({$parent, $next, $element}) => {
                    $.contains($parent[0], $next[0]) ? $next.before($element) : $parent.append($element);
                });
            $copy = null;
        }
    };
};
