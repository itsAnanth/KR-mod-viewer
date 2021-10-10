const con = document.querySelector('.row');
const inputbtn = document.getElementById('mod-input-btn');
const input = document.getElementById('mod-input');

input.addEventListener('keydown', event => {
    if (event.keyCode === 13) {
        event.preventDefault();
        find();
    };
})
inputbtn.addEventListener('click', event => {
    event.preventDefault();
    find();
});

async function find() {
    clearList();
    const options = {
        uri: `https://api.krunker.io/webhooks/general/mods/search?val=${input.value}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36',
            'origin': 'https://krunker.io',
        },
        json: true, // Automatically parses the JSON string in the response
    };
    const get = await fetch(`https://api.krunker.io/webhooks/general/mods/search?val=${input.value}`); //, options);
    var json = await get.json();
    json.data.forEach(element => {
        displayMod(element);
    });

    
}

function clearList() {
    con.innerHTML = '';
}

async function checkIfBgExists(link) {
    const res = await fetch(link).catch(console.error);
    if (!res) return;
    console.log(await res.text());
}

function displayMod(element) {
    const link = document.createElement("a");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("p");
    const creator = document.createElement("p");
    name.className = 'name'
    creator.className = 'creator'
    name.className = 'mod-name'
    // fetch('https://user-assets.krunker.io/md${element.mod_id}/thumb.png').then(res => {
    //     if (res.status == 403) return;
    //     else console.log(res);
    // })
    // .catch(e => {})
    // let thumbnail = `https://user-assets.krunker.io/md${element.mod_id}/thumb.png`;
    checkIfBgExists('https://user-assets.krunker.io/md${element.mod_id}/thumb.png');
    if (element.mod_url == "ua") link.href = `https://user-assets.krunker.io/md${element.mod_id}/mod.zip`;
    else link.href = element.mod_url;
    div.className = "mod";
    link.textContent = 'Download'

    
    // if (!thumbnail) thumbnail = './NoThumb.png';
    // img.src = thumbnail;
    creator.innerHTML = `<span>by </span>${element.creatorname}`;
    name.innerHTML = element.mod_name;
    // div.style.padding = '20px'
    // div.appendChild(img);   
    // div.appendChild(link);
    div.appendChild(name);
    div.appendChild(creator);
    div.className = 'col-md-2 col-4 box';
    con.appendChild(div);
    div.appendChild(link)
}

find();