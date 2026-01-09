var params = new URLSearchParams(window.location.search);
var story_id = params.get('id');
var hightLightLine = location.hash.replace(/^#/, '').split('-');
var lastHightLight = hightLightLine[1] ?? 0;
var minHightLight = hightLightLine[0];
var maxHightLight = hightLightLine[1] ?? 0;

// var resource_path = 'https://raw.githubusercontent.com/nan0521/WDS-Adv-Resource/main';
var resource_path = 'https://raw.githubusercontent.com/wds-sirius/Adv-Resource/main'
const EventTypes = ['Main', 'Event', 'Side', 'Spot', 'Poster', 'Special']

// default story
var voicePlayer = new Audio()
function playVoice(VoiceFileName){
    if (!voicePlayer.paused){
        voicePlayer.pause();
    }

    voicePlayer.src = `${resource_path}/voice/${story_id}/${VoiceFileName}.mp3`;
    voicePlayer.play();
}

function hightLightLog(line){
  if(lastHightLight!= 0 && (Math.abs(line - lastHightLight) != 1)){
    Array.from(document.getElementsByClassName(`hightlight`)).forEach((ele) => ele.classList.remove('hightlight'))
  }
  document.getElementById(`log-${line}`).classList.add('hightlight');
  if(lastHightLight!= 0 && (Math.abs(line - lastHightLight) == 1)){
    minHightLight = Math.min(line, minHightLight, lastHightLight);
    maxHightLight = Math.max(line, maxHightLight, lastHightLight);
    window.location.hash = `${minHightLight}-${maxHightLight}`;
  }
  else{
    minHightLight = line;
    maxHightLight = line;
    window.location.hash = line;
  }
  lastHightLight = line;
}

function printStoryLog(episode, voicemanifest = []){

  let chaptername = document.getElementById('log-chapter');
  chaptername.innerHTML = ``;
  if(episode.Chapter && episode.Chapter !== "") {
    chaptername.innerHTML = episode.Chapter;
  }

  let titlename = document.getElementById('log-title');
  titlename.innerHTML = episode.Title ? episode.Title : '？？？';
  document.title = `${episode.Title ? episode.Title : '？？？' } | World Dai Star: Yume no Stellarium`;

  let player = document.getElementById('advplayer');
  player.classList.remove('hidden');
  player.href = `https://cpk0521.github.io/WDS_Adv_Player/?id=${episode.EpisodeId}`;

  let logList = document.getElementById('log-list');
  let index = 1;
  episode.EpisodeDetail.forEach(unit => {
      if(unit.Phrase !== ""){
        let elediv = document.createElement('div');
        let divid = index++;
        elediv.className = 'log-item';
        if(hightLightLine[1] && divid >= hightLightLine[0] && divid <= hightLightLine[1]){
            elediv.classList.add('hightlight')
        }else if(divid == hightLightLine[0]){
          elediv.classList.add('hightlight')
        }
        elediv.id = `log-${divid}`;
        elediv.onclick = () => hightLightLog(divid);
        elediv.innerHTML = `
          <div class="item-icon">
            <img src="./assets/characterlog/${unit.SpeakerIconId}.png">
          </div>
        `
        if (voicemanifest.includes(unit.VoiceFileName) || voicemanifest.length === 0){
          elediv.innerHTML += `<div class="item-voice"><img src="./assets/voice_btn.png" onclick="playVoice(${unit.VoiceFileName})"></div>`;
        }

        elediv.innerHTML += `<span class="item-name">${unit.SpeakerName ? unit.SpeakerName : ''}</span>`;
        elediv.innerHTML += `<div class="item-meg ${unit.SpeakerIconId === '1' ? 'tanin' : ''}">${unit.Phrase.replaceAll('/n', '\n')}</div>`;

        logList.appendChild(elediv);
      }
  });  

  let footer = document.getElementById('log-footer');
  if(episode.Prev){
    footer.innerHTML += `<a href="./viewer.html?id=${episode.Prev}" id="prevPage">前の回</a>`
  }
  footer.innerHTML += `<a href="./index.html#${EventTypes[episode.StoryType - 1]}" id="mainPage">戻る</a>`
  if(episode.Next){
    footer.innerHTML += `<a href="./viewer.html?id=${episode.Next}" id="nextPage">次の回</a>`
  }
}

//Poster story
const charSet = [
    {
      "Id": 101,
      "Name": "鳳ここな"
    },
    {
      "Id": 102,
      "Name": "静香"
    },
    {
      "Id": 103,
      "Name": "カトリナ・グリーベル"
    },
    {
      "Id": 104,
      "Name": "新妻八恵"
    },
    {
      "Id": 105,
      "Name": "柳場ぱんだ"
    },
    {
      "Id": 106,
      "Name": "流石知冴"
    },
    {
      "Id": 201,
      "Name": "連尺野初魅"
    },
    {
      "Id": 202,
      "Name": "烏森大黒"
    },
    {
      "Id": 203,
      "Name": "舎人仁花子"
    },
    {
      "Id": 204,
      "Name": "萬容"
    },
    {
      "Id": 205,
      "Name": "筆島しぐれ"
    },
    {
      "Id": 301,
      "Name": "千寿暦"
    },
    {
      "Id": 302,
      "Name": "ラモーナ・ウォルフ"
    },
    {
      "Id": 303,
      "Name": "王雪"
    },
    {
      "Id": 304,
      "Name": "リリヤ・クルトベイ"
    },
    {
      "Id": 305,
      "Name": "与那国緋花里"
    },
    {
      "Id": 401,
      "Name": "千寿いろは"
    },
    {
      "Id": 402,
      "Name": "白丸美兎"
    },
    {
      "Id": 403,
      "Name": "阿岐留カミラ"
    },
    {
      "Id": 404,
      "Name": "猫足蕾"
    },
    {
      "Id": 405,
      "Name": "本巣叶羽"
    }
];

const eptypes = ['情報', '第一幕', '第二幕', '第三幕', '第四幕', 'アフタートーク'];

function printPosterDetail(poster){
    document.title = `${poster.Title ? poster.Title : '？？？' } | World Dai Star: Yume no Stellarium`;
    let titlename = document.getElementById('log-chapter');
    titlename.innerHTML = 'ポスターストーリー';

    //select Btn
    let logList = document.getElementById('log-list');
    let options_left = document.getElementById('options');
    let optioninner = ``;
    optioninner += `<div class="aside-block poster-options">`
    eptypes.forEach((text, index)=>{
      
      // get content
      let content = poster.EpisodeDetail.filter((content) => content.EpisodeType == index);
      if(content.length){
        optioninner += `<button value="${index}" class="poster-options-btn ${index == 0 ? 'poster-options-btn-selecting' : ''}" onclick="selectPosterContent(${index})">${text}</button>`
      }

      let element = document.createElement('div');
      element.id = `posterEP-${index}`;
      element.className = 'posterEPContent hidden'
      let inner = '';
      if(index == 5){
          content.forEach(unit =>{
              inner += `<div class="log-item">`;
              inner += `<div class="item-icon">
                          <img src="./assets/characterlog/${unit.CharacterId}.png">
                      </div>`;
              inner += `<span class="item-name">${charSet.find(char => char.Id == unit.CharacterId)['Name']}</span>`;
              inner += `<div class="item-meg">${unit.Description.replaceAll('/n', '\n')}</div>`;
              inner += `</div>`;
          })
      }
      else{
          content.forEach(unit =>{
              inner += `<div class="poster-content">${unit.Description.replaceAll('/n', '\n')}</div>`;
          })
      }
      element.innerHTML = inner;
      logList.appendChild(element);
    })
    optioninner += `<button value="999" class="poster-options-btn" onclick="location.href='./index.html#Poster'">戻る</button>`
    optioninner += `</div>`;
    options_left.innerHTML = optioninner;

    selectPosterContent(0)

}

function selectPosterContent(eptypes){

    const btnlist = document.getElementsByClassName('poster-options-btn')
    Array.from(btnlist).forEach(btn =>{
        if(btn.value == eptypes){
            btn.classList.add('poster-options-btn-selecting');
        }else{
            btn.classList.remove('poster-options-btn-selecting');
        }
    })

    const contentlist = document.getElementsByClassName('posterEPContent');
    Array.from(contentlist).forEach(con => {
        if(con.id == `posterEP-${eptypes}`){
            con.classList.remove('hidden');
        }else{
            con.classList.add('hidden');
        }
    })

} 

//footer


// 404 Page
function show404(){
    document.title = `404 | World Dai Star: Yume no Stellarium`;
    let titlename = document.getElementById('log-chapter');
    titlename.innerHTML = `404 NOT FOUND`;
}

async function init(story_id){

  if(!story_id){
    return show404();
  }

  const data = await fetch(`${resource_path}/episode/${story_id}.json`)
    .then(resp => resp.json())
    .catch(err => console.log(err));

  if(!data){
    return show404();
  }

  if(data.StoryType == 5){
    printPosterDetail(data);
  }
  else{
    let voicedata = await fetch(`${resource_path}/voice/${story_id}/manifest.json`).then(resp => resp.json());
    printStoryLog(data, voicedata);
  }

}

init(story_id);