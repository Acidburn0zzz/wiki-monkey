// Generated by CoffeeScript 1.12.7
var RegEx,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

RegEx = require('../../lib.js.generic/dist/RegEx');

module.exports.ArchWikiOldAURLinks = (function() {
  ArchWikiOldAURLinks.REQUIRES_GM = true;

  function ArchWikiOldAURLinks(WM) {
    this.WM = WM;
    this.mainAutoEnd = bind(this.mainAutoEnd, this);
    this.mainAutoWrite = bind(this.mainAutoWrite, this);
    this.mainAutoReplace = bind(this.mainAutoReplace, this);
    this.mainEnd = bind(this.mainEnd, this);
    this.doReplaceContinue2 = bind(this.doReplaceContinue2, this);
    this.checkIfOfficial = bind(this.checkIfOfficial, this);
    this.doReplaceContinue = bind(this.doReplaceContinue, this);
    this.doReplace = bind(this.doReplace, this);
  }

  ArchWikiOldAURLinks.prototype.doReplace = function(source, call, callArgs) {
    var links, newText, regExp;
    regExp = /\[(https?\:\/\/aur\.archlinux\.org\/packages\.php\?ID\=([0-9]+)) ([^\]]+?)\]/g;
    links = RegEx.matchAll(source, regExp);
    newText = source;
    if (links.length > 0) {
      return this.WM.ArchPackages.getAURInfo(links[0].match[2], this.doReplaceContinue, [source, newText, links, 0, call, callArgs]);
    } else {
      return call(source, newText, callArgs);
    }
  };

  ArchWikiOldAURLinks.prototype.doReplaceContinue = function(res, args) {
    var call, callArgs, index, link, links, newText, newlink, pkgname, source;
    source = args[0];
    newText = args[1];
    links = args[2];
    index = args[3];
    call = args[4];
    callArgs = args[5];
    link = links[index];
    this.WM.Log.logInfo("Processing " + this.WM.Log.linkToPage(link.match[1], link.match[0]) + " ...");
    if (res.type === "error") {
      this.WM.Log.logError("The AUR's RPC interface returned an error: " + res.results);
      return call(-1, -1, callArgs);
    } else {
      if (res.resultcount > 0) {
        pkgname = res.results.Name;
        if (link.match[3] === pkgname) {
          newlink = "{{AUR|" + pkgname + "}}";
          newText = newText.replace(link.match[0], newlink);
          this.WM.Log.logInfo("Checked and replaced link with " + newlink);
          return this.doReplaceContinue2(source, newText, links, index, call, callArgs);
        } else {
          this.WM.Log.logWarning("Couldn't replace: the link doesn't use the package name (" + pkgname + ") as the anchor text");
          return this.doReplaceContinue2(source, newText, links, index, call, callArgs);
        }
      } else {
        return this.WM.ArchPackages.isOfficialPackage(link.match[3], this.checkIfOfficial, [link, source, newText, links, index, call, callArgs]);
      }
    }
  };

  ArchWikiOldAURLinks.prototype.checkIfOfficial = function(res, args) {
    var call, callArgs, index, link, links, newText, newlink, source;
    link = args[0];
    source = args[1];
    newText = args[2];
    links = args[3];
    index = args[4];
    call = args[5];
    callArgs = args[6];
    if (res) {
      newlink = "{{Pkg|" + link.match[3] + "}}";
      newText = newText.replace(link.match[0], newlink);
      this.WM.Log.logInfo("Replaced link with " + newlink);
      this.WM.Log.logWarning("The package doesn't exist anymore in the AUR, but a package with the same name as the link anchor has been found in the official repositories");
    } else {
      this.WM.Log.logWarning("Couldn't replace: the package doesn't exist anymore in the AUR and there's no package in the official repositories that has the same name as the link anchor");
    }
    return this.doReplaceContinue2(source, newText, links, index, call, callArgs);
  };

  ArchWikiOldAURLinks.prototype.doReplaceContinue2 = function(source, newText, links, index, call, callArgs) {
    index++;
    if (links[index]) {
      return this.WM.ArchPackages.getAURInfo(links[index].match[2], this.doReplaceContinue, [source, newText, links, index, call, callArgs]);
    } else {
      return call(source, newText, callArgs);
    }
  };

  ArchWikiOldAURLinks.prototype.main = function(args, callNext) {
    var source;
    source = this.WM.Editor.readSource();
    this.WM.Log.logInfo("Replacing old-style direct AUR package links ...");
    return this.doReplace(source, this.mainEnd, callNext);
  };

  ArchWikiOldAURLinks.prototype.mainEnd = function(source, newtext, callNext) {
    if (source === -1) {
      callNext = false;
    } else if (newtext !== source) {
      this.WM.Editor.writeSource(newtext);
      this.WM.Log.logInfo("Replaced old-style direct AUR package links");
    } else {
      this.WM.Log.logInfo("No automatically replaceable old-style AUR " + "package links found");
    }
    if (callNext) {
      return callNext();
    }
  };

  ArchWikiOldAURLinks.prototype.mainAuto = function(args, title, callBot, chainArgs) {
    var summary;
    summary = args;
    return this.WM.MW.callQueryEdit(title, this.mainAutoReplace, [summary, callBot]);
  };

  ArchWikiOldAURLinks.prototype.mainAutoReplace = function(title, source, timestamp, edittoken, args) {
    var callBot, summary;
    summary = args[0];
    callBot = args[1];
    return this.doReplace(source, this.mainAutoWrite, [title, edittoken, timestamp, summary, callBot]);
  };

  ArchWikiOldAURLinks.prototype.mainAutoWrite = function(source, newtext, args) {
    var callBot, edittoken, summary, timestamp, title;
    title = args[0];
    edittoken = args[1];
    timestamp = args[2];
    summary = args[3];
    callBot = args[4];
    if (source === -1) {
      return callBot(false, null);
    } else if (newtext !== source) {
      return this.WM.MW.callAPIPost({
        action: "edit",
        bot: "1",
        title: title,
        summary: summary,
        text: newtext,
        basetimestamp: timestamp,
        token: edittoken
      }, null, this.mainAutoEnd, callBot, null);
    } else {
      return callBot(0, null);
    }
  };

  ArchWikiOldAURLinks.prototype.mainAutoEnd = function(res, callBot) {
    if (res.edit && res.edit.result === 'Success') {
      return callBot(1, null);
    } else if (res.error) {
      this.WM.Log.logError(res.error.info + " (" + res.error.code + ")");
      return callBot(res.error.code, null);
    } else {
      return callBot(false, null);
    }
  };

  return ArchWikiOldAURLinks;

})();
