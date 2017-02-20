// Eirik Thommessen
// Reel Media Nordic AS

/*
	Dette skriptet legger funksjonalitet på Eventclock applikasjonen
*/



// Definerer variabler 
var time;	// Global variabel for tiden som blir satt.
var warningLimit; // Global variabel for tiden som blir satt for advarsel
var clock; // Global variabel for clokka
var interval = 0; // Global Variabel for å sette og stoppe interval
var alertlimit = 10; // Varsel på utgått tid. Satt til 10 sekunder
var alertText = "Time is up!";

// Setter lyttere på dokumentet
$(document).ready(function(){

	// Setter tiden basert på preset i HTML dokumentet
	setTime();
	
	// Lytter til Startknappen
	$('#btnstart').on('click', function(){
		$('#btnstopp').toggle();
		$('#btnstart').toggle();
		clock.start(function(){
			checkClockValue();
		});
	});
	// Lytter til Stoppknappen
	$('#btnstopp').on('click', function(){
		$('#btnstopp').toggle();
		$('#btnstart').toggle();
		clock.stop();
		stopInterval();	
		resetWarning();
	});
	// Lytter til Resetknappen
	$('#btnreset').on('click', function(){
		clock.stop();
		stopInterval();
		setTime();
		resetWarning();
		$('#btnstopp').hide();
		$('#btnstart').show();
	});

	// Lytter til settingsknappen
	$('#btnsettings').on('click', function(){
		toggleSettings();
	});
	$('#settingsinfo').popover({ 
		trigger: 'hover',
		container: 'body',
		placement: 'bottom',
		targetOffset: '50% -100px'
	});

	$('#settimeinfo').popover({ 
		trigger: 'hover',
		container: 'body',
		placement: 'top',
	});

	$('#setwarningtimeinfo').popover({ 
		trigger: 'hover',
		container: 'body',
		placement: 'top',
	});

	// lytter til popover events
	$('#btnstart').popover({ 
		trigger: 'hover',
		delay: 2000,
		container: 'body',
		placement: 'bottom'
		});
	

	$('#btnstopp').popover({ 
		trigger: 'hover',
		delay: 2000,
		container: 'body',
		placement: 'bottom'
	});

	$('#btnreset').popover({ 
		trigger: 'hover',
		delay: 2000,
		container: 'body',
		placement: 'bottom'
	});


	// Lytter til Cancel knappen
	$('#btncancel').on('click', function(){
		toggleSettings();
	});
	// lytter til Saveknappen
	$('#btnsave').on('click', function(){
		toggleSettings();
		setTime();
		setName();
		setWarningText();
	});

	

});

// Funksjon for å vise og gjemme settinger
function toggleSettings(){
	$('#settings').toggle('slow');
}

// Funksjon for å sette tiden som skal vises i klokka og varseltiden 
function setTime() {
	var hour = $('#sethour').val();
	var minutes = $('#setminutes').val();
	var secounds = $('#setsecounds').val();
	var whour = $('#setwarninghour').val();
	var wminutes = $('#setwarningminutes').val();
	var wsecounds = $('#setwarningsecounds').val();
	warningLimit = hmsToSecondsOnly(whour, wminutes, wsecounds);
	time = hmsToSecondsOnly(hour, minutes, secounds);
	if($('#countupwards').is(':checked')){
		setCountUpwards();
	}else{
		setflipperClock();
	}
	
}

// Funksjon som oppretter et klokkeobjekt og legger til tiden fra den globale variabelen
function setflipperClock(){
	clock = new FlipClock($('#timer'), time ,{
		// ... your options here
		autoStart: false,
		countdown: true
	});

}

function setCountUpwards(){
	clock = new FlipClock($('#timer'),{
		autoStart: false
	});
}
// Funksjon som sjekker verden av klokka hvert sekund
function checkClockValue (){
	interval = window.setInterval(function(){
		if(clock.running){
			if($('#countupwards').is(':checked')){
				warningTimeUp();
			}else{
				warningTimeDown();
			}		
		}}, 1000);
}

// Funksjon som kontrollerer tiden når klokka teller ned
function warningTimeDown() {
	if(clock.time.time < warningLimit && clock.time.time > alertlimit){
		$('.inn').css('color', "#e29d16"); //Gule siffre
	}else if(clock.time.time < alertlimit){
		$('.inn').css('color', "#d20707");	// Røde siffre	
	}
	if(clock.time.time == 0){
			alertUser(); // Advarseltekst
	}
}

// Funksjon som kontrollerer tiden når klokka teller opp
function warningTimeUp() {
	var timeLeft = time - warningLimit;
	var alertTime = time - alertlimit; 
	if(clock.time.time > timeLeft && clock.time.time < alertTime){
		$('.inn').css('color', "#e29d16"); // Gule siffre
	}else if(clock.time.time > alertTime){
		$('.inn').css('color', "#d20707"); // Røde siffre
	}
	if(clock.time.time > time){
		alertUser(); // Advarsel tekst
		clock.stop() // Klokka stopper
	}
}

// Funksjon som svarer brukeren om at tiden er ute
function alertUser(){
	$('#warningtext').html(alertText);
	$('#timer').addClass('pulse');
}

// Funksjon som resetter avdvarselen når klokka stoppes eller resettes
function resetWarning(){
	$('#warningtext').html("");
	$('#timer').removeClass('pulse');
}

// Fjerner intervall loopen
function stopInterval(){
	clearInterval(interval);
}

// Funskjonen som setter title på siden og på klokka
function setName(){
	var name = $('#timername').val();
	if(name.length > 0 && name != null){
		 document.title = name + ' | Counter'
		 $('#customename').html(' Timer: ' + name);
	}else{
		document.title = "Event Clock";
		$('#customename').html(' Timer: ');
	}
}

// Setter advarseltekst dersom det er gitt av brukeren
function setWarningText(){
	var text = $('#timerwarning').val();
	if(text.length > 0 && name != null){
		alertText = text;
	}
}

// Funksjon som omgjør tid fra brukren til sekunder.
function hmsToSecondsOnly(h,m,s) {
    var hours=parseInt(h) *3600;
    var minutes = parseInt(m) * 60;
    var secounds = parseInt(s)  ;
    return hours+minutes+secounds;
}