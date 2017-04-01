//	Funktioita, joilla haetaan data, joka laitetaan taulukoihin ja kaavioihin


// Hakee sählykerrat-taulukon datan
function getSahlytaulukkoData(){

	// Palautettava taulukko
	var palautus = new Array();
	
	// Lisätään sisältö taulukkoon
	for(var sahlypaiva in sahlyOliot){

		if(typeof sahlypaiva  == "undefined"){
//			alert("tyhjä");
		}
	
		var sahly = sahlyOliot[sahlypaiva];
		var pelaajia = "";
		var pelaajia = sahly.getPelaajia();

		var pelit = sahly.getPelit();

		var peli1 = "";
		if(pelit.length > 0){
			peli1 = getPeliString(pelit[0]);
		}

		var peli2 = "";
		if(pelit.length > 1){
			peli2 = getPeliString(pelit[1]);
		}

		var peli3 = "";
		if(pelit.length > 2){
			peli3 = getPeliString(pelit[2]);
		}
	
		var pelattiinko = "";
		if( sahlyOliot[sahlypaiva].getPelattiinko() )
			pelattiinko = "kyllä";
		else if( !sahlyOliot[sahlypaiva].getPelattiinko() ){
			pelattiinko = "ei"
		}	

		var rivi = new Array(sahlypaiva, pelaajia, pelattiinko,	peli1, peli2, peli3);

		palautus.push(rivi);
	}

	return palautus;
}

// Palauttaa pelaajien lukumäärät ajan funktiona -> 1 pelaajien määrän kaavio
function getPelaajienMaaratData(){

	// 2D-taulukko pelaajien määrästä: [pvm, pelaajia]
	var pelaajaLkm = Array();
	// Pelien määrä on myös 2D-taulukko: [pvm, pelejä]
	var peleja = Array();
	
	// Alustetaan taulukot
/*	var riveja = Object.keys(sahlyOliot).length;
	for(var i=0; i<=riveja; i++){
		pelaajaLkm[i] = Array();
		peleja[i] = Array();
	}
*/
	// Sählykerran numero
//	var i=0;

	// Käydään sählykerrat läpi
	for(var sahlypaiva in sahlyOliot){

		// Sijotetaan päivämäärä
//		pelaajaLkm[i][0] = sahlypaiva;
//		peleja[i][0] = sahlypaiva;

		var pelaajia = null;
		// Pelaajien määrä
		if(sahlyOliot[sahlypaiva].getPelaajia() === ""){
			pelaajia = null;
		} else {
			pelaajia = sahlyOliot[sahlypaiva].getPelaajia();
		}

		var rivi = new Array(sahlypaiva, pelaajia);
		pelaajaLkm.push(rivi);
/*
		//Pelien määrä
		if(sahlyOliot[sahlypaiva].getPelitLkm() === ""){
			peleja[i][1] = null;
		} else {
			peleja[i][1] = sahlyOliot[sahlypaiva].getPelitLkm();
		}	
*/
		// Siirytään seuraavaan sählykertaan		
//		i++;

		
	}
	
	return pelaajaLkm;
}


// Palauttaa pelien lukumäärät ajan funktiona -> 1 pelaajien määrän kaavio
function getPelienMaaratData(){

	// Pelien määrät on 2D-taulukko: [pvm, pelejä]
	var peleja = Array();
	
	// Käydään sählykerrat läpi
	for(var sahlypaiva in sahlyOliot){

		var pelit = null;
		//Pelien määrä
		if(sahlyOliot[sahlypaiva].getPelitLkm() === ""){
			pelit = null;
		} else {
			pelit = sahlyOliot[sahlypaiva].getPelitLkm();
		}	

		var rivi = new Array(sahlypaiva, pelit);
		peleja.push(rivi);
	}
	
	return peleja;
}


