import { Tooltip } from 'react-tooltip'

const CustomTooltip = ({ visibleText, tooltipText, tooltipId, tooltipPlace = "top", marginHorizontal = "mx-0", marginVertical = "my-0" }) => {
    return (
        <span>
            <a
                data-tooltip-id={ tooltipId }
                data-tooltip-content={ tooltipText }
                data-tooltip-place={ tooltipPlace }
                className={`text-sm font-medium text-[#174CAA] hover:underline cursor-pointer dark:text-white ${marginHorizontal} ${marginVertical}`}
            >
                { visibleText }
            </a>
            <Tooltip id={ tooltipId } />
        </span>
    );
};

export default CustomTooltip;
