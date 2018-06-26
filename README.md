# Ghost theme for the US blog

## Requirements

Install [Less](http://lesscss.org/):

```
npm install -g less
```

# Compiling the theme

```
lessc src/assets/css/screen.less src/assets/css/screen.css
```

Packaging the theme:

```
cd src \
    && rm -f ../blog-ippon.zip \
    && zip -r blog-ippon.zip * \
        -i "*.json" -i "*.hbs" -i "*.css" -i "*.js" \
        -i "*.jpg" -i "*.png" -i "*.gif" \
        -i "*.svg" -i "*.ttf" -i "*.woff" -i "*.woff2" -i "*.eot" -i "*.otf" \
        -i "*.txt" \
    && cd ..
```