function getPelaajienMaaratVuosittainData(vuodet){

//	alert("Haetaan vuosittain data");

// Sanakirja, jossa avain on vuosi 
	var pelaajat = {};


// Sählypäivät ja järjestetään ne
	var paivat = Object.keys(sahlyOliot);
	paivat.sort();

	
	
	// Luodaan sanakirjaan jokaiselle löydetylle vuodelle taulukko, jonka yhteen alkioon tulee yhden viikon pelaajien lkm
	for(var i=0; i<vuodet.length; i++){
		pelaajat[vuodet[i]] = [];
	} 

	// Käydään sählykerrat läpi
	for(var i=0; i<paivat.length; i++){

		// Selvitetään pelivuosi
		var pvm = paivat[i].split("-");
		
		// Pelaajien määrä
		var pelaajia = sahlyOliot[paivat[i]].getPelaajia();
		// Jos pelaajien määrä on "", tallennetaan null, jotta käyrä osaa katketa
		if(pelaajia === ""){
				pelaajia = null;
		}

		// Sijoitetaan pelaajien määrä kyseisen vuoden seuraavaan kohtaan taulukossa
		var aika = parseDate(pvm[1] + "-" + pvm[2]);
		pelaajat[pvm[0]].push([aika, pelaajia]);		
	}

	var tiedot = [];
	// Luodaan sanakirjasta taulukko: [vuosi2012, vuosi2013, vuosi2014, vuosi2015, vuosi2016]
	for(var vuosi in pelaajat){
		tiedot.push(pelaajat[vuosi]);
	}

	return tiedot;
}


// Palauttaa vuodet jolloin on pelattu
function getPelatutVuodet(){


// Sählypäivät ja järjestetään ne
	var paivat = Object.keys(sahlyOliot);
	paivat.sort();

// Selvitetään vuodet, jolloin on pelattu
	var vuodet = [];
	for(var i=0; i<paivat.length; i++){
		var vuosi = paivat[i].split("-");

		// Jos ei ole vielä tätä vuotta, otetaan talteen
		if( $.inArray(vuosi[0], vuodet) < 0){
			vuodet.push(vuosi[0]);
		}
	}

	return vuodet;
}










// Palauttaa 2D-taulukon, jossa sarakkeet: pvm, pelaajien lukumäärä, pelien lukumäärä
function getPelaajienJaPelienMaarat(){

	// Palautettava taulukko
	var palautus = new Array();
	// Taulukon rivi
	var i = 0;

	// Käydään sählykerrat läpi
	for(var sahlypaiva in sahlyOliot){

		var eka = "";
		var toka = "";
		var kolmas = "";
		

		// Sijotetaan päivämäärä
		eka = sahlypaiva;

		// Pelaajien määrä
		if(sahlyOliot[sahlypaiva].getPelaajia() === ""){
			toka = null;
		} else {
			toka = sahlyOliot[sahlypaiva].getPelaajia();
		}

		//Pelien määrä
		if(sahlyOliot[sahlypaiva].getPelitLkm() === ""){
			kolmas = null;
		} else {
			kolmas = sahlyOliot[sahlypaiva].getPelitLkm();
		}	

		var uusi = new Array(eka, toka, kolmas);

		palautus.push(uusi);
		// Siirytään seuraavaan sählykertaan		
		i++;
	}	


	return palautus;
}


