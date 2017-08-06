/* 
	Päätiedosto, joka lukee xml-tiedostosta sählytilastot ja kutsuu funktioita, jotka täyttävät HTML-tiedoston.
*/

// Päivitetäänkö tabit vai ei
var paivitaSahlytTab = true;
var paivitaValittuTab = true;
var paivitaPelaajatTab = true;
var paivitaParitTab = true;
var paivitaJoukkueetTab = true;
var paivitaTapsacupTab = true;


// 2D-taulukko, jossa [pelejä, voittoprosentti, "nimi1-nimi2"]
var paritSamassa;



// Tiedosto, jossa sählyjen tiedot eli tilastot
var tilastojenTiedostonNimi = "sahlytilastot.xml";

var pelikaudetOliot = {};

// Pelaajien oliot
var pelaajaOliot = {};
// Pelaajien tilastonimet
var pelaajaNimet = [];

// Sanakirja sählykerroista. Avaimena on päiväys, joten kahta sählyä ei voi olla samana päivänä
var sahlyOliot = {};

// Tilasto joukkueen (esim. paidat) pärjäämisestä
var joukkueTilasto = {};

// Sanakirjat joukkueiden voittojen, tappioiden ja tasapelien määristä
var voittojoukkueetJaMaarat = {};
var tappiojoukkueetJaMaarat = {};
var tasapelijoukkueetJaMaarat = {};

// Eri sählykertojen lukumääriä
var sahlykerratLkmPelattiin = 0;
var sahlykerratLkmEiPelattu = 0;
var sahlykerratLkmEiVarmaaPelattiinko = 0;
var sahlykerratLkmPerustiedot = 0;
var sahlykerratLkmTarkatTiedot = 0;	
var sahlykerratLkmTarkatTiedotPelattiin = 0;	
var sahlykerratLkmTarkatTiedotEiPelattu = 0;	


// Pääfunktio
$(document).ready(function(){ 
	
	// Nollataan hakupäivät
	$('#pieninPaivaInput').val("");
	$('#suurinPaivaInput').val("");

	// Lisää pelikausien tiedot HTML-valintalistaan
	lisaaPelikaudetValintalistaan();

	// Hakee pelaajien tiedot xml-tiedostosta
	haePelaajat();

	finaalimainos1();

	// Vaihtaa kaavioiden kuukaudet suomenkielelle
	asetaSuomalaisetAjat();

	// Hakee sählytiedot xml-tiedostosta
	haeTiedot();

	// Tyhjennetään pelien määrä -kenttä
	$('#naytaPelaajiaInputId').val("");

	// Tiedot on luettu xml-tiedostosta, 
	// muutetaan taulukkojen ja kaavioiden tarvitsemaan muotoon, kun välilehtiä avataan





// Nämä oli aiemmin - ja edelleen - haeTiedot()-funktion lopussa:
		// Lisätään tiedot kaavioihin ja taulukoihin
//		luoKaaviotTaulukot();
		// Lisätään tiedot Tapsa-cup finaaleista
//		lisaaFinaalitaulukot();

});	//END ready()
 



