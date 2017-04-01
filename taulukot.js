
//2017:

// Alustaa taulukon, jossa on pelien tietoja
function alustaPeliTaulukko(){

	var id = "pelitTaulukkoId";
	var taulukko = "pelitTaulukkoTable";

	$("#" + id).html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="' + taulukko + '"></table>');

	$('#' + taulukko).dataTable( {
		
		"columns": [
			{ "title": "Pvm" },
			{ "title": "Pelinro" },
            		{ "title": "Joukkue1" },
            		{ "title": "Joukkue1 maalit" },
			{ "title": "Joukkue2 maalit" },
            		{ "title": "Joukkue2" },           
            		{ "title": "Voittaja" },
            		{ "title": "Maaliero" }
        	],
 		"columnDefs": [
    	{ className: "dt-head-center", "targets": [ 0, 1, 2, 3, 4, 5, 6, 7 ] }
  	]
	} );  

//alert("pelit-taulukko alustus leveys: " + $( document ).width());
	return;
}

function taytaPeliTaulukko(){

	var taulunimi = "pelitTaulukkoTable";

	$('#'+taulunimi).DataTable().clear();

	// Tyhjentää taulukon
	$('#'+taulunimi).dataTable().fnDestroy();

	var taulu = $('#'+taulunimi).DataTable( {
		"order": [[ 0, "desc" ]],
		language: {
			"search": "Hae:",
			searchPlaceholder: "Hae hakusanalla taulukosta",
			"lengthMenu":     "Näytä _MENU_ pelaajaa",
			"info":           "Näyttää pelaajat _START_ - _END_. Pelaajien lukumäärä on yhteensä _TOTAL_.",
		},
		"columnDefs": [
			{ "targets": 0 },
			{ "targets": 1 },
			{ "targets": 2 },
			{ "targets": 3 },			
			{ "targets": 4 },			
			{ "targets": 5 },			
			{ "targets": 6 },			
			{ "targets": 7 },						
			{ className: "dt-center", "targets": [1,2,3,4,5,6,7] },
		]

	});	


	// Käydään läpi sählyt
	for(var pvm in sahlyOliot){

		// Jos sählykerrasta on vain perustiedot, siirrytään seuraavaan sählykertaan
		if(sahlyOliot[pvm].getTietojenTyyppi() !== "tarkat"){
			continue;
		}

		// Jos ei pelattu, siirrytään seuraavaan sählykertaan
		if(!sahlyOliot[pvm].getPelattiinko()){
			continue;
		}
		
		// Pelit
		var pelit = sahlyOliot[pvm].getPelit();

		// Käydään läpi sählykerran pelit
		for(var i=0; i<pelit.length; i++){

			// Jos maalitietoja ei ole, siirrytään seuraavaan sählykertaan
			if(typeof pelit[i].getMaalit1() === 'undefined' || pelit[i].getMaalit1() === "" || pelit[i].getMaalit1() === null){
				continue;
			}

			taulu.row.add( [
			pvm,
			(i+1),
			pelit[i].getJoukkue1(),
			pelit[i].getMaalit1(),
			pelit[i].getMaalit2(),
			pelit[i].getJoukkue2(),
			pelit[i].getVoittaja(),
			(pelit[i].getMaalit1() - pelit[i].getMaalit2()),
		] ).draw();

		}

	}
}//END taytaPeliTaulukko()


// Alustaa taulukon, jossa on yhden pelaajan kanssa samalla puolella ja vastapuolella pelanneiden lukumäärät
function alustaParitilastoLukumaaratTaulukko(){

	var id = "valitunPareinaMaaratTaulukkoId";
	var taulukko = "valitunPareinaMaaratTaulukkoTable";

	$("#" + id).html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="' + taulukko + '"></table>');

	$('#' + taulukko).dataTable( {
		
		"columns": [
						{ "title": "Pelaaja" },
						{ "title": "Joukkuetoverina [kpl]" },
            { "title": "Vastustajana [kpl]" },
        ],
 		"columnDefs": [
    	{ className: "dt-head-center", "targets": [ 0, 1, 2 ] }
  	]
	} );  

	return;

}

function taytaParitilastoLukumaaratTaulukko(nimi){

	var taulunimi = "valitunPareinaMaaratTaulukkoTable";

	$('#'+taulunimi).DataTable().clear();

	// Tyhjentää taulukon
	$('#'+taulunimi).dataTable().fnDestroy();

	var taulu = $('#'+taulunimi).DataTable( {
		"order": [[ 1, "desc" ]],
		language: {
			"search": "Hae:",
			searchPlaceholder: "Hae hakusanalla taulukosta",
			"lengthMenu":     "Näytä _MENU_ pelaajaa",
			"info":           "Näyttää pelaajat _START_ - _END_. Pelaajien lukumäärä on yhteensä _TOTAL_.",
		},
			"columnDefs": [
			{ "targets": 0 },
			{ "targets": 1 },
			{ "targets": 2 },			
			{ className: "dt-center", "targets": [1,2] },

		]
		
	});	

	for(toverinNimi in pelaajaOliot){
				
		var toveriKpl = pelaajaOliot[nimi].getJoukkuetoverit()[toverinNimi];
		var vastustajaKpl = pelaajaOliot[nimi].getVastustajat()[toverinNimi];

		// Korvataan undefined nollalla
		if(toveriKpl == null){
			toveriKpl = 0;
		} 
		if(vastustajaKpl == null){
			vastustajaKpl = 0;
		}

		//toveriTiedot +=  '<tr><td>' + toverinNimi + '</td><td align="center">' + toveriKpl + '</td><td align="center">' + vastustajaKpl + '</td></tr>';

		taulu.row.add( [
			toverinNimi,
			toveriKpl,
			vastustajaKpl,
		] ).draw();
	}

}


// Alustaa taulukon, jossa on yhden pelaajan paritilastot samalla puolella pelanneille
function alustaParitilastoToveritTaulukko(){

	var id = "valitunToveritTaulukkoId";
	var taulukko = "valitunToveritTaulukkoTable";

	$("#" + id).html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="' + taulukko + '"></table>');

	$('#' + taulukko).dataTable( {
		
		"columns": [
						{ "title": "Pelaaja joukkuetoverina" },
						{ "title": "Voitot" },
            { "title": "Tasapelit" },
            { "title": "Tappiot" },
            { "title": "Yhteensä" },
            { "title": "Suorituskyky" },
        ],
 		"columnDefs": [
    	{ className: "dt-head-center", "targets": [ 0, 1, 2, 3, 4, 5 ] }
  	]
    } );  

	return;

}

function taytaParitilastoToveritTaulukko(paritilasto, pelaajanNimi){

	var taulunimi = "valitunToveritTaulukkoTable";

	$('#'+taulunimi).DataTable().clear();

	// Tyhjentää taulukon
	$('#'+taulunimi).dataTable().fnDestroy();

	var taulu = $('#'+taulunimi).DataTable( {
		"order": [[ 4, "desc" ]],
		language: {
			"search": "Hae:",
			searchPlaceholder: "Hae hakusanalla taulukosta",
			"lengthMenu":     "Näytä _MENU_ pelaajaa",
			"info":           "Näyttää pelaajat _START_ - _END_. Pelaajien lukumäärä on yhteensä _TOTAL_.",
		},
			"columnDefs": [
			{ "targets": 0 },
			{ "targets": 1 },
			{ "targets": 2 },			
			{ "targets": 3 },		
			{ "targets": 4 },		
			{ "targets": 5 },		
			{ className: "dt-center", "targets": [1,2,3,4,5] },
		]
		
	});	


	// valitun pelaajan voittoprosentti
	var voittopros1 = pelaajaOliot[pelaajanNimi].getVoitot() / pelaajaOliot[pelaajanNimi].getPeleihinOsallistunut();

	var suorituskykySumma = 0;
	
	// Tulostetaan paritilasto
	for(var pari in paritilasto){

		// Erotetaan parista pelaajien nimet
		var osat = pari.split(";");

		// Jos jompi kumpi on haluttu nimi
		if(osat[0] == pelaajanNimi || osat[1] == pelaajanNimi){

			// Selvitetään toisen pelaajan nimi
			var toisenNimi = "";
			if(osat[0] == pelaajanNimi){
				toisenNimi = osat[1];
			} else {
				toisenNimi = osat[0];
			}
			
			// tulokset on: "voitot;tasapelit;tappiot"
			var tulokset = paritilasto[pari].split(";");
			var voitot = parseInt(tulokset[0]);
			var tasapelit = parseInt(tulokset[1]);
			var tappiot = parseInt(tulokset[2]);
			var yhteensa = parseInt(voitot+tasapelit+tappiot);

			// Suorituskyky kuvaa kuinka hyvin pelaaja pärjäsi toisen pelaajan kanssa/vastaan verrattuna heidän normaaliin tasoon
			// Se lasketaan:
			// ((valitun pelaajan voitto% + toisen pelaajan voitto%) / 2) - heidän parina pelaama voitto%
			var suorituskyky = "";
			var voittopros2 = "";


				// toisen pelaajan voittoprosentti
				voittopros2 = pelaajaOliot[toisenNimi].getVoitot() / pelaajaOliot[toisenNimi].getPeleihinOsallistunut();
				suorituskyky = ((voitot/yhteensa) - ((voittopros1 + voittopros2) / 2)) * 100;
				// suorituskyky = ( Math.round(suorituskyky * 100) / 100 );
				suorituskyky = Math.floor(suorituskyky);
	
				suorituskykySumma += suorituskyky * (yhteensa/pelaajaOliot[pelaajanNimi].getPeleihinOsallistunut());



			taulu.row.add( [
				toisenNimi,
				voitot,
				tasapelit,
				tappiot,
				yhteensa,
				suorituskyky
		] ).draw();
		}
	}

	
}







// Alustaa taulukon, jossa on yhden pelaajan paritilastot samalla puolella pelanneille
function alustaParitilastoVastustajatTaulukko(){

	var id = "valitunVastustajatTaulukkoId";
	var taulukko = "valitunVastustajatTaulukkoTable";

	$("#" + id).html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="' + taulukko + '"></table>');

	$('#' + taulukko).dataTable( {
		
		"columns": [
						{ "title": "Pelaaja vastustajana" },
						{ "title": "Voitot" },
            { "title": "Tasapelit" },
            { "title": "Tappiot" },
            { "title": "Yhteensä", },
        ],
 		"columnDefs": [
    	{ className: "dt-head-center", "targets": [ 0, 1, 2, 3, 4 ] }
  	]
    } );  

	return;
}



