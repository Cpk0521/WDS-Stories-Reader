var resource_path = 'https://raw.githubusercontent.com/nan0521/WDS-Stories-Resource/main';

async function generate(){
    const masterlist = await fetch(`${resource_path}/storylist.json`).then((res) => res.json());

    let date = document.getElementById('latest');
    date.innerText = `Latest Update : ${masterlist['LatestDate']}`;

    const alllist = Object.values(masterlist).flat();
    let divlist = document.getElementById('stories');
    let inner = '';
    alllist.forEach((ep)=>{
        console.log(ep.EpisodeId)
        if(ep.EpisodeId){
            inner += `<a href="./viewer.html?id=${ep.EpisodeId}">${ep.EpisodeId}_${ep.Title ? ep.Title : ep.EpisodeId}</a><br>`;
        }
    })
    divlist.innerHTML = inner;
}

generate()