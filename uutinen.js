// Uutinen-luokka
function Uutinen(otsikko, pvm, sisalto){

	this.otsikko = otsikko;
	this.pvm = pvm;
	this.sisalto = sisalto;

	// Funktiot
	this.getOtsikko = GetOtsikko;
	this.getPvm = GetPvm;
	this.getSisalto = GetSisalto;
}

function GetOtsikko(){
	return this.otsikko;
}

function GetPvm(){
	return this.pvm;
}

function GetSisalto(){
	return this.sisalto;
}