function lisaaFinaalitaulukot(){

	// Luodaan taulukko pelaajien finaalitiedoista
	var finaalitPelaajatTable = '<table id="finaalitPelaajatTable" class="tablesorter" width="98%">';
	finaalitPelaajatTable += '<thead><tr>';
	// Lisätään sarake pelaajan nimelle
	finaalitPelaajatTable += '<th align="center">Nimi</th>';		

	// Luodaan taulukko finaalipeleistä
	var finaalitTable = '<table id="finaalitTable" class="tablesorter" width="98%">';
	finaalitTable += '<thead><tr>';
	// Lisätään otsikot
	finaalitTable += '<th align="center">Kausi</th><th align="center">Päivämäärä</th>';
	finaalitTable +='<th align="center">Joukkue 1</th><th align="center">Maalit</th><th align="center">Joukkue2</th><th align="center">Voittaja</th>';		
	finaalitTable += '</tr></thead>';
	finaalitTable += '<tbody>';

	// Sanakirja sanakirjassa (2D-taulu), jossa finaalitiedot-sanakirjassa avain on pelaajan nimi 
	// ja arvo sanakirja, jossa avain on kauden lyhyt nimi ja arvo tulos: "voitto"|"tappio"
	// esim:  finaalitiedot["Kimmo" : {"Kesä 14": "voitto", "Talvi 14-15": "tappio"}, "Antti" : {"Kesä 14": "tappio", "Talvi 14-15": ""}]
	var finaalitiedot = {};

	// Pelikausien lyhyet nimet
	var kausienLyhyetNimet = [];

	// Käydään läpi pelikaudet
	$.each(pelikaudetOliot, function(avain, arvo){

		// Jos finaalipäivän pelistä ei ole mitään tietoja, ei merkitä mitään
		if( !( pelikaudetOliot[avain].getLopetusPvm() in sahlyOliot)){
			return true;
			
		// Jos finaalipäivänä ei pelattu, merkitään "ei pelattu"
		} else if(sahlyOliot[ pelikaudetOliot[avain].getLopetusPvm() ].getPelattiinko() == false){

			// Merkitään, että ei pelattu
			finaalitTable += '<tr><td align="center">' +pelikaudetOliot[avain].getNimi()+ '</td><td align="center">' +pelikaudetOliot[avain].getLopetusPvm();
			finaalitTable += '</td><td align="center">(ei pelattu)</td><td></td><td></td><td></td></tr>';
			
			return true;

		// Jos finaalipäivän pelistä ei ole tarkkoja tietoja, merkitään "ei tietoja"
		} else if(sahlyOliot[ pelikaudetOliot[avain].getLopetusPvm() ].getTietojenTyyppi() != 'tarkat'){

			// laitetaan tyhjät tiedot taulukoihin
			finaalitTable += '<tr><td align="center">' +pelikaudetOliot[avain].getNimi()+ '</td><td align="center">' +pelikaudetOliot[avain].getLopetusPvm();
			finaalitTable += '</td><td align="center">(ei tietoja)</td><td></td><td></td><td></td></tr>';
			
			return true;
		}

		// Otetaan finaalipäivän viimeinen peli
		var finaali = sahlyOliot[ pelikaudetOliot[avain].getLopetusPvm() ].getPelit()[ sahlyOliot[pelikaudetOliot[avain].getLopetusPvm()].getPelit().length-1 ];

		// Selvitetään voittajajoukkueen pelaajat
		var voittajat = "";
		var haviajat = "";

		// Jos oli tasapeli
		if(finaali.onkoTasapeli()){

			// Molemmat joukkueet ovat voittajia
			voittajat = finaali.getPelaajatJoukkue1Array();
			voittajat = voittajat.concat(finaali.getPelaajatJoukkue2Array());
			haviajat = [];
		
		} else if( finaali.getJoukkueenNumero(finaali.getVoittaja()) == 1){ // Jos j1 voitti
			voittajat = finaali.getPelaajatJoukkue1Array();
			haviajat = finaali.getPelaajatJoukkue2Array();
		} else{ // muuten voitti j2
			haviajat = finaali.getPelaajatJoukkue1Array();
			voittajat = finaali.getPelaajatJoukkue2Array();
		}

		// Lisätään sarake nyt löydetylle finaalille		
		finaalitPelaajatTable += '<th align="center">' + pelikaudetOliot[avain].getNimiLyhyt() + '</th>';		

		// Lisätään pelikausi, jos sen finaali on annettujen päivämäärien välillä
		// Päivämäärää ei ole määritelty, joten kaikki kelpaa
		if(document.getElementById("pieninPaivaInput").value == "" && document.getElementById("pieninPaivaInput").value == ""){
			kausienLyhyetNimet.push(pelikaudetOliot[avain].getNimiLyhyt());

		} else if(document.getElementById("pieninPaivaInput").value === "" || pelikaudetOliot[avain].getLopetusPvm() >= document.getElementById("pieninPaivaInput").value){

			if(document.getElementById("suurinPaivaInput").value === "" || pelikaudetOliot[avain].getLopetusPvm() <= document.getElementById("suurinPaivaInput").value){
				kausienLyhyetNimet.push(pelikaudetOliot[avain].getNimiLyhyt());
			}			
		}

		// Lisätään finaalitaulukkoon rivi tälle finaalille
		finaalitTable += '<tr>';
		// Kauden nimi
		finaalitTable += '<td align="center">' + avain + '</td>';		
		// Päiväys
		finaalitTable += '<td align="center">' + pelikaudetOliot[avain].getLopetusPvm() + '</td>';		
		// Joukkue 1
		finaalitTable += '<td align="center">' + finaali.getJoukkue1() + '</td>';		
		// Joukkueiden maalit
		finaalitTable += '<td align="center">' + finaali.getMaalit1() + " - " + finaali.getMaalit2() + '</td>';	
		// Joukkue 2
		finaalitTable += '<td align="center">' + finaali.getJoukkue2() + '</td>';		
		// Voittaja
		// Jos oli tasapeli, molemmat ovat voittajia
		if(finaali.onkoTasapeli()){
			finaalitTable += '<td align="center">' + finaali.getJoukkue1() + ", " + finaali.getJoukkue2() + '</td>';		
		} else { // muuten toinen joukkue on voittaja
			finaalitTable += '<td align="center">' + finaali.getVoittaja() + '</td>';		
		}

		finaalitTable += '</tr>';

		// Otetaan tämän finaalin tiedot muistiin
		// Voittajat
		for(var i=0; i<voittajat.length; i++){

			// Jos tätä voittajajoukkueen pelaajaa ei ole vielä finaalitiedoissa, lisätään se nyt
			if( !(voittajat[i] in finaalitiedot) ){
				// Alustetaan uudelle pelaajalle tyhjä sanakirja
				finaalitiedot[voittajat[i]] = {};
				// Lisätään tämän finaalin lopputulos
				finaalitiedot[voittajat[i]][pelikaudetOliot[avain].getNimiLyhyt()] = "voitto";

			} else {	// Pelaaja on jo tiedossa, joten lisätään vain tieto			
				finaalitiedot[voittajat[i]][pelikaudetOliot[avain].getNimiLyhyt()] = "voitto";
			}
		}

		// Häviäjät, jos on
		if(haviajat.length > 0){

			for(var i=0; i<haviajat.length; i++){
			
				// Jos tätä tappiojoukkueen pelaajaa ei ole vielä finaalitiedoissa, lisätään se nyt
				if( !(haviajat[i] in finaalitiedot) ){
					// Alustetaan uudelle pelaajalle tyhjä sanakirja
					finaalitiedot[haviajat[i]] = {};
					// Lisätään tämän finaalin lopputulos
					finaalitiedot[haviajat[i]][pelikaudetOliot[avain].getNimiLyhyt()] = "tappio";

				} else {	// Pelaaja on jo tiedossa, joten lisätään vain tieto			
					finaalitiedot[haviajat[i]][pelikaudetOliot[avain].getNimiLyhyt()] = "tappio";
				}

			}	//END for()

		} //END if(haviajat.length > 0)

	}); // END each(pelikaudet)

	// Lisätään sarakkeiden otsikoita
	finaalitPelaajatTable += '<th align="center">Voitot</th><th align="center">Tappiot</th><th align="center">Yhteensä</th></tr></thead><tbody>';

	// Käydään finaalien pelaajat läpi
	for(var finalisti in finaalitiedot){

		// Lisätään pelaajan nimi
		finaalitPelaajatTable += '<tr><td>' + finalisti + '</td>';
		var voitot = 0;
		var tappiot = 0;

		// Käydään pelikaudet läpi
		for(var i=0; i<kausienLyhyetNimet.length; i++){

			// Jos pelaaja osallistui tämän kauden finaaliin
			if(kausienLyhyetNimet[i] in finaalitiedot[finalisti]){
				// Lisätään pelaajan tulos(voitto, tappio) HTML-taulukkoon
				finaalitPelaajatTable += '<td align="center">' + finaalitiedot[finalisti][kausienLyhyetNimet[i]] + '</td>';

				// Lasketaan pelaajan voittojen ja tappioiden määrään yksi lisää
				if(finaalitiedot[finalisti][kausienLyhyetNimet[i]] == "voitto"){
					voitot++;	
				} else {
					tappiot++;
				}

			} else {	// Tämä pelaaja ei osallistunut tähän finaaliin, joten lisätään tyhjä HTML-taulukkoon
				finaalitPelaajatTable += '<td></td>';
			}

		} // END for(pelikausi)

		// Lisätään pelaajan voittojen tappioiden ja pelattujen finaalien määrä
		finaalitPelaajatTable += '<td align="center">' + voitot + '</td><td align="center">' + tappiot + '</td><td align="center">' + (voitot+tappiot) + '</td></tr>';


		// Jos finalistia ei ole pelaajissa
		if( !(finalisti in pelaajaOliot) ){
			alert("main.js: Virhe! Pelaajatiedoissa ei ole finalistia: " + finalisti);
		}

//	alert("Lisätään cup-tiedot");
		// Lisätään pelaajan cup-menestys hänen oliooonsa
		pelaajaOliot[finalisti].setCupOsallistumiset(voitot+tappiot);
		pelaajaOliot[finalisti].setCupVoitot(voitot);

	} // END for(finaaleissa pelatut pelaajat)
	
	finaalitPelaajatTable += '</tbody></table>';
	finaalitTable += '</tbody></table>';

	// Lisätään HTML-taulukko HTML-sivulle
	$("#finaalitPelaajatId").empty();
	$("#finaalitPelaajatId").append(finaalitPelaajatTable);

	// Jos finalisteja löytyi
	if(Object.keys(finaalitiedot).length > 0){
		// Lisätään sortteri
		$("#finaalitPelaajatTable").tablesorter({ 
				sortList: [[0,0]],
				widgets: ['zebra']
		});
	}

	// Lisätään HTML-taulukko HTML-sivulle
	$("#finaalitId").empty();
	$("#finaalitId").append(finaalitTable);

	// Jos finaaleista löytyi tietoja
	if(kausienLyhyetNimet.length > 0){
		// Lisätään sortteri
		$("#finaalitTable").tablesorter({ 
			sortList: [[1,0]],
			widgets: ['zebra']
		});
	}
}


