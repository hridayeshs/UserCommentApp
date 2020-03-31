import React from 'react'
import {Image} from 'semantic-ui-react'

const Logo = (props) => <Image {...props} src = './logo.svg' />

Logo.propTypes = Image.propTypes

export default Logo
