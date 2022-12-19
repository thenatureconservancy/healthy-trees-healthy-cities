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

    const uploadUrl = await context.dispatch('getUploadUrlFromS3', params);

    console.log(uploadUrl);

    context.dispatch('createFileBlob', params.file).then(async (blobData) => {
      console.log(blobData);
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: blobData,
      });
      console.log(response);
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
