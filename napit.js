// Erilaisia nappeja ja muita valintoja

// Aloitetaan kun on kaikki ladattu
$(document).ready(function(){ 


	// Valitaan välilehti pääikkunassa
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

//avaaOdotusikkuna2();


		var valinta = $(e.target).attr("href");


		if(valinta === "#sahlytTab"){

	

//alert("joo = " + joo);
/*	$('#hakuKaynnissaDialogi').dialog({
			modal: true,
			title: 'Haetaan ...',
			width: "500px",
			height: "170",
			position: { // Määrittelee mihin kohtaan ikkuna sijoitetaan
				at: 'top',
				of: $('#sahlytTab') // Pelaajien taulukon päälle
			},
			},

			// Lisätään viesti
 			$("#hakuKaynnissaDialogi").html("Haku käynnissä")
		);
*/
			// Jos pitää päivittää välilehden tiedot
			if(paivitaSahlytTab){
	
				valitseSahlytTab();
				// Välilehti on päivitetty, joten ei tarvitse enää päivittää
				paivitaSahlytTab = false;
	
				suljeOdotusikkuna();
			}

			

	//$('#myModal').modal('hide');

		// Välilehti, jossa yhden pelaajan tiedot
		} else if(valinta === "#valittuTab"){

			// Jos pitää päivittää välilehden tiedot
			if(paivitaValittuTab){
				valitseValittuPelaajaTab();
				// Välilehti on päivitetty, joten ei tarvitse enää päivittää
				paivitaValittuTab = false;

				suljeOdotusikkuna();
			}

			

			
		}	else if(valinta === "#pelaajatTab"){

			$('#kaikkiPelaajatId').width($('#pelaajatTab').width() * 1);

			// Jos pitää päivittää välilehden tiedot
			if(paivitaPelaajatTab){
				valitseKaikkiPelaajatTab();
				// Välilehti on päivitetty, joten ei tarvitse enää päivittää
				paivitaPelaajatTab = false;

				suljeOdotusikkuna();
			}
			

		} else if(valinta === "#paritTab"){
		
			// Jos pitää päivittää välilehden tiedot
			if(paivitaParitTab){
				valitseParitTab();
				// Välilehti on päivitetty, joten ei tarvitse enää päivittää
				paivitaParitTab = false;
				suljeOdotusikkuna();
			}

		} else if(valinta === "#joukkueetTab"){
			
			// Jos pitää päivittää välilehden tiedot
			if(paivitaJoukkueetTab){
			valitseJoukkueetTab();
				// Välilehti on päivitetty, joten ei tarvitse enää päivittää
				paivitaJoukkueetTab = false;

				suljeOdotusikkuna();
			}

		} else if(valinta === "#tapsaCupTab"){

			// Jos pitää päivittää välilehden tiedot
			if(paivitaTapsacupTab){
	
				// Lisätään tiedot Tapsa-cup finaaleista
				lisaaFinaalitaulukot();
				// Välilehti on päivitetty, joten ei tarvitse enää päivittää
				paivitaTapsacupTab = false;
				suljeOdotusikkuna();
			}


		

		} else if(valinta === "#pelaajatAjassaTab"){

			$('#pelaajienLkmId').width($('#sahlytTab').width() * 0.96);
			// Piirretään pelaajien määärä
			//			piirraPelaajat();	
			var data = getPelaajienJaPelienMaarat();
			//	alert("pituus nyt: " +data.length);
			piirraPelaajatViikoittain(data);


		} else if(valinta === "#pelaajatViikoittainTab"){

			$('#pelaajienLkm2Id').width($('#sahlytTab').width() * 0.96);
			// Piirretään pelaajien määärä vuosittain
			piirraPelaajatVuosittain();	

		} else if(valinta === "#pelaajatKuukausittainTab"){
			$('#pelaajatKuukausittainKaavioId').width($('#sahlytTab').width() * 0.96);
			//#pelaajatKuukausittainKaavioId
			piirraPelaajatKuukaudenKeskiarvo();

		} else if(valinta === "#valitunVoittoprosenttiTab"){

			var pelaajatSelectTagElementti = document.getElementById("pelaajatSelectTag");
			var listaltaValittuNimi = pelaajatSelectTagElementti.options[pelaajatSelectTagElementti.selectedIndex].text;
			// Piirretään valitun pelaajan voittoprosentti
			pelaajanVoittoprosentti(listaltaValittuNimi, "pelaajaVoittoprosenttiKuvaaja")
		} else if(valinta === "#valitunOsallistuminenPiirakkaTab"){

			var pelaajatSelectTagElementti = document.getElementById("pelaajatSelectTag");
			var listaltaValittuNimi = pelaajatSelectTagElementti.options[pelaajatSelectTagElementti.selectedIndex].text;
			// Piirretään osallistuminen piirakka
			osallistuminenPie(listaltaValittuNimi, "pelaajanOsallistuminenPieId")
		}
	});


	// Nappi, jolla haetaan tietyn aikavälin tilastot
	$("#luoJoukkueetTaulukkoNappi").click(function(){

		// UUTTA: Luo taulukon, jossa on joukkueiden tiedot eli joukkueen pelaajat ja menestyminen
		alustaJoukkuetaulukko();
		// Täyttää taulukon
		taytaJoukkueTaulukko();


	});
