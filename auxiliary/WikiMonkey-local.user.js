// ==UserScript==
// @id wiki-monkey-local
// @name Wiki Monkey (local)
// @namespace https://github.com/kynikos/wiki-monkey
// @author Dario Giovannetti <dev@dariogiovannetti.net>
// @version 2.0.7-dev-local
// @description MediaWiki-compatible bot and editor assistant that runs in the browser (local version)
// @website https://github.com/kynikos/wiki-monkey
// @supportURL https://github.com/kynikos/wiki-monkey/issues
// @updateURL file:///home/dario/data/backup_heavy/development/wiki-monkey/auxiliary/WikiMonkey-local.user.js
// @downloadURL file:///home/dario/data/backup_heavy/development/wiki-monkey/auxiliary/WikiMonkey-local.user.js
// @icon file:///home/dario/data/backup_heavy/development/wiki-monkey/auxiliary/wiki-monkey.png
// @icon64 file:///home/dario/data/backup_heavy/development/wiki-monkey/auxiliary/wiki-monkey-64.png
// @match http://*.wikipedia.org/*
// @match https://wiki.archlinux.org/*
// @grant GM_info
// @grant GM_xmlhttpRequest
// @require https://code.jquery.com/jquery-2.1.3.min.js
// @require file:///home/dario/data/backup_heavy/development/lib.js.generic/src/GMAPIEmulation.js
// @require file:///home/dario/data/backup_heavy/development/lib.js.generic/src/Async.js
// @require file:///home/dario/data/backup_heavy/development/lib.js.generic/src/Compatibility.js
// @require file:///home/dario/data/backup_heavy/development/lib.js.generic/src/CSS.js
// @require file:///home/dario/data/backup_heavy/development/lib.js.generic/src/DOM.js
// @require file:///home/dario/data/backup_heavy/development/lib.js.generic/src/HTTP.js
// @require file:///home/dario/data/backup_heavy/development/lib.js.generic/src/Obj.js
// @require file:///home/dario/data/backup_heavy/development/lib.js.generic/src/RegEx.js
// @require file:///home/dario/data/backup_heavy/development/lib.js.generic/src/Str.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/_Init.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/Bot.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/Cat.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/Cfg.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/Diff.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/Editor.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/Filters.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/Interlanguage.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/Log.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/Menu.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/Mods.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/MW.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/Parser.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/Tables.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/UI.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/WhatLinksHere.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/ArchPackages.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/modules/ArchWiki.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/ExpandContractions.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/FixBacklinkFragments.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/FixDoubleRedirects.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/FixFragments.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/FixLinkFragments.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/MultipleLineBreaks.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/SimpleReplace.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/SynchronizeInterlanguageLinks.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/UpdateCategoryTree.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/ArchWikiFixHeader.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/ArchWikiFixHeadings.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/ArchWikiFixLinks.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/ArchWikiNewTemplates.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/ArchWikiNPFilter.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/ArchWikiOldAURLinks.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/ArchWikiQuickReport.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/ArchWikiRCFilter.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/ArchWikiSaveTalk.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/ArchWikiSortContacts.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/ArchWikiSummaryToRelated.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/ArchWikiUpdatePackageTemplates.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/ArchWikiWantedCategories.js
// @require file:///home/dario/data/backup_heavy/development/wiki-monkey/plugins/DeletePages.js
// ==/UserScript==

