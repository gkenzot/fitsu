# Fitsu - Aplicativo de Acompanhamento de Treinos

Fitsu é uma aplicação web moderna para acompanhamento de treinos físicos, desenvolvida com React e tecnologias modernas.

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção de interfaces
- **React Router** - Roteamento e navegação
- **Styled Components** - Estilização com CSS-in-JS
- **Context API** - Gerenciamento de estado global
- **LocalStorage** - Persistência de dados local
- **React Icons** - Ícones para a interface
- **PropTypes** - Validação de props
- **Vite** - Build tool e desenvolvimento

## ✨ Funcionalidades

- Autenticação de usuários
- Dashboard com estatísticas de treino
- Cadastro e acompanhamento de exercícios
- Histórico de treinos
- Perfil do usuário
- Interface responsiva
- Tema escuro

## 🎯 Requisitos Implementados

### 1. Estrutura e Layout
- HTML5 com estrutura semântica
- Box Model, Flexbox e Grid Layout
- Responsividade com Media Queries
- Layout adaptativo para diferentes dispositivos

### 2. Estilo e Componentização
- Estilização com Styled Components
- Sistema de Design consistente
- Componentes reutilizáveis
- Props tipadas com PropTypes
- Variantes de componentes (primary, secondary, outline)
- Tamanhos padronizados (small, medium, large)

### 3. Interatividade e Lógica
- Validação de formulários com JavaScript
- Manipulação de eventos e listeners
- Armazenamento local com LocalStorage
- Manipulação de dados em JSON
- Feedback visual para ações do usuário

### 4. Desenvolvimento com React
- Estrutura modular com componentes React
- Props para comunicação entre componentes
- Hooks (useState, useEffect) para estado e efeitos
- Manipulação do DOM Virtual
- Rotas com React Router
- Context API para estado global

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/gkenzot/fitsu.git
```

2. Instale as dependências:
```bash
cd fitsu
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em `http://localhost:5173`

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter

## 🏗️ Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
│   ├── ui/        # Componentes de UI base
│   └── layout/    # Componentes de layout
├── contexts/      # Contextos React
├── hooks/         # Hooks personalizados
├── pages/         # Páginas da aplicação
├── routes/        # Configuração de rotas
├── services/      # Serviços e APIs
├── styles/        # Estilos globais e tema
└── utils/         # Funções utilitárias
```

## 🔒 Autenticação

A aplicação possui um sistema de autenticação com:
- Login/Registro
- Proteção de rotas
- Persistência de sessão
- Recuperação de senha

## 🎨 Design System

O projeto implementa um Design System consistente com:
- Paleta de cores
- Tipografia
- Espaçamento
- Componentes base
- Variantes e estados
- Responsividade

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Seu Nome - [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- [React](https://reactjs.org/)
- [Styled Components](https://styled-components.com/)
- [React Router](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
