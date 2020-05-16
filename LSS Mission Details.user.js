// ==UserScript==
// @name         LSS Mission Details
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.leitstellenspiel.de/
// @grant        none
// ==/UserScript==

const STYLE = `
<style>
#mission_detail_container { display: flex; padding: 1em 0; background-color: #efefef: }
.mission_detail_tab { width: 33%; }
.mission_detail_tab td { padding: 0 .5em; }
.mission_detail_tab tr td:first-child { font-size: .7em; width: 30%; }
.mission_detail_tab th { display: none; }
</style>
`;

const WRAPPER = '<div id="mission_detail_container">lädt...</div>';
const COLUMN = {'prefix': '<div class="mission_detail_tab"><table>', 'suffix': '</table></div>'};

(function() {
    'use strict';

    var old_lightboxShowClose = window.lightboxShowClose;

    window.lightboxShowClose = function(e) {

        old_lightboxShowClose(e);

        var contents = $("#lightbox_iframe_" + iframe_lightbox_number).contents();

        contents.find("head").append(STYLE);
        contents.find("#col_right").prepend(WRAPPER);

        $.get(contents.find("#mission_help").attr('href'), function(data){

            var html = '';

            $($.parseHTML(data)).filter('#iframe-inside-container').find('.row table').each(function(e){
                if (e > 0) {
                    html += COLUMN.prefix + $(this).html() + COLUMN.suffix;
                }
            });

            contents.find("#mission_detail_container").html(html);

        });

    }

})();
