/*
	Sekalaisia funktioita
*/



/**********************/


function juttu1(){

	var intervalli = 2000;
	var intervalli2 = 3000;
	var slideaika = 500;

	$("#looppi1").delay(1000).slideDown(slideaika, function(){siirra("#looppi1")});
	$("#looppi2").delay(intervalli).slideDown(slideaika, function(){siirra("#looppi2")});
	$("#looppi3").delay(2*intervalli).slideDown(slideaika, function(){siirra("#looppi3")});
	$("#looppi4").delay(3*intervalli).slideDown(slideaika, function(){siirra("#looppi4")});
	$("#looppi5").delay(4*intervalli).slideDown(slideaika, function(){siirra("#looppi5")});
	$("#looppi6").delay(5*intervalli).slideDown(slideaika, function(){siirra("#looppi6")});
	$("#finaaliteksti").delay(6*intervalli).slideDown(1000, function(){siirra("#kokosivu")});

}

function siirra(id){
		
		$('html, body').animate({
			scrollTop: $(id).offset().top
    }, 200);
    return false;
}


function finaalimainos1(){

	$("#teaserteksti2").delay(1000).slideDown(1000);
	$("#teaserteksti3").delay(2500).slideDown(1000);
	$("#teaserteksti4").delay(4000).slideDown(1000);
	$("#teaseralue").delay(6000).slideUp();

	$("#kaboom").delay(6500).slideDown(10);
	$("#kaboom").delay(1000).slideUp();

	$("#finaaliteksti").delay(8000).slideDown(1000);
}




// Lisää pelaajan perustietoja välilehdelle
function lisaaValitunPerustiedotTabille(nimi){

	//var perustiedot = '<p><b>Tiedot aikavälillä:</b> ' + pvm1 + ' - ' + pvm2 + '<br>';
	var perustiedot = '<p><b>Kutsumanimi:</b> ' + pelaajaOliot[nimi].getKutsumanimi() + '<br>';
	perustiedot += '<b>Tilastonimi:</b> ' + pelaajaOliot[nimi].getTilastonimi() + '<br>';
	perustiedot += '<b>Kuvaus:</b> ' + pelaajaOliot[nimi].getKuvaus() + '<br>';

	perustiedot += '<br><b>Tapsa-cup meriitit:</b> ' + pelaajaOliot[nimi].getCupMenestysString() + '</p>';

	perustiedot += '<p><b>Tarkat tiedot sählykerroista:</b> ' + pelaajaOliot[nimi].getSahlykerrat() + '<br/>';
	perustiedot += '<b>Tarkat tiedot peleistä:</b> ' + pelaajaOliot[nimi].getPeleihinOsallistunut() + '</p>'; 

	$("#valittuPerustiedotId").html(perustiedot);

}


