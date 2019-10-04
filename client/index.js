const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const mewsElement = document.querySelector('.mews');
const API_URL = 'http://localhost:5000/mews';

loadingElement.style.display = 'none';

listAllMews();

form.addEventListener('submit',(event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const mew = {
        name,
        content
    };
  form.style.display = 'none';
  loadingElement.style.display = '';


  fetch(API_URL, {
   method : 'POST',
   body : JSON.stringify(mew),
   headers : {
     'content-type' : 'application/json'
    }
   }).then((response) => {
    return  response.json()
   }).then((createdMew) => {
    form.reset();
    form.style.display = '';
    listAllMews();
    });
});


function listAllMews() {
  mewsElement.innerHtml = '';
  fetch(API_URL)
   .then((response) => {
     return response.json()
   }).then((mews) => {
     mews.reverse();
     mews.forEach((mew) => {
       const div = document.createElement('div');

       const header = document.createElement('h1');
       header.textContent = mew.name;

       const contents = document.createElement('h5');
       contents.textContent = mew.content;

       const date = document.createElement('small');
       date.textContent = new Date(mew.created);

       div.appendChild(header);
       div.appendChild(contents);
       div.appendChild(date);


      mewsElement.appendChild(div);

     });
    loadingElement.style.display = 'none';

   });
}



// .then(response => response.json())
//     .then(createdMew => {
//       console.log(createdMew);