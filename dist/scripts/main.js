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
      option: item.animal
    };
    renderTemplate('#optLst', '#optBox', data);
  });
}


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
    } // if
  }); // main done
}); // click


$(".clearAll").on("click", function() {
  $.ajax("http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady").done(function(item) {
    _.each(item, function(item) {
      $.ajax({
        type: "DELETE",
        dataType: "json",
        url: "http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady/" + item._id,
      }).done(renderOption);
    }); // main done
  }); // click
});


$(".clear").on("click", function() {
  $.ajax("http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady").done(function(item) {
    var obsolete = _.find(item, function(i) {
      return $("#optBox").val() == i.animal;
    });
    $.ajax({
      type: "DELETE",
      dataType: "json",
      url: "http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady/" + i._id,

    }).done(renderOption);
  }); // done function
}); // click


$(".update").on("click", function() {
  $.ajax("http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady").done(function(item) {
    var duplicates = _.find(item, function(i) {
      return $("#animal").val() == i.animal;
    });
    if (duplicates) {
      // $.ajax({
      //   type: "PUT",
      //   dataType: "json",
      //   url: "http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady",
      //   data: {
      //     animal: $("#animal").val(),
      //     sound: $("#sound").val(),
      //   }
      // }).done(function(newThing) {
      //   $.ajax({
      //     type: "GET",
      //     dataType: "json",
      //     url: "http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady"
      //   }).done(renderOption); // get done
      // }); // post done
    } else {
      alert($("#animal").val() + ' doesn\'t exist!')
    } // if
  }); //
}); //








//  event.preventDefault();