function taytaParitilastoVastustajatTaulukko(paritilasto, pelaajanNimi){

	var taulunimi = "valitunVastustajatTaulukkoTable";

	$('#'+taulunimi).DataTable().clear();

	// Tyhjentää taulukon
	$('#'+taulunimi).dataTable().fnDestroy();

	var taulu = $('#'+taulunimi).DataTable( {
		"order": [[ 1, "desc" ]],
		language: {
			"search": "Hae:",
			searchPlaceholder: "Hae hakusanalla taulukosta",
			"lengthMenu":     "Näytä _MENU_ pelaajaa",
			"info":           "Näyttää parit _START_ - _END_. Parien lukumäärä on yhteensä _TOTAL_.",
		},
			"columnDefs": [
			{ "targets": 0 },
			{ "targets": 1 },
			{ "targets": 2 },			
			{ "targets": 3 },		
			{ "targets": 4 },		
			{ className: "dt-center", "targets": [1,2,3,4] },
		]		
	});	

	// valitun pelaajan voittoprosentti
	var voittopros1 = pelaajaOliot[pelaajanNimi].getVoitot() / pelaajaOliot[pelaajanNimi].getPeleihinOsallistunut();

	// Tulostetaan paritilasto
	for(var pari in paritilasto){

		// Erotetaan parista pelaajien nimet
		var osat = pari.split(";");

		// Jos jompi kumpi on haluttu nimi
		if(osat[0] == pelaajanNimi || osat[1] == pelaajanNimi){

			// Selvitetään toisen pelaajan nimi
			var toisenNimi = "";
			if(osat[0] == pelaajanNimi){
				toisenNimi = osat[1];
			} else {
				toisenNimi = osat[0];
			}
			
			// tulokset on: "voitot;tasapelit;tappiot"
			var tulokset = paritilasto[pari].split(";");
			var voitot = parseInt(tulokset[0]);
			var tasapelit = parseInt(tulokset[1]);
			var tappiot = parseInt(tulokset[2]);
			var yhteensa = parseInt(voitot+tasapelit+tappiot);

			// Suorituskyky kuvaa kuinka hyvin pelaaja pärjäsi toisen pelaajan kanssa/vastaan verrattuna heidän normaaliin tasoon
			// Se lasketaan:
			// ((valitun pelaajan voitto% + toisen pelaajan voitto%) / 2) - heidän parina pelaama voitto%
			var suorituskyky = "";
			var voittopros2 = "";

			taulu.row.add( [
				toisenNimi,
				voitot,
				tasapelit,
				tappiot,
				yhteensa,
		] ).draw();
		}
	}

	
}






// Alustaa taulukon, jossa on kaikkien samassa joukkueessa pelanneiden parien tilastot
function alustaParitilastoToveritKaikkiTaulukko(){

	var id = "paritilastoToveritKaikkiTaulukkoId";
	var taulukko = "paritilastoToveritKaikkiTaulukkoTable";

	$("#" + id).html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="' + taulukko + '"></table>');

	$('#' + taulukko).dataTable( {
		
		"columns": [
			{ "width": "20%", "title": "Pari" },
			{ "width": "15%", "title": "Voitot" },
			{ "width": "15%", "title": "Tasapelit" },
			{ "width": "15%", "title": "Tappiot" },
			{ "width": "15%", "title": "Yhteensä" },
			{ "width": "20%", "title": "Voittoprosentti [%]" },
		],
 		"columnDefs": [
			{ className: "dt-head-center", "targets": [ 0, 1, 2, 3, 4, 5 ] }
		]
	});  

	return;
}


function taytaParitilastoToveritKaikkiTaulukko(paritilasto){

	var taulunimi = "paritilastoToveritKaikkiTaulukkoTable";

	$('#'+taulunimi).DataTable().clear();

	// Tyhjentää taulukon
	$('#'+taulunimi).dataTable().fnDestroy();

	var taulu = $('#'+taulunimi).DataTable( {
		"order": [[ 0, "desc" ]],
		language: {
			"search": "Hae:",
			searchPlaceholder: "Hae hakusanalla taulukosta",
			"lengthMenu":     "Näytä _MENU_ pelaajaa",
			"info":           "Näyttää parit _START_ - _END_. Parien lukumäärä on yhteensä _TOTAL_.",
		},
			"columnDefs": [
			{ "targets": 0 },
			{ "targets": 1 },
			{ "targets": 2 },			
			{ "targets": 3 },		
			{ "targets": 4 },		
			{ "targets": 5 },	
			{ className: "dt-center", "targets": [1,2,3,4,5] },
		]		
	});	

for(var i=0; i<paritilasto.length; i++){
	taulu.row.add( [
//		"0","1","2","3","4",
			paritilasto[i][0],
			paritilasto[i][1],
			paritilasto[i][2],
			paritilasto[i][3],
			paritilasto[i][4],
			paritilasto[i][5],
		] ).draw();
}
}


// Alustaa taulukon, jossa on kaikkien samassa joukkueessa pelanneiden parien tilastot
function alustaParitilastoVastustajatKaikkiTaulukko(){

	var id = "paritilastoVastustajatKaikkiTaulukkoId";
	var taulukko = "paritilastoVastustajatKaikkiTaulukkoTable";

	$("#" + id).html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="' + taulukko + '"></table>');

	$('#' + taulukko).dataTable( {
		
		"columns": [
			{ "width": "20%", "title": "Pari" },
			{ "width": "15%", "title": "Voitot" },
			{ "width": "15%", "title": "Tasapelit" },
			{ "width": "15%", "title": "Tappiot" },
			{ "width": "15%", "title": "Yhteensä" },
			{ "width": "20%", "title": "Voittoprosentti [%]" },
		],
 		"columnDefs": [
			{ className: "dt-head-center", "targets": [ 0, 1, 2, 3, 4, 5 ] }
		]
	});  

	return;
}



function taytaParitilastoVastustajatKaikkiTaulukko2(paritilasto){

	var taulunimi = "paritilastoVastustajatKaikkiTaulukkoTable";

	$('#'+taulunimi).DataTable().clear();

	// Tyhjentää taulukon
	$('#'+taulunimi).dataTable().fnDestroy();

	var taulu = $('#'+taulunimi).DataTable( {
		"order": [[ 0, "desc" ]],
		language: {
			"search": "Hae:",
			searchPlaceholder: "Hae hakusanalla taulukosta",
			"lengthMenu":     "Näytä _MENU_ pelaajaa",
			"info":           "Näyttää parit _START_ - _END_. Parien lukumäärä on yhteensä _TOTAL_.",
		},
			"columnDefs": [
			{ "targets": 0 },
			{ "targets": 1 },
			{ "targets": 2 },			
			{ "targets": 3 },		
			{ "targets": 4 },		
			{ "targets": 5 },	
			{ className: "dt-center", "targets": [1,2,3,4,5] },
		]		
	});	

for(var i=0; i<paritilasto.length; i++){
	taulu.row.add( [
//		"0","1","2","3","4",
			paritilasto[i][0],
			paritilasto[i][1],
			paritilasto[i][2],
			paritilasto[i][3],
			paritilasto[i][4],
			paritilasto[i][5],
		] ).draw();
}
}

// Toinen version, jossa paritilasto on sanakirja
function taytaParitilastoVastustajatKaikkiTaulukko2(paritilasto){

	var taulunimi = "paritilastoVastustajatKaikkiTaulukkoTable";

	$('#'+taulunimi).DataTable().clear();

	// Tyhjentää taulukon
	$('#'+taulunimi).dataTable().fnDestroy();

	var taulu = $('#'+taulunimi).DataTable( {
		"order": [[ 0, "desc" ]],
		language: {
			"search": "Hae:",
			searchPlaceholder: "Hae hakusanalla taulukosta",
			"lengthMenu":     "Näytä _MENU_ pelaajaa",
			"info":           "Näyttää parit _START_ - _END_. Parien lukumäärä on yhteensä _TOTAL_.",
		},
			"columnDefs": [
			{ "targets": 0 },
			{ "targets": 1 },
			{ "targets": 2 },			
			{ "targets": 3 },		
			{ "targets": 4 },		
			{ "targets": 5 },	
			{ className: "dt-center", "targets": [1,2,3,4,5] },
		]		
	});	

for(var avain in paritilasto){

// Tulokset 
		var tulokset = paritilasto[avain];

		// avain on kaksi nimeä eroteltuna puolipisteellä		
		var nimet = avain.split(";");
		var pari = nimet[0] + " - " + nimet[1];
		
		var voitot = parseInt(tulokset[0]);
		var tasurit = parseInt(tulokset[1]);
		var tappiot = parseInt(tulokset[2]);
		var yhteensa = parseInt(voitot+tasurit+tappiot);
		var voittoPros = Math.round( (voitot/yhteensa)*100 ); 				
		
		var uusiRivi = [pari, voitot, tasurit, tappiot, yhteensa,voittoPros];
	taulu.row.add( uusiRivi ).draw();
}
}






// Yleisfunktio, jolla luodaan datatables-taulukko
function luoParitilastoVastustaja(taulukonNimi, taulukonId, otsikot, data){

	// Kahden pelaajan tilasto, jossa avain: "pelaaja1" arvo:"pelaaja2(vastustajan joukkueesta),voitot(pelaaja1),tappiot(pelaaja1),tasurit(pelaaja1)"
	// Huom. pelaaja1 on se, joka on ennemmin aakkosissa
	paritilastoVastustaja = {};

	


	// Jos haluat sorterin, lisää class="tablesorter"
	partil = '<table id="'+taulukonNimi+'" class="stripe" width="40%" border="1" cellpadding="0" cellspacing="0"> <col width="400"> <col width="400">';
	partil += "<thead><tr><th>Pari</th><th>Voitot</th><th>Tasapelit</th><th>Tappiot</th><th>Yhteensä</th><th>Voittoprosentti [%]</th></tr></thead>";

	partil +="<tbody>";

	// Tulostetaan paritilastoVastustaja	
	for(par in paritilastoVastustaja){
		
		// par on kaksi nimeä eroteltuna puolipisteellä		
		var t12 = paritilastoVastustaja[par].split(";");
		var v1 = parseInt(t12[0]);
		var tas1 = parseInt(t12[1]);
		var tap1 = parseInt(t12[2]);
		var yhteensa = parseInt(v1+tas1+tap1);
		var voittoPros = Math.round( (v1/yhteensa)*100 ); 

		//partil += "<tr><td>" + par.replace(";", " - ") + "</td><td>" + v1 + "</td><td>" + tas1 + "</td><td>" + tap1 + "</td><td><b>" + parseInt(v1+tas1+tap1) + "</b></td><tr>";
		partil += "<tr><td>" + par.replace(";", " - ") +"</td>";
		partil += "<td align='center'>" + v1 + "</td>";
		partil += "<td align='center'>" + tas1 + "</td>";
		partil += "<td align='center'>" + tap1 + "</td>";
		partil += "<td align='center'><b>" + yhteensa + "</b></td>";
		partil += "<td align='center'>" + voittoPros + "</td>";
		partil += "</tr>";
	}
	partil +="</tbody></table>";

	$("#"+taulukonId).empty();
	$("#"+taulukonId).append(partil);

	$("#"+taulukonNimi).dataTable({
		 "autoWidth": false	
	});

}

