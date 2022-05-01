'use strict';

var quit_press_timer = null;

var state = {
    stack: [''],
    after_calc: false,
    quit_pressed: false,
    get first() {
        return this.stack[this.stack.length - 1];
    },
    get second() {
        return this.stack[this.stack.length - 2];
    },
    set first(n) {
        this.stack[this.stack.length - 1] = String(n);
    }
};

function add() {
    let x = parseFloat(state.stack.pop());
    let y = parseFloat(state.stack.pop());
    state.stack.push(String(y + x));
    state.after_calc = true;
    render();
}

function subtract() {
    let x = parseFloat(state.stack.pop());
    let y = parseFloat(state.stack.pop());
    state.stack.push(String(y - x));
    state.after_calc = true;
    render();
}

function multiply() {
    let x = parseFloat(state.stack.pop());
    let y = parseFloat(state.stack.pop());
    state.stack.push(String(y * x));
    state.after_calc = true;
    render();
}

function divide() {
    let x = parseFloat(state.stack.pop());
    let y = parseFloat(state.stack.pop());
    state.stack.push(String(y / x));
    state.after_calc = true;
    render();
}

function enter() {
    state.stack.push(state.first);
    state.after_calc = false;
    clear();
}

function clear() {
    state.first = '';
    render();
}

function type(s) {
    if (isNaN(parseFloat(state.first)) || !isFinite(parseFloat(state.first))) {
        state.after_calc = false;
        clear();
    }

    if (state.after_calc == true) {
        enter();
    }

    state.first += String(s);
    render();
}

function back() {
    if (state.quit_pressed == true) {
        window.close();
    } else {
        state.quit_pressed = true;
        clear();
        quit_press_timer = setTimeout(() => {
            quit_press_timer = null;
            state.quit_pressed = false;
        }, 500);
    }
}

function render() {
    let lines = [
        document.getElementById('line0'),
        document.getElementById('line1'),
        document.getElementById('line2'),
        document.getElementById('line3'),
        document.getElementById('line4'),
        document.getElementById('line5'),
    ];

    let length = state.stack.length;

    for (let i = 0; i <= 5; i++) {
        let j = (length - i) - 1;

        if (state.stack[j] == undefined) {
            lines[i].innerText = '';
        } else {
            lines[i].innerText = String(state.stack[j]);
        }
    }
}

document.addEventListener('keyup', (event) => {
    event.preventDefault();
    
    switch(event.key) {
        case 'Enter':
            enter();
            break;
        case 'ArrowDown':
            add();
            break;
        case 'ArrowUp':
            subtract();
            break;
        case 'ArrowLeft':
            divide();
            break;
        case 'ArrowRight':
            multiply();
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            type(event.key);
            break;
        case '#':
            console.log('#');
            type('.');
            break;
        case '*':
            console.log('*');
            return;
        case 'SoftLeft':
            // TODO Implement AD button
            return;
        case 'SoftRight':
            // TODO Implement menu/accept
            return;
        case 'Backspace':
            back();
            break;
        default:
            return;
    }
});

document.addEventListener('keydown', (event) => {
    event.preventDefault();
});