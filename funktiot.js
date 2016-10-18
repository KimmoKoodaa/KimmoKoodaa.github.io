/*
	Sekalaisia funktioita
*/

//2016:
// Lisää yhden pelaajan tiedot dialogi-ikkunaan
function pelaajaDialogille(valittuNimi, pvm1, pvm2){		

	// Pelaajan kanssa samassa joukkueissa olleet pelaajat ja yhteisten pelien määrä
	var toverit = pelaajaOliot[valittuNimi].getJoukkuetoverit();

	var pelaajanTiedot = '<H2>' + valittuNimi + '</H2>';

	pelaajanTiedot += '<p><b>Tiedot aikavälillä:</b> ' + pvm1 + ' - ' + pvm2 + '<br>';
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
 		$("#dialogiPelaajasta").append(pelaajanTiedot)
	); 

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
				at: 'top',
				of: $('#sahlytId')
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


