// Pelaaja-olio, jossa on yhden pelaajan eli ihmisen tiedot
function Pelaaja(nimi) {

	// Tilastossa käytetty uniikki nimi esim. Janne, Janne2, jne.
	this.nimi = nimi;

	// Pelaajan kuvailutiedot
	this.etunimi = "";
	this.sukunimi = "";
	this.kutsumanimi = nimi
	this.tilastonimi = "";
	this.kuvaus = "";
	this.ominaisuudet = "";
	this.muuta = "";

	// Montako peliä on voittanut
	this.voitot = 0;
	// Montako peliä on hävinnyt
	this.tappiot = 0;
	// Montako peliä on päättynyt jotenkin muuten: tasapeli, ratkaisematon
	this.ratkaisemattomat = 0;

	// Moneenko peliin on osallistunut
	this.peleihinOsallistunut = 0;

	// Monellako kerralla on ollut pelaamassa
	this.sahlyja = 0;

	// Päivämäärä: paikalla | poissa | ei tietoa
	this.osallistumisPaivat = {};

	// Päivämäärä ja kaikkien pelien tulokset(taulukossa): pvm:[peli1], [peli2], [peli3], [peli4]
	this.pvmJaPelitulokset = {};

	// Joukkuetoverit ja vastustajat, nimi:montako_kertaa	
	this.joukkuetoverit = {};
	this.vastustajat = {};

	// Kesä 2016:
	this.cupOsallistumiset = 0;
	this.cupVoitot = 0;	

	this.getPelaajanNimi = GetPelaajanNimi;

	// Lisätään voitto, tappio ja ratkaisematon
	this.lisaaVoitto = LisaaVoitto;
	this.lisaaTappio = LisaaTappio;
	this.lisaaRatkaisematon = LisaaRatkaisematon;

	// Liitetään metodi olioon:
	this.lisaaJoukkuekaveri = LisaaJoukkueKaveri;
	this.lisaaVastustaja = LisaaVastustaja;

	// Pelaajien nimet, jotka ovat pelanneet samassa joukkueessa
	this.getJoukkuetoverit = GetJoukkuetoverit;
	this.getVastustajat = GetVastustajat;

	// Palauttaa voitot, tappiot ja ratkaisemattomat
	this.getVoitot = GetVoitot;
	this.getTappiot = GetTappiot;
	this.getRatkaisemattomat = GetRatkaisemattomat;

	this.lisaaPeli = LisaaPeli;
	this.lisaaSahlykerta = LisaaSahlykerta;
	this.getPeleihinOsallistunut = GetPeleihinOsallistunut;
	this.getSahlykerrat = GetSahlykerrat;
	this.lisaaOsallistumispaiva = LisaaOsallistumispaiva;
	this.getOsallistumispaivat = GetOsallistumispaivat;
	this.osallistuminenPaivana = OsallistuminenPaivana;
	this.addPelitulos = AddPelitulos;
	this.getPelitulos = GetPelitulos;	
	this.getJoukkuetoveritTaulukko = GetJoukkuetoveritTaulukko;
	this.getVastustajatTaulukko = GetVastustajatTaulukko;
	this.getOsallistumisetTaulukkona = GetOsallistumisetTaulukkona;
	this.getPelienMaara = GetPelienMaara;
	this.getPelituloksetTaulukkona = GetPelituloksetTaulukkona;
	this.addToveriAikaMenestys = AddToveriAikaMenestys;
	this.getToveriAikaMenestys = GetToveriAikaMenestys;
	this.getToveritAikaMenestysTaulukko = GetToveritAikaMenestysTaulukko;

	// Joukkuetoverit
	// Avain: nimi, arvo: taulukko, jossa yhdessä solussa ["pvm;voitot;tasurit;tappiot"]
	this.toveritAika = {};

	this.getOsallistuminen = GetOsallistuminen;

	// Lisää kaikki kuvaustiedot XML-tiedostosta
	this.addKuvaustiedot = AddKuvaustiedot;
	this.getEtunimi = GetEtunimi;
	this.getKutsumanimi = GetKutsumanimi;
	this.getTilastonimi = GetTilastonimi;
	this.getKuvaus = GetKuvaus;
	this.kaikkiTiedot = KaikkiTiedot;

	// 2016:
	this.sahlyPeliTulos = {};
	this.setSahlyPeliTulos = SetSahlyPeliTulos;
	this.getSahlyPeliTulos = GetSahlyPeliTulos;
	this.getSahlyPeliTulosSanakirja = GetSahlyPeliTulosSanakirja;
	this.getEnsimmainenMerkintapaiva = GetEnsimmainenMerkintapaiva;
	this.getEnsimmainenPelipaiva = GetEnsimmainenPelipaiva;
	this.getEnsimmainenTulospaiva = GetEnsimmainenTulospaiva;
	this.getViimeinenPelipaiva = GetViimeinenPelipaiva;

	// Kesä 16
	this.setCupOsallistumiset = SetCupOsallistumiset;
	this.getCupOsallistumiset = GetCupOsallistumiset;
	this.setCupVoitot = SetCupVoitot;
	this.getCupVoitot = GetCupVoitot;
	this.getCupMenestysString = GetCupMenestysString;
}

