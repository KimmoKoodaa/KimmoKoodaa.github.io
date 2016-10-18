// Pelikausi-luokka, jossa tiedot:
// - nimi
// - lyhyt kauden nimi, jota käytetään esim. taulukkojen sarakkeen otsikossa
// - aloitus pvm
// - lopetus pvm
function Pelikausi(nimi, nimiLyhyt, aloitusPvm, lopetusPvm){

	this.nimi = nimi;
	this.nimiLyhyt = nimiLyhyt;
	this.aloitusPvm = aloitusPvm;
	this.lopetusPvm = lopetusPvm;
	
	// Funktiot
	this.getNimi = GetNimi;
	this.getNimiLyhyt = GetNimiLyhyt;
	this.getAloitusPvm = GetAloitusPvm;
	this.getLopetusPvm = GetLopetusPvm;
}

// Palauttaa kauden nimen
function GetNimi(){
	return this.nimi;
}

// Palauttaa kauden lyhyen nimen
function GetNimiLyhyt(){
	return this.nimiLyhyt;
}

// Palauttaa aloituspäivän
function GetAloitusPvm(){
	return this.aloitusPvm;
}

// Palauttaa lopetuspäivän
function GetLopetusPvm(){
	return this.lopetusPvm;	
}


