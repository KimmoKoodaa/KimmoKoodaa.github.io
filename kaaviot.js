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
				//label:'Voittoprosentti [%]',	
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


// UUSI:
// Piirtää pelaajien määrän ja pelien määrän viikoittain
// data: pvm, pelaajien lukumäärä, pelien lukumäärä, maalivahtien määrä
function piirraPelaajatViikoittain(data){

	// Kuvaajassa on pystyviiva jokaisen vuoden alussa.
	// Tämä on sen viivan paksuus
	var vuosierotinPaksuus = 1.3;

	// Jos yhtään päivää ei löytynyt, piirretään tyhjä kuvaaja ja poistuutaan
	if( data.length < 1){
		var kuvaaja = $.jqplot ('pelaajienLkmId', [null, null],{}).replot();
		return;
	}	

	// 2D taulukko pelien määrästä: [pvm, pelien määrä] 	
	var pelit = data.map(function(value,index) { return [value[0], value[3]]; });

	// Selvitetään ensimmäinen ja viimeinen päivämäärä
	var minPvm = data[0][0];
	var maxPvm = data[data.length-1][0];

	// Selvitetään minkä aikavälin välein merkitään x-asteikko (viikon välein, kuukauden välein, 3 kk välein, jne.)
	var xTick = getTickVali(minPvm, maxPvm); 

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
	var kuvaaja = $.jqplot ('pelaajienLkmId', [data, pelit],{

		// Animaatio päällä
		animate: true,
		// Tekee animaation
		animateReplot: true,

		title:'Pelaajien ja pelien lukumäärä (katkos viivassa tarkoittaa, että tieto puuttuu)',
 
		axesDefaults: {
			min: 0,
			max: 25,
			tickOptions: {
				fontSize: '12pt'
			}
		},

		seriesDefaults: {       
			breakOnNull: true
		},
					
		series: [
			{ label: 'Pelaajia' },
			{ label: 'Maalivahtien määrä' }
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
        tickInterval: xTick,				
			},

			yaxis: {
				//label: '',
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
}


// Palautta aika-asteikon, jonka välein x-arvot (eli tick) piirretään.
// Eli kerran viikossa, kuukaudesaa, kolmessa kuukaudessa, jne.
function getTickVali(pvm1, pvm2){

	var p1 = new Date(pvm1 + ' 00:00:00');
	var p2 = new Date(pvm2 + ' 00:00:00');

	// Aikaero vuorokausina
	var erotus = (p2-p1)/(1000*3600*24);

	// Jos aikaero on alle noin 3 kuukautta (12 vk), asteikko on viikko
	if(erotus < 100){
		return '1 week';

	} else if(erotus < 400){	// Jos on alle reilu vuosi, asteikko on kuukausi
		return '1 month';

	} else {	// Muuten 3 kuukautta
			return '3 month';
	}
}


// ALkuperäinen:
// Piirtää pelaajien määrän ja pelien määrän yhtenä viivakaaviona kaikista vuosista
function piirraPelaajat(){

	// Kuvaajassa on pystyviiva jokaisen vuoden alussa.
	// Tämä on sen viivan paksuus
	var vuosierotinPaksuus = 1.3;

	var pelaajaLkm = getPelaajienMaaratData();
	var peleja = getPelienMaaratData();

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
		animate: false,
		// Tekee animaation
		animateReplot: false,

		title:'Pelaajien ja pelien lukumäärä (katkos viivassa tarkoittaa, että tieto puuttuu)',
 
		axesDefaults: {
			min: 0,
			max: 25,
			tickOptions: {
				fontSize: '12pt'
			}
		},

		seriesDefaults: {       
			breakOnNull: true
		},
					
		series: [
			{ label: 'Pelaajia' },
			{ label: 'Maalivahtien määrä' }
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
				//label: 'pelaajia',
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


// Piirtää pelaajien määrän vuosittain eli yksi viiva per vuosi (ei pelien määrää)
function piirraPelaajatVuosittain(){

		// Jos sählypäiviä ei löytynyt yhtään, piirretään tyhjä kuvaaja ja poistuutaan
	if(Object.keys(sahlyOliot).length < 1){
		var kuvaaja = $.jqplot ('pelaajienLkm2Id', [[[]], [[]]],{}).replot();
		return;
	}

	var vuodet = getPelatutVuodet();
	var tiedot = getPelaajienMaaratVuosittainData(vuodet);

	// Luodaan selitteet ja niiden värit
	var selitteet = [];
	var kaikkiVarit = ['#ff0080', '#85802b', '#00749F','#FFA500', '#000000', '#00FF00','#ff6600', '#ff0000'];
	var varit = [];
	for(var i=0; i<vuodet.length; i++){
		selitteet.push("Vuosi " + vuodet[i]);
		varit[i] = kaikkiVarit[i];
	}

	var kuukaudet = ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kesäkuu','Heinäkuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'];

	$.jqplot ('pelaajienLkm2Id', tiedot,{

		// Animaatio päällä
		animate: true,
		// Tekee animaation
		animateReplot: true,

		title:'Pelaajat vuosittain (katkos viivassa tarkoittaa, että tieto puuttuu)',	
		seriesColors: varit,
		seriesDefaults: {       
			breakOnNull: true,

		},		
		axesDefaults: {
			tickOptions: {
			fontSize: '12pt'
			}
    },			

		legend: { 
			show: true,
			location: 'nw',
			labels: selitteet
		},

		axes: {
		
			xaxis: {
	/*			renderer: $.jqplot.CategoryAxisRenderer,
				min: 1,
				max: 13,
        tickInterval: 1,
				ticks: kuukaudet,	
*/
				labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
				tickRenderer: $.jqplot.CanvasAxisTickRenderer, // Tämä mahdollistaa asteikon arvon kääntämisen kulmassa
				tickOptions:{
					formatString: '1. %Bta',//'%b-%d',
					angle: -30 // Tämä aiheuttaa virheilmoituksen, koska ilmeisesti ei ole tilaa vaikka gridPaddingillä sitä laittaisi
				},
				min: parseDate("01-01"),
				max: parseDate("12-30"),
				renderer:$.jqplot.DateAxisRenderer, 			
        tickInterval:'1 month',		
			//ticks: kuukaudet,	
			},
			yaxis: {
				//label:'pelaajia',		 
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

				var vuosi = seriesIndex+2012;
				kursori = vuosi + "-" + str + " pelaajaa";
	
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

function piirraPelaajatKuukaudenKeskiarvo(){
		
	// Luodaan 2D-taulukko pelaajien kuukausittaisesta keskiarvosta
	// sarakkeet: [vvvv-kk, pelaajien ka]
	var pelaajatKa = new Array();

	// Sanakirja pelaajien määristä kuukausittain
	// avain: vvvv-kk ja arvo: [taulukko jossa pelaajien määrä]
	var pelaajatVKK = {}; 

	// Selvitetään ensimmäinen ja viimeinen päivämäärä
	var minPvm = Object.keys(sahlyOliot).sort()[0];
	var maxPvm = Object.keys(sahlyOliot).sort()[Object.keys(sahlyOliot).length-1];
	var apu = minPvm.split("-");
	var vuosi1 = parseInt(apu[0]);
	apu = maxPvm.split("-");
	var vuosi2 = parseInt(apu[0]);

	var vuodet = [];

	// Luodaan 2D-taulukko
	// Rivi 1, 12 saraketta: Kussakin solussa ensimmäisen vuoden yhden kuukauden keskimääräinen pelaajamäärä
	// Rivi 2, 12 saraketta: Toisen vuoden tiedot
	// Rivi 3, ...
	// Jokaiselle vuodelle yksi rivi
	var data = new Array( (vuosi2 - vuosi1) + 1 );

	// Jokaiselle vuodelle 12 saraketta eli 1 per kuukausi
	for(var i=0; i<data.length; i++){
		data[i] = new Array(12);
		vuodet[i] = vuosi1 + i;
	}

	// Käydään läpi sählykerrat ja luodaan sanakirja, jossa on kuukauden pelaajien määrät taulukossa
	for(var pvm in sahlyOliot){
		
		var aika = pvm.split("-");
		// Aika: vvvv-kk
		var vkk = aika[0] + "-" + aika[1];

		// Jos tämän kuun aikana on jo ollut vähintään yksi peli
		if(vkk in pelaajatVKK){
			// Lisätään taulukkoon tämän pelikerran pelaajien määrä
			pelaajatVKK[vkk].push(sahlyOliot[pvm].getPelaajia());

		} else { // Ensimmäinen merkintä tältä kuulta
			pelaajatVKK[vkk] = Array();
			pelaajatVKK[vkk].push(sahlyOliot[pvm].getPelaajia());
		}
	}

	// Käydään sanakirja läpi ja lasketaan pelaajien kuukausittainen keskiarvo
	for(var aika in pelaajatVKK){

		var summa = 0;
		var lkm = 0;
		var ka = 0;

		// Lasketaan keski
		for(var i=0; i<pelaajatVKK[aika].length; i++){

			if(pelaajatVKK[aika][i]){
				summa += parseInt(pelaajatVKK[aika][i]);
				lkm += 1;
			}
		}

		ka = summa/lkm;
		var a = aika.split("-");
		var aika2 = parseDate(a[1]+ "-" + (parseInt(a[0])-2000));
		var uusi = new Array(aika2, ka);
		pelaajatKa.push( uusi );
		data[parseInt(a[0])-vuosi1][parseInt(a[1])-1] = ka;
	}
	
	// Luodaan selitteet ja niiden värit
	var selitteet = [];
	var kaikkiVarit = ['#ff0080', '#85802b', '#00749F','#FFA500', '#000000', '#00FF00','#ff6600', '#ff0000'];

	for(var i=0; i<vuodet.length; i++){
		selitteet.push("Vuosi " + vuodet[i]);
	}

	var kuukaudet = ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kesäkuu','Heinäkuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'];

	$.jqplot ('pelaajatKuukausittainKaavioId', data,{

		title:'Pelaajien lukumäärien kuukausittaiset keskiarvot vuosittain',	
		seriesColors: kaikkiVarit,
		seriesDefaults: { 
			shadow:false,       
		},					
		axesDefaults: {
			tickOptions: {
			fontSize: '12pt'
			}
    },
		shadow: false,

		legend: { 
			show: true,
			location: 'nw',
			labels: selitteet
		},

		axes: {
		
			xaxis: {
				renderer: $.jqplot.CategoryAxisRenderer,
				min: 1,
				max: 13,
        tickInterval: 1,
				ticks: kuukaudet,	
			},
			yaxis: {
				//label:'pelaajia',		 
				ticks: [0,5,10,15,20,25],
				tickOptions: { 
					formatString: '%d' ,					
				}
			},	
		},	
		highlighter: {
			show: true,
			sizeAdjust: 9,	
		},
		highlighter: {
			show: true,
			sizeAdjust: 9,

			tooltipContentEditor: function(str, seriesIndex, pointIndex, jqPlot) {
				var kursori = "";

				var vuosi = seriesIndex+2012;
				var a = str.split(",");
				kursori =  kuukaudet[parseInt(a[0])-1] + "-" + vuosi + ", " + a[1] + " pelaajaa";
	
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

}//END piirraPelaajatKuukaudenKeskiarvo()


//paritilastoVoitoikkaimmatKaavioId
function piirraVoitoikkaimmatParit(data){

	data.sort(function(a,b) {
		return b[5]-a[5]
	});

	data.sort(function(a,b) {
		return b[1]-a[1]
	});

	// Otetaan 10 menestyksekkäintä paria
	var parit = [];
	var voitot = [];

	for(var i=0; i<10; i++){
		parit[i] = data[i][0];
		voitot[i] = data[i][1];
	}

	// Eniten ja vähiten voittoja
	var minVoittoja = voitot[9]-1;
	var maxVoittoja = voitot[0]+1;

	var asteikko = new Array();
	for(var i=minVoittoja; i<=maxVoittoja; i++){
		asteikko.push(i);
	}

	$.jqplot ('paritilastoVoitoikkaimmatKaavioId', [voitot],{
		seriesDefaults: {
			renderer:$.jqplot.BarRenderer,
			rendererOptions: { barWidth: 25 },
			pointLabels: { show: true }
		},
 
		axes: {
			xaxis: {
				renderer: $.jqplot.CategoryAxisRenderer,
				tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
        tickOptions: {
          angle: -25,
          fontSize: '12pt'
        },
				ticks: parit, 
			},
			yaxis: {
				label:'Voittoja [kpl]',	
				min: minVoittoja,
				max: maxVoittoja,
				ticks: asteikko,
			},
		},
		highlighter: {
			show: true,
			sizeAdjust: 9,

			tooltipContentEditor: function(str, seriesIndex, pointIndex, jqPlot) {
				var kursori = "";

				var vuosi = seriesIndex+2012;
				var a = str.split(",");
				kursori =  parit[parseInt(a[0])-1] + ", " + a[1] + " voittoa";
	
				// Palautus eli mitä näkyy, kun hiirellä osoitetaan kaaviota
				return "<div class='osoitus'>" + kursori + "</div>";			
			}
		},
	}).replot();	// END $.jqplot()
}


// Piirtää pistekuvaajan, jossa x-akseli on pelien määrä ja y-akseli voittoprosentti
function piirraPelienMaaraJaVoittoprosentti(){
//alert("piirretään voittojen määrät");
	var voittopros = [];
	var pelikerrat = [];

	// Suurin pelattuejn pelien määrä (tarvitaan x-akseliin)
	var maxPeleja = 0;	
	// Kaavioon tuleva data: [pelien määrä][voittoprosentti][nimi]	
	var tulos = new Array();

	var i = 0;
	var j = 0;

	$('#kaikkiPelaajatTable').DataTable().rows().eq(0).each( function ( index ) {
    var row = $('#kaikkiPelaajatTable').DataTable().row( index ); 
    var data = row.data();

		tulos[j] = new Array();
			tulos[j][0] = data[2];//$(this).find(".pelikerrat").html();	
			tulos[j][1] = data[13];//$(this).find(".voittopros").html();
			tulos[j][2] = data[0];//$(this).find(".nimi").html();
		
	// Otetaan ylös, jos pelaaja on pelannut eniten pelejä
	if(parseInt(tulos[j][0]) > maxPeleja){
			maxPeleja = parseInt(tulos[j][0]);
		}
	j++;

	} );

	// Pyöristetään seuraavaan kymppiin
	maxPeleja = (Math.round(maxPeleja / 10) * 10 ) + 10;

	// Sortataan, jotta tooltip näyttää oikean henkilön
	tulos.sort(function(a,b) {
		return a[0]-b[0]
	});

	// Kaavio, jossa on pelaajien ja pelien lukumäärä ajan funktiona
	var kuvaaja = $.jqplot ('korrelaatioPelitVoittoprosenttiId', [tulos],{

		title:'Pelien määrän ja voittoprosentti',		
					
		series: [
			{ label: 'Pelaajia' ,  showLine:false,  markerOptions: { size: 7, style:"circle" }},
			{ label: 'Maalivahtien määrä' }
		],
	
		axes: {
			xaxis: {
				label: "Pelien lukumäärä",
       	min: 0,
				max: maxPeleja,	
				tickInterval: 10,
        
			},
			yaxis: {
				//label: "Voittoprosentti [%]",
       	min: 0,
				max: 110,	
				ticks: [0,10,20,30,40,50,60,70,80,90,100,110],        
			},			
		},

		highlighter: {
			tooltipContentEditor: function(str, seriesIndex, pointIndex, jqPlot) {
    		return "<div class='osoitus'>" + tulos[pointIndex][2] + ", " + tulos[pointIndex][1] + " %</div>";
				//return "<div class='osoitus'>str="+str +", seriesIndex=" + seriesIndex +", " + tulos[pointIndex][2] + ", " + tulos[pointIndex][1] + " %</div>";
				//return  [tulos[pointIndex][2] +" ---- " +  tulos[pointIndex][1] ];
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


// Versio 2: data parametrina
// Piirtää pistekuvaajan, jossa x-akseli on pelien määrä ja y-akseli voittoprosentti
function piirraPelienMaaraJaVoittoprosentti2(dataAP){
//alert("piirretään voittojen määrät");
	var voittopros = [];
	var pelikerrat = [];

	// Suurin pelattuejn pelien määrä (tarvitaan x-akseliin)
	var maxPeleja = 0;	

	// Kaavioon tuleva data: [pelien määrä][voittoprosentti][nimi]	
	var tulos = new Array();
	var i = 0;

	for(var j=0; j<dataAP.length; j++){
		var data = dataAP[j];
		tulos[j] = new Array();
		tulos[j][0] = data[0][2];
		tulos[j][1] = data[0][13];
		tulos[j][2] = data[0][0];
		
		// Otetaan ylös, jos pelaaja on pelannut eniten pelejä
		if(parseInt(tulos[j][0]) > maxPeleja){
			maxPeleja = parseInt(tulos[j][0]);
		}
	}

	// Pyöristetään seuraavaan kymppiin
	maxPeleja = (Math.round(maxPeleja / 10) * 10 ) + 10;

	// Sortataan, jotta tooltip näyttää oikean henkilön
	tulos.sort(function(a,b) {
		return a[0]-b[0]
	});

	// Kaavio, jossa on pelaajien ja pelien lukumäärä ajan funktiona
	var kuvaaja = $.jqplot ('korrelaatioPelitVoittoprosenttiId', [tulos],{

		title:'Pelien määrän ja voittoprosentti',		
					
		series: [
			{ label: 'Pelaajia' ,  showLine:false,  markerOptions: { size: 7, style:"circle" }},
			{ label: 'Maalivahtien määrä' }
		],
	
		axes: {
			xaxis: {
				label: "Pelien lukumäärä",
       	min: 0,
				max: maxPeleja,	
				tickInterval: 10,
        
			},
			yaxis: {
				//label: "Voittoprosentti [%]",
       	min: 0,
				max: 110,	
				ticks: [0,10,20,30,40,50,60,70,80,90,100,110],        
			},			
		},

		highlighter: {
			tooltipContentEditor: function(str, seriesIndex, pointIndex, jqPlot) {
				return "<div class='osoitus'>" + tulos[pointIndex][2] + ", " + tulos[pointIndex][1] + " %</div>";
    		//return "<div class='osoitus'>" + " "+ pointIndex+"," + tulos[pointIndex][2] + ", " + tulos[pointIndex][1] + " %</div>";
				//return "<div class='osoitus'>str="+str +", seriesIndex=" + seriesIndex +", " + tulos[pointIndex][2] + ", " + tulos[pointIndex][1] + " %</div>";
				//return  [tulos[pointIndex][2] +" ---- " +  tulos[pointIndex][1] ];
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
	// paritSamassa on tiedostossa main.js. Se on taulukko, jonka yksi rivi sisältää taulukon: [ voittoprosentti, pelien määrä, nimi1-nimi2]
	piirraPelienMaaraJaVoittoprosenttiParille('paritilastoToveriKaavioId', paritSamassa, $('#pelaajatSelectTag2').val());
}


// Piirtää pistekuvaajan, jossa x-akseli on pelien määrä ja y-akseli voittoprosentti
// Parametrit: 'htmlId' = id HTML-tiedostossa, 'data' = taulukko jossa yksi rivi [ voittoprosentti, pelien määrä, nimi1-nimi2], 
// 'nimi'=nimien sarake
function piirraPelienMaaraJaVoittoprosenttiParille(htmlId, data, nimi){

	//alert("piirraPelienMaaraJaVoittoprosenttiParille(");

	var voittopros = [];
	var pelikerrat = [];

	// Suurin pelattujen pelien määrä (tarvitaan x-akseliin)
	var maxPeleja = 0;	

	// Sortataan taulukko voittoprosentin mukaan
	data.sort(function(a,b) {
		return a[4]-b[4]
	});

	// Taulukko, jossa valitun pelaajan voittoprosentit muiden kanssa (keltainen viiva)
	var valitunTulos = [[]];	// [[pelit, voittoprosentti,"nimi1-nimi2"]];
	// Taulukko, jossa on kaikkien parien voittoprosentit
	var tulos = [[]];

	// Tätä ei ilmeisesti käytetä missään
	var nimet = [];

	for(var i=0; i<data.length; i++){

		// Ei ilmeisesti käytetä:
		nimet.push( data[i][0] );

		var pari = data[i][0].split(" - ");

		// Otetaan ylös suurin pelien määrä
		if(maxPeleja < data[i][4]){
			maxPeleja = data[i][4];
		}

		// Jos funktion parametrina annettu nimi on jompi kumpi nyt löydetystä parista
		if(nimi.length > 1 && (pari[0] === nimi || pari[1] === nimi) ){
			// Lisätään valitun pelaajan tietoihin
			valitunTulos.push([data[i][4], data[i][5], data[i][0]]);
		} 
		
		tulos.push( [data[i][4], data[i][5], data[i][0]] );		
	}

	// uutta 2018:  Sortataan: Tämä ei auta siihen, että näyttää väärän pisteen tiedot 
	//tulos.sort(function(a,b){return a[0]-b[0]});

	// Pyöristetään seuraavaan kymppiin
	maxPeleja = (Math.round(maxPeleja / 10) * 10 ) + 10;

	// Kaavio, jossa on pelaajien ja pelien lukumäärä ajan funktiona
	var kuvaaja = $.jqplot (htmlId, [tulos, valitunTulos],{

		title:'Pelien määrän ja voittoprosentti',		
					
		series: [
			// pointLabels näyttäisi parien nimet pisteen vieressä, mutta pisteitä on niin paljon, että se vain sotkee
			{ label: 'Pelaajia' ,  showLine:false,  markerOptions: { size: 7, style:"circle" } /*, pointLabels: { show:true }*/ },
			{ label: 'Pelien määrä' },
		],
	
		axes: {
			xaxis: {
				label: "Pelien lukumäärä",
       	min: 0,
				max: maxPeleja,	
				tickInterval: 10,        
			},
			yaxis: {
				//label: "Voittoprosentti [%]",
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
