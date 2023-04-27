
(function () {
    let options = {
        patterns: {}
    };
    var colorPattern = function (hook, vm) {
        // Invoked one time when the docsify instance has mounted on the DOM
        hook.mounted(function () {
            let patterns = options.patterns;
          
        });
        // Invoked on each page load before new markdown is transformed to HTML.
        // Supports asynchronous tasks (see beforeEach documentation for details).
        hook.beforeEach(function (content, next) {
            let reg = new RegExp("\\[color=#([0-9A-F]{6})\\](.*?)\\[/color\\]", "g");
            let matchs = content.matchAll(reg);
            
            if (matchs) {
                for (const match of matchs) {
                    if (match && match[1] && match[2]) {
                        content = changeColorFromMatchs(content, match[0], match[2], match[1]);
                    }
                }
            }



            for (const [pattern, color] of Object.entries(options.patterns)) {
                let reg = new RegExp(`\\[${pattern}\\](.*?)\\[/${pattern}\\]`, "g");
                matchs = content.matchAll(reg);
                if (matchs) {
                    for (const match of matchs) {
                        if (match && match[1]) {
                            content = changeColorFromMatchs(content, match[0], match[1], color);
                        }
                    }
                }
            }

            next(content)
        });


        // Invoked on each page load after new HTML has been appended to the DOM
        hook.doneEach(function () {

        });



    };

    function changeColorFromMatchs(content, markdownText, text, color) {
        if (markdownText) {
            content = content.replace(markdownText, `<span class="bold" style="color:#` + color + `">` + text + `</span>`)
        }
        return content;
    }

    // Add plugin to docsify's plugin array
    $docsify = $docsify || {};
    $docsify.plugins = [].concat(colorPattern, $docsify.plugins || []);

    window.$docsify["colorPattern"] = Object.assign(options, window.$docsify["colorPattern"]);


}
)();
