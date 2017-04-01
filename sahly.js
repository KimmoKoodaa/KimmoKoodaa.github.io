// Yhden sählykerran luokka
function Sahly(pvm, paikka, alkoi, loppui, muuta, pelattiinko){

	// Pelipäivä
	this.pvm = pvm;
	// Montako oli paikalla
	this.pelaajia = 0;

	this.pelipaikka = paikka;
	this.alkoi = alkoi;
	this.loppui = loppui;
	// Tyyppiä boolean
	this.pelattiinko = pelattiinko;
	this.muuta = muuta;

	// Onko sählystä perustiedot vai tarkat tiedot:
	// Vaihtoehdot: "tarkat" TAI "perus"
	this.tietojenTyyppi;

	this.pelit = [];
	this.pelilukumaara = 0;
	this.addPeli = AddPeli;
	this.addPeliLkm = AddPeliLkm
	this.getPelit = GetPelit;
	this.getPelitLkm = GetPelitLkm;

	// Liitetään funktiot
	this.setPvm = SetPvm;
	this.getPvm = GetPvm;

	this.setPelaajia = SetPelaajia;
	this.getPelaajia = GetPelaajia;

	this.setPelipaikka = SetPelipaikka;
	this.getPelipaikka = GetPelipaikka;

	this.setAlkoi = SetAlkoi;
	this.getAlkoi = GetAlkoi;

	this.setLoppui = SetLoppui;
	this.getLoppui = GetLoppui;

	this.setPelattiinko = SetPelattiinko;
	this.getPelattiinko = GetPelattiinko;

	this.setMuuta = SetMuuta;
	this.getMuuta = GetMuuta;

	// "tarkat" tai "perus"
	this.setTietojenTyyppi = SetTietojenTyyppi;
	this.getTietojenTyyppi = GetTietojenTyyppi;

	this.getKaikkiPelitiedotTaulukkona = GetKaikkiPelitiedotTaulukkona;

	// Uusia vuonna 2016:
	
	// Perustiedot tämän sählykerran peleistä
	this.perustiedot;
	// Lisätään perustiedot
	this.setPerustiedot = SetPerustiedot;
	// Palautetaan perustiedot
	this.getPerustiedot = GetPerustiedot;
	
	// Lisätään pelien lukumäärä. Tarvitaan, kun pelien tarkkoja tietoja ei ole.
	// Alussa on tyhjä, koska ei tiedetä onko nolla peliä
	this.pelitLkm = "";
	this.setPelitLkm = SetPelitLkm;
		
}

// Uusia funktioita vuonna 2016:
// -----------------------------

function SetPerustiedot(pt){
	this.perustiedot = pt;
}

function GetPerustiedot(pt){
	return this.perustiedot;
}

function SetPelitLkm(maara){
	return this.pelitLkm = maara;
}


// Vanhoja funktioita. Osa tarpeellisia, osa ei
// --------------------------------------------

function SetPvm(pvm){
	this.pvm = pvm;
}

function GetPvm(){
	return this.pvm;
}

function SetPelaajia(pelaajia){
	this.pelaajia = pelaajia;
}

function GetPelaajia(){

	return this.pelaajia;
}

function SetPelipaikka(pelipaikka){
	this.pelipaikka = pelipaikka;
}

function GetPelipaikka(){
	return this.pelipaikka;
}

function SetAlkoi(alkoi){
	this.alkoi = alkoi;
}

function GetAlkoi(){
	return this.alkoi;
}

function SetLoppui(loppui){
	this.loppui = loppui;
}

function GetLoppui(){
	return this.loppui;
}

function SetPelattiinko(pelattiinko){
	this.pelattiinko = pelattiinko;
}

function GetPelattiinko(){
	return this.pelattiinko;
}

function SetMuuta(muuta){
	this.muuta = muuta;
}

function GetMuuta(){
	return this.muuta;
}

function SetTietojenTyyppi(tyyppi){
	this.tietojenTyyppi = tyyppi;
}

function GetTietojenTyyppi(){
	return this.tietojenTyyppi;
}

function AddPeli(peli){
	this.pelit.push(peli);
}

function AddPeliLkm(){

	// Jos pelien määrä on alustamatta, alustetaan nollaksi
	if(this.pelilukumaara == ""){
		this.pelilukumaara = 0;
	}

	this.pelilukumaara = this.pelilukumaara + 1;
}

function GetPelit(){
	return this.pelit;
}

function GetPelitLkm(){

	// Jos ei pelattu, on pelien määrä nolla
	if(this.getPelattiinko() === false){
		return 0;
	}

	if(this.getTietojenTyyppi() === "tarkat"){	// 'pelilukumaara' > 0 vain jos peleistä on tarkat tiedot
		return this.pelit.length;

	}	else if(this.getTietojenTyyppi() === "perus"){	// Jos on perustiedot peleistä, käytetään 'pelitLkm' arvoa.
		return this.pelitLkm;

	} else {
		return "";
	}
}

// Palauttaa tämän sählykerran kaikkien pelien tiedot yhdessä HTML-taulukossa
function GetKaikkiPelitiedotTaulukkona(){
	
	var palautus = '<table width="40%" border="1" cellpadding="0" cellspacing="0">' + "<th>" + this.getPelit()[0].getJoukkue1() + "</th><th>" + this.getPelit()[0].getJoukkue2() + "</th>";

	// Haetaan jokaisen pelin tiedot taulukon yhtenä rivinä
	for(i=0; i<this.getPelit().length; i++){
		palautus += this.getPelit()[i].getPelitiedotRivina();
	}

	palautus +=	'</table>';

	return palautus;
}
