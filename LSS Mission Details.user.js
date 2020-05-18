// ==UserScript==
// @name         LSS Mission Details
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @updateUrl    https://github.com/mschaeling/lss_scripts/blob/master/LSS%20Mission%20Details.user.js
// @description  Receive information from mission helper button
// @author       MuckVanSchael
// @match        https://www.leitstellenspiel.de/
// @grant        none
// ==/UserScript==

const STYLE = `
<style>
#mission_detail_container { display: flex; padding: 1em 0; background-color: #efefef: }
.mission_detail_tab { width: 50%; }
.mission_detail_tab td { padding: 0 .5em; }
.mission_detail_tab tr td:first-child { font-size: .7em; width: 30%; }
.mission_detail_tab th { display: none; }
.mission_detail_tab_percent { opacity: .5; }
.mission_detail_tab_percent td:last-child:after { content: "%"; }
</style>
`;

const WRAPPER = '<div id="mission_detail_container">lädt...</div>';
const COLUMN = {'prefix': '<div class="mission_detail_tab"><table>', 'suffix': '</table></div>'};

function normalizeTable(index, element) {
    var html = '';
    switch (index) {
        case 0:
            element.find('tr').each(function(e){
                if ($(this).html().includes('Credits') || $(this).html().includes('Generiert')) {
                    html += '<tr>' + $(this).html() + '</tr>';
                }
            });
            break;
        case 1:
            element.find('tr').each(function(e){
                if ($(this).html().includes('ahrscheinlichkeit')) {
                    html += '<tr class="mission_detail_tab_percent">' + $(this).html().replace('Anforderungswahrscheinlichkeit', '') + '</tr>';
                } else {
                    html += '<tr>' + $(this).html().replace('Benötigte', '') + '</tr>';
                }
            });
            break;
        case 2:
            element.find('tr').each(function(e){
                if ($(this).html().includes('ahrscheinlichkeit')) {
                html += '<tr class="mission_detail_tab_percent">' + $(this).html() + '</tr>';
                } else {
                    html += '<tr>' + $(this).html() + '</tr>';
                }
            });
            break;
        default:
            break;
            }
return html;
}

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

            $($.parseHTML(data)).filter('#iframe-inside-container').find('.row table tbody:last-child').each(function(e){
                html += COLUMN.prefix + normalizeTable(e, $(this)) + COLUMN.suffix;
                if ($(this).html().includes('Rettungswache')) { contents.find('a[href="#rettungsdienst"]')[0].click(); }
                if ($(this).html().includes('Feuerwache')) { contents.find('a[href="#feuerwehr_lf"]')[0].click(); }
                if ($(this).html().includes('Polizeiwache')) { contents.find('a[href="#polizei"]')[0].click(); }
            });

            contents.find("#mission_detail_container").html(html);

        });

    }

})();
