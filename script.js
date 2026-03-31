document.addEventListener('DOMContentLoaded', () => {
    // ---------------- TYPING EFFECT ----------------
    const text = ["Developer.", "IT Support.", "Web Designer."];
    let i = 0, j = 0, current = "", isDeleting = false;

    function type() {
        const el = document.getElementById("typing");
        if (!el) return;

        if (!isDeleting && j <= text[i].length) {
            current = text[i].substring(0, j++);
        } else if (isDeleting && j >= 0) {
            current = text[i].substring(0, j--);
        }

        el.textContent = current;

        if (j === text[i].length) {
            isDeleting = true;
            setTimeout(type, 1000);
            return;
        }

        if (j === 0 && isDeleting) {
            isDeleting = false;
            i = (i + 1) % text.length;
        }

        setTimeout(type, isDeleting ? 50 : 100);
    }
    type();

    // ---------------- DARK MODE TOGGLE ----------------
    const body = document.body;
    const toggle = document.getElementById('darkToggle');

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    if (toggle) {
        toggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem(
                'darkMode',
                body.classList.contains('dark-mode') ? 'enabled' : 'disabled'
            );
        });
    }

    // ---------------- SCROLL ANIMATIONS ----------------
    const scrollElements = document.querySelectorAll(
        '.about-section, .projects-section, .contact-section, .hero-left, .hero-right'
    );

    const elementInView = (el, offset = 0) => {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
    };

    const displayScrollElement = (element) => {
        element.classList.add('animate-slide-up');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach(el => {
            if (elementInView(el, 50)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();

    // ---------------- CYBER CIRCUIT BACKGROUND ----------------
    const canvas = document.querySelector('.circuit-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const nodes = [];
    const nodeCount = 30; // number of nodes
    const maxDistance = 200; // max distance to draw lines

    class Node {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
        }
        move() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
    }

    for(let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        // draw nodes
        nodes.forEach(n => {
            n.move();
            ctx.beginPath();
            ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#38bdf8';
            ctx.fill();
        });
        // draw lines
        for(let i = 0; i < nodes.length; i++){
            for(let j = i+1; j < nodes.length; j++){
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if(dist < maxDistance){
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist / maxDistance})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        setTimeout(() => requestAnimationFrame(draw), 16);
    }

    draw();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
});