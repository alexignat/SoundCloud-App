/* 1. Search */

// var UI = {

// };
// UI.EnterPress
// UI.SubmitClick


// caputures the value of the search field with the enter key is pressed
document.querySelector(".js-search").addEventListener('keyup', function(e) {
	var input = document.querySelector("input").value;

	// if the key enter is pressed then execute
	if (e.which === 13) {	
		soundCloudAPI.getTrack(input);
	};
});



/* 2. Query Soundcloud API */

var soundCloudAPI = {};

soundCloudAPI.init = function() {
	SC.initialize({
  	client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
  	});
}


soundCloudAPI.init();

soundCloudAPI.getTrack = function(inputValue) {
	SC.get('/tracks', {
    q: inputValue
  }).then(function(tracks) {
    console.log(tracks);
    soundCloudAPI.renderTracks(tracks);
  });
}

/* 3. Display content */

// soundCloudAPI.getTrack(tracks);

/* dynamically create cards */
soundCloudAPI.renderTracks = function(tracks) {

	tracks.forEach(function(track) {

		// card
		var card = document.createElement('div');
		card.classList.add('card');

		//image
		var imageDiv = document.createElement('div');
		imageDiv.classList.add('image');

		var image_img = document.createElement('img');
		image_img.classList.add('image_img');
		image_img.src = track.artwork_url || 'http:/lorempixel.com/100/100/abstract/';

		imageDiv.appendChild(image_img);

		//content

		var content = document.createElement('div');
		content.classList.add('content');

		var header = document.createElement('div');
		header.classList.add('header');
		header.innerHTML = '<a href="' + track.permalink_url + '"target="_blank">' + track.title + '</a>';

		//button
		var button = document.createElement('div');
		button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

		var icon = document.createElement('i');
		icon.classList.add('add', 'icon');

		var buttonText = document.createElement('span');
		buttonText.innerHTML = 'Add to playlist';

		//appendChild
		content.appendChild(header);

		button.appendChild(icon);
		button.appendChild(buttonText);

		button.addEventListener('click', function(){
			soundCloudAPI.getEmbed(track.permalink_url);
		});

		card.appendChild(imageDiv);
		card.appendChild(content);
		card.appendChild(button);

		var searchResults = document.querySelector('.js-search-results');
		searchResults.appendChild(card);
	});
};



// stores songs so that when you refresh they do not disapear
// soundCloudAPI.getEmbed = function(trackURL) {
// 	SC.oEmbed(trackURL, {
// 	  auto_play: true
// 	}).then(function(embed){
// 	  console.log('oEmbed response: ', embed);

// 	  var sideBar = document.querySelector('.js-playlist');

// 	  var box = document.createElement('div');
// 	  box.innerHTML = embed.html;

// 	  sideBar.insertBefore(box, sideBar.firstChild);
// 	  localStorage.setItem("key", sideBar.innerHTML);
// 	});
// };

// var sideBar = document.querySelector('.js-playlist');
// sideBar.innerHTML = localStorage.getItem("key");
 