// Uusia funktioita vuodelta 2016
// ------------------------------

function SetCupOsallistumiset(luku){
	this.cupOsallistumiset = luku;
}

function GetCupOsallistumiset(){
	return this.cupOsallistumiset;
}

function SetCupVoitot(luku){
	this.cupVoitot = luku;
}

function GetCupVoitot(){
	return this.cupVoitot;
}

// Palauttaa merkkijonona kuinka on menestynyt Tapsa-cupissa
function GetCupMenestysString(){

	var palautus = "";
	
	// Voitot ja osallistumiset
	var v = this.getCupVoitot();
	var o = this.getCupOsallistumiset()

	if(v == 1){
		palautus = "Tapsa-cup voittaja";

	} else if(v==2){
		palautus = "Kaksinkertainen Tapsa-cup voittaja";

	} else if(v==3){
		palautus = "Kolminkertainen Tapsa-cup voittaja";

	} else if(v==4){
		palautus = "Nelinkertainen Tapsa-cup voittaja";

	} else if(v>4){
		palautus = "Moninkertainen Tapsa-cup voittaja";
	}

	if(palautus.length > 0 && o > 1){
		palautus += " ja ";
	}

	if(o == 1 && v==0){
		palautus = "Tapsa-cup finalisti";

	} else if(o==2){
		palautus += "kaksinkertainen Tapsa-cup finalisti";

	} else if(o==3){
		palautus += "kolminkertainen Tapsa-cup finalisti";

	} else if(o==4){
		palautus += "nelinkertainen Tapsa-cup finalisti";

	} else if(o>4){
		palautus += "moninkertainen Tapsa-cup finalisti";
	}

	return palautus;
}


// Lisää tiedon yhden sählykerran yhdestä pelistä tai nollapelistä
function SetSahlyPeliTulos(pvm, nro, paikallaolo, tulos, joukkue){

	// Lisätään sanakirjaan, jossa avain on pvm ja muut tiedot ovat taulukkona
	// Jos on ensimmäinen tieto tälle päivälle
	if( !(pvm in this.getSahlyPeliTulosSanakirja()) ){
		// Alustetaan taulukoksi
		this.sahlyPeliTulos[pvm] = [];
	}

	// Lisätään pelin tiedot oikeaan kohtaan
	// Peli 0 on hieman erilainen
	if(nro === 0){
		this.sahlyPeliTulos[pvm][nro] = nro + ";" + paikallaolo;	
	
	} else{		
		// Alustetaan myös aikaisemmat pelit,jos niitä ei ole määritelty (pelaaja oli pois)
		for(var i=1; i<nro; i++){
			if(typeof this.sahlyPeliTulos[pvm][i] === 'undefined' || this.sahlyPeliTulos[pvm][i] === "" || this.sahlyPeliTulos[pvm][i] === null){
				this.sahlyPeliTulos[pvm][i] = i + ";" + "poissa" + ";" + ""  + ";" + "";
			}
		}
		this.sahlyPeliTulos[pvm][nro] = nro + ";" + paikallaolo + ";" + tulos  + ";" + joukkue;
	}
}


// Palauttaa yhden sählykerran pelitiedot
function GetSahlyPeliTulos(pvm){
	
	// Jos tieto on
	if(pvm in this.sahlyPeliTulos){
		return this.sahlyPeliTulos[pvm];
	}	else {
		alert("pelaaja . getSahlypelitulos():  ei pelitietoja tällä päivämäärällä");
		return null;
	}
}

