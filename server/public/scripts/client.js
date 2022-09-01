$(document).ready(handleReady);

function handleReady() {
 $('#submitButton').on('click', submitNumbers)
}

function submitNumbers (){
  let guessesObject = {
    player1:$('#input1').val(),
    player2:$('#input2').val(),
    player3:$('#input3').val(),
  };
  $('#input1').val('');
  $('#input2').val('');
  $('#input3').val('');
  
  //will create post request below
 
  $.ajax({
    method: 'POST',
    url: '/numbers',
    data: {guessesObject}
  }).then(function (response){
    console.log(response);
  })
  fetchResults();
}


function fetchResults(){
  $.ajax({
    method: 'GET',
    url: '/numbers'
  }).then(function(results){
    console.log(results);
    $('#result1').text(results[0])
    $('#result2').text(results[1])
    $('#result3').text(results[2])
    for (let i=0; i<results.length; i++){
      if (results[i] === 'win'){
        $('#winnersCircle').append(`<h1>Player ${i+1} is the winner!</h1>`);
      }
    }
  })

}
