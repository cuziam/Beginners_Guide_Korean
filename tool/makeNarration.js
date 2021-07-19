import * as fs from 'fs';

const chapter = ['intro', 'whisper', 'backwards', 'entering', 'stairs', 'puzzle', 'exiting', 'down',
    'notes', 'escape', 'house', 'lecture', 'theater', 'mobius', 'presence', 'machine', 'tower', 'nml'];
const basePathKR = `../beginnersguide_koreana/sound/subtitles/narration/VOF_`;
const basePathEN = `../beginnersguide_english/sound/subtitles/narration/VOF_`;
let fileNum, chapterNum;
let fullPathKR, fullPathEN;
let htmlContents;
for (chapterNum = 0; chapterNum < chapter.length; chapterNum++) {
    for (fileNum = 1; fileNum <= 17; fileNum++) {
        if (fileNum < 10) {//full filepath설정. 10보다 낮은 경우 0을 붙여야 함.
            fullPathKR = `${basePathKR, chapter[chapterNum]}0${fileNum}`;
            fullPathEN = `${basePathEN, chapter[chapterNum]}0${fileNum}`;

        }
        else if (filenum >= 10) {//full filepath설정. 10보다 큰 경우 0을 붙여야함.
            fullPathKR = `${basePathKR, chapter[chapterNum], fileNum}`;
            fullPathEN = `${basePathEN, chapter[chapterNum], fileNum}`;
        }

        if (fs.existsSync(fullPathKR) || fs.existsSync(fullPathEN)) {
            let contentsKR = fs.readFileSync(fullPathKR, 'utf-8');
            let contentsEN = fs.readFileSync(fullPathEN, 'utf-8');
            let divContentsKR = contentsKR.replace('\n', '<br>');
            let divContentsEN = contentsEN.replace('\n', '<br>');
            
            for (var i in divContentsKR) {
                htmlContents += `<p>Korean file path: ${fullPathKR}<br>
                English file path: ${fullPathEN}<br>
                ${divContentsKR[i], divContentsEN[i]}</p>`;
            }
        }
    }
}
fs.writeFileSync("allNarationTest.html",htmlContents);


