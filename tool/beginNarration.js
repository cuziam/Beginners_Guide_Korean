const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const fs = require("fs");

var main = function() {
  var a = ['intro', 'whisper', 'backwards', 'entering', 'stairs', 'puzzle', 'exiting', 'down',
    'notes', 'escape', 'house', 'lecture', 'theater', 'mobius', 'presence', 'machine', 'tower', 'nml'];
  var num, contentsKr, allContents = "";
  for (i = 0; i < a.length; i++) {
    for (j = 1; j <= 17; j++) {
      if (j < 10) {
        num = "0" + j;
      }
      else {
        num = j;
      }
      if (fs.existsSync("beginnersguide_KR/VOF_" + a[i] + num + ".txt") && fs.existsSync("beginnersguide_EN/VOF_" + a[i] + num + ".txt")) {
        var krTitles = "beginnersguide_KR/VOF_" + a[i] + num + ".txt";
        var enTitles = "beginnersguide_EN/VOF_" + a[i] + num + ".txt";
        var contentsKr = fs.readFileSync(krTitles, "utf-8");
        var contentsEn = fs.readFileSync(enTitles,"utf-8");
        var divContentsKr = contentsKr.split("\n");
        var divContentsEn = contentsEn.split("\n");
          allContents+="<strong><a href="+krTitles+">"+krTitles+"</a></strong><br>";
        for (var k in divContentsKr) {
          allContents += divContentsEn[k]+"<br>"+divContentsKr[k] + "<br>";
        }
      }
      else
        break;
    }
  }//다했으면
  var darkscript ='<script>document.querySelector("body").style.backgroundColor="black"; document.querySelector("body").style.color="white";</script>'
  allContents+=darkscript;
  fs.writeFileSync("allNaration.html",allContents);//눈 아파서 다크모드해야겠는데.
}();