// Palauttaa sanakirjan, jossa on yhden sählykerran kaikki pelit omissa alkioissa
function GetSahlyPeliTulosSanakirja(){
	return this.sahlyPeliTulos;
}

// Palauttaa ensimmäisen päivän, jolloin pelaaja oli paikalla
function GetEnsimmainenPelipaiva(){

	// Pienin oletettu päivä
	var minPaiva = "2500-12-20";
	for(var paiva in this.sahlyPeliTulos){
	
		// Pelaaja oli paikalla
		if(this.sahlyPeliTulos[paiva][0] === "0;paikalla"){

			// Oli ensimmäinen päivä, jolloin oli paikalla
			if(paiva < minPaiva){
				minPaiva = paiva;
			}
		}
	}

	return minPaiva;
}

// Palauttaa ensimmäisen päivän, jolloin pelaajalta on jonkinlainen merkintä (paikalla tai pois)
function GetEnsimmainenMerkintapaiva(){

	// Pienin oletettu päivä
	var minPaiva = "2500-12-20";
	for(var paiva in this.sahlyPeliTulos){
	
		// Pelaaja oli paikalla
		if(this.sahlyPeliTulos[paiva][0] !== "0;ei tietoa"){

			// Oli ensimmäinen päivä, jolloin oli paikalla
			if(paiva < minPaiva){
				minPaiva = paiva;
			}
		}
	}

	return minPaiva;
}

// Palauttaa ensimmäisen päivän, jolta pelaajalla on pelitulos (voitto, tasan, tappio)
function GetEnsimmainenTulospaiva(){

	// Pienin oletettu päivä
	var minPaiva = "2500-12-20";
	for(var paiva in this.sahlyPeliTulos){

		// Jos pelaaja ei ollut paikalla sählyssä, siirrytään seuraavaan sählykertaan eli päivään
		if(this.sahlyPeliTulos[paiva][0] !== "0;paikalla"){
			continue;
		}

		// Peli 1	
		var alku = this.sahlyPeliTulos[paiva][1];

		// Jos ei ollut pelissä 1, oletetaan ettei ollut muissakaan tämän kerran peleissä, ja siirrytään seuraavaan sählykertaan
		if(typeof alku === 'undefined'){
			continue;
		}

		var alkuT = alku.split(";");

		// Pelaaja oli paikalla pelissä
		if(alkuT[1] === "paikalla"){

			// Oli ensimmäinen päivä, jolloin oli paikalla
			if(paiva < minPaiva){
				minPaiva = paiva;
			}
		}
	}

	return minPaiva;
}

// Palauttaa viimeisen päivän, jolloin pelaaja oli paikalla
function GetViimeinenPelipaiva(){

	// Suurin oletettu päivä
	var maxPaiva = "1500-12-20";
	for(var paiva in this.sahlyPeliTulos){
	
		// Pelaaja oli paikalla
		if(this.sahlyPeliTulos[paiva][0] === "0;paikalla"){

			// Oli ensimmäinen päivä, jolloin oli paikalla
			if(paiva > maxPaiva){
				maxPaiva = paiva;
			}
		}
	}

	return maxPaiva;
}


// Vanhoja funktioita tästä eteenpäin. Osa tarpeellisia, osa ei.
// -------------------------------------------------------------

function KaikkiTiedot(){

	return 	this.etunimi + ", " + this.sukunimi  + ", " + this.kutsumanimi  + ", " + this.tilastonimi + ", " +	this.kuvaus + ", " + this.ominaisuudet + ", " + this.muuta;
}

// 2016 tarvitaan:
// Palauttaa osallistumisen [0,1,2] (eli poissa, paikalla, ei tietoa)
// ALKAEN siitä kerrasta kun oli eka 'paikalla' tai 'poissa' merkintä.
// Ekan merkinnän jälkeen otetaan myös 'ei tietoa' merkinnät
function GetOsallistuminen(){

	var poissa = 0;
	var paikalla = 0;
	var eiTietoa = 0;

	var ekaLoytyi = false;

	// Pelaajan ensimmäinen ja viimeinen päivä
	var pvm1 = pelaajaOliot[this.nimi].getEnsimmainenMerkintapaiva();

	// Käydään läpi sahlyPeliTulos
	for(pvm in this.sahlyPeliTulos){

		// Jos päivämäärä on ennen ensimmäistä pelaajan merkintää, ei oteta sitä 
		if(pvm < pvm1){
			continue;
		}

		var solu0 = this.sahlyPeliTulos[pvm][0].split(";");
		var kerta = solu0[1];

		if(kerta == "poissa"){
			poissa += 1;

		} else 	if(kerta == "paikalla"){
			paikalla += 1;

		} else 	if(kerta == "ei tietoa"){
			eiTietoa += 1;

		}		
	}

	return [poissa, paikalla, eiTietoa];
}