// Lisää pelikausien tiedot HTML:n select-valintalistaan
function lisaaPelikaudetValintalistaan(){

	$.get(tilastojenTiedostonNimi, {}, function(xml){

		// Käy läpi tilastot
		$('tilastot', xml).each(function() {
						
			$(this).children('pelikaudet').each(function() {

				// Käy läpi pelikaudet
				$(this).children('pelikausi').each(function() {
					
					// Luetaan kauden tiedot
					var nimi = $(this).attr('nimi');
					var nimiLyhyt = $(this).attr('nimiLyhyt');
					var alkoi = $(this).attr('pvmAloitus');
					var loppui = $(this).attr('pvmLopetus');

					// Luodaan olio
					pelikaudetOliot[nimi] = new Pelikausi(nimi, nimiLyhyt, alkoi, loppui);

					// Lisätään valintalistaan
					$('#kausiValinta').append($("<option></option>").attr("value",nimi).text(nimi)); 
				});
			});
		});
	});
}


// Hakee pelaajat xml-tiedostosta
function haePelaajat(){
	
	// Avaa tilastotiedoston
	$.get(tilastojenTiedostonNimi, {}, function(xml){

		// tilastot-juurielementti
		$('tilastot',xml).each(function() {

			// Luetaan pelaajien tiedot
			$(this).children('pelaajat').each(function() {

				// Luetaan yhden pelaajan tiedot
				$(this).children('pelaaja').each(function() {

					// Tilastonimi on uniikki eli esim "Janne", "Janne2"
					var tilastonimi = $(this).attr("tilastonimi");
					// Pelaajan loput tiedot
					var etunimi = $(this).attr("etunimi");
					var sukunimi = $(this).attr("sukunimi");
					var kutsumanimi = $(this).attr("kutsumanimi");
					var kuvaus = $(this).attr("kuvaus");
					var ominaisuudet = $(this).attr("ominaisuudet");
					var muuta = $(this).attr("muuta");

					// Jos ei ole vielä pelaajalistassa, lisätään listaan
					if($.inArray(tilastonimi , pelaajaNimet) == -1 ){
						pelaajaNimet.push(tilastonimi);
						pelaajaOliot[tilastonimi] = new Pelaaja(tilastonimi);
						// Lisätään myös pelaajan olio
						pelaajaOliot[tilastonimi].addKuvaustiedot(etunimi, sukunimi, kutsumanimi, tilastonimi, kuvaus, ominaisuudet, muuta)
					}
				});	// END 'pelaaja'
			});	// END 'pelaajat'
		
			// Tyhjennetään pelaajan nimen valintalista
			$('#pelaajatSelectTag').empty();
			$('#pelaajatSelectTag2').empty();

			// HTML-valintalista, jossa on pelaajien nimet
			var pelaajatSelectTag = document.getElementById('pelaajatSelectTag');

var pelaajatSelectTag2 = document.getElementById('pelaajatSelectTag2');
var option2 = document.createElement('option');
option2.value = "";
option2.innerHTML = "";
pelaajatSelectTag2.appendChild(option2);


			// Lisätään nimet ym. valintalistaan
			for(var i=0; i<pelaajaNimet.length; i++){
				// option on HTML select-listan yksi elementti eli yksi nimi
				var option = document.createElement('option');
option2 = document.createElement('option');
				option.value = pelaajaNimet[i];
option2.value = pelaajaNimet[i];
				option.innerHTML = pelaajaNimet[i];
option2.innerHTML = pelaajaNimet[i];
				pelaajatSelectTag.appendChild(option);

pelaajatSelectTag2.appendChild(option2);
			}		
			
		});	// END 'tilastot'
	});	// END get()

	// Palautetaan sanakirja pelaajien olioista
	return pelaajaOliot;
}

