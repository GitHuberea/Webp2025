  let apiKey = 'ca370d51a054836007519a00ff4ce59e';
  let imglist_Url = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&per_page=10&format=json&nojsoncallback=1`;

  function getimg() {
    fetch(imglist_Url)
      .then(res => res.json())
      .then(data => {
        const photos = data.photos.photo;
        let promises = photos.map(photo => {
          let img_Url = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${photo.id}&format=json&nojsoncallback=1`;
          return fetch(img_Url)
            .then(res => res.json())
            .then(imgData => {
              const sizes = imgData.sizes.size;
              const smallSize = sizes.find(size => size.label === "Small" || size.label === "Medium");
              return smallSize ? smallSize.source : null;
            });
        });

        Promise.all(promises).then(imgUrls => {
          const validUrls = imgUrls.filter(url => url !== null);
          add_new_img(validUrls);
        });
      });
  }

  function add_new_img(imgUrls) {
    var gal = document.getElementById("gallery");
    gal.innerHTML = "";
    imgUrls.forEach(url => {
      var img = document.createElement("img");
      img.setAttribute("src", url);
      gal.appendChild(img);
    });
  }