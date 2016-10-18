// Erilaisia nappeja ja muita valintoja

// Aloitetaan kun on kaikki ladattu
$(document).ready(function(){ 

	// Nappi, jolla haetaan tietyn aikavälin tilastot
	$("#luoJoukkueetTaulukkoNappi").click(function(){

		// UUTTA: Luo taulukon, jossa on joukkueiden tiedot eli joukkueen pelaajat ja menestyminen
		alustaJoukkuetaulukko();
		// Täyttää taulukon
		taytaJoukkueTaulukko();
	});


	// Nappi, jolla haetaan tietyn aikavälin tilastot
	$("#valitseAikavaliNappi").click(function(){

		$('#haetaanDialogi').dialog({
			modal: true,
			title: 'Haetaan ...',
			width: "500px",
			height: "170",
			position: { // Määrittelee mihin kohtaan ikkuna sijoitetaan
				at: 'top',
				of: $('#valitseAikavaliNappi') // Pelaajien taulukon päälle
			},
			},
			// Lisätään viesti
 			$("#haetaanDialogi").html("Odota hetki, tietojen haku käynnissä.<br/><br/>(Tämä ikkuna sulkeutuu automaattisesti)")
		);

		// Tyhjennetään taulukko, jossa on eri joukkueet, koska tiedot muuttuvat
		$("#joukkueetId").html("");
    // Haetaan tiedot
		haeTiedot();		
	});


	// Nappi, jolla päivitetään kenen pelaajan tiedot näytetään taulukossa, jossa on sählykerrat, pelaajien määrät ja voitot/tappiot
	$( "#valitsePelaajaNappi" ).click(function(){

		var e = document.getElementById("pelaajatSelectTag");
		var listaltaValittuNimi = e.options[e.selectedIndex].text;

		$("#sahlytOtsikkoId").text("Sählykerrat ja pelien tulokset pelaajalle " + listaltaValittuNimi);
		// Lisätään taulukko
		taytaSahlytaulukkoPelaajatiedot(pelaajaOliot, sahlyOliot, listaltaValittuNimi);
		// Piirakkakaavio osallistumisista
		osallistuminenPie(listaltaValittuNimi, 'pelaajanOsallistuminenPieId');
		// Voittoprosentin kehittyminen viivakaaviona
		pelaajanVoittoprosentti(listaltaValittuNimi, 'pelaajaVoittoprosenttiKuvaaja');
	});


	// Klikataan kaikkien pelaajien taulukosta nimeä, jolloin avautuu dialogi sen pelaajan tarkoista tiedoista
	$("#pelaajatId").click(function(e){
		var haluttiin =  $(e.target).closest('tr').find('td:eq(0)').text();
		// Funktio tiedostossa funktiot.js		
		pelaajaDialogille(haluttiin, $('#pieninPaivaInput').val(), $('#suurinPaivaInput').val());
	});


	// Klikataan sählytaulukkoa, jolloin avautuu dialogi, jossa on sählykerran tietoja
	$("#sahlytId").on('click','tbody tr', function (e){
		var pvm =  $(e.target).closest('tr').find('td:eq(0)').text();
		// Funktio tiedostossa funktiot.js		
		sahlyDialogille(pvm);
	});	

	
	// Nappi, jolla vaihdetaan kaaviota, jossa näkyy pelaajien määrä vuosittain tai yhtenä pötkönä
	$("#pelaajienLkmNappiId").click(function(){
		var $this = $(this);

		$this.toggleClass('vuosiNappi');

		if($this.hasClass('vuosiNappi')){
			$this.text('Vuodet peräkkäin');		
			// Piirretään pelaajien määärä vuosittain
			piirraPelaajatVuosittain();		

		} else {
			$this.text('Vuodet päällekkäin');         		
			// Piirretään pelaajien määärä, kaikki vuodet peräkkäin
			piirraPelaajat();			
		}	
		
	});	// END nappi


	// Näyttää pelaajista vain ne, jotka ovat pelanneet vähintään annetun määrän pelejä
	$('#naytaPelaajiaButtonId').on('click', function () {
	var arvo = parseInt(document.getElementById('naytaPelaajiaInputId').value);

		var $rowsNo = $('#pelaajatId tbody tr').filter(function () {
		      return $.trim($(this).find('td').eq(2).text()) >= 0
		  }).show();

		  var $rowsNo = $('#pelaajatId tbody tr').filter(function () {
		      return $.trim($(this).find('td').eq(2).text()) < arvo
		  }).hide();

		piirraPelienMaaraJaVoittoprosentti();
	});

});
