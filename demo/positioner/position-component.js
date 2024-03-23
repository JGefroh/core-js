import { default as Component} from '@core/component'

export default class PositionComponent extends Component {
    constructor(payload) {
        super();
        this.xPosition = payload.xPosition;
        this.yPosition = payload.yPosition;
        this.componentType = "PositionComponent"
    }
}