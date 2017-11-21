import React, { Component } from 'react';
import {Stage, Layer, Circle, Text, Line, Group} from 'react-konva';
import PropTypes from 'prop-types';

/**
 * WheelOfFate component
 */
class WheelOfFate extends React.Component {
    render() {
        const referenceRadius = 200;
        const scale = this.props.radius / referenceRadius;
        const fontSize = 15 * scale;
        const rotationOffset = 360 / this.props.engineers.length;
        const bauRotation = (() => {
            for(let index in this.props.engineers) {
                const engineer = this.props.engineers[index];
                if (engineer.id === this.props.bau) {
                    return -rotationOffset * index;
                }
            }
            return 0;
        })();

        const names = this.props.engineers.map((engineer, index) =>
            <Text
                key={engineer.id}
                width={this.props.radius - this.props.radius / 4}
                fontSize={fontSize}
                text={engineer.name}
                rotation={rotationOffset * index}
                offsetX={-this.props.radius / 4}
                offsetY={fontSize / 2}/>
        );

        const lines = this.props.engineers.map((engineer, index) =>
            <Line
                key={engineer.id}
                points={[0, 0, this.props.radius, 0]}
                rotation={rotationOffset * index + rotationOffset / 2}
                stroke='black'/>
        );

        return (
            <div className="wheel">
                <Stage width={this.props.radius * 2} height={this.props.radius * 2}>
                    <Layer
                        x={this.props.radius}
                        y={this.props.radius}
                        rotation={bauRotation}>
                        <Group>{names}</Group>
                        <Group>{lines}</Group>
                        <Circle
                            ref="circle"
                            radius={this.props.radius}
                            fill="transparent"
                            stroke="black"/>
                    </Layer>
                </Stage>
            </div>
        );
    }
}

WheelOfFate.propTypes = {
    radius: PropTypes.number,
    engineers: PropTypes.array.isRequired,
    bau: PropTypes.number.isRequired
};

WheelOfFate.defaultProps = {
    radius: 200
};

export default WheelOfFate;