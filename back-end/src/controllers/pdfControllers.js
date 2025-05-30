const launchBrowser = require('../utils/puppeteer');
const fs = require('fs');
const path = require('path');

// Função para substituir os placeholders no HTML
const injectDataIntoHTML = (htmlContent, data) => {
    htmlContent = htmlContent.replace(/{{prepostoSelecionado}}/g, data.prepostoSelecionado)
        .replace(/{{nomeCliente}}/g, data.nomeCliente)
        .replace(/{{tipoSeguro}}/g, data.tipoSeguro)
        .replace(/{{dataAtual}}/g, data.dataAtual)
        .replace(/{{idOrcamento}}/g, data.idOrcamento)
        .replace(/{{anoVeiculo}}/g, data.anoVeiculo)
        .replace(/{{modeloVeiculo}}/g, data.modeloVeiculo)
        .replace(/{{nomeVeiculo}}/g, data.descricaoVeiculo)
        .replace(/{{placaVeiculo}}/g, data.placaVeiculo);


    if (data.tipoOrcamentoSelecionado === 'Gestor') {
        gestorDeRisco()();
    } else if (data.tipoOrcamentoSelecionado === 'Menor') {
        menorPreco()();
    }

    function gestorDeRisco() {
        return function () {
            if (data.seguradoraStatus[1] === 0) {
                if (data.semLogoCiaValue === true) {
                    let semLogoCia = `<tr id="tr-subtitulo">
                        <th id="th-coberturas-table-coberturas" class="th-table-coberturas">COBERTURAS E CLÁUSULAS</th>
                        <th id="th-plano-ouro-table-coberturas" class="th-table-coberturas">TOP PREMIUM</th>
                        <th id="th-plano-prata-table-coberturas" class="th-table-coberturas">TOP MASTER</th>
            </tr>`;
                    htmlContent = htmlContent.replace(/{{semLogoCia}}/g, semLogoCia);
                } else {
                    let comLogoCia = `
                <tr id="tr-seguradora-table-coberturas">
                    <th></th>
                    <th colspan="2" id="th-seguradora-table-coberturas" class="th-table-coberturas">
                        <img class="img-logo-seguradora" src="{{base64Imagem}}" alt="logo">
                    </th>
                    </tr>
                    <tr id="tr-subtitulo">
                        <th id="th-coberturas-table-coberturas" class="th-table-coberturas">COBERTURAS E CLÁUSULAS</th>
                        <th id="th-plano-ouro-table-coberturas" class="th-table-coberturas">TOP PREMIUM</th>
                        <th id="th-plano-prata-table-coberturas" class="th-table-coberturas">TOP MASTER</th>
                </tr>`;
                    htmlContent = htmlContent.replace(/{{semLogoCia}}/g, comLogoCia);
                    htmlContent = htmlContent.replace(/{{base64Imagem}}/g, data.base64Imagem[0]);
                };
            } else if (data.seguradoraStatus[1] === 1) {
                let posicaoRecomendada1 = data.seguradoraRecomendada === '1' ? `<tr id="tr-seguradora-table-coberturas">
                                                                            <th></th>
                                                                            <th colspan="4" id="th-seguradora-table-coberturas" class="th-table-coberturas">
                                                                                <div class="div-pai-container-recomendado">
                                                                                    <div class="div-fundo">
                                                                                        <div class="div-filha-container-recomendado">
                                                                                        <i class="fa-solid fa-star"></i>
                                                                                            <p class="p-recomendado">RECOMENDADO</p>
                                                                                            <i class="fa-solid fa-star"></i>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                         </th>` : '';
                let posicaoRecomendada2 = data.seguradoraRecomendada === '2' ? `<tr id="tr-seguradora-table-coberturas">
                                                                            <th></th>
                                                                            <th colspan="4" id="th-seguradora-table-coberturas" class="th-table-coberturas">
                                                                                <div class="div-pai-container-recomendado">
                                                                                    <div class="div-fundo">
                                                                                        <div class="div-filha-container-recomendado">
                                                                                        <i class="fa-solid fa-star"></i>
                                                                                            <p class="p-recomendado">RECOMENDADO</p>
                                                                                            <i class="fa-solid fa-star"></i>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                         </th>` : '';

                let semLogoCia = `
                ${posicaoRecomendada1}
                ${posicaoRecomendada2}
                <tr id="tr-subtitulo" class="tr-subtitulo-margin">
                    <th id="th-coberturas-table-coberturas" class="th-table-coberturas">COBERTURAS E CLÁUSULAS</th>
                    <th id="th-plano-ouro-table-coberturas" class="th-table-coberturas">TOP PREMIUM</th>
                    <th id="th-plano-prata-table-coberturas" class="th-table-coberturas" style="border-right: 2px solid var(--color-logo);">TOP MASTER</th>
                    <th id="th-plano-ouro-table-coberturas" class="th-table-coberturas">TOP PREMIUM</th>
                    <th id="th-plano-prata-table-coberturas" class="th-table-coberturas">TOP MASTER</th>
                </tr>
                `;

                let seguradoraSecundaria = `
            <tr id="tr-seguradora-table-coberturas">
                <th></th>
                <th colspan="2" id="th-seguradora-table-coberturas" class="th-table-coberturas">
                    <img class="img-logo-seguradora" src="{{base64Imagem}}" alt="logo">
                </th>
                <th colspan="2" id="th-seguradora-table-coberturas" class="th-table-coberturas">
                    <img class="img-logo-seguradora-secundaria" src="{{base64ImagemSecundaria}}" alt="logo">
                </th>
            </tr>
            ${posicaoRecomendada1}
            ${posicaoRecomendada2}
            <tr id="tr-subtitulo">
                <th id="th-coberturas-table-coberturas" class="th-table-coberturas">COBERTURAS E CLÁUSULAS</th>
                <th id="th-plano-ouro-table-coberturas" class="th-table-coberturas">TOP PREMIUM</th>
                <th id="th-plano-prata-table-coberturas" class="th-table-coberturas" style="border-right: 2px solid var(--color-logo);">TOP MASTER</th>
                <th id="th-plano-ouro-table-coberturas" class="th-table-coberturas">TOP PREMIUM</th>
                <th id="th-plano-prata-table-coberturas" class="th-table-coberturas">TOP MASTER</th>
            </tr>
        `;

                if (data.semLogoCiaValue === true) {
                    htmlContent = htmlContent.replace(/{{semLogoCia}}/g, semLogoCia);
                } else {
                    htmlContent = htmlContent.replace(/{{semLogoCia}}/g, seguradoraSecundaria);
                    htmlContent = htmlContent.replace(/{{base64Imagem}}/g, data.base64Imagem[0]);
                    htmlContent = htmlContent.replace(/{{base64ImagemSecundaria}}/g, data.base64ImagemSecundaria[0]);
                };
            };


            if (data.seguradoraStatus[1] === 0) {

                // Adicionar coberturas
                let coberturasHTML = '';

                if (data.cobertura1 && data.cobertura1.length > 0) {
                    data.cobertura1.forEach(cobertura1 => {
                        coberturasHTML += `
                <tr>
                    <td>${cobertura1.nome}</td>
                    <td id="td-valor-plano-ouro-table-clausulas">${cobertura1.valorOuro}</td>
                    <td id="td-valor-plano-prata-table-clausulas">${cobertura1.valorPrata}</td>
                </tr>
            `;
                    });
                }

                if (data.coberturas && data.coberturas.length > 0) {
                    data.coberturas.forEach(cobertura => {
                        coberturasHTML += `
                    <tr>
                        <td>${cobertura.nome}</td>
                        <td id="td-valor-plano-ouro-table-coberturas">
                            <div class="div-container-ouro">
                                <div class="div-rs-ouro"><p>R$</p></div>
                                <div class="div-valor-ouro"><p>${cobertura.valorOuro}</p></div>
                            </div>
                        </td>
                        <td id="td-valor-plano-prata-table-coberturas">
                            <div class="div-container-prata">
                                <div class="div-rs-prata"><p>R$</p></div>
                                <div class="div-valor-prata"><p>${cobertura.valorPrata}</p></div>
                            </div>
                        </td>
                    </tr>
                `;
                    });
                }

                // Adicionar clausulas

                if (data.clausulas && data.clausulas.length > 0) {
                    data.clausulas.forEach(clausulas => {
                        coberturasHTML += `
                <tr>
                    <td>${clausulas.nome}</td>
                    <td id="td-valor-plano-ouro-table-clausulas">${clausulas.valorOuro}</td>
                    <td id="td-valor-plano-prata-table-clausulas">${clausulas.valorPrata}</td>
                </tr>
            `;
                    });
                    htmlContent = htmlContent.replace(/{{tabelaCoberturas}}/g, coberturasHTML);
                }

                // Adicionar franquias
                if (data.franquiaChecked) {

                    let thFranquias = `
                <tr id="tr-subtitulo">
                    <th id="th-franquias-table-franquias" class="th-table-franquias">FRANQUIAS</th>
                </tr>
                `;

                    htmlContent = htmlContent.replace(/{{thFranquias}}/g, thFranquias);

                    let tableFranquias = "";

                    tableFranquias += `
                <tr>
                    <td id="td-franquias-table-franquias" class="td-table-franquias">${data.franquiaSelecionada}</td>
                    <td id="td-valor-plano-ouro-table-franquias">
                        <div class="div-container-ouro">
                            <div class="div-rs-ouro"><p>R$</p></div>
                            <div class="div-valor-ouro-franquia"><p>${data.franquiaValorOuro}</p></div>
                        </div>
                    </td>
                    <td id="td-valor-plano-ouro-table-franquias">
                        <div class="div-container-prata">
                            <div class="div-rs-prata"><p>R$</p></div>
                            <div class="div-valor-prata-franquia"><p>${data.franquiaValorPrata}</p></div>
                        </div>
                    </td>
                </tr>
                 `;

                    if (data.franquiaCounter > 0) {
                        for (let i = 0; i < data.franquiaCounter; i++) {
                            franquia = data.franquiasAdicionadas[i];
                            tableFranquias += `
                    <tr>
                        <td id="td-franquias-table-franquias" class="td-table-franquias">${franquia.tipoFranquia}</td>
                        <td id="td-valor-plano-ouro-table-franquias">
                            <div class="div-container-ouro">
                                <div class="div-rs-ouro"><p>R$</p></div>
                                <div class="div-valor-ouro-franquia"><p>${franquia.valorPlanoOuro}</p></div>
                            </div>
                        </td>
                        <td id="td-valor-plano-prata-table-franquias">
                            <div class="div-container-prata">
                                <div class="div-rs-prata"><p>R$</p></div>
                                <div class="div-valor-prata-franquia"><p>${franquia.valorPlanoPrata}</p></div>
                            </div>
                        </td>
                    </tr>
                `;
                        }
                    }

                    htmlContent = htmlContent.replace(/{{tableFranquias}}/g, tableFranquias);
                } else {
                    htmlContent = htmlContent.replace(/{{thFranquias}}/g, '');
                    htmlContent = htmlContent.replace(/{{tableFranquias}}/g, '');
                };

                // Adicionar pagamentos

                let thPagamento = `
        <tr id="tr-subtitulo">
            <th id="th-pagamento-table-pagamento" class="th-table-pagamento">FORMAS DE PAGAMENTO</th>
        </tr>
    `;

                htmlContent = htmlContent.replace(/{{thPagamento}}/g, thPagamento);

                if (data.pagamentos && data.pagamentos.length > 0) {
                    let pagamentosHTML = '';
                    data.pagamentos.forEach(pagamento => {
                        pagamentosHTML += `
                <tr>
                    <td>${pagamento.nome}</td>
                    <td id="td-valor-plano-ouro-table-pagamento">
                        <div class="div-container-ouro-pag">
                            <div class="div-rs-ouro-pag"><p>R$</p></div>
                            <div class="div-valor-ouro-pag"><p>${pagamento.valorOuro}</p></div>
                        </div>
                    </td>
                    <td id="td-valor-plano-prata-table-pagamento">
                        <div class="div-container-prata-pag">
                            <div class="div-rs-prata-pag"><p>R$</p></div>
                            <div class="div-valor-prata-pag"><p>${pagamento.valorPrata}</p></div>
                        </div>
                    </td>
                </tr>
            `;
                    });

                    htmlContent = htmlContent.replace(/{{tabelaPagamentos}}/g, pagamentosHTML);
                }

            } else if (data.seguradoraStatus[1] === 1) {

                // Adicionar coberturas
                let coberturasHTML = ''; // Iniciar a string HTML antes do loop

                if (data.cobertura1 && data.cobertura1.length > 0 && data.coberturaSecundaria1 && data.coberturaSecundaria1.length > 0) {
                    for (let i = 0; i < data.cobertura1.length; i++) {
                        let cobertura1 = data.cobertura1[i];
                        let coberturaSecundaria1 = data.coberturaSecundaria1[i];

                        coberturasHTML += `
                <tr>
                    <td>${cobertura1.nome}</td>
                    <!-- Valor Ouro da clausula -->
                    <td id="td-valor-plano-ouro-clausula-${i}" class="td-valor-clausulas">${cobertura1.valorOuro}</td>
                    <!-- Valor Prata da clausula -->
                    <td id="td-valor-plano-prata-clausula-${i}" class="td-valor-clausulas" style="border-right: 2px solid var(--color-logo);">${cobertura1.valorPrata}</td>
                    <!-- Valor Ouro da clausula secundária -->
                    <td id="td-valor-plano-ouro-secundaria-${i}" class="td-valor-clausulas">${coberturaSecundaria1.valorOuro}</td>
                    <!-- Valor Prata da clausula secundária -->
                    <td id="td-valor-plano-prata-secundaria-${i}" class="td-valor-clausulas">${coberturaSecundaria1.valorPrata}</td>
                </tr>
            `;
                    }
                };

                if (data.coberturas && data.coberturas.length > 0 && data.coberturasSecundaria && data.coberturasSecundaria.length > 0) {
                    // Assumindo que ambos os arrays têm o mesmo número de elementos
                    for (let i = 0; i < data.coberturas.length; i++) {
                        let cobertura = data.coberturas[i];
                        let coberturaSecundaria = data.coberturasSecundaria[i];

                        coberturasHTML += `
                    <tr>
                        <!-- Nome da cobertura -->
                        <td>${cobertura.nome}</td>
                        
                        <!-- Valor Ouro da cobertura -->
                        <td id="td-valor-plano-ouro-${i}">
                            <div class="div-container-ouro">
                                <div class="div-rs-ouro"><p>R$</p></div>
                                <div class="div-valor-ouro"><p>${cobertura.valorOuro}</p></div>
                            </div>
                        </td>
        
                        <!-- Valor Prata da cobertura -->
                        <td id="td-valor-plano-prata-${i}" style="border-right: 2px solid var(--color-logo);">
                            <div class="div-container-prata">
                                <div class="div-rs-prata"><p>R$</p></div>
                                <div class="div-valor-prata"><p>${cobertura.valorPrata}</p></div>
                            </div>
                        </td>
        
                        <!-- Valor Ouro da cobertura secundária -->
                        <td id="td-valor-plano-ouro-secundaria-${i}">
                            <div class="div-container-ouro">
                                <div class="div-rs-ouro"><p>R$</p></div>
                                <div class="div-valor-ouro-secundaria"><p>${coberturaSecundaria.valorOuro}</p></div>
                            </div>
                        </td>
        
                        <!-- Valor Prata da cobertura secundária -->
                        <td id="td-valor-plano-prata-secundaria-${i}">
                            <div class="div-container-prata">
                                <div class="div-rs-prata"><p>R$</p></div>
                                <div class="div-valor-prata-secundaria"><p>${coberturaSecundaria.valorPrata}</p></div>
                            </div>
                        </td>
                    </tr>
                `;
                    }
                }

                if (data.clausulas && data.clausulas.length > 0 && data.clausulasSecundaria && data.clausulasSecundaria.length > 0) {
                    for (let i = 0; i < data.clausulas.length; i++) {
                        let clausulas = data.clausulas[i];
                        let clausulasSecundaria = data.clausulasSecundaria[i];

                        coberturasHTML += `
                <tr>
                    <td>${clausulas.nome}</td>
                    <!-- Valor Ouro da clausula -->
                    <td id="td-valor-plano-ouro-clausula-${i}" class="td-valor-clausulas">${clausulas.valorOuro}</td>
                    <!-- Valor Prata da clausula -->
                    <td id="td-valor-plano-prata-clausula-${i}" class="td-valor-clausulas" style="border-right: 2px solid var(--color-logo);">${clausulas.valorPrata}</td>
                    <!-- Valor Ouro da clausula secundária -->
                    <td id="td-valor-plano-ouro-secundaria-${i}" class="td-valor-clausulas">${clausulasSecundaria.valorOuro}</td>
                    <!-- Valor Prata da clausula secundária -->
                    <td id="td-valor-plano-prata-secundaria-${i}" class="td-valor-clausulas">${clausulasSecundaria.valorPrata}</td>
                </tr>
            `;
                    }

                    htmlContent = htmlContent.replace(/{{tabelaCoberturas}}/g, coberturasHTML);
                }

                // Adicionar franquias
                if (data.franquiaChecked) {

                    let thFranquias = `
            <tr id="tr-subtitulo">
                <th id="th-franquias-table-franquias" class="th-table-franquias">FRANQUIAS</th>
            </tr>
        `;

                    htmlContent = htmlContent.replace(/{{thFranquias}}/g, thFranquias);

                    let franquiasHTML = ''; // Iniciar a string HTML antes do loop
                    for (let i = 0; i < data.franquiasSecundaria.length; i++) {
                        let franquiasSecundaria = data.franquiasSecundaria[i];

                        franquiasHTML += `
                <tr>
                    <td id="td-franquias-table-franquias" class="td-table-franquias">${data.franquiaSelecionada}</td>
                    <td id="td-valor-plano-ouro-table-franquias">
                        <div class="div-container-ouro">
                            <div class="div-rs-ouro"><p>R$</p></div>
                            <div class="div-valor-ouro-franquia"><p>${data.franquiaValorOuro}</p></div>
                        </div>
                    </td>
                    <td id="td-valor-plano-prata-table-franquias" style="border-right: 2px solid var(--color-logo);">
                        <div class="div-container-prata">
                            <div class="div-rs-prata"><p>R$</p></div>
                            <div class="div-valor-prata-franquia"><p>${data.franquiaValorPrata}</p></div>
                        </div>
                    </td>
                    <td id="td-valor-plano-ouro-table-franquias">
                        <div class="div-container-ouro">
                            <div class="div-rs-ouro"><p>R$</p></div>
                            <div class="div-valor-ouro-franquia1"><p>${franquiasSecundaria.valorOuro}</p></div>
                        </div>
                    </td>
                    <td id="td-valor-plano-prata-table-franquias">
                        <div class="div-container-prata">
                            <div class="div-rs-prata"><p>R$</p></div>
                            <div class="div-valor-prata-franquia1"><p>${franquiasSecundaria.valorPrata}</p></div>
                        </div>
                    </td>
                </tr>
        `;
                    }

                    if (data.franquiaCounter > 0) {
                        for (let i = 0; i < data.franquiaCounter; i++) {
                            franquia = data.franquiasAdicionadas[i];
                            franquiasHTML += `
                    <tr>
                        <td id="td-franquias-table-franquias" class="td-table-franquias">${franquia.tipoFranquia}</td>
                        <td id="td-valor-plano-ouro-table-franquias">
                            <div class="div-container-ouro">
                                <div class="div-rs-ouro"><p>R$</p></div>
                                <div class="div-valor-ouro-franquia"><p>${franquia.valorPlanoOuro}</p></div>
                            </div>
                        </td>
                        <td id="td-valor-plano-prata-table-franquias" style="border-right: 2px solid var(--color-logo);">
                            <div class="div-container-prata">
                                <div class="div-rs-prata"><p>R$</p></div>
                                <div class="div-valor-prata-franquia"><p>${franquia.valorPlanoPrata}</p></div>
                            </div>
                        </td>
                        <td id="td-valor-plano-ouro-table-franquias">
                            <div class="div-container-ouro">
                                <div class="div-rs-ouro"><p>R$</p></div>
                                <div class="div-valor-ouro-franquia1"><p>${franquia.valorPlanoOuroExtra}</p></div>
                            </div>
                        </td>
                        <td id="td-valor-plano-prata-table-franquias">
                            <div class="div-container-prata">
                                <div class="div-rs-prata"><p>R$</p></div>
                                <div class="div-valor-prata-franquia1"><p>${franquia.valorPlanoPrataExtra}</p></div>
                            </div>
                        </td>
                    </tr>
                `;
                        }
                    }

                    htmlContent = htmlContent.replace(/{{tableFranquias}}/g, franquiasHTML);
                } else {
                    htmlContent = htmlContent.replace(/{{thFranquias}}/g, '');
                    htmlContent = htmlContent.replace(/{{tableFranquias}}/g, '');
                };

                let thPagamento = `
            <tr id="tr-subtitulo">
                <th id="th-pagamento-table-pagamento" class="th-table-pagamento">FORMAS DE PAGAMENTO</th>
            </tr>
        `;

                htmlContent = htmlContent.replace(/{{thPagamento}}/g, thPagamento);


                // Adicionar Pagamentos
                if (data.pagamentos && data.pagamentos.length > 0 && data.pagamentoSecundaria && data.pagamentoSecundaria.length > 0) {
                    let pagamentosHTML = '';
                    // Assumindo que ambos os arrays têm o mesmo número de elementos
                    for (let i = 0; i < data.pagamentos.length; i++) {
                        let pagamento = data.pagamentos[i];
                        let pagamentosSecundaria = data.pagamentoSecundaria[i];
                        pagamentosHTML += `
                <tr>
                    <td>${pagamento.nome}</td>
                    <td id="td-valor-plano-ouro-table-pagamento-${i}" class="td-valor-pagamento">
                        <div class="div-container-ouro-pag">
                            <div class="div-rs-ouro-pag"><p>R$</p></div>
                            <div class="div-valor-ouro-pag"><p>${pagamento.valorOuro}</p></div>
                        </div>
                    </td>
                    <td id="td-valor-plano-prata-table-pagamento-${i}" class="td-valor-pagamento" style="border-right: 2px solid var(--color-logo);">
                        <div class="div-container-prata-pag">
                            <div class="div-rs-prata-pag"><p>R$</p></div>
                            <div class="div-valor-prata-pag"><p>${pagamento.valorPrata}</p></div>
                        </div>
                    </td>
                    <td id="td-valor-plano-ouro-table-pagamento-secundaria-${i}" class="td-valor-pagamento">
                        <div class="div-container-ouro-pag">
                            <div class="div-rs-ouro-pag"><p>R$</p></div>
                            <div class="div-valor-ouro-secundaria-pag"><p>${pagamentosSecundaria.valorOuro}</p></div>
                        </div>
                    </td>
                    <td id="td-valor-plano-prata-table-pagamento-secundaria-${i}" class="td-valor-pagamento">
                        <div class="div-container-prata-pag">
                            <div class="div-rs-prata-pag"><p>R$</p></div>
                            <div class="div-valor-prata-secundaria-pag"><p>${pagamentosSecundaria.valorPrata}</p></div>
                        </div>
                    </td>
                </tr>
            `;
                    };

                    htmlContent = htmlContent.replace(/{{tabelaPagamentos}}/g, pagamentosHTML);

                };

            };
        };
    };

    function menorPreco() {
        return function () {
            if (data.seguradoraStatusGrMn[1] === 0) {
                if (data.semLogoCiaValue === true) {
                    let semLogoCia = `<tr id="tr-subtitulo">
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas">COBERTURAS</th>
                            </tr>`;
                    htmlContent = htmlContent.replace(/{{semLogoCia}}/g, semLogoCia);
                } else {
                    let comLogoCia = `
                    <tr id="tr-seguradora-table-coberturas">
                        <th id="th-coberturas-table-coberturas" class="th-table-coberturas" style="vertical-align: bottom;">COBERTURAS E CLÁUSULAS</th>
                        <th colspan="2" id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                            <img class="img-logo-seguradora" src="{{base64Imagem}}" alt="logo">
                        </th>
                    </tr>`;
                    htmlContent = htmlContent.replace(/{{semLogoCia}}/g, comLogoCia);
                    htmlContent = htmlContent.replace(/{{base64Imagem}}/g, data.base64Imagem[0]);
                };

                let coberturasHTML = '';

                if (data.cobertura1MenorPreco && data.cobertura1MenorPreco.length > 0) {
                    data.cobertura1MenorPreco.forEach(cobertura1MenorPreco => {
                        coberturasHTML += `
                        <tr>
                            <td style="border-right: 2px solid var(--color-logo);">${cobertura1MenorPreco.nome}</td>
                            <td id="td-valor-plano-ouro-table-clausulas">${cobertura1MenorPreco.valor}</td>
                        </tr>
                    `;
                    });
                };

                if (data.coberturasMenorPreco && data.coberturasMenorPreco.length > 0) {
                    data.coberturasMenorPreco.forEach(coberturasMenorPreco => {
                        coberturasHTML += `
                            <tr>
                                <td style="border-right: 2px solid var(--color-logo);">${coberturasMenorPreco.nome}</td>
                                <td id="td-valor-plano-ouro-table-coberturas">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual"><p>${coberturasMenorPreco.valor}</p></div>
                                    </div>
                                </td>
                            </tr>
                        `;
                    });
                };

                // Adicionar clausulas

                if (data.clausulasMenorPreco && data.clausulasMenorPreco.length > 0) {
                    data.clausulasMenorPreco.forEach(clausulasMenorPreco => {
                        coberturasHTML += `
                        <tr>
                            <td style="border-right: 2px solid var(--color-logo);">${clausulasMenorPreco.nome}</td>
                            <td id="td-valor-plano-ouro-table-clausulas">${clausulasMenorPreco.valor}</td>
                        </tr>
                    `;
                    });
                    htmlContent = htmlContent.replace(/{{tabelaCoberturas}}/g, coberturasHTML);
                };

                // Adicionar franquias
                if (data.franquiaChecked) {

                    let thFranquias = `
                        <tr id="tr-subtitulo">
                            <th id="th-franquias-table-franquias" class="th-table-franquias">FRANQUIAS</th>
                        </tr>
                    `;

                    htmlContent = htmlContent.replace(/{{thFranquias}}/g, thFranquias);

                    let tableFranquias = '';

                    tableFranquias += `
                        <tr>
                            <td id="td-franquias-table-franquias" class="td-table-franquias td-valor-franquias" style="border-right: 2px solid var(--color-logo);">${data.franquiaSelecionada}</td>
                            <td id="td-franquias-table-franquias" class="td-valor-franquias">
                                <div class="div-container-ouro">
                                    <div class="div-rs-ouro"><p>R$</p></div>
                                    <div class="div-valor-individual-franquia"><p>${data.franquiaValorIndividual}</p></div>
                                </div>
                            </td>
                        </tr>
                    `;

                    if (data.franquiaCounterIndividual > 0) {
                        for (let i = 0; i < data.franquiaCounterIndividual; i++) {
                            let nomeFranquia = data.nomeFranquia[i];
                            let valorIndividual = data.valorIndividual[i];

                            tableFranquias += `
                                    <tr>
                                        <td id="td-franquias-table-franquias" class="td-table-franquias td-valor-franquias" style="border-right: 2px solid var(--color-logo);">${nomeFranquia.valor}</td>
                                        <td id="td-franquias-table-franquias" class="td-valor-franquias">
                                            <div class="div-container-ouro">
                                                <div class="div-rs-ouro"><p>R$</p></div>
                                                <div class="div-valor-individual-franquia"><p>${valorIndividual.valor}</p></div>
                                            </div>
                                        </td>
                                    </tr>
                                `;
                        };
                    };

                    htmlContent = htmlContent.replace(/{{tableFranquias}}/g, tableFranquias);
                } else {
                    htmlContent = htmlContent.replace(/{{thFranquias}}/g, '');
                    htmlContent = htmlContent.replace(/{{tableFranquias}}/g, '');
                };

                // Adicionar pagamentos

                let thPagamento = `
                        <tr id="tr-subtitulo">
                            <th id="th-pagamento-table-pagamento" class="th-table-pagamento">FORMAS DE PAGAMENTO</th>
                        </tr>
                    `;

                htmlContent = htmlContent.replace(/{{thPagamento}}/g, thPagamento);

                if (data.pagamentosMenorPreco && data.pagamentosMenorPreco.length > 0) {
                    let pagamentosHTML = '';
                    data.pagamentosMenorPreco.forEach(pagamentosMenorPreco => {
                        pagamentosHTML += `
                        <tr>
                            <td style="border-right: 2px solid var(--color-logo);">${pagamentosMenorPreco.nome}</td>
                            <td id="td-valor-plano-ouro-table-pagamento" class="td-valor-pagamento">
                                <div class="div-container-ouro-pag">
                                    <div class="div-rs-ouro-pag"><p>R$</p></div>
                                    <div class="div-valor-individual-pag"><p>${pagamentosMenorPreco.valor}</p></div>
                                </div>
                            </td>
                        </tr>
                    `;
                    });

                    htmlContent = htmlContent.replace(/{{tabelaPagamentos}}/g, pagamentosHTML);
                }
            } else if (data.seguradoraStatusGrMn[1] === 1) {
                // Adicionar 1 seguradora individual
                let posicaoRecomendada1 = data.seguradoraIndividualRecomendada === '1' ? `<th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                                                                                        <div class="div-pai-container-recomendado">
                                                                                            <div class="div-fundo">
                                                                                                <div class="div-filha-container-recomendado">
                                                                                                <i class="fa-solid fa-star"></i>
                                                                                                    <p class="p-recomendado">RECOMENDADO</p>
                                                                                                    <i class="fa-solid fa-star"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </th>` : '';
                let posicaoRecomendada2 = data.seguradoraIndividualRecomendada === '2' ? `<th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                                                                                        <div class="div-pai-container-recomendado">
                                                                                            <div class="div-fundo">
                                                                                                <div class="div-filha-container-recomendado">
                                                                                                <i class="fa-solid fa-star"></i>
                                                                                                    <p class="p-recomendado">RECOMENDADO</p>
                                                                                                    <i class="fa-solid fa-star"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </th>` : '';
                let comLogoCia = '';
                let semLogoCia = '';

                if (data.seguradoraIndividualRecomendada === '1' || data.seguradoraIndividualRecomendada === '2') {
                    semLogoCia = `
                        <tr id="tr-seguradora-table-coberturas">
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas" style="vertical-align: bottom;">COBERTURAS E CLÁUSULAS</th>
                            ${posicaoRecomendada1}
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                            ${posicaoRecomendada2}
                        </tr>
                    `;

                    comLogoCia = `
                        <tr id="tr-seguradora-table-coberturas">
                            <th></th>
                            <th id="th-seguradora-table-coberturas" class="th-table-coberturas">
                                <img class="img-logo-seguradora" src="{{base64Imagem}}" alt="logo">
                            </th>
                            <th id="th-seguradora-table-coberturas" class="th-table-coberturas">
                                <img class="img-logo-seguradora-secundaria1" src="{{base64ImagemSecundaria1}}" alt="logo">
                            </th>
                        </tr>
                        <tr id="tr-seguradora-table-coberturas">
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas" style="vertical-align: bottom;">COBERTURAS E CLÁUSULAS</th>
                            ${posicaoRecomendada1}
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                            ${posicaoRecomendada2}
                        </tr>
                    `;

                } else {
                    semLogoCia = `
                        <tr id="tr-seguradora-table-coberturas">
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas" style="vertical-align: bottom;">COBERTURAS E CLÁUSULAS</th>
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                         </tr>
                    `;

                    comLogoCia = `
                    <tr id="tr-seguradora-table-coberturas">
                        <th id="th-coberturas-table-coberturas" class="th-table-coberturas" style="vertical-align: bottom;">COBERTURAS E CLÁUSULAS</th>
                        <th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                            <img class="img-logo-seguradora" src="{{base64Imagem}}" alt="logo">
                        </th>
                        <th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                            <img class="img-logo-seguradora-secundaria1" src="{{base64ImagemSecundaria1}}" alt="logo">
                        </th>
                    </tr>
                    `;
                };

                if (data.semLogoCiaValue === true) {
                    htmlContent = htmlContent.replace(/{{semLogoCia}}/g, semLogoCia);
                } else {
                    htmlContent = htmlContent.replace(/{{semLogoCia}}/g, comLogoCia);
                    htmlContent = htmlContent.replace(/{{base64Imagem}}/g, data.base64Imagem[0]);
                    htmlContent = htmlContent.replace(/{{base64ImagemSecundaria1}}/g, data.base64ImagemSecundaria1[0]);
                };

                let coberturasHTML = '';

                if (data.cobertura1MenorPreco && data.cobertura1MenorPreco.length > 0 && data.cobertura1MpFormatado1 && data.cobertura1MpFormatado1.length > 0) {
                    for (let i = 0; i < data.cobertura1MenorPreco.length; i++) {
                        let cobertura1MenorPreco = data.cobertura1MenorPreco[i];
                        let cobertura1MpFormatado1 = data.cobertura1MpFormatado1[i];

                        coberturasHTML += `
                                <tr>
                                    <td style="border-right: 2px solid var(--color-logo);">${cobertura1MenorPreco.nome}</td>
                                    <td class="td-valor-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}" style="border-right: 2px solid var(--color-logo);">${cobertura1MenorPreco.valor}</td>
                                    <td class="td-valor-coberturas" id="td-valor-table-coberturas-${i}">${cobertura1MpFormatado1.valor}</td>
                                </tr>
                            `;
                    };
                };

                if (data.coberturasMenorPreco && data.coberturasMenorPreco.length > 0 && data.coberturasMpFormatado1 && data.coberturasMpFormatado1.length > 0) {

                    for (let i = 0; i < data.coberturasMenorPreco.length; i++) {
                        let coberturasMenorPreco = data.coberturasMenorPreco[i];
                        let coberturasMpFormatado1 = data.coberturasMpFormatado1[i];

                        coberturasHTML += `
                            <tr>
                                <td style="border-right: 2px solid var(--color-logo);">${coberturasMenorPreco.nome}</td>
                                <td class="td-valor-table-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual"><p>${coberturasMenorPreco.valor}</p></div>
                                    </div>
                                </td>

                                <td class="td-valor-table-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-secundaria1"><p>${coberturasMpFormatado1.valor}</p></div>
                                    </div>
                                </td>
                            </tr>
                        `;
                    };
                };

                // Adicionar clausulas

                if (data.clausulasMenorPreco && data.clausulasMenorPreco.length > 0 && data.clausulasMpFormatado1 && data.clausulasMpFormatado1.length > 0) {
                    for (let i = 0; i < data.clausulasMenorPreco.length; i++) {
                        let clausulasMenorPreco = data.clausulasMenorPreco[i];
                        let clausulasMpFormatado1 = data.clausulasMpFormatado1[i];

                        coberturasHTML += `
                                <tr>
                                    <td style="border-right: 2px solid var(--color-logo);">${clausulasMenorPreco.nome}</td>
                                    <td class="td-valor-clausulas td-valor-cobertura-clausula" id="td-valor-table-clausulas-${i}" style="border-right: 2px solid var(--color-logo);">${clausulasMenorPreco.valor}</td>
                                    <td class="td-valor-clausulas td-valor-cobertura-clausula" id="td-valor-table-clausulas-${i}">${clausulasMpFormatado1.valor}</td>
                                </tr>
                                `;
                    };
                    htmlContent = htmlContent.replace(/{{tabelaCoberturas}}/g, coberturasHTML);
                };

                // Adicionar franquias
                if (data.franquiaChecked) {

                    let thFranquias = `
                        <tr id="tr-subtitulo">
                            <th id="th-franquias-table-franquias" class="th-table-franquias">FRANQUIAS</th>
                        </tr>
                    `;

                    htmlContent = htmlContent.replace(/{{thFranquias}}/g, thFranquias);

                    let tableFranquias = '';

                    for (let i = 0; i < data.franquiasMpFormatado1.length; i++) {
                        let franquiasMpFormatado1 = data.franquiasMpFormatado1[i];

                        tableFranquias += `
                            <tr>
                                <td id="td-franquias-table-franquias" class="td-table-franquias" style="border-right: 2px solid var(--color-logo);">${data.franquiaSelecionada}</td>
                                <td id="td-franquias-table-franquias" class="td-valor-franquias" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia"><p>${data.franquiaValorIndividual}</p></div>
                                    </div>
                                </td>
                                <td id="td-franquias-table-franquias" class="td-valor-franquias">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia1"><p>${franquiasMpFormatado1.valor}</p></div>
                                    </div>
                                </td>
                            </tr>
                        `;
                    };

                    if (data.franquiaCounterIndividual > 0) {
                        for (let i = 0; i < data.franquiaCounterIndividual; i++) {
                            let nomeFranquia = data.nomeFranquia[i];
                            let valorIndividual = data.valorIndividual[i];
                            let valoresInputsDemaisSeguradoras1 = data.valoresInputsDemaisSeguradoras1[i];

                            tableFranquias += `
                                <tr>
                                    <td id="td-franquias-table-franquias" class="td-table-franquias" style="border-right: 2px solid var(--color-logo);">${nomeFranquia.valor}</td>
                                    <td id="td-franquias-table-franquias" class="td-valor-franquias" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia"><p>${valorIndividual.valor}</p></div>
                                    </div>
                                </td>
                                <td id="td-franquias-table-franquias" class="td-valor-franquias">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia1"><p>${valoresInputsDemaisSeguradoras1.valor}</p></div>
                                    </div>
                                </td>
                                </tr>
                            `;
                        };
                    };

                    htmlContent = htmlContent.replace(/{{tableFranquias}}/g, tableFranquias);
                } else {
                    htmlContent = htmlContent.replace(/{{thFranquias}}/g, '');
                    htmlContent = htmlContent.replace(/{{tableFranquias}}/g, '');
                };

                // Adicionar pagamentos

                let thPagamento = `
                        <tr id="tr-subtitulo">
                            <th id="th-pagamento-table-pagamento" class="th-table-pagamento">FORMAS DE PAGAMENTO</th>
                        </tr>
                    `;

                htmlContent = htmlContent.replace(/{{thPagamento}}/g, thPagamento);

                if (data.pagamentosMenorPreco && data.pagamentosMenorPreco.length > 0 && data.pagamentoMpFormatado1 && data.pagamentoMpFormatado1.length > 0) {
                    let pagamentosHTML = '';

                    for (let i = 0; i < data.pagamentosMenorPreco.length; i++) {
                        let pagamentosMenorPreco = data.pagamentosMenorPreco[i];
                        let pagamentoMpFormatado1 = data.pagamentoMpFormatado1[i];

                        pagamentosHTML += `
                                <tr>
                                    <td style="border-right: 2px solid var(--color-logo);">${pagamentosMenorPreco.nome}</td>
                                    <td id="td-valor-plano-ouro-table-pagamento-${i}" class="td-valor-pagamento" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro-pag">
                                        <div class="div-rs-ouro-pag"><p>R$</p></div>
                                        <div class="div-valor-individual-pag"><p>${pagamentosMenorPreco.valor}</p></div>
                                    </div>
                                    </td>
                                    <td id="td-valor-plano-ouro-table-pagamento-${i}" class="td-valor-pagamento">
                                    <div class="div-container-ouro-pag">
                                        <div class="div-rs-ouro-pag"><p>R$</p></div>
                                        <div class="div-valor-individual-pag-secundaria1"><p>${pagamentoMpFormatado1.valor}</p></div>
                                    </div>
                                    </td>
                                </tr>
                            `;
                    };

                    htmlContent = htmlContent.replace(/{{tabelaPagamentos}}/g, pagamentosHTML);
                };
            } else if (data.seguradoraStatusGrMn[1] === 2) {
                // Adicionar 2 seguradoras idividuais
                let posicaoRecomendada1 = data.seguradoraIndividualRecomendada === '1' ? `<th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                                                                                        <div class="div-pai-container-recomendado">
                                                                                            <div class="div-fundo">
                                                                                                <div class="div-filha-container-recomendado">
                                                                                                <i class="fa-solid fa-star"></i>
                                                                                                    <p class="p-recomendado">RECOMENDADO</p>
                                                                                                    <i class="fa-solid fa-star"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </th>` : '';

                let posicaoRecomendada2 = data.seguradoraIndividualRecomendada === '2' ? `<th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                                                                                        <div class="div-pai-container-recomendado">
                                                                                            <div class="div-fundo">
                                                                                                <div class="div-filha-container-recomendado">
                                                                                                <i class="fa-solid fa-star"></i>
                                                                                                    <p class="p-recomendado">RECOMENDADO</p>
                                                                                                    <i class="fa-solid fa-star"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </th>` : '';

                let posicaoRecomendada3 = data.seguradoraIndividualRecomendada === '3' ? `<th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                                                                                        <div class="div-pai-container-recomendado">
                                                                                            <div class="div-fundo">
                                                                                                <div class="div-filha-container-recomendado">
                                                                                                <i class="fa-solid fa-star"></i>
                                                                                                    <p class="p-recomendado">RECOMENDADO</p>
                                                                                                    <i class="fa-solid fa-star"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </th>` : '';

                let comLogoCia = '';
                let semLogoCia = '';

                if (data.seguradoraIndividualRecomendada === '1' || data.seguradoraIndividualRecomendada === '2' || data.seguradoraIndividualRecomendada === '3') {
                    semLogoCia = `
                        <tr id="tr-seguradora-table-coberturas">
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas" style="vertical-align: bottom;">COBERTURAS E CLÁUSULAS</th>
                            ${posicaoRecomendada1}
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                            ${posicaoRecomendada2}
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                            ${posicaoRecomendada3}
                        </tr>
                    `;

                    comLogoCia = `
                    <tr id="tr-seguradora-table-coberturas">
                <th></th>
                <th id="th-seguradora-table-coberturas" class="th-table-coberturas">
                            <img class="img-logo-seguradora" src="{{base64Imagem}}" alt="logo">
                        </th>
                        <th id="th-seguradora-table-coberturas" class="th-table-coberturas">
                            <img class="img-logo-seguradora-secundaria1" src="{{base64ImagemSecundaria1}}" alt="logo">
                        </th>
                        <th id="th-seguradora-table-coberturas" class="th-table-coberturas">
                            <img class="img-logo-seguradora-secundaria2" src="{{base64ImagemSecundaria2}}" alt="logo">
                        </th>
                </tr>
                    <tr id="tr-seguradora-table-coberturas">
                        <th id="th-coberturas-table-coberturas" class="th-table-coberturas" style="vertical-align: bottom;">COBERTURAS E CLÁUSULAS</th>
                        ${posicaoRecomendada1}
                        <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                        ${posicaoRecomendada2}
                        <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                        ${posicaoRecomendada3}
                    </tr>
                    `;

                } else {
                    semLogoCia = `
                        <tr id="tr-seguradora-table-coberturas">
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas" style="vertical-align: bottom;">COBERTURAS E CLÁUSULAS</th>
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                         </tr>
                    `;

                    comLogoCia = `
                    <tr id="tr-seguradora-table-coberturas">
                        <th id="th-coberturas-table-coberturas" class="th-table-coberturas" style="vertical-align: bottom;">COBERTURAS E CLÁUSULAS</th>
                        <th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                            <img class="img-logo-seguradora" src="{{base64Imagem}}" alt="logo">
                        </th>
                        <th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                            <img class="img-logo-seguradora-secundaria1" src="{{base64ImagemSecundaria1}}" alt="logo">
                        </th>
                        <th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                            <img class="img-logo-seguradora-secundaria2" src="{{base64ImagemSecundaria2}}" alt="logo">
                        </th>
                    </tr>
                    `;
                };

                if (data.semLogoCiaValue === true) {
                    htmlContent = htmlContent.replace(/{{semLogoCia}}/g, semLogoCia);
                } else {
                    htmlContent = htmlContent.replace(/{{semLogoCia}}/g, comLogoCia);
                    htmlContent = htmlContent.replace(/{{base64Imagem}}/g, data.base64Imagem[0]);
                    htmlContent = htmlContent.replace(/{{base64ImagemSecundaria1}}/g, data.base64ImagemSecundaria1[0]);
                    htmlContent = htmlContent.replace(/{{base64ImagemSecundaria2}}/g, data.base64ImagemSecundaria2[0]);
                };

                let coberturasHTML = '';

                if (data.cobertura1MenorPreco && data.cobertura1MenorPreco.length > 0 && data.cobertura1MpFormatado1 && data.cobertura1MpFormatado1.length > 0 && data.cobertura1MpFormatado2 && data.cobertura1MpFormatado2.length > 0) {
                    for (let i = 0; i < data.cobertura1MenorPreco.length; i++) {
                        let cobertura1MenorPreco = data.cobertura1MenorPreco[i];
                        let cobertura1MpFormatado1 = data.cobertura1MpFormatado1[i];
                        let cobertura1MpFormatado2 = data.cobertura1MpFormatado2[i];

                        coberturasHTML += `
                                <tr>
                                    <td style="border-right: 2px solid var(--color-logo);">${cobertura1MenorPreco.nome}</td>
                                    <td class="td-valor-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}" style="border-right: 2px solid var(--color-logo);">${cobertura1MenorPreco.valor}</td>
                                    <td class="td-valor-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}" style="border-right: 2px solid var(--color-logo);">${cobertura1MpFormatado1.valor}</td>
                                    <td class="td-valor-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}">${cobertura1MpFormatado2.valor}</td>
                                </tr>
                            `;
                    };
                };

                if (data.coberturasMenorPreco && data.coberturasMenorPreco.length > 0 && data.coberturasMpFormatado1 && data.coberturasMpFormatado1.length > 0 && data.coberturasMpFormatado2 && data.coberturasMpFormatado2.length > 0) {

                    for (let i = 0; i < data.coberturasMenorPreco.length; i++) {
                        let coberturasMenorPreco = data.coberturasMenorPreco[i];
                        let coberturasMpFormatado1 = data.coberturasMpFormatado1[i];
                        let coberturasMpFormatado2 = data.coberturasMpFormatado2[i];

                        coberturasHTML += `
                            <tr>
                                <td style="border-right: 2px solid var(--color-logo);">${coberturasMenorPreco.nome}</td>
                                <td class="td-valor-table-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual"><p>${coberturasMenorPreco.valor}</p></div>
                                    </div>
                                </td>

                                <td class="td-valor-table-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-secundaria1"><p>${coberturasMpFormatado1.valor}</p></div>
                                    </div>
                                </td>

                                <td class="td-valor-table-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-secundaria2"><p>${coberturasMpFormatado2.valor}</p></div>
                                    </div>
                                </td>
                            </tr>
                        `;
                    };
                };

                // Adicionar clausulas

                if (data.clausulasMenorPreco && data.clausulasMenorPreco.length > 0 && data.clausulasMpFormatado1 && data.clausulasMpFormatado1.length > 0 && data.clausulasMpFormatado2 && data.clausulasMpFormatado2.length > 0) {
                    for (let i = 0; i < data.clausulasMenorPreco.length; i++) {
                        let clausulasMenorPreco = data.clausulasMenorPreco[i];
                        let clausulasMpFormatado1 = data.clausulasMpFormatado1[i];
                        let clausulasMpFormatado2 = data.clausulasMpFormatado2[i];

                        coberturasHTML += `
                                <tr>
                                    <td style="border-right: 2px solid var(--color-logo);">${clausulasMenorPreco.nome}</td>
                                    <td class="td-valor-clausulas td-valor-cobertura-clausula" id="td-valor-table-clausulas-${i}" style="border-right: 2px solid var(--color-logo);">${clausulasMenorPreco.valor}</td>
                                    <td class="td-valor-clausulas td-valor-cobertura-clausula" id="td-valor-table-clausulas-${i}" style="border-right: 2px solid var(--color-logo);">${clausulasMpFormatado1.valor}</td>
                                    <td class="td-valor-clausulas td-valor-cobertura-clausula" id="td-valor-table-clausulas-${i}">${clausulasMpFormatado2.valor}</td>
                                </tr>
                                `;
                    };
                    htmlContent = htmlContent.replace(/{{tabelaCoberturas}}/g, coberturasHTML);
                };

                // Adicionar franquias
                if (data.franquiaChecked) {

                    let thFranquias = `
                        <tr id="tr-subtitulo">
                            <th id="th-franquias-table-franquias" class="th-table-franquias">FRANQUIAS</th>
                        </tr>
                    `;

                    htmlContent = htmlContent.replace(/{{thFranquias}}/g, thFranquias);

                    let tableFranquias = '';

                    for (let i = 0; i < data.franquiasMpFormatado1.length; i++) {
                        let franquiasMpFormatado1 = data.franquiasMpFormatado1[i];
                        let franquiasMpFormatado2 = data.franquiasMpFormatado2[i];

                        tableFranquias = `
                            <tr>
                                <td id="td-franquias-table-franquias" class="td-table-franquias" style="border-right: 2px solid var(--color-logo);">${data.franquiaSelecionada}</td>
                                <td id="td-franquias-table-franquias" class="td-valor-franquias" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia"><p>${data.franquiaValorIndividual}</p></div>
                                    </div>
                                </td>
                                <td id="td-franquias-table-franquias" class="td-valor-franquias" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia1"><p>${franquiasMpFormatado1.valor}</p></div>
                                    </div>
                                </td>
                                <td id="td-franquias-table-franquias" class="td-valor-franquias">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia2"><p>${franquiasMpFormatado2.valor}</p></div>
                                    </div>
                                </td>
                            </tr>
                        `;
                    };

                    if (data.franquiaCounterIndividual > 0) {
                        for (let i = 0; i < data.franquiaCounterIndividual; i++) {
                            let nomeFranquia = data.nomeFranquia[i];
                            let valorIndividual = data.valorIndividual[i];
                            let valoresInputsDemaisSeguradoras1 = data.valoresInputsDemaisSeguradoras1[i];
                            let valoresInputsDemaisSeguradoras2 = data.valoresInputsDemaisSeguradoras2[i];

                            tableFranquias += `
                                <tr>
                                    <td id="td-franquias-table-franquias" class="td-table-franquias" style="border-right: 2px solid var(--color-logo);">${nomeFranquia.valor}</td>
                                    <td id="td-franquias-table-franquias" class="td-valor-franquias" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia"><p>${valorIndividual.valor}</p></div>
                                    </div>
                                </td>
                                <td id="td-franquias-table-franquias" class="td-valor-franquias" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia1"><p>${valoresInputsDemaisSeguradoras1.valor}</p></div>
                                    </div>
                                </td>
                                <td id="td-franquias-table-franquias" class="td-valor-franquias">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia2"><p>${valoresInputsDemaisSeguradoras2.valor}</p></div>
                                    </div>
                                </td>
                                </tr>
                            `;
                        };
                    };

                    htmlContent = htmlContent.replace(/{{tableFranquias}}/g, tableFranquias);
                } else {
                    htmlContent = htmlContent.replace(/{{thFranquias}}/g, '');
                    htmlContent = htmlContent.replace(/{{tableFranquias}}/g, '');
                };

                // Adicionar pagamentos

                let thPagamento = `
                        <tr id="tr-subtitulo">
                            <th id="th-pagamento-table-pagamento" class="th-table-pagamento">FORMAS DE PAGAMENTO</th>
                        </tr>
                    `;

                htmlContent = htmlContent.replace(/{{thPagamento}}/g, thPagamento);

                if (data.pagamentosMenorPreco && data.pagamentosMenorPreco.length > 0 && data.pagamentoMpFormatado1 && data.pagamentoMpFormatado1.length > 0 && data.pagamentoMpFormatado2 && data.pagamentoMpFormatado2.length > 0) {
                    let pagamentosHTML = '';

                    for (let i = 0; i < data.pagamentosMenorPreco.length; i++) {
                        let pagamentosMenorPreco = data.pagamentosMenorPreco[i];
                        let pagamentoMpFormatado1 = data.pagamentoMpFormatado1[i];
                        let pagamentoMpFormatado2 = data.pagamentoMpFormatado2[i];

                        pagamentosHTML += `
                                <tr>
                                    <td style="border-right: 2px solid var(--color-logo);">${pagamentosMenorPreco.nome}</td>
                                    <td id="td-valor-plano-ouro-table-pagamento-${i}" class="td-valor-pagamento" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro-pag">
                                        <div class="div-rs-ouro-pag"><p>R$</p></div>
                                        <div class="div-valor-individual-pag"><p>${pagamentosMenorPreco.valor}</p></div>
                                    </div>
                                    </td>
                                    <td id="td-valor-plano-ouro-table-pagamento-${i}" class="td-valor-pagamento" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro-pag">
                                        <div class="div-rs-ouro-pag"><p>R$</p></div>
                                        <div class="div-valor-individual-pag-secundaria1"><p>${pagamentoMpFormatado1.valor}</p></div>
                                    </div>
                                    </td>
                                    <td id="td-valor-plano-ouro-table-pagamento-${i}" class="td-valor-pagamento">
                                    <div class="div-container-ouro-pag">
                                        <div class="div-rs-ouro-pag"><p>R$</p></div>
                                        <div class="div-valor-individual-pag-secundaria2"><p>${pagamentoMpFormatado2.valor}</p></div>
                                    </div>
                                    </td>
                                </tr>
                            `;
                    };

                    htmlContent = htmlContent.replace(/{{tabelaPagamentos}}/g, pagamentosHTML);
                };
            } else if (data.seguradoraStatusGrMn[1] === 3) {
                // Adicionar 2 seguradoras idividuais
                let posicaoRecomendada1 = data.seguradoraIndividualRecomendada === '1' ? `<th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                                                                                        <div class="div-pai-container-recomendado">
                                                                                            <div class="div-fundo">
                                                                                                <div class="div-filha-container-recomendado">
                                                                                                <i class="fa-solid fa-star"></i>
                                                                                                    <p class="p-recomendado">RECOMENDADO</p>
                                                                                                    <i class="fa-solid fa-star"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </th>` : '';

                let posicaoRecomendada2 = data.seguradoraIndividualRecomendada === '2' ? `<th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                                                                                        <div class="div-pai-container-recomendado">
                                                                                            <div class="div-fundo">
                                                                                                <div class="div-filha-container-recomendado">
                                                                                                <i class="fa-solid fa-star"></i>
                                                                                                    <p class="p-recomendado">RECOMENDADO</p>
                                                                                                    <i class="fa-solid fa-star"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </th>` : '';

                let posicaoRecomendada3 = data.seguradoraIndividualRecomendada === '3' ? `<th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                                                                                        <div class="div-pai-container-recomendado">
                                                                                            <div class="div-fundo">
                                                                                                <div class="div-filha-container-recomendado">
                                                                                                <i class="fa-solid fa-star"></i>
                                                                                                    <p class="p-recomendado">RECOMENDADO</p>
                                                                                                    <i class="fa-solid fa-star"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </th>` : '';

                let posicaoRecomendada4 = data.seguradoraIndividualRecomendada === '4' ? `<th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                                                                                        <div class="div-pai-container-recomendado">
                                                                                            <div class="div-fundo">
                                                                                                <div class="div-filha-container-recomendado">
                                                                                                <i class="fa-solid fa-star"></i>
                                                                                                    <p class="p-recomendado">RECOMENDADO</p>
                                                                                                    <i class="fa-solid fa-star"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </th>` : '';

                let comLogoCia = '';
                let semLogoCia = '';

                if (data.seguradoraIndividualRecomendada === '1' || data.seguradoraIndividualRecomendada === '2'
                    || data.seguradoraIndividualRecomendada === '3' || data.seguradoraIndividualRecomendada === '4') {
                    semLogoCia = `
                        <tr id="tr-seguradora-table-coberturas">
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas" style="vertical-align: bottom;">COBERTURAS E CLÁUSULAS</th>
                            ${posicaoRecomendada1}
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                            ${posicaoRecomendada2}
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                            ${posicaoRecomendada3}
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                            ${posicaoRecomendada4}
                        </tr>
                    `;

                    comLogoCia = `
                    <tr id="tr-seguradora-table-coberturas">
                <th></th>
                <th id="th-seguradora-table-coberturas" class="th-table-coberturas">
                            <img class="img-logo-seguradora" src="{{base64Imagem}}" alt="logo">
                        </th>
                        <th id="th-seguradora-table-coberturas" class="th-table-coberturas">
                            <img class="img-logo-seguradora-secundaria1" src="{{base64ImagemSecundaria1}}" alt="logo">
                        </th>
                        <th id="th-seguradora-table-coberturas" class="th-table-coberturas">
                            <img class="img-logo-seguradora-secundaria2" src="{{base64ImagemSecundaria2}}" alt="logo">
                        </th>
                        <th id="th-seguradora-table-coberturas" class="th-table-coberturas">
                            <img class="img-logo-seguradora-secundaria3" src="{{base64ImagemSecundaria3}}" alt="logo">
                        </th>
                </tr>
                    <tr id="tr-seguradora-table-coberturas">
                        <th id="th-coberturas-table-coberturas" class="th-table-coberturas" style="vertical-align: bottom;">COBERTURAS E CLÁUSULAS</th>
                        ${posicaoRecomendada1}
                        <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                        ${posicaoRecomendada2}
                        <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                        ${posicaoRecomendada3}
                        <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                        ${posicaoRecomendada4}
                    </tr>
                    `;

                } else {
                    semLogoCia = `
                        <tr id="tr-seguradora-table-coberturas">
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas" style="vertical-align: bottom;">COBERTURAS E CLÁUSULAS</th>
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                            <th id="th-coberturas-table-coberturas" class="th-table-coberturas"></th>
                         </tr>
                    `;

                    comLogoCia = `
                    <tr id="tr-seguradora-table-coberturas">
                        <th id="th-coberturas-table-coberturas" class="th-table-coberturas" style="vertical-align: bottom;">COBERTURAS E CLÁUSULAS</th>
                        <th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                            <img class="img-logo-seguradora" src="{{base64Imagem}}" alt="logo">
                        </th>
                        <th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                            <img class="img-logo-seguradora-secundaria1" src="{{base64ImagemSecundaria1}}" alt="logo">
                        </th>
                        <th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                            <img class="img-logo-seguradora-secundaria2" src="{{base64ImagemSecundaria2}}" alt="logo">
                        </th>
                        <th id="th-seguradora-table-coberturas" class="th-table-coberturas" style="border-bottom: 4px solid var(--color-logo);">
                            <img class="img-logo-seguradora-secundaria3" src="{{base64ImagemSecundaria3}}" alt="logo">
                        </th>
                    </tr>
                    `;
                }

                if (data.semLogoCiaValue === true) {
                    htmlContent = htmlContent.replace(/{{semLogoCia}}/g, semLogoCia);
                } else {
                    htmlContent = htmlContent.replace(/{{semLogoCia}}/g, comLogoCia);
                    htmlContent = htmlContent.replace(/{{base64Imagem}}/g, data.base64Imagem[0]);
                    htmlContent = htmlContent.replace(/{{base64ImagemSecundaria1}}/g, data.base64ImagemSecundaria1[0]);
                    htmlContent = htmlContent.replace(/{{base64ImagemSecundaria2}}/g, data.base64ImagemSecundaria2[0]);
                    htmlContent = htmlContent.replace(/{{base64ImagemSecundaria3}}/g, data.base64ImagemSecundaria3[0]);
                };

                let coberturasHTML = '';

                if (data.cobertura1MenorPreco && data.cobertura1MenorPreco.length > 0 && data.cobertura1MpFormatado1 && data.cobertura1MpFormatado1.length > 0
                    && data.cobertura1MpFormatado2 && data.cobertura1MpFormatado2.length > 0 && data.cobertura1MpFormatado3 && data.cobertura1MpFormatado3.length > 0) {
                    for (let i = 0; i < data.cobertura1MenorPreco.length; i++) {
                        let cobertura1MenorPreco = data.cobertura1MenorPreco[i];
                        let cobertura1MpFormatado1 = data.cobertura1MpFormatado1[i];
                        let cobertura1MpFormatado2 = data.cobertura1MpFormatado2[i];
                        let cobertura1MpFormatado3 = data.cobertura1MpFormatado3[i];

                        coberturasHTML += `
                                <tr>
                                    <td style="border-right: 2px solid var(--color-logo);">${cobertura1MenorPreco.nome}</td>
                                    <td class="td-valor-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}" style="border-right: 2px solid var(--color-logo);">${cobertura1MenorPreco.valor}</td>
                                    <td class="td-valor-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}" style="border-right: 2px solid var(--color-logo);">${cobertura1MpFormatado1.valor}</td>
                                    <td class="td-valor-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}" style="border-right: 2px solid var(--color-logo);">${cobertura1MpFormatado2.valor}</td>
                                    <td class="td-valor-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}">${cobertura1MpFormatado3.valor}</td>
                                </tr>
                            `;
                    };
                };

                if (data.coberturasMenorPreco && data.coberturasMenorPreco.length > 0 && data.coberturasMpFormatado1 && data.coberturasMpFormatado1.length > 0
                    && data.coberturasMpFormatado2 && data.coberturasMpFormatado2.length > 0 && data.coberturasMpFormatado3 && data.coberturasMpFormatado3.length > 0) {

                    for (let i = 0; i < data.coberturasMenorPreco.length; i++) {
                        let coberturasMenorPreco = data.coberturasMenorPreco[i];
                        let coberturasMpFormatado1 = data.coberturasMpFormatado1[i];
                        let coberturasMpFormatado2 = data.coberturasMpFormatado2[i];
                        let coberturasMpFormatado3 = data.coberturasMpFormatado3[i];

                        coberturasHTML += `
                            <tr>
                                <td style="border-right: 2px solid var(--color-logo);">${coberturasMenorPreco.nome}</td>
                                <td class="td-valor-table-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual"><p>${coberturasMenorPreco.valor}</p></div>
                                    </div>
                                </td>

                                <td class="td-valor-table-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-secundaria1"><p>${coberturasMpFormatado1.valor}</p></div>
                                    </div>
                                </td>

                                <td class="td-valor-table-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-secundaria2"><p>${coberturasMpFormatado2.valor}</p></div>
                                    </div>
                                </td>

                                <td class="td-valor-table-coberturas td-valor-cobertura-clausula" id="td-valor-table-coberturas-${i}">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-secundaria3"><p>${coberturasMpFormatado3.valor}</p></div>
                                    </div>
                                </td>
                            </tr>
                        `;
                    };
                };

                // Adicionar clausulas

                if (data.clausulasMenorPreco && data.clausulasMenorPreco.length > 0 && data.clausulasMpFormatado1 && data.clausulasMpFormatado1.length > 0
                    && data.clausulasMpFormatado2 && data.clausulasMpFormatado2.length > 0 && data.clausulasMpFormatado3 && data.clausulasMpFormatado3.length > 0) {
                    for (let i = 0; i < data.clausulasMenorPreco.length; i++) {
                        let clausulasMenorPreco = data.clausulasMenorPreco[i];
                        let clausulasMpFormatado1 = data.clausulasMpFormatado1[i];
                        let clausulasMpFormatado2 = data.clausulasMpFormatado2[i];
                        let clausulasMpFormatado3 = data.clausulasMpFormatado3[i];

                        coberturasHTML += `
                                <tr>
                                    <td style="border-right: 2px solid var(--color-logo);">${clausulasMenorPreco.nome}</td>
                                    <td class="td-valor-clausulas td-valor-cobertura-clausula" id="td-valor-table-clausulas-${i}" style="border-right: 2px solid var(--color-logo);">${clausulasMenorPreco.valor}</td>
                                    <td class="td-valor-clausulas td-valor-cobertura-clausula" id="td-valor-table-clausulas-${i}" style="border-right: 2px solid var(--color-logo);">${clausulasMpFormatado1.valor}</td>
                                    <td class="td-valor-clausulas td-valor-cobertura-clausula" id="td-valor-table-clausulas-${i}" style="border-right: 2px solid var(--color-logo);">${clausulasMpFormatado2.valor}</td>
                                    <td class="td-valor-clausulas td-valor-cobertura-clausula" id="td-valor-table-clausulas-${i}">${clausulasMpFormatado3.valor}</td>
                                </tr>
                                `;
                    };
                    htmlContent = htmlContent.replace(/{{tabelaCoberturas}}/g, coberturasHTML);
                };

                if (data.franquiaChecked) {
                    // Adicionar franquias

                    let thFranquias = `
                        <tr id="tr-subtitulo">
                            <th id="th-franquias-table-franquias" class="th-table-franquias">FRANQUIAS</th>
                        </tr>
                    `;

                    htmlContent = htmlContent.replace(/{{thFranquias}}/g, thFranquias);

                    let tableFranquias = '';

                    for (let i = 0; i < data.franquiasMpFormatado1.length; i++) {
                        let franquiasMpFormatado1 = data.franquiasMpFormatado1[i];
                        let franquiasMpFormatado2 = data.franquiasMpFormatado2[i];
                        let franquiasMpFormatado3 = data.franquiasMpFormatado3[i];

                        tableFranquias = `
                            <tr>
                                <td id="td-franquias-table-franquias" class="td-table-franquias" style="border-right: 2px solid var(--color-logo);">${data.franquiaSelecionada}</td>
                                <td id="td-franquias-table-franquias" class="td-valor-franquias" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia"><p>${data.franquiaValorIndividual}</p></div>
                                    </div>
                                </td>
                                <td id="td-franquias-table-franquias" class="td-valor-franquias" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia1"><p>${franquiasMpFormatado1.valor}</p></div>
                                    </div>
                                </td>
                                <td id="td-franquias-table-franquias" class="td-valor-franquias" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia2"><p>${franquiasMpFormatado2.valor}</p></div>
                                    </div>
                                </td>
                                <td id="td-franquias-table-franquias" class="td-valor-franquias">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia3"><p>${franquiasMpFormatado3.valor}</p></div>
                                    </div>
                                </td>
                            </tr>
                        `;
                    };

                    if (data.franquiaCounterIndividual > 0) {
                        for (let i = 0; i < data.franquiaCounterIndividual; i++) {
                            let nomeFranquia = data.nomeFranquia[i];
                            let valorIndividual = data.valorIndividual[i];
                            let valoresInputsDemaisSeguradoras1 = data.valoresInputsDemaisSeguradoras1[i];
                            let valoresInputsDemaisSeguradoras2 = data.valoresInputsDemaisSeguradoras2[i];
                            let valoresInputsDemaisSeguradoras3 = data.valoresInputsDemaisSeguradoras3[i];

                            tableFranquias += `
                                <tr>
                                    <td id="td-franquias-table-franquias" class="td-table-franquias" style="border-right: 2px solid var(--color-logo);">${nomeFranquia.valor}</td>
                                    <td id="td-franquias-table-franquias" class="td-valor-franquias" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia"><p>${valorIndividual.valor}</p></div>
                                    </div>
                                </td>
                                <td id="td-franquias-table-franquias" class="td-valor-franquias" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia1"><p>${valoresInputsDemaisSeguradoras1.valor}</p></div>
                                    </div>
                                </td>
                                <td id="td-franquias-table-franquias" class="td-valor-franquias" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia2"><p>${valoresInputsDemaisSeguradoras2.valor}</p></div>
                                    </div>
                                </td>
                                <td id="td-franquias-table-franquias" class="td-valor-franquias">
                                    <div class="div-container-ouro">
                                        <div class="div-rs-ouro"><p>R$</p></div>
                                        <div class="div-valor-individual-franquia3"><p>${valoresInputsDemaisSeguradoras3.valor}</p></div>
                                    </div>
                                </td>
                                </tr>
                            `;
                        };
                    };

                    htmlContent = htmlContent.replace(/{{tableFranquias}}/g, tableFranquias);
                } else {
                    htmlContent = htmlContent.replace(/{{thFranquias}}/g, '');
                    htmlContent = htmlContent.replace(/{{tableFranquias}}/g, '');
                };

                // Adicionar pagamentos

                let thPagamento = `
                        <tr id="tr-subtitulo">
                            <th id="th-pagamento-table-pagamento" class="th-table-pagamento">FORMAS DE PAGAMENTO</th>
                        </tr>
                    `;

                htmlContent = htmlContent.replace(/{{thPagamento}}/g, thPagamento);

                if (data.pagamentosMenorPreco && data.pagamentosMenorPreco.length > 0 && data.pagamentoMpFormatado1 && data.pagamentoMpFormatado1.length > 0
                    && data.pagamentoMpFormatado2 && data.pagamentoMpFormatado2.length > 0 && data.pagamentoMpFormatado3 && data.pagamentoMpFormatado3.length > 0) {
                    let pagamentosHTML = '';

                    for (let i = 0; i < data.pagamentosMenorPreco.length; i++) {
                        let pagamentosMenorPreco = data.pagamentosMenorPreco[i];
                        let pagamentoMpFormatado1 = data.pagamentoMpFormatado1[i];
                        let pagamentoMpFormatado2 = data.pagamentoMpFormatado2[i];
                        let pagamentoMpFormatado3 = data.pagamentoMpFormatado3[i];

                        pagamentosHTML += `
                                <tr>
                                    <td style="border-right: 2px solid var(--color-logo);">${pagamentosMenorPreco.nome}</td>
                                    <td id="td-valor-plano-ouro-table-pagamento-${i}" class="td-valor-pagamento" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro-pag">
                                        <div class="div-rs-ouro-pag"><p>R$</p></div>
                                        <div class="div-valor-individual-pag"><p>${pagamentosMenorPreco.valor}</p></div>
                                    </div>
                                    </td>
                                    <td id="td-valor-plano-ouro-table-pagamento-${i}" class="td-valor-pagamento" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro-pag">
                                        <div class="div-rs-ouro-pag"><p>R$</p></div>
                                        <div class="div-valor-individual-pag-secundaria1"><p>${pagamentoMpFormatado1.valor}</p></div>
                                    </div>
                                    </td>
                                    <td id="td-valor-plano-ouro-table-pagamento-${i}" class="td-valor-pagamento" style="border-right: 2px solid var(--color-logo);">
                                    <div class="div-container-ouro-pag">
                                        <div class="div-rs-ouro-pag"><p>R$</p></div>
                                        <div class="div-valor-individual-pag-secundaria2"><p>${pagamentoMpFormatado2.valor}</p></div>
                                    </div>
                                    </td>
                                    <td id="td-valor-plano-ouro-table-pagamento-${i}" class="td-valor-pagamento">
                                    <div class="div-container-ouro-pag">
                                        <div class="div-rs-ouro-pag"><p>R$</p></div>
                                        <div class="div-valor-individual-pag-secundaria3"><p>${pagamentoMpFormatado3.valor}</p></div>
                                    </div>
                                    </td>
                                </tr>
                            `;
                    };

                    htmlContent = htmlContent.replace(/{{tabelaPagamentos}}/g, pagamentosHTML);
                };
            };
        };
    };

    if (data.observacoesCheckboxAceito) {
        // Criar uma lista dinâmica apenas com valores preenchidos
        const observacoes = [];

        if (data.observacoesTextarea) {
            observacoes.push(data.observacoesTextarea);
        };
        if (data.obsChecked1) {
            observacoes.push(data.obsChecked1);
        };
        if (data.obsChecked2) {
            observacoes.push(data.obsChecked2);
        };
        if (data.obsChecked3) {
            observacoes.push(data.obsChecked3);
        };

        // Gerar os itens <li> apenas para os valores não vazios
        const observacoesList = observacoes.map(item => `<li>${item}</li>`).join('');

        // Substituir o placeholder com a lista gerada
        htmlContent = htmlContent.replace(/{{observacoesTextarea}}/g, observacoesList);
    } else {
        // Se o checkbox principal não está marcado, remover o placeholder
        htmlContent = htmlContent.replace(/{{observacoesTextarea}}/g, '');
    };

    return htmlContent;
};