// 2017:
function alustaKaikkienPelaajienTaulukko(){



	var id = "kaikkiPelaajatId";
	var taulukko = "kaikkiPelaajatTable";

	$("#" + id).html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="' + taulukko + '"></table>');

	$('#' + taulukko).dataTable( {

		"autoWidth": false,
		"columns": [
						{ "title": "Nimi" },
						{ "title": "Sählyt" },
            { "title": "Pelit" },
            { "title": "Voitot" },
            { "title": "Tappiot", },
            { "title": "Tasapelit" },
            { "title": "Pelikaverit" },
            { "title": "Vastustajat" },
            { "title": "Voittoputki (puhdas)" },
            { "title": "Voittoputki" },
            { "title": "Tappioputki (puhdas)" },
            { "title": "Tappioputki" },
            { "title": "Voittoprosentti" },
        ],
 		"columnDefs": [
    	{ className: "dt-center", "targets": [  1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] }
  	],

	} );  

	//alert("KAikki pelaajat alustus leveys: " + $( document ).width());
	return;

}

function taytaKaikkienPelaajienTaulukko(pelaajaOliot){


	var taulunimi = "kaikkiPelaajatTable";

	$('#'+taulunimi).DataTable().clear();

	// Tyhjentää taulukon
	$('#'+taulunimi).dataTable().fnDestroy();

	var taulu = $('#'+taulunimi).DataTable( {
"autoWidth": false,
		"order": [[ 0, "desc" ]],
		language: {
			"search": "Hae:",
			searchPlaceholder: "Hae hakusanalla taulukosta",
			"lengthMenu":     "Näytä _MENU_ pelaajaa",
			"info":           "Näyttää pelaajat _START_ - _END_. Pelaajien lukumäärä on yhteensä _TOTAL_.",
		},
"columnDefs": [
			{ "targets": 0 },
			{ "targets": 1 },
			{ "targets": 2 },			
			{ "targets": 3 },		
			{ "targets": 4 },		
			{ "targets": 5 },	
			{ className: "dt-center", "targets": [1,2,3,4,5,6,7,8,9,10,11,12] },
			],
	/*		"columnDefs": [
			{ "targets": 0 , "width": "8%"},
			{ "targets": 1 , "width": "8%"},
			{ "targets": 2 , "width": "7%"},
			{ "targets": 3 , "width": "7%"},
			{ "targets": 4 , "width": "7%"},
			{ "targets": 5 , "width": "8%"},
			{ "targets": 6 , "width": "8%"},
			{ "targets": 7 , "width": "8%"},
			{ "targets": 8 , "width": "8%"},
			{ "targets": 9 , "width": "8%"},
			{ "targets": 10 , "width": "8%"},
			{ "targets": 11 , "width": "8%"},
			{ "targets": 12 , "width": "8%"},

			{ className: "dt-center", "targets": [1,2,3,4,5,6,7,8,9,10,11,12] },

		]
		*/
	});	

// Palauttaa taulukon, jossa alkiossa on yhden putken sanakirja
	//[voittoputket, tappioputket]
	var ennatykset = new Ennatykset();
	var putket = ennatykset.getPisimmatVoittoputket();

	var voittoputket = putket[0];
	var tappioputket = putket[1];

	var voittoputketPuhtaat = putket[2];
	var tappioputketPuhtaat = putket[3];


// Käydään pelaajat läpi
	for(nimi in pelaajaOliot){
		
		var joukkuetoverit = pelaajaOliot[nimi].getJoukkuetoverit();
		var vastustajat = pelaajaOliot[nimi].getVastustajat();
		var pelitYhteensa	= pelaajaOliot[nimi].getVoitot() + pelaajaOliot[nimi].getTappiot() + pelaajaOliot[nimi].getRatkaisemattomat();

		var voittopros = 0;
		if(pelitYhteensa !== 0 && pelaajaOliot[nimi].getVoitot() !== 0 && pelaajaOliot[nimi].getVoitot() !== ""){
			voittopros = Math.round( (pelaajaOliot[nimi].getVoitot()/pelitYhteensa)*100 );
		}


		taulu.row.add( [
			nimi,
			pelaajaOliot[nimi].getSahlykerrat(),
			pelaajaOliot[nimi].getPeleihinOsallistunut(),
			pelaajaOliot[nimi].getVoitot(),
			pelaajaOliot[nimi].getTappiot(),
			pelaajaOliot[nimi].getRatkaisemattomat(),
			Object.keys(joukkuetoverit).length,
			Object.keys(vastustajat).length,
			voittoputketPuhtaat[nimi],
			voittoputket[nimi],
			tappioputketPuhtaat[nimi],
			tappioputket[nimi],
			voittopros,
		] ).draw();

	}


	// Vaihtelee ym sarakkeen näkyvyyttä: näkyy, ei näy
	$("input:checkbox").click(function(e){

      // Get the column API object
      var column = taulu.column( $(this).attr('data-column') );

      // Toggle the visibility
      column.visible( ! column.visible() );

	});	

	// Poistaa sarakkeen, jos check boxia ei ole ruksattu
	$("input:checkbox:not(:checked)").each(function() {
		var column = taulu.column( $(this).attr('data-column') );
		column.visible(false);	
		
	});



	//Piirtää kaavion alla olevan kaavion: Voittoporsentit pelien määrän funktiona
	piirraPelienMaaraJaVoittoprosentti();
}


// 2017:
// Alustaa sählykertojen taulukon, joka on kaikille pelaajille
function alustaSahlytaulukkoYleinen(){

	var id = "sahlytYleinenId";
	var taulukko = "sahlytYleinenTable";

	$("#" + id).html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="' + taulukko + '"></table>');

	$('#' + taulukko).dataTable( {
			
        "columns": [
						{ "title": "Pvm" },
            { "title": "Pelaajia" },
            { "title": "Pelattiinko" },
            { "title": "Peli 1 (voittaja ensin)", "class": "peli1" },
            { "title": "Peli 2 (voittaja ensin)", "class": "peli2" },
            { "title": "Peli 3 (voittaja ensin)", "class": "peli3" },
        ]
    } );  

	return;
}


// 2017:
// Täyttää DataTables-taulukkoon, jossa on sählykertojen yleiset tiedot
function taytaSahlytaulukkoYleisetTiedot(taulunimi, pelaajaOliot, sahlyOliot, tarkasteltavaPelaaja){

	$('#'+taulunimi).DataTable().clear();

	// Tyhjentää taulukon
	$('#'+taulunimi).dataTable().fnDestroy();

	var taulu = $('#'+taulunimi).DataTable( {

		"order": [[ 0, "desc" ]],
		language: {
			"search": "Hae:",
			searchPlaceholder: "Hae hakusanalla taulukosta",
			"lengthMenu":     "Näytä _MENU_ sählykertaa",
			"info":           "Näyttää sählykerrat _START_ - _END_. Sählykertojen lukumäärä on yhteensä _TOTAL_.",
		},

		"columnDefs": [
			{ "width": "10%", "targets": 0 },
			{ "width": "8%", "targets": 1 },
			{ "width": "7%", "targets": 2 },
			{ className: "dt-body-center", "targets": [1,2,3,4,5] }

		]
	});	

	var data = getSahlytaulukkoData();

	// Lisätään sisältö taulukkoon
	for(var i=0; i<data.length; i++){
		
		taulu.row.add( [
			data[i][0],
			data[i][1],
			data[i][2],
			data[i][3],
			data[i][4],
			data[i][5],
		] ).draw();

	}
} // END function taytaSahlytaulukkoYleisetTiedot()


// 2017: Palauttaa yhdestä pelistä merkkijonon, joka lisätään yllä olevaan taulukkoon
function getPeliString(peli){

	var peli1 = "";
	var joukkue1 = "";
	var joukkue2 = "";
	var maalit1 = "";
	var maalit2 = "";
	var maaliString = " - ";

	
		maalit1 = peli.getMaalit1();
		maalit2 = peli.getMaalit2();

		if((maalit1 !== 0 && maalit1 !== "")|| (maalit2 !== 0 && maalit2 !== "")){
			maaliString = " (" + Math.max(maalit1, maalit2) + ") - ("+ Math.min(maalit1, maalit2) +") "
		}

		if(peli.onkoTasapeli()){
			joukkue1 = peli.getJoukkue1();
			joukkue2 = peli.getJoukkue2();
		} else {
			joukkue1 = peli.getVoittaja();
			joukkue2 = peli.getHaviaja();
		}

		return joukkue1 + maaliString + joukkue2;		
}


// 2016:
// Alustaa sählykertojen taulukon
/*
function alustaSahlytaulukko(){

	// Lisätään tyhjä taulukko
	var eka = [];

	$("#sahlytId").html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="sahlytTable"></table>');

	$('#sahlytTable').dataTable( {
			
        "data": eka,
        "columns": [
						{ "title": "Pvm" },
            { "title": "Pelaajia" },
            { "title": "Voittaja (peli 1)", "class": "peli1" },
            { "title": "Voittaja (peli 2)", "class": "peli2" },
            { "title": "Voittaja (peli 3)", "class": "peli3" },
						{ "title": "Voittoja" },
						{ "title": "Pelejä" },
        ]
    } );  

	return;
}
*/

// Alustaa sählykertojen taulukon
function alustaSahlytaulukkoPelaajatiedot(){

	var id = "sahlytValittuId";
	var taulukko = "sahlytValittuTable";

	$("#" + id).html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="' + taulukko + '"></table>');

	$('#' + taulukko).dataTable( {
		"columns": [
						{ "title": "Pvm" },
						{ "title": "Pelaajia" },
            { "title": "Peli 1 (joukkue)" },
            { "title": "Peli 2 (joukkue)" },
						{ "title": "Peli 3 (joukkue)" },
            { "title": "Voittoja" },           
            { "title": "Pelejä" }
        ],
 		"columnDefs": [
    	{ className: "dt-head-center", "targets": [ 0, 1, 2, 3, 4, 5, 6 ] }
  	]
	} );  

	return;


}

