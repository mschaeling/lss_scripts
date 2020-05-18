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
#mission_detail_container { display: flex; flex-wrap: wrap; padding: 1em 0; background-color: #efefef; }
#mission_detail_container .mission_detail_tab { width: 50%; background-color: #efefef; padding: .5em 0; }
#mission_detail_container .mission_detail_tab:first-child { width: 100%; margin-bottom: 1em; }
#mission_detail_container .mission_detail_tab:first-child table,
#mission_detail_container .mission_detail_tab:first-child table tbody { display: flex; width: 100%; justify-content: space-between; }
#mission_detail_container .mission_detail_tab:first-child table tbody tr,
#mission_detail_container .mission_detail_tab:first-child table tbody tr td { display: block; }
#mission_detail_container .mission_detail_tab td { padding: 0 .5em; }
#mission_detail_container .mission_detail_tab:first-child tr td:first-child { font-size: .7em; }
#mission_detail_container .mission_detail_tab th { display: none; }
#mission_detail_container .mission_detail_tab_percent { opacity: .5; }
#mission_detail_container .mission_detail_tab_percent td:last-child:after { content: "%"; }
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
                    html += '<tr class="mission_detail_tab_percent">' + $(this).html().replace('Anforderungswahrscheinlichkeit', '').replace('Drehleiter', '<b style="color: #FFC72E;">DLK</b>').replace('Rüstwagen', '<b style="color: #FFFF14;">RW</b>').replace('Löschfahrzeuge', '<b style="color: #FF0000;">LF</b>').replace('ELW 1', '<b style="color: #BE0AFF;">ELW 1</b>') + '</tr>';
                } else {
                    html += '<tr>' + $(this).html().replace('Benötigte', '').replace('Rüstwagen', '<b style="color: #FFFF14;">RW</b>').replace('Drehleitern', '<b style="color: #FFC72E;">DLK</b>').replace('Löschfahrzeuge', '<b style="color: #FF0000;">LF</b>').replace('ELW 1', '<b style="color: #BE0AFF;">ELW 1</b>').replace('Streifenwagen', '<b style="color: #03D5FF;">FuStW</b>') + '</tr>';
                }
            });
            break;
        case 2:
            element.find('tr').each(function(e){
                if ($(this).html().includes('ahrscheinlichkeit')) {
                    html += '<tr class="mission_detail_tab_percent">' + $(this).html().replace('Anforderungswahrscheinlichkeit', '').replace('Wahrscheinlichkeit, dass ein Patient transportiert werden muss', 'Transport nötig') + '</tr>';
                } else {
                    html += '<tr>' + $(this).html().replace('Fachrichtung für Patienten', 'Fachrichtung').replace('Maximale Patientenanzahl', 'Patienten MAX').replace('Mindest Patientenanzahl', 'Patienten MIN') + '</tr>';
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
                if (e == 0) {
                if ($(this).html().includes('Rettungswache')) { contents.find('a[href="#rettungsdienst"]')[0].click(); }
                if ($(this).html().includes('Feuerwache')) { contents.find('a[href="#feuerwehr_lf"]')[0].click(); }
                if ($(this).html().includes('Polizeiwache')) { contents.find('a[href="#polizei"]')[0].click(); }
                }
            });

            contents.find("#mission_detail_container").html(html);

        });

    }

})();
