import * as fs from "fs";
import path from "path";
const __dirname = path.resolve();
const chapter = [
  "intro",
  "whisper",
  "backwards",
  "entering",
  "stairs",
  "puzzle",
  "exiting",
  "down",
  "notes",
  "escape",
  "house",
  "lecture",
  "theater",
  "mobius",
  "presence",
  "machine",
  "tower",
  "nml",
];

const basePathKR = path.resolve(
  __dirname,
  "../beginnersguide_koreana/sound/subtitles/narration/VOF/VOF_"
);
const basePathEN = path.resolve(
  __dirname,
  "../beginnersguide_english/sound/subtitles/narration/VOF/VOF_"
);
let fileNum, chapterNum;
let fullPathKR, fullPathEN;
let htmlContents = "";
for (chapterNum = 0; chapterNum < chapter.length; chapterNum++) {
  for (fileNum = 1; fileNum <= 17; fileNum++) {
    if (chapterNum == 0) {
      //intro chapter도 해줘야지...
      fullPathKR = `${basePathKR}${chapter[chapterNum]}.txt`;
      fullPathEN = `${basePathEN}${chapter[chapterNum]}.txt`;
    } else if (fileNum >= 10) {
      //full filepath설정. fileNum이 10보다 같거나 큰 경우에는 그대로 ㄱㄱ.
      fullPathKR = `${basePathKR}${chapter[chapterNum]}${fileNum}.txt`;
      fullPathEN = `${basePathEN}${chapter[chapterNum]}${fileNum}.txt`;
    } else if (fileNum < 10) {
      //full filepath설정. fileNum이 10보다 낮은 경우 0을 붙여야 함.
      fullPathKR = `${basePathKR}${chapter[chapterNum]}0${fileNum}.txt`;
      fullPathEN = `${basePathEN}${chapter[chapterNum]}0${fileNum}.txt`;
    }
    console.log(fullPathKR);
    if (fs.existsSync(fullPathKR) && fs.existsSync(fullPathEN)) {
      //둘 다 파일이 존재하면 파일 파싱시작.
      htmlContents += `Korean file Path: <a href="${fullPathKR}" target=_blank>${fullPathKR}</a><br>
      English file Path: <a href="${fullPathEN}" target=_blank>${fullPathEN}</a><br>`;
      let contentsKR = fs.readFileSync(fullPathKR, "utf-8");
      let contentsEN = fs.readFileSync(fullPathEN, "utf-8");
      let divContentsKR = contentsKR.split("\n");
      let divContentsEN = contentsEN.split("\n");

      for (let i in divContentsKR) {
        htmlContents += `${divContentsEN[i]}<br>${divContentsKR[i]}<br>`; //영어자막과 한글자막이 번갈아서 나오도록 함.
      }
      if (chapterNum == 0 && fileNum == 1) break;
    }
  }
}
let darkscript = `<script>
document.querySelector("body").style.backgroundColor="black";
document.querySelector("body").style.color="white";
</script>`;
htmlContents += darkscript;
fs.writeFileSync("allNarationTest.html", htmlContents);

//use "node --experimental-modules makeNarration.mjs" command in shell.
