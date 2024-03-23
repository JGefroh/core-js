import { default as Component } from '@core/component';

export default class RenderComponent extends Component {
    constructor(payload) {
        super()
        this.width = payload.width;
        this.height = payload.height;
        this.isVisible = true;
        this.componentType = 'RenderComponent'
    }
}