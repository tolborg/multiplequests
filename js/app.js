$(function() {

  var questTexts = [
    'Defeat ? Goons with Midas Touch',
    'Complete ? Portal Quests',
    'Collect ? Coins'
  ];


  // Subscriber: Add Quest
  $(document).on('addQuest', function(e) {
    var questText = questTexts[Math.floor(Math.random() * questTexts.length)];

    var $progress = $('<div>', { 'class': 'progress' });
      $('<div>', { 'class': 'progress__bar' }).appendTo($progress);
      $('<div>', { 'class': 'progress__text' }).text('0 / 999').appendTo($progress);

    var $quest = $('<div>', { 'class': 'quest' });
      $('<div>', { 'class': 'quest__top' }).append($progress).appendTo($quest);
      $('<div>', { 'class': 'quest__bottom' }).text(questText).appendTo($quest);

    $quest.trigger('focusQuest').appendTo($('.quests'));

    $quest.animate({
      'left': 0
    }, 500);
  });


  // Subscriber: Complete Quest
  $(document).on('completeQuest', function(e) {
    var questNumber = $(e.target).attr('data-quest');
    var $quest = $('.quest:nth-child(' + questNumber + ')');

    $quest.find('.progress__bar').animate({
      'right': '0'
    }, 100, function() {
      $quest.find('.progress__text').text('COMPLETE');
      $quest.trigger('focusQuest');

      setTimeout(function() {
        $quest.animate({
          'left': '-100%'
        }, 500, function() {
          $quest.remove();
          $(document).trigger('addQuest');
        });
      }, 500);
    });
  });


  // Subscriber: Focus Quest
  $(document).on('focusQuest', function(e) {
    var $quest = $(e.target);
    $quest.siblings().removeClass('quest--front');
    $quest.addClass('quest--front');
  });




  // Publishers
  $(document).on('click', '.quest', function(e) {
    $(this).trigger('focusQuest');
  });

  $(document).on('click', '.btn--complete', function(e) {
    $(this).trigger('completeQuest');
  });


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
    $(document).trigger('addQuest');
  }, 500, 3);



});
