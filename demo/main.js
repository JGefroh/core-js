import { default as Core}  from '@core/core';
import '@core/component';
import { default as Entity } from './core-js/src/entity.js'
import './core-js/src/tag';


import { default as RenderComponent } from './game/renderer/render-component'
import { default as RenderSystem } from '@demo/renderer/render-system';
import { default as Renderable } from '@demo/renderer/render-tags';

import { default as InputSystem} from '@demo/inputter/input-system';
import { default as MovementSystem} from '@demo/commander/movement-system';
import { default as Moveable } from '@demo/commander/movement-tags';


import { default as PositionComponent } from './game/positioner/position-component'


console.info("HELLO WORLD")

function start() {
    let entity = new Entity();
    entity.addComponent(new RenderComponent({ isVisible: true, width: 15, height: 15 }))
    entity.addComponent(new PositionComponent({ xPosition: 50, yPosition: 100 }));
    
    Core.addEntity(entity);
    
    Core.addSystem(new RenderSystem())
    Core.addSystem(new InputSystem())
    Core.addSystem(new MovementSystem())
    Core.addTag(new Renderable())
    Core.addTag(new Moveable())
    
    Core.start();
}

function defineCanvas() {
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    document.body.innerHTML = "<p>Proof of concept - use the W A S D keys to move the dot.</p>";
    document.body.appendChild(canvas);
}

defineCanvas();
start();