var params = new URLSearchParams(window.location.search);
var story_id = params.get('id');
var resource_path = 'https://raw.githubusercontent.com/nan0521/WDS-Stories-Resource/main';

async function findTilte(id){
    const masterlist = await fetch(`${resource_path}/storylist.json`).then((res) => res.json());
    const alllist = Object.values(masterlist).flat();
    let title = alllist.find(ep => ep.EpisodeId == id);
    let titlename = document.getElementById('log-title');

    titlename.innerHTML = title.Title ? title.Title : '？？？';
    document.title = `${title.Title ? title.Title : '？？？' } | World Dai Star: Yume no Stellarium`;
}

function printStoryLog(episode){
    let logList = document.getElementById('log-list');
    let inner = '';
    episode.forEach(unit => {

        if(unit.Phrase !== ""){

            inner += `<div class="log-item">`;
            inner += `<div class="item-icon">
                        <img src="./assets/characterlog/${unit.SpeakerIconId}.png">
                      </div>`;
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
            findTilte(story_id);
            printStoryLog(data);
        });
}