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
    // var sound = item.sound;

    renderTemplate('#optLst', '#optBox', data);

  }); //each

}

$(".update").on("click", function() {
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

// http get data
// call functin _it_id {delete}


$(".clear").on("click", function() {
    $.ajax("http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady").done(function(item) {
      _.each(item, function(item) {
        $.ajax({
          type: "DELETE",
          dataType: "json",
          url: "http://tiny-pizza-server.herokuapp.com/collections/oldmcdonaldmady/" + item._id,

        });
      }); // main done
    }); // click
  });






    //
    //
    // $.ajax("http://tiny-pizza-server.herokuapp.com/").done(function(item) {
    //   var userData = {
    //       avatar: item.avatar_url,
    //       avatar_url: item.html_url,
    //       username: item.login,
    //       name: item.name,
    //       memberSince: moment(item.created_at).format("MMM DD, YYYY"),
    //       followers: item.followers,
    //       followers_url: item.followers_url,
    //       following: item.following,
    //       following_url: item.following_url
    //   };
    //
    //       //renderTemplate('#header-user', '#header-block', userData);
    // });
    //
    //  event.preventDefault();
    // vebaze/1/edit
