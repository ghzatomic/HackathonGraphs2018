import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
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

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Dashboard extends Component {

  buscaGrafico1 = () => {
    fetch(mainAPI + "/graficos/grafico_historico").then(res => res.json())
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

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      isLoadedHistorico: false,
      dataHistorico: [],
    };
  }

  componentDidMount() {
    this.buscaGrafico1();
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
                    <CardTitle className="mb-0">Sentimentos</CardTitle>
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


      </div>
    );
  }
}

export default Dashboard;
