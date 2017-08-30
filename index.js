const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyCXn1s41z5eUTYyq5L2JAc4YZpao_7ephk';
const YOUTUBE_WATCH_URL = "https://www.youtube.com/watch?v=";
 
function getDataFromApi (searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: API_KEY,
    q: searchTerm,
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  $('.js-results').html("");
  result.items.forEach((item) => {
  $('.js-results').append(`
  <div class="row">
    <p class="description">${item.snippet.title}</p>
    <a href="${YOUTUBE_WATCH_URL + item.id.videoId}" target="_blank"><img class="image" \n 
    src="${item.snippet.thumbnails.default.url}" alt="Link to Youtube video titled ${item.snippet.title}"></a>
  </div>`)});
}

function clearResults() {
  $('.js-results').empty();
}

function watchSubmit() {
  $('.js-search').submit(event => {
    event.preventDefault();
    $('#result').removeClass('hidden');
    const queryTarget =  $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromApi(query, renderResult);
  });
}

$(function () {watchSubmit();
});