// Asettaa suomennokset ajoille
function asetaSuomalaisetAjat(){

	// Kaavioita varten aikojen käännökset suomeksi
	$.jsDate.regional['fi'] = {
		monthNames: ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kesäkuu','Heinäkuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'],
		monthNamesShort: ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kesäkuu','Heinäkuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'],
		dayNames: ['maanantai','tiistai','keskiviikko','torstai','perjantai','lauantai','sunnuntai'],
		dayNamesShort: ['ma','ti','ke','to','pe','la','su'],
		formatString: '%Y-%m-%d %H:%M:%S'
	};
	// Otetaan käyttöön suomennokset
	$.jsDate.regional.getLocale();
}


// Hakee sählytilastot
function haeTiedot(){

	// Lisää HTML-tiedostoon minkänimisestä tiedostosta tilastoja luetaan
	$("#tilastojenTiedostonNimiId").html("Ohjelma lukee pelien tiedot tiedostosta "+tilastojenTiedostonNimi+", josta se luo alla olevat tilastot.");
	$("#tilastojenTiedostonNimiId").append(" Voit avata tiedoston myös tekstieditorilla(esim. Notepad, Muistio, jne), jos kiinnostaa.");

	// Tyhjennetään pelaajien tiedot, koska niissä voi olla pelitietoja, jotka eivät ole enää voimassa
	pelaajaOliot = {};
	// Pelaajien tilastonimet
	pelaajaNimet = [];
	// Haetaan pelaajat uudestaan
	haePelaajat();

	// Tyhjennetään muutkin tiedot
	sahlyOliot = {};
	joukkueTilasto = {};
	// Sanakirjat joukkueiden voittojen, tappioiden ja tasapelien määristä
	voittojoukkueetJaMaarat = {};
	tappiojoukkueetJaMaarat = {};
	tasapelijoukkueetJaMaarat = {};

	// Luetaan xml-tiedosto
	$.get(tilastojenTiedostonNimi,{},function(xml){

		// Eri sählykertojen lukumääriä
		sahlykerratLkmPelattiin = 0;
		sahlykerratLkmEiPelattu = 0;
		sahlykerratLkmEiVarmaaPelattiinko = 0;
		sahlykerratLkmPerustiedot = 0;
		sahlykerratLkmTarkatTiedot = 0;	
		sahlykerratLkmTarkatTiedotPelattiin = 0;	
		sahlykerratLkmTarkatTiedotEiPelattu = 0;	
	
		// Luetaan varsinaiset sählykertojen tiedot
		$('tilastot',xml).each(function() {

			// Käydään läpi sählyt
			$(this).children('sahlyt').each(function() {

				// Sählykerralla pelattuje pelien lukumäärä
				// Jos ei tiedetä, tyhjä
				//var pelitLkm = "";

				$(this).children('sahly').each(function() {

					// Tämän sählykerran päiväys
					var pvm = $(this).attr("pvm");

					// Jos päivämääriä on rajattu, ei oteta niiden ulkopuolelle olevia tietoja
					if(document.getElementById("pieninPaivaInput").value !== pvm && pvm < document.getElementById("pieninPaivaInput").value){
						return true;
					}
					if(document.getElementById("suurinPaivaInput").value !== "" && pvm > document.getElementById("suurinPaivaInput").value){
						return true;
					}

					// Tämän sählykerran tietoja
					var paikka = $(this).attr("paikka");
					var alkoi = $(this).attr("alkoi");
					var loppui = $(this).attr("loppui");
					var muuta = $(this).attr("muuta");
					var pelattiinko = $(this).attr("pelattiinko");
					
					// Muutetaan muotoon boolean
					if(pelattiinko === "kyllä"){
						pelattiinko = true;
						// Yksi sählykerta lisää, jolloin pelattiin
						sahlykerratLkmPelattiin++;
					} else if(pelattiinko === "ei"){
						pelattiinko = false;
						// Yksi sählykerta lisää, jolloin ei pelattu
						sahlykerratLkmEiPelattu++;
					} else {
						pelattiinko = "";
						// Yksi sählykerta lisää, josta ei ole varmuutta pelattiinko vai ei
						sahlykerratLkmEiVarmaaPelattiinko++;
					}

					// Luodaan sähly-olio ja lisätään se sanakirjaan
					var sahly = new Sahly(pvm, paikka, alkoi, loppui, muuta, pelattiinko);
					sahlyOliot[pvm] = sahly;
					
					// Sanakirja, jossa pelaajan nimi on avain ja 1 on arvo, jos osallistui tähän sählykertaan.
					// Jos ei osallistunut, nimeä ei ole sanakirjassa ollenkaan.
					var osallistujat = {};
							
					// Perustiedot peleistä
					// --------------------
					$(this).children('perustiedot').each(function() {
						// Yksi sählykerta lisää, josta on perustiedot
						sahlykerratLkmPerustiedot++;

						// Selvitetään perustiedot ja lisätään ne sählytietoihin
						var pt = lisaaSahlyllePerustiedotPelista(this, pvm);
			
						// Lisätään pelaajille perustiedot
						lisaaPelaajillePerustiedotPeleista(pt, pvm);
					});

					// Onko tarkat pelitiedot
					var tarkat = false;
					// Monesko peli tällä sählykerralla
					var peliInd = 0;

					// Tarkat tiedot peleistä
					// --------------------
					$(this).children('peli').each(function() {
						
						// Tästä pelistä on tarkat pelitiedot
						tarkat = true;

						// Selvitetään pelin tarkat tiedot
						var peli = getTarkatTiedotPelista(this, pelattiinko, pvm, peliInd);

						// Lisätään tämä sählykerran peleihin
						sahlyOliot[pvm].addPeli(peli);						

						// Lisätään molempien joukkueiden pelaajat osallistujiin
						osallistujat = peli.getOsallistujat(osallistujat);
						// Lisätään muistiin montako peliä on tällä sählykerralla
						peliInd++;

					});	//END käydään läpi pelin tarkat tiedot
			
					// Jos oli tarkat tiedot, lisätään tietoja
					if(tarkat){
						// Lisätään
						sahlykerratLkmTarkatTiedot++;
						// Jos pelattiin
						if(pelattiinko){
							sahlykerratLkmTarkatTiedotPelattiin++;	
						} else {	// Ei pelattu
							sahlykerratLkmTarkatTiedotEiPelattu++;
						}

						// Lisätään sählylle ja pelaajille tietoja
						lisaaSahlylleJaPelaajalleTarkatTiedot(osallistujat, pvm);
					}// END if(tarkat)
	
				});	// END 'sahly'

			});	// END 'sahlyt'		
		});	// END 'tilastot'


		// Lisätään tiedot kaavioihin ja taulukoihin
		//		luoKaaviotTaulukot();
		
		// Lisätään tiedot Tapsa-cup finaaleista
		lisaaFinaalitaulukot();
		// Välilehti on päivitetty, joten ei tarvitse enää päivittää
		paivitaTapsacupTab = false;

	});	// END get()

	var ekaPvm = document.getElementById("pieninPaivaInput").value;
	var vikaPvm = document.getElementById("suurinPaivaInput").value;
	var elementti = document.getElementById('haetaanPvmId');

	// Lisätään hakunapin viereen tieto, miltä aikaväliltä on tiedot haettu

	// Jos puuttuu min ja max -päivät
	if(ekaPvm === "" && vikaPvm === ""){
		elementti.innerHTML = "Haettu kaikki tiedot";		
	
	} else if(ekaPvm === ""){ // min päivä puuttuu
		elementti.innerHTML = "Haettu tiedot ennen: " + vikaPvm;		

	} else if(vikaPvm === ""){ // max päivä puuttuu
		elementti.innerHTML = "Haettu tiedot alkaen: " + ekaPvm;		

	} else {
		elementti.innerHTML = "Haettu tiedot aikaväliltä: "+ ekaPvm  + " - " + vikaPvm;		
	}

	

} //END haeTiedot()


