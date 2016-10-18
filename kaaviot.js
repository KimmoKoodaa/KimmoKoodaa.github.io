/**************************************
*	Funktioita kaavioiden piirtoa varten
***************************************/

function paritSamassaJoukkueessa(){
}


// Osallistumisen määrät piirakkakaaviona
function osallistuminenPie(taulukkonimi, kaavioId){

		// Selvitetään osallistumiset
		var palautus = pelaajaOliot[taulukkonimi].getOsallistuminen();

		var kylla = palautus[1];
		var ei = palautus[0];
		var eos = palautus[2];

		var henkiloOsallistui = [["kyllä", kylla], ["ei", ei], ["ei tietoa", eos]];

		var options = {
				title: taulukkonimi +' osallistuminen [kpl]',
				seriesColors:['#73D974', '#D7754C', '#ADADAD'],
				seriesDefaults: {
					renderer: jQuery.jqplot.PieRenderer,	
					rendererOptions: {
						showDataLabels: true,
						dataLabels: 'value'
					}
				},
			legend: { show:true },			 
		};

		// Piirretään kaavio
		var plot = $.jqplot (kaavioId, [henkiloOsallistui], options).replot();

} // END osallistuminenPie()


// Piirtää annetun pelaajan voittoprosentin kehityksen ajan funktiona
// pelaaja = pelaaja-olio
// kaavioID = kaavion id
function pelaajanVoittoprosentti(pelaaja, kaavioID){

	// Pelitulokset
	var voittopros = Array();

	// Sählypäivät, pelaaja oli paikalla tai sitten ei
	var paivat = Object.keys(sahlyOliot);
	// Sortataan päiväjärjestykseen
	paivat.sort();

	// 2D-taulukko voittoprosentista: [pvm, voittoprosentti]
	var voittopros = Array();

	// Alustetaan 2D-taulukko, jossa on yhtä monta riviä kuin on pelattuja sählykertoja
	var riveja = paivat.length;
	for(i=0; i<= riveja; i++){
			voittopros[i] = Array();
	}

	// Monesko tämän pelaajan pelipäivä
	var pelipaivaIndeksi = 0;
	// Pelien ja voittojen lukumäärät
	var peleja = 0;
	var voitot = 0;

	// Käydään läpi sählykerrat
	for(var ind=0; ind<paivat.length; ind++){

		var pvm = paivat[ind];

		// Voiko tämä koskaan olla totta? Kaikilla pitäisi olla jonkinlainen merkintä jokaisesta sählykerrasta.
		if(pelaajaOliot[pelaaja].getSahlyPeliTulos(pvm) === null){
			continue;
		}
		
		// Jos pelaaja oli paikalla, selvitetään yhden sählykerran pelitulokset
		if(pelaajaOliot[pelaaja].getSahlyPeliTulos(pvm)[0] === "0;paikalla"){

			// Yhden päivän pelien tulokset
			var tulokset = pelaajaOliot[pelaaja].getSahlyPeliTulos(pvm);

			// Käydään läpi tulokset ja lasketaan voitot
			for(var i=1; i<tulokset.length; i++){

				// Jos löytyy tietoja
				if(tulokset[i] !== ''){

					// Yksi peli lisaa
					peleja += 1;				

					// Lisätään voitto, jos voitto tuli			
					var pelintulos = tulokset[i].split(";");
					if(pelintulos[2] == "voitto"){
						voitot += 1;
					}
				}
			}

			// Sijoitetaan päiväys
			voittopros[pelipaivaIndeksi][0] = pvm;
			// Sijoitetaan tämänhetkinen voittoprosentti
			voittopros[pelipaivaIndeksi][1] = Math.round( (voitot/peleja)*100 );

			// Siirytään seuraavaan päivään
			pelipaivaIndeksi += 1;

		}	//END if(jos pelaaja osallistui)

	}	//END for(käydään läpi päivät)

	// Ensimmäinen päivämäärä, jolloin pelaajalta on jonkilainen tulos
	pvm1 = pelaajaOliot[pelaaja].getEnsimmainenTulospaiva();

	// Pyöristetään päivät alaspäin eli otetaan kuukauden ensimmäinen päivä
	var alin = pvm1.split("-");
	pvm1 = alin[0] + "-" + alin[1] + "-01";

	// Viimeisin päivämäärä, jolloin pelaaja oli paikalla
	pvm2 = pelaajaOliot[pelaaja].getViimeinenPelipaiva();
	
	if(peleja === 0){
		$('#'+kaavioID).html("Pelaaja ei ole pelannut yhtään peliä, joten ei ole voittoprosenttia mitä näyttää. On saattunut olla paikalla, mutta ei ole ehkä pelattu.");
		return;
	}

	// Piirtää kuvaajan voittoprosentista
	$.jqplot (kaavioID, [voittopros],{

		title:'Pelaajan ' + pelaaja + ' voittoprosentin kehitys',

		// Nämä määritelty jo <div>:ssä
		//height:400,
		//width:1200,
		gridPadding: {top:40, bottom:80, left:130, right:20},

		axes: {
			xaxis: {		
				//label:'Aika',	
				renderer:$.jqplot.DateAxisRenderer, 
				tickOptions:{formatString: '%b-%d'},
        min: pvm1, 
        max: pvm2,
        tickInterval:'1 month',
        labelRenderer: $.jqplot.CanvasAxisLabelRenderer,	
				tickRenderer: $.jqplot.CanvasAxisTickRenderer,	// Tämä mahdollistaa asteikon arvon kääntämisen kulmassa

      	tickOptions: {
					formatString: '%Y-%b-%d',
        	angle: -30 // Tämä aiheuttaa virheilmoituksen, koska ilmeisesti ei ole tilaa vaikka gridPaddingillä sitä laittaisi
	    	},				
	    },
			yaxis: {			
				label:'Voittoprosentti [%]',	
				min: 0,
				max: 100,
      	ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
				tickOptions:{formatString: '%d'},  	
			},
		},

		highlighter: {
			show: true,

			tooltipContentEditor: function(str, seriesIndex, pointIndex, jqPlot) {
				var kursori = str + "%";
				// Palautus eli mitä näkyy, kun hiirellä osoitetaan kaaviota
				return "<div class='osoitus'>" + kursori + "</div>";			
			}
		},

		cursor:{
			show: true,
			zoom: true,
			showTooltip: false,
    },
	}).replot();	// END $.jqplot()

} //END pelaajanVoittoprosentti()


