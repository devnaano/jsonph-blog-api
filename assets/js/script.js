// https://jsonplaceholder.typicode.com/posts
const postsUrl = "https://jsonplaceholder.typicode.com/posts";


async function readPosts() {

    const postArea = document.querySelector('.posts-area');
    postArea.innerHTML = 'Carregando...';


    let response = await fetch(postsUrl);
    let json = await response.json();

    if (json.length > 0) {
        postArea.innerHTML = '';

        for (let i in json) {
            let createDivEl = document.createElement('div');
            createDivEl.classList.add('post');

            let createH2El = document.createElement('h2');
            createH2El.innerHTML = `${json[i].title}`;
            createDivEl.appendChild(createH2El);

            let createPEl = document.createElement('p');
            createPEl.innerHTML = `${json[i].body}`;
            createDivEl.appendChild(createPEl);

            let createButtonEl = document.createElement('button');
            createButtonEl.innerHTML = 'Ler';
            createDivEl.appendChild(createButtonEl);

            let createHrEl = document.createElement('hr');
            createDivEl.appendChild(createHrEl);
            
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