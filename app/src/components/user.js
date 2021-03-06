import React from 'react';
import Filter from './filter';
import { Grid, Segment, Card, Button, Form, Label, Divider, Table, Header, Image } from 'semantic-ui-react';
import Stdlist from './list';
// import { Http2ServerRequest } from 'http2';
import { Container, Row } from 'react-bootstrap';
import fetchData from './apicalls';

const university = [
    { key: 'pes', value: "pesu", text: 'PESIT' },
    { key: 'xyz', value: "xyz", text: 'XYZ' }
]

const api = new fetchData()


class Board extends React.Component {
    constructor(props) {
        super(props)
        // this.datafromchild = this.datafromchild.bind(this)
        // this.Whichstudent = this.Whichstudent.bind(this)
        this.dashboard = this.dashboard.bind(this)
        this.whattorender = this.whattorender.bind(this)
        this.state = {
            user: this.props.location.state.user,
            "what": "attendance",
            "edit": true,
            "detail": {
                "address": "",
                "firstName": "",
                "lastName": "",
                "gender": "",
                "parent": "",
                "university": "",
                "dept": "",
                "usn": "",
                "coordinator": ""
            },
            "attendance": [],
            "marks": [],
            "overall": 0.0
        }
        this.handlChange = this.handlChange.bind(this)
        this.detail = this.detail.bind(this)
        this.table = this.table.bind(this)
        this.siderbar = this.siderbar.bind(this)
        this.detail()

    }

    detail = async () => {
        const call = await api.userDetails(this.state.user)
        // console.log(call.detail)
        this.setState({ "detail": call.detail })
        this.setState({ "attendance": call.attendance })
        this.setState({ "marks": call.marks })
        this.setState({ "overall": call.overall })
    }

    table = () => {
        return (
            this.state.marks.map(ia => {
                return <Table.Row>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Header.Content>
                                {ia.subCode}
                                <Header.Subheader>{ia.subName}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{ia.ia1}</Table.Cell>
                    <Table.Cell>{ia.ia2}</Table.Cell>
                    <Table.Cell>{ia.ia3}</Table.Cell>
                    <Table.Cell>{ia.finalMarks}</Table.Cell>
                </Table.Row>
            })
        )
    }


