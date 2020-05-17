// ==UserScript==
// @name         LSS Design
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://www.leitstellenspiel.de/
// @update       https://github.com/mschaeling/lss_scripts/edit/master/LSS%20Design.user.js
// @grant        none
// ==/UserScript==

function shortCredits() {
    $('#navigation_top').html($('#navigation_top').html().split('Credits: ')[1]);
    $('#coins_top').html($('#coins_top').html().split('Coins: ')[1]);
}

(function() {
    'use strict';

    $('head').append('<link href="https://raw.githubusercontent.com/mschaeling/lss_scripts/master/lss-design.css" rel="stylesheet" type="text/css">')

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
    $('#missions_outer').prepend('<div class="widget-toggler"><div class="widget-sticky"><span class="sticked glyphicon glyphicon-lock"></span><span class="free glyphicon glyphicon-lock"></span></div><span class="glyphicon glyphicon-asterisk"></span>Einsätze</div>').addClass('widget collapsed');
    $('#buildings_outer').append('<div class="widget-toggler"><div class="widget-sticky"><span class="sticked glyphicon glyphicon-lock"></span><span class="free glyphicon glyphicon-lock"></span></div><span class="glyphicon glyphicon-home"></span>Gebäude</div>').addClass('widget collapsed');
    $('#chat_outer').append('<div class="widget-toggler"><div class="widget-sticky"><span class="sticked glyphicon glyphicon-lock"></span><span class="free glyphicon glyphicon-lock"></span></div><span class="glyphicon glyphicon-comment"></span></div>').addClass('widget collapsed');
    $('#radio_outer').append('<div class="widget-toggler"><div class="widget-sticky"><span class="sticked glyphicon glyphicon-lock"></span><span class="free glyphicon glyphicon-lock"></span></div><span class="glyphicon glyphicon-bullhorn"></span></div>').addClass('widget collapsed');
    $('#chat_outer').prepend('<div id="chat-widget-notes" class="widget-notes"></div>');
    $('#radio_outer').prepend('<div id="radio-widget-notes" class="widget-notes"></div>');

    $('#missions_outer').addClass('sticky');

    $('.widget.collapsed .widget-toggler').on('mouseover', function(e) {
        $('.widget:not(.collapsed)').addClass('collapsed');
        $(e.target).closest('.widget').removeClass('collapsed note');
        $(e.target).closest('.widget').find('.widget-notes li').remove();
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
        $('#chat-widget-notes').append('<li class="noted">'+$('#mission_chat_messages').find('li').first().html()+'</li>');
        $('#chat_outer.collapsed').addClass('note');
    });

    map.invalidateSize();

    const radioMessageOrig = radioMessage;
    radioMessage = (...args) => {
        radioMessageOrig(...args);
        if(args[0].user_id ==user_id ) {
        $('#radio-widget-notes').append('<li class="noted">'+$('#radio_panel_body').find('li').first().html()+'</li>');
        $('#radio_outer.collapsed').addClass('note');
        }
    };
})();
