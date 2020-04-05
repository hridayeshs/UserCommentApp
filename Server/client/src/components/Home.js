import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Modal
} from 'semantic-ui-react'
import Login from './Login';
import Registration from './Registration';
import { Redirect } from 'react-router';
const qs = require('query-string');
const parsed = qs.parse(window.location.search);
const openLoginDefault = (parsed.q=='login') ? true : false;

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = ({ mobile }) => (
  <Container Image style={{ margin:'10% 0 10% 3%'}}>
    <div class = "ui segment heroimagecontainer">
    <img class = "ui centered image"
    src = "share122.png"/></div>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

class DesktopContainer extends Component {

  state = {
    isLoginOpen: openLoginDefault,
    isRegistraOpen: false
  }

  handleClick = (dimmer) => {
    this.setState({
      isLoginOpen: true,
      isRegistraOpen: false,
      dimmer
    });
  }

  // show = (dimmer) => () => this.setState({ dimmer, open: true })
  // close = () => this.setState({ open: false })

  handleFocus = (dimmer) => {
    this.setState({
      isLoginOpen: false,
      isRegistraOpen: true,
      dimmer
    });
  }
  close = () => this.setState({
    isRegistraOpen: false,
    isLoginOpen: false
  })

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {

    const { children } = this.props
    const { fixed } = this.state

    const {
      isLoginOpen,
      isRegistraOpen,
      dimmer
    } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <div class='popup'>
                <Header as='h1' style={{ color: 'white', marginLeft: '1.5em'}} floated='left'> Photo Comment App </Header>

                  <Button as='a' onClick={this.handleClick} id="model1" inverted={!fixed} size='large' floated='right' style={{ marginRight: '9.5em'}}>
                    Log in
                  </Button>  {' '} &nbsp; {' '}

                  <Button as='a' onClick={this.handleFocus} id="model2" inverted={!fixed} primary={fixed} style={{ marginRight: '1.5em'}} size='large' floated='right'>
                    Sign Up
                  </Button>
                  </div>
                {/* </Menu.Item> */}
              <div class='modal-dialog'>
              <Modal dimmer={dimmer}  open={this.state.isLoginOpen} onClose={this.close} size="small" id="modaldiv">
                <Modal.Actions>
                <Login/>
                </Modal.Actions>
              </Modal>
              <Modal dimmer={dimmer} open={this.state.isRegistraOpen} onClose={this.close} size="small" id="modaldiv2">
                <Modal.Actions><Registration/></Modal.Actions>
              </Modal>

              </div>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>
        {children}
      </Responsive>

    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          <Menu.Item as='a'>Work</Menu.Item>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted>
                    Log in
                  </Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
  </ResponsiveContainer>
)

export default HomepageLayout



