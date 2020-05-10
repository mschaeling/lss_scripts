// ==UserScript==
// @name         LSS Design
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.leitstellenspiel.de/
// @grant        GM_addStyle
// ==/UserScript==


GM_addStyle(`

#vhc_bar { display: none; }

body, html {
  display: flex;
  flex-direction: column;
  min-width: 100%;
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  height: 100%;
  max-height: 100%;
}

#main_navbar {
  margin: 0;
}

#main_container {
  overflow: hidden;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

#content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

footer {
  display: none;
}

#map_outer {
  flex-grow: 1;
}

#map {
  height: 100% !important;
}

#map .leaflet-top.leaflet-left {
  left: 1em;
}

.leaflet-control-container {
z-index: 400;
position: absolute;
top: 1em;
left: 1em;
}


#important_messages_success,
.client-id {
  display: none;
}

.widget {
-webkit-box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.75);
box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.75);
}

.widget-toggler {
  padding: 1em .25em;
}

.widget-sticky {
  float: right;
}

.widget .sticked {
  display: none;
  color: grey;
}

.widget.sticky .sticked {
  display: inline-block;
}

.widget .free {
  display: inline-block;
  color: lightgrey;
}

.widget.sticky .free {
  display: none;
}

.overview_outer.bigMapWindow {
  position: absolute;
  background: #FFF;
  overflow: scroll;
  z-index: 401;
  width: calc(33.33% - 2em);
}

#missions_outer {right: 1em; top: calc(51px + 1em);}
#buildings_outer {left: 1em; bottom: 1em;}
#chat_outer {left: calc(33.33% + 1em); bottom: 1em;}
#radio_outer {left: calc(66.66% + 1em); bottom: 1em;}

.overview_outer.collapsed:not(.sticky) > div:not(.widget-toggler) {
  display: none;
}




.alert {
  padding: .25em;
}

div[id^="mission_panel_"] .panel-heading {
  padding: .5em !important;
}

div[id^="mission_panel_"] .panel-body {
  padding: 0 .5em .5em .5em !important;
}

#navigation_top {
  font-weight: 800;
  color: yellow !important;
  background: rgba(255,255,255,.25);
}

#coins_top {
  font-weight: 800;
  color: yellowgreen !important;
  background: rgba(255,255,255,.125);
}

#message_top {
  position: absolute;
  left: 14px;
  top: 41px;
}

#map_adress_search {
  height: 35px;
  border: none;
  padding: 0 .5em;
  background: rgba(255,255,255,.2);
}

#map_adress_search::placeholder {
  color: rgba(255,255,255,.8);
}

#lssm_menu_switch > span {
  display: block;
  width: 2em;
  height: 2em;
  overflow: hidden;
}

#col_navbar_holder .dropdown-toggle > .caret {
  display: none;
}

.progress.patient_progress,
.progress.mission_progress {
  height: 2px !important;
}

#ktw_no_transports {
  font-size: .5em;
  margin-bottom: 1.25em;
}

div[id^="mission_missing_"] {
  margin-top: .25em;
}


div[id^="mission_patients_"] {
  margin-top: .5em;
}

#btn-group-mission-select {
  width: 100%;
  padding-right: 20px;
}

#search_input_field_missions {
  margin: .5em 0 .5em 0;
  width: calc(100% - 1.5em);
  border: none;
  background-color: rgba(0,0,0,.1);
  padding: .25em .5em;
}

.missions-panel-head.big_map_window_head > strong {
  display: none;
}



`);

function shortCredits() {
    $('#navigation_top').html($('#navigation_top').html().split('Credits: ')[1]);
    $('#coins_top').html($('#coins_top').html().split('Coins: ')[1]);
}

(function() {
    'use strict';

    $('#search_input_field_missions').attr('placeholder', 'Einsätze suchen...');

    shortCredits();
    $("body").on('DOMSubtreeModified', "#navigation_top", function() {
        shortCredits();
    });

    // hide message alert if no messages
    var messages_count = parseInt($('#message_top').html())
    if (messages_count == 0) {
        $('#message_top').hide();
    }

    $('hr').hide();
    $('#main_container').removeClass('container-fluid');
    $('#map_outer').removeClass('col-sm-8');
    $('#navbar-main-collapse').prepend('<a href="/buildings/7100463" building_type="7" class="btn btn-xs btn-default lightbox-open" id="building_button_7100463" style="margin-top: 14px;">Leitstelle</a>');

    // widgets
    $('#missions_outer').prepend('<div class="widget-toggler"><div class="widget-sticky"><span class="sticked glyphicon glyphicon-lock"></span><span class="free glyphicon glyphicon-lock"></span></div><span class="glyphicon glyphicon-asterisk" style="margin-right: .5em;"></span>Einsätze</div>').addClass('widget collapsed');
    $('#buildings_outer').append('<div class="widget-toggler"><div class="widget-sticky"><span class="sticked glyphicon glyphicon-lock"></span><span class="free glyphicon glyphicon-lock"></span></div><span class="glyphicon glyphicon-home" style="margin-right: .5em;"></span>Gebäude</div>').addClass('widget collapsed');
    $('#chat_outer').append('<div class="widget-toggler"><div class="widget-sticky"><span class="sticked glyphicon glyphicon-lock"></span><span class="free glyphicon glyphicon-lock"></span></div><span class="glyphicon glyphicon-comment" style="margin-right: .5em;"></span>Chat</div>').addClass('widget collapsed');
    $('#radio_outer').append('<div class="widget-toggler"><div class="widget-sticky"><span class="sticked glyphicon glyphicon-lock"></span><span class="free glyphicon glyphicon-lock"></span></div><span class="glyphicon glyphicon-bullhorn" style="margin-right: .5em;"></span>Radio</div>').addClass('widget collapsed');

    $('.widget.collapsed .widget-toggler').on('mouseover', function(e) {
        $('.widget:not(.collapsed)').addClass('collapsed');
        $(e.target).closest('.widget').removeClass('collapsed');
    });

    $('.widget-sticky').on('click', function(e) {
        $(e.target).closest('.widget').toggleClass('sticky');
    });

    $('#map').on('mouseover', function(e) {
        $('.widget').addClass('collapsed');
    });

})();