var placementPrices = [];

function quoteForm(defaultShirt) {
  $.ajax('http://www.mountainview-webdesign.com/dads-specialty-printing-api/data.json')
    .done(function(data, success) {
      if (success === 'success') {
        placementPrices = data.prices;
        shirtOptions = data.shirts;
        showForm(defaultShirt);
      }
    });
}

function showForm(defaultShirt) {
  var shirtOptionsHtml = shirtOptions.map(function(currentValue) {
    return '<option value=\'' + currentValue.price + '\' ' + (defaultShirt === currentValue.name ? 'selected': '') + '>' + currentValue.name + '</option>';
  }).join('');

  var formHtml = "<style>.QuoteForm__Header {margin-bottom: 5px; margin-top: 10px; font-size: 16px; font-weight: 600;}";
  formHtml += ".QuoteForm__Table {margin-top: 10px;}</style>";
  formHtml += "<div style='background-color: #ECECEC; padding: 10px;'><p class='QuoteForm__Header'>T-shirt Type:</p><select id='shirtCost' style='width: 100%;'>"
  formHtml += shirtOptionsHtml;
  formHtml += "</select><br/><p class='QuoteForm__Header'>Colors in placement 1:</p><select id='colors1'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option></select><br/><p class='QuoteForm__Header'>Colors in placement 2:</p><select id='colors2'><option id='2-0' value='0'>0</option><option id='2-1' value='1'>1</option><option id='2-2' value='2'>2</option><option id='2-3' value='3'>3</option><option id='2-4' value='4'>4</option><option id='2-5' value='5'>5</option><option id='2-6' value='6'>6</option><option id='2-7' value='7'>7</option><option id='2-8' value='8'>8</option></select><br/><br/><input type='submit'onclick='getQuote();' /><br/><div id='quote'></div></div>";

  $('.quoteCalculator').html(formHtml);
}

function getQuote() {
  var shirtCost = Number(document.getElementById('shirtCost').value);
  var colors1 = Number(document.getElementById('colors1').value);
  var colors2 = Number(document.getElementById('colors2').value);
  tshirtCalculator.placementPrices(placementPrices);
  tshirtCalculator.shirtCost(shirtCost);
  if (colors2 < 1) {
    tshirtCalculator.placements([colors1]);
  } else {
    tshirtCalculator.placements([colors1, colors2]);
  }
  var priceTable = tshirtCalculator.getPrice();
  var priceHtml = priceTable.map(function(currentValue) {
    var price = currentValue.price ? '$' + currentValue.price + '/shirt' : 'N/A';
    return '<td>' + currentValue.quantity + '</td><td>' + price + '</td>';
  });
  priceHtml = '<table class="QuoteForm__Table"><tr>' + priceHtml.join('</tr><tr>') + '<tr><td>1000</td><td><a href="http://www.dadsspecialtyprinting.com/get-a-quote" style="text-decoration: underline;">Contact us</a></td></tr></table>';
  document.getElementById('quote').innerHTML = priceHtml;
}
