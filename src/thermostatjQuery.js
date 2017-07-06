
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
  
  
});