// 2016:
// Täyttää DataTables-taulukkoon, jossa on sählykertojen ja valitun pelaajan tiedot
function taytaSahlytaulukkoPelaajatiedot( pelaajaOliot, sahlyOliot, tarkasteltavaPelaaja){

	$('#sahlytValittuTable').DataTable().clear();

	// Tyhjentää taulukon
	$('#sahlytValittuTable').dataTable().fnDestroy();

	var taulu = $('#sahlytValittuTable').DataTable( {

		"order": [[ 0, "desc" ]],
		language: {
			"search": "Hae:",
			searchPlaceholder: "Hae hakusanalla taulukosta",
			"lengthMenu":     "Näytä _MENU_ sählykertaa",
			"info":           "Näyttää sählykerrat _START_ - _END_. Sählykertojen lukumäärä on yhteensä _TOTAL_.",
		},

		// Värjää taulukossa pelin solun sen mukaan tuliko voitto (vihreä), tappio (punainen) vai ratkaisematon (sininen)
		"fnRowCallback": function( rivi, data, iDisplayIndex, iDisplayIndexFull ) {

			for(var i=2; i<5; i++){
				// Peli i on voitto
				if (data[i].lastIndexOf("voitto", 0) === 0 ){
					$('td', rivi).eq(i).css('background-color', '#98FF98');
				}
				// Peli i on tappio
				if (data[i].lastIndexOf("tappio", 0) === 0 ){
					$('td', rivi).eq(i).css('background-color', '#FDD7E4');
				}
				// Peli i on tasapeli
				if (data[i].lastIndexOf("tasapeli", 0) === 0 ){
					$('td', rivi).eq(i).css('background-color', '#CCFFFF');
				}
			}

			// Jos tilastot puuttuvat, värjätään rivi tumman harmaalla
			if (data[2].lastIndexOf("ei tietoa", 0) === 0 ){
				$('td', rivi).eq(2).css('background-color', '#666666');
				$('td', rivi).eq(2).css('color', '#FFFFFF');
				$('td', rivi).eq(3).css('background-color', '#666666');
				$('td', rivi).eq(3).css('color', '#FFFFFF');
				$('td', rivi).eq(4).css('background-color', '#666666');
				$('td', rivi).eq(4).css('color', '#FFFFFF');
				$('td', rivi).eq(5).css('background-color', '#666666');
				$('td', rivi).eq(5).css('color', '#FFFFFF');
			}			
		},

/*		"columns": [            
		    { "title": "Pvm" },
		    { "title": "Pelaajia" },
		    { "title": "Peli 1 (joukkue)", },
		    { "title": "Peli 2 (joukkue)", },
		    { "title": "Peli 3 (joukkue)",},
				{ "title": "Voittoja" },
				{ "title": "Pelejä" },
		],
*/
 "columnDefs": [
    { className: "dt-body-center", "targets": [ 1, 2, 3, 4, 5, 6 ] }
  ]
	});	

	// Lisätään sisältö taulukkoon
	for(var sahlypaiva in sahlyOliot){
		
		// Pelaajia
		var pelaajia = "";
		pelaajia = sahlyOliot[sahlypaiva].getPelaajia();

		// Tämän pelaajan voittojen määrä
		var tarkasteltavanVoitot = 0;		
		var pelitulokset = pelaajaOliot[tarkasteltavaPelaaja].getSahlyPeliTulos(sahlypaiva);

		// Jos oli paikalla
		if(typeof pelitulokset !== 'undefined' && pelitulokset !== null){

			var peli1 = getPelitulosTeksti(1, pelitulokset);//= pelitulokset[1];
			var peli2 = getPelitulosTeksti(2, pelitulokset);
			var peli3 = getPelitulosTeksti(3, pelitulokset);
			var peli4 = getPelitulosTeksti(4, pelitulokset);

			// Peleistä ei ole tieto, joten laitetaan oliko paikalla
			if(peli1[0] === ""){
				var nollapeli = pelitulokset[0].split(";");
				peli1[0] = nollapeli[1];
			}

			// Montako peliä tarkasteltava pelaaja voitti tällä sählykerralla
			tarkasteltavanVoitot = peli1[1] + peli2[1] + peli3[1] + peli4[1];

			// Jos oli paikalla, mutta ei pelattu, laitetaan voittojen määräksi tyhjä
			var pelattiinko = sahlyOliot[sahlypaiva].getPelattiinko();	
			if(!pelattiinko){
				tarkasteltavanVoitot = "";
			}
			
			// Jos ei tiedetä oliko paikalla, laitetaan voittojen määräksi tyhjä
			if(peli1[0] === "paikalla" || peli1[0] === "ei tietoa"){
				tarkasteltavanVoitot = "";
			}

			// Montako peliä pelattiin
			var pelienMaarat = 0;			
			// Jos ei pelattu, pelejä nolla
			if(!pelattiinko){			
				pelienMaarat = 0;
			} else {
				pelienMaarat = sahlyOliot[sahlypaiva].getPelitLkm();
			}

			taulu.row.add( [
				sahlypaiva,
				pelaajia,
				peli1[0],
				peli2[0],
				peli3[0],
				tarkasteltavanVoitot,
				pelienMaarat
			] ).draw();

		} //END if(oli paikalla)

	} // END for(käydään läpi sählypäivät)

} // END function taytaSahlytaulukkoPelaajatiedot()


// Luo taulukon sahlykerroista.
// Montako kertaa on pelattu, ei pelattu, perustiedot, tarkat tiedot, jne.
function tulostaSahlykerratTyypit(sahlykerratLkmPerus, sahlykerratLkmTarkat, sahlykerratEiPelattuLkm, sahlykerratEiOleVarmaPelattiinkoLkm, sahlykerratLkmPelattiin, sahlykerratLkmTarkatTiedotPelattiin, sahlykerratLkmTarkatTiedotEiPelattu){


		var taulukkoSahlykerroista = '<table id="sahlytyypitTable" align="center" border="1" cellpadding="3" cellspacing="0">';
		taulukkoSahlykerroista += '<col align="left" width="500"><col align="center" width="100"><col align="center" width="100">';
		taulukkoSahlykerroista += '<th style="text-align:center">Sählykerran tyyppi</th><th style="text-align:center">Määrä</th><th style="text-align:center">Määrä</th>';
		taulukkoSahlykerroista += "<tr><td>perustiedot sählystä (pelaajamäärä, Kimmo ja Visa osallistuminen)</td><td align='center'>" + sahlykerratLkmPerus + "</td><td></td></tr>"

		taulukkoSahlykerroista += "<tr><td>tarkat tiedot sählystä, kun pelattiin (kaikkien pelaajien tiedot)</td><td align='center'>" + sahlykerratLkmTarkatTiedotPelattiin + "</td><td></td></tr>"
		taulukkoSahlykerroista += "<tr><td>tarkat tiedot sählystä, kun ei pelattu (kaikkien pelaajien tiedot)</td><td align='center'>" + sahlykerratLkmTarkatTiedotEiPelattu + "</td><td></td></tr>"

		taulukkoSahlykerroista += "<tr><td>sählykerrat kun pelattiin</td><td></td><td align='center'>" + sahlykerratLkmPelattiin + "</td></tr>"
		taulukkoSahlykerroista += "<tr><td>sählykerrat kun ei pelattu</td><td></td><td align='center'>" + sahlykerratEiPelattuLkm + "</td></tr>"
		taulukkoSahlykerroista += "<tr><td>sählykerrat kun ei ole varmaa pelattiinko</td><td></td><td align='center'>" + sahlykerratEiOleVarmaPelattiinkoLkm + "</td></tr>"

		var yhtSarake1 = sahlykerratLkmPerus + sahlykerratLkmTarkatTiedotPelattiin + sahlykerratLkmTarkatTiedotEiPelattu;
		var yhtSarake2 = sahlykerratLkmPelattiin + sahlykerratEiPelattuLkm + sahlykerratEiOleVarmaPelattiinkoLkm;
		taulukkoSahlykerroista += "<tr><td><b>yht.</b></td><td align='center'><b>" + yhtSarake1 + "</b></td><td align='center'><b>" + yhtSarake2 + "</b></td></tr>"

		// Tyhjennetään siltä varalta, että siellä on jo taulukko
		$("#sahlytyypitId").empty();
		// Lisätään uudet tiedot
		$("#sahlytyypitId").append(taulukkoSahlykerroista);
}


// Kertoo kuinka monelta sählykerralta pelien tulokset ovat
function tulostaSahlykertojenMaaraTarkoillePeleille(sahlykerrat){

	// Tyhjennetään siltä varalta, että siellä on jo tekstiä:
	$("#pelitJoukkueittainIntroId").empty();
	$("#pelitJoukkueittainIntroId").append("<p>Tämän taulukon pelit on pelattu " +  sahlykerrat + " sählykerran aikana.</p>");
}


// 2016:
// Tulostaa taulukon, jossa on eri joukkueiden voitot, tappiot ja tasapelit
function tulostaJoukkueidenTaulukko(){

	// Tarkat tiedot peleistä: voitot, tappiot ja ratkaisemattomat joukkueittain
	var pelitiedot = '<table id="pelitJoukkueittainTable" align="center" width="40%" border="1" cellpadding="3" cellspacing="0">';
	pelitiedot += '<th style="text-align:center">Joukkue</th><th style="text-align:center">Voitot</th><th style="text-align:center">Tasapelit</th>';
	pelitiedot += '<th style="text-align:center">Tappiot</th><th style="text-align:center">Pelejä yht.</th>';

	// Käydään läpi joukkueet
	for(joukkue in joukkueTilasto){
		// Yhden joukkueen voitot, tasapelit ja tappiot
		var tiedot = joukkueTilasto[joukkue];
		// Pelejä yhteensä
		var yht = tiedot[0] + tiedot[1] + tiedot[2];
		// Lisätään taulukkoon
		pelitiedot += "<tr><td align='center'>" + joukkue  + "</td><td align='center'>" + tiedot[0]  + "</td><td align='center'>" + tiedot[1]  + "</td>";
		pelitiedot += "<td align='center'>" + tiedot[2]  + "</td><td align='center'>" + yht + "</td></tr>";
	}

	// Tyhjennetään siltä varalta, että siellä on jo taulukko
	$("#pelitJoukkueittainId").empty();
	// Lisätään sivulle
	$("#pelitJoukkueittainId").append(pelitiedot);
}