    whattorender(what) {
        if (what === "setting") {
            return (
                <Grid.Row style={{ flex: 1 }}>
                    <Segment>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid
                                    label='Parent Name'
                                    disabled={true}
                                    value="Name"
                                    placeholder='First name' />

                            </Form.Group>
                            <Button floated={"right"} onClick={() => this.setState({ "edit": !this.state.edit })}>Edit</Button>
                            <Form.TextArea 
                            label='Address'  
                            disabled={this.state.edit} 
                            placeholder='Type Here' 
                            // onChange={(e, value)=> this.setState({"address": value})} 
                            value={this.state.detail.address}
                            />
                            <Form.Group widths='equal'>
                                {/* <Form.Input fluid label='First name' placeholder='dept' /> */}
                                <Form.Input 
                                fluid 
                                label='Phone Number' 
                                disabled={this.state.edit} 
                                placeholder='Ex: 7764997033' 
                                // value={this.state.detail.}
                                />
                                <Form.Input 
                                fluid 
                                label='New Password'
                                name="address"
                                
                                disabled={this.state.edit} 
                                placeholder='EX: password123' 
                                />
                            </Form.Group>
                        </Form>
                        <Button icon="save" disabled={this.state.edit} fluid></Button>
                    </Segment>
                </Grid.Row>
            )

        }
        else if (what === "attendance") {
            return (
                <Grid.Row>
                    <Grid.Row>
                        <Segment>
                            <Card fluid>
                                <Card.Content header={(this.state.overall * 100).toFixed(2) + "\%"} />
                                <Card.Content description={"Number of Weeks: " + this.state.attendance.length} />
                            </Card>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row style={{ marginTop: "10px" }}>
                        <Segment>
                            <h2>Attendance</h2>
                            <Divider></Divider>
                            {/* <Form.Select
                                fluid
                                label='Subject'
                                options={university}
                                placeholder='EX: Automata Theory'
                            />
                            <Divider></Divider> */}
                            {/* <Label as="a" image>1 <Label.Detail>79%</Label.Detail></Label> */}
                            {
                                this.state.attendance.map(week => {
                                    return <Label as="a" image>{week.weekno} <Label.Detail>{week.percent + "\%"}</Label.Detail></Label>
                                })
                            }
                            {/* <Label style={{ backgroundColor: 'lightgreen' }}>67.0%</Label> */}
                        </Segment>
                    </Grid.Row>
                </Grid.Row>

            )

        }
        else if (what === "iamarks") {
            return (
                <Segment>
                    <Table basic='very' celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Subject</Table.HeaderCell>
                                <Table.HeaderCell>IA-1</Table.HeaderCell>
                                <Table.HeaderCell>IA-2</Table.HeaderCell>
                                <Table.HeaderCell>IA-3</Table.HeaderCell>
                                <Table.HeaderCell>Avg. Marks</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.table()}
                        </Table.Body>
                    </Table>
                </Segment>
            )
        }
        else {
            return (
                <h1>Hey there</h1>
            )
        }
    }

    siderbar = () => {
        return (
            <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                <Segment style={{ width: "80%", marginTop: "20px", height: "95vh" }}>
                    <Grid>
                        <Grid.Column style={{ flex: 1, backgroundColor: "rgb(236, 236, 236)", height: "94.8vh" }}>
                            {/* Picture */}
                            <Grid.Row style={{ flex: 1 }}></Grid.Row>
                            <Grid.Row style={{
                                flex: 3,
                                //  backgroundColor: "pink",
                                display: "flex",
                                alignContent: 'center',
                                justifyContent: "center"
                            }}>
                                <Card
                                    image='https://react.semantic-ui.com/images/avatar/large/elliot.jpg'
                                    header={this.state.detail.firstName + " " + this.state.detail.lastName}
                                    meta={this.state.detail.usn}
                                // description={this.state.detail.dept}
                                // extra={extra}
                                />
                            </Grid.Row>
                            <Grid.Row style={{
                                flex: 1,
                                display: "flex",
                                alignContent: 'center',
                                justifyContent: "center",
                                marginTop: "10px"
                            }}>
                                <Button
                                    size='large'
                                    fluid
                                    onClick={() => this.setState({ "what": "attendance" })}
                                >Attendance</Button>
                            </Grid.Row>
                            <Grid.Row style={{
                                flex: 1,
                                display: "flex",
                                alignContent: 'center',
                                justifyContent: "center",
                                marginTop: "10px"
                            }}>
                                <Button
                                    size='large'
                                    fluid
                                    onClick={() => this.setState({ "what": "iamarks" })}
                                >Internal Marks</Button>
                            </Grid.Row>
                            <Grid.Row style={{
                                flex: 1,
                                display: "flex",
                                alignContent: 'center',
                                justifyContent: "center",
                                marginTop: "10px"
                            }}>
                                <Button
                                    size='large'
                                    color="green"
                                    icon="setting"
                                    fluid
                                    onClick={() => { this.setState({ "what": "setting" }); console.log(this.state) }}
                                ></Button>
                            </Grid.Row>
                            <Grid.Row style={{
                                flex: 1,
                                display: "flex",
                                alignContent: 'center',
                                justifyContent: "center",
                                marginTop: "10px"
                            }}>
                                <Button
                                    size='large'
                                    color="red"
                                    icon="log out"
                                    fluid
                                    onClick={() => this.props.history.goBack()}
                                ></Button>
                            </Grid.Row>
                        </Grid.Column>
                        {/* Detail tab */}
                        <Grid.Column style={{ flex: 3 }}>
                            {this.whattorender(this.state.what)}
                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        )
    }

    handlChange = (e) => { this.setState["what"] = "setting" }
    dashboard() {
        return (
            this.siderbar()

        )

    }

    render() {
        return (
            this.dashboard()
        )
    }
}

export default Board;