// Lisää uuden tiedon joukkuetoverin (toveri = nimi) kanssa tiettynä päivänä saavutetusta voitosta, tasurista tai tappiosta
function AddToveriAikaMenestys(toveri, pvm, voitot, tasurit, tappiot){

	// Jos toveri on jo tiedossa
	if(toveri in this.toveritAika){
		
		// Lisätään vanhan perään
		this.toveritAika[toveri].push(pvm + ";" + voitot + ";" + tasurit + ";" + tappiot);

	} else { // Jos on uusi nimi

		// Lisätään kokonaan uusi
		var tulostaulu = [];
		tulostaulu.push(pvm + ";" + voitot + ";" + tasurit + ";" + tappiot);
		this.toveritAika[toveri] = tulostaulu;
	}
	
} // END AddToveriAikaMenestys()


// Palauttaa tiedot taulukkona annetun pelaajan kanssa tiettynä päivänä pelatuista peleistä.
// Jos ei ole tietoja, palauttaa null.
function GetToveriAikaMenestys(toveri){

	if(toveri in this.toveritAika){
		return this.toveritAika[toveri];
	} else {
		return null;
	}
}

// Palauttaa HTML taulukon kaikkien toverien kanssa pelatuista peleistä päivämäärän ja tulokset.
// pvm1 on ensimmäinen päivä ja pvm2 on viimeinen päivä
function GetToveritAikaMenestysTaulukko(pvm1, pvm2, tableid){

	var palautus = '<table id="' + tableid + '" class="tablesorter" width="40%" border="1" cellpadding="0" cellspacing="0">';
	palautus += '<thead><tr><th>Pelaaja joukkuetoverina</th><th>Voitot [kpl]</th><th>Tasapelit [kpl]</th><th>Tappiot [kpl]</th><th>Yhteensä [kpl]</th></tr></thead>';
	palautus += '<tbody>';

	// Käydään läpi joukkuetoverit
	for(var toveri in this.toveritAika){

		// Yhden toverin kanssa yhteensä saavutetut voitot, tasurit ja tappiot
		var toverivoitot = 0;
		var toveritasurit = 0;
		var toveritappiot = 0;

		var tulokset = this.toveritAika[toveri];

		// Selvitetään yhden toverin kanssa saavutetut tulokset annettujen päivien sisällä
		for(var i=0; i<tulokset.length; i++){
			
			// Yhden päivän tulokset
			var paivatulos = tulokset[i];
			
			var tulostaulu = paivatulos.split(";");
		
			// Lisätään tiedot, jos päivämäärä on kelvollinen
			if(tulostaulu[0] >= pvm1 && tulostaulu[0] <= pvm2){
				toverivoitot += parseInt(tulostaulu[1]);
				toveritasurit += parseInt(tulostaulu[2]);
				toveritappiot += parseInt(tulostaulu[3]);
			}
		}

		var yhteensa = toverivoitot + toveritasurit + toveritappiot;
		palautus += '<tr><td>' + toveri + '</td><td>' + toverivoitot + '</td><td>' + toveritasurit +'</td><td>' + toveritappiot +'</td><td>' + yhteensa +'</td></tr>';

	} // END for(toveri)

	palautus += '</tbody></table>';
	return palautus;	
}

// Palauttaa pelaajan nimen
function GetPelaajanNimi(){

	return this.nimi;
}

function GetJoukkuetoverit(){

	return this.joukkuetoverit;
}

function GetVastustajat(){

	return this.vastustajat;
}

function LisaaVoitto(){

	this.voitot = this.voitot+1;
}

function GetVoitot(){
	return this.voitot;
}

function LisaaTappio(){

	this.tappiot = this.tappiot+1;
}

function GetTappiot(){
	return this.tappiot;
}