// Luo HTML-tiedostoon sekalaisia kaavioita ja taulukoita
function luoKaaviotTaulukot(){

	// Selvitetään, kenen pelaajan nimi on valittu nimilistalta
	var pelaajatSelectTagElementti = document.getElementById("pelaajatSelectTag");
	var listaltaValittuNimi = pelaajatSelectTagElementti.options[pelaajatSelectTagElementti.selectedIndex].text;

	// Päivitetään sählyt-taulukkoon oikea nimi otsikkoon
	$("#sahlytOtsikkoId").text("Sählykerrat ja pelien tulokset pelaajalle " + listaltaValittuNimi);
	// Sählyt-taulukko, jossa on sählykertojen tiedot ja valitun pelaajan voitot/tappiot
	alustaSahlytaulukkoPelaajatiedot();
	taytaSahlytaulukkoPelaajatiedot(pelaajaOliot, sahlyOliot, listaltaValittuNimi);

	// Piirakkakaavio valitun pelaajan tiedoista: paikalla, poissa, ei tietoa
	osallistuminenPie(listaltaValittuNimi, 'pelaajanOsallistuminenPieId');

//alert("Valittu: " + listaltaValittuNimi)
	// Viivakaavio valitun pelaajan voittoprosentin kehittymisestä
	pelaajanVoittoprosentti(listaltaValittuNimi, 'pelaajaVoittoprosenttiKuvaaja');

	// Viivakaavio pelaajien määristä kaikilta vuosilta
	piirraPelaajat();

	// Tulostaa eri sählykertojen tyyppien määrät
	tulostaSahlykerratTyypit(sahlykerratLkmPerustiedot, sahlykerratLkmTarkatTiedot, sahlykerratLkmEiPelattu, sahlykerratLkmEiVarmaaPelattiinko, sahlykerratLkmPelattiin,	sahlykerratLkmTarkatTiedotPelattiin, sahlykerratLkmTarkatTiedotEiPelattu);

	// Kertoo kuinka monelta sählykerralta pelien tulokset ovat
	tulostaSahlykertojenMaaraTarkoillePeleille(sahlykerratLkmTarkatTiedotPelattiin);
	// Tulostaa taulukon, jossa on kaikki joukkueet ja niiden voitot/tasapelit/tappiot ja pelien määrät
	tulostaJoukkueidenTaulukko();

	// Tulostaa taulukon, jossa on kaikkien pelaajien tärkeimmät tiedot
	//tulostaKaikkienPelaajienTaulukko(pelaajaOliot);		
alustaKaikkienPelaajienTaulukko();
taytaKaikkienPelaajienTaulukko(pelaajaOliot);		

// Tätä kutsutaan ym. funtkiosta
//	piirraPelienMaaraJaVoittoprosentti();

	// Luo tilastot, joissa on pelaajat pareittain samoissa ja eri joukkueissa
	paritSamassa = 	getParitilastoToveritData();
//alert("main() " + paritSamassa[0][1]);
//	luoParitilasto(sahlyOliot, paritSamassa);	
alustaParitilastoToveritKaikkiTaulukko();
taytaParitilastoToveritKaikkiTaulukko(paritSamassa);

	var paritVastakkain = getParitilastoVastustajatData();
	alustaParitilastoVastustajatKaikkiTaulukko();
	taytaParitilastoVastustajatKaikkiTaulukko(paritVastakkain);
// vanha, toimiva:
//	luoParitilastoVastustaja(sahlyOliot);	


	// Piirtää kaaviot paritilastoista:
	// Parit samassa joukkueessa: x=pelien määrä, y=voittoprosentti (osoittamalla parin pelaajat)
	piirraPelienMaaraJaVoittoprosenttiParille('paritilastoToveriKaavioId', paritSamassa, "");
	

	// UUTTA: Luo taulukon, jossa on joukkueiden tiedot eli joukkueen pelaajat ja menestyminen
//	alustaJoukkuetaulukko();
	// Täyttää taulukon
//	taytaJoukkueTaulukko();

	// Jos "Haetaan"-dialogi-ikkuna on auki, suljetaan se
	if( $("#haetaanDialogi").hasClass('ui-dialog-content') ){
		$('#haetaanDialogi').dialog ('close');
	}
}


