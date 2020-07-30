# As One - Starter

Este repositório contém a configuração ideal para começar projetos que trabalhem com HTML, CSS e JS e framework agnostic.

## Quick Start

```
npm i
npm run dev
npm run build
```

## Explanation

Neste universo acelerado do desenvolvimento web é fundamental estarmos posicionados firmemente em projetos que não serão depreciados. Desta maneira, é fundamental estar dependente apenas de tecnologias core (HTML, CSS, JS) e empresas core (git, GitHub, NPM).

Por isso, as dependências foram escolhidas cuidadosamente para não haver futuro retrabalho vindo de dependências depreciadas.

## npm run dev

```
npm run dev
```

Este comando inicializará paralelamente:

- Um servidor na porta 3000: http://localhost:3000;
- Um watcher SASS para CSS a partir da pasta ./src;
- Um watcher TS to JS a partir da root ./;

As dependências utilizadas estão em desenvolvimento há anos e em constante atualização.

## npm run build

```
npm run build
```

Este comando inicializará sequencialmente:

- CSS: Compilação de cada SASS para CSS a partir da pasta ./src;
- CSS: Compilação de todos os CSS para um único ./src/style.min.css a partir da pasta ./src;
- CSS: Compilação do ./src/style.min.css com PostCSS e seu plugin Autoprefixer;
- JS: Compilação de TS para JS a partir da root ./;
- JS: Uglify de cada JS visando minificação.

## Details

Não há criação de pasta adicionais (como ./dist): todos os arquivos criados a partir da compilação estarão na mesma pasta de seus arquivos de referência. Caso isso seja necessário, entenda com calma os scripts em package.json

## Need something else?

Para dúvidas e sugestões é só enviar uma issue para nós!
