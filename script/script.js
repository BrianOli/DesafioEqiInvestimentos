const btnBrut = document.getElementById('btnBrut');
const btnLiqu = document.getElementById('btnLiqu');

const btnPre = document.getElementById('btnPre');
const btnPos = document.getElementById('btnPos');
const btnFix = document.getElementById('btnFix');

const initCont = document.getElementById('fieldInitContribution');
const monthTerm = document.getElementById('fieldMonthTerms');
const monthCont = document.getElementById('fieldMonthContribuition');
const profit = document.getElementById('fieldProfitability');
let fields = [initCont, monthTerm, monthCont, profit];

const vfb = document.getElementById('valFinBrut'); 1
const air = document.getElementById('aliQuotIr'); 
const vpi = document.getElementById('valPagIR');
const vfl = document.getElementById('valFinLiqu');
const vti = document.getElementById('valTotInv');
const gli = document.getElementById('ganLiqu');
let cards = [vfb, air, vpi, vfl, vti, gli];

const contribuitionBar = document.getElementById('blocksCont');
const noContribuitionBar = document.getElementById('blocksNoCont');
const numbersGraph = document.getElementById('numbersGraph');
let count = 0;

// Rend Buttons
rendType = (type) => {
    let valBrut = false;
    let valLiqu = false;
    switch (type) {
        case 1:
            if (valBrut === false || valLiqu === true) {
                valBrut = true; valLiqu = false;

                btnBrut.style.backgroundColor = "rgb(255, 132, 0)";
                btnLiqu.style.backgroundColor = "#fff";

            } else {
                valBrut = false;
                
                btnBrut.style.backgroundColor = "#fff";
                btnLiqu.style.backgroundColor = "#fff";
            
            }

            break;
            
        case 2:
            if (valLiqu === false || valBrut === true) {
                valLiqu = true; valBrut = false;

                btnBrut.style.backgroundColor = "#fff";
                btnLiqu.style.backgroundColor = "rgb(255, 132, 0)";
            } else {
                valLiqu = false;

                btnBrut.style.backgroundColor = "#fff";
                btnLiqu.style.backgroundColor = "#fff";                
            }

            break;
        
        default:
            break;
    }
}

// Index Buttons
indexType = (type) => {
    let valPre = false;
    let valPos = false
    let valFix = false;
    switch (type) {
        case 1:
            if (valPre === false || valPos || valFix) {
                valPre = true; valPos = false; valFix = false;

                btnPre.style.backgroundColor = "rgb(255, 132, 0)";
                btnPos.style.backgroundColor = "#fff";
                btnFix.style.backgroundColor = "#fff";
                
                return (valPre)
            } else {
                valPre = false;
                btnPre.style.backgroundColor = "#fff";
            }
            break;
        
        case 2:
            if (valPre || valPos === false || valFix) {
                valPre = false; valPos = true; valFix = false;

                btnPos.style.backgroundColor = "rgb(255, 132, 0)";
                btnPre.style.backgroundColor = "#fff";
                btnFix.style.backgroundColor = "#fff";
                
                return (valPos);
            } else {
                valPos = false;
                btnPos.style.backgroundColor = "#fff";
            }
            break;
        
        case 3:
            if (valPre || valPos  || valFix === false) {
                valPre = false; valPos = false; valFix = true;

                btnPos.style.backgroundColor = "#fff";
                btnPre.style.backgroundColor = "#fff";
                btnFix.style.backgroundColor = "rgb(255, 132, 0)";
                
                return (valFix);
            } else {
                valFix = false;
                btnFix.style.backgroundColor = "#fff";
            }
            break;
        default:
            break;
    }
}

// Verify all the input data and show or hide the results area
verifyData = () => {

    let validField = 0;
    fields.forEach(index => {
        
        //Verifica Campos Input
        let errorId = index.id.replace('field', 'span');
        let error = document.getElementById(errorId);
        let title = document.getElementById(index.id.replace('field', 'title'));

        error.style.visibility = 'visible';

        if (index.value === '' || index.value === null) {  
            index.style.borderBottom = '1px solid red';
            error.innerHTML = `Preencha o campo ${title.innerText.split(' ')[0]}.`;
            title.style.color = 'red';
            index.focus();

            

        } else if (isNaN(index.value)) {

            index.style.borderBottom = '1px solid red';
            error.innerHTML = `${title.innerText.split(' ')[0]} deve ser um número.`;   
            title.style.color = 'red';

        } else {

            index.style.borderBottom = '1px solid #959595';
            error.style.visibility = 'hidden';   
            title.style.color = 'rgb(95, 95, 95)';
            validField++;

        }

        //Verifica Buttons
        rendimento();
        indexacao();

        // Verifica dados  /  Mostra Resultados
        if (validField === fields.length && rendimento() !== undefined && indexacao() !== undefined) {
            document.getElementById('showResults').style.visibility = 'visible';
        } else {
            document.getElementById('showResults').style.visibility = 'hidden';
        }
        
        //Get values from API
        getApiRend(rendimento());
        getApiIndex(indexacao());

    });

    getValuesApi(
        getApiRend(rendimento()),
        getApiIndex(indexacao())
    );
    cardsValue();
    graphBars();
}

