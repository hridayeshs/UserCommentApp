import React, { Fragment, useState, Component } from 'react';
import {
  Button,
  Segment,
  Divider,
  Container,
  Tab,
  Table,
  Checkbox,
  Form,
  Header,
  Icon,
  Input,
  Dropdown,
  Dimmer,
  Loader,
  Label,
  Grid,
  GridColumn,
  LabelDetail,
  Image
} from "semantic-ui-react";
import {UploadImageService, GetImagesService} from '../services/UploadImageService';
import Message from '../elements/Message';
import Error from '../elements/Error';
import {
  SUCCESSFUL_IMAGE_UPLOAD,
  ERROR_IN_IMAGE_UPLOAD,
} from '../MessageBundle';

export default class ImageUpload extends Component {

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            profileImg: '',
            file:'',
            imagePreviewUrl: '',
            error:false,
            uploadSuccess:false,
            imagesData:'',
        }
    }


    onFileChange = async (e) => {
        this.setState({ profileImg: e.target.files[0] })
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];


        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result,
            error: false,
              uploadSuccess: false,
          });
        }

        reader.readAsDataURL(file)
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append('profileImg', this.state.profileImg)

        const uploadImageResult = await UploadImageService(formData);
        console.log(uploadImageResult);
        if (uploadImageResult.status != 200) {
          this.setState({
            error: true,
            uploadSuccess: false,
          });
        } else
          this.setState({
            imagePreviewUrl: uploadImageResult.data.data.profileImg,
            error:false,
            uploadSuccess: true,
          });

    }

    // componentDidMount = async (e) => {
    //   const imageDataResult = await GetImagesService();
    //   this.setState({
    //       profileImg: '',
    //       file: '',
    //       imagePreviewUrl: '',
    //       error: false,
    //       uploadSuccess: false,
    //       imagesData: imageDataResult,
    //   });
    //   console.log(this.state.imagesData);
    // }

    render() {
      const {imagePreviewUrl, error, uploadSuccess, imagesData} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<Image src={imagePreviewUrl} width='80%' height='60%'/>);
      }
    //   if (imagesData.success === true) {
    //       Object.entries(imagesData.data).map(([make, type]) => {
    //       console.log(make)
    //       console.log(type)
    //       $imageList = (
    //           <img src={`data:image/png;base64,${props.postImgBase64}`} alt="a"/>
    //       )
    // })
    //   }
        return (

          <Segment stacked>
            <div class="ui center aligned basic segment">
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' color='teal' textAlign='center'>
            Upload image here!!
          </Header>..{''}
            <Form onSubmit={this.onSubmit}>
              <Form.Field>
                <input
                  type="file"
                  hidden
                  onChange={this.onFileChange}
                  size = 'large'
                />
              </Form.Field>
                         <div className="imgPreview">
              {$imagePreview}&nbsp;
            </div>
            {''}
            {''}
              <Button type="submit" size='big'>Upload</Button>
              {''}
            </Form>
            {''}
            {''}
            {' '}&nbsp;
            {uploadSuccess && <Message message={SUCCESSFUL_IMAGE_UPLOAD} />}    {' '}
            {error && <Error message={ERROR_IN_IMAGE_UPLOAD} />}    {' '}
            <Divider horizontal> Uploaded Images </Divider>
            </Grid.Column>
            </Grid>
            </div>
            </Segment>

        )
    }
}
