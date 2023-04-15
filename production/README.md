# `windrag`
Simple and small library to create draggable windows in websites

Free and [open-source](https://github.com/Axorax/windrag.js)!

Raw size (windrag.js) → 2.5 kB

Zipped size (windrag.js) → 1.02 KB

## 📖 Documentation

### ➜ Create a new window dragger

```js
windrag.create('.box', '.box');
```

The first argument is the element that you want to get affected and the second argument is the activator (the element that will trigger the element provided in the first argument to move).

### ➜ With options

```js
windrag.create('.box', '.box', {
    position: 'relative',
    css: 'background: blue;',
    idLength: 6
});
```

### ➜ Add basic limit to window movement

```js
windrag.create('.box', '.box', {
    limitMovement: true
});
```

The above code should prevent the window from going out of screen. It is not perfect as the limit really depends on your layout, css, etc.

### ➜ Hide window

```js
const window = windrag.create('.box', '.box');
windrag.hide(window.id);
```

### ➜ Maximize window

```js
const window = windrag.create('.box', '.box');
windrag.maximize(window.id);
```

If the window is already maximized then it will change it back to the original width and height. You can use the code below to test that.

```js
<body style="height: 100vh;margin:0;padding:0;">

    <div class="box" style="width: 300px; height: 300px; background: red;"></div>
    
    <script type="module">
        import { windrag } from 'https://cdn.jsdelivr.net/npm/windrag';

        const window = windrag.create('.box', '.box');

        windrag.maximize(window.id);

        setTimeout(() => {
            windrag.maximize(window.id);
        }, 5000)
    </script>
</body>
```

### ➜ Style active window

```css
.windrag-active {
    z-index: 9999;
    background: orange !important;
}
```

The above code will make sure the active window appears at the top of all other windows.

### ➜ Example with HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Windrag.js example</title>
</head>
<body style="height: 100vh;margin:0;padding:0;">

    <div class="box" style="width: 300px; height: 300px; background: red;"></div>
    
    <script type="module">
        import { windrag } from 'https://cdn.jsdelivr.net/npm/windrag';
        windrag.create('.box', '.box');
    </script>
</body>
</html>
```

---

[Support me on Patreon](https://www.patreon.com/axorax) - 
[Check out my socials](https://github.com/axorax/socials)