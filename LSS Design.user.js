// ==UserScript==
// @name         LSS Design
// @namespace    http://tampermonkey.net/
// @version      0.6.9.5
// @description  Redesign of LSS
// @author       MuckVanSchael
// @match        https://www.leitstellenspiel.de/
// @update       https://github.com/mschaeling/lss_scripts/edit/master/LSS%20Design.user.js
// @grant        none
// ==/UserScript==

const STYLE = `
<style>

body,
html {
  display        : flex;
  width          : 100%;
  min-width      : 100%;
  max-width      : 100%;
  height         : 100%;
  min-height     : 100%;
  max-height     : 100%;
  flex-direction : column;
}

#main_navbar {
  margin : 0;
  border : none;
}

.navbar-default {
  border-color : #c9302c;
}

#row-main-template {
  display : contents;
}

#main_container {
  display        : flex;
  overflow       : hidden;
  flex-direction : column;
  flex-grow      : 1;
}

#map_expand_button {
  display : none;
}

body > .alert {
  z-index  : 402 !important;
  position : fixed !important;
  top      : calc(51px + 1em) !important;
  left     : 5em !important;
}

#content {
  display        : flex;
  flex-direction : column;
  flex-grow      : 1;
}

footer {
  display : none;
}

#map_outer {
  flex-grow : 1;
}

#map {
  height : 100% !important;
}

#map .leaflet-top.leaflet-left {
  left : 1em;
}

.leaflet-control-container {
  z-index  : 400;
  position : absolute;
  top      : 1em;
  left     : 1em;
}

body > .alert {
  position      : fixed !important;
  top           : calc(51px + 1em) !important;
  left          : 25% !important;
  width         : 50% !important;
  border-radius : 0 !important;
}

.client-id {
  display : none;
}

/* Hide scrollbar for Chrome, Safari and Opera */

.widget::-webkit-scrollbar {
  display : none;
}

/* Hide scrollbar for IE and Edge */

.widget {}

body > .alert,
#main_navbar,
.widget,
li.noted {
  -moz-box-shadow    : 2px 2px 8px 0px rgba(0,0,0,0.75) !important;
  -webkit-box-shadow : 2px 2px 8px 0px rgba(0,0,0,0.75) !important;
  box-shadow         : 2px 2px 8px 0px rgba(0,0,0,0.75) !important;
}

.widget .panel-heading {
  border     : none;
  background : none;
}

.widget > .panel,
.widget > div > .panel {
  border : none;
}

.widget .panel-body {
  padding-right : 0;
  padding-left  : 0;
}

.widget-toggler {
  padding : 1em .25em;
}

.widget-sticky {
  float : right;
}

.widget .sticked {
  display : none;
  color   : grey;
}

.widget.sticky .sticked {
  display : inline-block;
}

.widget .free {
  display : inline-block;
  color   : lightgrey;
}

.widget.sticky .free {
  display : none;
}

#chat_outer.collapsed:not(.sticky) {
  display         : flex;
  width           : 3em;
  height          : 3em;
  padding         : 0;
  border-radius   : 100%;
  justify-content : center;
}

#chat_outer.collapsed:not(.sticky) .widget-toggler {
  width      : 3em;
  height     : 3em;
  text-align : center;
}

#chat_outer.collapsed:not(.sticky) .widget-sticky {
  display : none;
}

#radio_outer.collapsed:not(.sticky) {
  display         : flex;
  left            : calc(66.66% - 4em);
  width           : 3em;
  height          : 3em;
  padding         : 0;
  border-radius   : 100%;
  justify-content : center;
}

#radio_outer.collapsed:not(.sticky) .widget-toggler {
  width      : 3em;
  height     : 3em;
  text-align : center;
}

#radio_outer.collapsed:not(.sticky) .widget-sticky {
  display : none;
}

div#radio-widget-notes {
  display    : block;
  position   : fixed;
  right      : calc(33.33% + 5em);
  bottom     : 1.5em;
  width      : calc(33.33% - 5em);
  text-align : right;
}

div#radio-widget-notes li.noted {
  display          : none;
  margin-top       : .5em;
  padding          : .25em;
  background-color : #fff;
}

div#radio-widget-notes li.noted:nth-last-of-type(-n + 5) {
  display : inline-block;
}

.overview_outer.bigMapWindow {
  z-index    : 401;
  position   : absolute;
  width      : calc(33.33% - 2em);
  overflow   : scroll;
  background : #FFF;
}

#missions_outer {
  top    : calc(51px + 1em);
  right  : 1em;
  height : calc(100% - 51px - 2em);
}

#missions_outer.collapsed:not(.sticky) {
  height : auto;
}

#buildings_outer {
  bottom : 1em;
  left   : calc(66.66% + 1em);
}

#chat_outer {
  bottom : 1em;
  left   : 1em;
}

#radio_outer {
  bottom : 1em;
  left   : calc(33.33% + 1em);
}

.overview_outer.collapsed:not(.sticky) > div:not(.widget-toggler) {
  display : none;
}

#building_panel_heading,
#chat_panel_heading {
  display : flex;
  padding : 0;
}

#building_panel_heading .btn-group,
#chat_panel_heading .btn-group {
  display         : flex;
  position        : relative;
  margin          : 1em 0;
  flex-grow       : 1;
  justify-content : stretch;
}

#building_panel_heading .btn-group a,
#chat_panel_heading .btn-group button {
  padding       : .5em;
  color         : #FFF;
  border        : none;
  border-radius : 0;
  background    : #c9302c;
  flex-grow     : 1;
}

#building_panel_heading .btn-group a:hover,
#chat_panel_heading .btn-group button:hover {
  opacity : .8;
}

#building_panel_heading .btn-group a:first-child {
  margin-right : .5em;
}

#btn-group-building-select {
  display       : flex;
  margin-bottom : 1em;
}

#buildings .building_selection {
  width          : calc(100% / 7);
  text-transform : uppercase;
}

#building_panel_heading .btn-group a:last-child {
  margin-left : .5em;
}

.building_list_vehicles {
  display         : flex;
  flex-wrap       : wrap;
  justify-content : space-between;
}

.building_list_vehicles a.btn.backalarm {
  width      : 100%;
  margin-top : .25em;
}

.building_list_vehicle_element {
  width    : calc(50% - .5em);
  padding  : .25em;
  overflow : hidden;
  border   : 1px solid rgba(0,0,0,.1);
}

#chat_panel_body {
  padding-top : 0;
}

#chat_outer .panel-body {
  padding : 0;
}

#alliance_chat_message {
  border-radius : 0;
}

#new_alliance_chat .input-group-addon {
  display : none;
}

.alert {
  padding : .25em;
}

div[id^="mission_panel_"] .panel-heading {
  padding : .5em !important;
}

div[id^="mission_panel_"] .panel-body {
  padding : 0 .5em .5em .5em !important;
}

#navigation_top {
  color       : yellow !important;
  background  : rgba(255,255,255,.25);
  font-weight : 800;
}

#coins_top {
  color       : yellowgreen !important;
  background  : rgba(255,255,255,.125);
  font-weight : 800;
}

#message_top {
  position : absolute;
  top      : 41px;
  left     : 14px;
}

#map_adress_search {
  height     : 35px;
  margin     : 0;
  padding    : 0 .5em;
  border     : none;
  background : rgba(255,255,255,.2);
}

#map_adress_search::placeholder {
  color : rgba(255,255,255,.8);
}

#lssm_menu_switch > span {
  display  : block;
  width    : 2em;
  height   : 2em;
  overflow : hidden;
}

#col_navbar_holder .dropdown-toggle > .caret {
  display : none;
}

.progress.mission_progress,
.progress.patient_progress {
  height : 2px !important;
}

#ktw_no_transports {
  margin-bottom : 1.25em;
  font-size     : .5em;
}

div[id^="mission_missing_"] {
  margin-top : .25em;
}

div[id^="mission_patients_"] {
  margin-top : .5em;
}

#btn-group-mission-select {
  display         : flex;
  width           : 100%;
  justify-content : space-between;
}

#btn-group-mission-select .btn {
  width         : 20%;
  padding       : .5em;
  border-radius : 0;
}

#search_input_field_missions {
  width            : 100%;
  margin           : .5em 0 .5em 0;
  padding          : .5em;
  border           : none;
  border-radius    : 0;
  background-image : none;
  background-color : rgba(0,0,0,.1);
}

.missions-panel-head.big_map_window_head > strong {
  display : none;
}

#missions-panel-body {
  height  : 100%;
  padding : 0;
}

#missions .panel-heading {
  border     : none;
  background : transparent !important;
}

#missions .panel-body .col-xs-1 {
  display : none;
}

#missions .alert {
  padding       : .25em;
  border-radius : 0;
  font-size     : .8em;
}

#building_panel_body {
  padding-top : 0;
}

#chat_panel_body {
  width : 100%;
}

#buildings_outer {
  display : none;
}

#chat_outer.note {
  color            : white;
  background-color : red;
}

</style>
`;

