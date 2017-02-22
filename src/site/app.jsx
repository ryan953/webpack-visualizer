import React from 'react';
import cx from 'classnames';
import Chart from '../shared/components/chart';
import ChartDetails from '../shared/components/chart-details';
import ReasonList from '../shared/components/reason-list';
import Breadcrumbs from '../shared/components/breadcrumbs';
import Footer from '../shared/components/footer';
import ChunkSelector from '../shared/components/chunk-selector';
import addDragDrop from '../shared/util/dragdrop';
import readFile from '../shared/util/readFile';
import buildHierarchy from '../shared/buildHierarchy';
import { getChunkNames } from '../shared/util/getChunkNames';

export default React.createClass({

    getInitialState() {
        return {
            needsUpload: true,
            dragging: false,
            chartData: null,
            hoverDetails: null,
            breadcrumbNodes: [],
            reasons: null,
            paddingDiff: 0,
            chunkName: '*',
        };
    },

    componentDidMount() {
        addDragDrop({
            el: this.refs.ChartArea,
            callback: file => {
                readFile(file, this.handleFileUpload);
            },
            onDragStart: () => {
                this.setState({
                    dragging: true
                });
            },
            onDragEnd: () => {
                this.setState({
                    dragging: false
                });
            }
        });
    },

    chartAreaClick() {
        if (this.state.needsUpload) {
            this.refs.FileInput.click();
        }
    },

    onFileChange(ev) {
        readFile(ev.target.files[0], this.handleFileUpload);
    },

    handleFileUpload(jsonText) {
        this.stats = JSON.parse(jsonText);

        this.setState({
            needsUpload: false,
            chartData: buildHierarchy(this.stats, this.state.chunkName)
        });
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
        var chartAreaClass = cx(
          'chart',
          { 'chart--dragging': this.state.dragging },
          { 'chart--needsUpload': this.state.needsUpload },
          { 'chart--large': this.state.chartData && this.state.chartData.maxDepth > 9 },
        );

        return (
            <div>
                <h1>Webpack Visualizer</h1>

                <div ref="ChartArea" className={chartAreaClass} onClick={this.chartAreaClick}>
                    <div className="chart-uploadMessage">
                        <p>Drop JSON file here or click to choose.</p>
                        <small>Files won't be uploaded &mdash; your data stays in your browser.</small>
                    </div>
                    <ChartDetails details={this.state.hoverDetails} topMargin={this.state.paddingDiff} />
                    <Chart
                        data={this.state.chartData}
                        onHover={this.onChartHover}
                        onUnhover={this.onChartUnhover}
                        onRender={this.onChartRender}
                    />
                </div>

                <input
                    ref="FileInput"
                    type="file"
                    className="hiddenFileInput"
                    onChange={this.onFileChange}
                />

                {this.stats ? (
                  <ChunkSelector
                    options={['*', ...getChunkNames(this.stats)]}
                    onChange={(chunkName) => {
                      console.log(chunkName);
                      // this.setState({ chunkName });
                      this.setState({
                          chunkName,
                          chartData: buildHierarchy(this.stats, chunkName)
                      });
                    }}
                    value={this.state.chunkName}
                  />
                ) : null}

                <Breadcrumbs nodes={this.state.breadcrumbNodes} />
                <ReasonList reasonArray={this.state.reasons} />

                <Footer>
                    <h2>How do I get stats JSON from webpack?</h2>
                    <p><code>webpack --json > stats.json</code></p>

                    <h2>Try the Plugin!</h2>
                    <p>This tool is also available as a webpack plugin:</p>
                    <p><code>npm install webpack-visualizer-plugin</code></p>
                </Footer>
            </div>
        );
    }
});
