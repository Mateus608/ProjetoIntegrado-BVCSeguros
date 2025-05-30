import { displayBlockNone, removerRS } from "./functionCliente.js";
import { addSeguradoraExport } from "./adicionarSeguradora.js";
import { addFranquiaMn, addFranquiaGr } from "./adicionarFranquia.js";
import { addSeguradoraIndividualExport } from "./GesRiscoMenPreco.js";

const dadosOrcamento = JSON.parse(localStorage.getItem('dadosOrcamento'));
const sectionIndividual = document.querySelector('.section-individual');
const sectionPOP = document.querySelector('.section-pop');
const newButtonAdd = document.getElementById('add-cia-menor-preco');
const addCia = document.querySelector('.add-seguradora');

if (dadosOrcamento) {
  // Preencher os campos do formulário com os dados do JSON

  // Gestor de Risco
  let arrayCoberturasAdicionaisPOuro = [];
  let arrayCoberturasAdicionaisPPrata = [];
  let arrayClausulasAdicionaisPOuro = [];
  let arrayClausulasAdicionaisPPrata = [];
  let arrayPagamentosAdicionaisPOuro = [];
  let arrayPagamentosAdicionaisPPrata = [];
  let arrayFranquiasSelect = [];
  let arrayFranquiasPOuro = [];
  let arrayFranquiasPPrata = [];
  let arrayFranquiasAdicionaisPOuro = [];
  let arrayFranquiasAdicionaisPPrata = [];

  // Individual
  let arrayFranquiasIndividualSelect = [];
  let arrayFranquiasIndividual = [];
  let arrayFranquiasAdicionaisValor1 = [];
  let arrayFranquiasAdicionaisValor2 = [];
  let arrayFranquiasAdicionaisValor3 = [];

  let arrayCoberturasAdicionaisValor1 = [];
  let arrayCoberturasAdicionaisValor2 = [];
  let arrayCoberturasAdicionaisValor3 = [];

  let arrayClausulasAdicionaisValor1 = [];
  let arrayClausulasAdicionaisValor2 = [];
  let arrayClausulasAdicionaisValor3 = [];

  let arrayPagamentosAdicionaisValor1 = [];
  let arrayPagamentosAdicionaisValor2 = [];
  let arrayPagamentosAdicionaisValor3 = [];


  // Preenchendo dados do formGlobal
  if (dadosOrcamento.formGlobal.modalidade === 'Gestor') {
    if (dadosOrcamento.formGlobal.ciaGestor !== null) {
      addSeguradoraExport();

      const selectSeguradoraDinamic = document.querySelectorAll(`[class="select-seguradora"][data-id="1"]`);
      const pTitleSeguradora2 = document.querySelectorAll(`[class="p-title-table-seguradora2"]`);
      const valorCia = dadosOrcamento.formGlobal.ciaGestor.toLowerCase(); // Normaliza para minúsculas

      // Fazemos um switch para comparar o valor da seguradora
      const seguradoras = {
        'allianz': 'Allianz',
        'allianz trade': 'Allianz Trade',
        'american life': 'American Life',
        'axa': 'AXA',
        'azul': 'Azul',
        'bradesco': 'Bradesco',
        'hdi': 'HDI',
        'itau': 'Itau',
        'liberty': 'Liberty',
        'mapfre': 'Mapfre',
        'mitsui': 'Mitsui',
        'porto': 'Porto',
        'pottencial': 'Pottencial',
        'sulamerica': 'SulAmerica',
        'sompo': 'Sompo',
        'suhai': 'Suhai',
        'tokio': 'Tokio',
        'zurich': 'Zurich'
      };

      const seguradora = seguradoras[valorCia.toLowerCase()];

      if (seguradora) {
        inserirValor(selectSeguradoraDinamic, seguradora);

        pTitleSeguradora2.forEach(p => {
          p.innerHTML = seguradora; // Define o nome da seguradora como o conteúdo HTML de cada elemento
        });
      } else {
        console.warn('Seguradora não encontrada');
      }

      dadosOrcamento.coberturasAuto_Adicional.forEach(coberturaAdd => {
        arrayCoberturasAdicionaisPOuro.push(coberturaAdd.planoOuro);
        arrayCoberturasAdicionaisPPrata.push(coberturaAdd.planoPrata);
      });

      dadosOrcamento.clausulasAuto_Adicional.forEach(clausulaAdd => {
        arrayClausulasAdicionaisPOuro.push(clausulaAdd.planoOuro);
        arrayClausulasAdicionaisPPrata.push(clausulaAdd.planoPrata);
      });

      dadosOrcamento.pagamentoAuto_Adicional.forEach(pagamentoAdd => {
        arrayPagamentosAdicionaisPOuro.push(pagamentoAdd.planoOuro);
        arrayPagamentosAdicionaisPPrata.push(pagamentoAdd.planoPrata);
      });

      dadosOrcamento.franquiasAuto_Adicional.forEach(franquia_Add => {
        arrayFranquiasAdicionaisPOuro.push(franquia_Add.planoOuro);
        arrayFranquiasAdicionaisPPrata.push(franquia_Add.planoPrata);
      });

      if (dadosOrcamento.formGlobal.seguradoraRecomendada === 1) {
        document.querySelector('input[name="recomendado"][value="1"]').checked = true;
      } else if (dadosOrcamento.formGlobal.seguradoraRecomendada === 2) {
        document.querySelector('input[name="recomendado"][value="2"]').checked = true;
      };


      inserirValor(document.querySelectorAll(`[class="pOuro-table-pagamento"]`), dadosOrcamento.formaPagamento_Adicional.premioPOuro);
      inserirValor(document.querySelectorAll(`[class="pPrata-table-pagamento"]`), dadosOrcamento.formaPagamento_Adicional.premioPPrata);
    };

    dadosOrcamento.franquiasAuto.forEach(franquiaAdd => {
      arrayFranquiasSelect.push(franquiaAdd.franquia);
      arrayFranquiasPOuro.push(franquiaAdd.planoOuro);
      arrayFranquiasPPrata.push(franquiaAdd.planoPrata);
    });

    document.querySelector('input[name="tipo-orcamento"][value="Gestor"]').checked = true;

    dadosOrcamento.coberturasAuto.forEach(cobertura => {
      if (cobertura.cobertura === 'COLISÃO, INCÊNCIO E ROUBO') {
        document.getElementById('checkbox-cobertura-1').checked = true;
        document.getElementById('valor-plano-ouro-cobertura1').value = '100% TAB. FIPE';
        document.getElementById('valor-plano-prata-cobertura1').value = '100% TAB. FIPE';
        if (dadosOrcamento.formGlobal.ciaGestor !== null) {
          inserirValor(document.querySelectorAll(`[id="pOuro-cobertura1"]`), arrayCoberturasAdicionaisPOuro[0]);
          arrayCoberturasAdicionaisPOuro.shift();

          inserirValor(document.querySelectorAll(`[id="pPrata-cobertura1"]`), arrayCoberturasAdicionaisPPrata[0]);
          arrayCoberturasAdicionaisPPrata.shift();
        }
      };

      if (cobertura.cobertura === 'DANOS MATERIAIS') {
        document.getElementById('checkbox-cobertura-2').checked = true;
        document.getElementById('valor-plano-ouro-cobertura2').value = 'R$ ' + cobertura.planoOuro;
        document.getElementById('valor-plano-prata-cobertura2').value = 'R$ ' + cobertura.planoPrata;
        if (dadosOrcamento.formGlobal.ciaGestor !== null) {
          inserirValor(document.querySelectorAll(`[id="pOuro-cobertura2"]`), 'R$ ' + arrayCoberturasAdicionaisPOuro[0]);
          arrayCoberturasAdicionaisPOuro.shift();

          inserirValor(document.querySelectorAll(`[id="pPrata-cobertura2"]`), 'R$ ' + arrayCoberturasAdicionaisPPrata[0]);
          arrayCoberturasAdicionaisPPrata.shift();
        }
      };

      if (cobertura.cobertura === 'DANOS CORPORAIS') {
        document.getElementById('checkbox-cobertura-3').checked = true;
        document.getElementById('valor-plano-ouro-cobertura3').value = 'R$ ' + cobertura.planoOuro;
        document.getElementById('valor-plano-prata-cobertura3').value = 'R$ ' + cobertura.planoPrata;
        if (dadosOrcamento.formGlobal.ciaGestor !== null) {
          inserirValor(document.querySelectorAll(`[id="pOuro-cobertura3"]`), 'R$ ' + arrayCoberturasAdicionaisPOuro[0]);
          arrayCoberturasAdicionaisPOuro.shift();

          inserirValor(document.querySelectorAll(`[id="pPrata-cobertura3"]`), 'R$ ' + arrayCoberturasAdicionaisPPrata[0]);
          arrayCoberturasAdicionaisPPrata.shift();
        }
      };

      if (cobertura.cobertura === 'DANOS MORAIS') {
        document.getElementById('checkbox-cobertura-4').checked = true;
        document.getElementById('valor-plano-ouro-cobertura4').value = 'R$ ' + cobertura.planoOuro;
        document.getElementById('valor-plano-prata-cobertura4').value = 'R$ ' + cobertura.planoPrata;
        if (dadosOrcamento.formGlobal.ciaGestor !== null) {
          inserirValor(document.querySelectorAll(`[id="pOuro-cobertura4"]`), 'R$ ' + arrayCoberturasAdicionaisPOuro[0]);
          arrayCoberturasAdicionaisPOuro.shift();

          inserirValor(document.querySelectorAll(`[id="pPrata-cobertura4"]`), 'R$ ' + arrayCoberturasAdicionaisPOuro[0]);
          arrayCoberturasAdicionaisPPrata.shift();
        }
      };

      if (cobertura.cobertura === 'APP - MORTE') {
        document.getElementById('checkbox-cobertura-5').checked = true;
        document.getElementById('valor-plano-ouro-cobertura5').value = 'R$ ' + cobertura.planoOuro;
        document.getElementById('valor-plano-prata-cobertura5').value = 'R$ ' + cobertura.planoPrata;
        if (dadosOrcamento.formGlobal.ciaGestor !== null) {
          inserirValor(document.querySelectorAll(`[id="pOuro-cobertura5"]`), 'R$ ' + arrayCoberturasAdicionaisPOuro[0]);
          arrayCoberturasAdicionaisPOuro.shift();

          inserirValor(document.querySelectorAll(`[id="pPrata-cobertura5"]`), 'R$ ' + arrayCoberturasAdicionaisPPrata[0]);
          arrayCoberturasAdicionaisPPrata.shift();
        }
      };

      if (cobertura.cobertura === 'APP - INVALIDEZ') {
        document.getElementById('checkbox-cobertura-6').checked = true;
        document.getElementById('valor-plano-ouro-cobertura6').value = 'R$ ' + cobertura.planoOuro;
        document.getElementById('valor-plano-prata-cobertura6').value = 'R$ ' + cobertura.planoPrata;
        if (dadosOrcamento.formGlobal.ciaGestor !== null) {
          inserirValor(document.querySelectorAll(`[id="pOuro-cobertura6"]`), 'R$ ' + arrayCoberturasAdicionaisPOuro[0]);
          arrayCoberturasAdicionaisPOuro.shift();

          inserirValor(document.querySelectorAll(`[id="pPrata-cobertura6"]`), 'R$ ' + arrayCoberturasAdicionaisPPrata[0]);
          arrayCoberturasAdicionaisPPrata.shift();
        }
      };
    });

    dadosOrcamento.clausulasAuto.forEach(clausula => {
      if (clausula.clausula === 'ASSISTÊNCIA 24H') {
        document.getElementById('checkbox-clausulas-1').checked = true;

        const selectClausula1 = document.getElementById('select-clausulas-p-ouro1');
        const valorClausula1 = clausula.planoOuro.toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        switch (valorClausula1) {
          case 'sim':
            selectClausula1.value = 'Sim';
            break;
          case 'não':
            selectClausula1.value = 'Não';
            break;
          default:
            console.warn('Clausula não encontrada');
            break;
        }

        const selectClausula2 = document.getElementById('select-clausulas-p-prata1');
        const valorClausula2 = clausula.planoPrata.toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        switch (valorClausula2) {
          case 'sim':
            selectClausula2.value = 'Sim';
            break;
          case 'não':
            selectClausula2.value = 'Não';
            break;
          default:
            console.warn('Clausula não encontrada');
            break;
        };

        if (dadosOrcamento.formGlobal.ciaGestor !== null) {
          document.querySelectorAll(`[id="pOuro-clausula1"]`).forEach(select => {
            switch (arrayClausulasAdicionaisPOuro[0].toLowerCase()) {
              case 'sim':
                inserirValor([select], 'Sim');
                break;
              case 'não':
                inserirValor([select], 'Não');
                break;
              default:
                console.warn('Clausula não encontrada');
                break;
            }
            arrayClausulasAdicionaisPOuro.shift();
          });

          document.querySelectorAll(`[id="pPrata-clausula1"]`).forEach(select => {
            switch (arrayClausulasAdicionaisPPrata[0].toLowerCase()) {
              case 'sim':
                inserirValor([select], 'Sim');
                break;
              case 'não':
                inserirValor([select], 'Não');
                break;
              default:
                console.warn('Clausula não encontrada');
                break;
            }
            arrayClausulasAdicionaisPPrata.shift();
          });
        };
      };

      if (clausula.clausula === 'CARRO RESERVA') {
        document.getElementById('checkbox-clausulas-2').checked = true;

        const selectClausula1 = document.getElementById('select-clausulas-p-ouro2');
        const valorClausula1 = clausula.planoOuro.toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        switch (valorClausula1) {
          case 'ilimitado':
            selectClausula1.value = 'Ilimitado';
            break;
          case '15 dias':
            selectClausula1.value = '15 Dias';
            break;
          case '30 dias':
            selectClausula1.value = '30 Dias';
            break;
          case 'não possui':
            selectClausula1.value = 'Não possui';
            break;
          default:
            console.warn('Clausula não encontrada');
            break;
        }

        const selectClausula2 = document.getElementById('select-clausulas-p-prata2');
        const valorClausula2 = clausula.planoPrata.toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        switch (valorClausula2) {
          case 'ilimitado':
            selectClausula2.value = 'Ilimitado';
            break;
          case '15 dias':
            selectClausula2.value = '15 Dias';
            break;
          case '30 dias':
            selectClausula2.value = '30 Dias';
            break;
          case 'não possui':
            selectClausula2.value = 'Não possui';
            break;
          default:
            console.warn('Clausula não encontrada');
            break;
        }

        if (dadosOrcamento.formGlobal.ciaGestor !== null) {
          document.querySelectorAll(`[id="pOuro-clausula2"]`).forEach(select => {
            switch (arrayClausulasAdicionaisPOuro[0].toLowerCase()) {
              case 'ilimitado':
                inserirValor([select], 'Ilimitado');
                break;
              case '15 dias':
                inserirValor([select], '15 Dias');
                break;
              case '30 dias':
                inserirValor([select], '30 Dias');
                break;
              case 'não possui':
                inserirValor([select], 'Não possui');
                break;
              default:
                console.warn('Clausula não encontrada');
                break;
            }
            arrayClausulasAdicionaisPOuro.shift();
          });

          document.querySelectorAll(`[id="pPrata-clausula2"]`).forEach(select => {
            switch (arrayClausulasAdicionaisPPrata[0].toLowerCase()) {
              case 'ilimitado':
                inserirValor([select], 'Ilimitado');
                break;
              case '15 dias':
                inserirValor([select], '15 Dias');
                break;
              case '30 dias':
                inserirValor([select], '30 Dias');
                break;
              case 'não possui':
                inserirValor([select], 'Não possui');
                break;
              default:
                console.warn('Clausula não encontrada');
                break;
            }
            arrayClausulasAdicionaisPPrata.shift();
          });
        };
      };

      if (clausula.clausula === 'MARTELINHO DE OURO') {
        document.getElementById('checkbox-clausulas-3').checked = true;

        const selectClausula1 = document.getElementById('select-clausulas-p-ouro3');
        const valorClausula1 = clausula.planoOuro.toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        switch (valorClausula1) {
          case 'sim':
            selectClausula1.value = 'Sim';
            break;
          case 'não':
            selectClausula1.value = 'Não';
            break;
          default:
            console.warn('Clausula não encontrada');
            break;
        }

        const selectClausula2 = document.getElementById('select-clausulas-p-prata3');
        const valorClausula2 = clausula.planoPrata.toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        switch (valorClausula2) {
          case 'sim':
            selectClausula2.value = 'Sim';
            break;
          case 'não':
            selectClausula2.value = 'Não';
            break;
          default:
            console.warn('Clausula não encontrada');
            break;
        }

        if (dadosOrcamento.formGlobal.ciaGestor !== null) {
          document.querySelectorAll(`[id="pOuro-clausula3"]`).forEach(select => {
            switch (arrayClausulasAdicionaisPOuro[0].toLowerCase()) {
              case 'sim':
                inserirValor([select], 'Sim');
                break;
              case 'não':
                inserirValor([select], 'Não');
                break;
              default:
                console.warn('Clausula não encontrada');
                break;
            }
            arrayClausulasAdicionaisPOuro.shift();
          });

          document.querySelectorAll(`[id="pPrata-clausula3"]`).forEach(select => {
            switch (arrayClausulasAdicionaisPPrata[0].toLowerCase()) {
              case 'sim':
                inserirValor([select], 'Sim');
                break;
              case 'não':
                inserirValor([select], 'Não');
                break;
              default:
                console.warn('Clausula não encontrada');
                break;
            }
            arrayClausulasAdicionaisPPrata.shift();
          });
        };
      };

      if (clausula.clausula === 'VIDROS E RETROVISORES') {
        document.getElementById('checkbox-clausulas-4').checked = true;

        const selectClausula1 = document.getElementById('select-clausulas-p-ouro4');
        const valorClausula1 = clausula.planoOuro.toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        switch (valorClausula1) {
          case 'sim':
            selectClausula1.value = 'Sim';
            break;
          case 'não':
            selectClausula1.value = 'Não';
            break;
          default:
            console.warn('Clausula não encontrada');
            break;
        }

        const selectClausula2 = document.getElementById('select-clausulas-p-prata4');
        const valorClausula2 = clausula.planoPrata.toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        switch (valorClausula2) {
          case 'sim':
            selectClausula2.value = 'Sim';
            break;
          case 'não':
            selectClausula2.value = 'Não';
            break;
          default:
            console.warn('Clausula não encontrada');
            break;
        }

        if (dadosOrcamento.formGlobal.ciaGestor !== null) {
          document.querySelectorAll(`[id="pOuro-clausula4"]`).forEach(select => {
            switch (arrayClausulasAdicionaisPOuro[0].toLowerCase()) {
              case 'sim':
                inserirValor([select], 'Sim');
                break;
              case 'não':
                inserirValor([select], 'Não');
                break;
              default:
                console.warn('Clausula não encontrada');
                break;
            }
            arrayClausulasAdicionaisPOuro.shift();
            console.log(arrayClausulasAdicionaisPOuro)
          });

          document.querySelectorAll(`[id="pPrata-clausula4"]`).forEach(select => {
            switch (arrayClausulasAdicionaisPPrata[0].toLowerCase()) {
              case 'sim':
                inserirValor([select], 'Sim');
                break;
              case 'não':
                inserirValor([select], 'Não');
                break;
              default:
                console.warn('Clausula não encontrada');
                break;
            }
            arrayClausulasAdicionaisPPrata.shift();
          });
        };
      };

      if (clausula.clausula === 'LANTERNAS E FARÓIS') {
        document.getElementById('checkbox-clausulas-5').checked = true;

        const selectClausula1 = document.getElementById('select-clausulas-p-ouro5');
        const valorClausula1 = clausula.planoOuro.toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        switch (valorClausula1) {
          case 'sim':
            selectClausula1.value = 'Sim';
            break;
          case 'não':
            selectClausula1.value = 'Não';
            break;
          default:
            console.warn('Clausula não encontrada');
            break;
        }

        const selectClausula2 = document.getElementById('select-clausulas-p-prata5');
        const valorClausula2 = clausula.planoPrata.toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        switch (valorClausula2) {
          case 'sim':
            selectClausula2.value = 'Sim';
            break;
          case 'não':
            selectClausula2.value = 'Não';
            break;
          default:
            console.warn('Clausula não encontrada');
            break;
        }

        if (dadosOrcamento.formGlobal.ciaGestor !== null) {
          document.querySelectorAll(`[id="pOuro-clausula5"]`).forEach(select => {
            switch (arrayClausulasAdicionaisPOuro[0].toLowerCase()) {
              case 'sim':
                inserirValor([select], 'Sim');
                break;
              case 'não':
                inserirValor([select], 'Não');
                break;
              default:
                console.warn('Clausula não encontrada');
                break;
            }
            arrayClausulasAdicionaisPOuro.shift();
            console.log(arrayClausulasAdicionaisPOuro)
          });

          document.querySelectorAll(`[id="pPrata-clausula5"]`).forEach(select => {
            switch (arrayClausulasAdicionaisPPrata[0].toLowerCase()) {
              case 'sim':
                inserirValor([select], 'Sim');
                break;
              case 'não':
                inserirValor([select], 'Não');
                break;
              default:
                console.warn('Clausula não encontrada');
                break;
            }
            arrayClausulasAdicionaisPPrata.shift();
          });
        };
      };
    });

    document.getElementById('td-veiculo-table-franquias').innerHTML = `<strong style="color: #8e0101";>${dadosOrcamento.formAuto.descricao}</strong>`;

    if (dadosOrcamento.formGlobal.is_visivelFranquias === 0) {
      document.getElementById('checkbox-exibir-franquias').checked = false;
    } else if (dadosOrcamento.formGlobal.is_visivelFranquias === 1) {
    
    dadosOrcamento.franquiasAuto.forEach(franquia => {
      const selectFranquias = document.getElementById('select-tipo-franquia');
      const valorFranquias = franquia.franquia.toLowerCase(); // Normaliza para minúsculas

      // Fazemos um switch para comparar o valor da seguradora
      switch (valorFranquias) {
        case 'casco: reduzida':
          selectFranquias.value = 'Casco: Reduzida';
          break;
        case 'casco: obrigatória':
          selectFranquias.value = 'Casco: Obrigatória';
          break;
        case 'casco: majorada':
          selectFranquias.value = 'Casco: Majorada';
          break;
        case 'casco: não contratado':
          selectFranquias.value = 'Casco: Não Contratado';
          break;
        default:
          console.warn('Franquia não encontrada');
          break;
      }
    });

    document.getElementById('valor-plano-ouro-franquias').value = 'R$ ' + arrayFranquiasPOuro[0];
    document.getElementById('valor-plano-prata-franquias').value = 'R$ ' + arrayFranquiasPPrata[0];

    if (dadosOrcamento.formGlobal.ciaGestor !== null) {
      inserirValor(document.querySelectorAll(`[id="pOuro-franquia"]`), 'R$ ' + arrayFranquiasAdicionaisPOuro[0]);
      inserirValor(document.querySelectorAll(`[id="pPrata-franquia"]`), 'R$ ' + arrayFranquiasAdicionaisPPrata[0]);
    }

      if (dadosOrcamento.formGlobal.contadorFranquias > 0) {
        for (let i = 1; i <= dadosOrcamento.formGlobal.contadorFranquias; i++) {
          addFranquiaGr();
          const valorFranquiasAdd = arrayFranquiasSelect[i].toLowerCase();
          console.log(valorFranquiasAdd)
          const selectFranquias = document.querySelectorAll(`[id="select-tipo-franquia"][meta-id="${i}"]`);

          const itensFranquias = {
            'faróis auxiliares convencionais': 'Faróis Auxiliares Convencionais',
            'faróis auxiliares led': 'Faróis Auxiliares Led',
            'faróis auxiliares xenon': 'Faróis Auxiliares Xenon',
            'faróis convencionais': 'Faróis Convencionais',
            'faróis convencionais, milha e neblina': 'Faróis Convencionais, Milha e Neblina',
            'faróis led': 'Faróis Led',
            'faróis xenon': 'Faróis Xenon',
            'lanternas auxiliares': 'Lanternas Auxiliares',
            'lanternas convencionais': 'Lanternas Convencionais',
            'lanternas led': 'Lanternas Led',
            'para-brisa': 'Para-brisa',
            'retrovisores': 'Retrovisores',
            'retrovisores convencionais': 'Retrovisores Convencionais',
            'reparo de lataria e pintura/para-choque': 'Reparo de Lataria e Pintura/Para-choque',
            'reparo rápido': 'Reparo Rápido',
            'sra - reparo em arranhoes - 1a peça': 'SRA - Reparo em arranhões - 1a peça',
            'sra - reparo em arranhoes demais peças': 'SRA - Reparo em arranhões demais peças',
            'supermartelinho': 'Supermartelinho',
            'traseiro (vigia)': 'Traseiro (Vigia)',
            'vidros laterais': 'Vidros Laterais',
            'vidros para-brisa, teto solar ou panorâmico': 'Vidros Para-Brisa, Teto Solar ou Panorâmico',
            'vidros traseiros': 'Vidros Traseiros'
          };
          
          const itemFranquia = itensFranquias[valorFranquiasAdd.toLowerCase()];

          if (itemFranquia) {
            inserirValor(selectFranquias, itemFranquia);
          } else {
            console.warn('Franquia não encontrada');
          }
            
          const inputPOuro = document.querySelectorAll(`[id="valor-plano-ouro-franquias"][meta-id="${i}"]`);
          const inputPPrata = document.querySelectorAll(`[id="valor-plano-prata-franquias"][meta-id="${i}"]`);

          inserirValor(inputPOuro, 'R$ ' + arrayFranquiasPOuro[i]);
          inserirValor(inputPPrata, 'R$ ' + arrayFranquiasPPrata[i]);

          if (dadosOrcamento.formGlobal.ciaGestor !== null) {
            setTimeout(() => {
              const inputPOuroAdd = document.querySelector(`#pOuro-franquia-${i}`);
              const inputPPrataAdd = document.querySelector(`#pPrata-franquia-${i}`);
              if (inputPOuroAdd) {
                inserirValor([inputPOuroAdd], 'R$ ' + arrayFranquiasAdicionaisPOuro[i]);
              } else {
                console.warn(`Input #pOuro-franquia-${i} não encontrado`);
              }

              if (inputPPrataAdd) {
                inserirValor([inputPPrataAdd], 'R$ ' + arrayFranquiasAdicionaisPPrata[i]);
              } else {
                console.warn(`Input #pPrata-franquia-${i} não encontrado`);
              }
            }, 0);
          }
        }
      }
  }
    if (dadosOrcamento.formaPagamento.formaPagamento.toLowerCase() === 'cartão porto') {
      document.querySelector('input[name="tipo-pagamento"][value="Cartão Porto"]').checked = true;
    } else if (dadosOrcamento.formaPagamento.formaPagamento.toLowerCase() === 'cartão de crédito') {
      document.querySelector('input[name="tipo-pagamento"][value="Cartão de Crédito"]').checked = true;
    } else if (dadosOrcamento.formaPagamento.formaPagamento.toLowerCase() === 'débito em conta') {
      document.querySelector('input[name="tipo-pagamento"][value="Débito em Conta"]').checked = true;
    } else if (dadosOrcamento.formaPagamento.formaPagamento.toLowerCase() === 'boleto') {
      document.querySelector('input[name="tipo-pagamento"][value="Boleto"]').checked = true;
    }

    document.getElementById('valor-avista-plano-ouro').value = dadosOrcamento.formaPagamento.premioPOuro;
    document.getElementById('valor-avista-plano-prata').value = dadosOrcamento.formaPagamento.premioPPrata;


    dadosOrcamento.pagamentoAuto.forEach(pagamento => {
      if (pagamento.parcela.startsWith('A VISTA')) {
        document.getElementById('checkbox-pagamento-avista').checked = true;
        document.getElementById('input-valor-avista-plano-ouro').value = 'R$ ' + pagamento.planoOuro;
        document.getElementById('input-valor-avista-plano-prata').value = 'R$ ' + pagamento.planoPrata;
        if (dadosOrcamento.formGlobal.ciaGestor !== null) {
          inserirValor(document.querySelectorAll(`[id="pOuroAVista"]`), 'R$ ' + arrayPagamentosAdicionaisPOuro[0]);
          arrayPagamentosAdicionaisPOuro.shift();
          inserirValor(document.querySelectorAll(`[id="pPrataAVista"]`), 'R$ ' + arrayPagamentosAdicionaisPPrata[0]);
          arrayPagamentosAdicionaisPPrata.shift();
        }
      }

      for (let i = 1; i <= 12; i++) {
        if (pagamento.parcela.startsWith(`${i}X`)) {
          document.getElementById(`checkbox-pagamento-${i}`).checked = true;
          document.getElementById(`input-valor-${i}x-plano-ouro`).value = 'R$ ' + pagamento.planoOuro;
          document.getElementById(`input-valor-${i}x-plano-prata`).value = 'R$ ' + pagamento.planoPrata;
          if (dadosOrcamento.formGlobal.ciaGestor !== null) {
            inserirValor(document.querySelectorAll(`[id="pOuro${i}"]`), 'R$ ' + arrayPagamentosAdicionaisPOuro[0]);
            arrayPagamentosAdicionaisPOuro.shift();
            inserirValor(document.querySelectorAll(`[id="pPrata${i}"]`), 'R$ ' + arrayPagamentosAdicionaisPPrata[0]);
            arrayPagamentosAdicionaisPPrata.shift();
          }
        }
      }
    });
  } else if (dadosOrcamento.formGlobal.modalidade === 'Menor') {
    // Menor Preco

    if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco > 0) {
      
      dadosOrcamento.coberturasAuto_Adicional.forEach(coberturaAdd => {
        arrayCoberturasAdicionaisValor1.push(coberturaAdd.valor1);
      });

      dadosOrcamento.coberturasAuto_Adicional.forEach(coberturaAdd => {
        arrayCoberturasAdicionaisValor2.push(coberturaAdd.valor2);
      });

      dadosOrcamento.coberturasAuto_Adicional.forEach(coberturaAdd => {
        arrayCoberturasAdicionaisValor3.push(coberturaAdd.valor3);
      });

      dadosOrcamento.clausulasAuto_Adicional.forEach(clausulaAdd => {
        arrayClausulasAdicionaisValor1.push(clausulaAdd.valor1);
      });

      dadosOrcamento.clausulasAuto_Adicional.forEach(clausulaAdd => {
        arrayClausulasAdicionaisValor2.push(clausulaAdd.valor2);
      });

      dadosOrcamento.clausulasAuto_Adicional.forEach(clausulaAdd => {
        arrayClausulasAdicionaisValor3.push(clausulaAdd.valor3);
      });

      dadosOrcamento.franquiasAuto_Adicional.forEach(franquiaAdd => {
        arrayFranquiasAdicionaisValor1.push(removerRS(franquiaAdd.valor1));
      });

      dadosOrcamento.franquiasAuto_Adicional.forEach(franquiaAdd => {
        arrayFranquiasAdicionaisValor2.push(removerRS(franquiaAdd.valor2));
      });

      dadosOrcamento.franquiasAuto_Adicional.forEach(franquiaAdd => {
        arrayFranquiasAdicionaisValor3.push(removerRS(franquiaAdd.valor3));
      });

      dadosOrcamento.pagamentoAuto_Adicional.forEach(pagamentoAdd => {
        arrayPagamentosAdicionaisValor1.push(pagamentoAdd.valor1);
      });

      dadosOrcamento.pagamentoAuto_Adicional.forEach(pagamentoAdd => {
        arrayPagamentosAdicionaisValor2.push(pagamentoAdd.valor2);
      });

      dadosOrcamento.pagamentoAuto_Adicional.forEach(pagamentoAdd => {
        arrayPagamentosAdicionaisValor3.push(pagamentoAdd.valor3);
      });

      for (let i = 1; i <= dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco; i++) {
        addSeguradoraIndividualExport();

        const selectSeguradoraDinamic = document.querySelectorAll(`[class="select-seguradora"][data-id="${i}"]`);
        const valorCia = dadosOrcamento.formGlobal[`cia${i}`].toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        const seguradoras = {
          'allianz': 'Allianz',
          'allianz trade': 'Allianz Trade',
          'american life': 'American Life',
          'axa': 'AXA',
          'azul': 'Azul',
          'bradesco': 'Bradesco',
          'hdi': 'HDI',
          'itau': 'Itau',
          'liberty': 'Liberty',
          'mapfre': 'Mapfre',
          'mitsui': 'Mitsui',
          'porto': 'Porto',
          'pottencial': 'Pottencial',
          'sulamerica': 'SulAmerica',
          'sompo': 'Sompo',
          'suhai': 'Suhai',
          'tokio': 'Tokio',
          'zurich': 'Zurich'
        };

        const seguradora = seguradoras[valorCia.toLowerCase()];

        if (seguradora) {
          inserirValor(selectSeguradoraDinamic, seguradora);
        } else {
          console.warn('Seguradora não encontrada');
        }        
      }
    }

    dadosOrcamento.franquiasAuto.forEach(franquiaAdd => {
      arrayFranquiasIndividualSelect.push(franquiaAdd.franquia);
      arrayFranquiasIndividual.push(removerRS(franquiaAdd.valor));
    });

    if (dadosOrcamento.formGlobal.is_visivelFranquias === 0) {
      document.getElementById('checkbox-exibir-franquias-individual').checked = false;
    }

    if (dadosOrcamento.formGlobal.is_visivelObservacoes === 0) {
      document.getElementById('observacoes-checkbox-aceito').checked = false;
    }

    document.querySelector('input[name="tipo-orcamento"][value="Menor"]').checked = true;
    displayBlockNone(sectionPOP, 'none', sectionIndividual, 'block');
    displayBlockNone(addCia, 'none', newButtonAdd, 'block');

    dadosOrcamento.coberturasAuto.forEach(cobertura => {
      if (cobertura.cobertura === 'COLISÃO, INCÊNCIO E ROUBO') {
        document.getElementById('checkbox-cobertura-1-individual').checked = true;
        document.getElementById('valor-individual-cobertura1').value = '100% TAB. FIPE';
        
        if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 1) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-fipe1"]`), arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();
        } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 2) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-fipe1"]`), arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-fipe2"]`), arrayCoberturasAdicionaisValor2[0]);
          arrayCoberturasAdicionaisValor2.shift();
        } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 3) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-fipe1"]`), arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-fipe2"]`), arrayCoberturasAdicionaisValor2[0]);
          arrayCoberturasAdicionaisValor2.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-fipe3"]`), arrayCoberturasAdicionaisValor3[0]);
          arrayCoberturasAdicionaisValor3.shift();
        }
      };

      if (cobertura.cobertura === 'DANOS MATERIAIS') {
        document.getElementById('checkbox-cobertura-2-individual').checked = true;
        document.getElementById('valor-individual-cobertura2').value = 'R$ ' + cobertura.valor;

        if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 1) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-materiais1"]`),'R$ ' + arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();
        } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 2) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-materiais1"]`),'R$ ' + arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-materiais2"]`),'R$ ' + arrayCoberturasAdicionaisValor2[0]);
          arrayCoberturasAdicionaisValor2.shift();
        } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 3) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-materiais1"]`),'R$ ' + arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-materiais2"]`),'R$ ' + arrayCoberturasAdicionaisValor2[0]);
          arrayCoberturasAdicionaisValor2.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-materiais3"]`),'R$ ' + arrayCoberturasAdicionaisValor3[0]);
          arrayCoberturasAdicionaisValor3.shift();
        }
      };

      if (cobertura.cobertura === 'DANOS CORPORAIS') {
        document.getElementById('checkbox-cobertura-3-individual').checked = true;
        document.getElementById('valor-individual-cobertura3').value = 'R$ ' + cobertura.valor;

        if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 1) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-corporais1"]`),'R$ ' + arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();
        } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 2) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-corporais1"]`),'R$ ' + arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-corporais2"]`),'R$ ' + arrayCoberturasAdicionaisValor2[0]);
          arrayCoberturasAdicionaisValor2.shift();
        } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 3) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-corporais1"]`),'R$ ' + arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-corporais2"]`),'R$ ' + arrayCoberturasAdicionaisValor2[0]);
          arrayCoberturasAdicionaisValor2.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-corporais3"]`),'R$ ' + arrayCoberturasAdicionaisValor3[0]);
          arrayCoberturasAdicionaisValor3.shift();
        }
      };

      if (cobertura.cobertura === 'DANOS MORAIS') {
        document.getElementById('checkbox-cobertura-4-individual').checked = true;
        document.getElementById('valor-individual-cobertura4').value = 'R$ ' + cobertura.valor;

        if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 1) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-morais1"]`),'R$ ' + arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();
        } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 2) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-morais1"]`),'R$ ' + arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-morais2"]`),'R$ ' + arrayCoberturasAdicionaisValor2[0]);
          arrayCoberturasAdicionaisValor2.shift();
        } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 3) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-morais1"]`),'R$ ' + arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-morais2"]`),'R$ ' + arrayCoberturasAdicionaisValor2[0]);
          arrayCoberturasAdicionaisValor2.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-danos-morais3"]`),'R$ ' + arrayCoberturasAdicionaisValor3[0]);
          arrayCoberturasAdicionaisValor3.shift();
        }
      };

      if (cobertura.cobertura === 'APP - MORTE') {
        document.getElementById('checkbox-cobertura-5-individual').checked = true;
        document.getElementById('valor-individual-cobertura5').value = 'R$ ' + cobertura.valor;

        if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 1) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-app-morte1"]`),'R$ ' + arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();
        } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 2) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-app-morte1"]`),'R$ ' + arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-app-morte2"]`),'R$ ' + arrayCoberturasAdicionaisValor2[0]);
          arrayCoberturasAdicionaisValor2.shift();
        } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 3) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-app-morte1"]`),'R$ ' + arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-app-morte2"]`),'R$ ' + arrayCoberturasAdicionaisValor2[0]);
          arrayCoberturasAdicionaisValor2.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-app-morte3"]`),'R$ ' + arrayCoberturasAdicionaisValor3[0]);
          arrayCoberturasAdicionaisValor3.shift();
        }
      };

      if (cobertura.cobertura === 'APP - INVALIDEZ') {
        document.getElementById('checkbox-cobertura-6-individual').checked = true;
        document.getElementById('valor-individual-cobertura6').value = 'R$ ' + cobertura.valor;

        if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 1) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-app-invalidez1"]`),'R$ ' + arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();
        } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 2) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-app-invalidez1"]`),'R$ ' + arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-app-invalidez2"]`),'R$ ' + arrayCoberturasAdicionaisValor2[0]);
          arrayCoberturasAdicionaisValor2.shift();
        } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 3) {
          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-app-invalidez1"]`),'R$ ' + arrayCoberturasAdicionaisValor1[0]);
          arrayCoberturasAdicionaisValor1.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-app-invalidez2"]`),'R$ ' + arrayCoberturasAdicionaisValor2[0]);
          arrayCoberturasAdicionaisValor2.shift();

          inserirValor(document.querySelectorAll(`[id="v-individual-cobertura-app-invalidez3"]`),'R$ ' + arrayCoberturasAdicionaisValor3[0]);
          arrayCoberturasAdicionaisValor3.shift();
        }
      };
    });

    dadosOrcamento.clausulasAuto.forEach(clausula => {
      if (clausula.clausula === 'ASSISTÊNCIA 24H') {
        document.getElementById('checkbox-clausulas-1-individual').checked = true;

        const selectClausula = document.getElementById('select-clausulas-individual1');
        const valorClausula = clausula.valor.toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        switch (valorClausula) {
          case 'sim':
            selectClausula.value = 'Sim';
            break;
          case 'não':
            selectClausula.value = 'Não';
            break;
          default:
            console.warn('Clausula não encontrada');
            break;
        }

        const clausulasArray = [
          arrayClausulasAdicionaisValor1,
          arrayClausulasAdicionaisValor2,
          arrayClausulasAdicionaisValor3
        ];
        
        const numeroClausulas = dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco;
        
        for (let i = 1; i <= numeroClausulas; i++) {
          const clausulaArray = clausulasArray[i - 1];
          const clausulaId = `v-individual-clausulas-assistencia24h${i}`;
          
          document.querySelectorAll(`[id="${clausulaId}"]`).forEach(select => {
            const valor = clausulaArray[0].toLowerCase();
        
            switch (valor) {
              case 'sim':
                inserirValor([select], 'SIM');
                break;
              case 'não':
                inserirValor([select], 'NÃO');
                break;
              default:
                console.warn('Clausula não encontrada');
                break;
            }
        
            clausulaArray.shift();
          });
        }

      };

      if (clausula.clausula === 'CARRO RESERVA') {
        document.getElementById('checkbox-clausulas-2-individual').checked = true;

        const selectClausula = document.getElementById('select-clausulas-individual2');
        const valorClausula = clausula.valor.toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        switch (valorClausula) {
          case 'ilimitado':
            selectClausula.value = 'Ilimitado';
            break;
          case '15 dias':
            selectClausula.value = '15 Dias';
            break;
          case '30 dias':
            selectClausula.value = '30 Dias';
            break;
          case 'não possui':
            selectClausula.value = 'Não possui';
            break;
          default:
            console.warn('Clausula não encontrada');
            break;
        }

        const clausulasArray = [
          arrayClausulasAdicionaisValor1,
          arrayClausulasAdicionaisValor2,
          arrayClausulasAdicionaisValor3
        ];
        
        const numeroClausulas = dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco;
        
        for (let i = 1; i <= numeroClausulas; i++) {
          const clausulaArray = clausulasArray[i - 1];
          const clausulaId = `v-individual-clausulas-carro-reserva${i}`;
          
          document.querySelectorAll(`[id="${clausulaId}"]`).forEach(select => {
            const valor = clausulaArray[0].toLowerCase();
        
            switch (valor) {
              case 'ilimitado':
                inserirValor([select], 'ILIMITADO');
                break;
              case '15 dias':
                inserirValor([select], '15 DIAS');
                break;
              case '30 dias':
                inserirValor([select], '30 DIAS');
              break;
              case 'não possui':
                inserirValor([select], 'NÃO POSSUI');
              break;
              default:
                console.warn('Clausula não encontrada');
                break;
            }
        
            clausulaArray.shift();
          });
        }
      };

      if (clausula.clausula === 'MARTELINHO DE OURO') {
        document.getElementById('checkbox-clausulas-3-individual').checked = true;

        const selectClausula = document.getElementById('select-clausulas-individual3');
        const valorClausula = clausula.valor.toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        switch (valorClausula) {
          case 'sim':
            selectClausula.value = 'Sim';
            break;
          case 'não':
            selectClausula.value = 'Não';
            break;
          default:
            console.warn('Clausula não encontrada');
            break;
        }

        const clausulasArray = [
          arrayClausulasAdicionaisValor1,
          arrayClausulasAdicionaisValor2,
          arrayClausulasAdicionaisValor3
        ];
        
        const numeroClausulas = dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco;
        
        for (let i = 1; i <= numeroClausulas; i++) {
          const clausulaArray = clausulasArray[i - 1];
          const clausulaId = `v-individual-clausulas-martelinho-ouro${i}`;
          
          document.querySelectorAll(`[id="${clausulaId}"]`).forEach(select => {
            const valor = clausulaArray[0].toLowerCase();
        
            switch (valor) {
              case 'sim':
                inserirValor([select], 'SIM');
                break;
              case 'não':
                inserirValor([select], 'NÃO');
                break;
              default:
                console.warn('Clausula não encontrada');
                break;
            }
        
            clausulaArray.shift();
          });
        }
      };

      if (clausula.clausula === 'VIDROS E RETROVISORES') {
        document.getElementById('checkbox-clausulas-4-individual').checked = true;

        const selectClausula = document.getElementById('select-clausulas-individual4');
        const valorClausula = clausula.valor.toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        switch (valorClausula) {
          case 'sim':
            selectClausula.value = 'Sim';
            break;
          case 'não':
            selectClausula.value = 'Não';
            break;
          default:
            console.warn('Clausula não encontrada');
            break;
        }

        const clausulasArray = [
          arrayClausulasAdicionaisValor1,
          arrayClausulasAdicionaisValor2,
          arrayClausulasAdicionaisValor3
        ];
        
        const numeroClausulas = dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco;
        
        for (let i = 1; i <= numeroClausulas; i++) {
          const clausulaArray = clausulasArray[i - 1];
          const clausulaId = `v-individual-clausulas-vidros-retrovisores${i}`;
          
          document.querySelectorAll(`[id="${clausulaId}"]`).forEach(select => {
            const valor = clausulaArray[0].toLowerCase();
        
            switch (valor) {
              case 'sim':
                inserirValor([select], 'SIM');
                break;
              case 'não':
                inserirValor([select], 'NÃO');
                break;
              default:
                console.warn('Clausula não encontrada');
                break;
            }
        
            clausulaArray.shift();
          });
        }
      };

      if (clausula.clausula === 'LANTERNAS E FARÓIS') {
        document.getElementById('checkbox-clausulas-5-individual').checked = true;

        const selectClausula = document.getElementById('select-clausulas-individual5');
        const valorClausula = clausula.valor.toLowerCase(); // Normaliza para minúsculas

        // Fazemos um switch para comparar o valor da seguradora
        switch (valorClausula) {
          case 'sim':
            selectClausula.value = 'Sim';
            break;
          case 'não':
            selectClausula.value = 'Não';
            break;
          default:
            console.warn('Clausula não encontrada');
            break;
        }

        const clausulasArray = [
          arrayClausulasAdicionaisValor1,
          arrayClausulasAdicionaisValor2,
          arrayClausulasAdicionaisValor3
        ];
        
        const numeroClausulas = dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco;
        
        for (let i = 1; i <= numeroClausulas; i++) {
          const clausulaArray = clausulasArray[i - 1];
          const clausulaId = `v-individual-clausulas-lanternas-farois${i}`;
          
          document.querySelectorAll(`[id="${clausulaId}"]`).forEach(select => {
            const valor = clausulaArray[0].toLowerCase();
        
            switch (valor) {
              case 'sim':
                inserirValor([select], 'SIM');
                break;
              case 'não':
                inserirValor([select], 'NÃO');
                break;
              default:
                console.warn('Clausula não encontrada');
                break;
            }
        
            clausulaArray.shift();
          });
        }
      };
    });

    document.getElementById('td-veiculo-table-franquias-individual').innerHTML = `<strong style="color: #8e0101";>${dadosOrcamento.formAuto.descricao}</strong>`;

    if (dadosOrcamento.formGlobal.is_visivelFranquias === 0) {
      document.getElementById('checkbox-exibir-franquias-individual').checked = false;
    } else if (dadosOrcamento.formGlobal.is_visivelFranquias === 1) {
      dadosOrcamento.franquiasAuto.forEach(franquia => {
        const selectFranquias = document.getElementById('select-tipo-individual-franquia');
        const valorFranquias = franquia.franquia.toLowerCase(); // Normaliza para minúsculas
  
        // Fazemos um switch para comparar o valor da seguradora
        switch (valorFranquias) {
          case 'casco: reduzida':
            selectFranquias.value = 'Casco: Reduzida';
            break;
          case 'casco: obrigatória':
            selectFranquias.value = 'Casco: Obrigatória';
            break;
          case 'casco: majorada':
            selectFranquias.value = 'Casco: Majorada';
            break;
          case 'casco: não contratado':
            selectFranquias.value = 'Casco: Não Contratado';
            break;
          default:
            console.warn('Franquia não encontrada');
            break;
        }
      });

      document.getElementById('valor-individual-franquias').value = arrayFranquiasIndividual[0];

      if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco > 0) {
       if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 1) {
        inserirValor(document.querySelectorAll(`[id="v-individual-franquia1"]`), 'R$ ' + arrayFranquiasAdicionaisValor1[0]);
       } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 2) {
        inserirValor(document.querySelectorAll(`[id="v-individual-franquia1"]`), 'R$ ' + arrayFranquiasAdicionaisValor1[0]);
        inserirValor(document.querySelectorAll(`[id="v-individual-franquia2"]`), 'R$ ' + arrayFranquiasAdicionaisValor2[0]);
       } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 3) {
        inserirValor(document.querySelectorAll(`[id="v-individual-franquia1"]`), 'R$ ' + arrayFranquiasAdicionaisValor1[0]);
        inserirValor(document.querySelectorAll(`[id="v-individual-franquia2"]`), 'R$ ' + arrayFranquiasAdicionaisValor2[0]);
        inserirValor(document.querySelectorAll(`[id="v-individual-franquia3"]`), 'R$ ' + arrayFranquiasAdicionaisValor3[0]);   
       }
  
    }

    if (dadosOrcamento.formGlobal.contadorFranquias > 0) {
      for (let i = 1; i <= dadosOrcamento.formGlobal.contadorFranquias; i++) {
        addFranquiaMn();
        const valorFranquiasAdd = arrayFranquiasIndividualSelect[i].toLowerCase();
        console.log(valorFranquiasAdd)
        const selectFranquias = document.querySelectorAll(`[id="select-tipo-franquia-individual"][meta-id="${i}"]`);

        const itensFranquias = {
          'faróis auxiliares convencionais': 'Faróis Auxiliares Convencionais',
          'faróis auxiliares led': 'Faróis Auxiliares Led',
          'faróis auxiliares xenon': 'Faróis Auxiliares Xenon',
          'faróis convencionais': 'Faróis Convencionais',
          'faróis convencionais, milha e neblina': 'Faróis Convencionais, Milha e Neblina',
          'faróis led': 'Faróis Led',
          'faróis xenon': 'Faróis Xenon',
          'lanternas auxiliares': 'Lanternas Auxiliares',
          'lanternas convencionais': 'Lanternas Convencionais',
          'lanternas led': 'Lanternas Led',
          'para-brisa': 'Para-brisa',
          'retrovisores': 'Retrovisores',
          'retrovisores convencionais': 'Retrovisores Convencionais',
          'reparo de lataria e pintura/para-choque': 'Reparo de Lataria e Pintura/Para-choque',
          'reparo rápido': 'Reparo Rápido',
          'sra - reparo em arranhoes - 1a peça': 'SRA - Reparo em arranhões - 1a peça',
          'sra - reparo em arranhoes demais peças': 'SRA - Reparo em arranhões demais peças',
          'supermartelinho': 'Supermartelinho',
          'traseiro (vigia)': 'Traseiro (Vigia)',
          'vidros laterais': 'Vidros Laterais',
          'vidros para-brisa, teto solar ou panorâmico': 'Vidros Para-Brisa, Teto Solar ou Panorâmico',
          'vidros traseiros': 'Vidros Traseiros'
        };

        const itemFranquia = itensFranquias[valorFranquiasAdd.toLowerCase()];

        if (itemFranquia) {
          inserirValor(selectFranquias, itemFranquia);
        } else {
          console.warn('Franquia não encontrada');
        }

        const input = document.querySelectorAll(`[id="valor-individual-franquias"][meta-id="${i}"]`);

        inserirValor(input, 'R$ ' + arrayFranquiasIndividual[i]);

        if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco > 0) {
            setTimeout(() => {
              const tr = document.querySelector(`[class="tr-container-franquias-individual"][data-id="${i}"]`);
              if (tr) {
                const input1 = tr.querySelector('[data-id="1"]');
                const input2 = tr.querySelector('[data-id="2"]');
                const input3 = tr.querySelector('[data-id="3"]');

                if (input1) inserirValorFranquiasIndividual(input1, 'R$ ' + arrayFranquiasAdicionaisValor1[i]);
                if (input2) inserirValorFranquiasIndividual(input2, 'R$ ' + arrayFranquiasAdicionaisValor2[i]);
                if (input3) inserirValorFranquiasIndividual(input3, 'R$ ' + arrayFranquiasAdicionaisValor3[i]);
                console.log(input1)
              } else {
                console.warn(`Input #v-individual-add-franquia-${i} não encontrado`);
              }
            }, 0);
        }
      }
    }
  }

    if (dadosOrcamento.formaPagamento.formaPagamento.toLowerCase() === 'cartão porto') {
      document.querySelector('input[name="tipo-pagamento-individual"][value="Cartão Porto"]').checked = true;
    } else if (dadosOrcamento.formaPagamento.formaPagamento.toLowerCase() === 'cartão de crédito') {
      document.querySelector('input[name="tipo-pagamento-individual"][value="Cartão de Crédito"]').checked = true;
    } else if (dadosOrcamento.formaPagamento.formaPagamento.toLowerCase() === 'débito em conta') {
      document.querySelector('input[name="tipo-pagamento-individual"][value="Débito em Conta"]').checked = true;
    } else if (dadosOrcamento.formaPagamento.formaPagamento.toLowerCase() === 'boleto') {
      document.querySelector('input[name="tipo-pagamento-individual"][value="Boleto"]').checked = true;
    }

    document.getElementById('valor-avista-individual').value = dadosOrcamento.formaPagamento.valor;

    if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco > 0) {
      if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 1) {
        inserirValor(document.querySelectorAll(`[id="valor-avista-individual1"]`), 'R$ ' + dadosOrcamento.formaPagamento_Adicional.valor1);
      } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 2) {
        inserirValor(document.querySelectorAll(`[id="valor-avista-individual1"]`), 'R$ ' + dadosOrcamento.formaPagamento_Adicional.valor1);
        inserirValor(document.querySelectorAll(`[id="valor-avista-individual2"]`), 'R$ ' + dadosOrcamento.formaPagamento_Adicional.valor2);
      } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 3) {
        inserirValor(document.querySelectorAll(`[id="valor-avista-individual1"]`), 'R$ ' + dadosOrcamento.formaPagamento_Adicional.valor1);
        inserirValor(document.querySelectorAll(`[id="valor-avista-individual2"]`), 'R$ ' + dadosOrcamento.formaPagamento_Adicional.valor2);
        inserirValor(document.querySelectorAll(`[id="valor-avista-individual3"]`), 'R$ ' + dadosOrcamento.formaPagamento_Adicional.valor3);
      } 
    }

    dadosOrcamento.pagamentoAuto.forEach(pagamento => {
      if (pagamento.parcela.startsWith('A VISTA')) {
        document.getElementById('checkbox-pagamento-avista-individual').checked = true;
        document.getElementById('input-valor-avista-individual').value = pagamento.valor;
        if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco > 0) {
          if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 1) {
            inserirValor(document.querySelectorAll(`[id="v-individual-pagamento-AVista1"]`), 'R$ ' + arrayPagamentosAdicionaisValor1[0]);
            arrayPagamentosAdicionaisValor1.shift();
          } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 2) {
            inserirValor(document.querySelectorAll(`[id="v-individual-pagamento-AVista1"]`), 'R$ ' + arrayPagamentosAdicionaisValor1[0]);
            arrayPagamentosAdicionaisValor1.shift();

            inserirValor(document.querySelectorAll(`[id="v-individual-pagamento-AVista2"]`), 'R$ ' + arrayPagamentosAdicionaisValor2[0]);
            arrayPagamentosAdicionaisValor2.shift();
          } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 3) {
            inserirValor(document.querySelectorAll(`[id="v-individual-pagamento-AVista1"]`), 'R$ ' + arrayPagamentosAdicionaisValor1[0]);
            arrayPagamentosAdicionaisValor1.shift();

            inserirValor(document.querySelectorAll(`[id="v-individual-pagamento-AVista2"]`), 'R$ ' + arrayPagamentosAdicionaisValor2[0]);
            arrayPagamentosAdicionaisValor2.shift();

            inserirValor(document.querySelectorAll(`[id="v-individual-pagamento-AVista3"]`), 'R$ ' + arrayPagamentosAdicionaisValor3[0]);
            arrayPagamentosAdicionaisValor3.shift();
          }
        }
      }

      for (let i = 1; i <= 12; i++) {
        if (pagamento.parcela.startsWith(`${i}X`)) {
          document.getElementById(`checkbox-pagamento-${i}-individual`).checked = true;
          document.getElementById(`input-valor-${i}x-individual`).value = pagamento.valor;
          if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco > 0) {
            if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 1) {
              inserirValor(document.querySelectorAll(`[id="v-individual-pagamento-${i}1"]`), 'R$ ' + arrayPagamentosAdicionaisValor1[0]);
              arrayPagamentosAdicionaisValor1.shift();
            } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 2) {
              inserirValor(document.querySelectorAll(`[id="v-individual-pagamento-${i}1"]`), 'R$ ' + arrayPagamentosAdicionaisValor1[0]);
              arrayPagamentosAdicionaisValor1.shift();

              inserirValor(document.querySelectorAll(`[id="v-individual-pagamento-${i}2"]`), 'R$ ' + arrayPagamentosAdicionaisValor2[0]);
              arrayPagamentosAdicionaisValor2.shift();
            } else if (dadosOrcamento.formGlobal.seguradoraSecundariaMenorPreco === 3) {
              inserirValor(document.querySelectorAll(`[id="v-individual-pagamento-${i}1"]`), 'R$ ' + arrayPagamentosAdicionaisValor1[0]);
              arrayPagamentosAdicionaisValor1.shift();

              inserirValor(document.querySelectorAll(`[id="v-individual-pagamento-${i}2"]`), 'R$ ' + arrayPagamentosAdicionaisValor2[0]);
              arrayPagamentosAdicionaisValor2.shift();

              inserirValor(document.querySelectorAll(`[id="v-individual-pagamento-${i}3"]`), 'R$ ' + arrayPagamentosAdicionaisValor3[0]);
              arrayPagamentosAdicionaisValor3.shift();
            }
          }
        }
      }
    })
  }

  const selectSeguradora = document.getElementById('select-seguradora');
  const pTitleSeguradora = document.querySelectorAll('.p-title-table-seguradora');
  const valorCia = dadosOrcamento.formGlobal.cia.toLowerCase(); // Normaliza para minúsculas

  // Fazemos um switch para comparar o valor da seguradora
  const seguradoras = {
    'allianz': 'Allianz',
    'allianz trade': 'Allianz Trade',
    'american life': 'American Life',
    'axa': 'AXA',
    'azul': 'Azul',
    'bradesco': 'Bradesco',
    'hdi': 'HDI',
    'itau': 'Itau',
    'liberty': 'Liberty',
    'mapfre': 'Mapfre',
    'mitsui': 'Mitsui',
    'porto': 'Porto',
    'pottencial': 'Pottencial',
    'sulamerica': 'SulAmerica',
    'sompo': 'Sompo',
    'suhai': 'Suhai',
    'tokio': 'Tokio',
    'zurich': 'Zurich'
  };

  const seguradora = seguradoras[valorCia.toLowerCase()];

  if (seguradora) {
    selectSeguradora.value = seguradora;
    pTitleSeguradora.forEach(p => {
      p.innerHTML = seguradora; // Define o nome da seguradora como o conteúdo HTML de cada elemento
    });
  } else {
    console.warn('Seguradora não encontrada');
  }


  if (dadosOrcamento.formGlobal.semLogo === 1) {
    document.getElementById('sem-logo-cia').checked = true;
  }

  if (dadosOrcamento.formGlobal.tipoOrcamento === 'RENOVAÇÃO') {
    document.querySelector('input[name="tipo-seguro"][value="Renovação"]').checked = true;
  } else if (dadosOrcamento.formGlobal.tipoOrcamento === 'SEGURO NOVO') {
    document.querySelector('input[name="tipo-seguro"][value="Seguro Novo"]').checked = true;
  }

  const selectComercial = document.getElementById('select-preposto');
  const valorComercial = dadosOrcamento.formGlobal.comercial.toLowerCase(); // Normaliza para minúsculas

  // Fazemos um switch para comparar o valor da seguradora
  switch (valorComercial) {
    case 'amanda gonçalves':
      selectComercial.value = 'Amanda Gonçalves';
      break;
    case 'amarylis gobo':
      selectComercial.value = 'Amarylis Gobo';
      break;
    case 'felipe almeida':
      selectComercial.value = 'Felipe Almeida';
      break;
    case 'gilberto fadiga':
      selectComercial.value = 'Gilberto Fadiga';
      break;
    case 'lucas maldonado':
      selectComercial.value = 'Lucas Maldonado';
      break;
    case 'lucelena ferreira':
      selectComercial.value = 'Lucelena Ferreira';
      break;
    case 'mateus milane':
      selectComercial.value = 'Mateus Milane';
      break;
    case 'ricardo fadiga':
      selectComercial.value = 'Ricardo Fadiga';
      break;
    case 'paulo campos':
      selectComercial.value = 'Paulo Campos';
      break;
    case 'viviane fogarolli':
      selectComercial.value = 'Viviane Fogarolli';
      break;
    default:
      console.warn('Preposto não encontrada');
      break;
  }


  document.getElementById('input-data').value = dadosOrcamento.formGlobal.dataOrcamento;
  document.getElementById('input-nome-cliente').value = dadosOrcamento.formGlobal.cliente;
  document.getElementById('input-celular').value = dadosOrcamento.formGlobal.celular;

  if (dadosOrcamento.formGlobal.tipoPessoa === 'PF') {
    document.querySelector('input[name="tipo_pessoa"][value="PF"]').checked = true;
  } else if (dadosOrcamento.formGlobal.tipoPessoa === 'PJ') {
    document.querySelector('input[name="tipo_pessoa"][value="PJ"]').checked = true;
  }

  // Preenchendo dados do formAuto
  document.querySelector('.input-fab').value = dadosOrcamento.formAuto.fabricacao;
  document.querySelector('.input-mod').value = dadosOrcamento.formAuto.modelo;
  if (dadosOrcamento.formAuto.zeroKm === 1) {
    document.getElementById('0km-veiculo').checked = true;
  }
  document.querySelector('.input-veiculo').value = dadosOrcamento.formAuto.descricao;

  const selectCombustivel = document.getElementById('select-combustivel-veiculo');
  const valorCombustivel = dadosOrcamento.formAuto.combustivel.toLowerCase(); // Normaliza para minúsculas

  // Fazemos um switch para comparar o valor da seguradora
  switch (valorCombustivel) {
    case 'gasolina':
      selectCombustivel.value = 'Gasolina';
      break;
    case 'álcool':
      selectCombustivel.value = 'Álcool';
      break;
    case 'flex':
      selectCombustivel.value = 'Flex';
      break;
    case 'diesel':
      selectCombustivel.value = 'Diesel';
      break;
    case 'elétrico':
      selectCombustivel.value = 'Elétrico';
      break;
    default:
      console.warn('Combustivel não encontrada');
      break;
  }

  document.querySelector('.input-placa').value = dadosOrcamento.formAuto.placa;

  if (dadosOrcamento.formGlobal.is_visivelObservacoes === 0) {
    document.getElementById('observacoes-checkbox-aceito').checked = false;
  } else if (dadosOrcamento.formGlobal.is_visivelObservacoes === 1) {
    document.getElementById('observacoes-textarea').value = dadosOrcamento.observacoes.textArea;

    if (dadosOrcamento.observacoes.check1 === 1) {
      document.getElementById('obs-checkbox-1').checked = true;
    }

    if (dadosOrcamento.observacoes.check2 === 1) {
      document.getElementById('obs-checkbox-2').checked = true;
    }

    if (dadosOrcamento.observacoes.check3 === 1) {
      document.getElementById('obs-checkbox-3').checked = true;
    }
  }

} else {
  alert('Dados não encontrados!');
}

function inserirValor(input, valor) {
  input.forEach(input => {
    input.value = valor;
    const event = new InputEvent('change', { bubbles: true });
    input.dispatchEvent(event);
  });
}

function inserirValorFranquiasIndividual(input, valor) {
  if (!input) return;
  input.value = valor;
  input.dispatchEvent(new InputEvent('change', { bubbles: true }));
}