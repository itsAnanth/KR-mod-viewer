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
function imageExists(url, callback) {
    return new Promise(r => {
        var img = new Image();
        img.onload = function () { r(true); };
        img.onerror = function () { r(false); };
        img.src = url;
    })
}


async function displayMod(element) {
    const link = document.createElement("a");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("p");
    const creator = document.createElement("p");
    name.className = 'name'
    creator.className = 'creator'
    name.className = 'mod-name'

    let endp = `https://user-assets.krunker.io/md${element.mod_id}/thumb.png`;
    let thumbnail;
    const t = await imageExists(endp);
    t ? thumbnail = endp : thumbnail = './Assets/NoThumb.png'
    element.mod_url == "ua" ?
        link.href = `https://user-assets.krunker.io/md${element.mod_id}/mod.zip`
        :
        link.href = element.mod_url;
    div.className = "mod";
    link.textContent = 'Download'
    div.className = 'col-md-2 col-4 box';
    img.src = thumbnail;
    creator.innerHTML = `by ${element.creatorname}`;
    name.innerHTML = element.mod_name;
    for (el of [img, name, creator, link])
        div.appendChild(el);
    con.appendChild(div);
}

find();