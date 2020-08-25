// javascript
console.log('Hello world');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');

loadingElement.style.display = 'None';

// we want to let the user know that the data is loading
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // console.log('form submitted');
  const formData = new FormData(form);
  const name = formData.get('Name');
  const content = formData.get('content');

  const mew = {
    name,
    content
  };

  console.log(mew);

  form.style.display = 'none';
  loadingElement.style.display = '';
});


