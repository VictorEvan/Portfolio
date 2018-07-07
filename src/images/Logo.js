import React from "react";
import PropTypes from 'prop-types';

const Logo = props => (
  <svg
    className={props.className}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="276.292 260.667 83.167 56.083"
    {...props}
  >
    <defs>
      <text
        id="a"
        x={187.71}
        y={195}
        fontSize={45}
        fontFamily="Italianno"
        letterSpacing={0}
        alignmentBaseline="before-edge"
        transform="translate(89.583 66.667)"
        style={{ lineHeight: "100%" }}
        dominantBaseline="text-before-edge"
      >
        <tspan
          x={187.71}
          dy="0em"
          alignmentBaseline="before-edge"
          dominantBaseline="text-before-edge"
        >
          Victor
        </tspan>
      </text>
    </defs>
    <use xlinkHref="#a" />
  </svg>
)

Logo.propTypes = {
  className: PropTypes.string.isRequired
}

export default Logo;
