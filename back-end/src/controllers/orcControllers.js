const knex = require('../config/data')

class OrcControllers {
  async saveOrcamento(req, res) {

    const handleEmptyValues = (value) => {
      return value === '' || value === null || value === undefined ? null : value;
    };

    // [formGlobal]
    const { idOrcamento, tipoOrcamentoSelecionado, ciaSeguradora, ciaGestorRisco, ciaMenorPreco1, ciaMenorPreco2, ciaMenorPreco3, semLogoCiaValue, tipoSeguro,
      prepostoSelecionado, dataAtual, nomeCliente, celularCliente, tipoPessoa, ramo, seguradoraRecomendada, checkboxFranquiasGestor, observacoesCheckboxAceito,
      seguradoraStatus, seguradoraStatusGrMn
    } = req.body;

    let checkboxFranquia = 0;
    if (checkboxFranquiasGestor === true) {
      checkboxFranquia = 1;
    }

    let checkboxObservacao = 0;
    if (observacoesCheckboxAceito === true) {
      checkboxObservacao = 1;
    }

    // [formAuto]
    const { anoVeiculo, modeloVeiculo, intZeroKmCheckbox, nomeVeiculo, combustivelSelecionado, placaVeiculo } = req.body;

    // [coberturasAuto]
    const { cobertura1, coberturas, cobertura1MenorPreco, coberturasMenorPreco } = req.body;

    // [coberturasAuto_Adicional]
    const { coberturaSecundaria1, coberturasSecundaria } = req.body;
    const { cobertura1MpFormatado1, cobertura1MpFormatado2, cobertura1MpFormatado3, coberturasMpFormatado1, coberturasMpFormatado2, coberturasMpFormatado3 } = req.body;

    let arrayCoberturasMP1 = [];
    let arrayCoberturasMP2 = [];
    let arrayCoberturasMP3 = [];

    if (seguradoraStatusGrMn[1] === 1) {
      cobertura1MpFormatado1.forEach(coberturaAdd => {
        arrayCoberturasMP1.push(coberturaAdd.valor);
      });
      coberturasMpFormatado1.forEach(coberturaAdd => {
        arrayCoberturasMP1.push(coberturaAdd.valor);
      });
    } else if (seguradoraStatusGrMn[1] === 2) {
      cobertura1MpFormatado1.forEach(coberturaAdd => {
        arrayCoberturasMP1.push(coberturaAdd.valor);
      });
      coberturasMpFormatado1.forEach(coberturaAdd => {
        arrayCoberturasMP1.push(coberturaAdd.valor);
      });
      cobertura1MpFormatado2.forEach(coberturaAdd => {
        arrayCoberturasMP2.push(coberturaAdd.valor);
      });
      coberturasMpFormatado2.forEach(coberturaAdd => {
        arrayCoberturasMP2.push(coberturaAdd.valor);
      });
    } else if (seguradoraStatusGrMn[1] === 3) {
      cobertura1MpFormatado1.forEach(coberturaAdd => {
        arrayCoberturasMP1.push(coberturaAdd.valor);
      });
      coberturasMpFormatado1.forEach(coberturaAdd => {
        arrayCoberturasMP1.push(coberturaAdd.valor);
      });
      cobertura1MpFormatado2.forEach(coberturaAdd => {
        arrayCoberturasMP2.push(coberturaAdd.valor);
      });
      coberturasMpFormatado2.forEach(coberturaAdd => {
        arrayCoberturasMP2.push(coberturaAdd.valor);
      });
      cobertura1MpFormatado3.forEach(coberturaAdd => {
        arrayCoberturasMP3.push(coberturaAdd.valor);
      });
      coberturasMpFormatado3.forEach(coberturaAdd => {
        arrayCoberturasMP3.push(coberturaAdd.valor);
      });
    }

    // [clausulasAuto]
    const { clausulas, clausulasMenorPreco } = req.body;

    // [clausulasAuto_Adicional]
    const { clausulasSecundaria } = req.body;
    const { clausulasMpFormatado1, clausulasMpFormatado2, clausulasMpFormatado3 } = req.body;

    let arrayClausulasMP1 = [];
    let arrayClausulasMP2 = [];
    let arrayClausulasMP3 = [];

    if (seguradoraStatusGrMn[1] === 1) {
      clausulasMpFormatado1.forEach(clausulaAdd => {
        arrayClausulasMP1.push(clausulaAdd.valor);
      });
    } else if (seguradoraStatusGrMn[1] === 2) {
      clausulasMpFormatado1.forEach(clausulaAdd => {
        arrayClausulasMP1.push(clausulaAdd.valor);
      });

      clausulasMpFormatado2.forEach(clausulaAdd => {
        arrayClausulasMP2.push(clausulaAdd.valor);
      });
    } else if (seguradoraStatusGrMn[1] === 3) {
      clausulasMpFormatado1.forEach(clausulaAdd => {
        arrayClausulasMP1.push(clausulaAdd.valor);
      });

      clausulasMpFormatado2.forEach(clausulaAdd => {
        arrayClausulasMP2.push(clausulaAdd.valor);
      });

      clausulasMpFormatado3.forEach(clausulaAdd => {
        arrayClausulasMP3.push(clausulaAdd.valor);
      });
    }

    // [formaPagamento]
    const { tipoPagamentoGestor, premioPOuro, premioPPrata, tipoPagamentoIndividual, premioIndividual } = req.body;

    // [pagamentoAuto]
    const { pagamentos, pagamentosMenorPreco, tablePagamentoPOuro, tablePagamentoPPrata, pagamentoSecundaria } = req.body;
    const { pagamentoMpFormatado1, pagamentoMpFormatado2, pagamentoMpFormatado3 } = req.body;

    let arrayPagamentosMP1 = [];
    let arrayPagamentosMP2 = [];
    let arrayPagamentosMP3 = [];

    if (seguradoraStatusGrMn[1] === 1) {
      pagamentoMpFormatado1.forEach(pagamentoAdd => {
        arrayPagamentosMP1.push(pagamentoAdd.valor);
      });
    } else if (seguradoraStatusGrMn[1] === 2) {
      pagamentoMpFormatado1.forEach(pagamentoAdd => {
        arrayPagamentosMP1.push(pagamentoAdd.valor);
      });

      pagamentoMpFormatado2.forEach(pagamentoAdd => {
        arrayPagamentosMP2.push(pagamentoAdd.valor);
      });
    } else if (seguradoraStatusGrMn[1] === 3) {
      pagamentoMpFormatado1.forEach(pagamentoAdd => {
        arrayPagamentosMP1.push(pagamentoAdd.valor);
      });

      pagamentoMpFormatado2.forEach(pagamentoAdd => {
        arrayPagamentosMP2.push(pagamentoAdd.valor);
      });

      pagamentoMpFormatado3.forEach(pagamentoAdd => {
        arrayPagamentosMP3.push(pagamentoAdd.valor);
      });
    }

    // [observacoes]
    const { observacoesTextarea, obsChecked1, obsChecked2, obsChecked3 } = req.body;
    var obsCheck1 = 0;
    if (obsChecked1 !== '') {
      obsCheck1 = 1;
    };

    var obsCheck2 = 0;
    if (obsChecked2 !== '') {
      obsCheck2 = 1;
    };

    var obsCheck3 = 0;
    if (obsChecked3 !== '') {
      obsCheck3 = 1;
    }

    // [franquiasAuto]
    const { franquiaSelecionada, franquiaValorOuro, franquiaValorPrata, franquiaValorIndividual, franquiasSecundaria } = req.body;

    // [franquiasAuto_Adicionada]
    const { franquiaCounter, franquiasAdicionadas, franquiaCounterIndividual, franquiasIndividualAdicionadas } = req.body;
    const { franquiasMpFormatado1, franquiasMpFormatado2, franquiasMpFormatado3 } = req.body;

    let franquiaDinamicCounter;

    if (tipoOrcamentoSelecionado === 'Gestor') {
      franquiaDinamicCounter = franquiaCounter;
    } else if (tipoOrcamentoSelecionado === 'Menor') {
      franquiaDinamicCounter = franquiaCounterIndividual;
    }

    try {
      // Inserção na tabela formGlobal
      const [formGlobalId] = await knex('formGlobal').insert({
        codOrcamento: handleEmptyValues(idOrcamento),
        modalidade: handleEmptyValues(tipoOrcamentoSelecionado),
        cia: handleEmptyValues(ciaSeguradora),
        ciaGestor: handleEmptyValues(ciaGestorRisco),
        cia1: handleEmptyValues(ciaMenorPreco1),
        cia2: handleEmptyValues(ciaMenorPreco2),
        cia3: handleEmptyValues(ciaMenorPreco3),
        semLogo: handleEmptyValues(semLogoCiaValue),
        tipoOrcamento: handleEmptyValues(tipoSeguro),
        comercial: handleEmptyValues(prepostoSelecionado),
        dataOrcamento: handleEmptyValues(dataAtual),
        cliente: handleEmptyValues(nomeCliente),
        celular: handleEmptyValues(celularCliente),
        tipoPessoa: handleEmptyValues(tipoPessoa),
        ramo: handleEmptyValues(ramo),
        seguradoraSecundariaGestor: seguradoraStatus[1],
        seguradoraSecundariaMenorPreco: seguradoraStatusGrMn[1],
        seguradoraRecomendada: handleEmptyValues(seguradoraRecomendada),
        is_visivelFranquias: handleEmptyValues(checkboxFranquia),
        contadorFranquias: franquiaDinamicCounter,
        is_visivelObservacoes: handleEmptyValues(checkboxObservacao)
      });

      // Inserção na tabela formAuto (relacionada ao formGlobal)
      const [formAutoId] = await knex('formAuto').insert({
        fabricacao: handleEmptyValues(anoVeiculo),
        modelo: handleEmptyValues(modeloVeiculo),
        zeroKm: handleEmptyValues(intZeroKmCheckbox),
        descricao: handleEmptyValues(nomeVeiculo),
        combustivel: handleEmptyValues(combustivelSelecionado),
        placa: handleEmptyValues(placaVeiculo),
        formGlobal_idformGlobal: formGlobalId
      });

      if (tipoOrcamentoSelecionado === 'Gestor') {
        try {
          // Inserção na tabela coberturasAuto
          if ((cobertura1 && cobertura1.length > 0) || (coberturas && coberturas.length > 0)) {
            const coberturasParaInserir = [];

            if (cobertura1 && cobertura1.length > 0) {
              cobertura1.forEach(cobertura => {
                coberturasParaInserir.push({
                  cobertura: cobertura.nome,
                  planoOuro: cobertura.valorOuro,
                  planoPrata: cobertura.valorPrata,
                  formAuto_idformAuto: formAutoId,
                  formAuto_formGlobal_idformGlobal: formGlobalId
                });
              });
            }

            if (coberturas && coberturas.length > 0) {
              coberturas.forEach(cobertura => {
                coberturasParaInserir.push({
                  cobertura: cobertura.nome,
                  planoOuro: cobertura.valorOuro,
                  planoPrata: cobertura.valorPrata,
                  formAuto_idformAuto: formAutoId,
                  formAuto_formGlobal_idformGlobal: formGlobalId
                });
              });
            }

            await knex('coberturasAuto').insert(coberturasParaInserir);
          }

          // Se a seguradora estiver habilitada, insere os dados adicionais
          if (seguradoraStatus[1] === 1) {
            if ((coberturaSecundaria1 && coberturaSecundaria1.length > 0) || (coberturasSecundaria && coberturasSecundaria.length > 0)) {
              const coberturasAdicionaisParaInserir = [];

              if (coberturaSecundaria1 && coberturaSecundaria1.length > 0) {
                coberturaSecundaria1.forEach(cobertura => {
                  coberturasAdicionaisParaInserir.push({
                    planoOuro: cobertura.valorOuro,
                    planoPrata: cobertura.valorPrata,
                    formAuto_idformAuto: formAutoId,
                    formAuto_formGlobal_idformGlobal: formGlobalId
                  });
                });
              }

              if (coberturasSecundaria && coberturasSecundaria.length > 0) {
                coberturasSecundaria.forEach(cobertura => {
                  coberturasAdicionaisParaInserir.push({
                    planoOuro: cobertura.valorOuro,
                    planoPrata: cobertura.valorPrata,
                    formAuto_idformAuto: formAutoId,
                    formAuto_formGlobal_idformGlobal: formGlobalId
                  });
                });
              }

              await knex('coberturasAuto_Adicional').insert(coberturasAdicionaisParaInserir);
            }
          }

        } catch (error) {
          console.error('Erro ao inserir dados nas tabelas:', error);
          throw new Error('Erro ao salvar informações no banco de dados.');
        }
      } else if (tipoOrcamentoSelecionado === 'Menor') {
        // Inserção na tabela coberturasAuto
        const insertsCoberturas = [];

        if (cobertura1MenorPreco && cobertura1MenorPreco.length > 0) {
          cobertura1MenorPreco.forEach(cobertura => {
            insertsCoberturas.push({
              cobertura: cobertura.nome,
              valor: cobertura.valor,
              formAuto_idformAuto: formAutoId,
              formAuto_formGlobal_idformGlobal: formGlobalId
            });
          });
        }

        if (coberturasMenorPreco && coberturasMenorPreco.length > 0) {
          coberturasMenorPreco.forEach(cobertura => {
            insertsCoberturas.push({
              cobertura: cobertura.nome,
              valor: cobertura.valor,
              formAuto_idformAuto: formAutoId,
              formAuto_formGlobal_idformGlobal: formGlobalId
            });
          });
        }

        if (insertsCoberturas.length > 0) {
          try {
            await knex('coberturasAuto').insert(insertsCoberturas);
          } catch (err) {
            console.error('Erro ao inserir dados em coberturasAuto:', err);
            throw new Error('Erro ao salvar informações no banco de dados > [coberturasAuto]');
          }
        }

        // Inserção na tabela coberturasAuto_Adicional
        if (seguradoraStatusGrMn[1] > 0) {
          const insertsAdicionais = [];

          if (seguradoraStatusGrMn[1] === 1 && arrayCoberturasMP1?.length) {
            arrayCoberturasMP1.forEach(valor1 => {
              insertsAdicionais.push({
                valor1,
                valor2: null,
                valor3: null,
                formAuto_idformAuto: formAutoId,
                formAuto_formGlobal_idformGlobal: formGlobalId
              });
            });
          }

          if (seguradoraStatusGrMn[1] === 2 && arrayCoberturasMP1?.length && arrayCoberturasMP2?.length) {
            for (let i = 0; i < arrayCoberturasMP1.length; i++) {
              insertsAdicionais.push({
                valor1: arrayCoberturasMP1[i],
                valor2: arrayCoberturasMP2[i],
                valor3: null,
                formAuto_idformAuto: formAutoId,
                formAuto_formGlobal_idformGlobal: formGlobalId
              });
            }
          }

          if (seguradoraStatusGrMn[1] === 3 && arrayCoberturasMP1?.length && arrayCoberturasMP2?.length && arrayCoberturasMP3?.length) {
            for (let i = 0; i < arrayCoberturasMP1.length; i++) {
              insertsAdicionais.push({
                valor1: arrayCoberturasMP1[i],
                valor2: arrayCoberturasMP2[i],
                valor3: arrayCoberturasMP3[i],
                formAuto_idformAuto: formAutoId,
                formAuto_formGlobal_idformGlobal: formGlobalId
              });
            }
          }

          if (insertsAdicionais.length > 0) {
            try {
              await knex('coberturasAuto_Adicional').insert(insertsAdicionais);
            } catch (err) {
              console.error('Erro ao inserir dados em coberturasAuto_Adicional:', err);
              throw new Error('Erro ao salvar informações no banco de dados > [coberturasAuto_Adicional]');
            }
          }
        }
      }

      if (tipoOrcamentoSelecionado === 'Gestor') {
        if (clausulas && clausulas.length > 0) {
          const clausulasInsercao = clausulas.map(clausula => ({
            clausula: clausula.nome,
            planoOuro: clausula.valorOuro,
            planoPrata: clausula.valorPrata,
            formAuto_idformAuto: formAutoId,
            formAuto_formGlobal_idformGlobal: formGlobalId
          }));

          try {
            await knex('clausulasAuto').insert(clausulasInsercao);
          } catch (error) {
            console.error('Erro ao inserir dados > [clausulasAuto]:', error);
            throw new Error('Erro ao salvar informações no banco de dados > [clausulasAuto]');
          }
        }

        if (seguradoraStatus[1] === 1 && clausulasSecundaria && clausulasSecundaria.length > 0) {
          const clausulasSecundariaInsercao = clausulasSecundaria.map(clausula => ({
            planoOuro: clausula.valorOuro,
            planoPrata: clausula.valorPrata,
            formAuto_idformAuto: formAutoId,
            formAuto_formGlobal_idformGlobal: formGlobalId
          }));

          try {
            await knex('clausulasAuto_Adicional').insert(clausulasSecundariaInsercao);
          } catch (error) {
            console.error('Erro ao inserir dados > [clausulasAuto_Adicional]:', error);
            throw new Error('Erro ao salvar informações no banco de dados > [clausulasAuto_Adicional]');
          }
        }
      } else if (tipoOrcamentoSelecionado === 'Menor') {
        // Inserir clausulasMenorPreco em clausulasAuto
        if (clausulasMenorPreco && clausulasMenorPreco.length > 0) {
          try {
            await Promise.all(
              clausulasMenorPreco.map(clausula => {
                return knex('clausulasAuto').insert({
                  clausula: clausula.nome,
                  valor: clausula.valor,
                  formAuto_idformAuto: formAutoId,
                  formAuto_formGlobal_idformGlobal: formGlobalId
                });
              })
            );
          } catch (err) {
            console.error('Erro ao inserir dados > [clausulasAuto]:', err);
            throw new Error('Erro ao salvar informações no banco de dados > [clausulasAuto]');
          }
        }

        // Clausulas adicionais (clausulasAuto_Adicional)
        if (seguradoraStatusGrMn[1] > 0) {
          const insertPromises = [];

          try {
            if (seguradoraStatusGrMn[1] === 1) {
              if (arrayClausulasMP1?.length) {
                for (let i = 0; i < arrayClausulasMP1.length; i++) {
                  insertPromises.push(
                    knex('clausulasAuto_Adicional').insert({
                      valor1: arrayClausulasMP1[i],
                      valor2: null,
                      valor3: null,
                      formAuto_idformAuto: formAutoId,
                      formAuto_formGlobal_idformGlobal: formGlobalId
                    })
                  );
                }
              }
            } else if (seguradoraStatusGrMn[1] === 2) {
              if (arrayClausulasMP1?.length && arrayClausulasMP2?.length) {
                for (let i = 0; i < arrayClausulasMP1.length; i++) {
                  insertPromises.push(
                    knex('clausulasAuto_Adicional').insert({
                      valor1: arrayClausulasMP1[i],
                      valor2: arrayClausulasMP2[i],
                      valor3: null,
                      formAuto_idformAuto: formAutoId,
                      formAuto_formGlobal_idformGlobal: formGlobalId
                    })
                  );
                }
              }
            } else if (seguradoraStatusGrMn[1] === 3) {
              if (arrayClausulasMP1?.length && arrayClausulasMP2?.length && arrayClausulasMP3?.length) {
                for (let i = 0; i < arrayClausulasMP1.length; i++) {
                  insertPromises.push(
                    knex('clausulasAuto_Adicional').insert({
                      valor1: arrayClausulasMP1[i],
                      valor2: arrayClausulasMP2[i],
                      valor3: arrayClausulasMP3[i],
                      formAuto_idformAuto: formAutoId,
                      formAuto_formGlobal_idformGlobal: formGlobalId
                    })
                  );
                }
              }
            }

            if (insertPromises.length > 0) {
              await Promise.all(insertPromises);
            }
          } catch (err) {
            console.error('Erro ao inserir dados > [clausulasAuto_Adicional]:', err);
            throw new Error('Erro ao salvar informações no banco de dados > [clausulasAuto_Adicional]');
          }
        }
      }

      if (tipoOrcamentoSelecionado === 'Gestor') {
        try {
          await knex('formaPagamento').insert({
            formaPagamento: tipoPagamentoGestor,
            premioPOuro: handleEmptyValues(premioPOuro),
            premioPPrata: handleEmptyValues(premioPPrata),
            formAuto_idformAuto: formAutoId,
            formAuto_formGlobal_idformGlobal: formGlobalId
          });
        } catch (err) {
          console.error('Erro ao inserir dados > [formaPagamento]:', err);
          throw new Error('Erro ao salvar informações no banco de dados > [formaPagamento]');
        }
      } else if (tipoOrcamentoSelecionado === 'Menor') {
        try {
          await knex('formaPagamento').insert({
            formaPagamento: tipoPagamentoIndividual,
            valor: handleEmptyValues(premioIndividual),
            formAuto_idformAuto: formAutoId,
            formAuto_formGlobal_idformGlobal: formGlobalId
          });
        } catch (err) {
          console.error('Erro ao inserir dados > [formaPagamento]:', err);
          throw new Error('Erro ao salvar informações no banco de dados > [formaPagamento]');
        }
      }

      if (tipoOrcamentoSelecionado === 'Gestor') {
        // Inserção na tabela pagamentoAuto
        if (pagamentos && pagamentos.length > 0) {
          await Promise.all(
            pagamentos.map(pagamento =>
              knex('pagamentoAuto').insert({
                parcela: pagamento.nome,
                planoOuro: pagamento.valorOuro,
                planoPrata: pagamento.valorPrata,
                formAuto_idformAuto: formAutoId,
                formAuto_formGlobal_idformGlobal: formGlobalId,
              })
            )
          );
        }

        if (seguradoraStatus[1] === 1) {
          // Inserção na formaPagamento_Adicional
          await knex('formaPagamento_Adicional').insert({
            premioPOuro: tablePagamentoPOuro,
            premioPPrata: tablePagamentoPPrata,
            formAuto_idformAuto: formAutoId,
            formAuto_formGlobal_idformGlobal: formGlobalId,
          });

          // Inserção na pagamentoAuto_Adicional
          if (pagamentoSecundaria && pagamentoSecundaria.length > 0) {
            await Promise.all(
              pagamentoSecundaria.map(pagamento =>
                knex('pagamentoAuto_Adicional').insert({
                  planoOuro: pagamento.valorOuro,
                  planoPrata: pagamento.valorPrata,
                  formAuto_idformAuto: formAutoId,
                  formAuto_formGlobal_idformGlobal: formGlobalId,
                })
              )
            );
          }
        }
      } else if (tipoOrcamentoSelecionado === 'Menor') {
        // Inserção em pagamentoAuto_Adicional
        if (arrayPagamentosMP1 && arrayPagamentosMP1.length > 0) {
          const insertsPagamentoAutoAdicional = arrayPagamentosMP1.map((pagamento1, i) => {
            const pagamento2 = arrayPagamentosMP2[i];
            const pagamento3 = arrayPagamentosMP3[i];

            return {
              valor1: handleEmptyValues(pagamento1),
              valor2: handleEmptyValues(pagamento2),
              valor3: handleEmptyValues(pagamento3),
              formAuto_idformAuto: formAutoId,
              formAuto_formGlobal_idformGlobal: formGlobalId,
            };
          });

          await knex('pagamentoAuto_Adicional').insert(insertsPagamentoAutoAdicional);
        }

        // Inserção em pagamentoAuto
        if (pagamentosMenorPreco && pagamentosMenorPreco.length > 0) {
          const insertsPagamentoAuto = pagamentosMenorPreco.map(pagamento => ({
            parcela: pagamento.nome,
            valor: pagamento.valor,
            formAuto_idformAuto: formAutoId,
            formAuto_formGlobal_idformGlobal: formGlobalId,
          }));

          await knex('pagamentoAuto').insert(insertsPagamentoAuto);
        }

        // Inserção em formaPagamento_Adicional
        if (seguradoraStatusGrMn[1] > 0) {
          let insertsFormaPagamento = [];

          if (seguradoraStatusGrMn[1] === 1) {
            if (arrayPagamentosMP1 && arrayPagamentosMP1.length > 0) {
              insertsFormaPagamento = arrayPagamentosMP1.map(pagamento => ({
                valor1: pagamento,
                valor2: null,
                valor3: null,
                formAuto_idformAuto: formAutoId,
                formAuto_formGlobal_idformGlobal: formGlobalId,
              }));
            }
          } else if (seguradoraStatusGrMn[1] === 2) {
            if (arrayPagamentosMP1 && arrayPagamentosMP1.length > 0 && arrayPagamentosMP2 && arrayPagamentosMP2.length > 0) {
              insertsFormaPagamento = arrayPagamentosMP1.map((pagamento1, i) => ({
                valor1: pagamento1,
                valor2: arrayPagamentosMP2[i],
                valor3: null,
                formAuto_idformAuto: formAutoId,
                formAuto_formGlobal_idformGlobal: formGlobalId,
              }));
            }
          } else if (seguradoraStatusGrMn[1] === 3) {
            if (arrayPagamentosMP1 && arrayPagamentosMP1.length > 0 && arrayPagamentosMP2 && arrayPagamentosMP2.length > 0 && arrayPagamentosMP3 && arrayPagamentosMP3.length > 0) {
              insertsFormaPagamento = arrayPagamentosMP1.map((pagamento1, i) => ({
                valor1: pagamento1,
                valor2: arrayPagamentosMP2[i],
                valor3: arrayPagamentosMP3[i],
                formAuto_idformAuto: formAutoId,
                formAuto_formGlobal_idformGlobal: formGlobalId,
              }));
            }
          }

          if (insertsFormaPagamento.length > 0) {
            await knex('formaPagamento_Adicional').insert(insertsFormaPagamento);
          }
        }
      }

      if (checkboxObservacao === 1) {
        await knex('observacoes').insert({
          textArea: observacoesTextarea,
          check1: obsCheck1,
          check2: obsCheck2,
          check3: obsCheck3,
          formAuto_idformAuto: formAutoId,
          formAuto_formGlobal_idformGlobal: formGlobalId,
        });
      }

      if (tipoOrcamentoSelecionado === 'Gestor') {
        if (checkboxFranquia === 1) {
          try {
            // Inserir franquia selecionada
            await knex('franquiasAuto').insert({
              franquia: franquiaSelecionada,
              planoOuro: franquiaValorOuro,
              planoPrata: franquiaValorPrata,
              formAuto_idformAuto: formAutoId,
              formAuto_formGlobal_idformGlobal: formGlobalId
            });

            // Inserir múltiplas franquias adicionadas
            for (const franquia of franquiasAdicionadas) {
              const { tipoFranquia, valorPlanoOuro, valorPlanoPrata } = franquia;
              await knex('franquiasAuto').insert({
                franquia: tipoFranquia,
                planoOuro: valorPlanoOuro,
                planoPrata: valorPlanoPrata,
                formAuto_idformAuto: formAutoId,
                formAuto_formGlobal_idformGlobal: formGlobalId
              });
            }

            if (seguradoraStatus[1] === 1) {
              // Inserir franquias secundárias (franquiasAuto_Adicional)
              if (franquiasSecundaria && franquiasSecundaria.length > 0) {
                const insertSecundarias = franquiasSecundaria.map(franquia => {
                  return knex('franquiasAuto_Adicional').insert({
                    planoOuro: franquia.valorOuro,
                    planoPrata: franquia.valorPrata,
                    formAuto_idformAuto: formAutoId,
                    formAuto_formGlobal_idformGlobal: formGlobalId
                  });
                });
                await Promise.all(insertSecundarias);
              }

              // Inserir múltiplas franquias adicionais de franquiasAdicionadas
              for (const franquia of franquiasAdicionadas) {
                const { valorPlanoOuroExtra, valorPlanoPrataExtra } = franquia;
                await knex('franquiasAuto_Adicional').insert({
                  planoOuro: valorPlanoOuroExtra,
                  planoPrata: valorPlanoPrataExtra,
                  formAuto_idformAuto: formAutoId,
                  formAuto_formGlobal_idformGlobal: formGlobalId
                });
              }
            }

          } catch (err) {
            console.error('Erro ao inserir dados com Knex:', err);
            throw new Error('Erro ao salvar informações no banco de dados');
          }
        }
      } else if (tipoOrcamentoSelecionado === 'Menor') {
        if (checkboxFranquia === 1) {
          // Inserir franquiaSelecionada na tabela franquiasAuto
          await knex('franquiasAuto').insert({
            franquia: franquiaSelecionada,
            valor: franquiaValorIndividual,
            formAuto_idformAuto: formAutoId,
            formAuto_formGlobal_idformGlobal: formGlobalId,
          });

          // Inserir franquias individuais adicionadas na franquiasAuto
          for (const franquia of franquiasIndividualAdicionadas) {
            const { tipoFranquia, valorIndividual } = franquia;

            await knex('franquiasAuto').insert({
              franquia: tipoFranquia,
              valor: valorIndividual,
              formAuto_idformAuto: formAutoId,
              formAuto_formGlobal_idformGlobal: formGlobalId,
            });
          }

          if (seguradoraStatusGrMn[1] > 0) {
            const promises = [];

            if (seguradoraStatusGrMn[1] === 1) {
              if (franquiasMpFormatado1 && franquiasMpFormatado1.length > 0) {
                for (const franquia of franquiasMpFormatado1) {
                  promises.push(
                    knex('franquiasAuto_Adicional').insert({
                      valor1: franquia.valor,
                      valor2: null,
                      valor3: null,
                      formAuto_idformAuto: formAutoId,
                      formAuto_formGlobal_idformGlobal: formGlobalId,
                    })
                  );
                }
              }

              for (const franquia of franquiasIndividualAdicionadas) {
                const valor1 = franquia.valoresInputs[0];

                promises.push(
                  knex('franquiasAuto_Adicional').insert({
                    valor1,
                    valor2: null,
                    valor3: null,
                    formAuto_idformAuto: formAutoId,
                    formAuto_formGlobal_idformGlobal: formGlobalId,
                  })
                );
              }
            } else if (seguradoraStatusGrMn[1] === 2) {
              if (
                franquiasMpFormatado1 && franquiasMpFormatado1.length > 0 &&
                franquiasMpFormatado2 && franquiasMpFormatado2.length > 0
              ) {
                for (let i = 0; i < franquiasMpFormatado1.length; i++) {
                  const franquia1 = franquiasMpFormatado1[i];
                  const franquia2 = franquiasMpFormatado2[i];

                  promises.push(
                    knex('franquiasAuto_Adicional').insert({
                      valor1: franquia1.valor,
                      valor2: franquia2.valor,
                      valor3: null,
                      formAuto_idformAuto: formAutoId,
                      formAuto_formGlobal_idformGlobal: formGlobalId,
                    })
                  );
                }
              }

              for (const franquia of franquiasIndividualAdicionadas) {
                const [valor1, valor2] = franquia.valoresInputs;

                promises.push(
                  knex('franquiasAuto_Adicional').insert({
                    valor1,
                    valor2,
                    valor3: null,
                    formAuto_idformAuto: formAutoId,
                    formAuto_formGlobal_idformGlobal: formGlobalId,
                  })
                );
              }
            } else if (seguradoraStatusGrMn[1] === 3) {
              if (
                franquiasMpFormatado1 && franquiasMpFormatado1.length > 0 &&
                franquiasMpFormatado2 && franquiasMpFormatado2.length > 0 &&
                franquiasMpFormatado3 && franquiasMpFormatado3.length > 0
              ) {
                for (let i = 0; i < franquiasMpFormatado1.length; i++) {
                  const franquia1 = franquiasMpFormatado1[i];
                  const franquia2 = franquiasMpFormatado2[i];
                  const franquia3 = franquiasMpFormatado3[i];

                  promises.push(
                    knex('franquiasAuto_Adicional').insert({
                      valor1: franquia1.valor,
                      valor2: franquia2.valor,
                      valor3: franquia3.valor,
                      formAuto_idformAuto: formAutoId,
                      formAuto_formGlobal_idformGlobal: formGlobalId,
                    })
                  );
                }
              }

              for (const franquia of franquiasIndividualAdicionadas) {
                const [valor1, valor2, valor3] = franquia.valoresInputs;

                promises.push(
                  knex('franquiasAuto_Adicional').insert({
                    valor1,
                    valor2,
                    valor3,
                    formAuto_idformAuto: formAutoId,
                    formAuto_formGlobal_idformGlobal: formGlobalId,
                  })
                );
              }
            }

            // Espera todas as inserções paralelas
            await Promise.all(promises);
          }
        }
      }

    } catch (err) {
      console.error('Erro ao inserir dados:', err);
      throw new Error('Erro ao salvar informações no banco de dados');
    }


  }
}

module.exports = new OrcControllers;