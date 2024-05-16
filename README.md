# Portfolio

This repository serves to contain the source-code of my portfolio and to
host it on GitHub pages. `portfolio` is built to showcase samples of my
photography and display my past and present projects.

## Screenshots

<div style="display: flex; justify-content: space-around;">
  <img src="/meta/gallery.webp" alt="Screenshot of the gallery page" width="45%">
  <img src="/meta/home.webp" alt="Screenshot of the homescreen" width="45%">
</div>

## Building

`portfolio` is built using a mixture of [TailwindCSS](https://tailwindcss.com)
and Javascript (for basic scripting). To build this project, simply clone the
repo, and run the following:

```sh
npm run build:css
```

If you're making active changes to the website, the above command regenerates
the TailwindCSS stylesheet alongside your live changes. To open this website
locally, you could use a tool like [live-server](https://github.com/tapio/live-server),
or the built-in web-server in VSCode.
