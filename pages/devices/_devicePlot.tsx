import { fromFlux, Plot, LayerTypes, LayerConfig } from '@influxdata/giraffe'

const style = {
  width: "calc(50vw - 20px)",
  height: "calc(20vh - 20px)",
  margin: "40px",
}

export function DevicePlot(
  { csv, plot, title }:
  { csv: string, plot: 'line' | 'table', title?: string})
{
  const csvData = csv?.trim() || ''
  const tableData = fromFlux(csvData).table || undefined
  let field = tableData.getColumn('_field')
  const fieldTitle = Array.isArray(field) ? field[0] : ''
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

  return (
    <div>
      <div style={style}>
        <h3>{title || fieldTitle}</h3>
        {tableData && csvData && layer[plot] && <Plot config={{
                            fluxResponse: csvData,
                            table: tableData,
                            layers: [layer[plot]()],
                        }} />}
      </div>                
    </div>
  )
}