// Palauttaa paritilaston kaikille pelaajille, kun pelaajat ovat olleet vastajoukkueissa
function getParitilastoVastustajatKaikkiData(){

	// Sanakirja paritiedoista
	// Avain on pelaajien nimet muodossa: nimi1 + ";" + nimi2
	var data = {};

	// Käydään läpi sählyt
	for(var pvm in sahlyOliot){

		// Jos ei pelattu, siirrytään seuraavaan
		if(!sahlyOliot[pvm].getPelattiinko()){
			continue;
		}

		// Jos on vain perustiedot, siirrytään seuraavaan
		if(sahlyOliot[pvm].getTietojenTyyppi() !== "tarkat"){
			continue;
		}

		// Tämän sählykerran pelit
		var sahlynPelit = sahlyOliot[pvm].getPelit();

		// Käydään yhden sählykerran pelit läpi
		for(var pelinNro in sahlynPelit){
	
			// Nyt käsiteltävä peli
			var peli = sahlynPelit[pelinNro];

			// Otetaan joukkueiden pelaajat
			var pelaajatJ1 = peli.getPelaajatJoukkue1Array();
			var pelaajatJ2 = peli.getPelaajatJoukkue2Array();

			// Jos peli päättyi tasan
			if(peli.onkoTasapeli()){
				
				// Luodaan parit
				// Käydään läpi joukkueen 1 pelaajat
				for(var j1=0; j1<pelaajatJ1.length; j1++){

					// Käydään läpi joukkueen 2 pelaajat
					for(var j2=0; j2<pelaajatJ2.length; j2++){

						var avain = pelaajatJ1[j1] +";"+ pelaajatJ2[j2];
						// Jos tälle parille ei ole vielä yhtään tietoa
						if (!(avain in data)){							
							// Luodaan eka tieto eli yksi tasapeli
							data[avain] = [0, 1, 0];

						} else { // Tälle on jo tietoja
							// Selvitetään tiedot
							var tiedot = data[avain];
							// Lisätään yksi tasapeli							
							var tasurit = parseInt(tiedot[1]) + 1;
							tiedot = [tiedot[0], tasurit, tiedot[2]];
							data[avain] = tiedot;
						}
					}

				} //END for(j1)

			} else if(peli.getJoukkueenNumero(peli.getVoittaja()) === 1){ // Joukkue1 voitti

				// Luodaan parit
				// Käydään läpi joukkueen 1 pelaajat
				for(var j1=0; j1<pelaajatJ1.length; j1++){

					// Käydään läpi joukkueen 2 pelaajat
					for(var j2=0; j2<pelaajatJ2.length; j2++){

						var avain = pelaajatJ1[j1] +";"+ pelaajatJ2[j2];
						// Jos tälle parille ei ole vielä yhtään tietoa
						if (!(avain in data)){							
							// Luodaan eka tieto eli yksi voitto
							data[avain] = [1, 0, 0];

						} else { // Tälle on jo tietoja
							// Selvitetään tiedot
							var tiedot = data[avain];
							// Lisätään yksi voitto
							var voitot = parseInt(tiedot[0]) + 1;
							tiedot = [voitot, tiedot[1], tiedot[2]];
							data[avain] = tiedot;
						}
					}

				} //END for(j1)

			} else if(peli.getJoukkueenNumero(peli.getVoittaja()) === 2){ // Joukkue2 voitti

				// Luodaan parit
				// Käydään läpi joukkueen 1 pelaajat
				for(var j1=0; j1<pelaajatJ1.length; j1++){

					// Käydään läpi joukkueen 2 pelaajat
					for(var j2=0; j2<pelaajatJ2.length; j2++){

						var avain = pelaajatJ1[j1] +";"+ pelaajatJ2[j2];
						// Jos tälle parille ei ole vielä yhtään tietoa
						if (!(avain in data)){							
							// Luodaan eka tieto eli yksi voitto
							data[avain] = [0, 0, 1];

						} else { // Tälle on jo tietoja
							// Selvitetään tiedot
							var tiedot = data[avain];
							// Lisätään yksi voitto
							var voitot = parseInt(tiedot[2]) + 1;
							tiedot = [tiedot[0], tiedot[1], voitot];
							data[avain] = tiedot;
						}
					}

				} //END for(j1)

			}//END if(j2 voitti)

		}//END pelit

	}//END sählyt


	// Muutetaan sanakirja 2d-taulukoksi
	var palautus = new Array();	

	// Käydään läpi sanakirja
	for(var avain in data){

		// Tulokset 
		var tulokset = data[avain];

		// avain on kaksi nimeä eroteltuna puolipisteellä		
		var nimet = avain.split(";");
		var pari = nimet[0] + " - " + nimet[1];
		
		var voitot = parseInt(tulokset[0]);
		var tasurit = parseInt(tulokset[1]);
		var tappiot = parseInt(tulokset[2]);
		var yhteensa = parseInt(voitot+tasurit+tappiot);
		var voittoPros = Math.round( (voitot/yhteensa)*100 ); 				
		
		var uusiRivi = [pari, voitot, tasurit, tappiot, yhteensa,voittoPros];
		palautus.push(uusiRivi);
	}

	return palautus;
}


