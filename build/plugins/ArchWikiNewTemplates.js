// Generated by CoffeeScript 1.12.7
module.exports.ArchWikiNewTemplates = (function() {
  ArchWikiNewTemplates.REQUIRES_GM = false;

  function ArchWikiNewTemplates(WM) {
    this.WM = WM;
  }

  ArchWikiNewTemplates.prototype.main = function(args, callNext) {
    var i, len, newtext, re10, re11, re12, re13, re14, re15, re16, re8, re9, source, test, tests;
    source = this.WM.Editor.readSource();
    newtext = source;
    re8 = /<pre>(((?!<(pre|nowiki)>)[^\=\|])*?((?!<(pre|nowiki)>)[^\=\|\}]))<\/pre>/ig;
    re9 = /<pre>(((?!<(pre|nowiki)>)[^\|])*?((?!<(pre|nowiki)>)[^\|\}]))<\/pre>/ig;
    re10 = /<pre>(\n*((?!<(pre|nowiki)>).\n*)+?)<\/pre>/ig;
    re11 = /<code>(((?!<(code|nowiki)>)[^\=\|\n])*?((?!<(code|nowiki)>)[^\=\|\}\n]))<\/code>/ig;
    re12 = /<code>(((?!<(code|nowiki)>)[^\|\n])*?((?!<(code|nowiki)>)[^\|\}\n]))<\/code>/ig;
    re13 = /<code>(((?!<(code|nowiki)>)[^\n])+?)<\/code>/ig;
    re14 = /<tt>(((?!<(tt|nowiki)>)[^\=\|\n])*?((?!<(tt|nowiki)>)[^\=\|\}\n]))<\/tt>/ig;
    re15 = /<tt>(((?!<(tt|nowiki)>)[^\|\n])*?((?!<(tt|nowiki)>)[^\|\}\n]))<\/tt>/ig;
    re16 = /<tt>(((?!<(tt|nowiki)>)[^\n])+?)<\/tt>/ig;
    newtext = newtext.replace(re8, '{{bc|$1}}');
    newtext = newtext.replace(re9, '{{bc|1=$1}}');
    newtext = newtext.replace(re10, '{{bc|<nowiki>$1</nowiki>}}');
    newtext = newtext.replace(re11, '{{ic|$1}}');
    newtext = newtext.replace(re12, '{{ic|1=$1}}');
    newtext = newtext.replace(re13, '{{ic|<nowiki>$1</nowiki>}}');
    newtext = newtext.replace(re14, '{{ic|$1}}');
    newtext = newtext.replace(re15, '{{ic|1=$1}}');
    newtext = newtext.replace(re16, '{{ic|<nowiki>$1</nowiki>}}');
    if (newtext !== source) {
      this.WM.Editor.writeSource(newtext);
      this.WM.Log.logInfo("Turned HTML tags into proper templates");
    }
    tests = [['&lt;pre>', newtext.match(/<pre/ig)], ['&lt;code>', newtext.match(/<code/ig)], ['&lt;tt>', newtext.match(/<tt/ig)]];
    for (i = 0, len = tests.length; i < len; i++) {
      test = tests[i];
      if (test[1]) {
        this.WM.Log.logWarning(test[1].length + ' ' + test[0] + ' instances require manual intervention');
      }
    }
    if (callNext) {
      return callNext();
    }
  };

  return ArchWikiNewTemplates;

})();
