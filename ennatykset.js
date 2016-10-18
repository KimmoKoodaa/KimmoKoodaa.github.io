/*
 Tällä luokalla selvitellään erilaisia ennätyksiä.
*/

function Ennatykset(){

	this.getPisimmatVoittoputket = GetPisimmatVoittoputket;
}


// Palauttaa sanakirjan, jossa on kaikkien pelaajien voittoputket
function GetPisimmatVoittoputket(){

	// Kaikkien pelaajien voittoputket, avain on pelaajan nimi
	var voittoputket = {};
	var tappioputket = {};

	// Kaikkien pelaajien puhtaat putket, avain on pelaajan nimi
	var voittoputketPuhtaat = {};
	var tappioputketPuhtaat = {};
	
	// Käydään pelaajat läpi
	for(var nimi in pelaajaOliot){

		// Kaikkien voittojen putki
		var kaikkiVoitot = 0;
		// Suurin kaikkien voittojen putki
		var maxKaikkiVoitot = 0;

		// Kaikkien tappioiden putki
		var kaikkiTappiot = 0;
		// Suurin kaikkien tappioiden putki
		var maxKaikkiTappiot = 0;

		// Kaikkien puhtaiden voittojen putki
		var kaikkiPuhtaatVoitot = 0;
		// Suurin kaikkien puhtaiden voittojen putki
		var maxKaikkiPuhtaatVoitot = 0;

		// Kaikkien puhtaiden tappioiden putki
		var kaikkiPuhtaatTappiot = 0;
		// Suurin kaikkien puhtaiden tappioiden putki
		var maxKaikkiPuhtaatTappiot = 0;

		// Sanakirja pelaajan sählyistä
		var sahlyt = pelaajaOliot[nimi].getSahlyPeliTulosSanakirja();

		// Käydään läpi sählykerrat yhden pelaajan osalta
		for(var pvm in sahlyt){

			// Tällä sählykerralla oli pelejä
			var sahlykerrallaPeleja = sahlyOliot[pvm].getPelitLkm();

			// Jos sählykerrasta on vain perustiedot ja pelaaja ei ole Kimmo, ei huomioida tätä sählykertaa
			// Samalla katkeaa myös kaikki putket, koska ei tiedetä kuka voitti
			if(sahlyOliot[pvm].getTietojenTyyppi() === "perus" && nimi !== "Kimmo"){
				
				// Jos oli pisin tappioputki, otetaan talteen
				if(kaikkiTappiot > maxKaikkiTappiot){
					maxKaikkiTappiot = kaikkiTappiot;					
				}

				// Jos oli pisin voittoputki, otetaan talteen
				if(kaikkiVoitot > maxKaikkiVoitot){
					maxKaikkiVoitot = kaikkiVoitot;
				}

				// Jos oli pisin puhdas tappioputki, otetaan talteen
				if(kaikkiPuhtaatTappiot > maxKaikkiPuhtaatTappiot){
					maxKaikkiPuhtaatTappiot = kaikkiPuhtaatTappiot;					
				}

				// Jos oli pisin puhdas voittoputki, otetaan talteen
				if(kaikkiPuhtaatVoitot > maxKaikkiPuhtaatVoitot){
					maxKaikkiPuhtaatVoitot = kaikkiPuhtaatVoitot;
				}

				// nollataan putket
				kaikkiTappiot = 0;
				kaikkiVoitot = 0;

				kaikkiPuhtaatTappiot = 0;
				kaikkiPuhtaatVoitot = 0;

				continue;
			}

			// Jos ei pelattu, ei huomioida tätä sählykertaa
			if(!sahlyOliot[pvm].getPelattiinko()){
				continue;
			}
					
			// Puhdas putki säilyy, jos pelaaja voittaa/häviää kaikissa seuraavissa peleissä


			// 'pelit' on taulukko, jossa yhdessä alkiossa on yhden pelin tiedot.
			// Yksi alkio on merkkijono:
			// pelin nro + ";" + paikallaolo + ";" + tulos  + ";" + joukkue;
			var pelit = sahlyt[pvm];

			// Käydään läpi alkiot eli pelit alkaen alkiosta 1 (0 on perustiedot eli ei mikään peli)
			for(var i=1; i<sahlyOliot[pvm].getPelitLkm()+1/*pelit.length*/; i++){

				// Jos peliä ei löydy, oli tämä pelaaja siitä pois
				// Katkaistaan puhtaat putket ja siirytään seuraavaan päivään
				if(typeof pelit[i] === 'undefined'){

					// Nollataan puhtaat putket, koska missattiin peli
					// Jos oli pisin puhdas tappioputki, otetaan talteen
					if(kaikkiPuhtaatTappiot > maxKaikkiPuhtaatTappiot){
						maxKaikkiPuhtaatTappiot = kaikkiPuhtaatTappiot;					
					}

					// Jos oli pisin puhdas voittoputki, otetaan talteen
					if(kaikkiPuhtaatVoitot > maxKaikkiPuhtaatVoitot){
						maxKaikkiPuhtaatVoitot = kaikkiPuhtaatVoitot;
					}

					// nollataan putket
					kaikkiPuhtaatTappiot = 0;
					kaikkiPuhtaatVoitot = 0;

					// Nollattiin puhtaat putket, mutta tavalliset putket vielä säilyvät
					continue;
				}

				var peli = pelit[i].split(";");

				// Jos voitti pelin, lisätään voittoputkeen 
				if(peli[2] === "voitto"){
					kaikkiVoitot++;
					kaikkiPuhtaatVoitot++;

					// Jos oli pisin voittoputki, otetaan talteen
					if(kaikkiVoitot > maxKaikkiVoitot){
						maxKaikkiVoitot = kaikkiVoitot;						
					}

					// Jos oli pisin tappioputki, otetaan talteen
					if(kaikkiTappiot > maxKaikkiTappiot){
						maxKaikkiTappiot = kaikkiTappiot;					
					}


					// Jos oli pisin puhdas tappioputki, otetaan talteen
					if(kaikkiPuhtaatTappiot > maxKaikkiPuhtaatTappiot){
						maxKaikkiPuhtaatTappiot = kaikkiPuhtaatTappiot;					
					}

					// Jos oli pisin puhdas voittoputki, otetaan talteen
					if(kaikkiPuhtaatVoitot > maxKaikkiPuhtaatVoitot){
						maxKaikkiPuhtaatVoitot = kaikkiPuhtaatVoitot;
					}

					// nollataan putki
					kaikkiTappiot = 0;
					kaikkiPuhtaatTappiot = 0;


				} else if(peli[2] === "tappio") { // Tappio, joten lisätään tappioputkea ja katkaistaan voittoputki
					kaikkiTappiot++;
					kaikkiPuhtaatTappiot++;
									
					// Jos oli pisin tappioputki, otetaan talteen
					if(kaikkiTappiot > maxKaikkiTappiot){
						maxKaikkiTappiot = kaikkiTappiot;					
					}

					// Jos oli pisin voittoputki, otetaan talteen
					if(kaikkiVoitot > maxKaikkiVoitot){
						maxKaikkiVoitot = kaikkiVoitot;						
					}

	
					// Jos oli pisin puhdas tappioputki, otetaan talteen
					if(kaikkiPuhtaatTappiot > maxKaikkiPuhtaatTappiot){
						maxKaikkiPuhtaatTappiot = kaikkiPuhtaatTappiot;					
					}

					// Jos oli pisin puhdas voittoputki, otetaan talteen
					if(kaikkiPuhtaatVoitot > maxKaikkiPuhtaatVoitot){
						maxKaikkiPuhtaatVoitot = kaikkiPuhtaatVoitot;
					}

					// nollataan putki
					kaikkiVoitot = 0;
					kaikkiPuhtaatVoitot = 0;					

				} else if(peli[2] === "tasapeli"){ // Jos tuli tasapeli, nollataan molemmat putket
					// Jos oli pisin tappioputki, otetaan talteen
					if(kaikkiTappiot > maxKaikkiTappiot){
						maxKaikkiTappiot = kaikkiTappiot;					
					}

					// Jos oli pisin voittoputki, otetaan talteen
					if(kaikkiVoitot > maxKaikkiVoitot){
						maxKaikkiVoitot = kaikkiVoitot;
					}

					// Jos oli pisin puhdas tappioputki, otetaan talteen
					if(kaikkiPuhtaatTappiot > maxKaikkiPuhtaatTappiot){
						maxKaikkiPuhtaatTappiot = kaikkiPuhtaatTappiot;					
					}

					// Jos oli pisin puhdas voittoputki, otetaan talteen
					if(kaikkiPuhtaatVoitot > maxKaikkiPuhtaatVoitot){
						maxKaikkiPuhtaatVoitot = kaikkiPuhtaatVoitot;
					}

					// nollataan putket
					kaikkiTappiot = 0;
					kaikkiVoitot = 0;

					kaikkiPuhtaatTappiot = 0;
					kaikkiPuhtaatVoitot = 0;
				}

			} // END for(yhden sählyn pelit)
			
		} //END for(sählykerta)

		// Sijoitetaan putket
		voittoputket[nimi] = maxKaikkiVoitot;
		tappioputket[nimi] = maxKaikkiTappiot;

		voittoputketPuhtaat[nimi] = maxKaikkiPuhtaatVoitot;
		tappioputketPuhtaat[nimi] = maxKaikkiPuhtaatTappiot;

	} //END for(pelaajat)

	return [voittoputket, tappioputket, voittoputketPuhtaat, tappioputketPuhtaat];
}
