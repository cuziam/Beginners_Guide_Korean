import * as fs from "fs";
import path from "path";
const __dirname = path.resolve();
const basePathKR = path.resolve(__dirname, "../beginnersguide_koreana/trees");
const basePathEN = path.resolve(__dirname, "../beginnersguide_english/trees");
const fileList = fs.readdirSync(basePathKR);
let htmlContents = "";

console.log(basePathKR);
for (let i in fileList) {
  let fullPathKR = `${basePathKR}\\${fileList[i]}`;
  let fullPathEN = `${basePathEN}\\${fileList[i]}`;
  console.log(fullPathEN);
  if (fullPathKR.indexOf(".txt") < 0) {
    let subFileList = fs.readdirSync(fullPathKR);
    console.log(subFileList);
    for (let j in subFileList) {
      fullPathKR = `${fullPathKR}\\${subFileList[j]}.txt`;
      fullPathEN = `${fullPathKR}\\${subFileList[j]}.txt`;
      makeHTML(fullPathKR, fullPathEN);
    }
  } else {
    makeHTML(fullPathKR, fullPathEN);
  }
}

function makeHTML(pathKR, pathEN) {
  if (fs.existsSync(pathKR) && fs.existsSync(pathEN)) {
    htmlContents += `Korean file Path: <a href="${pathKR}" target=_blank>${pathKR}</a><br>
      English file Path: <a href="${pathEN}" target=_blank>${pathEN}</a><br>`;
    let contentsKR = fs.readFileSync(pathKR, "utf-8");
    let contentsEN = fs.readFileSync(pathEN, "utf-8");
    contentsKR.replace("/{/", "");
    contentsKR.replace("/}/", "");
    let divContentsKR = contentsKR.split("\n");
    let divContentsEN = contentsEN.split("\n");
    for (let i in contentsKR) {
      htmlContents += `${divContentsKR[i]}<br>${divContentsEN[i]}<br>`;
    }
  }
}
let darkscript = `<script>
document.querySelector("body").style.backgroundColor="black";
document.querySelector("body").style.color="white";
</script>`;
htmlContents += darkscript;
fs.writeFileSync("allTrees.html", htmlContents);

//use "node --experimental-modules makeTrees.mjs" command in shell.