// Piirtää pelaajien määrän ja pelien määrän yhtenä viivakaaviona kaikista vuosista
function piirraPelaajat(){

	// Kuvaajassa on pystyviiva jokaisen vuoden alussa.
	// Tämä on sen viivan paksuus
	var vuosierotinPaksuus = 1.3;

	// 2D-taulukko pelaajien määrästä: [pvm, pelaajia]
	var pelaajaLkm = Array();
	// Pelien määrä on myös 2D-taulukko: [pvm, pelejä]
	var peleja = Array();
	
	// Alustetaan taulukot
	var riveja = Object.keys(sahlyOliot).length;
	for(var i=0; i<=riveja; i++){
		pelaajaLkm[i] = Array();
		peleja[i] = Array();
	}

	// Sählykerran numero
	var i=0;

	// Käydään sählykerrat läpi
	for(var sahlypaiva in sahlyOliot){

		// Sijotetaan päivämäärä
		pelaajaLkm[i][0] = sahlypaiva;
		peleja[i][0] = sahlypaiva;

		// Pelaajien määrä
		if(sahlyOliot[sahlypaiva].getPelaajia() === ""){
			pelaajaLkm[i][1] = null;
		} else {
			pelaajaLkm[i][1] = sahlyOliot[sahlypaiva].getPelaajia();
		}

		//Pelien määrä
		if(sahlyOliot[sahlypaiva].getPelitLkm() === ""){
			peleja[i][1] = null;
		} else {
			peleja[i][1] = sahlyOliot[sahlypaiva].getPelitLkm();
		}	

		// Siirytään seuraavaan sählykertaan		
		i++;
	}

	// Jos yhtään päivää ei löytynyt, piirretään tyhjä kuvaaja ja poistuutaan
	if( Object.keys(sahlyOliot).length < 1){
		var kuvaaja = $.jqplot ('pelaajienLkmId', [pelaajaLkm, peleja],{}).replot();
		return;
	}	

	// Jos yhtään päivää ei löytynyt, poistutaan
	if( Object.keys(sahlyOliot).length < 1){
		return;
	}	

	// Selvitetään ensimmäinen ja viimeinen päivämäärä
	var minPvm = Object.keys(sahlyOliot).sort()[0];
	var maxPvm = Object.keys(sahlyOliot).sort()[Object.keys(sahlyOliot).length-1];

	// Pyöristetään päivät alaspäin eli otetaan kuukauden ensimmäinen päivä
	var alin = minPvm.split("-");
	minPvm = alin[0] + "-" + alin[1] + "-01";

	// Selvitetään ensimmäinen ja viimeinen vuosi
	var vuosi = minPvm.split("-");
	var vuosi1 = parseInt(vuosi[0]);
	vuosi = maxPvm.split("-");
	var vuosi2 = parseInt(vuosi[0]);

	// Luodaan vuosiviiva jokaiselle vuodelle
	var vuosiviivat = '  [ ';	
	while(vuosi1 <= vuosi2){

		// Vuodenvaihteen aika
		var aika = new $.jsDate( vuosi1 + '-01-01 00:00:00.000').getTime();

		// Lisätään tiedot jokaiselle vuodella
		vuosiviivat += '{"verticalLine": {"name": "vuosi '+vuosi1+'",';
		vuosiviivat += '"x": "'+aika+'",';
		vuosiviivat += '"lineWidth": "'+vuosierotinPaksuus+'",';
		vuosiviivat += '"xOffset": 0,';
		vuosiviivat += '"lineCap": "square",';
		vuosiviivat += '"color": "rgb(136, 136, 136)",';
		vuosiviivat += '"shadow": false}}';       

		// Siirrytään seuraavaan vuoteen
		vuosi1++;

		// Lisätään pilkku, jos on vielä vuosia tulossa
		if(vuosi1 <= vuosi2){
			vuosiviivat += ',';
		}
	}

	vuosiviivat += '] ';
	// Parsitaan
	var vuosiviivatJson = JSON.parse(vuosiviivat);
	
	// Kaavio, jossa on pelaajien ja pelien lukumäärä ajan funktiona
	var kuvaaja = $.jqplot ('pelaajienLkmId', [pelaajaLkm, peleja],{

		// Animaatio päällä
		animate: true,
		// Tekee animaation
		animateReplot: true,

		title:'Pelaajien ja pelien lukumäärä (katkos viivassa tarkoittaa, että tieto puuttuu)',
 
		axesDefaults: {
	  	 min: 0,
				max: 25
		},

		seriesDefaults: {       
			breakOnNull: true
		},
					
		series: [
			{ label: 'Pelaajia' },
			{ label: 'Pelien määrä' }
		],

		legend: { 
			show: true,
			location: 'nw',
		},

		axes: {

			xaxis: {
        labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
				tickRenderer: $.jqplot.CanvasAxisTickRenderer,	// Tämä mahdollistaa asteikon arvon kääntämisen kulmassa
				renderer:$.jqplot.DateAxisRenderer, 
				tickOptions:{
					formatString: '%Y-%b-%d',
					angle: -30	// Tämä aiheuttaa virheilmoituksen, koska ilmeisesti ei ole tilaa vaikka gridPaddingillä sitä laittaisi
				},
        min: minPvm,
        max: maxPvm,
        tickInterval:'1 month',				
			},

			yaxis: {
				label: 'pelaajia',
				ticks: [0,5,10,15,20,25],
				tickOptions: { 
					formatString: '%d' 
				}
			},
		},

		highlighter: {
			show: true,
			sizeAdjust: 9,

			tooltipContentEditor: function(str, seriesIndex, pointIndex, jqPlot) {
				var kursori = "";

				// Pelaajien määrä
				if(seriesIndex === 0){
					kursori = str + " pelaajaa";

				} else { // Pelien määrä
					kursori = str + " peliä";
				}
				// Palautus eli mitä näkyy, kun hiirellä osoitetaan kaaviota
				return "<div class='osoitus'>" + kursori + "</div>";			
			}
		},

		cursor:{
      show: true,
      zoom: true,
			showTooltip: false,
    } ,

    // Vertikaalinen viiva, jokaisen vuoden alkuun
		canvasOverlay: {
			show: true,
			objects: vuosiviivatJson
		}
	
	}).replot();	// END $.jqplot()
	
}	// END piirraPelaajat(kaikista vuosista)


