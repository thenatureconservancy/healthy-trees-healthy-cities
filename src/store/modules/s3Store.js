import { v4 as uuidv4 } from 'uuid';
const state = () => ({});

const getters = {};

const mutations = {};

const actions = {
  async uploadPhotosToS3(context, params) {
    const uuid = uuidv4();
    const type = params.file.name.split('.').pop();
    params.bucket = 'hthc-photos';
    params.uuid = uuid;
    params.fileName = `${params.uuid}.${type}`;
    console.log(params.file);

    const uploadUrl = await context.dispatch('getUploadUrlFromS3', params);

    context.dispatch('createFileBlob', params.file).then(async (blobData) => {
      // upload to S3 using the BLOB data and the S3 uploadUrl
      try {
        const response = await fetch(uploadUrl, {
          method: 'PUT',
          body: blobData,
        });
        if (response.status != 200) {
          console.log('failed to upload photo to S3 bucket');
          return;
        }
        try {
          const dbResponse = await context.dispatch('protectedApiRequest', {
            route: `photo`,
            type: 'POST',
            body: {
              id: params.uuid,
              s3_key: params.fileName,
              size: params.file.size,
              description: 'this is a test description....',
            },
          });

          console.log(dbResponse);
          if (dbResponse.status == 200) {
            console.log(
              'now make a request to get all users photos with upload URL'
            );
          }
          // if dbResponse does not fail, make a request here for users photos
        } catch (error) {
          console.log(
            'while the photo was uploaded to S3 the record was not added to the DB',
            error
          );
        }
      } catch (error) {
        console.log(
          'The photo was not able to be uploaded to S3, either let user know or try again silently',
          error
        );
      }
    });
  },
  async getUploadUrlFromS3(context, params) {
    const response = await context.dispatch('protectedApiRequest', {
      route: `S3/photo-upload-url`,
      type: 'POST',
      body: {
        fileName: params.fileName,
        bucket: params.bucket,
        contentType: params.file.type,
      },
    });
    return response.data.data;
  },
  async createFileBlob(context, file) {
    return new Promise((resolve, reject) => {
      // create file binary
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const fileBinary = e.target.result;
        let binary = atob(fileBinary.split(',')[1]);
        let array = [];
        for (var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        let blobData = new Blob([new Uint8Array(array)], {
          type: file.type,
        });
        resolve(blobData);
      };
    });
  },
};

export default {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
};
