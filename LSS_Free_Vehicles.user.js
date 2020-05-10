// ==UserScript==
// @name         LSS Free Vehicles
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.leitstellenspiel.de/
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
#vhc_bar {padding: 0 0 1em 0;}
#vhc_free, #vhc_occupied {display: inline-block;}
.vhc_display {display: inline-block; padding: .25em; margin-left: .25em; margin-right: 1em; background: rgba(0,0,0,.1);}
.vhc_amount {padding-left: .5em; padding-right: .25em; font-weight: 800;}
.vhc_type {font-size:.8em; padding-left: .25em; padding-right: .25em;}
`);

var USE_CACHE = true;
var SHOW_OCCUPIED = true;

// https://forum.leitstellenspiel.de/index.php?thread/8406-infos-f%C3%BCr-entwickler/
var VEHICLES = {
    0: "LF 20",
    2: "DLK 23",
    3: "ELW 1",
    4: "RW",
    28: "RTW",
    32: "FuStW",
    38: "KTW",
};

function free_vehicles() {
    var vehicles = {};

    $.get( 'https://www.leitstellenspiel.de/api/vehicles', function( data ) {

        for (var item in data) {
            if (data[item].fms_real < 3) {
                if (typeof vehicles[data[item].vehicle_type] == "undefined") {
                    vehicles[data[item].vehicle_type] = 0;
                }
                vehicles[data[item].vehicle_type]++;
            }
        }

        var html = '';

        html += '<span class="building_list_fms building_list_fms_1">1</span>';
        html += '<span class="building_list_fms building_list_fms_2">2</span>';
        html += '<div class="vhc_display">';

        for (var entry in vehicles) {
            html += '<span class="vhc_amount">' + vehicles[entry] + '</span>';
            html += '<span style="vhc_type">' + VEHICLES[entry] + '</span>';
        }

        html += '</div>';

        $('#vhc_free').html(html);

    });

}

function occupied_vehicles() {
    $.get( 'https://www.leitstellenspiel.de/api/vehicle_states', function( data ) {

        var html = '';

        for (var item in data) {
            if (item > 2) {
                html += '<span class="building_list_fms building_list_fms_' + item + '">' + item + '</span>';
                html += '<div class="vhc_display">' + data[item] + '</div>';
            }
        }

        $('#vhc_occupied').html(html);

    });
}

(function() {
    'use strict';

    $.ajaxSetup({cache: USE_CACHE});

    $('#main_container').prepend('<div id="vhc_bar"><div id="vhc_free"></div><div id="vhc_occupied"></div></div>');

    $("body").on('DOMSubtreeModified', "#radio", function() {
        free_vehicles();

        if (SHOW_OCCUPIED) {
            occupied_vehicles();
        }
    });

})();