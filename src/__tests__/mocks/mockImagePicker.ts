// Mock para expo-image-picker
const mockImagePicker = {
  MediaTypeOptions: {
    All: 'All',
    Videos: 'Videos',
    Images: 'Images',
  },
  launchImageLibraryAsync: jest.fn().mockImplementation(options => {
    return Promise.resolve({
      canceled: false,
      assets: [
        {
          uri: 'file://mock-image.jpg',
          width: 1000,
          height: 1000,
          type: 'image',
          fileName: 'mock-image.jpg',
          fileSize: 1024 * 1024,
        }
      ]
    });
  }),
  launchCameraAsync: jest.fn().mockImplementation(options => {
    return Promise.resolve({
      canceled: false,
      assets: [
        {
          uri: 'file://mock-camera-image.jpg',
          width: 1000,
          height: 1000,
          type: 'image',
          fileName: 'mock-camera-image.jpg',
          fileSize: 1024 * 1024,
        }
      ]
    });
  }),
  requestMediaLibraryPermissionsAsync: jest.fn().mockResolvedValue({
    status: 'granted',
    granted: true,
    expires: 'never',
    canAskAgain: true,
  }),
  requestCameraPermissionsAsync: jest.fn().mockResolvedValue({
    status: 'granted',
    granted: true,
    expires: 'never',
    canAskAgain: true,
  }),
  getCameraPermissionsAsync: jest.fn().mockResolvedValue({
    status: 'granted',
    granted: true,
    expires: 'never',
    canAskAgain: true,
  }),
  getMediaLibraryPermissionsAsync: jest.fn().mockResolvedValue({
    status: 'granted',
    granted: true,
    expires: 'never',
    canAskAgain: true,
  }),
};

export default mockImagePicker; 