function LisaaRatkaisematon(){

	this.ratkaisemattomat = this.ratkaisemattomat+1;
}

function GetRatkaisemattomat(){
	return this.ratkaisemattomat;
}

// Lisää pelaajalle pelin
function LisaaPeli(){

	this.peleihinOsallistunut = this.peleihinOsallistunut + 1;
}

// Lisää pelaajalle sählykerran
function LisaaSahlykerta(){
	this.sahlyja = this.sahlyja + 1;
}

// Palautta monta kertaa pelaaja on osallistunut peliin
function GetPeleihinOsallistunut(){
	return this.peleihinOsallistunut;
}

// Palautta monta kertaa pelaaja on ilmestynyt paikalle
function GetSahlykerrat(){
	return this.sahlyja;
}

// Lisää pelaajan taulukkoon päivämäärän, jolloin oli pelaamassa
function LisaaOsallistumispaiva(paiva, tila){

	// Lisätään päivä ja tila
	if( !(paiva in this.osallistumisPaivat) ){	
		this.osallistumisPaivat[paiva] = tila;
	}
}

// Palauttaa pelaajan taulukon, jossa on osallistumispäivät
function GetOsallistumispaivat(){
	return this.osallistumisPaivat;
}

// Lisää pelaajalle joukkuekaverin
function LisaaJoukkueKaveri(pelikaveri){

	if(pelikaveri === "" || pelikaveri === this.getPelaajanNimi()){
		return;
	}

	vanhatJoukkuetoverit = this.getJoukkuetoverit();

	// Jos on oltu tämän kanssa joukkuekavereita ennenkin
	if (pelikaveri in vanhatJoukkuetoverit){
		// Lisätään vain +1
		vanhatJoukkuetoverit[pelikaveri] = vanhatJoukkuetoverit[pelikaveri] + 1;
	
	} else { // Lisätään uusi pelikaveri
		vanhatJoukkuetoverit[pelikaveri] = 1;		
	}

	this.joukkuetoverit = vanhatJoukkuetoverit;
}

// Lisää pelaajalle vastustajan
function LisaaVastustaja(vastustaja){

	if(vastustaja === "" || vastustaja === this.getPelaajanNimi()){
		return;
	}

	vanhatVastustajat = this.getVastustajat();

	// Jos on oltu tämän kanssa joukkuekavereita ennenkin
	if (vastustaja in vanhatVastustajat){
		// Lisätään vain +1
		vanhatVastustajat[vastustaja] = vanhatVastustajat[vastustaja] + 1;
	
	} else { // Lisätään uusi pelikaveri
		vanhatVastustajat[vastustaja] = 1;		
	}

	this.vastustajat = vanhatVastustajat;
}

// Lisää yhden voiton voittajajoukkueiden taulukkoon. 
// Joko uuden joukkuueen ja yhden voiton tai vanhalle joukkuueelle yhden voiton lisää
function lisaaVoittajajoukkue(voittajalista, joukkue){

	// Lisätään uusi joukkueja yksi sille voitto
	if(joukkue in voittajalista){
		voittajalista[joukkue] = voittajalista[joukkue] + 1;
	} else { // uusi joukkueen nimi ja voitto
		voittajalista[joukkue] = 1;
	}
	return voittajalista;
}

// Lisää yhden tappion tappiojoukkueiden taulukkoon. 
// Joko uuden joukkuueen ja yhden tappion tai vanhalle joukkuueelle yhden tappion lisää
function lisaaTappiojoukkue(tappiolista, joukkue){

	// Lisätään uusi joukkueja yksi sille tappio
	if(joukkue in tappiolista){
		tappiolista[joukkue] = tappiolista[joukkue] + 1;
	} else { // uusi joukkueen nimi ja tappio
		tappiolista[joukkue] = 1;
	}
	return tappiolista;
}

// Lisää yhden ratkaisemattoman pelin ratkaisemattomien joukkueiden taulukkoon. 
// Joko uuden joukkuueen ja yhden ratkaisemattoman tai vanhalle joukkuueelle yhden lisää
function lisaaRatkaisematonjoukkue(ratkaisematonlista, joukkue){

	// Lisätään uusi joukkueja yksi sille ratkaisematon
	if(joukkue in ratkaisematonlista){
		ratkaisematonlista[joukkue] = ratkaisematonlista[joukkue] + 1;
	} else { // uusi joukkueen nimi ja tappio
		ratkaisematonlista[joukkue] = 1;
	}
	return ratkaisematonlista;
}

