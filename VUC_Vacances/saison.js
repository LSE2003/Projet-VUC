
function lancerChute(leafImages) {
    const container = document.querySelector('.falling-leaves');

    function createLeaf() {
        const leaf = document.createElement('img');
        leaf.src = leafImages[Math.floor(Math.random() * leafImages.length)];
        leaf.classList.add('leaf');

        const centerWidth = 800;
        const pageWidth = window.innerWidth;
        const margin = (pageWidth - centerWidth) / 2;

        const isLeft = Math.random() < 0.5;
        const x = isLeft
            ? Math.random() * (margin - 40)
            : pageWidth - Math.random() * (margin - 40);

        leaf.style.left = `${x}px`;

        const header = document.querySelector('header');
        const headerHeight = header.offsetHeight;
        leaf.style.top = `${headerHeight}px`;

        container.appendChild(leaf);

        const duration = Math.random() * 5 + 5;
        const rotation = Math.random() * 360;

        gsap.to(leaf, {
            y: document.body.scrollHeight + 100,
            rotation: rotation,
            duration: duration,
            ease: 'linear',
            onComplete: () => {
                leaf.remove();
                createLeaf();
            }
        });
    }

    for (let i = 0; i < 100; i++) {
        createLeaf();
    }

    // Ajouter une feuille toutes les 2 secondes (par exemple)
    setInterval(() => {
        createLeaf();
    }, 2000);
}
