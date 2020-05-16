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

#vhc_bar {
position: fixed;
top: calc(51px + 1em);
left: 1em;
z-index: 401;
padding: .25em;
background-color: #FFF;
-webkit-box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.75);
box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.75);
}

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
border: none;
}

.navbar-default {
border-color: #c9302c;
}

#main_navbar {
-webkit-box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.75);
box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.75);
}

#row-main-template {
display: contents;
}
#main_container {
  overflow: hidden;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

#map_expand_button {
display: none;
}

#main_container > .alert {
position: fixed;
    top: calc(51px + 1em);
    left: 5em;
    z-index: 402;
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


#important_messages_success {
position: fixed;
    bottom: 6em;
    width: 80%;
    left: 1em;
    top: unset;
max-width: calc(66.66% - 1em);
}
.client-id {
  display: none;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.widget::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE and Edge */
.widget {
  -ms-overflow-style: none;
}

.widget, #vhc-bar {
-webkit-box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.75);
box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.75);
}

.widget .panel-heading {
background: none;
border: none;
}

.widget > div > .panel,
.widget > .panel {
border: none;
}

.widget .panel-body {
padding-left: 0;
padding-right: 0;
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

#building_panel_heading,
#chat_panel_heading {
    padding: 0;
    display: flex;
}

#building_panel_heading .btn-group,
#chat_panel_heading .btn-group {
    position: relative;
    display: flex;
    justify-content: stretch;
    flex-grow: 1;
margin: 1em 0;
}


#building_panel_heading .btn-group a,
#chat_panel_heading .btn-group button {
    flex-grow: 1;
    border: none;
    background: #c9302c;
    color: #FFF;
    border-radius: 0;
    padding: .5em;
}

#building_panel_heading .btn-group a:hover,
#chat_panel_heading .btn-group button:hover{
    opacity: .8;
}

#building_panel_heading .btn-group a:first-child {
margin-right: .5em;
}

#btn-group-building-select {
display: flex;
margin-bottom: 1em;
}

#buildings .building_selection {
text-transform: uppercase;
width: calc(100% / 7);
}

#building_panel_heading .btn-group a:last-child {
margin-left: .5em;
}

.building_list_vehicles {
display: flex;
    flex-wrap: wrap;
justify-content: space-between;
}

.building_list_vehicles a.btn.backalarm {
    width: 100%;
    margin-top: .25em;
}

.building_list_vehicle_element {
width: calc(50% - .5em);
overflow: hidden;
border: 1px solid rgba(0,0,0,.1);
    padding: .25em;
}

#chat_panel_body {
padding-top: 0;
}

#chat_outer .panel-body {
padding: 0;
}

#alliance_chat_message {
border-radius: 0;
}

#new_alliance_chat .input-group-addon {
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
margin: 0;
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
display: flex;
justify-content: space-between;
}


#btn-group-mission-select .btn {
  width: 20%;
border-radius: 0;
padding: .5em;
}

#search_input_field_missions {
  margin: .5em 0 .5em 0;
  width: 100%;
  border: none;
  background-color: rgba(0,0,0,.1);
  padding: .5em;
border-radius: 0;
background-image: none;
}

.missions-panel-head.big_map_window_head > strong {
  display: none;
}
#missions-panel-body {
 padding: 0;
}

#missions .panel-heading {
background: transparent !important;
border: none;
}

#missions .panel-body .col-xs-1 {
display: none;
}

#missions .alert {
font-size: .8em;
padding: .25em;
border-radius: 0;
}

#building_panel_body {
padding-top: 0;
}

#chat_panel_body {
width: 100%;
}

.widget.note {
color: #f44336;
background-color: #ffcdd2;
}

`);

function shortCredits() {
    $('#navigation_top').html($('#navigation_top').html().split('Credits: ')[1]);
    $('#coins_top').html($('#coins_top').html().split('Coins: ')[1]);
}

(function() {
    'use strict';

    $('br').hide();

    $('#building_panel_heading').html($('#building_panel_heading').html().split('Wachen')[1]);
    $('#chat_panel_heading').html($('#chat_panel_heading').html().split('Chat')[0]);


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

    $('#missions_outer').addClass('sticky');

    $('.widget.collapsed .widget-toggler').on('mouseover', function(e) {
        $('.widget:not(.collapsed)').addClass('collapsed');
        $(e.target).closest('.widget').removeClass('collapsed note');
    });

    $('.widget-sticky').on('click', function(e) {
        $(e.target).closest('.widget').toggleClass('sticky');
    });

    $('#map').on('mouseover', function(e) {
        $('.widget').addClass('collapsed');
    });

    $('#buildings .building_selection').each(function(){
        $(this).html($(this).html().substr(0,3));
    });

    $("body").on('DOMSubtreeModified', "#mission_chat_messages", function() {
        $('#chat_outer.collapsed').addClass('note');
    });


    $("body").on('DOMSubtreeModified', "#radio_panel_body", function() {
        $('#radio_outer.collapsed').addClass('note');
    });

})();
