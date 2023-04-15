/* © Axorax - <github.com/axorax>
 * windrag-basic (windrag.js with only one function)
 * Create a window:
 * const window = windrag.create('.box', '.box', {position: 'relative'});
 */

export const windrag = {
    "create": (element, activator, options = {
        position: 'absolute'
    }) => {

        options.position = options.position || 'absolute';
        options.idLength = options.idLength || 5;

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

        function disableMoving() {
            allowMoving = false;
            element.classList.remove('windrag-active')
        }

        activator.addEventListener(events[deviceType].down, (e) => {
            element.style.position = options.position;
            e.preventDefault();
            x = !deviceTouch ? e.clientX : e.touches[0].clientX;
            y = !deviceTouch ? e.clientY : e.touches[0].clientY;
            allowMoving = true;
        });

        activator.addEventListener(events[deviceType].move, (e) => {
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
        });

        activator.addEventListener("mouseleave", disableMoving);

        activator.addEventListener(events[deviceType].up, disableMoving);

        return {
            "id": id,
            "elementId": `windrag-element-${id}`,
            "activatorId": `windrag-activator-${id}`
        }
    }
}

export default windrag;