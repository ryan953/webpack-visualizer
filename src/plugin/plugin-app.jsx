import React from 'react';
import Breadcrumbs from '../shared/components/breadcrumbs';
import Chart from '../shared/components/chart';
import ChartDetails from '../shared/components/chart-details';
import Footer from '../shared/components/footer';
import ReasonList from '../shared/components/reason-list';

export default React.createClass({
    
    propTypes: {
        chartData: React.PropTypes.object
    },
    
    getInitialState() {
        return {
            hoverDetails: null,
            breadcrumbNodes: [],
            reasons: null,
            paddingDiff: 0
        };
    },
    
    onChartRender(details) {
        this.setState({
            paddingDiff: details.removedTopPadding
        });
    },
    
    onChartHover(details) {
        this.setState({
            hoverDetails: details,
            breadcrumbNodes: details.ancestorArray,
            reasons: details.reasonArray,
        });
    },
    
    onChartUnhover() {
        this.setState({
            hoverDetails: null,
            breadcrumbNodes: [],
            reasons: null,
        });
    },
    
    render() {
        var chartAreaClass = 'chart';
        
        if (this.props.chartData && this.props.chartData.maxDepth > 9) {
            chartAreaClass += ' chart--large';
        }
        
        return (
            <div>
                <h1>Webpack Visualizer</h1>
                
                <div ref="ChartArea" className={chartAreaClass} onClick={this.chartAreaClick}>
                    <ChartDetails details={this.state.hoverDetails} topMargin={this.state.paddingDiff} />
                    <Chart
                        data={this.props.chartData}
                        onHover={this.onChartHover}
                        onUnhover={this.onChartUnhover}
                        onRender={this.onChartRender}
                    />
                </div>
                
                <Breadcrumbs nodes={this.state.breadcrumbNodes} />
                <ReasonList reasonArray={this.state.reasons} />
                
                <Footer />
            </div>
        );
    }
});
