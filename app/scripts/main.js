(function() {
  'use strict';
})();

function renderTemplate(templateId, location, model) {
  var templateString = $(templateId).text();
  var templateFunction = _.template(templateString);
  var renderedTemplate = templateFunction(model);
  $(location).append(renderedTemplate);
}

//DOCUMENT READY EVENT: ADDS FIRST OBJECT {ANIMAL, SOUND} TO SONG AND LOADS LISTBOX
$(document).ready($.ajax("http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady").done(function(item) {
  //LOADS FIRST OBJECT {ANIMAL, SOUND} INTO SONG
  var firstAnimal = _.first(item);
  renderTemplate('#lyrics', '#song', firstAnimal);
  //LOADS ALL OBJECTS INTO LISTBOX (see function renderOption below)
}).done(renderOption));

//CLEARS LISTBOX, THEN LOADS ALL OBJECTS {ANIMALS, SOUNDS} INTO LISTBOX
function renderOption(item) {
  $('#optionBox').empty();
  _.each(item, function(item) {
    var data = {
      option: item.animal,
    };
    renderTemplate('#optionList', '#optionBox', data);
  });
}

//ADDS NEW ANIMALS TO THE LIST IF THEY DON'T ALREADY EXIST
$(".add").on("click", function() {
  $.ajax("http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady").done(function(item) {
    //CHECKS TO SEE IF INPUT (ANIMALS) ALREADY EXISTS
    var inputAnimal = prompt("What animals do you want to add? (e.g. cows)");
    var duplicates = _.find(item, function(i) {
      return inputAnimal == i.animal;
    });
    if (duplicates) {
      alert(inputAnimal + ' already exists!');
    } else {
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady",
        data: {
          animal: inputAnimal,
          sound: prompt("What sound do " + inputAnimal + " make?"),
        }
      }).done(function(newThing) {
        $.ajax({
          type: "GET",
          dataType: "json",
          url: "http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady"
        }).done(renderOption);
      });
      alert('OK');
    }
  });
});

// //deletes all animals ... remove ... always want one for the song to display
// $(".clear-all").on("click", function() {
//   $.ajax("http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady").done(function(item) {
//     _.each(item, function(item) {
//       $.ajax({
//         type: "DELETE",
//         dataType: "json",
//         url: "http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady/" + item._id,
//       });
//     }); // main done
//     alert('OK')
//   }); // click
// });

//DELETES LISTBOX SELECTION
$(".clear").on("click", function() {
  if ($('#optionBox option').length == 1) {
    alert('Must keep at least one item in the list!');
  } else {
    $.ajax("http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady").done(function(item) {
      _.each(item, function(item) {
        if ($("#optionBox").val() == item.animal) {
          $.ajax({
            type: "DELETE",
            dataType: "json",
            url: "http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady/" + item._id,
          });
        }
      });
      $('#optionBox :selected').remove();
    });
  }
});

// $(".update").on("click", function() {
//   $.ajax("http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady").done(function(item) {
//     _.each(item, function(item) {
//       if ($("#animal").val() == item.animal) {
//         $.ajax({
//           type: "PUT",
//           dataType: "json",
//           data: {
//             "sound": $("#sound").val()
//           },
//           url: "http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady/" + item._id,
//         });
//       }
//     });
//   });
// });
//
// //  event.preventDefault();