// Gets the values of the cards from the api and shows then
cardsValue = () => {
    for (let i = 0; i < cards.length; i++) {
        cards[i].innerText = getValuesApi(getApiRend(rendimento()), getApiIndex(indexacao()))[i+2];
    }
}

// Verify the rend Button
rendimento = () => {
    let colorBrut = btnBrut.style.backgroundColor;
    let colorLiqu = btnLiqu.style.backgroundColor;
    let valBrut = false
    let valLiqu = false
    
    if (colorBrut === '' || colorBrut === 'rgb(255,255,255)' && colorLiqu === '' || colorLiqu === 'rgb(255,255,255)') {
        document.getElementById('spanError').innerHTML = 'Informe o tipo de Rendimento.';
    } else{
        document.getElementById('spanError').style.visibility = 'hidden';
        if (colorBrut === 'rgb(255, 132, 0)') {
            valBrut = true;
            return 1;
        } else if (colorLiqu === 'rgb(255, 132, 0)') {
            valLiqu = true;
            return 2;
        }
    }
}

// Verify the index button
indexacao = () => {
    let colorPre = btnPre.style.backgroundColor;
    let colorPos = btnPos.style.backgroundColor;
    let colorFix = btnFix.style.backgroundColor;
    let valPre = false;
    let valPos = false;
    let valFix= false;

    if (colorPre === '' || colorPre === 'rgb(255,255,255)' && colorPos === '' || colorPos === 'rgb(255,255,255)' && colorFix === '' || colorFix === 'rgb(255,255,255)' ) {
        document.getElementById('spanErrorIndex').innerHTML = 'Informe o tipo de Indexação.';
    } else {
        document.getElementById('spanErrorIndex').style.visibility = 'hidden';
        if (colorPre === 'rgb(255, 132, 0)') {
            valPre = true;
            return 1;
        } else if (colorPos === 'rgb(255, 132, 0)') {
            valPos = true;
            return 2;
        } else {
            valFix = true;
            return 3;
        }
    }
}

clearData = () => {
    document.getElementById("form1").reset();
    fixValues();
}

// Create the graph bars
graphBars = () => { 
    let valuesGraphCont = getValuesApi(getApiRend(rendimento()), getApiIndex(indexacao()))[8].comAporte;
    let valuesGraphNoCont = getValuesApi(getApiRend(rendimento()), getApiIndex(indexacao()))[8].semAporte;
    
    Object.keys(valuesGraphCont).forEach(index => {
        let heightBar;

        // Calc for the height of with Contribuition
        heightBar = 0;
        heightBar = (valuesGraphCont[index] - 1000) / 10;
        heightBar = Math.round(heightBar);

        let barsCont = document.createElement('div');
        barsCont.setAttribute('class', 'col-1 graphBlocks bgSecondaryColor');
        barsCont.setAttribute('style', `height: ${heightBar}%`);
        contribuitionBar.appendChild(barsCont);

        // Calc for the height of with no Contribuition
        heightBar = 0;
        heightBar = (valuesGraphNoCont[index] - 1000) / 10;
        heightBar = Math.round(heightBar);

        let barsNoCont = document.createElement('div');
        barsNoCont.setAttribute('class', 'col-1 graphBlocks bgPrimaryColor');
        barsNoCont.setAttribute('style', `height: ${heightBar}%`);
        noContribuitionBar.appendChild(barsNoCont);

        let numGraph = document.createElement('div');
        numGraph.setAttribute('class', 'col-1 graphNumbers');
        numGraph.innerText = `${index}`; 
        numbersGraph.appendChild(numGraph);
        
        // Check if already exists and remove the graph
        if (index > 10 || count !== 0) {
            if (barsCont.closest('#blocksCont') || barsNoCont.closest('#blocksNoCont') || numGraph.closest('#numbersGraph')) {
                contribuitionBar.removeChild(barsCont);
                noContribuitionBar.removeChild(barsNoCont);
                numbersGraph.removeChild(numGraph);
            } 
        }
        
    });  
    
    count++;
    
}
