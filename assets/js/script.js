// https://jsonplaceholder.typicode.com/posts

async function readPosts() {

    const postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Carregando...';


    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();
    console.log(json);

    if (json.length > 0) {
        postArea.innerHTML = '';

        for (let i in json) {
            let postHtml = `<div><h2>${json[i].title}</h2>${json[i].body}<hr/></div>`;
            postArea.innerHTML += postHtml;
        }
    } else {
        postArea.innerHTML = 'Nenhum post para exibir';
    }
    
    // let createDiv = document.createElement('div');
    // createDiv.classList.add('posts');
    // document.body.appendChild(createDiv);
}

readPosts();