import { fromFlux, Plot, LayerTypes, Config, LayerConfig, HoverTimeProvider } from '@influxdata/giraffe'
export default function DevicePlot({ csv, title, lastUpdated }) {

  const style = {
    width: "calc(70vw - 20px)",
    height: "calc(70vh - 20px)",
    margin: "40px",
  }

  const table = fromFlux(csv).table

  const lineLayer: LayerConfig = {
    type: LayerTypes.Line,
    x: "_time",
    y: "_value",
    fill: []
  }

  const tableLayer: LayerConfig = {
    type: LayerTypes.Table,
    timeZone: 'UTC',
    properties: {
      colors: [],
      tableOptions: {},
      fieldOptions: [],
      timeFormat: 'YYYY-MM-DD hh:mm:ss A',
      decimalPlaces: {
        isEnforced: false,
        digits: 5
      }
    }
  }

  const simpleTableLayer: LayerConfig = {
    fluxResponse: csv,
    type: LayerTypes.SimpleTable,
    showAll: true
  }

  const config: Config = {
    table,
    layers: [lineLayer],
  }

  return(
    <div style={style}>
      <h3>{title} {lastUpdated}</h3>
      <Plot config={config} />
    </div>

  )

}