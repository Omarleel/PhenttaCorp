import React from 'react';
import { Tooltip } from 'react-tooltip';

export const CustomTooltip = ({ visibleText, tooltipText, tooltipId, tooltipPlace = "top", marginHorizontal = "mx-0", marginVertical = "my-0" }) => {
    return (
        <span>
            <a
                data-tooltip-id={tooltipId}
                data-tooltip-content={tooltipText}
                data-tooltip-place={tooltipPlace}
            >
                {visibleText}
            </a>
            <Tooltip id={`${tooltipId}`} />
        </span>
    );
};