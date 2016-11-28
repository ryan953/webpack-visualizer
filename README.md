## Usage

```
git clone https://github.com/bradencanderson/webpack-visualizer.git
```
```sh
cd webpack-visualizer
npm install
npm run build
npm run dev
```
Generate a webpack stats file:

```javascript
plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'disabled',
    openAnalyzer: false,
    generateStatsFile: true,
    statsFilename: 'stats/stats.json',
    statsOptions: {
      assets: true,
      source: false,
      chunks: true,
      modules: true,
      children: true,
    }
  }));
```

Then open up `localhost:8080` and drag your stats file into the window.

---

![](https://cloud.githubusercontent.com/assets/1145857/10471320/5b284d60-71da-11e5-8d35-7d1d4c58843a.png)
