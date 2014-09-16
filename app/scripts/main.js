'use strict';

$(document).ready($.ajax("http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady").done(renderOption));

function renderTemplate(templateId, location, model) {
  var templateString = $(templateId).text();
  var templateFunction = _.template(templateString);
  var renderedTemplate = templateFunction(model);
  $(location).append(renderedTemplate);
}

function renderOption(item) {
  _.each(item, function(item) {
    var data = {
      option: item.animal,
    };

    // var sound = item.sound;

    renderTemplate('#optLst', '#optBox', data);
    // renderTemplate(#)

  }); //each

}

//
// $.ajax("http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady").done(function(item) {
//   _.each(item, function(item) {
//     if ($("#optBox").text == item.animal) {
//       var data = {
//         animal: item.animal,
//         sound: item.sound
//       };
//       renderTemplate('#lyrics', '#song', data);
//     }
//   });
// });









$(".add").on("click", function() {
  $.ajax("http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady").done(function(item) {
    var duplicates = _.find(item, function(i) {
      return $("#animal").val() == i.animal;
    });

    if (duplicates) {
      alert($("#animal").val() + ' already exits!')
    } else {

      $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady",
        data: {
          animal: $("#animal").val(),
          sound: $("#sound").val(),
        }
      }).done(function(newThing) {
        $.ajax({
          type: "GET",
          dataType: "json",
          url: "http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady"
        }).done(renderOption); // get done
      }); // post done
      alert('OK')
    } // if

  }); // main done
}); // click

// http get data
// call functin _it_id {delete}


$(".clear-all").on("click", function() {
  $.ajax("http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady").done(function(item) {
    _.each(item, function(item) {
      $.ajax({
        type: "DELETE",
        dataType: "json",
        url: "http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady/" + item._id,

      });
    }); // main done
    alert('OK')
  }); // click
});

$(".clear").on("click", function() {
  $.ajax("http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady").done(function(item) {
    _.each(item, function(item) {
      if ($("#optBox").val() == item.animal) {
        $.ajax({
          type: "DELETE",
          dataType: "json",
          data: {
            "sound": $("#sound").val()
          },
          url: "http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady/" + item._id,
        });
      }
    });
  });
});

$(".update").on("click", function() {
  $.ajax("http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady").done(function(item) {
    _.each(item, function(item) {
      if ($("#animal").val() == item.animal) {
        $.ajax({
          type: "PUT",
          dataType: "json",
          data: {
            "sound": $("#sound").val()
          },
          url: "http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady/" + item._id,
        });
      }
    });
  });
});

//  event.preventDefault();