// Palauttaa osallistuiko annettuna päivänä: paikalla | poissa
function OsallistuminenPaivana(pvm){
	return this.osallistumisPaivat[pvm];
}

// Lisää pelin tuloksen
// pelinumero on luku 1, 2, 3 tai 4
function AddPelitulos(pvm, pelinumero, tulos){

	var pelit = this.pvmJaPelitulokset[pvm];

	// Jos lisätään eka peli, alustetaan taulukoksi
	if(pelit == null){
		pelit = [];
	} 

	pelit[pelinumero-1] = tulos;
	this.pvmJaPelitulokset[pvm] = pelit;	
}

// Palauttaa annetun päivän ja annetun pelin tuloksen
// pelinumeron on luku 1, 2, 3 tai 4
function GetPelitulos(pvm, pelinumero){

	// Kaikki päivän pelit
	var pelit = this.pvmJaPelitulokset[pvm];

	// Jos on tyhjä taulukko, palautetaan tyhjä
	if(pelit == null || pelit[pelinumero-1] == null || pelit[pelinumero-1] == ""){
		if(pelinumero == 1){
			return this.osallistumisPaivat[pvm];
		}
		return "";		
	}

	// Palautetaan haluttu peli
	return pelit[pelinumero-1];
}


// Annetaan päivä ja palauttaa sinä päivän pelattujen pelien määrän
function GetPelienMaara(pvm){

	if(this.pvmJaPelitulokset[pvm] != null){
		return this.pvmJaPelitulokset[pvm].length;
	} else {
		return 0;
	}
}

// Palauttaa joukkuetoverit HTML-taulukossa
function GetJoukkuetoveritTaulukko(toveritJaKaveritTaulukkoId){

	var taulunAlku = '<table id="' + toveritJaKaveritTaulukkoId + '" class="tablesorter" width="40%" border="1" cellpadding="0" cellspacing="0">';
	taulunAlku += '<thead><tr><th align="center">Pelaaja</th><th align="center">Joukkuetoverina [kpl]</th><th align="center">Vastustajana [kpl]</th></tr></tbody>';

	var taulunLoppu = '</table>';
	var toveriTiedot = "<tbody>";

	for(toverinNimi in pelaajaOliot){
				
		var toveriKpl = this.getJoukkuetoverit()[toverinNimi];
		var vastustajaKpl = this.getVastustajat()[toverinNimi];

		// Korvataan undefined nollalla
		if(toveriKpl == null){
			toveriKpl = 0;
		} 
		if(vastustajaKpl == null){
			vastustajaKpl = 0;
		}

		toveriTiedot +=  '<tr><td>' + toverinNimi + '</td><td align="center">' + toveriKpl + '</td><td align="center">' + vastustajaKpl + '</td></tr>';
	}
		
	toveriTiedot += "</tbody>";
	return taulunAlku + toveriTiedot + taulunLoppu;
}

// Palauttaa joukkuetoverit HTML-taulukossa, Alkuperäinen ja toimiva
function GetJoukkuetoveritTaulukkoAlkuper(){

	var taulunAlku = '<table width="40%" border="1" cellpadding="0" cellspacing="0">';
	taulunAlku += '<th>Joukkuetoveri</th><th>Monessako pelissä</th>';
	var taulunLoppu = '</table>';

	var toveriTiedot = "";

	for(toverinNimi in this.getJoukkuetoverit()){
		toveriTiedot +=  '<tr><td>' + toverinNimi + '</td><td>' + this.getJoukkuetoverit()[toverinNimi] + '</td></tr>';
	}
		
	return taulunAlku + toveriTiedot + taulunLoppu;
}

// Palauttaa vastustajat HTML-taulukossa
function GetVastustajatTaulukko(){

	var taulunAlku = '<table width="40%" border="1" cellpadding="0" cellspacing="0">';
	taulunAlku += '<th>Vastustajat</th><th>Monessako pelissä</th>';
	
	var taulunLoppu = '</table>';
	var vastustajanTiedot = "";

	for(vastustajanNimi in this.getVastustajat()){
		vastustajanTiedot +=  '<tr><td>' + vastustajanNimi + '</td><td>' + this.getVastustajat()[vastustajanNimi] + '</td></tr>';
	}
		
	return taulunAlku + vastustajanTiedot + taulunLoppu;
}