// Piirtää pelaajien määrän vuosittain (ei pelien määrää)
function piirraPelaajatVuosittain(){

	// Sanakirja, jossa avain on vuosi 
	var pelaajat = {};

	var tiedot = [];

	// Sählypäivät ja järjestetään ne
	var paivat = Object.keys(sahlyOliot);
	paivat.sort();

	// Jos sählypäiviä ei löytynyt yhtään, piirretään tyhjä kuvaaja ja poistuutaan
	if(Object.keys(sahlyOliot).length < 1){
		var kuvaaja = $.jqplot ('pelaajienLkmId', [[[]], [[]]],{}).replot();
		return;
	}

	// Selvitetään vuodet, jolloin on pelattu
	var vuodet = [];
	for(var i=0; i<paivat.length; i++){
		var vuosi = paivat[i].split("-");

		// Jos ei ole vielä tätä vuotta, otetaan talteen
		if( $.inArray(vuosi[0], vuodet) < 0){
			vuodet.push(vuosi[0]);
		}
	}

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

	
	// Luodaan sanakirjasta taulukko: [vuosi2012, vuosi2013, vuosi2014, vuosi2015, vuosi2016]
	for(var vuosi in pelaajat){
		tiedot.push(pelaajat[vuosi]);
	}

	// Luodaan selitteet ja niiden värit
	var selitteet = [];
	var kaikkiVarit = ['#ff0080', '#85802b', '#00749F','#FFFF00', '#000000', '#00FF00','#ff6600', '#ff0000'];
	var varit = [];
	for(var i=0; i<vuodet.length; i++){
		selitteet.push("Vuosi " + vuodet[i]);
		varit[i] = kaikkiVarit[i];
	}

	$.jqplot ('pelaajienLkmId', tiedot,{

		// Animaatio päällä
		animate: true,
		// Tekee animaation
		animateReplot: true,

		title:'Pelaajat vuosittain (katkos viivassa tarkoittaa, että tieto puuttuu)',	
		seriesColors: varit,
		seriesDefaults: {       
			breakOnNull: true
		},					

		legend: { 
			show: true,
			location: 'nw',
			labels: selitteet
		},

		axes: {
		
			xaxis: {
				labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
				tickRenderer: $.jqplot.CanvasAxisTickRenderer, // Tämä mahdollistaa asteikon arvon kääntämisen kulmassa
				tickOptions:{
					formatString: '%b-%d',
					angle: -30 // Tämä aiheuttaa virheilmoituksen, koska ilmeisesti ei ole tilaa vaikka gridPaddingillä sitä laittaisi
				},
				min: parseDate("01-01"),
				max: parseDate("12-30"),
				renderer:$.jqplot.DateAxisRenderer, 			
        tickInterval:'1 month',		
			},
			yaxis: {
				label:'pelaajia',		 
				ticks: [0,5,10,15,20,25],
				tickOptions: { 
					formatString: '%d' 
				}
			},	
		},	
		highlighter: {
			show: true,
			sizeAdjust: 9,

			tooltipContentEditor: function(str, seriesIndex, pointIndex, jqPlot) {
				var kursori = "";

				// Vuosi 2012
				if(seriesIndex === 0){
					kursori = "2012-" + str + " pelaajaa";

				} else if(seriesIndex === 1){ // Vuosi 2013
					kursori = "2013-" + str + " peliä";

				} else if(seriesIndex === 2){ // Vuosi 2014
					kursori = "2014-" + str + " peliä";

				} else if(seriesIndex === 3){ // Vuosi 2015
					kursori = "2015-" + str + " peliä";

				} else if(seriesIndex === 4){ // Vuosi 2016
					kursori = "2016-" + str + " peliä";

				} else if(seriesIndex === 5){ // Vuosi 2017
					kursori = "2017-" + str + " peliä";

				} else{ // Muut vuodet
					kursori = str + " peliä";
				}

				// Palautus eli mitä näkyy, kun hiirellä osoitetaan kaaviota
				return "<div class='osoitus'>" + kursori + "</div>";			
			}
		},
		cursor:{
			show: true,
			zoom:true,
      showTooltip: false,
    }, 		
	}).replot();	// END $.jqplot()

}	// END piirraPelaajatVuosittain()


