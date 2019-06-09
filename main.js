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

var uutinenOliot = {};

var pelikaudetOliot = {};

// Pelaajien oliot: kaikista sählykerroista
var pelaajaOliot = {};

// Pelaajien oliot: vai edellisen sählykerran tiedoista
var pelaajaOliotEdellinen = {};



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

	// Varoittaa jos käyttää IE:tä
	if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )){
		alert("Varoitus! Käytätkö Internet Explorer -selainta? Tämä sivusto ei toimi IE:llä vaan sivun antamat virheilmoitukset saattavat jumittaa selaimesi. Käytä sen sijaan Chrome- tai Firefox-selainta."); 
	}  
		

	// Näyttää lööpit
	//naytaLoopit();
	
	//finaalimainos1();

	haeUutiset();

	// Tyhjentää kaikki tekstikentät
	tyhjennaTekstikentat();

	// Vaihtaa kaavioiden kuukaudet suomenkielelle
	asetaSuomalaisetAjat();

	// Lisää pelikausien tiedot HTML-valintalistaan
	lisaaPelikaudetValintalistaan();

	// Hakee pelaajien tiedot xml-tiedostosta
	haePelaajat();
	
	// Hakee sählytiedot xml-tiedostosta
	haeTiedot();
	
	// Sekalaisia alustuksia, kun sivu avataan
	sekalaistaAlustusta();

});	//END ready()
 

function sekalaistaAlustusta(){

	// Muutetaan kursosi, kun hiiri menee uutisarkisto-taulukon päälle
	$("#uutisotsikotDiv").hover(function() {
		$(this).css('cursor','pointer');
	}, function() {
		$(this).css('cursor','auto');
	});

	// Lisätään "Haetaan kaikki tilastot" teksti
	$("#naytettavatTilastotId").empty().append("kaikki tilastot");
}