//2016:
// Lisää yhden pelaajan tiedot dialogi-ikkunaan
function pelaajaDialogille(valittuNimi, pvm1, pvm2){		

	// Pelaajan kanssa samassa joukkueissa olleet pelaajat ja yhteisten pelien määrä
	var toverit = pelaajaOliot[valittuNimi].getJoukkuetoverit();

	var pelaajanTiedot = '<H2>' + valittuNimi + '</H2>';

	//pelaajanTiedot += '<p><b>Tiedot aikavälillä:</b> ' + pvm1 + ' - ' + pvm2 + '<br>';
	pelaajanTiedot += '<p><b>Kutsumanimi:</b> ' + pelaajaOliot[valittuNimi].getKutsumanimi() + '<br>';
	pelaajanTiedot += '<b>Tilastonimi:</b> ' + pelaajaOliot[valittuNimi].getTilastonimi() + '<br>';
	pelaajanTiedot += '<b>Kuvaus:</b> ' + pelaajaOliot[valittuNimi].getKuvaus() + '<br>';

	pelaajanTiedot += '<br><b>Tapsa-cup meriitit:</b> ' + pelaajaOliot[valittuNimi].getCupMenestysString() + '</p>';

	pelaajanTiedot += '<p><b>Tarkat tiedot sählykerroista:</b> ' + pelaajaOliot[valittuNimi].getSahlykerrat() + '<br/>';
	pelaajanTiedot += '<b>Tarkat tiedot peleistä:</b> ' + pelaajaOliot[valittuNimi].getPeleihinOsallistunut() + '</p>'; 
	
	// Taulukko, jossa eri pelaajien kannsa ja vastaan pelattujen pelien määrä (pelaaja.js)
	pelaajanTiedot += '<p>' + pelaajaOliot[valittuNimi].getJoukkuetoveritTaulukko("dialogiToveritJaKaveritTaulukko") + '</p>';

	// Palauttaa taulukon, jossa on kaikkien pelaajien menestyminen muiden kanssa pelattaessa
	var paritilasto = palautaParitilasto(sahlyOliot, valittuNimi);
	pelaajanTiedot += "<p><br></p><h3>Pelaajan " + valittuNimi + " menestyminen muiden kanssa</h3>";
	pelaajanTiedot += "<p>Alla olevasta taulukosta selviää, kuinka " + valittuNimi + " on pärjännyt pelatessaan samassa joukkueessa kuin taulukon henkilö.</p>";	
	pelaajanTiedot += "<p>Suorituskyky-sarake kertoo kuinka monta prosenttiyksikköä parempi(+) tai huonompi(-) on näiden kahden pelaajan voittoprosentti heidän pelatessa samassa joukkueessa kuin näiden kahden pelaajan voittoprosenttien keskiarvo on. Eli otetaan valitun pelaajan (" + valittuNimi + ") ja taulukon pelaajan voittoprosentti ja lasketaan niiden keskiarvo. Saatu keskiarvo vähennetään voittoprosentista, kun pelaajat ovat samassa joukkueessa (yksi taulukon rivi). Positiivinen Suorituskyky tarkoittaa, että nämä kaksi pelaavat keskimääräistä tasoaan paremmin pelatessaan samassa joukkueessa. Negatiivinen taas tarkoittaa, että he pelaavat huonommin.</p>";

	pelaajanTiedot += "<p>Kun pelejä on vähän, Suorituskyky-sarakkeen tarjoama tieto on epätarkka. Siksi kannattaa järjestää taulukko pelien määrän mukaan (Yhteensä-sarake) ja keskittyä niihin, joiden kanssa on pelannut paljon.</p>";

	// Lisää taulukon vain annetun pelaajan menestyminen muiden kanssa, tiedosto taulukot.js
	pelaajanTiedot += lisaaParitilasto(paritilasto, "pelaajaDialogiYhdessaTable", valittuNimi, "Pelaaja joukkuetoverina");

	pelaajanTiedot += "<p><br></p><h3>Pelaajan " + valittuNimi + " menestyminen vastakkaisessa joukkueessa</h3>";
	pelaajanTiedot += "<p>Alla olevasta taulukosta selviää, kuinka " + valittuNimi + " on pärjännyt pelatessaan eri joukkueessa kuin taulukon henkilö.</p>";

	// Palauttaa taulukon, jossa pelaajan menestyminen muita vastaan pelattaessa
	var paritVastustajana = palautaParitilastoVastustajaAnnetulle(sahlyOliot, valittuNimi);
	// Lisää taulukon
	pelaajanTiedot += lisaaParitilasto(paritVastustajana, "pelaajaDialogiVastakkainTable", valittuNimi, "Pelaaja vastustajana");
	
	// Taulukko, jossa sählykerrat ja pelien tietdot. Toimiiko?
	//pelaajanTiedot += '<p>' + pelaajaOliot[valittuNimi].getOsallistumisetTaulukkona() + '</p>';
	
	// Dialogi valitusta pelaajasta
	$( "#dialogiPelaajasta" ).dialog({
			//dialogClass: 'noTitleStuff' ,
			modal: true,
			title: "Yhden pelaajan tiedot (sulje ikkuna klikkaamalla laatikkoa ->)",
			width: "50%",
			maxWidth: "700px",
			height: "600",

			position: { // Määrittelee mihin kohtaan ikkuna sijoitetaan
				at: 'top',
				of: $('#kaikkiPelaajatId') // Pelaajien taulukon päälle
			},

			beforeClose: function (event, ui) { // Poistetaan pelaajan tiedot ikkunasta, kun se suljetaan
				$("div#dialogiPelaajasta").empty();
			},
 		},
		// Lisää tiedot
 		$("#dialogiPelaajasta").append(pelaajanTiedot)
	); 

//	$(".ui-dialog-titlebar").hide();

	// Taulukko, jossa on pelikaverit ja vastustajat ja niiden määrät
	$("#toveritJaKaveritTaulukko").tablesorter({ 
		sortList: [[0,0]],	// sortataan nimen mukaan
		widgets: ['zebra']	// Joka toinen rivi on hieman tummemmalla pohjalla
	}); 

	// Taulukko, jossa on pelaajan kanssa pelattujen pelien tulokset
	$("#pelaajaDialogiYhdessaTable").tablesorter({ 
		sortList: [[4,1]],
		widgets: ['zebra']
	}); 

	// Taulukko, jossa on pelaajaa vastaan pelattujen pelien tulokset
	$("#pelaajaDialogiVastakkainTable").tablesorter({ 
		sortList: [[4,1]],
		widgets: ['zebra']
	}); 

	// Taulukko, jossa eri pelaajien kanssa ja vastaan pelattujen pelien määrä
	$("#dialogiToveritJaKaveritTaulukko").tablesorter({ 
		sortList: [[0,0]]  ,
		widgets: ['zebra'] 
	});

} //END pelaajaDialogille()

