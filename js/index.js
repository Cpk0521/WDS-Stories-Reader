var hash = location.hash.replace(/^#/, '');
var resource_path = 'https://raw.githubusercontent.com/nan0521/WDS-Stories-Resource/main';
var masterlist;
var currType = '';

async function generatePage(){
    masterlist = await fetch(`${resource_path}/GameStoryMasterlist.json`).then((res) => res.json());
    let date = document.getElementById('latest');
    date.innerText = `Latest update: ${masterlist['LatestDate'].split(' ')[0]}`;

    hash?hash:hash='Main';
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

    loadStories(Type);
}

function loadStories(Type){
    console.log(masterlist.StoryMaster[Type])

    let listview = document.getElementById('listview')
    let inner = ``

    if(Type == 'Spot'){
        masterlist.StoryMaster[Type].forEach((ep) => {
            let html = ``
            html += `<div class="storyBlock">`
            html += `<a href="./viewer.html?id=${ep.EpisodeId}">${ep.EpisodeId}_${ep.Title ? ep.Title : ep.EpisodeId}</a>`
            html +=  `</div>`
            inner += html
        })
    }else{
        masterlist.StoryMaster[Type].forEach((group) => {
            let html = ``
            html += `<div class="storyBlock">`
            group.Episode.forEach(ep => html += `<a href="./viewer.html?id=${ep.EpisodeId}">${ep.Title ? ep.Title : ep.EpisodeId}</a>`)
            html +=  `</div>`
            inner += html
        })
    }

    listview.innerHTML = inner;

}

generatePage();