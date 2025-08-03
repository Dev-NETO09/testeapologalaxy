# 🚀 Apolo Gestão Pessoal

Sistema completo de controle de finanças pessoais com tema galáxia, desenvolvido com React + Firebase, incluindo autenticação Google e PWA.

## 🚀 Funcionalidades

### ✅ Sistema de Autenticação
- Login/logout com Google Firebase
- Criação automática de perfil de usuário
- Proteção de rotas e isolamento de dados

### ✅ Gestão de Transações
- CRUD completo (Criar, Ler, Atualizar, Excluir)
- Isolamento por usuário (cada usuário vê apenas suas transações)
- Data e hora completas para cada transação
- Validações robustas de formulário
- Confirmação antes de excluir

### ✅ Dashboard Financeiro
- Resumo com receitas, despesas e saldo
- Opção de ocultar/mostrar valores
- Cálculos automáticos em tempo real

### ✅ Filtros Avançados
- Por tipo (receita/despesa)
- Por categoria
- Por período (mês/ano)
- Busca textual por descrição
- Filtros em botão retrátil
- Contador de resultados

### ✅ PWA (Progressive Web App)
- Instalável em dispositivos móveis
- Funciona offline (cache básico)
- Ícones e manifest configurados

### ✅ Interface Responsiva
- Design mobile-first com tema galáxia
- Cores espaciais (roxo, azul, ciano, rosa)
- Header bonito com efeitos visuais
- Animações suaves
- Loading states
- Notificações toast
- Lista responsiva que não corta descrições

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **Vite** - Build tool e dev server
- **Firebase Auth** - Autenticação com Google
- **Firebase Firestore** - Banco de dados NoSQL
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Ícones
- **PWA** - Progressive Web App


## 📱 Estrutura do Projeto

```
src/
├── componentes/           # Componentes React
│   ├── Carregamento.jsx   # Indicador de loading com tema galáxia
│   ├── Filtros.jsx        # Filtros de transações
│   ├── ListaTransacoes.jsx # Lista de transações
│   ├── ModalTransacao.jsx  # Modal para criar/editar
│   ├── Notificacao.jsx    # Toast notifications
│   ├── PaginaLogin.jsx    # Página de login com tema espacial
│   ├── PainelPrincipal.jsx # Dashboard principal
│   └── ResumoFinanceiro.jsx # Cards de resumo
├── contextos/             # Context API
│   ├── ContextoAutenticacao.jsx # Gerencia autenticação
│   └── ContextoTransacoes.jsx   # Gerencia transações
├── firebase/              # Configuração Firebase
│   └── configuracao.js    # Config do Firebase
├── Aplicativo.jsx         # Componente raiz
├── main.jsx              # Entry point
└── index.css             # Estilos globais
```

## 🗄️ Estrutura do Banco de Dados

### Coleção `usuarios`
```javascript
{
  id: "user_id_do_google",
  nome: "Nome do Usuário",
  email: "email@exemplo.com",
  fotoURL: "url_da_foto",
  criadoEm: timestamp,
  atualizadoEm: timestamp
}
```

### Coleção `transacoes`
```javascript
{
  id: "id_automatico",
  idUsuario: "user_id_do_proprietario",
  tipo: "receita" | "despesa",
  descricao: "Descrição da transação",
  valor: 1000.50,
  categoria: "Categoria selecionada",
  data: timestamp, // Inclui data e hora
  criadoEm: timestamp,
  atualizadoEm: timestamp
}
```

## 🎯 Funcionalidades Implementadas

- [x] Sistema de login com Google
- [x] CRUD de transações com isolamento por usuário
- [x] Cálculos financeiros (receitas, despesas, saldo)
- [x] Filtros e busca avançados em botão retrátil
- [x] Interface responsiva mobile-first
- [x] PWA configurado e instalável
- [x] Loading states e feedback visual
- [x] Confirmação para exclusões
- [x] Validações de formulário
- [x] Notificações toast
- [x] Tema galáxia com cores espaciais
- [x] Data e hora completas
- [x] Header bonito com efeitos visuais
- [x] Lista responsiva otimizada
- [x] Animações e micro-interações

## 📝 Como Usar

1. **Login**: Clique em "Continuar com Google"
2. **Adicionar Transação**: Clique no botão "Nova Transação"
3. **Filtrar**: Use os filtros para encontrar transações específicas
4. **Editar**: Clique no ícone de lápis na transação
5. **Excluir**: Clique no ícone de lixeira (com confirmação)
6. **Instalar**: No navegador, clique no ícone de instalação

## 🔒 Segurança

- Autenticação obrigatória via Google
- Isolamento de dados por usuário
- Validações no frontend e backend
- Regras de segurança do Firestore

## 📱 PWA Features

- Instalável em dispositivos móveis
- Ícones personalizados
- Splash screen
- Cache básico para funcionamento offline

## 🎨 Design

- Tema galáxia com gradientes espaciais
- Cores galáxia (roxo, azul, ciano, rosa)
- Efeitos de estrelas e backdrop blur
- Animações suaves
- Feedback visual imediato
- Mobile-first responsive

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Verifique a documentação do Firebase
- Consulte a documentação do React

---

**Desenvolvido com 🚀 usando React + Firebase - **
