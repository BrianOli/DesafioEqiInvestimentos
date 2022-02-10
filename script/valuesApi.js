const linkApiInd = 'http://localhost:3000/indicadores';
const linkApiSim = 'http://localhost:3000/simulacoes';

fixValues = () => {
    const ipca = "?nome=ipca";
    let indexIpca = Object.values(JSON.parse(methodGet(`${linkApiInd}${ipca}`))[0]);
    let ipcaId = document.getElementById('ipcaYear')
    let valueIpca = String(indexIpca[1]);
            
    ipcaId.value = valueIpca;
    ipcaId.addEventListener('change', (event) => {
        ipcaId.value = valueIpca;
        alert('This value cannot be changed');
    });
    
    const cdi = "?nome=cdi";
    let indexCdi = Object.values(JSON.parse(methodGet(`${linkApiInd}${cdi}`))[0]);
    let cdiId = document.getElementById('cdiYear')
    let valueCdi = String(indexCdi[1]);
            
    cdiId.value = valueCdi;
    
    cdiId.addEventListener('change', (event) => {
        cdiId.value = valueCdi;
        alert('This value cannot be changed');
    });    
}
fixValues();


getApiRend = (index) => {
    const bruto = "tipoRendimento=bruto";
    const liqui = "tipoRendimento=liquido";
    const auto = null;

    switch (index) {
        case 1:
            return bruto;
        
        case 2:
            return liqui;
        
        default:
            return auto;
    }
}

getApiIndex = (index) => {
    const pre = '?tipoIndexacao=pre'
    const pos = '?tipoIndexacao=pos'
    const fix = '?tipoIndexacao=ipca'
    const auto = null;

    switch (index) {
        case 1:
            return pre;
        
        case 2:
            return pos;
        
        case 3:
            return fix;
        
        default:
            return auto;
    }
}

getValuesApi = (rend, index) => {
    let valuesApi = null;
    let link = null;

    if (index !== null) {
        link = linkApiSim + index + '&' + rend;   
    } else {
        link = linkApiSim;
    }
    valuesApi = Object.values(JSON.parse(methodGet(link))[0]);
    return valuesApi;
}