//{ dialogClass: 'noTitleStuff' }

	// Nappi, jolla haetaan tietyn aikavälin tilastot
	$("#valitseAikavaliNappi").click(function(){

//alert("päivä muuttui");
//avaaOdotusikkuna2('');

/*		$('#haetaanDialogi').dialog({
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
*/

    // Haetaan tiedot
		haeTiedot();		
//suljeOdotusikkuna();

		 paivitaSahlytTab = true;
 paivitaValittuTab = true;
 paivitaPelaajatTab = true;
 paivitaParitTab = true;
 paivitaJoukkueetTab = true;
 paivitaTapsacupTab = true;

	});


/*	$("#pelaajatSelectTag").change(function() {



		paivitaValittuPelaajaTab();
		suljeOdotusikkuna();
		

	});
*/
	// Nappi, jolla päivitetään kenen pelaajan tiedot näytetään taulukossa, jossa on sählykerrat, pelaajien määrät ja voitot/tappiot
	$( "#valitsePelaajaNappi" ).click(function(){
	//	avaaOdotusikkuna2('');
		paivitaValittuPelaajaTab();
		suljeOdotusikkuna();
	
/*
		var e = document.getElementById("pelaajatSelectTag");
		var listaltaValittuNimi = e.options[e.selectedIndex].text;

		$("#sahlytOtsikkoId").text("Sählykerrat ja pelien tulokset pelaajalle " + listaltaValittuNimi);
		// Lisätään taulukko
		taytaSahlytaulukkoPelaajatiedot(pelaajaOliot, sahlyOliot, listaltaValittuNimi);
		// Piirakkakaavio osallistumisista
		osallistuminenPie(listaltaValittuNimi, 'pelaajanOsallistuminenPieId');
		// Voittoprosentin kehittyminen viivakaaviona
		pelaajanVoittoprosentti(listaltaValittuNimi, 'pelaajaVoittoprosenttiKuvaaja');
*/
	});



	// Klikataan kaikkien pelaajien taulukosta nimeä, jolloin avautuu dialogi sen pelaajan tarkoista tiedoista
	$("#kaikkiPelaajatId").click(function(e){

		//var table = $('#kaikkiPelaajatTable').DataTable();
//	alert("jooh: " + $(e.target).closest('tr').index() );
		// Ei suoriteta, jos klikataan otsikkoa
		if($(e.target).closest('tbody tr').index() >= 0){
			var haluttiin =  $(e.target).closest('tr').find('td:eq(0)').text();
			// Funktio tiedostossa funktiot.js		
			pelaajaDialogille(haluttiin, $('#pieninPaivaInput').val(), $('#suurinPaivaInput').val());
			//alert("Haetaan dialogille pelaaja: " + haluttiin);
		}
	});

	// Klikataan sählytaulukkoa, jolloin avautuu dialogi, jossa on sählykerran tietoja
	$("#sahlytYleinenId").on('click','tbody tr', function (e){
		var pvm =  $(e.target).closest('tr').find('td:eq(0)').text();
		// Funktio tiedostossa funktiot.js		
		sahlyDialogille(pvm);
	});	