//2017:
// Lisää yhden pelaajan tiedot välilehdelle
function pelaajaTabille(valittuNimi, pvm1, pvm2){		

	// Pelaajan kanssa samassa joukkueissa olleet pelaajat ja yhteisten pelien määrä
	var toverit = pelaajaOliot[valittuNimi].getJoukkuetoverit();

//	var pelaajanTiedot = '<H2>' + valittuNimi + '</H2>';

	 
	
	// Taulukko, jossa eri pelaajien kannsa ja vastaan pelattujen pelien määrä (pelaaja.js)
//	pelaajanTiedot += '<p>' + pelaajaOliot[valittuNimi].getJoukkuetoveritTaulukko("dialogiToveritJaKaveritTaulukko") + '</p>';

	// Palauttaa taulukon, jossa on kaikkien pelaajien menestyminen muiden kanssa pelattaessa
	var paritilasto = palautaParitilasto(sahlyOliot, valittuNimi);
	var pelaajanTiedot = "<p><br></p><h3>Pelaajan " + valittuNimi + " menestyminen muiden kanssa</h3>";
	pelaajanTiedot += "<p>Alla olevasta taulukosta selviää, kuinka " + valittuNimi + " on pärjännyt pelatessaan samassa joukkueessa kuin taulukon henkilö.</p>";	
	pelaajanTiedot += "<p>Suorituskyky-sarake kertoo kuinka monta prosenttiyksikköä parempi(+) tai huonompi(-) on näiden kahden pelaajan voittoprosentti heidän pelatessa samassa joukkueessa kuin näiden kahden pelaajan voittoprosenttien keskiarvo on. Eli otetaan valitun pelaajan (" + valittuNimi + ") ja taulukon pelaajan voittoprosentti ja lasketaan niiden keskiarvo. Saatu keskiarvo vähennetään voittoprosentista, kun pelaajat ovat samassa joukkueessa (yksi taulukon rivi). Positiivinen Suorituskyky tarkoittaa, että nämä kaksi pelaavat keskimääräistä tasoaan paremmin pelatessaan samassa joukkueessa. Negatiivinen taas tarkoittaa, että he pelaavat huonommin.</p>";

	pelaajanTiedot += "<p>Kun pelejä on vähän, Suorituskyky-sarakkeen tarjoama tieto on epätarkka. Siksi kannattaa järjestää taulukko pelien määrän mukaan (Yhteensä-sarake) ja keskittyä niihin, joiden kanssa on pelannut paljon.</p>";

	// Lisää taulukon vain annetun pelaajan menestyminen muiden kanssa, tiedosto taulukot.js
	pelaajanTiedot += lisaaParitilasto(paritilasto, "pelaajaDialogiYhdessaTable", valittuNimi, "Pelaaja joukkuetoverina");

	pelaajanTiedot += "<p><br></p><h3>Pelaajan " + valittuNimi + " menestyminen vastakkaisessa joukkueessa</h3>";
	pelaajanTiedot += "<p>Alla olevasta taulukosta selviää, kuinka " + valittuNimi + " on pärjännyt pelatessaan eri joukkueessa kuin taulukon henkilö.</p>";

	// Palauttaa taulukon, jossa pelaajan menestyminen muita vastaan pelattaessa
	var paritVastustajana = palautaParitilastoVastustajaAnnetulle(sahlyOliot, valittuNimi);
	// Lisää taulukon
	pelaajanTiedot += lisaaParitilasto(paritVastustajana, "pelaajaDialogiVastakkainTable", valittuNimi, "Pelaaja vastustajana");
	
	// Taulukko, jossa sählykerrat ja pelien tietdot. Toimiiko?
	//pelaajanTiedot += '<p>' + pelaajaOliot[valittuNimi].getOsallistumisetTaulukkona() + '</p>';
	
	// Dialogi valitusta pelaajasta
/*	$( "#dialogiPelaajasta" ).dialog({
			modal: true,
			title: "Yhden pelaajan tiedot (sulje ikkuna klikkaamalla laatikkoa ->)",
			width: "50%",
			maxWidth: "700px",
			height: "600",

			position: { // Määrittelee mihin kohtaan ikkuna sijoitetaan
				at: 'top',
				of: $('#pelaajatId') // Pelaajien taulukon päälle
			},

			beforeClose: function (event, ui) { // Poistetaan pelaajan tiedot ikkunasta, kun se suljetaan
				$("div#dialogiPelaajasta").empty();
			},
 		},

		// Lisää tiedot
 		$("#valitunPelaajanTiedotId").append(pelaajanTiedot)
	); 
*/

	// Lisää tiedot
		$("#valitunPelaajanTiedotId").append(pelaajanTiedot);

	// Taulukko, jossa on pelikaverit ja vastustajat ja niiden määrät
	$("#toveritJaKaveritTaulukko").tablesorter({ 
		sortList: [[0,0]],	// sortataan nimen mukaan
		widgets: ['zebra']	// Joka toinen rivi on hieman tummemmalla pohjalla
	}); 

	// Taulukko, jossa on pelaajan kanssa pelattujen pelien tulokset
	$("#pelaajaDialogiYhdessaTable").tablesorter({ 
		sortList: [[4,1]],
		widgets: ['zebra']
	}); 

	// Taulukko, jossa on pelaajaa vastaan pelattujen pelien tulokset
	$("#pelaajaDialogiVastakkainTable").tablesorter({ 
		sortList: [[4,1]],
		widgets: ['zebra']
	}); 

	// Taulukko, jossa eri pelaajien kanssa ja vastaan pelattujen pelien määrä
	$("#dialogiToveritJaKaveritTaulukko").tablesorter({ 
		sortList: [[0,0]]  ,
		widgets: ['zebra'] 
	});

} //END pelaajaTabille()


