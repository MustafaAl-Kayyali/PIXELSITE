// Enhanced AgriGrow Animation Controller
class AgriGrowAnimations {
    constructor() {
        this.isRaining = false;
        this.plantStages = ['🌱', '🌿', '🌾', '🌽'];
        this.plantProgress = [0, 0];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startContinuousAnimations();
        this.setupInteractiveElements();
        // The silent redirect call is moved here
        this.startSilentAutoRedirect(6000); // Redirect silently after 6 seconds (adjusted for a less immediate feel)
    }

    // --- Silent Redirect Implementation ---
    startSilentAutoRedirect(delayInMs) {
        // This function initiates the redirect without any visible countdown or overlay.
        setTimeout(() => {
            console.log('Redirecting silently to index.html...');
            window.location.href = 'home.html';
        }, delayInMs);
    }

    // --- Original Methods (Modified for clarity and compactness) ---

    setupEventListeners() {
        // Rain simulation
        document.getElementById('simulate-rain').addEventListener('click', () => this.toggleRain());

        // Plant interactions
        document.querySelectorAll('.crop-plant').forEach((plant, index) => {
            plant.addEventListener('click', (e) => this.growPlant(plant, index, e));
        });

        // Water flow boost
        document.getElementById('water-flow').addEventListener('click', () => this.boostWaterFlow());

        // Sun interaction
        document.getElementById('sun').addEventListener('click', () => this.sunBurst());

        // Cloud interaction
        document.getElementById('cloud').addEventListener('click', () => this.cloudInteraction());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    startContinuousAnimations() {
        // Animate plants continuously
        setInterval(() => {
            document.querySelectorAll('.crop-plant').forEach((plant) => {
                // Simplified GSAP animation object for brevity
                gsap.to(plant, {
                    rotation: Math.random() * 6 - 3,
                    duration: 2 + Math.random(),
                    ease: "power2.inOut",
                    yoyo: true,
                    repeat: 1
                });
            });
        }, 8000);

        // Water flow cycle
        setInterval(() => {
            const waterFlow = document.getElementById('water-flow');
            gsap.fromTo(waterFlow,
                { x: -30, opacity: 0, scale: 1 },
                {
                    x: 280,
                    opacity: 1,
                    scale: 1.2,
                    duration: 4,
                    ease: "power2.out",
                    onComplete: () => gsap.set(waterFlow, { x: -30, opacity: 0, scale: 1 })
                }
            );
        }, 12000);
    }

    setupInteractiveElements() {
        // Add hover effects to cards
        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { scale: 1.02, duration: 0.3, ease: "power2.out" });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
            });
        });
    }

    toggleRain() {
        const farmScene = document.getElementById('farm-scene');
        const rainButton = document.getElementById('simulate-rain');

        if (!this.isRaining) {
            this.startRain(farmScene, rainButton);
        } else {
            this.stopRain(farmScene, rainButton);
        }
    }

    startRain(farmScene, button) {
        this.isRaining = true;
        button.textContent = 'Stop Rain';
        button.style.background = 'linear-gradient(135deg, #34495e, #2c3e50, #1a252f)';

        farmScene.classList.add('rain-active');

        // Update moisture level with animation
        setTimeout(() => {
            this.updateMoistureLevel(95);
        }, 1000);

        // Auto-stop after 8 seconds
        setTimeout(() => {
            if (this.isRaining) {
                this.stopRain(farmScene, button);
            }
        }, 8000);
    }

    stopRain(farmScene, button) {
        this.isRaining = false;
        button.textContent = 'Simulate Rain';
        button.style.background = 'linear-gradient(135deg, #3498db, #2980b9, #1f4e79)';

        farmScene.classList.remove('rain-active');

        setTimeout(() => {
            this.updateMoistureLevel(85);
        }, 2000);
    }

    growPlant(plant, index, event) {
        event.stopPropagation();

        this.plantProgress[index] = (this.plantProgress[index] + 1) % this.plantStages.length;

        // Growth animation
        gsap.timeline()
            .to(plant, {
                scale: 1.5,
                rotation: 360,
                duration: 0.6,
                ease: "back.out(1.7)"
            })
            .to(plant, {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                onComplete: () => {
                    plant.textContent = this.plantStages[this.plantProgress[index]];
                    this.updateGrowthProgress();
                }
            });
    }

    updateGrowthProgress() {
        const totalProgress = this.plantProgress.reduce((sum, stage) => sum + stage, 0);
        const percentProgress = Math.min((totalProgress / (this.plantStages.length * 2)) * 100, 100);

        // Note: The original code selected '#crop-progress .data-bar::after' which is for CSS, not JavaScript.
        // Assuming the progress bar value is the target for animation.
        const progressValue = document.querySelector('#crop-progress .value');

        if (progressValue) {
            gsap.to({ progress: parseInt(progressValue.textContent) }, {
                progress: percentProgress,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: function() {
                    progressValue.textContent = `${Math.round(this.targets()[0].progress)}% Complete`;
                }
            });
        }
    }

    updateMoistureLevel(newLevel) {
        const moistureValue = document.querySelector('#soil-moisture .value');

        if (moistureValue) {
            const currentLevel = parseInt(moistureValue.textContent);
            gsap.to({ level: currentLevel }, {
                level: newLevel,
                duration: 2,
                ease: "power2.out",
                onUpdate: function() {
                    moistureValue.textContent = `${Math.round(this.targets()[0].level)}%`;
                }
            });
        }
    }

    boostWaterFlow() {
        const waterFlow = document.getElementById('water-flow');

        gsap.timeline()
            .to(waterFlow, {
                scale: 2,
                rotation: 720,
                duration: 0.8,
                ease: "back.out(1.7)"
            })
            .to(waterFlow, {
                scale: 1,
                rotation: 0,
                duration: 0.5
            });

        setTimeout(() => {
            const currentMoisture = parseInt(document.querySelector('#soil-moisture .value').textContent);
            this.updateMoistureLevel(Math.min(currentMoisture + 8, 100));
        }, 1000);
    }

    sunBurst() {
        const sun = document.getElementById('sun');

        gsap.timeline()
            .to(sun, {
                scale: 1.6,
                rotation: 180,
                filter: 'drop-shadow(0 0 50px rgba(255, 215, 0, 1))',
                duration: 0.8,
                ease: "back.out(1.7)"
            })
            .to(sun, {
                scale: 1,
                rotation: 0,
                filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))',
                duration: 0.6
            });
    }

    cloudInteraction() {
        const cloud = document.getElementById('cloud');

        gsap.to(cloud, {
            scale: 1.3,
            y: -20,
            duration: 0.5,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
        });
    }

    handleKeyboard(e) {
        switch(e.key.toLowerCase()) {
            case 'r':
                this.toggleRain();
                break;
            case 'g':
                const firstPlant = document.querySelector('.crop-plant');
                if (firstPlant) {
                    this.growPlant(firstPlant, 0, e);
                }
                break;
            case 's':
                this.sunBurst();
                break;
            case 'w':
                this.boostWaterFlow();
                break;
        }
    }
    // Removed startAutoRedirect and redirectToIndex methods entirely.
}

// Initialize animations and auto-redirect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const agriGrow = new AgriGrowAnimations();

    // The silent redirect is now initiated within the constructor's init method.
    // The previous explicit setTimeout call for the redirect is no longer needed here.

    // Make it globally accessible
    window.agriGrow = agriGrow;
});