/*
// 2016:
// Luo taulukon, jossa on kaikkien pelaajien oleelliset tiedot
function tulostaKaikkienPelaajienTaulukko(pelaajaOliot){		

alert("funktio tulostaKaikkienPelaajienTaulukko()");
	// Taulukko, jossa on kaikkien pelaajien oleellisimmat tiedot
	var muutPelaajat = '<table id="pelaajatTable">';
	muutPelaajat += "<thead><tr><th class='nimi' align='center'>Nimi</th>"+
		"<th class='sahlykerrat' align='center'>Sählyt</th>"+
		"<th class='pelikerrat' align='center'>Pelit</th>"+
		"<th class='voitotLkm' align='center'>Voitot</th>"+
		"<th class='tappiotLkm' align='center'>Tappiot</th>"+
		"<th class='tasapelitLkm' align='center'>Tasapelit</th>"+
		"<th class='pelikaverit' align='center'>Pelikaverit</th>"+
		"<th class='vastustajat' align='center'>Vastustajat</th>"+
		"<th class='voittoputkiPuhdas' align='center'>Voittoputki (puhdas)</th>"+
		"<th class='voittoputki' align='center'>Voittoputki</th>"+
		"<th class='tappioputkiPuhdas' align='center'>Tappioputki (puhdas)</th>"+
		"<th class='tappioputki' align='center'>Tappioputki</th>"+		
		"<th class='voittopros' align='center'>Voittoprosentti [%]</th>"+
		"</tr></thead>";

	muutPelaajat += "<tbody>";

	var ind = 0;
	var rivivari;

	var ennatykset = new Ennatykset();

	// Palauttaa taulukon, jossa alkiossa on yhden putken sanakirja
	//[voittoputket, tappioputket]
	var putket = ennatykset.getPisimmatVoittoputket();

	var voittoputket = putket[0];
	var tappioputket = putket[1];

	var voittoputketPuhtaat = putket[2];
	var tappioputketPuhtaat = putket[3];

	// Käydään pelaajat läpi
	for(nimi in pelaajaOliot){

		var joukkuetoverit = pelaajaOliot[nimi].getJoukkuetoverit();
		var vastustajat = pelaajaOliot[nimi].getVastustajat();
		var pelitYhteensa	= pelaajaOliot[nimi].getVoitot() + pelaajaOliot[nimi].getTappiot() + pelaajaOliot[nimi].getRatkaisemattomat();

		var voittopros = 0;
		if(pelitYhteensa !== 0 && pelaajaOliot[nimi].getVoitot() !== 0 && pelaajaOliot[nimi].getVoitot() !== ""){
			voittopros = Math.round( (pelaajaOliot[nimi].getVoitot()/pelitYhteensa)*100 );
		}

		muutPelaajat += "<td class='nimi'>" + nimi + 
			"</td><td class='sahlykerrat' align='center'>" +pelaajaOliot[nimi].getSahlykerrat() + 
			"</td><td class='pelikerrat' align='center'>" + pelaajaOliot[nimi].getPeleihinOsallistunut() + 
			"</td><td class='voitotLkm' align='center'>" +	pelaajaOliot[nimi].getVoitot() + 
			"</td><td class='tappiotLkm' align='center'>" + pelaajaOliot[nimi].getTappiot() + 
			"</td><td  class='tasapelitLkm' align='center'>" + pelaajaOliot[nimi].getRatkaisemattomat() + 
			"</td><td class='pelikaverit' align='center'>" + Object.keys(joukkuetoverit).length + 
			"</td><td class='vastustajat' align='center'>" + Object.keys(vastustajat).length +			
			"</td><td class='voittoputkiPuhdas' align='center'>" + voittoputketPuhtaat[nimi]  + 
			"</td><td class='voittoputki' align='center'>" + voittoputket[nimi] + 
			"</td><td class='tappioputkiPuhdas' align='center'>" + tappioputketPuhtaat[nimi] + 
			"</td><td class='tappioputki' align='center'>" + tappioputket[nimi] + 
			"</td><td class='voittopros' align='center'>" + voittopros + 
			"</td></tr>";

		ind++;		
	}

	muutPelaajat += "</tbody></table>";



$("#pelaajatId").html(muutPelaajat);

	$('#pelaajatTable').dataTable( {
			

        "columns": [
						{ "title": "Nimi" },
            { "title": "Sählyt" },
						{ "title": "Pelit" },
            { "title": "Voitot" },
						{ "title": "Tappiot" },
            { "title": "Tasapelit" },
						{ "title": "Pelikaverit" },
            { "title": "Vastustajat" },
						{ "title": "Voitoputki (puhdas)" },
            { "title": "Voittoputki" },
						{ "title": "Tappioputki (puhdas)" },
            { "title": "Tappioputki" },
            { "title": "Voittoprosentti" },
        ]
    } );  






	if ($('#pelaajatId').is(':empty')){
		

		// Vaihtelee ym sarakkeen näkyvyyttä: näkyy, ei näy
		$("input:checkbox").click(function(){
				var column = "table ." + $(this).attr("name");
				console.log("click nimi: " + $(this).attr("name"));
				$(column).toggle();
		});
	}


	// Tyhjennetään siltä varalta, että siellä on jo taulukko
	$("#pelaajatId").empty();
	$("#pelaajatId").append(muutPelaajat);

	$("#pelaajatTable").tablesorter({ 
			sortList: [[0,0]],
			widgets: ['zebra']
		});

	// Poistaa sarakkeen, jos check boxia ei ole ruksattu
	$("input:checkbox:not(:checked)").each(function() {
		var column = "table ." + $(this).attr("name");
		$(column).hide();
	});
}
*/

// Palauttaa datan, joka tulee taulukkoon, jossa on parit samalla puolella
function getParitilastoToveritData(){

	// 2D-taulukko, johon tulee palautettavat paritilastot
	var palautus = new Array(new Array());

	// Kahden pelaajan tilasto, jossa avain: "pelaaja1;pelaaja2" arvo:"voitot,tappiot,tasurit"
	// Huom. pelaaja1 on se, joka on ennemmin aakkosissa
	var paritilasto = {};

	// Käydään läpi sählyt
	for(sahlyKerta in sahlyOliot){

		// Jos ei pelattu, siirrytään seuraavaan
		if(!sahlyOliot[sahlyKerta].getPelattiinko()){
			//alert(sahlyKerta + " ei pelattu ");
			continue;
		}
	
		//alert(sahlyOliot[sahlyKerta].getPvm());
		var sahlynPelit = sahlyOliot[sahlyKerta].getPelit();

		// Käydään yhden sählykerran pelit läpi
		for(var yksiPeli in sahlynPelit){
	
			// Otetaan joukkueiden pelaajat
			var pelaajatJ1 = sahlynPelit[yksiPeli].palautaPelaajatJoukkue1();
			var pelaajatJ2 = sahlynPelit[yksiPeli].palautaPelaajatJoukkue2();

			// Joukkue1 voitti
			if(sahlynPelit[yksiPeli].getVoittaja() == sahlynPelit[yksiPeli].getJoukkue1()){

				paritilasto = kayJoukkueLapi(pelaajatJ1, "voitto", paritilasto);
				//alert("af paritilaston pituus: " + Object.keys(paritilasto).length);

				paritilasto = kayJoukkueLapi(pelaajatJ2, "tappio", paritilasto);

			// Joukkue2 voitti
			} else if(sahlynPelit[yksiPeli].getHaviaja() == sahlynPelit[yksiPeli].getJoukkue1()){

				paritilasto = kayJoukkueLapi(pelaajatJ1, "tappio", paritilasto);
				paritilasto = kayJoukkueLapi(pelaajatJ2, "voitto", paritilasto);

			} else { // Ratkaisematon peli
				paritilasto = kayJoukkueLapi(pelaajatJ1, "ratkaisematon", paritilasto);
				paritilasto = kayJoukkueLapi(pelaajatJ2, "ratkaisematon", paritilasto);
			}

		} // END peli

	} // END sähly

var i=0;
// Tulostetaan paritilasto	
	for(par in paritilasto){

// par on kaksi nimeä eroteltuna puolipisteellä		
		var t12 = paritilasto[par].split(";");

		var nimet = par.replace(";", " - ");
		var v1 = parseInt(t12[0]);
		var tas1 = parseInt(t12[1]);
		var tap1 = parseInt(t12[2]);
		var pelejaYht = parseInt(v1+tas1+tap1);
		var voittoPros = Math.round( (v1/pelejaYht)*100 );

		palautus.push( [par.replace(";", " - "), v1, tas1, tap1, pelejaYht, voittoPros] );
		palautus[i][0] = par.replace(";", " - ");
		palautus[i][1] = v1;
		palautus[i][2] = tas1;
		palautus[i][3] = tap1;
		palautus[i][4] = pelejaYht;
		palautus[i][5] = voittoPros;
		i++;
	}

	return palautus;
}


