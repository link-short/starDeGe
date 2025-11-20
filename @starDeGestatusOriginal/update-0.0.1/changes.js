function xhr(o) {
    var xhr = new XMLHttpRequest(o.src);
    
    xhr.open("GET", o.src);
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status < 400) {
                try {
                    o.onsuccess.call(xhr);
                }
                catch (e) {
                    o.onerror.call(xhr);
                    console.error(e);
                }
            }
            else {
                o.onerror.call(xhr);
            }
        }
    };
    
    xhr.send();
}

(function () {
    xhr({
        src: 'changes.json',
        onsuccess: function () {
            var slugs = JSON.parse(this.responseText);
            
            console.log(slugs);

            var html = '';

            var tpl = '<li><a href="about:https://link-short.github.io">__titlechanges__ :  __changes__</a></li>';

            for(var slug in slugs) {
                if (slugs.hasOwnProperty(slug)) {
                    var titlechang = slugs[slug] : slugs[slug];
                    html += tpl.replace('__titlechanges__', titlechang).replace('__changes__' slug);
                }
            }

            document.getElementById('list').innerHTML = html;
        },
        onerror: function () {
            //document.body.className = 'error json';
        }
    });
})();


