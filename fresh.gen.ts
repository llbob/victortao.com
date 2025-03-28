// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_social from "./routes/api/social.tsx";
import * as $artikler from "./routes/artikler.tsx";
import * as $artikler_title_ from "./routes/artikler/[title].tsx";
import * as $blog from "./routes/blog.tsx";
import * as $blog_title_ from "./routes/blog/[title].tsx";
import * as $index from "./routes/index.tsx";
import * as $kontakt from "./routes/kontakt.tsx";
import * as $kulturprojekter from "./routes/kulturprojekter.tsx";
import * as $kulturprojekter_title_ from "./routes/kulturprojekter/[title].tsx";
import * as $om from "./routes/om.tsx";
import * as $presse from "./routes/presse.tsx";
import * as $udstillinger from "./routes/udstillinger.tsx";
import * as $udstillinger_title_ from "./routes/udstillinger/[title].tsx";
import * as $Navigation from "./islands/Navigation.tsx";
import * as $ProjectCarousel from "./islands/ProjectCarousel.tsx";
import * as $SocialIcons from "./islands/SocialIcons.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/social.tsx": $api_social,
    "./routes/artikler.tsx": $artikler,
    "./routes/artikler/[title].tsx": $artikler_title_,
    "./routes/blog.tsx": $blog,
    "./routes/blog/[title].tsx": $blog_title_,
    "./routes/index.tsx": $index,
    "./routes/kontakt.tsx": $kontakt,
    "./routes/kulturprojekter.tsx": $kulturprojekter,
    "./routes/kulturprojekter/[title].tsx": $kulturprojekter_title_,
    "./routes/om.tsx": $om,
    "./routes/presse.tsx": $presse,
    "./routes/udstillinger.tsx": $udstillinger,
    "./routes/udstillinger/[title].tsx": $udstillinger_title_,
  },
  islands: {
    "./islands/Navigation.tsx": $Navigation,
    "./islands/ProjectCarousel.tsx": $ProjectCarousel,
    "./islands/SocialIcons.tsx": $SocialIcons,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