function getParitilastoVastustajatData(){

	// 2D-taulukko, johon tulee palautettavat paritilastot
	var palautus = new Array();

// Kahden pelaajan tilasto, jossa avain: "pelaaja1" arvo:"pelaaja2(vastustajan joukkueesta),voitot(pelaaja1),tappiot(pelaaja1),tasurit(pelaaja1)"
	// Huom. pelaaja1 on se, joka on ennemmin aakkosissa
	var paritilastoVastustaja = {};

	// Käydään läpi sählyt
	for(sahlyKerta in sahlyOliot){

		// Jos ei pelattu, siirrytään seuraavaan
		if(!sahlyOliot[sahlyKerta].getPelattiinko()){
			continue;
		}

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


	for(par in paritilastoVastustaja){

		var t12 = paritilastoVastustaja[par].split(";");
		var nimet = par.replace(";", " - ");
		var voitot = parseInt(t12[0]);
		var tasan = parseInt(t12[1]);
		var tappiot = parseInt(t12[2]);
		var peleja = voitot + tasan + tappiot;
		var voittopros = Math.round( (voitot/peleja)*100 );

	var rivi = new Array(nimet, voitot, tasan, tappiot, peleja, voittopros);
	palautus.push(rivi);
		i++;
	}

	return palautus;
}

// Luo HTML-taulukon, jossa on kahden pelaajan samassa joukkueessa saavuttamat voitot, tappiot ja tasapelit.
// Palauttaa 2D-taulukon, jossa on vastaavat tiedot.
function luoParitilasto(sahlyOliot, paritilasto){

	var partil = '<table id="paritilastoToveriTable" class="stripe" width="40%" border="1" cellpadding="0" cellspacing="0"> ';

	partil += "<thead><tr><th>Pari</th><th>Voitot</th><th>Tasapelit</th><th>Tappiot</th><th>Pelejä yhteensä</th><th>Voittoprosentti [%]</th></tr></thead>";

	partil +="<tbody>";

	var palInd = 0;
	// Tulostetaan paritilasto	
	for(var i=0; i<paritilasto.length; i++){
		
		partil += "<tr><td>" + paritilasto[i][0] +"</td>";
		partil += "<td align='center'>" + paritilasto[i][1] + "</td>";
		partil += "<td align='center'>" + paritilasto[i][2] + "</td>";
		partil += "<td align='center'>" + paritilasto[i][3] + "</td>";
		partil += "<td align='center'><b>" + paritilasto[i][4] + "</b></td>";
		partil += "<td align='center'>" + paritilasto[i][5] + "</td>";

		partil += "</tr>";
	}
	partil +="</tbody></table>";

	$("#paritilastoToveritKaikkiTaulukkoId").empty();
	$("#paritilastoToveritKaikkiTaulukkoId").append(partil);

	$("#paritilastoToveriTable").dataTable({
		"autoWidth": false,
		"order": [[ 1, "desc" ]]
	});

}
   

// 2016:
// Käy annetun joukkuueen pelaajat läpi ja lisää tietoja
function kayJoukkueLapi(yksiJoukkueString, joukkueenTulos, paritilasto){

	// yksiJoukkue = "Kimmo,Visa,Janne"
	var yksiJoukkue = yksiJoukkueString.split(",");

	// Käydään läpi j1:n pelaajat
	for(var p1=0; p1<yksiJoukkue.length; p1++){
	
		// Otetaan nyt vuorossa oleva pelaaja
		var pel1 = yksiJoukkue[p1].trim();

		// Käydään nykyistä pelaajaa seuraavat pelaajat läpi
		for(var p2=p1+1; p2<yksiJoukkue.length; p2++){

			// Otetaan toinen pelaaja
			var pel2 = yksiJoukkue[p2].trim();
			var nimiAvain = "";
		
			// Jos jompi kumpi pelaaja on tyhjä, ei oteta tilastoihin, koska on joku virhe
			if(pel1 == "" || pel2 == ""){
				continue;
			}

			// Avain muotoa: pelaaja;pelaaja
			// Nimet aakkosjärjestyksessä
			if(pel1 < pel2){
				nimiAvain = pel1 + ";" + pel2;
			} else {
				nimiAvain = pel2 + ";" + pel1;
			}

			// Jos olivat voittajajoukkuueessa
			if(joukkueenTulos == "voitto"){
				//Lisätään voitto
				paritilasto = lisaaParivoitto(nimiAvain, paritilasto);

			} else if(joukkueenTulos == "tappio"){
				//Lisätään tappio
				paritilasto = lisaaParitappio(nimiAvain, paritilasto);

			} else { // Lisätään ratkaisematon
				paritilasto = lisaaPariratkaisematon(nimiAvain, paritilasto);
			}
				
		} //END for j2

	} //END for j1

	return paritilasto;
}


//2016:  Lisätään paritilastoon parille voitto
function lisaaParivoitto(nimiAvain, paritilasto){

	// Jos parille on jo merkintä aiemmin, lisätään uusi tieto
	if(nimiAvain in paritilasto){

		// Parin tilasto on muotoa: "voitot;tappiot;ratkaisemattomat;"
		var paritieto = paritilasto[nimiAvain];

		var paritietoArr = paritieto.split(";");

		// Lisätään voitto
		paritietoArr[0] = parseInt(paritietoArr[0]) + 1;

		// Lisätään korjatut tiedot
		paritilasto[nimiAvain] = paritietoArr[0] + ";" + paritietoArr[1] + ";" + paritietoArr[2] + ";";

	} else { // Paria ei vielä ole olemassa, joten lisätään uusi pari
		paritilasto[nimiAvain] = "1;0;0;";
	}

	return paritilasto;
}


//2016:  Lisätään paritilastoon parille ratkaisematon pelitulos
function lisaaPariratkaisematon(nimiAvain, paritilasto){

	// Jos parille on jo merkintä aiemmin, lisätään uusi tieto
	if(nimiAvain in paritilasto){

		// Parin tilasto on muotoa: "voitot;tappiot;ratkaisemattomat;"
		var paritieto = paritilasto[nimiAvain];

		var paritietoArr = paritieto.split(";");

		// Lisätään tappio
		paritietoArr[1] = parseInt(paritietoArr[1]) + 1;

		// Lisätään korjatut tiedot
		paritilasto[nimiAvain] = paritietoArr[0] + ";" + paritietoArr[1] + ";" + paritietoArr[2] + ";";

	} else { // Paria ei vielä ole olemassa, joten lisätään uusi pari
		paritilasto[nimiAvain] = "0;1;0;";
	}

	return paritilasto;
}

// 2016: Lisätään paritilastoon parille tappio
function lisaaParitappio(nimiAvain, paritilasto){

	// Jos parille on jo merkintä aiemmin, lisätään uusi tieto
	if(nimiAvain in paritilasto){

		// Parin tilasto on muotoa: "voitot;tappiot;ratkaisemattomat;"
		var paritieto = paritilasto[nimiAvain];

		var paritietoArr = paritieto.split(";");

		// Lisätään tappio
		paritietoArr[2] = parseInt(paritietoArr[2]) + 1;

		// Lisätään korjatut tiedot
		paritilasto[nimiAvain] = paritietoArr[0] + ";" + paritietoArr[1] + ";"+  paritietoArr[2] + ";";

	} else { // Paria ei vielä ole olemassa, joten lisätään uusi pari
		paritilasto[nimiAvain] = "0;0;1;";
	}

	return paritilasto;
}


// Luo ass-taulukon, jossa avain: "pelaaja1;pelaaja2" arvo:"pelaaja1nVoitot,pelaaja1nTappiot,pelaaja1nTasurit"
function luoParitilastoVastustaja(sahlyOliot){

	// Kahden pelaajan tilasto, jossa avain: "pelaaja1" arvo:"pelaaja2(vastustajan joukkueesta),voitot(pelaaja1),tappiot(pelaaja1),tasurit(pelaaja1)"
	// Huom. pelaaja1 on se, joka on ennemmin aakkosissa
	paritilastoVastustaja = {};

	// Käydään läpi sählyt
	for(sahlyKerta in sahlyOliot){

		// Jos ei pelattu, siirrytään seuraavaan
		if(!sahlyOliot[sahlyKerta].getPelattiinko()){
			continue;
		}

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

	// Jos haluat sorterin, lisää class="tablesorter"
	partil = '<table id="paritilastoVastustajaTable" class="stripe" width="40%" border="1" cellpadding="0" cellspacing="0">';
	partil += "<thead><tr><th>Pari</th><th>Voitot</th><th>Tasapelit</th><th>Tappiot</th><th>Yhteensä</th><th>Voittoprosentti [%]</th></tr></thead>";

	partil +="<tbody>";

	// Tulostetaan paritilastoVastustaja	
	for(par in paritilastoVastustaja){
		
		// par on kaksi nimeä eroteltuna puolipisteellä		
		var t12 = paritilastoVastustaja[par].split(";");
		var v1 = parseInt(t12[0]);
		var tas1 = parseInt(t12[1]);
		var tap1 = parseInt(t12[2]);
		var yhteensa = parseInt(v1+tas1+tap1);
		var voittoPros = Math.round( (v1/yhteensa)*100 ); 

		//partil += "<tr><td>" + par.replace(";", " - ") + "</td><td>" + v1 + "</td><td>" + tas1 + "</td><td>" + tap1 + "</td><td><b>" + parseInt(v1+tas1+tap1) + "</b></td><tr>";
		partil += "<tr><td>" + par.replace(";", " - ") +"</td>";
		partil += "<td align='center'>" + v1 + "</td>";
		partil += "<td align='center'>" + tas1 + "</td>";
		partil += "<td align='center'>" + tap1 + "</td>";
		partil += "<td align='center'><b>" + yhteensa + "</b></td>";
		partil += "<td align='center'>" + voittoPros + "</td>";
		partil += "</tr>";
	}
	partil +="</tbody></table>";

	$("#paritilastoVastustajatKaikkiTaulukkoId").empty();
	$("#paritilastoVastustajatKaikkiTaulukkoId").append(partil);

	$("#paritilastoVastustajaTable").dataTable({
		 "autoWidth": false	
	});

}


// 2016:
// Palauttaa yhden pelin tiedot taulukkona, jossa ensimmäinen alkio on merkkijono:
// - "yhden pelin tulos (joukkue)" eli esim: "voitto (paidat)"
// - paikalla|poissa
// Toinen on voittojen määrä eli 0 tai 1
function getPelitulosTeksti(numero, pelitulokset){

	// Jos pelituloksia ei ole, palauteteaan nolla peliä ja nolla voittoa
	if(pelitulokset === null){
		alert("taulukot . getPelitulosTeksti():  ei pelitietoja");
		return ["", 0];
	}

	// Voittojen määrä
	var voittoja = 0;

	var peli = pelitulokset[numero];

	if(typeof peli === 'undefined'){
		return ["", 0];
	}

	var pt = peli.split(";");
	
	if(peli !== ""){
		peli = pt[2] + " (" + pt[3] + ")";

		if(pt[2] === "voitto"){
			voittoja = 1;
		}
	} else {
		
		if(numero === 1){
			var a = pelitulokset[0].split(";");
			peli = a[1];	
		} else {
			peli = "";
		}
	}

	return [peli, voittoja];
}



// Palauttaa otsikkotekstin ja HTML-taulukon yhden pelin tiedoista (joukkueiden nimet, maalit, voittajan ja joukueiden pelaajat)
function luoJoukkueTaulukko(taulukonID, peli, peliNro){

	var palautus = "<p>Peli " + peliNro + ". Voittaja oli " + peli.getVoittaja() + "<p>";

	palautus += '<table id="' + taulukonID + '" class="tablesorter" width="40%" border="1" cellpadding="0" cellspacing="0"> <col width="400"> <col width="400">';

	// Pelaajat merkkijonona pilkulla eroteltuna
	var pelaajat1 = peli.palautaPelaajatJoukkue1();	
	var pelaajat2 = peli.palautaPelaajatJoukkue2();	

	var pelaajat1T = pelaajat1.split(",");
	var pelaajat2T = pelaajat2.split(",");
	
	palautus += "<thead><tr><th>" + peli.getJoukkue1() + " (maaleja = "+ peli.getMaalit1()+ ")</th><th>" + peli.getJoukkue2() + " (maaleja = "+ peli.getMaalit2()+  ")</th></tr></thead>";

	palautus += '<tbody>';

	// Pelaajalistoissa on lopussa yksi tyhjä, koska string loppui pilkuun
	for(var i=0; i< Math.max(pelaajat1T.length, pelaajat2T.length)-1; i++){
		palautus += "<tr><th>";

		// Jos on pelaajia joukkueessa 1
		if(i < pelaajat1T.length){
			palautus += pelaajat1T[i] + "</th><th>" ;
		} else {
			palautus +=  "</th><th>" ;
		}

		// Jos on pelaajia joukkueessa 2
		if(i < pelaajat2T.length){
			palautus += pelaajat2T[i] + "</th><th></tr>" ;
		} else {
			palautus +=  "</th><th></tr>" ;
		}			
	}

	palautus += '</tbody></table>';

	return palautus;
}


// Alustaa joukkueiden taulukon.
// Taulukossa on joukkueen pelaajat (aakkosjärjestyksessä), voitot, tappiot, tasapelit ja pelien määrä
function alustaJoukkuetaulukko(){

	// Lisätään tyhjä taulukko
	var eka = [];

	$("#joukkueetId").html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="joukkueetTable"></table>');

	$('#joukkueetTable').dataTable( {
			
        "data": eka,
        "columns": [
						{ "title": "Pelaajat" },
						{ "title": "Pelipäivät (pelejä)" },			
            { "title": "Voitot" },
            { "title": "Tasapelit" },
            { "title": "Tappiot"},
            { "title": "Pelejä" },
        ]
    } );  

//	alert("Joukkueet -taulukko alustus leveys: " + $( document ).width());
	return;
}









// =========================================
//	Tarvitaanko seuraavia enää 2016:


// Lisää pelaajaOliot listan pelaajille kyseisen pelin voitoksi, tappioksi tai tasapeliksi.
// Lisää pelaajaOliot listan pelaajille samassa joukkueessa olevien ja vastustajajoukkueessa olevien nimet.
// Parametrit:
// pelaajaOliot = assosiatiivinen lista, jossa on kaikkien pelaajien oliot
// pelaajaJaJoukkue = assosiatiivinen lista, jossa pelaajan nimi on avain ja joukkueen nimi on arvo
// voittajaJoukkue = pelin voittanut joukkue
// j1 = joukkueen 1 nimi
// j2 = joukkueen 2 nimi
// pelinNumero = monesko peli oli tällä sählykerralla
// pvm = päivämäärä
function lisaaPelaajaPelikaveritJaVoittaja(pelaajaOliot, pelaajaJaJoukkue, voittajaJoukkue, j1, j2, pelinNumero, pvm){

	var pelinTappiojoukkue = "";
	var ratkaisematonPeli = false;
	
	// Selvitetään tappiojoukkue
	if( (j1 == voittajaJoukkue) && (j2 != "") ){
		pelinTappiojoukkue = j2;
	} else if( (j2 == voittajaJoukkue) && (j1 != "") ){
		pelinTappiojoukkue = j1;
	} else {
		ratkaisematonPeli = true;
	}

	// Käydään kaikki pelaajat läpi
	for(var nimi in pelaajaJaJoukkue){
			
		// Käsittelyssä olevan pelaajan olio
		var tamaPelaaja;
		// Tämän pelaajan joukkue
		var joukkue = pelaajaJaJoukkue[nimi];

		// Jos nimi on jo listalla, ei tarvitse lisätä uutta pelaaja-oliota
		if(nimi in pelaajaOliot){
			tamaPelaaja = pelaajaOliot[nimi];

		} else { // Luodaan olio

			// Luodaan uusi pelaaja
			tamaPelaaja = new Pelaaja(nimi);
	
			// Lisätään se listaan
			pelaajaOliot[nimi] = tamaPelaaja;
		}

		// Jos on ratkaisematon peli
		if(ratkaisematonPeli){
			tamaPelaaja.lisaaRatkaisematon();	
			tamaPelaaja.addPelitulos(pvm, pelinNumero, "tasapeli")
			
		} else { // Jos pelillä on voittaja ja häviäjä

			// Jos pelaaja voitti ottelun, lisätään voitto
			if(joukkue == voittajaJoukkue && joukkue != ""){
				tamaPelaaja.lisaaVoitto();
				tamaPelaaja.addPelitulos(pvm, pelinNumero, "voitto")

			} else { // Lisätään tappio
				tamaPelaaja.lisaaTappio();
				tamaPelaaja.addPelitulos(pvm, pelinNumero, "tappio")
			}
		}

		// Käydään läpi pelaajat uudestaan ja lisätään joukkuetoverit ja vastustajat
		for(var nimi2 in pelaajaJaJoukkue){

			// Jos ei ole käsittelyssä oleva nimi (eli Kimmo ei voi olla Kimmon joukkuetoveri)
			if(nimi != nimi2){
				
				// Lisätään joukkuetoveriksi, jos on sama joukkue
				if(pelaajaJaJoukkue[nimi2] == joukkue){
					tamaPelaaja.lisaaJoukkuekaveri(nimi2);
				} 
				else {// Lisätään vastustajaksi
					tamaPelaaja.lisaaVastustaja(nimi2);
				}
			}

		}	// END for()

	}	// END for(Käydään pelaajat läpi)

	return pelaajaOliot; 

} // END lisaaPelaajaPelikaveritJaVoittaja()


// pelaajaJaJoukkue-ass-taulussa on [pelaaja] = joukkue. Jokainen pelaaja lisätään/täydennetään pelaajaOliot-ass-taulukkoon.
// Sitten jotaiselle pelaajalle lisätään tiedot pelikavereista ja vastustajista(pvm, tulos).
// Palauttaa taydennetyn pelaajaOliot-ass-taulukon.
function lisaaPelaajanToveritJaVastustajat(pelaajaOliot, pelaajaJaJoukkue, voittajaJoukkue, j1, j2, pelinNumero, pvm){

	var pelinTappiojoukkue = "";
	var ratkaisematonPeli = false;
	
	// Selvitetään tappiojoukkue
	if( (j1 == voittajaJoukkue) && (j2 != "") ){
		pelinTappiojoukkue = j2;
	} else if( (j2 == voittajaJoukkue) && (j1 != "") ){
		pelinTappiojoukkue = j1;
	} else {
		ratkaisematonPeli = true;
	}

	// Käydään pelaajat läpi (nimi:joukkue)
	for(var nimi in pelaajaJaJoukkue){
			
		// Käsittelyssä olevan pelaajan olio
		var tamaPelaaja;
		// Tämän pelaajan joukkue
		var joukkue = pelaajaJaJoukkue[nimi];

		// Jos nimi on jo listalla, ei tarvitse lisätä uutta pelaaja-oliota
		if(nimi in pelaajaOliot){
			tamaPelaaja = pelaajaOliot[nimi];

		} else { // Luodaan olio

			// Luodaan uusi pelaaja
			tamaPelaaja = new Pelaaja(nimi);
	
			// Lisätään se listaan
			pelaajaOliot[nimi] = tamaPelaaja;
		}

		// Lisätään tietoja pelaajalle: tamaPelaaja
		// tamaPelaaja voitti, pelasi tasan vai hävisi
		var tamaPelaajaTulos = "";

		// Jos on ratkaisematon peli
		if(ratkaisematonPeli){
			tamaPelaaja.lisaaRatkaisematon();	
			tamaPelaaja.addPelitulos(pvm, pelinNumero, "tasapeli");
			tamaPelaajaTulos = "tasapeli";
			
		} else { // Jos pelillä on voittajaj ja häviäjä

			// Jos pelaaja voitti ottelun, lisätään voitto
			if(joukkue == voittajaJoukkue && joukkue != ""){
				tamaPelaaja.lisaaVoitto();
				tamaPelaaja.addPelitulos(pvm, pelinNumero, "voitto")
				tamaPelaajaTulos = "voitto";

			} else { // Lisätään tappio
				tamaPelaaja.lisaaTappio();
				tamaPelaaja.addPelitulos(pvm, pelinNumero, "tappio")
				tamaPelaajaTulos = "tappio";
			}
		}

		// Käydään läpi pelaajat uudestaan
		for(var nimi2 in pelaajaJaJoukkue){

			// Jos ei ole käsittelyssä oleva nimi (eli Kimmo ei voi olla Kimmon joukkuetoveri)
			if(nimi != nimi2){
				// Lisätään joukkuekaverit
				//alert("löydettiin pelikaveri: " + nimi2);
			
				// Lisätään joukkuetoveriksi, jos on sama joukkue
				if(pelaajaJaJoukkue[nimi2] == joukkue){
					tamaPelaaja.lisaaJoukkuekaveri(nimi2);

					// Jos tamaPelaaja voitti
					if(tamaPelaajaTulos == "voitto"){
						tamaPelaaja.addToveriAikaMenestys(nimi2, pvm, 1, 0, 0);
					} else if(tamaPelaajaTulos == "tappio"){
						tamaPelaaja.addToveriAikaMenestys(nimi2, pvm, 0, 0, 1);
					} else { // tamaPelaaja pelasi tasan
						tamaPelaaja.addToveriAikaMenestys(nimi2, pvm, 0, 1, 0);
					}
				} 
				else {// Lisätään vastustajaksi
					tamaPelaaja.lisaaVastustaja(nimi2);
				}
			}
		}	// END for()
	}	// END for(Käydään pelaajat läpi (nimi:joukkue))

	return pelaajaOliot; 

} // END lisaaPelaajanToveritJaVastustajat()


// Lisää pelaajaJaJoukkue-listan pelaajille merkinnän pelaajaOliot-listaan, että on sallistunut peliin
function lisaaPeliosallistuminen(pelaajaOliot, pelaajaJaJoukkue){

	for(var osallistuja in pelaajaJaJoukkue){
		pelaajaOliot[osallistuja].lisaaPeli();
	}

	return pelaajaOliot;
}


// Lisätään paikalle tuleminen riippumatta pelattiinko vai ei
function lisaaSahlyosallistuminen(pelaajaOliot, sahlyynOsallistuneet){

	for(var i=0; i < sahlyynOsallistuneet.length; i++){
		pelaajaOliot[sahlyynOsallistuneet[i]].lisaaSahlykerta();
	}

	return pelaajaOliot;
}
	

// 2016:
// Luo HTML-taulukon, jossa on annetun pelaajan menestyminen muiden kanssa tai muita vastaan
function lisaaParitilasto(paritilasto, taulukonID, pelaajanNimi, otsikko1){

// valitun pelaajan voittoprosentti
var voittopros1 = pelaajaOliot[pelaajanNimi].getVoitot() / pelaajaOliot[pelaajanNimi].getPeleihinOsallistunut();

var suorituskykySumma = 0;

	// Palautettava taulukko
	var palautus = '<table id="' + taulukonID + '" class="tablesorter" width="40%" border="1" cellpadding="0" cellspacing="0"> <col width="400"> <col width="400">';
	palautus += "<thead><tr><th align='center'>" + otsikko1 + "</th><th align='center'>Voitot</th><th align='center'>Tasapelit</th>";
	palautus += "<th align='center'>Tappiot</th><th align='center'>Yhteensä</th>";

	// Jos pelasivat samassa joukkueessa, lisätään Suorituskyky-sarake
	if( otsikko1 === "Pelaaja joukkuetoverina"){
		palautus += "<th align='center'>Suorituskyky</th>";
	}

	palautus += "</tr></thead>";
	palautus += '<tbody>';

	// Tulostetaan paritilasto
	for(var pari in paritilasto){

		// Erotetaan parista pelaajien nimet
		var osat = pari.split(";");

		// Jos jompi kumpi on haluttu nimi
		if(osat[0] == pelaajanNimi || osat[1] == pelaajanNimi){

			// Selvitetään toisen pelaajan nimi
			var toisenNimi = "";
			if(osat[0] == pelaajanNimi){
				toisenNimi = osat[1];
			} else {
				toisenNimi = osat[0];
			}
			
			// tulokset on: "voitot;tasapelit;tappiot"
			var tulokset = paritilasto[pari].split(";");
			var voitot = parseInt(tulokset[0]);
			var tasapelit = parseInt(tulokset[1]);
			var tappiot = parseInt(tulokset[2]);
			var yhteensa = parseInt(voitot+tasapelit+tappiot);

			// Suorituskyky kuvaa kuinka hyvin pelaaja pärjäsi toisen pelaajan kanssa/vastaan verrattuna heidän normaaliin tasoon
			// Se lasketaan:
			// ((valitun pelaajan voitto% + toisen pelaajan voitto%) / 2) - heidän parina pelaama voitto%
			var suorituskyky = "";
			var voittopros2 = "";

			if( otsikko1 === "Pelaaja joukkuetoverina"){
				// toisen pelaajan voittoprosentti
				voittopros2 = pelaajaOliot[toisenNimi].getVoitot() / pelaajaOliot[toisenNimi].getPeleihinOsallistunut();
				suorituskyky = ((voitot/yhteensa) - ((voittopros1 + voittopros2) / 2)) * 100;
				// suorituskyky = ( Math.round(suorituskyky * 100) / 100 );
				suorituskyky = Math.floor(suorituskyky);
	
				suorituskykySumma += suorituskyky * (yhteensa/pelaajaOliot[pelaajanNimi].getPeleihinOsallistunut());

			} else {
				// Miten tämä laskettaisiin ?
			}

			// Lisätään taulukkoon yhden henkilön (eli sen toisen parista) tiedot
			palautus += "<tr><td width='20%'>" + toisenNimi + "</td><td width='15%' align='center'>" + voitot;
			palautus += "</td><td width='15%' align='center'>" + tasapelit;
			palautus += "</td><td width='15%' align='center'>" + tappiot + "</td><td width='15%' align='center'><b>" + yhteensa;

			// Jos pelasivat samassa joukkueessa, lisätään Suorituskyky-sarake
			if( otsikko1 === "Pelaaja joukkuetoverina"){
				palautus += "</b></td><td width='20%' align='center'>" + suorituskyky + "</td></tr>";
			}			
		}
	}

	palautus += "</tbody></table>";

	// Palautetaan
	return palautus;
}


// Käy pelaajaYksi:n vastajoukkueen pelaajat läpi ja lisää pelaajaYksi:lle muistiin miten kävi, 
// kun pelaajaYksi oli niitä vastassa (voitto, tasan, tappio)
function kayJoukkueLapiVastustaja(yksiJoukkueString, joukkueenTulos, paritilastoVastustaja, pelaajaYksi){

	// yksiJoukkue = "Kimmo,Visa,Janne"
	yksiJoukkue = yksiJoukkueString.split(",");

	var pel1 = pelaajaYksi;


	// Käydään läpi vastustajajoukkuueen pelaajat
	for(var p2=0; p2<yksiJoukkue.length; p2++){
	
			// Otetaan toinen pelaaja
			var pel2 = yksiJoukkue[p2].trim();
			var nimiAvain = "";
		
			// Jos jompi kumpi pelaaja on tyhjä, ei oteta tilastoihin, koska on joku virhe
			if(pel1 == "" || pel2 == ""){
				continue;
			}

			// Avain muotoa: pelaaja1;pelaaja2
			nimiAvain = pel1 + ";" + pel2;

			// Jos pelaajaYksi oli voittajajoukkuueessa
			if(joukkueenTulos == "voitto"){
				//Lisätään voitto
				paritilastoVastustaja = lisaaParivoitto(nimiAvain, paritilastoVastustaja);

			} else if(joukkueenTulos == "tappio"){
				//Lisätään tappio
				paritilastoVastustaja = lisaaParitappio(nimiAvain, paritilastoVastustaja);

			} else { // Lisätään ratkaisematon
				paritilastoVastustaja = lisaaPariratkaisematon(nimiAvain, paritilastoVastustaja);
			}

	} //END for

	return paritilastoVastustaja;
}


// Täyttää joukkueiden tiedot taulukkoon
function taytaJoukkueTaulukko(){

	// Sanakirja, jossa avaimena on pelaajat aakkosjärjestyksessä (esim: "Joni Kimmo Kjäll")	
	// Arvona on taulukko, jossa: [voitot][tasapelit][tappiot]
	var joukkueet = {};

	// Tyhjentää taulukon
	$('#joukkueetTable').DataTable().clear();
	$('#joukkueetTable').dataTable().fnDestroy();

	// Lisää uudet tiedot
	var taulu = $('#joukkueetTable').DataTable( {
		// Sallitaan regex haut
		"search": {
			"regex": true
		},

		"columnDefs": [
			{ className: "dt-body-center", "targets": [ 1, 2, 3, 4, 5 ]},
			{ "width": "40%", "targets": 0 }
		],		

	});

	// Käydään läpi sählykerrat
	for(var sahlypaiva in sahlyOliot){

		// Jos ei pelattu, siirrytään seuraavaan
		if(!sahlyOliot[sahlypaiva].getPelattiinko()){
			continue;
		}

		// Käydään läpi yhden sählykerran pelit
		var pelit = sahlyOliot[sahlypaiva].getPelit();

		for(var peliInd=0; peliInd<pelit.length; peliInd++){

			var tamaPeli = pelit[peliInd];

			// Lisätään tuloksien määrää kummallekin joukkueelle
			var j1Voitto = 0;
			var j1Tasapeli = 0;
			var j1Tappio = 0;

			var j2Voitto = 0;
			var j2Tasapeli = 0;
			var j2Tappio = 0;

			// Joukkueen 1 pelaajat
			var j1 = tamaPeli.getPelaajatJoukkue1Array();
			// Sortataan
			j1.sort();
			// Muutetaan merkkijonoksi
			var j1String = j1.join(", ");

			// Joukkueen 2 pelaajat
			var j2 = tamaPeli.getPelaajatJoukkue2Array();
			j2.sort();
			var j2String = j2.join(", ");


			// Miten päättyi? Voitto, tasan vai tappio?

			// Jos päättyi tasan
			if(tamaPeli.onkoTasapeli()){
				j1Tasapeli = 1;
				j2Tasapeli = 1;

			} else {

				// Jompi kumpi siis voitti. Selvitetään voittaja.
				var voittajanNumero = tamaPeli.getJoukkueenNumero(tamaPeli.getVoittaja());
			
				// Voittajalle ja hävinneelle yksi lisää
				if(voittajanNumero === 1){
					j1Voitto = 1;
					j2Tappio = 1;
				} else {
					j2Voitto = 1;
					j1Tappio = 1;			
				}
			}			
			
			// Jos joukkueesta 1 ei ole aikaisempia tietoja
			if(!(j1String in joukkueet)){
				var pelattu = {};
				pelattu[sahlypaiva] = 1;

				// Lisätään uutena
				joukkueet[j1String] = [j1Voitto, j1Tasapeli, j1Tappio, pelattu];

			} else { // Tästä joukkueesta on siis aikaisempia tietoja, joten lisätään vain pelien tulekset aikaisempien perään

				// Vanhat tiedot on taulukko, jossa 4 alkiota: voitot, tasurit, tappiot ja pelipäivät-sanakirja
				var vanhat = joukkueet[j1String];

				var voi = vanhat[0] + j1Voitto;
				var tas = vanhat[1] + j1Tasapeli;
				var tap = vanhat[2] + j1Tappio;

				// Aikaisemmat pelipäivät
				var pp = vanhat[3];
				// Jos tällä päivämäärällä on jo pelattu, lisätään vain lukumäärää yhdellä
				if(sahlypaiva in pp){
					pp[sahlypaiva] = pp[sahlypaiva] + 1;
				} else{
					// Asetetaan uusi
					pp[sahlypaiva] = 1;
				}

				joukkueet[j1String] = [voi, tas, tap, pp];
			}

			// Jos joukkueesta 2 ei ole aikaisempia tietoja
			if(!(j2String in joukkueet)){
				var pelattu = {};
				pelattu[sahlypaiva] = 1;

				// Lisätään uutena
				joukkueet[j2String] = [j2Voitto, j2Tasapeli, j2Tappio, pelattu];

			} else { // Tästä joukkueesta on siis aikaisempia tietoja, joten lisätään vain pelien tulekset aikaisempien perään

				// Vanhat tiedot on taulukko, jossa 4 alkiota: voitot, tasurit, tappiot ja pelipäivät-sanakirja
				var vanhat = joukkueet[j2String];

				var voi = vanhat[0] + j2Voitto;
				var tas = vanhat[1] + j2Tasapeli;
				var tap = vanhat[2] + j2Tappio;

				// Aikaisemmat pelipäivät
				var pp = vanhat[3];
				// Jos tällä päivämäärällä on jo pelattu, lisätään vain lukumäärää yhdellä
				if(sahlypaiva in pp){
					pp[sahlypaiva] = pp[sahlypaiva] + 1;
				} else{
					// Asetetaan uusi
					pp[sahlypaiva] = 1;
				}

				joukkueet[j2String] = [voi, tas, tap, pp];
			}	
	
		} // END for(pelit)		

	}// END for(sahlyt)

		
	for(var pelaajat in joukkueet){

		var tulokset = joukkueet[pelaajat];
		var peleja = tulokset[0] + tulokset[1] + tulokset[2];
	
		var pelipaivat = "";
		for(var pvm in tulokset[3]){
			pelipaivat = pelipaivat + pvm + " (" + tulokset[3][pvm] + "), ";
		}

		// Lisätään rivi taulukkoon
		taulu.row.add([pelaajat, pelipaivat, tulokset[0], tulokset[1], tulokset[2], peleja]).draw();
	}
		
}

// Alustaa taulukon, jossa on pelien ratkaisijat
function alustaRatkaisijatTaulukko(){

	var id = "ratkaisijatId";
	var taulukko = "ratkaisijatTable";

	$("#" + id).html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="' + taulukko + '"></table>');

	$('#' + taulukko).dataTable( {

		
		"columns": [
			{ "title": "Nimi" },
			{ "title": "Ratkaisumaaleja [lkm]" },
			{ "title": "Voittajajoukkueessa [lkm]" },
			{ "title": "Ratkaisuprosentti [%]" },
		],
		"columnDefs": [
			{ className: "dt-head-center", "targets": [ 0, 1, 2, 3 ] }
		]
	});  

//	alert("ratkaisijat alustus leveys: " + $( document ).width());
	return;
}

function taytaRatkaisijatTaulukko(ratkaisijat){

	var taulunimi = "ratkaisijatTable";

	$('#'+taulunimi).DataTable().clear();

	// Tyhjentää taulukon
	$('#'+taulunimi).dataTable().fnDestroy();

	var taulu = $('#'+taulunimi).DataTable( {
		"order": [[ 1, "desc" ], [ 3, "desc" ]],
		language: {
			"search": "Hae:",
			searchPlaceholder: "Hae hakusanalla taulukosta",
			"lengthMenu":     "Näytä _MENU_ pelaajaa",
			"info":           "Näyttää pelaajat _START_ - _END_. Pelaajien lukumäärä on yhteensä _TOTAL_.",
		},
			"columnDefs": [
			{ "targets": 0 },
			{ "targets": 1 },
			{ "targets": 2 },
			{ "targets": 3 },

			{ className: "dt-center", "targets": [1,2,3] },
		]		
	});	


	for(var rat in ratkaisijat){

		var data = ratkaisijat[rat];

		var prosentti = Math.round( (data[1]/data[0])*100 );

		taulu.row.add( [
			rat,
			data[1],
			data[0],
			prosentti,
		] ).draw();

	}
}

function taytaFinaalitiedot(data){

	// Luodaan taulukko finaalipeleistä
	var finaalitTable = '<table id="finaalitTable" class="tablesorter" width="98%" >';
	finaalitTable += '<thead><tr>';
	// Lisätään otsikot
	finaalitTable += '<th align="center">Kausi</th><th align="center">Päivämäärä</th>';
	finaalitTable +='<th align="center">Joukkue 1</th><th align="center">Maalit</th><th align="center">Joukkue2</th><th align="center">Voittaja</th>';		
	finaalitTable += '</tr></thead>';
	finaalitTable += '<tbody>';

	// Käydään data läpi ja lisätään tiedot
	for(var i=0; i<data.length; i++){
	
		// Lisätään finaalitaulukkoon rivi tälle finaalille
		finaalitTable += '<tr>';
		// Kauden nimi
		finaalitTable += '<td align="center">' + data[i][0] + '</td>';		
		// Päiväys
		finaalitTable += '<td align="center">' + data[i][1] + '</td>';		
		// Joukkue 1
		finaalitTable += '<td align="center">' + data[i][2] + '</td>';		
		// Joukkueiden maalit
		finaalitTable += '<td align="center">' + data[i][3] + '</td>';	
		// Joukkue 2
		finaalitTable += '<td align="center">' + data[i][4] + '</td>';		
		// Voittaja
		finaalitTable += '<td align="center">' + data[i][5] + '</td>';		
		// Lopetetaan taulukon rivi
		finaalitTable += '</tr>';
	}

	finaalitTable += '</tbody></table>';
	
	// Lisätään HTML-taulukko HTML-sivulle
	$("#finaalitId").empty();
	$("#finaalitId").append(finaalitTable);

	$("#finaalitTable").tablesorter({ 
			sortList: [[1,0]],
			widgets: ['zebra']
		});
}
