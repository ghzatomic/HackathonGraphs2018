import React, {Component} from 'react';
import {Pie,Line} from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import Widget03 from '../../views/Widgets/Widget03'
import {CustomTooltips} from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {getStyle, hexToRgba} from '@coreui/coreui/dist/js/coreui-utilities'
import pattern from 'patternomaly';

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

const mainAPI = "http://localhost:3001"
//const mainAPI = "https://HackathonBACK2018--ghzatomic.repl.co"

// Main Chart


const lineOptions = {
  bezierCurve: true,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero:true
      }
    }]
  }
};

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Dashboard extends Component {
  buscaGraficoSentimentos = () => {
    fetch(mainAPI + "/graficos/grafico_sentimentos").then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoadedHistorico: true,

          dataHistorico: {
            datasets: [{
              data: result.data,
              backgroundColor: pattern.generate([
                '#1f77b4',
                '#ff7f0e',
                '#2ca02c',
                '#d62728'
              ])
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: result.labels
          },
        });
      },
      (error) => {
        this.setState({
          isLoadedHistorico: false,
          error
        });
      }
    )
  }

  buscaGraficoVariacao = () => {
    fetch(mainAPI + "/graficos/data_sentimento").then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoadedHistorico: true,

          dataVariacao: {
            datasets: [
              {
                borderColor: "#71f441",
                backgroundColor: "#71f441",
                label: "Positivo",
                lineTension: 0.1,
                fill: false,
                data:result.data[0],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "white",
                pointBackgroundColor: "black",
                pointBorderWidth: 1,
                pointHoverRadius: 8,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                spanGaps: false
              },
              {
                borderColor: "#f44141",
                backgroundColor: "#f44141",
                label: "Negativo",
                data:result.data[1],
                fill: false,
                lineTension: 0.1,
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "white",
                pointBackgroundColor: "black",
                pointBorderWidth: 1,
                pointHoverRadius: 8,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                spanGaps: false
              },
              {
                borderColor: "#3edfe8",
                backgroundColor: "#3edfe8",
                label: "Neutro",
                data:result.data[2],
                borderDashOffset: 0.0,
                fill: false,
                lineTension: 0.1,
                borderJoinStyle: 'miter',
                pointBorderColor: "white",
                pointBackgroundColor: "black",
                pointBorderWidth: 1,
                pointHoverRadius: 8,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                spanGaps: false
              }],
            labels: result.labels
          },
        });
      },
      (error) => {
        this.setState({
          isLoadedHistorico: false,
          error
        });
      }
    )
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      isLoadedHistorico: false,
      dataHistorico: [],
      dataVariacao: [],
    };
  }

  componentDidMount() {
    this.buscaGraficoSentimentos();
    this.buscaGraficoVariacao();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  render() {

    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Sentimentos gerais</CardTitle>
                  </Col>
                </Row>
                <div className="chart-wrapper"
                     style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
                  <Pie data={this.state.dataHistorico}  height={50}/>
                </div>
              </CardBody>
              <CardFooter>

              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Variação de sentimentos</CardTitle>
                  </Col>
                </Row>
                <div className="chart-wrapper"
                     style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
                  <Line data={this.state.dataVariacao} options={lineOptions}  height={50}/>
                </div>
              </CardBody>
              <CardFooter>

              </CardFooter>
            </Card>
          </Col>
        </Row>


      </div>
    );
  }
}

export default Dashboard;
