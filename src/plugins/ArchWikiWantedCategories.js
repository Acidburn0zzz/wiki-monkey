WM.Plugins.ArchWikiWantedCategories = new function () {
    this.mainAuto = function (args, title) {
        title = title.replace(" (page does not exist)", "");
        
        var pageid = WM.MW.callQuerySync({prop: "info",
                                      intoken: "edit",
                                      titles: title});
        
        var edittoken = pageid.edittoken;
        
        var language = title.match(/^(.+?)([ _]\(([^\(]+)\))?$/)[3];
        
        if (language && WM.ArchWiki.isCategoryLanguage(language)) {
            var text = "[[Category:" + language + "]]";
            var summary = "wanted category";
            
            var res = WM.MW.callAPIPostSync({action: "edit",
                                     bot: "1",
                                     title: title,
                                     summary: summary,
                                     text: text,
                                     createonly: "1",
                                     token: edittoken});
            
            if (res.edit && res.edit.result == 'Success') {
                return true;
            }
            else {
                WM.Log.logError(res['error']['info'] + " (" + res['error']['code'] + ")");
                return false;
            }
        }
        else {
            return true;
        }
    };
};
