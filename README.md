# @scorbyte/shared-kernel

Tipos e formatadores TypeScript compartilhados entre os front-ends do ScoreByte
(institutional-site e analyst-platform): modelos de análise de crédito
(`CreditAnalysis`, `ClassifiedTransaction`, etc.) e formatadores pt-BR (moeda,
percentual, CNPJ, data/hora).

## Build

```bash
npm install
npm run build
```

Gera `dist/` com JS (ESM) + `.d.ts`.

## Publicar

```bash
npm publish
```

(requer estar autenticado no registry configurado para o escopo `@scorbyte`).

## Uso local antes de publicar

Enquanto o pacote ainda não foi publicado, os projetos consumidores
(`institutional-site`, `analyst-platform`) podem apontar para esta pasta com
`npm link`:

```bash
# aqui, em shared-kernel/
npm run build
npm link

# em institutional-site/ ou analyst-platform/
npm link @scorbyte/shared-kernel
```

Depois de publicado, basta `npm install` normalmente — a versão fica travada
no `package.json` de cada consumidor (`^0.1.0`).
