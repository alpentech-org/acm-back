(function () {
    var swaggerGenerator = function (hook, vm) {
        let url = "";
        let matchs = []
        let options = {
            i18n: {
                "fr": {
                  request: "Paramètres de la requête",
                  response: "Paramètres de la réponse",
                  name: "Nom",
                  type: "Type",
                  required: "Requis",
                  description: "Description",
                  none: "Null"
                }
              }
        }
        // Invoked one time when the docsify instance has mounted on the DOM
        hook.mounted(function () {

        });
        // Invoked on each page load before new markdown is transformed to HTML.
        // Supports asynchronous tasks (see beforeEach documentation for details).
        hook.beforeEach(function (content, next) {
            let reg = new RegExp("\\[swagger\\]\\((.*)\\)", "g");
            matchs = content.matchAll(reg);
            if(matchs)
            {
                for (const match of matchs) {
                    if (match && match[1]) {
    
                        let param = match[1];
                        let id = param.split("/")[1].replace(".json", "");
                        url = window.location.origin + "/" + param
                        content = content.replace(match[0], `<div id="` + id + `" version="` + param.split("/")[0] + `" class="swaggerContainer loading">`+options.loading+`</div>`)
                    }
                }   
            }
            next(content)
        
            

        });


        // Invoked on each page load after new HTML has been appended to the DOM
        hook.doneEach(function (conten, t) {
            let swaggerContainers = document.querySelectorAll(".swaggerContainer") || []

            if (swaggerContainers) {
                swaggerContainers.forEach(container => {
                    let version = container.attributes.version.value
                    SwaggerUIBundle({
                      url: "./"+version+"/"+container.id+".json",
                      dom_id: "#"+container.id,
                      presets: [SwaggerUIBundle.presets.apis],
                      layout: "BaseLayout",
                      deepLinking: true,
                      docExpansion: "none",
                      operationsSorter: "alpha",
                      defaultModelsExpandDepth: -1,
                      docExpansion: "list"
                    });
                    container.classList.remove("loading")
                    let opblocks = document.querySelectorAll(".opblock-tag-section")
                    if(opblocks.length)
                    {
                        opblocks.forEach(opblock => {
                            opblock.classList.add("is-open")
                            opblock.click();
                        });
                    }
                 
                    
                });
            }
            console.log(t)
        });



    };

    // Add plugin to docsify's plugin array
    $docsify = $docsify || {};
    $docsify.plugins = [].concat(swaggerGenerator, $docsify.plugins || []);
})();