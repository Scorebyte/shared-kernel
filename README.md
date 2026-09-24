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

## Como é consumido hoje

Este pacote ainda não foi publicado num registry npm. `institutional-site` e
`analyst-platform` instalam direto deste repositório Git:

```json
"@scorbyte/shared-kernel": "github:Scorebyte/shared-kernel"
```

O script `prepare` roda `npm run build` automaticamente quando o npm instala
a partir do Git, então o consumidor sempre recebe o `dist/` atualizado.

## Publicar num registry (opcional, futuro)

```bash
npm publish
```

(requer estar autenticado no registry configurado para o escopo `@scorbyte`).
Depois de publicado de verdade, basta trocar a dependência dos consumidores
para uma versão semver normal (`^0.1.0`) e rodar `npm install`.

## Uso local durante desenvolvimento

Pra testar mudanças locais antes de dar push, use `npm link`:

```bash
# aqui, em shared-kernel/
npm run build
npm link

# em institutional-site/ ou analyst-platform/
npm link @scorbyte/shared-kernel
```