function shortCredits() {
  $('#navigation_top').html($('#navigation_top').html().split('Credits: ')[1]);
  $('#coins_top').html($('#coins_top').html().split('Coins: ')[1]);
}

function widgetTogglerHtml(icon, label) {
  return `
    <div class="widget-toggler">
     <div class="widget-sticky">
      <span class="sticked glyphicon glyphicon-lock"></span>
      <span class="free glyphicon glyphicon-lock"></span>
     </div>
     <span class="glyphicon glyphicon-${icon}"></span>
     <span class="widget-toggler-label">${label}</span>
    </div>
  `;
}

function radioNoteHtml(e) {
  return `
    <span title="${e.fms_text}" class="building_list_fms building_list_fms_${e.fms_real}">${e.fms_real}</span>
    <img src="/images/icons8-location_off.svg" class="vehicle_search " vehicle_id="${e.id}">
    <a href="/vehicles/${e.id}" class="btn btn-xs btn-default lightbox-open">${e.caption}</a> <a href="/missions/${e.mission_id}" class="btn btn-xs btn-default lightbox-open">Zum Einsatz</a>
  `;
}

(function() {
  'use strict';

  $('head').append(STYLE);

  $('br, hr').hide();

  $('#main_container').removeClass('container-fluid');
  $('#map_outer').removeClass('col-sm-8');

  $('#building_panel_heading').html($('#building_panel_heading').html().split('Wachen')[1]);
  $('#chat_panel_heading').html($('#chat_panel_heading').html().split('Chat')[0]);
  $('#search_input_field_missions').attr('placeholder', 'Einsätze suchen...');

  // TODO: refactor to event/function call
  shortCredits();

  $("body").on('DOMSubtreeModified', "#navigation_top", function() {
    shortCredits();
  });

  // hide message alert if no messages
  var messages_count = parseInt($('#message_top').html())
  if (messages_count == 0) {
    $('#message_top').hide();
  }

  // peronal -> remove
  $('#navbar-main-collapse').prepend('<a href="/buildings/7100463" building_type="7" class="btn btn-xs btn-default lightbox-open" id="building_button_7100463" style="margin-top: 14px;">Leitstelle</a>');

  // widgets
  $('#missions_outer').prepend(widgetTogglerHtml('asterisk', 'Einsätze')).addClass('widget collapsed');
  $('#buildings_outer').append(widgetTogglerHtml('home', 'Gebäude')).addClass('widget collapsed');
  $('#chat_outer').append(widgetTogglerHtml('comment', '')).addClass('widget collapsed');
  $('#radio_outer').append(widgetTogglerHtml('bullhorn', '')).addClass('widget collapsed');
  $('#chat_outer').prepend('<div id="chat-widget-notes" class="widget-notes"></div>');
  $('#radio_outer').prepend('<div id="radio-widget-notes" class="widget-notes"></div>');

  $('#missions_outer').addClass('sticky');

  // reset map
  map.invalidateSize();

  // Collapse widgets on hover a toggler
  $('.widget.collapsed .widget-toggler').on('mouseover', function(e) {
    $('.widget:not(.collapsed)').addClass('collapsed');
    $(e.target).closest('.widget').removeClass('collapsed note');
    $(e.target).closest('.widget').find('.widget-notes li').remove();
  });

  // Collapse widgets on mouse on map
  $('#map').on('mouseover', function(e) {
    $('.widget').addClass('collapsed');
  });

  // Make widget sticky
  $('.widget-sticky').on('click', function(e) {
    $(e.target).closest('.widget').toggleClass('sticky');
  });

  $('#buildings .building_selection').each(function() {
    $(this).html($(this).html().substr(0, 3));
  });

  const allianceMessageNewOrig = allianceMessageNew;
  allianceMessageNew = (...args) => {
    allianceMessageNewOrig(...args);
    $('#chat-widget-notes').append('<li class="noted">' + $('#mission_chat_messages').find('li').first().html() + '</li>');
    $('#chat_outer.collapsed').addClass('note');
  };

  const radioMessageOrig = radioMessage;
  radioMessage = (...args) => {
    radioMessageOrig(...args);
    console.log(args[0]);
    if (args[0].user_id == user_id) {
      if ($('#radio-note-' + args[0].id).length) {
        $('#radio-note-' + args[0].id).remove();
      }
      $('#radio-widget-notes').append('<li id="radio-note-' + args[0].id + '" class="noted">' + radioNoteHtml(args[0]) + '</li>');
      $('#radio_outer.collapsed').addClass('note');
    }
  };

})();
