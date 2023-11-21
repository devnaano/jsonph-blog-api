// https://jsonplaceholder.typicode.com/posts
const postsUrl = "https://jsonplaceholder.typicode.com/posts";
const usersUrl = "https://jsonplaceholder.typicode.com/users";

async function readPosts() {

    const postArea = document.querySelector('.posts-area');
    postArea.innerHTML = 'Carregando...';


    let response = await fetch(postsUrl);
    let json = await response.json();
    console.log(json);

    if (json.length > 0) {
        postArea.innerHTML = '';

        for (let i in json) {

            let responseUser = await fetch(`${usersUrl}/${json[i].userId}`);
            let jsonUser = await responseUser.json();
 
            let createDivEl = document.createElement('div');
            createDivEl.classList.add('post');

            let createH2El = document.createElement('h2');
            createH2El.innerHTML = `${json[i].title}`;
            createDivEl.appendChild(createH2El);

            let createPEl = document.createElement('p');
            createPEl.innerHTML = `${json[i].body}`;
            createDivEl.appendChild(createPEl);

            let createAEl = document.createElement('a');
            createAEl.setAttribute('href',`${postsUrl}/${json[i].id}/comments`)
            createAEl.innerHTML = 'Ler';
            createDivEl.appendChild(createAEl);

            let createHrEl1 = document.createElement('hr');
            createDivEl.appendChild(createHrEl1);
            
            let createH3El = document.createElement('h3');
            createH3El.innerHTML = `Autor: ${jsonUser.username}`;
            createDivEl.appendChild(createH3El);

            let createHrEl2 = document.createElement('hr');
            createDivEl.appendChild(createHrEl2);

            postArea.appendChild(createDivEl);
        }
    } else {
        postArea.innerHTML = 'Nenhum post para exibir';
    }
}


async function addNewPost(title, body) {
    await fetch(
        postsUrl,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //NO JS QUANDO TEM UM OBJETO QUE A PROPRIEDADE É O MESMO NOME DE UMA VARIAVEL QUE ESTA SENDO INSERIDA VOCE PODE SIMPLISMENTE COLOCAR UMA VEZ QUE ELE ENTENDE
                // METODO PADRÃO
                // title: title,
                // body: body,
                // userId: 2

                //JAVASCRIPT TBM ENTENDE
                title,
                body,
                userId: 2
            })
        }
    );

    document.querySelector('#titleField').value = '';
    document.querySelector('#bodyField').value = '';

    readPosts();
}



document.querySelector('#insertButton').addEventListener('click', () => {
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    if (title && body) {
        addNewPost(title, body);
    } else {
        alert("Preencha todos os campos!");
    }
})

readPosts();