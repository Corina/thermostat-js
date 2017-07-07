
$(document).ready(function(){

  var thermostat = new Thermostat;

  $('#current-temp').text(thermostat.temperature);
  $('#max-temp').text(thermostat.maxTempPSMOn);
  $('#min-temp').text(thermostat.minTemp);
  $('#readPSM').text(thermostat.readPSM);
  $('#usage').text(thermostat.usage);

  $("#Up").on("click", function() {
    thermostat.up();
    updateText();
  });

  $("#Down").on("click", function() {
    thermostat.down();
    updateText();
  });

  $("#Reset").on("click", function() {
    thermostat.reset();
    $('#current-temp').text(thermostat.temperature);
  });

  $("#PSM").on("click", function() {
    thermostat.powerSavingModeSwitch();
    $('#readPSM').text(thermostat.readPSM);
  });

  function updateText() {
    thermostat.currentEnergyUsage();
    $('#current-temp').text(thermostat.temperature);
    $('#usage').text(thermostat.usage);
    $('#usage').attr("class", thermostat.usage);
  };

  updateText();


  $.ajax({
    url: "http://api.aerisapi.com/observations/london,uk?client_id=A7wgFltFhcp5SBW05g5Mi&client_secret=DvqwzsXvzOrWgfkaiw0YvXhhZPB4JfsTERkBhR8S",
    dataType: "jsonp",
    success: function(json) {
      if (json.success == true) {
        var ob = json.response.ob;
        $('#london-weather').html('The current weather in London is ' + ob.weather.toLowerCase() + ' with a temperature of ' + ob.tempC + '°');
      }
      else {
        alert('An error occurred: ' + json.error.description);
      }
    }
  });

  function CreateUrl(city) {
    return "http://api.aerisapi.com/observations/" + city.replace('city=','') + ",uk?client_id=A7wgFltFhcp5SBW05g5Mi&client_secret=DvqwzsXvzOrWgfkaiw0YvXhhZPB4JfsTERkBhR8S"
  };


  $("#city").submit(function(event) {
    event.preventDefault();
    value = CreateUrl($( this ).serialize())
    console.log(value);
    $.ajax({
      url: CreateUrl($( this ).serialize()),
      dataType: "jsonp",
      success: function(json) {
        if (json.success == true) {
          weather_ob = json.response.ob
          location_ob = json.response.place
          $('#london-weather').html('The current weather in ' + location_ob.name + ' ' + weather_ob.weather.toLowerCase() + ' with a temperature of ' + weather_ob.tempC + '°');
        }
        else {
          alert('An error occurred: ' + json.error.description);
        }
      }
    });

  });

  // Here we will have the post ajax request function.
  $("#up-temp").on('click', function(){
      current_temp = $("#current-temp").html()
      $.ajax({
      type: "POST",
      url: "http://localhost:8888/",
      data: $(current_temp).serialize(),
    });
  });

  // Access ID
  // A7wgFltFhcp5SBW05g5Mi
  //
  // Secret Key
  // DvqwzsXvzOrWgfkaiw0YvXhhZPB4JfsTERkBhR8S



});