WM.main({
    "Mods": {
        "Contributions": {
            "hide_rollback_links": true
        },
        "Editor": {
            "disable_edit_summary_submit_on_enter": true,
            "scroll_to_first_heading": false
        },
        "General": {
            "heading_number_style": false
        },
        "RecentChanges": {
            "hide_rollback_links": true
        }
    },
    "Plugins": {
        "Bot": {
            "010SR": [
                "SimpleReplace",
                [
                    "RegExp substitution"
                ],
                null
            ],
            "020BL": [
                "FixBacklinkFragments",
                [
                    "Fix links to specific sections of a target page"
                ],
                "fix links to specific sections"
            ],
            "030IL": [
                "SynchronizeInterlanguageLinks",
                [
                    "Synchronize interlanguage links"
                ],
                [
                    "ArchWiki",
                    "ArchWiki",
                    "ArchWiki",
                    "synchronized interlanguage links with the other wikis"
                ]
            ],
            "040APT": [
                "ArchWikiUpdatePackageTemplates",
                [
                    "Check packages linked with Pkg/AUR templates and possibly update them"
                ],
                "update Pkg/AUR templates to reflect new package status"
            ],
            "050AAL": [
                "ArchWikiOldAURLinks",
                [
                    "Replace old-style direct AUR package links with Template:AUR"
                ],
                "replace old-style direct package links with Pkg/AUR templates"
            ],
            "060AWC": [
                "ArchWikiWantedCategories",
                [
                    "Create wanted categories"
                ],
                null
            ],
            "070DP": [
                "DeletePages",
                [
                    "Delete pages"
                ],
                "delete page"
            ]
        },
        "Diff": {
            "010AQR": [
                "ArchWikiQuickReport",
                [
                    "Quick report"
                ],
                [
                    "ArchWiki:Reports",
                    "add report for %t"
                ]
            ],
            "020AST": [
                "ArchWikiSaveTalk",
                [
                    "Save discussion"
                ],
                [
                    "User:Kynikos/Tasks",
                    "add discussion"
                ]
            ]
        },
        "Editor": {
            "010AHE": [
                "ArchWikiFixHeader",
                [
                    "Text plugins",
                    "Fix header"
                ],
                null
            ],
            "020ASE": [
                "ArchWikiFixHeadings",
                [
                    "Text plugins",
                    "Fix headings"
                ],
                null
            ],
            "030AEL": [
                "ArchWikiFixLinks",
                [
                    "Text plugins",
                    "Fix external links"
                ],
                null
            ],
            "040SL": [
                "FixFragments",
                [
                    "Text plugins",
                    "Fix section links"
                ],
                null
            ],
            "050ACT": [
                "ArchWikiNewTemplates",
                [
                    "Text plugins",
                    "Use code templates"
                ],
                null
            ],
            "060EC": [
                "ExpandContractions",
                [
                    "Text plugins",
                    "Expand contractions"
                ],
                null
            ],
            "070ML": [
                "MultipleLineBreaks",
                [
                    "Text plugins",
                    "Squash multiple line breaks"
                ],
                null
            ],
            "080ASR": [
                "ArchWikiSummaryToRelated",
                [
                    "Text plugins",
                    "Convert summary to related"
                ],
                null
            ],
            "110SR": [
                "SimpleReplace",
                [
                    "RegExp substitution"
                ],
                null
            ],
            "210ES": [
                "FixLinkFragments",
                [
                    "Query plugins",
                    "Fix external section links"
                ],
                null
            ],
            "220AIL": [
                "SynchronizeInterlanguageLinks",
                [
                    "Query plugins",
                    "Sync interlanguage links"
                ],
                [
                    "ArchWiki",
                    "ArchWiki",
                    "ArchWiki",
                    null
                ]
            ],
            "230AAL": [
                "ArchWikiOldAURLinks",
                [
                    "Query plugins",
                    "Fix old AUR links"
                ],
                null
            ],
            "240APT": [
                "ArchWikiUpdatePackageTemplates",
                [
                    "Query plugins",
                    "Update package templates"
                ],
                null
            ]
        },
        "NewPages": {
            "010ANP": [
                "ArchWikiNPFilter",
                [
                    "Default filter"
                ],
                {
                    "language": "English"
                }
            ]
        },
        "RecentChanges": {
            "010ARC": [
                "ArchWikiRCFilter",
                [
                    "Default filter"
                ],
                {
                    "language": "English"
                }
            ]
        },
        "Special": {
            "010CTar": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Arabic"
                ],
                [
                    [
                        "ArchWiki",
                        "ar"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTbg": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Bulgarian"
                ],
                [
                    [
                        "ArchWiki",
                        "bg"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTcs": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Czech"
                ],
                [
                    [
                        "ArchWiki",
                        "cs"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTda": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Danish"
                ],
                [
                    [
                        "ArchWiki",
                        "da"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTel": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Greek"
                ],
                [
                    [
                        "ArchWiki",
                        "el"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTen": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "English"
                ],
                [
                    [
                        "ArchWiki",
                        "en"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTes": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Spanish"
                ],
                [
                    [
                        "ArchWiki",
                        "es"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CThe": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Hebrew"
                ],
                [
                    [
                        "ArchWiki",
                        "he"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CThr": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Croatian"
                ],
                [
                    [
                        "ArchWiki",
                        "hr"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CThu": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Hungarian"
                ],
                [
                    [
                        "ArchWiki",
                        "hu"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTid": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Indonesian"
                ],
                [
                    [
                        "ArchWiki",
                        "id"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTit": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Italian"
                ],
                [
                    [
                        "ArchWiki",
                        "it"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTko": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Korean"
                ],
                [
                    [
                        "ArchWiki",
                        "ko"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTlt": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Lithuanian"
                ],
                [
                    [
                        "ArchWiki",
                        "lt"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTnl": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Dutch"
                ],
                [
                    [
                        "ArchWiki",
                        "nl"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTpl": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Polish"
                ],
                [
                    [
                        "ArchWiki",
                        "pl"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTpt": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Portuguese"
                ],
                [
                    [
                        "ArchWiki",
                        "pt"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTru": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Russian"
                ],
                [
                    [
                        "ArchWiki",
                        "ru"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTsk": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Slovak"
                ],
                [
                    [
                        "ArchWiki",
                        "sk"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTsr": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Serbian"
                ],
                [
                    [
                        "ArchWiki",
                        "sr"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTth": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Thai"
                ],
                [
                    [
                        "ArchWiki",
                        "th"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTuk": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Ukrainian"
                ],
                [
                    [
                        "ArchWiki",
                        "uk"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTzhcn": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Chinese (Simplified)"
                ],
                [
                    [
                        "ArchWiki",
                        "zh-cn"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "010CTzhtw": [
                "UpdateCategoryTree",
                [
                    "Update category trees",
                    "Chinese (Traditional)"
                ],
                [
                    [
                        "ArchWiki",
                        "zh-tw"
                    ],
                    "automatic update",
                    false
                ]
            ],
            "020DR": [
                "FixDoubleRedirects",
                [
                    "Fix double redirects"
                ],
                "fix double redirect"
            ],
            "030ASC": [
                "ArchWikiSortContacts",
                [
                    "Sort contacts",
                    "Sort Administrators"
                ],
                [
                    "ArchWiki:Administrators",
                    30,
                    30,
                    "The following Administrators are currently inactive (less than 30 edits in the last 30 days):",
                    "automatically sort list according to recent activity"
                ]
            ],
            "040ASCC": [
                "ArchWikiSortContacts",
                null,
                null
            ],
            "040ASCM": [
                "ArchWikiSortContacts",
                [
                    "Sort contacts",
                    "Sort Maintainers"
                ],
                [
                    "ArchWiki:Maintainers",
                    30,
                    10,
                    "The following Maintainers are currently inactive (less than 10 edits in the last 30 days):",
                    "automatically sort list according to recent activity"
                ]
            ]
        }
    }
});