// Lisää yhden sählykerran tiedot dialogille (pelit, joukkueet, maalit, pelaajien nimet, jne.)
function sahlyDialogille(pvm){

	// Dialogille laitettavat tiedot
	var dialogitiedot = "";

	var sahly = sahlyOliot[pvm];

	var pelit = sahly.getPelit();

	// Luodaan jokaiselle pelille pelitaulukko ja lisätään se
	for(var p=0; p < pelit.length; p++){
		// Palauttaa otsikkotekstin ja HTML-taulukon yhden pelin tiedoista (joukkueiden nimet, maalit, voittajan ja joukueiden pelaajat)
		var pelitaulukko = luoJoukkueTaulukko('pelaajatPeli' + (p+1), pelit[p], p+1);
		dialogitiedot += "<p></p>" + pelitaulukko;		
	}

	// Sekalaista kommentointia sählykerrasta
	var sanottua = "";

	// Jos on tarkat tiedot sählystä
	if(sahlyOliot[pvm].getTietojenTyyppi() === "tarkat"){
		if(sahlyOliot[pvm].getMuuta() != ""){
			sanottua = "<p><b>Muuta:</b> " + sahlyOliot[pvm].getMuuta() + "</p>";
		}
	}	else{	// Jos on perustiedot sählystä
		if(sahlyOliot[pvm].getPerustiedot().getMuuta() != ""){
			sanottua = "<p><b>Muuta:</b> " + sahlyOliot[pvm].getPerustiedot().getMuuta() + "</p>";
		}
	}

	// Luodaan dialogi-ikkuna
  $( "#dialogiSahlysta" ).dialog({
      modal: true,
      title: "Pelitulokset ja joukkueet (sulje ikkuna ->)",
			width: "35%",
			maxWidth: "600px",
			height: "700",

			position: { 
				my: 'top',
				at: 'center',
				//of: $('#sahlytYleinenId')
			},

			beforeClose: function (event, ui) {
				$("div#dialogiSahlysta").empty();
			},
 		},

		$("#dialogiSahlysta").append("Yhden päivän sählytiedot " + pvm),
		$("#dialogiSahlysta").append(dialogitiedot),
		$("#dialogiSahlysta").append(sanottua)	
	);

}


