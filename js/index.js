var hash = location.hash.replace(/^#/, '');
var resource_path = 'https://raw.githubusercontent.com/nan0521/WDS-Adv-Resource/main';
var masterlist;
var currType = '';
// target="_blank"
async function generatePage(){
    masterlist = await fetch(`${resource_path}/GameStoryMasterlist.json`).then((res) => res.json());
    let date = document.getElementById('latest');
    date.innerText = `Latest update: ${masterlist['LatestDate'].split(' ')[0]}`;

    hash?hash:hash='Main';
    loadAllStories();
    selectType(hash);
}

function selectType(Type){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    const btntab = document.getElementsByClassName("option-btn");
    Array.from(btntab).forEach(element => {
        if(element.id == `${Type}div`){
            element.classList.add('btn-selecting');
        }
        else{
            element.classList.remove('btn-selecting'); 
        }
    });

    const listviewtab = document.getElementsByClassName("listview");
    Array.from(listviewtab).forEach(element => {
        if(element.id == `${Type}List`){
            element.classList.remove('hidden');
        }
        else{
            element.classList.add('hidden'); 
        }
    });
}

function loadAllStories(){

    //Main Type
    let mainlist = document.getElementById('MainList');
    let mainlistinner = ``;
    masterlist.StoryMaster['Main'].forEach((group) => {
        let html = ``;
        html += `<div class="storyBlock">`;
        html += `<div class="storyIcon"><img src="./assets/logo/logo_${group.CompanyId}.png"><span>${group.CompanyId == 999 ? '序章' : `第 ${group.ChapterOrder} 章`}</span></div>`;
        html += `<div class="storyChapter">`;
        group.Episode.forEach(ep => html += `<a href="./viewer.html?id=${ep.EpisodeId}">${ep.Title ? ep.Title : ep.EpisodeId}</a>`);
        html +=  `</div></div>`;
        mainlistinner += html;
    })
    mainlist.innerHTML = mainlistinner;

    //Event Type
    let eventlist = document.getElementById('EventList');
    let eventlistinner = ``;
    masterlist.StoryMaster['Event'].forEach((group) => {
        let html = ``;
        html += `<div class="storyBlock">`;
        html += `<div class="storyIcon"><img src="${resource_path}/image/eventLogo/logo_${group.Id}.png"><span>${group.Title}</span></div>`;
        html += `<div class="storyChapter">`;
        group.Episode.forEach(ep => html += `<a href="./viewer.html?id=${ep.EpisodeId}">${ep.Title ? ep.Title : ep.EpisodeId}</a>`);
        html +=  `</div></div>`;
        eventlistinner += html;
    })
    eventlist.innerHTML = eventlistinner;

    //Side Type
    let sidelist = document.getElementById('SideList');
    let sidelistinner = ``;
    masterlist.StoryMaster['Side'].forEach((group) => {
        let html = ``;
        html += `<div class="characterBlock">`;
        html += `<div class="side-header"><img src="./assets/cuteIcon/${group.Id}.png"><span>${group.Name}</span></div>`;
        html += `<div class="side-groups">`;
        group.Groups.forEach((EPgroup)=>{
            html += `<div class="storyBlock side-storyBlock">`;
            html += `<div class="storyIcon"><img src="${resource_path}/image/cardIcon/${EPgroup.Id}_0.png"></div>`;
            html += `<div class="storyChapter">`;
            EPgroup.Episode.forEach(ep => {
                html += `<a href="./viewer.html?id=${ep.EpisodeId}">${EPgroup.Title}${ep.Order == 1? '(前編)' : '(後編)'}</a>`;
            })
            html += `</div></div>`;
        })
        html += `</div></div>`;

        sidelistinner += html;
    });
    sidelist.innerHTML = sidelistinner;

    //Spot Type
    let spotlist = document.getElementById('SpotList');
    let spotlistinner = ``;
    masterlist.StoryMaster['Spot'].forEach((ep) => {
        let html = ``;
        html += `<div class="storyBlock">`;
        html += `<div class="spotIcon">`;
        ep.CharacterIds.forEach(charid => html +=  `<img src="./assets/characterlog/${charid}.png">`);
        html += `</div>`;
        html += `<div class="storyChapter"><a href="./viewer.html?id=${ep.EpisodeId}">スポット会話ストーリー</a></div>`;
        html +=  `</div>`;
        spotlistinner += html;
    })
    spotlist.innerHTML = spotlistinner;

    //Poster Type
    let posterlist = document.getElementById('PosterList');
    posterlist.classList.add('posterlistview');
    let posterlistinner = ``;
    masterlist.StoryMaster['Poster'].forEach((poster) => {
        let html = ``;
        html += `<div class="storyBlock poster-storyBlock">`;
        html += `<div class="storyIcon"><img src="${resource_path}/image/posterIcon/${poster.Id}.png"></div>`;
        html += `<div class="storyChapter"><a href="./viewer.html?id=${poster.Id}">${poster.Name}</a></div>`;
        html +=  `</div></div>`;
        posterlistinner += html;
    })
    posterlist.innerHTML = posterlistinner;

    //Special Type
    let speciallist = document.getElementById('SpecialList');
    let speciallistinner = ``;
    masterlist.StoryMaster['Special'].forEach((ep) => {
        let html = ``;
        html += `<div class="storyBlock">`;
        html += `<div class="spotIcon">`;
        // ep.CharacterIds.forEach(charid => html +=  `<img src="./assets/characterlog/${charid}.png">`);
        html += `</div>`;
        html += `<div class="storyChapter"><a href="./viewer.html?id=${ep.EpisodeId}">限定ストーリー</a></div>`;
        html +=  `</div>`;
        speciallistinner += html;
    })
    speciallist.innerHTML = speciallistinner;
}

generatePage();