// Piirtää pistekuvaajan, jossa x-akseli on pelien määrä ja y-akseli voittoprosentti
function piirraPelienMaaraJaVoittoprosentti(){

	var voittopros = [];
	var pelikerrat = [];

	// Suurin pelattuejn pelien määrä (tarvitaan x-akseliin)
	var maxPeleja = 0;	

	// Kaavioon tuleva data: [pelien määrä][voittoprosentti][nimi]	
	var tulos = new Array();

	var i = 0;
	var j = 0;

	$('#pelaajatTable tr').each(function() {
		//pelikerrat.push($(this).find(".pelikerrat").html());
		//voittopros.push($(this).find(".voittopros").html());        
		if(i > 0 && $(this).is(":visible")){
			tulos[j] = new Array();
			tulos[j][0] = $(this).find(".pelikerrat").html();	
			tulos[j][1] = $(this).find(".voittopros").html();
			tulos[j][2] = $(this).find(".nimi").html();

			// Otetaan ylös, jos pelaaja on pelannut eniten pelejä
			if(parseInt(tulos[j][0]) > maxPeleja){
				maxPeleja = parseInt(tulos[j][0]);
			}

			j++;			
		}

		i++;
	});

	// Pyöristetään seuraavaan kymppiin
	maxPeleja = (Math.round(maxPeleja / 10) * 10 ) + 10;

	// Kaavio, jossa on pelaajien ja pelien lukumäärä ajan funktiona
	var kuvaaja = $.jqplot ('korrelaatioPelitVoittoprosenttiId', [tulos],{

		title:'Pelien määrän ja voittoprosentti',		
					
		series: [
			{ label: 'Pelaajia' ,  showLine:false,  markerOptions: { size: 7, style:"circle" }},
			{ label: 'Pelien määrä' }
		],
	
		axes: {
			xaxis: {
				label: "Pelien lukumäärä",
       	min: 0,
				max: maxPeleja,	
				tickInterval: 10,
        
			},
			yaxis: {
				label: "Voittoprosentti [%]",
       	min: 0,
				max: 110,	
				ticks: [0,10,20,30,40,50,60,70,80,90,100,110],        
			},			
		},

		highlighter: {
			tooltipContentEditor: function(str, seriesIndex, pointIndex, jqPlot) {
    		return "<div class='osoitus'>" + tulos[pointIndex][2] + ", " + tulos[pointIndex][1] + " %</div>";
		},

		show: true,
		showTooltip: true,
		tooltipFade: true,
		sizeAdjust: 9,
		formatString: '%s',
		tooltipLocation: 'n',
		useAxesFormatters: false,
	}	
	}).replot();	// END $.jqplot()
}