// Klikataan sählytaulukkoa, jolloin avautuu dialogi, jossa on sählykerran tietoja
	$("#sahlytValittuId").on('click','tbody tr', function (e){
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


		$.fn.dataTable.ext.search.push(
			function( settings, data, dataIndex ) {

				// Kun kyse on oikeasta taulukosta
				if (settings.nTable.id === "kaikkiPelaajatTable") { 

					var pelejaVahintaan = parseInt($('#naytaPelaajiaInputId').val());
		
					var peleja = parseFloat( data[2] ) || 0; // taulukossa kolmas sarake kertoo pelien määrä

					// Jos on tarpeeksi pelejä, palautetaan true
					if ( isNaN( pelejaVahintaan )  || pelejaVahintaan <= peleja   ) {
						return true;
					}
					// Ei ollut tarpeeksi pelejä, palautetaan false
					return false;

				} else { // Ei ollut oikea taulukko, joten kaikki rivit kelpaavat
					return true;	
				}
		});

		$('#kaikkiPelaajatTable').DataTable().draw();

		var taulu = $('#kaikkiPelaajatTable').DataTable();
		var data = new Array();
		taulu.rows( { search:'applied' } ).data().each(function(value, index) {
			data.push([value])
		});
//	alert("haettu: " + data[0][0]);


	// Päivitetään tiedot kaavioon
	piirraPelienMaaraJaVoittoprosentti2(data);

		// Vanha menetelmä, kun ei ollut datatables-taulukkoa
/*	var arvo = parseInt(document.getElementById('naytaPelaajiaInputId').value);

		var $rowsNo = $('#kaikkiPelaajatId tbody tr').filter(function () {
		      return $.trim($(this).find('td').eq(2).text()) >= 0
		  }).show();

		  var $rowsNo = $('#kaikkiPelaajatId tbody tr').filter(function () {
		      return $.trim($(this).find('td').eq(2).text()) < arvo
		  }).hide();

		piirraPelienMaaraJaVoittoprosentti();
*/

	});

});


/*******************
	Valitaan välilehti
********************/

function valitseSahlytTab(){

	//alert("sählyt-valintalehden alussa leveys: " + $('#sahlytTab').width());

	alustaSahlytaulukkoYleinen();
	taytaSahlytaulukkoYleisetTiedot("sahlytYleinenTable", pelaajaOliot, sahlyOliot, "");

	var pa = getPelaajienJaPelienMaarat();
	
	$('#pelaajienLkmId').width($('#sahlytTab').width() * 0.96);
	
	var data = getPelaajienJaPelienMaarat();

	piirraPelaajatViikoittain(data);
	// Piirretään pelaajien määärä vuosittain
	piirraPelaajatVuosittain();	

	tulostaSahlykertojenMaaraTarkoillePeleille(sahlykerratLkmTarkatTiedotPelattiin);
	// Tulostaa eri sählykertojen tyyppien määrät
	tulostaSahlykerratTyypit(sahlykerratLkmPerustiedot, sahlykerratLkmTarkatTiedot, sahlykerratLkmEiPelattu, sahlykerratLkmEiVarmaaPelattiinko, sahlykerratLkmPelattiin,	sahlykerratLkmTarkatTiedotPelattiin, sahlykerratLkmTarkatTiedotEiPelattu);

	tulostaJoukkueidenTaulukko();

	// Alustaa ja täyttää taulukon pelien tiedoista, mm. maalit
	// Taulukon leveys max 1220 pix
	alustaPeliTaulukko();
	taytaPeliTaulukko();	
}

