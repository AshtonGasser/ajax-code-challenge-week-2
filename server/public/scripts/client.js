console.log("client.js sourced");

$(document).ready(onReady);

function onReady() {
  console.log("DOM ready");
  $("#addJokeButton").on("click", addJokes);
}

gotJokes = {};

// ⬇ Sending those guesses to the server:
$.ajax({
  method: "POST", // Posting information.
  url: "/jokes", // Called a "route".
  data: gotJokes,
})
  .then(function (response) {
    // .then handles happy things; 2XX responses.
    addJokes();
    console.log(response);
  })
  .catch(function (error) {
    // .catch handles bad things; 4XX or 5XX errors.
    console.log(error);
    alert("Something went wrong with GET, try again.");
  }); // End Ajax .then and .catch functions.

// ⬇ Getting jokes from the server:
// ⬇ Render to Dom

function addJokes() {
  console.log("got jokes");
  let whoseJoke = $("#whoseJokeIn").val();
  let question = $("#questionIn").val();
  let punchline = $("#punchlineIn").val();
  gotJokes.whoseJoke = whoseJoke;
  gotJokes.question = question;
  gotJokes.punchLine = punchline;

  $.ajax({
    method: "GET",
    url: "/jokes",
  })
    .then(function (response) {
      console.log('yay jokes', response);
      $("#outputDiv").empty();
      $("#outputDiv").append(`
          <div>
        <h3>Got Jokes</h3>
          </div>
          `);
      for (let i = 0; i < response.length; i++) {
          console.log('loop running')
        $("#outputDiv").append(`
          <div>
             <ul class = 'Name'>${response[i].whoseJoke} </ul>
             <ul class = 'jokeQustion'>${response[i].jokeQuestion}</ul>
             <ul class = 'punchLine'>${response[i].punchLine} </ul>
        </div>
            `);
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Something wrong with GET. Try going outside for a while");
    });
}