function piirraPelienMaaraJaVoittoprosenttiParilleKorostuksella(){
	piirraPelienMaaraJaVoittoprosenttiParille('paritilastoToveriKaavioId', paritSamassa, $('#pelaajatSelectTag2').val());

}


// Piirtää pistekuvaajan, jossa x-akseli on pelien määrä ja y-akseli voittoprosentti
// Parametrit: 'htmlId' = id HTML-tiedostossa, 'taulukko' = data, 'nimi'=nimien sarake, 'x'= x-akselin datan sarake, 'y'=y-akselin datan sarake
function piirraPelienMaaraJaVoittoprosenttiParille(htmlId, data, nimi){

	var voittopros = [];
	var pelikerrat = [];

	// Suurin pelattuejn pelien määrä (tarvitaan x-akseliin)
	var maxPeleja = 0;	

	 data.sort(function(a,b) {
        return a[0]-b[0]
    });

	var valitunTulos = [[]];// = [[30,0,"testi - testi"]];
	var tulos = [[]];
	var nimet = [];

	for(var i=0; i<data.length; i++){

		nimet.push( data[i][2] );
		var pari = data[i][2].split(" - ");

		// Otetaan ylös suurin pelien määrä
		if(maxPeleja < data[i][0]){
			maxPeleja = data[i][0];
		}

		if(nimi.length > 1 && (pari[0] === nimi || pari[1] === nimi) ){
			valitunTulos.push([data[i][0], data[i][1], data[i][2]]);
		} 
		
		tulos.push( [data[i][0], data[i][1], data[i][2]] );		
	}

	// Pyöristetään seuraavaan kymppiin
	maxPeleja = (Math.round(maxPeleja / 10) * 10 ) + 10;

	// Kaavio, jossa on pelaajien ja pelien lukumäärä ajan funktiona
	var kuvaaja = $.jqplot (htmlId, [tulos, valitunTulos],{

		title:'Pelien määrän ja voittoprosentti',		
					
		series: [
			{ label: 'Pelaajia' ,  showLine:false,  markerOptions: { size: 7, style:"circle" }},
			{ label: 'Pelien määrä' }
		],
	
		axes: {
			xaxis: {
				label: "Pelien lukumäärä",
       	min: 0,
				max: maxPeleja,	
				tickInterval: 10,
        
			},
			yaxis: {
				label: "Voittoprosentti [%]",
       	min: 0,
				max: 110,	
				ticks: [0,10,20,30,40,50,60,70,80,90,100,110],        
			},			
		},

		highlighter: {
 
			tooltipContentEditor: function(str, seriesIndex, pointIndex, jqPlot) {

				var kursori = "";

				// Valitun pelaajan parit (keltainen viiva)
				if(jqPlot._plotData[1][pointIndex]){
					kursori += valitunTulos[pointIndex+1][2] + ", " + valitunTulos[pointIndex+1][1] + " %";

				} else { // Kaikki parit (siniset pisteet)
					kursori = tulos[pointIndex+1][2] + ", " + tulos[pointIndex+1][1] + " %";
				}

				// Palautus eli mitä näkyy, kun hiirellä osoitetaan kaaviota
				return "<div class='osoitus'>" + kursori + "</div>";			
		},

		show: true,
		showTooltip: true,
		tooltipFade: true,
		sizeAdjust: 9,
		formatString: '%s',
		tooltipLocation: 'n',
		useAxesFormatters: false,
	}	
	}).replot();	// END $.jqplot()
}



// Palauttaa muodossa Date, kun input on "kuukausi-päivä"
function parseDate(input) {

    var parts = input.split('-');
    return new Date(0, parts[0]-1, parts[1]).getTime();
}
