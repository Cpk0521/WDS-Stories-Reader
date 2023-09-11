var resource_path = 'https://raw.githubusercontent.com/nan0521/WDS-Stories-Resource/main';

async function generatePage(){
    const masterlist = await fetch(`${resource_path}/GameStoryMasterlist.json`).then((res) => res.json());
    let date = document.getElementById('latest');
    date.innerText = `Latest Update: ${masterlist['LatestDate']}`;

    let divlist = document.getElementById('stories');
    let inner = '';

    //Main Story
    masterlist.StoryMaster.Main.forEach((main)=>{
        main.Episode.forEach((ep)=>{
            inner += `<a href="./viewer.html?id=${ep.EpisodeId}">${ep.EpisodeId}_${ep.Title ? ep.Title : ep.EpisodeId}</a><br>`;
        })
    })

    //Event
    masterlist.StoryMaster.Event.forEach((event)=>{
        event.Episode.forEach((ep)=>{
            inner += `<a href="./viewer.html?id=${ep.EpisodeId}">${ep.EpisodeId}_${ep.Title ? ep.Title : ep.EpisodeId}</a><br>`;
        })
    })

    //Side
    masterlist.StoryMaster.Side.forEach((side)=>{
        side.Episode.forEach((ep)=>{
            inner += `<a href="./viewer.html?id=${ep.EpisodeId}">${ep.EpisodeId}_${ep.Title ? ep.Title : ep.EpisodeId}</a><br>`;
        })
    })

    //Spot
    masterlist.StoryMaster.Spot.forEach((ep)=>{
        inner += `<a href="./viewer.html?id=${ep.EpisodeId}">${ep.EpisodeId}_${ep.Title ? ep.Title : ep.EpisodeId}</a><br>`;
    })

    divlist.innerHTML = inner;
}

generatePage()