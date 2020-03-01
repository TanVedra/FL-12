const $list = $(".list");
const $input = $("#add-input");
const $add = $("#add-submit");
const $btnComplete = $('<button class="item-complete"></button>').text('Complete');

const todos = [
  {
    text: "Buy milk",
    done: false
  },
  {
    text: "Play with dog",
    done: true
  }
];

$('li.item').append($btnComplete);
$('.item-remove').click(removeTask);
$('.item-complete').click(completeTask);

$($add).click(function (e) {
  e.preventDefault();
  if ($($input).val() !== '') {
    const $li = $('<li class="item"></li>');
    const $span = $('<span class="item-text"></span>').text($($input).val());
    const $btnRemove = $('<button class="item-remove"></button>').text('Remove');
    const $btnComplete = $('<button class="item-complete"></button>').text('Complete');

    $($btnRemove).click(removeTask);
    $($btnComplete).click(completeTask);

    $($li).append($span, $btnRemove, $btnComplete);
    $($list).prepend($li);
    $($input).val('');

  } else {
    console.log('You can\'t add an empty list.');
  }
});

function removeTask() {
  const $that = this;
  $($that).parent().hide(1000);
  setTimeout(function () {
    $($that).parent().remove();
  }, 1000);
}

function completeTask() {
  const parent = $(this).parent();
  $(parent[0].firstElementChild).toggleClass('done');
}

$('.item-search').click(function () {
  const $inputText = $('.search-input').val();
  if ($inputText === '') {
    $('.search-result').text('You must enter some text for search!');
  } else if ($(`.item-text:contains(${$inputText})`).length) {
    $('.search-result').text(`We have found ${$(`.item-text:contains(${$inputText})`).length} matches.`);
  } else {
    $('.search-result').text(`We haven't found any matches.`);
  }
});

$('.item-save').click(function () {
  const $inputText = $('.search-input').val();
  if ($inputText === '' || $(`.item-text:contains(${$inputText})`).length === 0) {
    $('.search-result').text('We don\'t have anything to save!');
  } else if ($(`.item-text:contains(${$inputText})`).length) {
    for (let i = 0; i < $(`.item-text:contains(${$inputText})`).length; i++) {
      let $key = $($(`.item-text:contains(${$inputText})`)[i]).text();
      let $value = $($(`.item-text:contains(${$inputText})`)[i]).hasClass('done');
      localStorage.setItem($key, $value);
    }
    $('.search-result').text(`We have saved your tasks.`);
  }
});