// Palauttaa paritilaston kaikille pelaajille, kun pelaajat ovat olleet vastajoukkueissa
// Versio 2 hieman eri tekniikalla
function getParitilastoVastustajatKaikkiData2(){

	// Sanakirja paritiedoista
	// Avain on pelaajien nimet muodossa: nimi1 + ";" + nimi2
	var alkuData = new Array();

	// Käydään läpi sählyt
	for(var pvm in sahlyOliot){

		// Jos ei pelattu, siirrytään seuraavaan
		if(!sahlyOliot[pvm].getPelattiinko()){
			continue;
		}

		// Jos on vain perustiedot, siirrytään seuraavaan
		if(sahlyOliot[pvm].getTietojenTyyppi() !== "tarkat"){
			continue;
		}

		// Tämän sählykerran pelit
		var sahlynPelit = sahlyOliot[pvm].getPelit();

		// Käydään yhden sählykerran pelit läpi
		for(var pelinNro in sahlynPelit){
	
			// Nyt käsiteltävä peli
			var peli = sahlynPelit[pelinNro];

			// Otetaan joukkueiden pelaajat
			var pelaajatJ1 = peli.getPelaajatJoukkue1Array();
			var pelaajatJ2 = peli.getPelaajatJoukkue2Array();

			// Jos peli päättyi tasan
			if(peli.onkoTasapeli()){
				
				// Luodaan parit
				// Käydään läpi joukkueen 1 pelaajat
				for(var j1=0; j1<pelaajatJ1.length; j1++){

					// Käydään läpi joukkueen 2 pelaajat
					for(var j2=0; j2<pelaajatJ2.length; j2++){

						var avain = pelaajatJ1[j1] +";"+ pelaajatJ2[j2];

						// Lisätään tieto
						var rivi = [avain,0,1,0];
						alkuData.push(rivi);

						// Myös väärinpäin
						avain = pelaajatJ2[j2] +";"+ pelaajatJ1[j1];
						rivi = [avain,0,1,0];
						alkuData.push(rivi);

					}

				} //END for(j1)

			} else if(peli.getJoukkueenNumero(peli.getVoittaja()) === 1){ // Joukkue1 voitti

				// Luodaan parit
				// Käydään läpi joukkueen 1 pelaajat
				for(var j1=0; j1<pelaajatJ1.length; j1++){

					// Käydään läpi joukkueen 2 pelaajat
					for(var j2=0; j2<pelaajatJ2.length; j2++){

							var avain = pelaajatJ1[j1] +";"+ pelaajatJ2[j2];

							// Lisätään tieto
							var rivi = [avain,1,0,0];
							alkuData.push(rivi);

							// Lisätään tieto
							avain = pelaajatJ2[j2] +";"+ pelaajatJ1[j1];
							var rivi = [avain,0,0,1];
							alkuData.push(rivi);
					}

				} //END for(j1)

			} else if(peli.getJoukkueenNumero(peli.getVoittaja()) === 2){ // Joukkue2 voitti

				// Luodaan parit
				// Käydään läpi joukkueen 1 pelaajat
				for(var j1=0; j1<pelaajatJ1.length; j1++){

					// Käydään läpi joukkueen 2 pelaajat
					for(var j2=0; j2<pelaajatJ2.length; j2++){

						var avain = pelaajatJ1[j1] +";"+ pelaajatJ2[j2];

						// Lisätään tieto
						var rivi = [avain,0,0,1];
						alkuData.push(rivi);

						// Lisätään tieto
						avain = pelaajatJ2[j2] +";"+ pelaajatJ1[j1];
						var rivi = [avain,1,0,0];
						alkuData.push(rivi);

					}

				} //END for(j1)

			}//END if(j2 voitti)

		}//END pelit

	}//END sählyt

	var data = {};

	// Muutetaan alkuData sanakirjaksi
	for(var i=0; i<alkuData.length; i++){

		var nimet = alkuData[i][0];
		var v = alkuData[i][1];
		var tas = alkuData[i][2];
		var tap = alkuData[i][3];

		// Jos paria ei vielä ole, lisätään nyt
		if (!(nimet in data)){							
			// Luodaan eka tieto eli yksi voitto
			data[nimet] = [v, tas, tap];

		} else { // Tälle on jo tietoja
			// Selvitetään tiedot
			var tiedot = data[nimet];
			// Lisätään tiedot
			var voitot = parseInt(tiedot[0]) + parseInt(v);
			var tasurit = parseInt(tiedot[1]) + parseInt(tas);
			var tappiot = parseInt(tiedot[2]) + parseInt(tap);
			tiedot = [voitot, tasurit, tappiot];
			data[nimet] = tiedot;
		}
	}

/*
	// Muutetaan sanakirja 2d-taulukoksi
	var palautus = new Array();	

	// Käydään läpi sanakirja
	for(var avain in data){

		// Tulokset 
		var tulokset = data[avain];

		// avain on kaksi nimeä eroteltuna puolipisteellä		
		var nimet = avain.split(";");
		var pari = nimet[0] + " - " + nimet[1];
		
		var voitot = parseInt(tulokset[0]);
		var tasurit = parseInt(tulokset[1]);
		var tappiot = parseInt(tulokset[2]);
		var yhteensa = parseInt(voitot+tasurit+tappiot);
		var voittoPros = Math.round( (voitot/yhteensa)*100 ); 				
		
		var uusiRivi = [pari, voitot, tasurit, tappiot, yhteensa,voittoPros];
		palautus.push(uusiRivi);
	}
*/
	return data;
}
