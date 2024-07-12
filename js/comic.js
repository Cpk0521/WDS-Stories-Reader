var params = new URLSearchParams(window.location.search);
var comic_id = params.get('id');
// var resource_path = 'https://raw.githubusercontent.com/nan0521/WDS-Adv-Resource/main';
var resource_path = 'https://raw.githubusercontent.com/wds-sirius/Adv-Resource/main'

async function init(comic_id){
    let comiclist =  await fetch(`${resource_path}/manifest/Comic.json`).then(resp => resp.json());

    if(!comic_id){
        return show404();
    }

    const data = comiclist.find(comic => comic.id == comic_id);

    if(!data){
        return show404();
    }

    let titlename = document.getElementById('log-title');
    titlename.innerHTML = data.title ?? '？？？';
    document.title = `${data.title ? data.title : '？？？' } | World Dai Star: Yume no Stellarium`;

    let content = document.getElementById('log-list');
    content.innerHTML += `<img src='${resource_path}/comic/${data.filename}.png'></img>`;
    let footer = document.getElementById('log-footer');
    if(data.id - 1 > 0){
      footer.innerHTML += `<a href="./comic.html?id=${data.id - 1}" id="prevPage">前の回</a>`
    }
    footer.innerHTML += `<a href="./index.html#Comic" id="mainPage">戻る</a>`
    if(data.id < comiclist.length){
      footer.innerHTML += `<a href="./comic.html?id=${data.id + 1}" id="nextPage">次の回</a>`
    }
}


// 404 Page
function show404(){
    document.title = `404 | World Dai Star: Yume no Stellarium`;
    let titlename = document.getElementById('log-title');
    titlename.innerHTML = `404 NOT FOUND`;
}

init(comic_id)