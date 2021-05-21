import * as utils from '@dcl/ecs-scene-utils'

export class Firework extends Entity {
  private fireworkLaunchSound = new AudioClip('sounds/fireworkLaunch.mp3')
  private fireworkExplodeSound = new AudioClip('sounds/fireworkExplode.mp3')

  constructor(model: GLTFShape, transform: Transform) {
    super()
    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(transform)

    this.addComponent(new Animator())
    this.getComponent(Animator).addClip(
      new AnimationState('Play', { looping: false })
    )

    this.addComponentOrReplace(
      new OnPointerDown(
        () => {

          // sound
          this.addComponentOrReplace(new AudioSource(this.fireworkLaunchSound))
          this.getComponent(AudioSource).playOnce()
          utils.setTimeout(1250, () => {
            this.addComponentOrReplace(new AudioSource(this.fireworkExplodeSound))
            this.getComponent(AudioSource).playOnce()
          })

          // animation
          this.getComponent(Animator).getClip('Play').play()
          utils.setTimeout(4800, () => {
            this.getComponent(Animator).getClip('Play').stop()
          })

        },
        {
          hoverText: 'Launch firework',
          distance: 4,
          button: ActionButton.POINTER,
        }
      )
    )
  }
}

const hayBase = new Entity()
hayBase.addComponent(new GLTFShape('models/Hay_Base_01.gltf'))
hayBase.addComponent(
  new Transform({
    position: new Vector3(4, 0, 4),
    rotation: Quaternion.Euler(0, 90, 0),
  })
)
engine.addEntity(hayBase)

const fireworkShape = new GLTFShape('models/Firework_03.gltf')

export const firework1 = new Firework(
  fireworkShape,
  new Transform({
    position: new Vector3(-0.1, 0.1, -0.8),
    rotation: Quaternion.Euler(-45, 45, 25),
  }),
)
firework1.setParent(hayBase)

export const firework2 = new Firework(
  fireworkShape,
  new Transform({
    position: new Vector3(0.1, 0.1, 0.8),
    rotation: Quaternion.Euler(-45, 45 + 180, -25),
  }),
)
firework2.setParent(hayBase)

export const firework3 = new Firework(
  fireworkShape,
  new Transform({
    position: new Vector3(0, 0.125, 0),
    rotation: Quaternion.Euler(2, 90, -2),
  }),
)
firework3.setParent(hayBase)

export const firework4 = new Firework(
  fireworkShape,
  new Transform({
    position: new Vector3(-0.1, 0.1, 0.8),
    rotation: Quaternion.Euler(45, -45, 25),
  }),
)
firework4.setParent(hayBase)
