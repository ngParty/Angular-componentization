import {ITooltip, ITooltipAttrs} from './tooltip.directive';

function tooltipOverflow() {
    return {
        restrict: 'A',
        require: 'nyTooltip',

        link: ( scope, element, attrs: ITooltipAttrs, TooltipController: ITooltip ) => {

            element.on( 'mouseover', ( event: Event )=> {

                let shouldShow = element[ 0 ].scrollWidth > element[ 0 ].clientWidth;

                TooltipController.setState( { shouldShow } );

            } );
        }
    }
}

export default tooltipOverflow;