// Perustiedot-olioon merkitään kaikki perustiedot yhdestä pelistä, kun tarkkoja tietoja ei ole saatavilla.
// Perustiedot-olio on siis kaikista pelaajista eikä kustakin pelaajasta oamt perustiedot.
function Perustiedot(pelaajia, kimmonTulokset, kimmoPaikalla, visaPaikalla, muuta){

	this.pelaajia = pelaajia;
	this.kimmonTulokset = kimmonTulokset;
	this.kimmoPaikalla = kimmoPaikalla;
	this.visaPaikalla = visaPaikalla;
	this.muuta = muuta

	// Tällaisiakin voisi ehkä olla, mutta silloin kaikki eivät ole samalla viivalla, 
	// koska kaikkia paikallaolijoita ei aina kuitenkaan muisteta:
	//this.varmatPaikallaolijat = varmatPaikallaolijat;
	//this.varmatPoissaolijat = varmatPoissaolijat;

	// Funktiot
	this.getPelaajia = GetPelaajia;
	// Palauttaa taulukon
	this.getKimmonTulokset = GetKimmonTulokset;
	this.getKimmoPaikalla = GetKimmoPaikalla;
	this.getVisaPaikalla = GetVisaPaikalla;
	this.getMuuta = GetMuuta;
}

function GetPelaajia(){
	return this.pelaajia;
}

function GetKimmonTulokset(){
	return this.kimmonTulokset;
}

function GetKimmoPaikalla(){
	return this.kimmoPaikalla;
}

function GetVisaPaikalla(){
	return this.visaPaikalla;
}

function GetMuuta(){
	return this.muuta;
}

