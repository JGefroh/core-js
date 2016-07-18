(function() {
  'use strict';


  (function() {
    var core = new Core();
    core.addSystem(new MovementSystem(core));
    core.addSystem(new RenderSystem(core));

    var player = new Entity();
    player.add(new PositionComponent());
    player.add(new RenderComponent());

    core.addTag(new Moveable());
    core.addTag(new Renderable());
    core.addEntity(player);
    core.start();
  })();
})();
