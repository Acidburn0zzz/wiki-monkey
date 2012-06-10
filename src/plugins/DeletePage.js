WM.Plugins.DeletePage = new function () {
    this.main = function (args, callNext) {
        var [title, summary] = args;
        
        WM.Log.logInfo("Deleting " + title + "...");
        
        WM.MW.callQuery({prop: 'info',
                         intoken: 'delete',
                         titles: title},
                         WM.Plugins.DeletePage.mainWrite,
                         [title, summary, callNext]);
    };
    
    this.mainWrite = function (page, args) {
        var [title, summary, callNext] = args;
        
        var deletetoken = page.deletetoken;
        
        WM.MW.callAPIPost({action: 'delete',
                           bot: '1',
                           title: title,
                           token: deletetoken,
                           reason: summary},
                           null,
                           WM.Plugins.DeletePage.mainEnd,
                           [title, callNext]);
    };
    
    this.mainEnd = function (res, args) {
        var title = args[0];
        var callNext = args[1];
        
        if (!res['delete']) {
            WM.Log.logError(title + " has not been deleted!\n" + res['error']['info'] + " (" + res['error']['code'] + ")");
        }
        else {
            WM.Log.logInfo(title + " deleted");
            if (callNext) {
                callNext();
            }
        }
    };
    
    this.mainAuto = function (args, title) {
        var summary = args[0];
        
        WM.MW.callQuery({prop: 'info',
                         intoken: 'delete',
                         titles: title},
                         WM.Plugins.DeletePage.mainAutoWrite,
                         [title, summary]);
    };
    
    this.mainAutoWrite = function (page, args) {
        var title = args[0];
        var summary = args[1];
        
        var deletetoken = page.deletetoken;
        
        WM.MW.callAPIPost({action: 'delete',
                           bot: '1',
                           title: title,
                           token: deletetoken,
                           reason: summary},
                           null,
                           WM.Plugins.DeletePage.mainAutoEnd,
                           callBot);
    };
    
    this.mainAutoEnd = function (res, callBot) {
        if (!res['delete']) {
            WM.Log.logError(cat + " has not been deleted!\n" + res['error']['info'] + " (" + res['error']['code'] + ")");
            callBot(false);
        }
        else {
            callBot(true);
        }
    };
};