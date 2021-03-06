import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';
import {Stage, Layer, Circle, Text, Tag, Label, Wedge, Group} from 'react-konva';
import PropTypes from 'prop-types';

/**
 * WheelOfFate component
 */
class WheelOfFate extends Component {
    render() {
        const referenceRadius = 200;
        const scale = this.props.radius / referenceRadius;
        const fontSize = 17 * scale;
        const oneItemAngle = 360 / this.props.engineers.length;
        const orientation = -90;
        const innerRadius = this.props.radius / 5;
        const namesOffsetRadius = -this.props.radius / 3.5;
        const labelHeight = 60;
        const bauRotation = (() => {
            for(let index in this.props.engineers) {
                const engineer = this.props.engineers[index];
                if (engineer.id === this.props.bau) {
                    return (-oneItemAngle * index) + orientation;
                }
            }
            return 0;
        })();

        const colors = [
            '#00c4a6',
            '#0078c4',
            '#025e99',
            '#00446f',
            '#ff8100',
            '#ffc100',
            '#bdde09',
            '#fa58a8',
            '#cb0d93',
            '#9b006d',
            '#c0adc8',
            '#a983bc',
            '#9064a6',
            '#647aa6',
            '#495772'
        ];

        const wheel = this.props.engineers.map((engineer, index) =>
            <Wedge
                fill={colors[index % colors.length]}
                strokeWidth={0}
                key={engineer.id}
                radius={this.props.radius}
                angle={oneItemAngle}
                rotation={oneItemAngle * index + oneItemAngle / 2}
                preventDefault={false}/>
        );

        const names = this.props.engineers.map((engineer, index) =>
            <Text
                fill='white'
                key={engineer.id}
                width={this.props.radius - this.props.radius / 4}
                fontSize={fontSize}
                text={engineer.name}
                rotation={oneItemAngle * index}
                offsetX={namesOffsetRadius}
                offsetY={fontSize / 2}
                preventDefault={false}/>
        );

        return (
            <div className="wheel">
                <Stage width={this.props.radius * 2} height={this.props.radius * 2 + labelHeight}>
                    <Motion defaultStyle={{x: 0}} style={{x: spring(bauRotation)}}>
                        {value => <Layer
                        x={this.props.radius}
                        y={this.props.radius + labelHeight}
                        rotation={value.x}>
                            <Group>{wheel}</Group>
                            <Group>{names}</Group>
                            <Circle radius={innerRadius} fill="white"/>
                    </Layer>}
                    </Motion>
                    <Layer
                        y={labelHeight + 8}
                        x={this.props.radius}
                        preventDefault={false}>
                        <Label
                            preventDefault={false}>
                            <Tag
                                fill='black'
                                pointerDirection='down'
                                pointerWidth={30}
                                pointerHeight={15}
                                lineJoin='round'
                                shadowColor='black'
                                shadowBlur={5}
                                shadowOpacity={0.5}
                                preventDefault={false}
                            />
                            <Text
                                text={this.props.label}
                                fontSize={20}
                                padding={10}
                                fill='white'
                                preventDefault={false}
                            />
                        </Label>

                    </Layer>
                </Stage>
            </div>
        );
    }
}

WheelOfFate.propTypes = {
    radius: PropTypes.number,
    engineers: PropTypes.array.isRequired,
    bau: PropTypes.number,
    label: PropTypes.string.isRequired,
};

WheelOfFate.defaultProps = {
    radius: 200
};

export default WheelOfFate;