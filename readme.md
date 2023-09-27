# I hope You will read this before begin

# Kiev Christian Academy
### notes from developers

#### Read everything up to the < END OF DEV NOTES MANUAL /> . This is an explanation from the developers who started the project.

______________________________________
## < START OF DEV NOTES MANUAL >
______________________________________


All dev files are present in `src` folder. The build version can be found in `build` folder after running `npm run build`
command.

# `npm run dev` mode working incorrect.

Some issues with differend path addresses for build and for dev. Necessity to rewrite all page links for dev from ../ to ./

## So better ways to developing this project is: 

- Write and check all edit's results after typing `npm run build` and checking pages in folder build



- Modify gulp config and check all edit's results in `npm run dev` mode with identical results in `npm run build` mode




## Design

https://www.figma.com/file/dRFrhFZ69NYGdKmlvslCtp/Kyiv-Christian-Academy?node-id=0%3A1&mode=dev

## Status

# All required project pages

### home
### about
- about kca
- about acreditation
- about faculty
- about covid-19
### admissions
- Admission info
- Tution
- Apply online

### teaching
- teaching opportunities
- teacher job description
- FAQ

### academics
- Curriculum
- Graduation Requirements

### Student Life
- Activities
- School Calendar
- School Supply List
- Student Handbook
- What is Sycamore?
- Photos

### Reviews

### Contact Us

### Donate
- Make a donation to KCA

# All writed pages

### home
### about
- about kca
- about acreditation
- about faculty
- about covid-19
### admissions
- Admission info


### teaching
- teaching opportunities
- teacher job description
- FAQ

### academics


______________________________________
For specific questions You can write to me on telegram
### https://t.me/arenort_it
______________________________________
## < END OF DEV NOTES MANUAL />
______________________________________

Next is all the rest, default project manual.







# Gulp with TailwindCSS v.1.0.4


## Features

- Easy configuration using `config.js`
- Live reload on file/assets changes using `browser-sync`
- SCSS support
- Minification of styles and scripts on production build
- Minification of images on production build using `imagemin`
- Includes following tailwindcss plugins (can be disabled/enabled with `config.js`)

      - [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)
      - [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)
      - [@tailwindcss/container-queries](https://github.com/tailwindlabs/tailwindcss-container-queries)

## Quick Start

Install dev dependencies

```sh
yarn install // or npm install
```

Start development server with live preview

```sh
yarn dev // or npm run dev
```

Generate build files for production server

```sh
yarn prod // or npm run prod
```

## Configuration

All configurations are found in `config.js` file in the root directory. You can configure browser default port,
enable/disable plugins by simply updating boolean values (Default is set to `true`) and many more.

```js
const config = {
    tailwindjs: "./tailwind.config.js",
    port: 9050,
    purgecss: {
        content: ["src/**/*.{html,js,php}"],
        ...
    },

    imagemin: {
        png: [0.7, 0.7],
        jpeg: 70,
    },
};

const plugins = {
    typography: true,
    forms: true,
    containerQueries: true,
};
...
```

