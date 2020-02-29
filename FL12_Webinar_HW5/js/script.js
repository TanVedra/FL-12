fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => users.forEach(user => showUserData(user))
    )

function showUserData(user) {
    if (!document.querySelector('#main')) {
        let main = document.createElement('div');
        main.setAttribute('id', 'main');
        document.body.appendChild(main);
    }
    location.hash = '#main';

    const form = document.createElement('form');
    form.setAttribute('id', `user${user.id}`);

    const title = document.createElement('h3');
    title.textContent = user.name;
    title.setAttribute('data-id', user.id);
    title.addEventListener('click', redirect);

    const avatar = document.createElement('img');
    avatar.setAttribute('class', 'avatar');
    avatar.setAttribute('src', `img/cat${randomInteger(1, 5)}.jpg`);
    avatar.setAttribute('data-id', user.id);
    avatar.addEventListener('click', redirect);
    title.appendChild(avatar);

    const divName = document.createElement('div');
    divName.textContent = 'Name: ';
    const name = document.createElement('input');
    name.value = user.name;
    name.setAttribute('name', 'name');

    const divUserName = document.createElement('div');
    divUserName.textContent = 'Username: ';
    const username = document.createElement('input');
    username.value = user.username;
    username.setAttribute('name', 'username');

    const divEmail = document.createElement('div');
    divEmail.textContent = 'Email: ';
    const email = document.createElement('input');
    email.value = user.email;
    email.setAttribute('name', 'email');

    const divPhone = document.createElement('div');
    divPhone.textContent = 'Phone: ';
    const phone = document.createElement('input');
    phone.value = user.phone;
    phone.setAttribute('name', 'phone');

    const divWebsite = document.createElement('div');
    divWebsite.textContent = 'Website: ';
    const website = document.createElement('input');
    website.value = user.website;
    website.setAttribute('name', 'website');

    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.setAttribute('data-id', `#user${user.id}`);
    btnEdit.setAttribute('class', 'edit');
    btnEdit.addEventListener('click', funcEdit);

    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Delete';
    btnDelete.setAttribute('data-id', `#user${user.id}`);
    btnDelete.setAttribute('class', 'delete');
    btnDelete.addEventListener('click', funcDelete);

    divName.appendChild(name);
    divUserName.appendChild(username);
    divEmail.appendChild(email);
    divPhone.appendChild(phone);
    divWebsite.appendChild(website);

    form.appendChild(title);
    form.appendChild(divName);
    form.appendChild(divUserName);
    form.appendChild(divEmail);
    form.appendChild(divPhone);
    form.appendChild(divWebsite);
    form.appendChild(btnEdit);
    form.appendChild(btnDelete);

    main.appendChild(form);
}

function funcEdit(event) {
    event.preventDefault();
    loaderSpinner(event.target.dataset.id);

    const form = document.querySelector(event.target.dataset.id);
    const data = {};
    data.id = event.target.dataset.id.replace('#user', '');

    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].type === 'text') {
            data[form.elements[i].getAttribute('name')] = form.elements[i].value;
        }
    }
    fetch(`https://jsonplaceholder.typicode.com/users/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            loaderSpinner();
        })

}

function funcDelete(event) {
    event.preventDefault();
    loaderSpinner(event.target.dataset.id);

    const form = document.querySelector(event.target.dataset.id);
    const id = event.target.dataset.id.replace('#user', '');
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.status === 200) {
                removeNode(form);
                console.log('Deleted successfull!');
            } else {
                console.log(`Somesing went wrong: ${response.status}`);
            }
        })
}

function removeNode(element) {
    element.remove();
}

function redirect(e) {
    document.querySelector('#main').style.display = 'none';

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${e.target.dataset.id}`)
        .then(response => response.json())
        .then(posts => showUserPosts(posts))
}

function showUserPosts(data) {
    let posts = document.createElement('div');
    posts.setAttribute('id', `user${data[0].userId}_posts`);
    document.body.appendChild(posts);
    location.hash = `#user${data[0].userId}_posts`;

    data.forEach(post => {
        const article = document.createElement('article');
        article.setAttribute('id', `post${post.id}`);
        article.innerHTML = `<h3>Post ${post.id}: </h3>`;

        const title = document.createElement('h4');
        title.textContent = post.title;

        const content = document.createElement('p');
        content.textContent = post.body;

        article.appendChild(title);
        article.appendChild(content);
        showPostComments(article);
        posts.appendChild(article);
    });
}

function showPostComments(article) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${article.getAttribute('id').replace('post', '')}/comments`)
        .then(response => response.json())
        .then(comments => {
            const content = document.createElement('div');
            content.setAttribute('class', 'comments');
            comments.forEach(comment => {
                const wrapper = document.createElement('div');
                wrapper.setAttribute('class', 'wrapper');
                wrapper.innerHTML = `<h4>Comment ${comment.id}: </h4>`;

                const nameSpan = document.createElement('span');
                nameSpan.setAttribute('class', 'name');
                nameSpan.textContent = `Name: ${comment.name}`;

                const emailSpan = document.createElement('span');
                emailSpan.setAttribute('class', 'email');
                emailSpan.textContent = `Email: ${comment.email}`;

                const text = document.createElement('p');
                text.setAttribute('class', 'text');
                text.textContent = comment.body;

                wrapper.appendChild(nameSpan);
                wrapper.appendChild(emailSpan);
                wrapper.appendChild(text);
                article.appendChild(wrapper);
            });
        })
}

function loaderSpinner(id) {
    if (!document.querySelector('.gif-loader')) {
        const form = document.querySelector(id);
        const gifLoader = document.createElement('img');
        gifLoader.setAttribute('class', 'gif-loader');
        gifLoader.setAttribute('src', 'img/giphy.gif');
        form.appendChild(gifLoader);
    } else {
        removeNode(document.querySelector('.gif-loader'));
    }
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}