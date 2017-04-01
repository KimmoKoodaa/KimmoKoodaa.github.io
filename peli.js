// Peli-luokka. Pelit erotetaan toisistaan numerolla, joka on integer.
function Peli(pelinumero){

	this.pvm;
	this.pelinumero = pelinumero;
	// Joukkueiden nimet
	this.joukkue1 = "";	
	this.joukkue2 = "";
	// Voittaja- ja tappiojoukkue
	this.voittaja = "";
	this.haviaja = "";
	// Tuliko tasapeli: true=tasapeli ja false=ei tasapeliä
	this.tasapeli = true;
	// Joukkueiden tekemät maalit
	this.maalit1 = "";
	this.maalit2 = "";
	// Muuta sekalaista tietoa pelistä
	this.muuta = "";
	// Ratkaisumaalin tekijä
	this.ratkaisija = "";

	// Joukkueiden pelaajien nimet
	this.pelaajatJoukkue1 = [];
	this.pelaajatJoukkue2 = [];


	// Funktiot
	// --------
	this.getPelinumero = GetPelinumero;
	this.getPvm = GetPvm;

	this.setJoukkue1 = SetJoukkue1;
	this.getJoukkue1 = GetJoukkue1;

	this.setJoukkue2 = SetJoukkue2;
	this.getJoukkue2 = GetJoukkue2;

	this.setVoittaja = SetVoittaja;
	this.getVoittaja = GetVoittaja;

	this.setHaviaja = SetHaviaja;
	this.getHaviaja = GetHaviaja;

	// true tai false
	this.setTasapeli = SetTasapeli;
	this.onkoTasapeli = OnkoTasapeli;

	this.setMaalit1 = SetMaalit1;
	this.getMaalit1 = GetMaalit1;

	this.setMaalit2 = SetMaalit2;
	this.getMaalit2 = GetMaalit2;

	this.getJoukkueenNumero = GetJoukkueenNumero;

	this.addPelaaja = AddPelaaja;
	
	this.setMuuta = SetMuuta;
	this.getMuuta = GetMuuta;

	this.setRatkaisija = SetRatkaisija;
	this.getRatkaisija = GetRatkaisija;

	this.palautaPelaajatJoukkue1 = PalautaPelaajatJoukkue1;
	this.palautaPelaajatJoukkue2 = PalautaPelaajatJoukkue2;

	this.getPelaajatJoukkue1Taulukko = GetPelaajatJoukkue1Taulukko;
	this.getPelaajatJoukkue2Taulukko = GetPelaajatJoukkue2Taulukko;
	this.getPelitiedotTaulukkona = GetPelitiedotTaulukkona;

	this.getPelitiedotRivina = GetPelitiedotRivina;

	this.getPelaajanJoukkue = GetPelaajanJoukkue;

	// 2016:
	this.getPelaajatJoukkue1Array = GetPelaajatJoukkue1Array;
	this.getPelaajatJoukkue2Array = GetPelaajatJoukkue2Array;
	// Palauttaa sanakirjana molempien joukkueiden pelaajat
	this.getOsallistujat = GetOsallistujat;

	// 2017:
	// Palauttaa voittajajoukkueen pelaajat taulukkona: [ , , ]
	this.getVoittajajoukkueenPelaajat = GetVoittajajoukkueenPelaajat;
}

// Uusia 2017
// -----------
function GetVoittajajoukkueenPelaajat(){

	// Voittajajoukkueen numero: 1 tai 2
	var numero = this.getJoukkueenNumero(this.getVoittaja());

	if(numero === 1){
		return this.getPelaajatJoukkue1Array();
	} else if(numero === 2){
		return this.getPelaajatJoukkue2Array();
	} else {
		alert("Peli-luokka: Piti palauttaa voittajajoukkueen eli joukkue " + numero + " pelaajat, mutta ei selvinnyt kumpi voitti.");
	}
	
}


// Uusia vuonna 2016
// -----------------

// Lisää molempinejoukkueiden pelaajat parametrina olevaan sanakirjaan ja palauttaa sen.
// Avaimena on pelaajan nimi ja arvona 1, jos oli paikalla. Jos ei ollut paikalla, nimeä ei ole.
function GetOsallistujat(osallistujat){

	// Joukkueen 1 pelaajat
	var pel1 = this.getPelaajatJoukkue1Array();
	// Lisätään osallistujiin
	for(var i=0; i<pel1.length; i++){	
			osallistujat[pel1[i]] = 1;
	}

	// Lisätään joukkueen 2 pelaajat pelin osallistujiin
	var pel2 = this.getPelaajatJoukkue2Array();
		for(var i=0; i<pel2.length; i++){	
			osallistujat[pel2[i]] = 1;
	}

	return osallistujat;
}


function GetPelaajatJoukkue1Array(){
	return this.pelaajatJoukkue1;
}


function GetPelaajatJoukkue2Array(){
	return this.pelaajatJoukkue2;
}


// Vanhoja funktioita. Osa tarpeellisia, osa ei:
// --------------------------------------------

function GetPvm(){
	return this.pvm;
}

function GetPelinumero(){
	return this.pelinumero;
}

function SetJoukkue1(j1){
	this.joukkue1 = j1;
}

function GetJoukkue1(){
	return this.joukkue1;
}

function SetJoukkue2(j2){
	this.joukkue2 = j2;
}

function GetJoukkue2(){
	return this.joukkue2;
}

// Palauttaa joukkueen numeron nimen perusteella. Palautus on joko 1 tai 2.
function GetJoukkueenNumero(joukkueenNimi){

	if(this.joukkue1 === joukkueenNimi){
		return 1;
	} else if(this.joukkue2 === joukkueenNimi){
		return 2;
	} else {
		alert("Virhe! Peli-oliossa: Joukkueen nimi " + joukkueenNimi + " ei ollut kumpikaan joukkue: " + this.joukkue1 + ", " + this.joukkue2);
	}
}