// Tyhjentää kaikki tekstikentät
function tyhjennaTekstikentat(){

	// Nollaa hakupäivät
	$('#pieninPaivaInput').val("");
	$('#suurinPaivaInput').val("");

	// Tyhjennetään pelien määrä -kenttä
	$('#naytaPelaajiaInputId').val("");
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

// 2018: Haetaan xml-tiedostosta uutiset
function haeUutiset(){

	$('#uutisotsikotDiv').append('<table id="uutisotsikotTaulukko">');

	$.get("uutiset.xml", {}, function(xml){

		// Käy läpi uutiset
		$('uutiset', xml).each(function() {
						
			$(this).children('uutinen').each(function() {
					
					// Luetaan uutisen tiedot
					var otsikko = $(this).attr('otsikko');
					var pvm = $(this).attr('pvm');
					var sisalto = $(this).find("sisalto").text();

					// Asetetaan uutisen id:ksi otsikko+pvm
					var uutinenId = otsikko+pvm;
//	alert(uutinenId);
					
					// Luodaan olio
					uutinenOliot[uutinenId] = new Uutinen(otsikko, pvm, sisalto);

					// Lisätään valintalistaan
					//$('#finaaliteksti').append(sisalto); 

					var uutisotsikkoLinkki = '<a href="">' + otsikko + '</a><br>';
					var uutisPvmTeksti = '<br><span>' + pvm+ ':</span><br>';
					var uutisotsikkoNappi = '<tr><td id="' + uutinenId + '" style="border:3px solid green; padding:7px; border-radius: 5px;">' + otsikko + '<br><span style="color: #696969">' + pvm+ '</span></td></tr>';
				
		//			$('#uutisotsikotDiv').append(uutisPvmTeksti);
					$('#uutisotsikotDiv').append(uutisotsikkoNappi);
					$('#uutisotsikotDiv').append("<tr><td>&nbsp;</td></tr>");
				
					// Tämä lisätään pääuutiseksi
					if(otsikko === "Huikea finaali 4.6.2019"){
						$('#finaaliteksti').append(sisalto);
					}		
				});
			
		});
	});

	$('#uutisotsikotDiv').append('</table>');
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
						pelaajaOliot[tilastonimi].addKuvaustiedot(etunimi, sukunimi, kutsumanimi, tilastonimi, kuvaus, ominaisuudet, muuta);
					}
				});	// END 'pelaaja'
			});	// END 'pelaajat'
		
			// Tyhjennetään pelaajan nimen valintalista
			$('#pelaajatSelectTag').empty();
			$('#pelaajatSelectTag2').empty();

			// HTML-valintalista, josta valitaan minkä pelaajan tarkat tiedot näytetään
			var pelaajatSelectTag = document.getElementById('pelaajatSelectTag');
			// Valintalista pelaajista: paritilastoissa voittoprosentti, jossa valittu mukana
			var pelaajatSelectTag2 = document.getElementById('pelaajatSelectTag2');		

			// option on HTML select-listan yksi elementti eli yksi nimi
			var option = document.createElement('option');
			var option2 = document.createElement('option');

			// Voittoporsentti pareittain-listaan alustetaan tyhjä, jotta nähdään vain pisteet
			option2.value = "";
			option2.innerHTML = "";
			pelaajatSelectTag2.appendChild(option2);

			// Lisätään nimet ym. valintalistaan
			for(var i=0; i<pelaajaNimet.length; i++){
				
				option = document.createElement('option');
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
		monthNamesShort: ['Tammi','Helmi','Maalis','Huhti','Touko','Kesä','Heinä','Elo','Syys','Loka','Marras','Joulu'],
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
					var maalivahteja = $(this).attr("maalivahteja");
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
					var sahly = new Sahly(pvm, paikka, alkoi, loppui, muuta, pelattiinko, maalivahteja);
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
		$('#naytettavatTilastotId').empty().append(ekaPvm + " kaikki tilastot " + vikaPvm);	
	
	} else if(ekaPvm === ""){ // min päivä puuttuu
		elementti.innerHTML = "Haettu tiedot ennen: " + vikaPvm;	
		$('#naytettavatTilastotId').empty().append(ekaPvm + " tilastot ennen " + vikaPvm);		

	} else if(vikaPvm === ""){ // max päivä puuttuu
		elementti.innerHTML = "Haettu tiedot alkaen: " + ekaPvm;		
		$('#naytettavatTilastotId').empty().append(" kaikki tilastot alkaen " + ekaPvm);		

	} else {
		elementti.innerHTML = "Haettu tiedot aikaväliltä: "+ ekaPvm  + " - " + vikaPvm;	
		$('#naytettavatTilastotId').empty().append(ekaPvm + " <strong> &#8212; </strong> " + vikaPvm);			
	}	

	
} //END haeTiedot()


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
				//alert("Pelaaja puuttuu xml-tiedostosta pelaajat-tägin kohdalta: " + pelaajanNimi + ". Lisää tiedot xml-tiedostoon.");
				alert("Tapahtui joku ohimenevä häiriö. Ei ehtinyt ladata kaikkia tietoja. Päivitäpäs sivu (esim. F5), niin sitten varmaankin toimii.");
			}
			pelaajaOliot[pelaajanNimi].setSahlyPeliTulos(pvm, 0, "paikalla");

	// Lisätään edustus
	pelaajaOliot[pelaajanNimi].lisaaJoukkueEdustus(pelaajanJoukkue);

	// Lisää eka
	pelaajaOliot[pelaajanNimi].setEkaJoukkue(pelaajanJoukkue);


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



// Kun vaihdetaan kausien-listalta pelikausi, tämä asettaa päivämäärien kenttiin kauden alku- ja loppupäivät
// (kutsutaan index.html-tiedostossa)
function vaihdaKausi(){

	$('#pieninPaivaInput').val(pelikaudetOliot[$('#kausiValinta').val()].getAloitusPvm());
	$('#suurinPaivaInput').val(pelikaudetOliot[$('#kausiValinta').val()].getLopetusPvm());
}


