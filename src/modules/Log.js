/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2014 Dario Giovannetti <dev@dariogiovannetti.net>
 *
 *  This file is part of Wiki Monkey.
 *
 *  Wiki Monkey is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Wiki Monkey is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
 */

WM.Log = new function () {
    "use strict";

    this._makeLogArea = function () {
        GM_addStyle("#WikiMonkeyLogArea {height:10em; " +
                        "border:2px solid #07b; padding:0.5em; " +
                        "overflow:auto; resize:vertical; " +
                        "background-color:#111;} " +
                    "#WikiMonkeyLogArea p.timestamp, " +
                        "#WikiMonkeyLog p.message {border:none; padding:0; " +
                        "font-family:monospace; color:#eee;} " +
                    "#WikiMonkeyLogArea p.timestamp {float:left; width:5em; " +
                        "margin:0 -5em 0 0; font-size:0.9em;} " +
                    "#WikiMonkeyLogArea p.message {margin:0 0 0.5em 5em;} " +
                    "#WikiMonkeyLogArea div.mhidden {display:none;} " +
                    "#WikiMonkeyLogArea div.mdebug p.message {color:cyan;} " +
                    "#WikiMonkeyLogArea div.minfo {} " +
                    // The .warning and .error classes are already used by
                    // MediaWiki, without associating them with an id and a tag
                    "#WikiMonkeyLogArea div.mwarning p.message " +
                        "{color:gold;} " +
                    "#WikiMonkeyLogArea div.merror p.message {color:red;} " +
                    "#WikiMonkeyLogArea a {color:inherit; " +
                                                "text-decoration:underline;}");

        var log = document.createElement('div');
        log.id = 'WikiMonkeyLog';

        var par = document.createElement('p');
        par.appendChild(makeFilterLink());
        par.appendChild(document.createTextNode(' '));
        par.appendChild(makeSaveLink());
        log.appendChild(par);

        var logarea = document.createElement('div');
        logarea.id = 'WikiMonkeyLogArea';
        log.appendChild(logarea);

        return log;
    };

    var makeFilterLink = function () {
        var link = document.createElement('a');
        link.href = '#WikiMonkey';
        link.innerHTML = computeFilterLinkAnchor();

        link.addEventListener("click", function () {
            // Change _currentInfoDisplayState *before* the loop, to prevent
            // race bugs
            WM.Log._currentInfoDisplayState = !WM.Log._currentInfoDisplayState;
            this.innerHTML = computeFilterLinkAnchor();

            var msgs = document.getElementById('WikiMonkeyLogArea'
                                            ).getElementsByClassName('minfo');

            for (var m = 0; m < msgs.length; m++) {
                msgs[m].style.display = computeInfoDisplayStyle();
            }

            scrollToBottom();
        }, false);

        return link;
    };

    var makeSaveLink = function () {
        var link = document.createElement('a');
        link.href = '#';
        link.download = 'WikiMonkey.log';
        link.innerHTML = '[save log]';
        link.id = 'WikiMonkeyLog-Save';

        link.addEventListener("click", function () {
            link.href = 'data:text/plain;charset=utf-8,' +
                                    encodeURIComponent(composeSaveLogText());
            link.download = composeSaveLogFilename();
        }, false);

        return link;
    };

    var classesToLevels = {'mhidden': 'HDN',
                           'mdebug': 'DBG',
                           'minfo': 'INF',
                           'mwarning': 'WRN',
                           'merror': 'ERR'};

    var composeSaveLogText = function () {
        var log = document.getElementById('WikiMonkeyLogArea');
        var divs = log.getElementsByTagName('div');
        var text = '';

        for (var d = 0; d < divs.length; d++) {
            var div = divs[d];
            var ps = div.getElementsByTagName('p');
            var tstamp = ps[0].innerHTML;
            var level = classesToLevels[div.className];
            var message = ps[1].innerHTML;

            text += tstamp + '\t' + level + '\t' + message + '\n';
        }

        return text;
    };

    var composeSaveLogFilename = function () {
        var date = new Date();
        return 'WikiMonkey-' + date.getFullYear() +
                        Alib.Str.padLeft(String(date.getMonth()), '0', 2) +
                        Alib.Str.padLeft(String(date.getDate()), '0', 2) +
                        Alib.Str.padLeft(String(date.getHours()), '0', 2) +
                        Alib.Str.padLeft(String(date.getMinutes()), '0', 2) +
                        '.log';
    };

    this._currentInfoDisplayState = true;

    var computeInfoDisplayStyle = function () {
        return (WM.Log._currentInfoDisplayState) ? 'block' : 'none';
    };

    var computeFilterLinkAnchor = function () {
        return (WM.Log._currentInfoDisplayState) ? '[hide info messages]' :
                                                        '[show info messages]';
    };

    var scrollToBottom = function () {
        var log = document.getElementById('WikiMonkeyLogArea');
        log.scrollTop = log.scrollHeight - log.clientHeight;
    };

    var appendMessage = function (text, type) {
        var tstamp = document.createElement('p');
        tstamp.className = 'timestamp';
        var now = new Date();
        tstamp.innerHTML = now.toLocaleTimeString();

        var msg = document.createElement('p');
        msg.className = 'message';
        // Do not allow the empty string, otherwise the resulting html element
        // may not be rendered by the browser
        msg.innerHTML = (text) ? text : " ";

        var line = document.createElement('div');
        line.appendChild(tstamp);
        line.appendChild(msg);
        line.className = type;

        if (type == 'minfo') {
            line.style.display = computeInfoDisplayStyle();
        }

        var log = document.getElementById('WikiMonkeyLogArea');

        var test = log.scrollTop + log.clientHeight == log.scrollHeight;

        log.appendChild(line);

        if (test) {
            scrollToBottom();
        }
    };

    this.logHidden = function (text) {
        appendMessage(text, 'mhidden');
    };

    this.logDebug = function (text) {
        appendMessage(text, 'mdebug');
    };

    this.logInfo = function (text) {
        appendMessage(text, 'minfo');
    };

    this.logWarning = function (text) {
        appendMessage(text, 'mwarning');
    };

    this.logError = function (text) {
        appendMessage(text, 'merror');
    };

    this.linkToPage = function (url, anchor) {
        // Must return a string, not a DOM element
        return "<a href=\"" + url + "\">" + anchor + "</a>";
    };

    this.linkToWikiPage = function (title, anchor) {
        // Must return a string, not a DOM element
        // Use an absolute (full) URL so it will be usable in the downloadable
        //   version of the log
        // Do *not* use encodeURIComponent(title) because the passed title may
        //   have a fragment or a query string that would then be encoded
        //   MediaWiki should be able to correctly resolve the title anyway
        var wikiUrls = WM.MW.getWikiUrls();
        return "<a href=\"" + wikiUrls.short + title + "\">" + anchor + "</a>";
    };
};