// Lisää sählykerralle tiedot, kun peleistä oli tarkat tiedot
function lisaaSahlylleJaPelaajalleTarkatTiedot(osallistujat, pvm){

	// Lisätään tieto, että sählystä on tarkat tiedot
	sahlyOliot[pvm].setTietojenTyyppi("tarkat");

	// Lisätään paikallaolo tai poissaolo 
	for(var i=0; i<pelaajaNimet.length; i++){

		// Jos oli paikalla
		if( pelaajaNimet[i] in osallistujat ){
			pelaajaOliot[pelaajaNimet[i]].lisaaSahlykerta();
		} else {	// Jos ei ollut paikalla
			pelaajaOliot[pelaajaNimet[i]].setSahlyPeliTulos(pvm, 0, "poissa", "", "");
		}
	}
}


// 2016:
// Hakee XML-tiedostosta perustiedot yhden sählykerran peleistä. 
function lisaaSahlyllePerustiedotPelista(elem, pvm){

		var pelaajia = $(elem).find("pelaajia").text();

		// Kimmon pelitulokset
		var kimmonTulokset = [];
		var peli1 = $(elem).find("kimmo").attr("peli1");
		var peli2 = $(elem).find("kimmo").attr("peli2");
		var peli3 = $(elem).find("kimmo").attr("peli3");
		var peli4 = $(elem).find("kimmo").attr("peli4");

		// Jos peliä ei ole, se on 'undefined'.
		// Jos peli pelattiin, mutta Kimmo ei ollut, se on "".

		// Lisätään pelitulokset, jos eivät ole tyhjiä
		if(typeof peli1 !== 'undefined'){
			kimmonTulokset.push(peli1);		
		}
		if(typeof peli2 !== 'undefined'){
			kimmonTulokset.push(peli2);
		}
		if(typeof peli3 !== 'undefined'){
			kimmonTulokset.push(peli3);
		}
		if(typeof peli4 !== 'undefined'){
			kimmonTulokset.push(peli4);
		}

		var kimmoPaikalla = $(elem).find("kimmo").text();
		var visaPaikalla = $(elem).find("visa").text();
		var muuta = $(elem).find("muuta").text();

		// Luodaan Perustiedot-olio ja palautetaan se
		var pt = new Perustiedot(pelaajia, kimmonTulokset, kimmoPaikalla, visaPaikalla, muuta);

		// Lisätään sählykerralle perustiedot
		sahlyOliot[pvm].setPerustiedot(pt);
		// Lisätään tieto, että sählystä on vain perustiedot
		sahlyOliot[pvm].setTietojenTyyppi("perus");
		// Lisätään myös erikseen pelaajien lukumäärä
		sahlyOliot[pvm].setPelaajia(pt.getPelaajia());

		return pt;
}

// 2016:
// Lisätään kaikille pelaajille perustiedot parametrina olevien perustietojen perusteella
// Eli jotain tietoja Kimmolle ja Visalle, muille pelaajille merkintä "ei tietoa".
function lisaaPelaajillePerustiedotPeleista(perustieto, pvm){

	// Käydään läpi kaikki pelaajat
	for(nimi in pelaajaOliot){

		// Kimmon tiedot
		if(nimi === "Kimmo"){

			// Kimmon pelitulokset taulukkona
			var tulokset = perustieto.getKimmonTulokset();

			// Peli 0
			pelaajaOliot[nimi].setSahlyPeliTulos(pvm, 0, perustieto.getKimmoPaikalla(), "", "");

			// Jos kimmo oli paikalla, lisätään tieto
			if(perustieto.getKimmoPaikalla() === "paikalla" || perustieto.getKimmoPaikalla() === true){
				pelaajaOliot["Kimmo"].lisaaSahlykerta();
			}

			// Jos on pelituloksia, otetaan pelit 1-...
			for(var i=0; i<tulokset.length; i++){

				// Jos kimmo pelasi	
				if(tulokset[i] !== "" && tulokset[i] !== 'undefined' && tulokset[i] !== null){

					pelaajaOliot[nimi].setSahlyPeliTulos(pvm, i+1, perustieto.getKimmoPaikalla(), tulokset[i], "");
					// Lisätään peliin osallistuminen
					pelaajaOliot[nimi].lisaaPeli();

					// Lisätään Kimmolle voitto, tasuri tai tappio
					if(tulokset[i] === "voitto"){
						pelaajaOliot[nimi].lisaaVoitto();
					} else if(tulokset[i] === "tappio"){
						pelaajaOliot[nimi].lisaaTappio();
					} else if(tulokset[i] === "tasapeli"){
						pelaajaOliot[nimi].lisaaRatkaisematon();
					}
				} else { // Jos Kimmo ei pelannut
					pelaajaOliot[nimi].setSahlyPeliTulos(pvm, i+1, "poissa", "", "");
				}
			}

			// Lisätään myös sählykerralle pelien lukumäärä
			if(tulokset.length > 0){
				sahlyOliot[pvm].setPelitLkm(tulokset.length);
			}

		} else if(nimi === "Visa"){ // Visan tiedot			

			// Jos Visa oli paikalla, lisätään tieto
			if(perustieto.getVisaPaikalla() === "paikalla" || perustieto.getVisaPaikalla() === true){
				// Peli 0
				pelaajaOliot[nimi].setSahlyPeliTulos(pvm, 0, "paikalla", "", "");
				pelaajaOliot[nimi].lisaaSahlykerta();

			} else if(perustieto.getVisaPaikalla() === "poissa" || perustieto.getVisaPaikalla() === false){ // Visa poissa
				// Peli 0
				pelaajaOliot[nimi].setSahlyPeliTulos(pvm, 0, "poissa", "", "");

			} else {	// Ei tietoa Visasta
				// Peli 0
				pelaajaOliot[nimi].setSahlyPeliTulos(pvm, 0, "ei tietoa", "", "");
			}

		} else{ // Muille lisätään, että ei tietoa oliko paikalla
			pelaajaOliot[nimi].setSahlyPeliTulos(pvm, 0, "ei tietoa", "", "");
		}
	}

}	// END lisaaPelaajillePerustiedotPeleista()


