
const floor = new Entity()
floor.addComponent(new GLTFShape('models/FloorBaseGrass_01.glb'))
floor.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8),
  })
)
engine.addEntity(floor)