// Palauttaa paritilaston, jossa on millä tahansa sählykerralla samassa joukkueessa pelanneiden menestyminen.
// HUOM! haluttuPelaaja on tarpeeton
function palautaParitilasto(sahlyOliot, haluttuPelaaja){

	// Kahden pelaajan tilasto, jossa avain: "pelaaja1;pelaaja2" arvo:"voitot,tappiot,tasurit"
	// Huom. pelaaja1 on se, joka on aikasemmin aakkosissa
	var paritilasto = {};

	// Käydään läpi sählyt
	for(var sahlyKerta in sahlyOliot){

		// Jos ei pelattu, siirrytään seuraavaan
		if(!sahlyOliot[sahlyKerta].getPelattiinko()){
			continue;
		}
	
		var sahlynPelit = sahlyOliot[sahlyKerta].getPelit();

		// Käydään yhden sählykerran pelit läpi
		for(var yksiPeli in sahlynPelit){
	
			// Otetaan joukkueiden pelaajat
			var pelaajatJ1 = sahlynPelit[yksiPeli].palautaPelaajatJoukkue1();
			var pelaajatJ2 = sahlynPelit[yksiPeli].palautaPelaajatJoukkue2();

			// Lisätään parille voittoja, tappioita ja tasapelejä

			// Joukkue1 voitti
			if(sahlynPelit[yksiPeli].getVoittaja() == sahlynPelit[yksiPeli].getJoukkue1()){

				paritilasto = kayJoukkueLapi(pelaajatJ1, "voitto", paritilasto);
				paritilasto = kayJoukkueLapi(pelaajatJ2, "tappio", paritilasto);

			// Joukkue2 voitti
			} else if(sahlynPelit[yksiPeli].getHaviaja() == sahlynPelit[yksiPeli].getJoukkue1()){

				paritilasto = kayJoukkueLapi(pelaajatJ1, "tappio", paritilasto);
				paritilasto = kayJoukkueLapi(pelaajatJ2, "voitto", paritilasto);

			} else {				
				paritilasto = kayJoukkueLapi(pelaajatJ1, "ratkaisematon", paritilasto);
				paritilasto = kayJoukkueLapi(pelaajatJ2, "ratkaisematon", paritilasto);
			}

		} // END peli

	} // END sähly

	return paritilasto;
}


