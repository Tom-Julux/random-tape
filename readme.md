# Random Tape

[![Netlify Status](https://api.netlify.com/api/v1/badges/f3b71e55-2a21-45c6-b15a-65d690ad7fb2/deploy-status)](https://app.netlify.com/sites/confident-heisenberg-419e16/deploys)

A small party game using the [Spotify API](https://developer.spotify.com/) - Find out who truely knows what is in their playlists!

This project was developed as an experiment with the alpine.js framework.

## Contributing

This project is pretty much finished from my point of view, but feel free to do whatever you want with the code and create a PR if you want to see your changes reflected in this repo.

A few ideas on what to improve/change/update:

-   **Design improvments** - I selected colors, margins and font sizes pretty much randomly, so one could try to unify the design, for example by creating and applying a color palette.
-   Translations to other languages - All visible strings are contained in the [html file](index.html), which would, therefor, have to be copied (for example to 'index-de.html' and translated.

## Architectural descisions

The goal for this project was (besides creating a party game) to experiment with the [alpine.js](https://github.com/alpinejs/alpine), a self-proclaimed "rugged, minimal framework for composing JavaScript behavior in [] markup".


I found this framework extremely easy to work with, as it reuses much of the Vue (2) syntax, which I am familiar with.
During development, I stumbled upon the following caveats:

- Tooling support is very limited. For example there is no autocomplete (intellicode) support (at least in vscode and at least at the time of writing).
- The framework lends itself towards storing ui state and less towards handleing application state.
- Even with it beeing minimal compared to other frameworks, its 27kb still makes up for about 57% of the total size.

In total I would not use alpine again for a similar project, where the application state is directly linked with the ui and therefore has be stored in an `x-data` attribute. However, I can see its value proposition and would use alpine.js when the overall page size is generally larger (`>=270kb`) and mainly (exclusivly) ui state needs to be handled.

An example of such application can be seen in the [implementation of dark mode](index.html:#L227-L236).

Besides alpine this project only uses standard (modern) js, css and html. The conscious descision not to use any bundler was made, as alpine itself would not profit from using one and the website uses no further libraries, which use would require the use of a bundler. As neither the css nor js or html source files are particularly long, there was no reason identified to split the source code up any further.


## License

Copyright 2021 Tom Julux

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
