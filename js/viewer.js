var params = new URLSearchParams(window.location.search);
var story_id = params.get('id');
var resource_path = 'https://raw.githubusercontent.com/nan0521/WDS-Stories-Resource/main';

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
            inner += `<div class="item-meg">${unit.Phrase.replace('/n', '\n')}</div>`;
            inner += `</div>`;
        }
        
    });

    logList.innerHTML = inner;
}

if(story_id != null){
    fetch(`${resource_path}/episode/${story_id}.json`)
        .then((res) => res.json())
        .then((data)=>{
            printStoryLog(data);
        });
}