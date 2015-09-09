import './tooltip.css!';

interface ITooltipState {
    shouldShow?: boolean,
    isShowing?: boolean,
    message?: string,
    x?: number,
    y?: number
}
class TooltipState {

    // Boolean - if the tooltip should be shown - component decorators can modify this property.
    shouldShow: boolean;
    // Boolean - if the tooltip is currently being shown. Component decorators can use this property to test if the tooltip is being shown
    isShowing: boolean;
    // String - the message the tooltip contains. It is an angular expression
    message: string;
    // Number - the x coordinate of the tooltip
    x: number;
    // Number - the y coordinate of the tooltip
    y: number;

    constructor({
            shouldShow=true,
            isShowing=false,
            message='',
            x=0,
            y=0
        } = {} as ITooltipState) {

        //this.shouldShow = stateInitConfig.shouldShow || true;
        //
        //this.isShowing = stateInitConfig.isShowing || false;
        //
        //this.message = stateInitConfig.message || '';
        //
        //this.x = stateInitConfig.x || 0;
        //
        //this.y = stateInitConfig.y || 0;
    }

}


interface ITooltipIsolateScope extends ng.IScope {
    tooltip: Tooltip;
}
export interface ITooltipAttrs extends ng.IAttributes {
    nyTooltip: string,
    nyTooltipMessage: string,
    nyTooltipOverflow: string
}

type Cords = {top:string,left:string};

export interface ITooltip {
    show(),
    hide(),
    setPosition( x: number, y: number ),
    setState( newState: ITooltipState ),
    compileHTML( html: string, context: ITooltipIsolateScope ): ng.IAugmentedJQuery,
    getPosition(): Cords
}

class Tooltip implements ITooltip {

    private state: ITooltipState;

    static $inject = [ '$compile' ];

    constructor( private $compile: ng.ICompileService ) {

        this.state = new TooltipState()

    }

    setState( newState: ITooltipState ) {
        Object.assign( this.state, newState );
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    show() {
        if ( this.state.shouldShow ) {
            this.setState( { isShowing: true } );
        }
    }

    hide() {
        this.setState( { isShowing: false } );
    }

    setPosition( x: number, y: number ) {
        this.setState( { x, y } );
    }

    compileHTML( html: string, context: ITooltipIsolateScope ): ng.IAugmentedJQuery {

        return this.$compile( html )( context );

    }

    getPosition(): Cords {
        return {
            top: this.state.y + 'px',
            left: this.state.x + 'px'
        }
    }

    static ddo() {
        return {
            restrict: 'A',
            controller: 'NyTooltip',
            // controllerAs: 'tooltip', // we won't use this since we are kind of stepping outside normal angular stuff
            link: (
                scope: ng.IScope,
                element: ng.IAugmentedJQuery,
                attrs: ng.IAttributes,
                TooltipController: Tooltip
            )=> {

                const $body = angular.element( document.body );
                let $tooltipElement;
                const tooltipScope = scope.$new( true ) as ITooltipIsolateScope; // new isolate scope
                const TOOLTIP_HTML = '<div class="ny-tooltip">{{tooltip.state.message}}</div>';

                tooltipScope.tooltip = TooltipController; // controllerAs in the isolate scope

                // events
                element.on( 'mouseover', function onMouseover( event ) {
                    TooltipController.setPosition( event.clientX + 10, event.clientY + 10 );
                    TooltipController.show();
                    tooltipScope.$digest(); // let Angular know something interesting happened - local digest for performance
                } );

                element.on( 'mouseout', function onMouseout( event ) {
                    TooltipController.hide();
                    tooltipScope.$digest(); // let Angular know something interesting happened - local digest for performance
                } );

                // react to state changes
                tooltipScope.$watch( ()=>tooltipScope.tooltip.state.isShowing, ( isShowing )=> {

                    if ( isShowing ) {

                        // lazy initialization of tooltip contents
                        if ( !$tooltipElement ) {
                            $tooltipElement = TooltipController.compileHTML( TOOLTIP_HTML, tooltipScope );
                        }

                        $tooltipElement.css(
                            TooltipController.getPosition()
                        );

                        $body.append( $tooltipElement );

                    } else {

                        $tooltipElement && $tooltipElement.remove();

                    }

                } );

                TooltipController.componentDidMount();

                scope.$on( '$destroy', ( event: ng.IAngularEvent )=> {
                    TooltipController.componentWillUnmount()
                } );

            }
        }
    }
}

export default Tooltip;