function valitseValittuPelaajaTab(){

	//alert("Leveys: " + $('#valittuTab').width());	

	$('#pelaajaVoittoprosenttiKuvaaja').width($('#valittuTab').width() * 0.96);
	// Selvitetään, kenen pelaajan nimi on valittu nimilistalta
	var pelaajatSelectTagElementti = document.getElementById("pelaajatSelectTag");
	var listaltaValittuNimi = pelaajatSelectTagElementti.options[pelaajatSelectTagElementti.selectedIndex].text;

	pelaajanVoittoprosentti(listaltaValittuNimi, 'pelaajaVoittoprosenttiKuvaaja');
	// Piirakkakaavio valitun pelaajan tiedoista: paikalla, poissa, ei tietoa
	osallistuminenPie(listaltaValittuNimi, 'pelaajanOsallistuminenPieId');

	paivitaValittuPelaajaTab();
	//pelaajaTabille(listaltaValittuNimi, $('#pieninPaivaInput').val(), $('#suurinPaivaInput').val());
}

// Päivittää välilehden, jossa on valitun pelaajan tiedot
function paivitaValittuPelaajaTab(){


	var e = document.getElementById("pelaajatSelectTag");
	var listaltaValittuNimi = e.options[e.selectedIndex].text;

	// Otsikko
	$("#sahlytOtsikkoId").text("Valittu pelaaja: " + listaltaValittuNimi);

	// Lisää perustiedot
	lisaaValitunPerustiedotTabille(listaltaValittuNimi);

	// Taulukko, jossa on sählykerrat (eka taulukko)
	alustaSahlytaulukkoPelaajatiedot();
	taytaSahlytaulukkoPelaajatiedot(pelaajaOliot, sahlyOliot, listaltaValittuNimi);

	// Parien kanssa/vastaan pelattujen pelien lukumäärät
	alustaParitilastoLukumaaratTaulukko();
	taytaParitilastoLukumaaratTaulukko(listaltaValittuNimi);

	// Parit samalla puolella
	alustaParitilastoToveritTaulukko();
	var paritilasto = palautaParitilasto(sahlyOliot, listaltaValittuNimi);
	taytaParitilastoToveritTaulukko(paritilasto, listaltaValittuNimi);

	// Parit vastapuolella
	alustaParitilastoVastustajatTaulukko();
	// Palauttaa taulukon, jossa pelaajan menestyminen muita vastaan pelattaessa
	var paritVastustajana = palautaParitilastoVastustajaAnnetulle(sahlyOliot, listaltaValittuNimi);
	taytaParitilastoVastustajatTaulukko(paritVastustajana, listaltaValittuNimi);

	// Piirretään valitun pelaajan voittoprosentti
	pelaajanVoittoprosentti(listaltaValittuNimi, "pelaajaVoittoprosenttiKuvaaja");
	// Piirretään osallistuminen piirakka
	osallistuminenPie(listaltaValittuNimi, "pelaajanOsallistuminenPieId");
}

function valitseKaikkiPelaajatTab(){

	//alert("Kaikki pelaajat tab leveys: " + $('#pelaajatTab').width());

	//$('#korrelaatioPelitVoittoprosenttiId').width($('#pelaajatTab').width() * 0.96);
	//Tulostaa taulukon, jossa on kaikkien pelaajien tärkeimmät tiedot
	//tulostaKaikkienPelaajienTaulukko(pelaajaOliot);		
	alustaKaikkienPelaajienTaulukko();
	taytaKaikkienPelaajienTaulukko(pelaajaOliot);

	//id=korrelaatioPelitVoittoprosenttiId
	$('#korrelaatioPelitVoittoprosenttiId').width($('#pelaajatTab').width() * 0.96);

	var taulu = $('#kaikkiPelaajatTable').dataTable();
	var data = taulu.fnGetData();

	piirraPelienMaaraJaVoittoprosentti();

	var ratkaisijat = getRatkaisijat();
	alustaRatkaisijatTaulukko();
	taytaRatkaisijatTaulukko(ratkaisijat);
}

