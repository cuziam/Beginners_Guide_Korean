import * as fs from "fs";
import path from "path";

//trees폴더의 path를 변수에 저장
const __dirname = path.resolve();
const basePathKR = path.resolve(__dirname, "../beginnersguide_koreana/trees");
const basePathEN = path.resolve(__dirname, "../beginnersguide_english/trees");
const fileList = fs.readdirSync(basePathKR);

//파일중 텍스트파일을 찾음. 그 후에 텍스트 파싱 후 텍스트를 html파일로 넣는다.
let fileSuffix;
let contentsEN;
let contentsKR;
let htmlContents = "";

let filesToHtml = (fileList, basePathEN, basePathKR) => {
  //영문 파일 폴더와 한글 파일 폴더를 콘솔에 출력
  console.log(`English files path: ${basePathEN}`);
  console.log(`Korean files path: ${basePathKR}`);

  //폴더 내의 fileList 출력
  console.log(`--file List--`);
  for (let i in fileList) {
    console.log(`${fileList[i]}`);
  }
  for (let i in fileList) {
    fileSuffix = fileList[i].substring(
      fileList[i].length - 4,
      fileList[i].length
    );
    if (fileSuffix == `.txt`) {
      //.txt파일이 맞는 경우 메세지 띄우기
      console.log(`filename: ${fileList[i]} is in progress...`);

      //파일경로 선언
      let fullPathEN = `${basePathEN}/${fileList[i]}`;
      let fullPathKR = `${basePathKR}/${fileList[i]}`;
      htmlContents += `Korean file Path: <a href="${fullPathKR}" target=_blank>${fullPathKR}</a><br>
      English file Path: <a href="${fullPathEN}" target=_blank>${fullPathEN}</a><br>`;
      //parse
      contentsEN = fs.readFileSync(`${fullPathEN}`, `utf-8`);
      contentsKR = fs.readFileSync(`${fullPathKR}`, `utf-8`);

      let divContentsEN = contentsEN.split("\n");
      let divContentsKR = contentsKR.split("\n");
      for (let i in divContentsEN) {
        htmlContents += `${divContentsEN[i]}<br>${divContentsKR[i]}<br>`; //영어자막과 한글자막이 번갈아서 나오도록 함.
      }
    } else {
      console.log(`${fileList[i]} is directory file`);
      let otherPathKR = `${basePathKR}/${fileList[i]}`;
      let otherPathEN = `${basePathEN}/${fileList[i]}`;
      const fileList2 = fs.readdirSync(otherPathKR);
      filesToHtml(fileList2, otherPathEN, otherPathKR);
    }
  }
};

filesToHtml(fileList, basePathEN, basePathKR);

let darkscript = `<script>
document.querySelector("body").style.backgroundColor="black";
document.querySelector("body").style.color="white";
</script>`;
htmlContents += darkscript;
fs.writeFileSync("allTrees.html", htmlContents);
