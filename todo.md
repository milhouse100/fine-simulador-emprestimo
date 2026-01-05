# FINE - Simulador de Empréstimo | TODO

## Fase 1: Configuração e Design
- [x] Gerar logo/ícone do aplicativo
- [x] Atualizar paleta de cores (verde #00df82, cinza #9f9f9f)
- [x] Configurar tipografia (Inter, Poppins)
- [x] Atualizar app.config.ts com branding

## Fase 2: Estrutura Base
- [x] Criar estrutura de pastas (screens, components, utils, types)
- [x] Definir tipos TypeScript para empréstimos
- [x] Implementar lógica de cálculo para 4 tipos de empréstimo
- [ ] Criar contexto/estado global para simulações
- [ ] Implementar navegação entre telas

## Fase 3: Home Screen
- [x] Criar componente LoanCard
- [x] Implementar Home Screen com 4 cards
- [x] Adicionar navegação para telas de simulação
- [x] Estilizar com cores da paleta

## Fase 4: Tela de Simulação - Componentes Base
- [x] Criar InputField reutilizável
- [x] Criar componente ActionButton
- [x] Criar tela de simulação dinâmica
- [x] Implementar validação de inputs

## Fase 5-8: Simulação - Todos os Tipos
- [x] Implementar lógica de cálculo para todos os 4 tipos
- [x] Criar tela de simulação dinâmica que suporta todos os tipos
- [x] Testes unitários com 15 casos de teste (todos passando)

## Fase 9: Tela de Resultados
- [x] Criar componente ParcelTable
- [x] Implementar tela de resultados
- [x] Adicionar botão "Editar Simulação"
- [x] Adicionar botão "Nova Simulação"
- [x] Adicionar botões "Compartilhar" e "Copiar Resultados"

## Fase 10: Funcionalidades Extras
- [x] Implementar botão "Copiar Resultados"
- [x] Implementar botão "Compartilhar"
- [x] Contexto de simulações criado (SimulationProvider)
- [x] Dark mode automático via tema

## Fase 11: Testes e Responsividade
- [x] Testes unitários para lógica de cálculo (15 testes passando)
- [ ] Testar em múltiplos tamanhos de tela
- [ ] Verificar acessibilidade
- [ ] Testar todos os fluxos de usuário

## Fase 12: Polimento e Entrega
- [ ] Adicionar feedback háptico (opcional)
- [ ] Otimizar performance
- [ ] Criar checkpoint final
- [ ] Entregar ao usuário

## Fase 13: Alterações Solicitadas pelo Usuário
- [x] Substituir logo por arquivo finefundovazio.png
- [x] Usar logo como título na Home Screen
- [x] Adicionar link para finebr.com abaixo do título
- [x] Limitar parcelas: mínimo 1, máximo 36
- [x] Tabela de parcelas com colunas dinâmicas por tipo
- [x] Aplicar princípios UX/UI para responsividade e espaçamentos

## Fase 14: Correções Solicitadas pelo Usuário
- [x] Restaurar coluna Principal na tabela de "Apenas Juros"
- [x] Substituir emojis por ícones modernos e minimalistas
- [x] Aumentar tamanho dos botões
- [x] Remover botão "Copiar Resultados"

## Fase 15: Correções de UI/UX Solicitadas
- [x] Trocar ícone do app pelo SVG anexado
- [x] Aumentar espaçamento entre botão voltar e títulos
- [x] Remover emojis dos cards, substituir por ícones Lucide
- [x] Diminuir espaçamento entre logo e "Visite finebr.com" para 8px
- [x] Simplificar tabela: apenas Nº e Valor (exceto "Apenas Juros")