// Palauttaa paritilaston, jossa on annetun pelaajan menestyminen muita vastaan kaikilla sählykerroilla
function palautaParitilastoVastustajaAnnetulle(sahlyOliot, haluttuPelaaja){

	// Kahden pelaajan tilasto, jossa avain: "pelaaja1" arvo:"pelaaja2(vastustajan joukkueesta),voitot(pelaaja1),tappiot(pelaaja1),tasurit(pelaaja1)"
	// Pelaaja1 on se, joka on ennemmin aakkosissa
	paritilastoVastustaja = {};

	// Käydään läpi sählyt
	for(sahlyKerta in sahlyOliot){
	
		//alert(sahlyOliot[sahlyKerta].getPvm());
		var sahlynPelit = sahlyOliot[sahlyKerta].getPelit();

		// Käydään yhden sählykerran pelit läpi
		for(yksiPeli in sahlynPelit){
	
			// Otetaan joukkueiden pelaajat
			var pelaajatJ1 = sahlynPelit[yksiPeli].palautaPelaajatJoukkue1();
			var pelaajatJ2 = sahlynPelit[yksiPeli].palautaPelaajatJoukkue2();

			// Joukkue1 voitti
			if(sahlynPelit[yksiPeli].getVoittaja() == sahlynPelit[yksiPeli].getJoukkue1()){

				var haluttuJoukkue = pelaajatJ1.split(",");
				// Käydään joukkueen 1 pelaajat läpi ja lisätään j2:n pelaajien tiedot
				for(var f=0; f < haluttuJoukkue.length; f++){					
					paritilastoVastustaja = kayJoukkueLapiVastustaja(pelaajatJ2, "voitto", paritilastoVastustaja, haluttuJoukkue[f].trim());					
				}

				var haluttuJoukkue = pelaajatJ2.split(",");
				// Käydään joukkueen 2 pelaajat läpi ja lisätään j1:n pelaajien tiedot
				for(var f=0; f < haluttuJoukkue.length; f++){
					paritilastoVastustaja = kayJoukkueLapiVastustaja(pelaajatJ1, "tappio", paritilastoVastustaja, haluttuJoukkue[f].trim());
				}

			// Joukkue2 voitti
			} else if(sahlynPelit[yksiPeli].getHaviaja() == sahlynPelit[yksiPeli].getJoukkue1()){

				var haluttuJoukkue = pelaajatJ1.split(",");
				// Käydään joukkueen 1 pelaajat läpi ja lisätään j2:n pelaajien tiedot
				for(var f=0; f < haluttuJoukkue.length; f++){					
					paritilastoVastustaja = kayJoukkueLapiVastustaja(pelaajatJ2, "tappio", paritilastoVastustaja, haluttuJoukkue[f].trim() );
				}

				var haluttuJoukkue = pelaajatJ2.split(",");
				// Käydään joukkueen 2 pelaajat läpi ja lisätään j1:n pelaajien tiedot
				for(var f=0; f < haluttuJoukkue.length; f++){					
					paritilastoVastustaja = kayJoukkueLapiVastustaja(pelaajatJ1, "voitto", paritilastoVastustaja,  haluttuJoukkue[f].trim() );
				}

			} else { // Ratkaisematon peli
				var haluttuJoukkue = pelaajatJ1.split(",");
				// Käydään joukkueen 1 pelaajat läpi ja lisätään j2:n pelaajien tiedot
				for(var f=0; f < haluttuJoukkue.length; f++){					
					paritilastoVastustaja = kayJoukkueLapiVastustaja(pelaajatJ2, "ratkaisematon", paritilastoVastustaja, haluttuJoukkue[f].trim() );
				}

				var haluttuJoukkue = pelaajatJ2.split(",");
				// Käydään joukkueen 2 pelaajat läpi ja lisätään j1:n pelaajien tiedot
				for(var f=0; f < haluttuJoukkue.length; f++){					
					paritilastoVastustaja = kayJoukkueLapiVastustaja(pelaajatJ1, "ratkaisematon", paritilastoVastustaja, haluttuJoukkue[f].trim() );
				}
			}

		} // END peli

	} // END sähly


	// Nyt saadussa taulukossa on kaikki parit kahteen kertaan eli esim: "Kimmo;Visa" ja "Visa;Kimmo".
	// Siispä otetaan niistä vain puolet eli ne, joissa haluttu pelaaja on ensimmäisenä

	// Palautettava taulukko
	palTau = {};
	
	// Käydään läpi paritilastoVastustaja ja otetaan ne, joissa haluttu pelaaja on ollut pelaaja1
	for(var pari in paritilastoVastustaja){

		var nimet = pari.split(";");

		if(nimet[0] == haluttuPelaaja){
			palTau[pari] = paritilastoVastustaja[pari];
		}
	}

	// Palautetaan ne, joissa on parin eka pelaaja haluttu pelaaja
	return palTau;

}

