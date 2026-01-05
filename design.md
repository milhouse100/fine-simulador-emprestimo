# FINE - Simulador de Empréstimo | Design Document

## Visão Geral
Aplicativo móvel para simulação de empréstimos com 4 modalidades de cálculo distintas. Interface moderna, intuitiva e responsiva para todos os dispositivos.

---

## Paleta de Cores
- **Verde Primário**: #00df82 (ações, botões, destaques)
- **Cinza Neutro**: #9f9f9f (textos secundários, borders)
- **Branco**: #ffffff (fundo principal)
- **Cinza Escuro**: #1a1a1a (textos principais)
- **Cinza Claro**: #f5f5f5 (superfícies, cards)

---

## Tipografia
- **Fonte Principal**: Inter (sans-serif moderna)
- **Fonte Secundária**: Poppins (títulos, destaques)
- **Tamanhos**:
  - Títulos: 28-32px (Poppins Bold)
  - Subtítulos: 18-20px (Poppins SemiBold)
  - Corpo: 14-16px (Inter Regular)
  - Labels: 12-13px (Inter Medium)

---

## Telas do Aplicativo

### 1. Home Screen (Inicial)
**Propósito**: Apresentar o aplicativo e permitir acesso às simulações.

**Conteúdo Principal**:
- Logo/Título "FINE - Simulador de Empréstimo"
- Descrição breve do aplicativo
- 4 cards de simulação (um para cada tipo)
- Botão flutuante para nova simulação

**Funcionalidade**:
- Cada card exibe ícone, nome e descrição breve do tipo de empréstimo
- Tap no card navega para tela de simulação específica
- Histórico de últimas simulações (opcional, abaixo dos cards)

---

### 2. Tela de Simulação (Genérica para os 4 tipos)
**Propósito**: Coletar dados do usuário para cálculo de empréstimo.

**Campos Comuns** (todos os tipos):
- **Valor do Empréstimo**: Input numérico com máscara R$
- **Quantidade de Parcelas**: Slider ou input numérico (1-360)
- **Tipo de Empréstimo**: Seleção (já pré-selecionado)

**Campos Específicos por Tipo**:

#### Tipo 1: PRICE Adaptado
- **Percentual de Juros**: Input com % (ex: 50%)
- Cálculo: `Parcela = (Principal + (Principal × Taxa)) / Parcelas`

#### Tipo 2: Valor da Parcela
- **Valor Fixo da Parcela**: Input numérico em R$
- Cálculo: `Total = Valor Parcela × Parcelas`

#### Tipo 3: Apenas Juros
- **Percentual de Juros (Renovação)**: Input com %
- Cálculo: `Juros Periódicos = Principal × Taxa`

#### Tipo 4: Juros Simples
- **Taxa de Juros**: Input com % (ao período)
- Cálculo: `Parcela = (Principal / Parcelas) + (Principal × Taxa)`

**Funcionalidade**:
- Validação em tempo real
- Botão "Simular" para calcular
- Botão "Limpar" para resetar campos
- Feedback visual de erros

---

### 3. Tela de Resultados
**Propósito**: Exibir detalhes da simulação realizada.

**Conteúdo Principal**:
- Resumo dos dados de entrada
- **Valor Total de Retorno** (destaque em verde)
- **Percentual de Retorno** (lucro/juros em %)
- Tabela/Lista de parcelas com:
  - Número da parcela
  - Valor da parcela
  - Juros (se aplicável)
  - Saldo devedor (se aplicável)

**Funcionalidade**:
- Scroll vertical para visualizar todas as parcelas
- Botão "Copiar Resultados" (copia para clipboard)
- Botão "Compartilhar" (via WhatsApp, Email, etc.)
- Botão "Nova Simulação" (volta para Home)
- Botão "Editar Simulação" (volta para formulário com dados preenchidos)

---

## Fluxos Principais

### Fluxo 1: Simulação Básica
1. Usuário abre app → Home Screen
2. Toca em um dos 4 cards de tipo de empréstimo
3. Preenche formulário específico
4. Toca "Simular"
5. Visualiza resultados com tabela de parcelas
6. Pode editar, compartilhar ou fazer nova simulação

### Fluxo 2: Editar Simulação
1. Na tela de resultados, toca "Editar Simulação"
2. Retorna ao formulário com dados preenchidos
3. Modifica valores desejados
4. Toca "Simular" novamente
5. Visualiza novos resultados

### Fluxo 3: Compartilhar Resultados
1. Na tela de resultados, toca "Compartilhar"
2. Menu nativo oferece opções (WhatsApp, Email, SMS, etc.)
3. Dados são formatados e enviados

---

## Componentes Reutilizáveis

| Componente | Uso | Props |
|-----------|-----|-------|
| `LoanCard` | Cards de tipo de empréstimo | title, description, icon, onPress |
| `InputField` | Campos de entrada | label, value, onChange, placeholder, mask |
| `ResultCard` | Cards de resultado | label, value, highlight, unit |
| `ParcelTable` | Tabela de parcelas | data, columns |
| `ActionButton` | Botões primários/secundários | label, onPress, variant, disabled |

---

## Responsividade

**Orientação**: Portrait (9:16)
**Breakpoints**:
- Mobile pequeno: 320px (iPhone SE)
- Mobile médio: 375px (iPhone 12/13)
- Mobile grande: 428px (iPhone 14 Pro Max)
- Tablet: 768px+ (iPad)

**Estratégia**:
- Uso de flexbox para layouts adaptativos
- Padding/margin escalável com base em viewport
- Fontes responsivas (não fixas)
- Inputs com tamanho mínimo de 44x44px (tap target)

---

## Acessibilidade

- Contraste mínimo 4.5:1 para textos
- Labels associados a inputs
- Botões com tamanho mínimo 44x44px
- Feedback háptico em ações principais
- Suporte a dark mode (automático via tema)

---

## Próximos Passos

1. Implementar Home Screen com 4 cards
2. Criar componentes de input reutilizáveis
3. Implementar lógica de cálculo para cada tipo
4. Desenvolver tela de resultados com tabela
5. Testar responsividade em múltiplos dispositivos
6. Adicionar compartilhamento e histórico (opcional)
