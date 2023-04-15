/* © Axorax - <github.com/axorax>
 * windrag v2.0.0
 * Documentation: https://github.com/Axorax/windrag.js#usage
 */

export const windrag = {
    "create": (element, activator, options = {
        position: 'absolute'
    }) => {

        options.position = options.position || 'absolute';
        options.css = options.css || '';
        options.idLength = options.idLength || 5;
        options.limitMovement = options.limitMovement || false;

        let generatedId = '';
        const idChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const idCharsLen = idChars.length;
        let idLenPassed = 0;

        while (idLenPassed < options.idLength) {
            generatedId += idChars.charAt(Math.floor(Math.random() * idCharsLen));
            idLenPassed += 1;
        }

        const id = generatedId;
        element = document.querySelector(element);
        activator = document.querySelector(activator);
        element.classList.add(`windrag-element-${id}`);
        activator.classList.add(`windrag-activator-${id}`);

        let isUserUsingTouchableDevice;

        try {
            document.createEvent("TouchEvent");
            isUserUsingTouchableDevice = true;
        } catch (e) {
            isUserUsingTouchableDevice = false;
        }

        if (options.css) {
            element.style.cssText += options.css;
        }

        let x = 0,
            y = 0,
            allowMoving = false,
            events = {
                mouse: {
                    down: "mousedown",
                    move: "mousemove",
                    up: "mouseup"
                },
                touch: {
                    down: "touchstart",
                    move: "touchmove",
                    up: "touchend"
                }
            },

            deviceType = isUserUsingTouchableDevice ? "touch" : "mouse",
            deviceTouch = isUserUsingTouchableDevice ? true : false;

        function moveIfDown(e) {
            element.style.position = options.position;
            e.preventDefault();
            x = !deviceTouch ? e.clientX : e.touches[0].clientX;
            y = !deviceTouch ? e.clientY : e.touches[0].clientY;
            allowMoving = true;
        }

        function disableMoving() {
            allowMoving = false;
            element.classList.remove('windrag-active')
        }

        activator.addEventListener(events[deviceType].down, (e) => moveIfDown(e));

        function moveIfMouse(e) {
            if (allowMoving) {
                element.classList.add('windrag-active');
                e.preventDefault();
                let currentX = !deviceTouch ? e.clientX : e.touches[0].clientX;
                let currentY = !deviceTouch ? e.clientY : e.touches[0].clientY;

                const top = element.offsetTop - (y - currentY),
                    left = element.offsetLeft - (x - currentX);

                element.style.top = top + 'px';
                element.style.left = left + "px";

                x = currentX;
                y = currentY;
            }
        }

        function moveIfMouseLimit(e) {
            if (allowMoving) {
                element.classList.add('windrag-active');
                e.preventDefault();
                let currentX = !deviceTouch ? e.clientX : e.touches[0].clientX;
                let currentY = !deviceTouch ? e.clientY : e.touches[0].clientY;

                const top = element.offsetTop - (y - currentY),
                    left = element.offsetLeft - (x - currentX),
                    leftLimit = 0,
                    rightLimit = document.body.clientWidth === 0 ? 0 : Math.abs(document.body.clientWidth - element.offsetWidth),
                    topLimit = 0,
                    bottomLimit = document.body.clientHeight === 0 ? 0 : Math.abs(document.body.clientHeight - element.offsetHeight);

                if (top > bottomLimit) {
                    element.style.top = bottomLimit + "px";
                } else if (top < topLimit) {
                    element.style.top = topLimit + "px";
                } else {
                    element.style.top = top + "px";
                }

                if (left > rightLimit) {
                    element.style.left = rightLimit + "px";
                } else if (left < leftLimit) {
                    element.style.left = leftLimit + "px";
                } else {
                    element.style.left = left + "px";
                }

                x = currentX;
                y = currentY;
            }
        }

        if (options.limitMovement) {
            activator.addEventListener(events[deviceType].move, (e) => moveIfMouseLimit(e));
        } else {
            activator.addEventListener(events[deviceType].move, (e) => moveIfMouse(e));
        }

        activator.addEventListener("mouseleave", disableMoving);

        activator.addEventListener(events[deviceType].up, disableMoving);

        return {
            "id": id,
            "elementId": `windrag-element-${id}`,
            "activatorId": `windrag-activator-${id}`
        }
    },
    "maximize": (id) => {
        const window = document.querySelector(`.windrag-element-${id}`);
        if (window.classList.contains('windrag-maximized')) {
            window.classList.remove('windrag-maximized');
            window.style.width = window.dataset.windragWidth;
            window.style.height = window.dataset.windragHeight;
            delete window.dataset.windragWidth;
            delete window.dataset.windragHeight;
        } else {
            window.classList.add('windrag-maximized');
            window.dataset.windragWidth = window.style.width;
            window.dataset.windragHeight = window.style.height;
            window.style.width = '100vw';
            window.style.height = '100vh';
        }
    },
    "hide": (id) => {
        const window = document.querySelector(`.windrag-element-${id}`);
        window.style.display = 'none';
    }
}

export default windrag;