function valitseParitTab(){

	//alert("Leveys: " + $('#paritTab').width());
	// Luo tilastot, joissa on pelaajat pareittain samoissa ja eri joukkueissa

	$('#paritilastoToveriKaavioId').width($('#paritTab').width() * 0.96);

/*	paritSamassa = 	getParitilastoToveritData();
	//luoParitilasto(sahlyOliot, paritSamassa);	

	// Uusi tapa:
	alustaParitilastoToveritKaikkiTaulukko();
	taytaParitilastoToveritKaikkiTaulukko(paritSamassa);

	// Vanha tapa:
	//paritSamassa = luoParitilasto(sahlyOliot);	
	
*/
	// Kaavio, joss voitoikkaimmat parit
//	piirraVoitoikkaimmatParit(paritSamassa);

// Luo tilastot, joissa on pelaajat pareittain samoissa ja eri joukkueissa
	paritSamassa = 	getParitilastoToveritData();
//alert("main() " + paritSamassa[0][1]);
	luoParitilasto(sahlyOliot, paritSamassa);	

//paritSamassa = luoParitilasto(sahlyOliot);
	// Parit vastajoukkueissa
	// Vanha:
	// luoko vain valitulle pelaajalle vai kaikille pareille?
	// #paritilastoVastustajatKaikkiTaulukkoTable
	luoParitilastoVastustaja(sahlyOliot);	

//Uusi mutta hidas:
/*	
//	var paritilasto = getParitilastoVastustajatData();
	var paritVastustajana = getParitilastoVastustajatKaikkiData2();
	alustaParitilastoVastustajatKaikkiTaulukko();
	taytaParitilastoVastustajatKaikkiTaulukko2(paritVastustajana);
*/


	// Piirtää kaaviot paritilastoista:
	// Parit samassa joukkueessa: x=pelien määrä, y=voittoprosentti (osoittamalla parin pelaajat)
	piirraPelienMaaraJaVoittoprosenttiParille('paritilastoToveriKaavioId', paritSamassa, "");
// Kaavio, joss voitoikkaimmat parit
	piirraVoitoikkaimmatParit(paritSamassa);
}

function valitseJoukkueetTab(){

	//alert("Leveys: " + $('#joukkueetTab').width());
	alustaJoukkuetaulukko();
	// Täyttää taulukon
	taytaJoukkueTaulukko();
}

function avaaOdotusikkuna(){
$('#myModal').modal('show')  ;

	console.log("odotusikkuna");

	return true;
}

function avaaOdotusikkuna2(tab){

//	console.log("odotusikkuna 2");	

	// Jos ei tarvitse päivittää
	if(tab === "sahlytTab" && !paivitaSahlytTab){
		return;
	}

	if(tab === "valittuTab" && !paivitaValittuTab){
		return;
	}

	if(tab === "pelaajatTab" && !paivitaPelaajatTab){
		return;
	}

	if(tab === "paritTab" && !paivitaParitTab){
		return;
	}

	if(tab === "joukkueetTab" && !paivitaJoukkueetTab){
		return;
	}

	if(tab === "tapsaCupTab" && !paivitaTapsacupTab){
		return;
	}

	//console.log("avataan odotusikkuna");

	// Jos päästiin tänne, näytetään dialogi-ikkuna latauksen aikana
	$('#hakuKaynnissaDialogi').dialog({
			modal: true,
			title: 'Haetaan ...',
			width: "500px",
			height: "170",
			position: {at: 'center'},
		/*	position: { // Määrittelee mihin kohtaan ikkuna sijoitetaan
				at: 'top',
				of: $('#sahlytTab') // Pelaajien taulukon päälle
			},*/
			},

			// Lisätään viesti
 			$("#hakuKaynnissaDialogi").html("<br><h3  style='text-align:center;color:green;'>Haetaan, oottele rauhassa ...<h3>")
		);
	$("#hakuKaynnissaDialogi").siblings('div.ui-dialog-titlebar').remove();


}

function suljeOdotusikkuna(){

	// Jos "Haetaan"-dialogi-ikkuna on auki, suljetaan se
	if( $("#hakuKaynnissaDialogi").hasClass('ui-dialog-content') ){
		//alert("suljetaan");
		$('#hakuKaynnissaDialogi').dialog ('close');
	}
}
