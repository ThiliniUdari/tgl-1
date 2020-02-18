import React, {Component} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

// Generate completed hire count of each month and adds to a chart 
class ChartCurrentYear extends Component {
  static defaultProps = {
      hires: []       
  }
  render(){
    const options = {
      title: {
        text: 'Imports And Exports'
      },
      yAxis: {
        title: {
            text: 'Number of Hires'
        }
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 0
        }
      },
      series: [
        {
          name: 'Imports',
          allowPointSelect: true,
          point: {
            events: {}
          },
          data: [],
          type: "line"
        },
        {
          name: 'Exports',
          allowPointSelect: true,
          point: {
            events: {}
          },
          data: [],
          type: "line"
        }
      ],
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
      }
    }

    // Generate hires completed in each month of the current year
    const importHires = this.props.hires.filter(item => item.hireType === "import" && (item.hireStatus === "completed") && new Date((item.completedDatetime.seconds + item.completedDatetime.nanoseconds/1E9)*1000).getFullYear() === new Date().getFullYear())
    const exportHires = this.props.hires.filter(item => item.hireType === "export" && (item.hireStatus === "completed") && new Date((item.completedDatetime.seconds + item.completedDatetime.nanoseconds/1E9)*1000).getFullYear() === new Date().getFullYear())

    // Group imports and exports completed this year to months and get the count by reducing
    var group_imports_to_months = importHires.reduce(function (obj, item) {
      obj[(new Date((item.completedDatetime.seconds + item.completedDatetime.nanoseconds/1E9)*1000)).getMonth()] = obj[(new Date((item.completedDatetime.seconds + item.completedDatetime.nanoseconds/1E9)*1000)).getMonth()] || []; 
      obj[(new Date((item.completedDatetime.seconds + item.completedDatetime.nanoseconds/1E9)*1000)).getMonth()].push(item.id);
      return obj;
    }, {});

    var group_exports_to_months = exportHires.reduce(function (obj, item) {
      obj[(new Date((item.completedDatetime.seconds + item.completedDatetime.nanoseconds/1E9)*1000)).getMonth()] = obj[(new Date((item.completedDatetime.seconds + item.completedDatetime.nanoseconds/1E9)*1000)).getMonth()] || []; 
      obj[(new Date((item.completedDatetime.seconds + item.completedDatetime.nanoseconds/1E9)*1000)).getMonth()].push(item.id);
      return obj;
    }, {});


    // Convert the set of objects to and array and sort on the month
  var imports = Object.entries(group_imports_to_months).sort()
  var Exports = Object.entries(group_exports_to_months).sort()
  

  // let monthData = new Array(12).fill(0)
  let importData = new Array(12).fill(0)
  let exportData = new Array(12).fill(0)

  // Get the count of hires made per each month by getting the array length of the second element(Array of arrays)
  for(var i=0;i<imports.length;i++){
    importData[parseInt(imports[i][0])] = imports[i][1].length
  }

  for(var j=0;j<Exports.length;j++){
    exportData[parseInt(Exports[j][0])] = Exports[j][1].length
  }

  options.series[0].data = importData;
  options.series[1].data = exportData;

    

    return(
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
      hires: state.firestore.ordered.hires
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
      {collection: 'hires'}
  ])
)(ChartCurrentYear)