// Palauttaa osallistumispäivät eli sählyt HTML-taulukkona
function GetOsallistumisetTaulukkona(){

	palautus = '<table width="40%" border="3" cellpadding="1" cellspacing="1">';
	palautus += "<th>Päivä</th><th>Peli 1</th><th>Peli 2</th>";

	aloitetaan = false;

	var rivivari;

 	var riviInd = 0;
	for(paiva in this.getOsallistumispaivat()) {

		if(riviInd % 2 == 0){
			rivivari = "#99FFFF";
		} else {
			rivivari = "#FFFFFF";
		}

		if(this.getOsallistumispaivat()[paiva] == "paikalla" && aloitetaan == false){
			aloitetaan = true;
		}

		// Lisätään taulukkoon rivi
		if(aloitetaan){

			// Jos ei ollut paikalla (eli oli "poissa" tai "ei tietoa")
			if(this.getOsallistumispaivat()[paiva] != "paikalla"){
				palautus += '<tr bgcolor=' + rivivari + '><td>' + paiva + '</td><td>' + this.getOsallistumispaivat()[paiva] + '</td></tr>';

			}	else { // Jos oli paikalla
				//palautus += '<tr><td>' + paiva + '</td><td>' +  this.getPelituloksetTaulukkona(paiva) + '</td></tr>';
				if(sahlyOliot[paiva].getPelit()[0] != null){

						palautus += '<tr bgcolor=' + rivivari + '><td>' + paiva + '</td>';
						
						// Tulostetaan kaikki pelit
						for(var j=0; j < sahlyOliot[paiva].getPelit().length; j++){
							//alert("PÄivä: " + paiva + ", peli " + j);
							palautus += '<td>Peli ' + (j+1) + ': voittaja ' + sahlyOliot[paiva].getPelit()[j].getVoittaja() + sahlyOliot[paiva].getPelit()[j].getPelitiedotTaulukkona()  + '</td>';
						}
						palautus += '</tr>';
						// Muuten hyvä, mutta ongelma, jos joukkueiden nimiä on useita samalla sählykerralla
						//palautus += '<tr bgcolor=' + rivivari + '><td>' + paiva + '</td><td>' + sahlyOliot[paiva].getKaikkiPelitiedotTaulukkona()  + '</td></tr>';
						
					// Kimmolla ja Visalla on tarkempaa tietoa
				} else if(this.getPelaajanNimi() == "Kimmo" || this.getPelaajanNimi() == "Visa"){
					palautus += '<tr bgcolor=' + rivivari + '><td>' + paiva + '</td><td>' +  pelaajaOliot[this.getPelaajanNimi()].osallistuminenPaivana(paiva) + '</td></tr>';
				}
				else{
					palautus += '<tr bgcolor=' + rivivari + '><td>' + paiva + '</td><td>' +  'tyhjää' + '</td></tr>';
				}
			}
		}

		riviInd++;
	}

	return palautus + '</table>';
}

// Palauttaa kaikki pelitulokset HTML-taulukkona
function GetPelituloksetTaulukkona(paiva){

	palautus = '<table width="40%" border="1" cellpadding="0" cellspacing="0">' + "<th>Tulos</th>";

	for(i=0; i< this.getPelienMaara(paiva); i++){
		palautus += '<tr><td>' + this.getPelitulos(paiva ,i+1)+ '</td></tr>';	
	}

	return palautus + '</table>';
}

// Lisää pelaajan kaikki kuvaustiedot
function AddKuvaustiedot(etunimi, sukunimi, kutsumanimi, tilastonimi, kuvaus, ominaisuudet, muuta){
	
	this.etunimi = etunimi;	
	this.sukunimi = sukunimi;
	this.kutsumanimi = kutsumanimi;
	this.tilastonimi = tilastonimi;
	this.kuvaus = kuvaus;
	this.ominaisuudet = ominaisuudet;
	this.muuta = muuta;
}

function GetEtunimi(){
	return this.etunimi;
}

function GetKutsumanimi(){
	return this.kutsumanimi;
}

function GetTilastonimi(){
	return this.tilastonimi;
}

function GetKuvaus(){
	return this.kuvaus;
}
