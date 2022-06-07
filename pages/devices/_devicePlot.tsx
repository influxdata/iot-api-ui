import { fromFlux, Plot, LayerTypes, LayerConfig } from '@influxdata/giraffe'

const style = {
  width: "calc(50vw - 20px)",
  height: "calc(20vh - 20px)",
  margin: "40px",
}

export function DevicePlot(
  { csv, plot }:
  { csv: string, plot: 'line' | 'table', title: string})
{
  const csvData = csv?.trim() || ''
  const tableData = fromFlux(csvData).table || undefined
  const title = tableData.getColumn('_field') || ''
  const layer : { line: () => LayerConfig, table: () => LayerConfig, } = {
    line: () =>  ({
                    type: LayerTypes.Line,
                    x: "_time",
                    y: "_value",
                    fill: []
                  }),

    table: () => ({
                    fluxResponse: csvData,
                    type: LayerTypes.SimpleTable,
                    showAll: false,
                  })
  }
  //console.log(csv)
  //console.log(csvData)
  //console.log(tableData)
  return (
    <div>
      <div style={style}>
        { title && <h3>{title}</h3> }
        {tableData && csvData && layer[plot] && <Plot config={{
                            fluxResponse: csvData,
                            table: tableData,
                            layers: [layer[plot]()],
                        }} />}
      </div>                
    </div>
  )
}