function SetVoittaja(voittaja){
	this.voittaja = voittaja;
}

function GetVoittaja(){
	return this.voittaja;
}

function SetHaviaja(haviaja){
	this.haviaja = haviaja;
}

function GetHaviaja(){
	return this.haviaja;
}

// Asettaa onko(true) vai ei tasapeli(false)
function SetTasapeli(olikoTasapeli){
	this.tasapeli = olikoTasapeli;
}

// Palauttaa true tai false
function OnkoTasapeli(){
	return this.tasapeli;
}

function SetMaalit1(m){
	this.maalit1 = m;
}

function GetMaalit1(){
	return this.maalit1;
}

function SetMaalit2(m){
	this.maalit2 = m;
}

function GetMaalit2(){
	return this.maalit2;
}

// Lisää annetun pelaajan annettuun joukkueeseen.
function AddPelaaja(joukkueNumero, pelaajanNimi){

	if(joukkueNumero == 1){
		this.pelaajatJoukkue1.push(pelaajanNimi);
	} else if(joukkueNumero == 2){
		this.pelaajatJoukkue2.push(pelaajanNimi);
	} else{
		alert("Virhe! Peli-olio: joukkueen numero " + joukkueNumero + " ei ollut 1 eikä 2.");
	}	
}

function SetMuuta(muuta){
	this.muuta = muuta;
}

function GetMuuta(){
	return this.muuta;
}

function SetRatkaisija(ratkaisija){
	this.ratkaisija = ratkaisija;
}

function GetRatkaisija(){
	return this.ratkaisija;
}

// Palauttaa joukkuueen 1 pelaajat
function PalautaPelaajatJoukkue1(){
	
	var nimet = "";

	for(i=0; i < this.pelaajatJoukkue1.length; i++){
		nimet += this.pelaajatJoukkue1[i] + ", ";
	}

	return nimet;
}

// Palauttaa joukkuueen 2 pelaajat
function PalautaPelaajatJoukkue2(){
	
	var nimet = "";

	for(i=0; i < this.pelaajatJoukkue2.length; i++){
		nimet += this.pelaajatJoukkue2[i] + ", ";
	}

	return nimet;
}

// Palauttaa joukkuueen 1 pelaajat HTML-taulukkona
function GetPelaajatJoukkue1Taulukko(){
	
	var nimet = "<td>";

	for(i=0; i < this.pelaajatJoukkue1.length; i++){
		nimet += '' + this.pelaajatJoukkue1[i] + '<br/>';
	}

	return nimet + "</td>";
}

// Palauttaa joukkuueen 2 pelaajat HTML-taulukkona
function GetPelaajatJoukkue2Taulukko(){
	
	var nimet = "<td>";

	for(i=0; i < this.pelaajatJoukkue2.length; i++){
		nimet += '' + this.pelaajatJoukkue2[i] + '<br/>';
	}

	return nimet + "</td>";
}

// Palauttaa tämän pelin tiedot taulukkona: joukkueiden ja pelaajien nimet, voittajan, jne
function GetPelitiedotTaulukkona(){

	var palautus = "";
	palautus = '<table width="40%" border="1" cellpadding="0" cellspacing="0"> <col width="400"> <col width="400">' + "<th>" + this.getJoukkue1() + "</th><th>" + this.getJoukkue2() + "</th>";
	palautus += "<tr>" + this.getPelaajatJoukkue1Taulukko() + "";
	palautus += "" + this.getPelaajatJoukkue2Taulukko() + "</tr>";
	palautus +=	'</table>';

	return palautus;
}

// Palauttaa tämän pelin tiedot yhtenä taulukon rivinä (joukkueiden ja pelaajien nimet, voittajan, jne)
function GetPelitiedotRivina(){

	var palautus = "";

	//palautus = '<table width="40%" border="1" cellpadding="0" cellspacing="0">' + "<th>" + this.getJoukkue1() + "</th><th>" + this.getJoukkue2() + "</th>";
	palautus += "<tr><td>" + this.getPelinumero() + "</td><td>" + this.getVoittaja() + "</td>" + this.getPelaajatJoukkue1Taulukko() + "";
	palautus += "" + this.getPelaajatJoukkue2Taulukko() + "</tr>";
	//palautus +=	'</table>';

	return palautus;
}

// Palauttaa annteun pelaajan joukkueen nimen
function GetPelaajanJoukkue(pelaaja){

	var pelaajatJ1 = this.palautaPelaajatJoukkue1().split(",");

	// Käydään läpi joukkueen 1 pelaajat
	for(var i=0; i<pelaajatJ1.length; i++){

		// Jos löytyi tämä pelaaaja
		if(pelaaja == pelaajatJ1[i].trim()){
			// Tämä pelaaja pelasi siis joukkueessa 1, jonka nimi ny palautetaan
			return this.getJoukkue1();
		}
	}

	// Ei siis löytynyt joukkueesta 1
	
	var pelaajatJ2 = this.palautaPelaajatJoukkue2().split(",");

	// Käydään läpi joukkueen 2 pelaajat
	for(var i=0; i<pelaajatJ2.length; i++){

		// Jos löytyi tämä pelaaaja
		if(pelaaja == pelaajatJ2[i].trim()){
			// Tämä pelaaja pelasi siis joukkueessa 2, jonka nimi nyt palautetaan
			return this.getJoukkue2();
		}
	}

	return "Ei löytynyt joukkuetta"
}