// 2017:
// Palauttaa taulukon, jossa on Tapsa-cup finaalien tiedot
function getFinaalipelitData(){

	// Palautetaan 2D-taulukko
	var palautus = new Array();

	// Avaimena on pelikauden nimi
	var pelikaudet = Object.keys(pelikaudetOliot);

	// Käydään läpi pelikaudet
	for(var j=0; j<pelikaudet.length; j++){

		var kausi = pelikaudet[j];
		// Kauden finaalin pvm
		var pvm = pelikaudetOliot[kausi].getLopetusPvm();

		// Jos finaalipäivän pelistä ei ole mitään tietoja, ei merkitä mitään
		// Esim. jos finaali ei ole haluttujen päivämäärien välissä
		if(!(pvm in sahlyOliot)){
			continue;
			
		// Jos finaalipäivänä ei pelattu, merkitään "ei pelattu"
		} else if(sahlyOliot[pvm].getPelattiinko() == false){

			var rivi = new Array(pelikaudetOliot[kausi].getNimi(), pvm, "", "", "", "ei pelattu");			
			palautus.push(rivi);

		// Jos finaalipäivän pelistä ei ole tarkkoja tietoja, merkitään "ei tietoja"
		} else if(sahlyOliot[ pvm ].getTietojenTyyppi() != 'tarkat'){

			var rivi = new Array(kausi, pvm, "", "", "", "ei tietoja");			
			palautus.push(rivi);
		}

		// Otetaan finaalipäivän viimeinen peli
		var finaali = sahlyOliot[pvm].getPelit()[ sahlyOliot[pvm].getPelit().length-1 ];
		// Lisätään tiedot		
		var rivi = new Array(kausi, pvm, finaali.getJoukkue1(), finaali.getMaalit1() +" - "+ finaali.getMaalit2(), finaali.getJoukkue2(), finaali.getVoittaja());			
		palautus.push(rivi);		
	}

	// Palautetaan taulukko, jossa tiedot
	return palautus;
}

// Palauttaa taulukon, jossa on Tapsa-cup finaalien pelaajien tiedot
function getFinaalipelitPelaajatData(){

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
	





	// Sanakirja sanakirjassa (2D-taulu), jossa finaalitiedot-sanakirjassa avain on pelaajan nimi 
	// ja arvo sanakirja, jossa avain on kauden lyhyt nimi ja arvo tulos: "voitto"|"tappio"
	// esim:  finaalitiedot["Kimmo" : {"Kesä 14": "voitto", "Talvi 14-15": "tappio"}, "Antti" : {"Kesä 14": "tappio", "Talvi 14-15": ""}]
	var finaalitiedot = {};

// Luodaan taulukko pelaajien finaalitiedoista
	var finaalitPelaajatTable = '<table id="finaalitPelaajatTable" class="tablesorter" width="98%">';
	finaalitPelaajatTable += '<thead><tr>';
	// Lisätään sarake pelaajan nimelle
	finaalitPelaajatTable += '<th align="center">Nimi</th>';	
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
}

