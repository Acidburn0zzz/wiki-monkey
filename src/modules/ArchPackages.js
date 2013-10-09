/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2013 Dario Giovannetti <dev@dariogiovannetti.net>
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

WM.ArchPackages = new function () {
    this.getAURInfo = function (arg, call, callArgs) {
        // arg can be either an exact package name (string) or an ID (integer)
        var query = {
            method: "GET",
            url: "https://aur.archlinux.org/rpc.php?type=info&arg=" + encodeURIComponent(arg),
            onload: function (res) {
                try {
                    // Currently only Scriptish supports the responseJSON method
                    //var json = (res.responseJSON) ? res.responseJSON : JSON.parse(res.responseText);
                    // ... or not?
                    var json = (Alib.Obj.getFirstItem(res.responseJSON)) ? res.responseJSON : JSON.parse(res.responseText);
                }
                catch (err) {
                    WM.Log.logError("The AUR's RPC interface returned an unexpected object");
                }

                if (json) {
                    // Don't put this into the try block or all its exceptions
                    // will be caught printing the same error
                    call(json, callArgs);
                }
            },
            onerror: function (res) {
                WM.Log.logError(WM.MW.failedQueryError(res.finalUrl));
            },
        };

        try {
            GM_xmlhttpRequest(query);
        }
        catch (err) {
            WM.Log.logError(WM.MW.failedHTTPRequestError(err));
        }
    };

    this.isOfficialPackage = function (pkg, call, callArgs) {
        var query = {
            method: "GET",
            url: "https://www.archlinux.org/packages/?name=" + encodeURIComponent(pkg),
            onload: function (res) {
                // Cannot use the DOMParser because Scriptish/GreaseMonkey
                // doesn't support XrayWrapper well
                // See http://www.oreillynet.com/pub/a/network/2005/11/01/avoid-common-greasemonkey-pitfalls.html?page=3
                // and https://developer.mozilla.org/en/docs/XPConnect_wrappers#XPCNativeWrapper_%28XrayWrapper%29
                if (res.responseText.search(/<div[^>]+id\=["']pkglist-results["']/) > -1) {
                    call(true, callArgs);
                }
                else {
                    call(false, callArgs);
                }
            },
            onerror: function (res) {
                WM.Log.logError(WM.MW.failedQueryError(res.finalUrl));
            },
        };

        try {
            GM_xmlhttpRequest(query);
        }
        catch (err) {
            WM.Log.logError(WM.MW.failedHTTPRequestError(err));
        }
    };

    this.isAURPackage = function (pkg, call, callArgs) {
        var call2 = function (res, args) {
            if (res.type == "error") {
                WM.Log.logError("The AUR's RPC interface returned an error: " + res.results);
            }
            else {
                if (res.resultcount > 0) {
                    call(true, args);
                }
                else {
                    call(false, args);
                }
            }
        }

        WM.ArchPackages.getAURInfo(pkg, call2, callArgs);
    };
};