const convertHTML = async (data, res) => {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    const idOrcamento = data.idOrcamento;

    const files = [
    {
        html: path.resolve(__dirname, '../utils/html/header-pdf.html'),
        css: path.resolve(__dirname, '../utils/style/header-pdf.css')
    },
    {
        html: path.resolve(__dirname, '../utils/html/cliente-pdf.html'),
        css: path.resolve(__dirname, '../utils/style/cliente-pdf.css')
    },
    {
        html: path.resolve(__dirname, '../utils/html/veiculo-pdf.html'),
        css: path.resolve(__dirname, '../utils/style/veiculo-pdf.css')
    },
    {
        html: path.resolve(__dirname, '../utils/html/coberturas-pdf.html'),
        css: path.resolve(__dirname, '../utils/style/coberturas-pdf.css')
    },
    {
        html: path.resolve(__dirname, '../utils/html/franquias-pdf.html'),
        css: path.resolve(__dirname, '../utils/style/franquias-pdf.css')
    },
    {
        html: path.resolve(__dirname, '../utils/html/pagamento-pdf.html'),
        css: path.resolve(__dirname, '../utils/style/pagamento-pdf.css')
    }
];


    // Inclui 'observacoes-pdf.html' apenas se `observacoesCheckboxAceito` for verdadeiro
    if (data.observacoesCheckboxAceito) {
        files.push({ html: path.resolve(__dirname, '../utils/html/observacoes-pdf.html'), css: path.resolve(__dirname, '../utils/style/observacoes-pdf.css') });
    };

    let combinedHTML = '';

    // Ler e combinar os arquivos HTML e CSS
    for (const file of files) {
        let htmlContent = await fs.promises.readFile(file.html, 'utf8');
        const cssContent = await fs.promises.readFile(file.css, 'utf8');

        // Injetar os dados nas tags HTML com placeholders
        htmlContent = injectDataIntoHTML(htmlContent, data);

        combinedHTML += `
            <style>
                ${cssContent}
            </style>
            <div class="section">
                ${htmlContent}
            </div>
        `;
    };

    // Adicionar cabeçalho e rodapé
    const headerHTML = await fs.promises.readFile(path.resolve(__dirname,'../utils/html/header-detail-pdf.html'), 'utf8');
    const headerCSS = await fs.promises.readFile(path.resolve(__dirname,'../utils/style/header-detail-pdf.css') , 'utf8');

    const footerHTML = await fs.promises.readFile(path.resolve(__dirname,'../utils/html/footer-pdf.html') , 'utf8');
    const footerCSS = await fs.promises.readFile(path.resolve(__dirname,'../utils/style/footer-pdf.css') , 'utf8');

    // Passar o HTML combinado para o Puppeteer
    await page.setContent(combinedHTML);

    // Alinhar os valores das coberturas e pagamentos
    // Ajustar o styles das tabelas ao adicionar seguradoras
    await page.evaluate((data) => {

        function stylesThWidth(tag, valor) {
            tag.forEach(th => {
                th.style.width = valor;
            });
        };

        const recomendado2 = document.querySelector('.div-pai-container-recomendado');
        if (data.seguradoraRecomendada === '2') {
            recomendado2.style.paddingLeft = '240px'; // Corrigido para marginLeft
        };

        if (data.tipoOrcamentoSelecionado === 'Gestor') {
            if (data.seguradoraStatus[1] === 1) {
                stylesThWidth(document.querySelectorAll('#th-plano-ouro-table-coberturas'), '120px');
                stylesThWidth(document.querySelectorAll('#th-plano-prata-table-coberturas'), '120px');
                stylesThWidth(document.querySelectorAll('#td-valor-plano-ouro-table-franquias'), '120px');
                stylesThWidth(document.querySelectorAll('#td-valor-plano-prata-table-franquias'), '120px');
                stylesThWidth(document.querySelectorAll('.td-valor-pagamento'), '120px');
            };
        } else if (data.tipoOrcamentoSelecionado === 'Menor') {
            if (data.seguradoraStatusGrMn[1] === 0) {
                stylesThWidth(document.querySelectorAll('#th-seguradora-table-coberturas'), '50%');
                stylesThWidth(document.querySelectorAll('.td-valor-franquias'), '50%');
                stylesThWidth(document.querySelectorAll('.td-valor-pagamento'), '50%');
            } else if (data.seguradoraStatusGrMn[1] === 1) {
                stylesThWidth(document.querySelectorAll('.td-valor-cobertura-clausula'), '190px');
                stylesThWidth(document.querySelectorAll('.td-valor-franquias'), '190px');
                stylesThWidth(document.querySelectorAll('.td-valor-pagamento'), '190px');
                // Seleciona as colunas 2 e 4 de todas as linhas da tabela com o ID "id-table-coberturas"
                if (data.seguradoraIndividualRecomendada === '1') {
                    document.querySelector('.div-fundo').style.width = '190px';
                    document.querySelector('.div-fundo').style.transform = 'translateX(0)';
                } else if (data.seguradoraIndividualRecomendada === '2') {
                    document.querySelector('.div-fundo').style.width = '190px';
                    document.querySelector('.div-fundo').style.transform = 'translateX(0)';
                    const cells = document.querySelectorAll(`#id-table-coberturas td:nth-child(2), 
                    #id-table-coberturas th:nth-child(2), #id-table-franquias td:nth-child(2), 
                    #id-table-franquias th:nth-child(2), #id-table-pagamento td:nth-child(2), 
                    #id-table-pagamento th:nth-child(2)`);

                    // Aplica o background color em cada célula selecionada
                    cells.forEach(cell => {
                        cell.style.backgroundColor = '#f7f7f8';
                    });

                    const cellsBlue = document.querySelectorAll(`#id-table-coberturas td:nth-child(3), 
                    #id-table-coberturas th:nth-child(3), #id-table-franquias td:nth-child(3), 
                    #id-table-franquias th:nth-child(3), #id-table-pagamento td:nth-child(3), 
                    #id-table-pagamento th:nth-child(3)`);

                    // Aplica o background color em cada célula selecionada
                    cellsBlue.forEach(cell => {
                        cell.style.backgroundColor = '#a8bfd8';
                    });

                } else {
                    const cells = document.querySelectorAll(`#id-table-coberturas td:nth-child(2), 
                    #id-table-coberturas th:nth-child(2), #id-table-coberturas td:nth-child(4), 
                    #id-table-coberturas th:nth-child(4), #id-table-franquias td:nth-child(2), 
                    #id-table-franquias th:nth-child(2), #id-table-franquias td:nth-child(4), 
                    #id-table-franquias th:nth-child(4), #id-table-pagamento td:nth-child(2), 
                    #id-table-pagamento th:nth-child(2), #id-table-pagamento td:nth-child(4), 
                    #id-table-pagamento th:nth-child(4)`);

                    // Aplica o background color em cada célula selecionada
                    cells.forEach(cell => {
                        cell.style.backgroundColor = '#f7f7f8';
                    });
                };
            } else if (data.seguradoraStatusGrMn[1] === 2) {
                stylesThWidth(document.querySelectorAll('.td-valor-cobertura-clausula'), '160px');
                stylesThWidth(document.querySelectorAll('.td-valor-franquias'), '160px');
                stylesThWidth(document.querySelectorAll('.td-valor-pagamento'), '160px');

                if (data.seguradoraIndividualRecomendada === '1') {
                    document.querySelector('.div-fundo').style.width = '160px';
                    document.querySelector('.div-fundo').style.transform = 'translateX(0)';

                    const cells = document.querySelectorAll(`#id-table-coberturas td:nth-child(4), 
                    #id-table-coberturas th:nth-child(4), #id-table-franquias td:nth-child(4), 
                    #id-table-franquias th:nth-child(4), #id-table-pagamento td:nth-child(4), 
                    #id-table-pagamento th:nth-child(4)`);

                    // Aplica o background color em cada célula selecionada
                    cells.forEach(cell => {
                        cell.style.backgroundColor = '#f7f7f8';
                    });
                } else if (data.seguradoraIndividualRecomendada === '2') {
                    document.querySelector('.div-fundo').style.width = '160px';
                    document.querySelector('.div-fundo').style.transform = 'translateX(0)';
                    const cells = document.querySelectorAll(`#id-table-coberturas td:nth-child(2), 
                    #id-table-coberturas th:nth-child(2), #id-table-franquias td:nth-child(2), 
                    #id-table-franquias th:nth-child(2), #id-table-pagamento td:nth-child(2), 
                    #id-table-pagamento th:nth-child(2), #id-table-coberturas td:nth-child(4), 
                    #id-table-coberturas th:nth-child(4), #id-table-franquias td:nth-child(4), 
                    #id-table-franquias th:nth-child(4), #id-table-pagamento td:nth-child(4), 
                    #id-table-pagamento th:nth-child(4)`);

                    // Aplica o background color em cada célula selecionada
                    cells.forEach(cell => {
                        cell.style.backgroundColor = '#f7f7f8';
                    });

                    const cellsBlue = document.querySelectorAll(`#id-table-coberturas td:nth-child(3), 
                    #id-table-coberturas th:nth-child(3), #id-table-franquias td:nth-child(3), 
                    #id-table-franquias th:nth-child(3), #id-table-pagamento td:nth-child(3), 
                    #id-table-pagamento th:nth-child(3)`);

                    // Aplica o background color em cada célula selecionada
                    cellsBlue.forEach(cell => {
                        cell.style.backgroundColor = '#a8bfd8';
                    });

                } else if (data.seguradoraIndividualRecomendada === '3') {

                    document.querySelector('.div-fundo').style.width = '160px';
                    document.querySelector('.div-fundo').style.transform = 'translateX(0)';
                    const cells = document.querySelectorAll(`#id-table-coberturas td:nth-child(2), 
                    #id-table-coberturas th:nth-child(2), #id-table-franquias td:nth-child(2), 
                    #id-table-franquias th:nth-child(2), #id-table-pagamento td:nth-child(2), 
                    #id-table-pagamento th:nth-child(2)`);

                    // Aplica o background color em cada célula selecionada
                    cells.forEach(cell => {
                        cell.style.backgroundColor = '#f7f7f8';
                    });

                    const cellsBlue = document.querySelectorAll(`#id-table-coberturas td:nth-child(4), 
                    #id-table-coberturas th:nth-child(4), #id-table-franquias td:nth-child(4), 
                    #id-table-franquias th:nth-child(4), #id-table-pagamento td:nth-child(4), 
                    #id-table-pagamento th:nth-child(4)`);

                    // Aplica o background color em cada célula selecionada
                    cellsBlue.forEach(cell => {
                        cell.style.backgroundColor = '#a8bfd8';
                    });

                } else {
                    const cells = document.querySelectorAll(`#id-table-coberturas td:nth-child(2), 
                    #id-table-coberturas th:nth-child(2), #id-table-coberturas td:nth-child(4), 
                    #id-table-coberturas th:nth-child(4), #id-table-franquias td:nth-child(2), 
                    #id-table-franquias th:nth-child(2), #id-table-franquias td:nth-child(4), 
                    #id-table-franquias th:nth-child(4), #id-table-pagamento td:nth-child(2), 
                    #id-table-pagamento th:nth-child(2), #id-table-pagamento td:nth-child(4), 
                    #id-table-pagamento th:nth-child(4)`);

                    // Aplica o background color em cada célula selecionada
                    cells.forEach(cell => {
                        cell.style.backgroundColor = '#f7f7f8';
                    });
                };
            } else if (data.seguradoraStatusGrMn[1] === 3) {
                stylesThWidth(document.querySelectorAll('.td-valor-cobertura-clausula'), '120px');
                stylesThWidth(document.querySelectorAll('.td-valor-franquias'), '120px');
                stylesThWidth(document.querySelectorAll('.td-valor-pagamento'), '120px');

                if (data.seguradoraIndividualRecomendada === '1') {
                    document.querySelector('.div-fundo').style.width = '120px';
                    document.querySelector('.div-fundo').style.transform = 'translateX(0)';

                    const cells = document.querySelectorAll(`#id-table-coberturas td:nth-child(4), 
                    #id-table-coberturas th:nth-child(4), #id-table-franquias td:nth-child(4), 
                    #id-table-franquias th:nth-child(4), #id-table-pagamento td:nth-child(4), 
                    #id-table-pagamento th:nth-child(4)`);

                    // Aplica o background color em cada célula selecionada
                    cells.forEach(cell => {
                        cell.style.backgroundColor = '#f7f7f8';
                    });
                } else if (data.seguradoraIndividualRecomendada === '2') {
                    document.querySelector('.div-fundo').style.width = '120px';
                    document.querySelector('.div-fundo').style.transform = 'translateX(0)';

                    const cells = document.querySelectorAll(`#id-table-coberturas td:nth-child(2), 
                    #id-table-coberturas th:nth-child(2), #id-table-franquias td:nth-child(2), 
                    #id-table-franquias th:nth-child(2), #id-table-pagamento td:nth-child(2), 
                    #id-table-pagamento th:nth-child(2), #id-table-coberturas td:nth-child(4), 
                    #id-table-coberturas th:nth-child(4), #id-table-franquias td:nth-child(4), 
                    #id-table-franquias th:nth-child(4), #id-table-pagamento td:nth-child(4), 
                    #id-table-pagamento th:nth-child(4)`);

                    // Aplica o background color em cada célula selecionada
                    cells.forEach(cell => {
                        cell.style.backgroundColor = '#f7f7f8';
                    });

                    const cellsBlue = document.querySelectorAll(`#id-table-coberturas td:nth-child(3), 
                    #id-table-coberturas th:nth-child(3), #id-table-franquias td:nth-child(3), 
                    #id-table-franquias th:nth-child(3), #id-table-pagamento td:nth-child(3), 
                    #id-table-pagamento th:nth-child(3)`);

                    // Aplica o background color em cada célula selecionada
                    cellsBlue.forEach(cell => {
                        cell.style.backgroundColor = '#a8bfd8';
                    });

                } else if (data.seguradoraIndividualRecomendada === '3') {

                    document.querySelector('.div-fundo').style.width = '120px';
                    document.querySelector('.div-fundo').style.transform = 'translateX(0)';
                    const cells = document.querySelectorAll(`#id-table-coberturas td:nth-child(2), 
                    #id-table-coberturas th:nth-child(2), #id-table-franquias td:nth-child(2), 
                    #id-table-franquias th:nth-child(2), #id-table-pagamento td:nth-child(2), 
                    #id-table-pagamento th:nth-child(2)`);

                    // Aplica o background color em cada célula selecionada
                    cells.forEach(cell => {
                        cell.style.backgroundColor = '#f7f7f8';
                    });

                    const cellsBlue = document.querySelectorAll(`#id-table-coberturas td:nth-child(4), 
                    #id-table-coberturas th:nth-child(4), #id-table-franquias td:nth-child(4), 
                    #id-table-franquias th:nth-child(4), #id-table-pagamento td:nth-child(4), 
                    #id-table-pagamento th:nth-child(4)`);

                    // Aplica o background color em cada célula selecionada
                    cellsBlue.forEach(cell => {
                        cell.style.backgroundColor = '#a8bfd8';
                    });

                } else if (data.seguradoraIndividualRecomendada === '4') {
                    document.querySelector('.div-fundo').style.width = '120px';
                    document.querySelector('.div-fundo').style.transform = 'translateX(0)';
                    const cells = document.querySelectorAll(`#id-table-coberturas td:nth-child(2), 
                    #id-table-coberturas th:nth-child(2), #id-table-coberturas td:nth-child(4), 
                    #id-table-coberturas th:nth-child(4), #id-table-franquias td:nth-child(2), 
                    #id-table-franquias th:nth-child(2), #id-table-franquias td:nth-child(4), 
                    #id-table-franquias th:nth-child(4), #id-table-pagamento td:nth-child(2), 
                    #id-table-pagamento th:nth-child(2), #id-table-pagamento td:nth-child(4), 
                    #id-table-pagamento th:nth-child(4)`);

                    // Aplica o background color em cada célula selecionada
                    cells.forEach(cell => {
                        cell.style.backgroundColor = '#f7f7f8';
                    });

                    const cellsBlue = document.querySelectorAll(`#id-table-coberturas td:nth-child(5), 
                    #id-table-coberturas th:nth-child(5), #id-table-franquias td:nth-child(5), 
                    #id-table-franquias th:nth-child(5), #id-table-pagamento td:nth-child(5), 
                    #id-table-pagamento th:nth-child(5)`);

                    // Aplica o background color em cada célula selecionada
                    cellsBlue.forEach(cell => {
                        cell.style.backgroundColor = '#a8bfd8';
                    });
                } else {
                    const cells = document.querySelectorAll(`#id-table-coberturas td:nth-child(2), 
                    #id-table-coberturas th:nth-child(2), #id-table-coberturas td:nth-child(4), 
                    #id-table-coberturas th:nth-child(4), #id-table-franquias td:nth-child(2), 
                    #id-table-franquias th:nth-child(2), #id-table-franquias td:nth-child(4), 
                    #id-table-franquias th:nth-child(4), #id-table-pagamento td:nth-child(2), 
                    #id-table-pagamento th:nth-child(2), #id-table-pagamento td:nth-child(4), 
                    #id-table-pagamento th:nth-child(4)`);

                    // Aplica o background color em cada célula selecionada
                    cells.forEach(cell => {
                        cell.style.backgroundColor = '#f7f7f8';
                    });
                };
            };
        };

        const heightLogoSeguradora = document.querySelector('.img-logo-seguradora');
        const heightLogoSeguradoraSecundaria = document.querySelector('.img-logo-seguradora-secundaria');
        const heightLogoSeguradoraSecundaria1 = document.querySelector('.img-logo-seguradora-secundaria1');
        const heightLogoSeguradoraSecundaria2 = document.querySelector('.img-logo-seguradora-secundaria2');
        const heightLogoSeguradoraSecundaria3 = document.querySelector('.img-logo-seguradora-secundaria3');
        function setHeightImg(img, valor) {
            if (img) {
                img.style.height = valor;
            } else {
                console.warn('Elemento não encontrado para ajustar a altura.');
            };
        };

        if (data.base64Imagem && data.base64Imagem.length > 1) {
            setHeightImg(heightLogoSeguradora, data.base64Imagem[1]);
        } else {
            console.warn('base64Imagem[1] não está disponível');
        };
        if (data.base64ImagemSecundaria && data.base64ImagemSecundaria.length > 1) {
            setHeightImg(heightLogoSeguradoraSecundaria, data.base64ImagemSecundaria[1]);
        } else {
            console.warn('base64ImagemSecundaria[1] não está disponível');
        };
        if (data.base64ImagemSecundaria1 && data.base64ImagemSecundaria1.length > 1) {
            setHeightImg(heightLogoSeguradoraSecundaria1, data.base64ImagemSecundaria1[1])
        } else {
            console.warn('base64ImagemSecundaria1[1] não está disponível');
        };
        if (data.base64ImagemSecundaria2 && data.base64ImagemSecundaria2.length > 1) {
            setHeightImg(heightLogoSeguradoraSecundaria2, data.base64ImagemSecundaria2[1])
        } else {
            console.warn('base64ImagemSecundaria2[1] não está disponível');
        };
        if (data.base64ImagemSecundaria3 && data.base64ImagemSecundaria3.length > 1) {
            setHeightImg(heightLogoSeguradoraSecundaria3, data.base64ImagemSecundaria3[1])
        } else {
            console.warn('base64ImagemSecundaria3[1] não está disponível');
        };

        // Função para calcular a maior largura de um conjunto de elementos
        function setMaiorLargura(className) {
            const divs = document.querySelectorAll(className);
            let maiorLargura = 0;

            // Calcula a maior largura
            divs.forEach(div => {
                maiorLargura = Math.max(maiorLargura, div.offsetWidth);
            });

            // Aplica a maior largura a todos os elementos do conjunto
            divs.forEach(div => {
                div.style.width = maiorLargura + 'px';
            });
        };

        // Aplica a maior largura para cada grupo de divs
        setMaiorLargura('.div-valor-ouro');
        setMaiorLargura('.div-valor-ouro-franquia');
        setMaiorLargura('.div-valor-ouro-pag');
        setMaiorLargura('.div-valor-ouro-secundaria');
        setMaiorLargura('.div-valor-ouro-franquia1');
        setMaiorLargura('.div-valor-ouro-secundaria-pag');
        setMaiorLargura('.div-valor-prata');
        setMaiorLargura('.div-valor-prata-franquia');
        setMaiorLargura('.div-valor-prata-pag');
        setMaiorLargura('.div-valor-prata-secundaria');
        setMaiorLargura('.div-valor-prata-franquia1');
        setMaiorLargura('.div-valor-prata-secundaria-pag');
        setMaiorLargura('.div-valor-individual');
        setMaiorLargura('.div-valor-individual-secundaria1');
        setMaiorLargura('.div-valor-individual-secundaria2');
        setMaiorLargura('.div-valor-individual-secundaria3');
        setMaiorLargura('.div-valor-individual-pag');
        setMaiorLargura('.div-valor-individual-pag-secundaria1');
        setMaiorLargura('.div-valor-individual-pag-secundaria2');
        setMaiorLargura('.div-valor-individual-pag-secundaria3');
        setMaiorLargura('.div-valor-individual-franquia');
        setMaiorLargura('.div-valor-individual-franquia1');
        setMaiorLargura('.div-valor-individual-franquia2');
        setMaiorLargura('.div-valor-individual-franquia3');
    }, data);

    // Gerar o PDF
    const pdfDirectory = path.join(__dirname, '../public');
    const pdfPath = path.join(pdfDirectory, `orcamento${idOrcamento}.pdf`);

    if (!fs.existsSync(pdfDirectory)) {
        fs.mkdirSync(pdfDirectory, { recursive: true });
    };

    await page.pdf({
        format: 'A4',
        path: pdfPath,
        displayHeaderFooter: true,
        printBackground: true,
        margin: {
            top: '1cm',
            bottom: '150px'
        },
        headerTemplate: `
            <style>
                ${headerCSS}
            </style>
            <div class="footer" style="width: 100%;">
                ${headerHTML}
            </div>
        `,
        footerTemplate: `
            <style>
                ${footerCSS}
            </style>
            <div class="footer" style="width: 100%;">
                ${footerHTML}
            </div>
        `
    });

    await page.close();
    await browser.close();

    res.json({ pdfUrl: `/orcamento${idOrcamento}.pdf` });
};

class PDFControllers {
    async pdf(req, res) {
        convertHTML(req.body, res)
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err });
    }
}

module.exports = new PDFControllers;