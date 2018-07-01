const LOCK_KEY = 'l'

AFRAME.registerComponent('attach', {

    schema: {
        to: { type: 'string' },
        position: { type: 'vec3', default: { x: 0, y: 0, z: -5 } },
        rotation: { type: 'vec3' },
    },

    init() {

        this.el.attachTarget = document.querySelector(this.data.to)

        if ( this.el.attachedToTarget === undefined )
            this.el.attachedToTarget = false

        this.keyUp = event => {

            if ( event.key === LOCK_KEY ) {
                this.el.attachedToTarget = !this.el.attachedToTarget

                if ( this.el.attachedToTarget ) this.attach()
                else this.detach()
            }

        }

        window.addEventListener( 'keyup', this.keyUp )

    },

    remove() {
        window.removeEventListener( 'keyup', this.keyUp )
    },

    attach() {

        this.el.originalPosition = this.el.getAttribute('position')
        this.el.originalRotation = this.el.getAttribute('rotation')

        this.el.setAttribute('position', this.data.position)
        this.el.setAttribute('rotation', this.data.rotation)

        this.el.attachTarget.appendChild( this.el )
    },

    detach() {

        this.el.setAttribute('position', this.el.originalPosition)
        this.el.setAttribute('rotation', this.el.originalRotation)

        this.el.sceneEl.appendChild( this.el )
    },

});
