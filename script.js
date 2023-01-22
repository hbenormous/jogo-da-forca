Array.prototype.rand = function() {
    return this[Math.floor(Math.random() * this.length)];
}

const words = ["macaco", "faca", "positivo", "identidade", "civil", "carteira", "agendamento", "senha", "atividades"];
let word = "";
let deletedLetters = [];
let draws = [];
let inputIsFocused = false;

class Draw {

    constructor() {

        draws = [{
            drawn: false,
            fun: this.head
        }, {
            drawn: false,
            fun: this.body
        }, {
            drawn: false,
            fun: this.rightArm
        }, {
            drawn: false,
            fun: this.leftArm
        }, {
            drawn: false,
            fun: this.rightLeg
        }, {
            drawn: false,
            fun: this.leftLeg
        }, {
            drawn: false,
            fun: this.rightFoot
        }, {
            drawn: false,
            fun: this.leftFoot
        }, {
            drawn: false,
            fun: this.leftEye
        }, {
            drawn: false,
            fun: this.rightEye
        }, {
            drawn: false,
            fun: this.nose
        }, {
            drawn: false,
            fun: this.mouth
        }, {
            drawn: false,
            fun: this.rightHand
        }, {
            drawn: false,
            fun: this.leftHand
        }];

    }

    head(ctx) {

        ctx.beginPath();
        ctx.arc(75, 30, 20, 0, 2 * Math.PI);
        ctx.stroke();

    }

    leftEye(ctx) {

        ctx.beginPath();
        ctx.arc(65, 20, 3, 0, 2 * Math.PI);
        ctx.stroke();

    }

    rightEye(ctx) {

        ctx.beginPath();
        ctx.arc(85, 20, 3, 0, 2 * Math.PI);
        ctx.stroke();

    }

    nose(ctx) {

        ctx.beginPath();
        ctx.arc(75, 30, 1, 0, 2 * Math.PI);
        ctx.stroke();

    }

    mouth(ctx) {

        ctx.beginPath();
        ctx.moveTo(70, 40);
        ctx.lineTo(80, 40);
        ctx.stroke();

    }

    rightArm(ctx) {

        ctx.beginPath();
        ctx.moveTo(75, 50);
        ctx.lineTo(125, 100);
        ctx.stroke();

    }

    rightHand(ctx) {

        ctx.beginPath();
        ctx.moveTo(125, 100);
        ctx.lineTo(135, 100);
        ctx.stroke();

    }

    leftArm(ctx) {

        ctx.beginPath();
        ctx.moveTo(75, 50);
        ctx.lineTo(25, 100);
        ctx.stroke();

    }

    leftHand(ctx) {

        ctx.beginPath();
        ctx.moveTo(25, 100);
        ctx.lineTo(15, 100);
        ctx.stroke();

    }

    body(ctx) {

        ctx.beginPath();
        ctx.moveTo(75, 50);
        ctx.lineTo(75, 100);
        ctx.stroke();

    }

    rightLeg(ctx) {

        ctx.beginPath();
        ctx.moveTo(75, 100);
        ctx.lineTo(125, 140);
        ctx.stroke();

    }

    leftLeg(ctx) {

        ctx.beginPath();
        ctx.moveTo(75, 100);
        ctx.lineTo(25, 140);
        ctx.stroke();

    }

    rightFoot(ctx) {

        ctx.beginPath();
        ctx.moveTo(125, 140);
        ctx.lineTo(140, 140);
        ctx.stroke();

    }

    leftFoot(ctx) {

        ctx.beginPath();
        ctx.moveTo(25, 140);
        ctx.lineTo(10, 140);
        ctx.stroke();

    }

}

class Letter {

    static correct(array) {

        array.forEach(i => {
            const p = document.querySelectorAll("#palavra p").item(i);
            p.style.color = "black";
        });

    }

    static wrong() {

        const p = document.createElement("p");
        p.innerHTML = document.querySelector("input").value.toLowerCase();
        document.querySelector("#letras-erradas").appendChild(p);

    }

    static check(letter) {

        const letters = [...word];
        const hasLetter = letters.map((e, i) => {
            if (!e.indexOf(letter)) return i;
        }).filter(e => e !== undefined);

        if (hasLetter.length) return hasLetter;

    }

}

class Game {

    getRandomWord() {

        return words.rand();

    }

    injectWords() {

        word = this.getRandomWord();

        for (var i = 0; i < word.length; i++) {
            const p = document.createElement("p");
            p.innerHTML = word[i];
            document.querySelector("#palavra").appendChild(p);
        }

    }

    won(array) {

        if (array.length === word.length) {
            setTimeout(() => location.reload(), 1500);
            return document.body.innerHTML = "<h1>VOCÊ VENCEU!!!! :D</h2>";
        }

    }

    itLost() {

        const draw = draws.find(d => !d.drawn);
        if (draw) {
            draw.fun(document.querySelector("canvas").getContext("2d"));
            draw.drawn = true;
        } else {
            setTimeout(() => location.reload(), 1500);
            document.body.innerHTML = "<h1>VOCÊ FOI ENFORCADO!!!! :(</h2>";
        }

    }

    load() {

        this.injectWords();

        document.querySelector("input").addEventListener("focus", () => inputIsFocused = true);
        document.querySelector("input").addEventListener("blur", () => inputIsFocused = false);

        window.addEventListener("keyup", (e) => {

            const input = document.querySelector("input");
            const letterIndex = Letter.check(input.value.toLowerCase());

            if (inputIsFocused && e.keyCode === 13 && input.value.length) {
                if (deletedLetters.includes(input.value)) return;
                deletedLetters.push(input.value);

                if (letterIndex == undefined) {
                    Letter.wrong();
                    this.itLost();
                } else {
                    Letter.correct(letterIndex);

                    // ADICIONAR AS PALAVRAS QUE ESTÃO CORRETAS
                    const correctWords = [];
                    document.querySelectorAll("#palavra p").forEach(par => {

                        if (par.style.color === "black") correctWords.push(1);

                    });

                    this.won(correctWords); // ANUNCIAR VITÓRIA
                }

                input.value = ""; // RESETAR INPUT
            }

        })

    }

}

window.onload = () => {

    new Game().load();
    new Draw();

}