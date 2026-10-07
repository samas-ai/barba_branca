# Barba Branca Tattoo — Portfólio

Landing page / portfólio do tatuador **Barba Branca** ([@barbabranca_tattoo](https://www.instagram.com/barbabranca_tattoo/)).

**Stack:** React 19 · TypeScript · Vite 6 · Tailwind CSS 4 · GSAP (ScrollTrigger) · Lenis (smooth scroll)

```bash
npm install
npm run dev       # desenvolvimento — http://localhost:5173
npm run build     # build de produção em /dist
npm run preview   # serve o build localmente
```

> Requer Node 18+ (testado no 22.9).

---

## Como trocar as fotos

Todas as imagens ficam centralizadas em **`src/config/images.ts`**. Basta colocar os arquivos em
`public/images/` **com os nomes abaixo** — o site detecta a foto automaticamente e substitui o
placeholder. Nenhum componente precisa ser alterado.

| Arquivo                                   | Onde aparece                          | Proporção sugerida |
| ----------------------------------------- | ------------------------------------- | ------------------ |
| `hero.jpg`                                | Primeira tela                         | 4:5 (vertical)     |
| `artist.jpg`                              | Seção "O Artista" — retrato           | 4:5                |
| `studio-01.jpg`, `studio-02.jpg`          | Processo (faixa) / O Artista          | 3:2 e 3:4          |
| `process-01.jpg`, `process-02.jpg`        | Faixa de imagens do processo          | 4:5 e 3:4          |
| `tattoo-01.jpg` … `tattoo-12.jpg`         | Portfólio + visualizador (lightbox)   | variadas*          |
| `style-01.jpg` … `style-03.jpg`           | Estilos (revelada no hover)           | 4:5                |
| `instagram-01.jpg` … `instagram-06.jpg`   | Grade do Instagram                    | 1:1                |
| `og-image.jpg`                            | Compartilhamento (WhatsApp, redes)    | 1200×630           |

\* O grid editorial recorta as fotos (`object-fit: cover`). Para ajustar o enquadramento de uma
tatuagem, use o campo `focus` em `src/data/portfolio.ts` (ex.: `focus: '50% 30%'`). No visualizador
em tela cheia a foto aparece inteira, na proporção original.

**Dicas de performance:** exporte em `.jpg`/`.webp` com ~1600–2000px no maior lado e qualidade 75–80.
Para imagens responsivas, informe `srcSet` no `images.ts` (há um exemplo no topo do arquivo).

---

## Onde editar o conteúdo

| O quê                                                    | Arquivo                    |
| -------------------------------------------------------- | -------------------------- |
| Nome, especialidade, cidade, WhatsApp, e-mail, bio, frase | `src/config/site.ts`       |
| Tatuagens do portfólio (título, estilo, alt, descrição)  | `src/data/portfolio.ts`    |
| Estilos de tatuagem                                      | `src/data/styles.ts`       |
| Etapas do processo                                       | `src/data/process.ts`      |
| Links da grade do Instagram                              | `src/data/instagram.ts`    |
| SEO (title, description, Open Graph)                     | `index.html`               |

Textos entre **[COLCHETES]** são placeholders e devem ser substituídos.

### Informações retiradas do Instagram (confirmar com o artista)

Os dados abaixo vieram da bio pública do perfil e estão marcados com comentários no código:

- "Especialista em **Realismo Preto e Cinza**" → especialidade e Estilo 01
- "**8X Premiado**" → contador de prêmios (use `awards: 0` para ocultar)
- "**Patos — PB**" → localização
- "Não faço maori / tribal" → nota na seção Estilos
- Link de agendamento **wa.me/5583981313233** → todos os botões "Agendar"
- Destaque "**Delicadas**" → Estilo 02

Nada além disso foi inventado: biografia, títulos e estilos de cada obra continuam como placeholders.

---

## Estrutura

```
src/
├── config/        images.ts (caminhos das fotos) · site.ts (textos e contatos)
├── data/          portfolio · styles · process · instagram
├── components/    Navbar · MobileMenu · Hero · Portfolio · PortfolioItem · Lightbox
│                  About · Styles · Process · Marquee · CTA · Instagram · Footer
│                  Cursor · Preloader · ScrollIndicator
│   └── ui/        Photo (foto + placeholder) · Button · Text · Icons · SectionHead
├── hooks/         useScrollReveal (animações por atributo) · useMagnetic
├── lib/           gsap · scroll (Lenis) · media · utils
└── styles/        index.css (tokens, tipografia, componentes)
```

O layout do portfólio (`PATTERN` em `Portfolio.tsx`) é independente dos dados: novas tatuagens
entram na composição automaticamente, que se repete espelhada a cada ciclo.

### Animações por atributo

Qualquer elemento pode receber uma animação de entrada sem JavaScript adicional:

| Atributo                  | Efeito                                         |
| ------------------------- | ---------------------------------------------- |
| `data-reveal="lines"`     | linhas do título sobem de uma máscara          |
| `data-reveal="fade"`      | fade + deslocamento sutil (em lote)            |
| `data-reveal="clip"`      | imagem revelada por clip-path                  |
| `data-reveal="line-x"`    | divisor desenhado da esquerda para a direita   |
| `data-count="8"`          | contador numérico                              |
| `data-speed="0.1"`        | parallax vertical (somente desktop)            |

Com `prefers-reduced-motion`, o preloader, o smooth scroll, o cursor customizado e as animações são
desativados e o conteúdo aparece estático.

---

## Antes de publicar

- [ ] Adicionar as fotos em `public/images/`
- [ ] Preencher biografia e frase em `src/config/site.ts`
- [ ] Preencher título/estilo/alt de cada obra em `src/data/portfolio.ts`
- [ ] Confirmar as informações vindas do Instagram (lista acima)
- [ ] Em `index.html`: trocar `og:url`/`og:image` por URLs absolutas do domínio e descomentar o `canonical`
