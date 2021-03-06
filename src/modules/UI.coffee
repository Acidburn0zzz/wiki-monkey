# Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
# Copyright (C) 2011 Dario Giovannetti <dev@dariogiovannetti.net>
#
# This file is part of Wiki Monkey.
#
# Wiki Monkey is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Wiki Monkey is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.

CSS = require('../../lib.js.generic/dist/CSS')
RegEx = require('../../lib.js.generic/dist/RegEx')


class module.exports.UI
    constructor: (@WM) ->
        null

    _makeUI: ->
        display = true
        displayLog = true

        @WM.Mods.applyGeneralMods()

        if document.getElementById('editform')
            nextNode = document.getElementById('wpSummaryLabel')
                                                        .parentNode.nextSibling
            conf = @WM.Cfg._getEditorPlugins()
            UI = if conf then @WM.Menu._makeUI(conf) else null
            @WM.Mods.applyEditorMods()

        else if document.getElementById('mw-diff-otitle1')
            nextNode = document.getElementById('bodyContent')
                                                .getElementsByTagName('h2')[0]
            conf = @WM.Cfg._getDiffPlugins()
            UI = if conf then @WM.Menu._makeUI(conf) else null

        else if document.getElementById('mw-subcategories') or
                                        document.getElementById('mw-pages')
            nextNode = document.getElementById('bodyContent')
            conf = @WM.Cfg._getBotPlugins()
            UI = if conf then @WM.Bot._makeUI(conf,
                            [[document.getElementById('mw-pages'), 0, "Pages"],
                            [document.getElementById('mw-subcategories'), 0,
                            "Subcategories"]]) else null
            display = false

        else if document.getElementById('mw-whatlinkshere-list')
            nextNode = document.getElementById('bodyContent')
                                .getElementsByTagName('form')[0].nextSibling
            conf = @WM.Cfg._getBotPlugins()
            UI = if conf then @WM.Bot._makeUI(conf,
                            [[document.getElementById('mw-whatlinkshere-list'),
                            0, "Pages"]]) else null
            display = false

        else if document.body.classList.contains('mw-special-LinkSearch') and
                                        document.getElementById('bodyContent'
                                        ).getElementsByTagName('ol')[0]
            nextNode = document.getElementsByClassName('mw-spcontent')[0]
            conf = @WM.Cfg._getBotPlugins()
            UI = if conf then @WM.Bot._makeUI(conf,
                        [[document.getElementById('bodyContent'
                        ).getElementsByTagName('ol')[0], 1, "Pages"]]) else null
            display = false

        else if document.getElementById('mw-prefixindex-list-table')
            nextNode = document.getElementById('mw-prefixindex-list-table')
            conf = @WM.Cfg._getBotPlugins()
            UI = if conf then @WM.Bot._makeUI(conf,
                                [[nextNode.getElementsByTagName('tbody')[0],
                                0, "Pages"]]) else null
            display = false

        # Making the interface shouldn't rely on saved configuration, in order
        # to always make it possible to fix a misconfiguration
        else if document.getElementById('mw-prefs-form')
            @WM.Cfg._makeUI()

        else
            wikiUrls = @WM.MW.getWikiUrls()
            patt1A = new RegExp(RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])SpecialPages", '')
            patt1B = new RegExp(RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])SpecialPages", '')
            patt2A = new RegExp(RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])RecentChanges", '')
            patt2B = new RegExp(RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])RecentChanges", '')
            patt3A = new RegExp(RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])NewPages", '')
            patt3B = new RegExp(RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])NewPages", '')
            patt4A = new RegExp(RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])ProtectedPages", '')
            patt4B = new RegExp(RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])ProtectedPages", '')
            patt5A = new RegExp(RegEx.escapePattern(wikiUrls.full) +
                    "\?.*?" + "title\\=Special(\\:|%3[Aa])Contributions", '')
            patt5B = new RegExp(RegEx.escapePattern(wikiUrls.short) +
                    "Special(\\:|%3[Aa])Contributions", '')

            if location.href.search(patt1A) > -1 or
                                        location.href.search(patt1B) > -1
                nextNode = document.getElementById('bodyContent')
                conf = @WM.Cfg._getSpecialPlugins()
                UI = if conf then @WM.Menu._makeUI(conf) else null

            else if location.href.search(patt2A) > -1 or
                                        location.href.search(patt2B) > -1
                nextNode = document.getElementById('mw-content-text')
                                            .getElementsByTagName('h4')[0]
                conf = @WM.Cfg._getRecentChangesPlugins()
                UI = if conf then @WM.Filters._makeUI(conf) else null
                displayLog = false
                @WM.Mods.applyRecentChangesMods()

            else if location.href.search(patt3A) > -1 or
                                        location.href.search(patt3B) > -1
                nextNode = document.getElementById('mw-content-text')
                                            .getElementsByTagName('ul')[0]
                conf = @WM.Cfg._getNewPagesPlugins()
                UI = if conf then @WM.Filters._makeUI(conf) else null
                displayLog = false

            else if location.href.search(patt4A) > -1 or
                                        location.href.search(patt4B) > -1
                nextNode = document.getElementById('mw-content-text')
                                            .getElementsByTagName('ul')[0]
                conf = @WM.Cfg._getBotPlugins()
                UI = if conf then @WM.Bot._makeUI(conf,
                                [[document.getElementById('mw-content-text')
                                        .getElementsByTagName('ul')[0],
                                0, "Pages"]]) else null
                display = false

            else if location.href.search(patt5A) > -1 or
                                        location.href.search(patt5B) > -1
                @WM.Mods.applyContributionsMods()

            else if document.getElementsByClassName('mw-spcontent')
                                                                .length > 0
                nextNode = document.getElementsByClassName('mw-spcontent')[0]
                conf = @WM.Cfg._getBotPlugins()
                UI = if conf then @WM.Bot._makeUI(conf,
                                    [[nextNode.getElementsByTagName('ol')[0],
                                    0, "Pages"]]) else null
                display = false

            else if document.getElementsByClassName('mw-allpages-table-chunk')
                                                                .length > 0
                nextNode = document.getElementsByClassName(
                                                'mw-allpages-table-chunk')[0]
                conf = @WM.Cfg._getBotPlugins()
                UI = if conf then @WM.Bot._makeUI(conf,
                                [[nextNode.getElementsByTagName('tbody')[0],
                                0, "Pages"]]) else null
                display = false

        if UI
            CSS.addStyleElement("#WikiMonkey {position:relative;}
                        #WikiMonkey fieldset {margin:0 0 1em 0;}")

            main = document.createElement('fieldset')
            main.id = 'WikiMonkey'

            legend = document.createElement('legend')
            legend.appendChild(document.createTextNode('Wiki Monkey '))

            hide = document.createElement('a')
            hide.href = '#WikiMonkey'
            hide.innerHTML = '[hide]'
            hide.addEventListener("click", ->
                wmmain = document.getElementById('WikiMonkeyMain')
                if wmmain.style.display == 'none'
                    wmmain.style.display = 'block'
                    this.innerHTML = '[hide]'
                else
                    wmmain.style.display = 'none'
                    this.innerHTML = '[show]'
                return false
            , false)
            legend.appendChild(hide)

            legend.appendChild(document.createTextNode(' '))

            conf = document.createElement('a')
            conf.href = @WM.MW.getWikiPaths().short +
                                            'Special:Preferences#wiki-monkey'
            conf.innerHTML = '[conf]'
            legend.appendChild(conf)

            legend.appendChild(document.createTextNode(' '))

            help = document.createElement('a')
            help.href = 'https://github.com/kynikos/wiki-monkey/wiki'
            help.innerHTML = '[help]'
            legend.appendChild(help)

            main.appendChild(legend)

            main2 = document.createElement('div')
            main2.id = 'WikiMonkeyMain'

            main2.appendChild(UI)

            logArea = @WM.Log._makeLogArea()
            if not displayLog
                logArea.style.display = 'none'

            main2.appendChild(logArea)

            if not display
                main2.style.display = 'none'
                hide.innerHTML = '[show]'

            main.appendChild(main2)

            nextNode.parentNode.insertBefore(main, nextNode)

            @WM.Log.logHidden('Wiki Monkey version: ' + GM_info.script.version)
            date = new Date()
            @WM.Log.logHidden('Date: ' + date.toString())
            @WM.Log.logHidden('URL: ' + location.href)
