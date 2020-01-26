const structure = [
  {
    'folder': true,
    'title': 'Films',
    'children': [
      {
        'title': 'Iron Man.avi'
      },
      {
        'folder': true,
        'title': 'Fantasy',
        'children': [
          {
            'title': 'The Lord of the Rings.avi'
          },
          {
            'folder': true,
            'title': 'New folder 1',
            'children': false
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Documents',
    'children': [
      {
        'folder': true,
        'title': 'EPAM Homework answers',
        'children': null
      }
    ]
  }
];

const rootNode = document.getElementById('root');

// Todo: your code goes here


function createFolderTree(structure, out) {
  const list = document.createElement('ul');
  list.setAttribute('class', 'hide');

  structure.forEach(function (item) {
    const pieceOfList = document.createElement('li');

    if (item.folder) {
      pieceOfList.innerHTML = `<p><i class='material-icons'>folder</i>${item['title']}</p>`;
      pieceOfList.firstChild.setAttribute('class', 'folder');
      if (!item.children) {
        const list = document.createElement('ul');
        list.setAttribute('class', 'hide empty-list');

        list.innerHTML = `<li><p class='empty'>Folder is empty</p></li>`;
        pieceOfList.appendChild(list);
      }
    } else if (item.title && !item.folder) {
      pieceOfList.innerHTML = `<p><i class='material-icons'>insert_drive_file</i>${item['title']}</p>`;
      pieceOfList.firstChild.setAttribute('class', 'file');
    }

    if (item.folder) {
      if (item.children) {
        createFolderTree(item.children, pieceOfList);
      }
    }
    if (list.parentElement) {
      if (list.parentElement.getAttribute('id')) {
        list.classList.remove('hide');
      }
    }
    list.appendChild(pieceOfList);
    out.appendChild(list);
  });
}

createFolderTree(structure, rootNode);

let paragraphs = document.querySelectorAll('p.folder').forEach(function (item) {
  item.onclick = showOrHide;
  item.firstChild.onclick = showOrHide;
});

function showOrHide(e) {
  e.stopPropagation();

  if (e.target.classList.contains('folder')) {
    if (e.target.firstChild.textContent === 'folder') {
      e.target.firstChild.textContent = 'folder_open';
    } else {
      e.target.firstChild.textContent = 'folder';
    }
    e.target.nextElementSibling.classList.toggle('hide');
  } else {
    if (e.target.textContent === 'folder') {
      e.target.textContent = 'folder_open';
    } else {
      e.target.textContent = 'folder';
    }
    e.target.parentNode.nextElementSibling.classList.toggle('hide');
  }
}