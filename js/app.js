$(function() {

  var app = {
    settings: {
      quests: 10,
      animationSpeed: 500,
      progressSpeed: 100
    },

    createQuest: function () {
      var $progress = $('<div>', { 'class': 'progress' });
        $('<div>', { 'class': 'progress__bar' }).appendTo($progress);
        $('<div>', { 'class': 'progress__text' }).text('0 / 999').appendTo($progress);
      var $quest = $('<div>', { 'class': 'quest' });
        $('<div>', { 'class': 'quest__top' }).append($progress).appendTo($quest);
        $('<div>', { 'class': 'quest__bottom' }).text('QUEST TEXT').appendTo($quest);

      return $quest;
    },

    deleteQuest: function ($quest) {
      $quest.remove();
    },

    insertQuestAtIndex: function ($quest, index) {
      if (index == 1) {
        $quest.prependTo('.viewport');
      }
      else {
        $quest.insertAfter('.quest:nth-child(' + (index -1) + ')');
      }
    },

    insertQuestLast: function ($quest) {
      $quest.appendTo('.viewport');
    },

    addQuest: function (index) {
      index = index || 0;
      var $quest = app.createQuest();
      if (index != 0) { app.insertQuestAtIndex($quest, index); }
      else { app.insertQuestLast($quest); }
      app.bringToFront($quest);
      app.moveIn($quest);
    },

    completeQuest: function ($quest) {
      $quest.find('.progress__bar').animate({
        'right': '0'
      }, app.settings.progressSpeed, function () {
        $quest.find('.progress__text').text('COMPLETE');
        setTimeout(function() {
          app.addQuest($quest.index() + 1);
          app.deleteQuest($quest);
        }, 500);
      });
    },

    bringToFront: function ($quest) {
      $quest.siblings().removeClass('quest--front');
      $quest.addClass('quest--front');
    },

    sendToBack: function ($quest) {
      $quest.siblings().removeClass('quest--back');
      $quest.addClass('quest--back');
    },

    moveIn: function ($quest, callback) {
      callback = callback || function() {};
      $quest.animate({
        'bottom': '0'
      }, app.settings.animationSpeed, function() {
        callback();
      });
    },

    moveOut: function ($quest, callback) {
      callback = callback || function() {};
      $quest.animate({
        'bottom': '-100px'
      }, app.settings.animationSpeed, function() {
        callback();
      });
    }

  };


  // Initialize the first 3 quests
  function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {
      callback();
      if (++x === repetitions) {
        window.clearInterval(intervalID);
      }
    }, delay);
  };
  setIntervalX(function () {
    app.addQuest();
  }, app.settings.animationSpeed, 3);





  $(document).on('click', '.btn--complete', function(e) {
    var index = $(this).attr('data-quest');
    var $quest = $('.quest:nth-child(' + index + ')');
    app.completeQuest($quest);
  });






});
