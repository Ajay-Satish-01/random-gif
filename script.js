const api = 'https://random-word-api.herokuapp.com/word?number=1';

const fetchapi = async () => {
  let fetching = await fetch(api);
  let jsonconvert = await fetching.json();
  console.log(jsonconvert[0]);
  let api2fetching = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=RKBE1LRs3nqsL6XoecsydAfwpsDMmXdJ&q=${jsonconvert[0]}&limit=10&offset=0&rating=g&lang=en
`
  );

  let jsonconvertion2 = await api2fetching.json();
  console.log(jsonconvertion2);
  if (jsonconvertion2.data.length > 0) {
    dom(jsonconvertion2.data, jsonconvert[0]);
  } else {
    alert('No GIFS found');
  }
};
function dom(array, word) {
  array.map((gif) => {
    gifs(gif, word);
    console.log(gif.images.downsized.url);
  });
}

let container = document.getElementById('gif');

let rowdiv = document.createElement('div');
rowdiv.setAttribute('class', 'row');

function gifs(gif, word) {
  let col1 = document.createElement('div');
  col1.setAttribute('class', 'col-6');

  let carddiv = document.createElement('div');
  carddiv.setAttribute('class', 'card m-2 ');
  let img = document.createElement('img');
  img.src = gif.images.downsized.url;
  img.setAttribute('class', 'card-img-top');
  let cardbody = document.createElement('div');
  cardbody.setAttribute('class', 'card-body');
  let h5 = document.createElement('h5');
  h5.setAttribute('class', 'card-title');
  h5.innerText = 'The URL for this gif is ' + gif.images.downsized.url;
  let p = document.createElement('p');
  p.setAttribute('class', 'card-text p-2');
  p.innerText = word;
  cardbody.append(h5, p);
  carddiv.append(img, cardbody);
  col1.append(carddiv);
  rowdiv.append(col1);
  container.append(rowdiv);
  document.body.append(container);
}
fetchapi();
