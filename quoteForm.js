var shirtOptions = [{
    name: 'Gildan 5000 - Heavy Cotton',
    price: '2.47'
  }, {
    name: 'District Made DM130 Tri-blend',
    price: 3.99
  }];

var shirtOptionsHtml = shirtOptions.map(function(currentValue) {
  return '<option value=\'' + currentValue.price + '\'>' + currentValue.name + '</option>';
}).join('');

var formHtml = "<div style='background-color: #ECECEC; padding: 10px;'><h3>T-shirt Type:</h3><select id='shirtCost' style='width: 100%;'>"
formHtml += shirtOptionsHtml;
formHtml += "</select><br/><h3>Number of colors on placement 1:</h3><select id='colors1'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option></select><br/><h3>Number of colors on placement 2</h3><select id='colors2'><option id='2-0' value='0'>0</option><option id='2-1' value='1'>1</option><option id='2-2' value='2'>2</option><option id='2-3' value='3'>3</option><option id='2-4' value='4'>4</option><option id='2-5' value='5'>5</option><option id='2-6' value='6'>6</option><option id='2-7' value='7'>7</option><option id='2-8' value='8'>8</option></select><br/><br/><input type='submit'onclick='getQuote();' /><br/><h2 id='quote'></h2></div>";

$('.quoteCalculator').html(formHtml);

var placementPrices = [];
$.ajax('http://www.mountainview-webdesign.com/dads-specialty-printing-api/prices.json')
  .done(function(data, success) {
    if (success === 'success') {
      placementPrices = data.prices;
    }
  });

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
  var priceTable = tshirtCalculator.getPlacementCost();
  var priceHtml = priceTable.map(function(currentValue) {
    return '<td>' + currentValue.quantity + '</td><td>$' + currentValue.price + '/shirt</td>';
  });
  priceHtml = '<table><tr>' + priceHtml.join('</tr><tr>') + '<tr><td>1000</td><td><a href="http://www.dadsspecialtyprinting.com/get-a-quote">Contact us for a quote on 1,000 or more shirts.</a></td></tr></table>';
  document.getElementById('quote').innerHTML = priceHtml;
}
