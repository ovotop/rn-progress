import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import {
  StyleSheet,
  ViewPropTypes,
  View
} from 'react-native';

import Svg, {
  G,
  Pattern,
  Path,
  Rect,
  Defs,
} from 'react-native-svg';

const isIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// const WIDTH = 256;
const MARGIN_HERIZONTAL = StyleSheet.hairlineWidth * 2;
export default class ProgressView extends Component {
  static propTypes = {
    progressWidth: PropTypes.number.isRequired,
    progressHeight: PropTypes.number.isRequired,
    style: ViewPropTypes.style,
    barColorCurrentPrimary: PropTypes.string,
    barColorTotal: PropTypes.string,
  };

  static defaultProps = {
    style: {},
    barColorCurrentPrimary: '#00e0ff',
    barColorTotal: '#ffffff',
  };

  constructor(props) {
    super(props);
    this.phase = 0;
  }

  setNativeProps(props) {
    const { progressWidth, progressHeight } = this.props;
    const { total, current } = props;
    const progress = current / total;
    const progressLength = progress * (progressWidth - progressHeight);
    // const strokeWidth = progressHeight - MARGIN_HERIZONTAL * 2;
    const x0 = progressHeight / 2;
    const y0 = Math.round(progressHeight / 2) - MARGIN_HERIZONTAL;
    this.progressPath && this.progressPath.setNativeProps({ d: `M${x0} ${y0}  l${progressLength} 0` });

    if (this.progressBgG !== undefined) {
      this.progressBgG.setNativeProps({
        x: - (this.phase++) % Math.floor(progressHeight) * 2
      });
    }
  }

  render() {
    const {
      style,
      barColorCurrentPrimary,
      barColorCurrentSecondary,
      barColorTotal,
      progressWidth,
      progressHeight
    } = this.props;
    const patternSize = progressHeight;
    const length = progressWidth - progressHeight;
    const strokeWidth = progressHeight - MARGIN_HERIZONTAL * 2;
    const x0 = progressHeight / 2;
    const y0 = Math.round(progressHeight / 2) - MARGIN_HERIZONTAL;
    return (
      <View style={[styles.container, style]}>

        <Svg height={`${progressHeight}`} width={`${progressWidth}`}>
          {barColorCurrentSecondary && (
            <Defs>
              <Pattern
                id="StripePattern"
                x="0"
                y="0"
                width={`${patternSize * 2}`}
                height={`${patternSize}`}
                patternUnits="userSpaceOnUse"
              >
                <G x='0' y='0' ref={(progressBgG) => { this.progressBgG = progressBgG; }}>
                  <G transform="skewX(-45)">
                    <Rect
                      x="0"
                      y="0"
                      width={`${patternSize}`}
                      height={`${patternSize}`}
                      stroke="none"
                      fill={`${barColorCurrentPrimary}`}
                    />
                    <Rect
                      x={`${patternSize}`}
                      y="0"
                      width={`${patternSize}`}
                      height={`${patternSize}`}
                      stroke="none"
                      fill={`${barColorCurrentSecondary}`}
                    />
                    <Rect
                      x={`${patternSize * 2}`}
                      y="0"
                      width={`${patternSize}`}
                      height={`${patternSize}`}
                      stroke="none"
                      fill={`${barColorCurrentPrimary}`}
                    />
                    <Rect
                      x={`${patternSize * 3}`}
                      y="0"
                      width={`${patternSize}`}
                      height={`${patternSize}`}
                      stroke="none"
                      fill={`${barColorCurrentSecondary}`}
                    />
                    <Rect
                      x={`${patternSize * 4}`}
                      y="0"
                      width={`${patternSize}`}
                      height={`${patternSize}`}
                      stroke="none"
                      fill={`${barColorCurrentPrimary}`}
                    />
                  </G>
                </G>
              </Pattern>
            </Defs>
          )}
          <G fill="none" stroke={`${barColorTotal}`}>
            <Path
              strokeLinecap="round"
              strokeWidth={`${strokeWidth}`}
              d={`M${x0} ${y0} l${length} 0`}
            />
          </G>
          <G
            fill="none"
            stroke={barColorCurrentSecondary ? 'url(#StripePattern)' : barColorCurrentPrimary}
            ref={(progressG) => { this.progressG = progressG; }}
          >
            <Path
              ref={(progressPath) => { this.progressPath = progressPath; }}
              strokeLinecap="round"
              strokeWidth={`${strokeWidth}`}
            />
          </G>
        </Svg>
      </View>
    );
  }
}