// 2016:
// Tarkat tiedot, mutta peliä ei pelattu
function lisaaTarkatTiedotPelaamattomastaPelista(elem, pvm){

	var peliMuuta = $(elem).attr("muuta");	
	var pelinPelaajia = 0;

	// Lisätään paikallaolo löydetyille pelaajille
	$(elem).children('pelaajat').each(function() {	

		$(this).children('pelaaja').each(function() {

			// Luetaan pelaajan nimi ja joukkue
			var pelaajanNimi = $(this).text();	

			// Lisätään pelaajien määrää yhdellä
			pelinPelaajia++;

			// Lisätään paikallaolo peliin nolla
			pelaajaOliot[pelaajanNimi].setSahlyPeliTulos(pvm, 0, "paikalla");

		}); // END each pelaaja
	});// END each pelaajat

	// Sählyssä oli pelejä nolla eli ei pelattu
	sahlyOliot[pvm].setPelattiinko(false);	
}


// 2016:
// Jokkueelle voiton, tappion tai tasapelin
function lisaaJoukkueTilasto(tilasto, joukkue, tulos, pvm){

	// Jos joukkuella ei ole aikaisempia merkintöjä, alustetaan merkinnät
	if( !(joukkue in tilasto) ){
		tilasto[joukkue] = [0,0,0];	// Nolla voittoa, tasapeliä, tappiota
	}

	// Lisätään: voitto
	if(tulos === "voitto"){
		tilasto[joukkue][0] = tilasto[joukkue][0] + 1;

	} else if(tulos === "tasapeli"){	// Lisätään: tasapeli
		tilasto[joukkue][1] = tilasto[joukkue][1] + 1;

	} else if(tulos === "tappio"){ // Lisätään: tappio
		tilasto[joukkue][2] = tilasto[joukkue][2] + 1;

	} else{
		alert("Virhe! Päiväyksellä " + pvm + " oli peli, jolla ei ollut voittajaa, häviäjää eikä tasapelin pelannutta.")
	}

	return tilasto;
}

// 2016:
// Palauttaa peli-olion yhdestä pelistä, josta on tarkat tiedot
function getTarkatTiedotPelista(elem, pelattiinko, pvm, peliInd){

	// Luodaan olio pelistä, joka lopulta palautetaan
	var peliOlio = new Peli($(elem).attr("nro"));

	// Jos on tarkat tiedot, mutta ei pelattu, ei ole muita tietoja kuin pelaajien nimet ja ehkä 'muuta'-tietoja
	if(!pelattiinko){

		// Jos ei pelattu, tämän pitäisi olla tyhjä
		if($(elem).attr("nro") !== ""){			
			var virheteksti = 'Virhe XML-tiedostossa: Pelipäivänä ' + pvm + ' on merkattu, että ei pelattu (pelattiinko="ei"), ';
			virheteksti = virheteksti + 'mutta silti silloin on merkattu peli, jolla on numero: ' +  $(elem).attr("nro") ;
			virheteksti = virheteksti + '. Poista se numero, mutta jätä ne lainausmerkit eli: nro=""';
			alert(virheteksti);
		}		
		lisaaTarkatTiedotPelaamattomastaPelista(elem, pvm);
	}

	// Joukkueet
	var j1 = $(elem).attr("joukkue1");
	var j2 = $(elem).attr("joukkue2");

	// Molempien joukkueiden nimet
	var kaikkiJoukkueet = [];
	kaikkiJoukkueet.push(j1);
	kaikkiJoukkueet.push(j2);

	var voittajaJoukkue = $(elem).attr("voittaja");
	// Hävinnyt joukkue on se toinen
	var tappioJoukkue = "";			

	// Selvitetään voittaja- ja tappiojoukkueet ja merkitään niille tulokset tilastoihin
	if(j1 !== "" && j2 !== "" && voittajaJoukkue === j1){					// j1 voitti
		tappioJoukkue = j2;

		// Voittaja: 
		joukkueTilasto = lisaaJoukkueTilasto(joukkueTilasto, voittajaJoukkue, "voitto", pvm);
		// Häviäjä:
		joukkueTilasto = lisaaJoukkueTilasto(joukkueTilasto, tappioJoukkue, "tappio", pvm);

		// Merkitään peliin, että ei ollut tasapeli
		peliOlio.setTasapeli(false);


	} else if(j1 !== "" && j2 !== "" && voittajaJoukkue === j2){ 	// j2 voitti
		tappioJoukkue = j1;
		// Voittaja: 
		joukkueTilasto = lisaaJoukkueTilasto(joukkueTilasto, voittajaJoukkue, "voitto", pvm);
		// Häviäjä:
		joukkueTilasto = lisaaJoukkueTilasto(joukkueTilasto, tappioJoukkue, "tappio", pvm);

		// Merkitään peliin, että ei ollut tasapeli
		peliOlio.setTasapeli(false);

	} else if(j1 !== "" && j2 !== ""){ // tasapeli
		voittajaJoukkue = "";
		tappioJoukkue = "";	
		// Tasapeli
		joukkueTilasto = lisaaJoukkueTilasto(joukkueTilasto, j1, "tasapeli", pvm);
		// Myös tälle tasapeli
		joukkueTilasto = lisaaJoukkueTilasto(joukkueTilasto, j2, "tasapeli", pvm);	

		// Merkitään peliin, että oli tasapeli
		peliOlio.setTasapeli(true);
	}

	// Tämän pelin pelaajamäärä
	var pelinPelaajia = 0;

	
	// Asetetaan joukkueiden nimet
	peliOlio.setJoukkue1(j1);
	peliOlio.setJoukkue2(j2);
	// Asetetaan voittaja- ja tappiojoukkue (jos on tasapeli, asetetaan tyhjä merkkijono)
	peliOlio.setVoittaja(voittajaJoukkue);
	peliOlio.setHaviaja(tappioJoukkue);
	// Lisätään maalien määrät
	peliOlio.setMaalit1($(elem).attr("maalit1"));
	peliOlio.setMaalit2($(elem).attr("maalit2"));
	peliOlio.setMuuta($(elem).attr("muuta"));
	peliOlio.setRatkaisija($(elem).attr("ratkaisija"));
	

	// Pelin numero tilastoissa:
	var pelinNro = $(elem).attr("nro");

	// Sanakirja, jossa avain on pelaajan nimi ja arvo on joukkueen nimi
	var pelaajaJaJoukkue = {};

	// Käydään läpi pelaajat
	$(elem).children('pelaajat').each(function() {	

		$(this).children('pelaaja').each(function() {

			// Luetaan pelaajan nimi ja joukkue
			var pelaajanNimi = $(this).text();	
			var pelaajanJoukkue = $(this).attr("joukkue");

			// Lisätään sanakirjaan
			pelaajaJaJoukkue[pelaajanNimi] = pelaajanJoukkue;

			// Lisätään pelaajan nimi joukkueeseen
			peliOlio.addPelaaja(peliOlio.getJoukkueenNumero(pelaajanJoukkue), pelaajanNimi);

			// Lisätään pelaajien määrää yhdellä
			pelinPelaajia++;

			// Pelaaja-oliolla on sahlyPeliTulos = {}, jonka avaimena on päiväys
			// Kullakin päiväyksellä on taulukko, jonka alkiona on yhden pelin tiedot
			// Alkio nolla eli 'peli 0' sisältää tiedon 'paikalla' tai 'poissa':
			// sahlyPeliTulos[pvm][0] = "0;paikalla|poissa"
			// sahlyPeliTulos[pvm][pelinumero] = "pelinumero;paikalla|poissa;voitto|tappio|tasan;joukkue"

			// Lisätään varmuuden vuoksi jokaisen pelin kohdalla, koska voi olla missanut jonkun pelin
			// Jos pelaajan nimeä ei ole pelaajaluettelossa
			if( !(pelaajanNimi in pelaajaOliot) ){
				alert("Pelaaja puuttuu xml-tiedostosta pelaajat-tägin kohdalta: " + pelaajanNimi + ". Lisää tiedot xml-tiedostoon.");
			}
			pelaajaOliot[pelaajanNimi].setSahlyPeliTulos(pvm, 0, "paikalla");

			// Lisätään tiedot pelistä, jos voitti
			if(pelaajanJoukkue === voittajaJoukkue){
				//SetSahlyPeliTulos(pvm, nro, paikallaolo, tulos, joukkue)
				pelaajaOliot[pelaajanNimi].setSahlyPeliTulos(pvm, pelinNro, "paikalla", "voitto", pelaajanJoukkue);			

			} else if(pelaajanJoukkue === tappioJoukkue){	// hävisi
				pelaajaOliot[pelaajanNimi].setSahlyPeliTulos(pvm, pelinNro, "paikalla", "tappio", pelaajanJoukkue);			

			} else {	// tasapeli
				pelaajaOliot[pelaajanNimi].setSahlyPeliTulos(pvm, pelinNro, "paikalla", "tasapeli", pelaajanJoukkue);	
			}
		}); // END each pelaaja

	});// END each pelaajat

	// Nyt tiedetään tässä pelissä molemmissa joukkueissa pelanneiden pelaajien nimet ja voittajajoukkue

	// Lisätään pelaajien määrä tälle sählykerralle, jos on enemmän kuin aikaisemmin on merkitty (esim. peli1=8 ja peli2=9)
	if(sahlyOliot[pvm].getPelaajia() < pelinPelaajia){
		sahlyOliot[pvm].setPelaajia(pelinPelaajia);
	}

	// Jos peli pelattiin, lisätään löydetyt pelaajat listaan
	if($(elem).attr("nro") != ""){

		// Lisää pelaajille joukkuekaveri ja vastustajat sekä menestymisen heidän kanssaan/vastaan (taulukot.js)
		pelaajaOliot = lisaaPelaajanToveritJaVastustajat(pelaajaOliot, pelaajaJaJoukkue, voittajaJoukkue, j1, j2, $(elem).attr("nro"), pvm);	
	
		// Lisää pelaajille merkinnän, että on osallistunut peliin
		pelaajaOliot = lisaaPeliosallistuminen(pelaajaOliot, pelaajaJaJoukkue);	
	}

	return peliOlio;
}

