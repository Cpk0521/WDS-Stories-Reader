var params = new URLSearchParams(window.location.search);
var story_id = params.get('id');
var resource_path = 'https://raw.githubusercontent.com/nan0521/WDS-Adv-Resource/main';
const EventTypes = ['Main', 'Event', 'Side', 'Spot', 'Poster']


// default story
var voicePlayer = new Audio()
function playVoice(VoiceFileName){
    if (!voicePlayer.paused){
        voicePlayer.pause();
    }

    voicePlayer.src = `${resource_path}/voice/${story_id}/${VoiceFileName}.mp3`;
    voicePlayer.play();
}

function printStoryLog(episode){

    let titlename = document.getElementById('log-title');
    titlename.innerHTML = episode.Title ? episode.Title : '？？？';
    document.title = `${episode.Title ? episode.Title : '？？？' } | World Dai Star: Yume no Stellarium`;

    let logList = document.getElementById('log-list');
    let inner = '';
    episode.EpisodeDetail.forEach(unit => {
        
        if(unit.Phrase !== ""){
            inner += `<div class="log-item">`;
            inner += `<div class="item-icon">
                        <img src="./assets/characterlog/${unit.SpeakerIconId}.png">
                      </div>`;
            inner += `<div class="item-voice"><img src="./assets/voice_btn.png" onclick="playVoice(${unit.VoiceFileName})"></div>`;
            inner += `<span class="item-name">${unit.SpeakerName ? unit.SpeakerName : ''}</span>`;
            inner += `<div class="item-meg">${unit.Phrase.replaceAll('/n', '\n')}</div>`;
            inner += `</div>`;
        }
        
    });

    logList.innerHTML = inner;

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
    let titlename = document.getElementById('log-title');
    titlename.innerHTML = 'ポスターストーリー';

    //select Btn
    let logList = document.getElementById('log-list');
    let options_left = document.getElementById('options');
    let optioninner = ``;
    optioninner += `<div class="aside-block poster-options">`
    eptypes.forEach((text, index)=>{
        optioninner += `<button value="${index}" class="poster-options-btn ${index == 0 ? 'poster-options-btn-selecting' : ''}" onclick="selectPosterContent(${index})">${text}</button>`

        //content
        let content = poster.EpisodeDetail.filter((content) => content.EpisodeType == index);
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
    let titlename = document.getElementById('log-title');
    titlename.innerHTML = `404 NOT FOUND`;
}

// main run
if(story_id != null){
    fetch(`${resource_path}/episode/${story_id}.json`)
        .then((res) => res.json())
        .catch((error)=>{
            show404();
        })
        .then((data)=>{
            if (data.StoryType == 5){
                printPosterDetail(data);
            }else{
                printStoryLog(data);
            }
        })
}else{
    show404();
}