// Tätä kutsutaan, kun valitaan valintaselektorista haluttu pelikausi
function vaihdaKausi(){

	$('#pieninPaivaInput').val(pelikaudetOliot[$('#kausiValinta').val()].getAloitusPvm());
	$('#suurinPaivaInput').val(pelikaudetOliot[$('#kausiValinta').val()].getLopetusPvm());

}

function getRatkaisijat(){

	// Avain: Pelaajan nimi, Arvo: taulukko[monestiko oli ratkaisujoukkueessa, ratkaisuja]
	var palautus = {};

	// Käydään läpi sählykerrat
	for(var pvm in sahlyOliot){

		// Ratkaisijat voi olla vain tarkkojen tietojen peleistä
		if(sahlyOliot[pvm].getTietojenTyyppi() === "tarkat"){

			// Käydään läpi pelit
			var pelit = sahlyOliot[pvm].getPelit();

			for(var i=0; i<pelit.length; i++){

				var peli = pelit[i];
				var rat = peli.getRatkaisija();

				// Jos on ratkaisija
				if(typeof rat !== 'undefined'){
					
					var voittajat = peli.getVoittajajoukkueenPelaajat();
					
					// Lisätään voittajajoukkueen pelaajille 1 osallistuminen lisää
					for(var j=0; j<voittajat.length; j++){
						
						// Jos tämä voittajajoukkueessa ollut on jo palautuksissa
						if(voittajat[j] in palautus ){
							// Lisätään yksi osallistuminen lisää
							var data = palautus[voittajat[j]];								
							palautus[voittajat[j]] = [data[0]+1, data[1]];

						}	else {

							// Ei ole aikaisempaa tietoa, joten lisätään nyt
							palautus[voittajat[j]] = Array();
							palautus[voittajat[j]] = [1,0];
//								alert("Lisättiin " + voittajat[j]);
						}			
					} //END for(voittajat)

					// Lisätään ratkaisija
					var ratkaisija = palautus[rat];
//	alert("lisätään: " + rat);
					palautus[rat] = [ ratkaisija[0], ratkaisija[1]+1 ];
				}//END if(typeof rat !== 'undefined')
			}
		}

	}

	// Tulostetaan
	//alert(JSON.stringify(palautus));
	return palautus;
}
